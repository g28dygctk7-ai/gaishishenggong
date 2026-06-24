// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ResPathKey from "../config/ResPathKey";
import AudioManager from "../manager/AudioManager";
import RandomUtil from "../utils/RandomUtil";
import SpineUtil from "../utils/SpineUtil";
import TxtUtil from "../utils/TxtUtil";
import MainCtrl from "./MainCtrl";
import TipCtrl from "./TipCtrl";

const {ccclass, property} = cc._decorator;

/**
 * 怪物控制器
 */
@ccclass
export default class MonsterCtrl extends cc.Component {

    // 血条
    private bloodProgressBarSprite:cc.Sprite = null;

    private mainCtrl:MainCtrl = null;

    private generalNode:cc.Node = null; // 玩家角色

    private _monsterId:number = null; // 怪物生成时赋予的唯一ID

    private _currTime:number = 0; // 当前时间

    private _existTime:number = 0; // 存活时间

    private _createTime:number = 0; // 创建时间

    private _lastAtkTime:number = 0; // 上次攻击时间

    private _currHp:number = 0; // 当前生命值

    public _isAlive:boolean = true; // 是否存活

    private _isRunning:boolean = false; // 是否正在行走

    private _spSkeleton:sp.Skeleton = null; // spine

    private _lastHpRestoreTime:number = null; // 生命恢复时间

    // 怪物配置
    private _monsterConfig = {
        atk: 0, // 攻击
        def: 0, // 防御
        hp: 0, // 生命
        hpRestore:0, // 生命恢复
        crit: 0, // 暴击率
        critDamage: 2.0, // 暴击伤害
        speed: 20, // 移速
        atkSpeed: 1, // 攻速
        atkTime: 1, // 攻击时长
        shortRange:true, // 近距离战斗
        atkRange: 10, // 攻击范围
        scale:0, // 放大倍数
        spine: null, // spine动画
    }

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
     * 动画名称枚举
     */
    private ANIMATION_NAME_MENU = {
        RUN: "run", //行走
        ATK: "attack", //攻击
        DIE: "die", // 死亡
        HIT: "hit" // 受伤
    }


    private _status = this.STATUS_MENU.INIT; // 状态
  

    onLoad () {
        
    }

    start () {
    }

    update (dt) {
        this._currTime += (dt * 1000); // 当前时间

        // 是否已经结束
        if(this._status == this.STATUS_MENU.FINISH) {
            return;
        }

        // 是否死亡
        if(!this._isAlive) {
            this._die();
            return;
        }

        if(this.mainCtrl == null) {
            return;
        }

        if(!this.mainCtrl.generalIsAlive) {
            return;
        }

        // 正常状态
        if(this._status == this.STATUS_MENU.NORMAL) {

            // 检查生命恢复
            this._checkHpRestore();

            // 检查攻击范围 ： 距离角色节点的距离是否在攻击范围内
            let nearGeneralRange = this.node.convertToNodeSpaceAR(this.generalNode.convertToWorldSpaceAR(cc.Vec2.ZERO)).x;
            if(nearGeneralRange + this._monsterConfig.atkRange < 0) {
                this._run(dt);
                return;
            }

            // 攻击
            this._atk();
        }
    }

    /**
     * 初始化
     * @param monsterConfig 怪物配置
     * @param initPos 初始位置
     * @param generalNode 玩家节点
     * @param monsterId 怪物ID
     * @param monsterBaseAttrAddRate 怪物基础属性提升率,默认1
     * @param monsterSpecialAttrAddRate 怪物特殊属性提升率,默认1
     */
    public async init(monsterConfig,initPos:cc.Vec2,generalNode:cc.Node=null, monsterId,monsterBaseAttrAddRate:number = 1.0,monsterSpecialAttrAddRate:number = 1.0) {
        if(generalNode) {
            this.generalNode = generalNode;
        }

        this.mainCtrl = this.generalNode.parent.parent.parent.getComponent(MainCtrl);

        // 怪物ID
        this._monsterId = monsterId;
        
        // 属性赋值
        this._monsterConfig.atk = monsterConfig.atk * monsterBaseAttrAddRate;
        this._monsterConfig.def = monsterConfig.def * monsterBaseAttrAddRate;
        this._monsterConfig.hp = monsterConfig.hp * monsterBaseAttrAddRate;
        this._monsterConfig.hpRestore = monsterConfig.hpRestore * monsterBaseAttrAddRate;
        this._monsterConfig.crit = monsterConfig.crit * monsterBaseAttrAddRate;
        this._monsterConfig.atkSpeed = monsterConfig.atkSpeed * monsterSpecialAttrAddRate;
        this._monsterConfig.critDamage = monsterConfig.critDamage * monsterBaseAttrAddRate;
        this._monsterConfig.atkTime = monsterConfig.atkTime / monsterConfig.atkSpeed; // 攻击消耗时长 = 基本攻击时长 / 攻击速度
        this._monsterConfig.speed = monsterConfig.speed * monsterSpecialAttrAddRate;
        this._monsterConfig.scale = monsterConfig.scale;
        this._monsterConfig.spine = monsterConfig.spine;
        this._monsterConfig.shortRange = monsterConfig.shortRange;
        this._monsterConfig.atkRange = monsterConfig.atkRange;


        // 血量
        this._currHp = this._monsterConfig.hp;

        // 放大倍数
        this.node.scaleX = this._monsterConfig.scale;
        this.node.scaleY = this._monsterConfig.scale;
        
        // 初始位置
        this.node.setPosition(initPos);

        // 怪物的zIndex
        this.node.zIndex = -this.node.y;

        let spineData = await SpineUtil.getInstance().getBundleSkeletonData(this._monsterConfig.spine);
        this._spSkeleton = this.node.getComponent(sp.Skeleton);
        this._spSkeleton.skeletonData = spineData;

        this.bloodProgressBarSprite = this.node.getChildByName("blood").getChildByName("bar").getComponent(cc.Sprite);

        // 监听事件
        this._spSkeleton.setEventListener((trackEntry, event) => {
            switch(event.data.name) {
                case "hit1":
                    this.frame_atk();
                    break;
                default:
                    break;

            }
        });
        
        this.node.active = true;

        // 置为正常状态
        this._status = this.STATUS_MENU.NORMAL;
    }

