
import AttrLevelConfig from "../../config/AttrLevelConfig";
import SkillConfig, { SkillBasic, SkillLevelBasic } from "../../config/SkillConfig";
import AudioManager from "../../manager/AudioManager";
import PositionUtil from "../../utils/PositionUtil";
import SpineUtil from "../../utils/SpineUtil";
import MainCtrl from "../MainCtrl";
import MonsterCtrl from "../MonsterCtrl";

const {ccclass, property} = cc._decorator;

/**
 * 释放技能
 */
@ccclass
export default class ExecSkillCtrl extends cc.Component {
    /**
     * 主节点
     */
    private _mainNode:cc.Node = null;
    /**
     * 主节点脚本
     */
    private _mainCtrl:MainCtrl = null;

    /**
     * 目标节点
     */
    private _targetNode:cc.Node = null;

    /**
     * 怪物列表
     */
    private _monsterNodeList = null;

    /**
     * 技能配置
     */
    private _skillConfig:SkillBasic = null;

    /**
     * 技能等级配置
     */
    private _skillLevelConfig:SkillLevelBasic = null;

    /**
     * spine组件
     */
    private _spSkeleton:sp.Skeleton = null;

    /**
     * 角色属性
     */
    private _generalAttr = null;

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
            this.checkNextTargetNode();

            // 玩家死亡了/目标节点已失效
            if(!this._mainCtrl.generalIsAlive || this._targetNode == null || !this._targetNode.isValid) {
                this._status == this.STATUS_MENU.FINISH
                this.node.active = false;
                this.destroy();
                return;
            }

