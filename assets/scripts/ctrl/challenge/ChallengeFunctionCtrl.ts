import { ChallengeBasic } from "../../config/ChallengeConfig";
import ResPathKey from "../../config/ResPathKey";
import SpriteManager from "../../manager/SpriteManager";
import ButtonUtil from "../../utils/ButtonUtil";
import CallCtrl from "../CallCtrl";
import ChallengeCtrl from "../ChallengeCtrl";
import PlayerCacheCtrl from "../PlayerCacheCtrl";

const {ccclass, property} = cc._decorator;

/**
 * 挑战副本功能控制
 */
@ccclass
export default class ChallengeFunctionCtrl extends cc.Component {
    /**
     * 主节点
     */
    private _challengeNode:cc.Node = null;
    /**
     * 副本配置
     */
    private _challengeConfig:ChallengeBasic = null;

    /**
     * 玩家钻石数量
     */
    private _playerDiamondNum:number = 0;

    /**
     * 上一次检查钻石数量时间
     */
    private _lastCheckDiamondTime:number = 0;

    /**
     * 检查钻石数量间隔时间
     */
    private _checkDiamondIntervalTime:number = 200;

    /**
     * 当前时间
     */
    private _nowTime:number = 0;


    onLoad() {
        
    }

 

    start() {

    }

    update(dt) {
        // this._nowTime += (dt * 1000);
    }

    /**
     * 初始化
     * @param challengeNode 主节点
     * @param challengeConfig 配置
     */
    public async init(challengeNode:cc.Node,challengeConfig:ChallengeBasic) {
        this._challengeNode = challengeNode;
        this._challengeConfig = challengeConfig;

        // 名称
        this.node.getChildByName("name").getComponent(cc.Label).string = this._challengeConfig.name;
        // 介绍
        this.node.getChildByName("desc").getComponent(cc.Label).string = this._challengeConfig.desc;
       
        // 标签图片
        SpriteManager.getInstance().setBundleSpriteFrameByName(this.node.getChildByName("pic").getComponent(cc.Sprite), this._challengeConfig.labelPic);

        this.updateNode();

        this.node.active = true;
    }

    public showOddsView() {
        this._challengeNode.getComponent(CallCtrl).showOddsView(this._challengeConfig.id);
    }

    public updateNode() {
         
        let playerChallengeInfo = PlayerCacheCtrl.getInstance().getPlayerChallengeInfo(this._challengeConfig.id);

        // 次数
        let count = playerChallengeInfo.count;
        let adCount = playerChallengeInfo.adCount;

        // 挑战
        let enterButton:cc.Button = this.node.getChildByName("enterButton").getComponent(cc.Button);

        enterButton.interactable = true;
        // 正常次数
        if(count == 0) {
            // 广告次数
            if(adCount == 0) {
                enterButton.interactable = false;
                this.node.getChildByName("countBg").getChildByName("count").getComponent(cc.Label).string = 0 + "/" + this._challengeConfig.dailyCount;
                SpriteManager.getInstance().setBundleSpriteFrameByName(this.node.getChildByName("countBg").getChildByName("pic").getComponent(cc.Sprite), ResPathKey.KEY);
            }else {
                SpriteManager.getInstance().setBundleSpriteFrameByName(enterButton.node.getChildByName("Background").getComponent(cc.Sprite), ResPathKey.BUTTON_YELLOW);
                SpriteManager.getInstance().setBundleSpriteFrameByName(this.node.getChildByName("countBg").getChildByName("pic").getComponent(cc.Sprite), ResPathKey.AD);
                ButtonUtil._setEvent(this.node, enterButton,"ChallengeFunctionCtrl","enter", "2");
                this.node.getChildByName("countBg").getChildByName("count").getComponent(cc.Label).string = adCount + "/" + this._challengeConfig.adCount;
            }
        }else {
            SpriteManager.getInstance().setBundleSpriteFrameByName(enterButton.node.getChildByName("Background").getComponent(cc.Sprite), ResPathKey.BUTTON_GREEN);
            SpriteManager.getInstance().setBundleSpriteFrameByName(this.node.getChildByName("countBg").getChildByName("pic").getComponent(cc.Sprite), ResPathKey.KEY);
            ButtonUtil._setEvent(this.node, enterButton,"ChallengeFunctionCtrl","enter", "1");
            this.node.getChildByName("countBg").getChildByName("count").getComponent(cc.Label).string = count + "/" + this._challengeConfig.dailyCount;
        }

    }

    /**
     * 挑战
     * @param event 
     * @param customerData 挑战类型：1-正常 2-广告
     */
    public enter(event, customerData) {
        let challengeCtrl:ChallengeCtrl = this._challengeNode.getComponent(ChallengeCtrl);
        if(challengeCtrl) {
            let playerChallengeInfo = PlayerCacheCtrl.getInstance().getPlayerChallengeInfo(this._challengeConfig.id);
            challengeCtrl.showChallengeDetail(this._challengeConfig.id,playerChallengeInfo.level);
        }
    }
}
