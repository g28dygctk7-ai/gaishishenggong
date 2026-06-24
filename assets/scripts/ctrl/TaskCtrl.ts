import ItemConfig, { ItemBasic } from "../config/ItemConfig";
import TaskConfig, { DailyTaskBasic, TaskBasic } from "../config/TaskConfig";
import AudioManager from "../manager/AudioManager";
import SpriteManager from "../manager/SpriteManager";
import TxtUtil from "../utils/TxtUtil";
import IndexCtrl from "./IndexCtrl";
import MainCtrl from "./MainCtrl";
import PlayerCacheCtrl from "./PlayerCacheCtrl";
import DailyTaskCtrl from "./task/DailyTaskCtrl";

const { ccclass, property } = cc._decorator;

// 任务控制
@ccclass
export default class TaskCtrl extends cc.Component {

    @property({type:cc.Node,tooltip:'成长任务界面'})
    levelTaskNode:cc.Node = null;

    @property({type:cc.Node,tooltip:'每日任务Icon'})
    dailyTaskIconNode:cc.Node = null;

    @property({type:cc.Node,tooltip:'每日任务节界面'})
    dailyTaskNode:cc.Node = null;

    @property({type:cc.Node,tooltip:'每日任务内容节点'})
    dailyTaskContentNode:cc.Node = null;

    @property({type:cc.Prefab,tooltip:'每日任务预制体'})
    dailyTaskPrefab:cc.Prefab = null;

    /**
     * 每日任务信息列表  id/node
     */
    private _dailyTaskInfoList = [];

    /**
     * 任务配置
     */
    private _taskConfig:TaskBasic = null;

    /**
     * 任务是否已完成
     */
    private _taskComplete:boolean = false;
    
    /**
     * 上一次检查成长任务时间
     */
    private _lastCheckLevelTaskTime:number = 0;

    /**
     * 上一次检查每日任务时间
     */
    private _lastCheckDailyTaskTime:number = 0;

    /**
     * 当前时间
     */
    private _currTime:number = 0;

    /**
     * 颜色
     */
    private _labelColor = {
        NOT_COMPLETE : "#ffffff", // 未完成-文本颜色
        NOT_COMPLETE_LINE: "#000000", // 未完成-描边颜色
        COMPLETE : "#ffea7e", // 已完成-文本颜色
        COMPLE_LINE: "#473323" // 已完成-描边颜色
    }

    onEnable() {
        this.init();

    }

    update(dt) {
        this._currTime += (dt * 1000);

        this.checkLevelTaskComplete();

        this.checkDailyTaskComplete();
    }


    // 初始化
    private init() {
        this.initLevelTask();
        
        this._initDailyTaskList();
    }

    /**
     * 初始化成长任务
     */
    private initLevelTask() {
        // 获取玩家当前成长任务ID
        let playerTaskId = PlayerCacheCtrl.getInstance().getPlayerTaskId();
        this.loadLevelTask(playerTaskId);
    }

    /**
     * 加载成长任务
     * @param taskId 任务ID
     */
    private loadLevelTask(taskId:number) {
        this._taskComplete = false;

        let taskConfig:TaskBasic = TaskConfig.getConfigById(taskId);
        if(taskConfig == null) {
            this.levelTaskNode.active = false;
            this._taskConfig = null;
            return;
        }

        this._taskConfig = taskConfig;
        
        this.updateLevelTaskView();

        this.levelTaskNode.active = true;
    }

