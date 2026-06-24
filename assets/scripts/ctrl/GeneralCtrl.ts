// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ItemConfig, { ItemBasic } from "../config/ItemConfig";
import ButtonUtil from "../utils/ButtonUtil";
import PlayerCacheCtrl from "./PlayerCacheCtrl";
import GeneralConfig, { GeneralBasic } from "../config/GeneralConfig";
import ResPathKey from "../config/ResPathKey";
import TipCtrl from "./TipCtrl";
import UnlockManager from "../manager/UnlockManager";
import SdkCtrl from "../utils/WxSdkUtil";
import IndexCtrl from "./IndexCtrl";
import SpineUtil from "../utils/SpineUtil";
import MainCtrl from "./MainCtrl";
import GeneralSkillConfig, { GeneralSkillBasic } from "../config/GeneralSkillConfig";
import GeneralLevelSkillCtrl from "./generalSkill/GeneralLevelSkillCtrl";
import PlayerAttrCtrl from "./PlayerAttrCtrl";
import SpriteManager from "../manager/SpriteManager";
import AudioManager from "../manager/AudioManager";
import TaskConfig from "../config/TaskConfig";


const { ccclass, property } = cc._decorator;

@ccclass
export default class GeneralCtrl extends cc.Component {

    @property({type:cc.Node, tooltip:'角色列表父节点'})
    generalListContent:cc.Node = null;

    @property({type:cc.Prefab, tooltip:'角色信息预制体'})
    generalInfoPrefab:cc.Prefab = null;

    @property({type:cc.Node,tooltip:'选中的角色信息'})
    chooseGeneralInfo:cc.Node = null;

    @property({type:cc.Node,tooltip:'选中的角色等级信息'})
    chooseGeneralLevelInfo:cc.Node = null;

    @property({type:cc.Node,tooltip:'选中角色的等级技能内容节点'})
    chooseGeneralLevelSkillContent:cc.Node = null;

    @property({type:cc.Node,tooltip:'选中角色的固定技能节点'})
    chooseGeneralFixedSkillNode:cc.Node = null;

    @property({type:cc.Prefab,tooltip:'角色等级技能预制体'})
    generalLevelSkillPrefab:cc.Prefab = null;

    @property({type:cc.Button,tooltip:'使用按钮'})
    useButton:cc.Button = null;
    @property({type:cc.Button,tooltip:'强化按钮'})
    levelUpButton:cc.Button = null;
    @property({type:cc.Button,tooltip:'获得按钮'})
    unlockButton:cc.Button = null;

    @property({type:cc.Node,tooltip:'角色经验节点'})
    generalExpNode:cc.Node = null;

    /**
     * 当前选中的节点
     */
    private _currSelectNodeName = null;

    /**
     * 当前角色动画  1-站立 2-跑 3-攻击
     */
    private _currGeneralAnimation = 1;

    /**
     * 角色信息列表
     */
    private _generalInfoList = [];

    onLoad() {
        
    }

    onEnable() {
        this._init();
    }

    start() {

    }

    // update (dt) {}

    /**
     * 初始化
     */
    private _init() {
        cc.log("_init初始化...");

        this.flushInfo();

        this._generalInfoList = []; 

        this._initGeneralInfoList();
    }

    /**
     * 初始化角色列表
     */
    private async _initGeneralInfoList() {
        // 先清空所有信息
        this.generalListContent.removeAllChildren();
        
        // 玩家正使用的角色ID
        let generalId = PlayerCacheCtrl.getInstance().getPlayerUseGeneral();
        cc.log(generalId);
        for(let i = 0; i < GeneralConfig.CONFIG.length; i++) {
            let generalConfig:GeneralBasic = GeneralConfig.CONFIG[i];
            this._initGeneralInfo(generalConfig, PlayerCacheCtrl.getInstance().getPlayerGeneralById(generalConfig.id),generalId == generalConfig.id);
        }

        // 初始化选中的角色
        if(!this._currSelectNodeName) {
            this._currSelectNodeName = PlayerCacheCtrl.getInstance().getPlayerUseGeneral();
        }

        this.chooseGeneral(null, this._currSelectNodeName);
    }

