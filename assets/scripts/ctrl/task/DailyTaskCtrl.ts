import ChallengeConfig from "../../config/ChallengeConfig";
import ItemConfig, { ItemBasic } from "../../config/ItemConfig";
import PetConfig from "../../config/PetConfig";
import ResPathKey from "../../config/ResPathKey";
import TaskConfig, { DailyTaskBasic } from "../../config/TaskConfig";
import AudioManager from "../../manager/AudioManager";
import SpriteManager from "../../manager/SpriteManager";
import ButtonUtil from "../../utils/ButtonUtil";
import DateUtil from "../../utils/DateUtil";
import SdkCtrl from "../../utils/WxSdkUtil";
import PlayerCacheCtrl from "../PlayerCacheCtrl";

const {ccclass, property} = cc._decorator;

/**
 * 每日任务控制
 */
@ccclass
export default class DailyTaskCtrl extends cc.Component {
    /**
     * 主节点
     */
    private _taskNode:cc.Node = null;
    /**
     * 每日任务配置
     */
    private _dailyTaskConfig:DailyTaskBasic = null;

    /**
     * 当前时间
     */
    private _currTime:number = 0;

    /**
     * 上一次检查事件
     */
    private _lastCheckTime:number = 0;

    /**
     * 当前完成数量
     */
    private _currCompleteCount:number = 0;


    /**
     * 排序
     */
    private SORT = {
        COMPLETE:1,  // 已完成未领取奖励
        NOT_COMPLETE: 2, // 未完成
        RECEIVE : 3 // 已完成已领取奖励
    }

    onLoad() {
        
    }

 

    start() {

    }

    update(dt) {
        this._currTime += (dt * 1000);

        // 检查任务完成度是否有变更
        this.check();
    }

    private check() {
        if(this._lastCheckTime + 1500 > this._currTime) {
            return;
        }

        this.updateNode();

        this._lastCheckTime = this._currTime;
    }

    /**
     * 初始化
     * @param taskNode 主节点
     * @param dailyTaskConfig 每日任务配置
     */
    public async init(taskNode:cc.Node,dailyTaskConfig:DailyTaskBasic) {
        this._taskNode = taskNode;
        this._dailyTaskConfig = dailyTaskConfig;

        let reward = this._dailyTaskConfig.reward;
        let itemConfig:ItemBasic = ItemConfig.getConfigById(reward.itemId);
        if(itemConfig == null) {
            return;
        }
       
        // 奖励图片
        SpriteManager.getInstance().setBundleSpriteFrameByName(this.node.getChildByName("reward").getChildByName("itemPic").getComponent(cc.Sprite),itemConfig.srcPath);
        // 奖励数量
        this.node.getChildByName("reward").getChildByName("itemCount").getComponent(cc.Label).string = reward.itemCount + "";

        this.updateNode();

        this.node.active = true;
    }


    public updateNode() {
         
        let playerDailyTaskInfo = PlayerCacheCtrl.getInstance().getPlayerDailyTaskInfo(this._dailyTaskConfig.id);
        let receiveFlag = playerDailyTaskInfo != null && playerDailyTaskInfo.lastReceiveTime > DateUtil.getTodayStartTime(); // 是否已经领取奖励
        let completeCount = this.getCompleteCount();  // 是否已完成

        // 完成进度条
        let completeProgressBarSprite:cc.Sprite = this.node.getChildByName("completeProgress").getChildByName("bar").getComponent(cc.Sprite);
        let completeProgressCompleteLabel = this.node.getChildByName("completeProgress").getChildByName("complete");

        // 按钮
        let button:cc.Button = this.node.getChildByName("receiveButton").getComponent(cc.Button);
        let buttonSprite:cc.Sprite = button.node.getChildByName("Background").getComponent(cc.Sprite);
        let buttonLabel:cc.Label = button.node.getChildByName("Background").getChildByName("Label").getComponent(cc.Label);


        let boxSprite = ResPathKey.DAILY_TASK_NOT_COMPLETE; // 背景框
        let fillRange = 1; // 完成度进度条
        let buttonLabelTxt = ""; // 按钮文本
        let buttonRedPointActive = false; // 按钮红点
        let buttonSpritePic = ResPathKey.BUTTON_GREEN; // 按钮背景
        let desc = this._dailyTaskConfig.desc; // 每日任务介绍
        let detailDesc = false; // 是否需要详细的介绍
        let completeProgressCompleteLabelActive = false; // 完成文本是否显示
        let completeProgressBarSpritePic = ResPathKey.EXP_PROGESSS_BAR; // 进度条背景

        if(receiveFlag) { // 已经领取奖励
            button.interactable = false;
            this.node.getChildByName("mark").active = true;
            buttonLabelTxt = "已领取";
        }else {
            this.node.getChildByName("mark").active = false;
            button.interactable = false;
            buttonLabelTxt = "领取奖励";

            
            if(this._dailyTaskConfig.isAd) {
                buttonSpritePic = ResPathKey.AD_BUTTON_LONG;
                ButtonUtil._setEvent(this.node, button, "DailyTaskCtrl","receiveReward","2");
                buttonLabelTxt = ""; // 广告不需要文字
            }else {;
                ButtonUtil._setEvent(this.node, button, "DailyTaskCtrl","receiveReward","1");
            }

            if(completeCount >= this._dailyTaskConfig.condition.count) {
                button.interactable = true;
                boxSprite = ResPathKey.DAILY_TASK_COMPLETE;
                completeProgressCompleteLabelActive = true;
                completeProgressBarSpritePic = ResPathKey.YELLOW_PROGESSS_BAR;
                buttonRedPointActive = true;
            }else {
                detailDesc = true;
                button.interactable = false;
                fillRange = completeCount / this._dailyTaskConfig.condition.count;
            }
        }
        completeProgressBarSprite.fillRange = fillRange;

        // 按钮背景图
        SpriteManager.getInstance().setBundleSpriteFrameByName(buttonSprite, buttonSpritePic);

        // 完成进度条的背景图
        SpriteManager.getInstance().setBundleSpriteFrameByName(completeProgressBarSprite,completeProgressBarSpritePic);

        // 完成文本
        completeProgressCompleteLabel.active = completeProgressCompleteLabelActive;

        // 按钮文本
        buttonLabel.string = buttonLabelTxt;

        // 按钮红点
        button.node.getChildByName("redPoint").active = buttonRedPointActive;

        // 介绍
        this.node.getChildByName("desc").getComponent(cc.Label).string = desc + "("+(detailDesc?completeCount:this._dailyTaskConfig.condition.count)+"/"+this._dailyTaskConfig.condition.count+")";

        // 设置背景框
        SpriteManager.getInstance().setBundleSpriteFrameByName(this.node.getComponent(cc.Sprite), boxSprite);
    }

