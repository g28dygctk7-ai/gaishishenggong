
import ActivityConfig, { ActivityBasic } from "../config/ActivityConfig";
import ItemConfig, { ItemBasic } from "../config/ItemConfig";
import TaskConfig from "../config/TaskConfig";
import AudioManager from "../manager/AudioManager";
import SpriteManager from "../manager/SpriteManager";
import ButtonUtil from "../utils/ButtonUtil";
import DateUtil from "../utils/DateUtil";
import RandomUtil from "../utils/RandomUtil";
import SdkCtrl from "../utils/WxSdkUtil";
import IndexCtrl from "./IndexCtrl";
import PlayerCacheCtrl from "./PlayerCacheCtrl";
import TipCtrl from "./TipCtrl";

//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
//网页客服 http://web3incubators.com/kefu.html
const { ccclass, property } = cc._decorator;

@ccclass
export default class ActivityCtrl extends cc.Component {

    // @property(cc.Node)
    // contentNode: cc.Node = null; // 活动父节点

    // @property(cc.Prefab)
    // infoPrefab: cc.Prefab = null; // 活动信息预制体

    // @property(cc.Prefab)
    // itemPrefab: cc.Prefab = null; // 物品预制体
    @property(cc.Node)
    sevenSignIconNode: cc.Node = null; // 七日签到Icon入口

    @property(cc.Node)
    turntableIconNode: cc.Node = null; // 幸运转盘Icon入口

    @property(cc.Prefab)
    turntableItemPrefab: cc.Prefab = null; // 转盘物品预制体

    @property(cc.Node)
    dailySignNode: cc.Node = null; // 每日签到奖励详情信息

    @property(cc.Node)
    turntableNode: cc.Node = null; // 幸运转盘详情信息

    @property(cc.Node)
    sevenSignNode: cc.Node = null; // 七日签到详情信息

    /**
     * 是否在幸运转盘界面
     */
    private _needUpdateTurntableTime = false;

    /**
     * 上一次转动幸运转盘时间
     */
    private _lastTurnTime = 0;

    /**
     * 当前时间
     */
    private _currTime:number = 0;

    /**
     * 幸运转盘间隔时间
     */
    private _turntableIntervalTime = 0;


    /**
     * 上次检查红点时间
     */
    private _lastCheckRedPointTime = 0;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    onEnable() {
        // this.initActivityList();
    }

    start() {
    }

    /**
     * 初始化活动列表
     */
    // private initActivityList() {
    //     // 渲染时先清除子节点
    //     this.contentNode.removeAllChildren();

    //     for (let i = 0; i < ActivityConfig.CONFIG.length; i++) {
    //         let activityConfig: ActivityBasic = ActivityConfig.CONFIG[i];
    //         if (activityConfig == null || !activityConfig.openStatus) {
    //             continue;
    //         }

    //         // 创建节点
    //         this.initActivity(activityConfig);
    //     }
    // }

    /**
     * 初始化活动信息
     * @param activityConfig 活动配置
     */
    // private initActivity(activityConfig: ActivityBasic) {
    //     cc.log("渲染活动信息 活动ID：%s", activityConfig.id);


    //     let activity = cc.instantiate(this.infoPrefab);

    //     // 名称
    //     let skillName: cc.Label = activity.getChildByName("name").getComponent(cc.Label);
    //     skillName.string = activityConfig.name;

    //     // 介绍
    //     let skillDesc: cc.Label = activity.getChildByName("desc").getComponent(cc.Label);
    //     skillDesc.string = activityConfig.desc;

    //     // 图片
    //     let skillPic: cc.Sprite = activity.getChildByName("pic").getChildByName("pic").getComponent(cc.Sprite);
    //     SpriteManager.getInstance().setBundleSpriteFrameByName(skillPic,activityConfig.uiPath);

    //     // 查看详情按钮
    //     let skillLevelUpButton: cc.Button = activity.getChildByName("showDetail").getComponent(cc.Button);
    //     ButtonUtil._setEvent(this.node, skillLevelUpButton, "ActivityCtrl", "showDetail", activityConfig.id + "");

    //     // 添加到内容节点，并启用
    //     this.contentNode.addChild(activity);
    //     activity.active = true;

    // }

