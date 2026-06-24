// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import GlobalConfig from "../config/GlobalConfig";
import ItemConfig, { ItemBasic } from "../config/ItemConfig";
import AudioManager from "../manager/AudioManager";
import SpriteManager from "../manager/SpriteManager";
import ButtonUtil from "../utils/ButtonUtil";
import TxtUtil from "../utils/TxtUtil";
import PlayerCacheCtrl from "./PlayerCacheCtrl";
import TipCtrl from "./TipCtrl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class IndexCtrl extends cc.Component {

    @property(cc.Node)
    generalFunctionNode:cc.Node = null;

    @property(cc.Node)
    skillFunctionNode:cc.Node = null;

    @property(cc.Node)
    petFunctionNode:cc.Node = null;

    @property(cc.Node)
    challengeFunctionNode:cc.Node = null;

    @property(cc.Node)
    callFunctionNode:cc.Node = null;

    @property(cc.Label)
    goldNumLabel:cc.Label = null;

    @property(cc.Label)
    diamondNumLabel:cc.Label = null;

    @property(cc.Node)
    rewardNode:cc.Node = null;
    @property(cc.Prefab)
    itemPrefab: cc.Prefab = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}

    toFunction(event,customEventData) {
        
        AudioManager.getInstance().playCommonBtn();

        this.allFunctionHidden();
        if(customEventData == 1) {
            this.toGeneralFunction();
        }else if(customEventData == 2){
            this.toSkillFunction();
        }else if(customEventData == 3){
            this.toPetFunction();
        }else if(customEventData == 4){
            this.toChallengeFunction();
        }else if(customEventData == 5){
            this.toCallFunction();
        }
    }

    /**
     * 关闭功能
     * @param event 
     * @param customEventData 
     */
    closeFunction(event,customEventData) {
        this.allFunctionHidden();
    }
    
    // 隐藏所有
    public allFunctionHidden() {
        this.generalFunctionNode.active = false;
        this.skillFunctionNode.active = false;
        this.petFunctionNode.active = false;
        this.challengeFunctionNode.active = false;
        this.callFunctionNode.active = false;
    }    
    
    // 1-角色
    toGeneralFunction() {
        this.generalFunctionNode.active = true;
    }

    // 2-技能
    toSkillFunction() {
        this.skillFunctionNode.active = true;
    }

    // 3-宠物
    toPetFunction() {
        this.petFunctionNode.active = true;
    }

    // 4-副本
    toChallengeFunction() {
        this.challengeFunctionNode.active = true;
    }
    
    // 5-召唤
    toCallFunction() {
        this.callFunctionNode.active = true;
    }

    onEnable() {
        // 重新渲染玩家金币数量
        this.flushTopResNumLabel();
    }

    
    // 渲染顶部资源数量
    public flushTopResNumLabel() {
        this.goldNumLabel.string = TxtUtil.parseTxt( PlayerCacheCtrl.getInstance().getPlayerGoldNum() + "");
        this.diamondNumLabel.string = TxtUtil.parseTxt(PlayerCacheCtrl.getInstance().getPlayerItemNum(Number(ItemConfig.ITEM_CONST.DIAMOND)) + "");
    }


    /**
     * 奖励弹窗
     * @param showTitle 弹窗标题
     * @param itemList 奖励物品列表
     */
    public showReward(title:string ,itemList:any) {
        let titleLabel:cc.Label = this.rewardNode.getChildByName("reward").getChildByName("title").getComponent(cc.Label);
        titleLabel.string = title;

        let contentNode:cc.Node = this.rewardNode.getChildByName("reward").getChildByName("itemPageView").getChildByName("view").getChildByName("content");
        contentNode.removeAllChildren();

        for(let i = 0;i < itemList.length; i++) {
            let itemInfo = itemList[i];
            let itemId = itemInfo.itemId;
            let itemCount = itemInfo.itemCount;
            let itemConfig:ItemBasic = ItemConfig.getConfigById(itemId);

            let item = cc.instantiate(this.itemPrefab);
            // 物品图片
            let itemPic:cc.Sprite = item.getChildByName("pic").getComponent(cc.Sprite);
            SpriteManager.getInstance().setBundleSpriteFrameByName(itemPic,itemConfig.srcPath);
    
            let itemCountLabel:cc.Label = item.getChildByName("itemCount").getComponent(cc.Label);
            itemCountLabel.string = "" + itemCount;
    
            // 添加到内容节点，并启用
            contentNode.addChild(item);
            item.active = true;
        }

        let button:cc.Button = this.rewardNode.getChildByName("reward").getChildByName("confirmButton").getComponent(cc.Button);

        ButtonUtil._setEvent(this.node,button,"IndexCtrl","confirmTip","1");

        this.rewardNode.active = true;
    }

    /**
     * 提示框确认事件
     * @param event 
     * @param customEventData 
     */
    public confirmTip(event, customEventData) {
        if(customEventData == null) {
            return;
        }

        // 提示类型
        let tipType = Number(customEventData);

        if(tipType == 1) { // 奖励弹窗
            this.rewardNode.active = false;
        }

    }


    // 测试增加资源 itemId_itemCount
    testAddRes(event,customEventData) {
        if(GlobalConfig.IS_TEST) {
            let item = customEventData.toString().split("_");
            PlayerCacheCtrl.getInstance().addPlayerItem(Number(item[0]),Number(item[1]));
            this.flushTopResNumLabel();
        }
    }
}