    /**
     * 初始化角色信息
     * @param generalConfig 角色配置
     * @param playerGeneralInfo 玩家角色信息(角色ID/角色等级)
     * @param using 使用中
     */
    private async _initGeneralInfo(generalConfig:GeneralBasic, playerGeneralInfo, using:boolean) {
        let general = cc.instantiate(this.generalInfoPrefab);
        
        // 添加到列表并激活
        this._generalInfoList.push(general);
        this.generalListContent.addChild(general);
        
        // 角色名称
        general.getChildByName("name").getComponent(cc.Label).string = generalConfig.name;

        // 角色品级
        let icon:cc.Sprite = general.getChildByName("icon").getComponent(cc.Sprite);
        SpriteManager.getInstance().setBundleSpriteFrameByName(icon,generalConfig.iconPic);

        // 角色spine
        let spSkeleton:sp.Skeleton = general.getChildByName("general").getComponent(sp.Skeleton);
        spSkeleton.skeletonData = await SpineUtil.getInstance().getBundleSkeletonData(generalConfig.spine);

        // 缩放
        general.getChildByName("general").scaleX = generalConfig.listScale.x;
        general.getChildByName("general").scaleY = generalConfig.listScale.y;
        general.getChildByName("general").y -= general.getChildByName("general").height / 4;

        // 初始位置
        if(generalConfig.listPos) {
            general.getChildByName("general").x = generalConfig.listPos.x;
            general.getChildByName("general").y = generalConfig.listPos.y;
        }

        // 已拥有，展示角色等级    棕色框
        let box:cc.Sprite = general.getComponent(cc.Sprite);
        if(playerGeneralInfo) {
            general.getChildByName("level").getComponent(cc.Label).string = playerGeneralInfo.level + "级";
            SpriteManager.getInstance().setBundleSpriteFrameByName(box,ResPathKey.GENERAL_BROWN_BOX);
        }else { //未拥有     灰色框
            general.getChildByName("level").active = false;
            general.getChildByName("lock").active = true;
            SpriteManager.getInstance().setBundleSpriteFrameByName(box,ResPathKey.GENERAL_GRAY_BOX);
        }

        // 是否已使用
        if(using) {
            general.getChildByName("using").active = true;
        }

        // 选择事件
        ButtonUtil._setEvent(this.node,general.getComponent(cc.Button),"GeneralCtrl","chooseGeneral",generalConfig.id + "");

        general.active = true;
    }

    /**
     * 更新角色信息
     * @param generalConfig 角色配置
     * @param playerGeneralInfo 玩家角色信息(角色ID/角色等级)
     * @param using 使用中
     */
    private async _updateGeneralInfo(generalNode:cc.Node, playerGeneralInfo, using:boolean) {

        // 已拥有，展示角色等级    棕色框
        let box:cc.Sprite = generalNode.getComponent(cc.Sprite);
        if(playerGeneralInfo) {
            generalNode.getChildByName("level").active = true;
            generalNode.getChildByName("lock").active = false;
            generalNode.getChildByName("level").getComponent(cc.Label).string = playerGeneralInfo.level + "级";
            SpriteManager.getInstance().setBundleSpriteFrameByName(box,ResPathKey.GENERAL_BROWN_BOX);
        }else { //未拥有     灰色框
            generalNode.getChildByName("level").active = false;
            generalNode.getChildByName("lock").active = true;
            SpriteManager.getInstance().setBundleSpriteFrameByName(box,ResPathKey.GENERAL_GRAY_BOX);
        }

        // 是否已使用
        if(using) {
            generalNode.getChildByName("using").active = true;
        }
    }

    /**
     * 更新角色技能信息（等级节能/固定技能）
     */
    private async _updateGeneralSkillInfo() {
        let generalId = Number(this._currSelectNodeName);
        let generalConfig = GeneralConfig.getConfigById(generalId); 
        let playerGeneralInfo = PlayerCacheCtrl.getInstance().getPlayerGeneralById(generalId);
        // 更新等级技能
        this._updateGeneralLevelSkillInfo(generalConfig,playerGeneralInfo == null ? 0 : playerGeneralInfo.level);
        // 更新固定技能
        this._updateGeneralFixedSkillInfo(generalConfig);
    }

