import CallConfig, { CallBasic, CallLevelBasic, CallTypeBasic, GradeBasic } from "../config/CallConfig";
import ItemConfig from "../config/ItemConfig";
import PetConfig, { PetBasic } from "../config/PetConfig";
import ResPathKey from "../config/ResPathKey";
import SkillConfig, { SkillBasic } from "../config/SkillConfig";
import TaskConfig from "../config/TaskConfig";
import AudioManager from "../manager/AudioManager";
import SpriteManager from "../manager/SpriteManager";
import ButtonUtil from "../utils/ButtonUtil";
import MathUtil from "../utils/MathUtil";
import RandomUtil from "../utils/RandomUtil";
import TxtUtil from "../utils/TxtUtil";
import SdkCtrl from "../utils/WxSdkUtil";
import CallFunctionCtrl from "./call/CallFunctionCtrl";
import IndexCtrl from "./IndexCtrl";
import PlayerCacheCtrl from "./PlayerCacheCtrl";
import TipCtrl from "./TipCtrl";
//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
//网页客服 http://web3incubators.com/kefu.html
const { ccclass, property } = cc._decorator;

@ccclass
export default class CallCtrl extends cc.Component {
    @property({type:cc.Node,tooltip:'召唤功能内容节点'})
    callInfoContentNode:cc.Node = null;

     @property({type:cc.Prefab,tooltip:'召唤信息预制体'})
    callInfoPrefab:cc.Prefab = null;

    @property({type:cc.Node,tooltip:'召唤概率内容节点'})
    gradeOddsContentNode:cc.Node = null;

    @property({type:cc.Prefab,tooltip:'品阶概率预制体'})
    gradeOddsPrefab:cc.Prefab = null;

    @property({type:cc.Label,tooltip:'钻石数量'})
    diamondNumLabel:cc.Label = null;

    @property({type:cc.Node,tooltip:'召唤结果内容节点'})
    callResultContentNode:cc.Node = null;

    @property({type:cc.Prefab,tooltip:'品阶结果预制体'})
    callResultPrefab:cc.Prefab = null;


    /**
     * 当前使用的召唤功能ID
     */
    private _currCallId = 0;

    /**
     * 当前展示的召唤功能ID
     */
    private _currShowOddsCallId = 0;

    /**
     * 当前展示的召唤功能等级
     */
    private _currShowOddsCallLevel = 0;


    /**
     * 召唤功能信息列表
     */
    private _callInfoList = [];

    onLoad() {

    }

    onEnable() {
        this._init();
    }

    /**
     * 初始化
     */
    private _init() {
        this.flushDiamondNum();
        this._initCallInfoList();
    }

    /**
     * 初始化召唤信息列表
     */
    private _initCallInfoList() {
        this.callInfoContentNode.removeAllChildren();
        for(let i = 0; i < CallConfig.CONFIG.length; i++) {
            let callConfig:CallBasic = CallConfig.CONFIG[i];
            if(callConfig.openStatus) {
                this._initCallInfo(callConfig);
            }
        }
    }

    /**
     * 初始化召唤信息
     * @param callConfig 召唤功能配置
     */
    private _initCallInfo(callConfig:CallBasic) {
        let callInfo = cc.instantiate(this.callInfoPrefab);
        let _callInfo = {
            id: callConfig.id,
            node: callInfo
        }
        this._callInfoList.push(_callInfo);
        callInfo.getComponent(CallFunctionCtrl).init(this.node,callConfig);
        this.callInfoContentNode.addChild(callInfo);
    }

    start() {

    }

    /**
     * 左
     */
    public leftCallLevelOdds() {
        if(this._currShowOddsCallLevel <= 1) {
            return;
        }
        this.showOddsView(this._currShowOddsCallId, this._currShowOddsCallLevel - 1);
    }

    /**
     * 右
     */
    public rightCallLevelOdds() {
        if(this._currShowOddsCallLevel >= CallConfig.CALL_LEVEL_CONFIG.length) {
            return;
        }
        this.showOddsView(this._currShowOddsCallId, this._currShowOddsCallLevel + 1);
    }

