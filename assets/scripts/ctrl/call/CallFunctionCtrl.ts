import CallConfig, { CallBasic, CallLevelBasic, CallTypeBasic } from "../../config/CallConfig";
import ButtonUtil from "../../utils/ButtonUtil";
import SpineUtil from "../../utils/SpineUtil";
import CallCtrl from "../CallCtrl";
import PlayerCacheCtrl from "../PlayerCacheCtrl";

const {ccclass, property} = cc._decorator;

/**
 * 召唤功能控制
 */
@ccclass
export default class CallFunctionCtrl extends cc.Component {
    /**
     * 主节点
     */
    private _callNode:cc.Node = null;
    /**
     * 召唤配置
     */
    private _callConfig:CallBasic = null;

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
        this._nowTime += (dt * 1000);

        if(this._lastCheckDiamondTime + this._checkDiamondIntervalTime < this._nowTime && PlayerCacheCtrl.getInstance().getPlayerDiamondNum() != this._playerDiamondNum) {
            this._lastCheckDiamondTime = this._nowTime;
            this._playerDiamondNum = PlayerCacheCtrl.getInstance().getPlayerDiamondNum();
            // 资源有变化才刷新
            this.updateNode();
        }
    }

    /**
     * 初始化
     * @param callNode 主节点
     * @param itemConfig 物品配置
     */
    public async init(callNode:cc.Node,callConfig:CallBasic) {
        this._callNode = callNode;
        this._callConfig = callConfig;

        let spSkeleton = this.node.getChildByName("spine").getComponent(sp.Skeleton);
        spSkeleton.skeletonData = await SpineUtil.getInstance().getBundleSkeletonData(this._callConfig.spine);
        SpineUtil.getInstance().playSpineAni(spSkeleton,null,"start",true,false);
       
        this.updateNode();

        this.node.active = true;
    }

    public showOddsView() {
        this._callNode.getComponent(CallCtrl).showOddsView(this._callConfig.id);
    }

    private updateNode() {
         
        let playerCallInfo = PlayerCacheCtrl.getInstance().getPlayerCallInfo(this._callConfig.id);

        // 召唤名称
        this.node.getChildByName("top").getChildByName("title").getComponent(cc.Label).string = this._callConfig.name;

        // 召唤等级
        this.node.getChildByName("top").getChildByName("level").getComponent(cc.Label).string = "等级 " + playerCallInfo.level;

        // 是否已满级  / 获取升级配置
        let maxLevel = CallConfig.CALL_LEVEL_CONFIG.length;
        // 召唤经验值
        let expBar:cc.Sprite = this.node.getChildByName("top").getChildByName("expProgress").getChildByName("bar").getComponent(cc.Sprite);
        if(playerCallInfo.level >= maxLevel) {
            this.node.getChildByName("top").getChildByName("expProgress").getChildByName("num").getComponent(cc.Label).string = "已满级";
            expBar.fillRange = 1;
        }else {
            let callLevelConfig:CallLevelBasic = CallConfig.getCallLevelConfig(playerCallInfo.level + 1);
            this.node.getChildByName("top").getChildByName("expProgress").getChildByName("num").getComponent(cc.Label).string = playerCallInfo.exp + "/" + callLevelConfig.levelUpExp;
            expBar.fillRange = playerCallInfo.exp / callLevelConfig.levelUpExp;
        }

        ButtonUtil._setEvent(this.node, this.node.getChildByName("top").getChildByName("odds").getComponent(cc.Button),"CallFunctionCtrl","showOddsView", "");


        // 召唤类型1
        let singleButton:cc.Button = this.node.getChildByName("button").getChildByName("single").getComponent(cc.Button);
        this.dealCallButton(singleButton,1);
        
        // 召唤类型2
        let multipleButton:cc.Button = this.node.getChildByName("button").getChildByName("multiple").getComponent(cc.Button);
        this.dealCallButton(multipleButton,2);

        // 是否展示广告按钮
        let adButton:cc.Button = this.node.getChildByName("button").getChildByName("ad").getComponent(cc.Button);
        if(this._callConfig.showAdButton) {
            ButtonUtil._setEvent(this.node, adButton,"CallFunctionCtrl","call", "3");
            adButton.node.active = true;
        }else {
            adButton.node.active = false;
        }
    }

    /**
     * 处理召唤按钮
     * @param type 召唤类型
     */
    private dealCallButton(button:cc.Button,type:number) {
        let callTypeConfig:CallTypeBasic = CallConfig.getCallTypeConfig(type);
        let flag =  PlayerCacheCtrl.getInstance().checkPlayerItem([{itemId:callTypeConfig.itemId,itemCount:callTypeConfig.itemCount}]);
        if(flag) {
            ButtonUtil._setEvent(this.node, button,"CallFunctionCtrl","call", type + "");
            button.interactable = true;
        }else {
            button.interactable = false;
        }

        button.node.getChildByName("Background").getChildByName("cost").getChildByName("itemCount").getComponent(cc.Label).string = callTypeConfig.itemCount + "";
        button.node.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = callTypeConfig.name;
    }

    /**
     * 召唤
     * @param event 
     * @param customerData 召唤类型 1、2、3
     */
    public call(event, customerData) {
        cc.log(".....",customerData);
        let callCtrl:CallCtrl = this._callNode.getComponent(CallCtrl);
        if(callCtrl) {
            let data = this._callConfig.id + "_" + Number(customerData);
            callCtrl.call(null,data);
            this.updateNode();
        }
    }
}