    /**
     * 更新等级技能信息
     * @param generalConfig 角色配置
     * @param playerGeneralLevel 玩家角色等级
     */
    private _updateGeneralLevelSkillInfo(generalConfig:GeneralBasic, playerGeneralLevel:number) {
        // 移除等级技能子节点
        this.chooseGeneralLevelSkillContent.removeAllChildren();

        let levelSkillConfig = generalConfig.skill.levelSkill;
        let index = 0;
        for(const unlockLevel in levelSkillConfig) {
            let generalSkillId = levelSkillConfig[unlockLevel];
            // cc.log("角色ID为%s,角色等级%s时解锁角色技能%s,当前角色等级%s",generalConfig.id, unlockLevel, generalSkillId,playerGeneralLevel);
            let generalSkillConfig:GeneralSkillBasic = GeneralSkillConfig.getConfigById(generalSkillId);
            if(generalSkillConfig == null) {
                continue;
            }

            // 创建节点
            let levelSkillInfo = cc.instantiate(this.generalLevelSkillPrefab);
            levelSkillInfo.getComponent(GeneralLevelSkillCtrl).init(generalSkillConfig, Number(unlockLevel),playerGeneralLevel,index);
            this.chooseGeneralLevelSkillContent.addChild(levelSkillInfo);

            index += 1;
        }
    }

     /**
     * 更新固定技能信息
     * @param generalConfig 角色配置
     */
     private _updateGeneralFixedSkillInfo(generalConfig:GeneralBasic) {
        let generalSkillId = generalConfig.skill.initSkill;
        let generalSkillConfig:GeneralSkillBasic = GeneralSkillConfig.getConfigById(generalSkillId);
        if(generalSkillConfig == null) {
            return;
        }

        this.chooseGeneralFixedSkillNode.getChildByName("skillName").getComponent(cc.Label).string = generalSkillConfig.name;
        this.chooseGeneralFixedSkillNode.getChildByName("skillDesc").getComponent(cc.Label).string = generalSkillConfig.desc;
        SpriteManager.getInstance().setBundleSpriteFrameByName(this.chooseGeneralFixedSkillNode.getChildByName("skillPicBg").getChildByName("pic").getComponent(cc.Sprite),generalSkillConfig.pic);
        
    }

    /**
     * 关闭当前节点
     */
    public close(event, customEventData) {
        AudioManager.getInstance().playCommonBtn();
        this.node.active = false;
    }
  