    /**
     * 查看活动详情
     * @param event 
     * @param customEventData 技能ID
     * @returns 
     */
    public showDetail(event, customEventData) {
        if (customEventData == null) {
            return;
        }

        let activityId = Number(customEventData);
        cc.log("查看活动配置,id:", activityId);
        let activityConfig: ActivityBasic = ActivityConfig.getConfigById(activityId);
        if (activityConfig == null) {
            cc.log("活动配置不存在,id:", activityId);
            return;
        }

        let method = activityConfig.method;
        if (ActivityConfig.ACTIVITY_METHOD.DAILY_SIGN == method) {
            // this.showDailySign(activityConfig);
        } else if (ActivityConfig.ACTIVITY_METHOD.SEVEN_SIGN == method) {
            this.showSevenSign(activityConfig);
        } else if (ActivityConfig.ACTIVITY_METHOD.TURNTABLE == method) {
            this.showTurntable(activityConfig);
        } else if (ActivityConfig.ACTIVITY_METHOD.ACHIEVE_REWARD == method) {
            this.showAchieveReward(activityConfig);
        }
    }


    // /**
    //  * 展示每日签到
    //  * @param activityConfig 活动配置
    //  */
    // public showDailySign(activityConfig: ActivityBasic) {
    //     cc.log("展示每日签到");

    //     let contentNode: cc.Node = this.dailySignNode.getChildByName("dailySignView").getChildByName("itemPageView").getChildByName("view").getChildByName("content");
    //     contentNode.removeAllChildren();

    //     // 用户是否可签到
    //     let activityInfo = PlayerCacheCtrl.getInstance().getPlayerActivityInfo(ActivityConfig.ACTIVITY_TYPE.DAILY_SIGN);
    //     if (activityInfo == null) {
    //         activityInfo = {
    //             signTime: 0
    //         }
    //     }
    //     let canSign = DateUtil.getTodayStartTime() > activityInfo.signTime;

    //     let itemList = activityConfig.rewardParam.reward;
    //     for (let i = 0; i < itemList.length; i++) {
    //         let itemInfo = itemList[i];
    //         let itemId = itemInfo.itemId;
    //         let itemCount = itemInfo.itemCount;
    //         let itemConfig: ItemBasic = ItemConfig.getConfigById(itemId);

    //         let item = cc.instantiate(this.itemPrefab);
    //         // 物品图片
    //         let itemPic: cc.Sprite = item.getChildByName("pic").getComponent(cc.Sprite);
    //         SpriteManager.getInstance().setBundleSpriteFrameByName(itemPic, itemConfig.srcPath);

    //         let itemCountLabel: cc.Label = item.getChildByName("itemCount").getComponent(cc.Label);
    //         itemCountLabel.string = "" + itemCount;

    //         // 添加到内容节点，并启用
    //         contentNode.addChild(item);
    //         item.active = true;
    //     }


    //     if (canSign) {
    //         let button: cc.Button = this.dailySignNode.getChildByName("dailySignView").getChildByName("confirmButton").getComponent(cc.Button);
    //         ButtonUtil._setEvent(this.node, button, "ActivityCtrl", "receiveDailySign", "1");
    //         button.node.active = true;

    //         let adButton: cc.Button = this.dailySignNode.getChildByName("dailySignView").getChildByName("adButton").getComponent(cc.Button);
    //         ButtonUtil._setEvent(this.node, adButton, "ActivityCtrl", "receiveDailySignAd", "1");
    //         adButton.node.active = true;

    //         this.dailySignNode.getChildByName("dailySignView").getChildByName("desc").active = false;
    //     } else {
    //         // 提示已经领取
    //         this.dailySignNode.getChildByName("dailySignView").getChildByName("desc").active = true;

    //         let button: cc.Button = this.dailySignNode.getChildByName("dailySignView").getChildByName("confirmButton").getComponent(cc.Button);
    //         button.node.active = false;

    //         let adButton: cc.Button = this.dailySignNode.getChildByName("dailySignView").getChildByName("adButton").getComponent(cc.Button);
    //         adButton.node.active = false;
    //     }

    //     // 显示关闭按钮
    //     let closeButton: cc.Button = this.dailySignNode.getChildByName("dailySignView").getChildByName("closeButton").getComponent(cc.Button);
    //     ButtonUtil._setEvent(this.node, closeButton, "ActivityCtrl", "closeView", "1");
    //     closeButton.node.active = true;

