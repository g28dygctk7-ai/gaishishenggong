
import ResPathKey from "../../config/ResPathKey";
import SkillConfig, { SkillBasic, SkillLevelBasic } from "../../config/SkillConfig";
import SpriteManager from "../../manager/SpriteManager";
import UnlockManager from "../../manager/UnlockManager";
import ButtonUtil from "../../utils/ButtonUtil";
import IndexCtrl from "../IndexCtrl";
import MainCtrl from "../MainCtrl";
import PlayerCacheCtrl from "../PlayerCacheCtrl";
import TipCtrl from "../TipCtrl";
import ExecSkillCtrl from "./ExecSkillCtrl";

const {ccclass, property} = cc._decorator;

/**
 * 装备的技能信息
 */
@ccclass
export default class MainSkillCtrl extends cc.Component {

    @property({type:cc.Prefab, tooltip:'释放技能预制体'})
    execSkillPrefab:cc.Prefab = null;

    /**
     * 目标节点
     */
    private _mainSkillEquipInfo = {
        pos: 0,
        skillId: null,
        level: null,
        lockStatus: null
    };

    /**
     * 主节点
     */
    private _mainNode:cc.Node = null;

    /**
     * 主节点脚本
     */
    private _mainCtrl:MainCtrl = null;
    
    /**
     * 当前时间
     */
    private _nowTime: number = 0;

    /**
     * 技能更新后的默认冷却时间为10秒
     */
    private _updateSkillCdTime = 10000;

    /**
     * 冷却时间
     */
    private _cdTime: number = 0;

    /**
     * 检查技能节点信息的间隔时间（毫秒)
     */
    private _checkUpdateMainSkillIntervalTime:number = 300;

    /**
     * 上一次检查技能节点信息时间
     */
    private _lastCheckUpdateMainSkillTime:number = 0;

    /**
     * 检查技能冷却的间隔时间（毫秒)
     */
    private _checkUpdateCdIntervalTime:number = 100;

    /**
     * 上一次检查技能冷却时间
     */
    private _lastCheckUpdateCdTime:number = 0;
    
    /**
     * 检查自动释放技能的间隔时间（毫秒)
     */
    private _checkAutoSkillIntervalTime:number = 100;

    /**
     * 上一次自动释放技能的时间
     */
    private _lastCheckAutoSkillTime:number = 0;

    /**
     * 技能移动速度 todo..
     */
    private _speed = 300;

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
    /**
     * 技能配置
     */
    private _skillConfig:SkillBasic = null;

    /**
     * 技能等级配置
     */
    private _skillLevelConfig:SkillLevelBasic = null;

    start() {

    }

    /**
     * 检查技能栏信息是否有变更
     * @returns 
     */
    private _checkUpdateMainSKill() {
        if(this._lastCheckUpdateMainSkillTime + this._checkUpdateMainSkillIntervalTime > this._nowTime) {
            return;
        }

        let playerSkillEquipInfo = PlayerCacheCtrl.getInstance().getPlayerSkillEquipInfoByPos(this._mainSkillEquipInfo.pos);
        let playerSkillInfo = PlayerCacheCtrl.getInstance().getPlayerSkillInfoById(playerSkillEquipInfo.skillId);
        if(playerSkillEquipInfo.skillId != this._mainSkillEquipInfo.skillId ||
            playerSkillEquipInfo.lockStatus != this._mainSkillEquipInfo.lockStatus) {
                cc.log("技能ID或位置锁有更新....");
                this.updateMainSkill(playerSkillEquipInfo,true);
        }else if(playerSkillEquipInfo.skillId != null && 
            playerSkillInfo.level != this._mainSkillEquipInfo.level) {  // 只是技能等级更新，无需进入cd
                cc.log("只是技能等级更新，无需进入cd....");
                this.updateMainSkill(playerSkillEquipInfo,false); 
        }
        this._lastCheckUpdateMainSkillTime = this._nowTime;
    }

    update(dt) {
        this._nowTime += (dt * 1000);


        if(this._status == this.STATUS_MENU.NORMAL) {
            this._checkUpdateMainSKill();

            if(this._cdTime > this._nowTime) {
                if(!this.node.getChildByName("cdProgress").active) {
                    this.node.getChildByName("cdProgress").active = true;
                }
                this._checkUpdateCdProgress();
                return;
            }

            if(this.node.getChildByName("cdProgress").active) {
                this.node.getChildByName("cdProgress").active = false;
            }

            // 自动释放技能
            this._checkAutoSkill();
        }
    }

    /**
     * 自动释放技能
     */
    private _checkAutoSkill() {
        if(this._skillLevelConfig == null) {
            return;
        }

        let autoSkillFlag = PlayerCacheCtrl.getInstance().getAutoSkill();
        if(!autoSkillFlag) {
            return;
        }

        // 释放技能
        this.execSkill(null,null);
    }