    /**
     * 选择角色
     * @param event 
     * @param customEventData 
     */
    public async chooseGeneral(event, customEventData) {
        if (customEventData == null) {
            return;
        }

        let generalId = Number(customEventData);
        cc.log("chooseGeneral:",generalId);

        // 查看角色配置
        let generalConfig: GeneralBasic = GeneralConfig.getConfigById(generalId);
        if (generalConfig == null) {
            return;
        }


        // 取消之前选中的节点
        if(this._currSelectNodeName) {
            cc.log("chooseGeneral:取消之前选中的节点",this._currSelectNodeName);
            this._generalInfoList[Number(this._currSelectNodeName) - 1].getChildByName("select").active = false;
        }

        // 选择框
        this._generalInfoList[Number(customEventData) - 1].getChildByName("select").active = true;
        
        this._currSelectNodeName = String(customEventData); // 更新当前选中的节点名

        // // 更新角色名称/Spine/品级icon
        let spSkeleton:sp.Skeleton = this.chooseGeneralInfo.getChildByName("general").getComponent(sp.Skeleton);
        spSkeleton.skeletonData = await SpineUtil.getInstance().getBundleSkeletonData(generalConfig.spine);

        // 选中后默认播放站立动画
        SpineUtil.getInstance().playSpineAni(spSkeleton,null,GeneralConfig.SPINE_ANIMATION_NAME.STAND,true,false);
        this._currGeneralAnimation = 1;

        this.chooseGeneralInfo.getChildByName("general").scaleX = (generalConfig.listScale.x * 1.4);
        this.chooseGeneralInfo.getChildByName("general").scaleY = (generalConfig.listScale.y * 1.4);
        this.chooseGeneralInfo.getChildByName("general").y = -this.chooseGeneralInfo.getChildByName("general").height / 3 - ( generalConfig.listPos != null ? generalConfig.listPos.y  / 3: 0);

        let icon:cc.Sprite = this.chooseGeneralInfo.getChildByName("icon").getComponent(cc.Sprite);
        SpriteManager.getInstance().setBundleSpriteFrameByName(icon,generalConfig.iconPic);
        this.chooseGeneralInfo.getChildByName("name").getComponent(cc.Label).string = generalConfig.name;

        // 获取角色经验
        let playerExp = this._getGeneralExp();

        // 更新角色等级
        let playerGeneralInfo = PlayerCacheCtrl.getInstance().getPlayerGeneralById(generalId); // 玩家角色信息
        if(playerGeneralInfo) {
            // 隐藏
            this.chooseGeneralLevelInfo.getChildByName("lockDesc").active = false;

            // 显示
            this.chooseGeneralLevelInfo.getChildByName("levelBg").active = true;
            this.chooseGeneralLevelInfo.getChildByName("exp").active = true;

            this.chooseGeneralLevelInfo.getChildByName("levelBg").getChildByName("level").getComponent(cc.Label).string = "等级" + playerGeneralInfo.level;
            let levelExpProgress:cc.ProgressBar = this.chooseGeneralLevelInfo.getChildByName("exp").getComponent(cc.ProgressBar); // 经验进度条

            // 是否能够升级
            if(GeneralConfig.hasNextLevel(playerGeneralInfo.level)) { // 还有下一级
                let levelUpExp:number = GeneralConfig.getLevelUpExp(playerGeneralInfo.level); // 升级所需经验
                levelExpProgress.progress = playerExp / levelUpExp;
                this.chooseGeneralLevelInfo.getChildByName("exp").getChildByName("label").getComponent(cc.Label).string = playerExp + "/" + levelUpExp; // 经验文本
            }else { // 已满级
                levelExpProgress.progress = 1;
                this.chooseGeneralLevelInfo.getChildByName("exp").getChildByName("label").getComponent(cc.Label).string = "已满级";
            }
        }else {
            // 隐藏
            this.chooseGeneralLevelInfo.getChildByName("levelBg").active = false;
            this.chooseGeneralLevelInfo.getChildByName("exp").active = false;

            // 显示
            this.chooseGeneralLevelInfo.getChildByName("lockDesc").active = true;
        }

        // 更新角色技能信息
        this._updateGeneralSkillInfo();

        // 处理底部按钮 使用 / 强化 / 获得
        this.unlockButton.node.active = false; // 隐藏获得按钮
        this.useButton.node.active = false; // 隐藏使用按钮
        this.levelUpButton.node.active = false; // 隐藏强化按钮
        if(playerGeneralInfo) {
            this.useButton.node.active = true; // 显示使用按钮
            this.levelUpButton.node.active = true; // 显示强化按钮

            // 是否可以使用
            if(PlayerCacheCtrl.getInstance().getPlayerUseGeneral() == generalId) {
                this.useButton.interactable = false;
                this.useButton.node.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = "已出战";
            }else {
                this.useButton.interactable = true;
                this.useButton.node.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = "出战";
                ButtonUtil._setEvent(this.node,this.useButton,"GeneralCtrl","useGeneral",generalConfig.id + "");
            }

            // 是否可以强化 
            let hasNextLevel = GeneralConfig.hasNextLevel(playerGeneralInfo.level);
            if(!hasNextLevel) { // 已满级
                this.levelUpButton.interactable = false;
                this.levelUpButton.node.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = "已满级";
            }else if(playerExp < GeneralConfig.getLevelUpExp(playerGeneralInfo.level)) {
                this.levelUpButton.node.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = "强化";
                this.levelUpButton.interactable = false;
            }else {
                this.levelUpButton.interactable = true;
                this.levelUpButton.node.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = "强化";
                ButtonUtil._setEvent(this.node,this.levelUpButton,"GeneralCtrl","levelUpGeneral",generalConfig.id + "");
            }

        }else {
            this.unlockButton.node.active = true; // 显示获得按钮
            ButtonUtil._setEvent(this.node,this.unlockButton,"GeneralCtrl","unlockGeneral",generalConfig.id + "");

            // 资源获得条件
            if(generalConfig.unlockCondition.type == UnlockManager.UNLOCK_TYPE.ITEM) {
                let item = generalConfig.unlockCondition.content;
                let itemConfig:ItemBasic = ItemConfig.getConfigById(item.itemId);
                let cost = this.unlockButton.node.getChildByName("Background").getChildByName("cost");
                let itemPic:cc.Sprite = cost.getChildByName("itemPic").getComponent(cc.Sprite);
                SpriteManager.getInstance().setBundleSpriteFrameByName(itemPic, itemConfig.srcPath);
                let itemCountLabel:cc.Label = cost.getChildByName("itemCount").getComponent(cc.Label);
                itemCountLabel.string = item.itemCount + "";
            }
        }

    }

