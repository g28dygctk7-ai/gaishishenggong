import ChallengeConfig, { ChallengeBasic, ChallengeLevelBasic } from "../config/ChallengeConfig";
import ChapterConfig, { ChapterBasic } from "../config/ChapterConfig";
import ItemConfig, { ItemBasic } from "../config/ItemConfig";
import ResPathKey from "../config/ResPathKey";
import TaskConfig from "../config/TaskConfig";
import AudioManager from "../manager/AudioManager";
import SpriteManager from "../manager/SpriteManager";
import ButtonUtil from "../utils/ButtonUtil";
import DateUtil from "../utils/DateUtil";
import TxtUtil from "../utils/TxtUtil";
import SdkCtrl from "../utils/WxSdkUtil";
import ChallengeFunctionCtrl from "./challenge/ChallengeFunctionCtrl";
import MainCtrl from "./MainCtrl";
import PlayerCacheCtrl from "./PlayerCacheCtrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ChallengeCtrl extends cc.Component {
    @property({ type: cc.Node, tooltip: '挑战副本内容节点' })
    challengeInfoContentNode: cc.Node = null;

    @property({ type: cc.Prefab, tooltip: '挑战副本预制体' })
    challengeInfoPrefab: cc.Prefab = null;

    /**
     * 当前时间
     */
    private _currTime:number = 0;

    /**
     * 进入副本时间
     */
    private _enterChallengeTime:number = 0;


    /**
     * 挑战副本信息
     */
    private _challengeInfoList = [];

    onLoad() {

    }

    onEnable() {
        this._init();
    }

    /**
     * 初始化
     */
    private _init() {
        this._checkChallengeCount();
        this._initChallengeInfoList();
    }

    /**
     * 检查挑战次数是否需要补充
     */
    private _checkChallengeCount() {
        for (let i = 0; i < ChallengeConfig.CONFIG.length; i++) {
            let challengeConfig: ChallengeBasic = ChallengeConfig.CONFIG[i];
            let playerChallengeInfo = PlayerCacheCtrl.getInstance().getPlayerChallengeInfo(challengeConfig.id);
            // 更新时间到了
            if (playerChallengeInfo.updateTime < DateUtil.getTodayStartTime()) {
                playerChallengeInfo.updateTime = new Date().getTime();

                // 正常次数可叠加
                playerChallengeInfo.count += challengeConfig.dailyCount;

                // 广告次数有封顶
                if (playerChallengeInfo.adCount < challengeConfig.adCount) {
                    playerChallengeInfo.adCount = challengeConfig.adCount;
                }

                PlayerCacheCtrl.getInstance().setPlayerChallengeInfo(challengeConfig.id, playerChallengeInfo);
            }
        }
    }

    /**
     * 初始化召唤信息列表
     */
    private _initChallengeInfoList() {
        this.challengeInfoContentNode.removeAllChildren();
        this._challengeInfoList = [];
        for (let i = 0; i < ChallengeConfig.CONFIG.length; i++) {
            let challengeConfig: ChallengeBasic = ChallengeConfig.CONFIG[i];
            if (challengeConfig.openStatus) {
                this._initChallengeInfo(challengeConfig);
            }
        }

    }


    /**
     * 初始化召唤信息
     * @param callConfig 召唤功能配置
     */
    private _initChallengeInfo(challengeConfig: ChallengeBasic) {
        let challengeInfo = cc.instantiate(this.challengeInfoPrefab);
        let _callInfo = {
            id: challengeConfig.id,
            node: challengeInfo
        }
        this._challengeInfoList.push(_callInfo);
        challengeInfo.getComponent(ChallengeFunctionCtrl).init(this.node, challengeConfig);
        this.challengeInfoContentNode.addChild(challengeInfo);
    }


    start() {

    }

    update(dt) {
        this._currTime += (dt * 1000);
    }

    /**
     * 关闭副本界面
     */
    public close() {
        AudioManager.getInstance().playCommonBtn();
        this.node.active = false;
    }

    /**
     * 左右按钮展示副本详情信息
     * @param event 
     * @param customerData 
     */
    public showChallengeDetailSwitch(event, customerData) {
        let idAndLevel = String(customerData).split("_");
        let challengeId = Number(idAndLevel[0]);
        let level = Number(idAndLevel[1]);
        this.showChallengeDetail(challengeId, level);
    }

    /**
     * 展示副本详细信息
     * @param challengeId 副本ID
     * @param level 副本等级
     */
    public showChallengeDetail(challengeId: number, level: number) {
        let challengeConfig: ChallengeBasic = ChallengeConfig.getConfigById(challengeId);
        if (challengeConfig == null) {
            return;
        }

        let challengeLevelConfig: ChallengeLevelBasic = ChallengeConfig.getLevelConfig(challengeId, level);
        if (challengeLevelConfig == null) {
            return;
        }

        let itemId = challengeLevelConfig.reward.itemId;
        let itemConfig: ItemBasic = ItemConfig.getConfigById(itemId);
        if (itemConfig == null) {
            return;
        }

        AudioManager.getInstance().playCommonBtn();

        let view = this.node.getChildByName("challengeDetail").getChildByName("view");

        // 名称与标签图片
        view.getChildByName("top").getChildByName("name").getComponent(cc.Label).string = challengeConfig.name;
        SpriteManager.getInstance().setBundleSpriteFrameByName(view.getChildByName("top").getChildByName("pic").getComponent(cc.Sprite), challengeConfig.labelPic);


        // 难度
        view.getChildByName("levelInfo").getChildByName("levelBox").getChildByName("level").getComponent(cc.Label).string = "" + level;

        let playerChallengeInfo = PlayerCacheCtrl.getInstance().getPlayerChallengeInfo(challengeId);
        // 左边按钮
        let leftButton = view.getChildByName("levelInfo").getChildByName("leftButton");
        if (level - 1 > 0) {
            leftButton.active = true;
            ButtonUtil._setEvent(this.node, leftButton.getComponent(cc.Button), "ChallengeCtrl", "showChallengeDetailSwitch", challengeId + "_" + (level - 1));
        } else {
            leftButton.active = false;
        }

        // 右边按钮
        let rightButton = view.getChildByName("levelInfo").getChildByName("rightButton");
        if (level + 1 <= playerChallengeInfo.level && level + 1 <= challengeConfig.levelConfig.length) {
            ButtonUtil._setEvent(this.node, rightButton.getComponent(cc.Button), "ChallengeCtrl", "showChallengeDetailSwitch", challengeId + "_" + (level + 1));
            rightButton.active = true;
        } else {
            rightButton.active = false;
        }

        // 副本奖励物品的图片与数量
        SpriteManager.getInstance().setBundleSpriteFrameByName(view.getChildByName("reward").getChildByName("itemPic").getComponent(cc.Sprite), itemConfig.srcPath);
        let itemCount = challengeLevelConfig.reward.itemCount;
        view.getChildByName("reward").getChildByName("itemCount").getComponent(cc.Label).string = TxtUtil.parseTxt(String(itemCount));

        // 挑战按钮
        // 次数
        let count = playerChallengeInfo.count;
        let adCount = playerChallengeInfo.adCount;
        // 挑战
        let enterButton: cc.Button = view.getChildByName("enterButton").getComponent(cc.Button);
        enterButton.interactable = true;
        // 正常次数
        if (count == 0) {
            // 广告次数
            if (adCount == 0) {
                enterButton.interactable = false;
                this.node.getChildByName("countBg").getChildByName("count").getComponent(cc.Label).string = 0 + "/" + challengeConfig.dailyCount;
                SpriteManager.getInstance().setBundleSpriteFrameByName(view.getChildByName("countBg").getChildByName("pic").getComponent(cc.Sprite), ResPathKey.KEY);
            } else {
                SpriteManager.getInstance().setBundleSpriteFrameByName(enterButton.node.getChildByName("Background").getComponent(cc.Sprite), ResPathKey.BUTTON_YELLOW);
                SpriteManager.getInstance().setBundleSpriteFrameByName(view.getChildByName("countBg").getChildByName("pic").getComponent(cc.Sprite), ResPathKey.AD);
                ButtonUtil._setEvent(this.node, enterButton, "ChallengeCtrl", "enter",challengeId + "_" + level + "_2");
                view.getChildByName("countBg").getChildByName("count").getComponent(cc.Label).string = adCount + "/" + challengeConfig.adCount;
            }
        } else {
            SpriteManager.getInstance().setBundleSpriteFrameByName(enterButton.node.getChildByName("Background").getComponent(cc.Sprite), ResPathKey.BUTTON_GREEN);
            SpriteManager.getInstance().setBundleSpriteFrameByName(view.getChildByName("countBg").getChildByName("pic").getComponent(cc.Sprite), ResPathKey.KEY);
            ButtonUtil._setEvent(this.node, enterButton, "ChallengeCtrl", "enter", challengeId + "_" + level + "_1");
            view.getChildByName("countBg").getChildByName("count").getComponent(cc.Label).string = count + "/" + challengeConfig.dailyCount;
        }

        this.node.getChildByName("challengeDetail").active = true;
    }


    /**
     * 挑战
     * @param event 
     * @param customerData challengeId_level_type     挑战类型：1-正常 2-广告
     */
    public enter(event, customerData) {
        let idLevelType = String(customerData).split("_");
        let challengeId = Number(idLevelType[0]);
        let level = Number(idLevelType[1]);
        let type = Number(idLevelType[2]);

        AudioManager.getInstance().playCommonBtn();

        let playerChallengeInfo = PlayerCacheCtrl.getInstance().getPlayerChallengeInfo(challengeId);
        if (type == 1) {
            if (playerChallengeInfo.adCount < 0) {
                return;
            }
            playerChallengeInfo.count -= 1;
            PlayerCacheCtrl.getInstance().setPlayerChallengeInfo(challengeId, playerChallengeInfo);
            this.execEnter(challengeId,level);
        } else if (type == 2) {
            if (playerChallengeInfo.adCount < 0) {
                return;
            }
            SdkCtrl.getInstance().ShowRewardedVideoAd(() => {
                playerChallengeInfo.adCount -= 1;
                PlayerCacheCtrl.getInstance().setPlayerChallengeInfo(challengeId, playerChallengeInfo);
                this.execEnter(challengeId,level);
                PlayerCacheCtrl.getInstance().calcPlayerDailyInfo(TaskConfig.DAILY_TASK_CONDITION_TYPE.AD, 1);
            })
        }
    }

    /**
    * 执行挑战
    * @param challengeId 副本ID
    * @param level 副本等级
    */
    private execEnter(challengeId:number, level:number) {
        // 更新副本节点
        this.updateChallengeNode(challengeId);

        // 隐藏详细界面
        this.closeChallengeDetail();

        let mainCtrl: MainCtrl = this.node.parent.parent.getChildByName("main").getComponent(MainCtrl);
        if (mainCtrl) {
            mainCtrl.enterChallenge(challengeId, level);
        }
        
        this._enterChallengeTime = this._currTime;

        // 隐藏副本列表与关闭按钮
        this.node.getChildByName("bottom").active = false;
        this.node.getChildByName("challengeView").getChildByName("pageView").active = false;

        // 显示正在战斗中
        this.node.getChildByName("challengeView").getChildByName("fighting").active = true;
    }

    /**
     * 逃跑
     */
    public cancelFight() {
        if(this._currTime - this._enterChallengeTime < 1500) { // 1.5秒后才允许逃跑
            return;
        }
        
        AudioManager.getInstance().playCommonBtn();

        let mainCtrl: MainCtrl = this.node.parent.parent.getChildByName("main").getComponent(MainCtrl);
        if (mainCtrl) {
            mainCtrl.cancelChallenge();
        }
        this.challengeOver();
    }

    /**
     * 副本结束
     */
    public challengeOver() {
        this.node.getChildByName("challengeView").getChildByName("fighting").active = false;
        this.node.getChildByName("bottom").active = true;
        this.node.getChildByName("challengeView").getChildByName("pageView").active = true;
    }


    /**
     * 关闭副本详情界面
     */
    public closeChallengeDetail() {
        AudioManager.getInstance().playCommonBtn();
        this.node.getChildByName("challengeDetail").active = false;
    }

    /**
     * 更新副本节点
     * @param id 副本ID
     */
    private updateChallengeNode(id:number) {
        for(let i = 0;i < this._challengeInfoList.length; i++) {
            let challengeInfo = this._challengeInfoList[i];
            if(challengeInfo.id == id) {
                let challengeNode:cc.Node = challengeInfo.node;
                challengeNode.getComponent(ChallengeFunctionCtrl).updateNode();
                break;
            }
        }
    }

}
