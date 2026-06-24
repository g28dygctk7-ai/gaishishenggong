// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ItemConfig, { ItemBasic } from "../config/ItemConfig";
import ButtonUtil from "../utils/ButtonUtil";
import PlayerCacheCtrl from "./PlayerCacheCtrl";
import TipCtrl from "./TipCtrl";
import FightConfig, { FightBasic } from "../config/FightConfig";
import CacheUtil from "../utils/CacheUtil";
import CacheKey from "../config/CacheKey";
import SceneKey from "../config/SceneKey";
import SpriteManager from "../manager/SpriteManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class FightListCtrl extends cc.Component {

    @property(cc.Node)
    fightContentNode:cc.Node = null; // 挑战关卡父节点

    @property(cc.Prefab)
    fightInfoPrefab:cc.Prefab = null; // 挑战关卡信息预制体

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    onEnable() {
        this.initFightList();
    }

    start () {
    }

    // update (dt) {}

    /**
     * 初始化挑战关卡列表
     */
    private initFightList() {
        // 渲染时先清除子节点
        this.fightContentNode.removeAllChildren();

        let passFight = PlayerCacheCtrl.getInstance().getPassFight();
        
        for(let i = 0; i < FightConfig.CONFIG.length; i++) {
            let fightConfig:FightBasic = FightConfig.CONFIG[i];
            if(fightConfig == null) {
                continue;
            }

            // 创建节点
            this.initFight(fightConfig, passFight);
        }
    }

    /**
     * 初始化挑战关卡信息
     * @param fightConfig 挑战关卡配置
     * @param passFight 通关的挑战关卡
     */
    private initFight(fightConfig:FightBasic, passFight:number) {
        cc.log("渲染挑战关卡信息 挑战关卡ID：%s",fightConfig.id);

        let fight = cc.instantiate(this.fightInfoPrefab);
        
        // 名称
        let name:cc.Label = fight.getChildByName("name").getComponent(cc.Label);
        name.string = fightConfig.name;

        // 介绍
        let desc:cc.Label = fight.getChildByName("desc").getComponent(cc.Label);
        desc.string = fightConfig.desc;

        // 图片
        let pic:cc.Sprite = fight.getChildByName("pic").getChildByName("pic").getComponent(cc.Sprite);
        SpriteManager.getInstance().setBundleSpriteFrameByName(pic,fightConfig.srcPath);

        // 等级
        let levelLabel:cc.Label = fight.getChildByName("pic").getChildByName("level").getComponent(cc.Label);
        levelLabel.string = fightConfig.level;

        // 挑战按钮
        let joinButton:cc.Button = fight.getChildByName("join").getComponent(cc.Button);
        // 挑战按钮文本
        let joinLabel:cc.Label = fight.getChildByName("join").getChildByName("Background").getChildByName("Label").getComponent(cc.Label);

        // 当前挑战关卡小于等于玩家通关的挑战关卡大于，则不可进行挑战
        if(fightConfig.id <= passFight) {
            joinLabel.string = "已完成";
            joinButton.interactable = false;
            let joinCostNode:cc.Node = fight.getChildByName("cost");
            joinCostNode.active = false;
        }else if(fightConfig.id == passFight + 1) { // 等于已通关的挑战关卡+1 则可以进行挑战
            let costItem = FightConfig.getJoinCostById(fightConfig.id,);
            let itemConfig:ItemBasic = ItemConfig.getConfigById(costItem.itemId);
            let costItemPic:cc.Sprite = fight.getChildByName("cost").getChildByName("pic").getComponent(cc.Sprite);
            SpriteManager.getInstance().setBundleSpriteFrameByName(costItemPic,itemConfig.srcPath);
            let costItemCountLabel:cc.Label = fight.getChildByName("cost").getChildByName("itemCount").getComponent(cc.Label);
            costItemCountLabel.string = "" + costItem.itemCount;
            costItemCountLabel.node.active = true;
            ButtonUtil._setEvent(this.node,joinButton,"FightListCtrl","join",fightConfig.id + "");
        }else {
            // 其它情况为未解锁
            joinLabel.string = "未解锁";
            joinButton.interactable = false;
            let joinCostNode:cc.Node = fight.getChildByName("cost");
            joinCostNode.active = false;
        }

        // 添加到内容节点，并启用
        this.fightContentNode.addChild(fight);
        fight.active = true;

    }

    /**
     * 
     * @param event 
     * @param customEventData 挑战关卡ID
     * @returns 
     */
    public join(event,customEventData) {
        if(customEventData == null) {
            return;
        }

        let fightId = Number(customEventData);
        let fightConfig:FightBasic = FightConfig.getConfigById(fightId);
        if(fightConfig == null) {
            cc.log("挑战关卡配置不存在,id:",fightId);
            return;
        }
        
        // 扣除资源
        let costItem = FightConfig.getJoinCostById(fightId);
        let costFlag = PlayerCacheCtrl.getInstance().costPlayerItem(costItem.itemId,costItem.itemCount);
        if(!costFlag) {
            TipCtrl.getInstance().tip(this.node,"当前【" + ItemConfig.getConfigById(Number(costItem.itemId)).name + "】不足以进行挑战");
            return;
        }

        // todo audio
        // AudioManager.getInstance().playerAudio(ResPathKey.BOTTON_NAV_AUDIO,false);

        // 加载游戏场景
        CacheUtil.getInstance().set(CacheKey.FIGHT_ID,fightId);
        cc.director.loadScene(SceneKey.FIGHT);

        // SdkCtrl.getInstance().HideBanner();

        // todo audio
        // AudioManager.getInstance().playerAudio(AudioPathKey.OPEN_VIEW_AUDIO,false);
    }

}