    /**
     * 使用角色
     * @param event 
     * @param customEventData 
     */
    public useGeneral(event,customEventData) {
        let generalId = Number(customEventData);

        if(!PlayerCacheCtrl.getInstance().getPlayerGeneralById(generalId)) {
            cc.log("失败，未拥有该角色");
            return;
        }

        // 获取当前使用的角色
        let currUseGeneralId = PlayerCacheCtrl.getInstance().getPlayerUseGeneral();
        if(generalId == currUseGeneralId) {
            cc.log("当前角色正在出战中");
            return;
        }
        
        AudioManager.getInstance().playCommonBtn();

        // 使用角色
        PlayerCacheCtrl.getInstance().playerUseGeneral(generalId);

        // 初始化角色列表
        this._initGeneralInfoList();

        // todo... 返回战斗
        this.node.active = false;

        // 通知主程序
        let mainCtrl:MainCtrl = this.node.parent.parent.getChildByName("main").getComponent(MainCtrl);
        if(mainCtrl) {
            mainCtrl.fightOverEvent(true);
        }

    }

    /**
     * 强化角色
     * @param event 
     * @param customEventData 
     */
    public levelUpGeneral(event,customEventData) {
        let generalId = Number(customEventData);
        let playerGeneralInfo = PlayerCacheCtrl.getInstance().getPlayerGeneralById(generalId);
        if(!playerGeneralInfo) {
            cc.log("失败，未拥有该角色");
            return;
        }

        // 是否已满级
        let hasNextLevel = GeneralConfig.hasNextLevel(playerGeneralInfo.level);
        if(!hasNextLevel) {
            TipCtrl.getInstance().tip(this.node, "该角色已满级");
            return;
        }

        // 经验是否达到
        let levelUpExp:number = GeneralConfig.getLevelUpExp(playerGeneralInfo.level);
        if(this._getGeneralExp() < levelUpExp ) {
            TipCtrl.getInstance().tip(this.node, "未满足条件");
            return;
        }
        
        AudioManager.getInstance().playLevelUp();

        // 升级
        playerGeneralInfo.level = playerGeneralInfo.level + 1;
        PlayerCacheCtrl.getInstance().costPlayerItem(Number(ItemConfig.ITEM_CONST.EXP), levelUpExp);
        PlayerCacheCtrl.getInstance().editPlayerGeneral(generalId, playerGeneralInfo);

        // 更新角色节点信息
        let playerUseGeneralId = PlayerCacheCtrl.getInstance().getPlayerUseGeneral();
        this._updateGeneralInfo(this._generalInfoList[generalId - 1],playerGeneralInfo,playerUseGeneralId == generalId);
        this.chooseGeneral(null,generalId);

        // 重新计算属性
        PlayerAttrCtrl.getInstance().calcPlayerAttr();

        this.flushInfo();
    }