    /**
     * 更新成长任务界面
     */
    private updateLevelTaskView() {
        if(this._taskConfig == null) {
            return;
        }
        let reward = this._taskConfig.reward;
        let itemId = reward.itemId;
        let itemConfig:ItemBasic = ItemConfig.getConfigById(itemId);
        if(itemConfig == null) {
            return;
        }
        let itemCount = reward.itemCount;

        let levelLabel:cc.Label = this.levelTaskNode.getChildByName("level").getComponent(cc.Label);
        let descLabel:cc.Label = this.levelTaskNode.getChildByName("desc").getComponent(cc.Label);
        let itemCountLabel:cc.Label = this.levelTaskNode.getChildByName("reward").getChildByName("itemCount").getComponent(cc.Label);
        let levelLabelOutline:cc.LabelOutline = this.levelTaskNode.getChildByName("level").getComponent(cc.LabelOutline);
        let descLabelOutline:cc.LabelOutline = this.levelTaskNode.getChildByName("desc").getComponent(cc.LabelOutline);
        let itemCountLabelOutline:cc.LabelOutline = this.levelTaskNode.getChildByName("reward").getChildByName("itemCount").getComponent(cc.LabelOutline);
        let redPointNode:cc.Node = this.levelTaskNode.getChildByName("redPoint");
        let lightNode:cc.Node = this.levelTaskNode.getChildByName("light");
        let color = null;
        let outlineColor = null;
        if(this._taskComplete) { // 已完成
            color = this._labelColor.COMPLETE;
            outlineColor = this._labelColor.COMPLE_LINE;
            levelLabel.string = "领取奖励";
            redPointNode.active = true;
            lightNode.active = true;
        }else { // 未完成
            color = this._labelColor.NOT_COMPLETE;
            outlineColor = this._labelColor.NOT_COMPLETE_LINE;
            levelLabel.string = this._taskConfig.name;
            redPointNode.active = false;
            lightNode.active = false;
        }

        levelLabel.node.color = new cc.Color().fromHEX(color);
        descLabel.node.color = new cc.Color().fromHEX(color);
        itemCountLabel.node.color = new cc.Color().fromHEX(color);
        levelLabelOutline.color = new cc.Color().fromHEX(outlineColor);
        descLabelOutline.color = new cc.Color().fromHEX(outlineColor);
        itemCountLabelOutline.color = new cc.Color().fromHEX(outlineColor);
        descLabel.string = this._taskConfig.desc;
        itemCountLabel.string = TxtUtil.parseTxt(String(itemCount));
        SpriteManager.getInstance().setBundleSpriteFrameByName(this.levelTaskNode.getChildByName("reward").getChildByName("itemPic").getComponent(cc.Sprite),itemConfig.srcPath);
    }

    /**
     * 检查成长任务是否完成
     */
    private checkLevelTaskComplete() {
        if(this._taskConfig == null) {
            return;
        }

        if(this._taskComplete) { // 已经置为完成状态，不需要再检查
            return;
        }

        if(this._lastCheckLevelTaskTime + 500 > this._currTime) {
            return;
        }

        let type = this._taskConfig.condition.type;
        let complete = false;
        if(type == TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL) {
            complete = this.checkLevelTaskCompleteByAttrLevel();
        }else if(type == TaskConfig.TASK_CONDITION_TYPE.CHAPTER_LEVEL) {
            complete = this.checkLevelTaskCompleteByChapterLevel();
        }else if(type == TaskConfig.TASK_CONDITION_TYPE.CHALLENGE_LEVEL) {
            complete = this.checkLevelTaskCompleteByChallengeLevel();
        }

        if(complete) { // 已完成
            this._taskComplete = true;
            this.updateLevelTaskView();
        }

        this._lastCheckLevelTaskTime = this._currTime;
    }
    
    
    /**
     * 检查每日任务是否有可领取奖励的,展示红点
     */
    private checkDailyTaskComplete() {
        if(this._dailyTaskInfoList == null || this._dailyTaskInfoList.length == 0) {
            return;
        }

        if(this._lastCheckDailyTaskTime + 500 > this._currTime) {
            return;
        }

        let redPoint = this.dailyTaskIconNode.getChildByName("redPoint");
        let active = false;

        for(let i = 0; i < this._dailyTaskInfoList.length; i++) {
            let node:cc.Node = this._dailyTaskInfoList[i].node;
            let canReceive = node.getComponent(DailyTaskCtrl).checkCanReceive();
            if(canReceive) {
                active = true;
            }
        }

        if(active) {
            if(!redPoint.active) {
                redPoint.active = true;
            }
        }else {
            if(redPoint.active) {
                redPoint.active = false;
            }
        }

        this._lastCheckDailyTaskTime = this._currTime;
    }

    /**
     * 检查成长任务 - 属性等级
     */
    private checkLevelTaskCompleteByAttrLevel():boolean {
        let attrKey = this._taskConfig.condition.attrKey;
        let level = this._taskConfig.condition.level;
        let playerAttrLevelInfo = PlayerCacheCtrl.getInstance().getPlayerAttrLevelInfo(attrKey);
        return playerAttrLevelInfo.level >= level;
    }

    /**
     * 检查成长任务 - 关卡等级
     */
     private checkLevelTaskCompleteByChapterLevel():boolean {
        let chapterId = this._taskConfig.condition.chapterId;
        let playerChapterInfo = PlayerCacheCtrl.getInstance().getPlayerChapterInfo();
        return playerChapterInfo.chapterId > chapterId;
    }

    /**
     * 检查成长任务 - 副本等级
     */
     private checkLevelTaskCompleteByChallengeLevel():boolean {
        let challengeId = this._taskConfig.condition.challengeId;
        let level = this._taskConfig.condition.level;
        let playerChallengeInfo = PlayerCacheCtrl.getInstance().getPlayerChallengeInfo(challengeId);
        return playerChallengeInfo.level > level;
    }

