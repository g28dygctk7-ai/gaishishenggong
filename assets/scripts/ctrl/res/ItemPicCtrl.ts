// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { ItemBasic } from "../../config/ItemConfig";
import SpriteManager from "../../manager/SpriteManager";
import PositionUtil from "../../utils/PositionUtil";
import MainCtrl from "../MainCtrl";
import PlayerCacheCtrl from "../PlayerCacheCtrl";

const {ccclass, property} = cc._decorator;

/**
 * 资源飘起来控制
 */
@ccclass
export default class ItemPicCtrl extends cc.Component {
    /**
     * 主节点
     */
    private _mainNode:cc.Node = null;

    /**
     * 物品配置
     */
    private _itemConfig:ItemBasic = null;


    /**
     * 物品数量
     */
    private _itemCount:number = 0;

    /**
     * 目标节点
     */
    private _targetNode:cc.Node = null;

    /**
     * 初始位置X
     */
    private _initPosX:number = null;

    /**
     * 初始位置Y
     */
    private _initPosY:number = null;

    /**
     * 移动速度 todo..
     */
    private _speed = 550;

     /**
     * 状态枚举
     */
    private STATUS_MENU = {
        INIT: 0, //初始化
        READY: 1, //准备好了
        NORMAL: 2, // 正常
        FINISH: 3, //结束了，可以销毁了
    }

    /**
     * 当前状态
     */
    private _status = this.STATUS_MENU.INIT;

    start() {

    }

    update(dt) {
        if(this._status == this.STATUS_MENU.NORMAL) {

            // 是否已经到达目标位置
            let targetPosition: cc.Vec2 = this.node.parent.convertToNodeSpaceAR(this._targetNode.convertToWorldSpaceAR(cc.Vec2.ZERO));
            let len = PositionUtil.calculationDis(this.node.position, targetPosition);
            if(len > (this._targetNode.width / 2)) {
                this._move(dt,targetPosition);
                return;
            }

            this._addPlayerItem();
        }
    }

    /**
     * 移动
     */
    private _move(dt,targetPosition) {
        let normalizeVec: cc.Vec2 = targetPosition.subtract(this.node.position).normalize();
        this.node.x += normalizeVec.x * this._speed * dt;
        this.node.y += normalizeVec.y * this._speed * dt;
    }

    /**
     * 增加玩家物品数量
     */
    private _addPlayerItem() {
        this.node.active = false; // 隐藏
        this._status = this.STATUS_MENU.FINISH;

        let mainCtrl:MainCtrl = this._mainNode.getComponent(MainCtrl);
        if(mainCtrl) { // 通知回收节点
            mainCtrl.itemPicNodeRecovery(this.node);
        }else { // 直接销毁
            this.node.destroy();
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
    public init(mainNode:cc.Node,itemConfig:ItemBasic,itemCount:number,initPosX:number,initPosY:number,targetNode:cc.Node) {
        this._mainNode = mainNode;
        this._itemConfig = itemConfig;
        this._targetNode = targetNode;
        this._initPosX = initPosX;
        this._initPosY = initPosY;
        this._itemCount = itemCount;
        this._init();
    }

    private async _init() {
        // 技能图片
        if(this._itemConfig.srcPath) {
            let pic:cc.Sprite = this.node.getComponent(cc.Sprite);
            SpriteManager.getInstance().setBundleSpriteFrameByName(pic, this._itemConfig.srcPath);
        }

        this.node.setPosition(cc.v2(this._initPosX,this._initPosY));

        this.node.active = true;

        // 正常状态
        this._status = this.STATUS_MENU.NORMAL;
    }

}