    /**
     * 获得角色
     * @param event 
     * @param customEventData 
     */
    public unlockGeneral(event,customEventData) {
        let generalId = Number(customEventData);
        if(PlayerCacheCtrl.getInstance().getPlayerGeneralById(generalId)) {
            cc.log("失败，已拥有该角色");
            return;
        }

        // 检查是否能够获得该角色
        let generalConfig:GeneralBasic = GeneralConfig.getConfigById(generalId);
        let unlockCondition = generalConfig.unlockCondition; // 解锁条件

        let unlockFlag = UnlockManager.getInstance().unlock(unlockCondition.type,unlockCondition.content);
        if(!unlockFlag) { 
            // 条件不满足
            let unlockDesc = UnlockManager.getInstance().getUnlockDesc(unlockCondition.type,unlockCondition.content);
            TipCtrl.getInstance().tipWithColor(this.node, unlockDesc,"#ffffff");
            return;
        }
        
        AudioManager.getInstance().playCommonBtn();

        // 解锁了
        PlayerCacheCtrl.getInstance().playerGetGeneral(generalId);

        // 更新角色节点信息
        let playerGeneralInfo = PlayerCacheCtrl.getInstance().getPlayerGeneralById(generalId);
        this._updateGeneralInfo(this._generalInfoList[generalId - 1],playerGeneralInfo,false);
        this.chooseGeneral(null,generalId);

        // 重新计算属性
        PlayerAttrCtrl.getInstance().calcPlayerAttr();

        // 通知主程序
        let mainCtrl:MainCtrl = this.node.parent.parent.getChildByName("main").getComponent(MainCtrl);
        if(mainCtrl) {
            mainCtrl.flushInfo();
        }
    }


    /**
     * 获取角色经验
     */
    private _getGeneralExp() {
        return PlayerCacheCtrl.getInstance().getPlayerItemNum(Number(ItemConfig.ITEM_CONST.EXP));
    }

    /**
     * 获取角色经验
     * @param event 
     * @param customEventData 
     * @returns 
     */
    public getGeneralExpByAd(event, customEventData) {
        SdkCtrl.getInstance().ShowRewardedVideoAd(() => {
            let itemList = [
                {
                    itemId: Number(ItemConfig.ITEM_CONST.EXP),
                    itemCount: Number(customEventData) // todo..修改为配置
                }
            ]
            PlayerCacheCtrl.getInstance().addPlayerItemList(itemList);
            this.chooseGeneral(null, this._currSelectNodeName);
            this.node.parent.parent.getComponent(IndexCtrl).showReward("获得奖励",itemList);
            PlayerCacheCtrl.getInstance().calcPlayerDailyInfo(TaskConfig.DAILY_TASK_CONDITION_TYPE.AD, 1);
        })
    }


    /**
     * 切换角色动画
     * @param event 
     * @param customEventData 
     */
    public changeGeneralAnimation(event,customEventData) {
        if(this._currGeneralAnimation >= 3) {
            this._currGeneralAnimation = 1;
        }else {
            this._currGeneralAnimation += 1;
        }


        switch(this._currGeneralAnimation) {
            case 1: // 站立
                SpineUtil.getInstance().playSpineAni(this.chooseGeneralInfo.getChildByName("general").getComponent(sp.Skeleton),null,GeneralConfig.SPINE_ANIMATION_NAME.STAND,true,false);
                break;
            case 2: // 跑
                SpineUtil.getInstance().playSpineAni(this.chooseGeneralInfo.getChildByName("general").getComponent(sp.Skeleton),null,GeneralConfig.SPINE_ANIMATION_NAME.RUN,true,false);
                break;
            case 3: // 攻击
                SpineUtil.getInstance().playSpineAni(this.chooseGeneralInfo.getChildByName("general").getComponent(sp.Skeleton),null,GeneralConfig.SPINE_ANIMATION_NAME.ATK,true,false);
                break;
            default:
                break;
        }
    }   


    public flushInfo() {
        this.generalExpNode.getComponent(cc.Label).string = this._getGeneralExp() + "";
    }
}