    /**
     * 领取成长任务奖励
     */
    public receiveLevelTask() {
        if(!this._taskComplete) {
            // 未完成根据完成类型跳转相关界面
            if(this._taskConfig != null) {
                let type = this._taskConfig.condition.type;
                this.toFuntion(type);
            }
            return;
        }
        
        // 领取奖励
        let reward = this._taskConfig.reward;
        let itemId = reward.itemId;
        let itemConfig:ItemBasic = ItemConfig.getConfigById(itemId);
        if(itemConfig == null) {
            return;
        }
        let itemCount = reward.itemCount;
        PlayerCacheCtrl.getInstance().addPlayerItem(itemId, itemCount);

        // 展示奖励
        let pos = this.node.convertToNodeSpaceAR(this.levelTaskNode.convertToWorldSpaceAR(cc.Vec2.ZERO)); // 转为当前节点位置
        let mainCtrl:MainCtrl = this.node.getComponent(MainCtrl);
        
        AudioManager.getInstance().playGainReward();
        mainCtrl.showReward(itemConfig,itemCount,pos.x,pos.y,2);

        let nextTaskId = this._taskConfig.id + 1;
        PlayerCacheCtrl.getInstance().setPlayerTaskId(nextTaskId);
        

        // 是否有下一个任务
        this.loadLevelTask(nextTaskId);
    }
    

    /**
     * 前往功能
     */
    public toFuntion(type:number) {
        if(type == TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL) {
            this.node.parent.getComponent(IndexCtrl).allFunctionHidden();
        }else if(type == TaskConfig.TASK_CONDITION_TYPE.CHAPTER_LEVEL) {
            this.node.parent.getComponent(IndexCtrl).allFunctionHidden();
        }else if(type == TaskConfig.TASK_CONDITION_TYPE.CHALLENGE_LEVEL) {
            this.node.parent.getComponent(IndexCtrl).toFunction(null,"4");
        }
    }

    /**
     * 初始化每日任务列表
     */
    private _initDailyTaskList() {
        this._dailyTaskInfoList = [];
        this.dailyTaskContentNode.removeAllChildren();

        this.dailyTaskNode.active = true;

        for(let i = 0; i < TaskConfig.DAILY_TASK_CONFIG.length; i++) {
            let dailyTaskConfig:DailyTaskBasic = TaskConfig.DAILY_TASK_CONFIG[i];
            this._initDailyTask(dailyTaskConfig);
        }
        
        this.dailyTaskNode.active = false;
    }

    
    /**
     * 初始化每日任务
     * @param dailyTaskConfig 每日任务配置
     */
    private _initDailyTask(dailyTaskConfig:DailyTaskBasic) {
        let dailyTask = cc.instantiate(this.dailyTaskPrefab);
        let dailyTaskInfo = {
            id: dailyTaskConfig.id,
            node: dailyTask
        }
        this._dailyTaskInfoList.push(dailyTaskInfo);

        dailyTask.getComponent(DailyTaskCtrl).init(this.node,dailyTaskConfig);

        this.dailyTaskContentNode.addChild(dailyTask);
    }

    /**
     * 展示每日任务界面
     */
    public showDailyTaskView() {
        AudioManager.getInstance().playCommonBtn();

        this.dailyTaskNode.active = true;

        // 获取排序
        let newDailyTaskNodeList = [];
        for(let i = 0; i < this._dailyTaskInfoList.length; i++) {
            let node:cc.Node = this._dailyTaskInfoList[i].node;
            let sort = node.getComponent(DailyTaskCtrl).getSort();
            let sortNodeList = {
                sort: sort,
                node: node
            }
            newDailyTaskNodeList.push(sortNodeList);
        }
        newDailyTaskNodeList.sort((a,b) => a.sort - b.sort); // 排序

        this.dailyTaskContentNode.removeAllChildren(); // 清除列表重新添加
        for(let i = 0; i < newDailyTaskNodeList.length; i++) {
            let sortNode = newDailyTaskNodeList[i];
            let node = sortNode.node;
            this.dailyTaskContentNode.addChild(node);
            node.getComponent(DailyTaskCtrl).updateNode();
        }
    
        // // 立刻更新一次每日任务 - 排序    已完成且未领取奖励 > 未完成 > 已完成已领取奖励
        // for(let i = 0; i < this._dailyTaskInfoList.length; i++) {
        //     let node:cc.Node = this._dailyTaskInfoList[i].node;
        // }

    }

    /**
     * 关闭每日任务界面
     */
    public closeDailyTaskView() {
        AudioManager.getInstance().playCommonBtn();
        this.dailyTaskNode.active = false;
    }
}