    /**
     * 查看召唤概率
     * @param callId 召唤功能ID
     * @param callLevel 召唤等级
     */
    public showOddsView(callId:number, callLevel:number = null) {
        AudioManager.getInstance().playCommonBtn();

        this._currShowOddsCallId = callId;
        this.gradeOddsContentNode.removeAllChildren();
        let viewNode:cc.Node = this.node.getChildByName("oddsView").getChildByName("view");
        if(callLevel == null) {
            let playerCallInfo = PlayerCacheCtrl.getInstance().getPlayerCallInfo(callId);
            callLevel = playerCallInfo.level;
        }
        this._currShowOddsCallLevel = callLevel;

        viewNode.getChildByName("leftButton").active = true;
        viewNode.getChildByName("rightButton").active = true;
        if(this._currShowOddsCallLevel <= 1) {
            viewNode.getChildByName("leftButton").active = false;
        }else if(this._currShowOddsCallLevel >= CallConfig.CALL_LEVEL_CONFIG.length) {
            viewNode.getChildByName("rightButton").active = false;
        }

        // 品阶等级
        viewNode.getChildByName("callLevel").getChildByName("level").getComponent(cc.Label).string = "" + callLevel;

        let callLevelConfig:CallLevelBasic = CallConfig.getCallLevelConfig(callLevel);
        // 渲染品阶的概率
        let oddsList = callLevelConfig.oddsList;
        for(let i = 0; i < oddsList.length; i++) {
            let odd = oddsList[i];
            let gradeConfig:GradeBasic = CallConfig.getGradeConfig(i + 1);
            
            let gradeOdds = cc.instantiate(this.gradeOddsPrefab);
            SpriteManager.getInstance().setBundleSpriteFrameByName(gradeOdds.getChildByName("colorBox").getComponent(cc.Sprite), gradeConfig.pic);
            let nameLabel:cc.Label = gradeOdds.getChildByName("gradeName").getComponent(cc.Label);
            let oddsLabel:cc.Label = gradeOdds.getChildByName("odds").getComponent(cc.Label);
            nameLabel.node.color = new cc.Color().fromHEX(gradeConfig.color);
            nameLabel.string = gradeConfig.name;
            oddsLabel.node.color = new cc.Color().fromHEX(gradeConfig.color);
            oddsLabel.string = MathUtil.parsePct(odd);

            gradeOdds.active = true;
            this.gradeOddsContentNode.addChild(gradeOdds);
        }

        this.node.getChildByName("oddsView").active = true;
    }

    /**
     * 
     * @param event 
     * @param customerData 
     */
    public closeOddsView(event , customerData) {
        AudioManager.getInstance().playCommonBtn();
        this.node.getChildByName("oddsView").active = false;
    }


    /**
     * 召唤
     * @param event 召唤功能ID
     * @param customerData callId_callType
     */
    public call(event, customerData) {
        let idAndType = String(customerData).split("_");
        let callId = Number(idAndType[0]);
        let type = Number(idAndType[1]);
        if(type == 3) { 
            SdkCtrl.getInstance().ShowRewardedVideoAd(() => {
                this._execCall(callId, 5); // 广告召唤-5次
                PlayerCacheCtrl.getInstance().calcPlayerDailyInfo(TaskConfig.DAILY_TASK_CONDITION_TYPE.AD, 1);
            });
        }else {
            // 召唤类型配置
            let callTypeConfig:CallTypeBasic = CallConfig.getCallTypeConfig(type);
            let costItem = {
                itemId: callTypeConfig.itemId,
                itemCount : callTypeConfig.itemCount
            };

            // 检查资源
            let checkFlag =  PlayerCacheCtrl.getInstance().checkPlayerItem([costItem]);
            if(!checkFlag) {
                return;
            }

            // 扣除资源
            let costFlag = PlayerCacheCtrl.getInstance().costPlayerItem(costItem.itemId,costItem.itemCount);
            if(!costFlag) {
                return;
            }
        
            // 执行召唤
            this._execCall(callId, callTypeConfig.count);
        }

        this.flushDiamondNum();

        // 召唤按钮
        let buttonNode = this.node.getChildByName("callResultView").getChildByName("view").getChildByName("button");
        let singleButton = buttonNode.getChildByName("single").getComponent(cc.Button);
        this._dealCallButton(callId, singleButton, 1);
        let multipleButton = buttonNode.getChildByName("multiple").getComponent(cc.Button);
        this._dealCallButton(callId, multipleButton, 2);
    }

