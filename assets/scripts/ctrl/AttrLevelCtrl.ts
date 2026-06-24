import AttrLevelConfig, { AttrLevelBasic } from "../config/AttrLevelConfig";
import ItemConfig, { ItemBasic } from "../config/ItemConfig";
import ResPathKey from "../config/ResPathKey";
import { ItemInfo } from "../entity/ItemInfo";
import AudioManager from "../manager/AudioManager";
import SpriteManager from "../manager/SpriteManager";
import MathUtil from "../utils/MathUtil";
import TxtUtil from "../utils/TxtUtil";
import MainCtrl from "./MainCtrl";
import PlayerAttrCtrl from "./PlayerAttrCtrl";
import PlayerCacheCtrl from "./PlayerCacheCtrl";


const {ccclass, property} = cc._decorator;

/**
 * 属性等级控制
 */
@ccclass
export default class AttrLevelCtrl extends cc.Component {
    /**
     * 主节点
     */
    private _mainNode:cc.Node = null;

    /**
     * 属性等级配置
     */
    private _attrLevelConfig:AttrLevelBasic = null;

    /**
     * 状态枚举
     */
    private STATUS_MENU = {
        INIT: 1,
        NORMAL: 2
    }

    /**
     * 当前状态
     */
    private _status = this.STATUS_MENU.INIT;

    /**
     * 玩家资源数量   金币
     */
    private _playerItemCount = 0;

    /**
     * 触摸条件
     */
    private _touchFlag = false;

    /**
     * 触摸时间
     */
    private _touchStartTime = null;

    /**
     * 长按执行属性升级时间
     */
    private _execAttrLevelUpTime = null;

    /**
     * 已满级
     */
    private _isMaxLevel = false;

    onLoad() {
        // 绑定长按事件
        let buttonNode = this.node.getChildByName("levelUp");
        buttonNode.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        buttonNode.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
        buttonNode.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    }

    //触摸开始
    touchStart(){
        //触摸开始 
        this._touchFlag = true;
        //记录下触摸开始时间
        this._touchStartTime = new Date().getTime();

        if(!this._isMaxLevel) {
            this.node.getChildByName("select").active = true;
        }
    }
 
    //长按检测函数
    touchHold(){
        if(this._touchFlag && this._touchStartTime != null){
            //判断按钮的按压时长
            let nowTime = new Date().getTime();
            if(nowTime - this._touchStartTime > 300){ // 长按时间是否足够
                if( nowTime - this._execAttrLevelUpTime > 100) { // 每次升级的间隔
                    this._attrLevelUp();
                    this._execAttrLevelUpTime = new Date().getTime();
                }
            }
        }
    }
 
    //触摸结束
    touchEnd(){
        this._touchFlag = false;
        this._touchStartTime = null;
        //出发单击事务逻辑
        //todo...
        this._attrLevelUp();

        
        this.node.getChildByName("select").active = false;
    }

    start() {

    }

    update(dt) {

        if(this._touchFlag) {
            this.touchHold();
        }

        if(this._status == this.STATUS_MENU.NORMAL && this._playerItemCount != PlayerCacheCtrl.getInstance().getPlayerGoldNum() && !this._isMaxLevel) {
            this._playerItemCount = PlayerCacheCtrl.getInstance().getPlayerGoldNum();
            // 资源有变化才刷新
            this._updateAttrLevelInfo();
        }
    }

    /**
     * 初始化
     * @param mainNode 主节点
     * @param itemConfig 物品配置
     * @param initPosX 初始位置X
     * @param initPosY 初始位置Y
     * @param targetNode 目标节点
     */
    public init(mainNode:cc.Node,attrLevelConfig:AttrLevelBasic) {
        this._mainNode = mainNode;
        this._attrLevelConfig = attrLevelConfig;
        
        // 属性名
        let attrName = this.node.getChildByName("attrName").getComponent(cc.Label);
        attrName.string = this._attrLevelConfig.name;
        // 属性图片
        let attrPic:cc.Sprite = this.node.getChildByName("attrPic").getComponent(cc.Sprite);
        SpriteManager.getInstance().setBundleSpriteFrameByName(attrPic, this._attrLevelConfig.picPath);

        this._updateAttrLevelInfo(true);
        
        this.node.active = true;

        this._status = this.STATUS_MENU.NORMAL;
    }


