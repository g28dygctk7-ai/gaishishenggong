// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ItemConfig, { ItemBasic } from "../config/ItemConfig";
import ButtonUtil from "../utils/ButtonUtil";
import PlayerCacheCtrl from "./PlayerCacheCtrl";
import PlayerAttrCtrl from "./PlayerAttrCtrl";
import SpriteManager from "../manager/SpriteManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class MineCtrl extends cc.Component {

    @property(cc.Label)
    levelName: cc.Label = null;
    @property(cc.Label)
    atk: cc.Label = null;
    @property(cc.Label)
    def: cc.Label = null;
    @property(cc.Label)
    hp: cc.Label = null;
    @property(cc.Label)
    crit: cc.Label = null;

    @property(cc.Label)
    itemName: cc.Label = null;
    @property(cc.Label)
    itemDesc: cc.Label = null;
    @property(cc.Prefab)
    itemPrefab: cc.Prefab = null;
    @property(cc.Node)
    itemContentNode:cc.Node = null; // 物品父节点

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        
    }

    onEnable () {
        this.flushAll();
    }

    start () {

    }

    // update (dt) {}

    /**
     * 刷新所有信息
     */
    private flushAll() {
        this.flushPlayerAttr();
        this.flushPlayerItem();
    }

    /**
     * 刷新玩家属性信息
     */
    private flushPlayerAttr() {
        this.levelName.string = PlayerAttrCtrl.getInstance().levelName;
        this.atk.string = "" + PlayerAttrCtrl.getInstance().atk;
        this.def.string = "" + PlayerAttrCtrl.getInstance().def;
        this.hp.string = "" + PlayerAttrCtrl.getInstance().hp;
        this.crit.string = PlayerAttrCtrl.getInstance().crit + "%";
    }


    /**
     * 刷新玩家物品信息
     */
    private flushPlayerItem() {
        // 渲染时先清除子节点
        this.itemContentNode.removeAllChildren();

        // 玩家物品列表
        let playerItemList = PlayerCacheCtrl.getInstance().getPlayerItemList();

         // 用于记录是否为第一个渲染的物品，方便渲染物品名称、介绍
        let firstItem = true;

        for(const id in playerItemList) {
            // 查看物品配置
            let itemConfig:ItemBasic = ItemConfig.CONFIG_MAP.get(Number(id));
            if(itemConfig == null) {
                continue;
            }

            // 是否需要展示在背包
            if(!itemConfig.backpackShow) {
                continue;
            }

            if(playerItemList[id] <= 0) {
                continue;
            }

            this.initItem(itemConfig, playerItemList[id],firstItem);

            firstItem = false;
        }
    }

    /**
     * 初始化物品信息
     * @param itemConfig 物品配置
     * @param itemCount 物品数量
     */
    private initItem(itemConfig:ItemBasic, itemCount:number, firstItem:boolean) {
        let item = cc.instantiate(this.itemPrefab);

        // 物品图片
        let itemPic:cc.Sprite = item.getChildByName("pic").getComponent(cc.Sprite);
        SpriteManager.getInstance().setBundleSpriteFrameByName(itemPic,itemConfig.srcPath);

        let itemCountLabel:cc.Label = item.getChildByName("itemCount").getComponent(cc.Label);
        itemCountLabel.string = "" + itemCount;

         // 渲染点击事件
        let button = item.getComponent(cc.Button);
        ButtonUtil._setEvent(this.node,button,"MineCtrl","chooseItem",itemConfig.id+"");

        // 添加到内容节点，并启用
        this.itemContentNode.addChild(item);
        item.active = true;

        if(firstItem) {
            this.itemName.string = itemConfig.name;
            this.itemDesc.string = itemConfig.desc;
        }
 
    }

    /**
     * 选择物品
     * @param event 
     * @param customEventData 
     */
    public chooseItem(event, customEventData) {
        if(customEventData == null) {
            return;
        }

        // 查看物品配置
        let itemConfig:ItemBasic = ItemConfig.CONFIG_MAP.get(Number(customEventData));
        if(itemConfig == null) {
            return;
        }

        // 更新物品名称和介绍
        this.itemName.string = itemConfig.name;
        this.itemDesc.string = itemConfig.desc;
    }

    public testGetSkill(event, customEventData) {
        if(customEventData == null) {
            return;
        }

        let itemArr = String(customEventData).split(",");
        let itemId = Number(itemArr[0]);
        let itemCount = Number(itemArr[1]);
        if(ItemConfig.getConfigById(itemId) == null) {
            return;
        }

        PlayerCacheCtrl.getInstance().addPlayerItem(itemId,itemCount);

        // 渲染
        this.flushPlayerItem();
    }
}