    /**
     * 处理召唤按钮
     * @param type 召唤类型
     */
     private _dealCallButton(callId:number,button:cc.Button,type:number) {
        let callTypeConfig:CallTypeBasic = CallConfig.getCallTypeConfig(type);
        let flag =  PlayerCacheCtrl.getInstance().checkPlayerItem([{itemId:callTypeConfig.itemId,itemCount:callTypeConfig.itemCount}]);
        if(flag) {
            let customerData = callId + "_" + type;
            ButtonUtil._setEvent(this.node, button,"CallCtrl","call", customerData);
            button.interactable = true;
        }else {
            button.interactable = false;
        }

        button.node.getChildByName("Background").getChildByName("cost").getChildByName("itemCount").getComponent(cc.Label).string = callTypeConfig.itemCount + "";
        button.node.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = callTypeConfig.name;
    }

    /**
     * 执行召唤
     * @param callId 召唤Id 
     * @param count 召唤次数
     */
    private _execCall(callId:number, count:number) {
        
        AudioManager.getInstance().playCall();

        // 获取玩家当前召唤等级 - 召唤各品阶的概率
        let playerCallInfo = PlayerCacheCtrl.getInstance().getPlayerCallInfo(callId);
        let callLevel = playerCallInfo.level;

        let callLevelConfig:CallLevelBasic = CallConfig.getCallLevelConfig(callLevel);
        let oddsList = callLevelConfig.oddsList;

        let gradeOddsList = [];
        for(let i = 0;i < oddsList.length; i++) {
            gradeOddsList.push({
                grade: i + 1,
                weight: oddsList[i]
            });
        }

        // 结果
        let resultIdList = [];
        
        // 循环召唤次数
        for(let i = 0; i < count; i++) {
            // 根据概率权重获取抽取到的品阶
            let gradeOdd = RandomUtil.RandomByWeight(gradeOddsList);
            let grade = gradeOdd.grade;

            // 找出该功能该品阶的所有配置
            let idList = [];
            if(callId == CallConfig.CALL_FUNCTION.SKILL) {
                idList = SkillConfig.getConfigByGrade(grade);
            }else if(callId == CallConfig.CALL_FUNCTION.PET) {
                idList = PetConfig.getConfigByGrade(grade);
            }

            if(idList.length == 0) {
                continue;
            }

            let id = idList[RandomUtil.getRandom(0,idList.length)];
            resultIdList.push(id);
        }

        if(resultIdList.length == 0) {
            return;
        }

        // 处理召唤结果
        this.node.getChildByName("callResultView").getChildByName("view").getChildByName("button").active = false;
        this.callResultContentNode.removeAllChildren();

        for(let i = 0; i < resultIdList.length;i++) {
            let id = resultIdList[i];
            this.scheduleOnce(() => {
                let callResult = cc.instantiate(this.callResultPrefab);
                let pic:string = null;
                let gradeConfig:GradeBasic = null;
                if(callId == CallConfig.CALL_FUNCTION.SKILL) { 
                    let skillConfig:SkillBasic = SkillConfig.getConfigById(id);
                    pic = skillConfig.pic;
                    gradeConfig = CallConfig.getGradeConfig(skillConfig.grade);
                }else if(callId == CallConfig.CALL_FUNCTION.PET) {
                    let petConfig:PetBasic = PetConfig.getConfigById(id);
                    pic = petConfig.pic;
                    gradeConfig = CallConfig.getGradeConfig(petConfig.grade);
                }
                SpriteManager.getInstance().setBundleSpriteFrameByName(callResult.getComponent(cc.Sprite), gradeConfig.pic);
                SpriteManager.getInstance().setBundleSpriteFrameByName(callResult.getChildByName("pic").getComponent(cc.Sprite), pic);
                callResult.active = true;
                this.callResultContentNode.addChild(callResult);
                // 最后一个
                if(i == resultIdList.length - 1) {
                    this.node.getChildByName("callResultView").getChildByName("view").getChildByName("button").active = true;
                }
            }, i  * 0.06);
           
        }

        this.node.getChildByName("callResultView").active = true;

        // 处理召唤出来的技能/宠物，增加对应的经验值
        if(callId == CallConfig.CALL_FUNCTION.SKILL) {
            this.gainSkill(resultIdList);
        }else if(callId == CallConfig.CALL_FUNCTION.PET) {
            this.gainPet(resultIdList);
        }

        // 记录召唤次数
        PlayerCacheCtrl.getInstance().calcPlayerDailyInfo(TaskConfig.DAILY_TASK_CONDITION_TYPE.CALL, count);

        // 增加召唤经验
        this.addCallExp(playerCallInfo, count);

    }

