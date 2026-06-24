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
 * 宠物技能
 */
@ccclass
export default class PetSkillCtrl extends cc.Component {

    /**
     * 主节点脚本
     */
    private _mainCtrl:MainCtrl = null;


    /**
     * 目标节点
     */
    private _targetNode:cc.Node = null;


    /**
     * 角色技能配置
     */
    private _generalSkillConfig:GeneralSkillBasic = null;

    /**
     * 角色属性
     */
    private _generalAttr = null;

    /**
     * 攻击力倍数
     */
    private _atkRate:number = 0;

    /**
     * 生成位置，对应宠物当前位置
     */
    private _genPos = null;

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
            // 目标节点已失效
            if(!this._targetNode.isValid) {
                this._status == this.STATUS_MENU.FINISH
                this.node.active = false;
                this.destroy();
                return;
            }


            // 是否已经到达目标位置
            let targetPosition: cc.Vec2 = this.node.parent.convertToNodeSpaceAR(this._targetNode.convertToWorldSpaceAR(cc.Vec2.ZERO));
            targetPosition.y = targetPosition.y + this._targetNode.height / 4;
            let len = PositionUtil.calculationDis(this.node.position, targetPosition);
            if(len > (this._targetNode.width * 0.35)) {
                this._move(dt,targetPosition);
                return;
            }

            // 攻击
            this._atk();
        }
    }

    /**
     * 移动
     */
    private _move(dt,targetPosition) {
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
     * @param mainCtrl 主节点脚本
     * @param atkRate 攻击倍数
     * @param genPos 生成位置
     */
    public init(generalSkillConfig:GeneralSkillBasic,targetNode:cc.Node, mainCtrl:MainCtrl, atkRate:number, genPos) {
        this._generalSkillConfig = generalSkillConfig;
        this._targetNode = targetNode;
        this._mainCtrl = mainCtrl;
        this._atkRate = atkRate;
        this._genPos = genPos
        this._generalAttr = mainCtrl._generalConfig;
        this._init();
    }

    private async _init() {
        // 动画
        if(this._generalSkillConfig.spine) {
            let spSkeletion:sp.Skeleton = this.node.getComponent(sp.Skeleton);
            spSkeletion.skeletonData = await SpineUtil.getInstance().getBundleSkeletonData(this._generalSkillConfig.spine);
            SpineUtil.getInstance().playSpineAni(spSkeletion,null,GeneralSkillConfig.SKILL_ANIMATION_NAME.START,true,false);
        }
        
        // 放大倍数
        this.node.scaleX = this._generalSkillConfig.scaleX;
        this.node.scaleY = this._generalSkillConfig.scaleY;

        // 初始生成位置
        this.node.x += this._genPos.x + this._generalSkillConfig.initGenPos.x;
        this.node.y += this._genPos.y + this._generalSkillConfig.initGenPos.y;

        // 显示节点
        this.node.active = true;

        // 正常状态
        this._status = this.STATUS_MENU.NORMAL;
    }
}