    /**
     * 行走
     */
    private _run(dt) {
        let currPos:cc.Vec2 = this.node.getPosition();
        var vx: number = -(this._monsterConfig.speed * dt);
        let nextX = currPos.x += vx;
        this.node.setPosition(cc.v2(nextX,currPos.y));

        // 移动
        this.node.position.x -= dt * this._monsterConfig.speed;

        // 行走动画
        if(!this._isRunning) {
            this._isRunning = true;
            SpineUtil.getInstance().playSpineAni(this._spSkeleton,null,this.ANIMATION_NAME_MENU.RUN,true,false);
        }
    }

    /**
     * 攻击
     */
    private _atk() {
        // 是否攻击间隔中   
        // 攻击时长：1   攻速：1    2秒一次
        // 提升1.0  
        //        
        if(this._lastAtkTime + (this._monsterConfig.atkTime / this._monsterConfig.atkSpeed) * 1000 > this._currTime ) {
            return;
        }

        this._lastAtkTime = this._currTime; // 攻击时间

        
        if(this._monsterConfig.shortRange) { // 近战
            // 播放攻击动画
            SpineUtil.getInstance().playSpineAni(this._spSkeleton,null,this.ANIMATION_NAME_MENU.ATK,false,false);
        }else { // 远程
            // 创建对应技能，触碰到玩家才扣血
            // todo...
        }
    }

    /**
     * 帧事件 - 攻击
     */
    public frame_atk() {
        // 直接扣血
        let mainCtrl:MainCtrl = this.generalNode.parent.parent.parent.getComponent(MainCtrl);
        if(mainCtrl) {
             // 计算暴击
             let isCrit = RandomUtil.random(this._monsterConfig.crit);
             let damage = this._monsterConfig.atk;
             if(isCrit) {
                damage =  Math.ceil(this._monsterConfig.atk * this._monsterConfig.critDamage);
            }
            mainCtrl.generalBeHit(damage,isCrit);
        }
    }

    /**
     * 死亡
     */
    private  _die() {
        // 置为结束状态
        this._status = this.STATUS_MENU.FINISH;

        // 通知怪物死亡
        let mainCtrl:MainCtrl = this.generalNode.parent.parent.parent.getComponent(MainCtrl);
        if(mainCtrl) {
            mainCtrl.monsterDie(this._monsterId);
        }

        // 血条隐藏
        this.node.getChildByName("blood").active = false;

        // 死亡动画结束后销毁
        SpineUtil.getInstance().playSpineAni(this._spSkeleton,()=> {
            this.node.destroy();
        },this.ANIMATION_NAME_MENU.DIE,false,false);
    }

    /**
     * 被攻击
     * @param damage 伤害
     * @param isCritDamage 是否为暴击伤害
     */
    public beHit(damage:number,isCritDamage:boolean) {
        // 扣除血量
        if (!this._isAlive || damage <= 0) {
            return;
        }

        // 伤害溢出处理
        // if (atk > this._currHp) {
        //     atk = this._currHp
        // }

        AudioManager.getInstance().playBeHit();

        this._currHp -= damage;

        // 置为死亡状态
        if(this._currHp <= 0) {
            this._isAlive = false;
        }

        // 暴击伤害展示字体变化
        let tipPos = cc.v2(this.node.getPosition().x,(this.node.getPosition().y + this.node.height / 2)); 
        TipCtrl.getInstance().damageWithColor(this.node.parent,TxtUtil.parseTxt(String(damage)),isCritDamage ? "#ff4747": null,tipPos);

        // 渲染血条
        this._resetBlood();
    }

    /**
     * 检查生命恢复
     */
    private _checkHpRestore() {
        if(this._lastHpRestoreTime + 1000 > this._currTime) {
            return;
        }

        // 恢复生命
        let hpRestore = this._monsterConfig.hpRestore;
        if(this._currHp + hpRestore > this._monsterConfig.hp) {
            // 超出上限处理
            hpRestore = this._monsterConfig.hp - this._currHp;
        }

        if(hpRestore > 0) {
            this._currHp += hpRestore;
            this._resetBlood();
        }

        this._lastHpRestoreTime = this._currTime;
    }

    /**
     * 重新绘制血条
     */
    private _resetBlood() { 
        if(this.bloodProgressBarSprite == null) {
            return;
        }

        // 血条百分比
        let fillRange = this._currHp / this._monsterConfig.hp;
        if (fillRange == this.bloodProgressBarSprite.fillRange) {
            return;
        }
        this.bloodProgressBarSprite.fillRange = fillRange;
    }
}