    //     this.dailySignNode.active = true;
    // }

    // /**
    //  * 领取每日签到奖励
    //  */
    // public receiveDailySign(event, customEventData) {
    //     this.setDailySignData();
    //     let activityConfig: ActivityBasic = ActivityConfig.getConfigById(ActivityConfig.ACTIVITY_TYPE.DAILY_SIGN);
    //     this.sendRes(activityConfig.rewardParam.reward, false);
    //     this.dailySignNode.active = false;
    // }

    /**
    //  * 领取每日签到奖励（广告)
    //  */
    // public receiveDailySignAd(event, customEventData) {
    //     SdkCtrl.getInstance().ShowRewardedVideoAd(() => {
    //         this.setDailySignData();
    //         let activityConfig: ActivityBasic = ActivityConfig.getConfigById(ActivityConfig.ACTIVITY_TYPE.DAILY_SIGN);
    //         this.sendRes(activityConfig.rewardParam.reward, true);
    //         this.dailySignNode.active = false;
    //     })
    // }

    // /**
    //  * 每日签到数据操作
    //  */
    // public setDailySignData() {
    //     // 数据操作
    //     let activityInfo = PlayerCacheCtrl.getInstance().getPlayerActivityInfo(ActivityConfig.ACTIVITY_TYPE.DAILY_SIGN);
    //     if (activityInfo == null) {
    //         activityInfo = {
    //             signTime: 0
    //         };
    //     }
    //     activityInfo.signTime = new Date().getTime();

    //     PlayerCacheCtrl.getInstance().setPlayerActivityInfo(ActivityConfig.ACTIVITY_TYPE.DAILY_SIGN, activityInfo);
    // }

    /**
     * 展示七日签到
     */
     public toSevenSign() {
        AudioManager.getInstance().playCommonBtn();
        this.showDetail(null,String(ActivityConfig.ACTIVITY_TYPE.SEVEN_SIGN));
    }

    /**
     * 展示幸运转盘
     */
    public toTurntable() {
        AudioManager.getInstance().playCommonBtn();
        this.showDetail(null,String(ActivityConfig.ACTIVITY_TYPE.TURNTABLE));
    }

    /**
    * 展示七日签到
    * @param activityConfig 活动配置
    */
    public showSevenSign(activityConfig: ActivityBasic) {
        cc.log("展示七日签到");

        // 用户可签到的天数
        let activityInfo = PlayerCacheCtrl.getInstance().getPlayerActivityInfo(ActivityConfig.ACTIVITY_TYPE.SEVEN_SIGN);
        if (activityInfo == null) {
            activityInfo = {
                day: 0,
                signTime: 0
            }
        }
        let playerCanSignDay = activityInfo.day % 7;
        let canSign = DateUtil.getTodayStartTime() > activityInfo.signTime;
        // if (!canSign) {
        //     playerCanSignDay -= 1;
        // }

        // 循环创建七日签到物品
        let contentNode = this.sevenSignNode.getChildByName("sevenSignView").getChildByName("content");
        for (let i = 0; i < activityConfig.rewardParam.reward.length; i++) {
            let dayNode = contentNode.getChildByName("day" + (i + 1));
            let reward = activityConfig.rewardParam.reward[i];
            let itemConfig: ItemBasic = ItemConfig.getConfigById(reward.itemId);
            // 物品图片
            let itemPic: cc.Sprite =dayNode.getChildByName("itemPic").getComponent(cc.Sprite);
            SpriteManager.getInstance().setBundleSpriteFrameByName(itemPic, itemConfig.srcPath);
            // 物品数量
            let itemCountLabel: cc.Label = dayNode.getChildByName("itemCount").getComponent(cc.Label);
            itemCountLabel.string = "×" + reward.itemCount;

            // 是否需要高亮
            if (canSign && playerCanSignDay == i) {
                dayNode.getChildByName("light").active = true;
            }else {
                dayNode.getChildByName("light").active = false;
            }
            
            // 检查是否已领取
            let alreadyReceive = false;
            if(i < playerCanSignDay){
                alreadyReceive = true;
            }
            
            cc.log("!canSign && i <= playerCanSignDay",!canSign && i <= playerCanSignDay);
            cc.log("alreadyReceive:",alreadyReceive);
            dayNode.getChildByName("alreadyReceive").zIndex = 1000;
            dayNode.getChildByName("alreadyReceive").active = alreadyReceive;
        }

        // 显示关闭按钮
        let closeButton: cc.Button = this.sevenSignNode.getChildByName("sevenSignView").getChildByName("closeButton").getComponent(cc.Button);
        ButtonUtil._setEvent(this.node, closeButton, "ActivityCtrl", "closeView", "1");
        closeButton.node.active = true;

        if (canSign) {
            // 显示领取奖励按钮
            let button: cc.Button = this.sevenSignNode.getChildByName("sevenSignView").getChildByName("confirmButton").getComponent(cc.Button);
            ButtonUtil._setEvent(this.node, button, "ActivityCtrl", "receiveSevenSign", "");
            button.node.active = true;

            let adButton: cc.Button = this.sevenSignNode.getChildByName("sevenSignView").getChildByName("adButton").getComponent(cc.Button);
            ButtonUtil._setEvent(this.node, adButton, "ActivityCtrl", "receiveSevenSignAd", "");
            adButton.node.active = true;

            this.sevenSignNode.getChildByName("sevenSignView").getChildByName("desc").active = false;
        } else {
            // 提示已经领取过了
            this.sevenSignNode.getChildByName("sevenSignView").getChildByName("desc").active = true;

            let button: cc.Button = this.sevenSignNode.getChildByName("sevenSignView").getChildByName("confirmButton").getComponent(cc.Button);
            button.node.active = false;

            let adButton: cc.Button = this.sevenSignNode.getChildByName("sevenSignView").getChildByName("adButton").getComponent(cc.Button);
            adButton.node.active = false;
        }

        this.sevenSignNode.active = true;
    }

