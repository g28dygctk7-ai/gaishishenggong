// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import GeneralSkillConfig, { GeneralSkillBasic } from "../../config/GeneralSkillConfig";
import PositionUtil from "../../utils/PositionUtil";
import RandomUtil from "../../utils/RandomUtil";
import SpineUtil from "../../utils/SpineUtil";
import MainCtrl from "../MainCtrl";
import MonsterCtrl from "../MonsterCtrl";

const {ccclass, property} = cc._decorator;

/**
 * 角色初始技能
 */
@ccclass
export default class GeneralInitSkill extends cc.Component {

    /**
     * 目标节点
     */
    private _targetNode:cc.Node = null;

    /**
     * 主节点控制器
     */
    private _mainCtrl:MainCtrl = null;

    /**
     * 怪物节点控制脚本
     */
    private _monsterCtrl:MonsterCtrl = null;


    /**
     * 角色技能配置
     */
    private _generalSkillConfig:GeneralSkillBasic = null;

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


            // 是否已经到达目标位置
            let targetPosition: cc.Vec2 = this.node.parent.convertToNodeSpaceAR(this._targetNode.convertToWorldSpaceAR(cc.Vec2.ZERO));
            targetPosition.y = targetPosition.y + this._targetNode.height / 4;
            let len = PositionUtil.calculationDis(this.node.position, targetPosition);

            let atkRange = this._targetNode.width * 0.35;
            if(this._generalSkillConfig.type == GeneralSkillConfig.SKILL_TYPE_MENU.LINE) {
                // 计算上自身长度的一半
                atkRange = (this._targetNode.width * 0.35) + (this.node.height / 2);
                cc.log(atkRange);
            }
            if(len > atkRange) {
                this._move(dt,targetPosition);
                return;
            }

            // 攻击
            this._atk();
        }
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
     * 移动
     */
    private _move(dt,targetPosition) {
        if(this._generalSkillConfig.type == GeneralSkillConfig.SKILL_TYPE_MENU.LINE) {
            // 移动过程会逐渐变长
            this.node.scaleY += 0.11;
        }

        let normalizeVec: cc.Vec2 = targetPosition.subtract(this.node.position).normalize();
        this.node.x += normalizeVec.x * this._generalSkillConfig.speed * dt;
        this.node.y += normalizeVec.y * this._generalSkillConfig.speed * dt;
    }

    /**
     * 攻击
     */
    private _atk() {
        this._status == this.STATUS_MENU.FINISH;

        // 通知造成伤害
        let monsterCtrl:MonsterCtrl =this._targetNode.getComponent(MonsterCtrl);
        if(monsterCtrl) {
            // 计算暴击
            let isCrit = RandomUtil.random(this._generalAttr.crit);
            let damage = this._generalAttr.atk;
            if(isCrit) {
                damage =  Math.ceil(this._generalAttr.atk * this._generalAttr.critDamage);
            }
            monsterCtrl.beHit(damage, isCrit);
        }

        // 销毁
        this.node.destroy();
    }

    /**
     * 初始化
     * @param generalSkillConfig 角色技能配置
     * @param targetNode 目标节点
     * @param generalAttr 角色属性
     * @param mainCtrl 主节点控制器
     */
    public init(generalSkillConfig:GeneralSkillBasic,targetNode:cc.Node, generalAttr, mainCtrl:MainCtrl) {
        this._generalSkillConfig = generalSkillConfig;
        this._targetNode = targetNode;
        // this._monsterCtrl = targetNode.getComponent
        this._generalAttr = generalAttr;
        this._mainCtrl = mainCtrl;
        this._init();
    }

    private async _init() {
        // 动画
        if(this._generalSkillConfig.spine) {
            let spSkeletion:sp.Skeleton = this.node.getComponent(sp.Skeleton);
            spSkeletion.skeletonData = await SpineUtil.getInstance().getBundleSkeletonData(this._generalSkillConfig.spine);
            SpineUtil.getInstance().playSpineAni(spSkeletion,null,GeneralSkillConfig.SKILL_ANIMATION_NAME.START,true,false);
        }

        if(this._generalSkillConfig.type == GeneralSkillConfig.SKILL_TYPE_MENU.LINE) {
            // 旋转90度
            this.node.angle = 90;
        }
        
        // 放大倍数
        this.node.scaleX = this._generalSkillConfig.scaleX;
        this.node.scaleY = this._generalSkillConfig.scaleY;

        // 初始生成位置
        this.node.x += this._generalSkillConfig.initGenPos.x;
        this.node.y += this._generalSkillConfig.initGenPos.y;

        // 显示节点
        this.node.active = true;

        // 正常状态
        this._status = this.STATUS_MENU.NORMAL;
    }
}