            // 攻击类型
            if(this._skillConfig.atkType == SkillConfig.SKILL_ATK_TYPE.SKY_SINGLE || this._skillConfig.atkType == SkillConfig.SKILL_ATK_TYPE.SKY_RANGE) { 
                this._skyAtk();
            }else {
                // 是否已经到达目标位置
                let targetPosition: cc.Vec2 = this.node.parent.convertToNodeSpaceAR(this._targetNode.convertToWorldSpaceAR(cc.Vec2.ZERO));
                let len = PositionUtil.calculationDis(this.node.position, targetPosition);
                if(len > (this._targetNode.width / 2 + this._skillConfig.atkRange)) {
                    this._move(dt,targetPosition);
                    return;
                }

                // 攻击
                this._atk();
            }
        }
    }

    /**
     * 移动
     */
    private _move(dt,targetPosition) {
        let normalizeVec: cc.Vec2 = targetPosition.subtract(this.node.position).normalize();
        this.node.x += normalizeVec.x * this._skillConfig.speed * dt;
        this.node.y += normalizeVec.y * this._skillConfig.speed * dt;
    }

    /**
     * 攻击
     */
    private _atk() {
        SpineUtil.getInstance().playSpineAni(this._spSkeleton,null,SkillConfig.SKILL_SPINE_ANIMATION_NAME.ATK,false,false);
        this._status = this.STATUS_MENU.FINISH;
    }

    /**
     * 下一个目标
     */
    private checkNextTargetNode() {
        if(this._targetNode == null || !this._targetNode.isValid) {
            // 是否还有下一只怪物
            if(this._mainCtrl._monsterList.length == 0) {
                this._targetNode = null;
                return;
            }

            this._targetNode = this._mainCtrl._monsterList[0].node;
        }
    }

    /**
     * 初始化
     * @param skillConfig 技能配置
     * @param skillLevelConfig 技能等级配置
     * @param mainNode 主节点
     */
    public init(skillConfig:SkillBasic,skillLevelConfig:SkillLevelBasic, mainNode:cc.Node) {
        this._mainNode = mainNode;
        this._mainCtrl = mainNode.getComponent(MainCtrl);
        this._skillConfig = skillConfig;
        this._skillLevelConfig = skillLevelConfig;
        this._init();
    }

    private async _init() {
        if(this._mainCtrl._monsterList.length == 0) {
            this.node.destroy();
            return;
        }

        this._targetNode = this._mainCtrl._monsterList[0].node;
        this._generalAttr = this._mainCtrl._generalConfig;

        // 播放召唤音效
        this.playExecAudio();

        // 动画
        if(this._skillConfig.spine) {
            let spSkeleton:sp.Skeleton = this.node.getComponent(sp.Skeleton);
            this._spSkeleton = spSkeleton;
            spSkeleton.skeletonData = await SpineUtil.getInstance().getBundleSkeletonData(this._skillConfig.spine);

            // 不是凭空生成的需要先播放奔跑动画
            if(SkillConfig.SKILL_ATK_TYPE.SKY_SINGLE != this._skillConfig.atkType && SkillConfig.SKILL_ATK_TYPE.SKY_RANGE != this._skillConfig.atkType) {
                SpineUtil.getInstance().playSpineAni(spSkeleton,null,SkillConfig.SKILL_SPINE_ANIMATION_NAME.RUN,true,false);
            }

        }

        // 事件监听
        this._spSkeleton.setEventListener((trackEntry, event) => {
            switch(event.data.name) {
                case "hit1":
                    this._atkFrame();
                    break;
                default:
                    break;

            }
        });
        
        // 放大倍数
        this.node.scaleX = this._skillConfig.mainScale.x;
        this.node.scaleY = this._skillConfig.mainScale.y;

        // 初始生成位置
        this.node.x += this._skillConfig.initGenPos.x;
        this.node.y += this._skillConfig.initGenPos.y;

        // 显示节点
        this.node.active = true;

        // 正常状态
        this._status = this.STATUS_MENU.NORMAL;
    }

    /**
     * 空中锁定怪物的攻击
     */
    private _skyAtk() {
        this._status = this.STATUS_MENU.FINISH;

        
        // 目标节点失效了或死亡了，就不用出现了
        if(!this._targetNode.isValid || !this._targetNode.getComponent(MonsterCtrl)._isAlive) {
            this.node.destroy();
            return;
        }
        SpineUtil.getInstance().playSpineAni(this._spSkeleton,null,SkillConfig.SKILL_SPINE_ANIMATION_NAME.START,true,false);

        // 播放音效
        this.playAtkAudio();

        // 对攻击范围内的怪物造成伤害
        if(this._mainCtrl._monsterList != null && this._mainCtrl._monsterList.length != 0) {
            let monsterNode:cc.Node = this._mainCtrl._monsterList[0].node; // 第一只怪物位置
            let targetPosition: cc.Vec2 = this.node.parent.convertToNodeSpaceAR(monsterNode.convertToWorldSpaceAR(cc.Vec2.ZERO));
            if(this._skillConfig.atkType == SkillConfig.SKILL_ATK_TYPE.SKY_SINGLE) {
                if(monsterNode.getComponent(MonsterCtrl)._isAlive) {
                    this.node.setPosition(cc.v2(targetPosition.x,(targetPosition.y + (this.node.height * 2))));
                }
            }else {
                this.node.setPosition(cc.v2(targetPosition.x,targetPosition.y));
            }

            for(let i = 0; i < this._mainCtrl._monsterList.length;i++) {
                monsterNode = this._mainCtrl._monsterList[i].node;
                // 通知造成伤害
                let monsterCtrl:MonsterCtrl = monsterNode.getComponent(MonsterCtrl);
                if(monsterCtrl) {
                    // 计算攻击力加成
                    let atkAddRate = 1;
                    if(AttrLevelConfig.ATTR_KEY.ATK == this._skillLevelConfig.skillAttrKey) {
                        atkAddRate = this._skillLevelConfig.skillAttrRate;
                    }
                    let damage = Math.floor(this._generalAttr.atk * atkAddRate);
                    monsterCtrl.beHit(damage, false);
                    
                    // 单体伤害的，只进行一次
                    if(this._skillConfig.atkType == SkillConfig.SKILL_ATK_TYPE.SKY_SINGLE) {
                        break;
                    }
                }
            }
        }

        let destroyTime = 650;        
        if(this._skillConfig.atkType == SkillConfig.SKILL_ATK_TYPE.SKY_SINGLE) {
            destroyTime = 250;
        }
        setTimeout(()=>{
            if(this.node.isValid) {
                // 销毁
                this.node.destroy();
            }
        },destroyTime);
    }

    // 攻击事件
    private _atkFrame() {
        // 对攻击范围内的怪物造成伤害
        if(this._mainCtrl._monsterList != null) {
            
            this.playAtkAudio();

            for(let i = 0; i < this._mainCtrl._monsterList.length;i++) {
                let monsterNode = this._mainCtrl._monsterList[i].node;
                let targetPosition: cc.Vec2 = this.node.parent.convertToNodeSpaceAR(monsterNode.convertToWorldSpaceAR(cc.Vec2.ZERO));
                let len = PositionUtil.calculationDis(this.node.position, targetPosition);
                if(monsterNode.isValid && len < (this.node.width / 2 + this._skillConfig.atkRange * 2)) {
                    // 通知造成伤害
                    let monsterCtrl:MonsterCtrl = monsterNode.getComponent(MonsterCtrl);
                    if(monsterCtrl) {
                        // 计算攻击力加成
                        let atkAddRate = 1;
                        if(AttrLevelConfig.ATTR_KEY.ATK == this._skillLevelConfig.skillAttrKey) {
                            atkAddRate = this._skillLevelConfig.skillAttrRate;
                        }
                        let damage = Math.floor(this._generalAttr.atk * atkAddRate);
                        monsterCtrl.beHit(damage, false);
                        
                        // 单体伤害的，只进行一次
                        if(this._skillConfig.atkType == SkillConfig.SKILL_ATK_TYPE.SHORT_SINGLE) {
                            break;
                        }

                    }
                }
               
            }
        }

        setTimeout(()=>{
            if(this.node != null && this.node.isValid) { // 预防多次攻击事件帧的技能出现问题
                // 销毁
                this.node.destroy();
            }
        },500);
    }

    /**
     * 播放召唤执行音效
     */
     private playExecAudio() {
        if(this._skillConfig.execAudio != null) {
            AudioManager.getInstance().playSkillAudio(this._skillConfig.execAudio);
        }
    }

    /**
     * 播放攻击音效
     */
    private playAtkAudio() {
        if(this._skillConfig.atkAudio != null) {
            AudioManager.getInstance().playSkillAudio(this._skillConfig.atkAudio);
        }
    }
}