    /**
   * 领取七日签到奖励
   */
    public receiveSevenSign(event, customEventData) {
        let day = this.getAndSetSevenSign();
        let activityConfig: ActivityBasic = ActivityConfig.getConfigById(ActivityConfig.ACTIVITY_TYPE.SEVEN_SIGN);
        this.sevenSignNode.active = false;
        activityConfig.rewardParam.reward;
        this.sendRes([activityConfig.rewardParam.reward[day - 1]], false);
    }

    /**
     * 领取七日签到奖励（广告)
     */
    public receiveSevenSignAd(event, customEventData) {
        SdkCtrl.getInstance().ShowRewardedVideoAd(() => {
            let day = this.getAndSetSevenSign();
            let activityConfig: ActivityBasic = ActivityConfig.getConfigById(ActivityConfig.ACTIVITY_TYPE.SEVEN_SIGN);
            this.sevenSignNode.active = false;
            this.sendRes([activityConfig.rewardParam.reward[day - 1]], true);
            PlayerCacheCtrl.getInstance().calcPlayerDailyInfo(TaskConfig.DAILY_TASK_CONDITION_TYPE.AD, 1);
        })
    }

    /**
     * 七日签到数据操作
     */
    public getAndSetSevenSign() {
        // 数据操作
        let activityInfo = PlayerCacheCtrl.getInstance().getPlayerActivityInfo(ActivityConfig.ACTIVITY_TYPE.SEVEN_SIGN);
        if (activityInfo == null) {
            activityInfo = {
                day: 0,
                signTime: 0
            };
        }

        let canSignDay = (activityInfo.day % 7) + 1;

        // 更新签到天数
        activityInfo.day = activityInfo.day + 1;
        activityInfo.signTime = new Date().getTime();
        PlayerCacheCtrl.getInstance().setPlayerActivityInfo(ActivityConfig.ACTIVITY_TYPE.SEVEN_SIGN, activityInfo);

        return canSignDay;
    }

