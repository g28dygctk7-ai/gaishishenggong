import { GeneralSkillBasic } from "../../config/GeneralSkillConfig";
import ResPathKey from "../../config/ResPathKey";
import SpriteManager from "../../manager/SpriteManager";
import ButtonUtil from "../../utils/ButtonUtil";


const {ccclass, property} = cc._decorator;

/**
 * 属性等级控制
 */
@ccclass
export default class GeneralLevelSkillCtrl extends cc.Component {

    private _firstTipNodePosX = 225;
    private _oneSpacingX = 80;

    private _showTipStartTime:number = 0;
    private _showTipStatus:boolean = false;

    start() {

    }

    update(dt) {
        if(this._showTipStatus && new Date().getTime() - this._showTipStartTime > 3000) {
            this.closeTip();
        }
    }

    /**
     * 初始化
     * @param generalSkillConfig 角色技能配置
     * @param unlockLevel 解锁等级
     * @param playerGeneralLevel 玩家角色等级
     * @param index 索引
     */
    public init(generalSkillConfig:GeneralSkillBasic,unlockLevel:number,playerGeneralLevel:number,index:number) {
        
        // 是否已解锁
        let unlock = playerGeneralLevel >= Number(unlockLevel);
        
        // 图片
        let pic:cc.Sprite = this.node.getChildByName("pic").getComponent(cc.Sprite);
        SpriteManager.getInstance().setBundleSpriteFrameByName(pic, generalSkillConfig.pic);

        if(unlock) {
            SpriteManager.getInstance().setBundleSpriteFrameByName(this.node.getComponent(cc.Sprite), ResPathKey.GENERAL_BROWN_BOX);
            this.node.getChildByName("level").active = false;
        }else {
            SpriteManager.getInstance().setBundleSpriteFrameByName(this.node.getComponent(cc.Sprite), ResPathKey.GENERAL_GRAY_BOX);
            this.node.getChildByName("level").getComponent(cc.Label).string = "等级" + unlockLevel;
            this.node.getChildByName("level").active = true;
        }

        // 点击事件
        let button = this.node.getComponent(cc.Button);
        ButtonUtil._setEvent(this.node, button, "GeneralLevelSkillCtrl", "showTip", null);

        
        // 提示窗口的信息
        let tipNode = this.node.getChildByName("tip");
        let tipButton = tipNode.getComponent(cc.Button);
        ButtonUtil._setEvent(this.node, tipButton, "GeneralLevelSkillCtrl", "closeTip", null);
        tipNode.getChildByName("skillName").getComponent(cc.Label).string = generalSkillConfig.name;
        tipNode.getChildByName("desc").getComponent(cc.Label).string = unlockLevel > playerGeneralLevel ? "达到"+unlockLevel+"级解锁" : "已解锁";

        // 将提示窗口的位置居中
        tipNode.x = this._firstTipNodePosX - (this._oneSpacingX * index);


        this.node.active = true;
    }

    
    /**
     * 展示提示信息
     */
    public showTip() {
        this._showTipStartTime = new Date().getTime();
        this._showTipStatus = true;
        this.node.getChildByName("tip").active = true;
        this.node.getChildByName("tipPoint").active = true;
    }

    /**
     * 展示提示信息
     */
    public closeTip() {
        this._showTipStatus = false;
        this.node.getChildByName("tip").active = false;
        this.node.getChildByName("tipPoint").active = false;
    }
}