    /**
     * 获取技能列表
     * @param idList 技能列表
     */
    private gainSkill(idList) {
        if(idList == null || idList.length == 0) {
            return;
        }
        for(let i = 0; i < idList.length; i++) {
            let skillId = idList[i];
            let playerSkillInfo = PlayerCacheCtrl.getInstance().getPlayerSkillInfoById(skillId);
            if(playerSkillInfo == null) {
                PlayerCacheCtrl.getInstance().playerGetSkill(skillId);
            }else {
                playerSkillInfo.exp += 1;
                PlayerCacheCtrl.getInstance().editPlayerSkillInfo(skillId, playerSkillInfo);
            }
        }
    }

    /**
     * 获取宠物列表
     * @param idList 宠物列表
     */
     private gainPet(idList) {
        if(idList == null || idList.length == 0) {
            return;
        }
        for(let i = 0; i < idList.length; i++) {
            let petId = idList[i];
            let playerPetInfo = PlayerCacheCtrl.getInstance().getPlayerPetInfoById(petId);
            if(playerPetInfo == null) {
                PlayerCacheCtrl.getInstance().playerGetPet(petId);
            }else {
                playerPetInfo.exp += 1;
                PlayerCacheCtrl.getInstance().editPlayerPetInfo(petId, playerPetInfo);
            }
        }
    }

    /**
     * 增加召唤经验
     * @param playerCallInfo 玩家召唤信息
     * @param exp 召唤经验
     */
    private addCallExp(playerCallInfo, exp:number) {
        // 处理玩家召唤功能等级与经验值
        playerCallInfo.exp += exp;
        this.callLevelUp(playerCallInfo);
        PlayerCacheCtrl.getInstance().setPlayerCallInfo(playerCallInfo.id, playerCallInfo);
    }

    /**
     * 召唤功能升级
     */
    private callLevelUp(playerCallInfo) {
        if(playerCallInfo.level < CallConfig.CALL_LEVEL_CONFIG.length) { // 非满级
            // 是否可以升级
            let nextLevelConfig = CallConfig.getCallLevelConfig(playerCallInfo.level + 1);
            if(playerCallInfo.exp >= nextLevelConfig.levelUpExp) {
                playerCallInfo.exp -= nextLevelConfig.levelUpExp;
                playerCallInfo.level += 1;
                this.callLevelUp(playerCallInfo);
            }
        }
        return;
    }

    /**
     * 隐藏召唤结果
     */
    public closeCallResultView() {
        AudioManager.getInstance().playCommonBtn();
        this.node.getChildByName("callResultView").active = false;
    }

    /**
     * 关闭界面
     */
    public close() {
        AudioManager.getInstance().playCommonBtn();
        this.node.active = false;
        this.node.parent.parent.getComponent(IndexCtrl).flushTopResNumLabel();
    }

    /**
     * 刷新钻石数量
     */
    public flushDiamondNum() {
        let diamondNum = PlayerCacheCtrl.getInstance().getPlayerDiamondNum();
        this.diamondNumLabel.string = TxtUtil.parseTxt(diamondNum + "");
    }


    /**
     * 临时按钮 ，后面删除  todo..
     */
    public tempButton() {
        let itemList = [];
        itemList.push({
            itemId: 1003,
            itemCount: 100000,
        });
        itemList.push({
            itemId: 1006,
            itemCount: 100000,
        });
        PlayerCacheCtrl.getInstance().addPlayerItemList(itemList);

        this.flushDiamondNum();
    }
}