    /**
    * 展示幸运转盘
    * @param activityConfig 活动配置
    */
    public showTurntable(activityConfig: ActivityBasic) {
        cc.log("展示幸运转盘");

        // 指针角度重置
        let turntablePointNode = this.turntableNode.getChildByName("turntableView").getChildByName("turntablePoint");
        turntablePointNode.angle = 0;

        // 用户可转动的次数
        let activityInfo = PlayerCacheCtrl.getInstance().getPlayerActivityInfo(ActivityConfig.ACTIVITY_TYPE.TURNTABLE);
        if (activityInfo == null) {
            activityInfo = {
                turnCount: 0,
                lastTurnTime: 0
            }
        }

        // 如果上次转动时间不是今天，重置转动次数
        if (activityInfo.lastTurnTime < DateUtil.getTodayStartTime()) {
            activityInfo.turnCount = 0;
        }

        let canTurn = activityInfo.turnCount < activityConfig.rewardParam.turnCount &&
            (activityInfo.lastTurnTime + activityConfig.rewardParam.intervalTime) < new Date().getTime();

        // 循环创建转盘物品
        let reward = activityConfig.rewardParam.reward;
        let totalAngle = 360; // 总角度
        let singleAngle = totalAngle / reward.length; // 每个角度
        let turntable = this.turntableNode.getChildByName("turntableView").getChildByName("turntable");
        // 清空子元素
        turntable.removeAllChildren();
        for (let i = 0; i < reward.length; i++) {
            let item = reward[i];
            let itemConfig: ItemBasic = ItemConfig.getConfigById(item.itemId);

            let turntableItem = cc.instantiate(this.turntableItemPrefab);
            // 物品图片
            let itemPic: cc.Sprite = turntableItem.getChildByName("itemPic").getComponent(cc.Sprite);
            SpriteManager.getInstance().setBundleSpriteFrameByName(itemPic, itemConfig.srcPath);
            let itemCountLabel: cc.Label = turntableItem.getChildByName("itemCount").getComponent(cc.Label);
            itemCountLabel.string = item.itemCount;

            let angle = -((item.pos - 1) * singleAngle + totalAngle) % totalAngle;
            turntableItem.angle = angle % totalAngle;

            turntableItem.active = true;
            turntable.addChild(turntableItem);
        }
        cc.log(activityInfo.turnCount,activityConfig.rewardParam.turnCount,(activityInfo.turnCount < activityConfig.rewardParam.turnCount));
        let turnButton: cc.Button = this.turntableNode.getChildByName("turntableView").getChildByName("turnButton").getComponent(cc.Button);
        if (canTurn) {
            cc.log("可以转");
            // 显示转动按钮
            ButtonUtil._setEvent(this.node, turnButton, "ActivityCtrl", "turntableStart", "1");
            turnButton.node.active = true;
            
            this.turntableNode.getChildByName("turntableView").getChildByName("desc").active = false;
        } else if (activityInfo.turnCount < activityConfig.rewardParam.turnCount) {
            cc.log("冷却中");
            turnButton.node.active = false;
            // 提示剩余时间
            this.turntableNode.getChildByName("turntableView").getChildByName("desc").active = true;
            this._needUpdateTurntableTime = true;
            this._turntableIntervalTime = activityConfig.rewardParam.intervalTime;
            this._lastTurnTime = activityInfo.lastTurnTime;
        } else {
            cc.log("次数已耗尽");
            turnButton.node.active = false;
            // 提示转盘次数已耗尽
            this.turntableNode.getChildByName("turntableView").getChildByName("desc").active = true;
            this.turntableNode.getChildByName("turntableView").getChildByName("desc").getComponent(cc.Label).string = "今日转盘次数已用完";
        }

        // 显示关闭按钮
        let closeButton: cc.Button = this.turntableNode.getChildByName("turntableView").getChildByName("closeButton").getComponent(cc.Button);
        ButtonUtil._setEvent(this.node, closeButton, "ActivityCtrl", "closeView", "1");
        closeButton.node.active = true;

        // 隐藏领取奖励按钮
        let button: cc.Button = this.turntableNode.getChildByName("turntableView").getChildByName("confirmButton").getComponent(cc.Button);
        let adButton: cc.Button = this.turntableNode.getChildByName("turntableView").getChildByName("adButton").getComponent(cc.Button);
        button.node.active = false;
        adButton.node.active = false;


        this.turntableNode.active = true;
    }

