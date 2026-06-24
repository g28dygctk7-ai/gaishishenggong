import AttrLevelConfig from "../config/AttrLevelConfig";
import CallConfig, { GradeBasic } from "../config/CallConfig";
import ResPathKey from "../config/ResPathKey";
import SkillConfig, { SkillBasic, SkillGradeBasic } from "../config/SkillConfig";
import AudioManager from "../manager/AudioManager";
import SpriteManager from "../manager/SpriteManager";
import UnlockManager from "../manager/UnlockManager";
import ButtonUtil from "../utils/ButtonUtil";
import MathUtil from "../utils/MathUtil";
import MainCtrl from "./MainCtrl";
import PlayerAttrCtrl from "./PlayerAttrCtrl";
import PlayerCacheCtrl from "./PlayerCacheCtrl";
import TipCtrl from "./TipCtrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkillCtrl extends cc.Component {

    @property({ type: cc.Node, tooltip: '技能列表内容节点' })
    skillListContentNode: cc.Node = null;
    @property({ type: cc.Node, tooltip: '技能装备列表内容节点' })
    skillEquipListContentNode: cc.Node = null;

    @property({ type: cc.Prefab, tooltip: '技能预制体' })
    skillPrefab: cc.Prefab = null;
    @property({ type: cc.Prefab, tooltip: '技能装备预制体' })
    skillEquipPrefab: cc.Prefab = null;


    @property({ type: cc.Button, tooltip: '召唤技能按钮' })
    callButton: cc.Button = null;
    @property({ type: cc.Button, tooltip: '批量强化按钮' })
    batchLevelUpButton: cc.Button = null;

    @property({ type: cc.Node, tooltip: '详细信息节点' })
    skillDetailNode: cc.Node = null;

    @property({ type: cc.Label, tooltip: '拥有效果' })
    effectValLabel: cc.Label = null;

    @property({ type: cc.Node, tooltip: '强化结果内容节点' })
    levelUpResultContentNode: cc.Node = null;

    @property({ type: cc.Prefab, tooltip: '强化结果预制体' })
    levelUpResultPrefab: cc.Prefab = null;



    /**
     * 技能信息列表  {id/node}
     */
    private _skillInfoList = [];
    /**
     * 技能装备信息列表  {id/node}
     */
    private _skillEquipInfoList = [];

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    onEnable() {
        this._init();
    }

    start() {
    }


    private _init() {
        // 检查位置是否可以解锁
        this._checkSkillEquipPosUnlock();

        this._initSkillList();

        this._initSkillEquipList();

        // 更新拥有效果
        this._updateSkillAllEffect()
    }

    /**
     * 检查技能装备位置是否可以解锁
     */
    private _checkSkillEquipPosUnlock() {
        let playerSkillEquipInfoList = PlayerCacheCtrl.getInstance().getPlayerSkillEquipInfo();
        for(const posStr in playerSkillEquipInfoList) {
            let playerSkillEquipInfo = playerSkillEquipInfoList[posStr];
            let pos = Number(posStr);
            if(playerSkillEquipInfo.lockStatus == SkillConfig.EQUIP_POS_STATUS.LOCK) {
                    let unlockCondition = SkillConfig.getEquipPosUnlockCondition(pos);
                    let unlockFlag = UnlockManager.getInstance().unlock(unlockCondition.type, unlockCondition.content);
                    if(unlockFlag) {
                        playerSkillEquipInfo.lockStatus = SkillConfig.EQUIP_POS_STATUS.UNLOCK;
                        PlayerCacheCtrl.getInstance().editPlayerSkillEquipInfo(pos, playerSkillEquipInfo);
                    }
                }
        }
    }

    /**
     * 初始化技能列表
     */
    private _initSkillList() {
        this.skillListContentNode.removeAllChildren();
        this._skillInfoList = [];

        for (let i = 0; i < SkillConfig.CONFIG.length; i++) {
            let skillConfig: SkillBasic = SkillConfig.CONFIG[i];
            this._initSkill(skillConfig);
        }

        // 检查是否可以批量强化
        this._checkBatchLevelUp();
    }

    /**
     * 初始化技能信息
     * @param skillConfig 技能配置
     */
    private async _initSkill(skillConfig: SkillBasic) {
        let skill = cc.instantiate(this.skillPrefab);

        let skillInfo = {
            skillId: skillConfig.id,
            node: skill
        };
        this._skillInfoList.push(skillInfo);

        // 背景色
        let gradeConfig: GradeBasic = CallConfig.getGradeConfig(skillConfig.grade);
        SpriteManager.getInstance().setBundleSpriteFrameByName(skill.getComponent(cc.Sprite), gradeConfig.pic);

        // 图片
        SpriteManager.getInstance().setBundleSpriteFrameByName(skill.getChildByName("pic").getComponent(cc.Sprite), skillConfig.pic);

        // 点击事件
        ButtonUtil._setEvent(this.node, skill.getComponent(cc.Button), "SkillCtrl", "showDetailView", skillConfig.id + "");

        // 更新技能节点信息
        this._updateSkillNode(skillConfig.id, skill);

        skill.active = true;
        this.skillListContentNode.addChild(skill);
    }

    /**
    * 更新技能节点信息
    */
    private _updateAllSkillNode() {
        for (let i = 0; i < this._skillInfoList.length; i++) {
            let skillInfo = this._skillInfoList[i];
            this._updateSkillNode(skillInfo.skillId, skillInfo.node);
        }
    }

    /**
     * 更新技能节点信息
     * @param skillId 技能ID
     * @param skill 技能节点
     */
    private _updateSkillNode(skillId: number, skill: cc.Node) {
        let playerSkillInfo = PlayerCacheCtrl.getInstance().getPlayerSkillInfoById(skillId);

        let skillConfig:SkillBasic = SkillConfig.getConfigById(skillId);

        // 是否解锁
        let currExp = 0;
        let currLevel = 0;
        if (playerSkillInfo) { // 已解锁 隐藏锁 ，显示等级与装备功能
            skill.getChildByName("lock").active = false;
            skill.getChildByName("level").getComponent(cc.Label).string = "" + playerSkillInfo.level;
            skill.getChildByName("level").active = true;

            currExp = playerSkillInfo.exp;
            currLevel = playerSkillInfo.level;

            if(playerSkillInfo.equip == SkillConfig.EQUIP_STATUS_MENU.EQUIP) { // 已装备
                skill.getChildByName("equip").active = false;
                skill.getChildByName("equipTip").active = true;
            }else { // 未装备
                skill.getChildByName("equipTip").active = false;
                skill.getChildByName("equip").active = true;
                ButtonUtil._setEvent(this.node, skill.getChildByName("equip").getComponent(cc.Button), "SkillCtrl", "equipSkill", skillId + "");
            }
        } else { // 未解锁   显示锁 ，隐藏等级与装备功能
            skill.getChildByName("lock").active = true;
            skill.getChildByName("level").active = false;
            skill.getChildByName("equipTip").active = false;
            skill.getChildByName("equip").active = false;
        }

        // 经验进度条
        let expBar = skill.getChildByName("expProgress").getChildByName("bar").getComponent(cc.Sprite);
        if(currLevel >= skillConfig.levelConfig.length) { // 已满级
            expBar.fillRange = 1;
            skill.getChildByName("expProgress").getChildByName("num").getComponent(cc.Label).string = "已满级";
        }else { // 未满级
            let levelUpCostExp = SkillConfig.getLevelUpCost(currLevel);
            expBar.fillRange = currExp / levelUpCostExp;
            skill.getChildByName("expProgress").getChildByName("num").getComponent(cc.Label).string = currExp + "/" + levelUpCostExp;
        }
    }



    /**
    * 初始化技能装备列表
    */
    private _initSkillEquipList() {
        this.skillEquipListContentNode.removeAllChildren();
        this._skillEquipInfoList = [];

        let maxNum = SkillConfig.SKILL_EQUIP_MAX_NUM;
        for (let i = 0; i < maxNum; i++) {
            let pos = i + 1;
            this._initSkillEquip(pos);
        }
    }

    /**
     * 初始化技能装备信息
     * @param pos 技能装备位置
     */
    private _initSkillEquip(pos) {

        let skillEquip = cc.instantiate(this.skillEquipPrefab);
        let skillEquipInfo = {
            pos : pos,
            node : skillEquip
        }
        this._skillEquipInfoList.push(skillEquipInfo);

        this._updateSkillEquipNode(pos, skillEquip);

        skillEquip.active = true;
        this.skillEquipListContentNode.addChild(skillEquip);
    }

    /**
    * 更新技能总拥有效果
    */
     private _updateSkillAllEffect() {
        let playerSkillInfoList = PlayerCacheCtrl.getInstance().getPlayerSkillInfo();
        if(playerSkillInfoList == null) {
            return;
        }

        let totalEffect = 0;
        for(const skillIdStr in playerSkillInfoList) {
            let playerSkillInfo = playerSkillInfoList[skillIdStr];
            let currLevel = playerSkillInfo.level;
            // 技能等级配置
            let skillLevelConfig = SkillConfig.getLevelConfig(Number(skillIdStr), currLevel);
            totalEffect += skillLevelConfig.addRate;
        }

        this.effectValLabel.string = "攻击力+" + MathUtil.parsePctPlus(totalEffect);

    }

    /**
    * 更新技能装备节点信息
    */
    private _updateAllSkillEquipNode() {
        for (let i = 0; i < this._skillEquipInfoList.length; i++) {
            let skillEquipInfo = this._skillEquipInfoList[i];
            this._updateSkillEquipNode(skillEquipInfo.pos, skillEquipInfo.node);
        }
    }

    /**
     * 更新技能装备节点信息
     */
    private _updateSkillEquipNode(pos, skillEquip:cc.Node) {
        let playerSkillEquipInfo = PlayerCacheCtrl.getInstance().getPlayerSkillEquipInfoByPos(pos);

        if(playerSkillEquipInfo.lockStatus == SkillConfig.EQUIP_POS_STATUS.UNLOCK) { // 位置已解锁
            // 是否已经装备
            if(playerSkillEquipInfo.skillId != null) { // 已装备
                let skillId = playerSkillEquipInfo.skillId;
                skillEquip.getChildByName("lock").active = false;
                skillEquip.getChildByName("pic").active = true;
                skillEquip.getChildByName("level").active = true;
                skillEquip.getChildByName("cancelEquip").active = true;
                // 解除装备
                ButtonUtil._setEvent(this.node, skillEquip.getChildByName("cancelEquip").getComponent(cc.Button) ,"SkillCtrl", "notEquipSkill", skillId + "");

                let skillConfig:SkillBasic = SkillConfig.getConfigById(skillId);
                let gradeConfig: GradeBasic = CallConfig.getGradeConfig(skillConfig.grade);
                // 背景
                SpriteManager.getInstance().setBundleSpriteFrameByName(skillEquip.getComponent(cc.Sprite), gradeConfig.pic);
                // 图片
                SpriteManager.getInstance().setBundleSpriteFrameByName(skillEquip.getChildByName("pic").getComponent(cc.Sprite), skillConfig.pic);
                // 等级
                let playerSkillInfo = PlayerCacheCtrl.getInstance().getPlayerSkillInfoById(skillId);
                skillEquip.getChildByName("level").getComponent(cc.Label).string = playerSkillInfo.level;
                
                // 点击事件
                ButtonUtil._setEvent(this.node, skillEquip.getComponent(cc.Button), "SkillCtrl", "showDetailView", skillConfig.id + "");
            }else { // 未装备
                skillEquip.getChildByName("pic").active = false;
                skillEquip.getChildByName("level").active = false;
                skillEquip.getChildByName("cancelEquip").active = false;
                skillEquip.getChildByName("lock").active = false;
                SpriteManager.getInstance().setBundleSpriteFrameByName(skillEquip.getComponent(cc.Sprite), ResPathKey.BOX_EQUIP);
                ButtonUtil._delEvent(skillEquip.getComponent(cc.Button));
            }
        }else { // 位置未解锁
            skillEquip.getChildByName("pic").active = false;
            skillEquip.getChildByName("level").active = false;
            skillEquip.getChildByName("cancelEquip").active = false;
            skillEquip.getChildByName("lock").active = true;
            
            SpriteManager.getInstance().setBundleSpriteFrameByName(skillEquip.getComponent(cc.Sprite), ResPathKey.BOX_DISABLED);
            ButtonUtil._setEvent(this.node, skillEquip.getComponent(cc.Button), "SkillCtrl", "showUnlockTip", pos + "");
        }

    }

    /**
     * 是否可以批量强化（至少有一个技能满足强化条件）
     */
    private _checkBatchLevelUp() {
        let playerSkillInfoList = PlayerCacheCtrl.getInstance().getPlayerSkillInfo();
        if (playerSkillInfoList == null) {
            return;
        }

        let enoughConditionNum = 0; // 满足强化条件的数量
        for (const skillIdStr in playerSkillInfoList) {
            let skillId = Number(skillIdStr);
            if (this._checkLevelUp(SkillConfig.getConfigById(skillId), PlayerCacheCtrl.getInstance().getPlayerSkillInfoById(skillId))) {
                enoughConditionNum += 1;
            }
        }

        if (enoughConditionNum > 0) { // 满足批量强化条件
            this.batchLevelUpButton.interactable = true;
        } else { // 未满足批量强化条件
            this.batchLevelUpButton.interactable = false;
        }
    }

    /**
     * 是否可以强化
     */
    private _checkLevelUp(skillConfig, playerSkillInfo): boolean {
        if (skillConfig == null || playerSkillInfo == null) {
            return false;
        }

        if (playerSkillInfo.level + 1 > skillConfig.levelConfig.length) {
            return;
        }

        let levelUpCost = SkillConfig.getLevelUpCost(playerSkillInfo.level);
        if (playerSkillInfo.exp < levelUpCost) {
            return;
        }

        return true;
    }

    /**
     * 
     * @param event 
     * @param customerData 
     */
    public ad(event, customerData) {
        let skillId = Number(customerData);
        let playerSkillInfo = PlayerCacheCtrl.getInstance().getPlayerSkillInfoById(skillId);
        if (playerSkillInfo == null) {
            PlayerCacheCtrl.getInstance().playerGetSkill(skillId);
        }

        // 更新节点信息
        this._updateAllSkillNode();

        // 更新技能装备信息
        this._updateAllSkillEquipNode();
        
        // 更新拥有效果
        this._updateSkillAllEffect()
    }

    /**
     * 批量强化 (循环升级)
     */
    public batchLevelUp(event, customerData) {
        let playerSkillInfoList = PlayerCacheCtrl.getInstance().getPlayerSkillInfo();
        if (playerSkillInfoList == null) {
            return;
        }

        let levelUpResultList = [];
        for (const skillIdStr in playerSkillInfoList) {
            let skillId = Number(skillIdStr);
            let levelUpResult = this.levelUp(null, skillId, true);

            if(levelUpResult != null) {
                levelUpResultList.push(levelUpResult);
            }
        }
        
        AudioManager.getInstance().playLevelUp();

        // 更新拥有效果
        this._updateSkillAllEffect()

        this._checkBatchLevelUp();

        // 展示升级结果
        this.showLevelUpResult(levelUpResultList);
    }

    /**
     * 指定强化
     * @param skillId 技能ID
     * @param loop 循环升级,默认false
     */
    public levelUp(event, skillId: number, loop: boolean = false) {
        let isDetailViewLevelUp = typeof(skillId) == "string";
        let skillConfig: SkillBasic = SkillConfig.getConfigById(Number(skillId));
        if (skillConfig == null) {
            return;
        }

        let playerSkillInfo = PlayerCacheCtrl.getInstance().getPlayerSkillInfoById(skillId);
        if (playerSkillInfo == null) {
            cc.log("未拥有该技能");
            return;
        }

        if (!this._checkLevelUp(skillConfig, playerSkillInfo)) {
            cc.log("不满足强化条件");
            return;
        }

        let startLevel = playerSkillInfo.level; // 开始升级前的等级

        let levelUpCost = SkillConfig.getLevelUpCost(playerSkillInfo.level);
        playerSkillInfo.level += 1;
        playerSkillInfo.exp -= levelUpCost;
        PlayerCacheCtrl.getInstance().editPlayerSkillInfo(skillId, playerSkillInfo);

        // 循环升级
        if (loop) {
            this.levelUp(event, skillId, loop);
        }else {
            AudioManager.getInstance().playLevelUp();
        }

        // 如果是详细界面中的强化，需要更新详细界面信息
        if(isDetailViewLevelUp) {
            this.showDetailView(null, Number(skillId));
        }

        // 更新技能信息
        this._updateAllSkillNode();

        // 更新技能装备信息
        this._updateAllSkillEquipNode();

        // 更新玩家属性
        PlayerAttrCtrl.getInstance().calcPlayerAttr();
        let mainCtrl:MainCtrl = this.node.parent.parent.getChildByName("main").getComponent(MainCtrl);
        if(mainCtrl) {
            mainCtrl.loadGeneralAttr();
        }

        return {skillId : skillId , startLevel: startLevel, endLevel: PlayerCacheCtrl.getInstance().getPlayerSkillInfoById(skillId).level};
    }

    /**
     * 关闭界面
     */
    public close() {
        AudioManager.getInstance().playCommonBtn();
        this.node.active = false;
    }

    /**
     * 展示详细信息
     * @param event 
     * @param customerData 
     */
    public showDetailView(event, customerData) {
        if (customerData == null) {
            return;
        }

        let skillId = Number(customerData);
        let skillConfig: SkillBasic = SkillConfig.getConfigById(skillId);
        if (skillConfig == null) {
            return;
        }

        AudioManager.getInstance().playCommonBtn();

        let playerSkillInfo = PlayerCacheCtrl.getInstance().getPlayerSkillInfoById(skillId);

        let detailViewNode: cc.Node = this.skillDetailNode.getChildByName("detailView");

        // 名称
        detailViewNode.getChildByName("name").getComponent(cc.Label).string = skillConfig.name;
        // 品阶
        let gradeConfig: GradeBasic = CallConfig.getGradeConfig(skillConfig.grade);
        detailViewNode.getChildByName("grade").getComponent(cc.Label).string = gradeConfig.name;
        detailViewNode.getChildByName("grade").color = new cc.Color().fromHEX(gradeConfig.color);
        // 图片
        SpriteManager.getInstance().setBundleSpriteFrameByName(detailViewNode.getChildByName("picBg").getComponent(cc.Sprite), gradeConfig.pic);
        SpriteManager.getInstance().setBundleSpriteFrameByName(detailViewNode.getChildByName("picBg").getChildByName("pic").getComponent(cc.Sprite), skillConfig.pic);

        let currLevel = 0;
        let currExp = 0;

        if (playerSkillInfo == null) { // 显示锁
            detailViewNode.getChildByName("lock").active = true;
        } else { // 隐藏锁
            detailViewNode.getChildByName("lock").active = false;
            currLevel = playerSkillInfo.level;
            currExp = playerSkillInfo.exp;
        }

        // 等级
        detailViewNode.getChildByName("levelInfo").getChildByName("levelBg").getChildByName("level").getComponent(cc.Label).string = "等级" + currLevel;

        // 经验进度条
        let expBar = detailViewNode.getChildByName("levelInfo").getChildByName("exp").getChildByName("bar").getComponent(cc.Sprite);
        if(currLevel >= skillConfig.levelConfig.length) { // 已满级
            expBar.fillRange = 1;
            detailViewNode.getChildByName("levelInfo").getChildByName("exp").getChildByName("num").getComponent(cc.Label).string = "已满级";
        }else { // 未满级
            let levelUpCostExp = SkillConfig.getLevelUpCost(currLevel);
            expBar.fillRange = currExp / levelUpCostExp;
            detailViewNode.getChildByName("levelInfo").getChildByName("exp").getChildByName("num").getComponent(cc.Label).string = currExp + "/" + levelUpCostExp;
        }

        // 技能等级配置
        let skillLevelConfig = SkillConfig.getLevelConfig(skillId, currLevel);

        // 介绍
        let desc = skillConfig.desc;
        desc = desc.replace(SkillConfig.FORMAT_KEY.NUM, skillLevelConfig.num + "");
        desc = desc.replace(SkillConfig.FORMAT_KEY.ATKRATE, MathUtil.parsePctPlus(skillLevelConfig.skillAttrRate));
        detailViewNode.getChildByName("descView").getChildByName("desc").getComponent(cc.Label).string = desc;

        // 冷却时间
        detailViewNode.getChildByName("descView").getChildByName("cdInfo").getChildByName("cdTime").getComponent(cc.Label).string = skillLevelConfig.cdTime + "秒";

        // 拥有效果
        detailViewNode.getChildByName("descView").getChildByName("effectBg").getChildByName("attrName").getComponent(cc.Label).string = AttrLevelConfig.getConfigById(skillLevelConfig.addAttrKey).name;
        detailViewNode.getChildByName("descView").getChildByName("effectBg").getChildByName("attrVal").getComponent(cc.Label).string = "+" + MathUtil.parsePctPlus(skillLevelConfig.addRate);

        // 是否能够强化
        let levelUpFlag = this._checkLevelUp(skillConfig, playerSkillInfo);
        if (levelUpFlag) {
            cc.log("可以强化....");
            ButtonUtil._setEvent(this.node, detailViewNode.getChildByName("button").getChildByName("levelUp").getComponent(cc.Button) ,"SkillCtrl", "levelUp", skillId + "");
            detailViewNode.getChildByName("button").getChildByName("levelUp").getComponent(cc.Button).interactable = true;
        } else {
            detailViewNode.getChildByName("button").getChildByName("levelUp").getComponent(cc.Button).interactable = false;
        }

        // 是否能够装备
        let equipButton:cc.Button = detailViewNode.getChildByName("button").getChildByName("equip").getComponent(cc.Button);
        let equipButtonLabel:cc.Label = equipButton.node.getChildByName("Background").getChildByName("Label").getComponent(cc.Label);
        if (skillConfig == null || playerSkillInfo == null) { // 没有该技能
            detailViewNode.getChildByName("button").getChildByName("equip").getComponent(cc.Button).interactable = false;
            equipButtonLabel.string = "装备";
        }else if (playerSkillInfo.equip == SkillConfig.EQUIP_STATUS_MENU.EQUIP) { // 有该技能，但是已经装备了
            equipButtonLabel.string = "解除";
            detailViewNode.getChildByName("button").getChildByName("equip").getComponent(cc.Button).interactable = true;
            // 解除装备事件
            ButtonUtil._setEvent(this.node, equipButton ,"SkillCtrl", "notEquipSkill", skillConfig.id + "");

        }else { // 可以装备
            equipButtonLabel.string = "装备";
            detailViewNode.getChildByName("button").getChildByName("equip").getComponent(cc.Button).interactable = true;
            // 装备事件
            ButtonUtil._setEvent(this.node, equipButton, "SkillCtrl", "equipSkill", skillConfig.id + "");
        }

        this.skillDetailNode.active = true;
    }
    
    /**
     * 解锁提示
     * @param event 
     * @param customerData 
     */
    public showUnlockTip(event, customerData) {
        let pos = Number(customerData);
        let unlockCondition = SkillConfig.getEquipPosUnlockCondition(pos);
        let desc = UnlockManager.getInstance().getUnlockDesc(unlockCondition.type, unlockCondition.content);
        TipCtrl.getInstance().tipWithColor(this.node,desc,"#ffffff");
    }

    /**
     * 装备技能
     * @param event 
     * @param customerData 
     */
    public equipSkill(event , customerData) {
        cc.log("equipSkill...", customerData);
        // 是否有空闲的有效位置
        let freePos = 0;
        let playerSkillEquipInfoList = PlayerCacheCtrl.getInstance().getPlayerSkillEquipInfo();
        if(playerSkillEquipInfoList == null) {
            return;
        }

        for(const posStr in playerSkillEquipInfoList) {
            let playerSkillEquipInfo = playerSkillEquipInfoList[posStr];
            if(playerSkillEquipInfo.lockStatus == SkillConfig.EQUIP_POS_STATUS.UNLOCK &&
                playerSkillEquipInfo.skillId == null) {
                    freePos = playerSkillEquipInfo.pos;
                    break;
                }
        }
        cc.log("空闲技能装备位置：",freePos);

        if(freePos == 0) {
            TipCtrl.getInstance().tipWithColor(this.node, "当前没有空闲位置可以装备", "#ffffff");
            return;
        }

        AudioManager.getInstance().playCommonBtn();
        
        // 装备技能
        let skillId = Number(customerData);
        let playerSkillEquipInfo = PlayerCacheCtrl.getInstance().getPlayerSkillEquipInfoByPos(freePos);
        playerSkillEquipInfo.skillId = skillId;
        PlayerCacheCtrl.getInstance().editPlayerSkillEquipInfo(freePos, playerSkillEquipInfo);
        let playerSkillInfo = PlayerCacheCtrl.getInstance().getPlayerSkillInfoById(skillId);
        playerSkillInfo.equip = SkillConfig.EQUIP_STATUS_MENU.EQUIP;
        PlayerCacheCtrl.getInstance().editPlayerSkillInfo(skillId, playerSkillInfo);

        this.closeDetailView();

        // 更新技能信息
        this._updateAllSkillNode();
        // 更新技能装备信息
        this._updateAllSkillEquipNode();
        // 更新拥有效果
        this._updateSkillAllEffect()
    }

    /**
     * 解除装备
     * @param event 
     * @param customerData 
     */
    public notEquipSkill(event , customerData) {
        cc.log("notEquipSkill..", customerData);

        let skillId = Number(customerData);
        let playerSkillInfo = PlayerCacheCtrl.getInstance().getPlayerSkillInfoById(skillId);
        if(playerSkillInfo == null || playerSkillInfo.equip == SkillConfig.EQUIP_STATUS_MENU.UN_EQUIP) {
            return;
        }

        AudioManager.getInstance().playCommonBtn();

        playerSkillInfo.equip = SkillConfig.EQUIP_STATUS_MENU.UN_EQUIP;
        PlayerCacheCtrl.getInstance().editPlayerSkillInfo(skillId, playerSkillInfo);

        let playerSkillEquipInfoList = PlayerCacheCtrl.getInstance().getPlayerSkillEquipInfo();
        for(const posStr in playerSkillEquipInfoList) {
            let playerSkillEquipInfo = playerSkillEquipInfoList[posStr];
            if(playerSkillEquipInfo.lockStatus == SkillConfig.EQUIP_POS_STATUS.UNLOCK &&
                playerSkillEquipInfo.skillId == skillId) {
                    playerSkillEquipInfo.skillId = null;
                    PlayerCacheCtrl.getInstance().editPlayerSkillEquipInfo(Number(posStr), playerSkillEquipInfo);
                    break;
            }
        }
        

        this.closeDetailView();

        // 更新技能信息
        this._updateAllSkillNode();
        // 更新技能装备信息
        this._updateAllSkillEquipNode();
        // 更新拥有效果
        this._updateSkillAllEffect()
    }

    /**
     * 关闭详细信息
     */
    public closeDetailView() {
        AudioManager.getInstance().playCommonBtn();
        this.skillDetailNode.active = false;
    }

    /**
     * 跳转召唤功能
     */
     public toCallFunction() {
        AudioManager.getInstance().playCommonBtn();

        this.node.active = false;
        this.node.parent.getChildByName("call").active = true;
    }

    /**
     * 展示强化结果
     * @param levelUpResultList 升级结果信息列表
     */
    private showLevelUpResult(levelUpResultList) {
        cc.log("showLevelUpResult -> levelUpResult",levelUpResultList);
        if(levelUpResultList == null || levelUpResultList.length <= 0) {
            return;
        }


        this.levelUpResultContentNode.removeAllChildren();

        for(let i = 0; i < levelUpResultList.length; i++) {
            let levelUpResultInfo = levelUpResultList[i];
            let skillId = levelUpResultInfo.skillId;
            let startLevel = levelUpResultInfo.startLevel;
            let endLevel = levelUpResultInfo.endLevel;

            let skillConfig:SkillBasic = SkillConfig.getConfigById(skillId);
            let gradeConfig:GradeBasic = CallConfig.getGradeConfig(skillConfig.grade);
            let levelUpResultNode = cc.instantiate(this.levelUpResultPrefab);
            SpriteManager.getInstance().setBundleSpriteFrameByName(levelUpResultNode.getComponent(cc.Sprite), gradeConfig.pic);
            SpriteManager.getInstance().setBundleSpriteFrameByName(levelUpResultNode.getChildByName("pic").getComponent(cc.Sprite), skillConfig.pic);
            levelUpResultNode.getChildByName("levelInfo").getChildByName("leftLevel").getComponent(cc.Label).string = startLevel + "";
            levelUpResultNode.getChildByName("levelInfo").getChildByName("rightLevel").getComponent(cc.Label).string = endLevel + "";
            levelUpResultNode.active = true;
            this.levelUpResultContentNode.addChild(levelUpResultNode);
        }

        this.node.getChildByName("levelUpDetail").active = true;
    }

    /**
     * 关闭强化结果
     */
    public closeLevelUpResult() {
        this.node.getChildByName("levelUpDetail").active = false;
    }
}