    /**
     * 更新属性等级信息
     * @param first 首次更新
     */
    private _updateAttrLevelInfo(first:boolean = false) {
        // 获取玩家属性等级信息
        let playerAttrLevelInfo = PlayerCacheCtrl.getInstance().getPlayerAttrLevelInfo(this._attrLevelConfig.attrKey);
        // 玩家属性等级
        let playerAttrLevel = playerAttrLevelInfo.level;

        // 属性等级
        let attrLevel = this.node.getChildByName("attrLevel").getComponent(cc.Label);
        if(attrLevel.string != "Lv." + playerAttrLevel) {
            attrLevel.string = "Lv." + playerAttrLevel;
        }
        
        // 玩家属性值
        // let playerAttrVal = playerAttrLevelInfo.attrVal;

        // 属性值 - 展示时用的时玩家最终属性
        let playerAttrVal = PlayerAttrCtrl.getInstance()[this._attrLevelConfig.attrKey];
        let attrVal = this.node.getChildByName("attrVal").getComponent(cc.Label);
        if(  attrVal.string != (this._attrLevelConfig.valIsPct ? MathUtil.parsePctPlus(playerAttrVal) : playerAttrVal)) {
            attrVal.string = this._attrLevelConfig.valIsPct ? MathUtil.parsePctPlus(playerAttrVal) : TxtUtil.parseTxt(String(playerAttrVal));
        }


        // 计算强化消耗
        let costItem: ItemInfo = AttrLevelConfig.calcAttrLevelUpCost(this._attrLevelConfig.attrKey, playerAttrLevel);

        // 已满级
        let levelUpButton = this.node.getChildByName("levelUp").getComponent(cc.Button);
        let costNode = levelUpButton.node.getChildByName("Background").getChildByName("cost");
        let buttonLabel = levelUpButton.node.getChildByName("Background").getChildByName("Label").getComponent(cc.Label);
        if (this._attrLevelConfig.maxLevel != -1 && playerAttrLevel >= this._attrLevelConfig.maxLevel) { // 已满级
            if(levelUpButton.interactable == false) {
                levelUpButton.interactable = true;
            }
            
            SpriteManager.getInstance().setBundleSpriteFrameByName(levelUpButton.node.getChildByName("Background").getComponent(cc.Sprite), ResPathKey.BUTTON_BLUE); // 蓝色按钮

            costNode.active = false;
            buttonLabel.lineHeight = 40;
            buttonLabel.fontSize = 30;
            buttonLabel.string = "已满级";
            buttonLabel.node.setPosition(cc.v2(0,0));
            this._isMaxLevel = true;
        } else {
            // 强化消耗资源
            let itemConfig: ItemBasic = ItemConfig.getConfigById(costItem.itemId);
            // 首次更新需要处理
            if (first) {
                // 强化消耗资源的图片
                let costItemPic: cc.Sprite = costNode.getChildByName("itemPic").getComponent(cc.Sprite);
                SpriteManager.getInstance().setBundleSpriteFrameByName(costItemPic, itemConfig.srcPath);

                // 强化按钮事件
                // ButtonUtil._setEvent(this.node, levelUpButton, "AttrLevelCtrl", "attrLevelUp", this._attrLevelConfig.attrKey);
            }

            // 强化消耗资源的数量
            let costItemCount: cc.Label = costNode.getChildByName("itemCount").getComponent(cc.Label);
            costItemCount.string = TxtUtil.parseTxt(String(costItem.itemCount));

            costNode.active = true;

            if (!PlayerCacheCtrl.getInstance().checkPlayerItem([costItem])) { // 资源不够强化
                if(levelUpButton.interactable == true) {
                    levelUpButton.interactable = false;
                }
            } else {
                if(levelUpButton.interactable == false) {
                    levelUpButton.interactable = true;
                }
            }
        }
    }

    /**
     * 属性升级
     */
    public _attrLevelUp() {
        cc.log("属性升级：");

        let playerAttrLevelInfo = PlayerCacheCtrl.getInstance().getPlayerAttrLevelInfo(this._attrLevelConfig.attrKey);

        // 是否已满级
        if(this._attrLevelConfig.maxLevel != -1 && playerAttrLevelInfo.level >= this._attrLevelConfig.maxLevel) {
            return;
        }

        // 计算强化消耗
        let costItem: ItemInfo = AttrLevelConfig.calcAttrLevelUpCost(this._attrLevelConfig.attrKey, playerAttrLevelInfo.level);
        if(!PlayerCacheCtrl.getInstance().costPlayerItem(costItem.itemId,costItem.itemCount)) {
            return;
        }

        AudioManager.getInstance().playLevelUp();

        playerAttrLevelInfo.level += 1;
        playerAttrLevelInfo.attrVal += AttrLevelConfig.calcAttrLevelUpAddVal(this._attrLevelConfig.attrKey, playerAttrLevelInfo.level);

        // 数据操作
        PlayerCacheCtrl.getInstance().setPlayerAttrLevelInfo(this._attrLevelConfig.attrKey, playerAttrLevelInfo);

        // 刷新角色属性
        PlayerAttrCtrl.getInstance().calcPlayerAttr();
        let mainCtrl:MainCtrl = this._mainNode.getComponent(MainCtrl);
        if(mainCtrl) {
            mainCtrl.attrLevelUpEvent();
        }
    }
}