    /**
     * 开始转动幸运转盘
     * @param event 
     * @param customEventData 
     */
    public turntableStart(event, customEventData) {
        // 隐藏转动按钮
        let turnButton: cc.Button = this.turntableNode.getChildByName("turntableView").getChildByName("turnButton").getComponent(cc.Button);
        turnButton.node.active = false;
        // 隐藏关闭按钮
        let closeButton: cc.Button = this.turntableNode.getChildByName("turntableView").getChildByName("closeButton").getComponent(cc.Button);
        closeButton.node.active = false;


        // 根据权重随机出奖励
        let activityConfig: ActivityBasic = ActivityConfig.getConfigById(ActivityConfig.ACTIVITY_TYPE.TURNTABLE);
        let reward = RandomUtil.RandomByWeight(activityConfig.rewardParam.reward);
        // 计算奖励位置
        let totalAngle = 360; // 总角度
        let singleAngle = totalAngle / activityConfig.rewardParam.reward.length; // 每个角度
        let startAngle = ((reward.pos - 1) * singleAngle - (singleAngle / 2) + totalAngle) % totalAngle;
        let endAngle = startAngle + singleAngle;
        let angle = RandomUtil.getRandom(startAngle, endAngle);
        let turnEndAngle = angle + (ActivityConfig.TURNTABLE_CIRCLE_NUM * totalAngle);
        cc.log(reward, turnEndAngle);

        this.setTurntableData();

        // 转动动画   缓入缓出
        let action = cc.rotateTo(ActivityConfig.TURNTABLE_TIME, turnEndAngle).easing(cc.easeCubicActionInOut());
        // 动作结束回调，显示奖励
        let turntablePointNode = this.turntableNode.getChildByName("turntableView").getChildByName("turntablePoint");
        // turntablePointNode.zIndex = 1000;
        
        AudioManager.getInstance().playTurntable();
        turntablePointNode.runAction(cc.sequence(action, cc.callFunc(() => {
            this.turntableEnd(reward.pos);
        })))
    }

    /**
     * 结束转动幸运转盘
     * @param pos 位置
     */
    public turntableEnd(pos) {
        AudioManager.getInstance().playNews();
        
        // 显示领取奖励按钮
        let button: cc.Button = this.turntableNode.getChildByName("turntableView").getChildByName("confirmButton").getComponent(cc.Button);
        ButtonUtil._setEvent(this.node, button, "ActivityCtrl", "receiveTurntable", "" + pos);
        button.node.active = true;

        let adButton: cc.Button = this.turntableNode.getChildByName("turntableView").getChildByName("adButton").getComponent(cc.Button);
        ButtonUtil._setEvent(this.node, adButton, "ActivityCtrl", "receiveTurntableAd", "" + pos);
        adButton.node.active = true;
    }

    /**
     * 领取幸运转盘奖励
     */
    public receiveTurntable(event, customEventData) {
        let pos = Number(customEventData);
        let activityConfig: ActivityBasic = ActivityConfig.getConfigById(ActivityConfig.ACTIVITY_TYPE.TURNTABLE);
        this.turntableNode.active = false;
        this.sendRes([activityConfig.rewardParam.reward[pos - 1]], false);
    }

    /**
     * 领取幸运转盘奖励（广告)
     */
    public receiveTurntableAd(event, customEventData) {
        SdkCtrl.getInstance().ShowRewardedVideoAd(() => {
            let pos = Number(customEventData);
            let activityConfig: ActivityBasic = ActivityConfig.getConfigById(ActivityConfig.ACTIVITY_TYPE.TURNTABLE);
            this.turntableNode.active = false;
            this.sendRes([activityConfig.rewardParam.reward[pos - 1]], true);
            PlayerCacheCtrl.getInstance().calcPlayerDailyInfo(TaskConfig.DAILY_TASK_CONDITION_TYPE.AD, 1);
        })
    }

    /**
    * 幸运转盘数据操作
    */
    public setTurntableData() {
        // 数据操作
        let activityInfo = PlayerCacheCtrl.getInstance().getPlayerActivityInfo(ActivityConfig.ACTIVITY_TYPE.TURNTABLE);
        if (activityInfo == null) {
            activityInfo = {
                turnCount: 0,
                lastTurnTime: 0
            };
        }
        activityInfo.turnCount = activityInfo.turnCount + 1;
        activityInfo.lastTurnTime = new Date().getTime();
        PlayerCacheCtrl.getInstance().setPlayerActivityInfo(ActivityConfig.ACTIVITY_TYPE.TURNTABLE, activityInfo);
    }


