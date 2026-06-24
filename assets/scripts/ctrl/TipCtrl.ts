
import TipLabelCtrl from "./TipLabelCtrl";
import ResPathKey from "../config/ResPathKey";
import ObjectManager from "../manager/ObjectManager";
import DamageCtrl from "./DamageCtrl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TipCtrl extends cc.Component {

    private static _instance: TipCtrl = null;

    /**
     * 伤害文本节点对象池
     */
    private damageNodeList = [];

    public static getInstance() {
        if (!this._instance) {
            this._instance = new TipCtrl();
            this._instance._init();
        }
        
        return this._instance;
    }
   
    public static destroyInstance() {
        if (this._instance) {
            this._instance._destroy();
            delete this._instance;
            this._instance = null;
        }
    }
    
    private _init() {
    }
    
    private _destroy() { }

    /**
     * 提示信息
     * @param parentNode 父节点
     * @param content 提示内容
     */
    public async tipWithColor(parentNode,content,color,pos:cc.Vec2=null) {
        let duration = 1000; // 临时设置1秒
        let prefab = await ObjectManager.getInstance().getObjectPrefab(ResPathKey.TIP_PREFAB);
        let tip = cc.instantiate(prefab);

        if(color) {
            tip.color = new cc.Color().fromHEX(color);
        }

        if(pos) {
            tip.setPosition(pos);
        }

        tip.getComponent(TipLabelCtrl).init(content,duration);
        tip.zIndex = 100;
        parentNode.addChild(tip);
        tip.active = true;
    }

    /**
     * 提示信息
     * @param parentNode 父节点
     * @param content 提示内容
     * @param color 字体颜色
     */
    public async tip(parentNode,content) {
        this.tipWithColor(parentNode, content, null);
    }

    /**
     * 伤害提示信息
     * @param parentNode 父节点
     * @param content 提示内容
     * @param color 颜色 如#ffffff
     * @param pos 位置 
     */
     public async damageWithColor(parentNode:cc.Node,content,color,pos:cc.Vec2=null) {
        let prefab = await ObjectManager.getInstance().getObjectPrefab(ResPathKey.DAMAGE_PREFAB);

        let damage:cc.Node = this.damageNodeList.pop();
        if(damage == null) {
            damage = cc.instantiate(prefab);
        }
        parentNode.addChild(damage);

        if(color) {
            damage.color = new cc.Color().fromHEX(color);
        }else {
            damage.color = new cc.Color().fromHEX("#ffffff"); // 默认白色
        }

        if(pos) {
            damage.setPosition(pos);
        }

        damage.getComponent(DamageCtrl).init(content);
    }

    /**
     * 回收伤害节点
     * @param parentNode 父节点
     * @param node 节点
     */
    public recoverDamageNode(parentNode:cc.Node,node:cc.Node) {
        parentNode.removeChild(node);
        this.damageNodeList.push(node);
    }
    
}