    /**
     * 获取完成数量
     */
    private getCompleteCount() {

        let condition = this._dailyTaskConfig.condition;
        let type = condition.type;

        // 玩家每日信息
        let playerDailyInfo = PlayerCacheCtrl.getInstance().getPlayerDailyInfo();

        if(type == TaskConfig.DAILY_TASK_CONDITION_TYPE.GOLD_CHALLENGE) { // 金币副本
            return playerDailyInfo.goldChallengeCount;
        }else if(type == TaskConfig.DAILY_TASK_CONDITION_TYPE.DIAMOND_CHALLENGE) { // 钻石副本
            return playerDailyInfo.diamondChallengeCount;
        }else if(type == TaskConfig.DAILY_TASK_CONDITION_TYPE.GENERAL_EXP_CHALLENGE) { // 角色经验副本
            return playerDailyInfo.generalExpChallengeCount;
        }else if(type == TaskConfig.DAILY_TASK_CONDITION_TYPE.CALL) { // 召唤
            return playerDailyInfo.callCount;
        }else if(type == TaskConfig.DAILY_TASK_CONDITION_TYPE.AD) { // 观看广告
            return playerDailyInfo.adCount;
        }else if(type == TaskConfig.DAILY_TASK_CONDITION_TYPE.KILL) { // 击败敌人
            return playerDailyInfo.killCount;
        }else if(type == TaskConfig.DAILY_TASK_CONDITION_TYPE.CHAPTER) { // 闯关数量
            return playerDailyInfo.chapterCount;
        }

        return 0;
    }

    /**
     * 是否已经完成
     */
    public checkComplete():boolean {
        return this.getCompleteCount() >= this._dailyTaskConfig.condition.count;
    }

    /**
     * 是否有可领取的
     */
    public checkCanReceive():boolean {
        let playerDailyTaskInfo = PlayerCacheCtrl.getInstance().getPlayerDailyTaskInfo(this._dailyTaskConfig.id);
        let receiveFlag = playerDailyTaskInfo != null && playerDailyTaskInfo.lastReceiveTime > DateUtil.getTodayStartTime();
        return !receiveFlag && this.getCompleteCount() >= this._dailyTaskConfig.condition.count;
    }

    /**
     * 获取排序
     */
     public getSort():number {
        let playerDailyTaskInfo = PlayerCacheCtrl.getInstance().getPlayerDailyTaskInfo(this._dailyTaskConfig.id);
        let receiveFlag = playerDailyTaskInfo != null && playerDailyTaskInfo.lastReceiveTime > DateUtil.getTodayStartTime();
        if(receiveFlag) {
            return this.SORT.RECEIVE;
        }else if(this.getCompleteCount() >= this._dailyTaskConfig.condition.count) {
            return this.SORT.COMPLETE;
        }
        return this.SORT.NOT_COMPLETE;
    }

    /**
     * 领取奖励
     * @param event 
     * @param customerData 领取类型：1-正常 2-广告
     */
    public receiveReward(event, customerData) {
        let type = Number(customerData);
        let playerDailyTaskInfo = PlayerCacheCtrl.getInstance().getPlayerDailyTaskInfo(this._dailyTaskConfig.id);
        let receiveFlag = playerDailyTaskInfo != null && playerDailyTaskInfo.lastReceiveTime > DateUtil.getTodayStartTime(); // 是否已经领取奖励
        if(receiveFlag) { // 已经领取过奖励
            return;
        }

        // 是否已经完成了
        if(!this.checkComplete()) {
            return;
        } 

        if(type == 1) {
            this.execReceiveReward(playerDailyTaskInfo);
        }else if(type == 2) {
            SdkCtrl.getInstance().ShowRewardedVideoAd(() => {
                PlayerCacheCtrl.getInstance().calcPlayerDailyInfo(TaskConfig.DAILY_TASK_CONDITION_TYPE.AD, 1);
                this.execReceiveReward(playerDailyTaskInfo);
            });
        }
    }

    private execReceiveReward(playerDailyTaskInfo) {
        let reward = this._dailyTaskConfig.reward;
        PlayerCacheCtrl.getInstance().addPlayerItem(reward.itemId,reward.itemCount);
        AudioManager.getInstance().playGainReward();

        // 记录数据
        if(playerDailyTaskInfo == null) {
            playerDailyTaskInfo = {};
        }
        playerDailyTaskInfo.lastReceiveTime = new Date().getTime();
        PlayerCacheCtrl.getInstance().setPlayerDailyTaskInfo(this._dailyTaskConfig.id,playerDailyTaskInfo);

        this.updateNode();
    }
}