    /**
     * 更新下次转盘时间
     */
    private updateTurntableTime() {
        let canTurnTime = this._lastTurnTime + this._turntableIntervalTime;
        cc.log("canTurnTime");
        // 计算距离下一次更新时间还有多久
        let nowTime = new Date().getTime();
        if (canTurnTime > nowTime) {
            let sec = Math.ceil((canTurnTime - nowTime) / 1000);
            this.turntableNode.getChildByName("turntableView").getChildByName("desc").getComponent(cc.Label).string = "还有" + sec + "秒后可再次转动"
        } else {
            this._needUpdateTurntableTime = false;
            this.showTurntable(ActivityConfig.getConfigById(ActivityConfig.ACTIVITY_TYPE.TURNTABLE));
        }
    }


    /**
    * 展示成就奖励
    * @param activityConfig 活动配置
    */
    public showAchieveReward(activityConfig: ActivityBasic) {
        cc.log("展示成就奖励");
        TipCtrl.getInstance().tip(this.node, "功能正在开发中,敬请期待！")
    }

    /**
     * 关闭界面
     * @param event 
     * @param customEventData 
     */
    public closeView(event, customEventData) {
        AudioManager.getInstance().playCommonBtn();

        // 隐藏每日签到
        this.dailySignNode.active = false;

        // 隐藏七日签到
        this.sevenSignNode.active = false;

        // 隐藏幸运转盘
        this.turntableNode.active = false;
        this._needUpdateTurntableTime = false; // 退出幸运转盘界面


    }

    /**
     * 
     * @param itemList 资源列表
     * @param isAd 是否为广告翻倍
     */
    private sendRes(itemList, isAd) {
        
        AudioManager.getInstance().playGainReward();

        if (itemList != null && itemList.length > 0) {
            let resultItemList = [];
            for (let i = 0; i < itemList.length; i++) {
                let item = itemList[i];
                let itemCount = item.itemCount;
                if (isAd) {
                    itemCount *= 2;
                }
                resultItemList[i] = { itemId: item.itemId, itemCount: itemCount };
            }
            PlayerCacheCtrl.getInstance().addPlayerItemList(resultItemList);

            this.node.parent.getComponent(IndexCtrl).flushTopResNumLabel();
        }
    }

    update(dt) {
        this._currTime += (dt * 1000);

        this._checkRedPoint();



        if (this._needUpdateTurntableTime) {
            this.updateTurntableTime();
        }
    }

    public close() {
        this.node.active = false;
    }

    

    /**
     * 检查红点
     */
     private _checkRedPoint() {
        // 时间冷却中
        if(this._lastCheckRedPointTime + 1000 > this._currTime) {
            return;
        }

        this._checkSevenSignRedPoint();

        this._checkTurntableRedPoint();
        
        this._lastCheckRedPointTime = this._currTime;
    }


    /**
     * 检查七日签到红点
     */
    private _checkSevenSignRedPoint() {
        let activityInfo = PlayerCacheCtrl.getInstance().getPlayerActivityInfo(ActivityConfig.ACTIVITY_TYPE.SEVEN_SIGN);
        let canSign = activityInfo == null || DateUtil.getTodayStartTime() > activityInfo.signTime;

        let currActive = this.sevenSignIconNode.getChildByName("redPoint").active;
        if(canSign) {
            if(!currActive) {
                this.sevenSignIconNode.getChildByName("redPoint").active = true;
            }
        }else {
            if(currActive) {
                this.sevenSignIconNode.getChildByName("redPoint").active = false;
            }
        }
    }

    /**
     * 检查幸运转盘红点
     */
    private _checkTurntableRedPoint() {
        let activityConfig:ActivityBasic = ActivityConfig.getConfigById(ActivityConfig.ACTIVITY_TYPE.TURNTABLE);
        let activityInfo = PlayerCacheCtrl.getInstance().getPlayerActivityInfo(ActivityConfig.ACTIVITY_TYPE.TURNTABLE);
        let canTurn = activityInfo == null || (activityInfo.turnCount < activityConfig.rewardParam.turnCount &&
            (activityInfo.lastTurnTime + activityConfig.rewardParam.intervalTime) < new Date().getTime());
        
            
        let currActive = this.turntableIconNode.getChildByName("redPoint").active;
        if(canTurn) {
            if(!currActive) {
                this.turntableIconNode.getChildByName("redPoint").active = true;
            }
        }else {
            if(currActive) {
                this.turntableIconNode.getChildByName("redPoint").active = false;
            }
        }
    }
}