    /**
     * 检查技能冷却进度条
     */
    private _checkUpdateCdProgress() {
        if(this._lastCheckUpdateCdTime + this._checkUpdateCdIntervalTime > this._nowTime) {
            return;
        }

        let barSprite:cc.Sprite = this.node.getChildByName("cdProgress").getChildByName("bar").getComponent(cc.Sprite);
        barSprite.fillRange = (this._cdTime - this._nowTime) / (this._skillLevelConfig.cdTime * 1000);

        this._lastCheckUpdateCdTime = this._nowTime;
    }

   
    /**
     * 初始化
     * @param mainSkillEquipInfo 技能信息
     * @param mainNode 主节点
     */
    public init(mainSkillEquipInfo,mainNode:cc.Node) {
        this._mainSkillEquipInfo.pos = mainSkillEquipInfo.pos;
        this._mainSkillEquipInfo.skillId = mainSkillEquipInfo.skillId;
        this._mainSkillEquipInfo.lockStatus = mainSkillEquipInfo.lockStatus;
        this._mainNode = mainNode;
        this._mainCtrl = mainNode.getComponent(MainCtrl);
        this._init();
    }

    private async _init() {
        this.updateMainSkill(this._mainSkillEquipInfo);
        
        // 显示节点
        this.node.active = true;

        // 正常状态
        this._status = this.STATUS_MENU.NORMAL;
    }

    /**
     * 是否进入冷却
     * @param cd 进入冷却，默认false
     */
    public updateMainSkill(mainSkillEquipInfo,cd:boolean = false) {
        this._mainSkillEquipInfo.pos = mainSkillEquipInfo.pos;
        this._mainSkillEquipInfo.skillId = mainSkillEquipInfo.skillId;
        this._mainSkillEquipInfo.lockStatus = mainSkillEquipInfo.lockStatus;
        this._mainSkillEquipInfo.level = null;
        this._skillLevelConfig = null;
        this._skillConfig = null;
        // 位置是否已经解锁
        if(SkillConfig.EQUIP_POS_STATUS.LOCK == this._mainSkillEquipInfo.lockStatus) {
            SpriteManager.getInstance().setBundleSpriteFrameByName(this.node.getComponent(cc.Sprite), ResPathKey.BOX_DISABLED);
            this.node.getChildByName("lock").active = true;
            this.node.getChildByName("pic").active = false;
            ButtonUtil._setEvent(this.node, this.node.getComponent(cc.Button), "MainSkillCtrl", "showUnlockTip", "");
        }else {
            this.node.getChildByName("lock").active = false;
            // 是否有装备技能
            let skillId = this._mainSkillEquipInfo.skillId;
            if(skillId != null) {
                this.node.getChildByName("pic").active = true;
                let skillConfig:SkillBasic = SkillConfig.getConfigById(skillId);
                SpriteManager.getInstance().setBundleSpriteFrameByName(this.node.getComponent(cc.Sprite), ResPathKey.BOX_DISABLED);
                SpriteManager.getInstance().setBundleSpriteFrameByName(this.node.getChildByName("pic").getComponent(cc.Sprite), skillConfig.pic);
                ButtonUtil._setEvent(this.node, this.node.getComponent(cc.Button), "MainSkillCtrl", "execSkill", "");

                // 技能等级配置
                let playerSkillInfo = PlayerCacheCtrl.getInstance().getPlayerSkillInfoById(skillId);
                this._mainSkillEquipInfo.level = playerSkillInfo.level;
                this._skillLevelConfig = SkillConfig.getLevelConfig(skillId,playerSkillInfo.level);
                this._skillConfig = skillConfig;
            }else {
                this.node.getChildByName("pic").active = false;
                SpriteManager.getInstance().setBundleSpriteFrameByName(this.node.getComponent(cc.Sprite), ResPathKey.BOX_EQUIP);
                ButtonUtil._setEvent(this.node, this.node.getComponent(cc.Button), "MainSkillCtrl", "showSkillView", "");
            }
        }

        if(cd) {
            this.clearCdTime();
            this.cd();
        }

    }

    /**
     * 清除冷却
     */
    public clearCdTime() {
        this._cdTime = 0;
    }

    /**
     * 技能进入CD
     */
    private cd() {
        if(this._skillLevelConfig == null) {
            return;
        }


        this._cdTime = this._nowTime + this._skillLevelConfig.cdTime * 1000;
    }

    /**
     * 释放技能
     */
    public execSkill(event, customerData) {

        if(!this._mainCtrl.canExecSkill) {
            return;
        }

        if(this._mainCtrl._monsterList.length == 0) {
            return;
        }

        if(this._cdTime >= this._nowTime) {
            return;
        }

        let execSkill = cc.instantiate(this.execSkillPrefab);
        execSkill.getComponent(ExecSkillCtrl).init(this._skillConfig,this._skillLevelConfig,this._mainNode);
        this._mainCtrl.battlegroundLeftNode.addChild(execSkill);

        this.cd();
    }

    /**
     * 解锁提示
     * @param event 
     * @param customerData 
     */
    public showUnlockTip(event, customerData) {
        let unlockCondition = SkillConfig.getEquipPosUnlockCondition(this._mainSkillEquipInfo.pos);
        let desc = UnlockManager.getInstance().getUnlockDesc(unlockCondition.type, unlockCondition.content);
        TipCtrl.getInstance().tipWithColor(this._mainNode,desc,"#ffffff");
    }
    /**
     * 展示技能窗口
     */
    public showSkillView() {
        let indexCtrl:IndexCtrl = this._mainNode.parent.getComponent(IndexCtrl);
        if(indexCtrl) {
            indexCtrl.toFunction(null,"2");
        }
    }
}
