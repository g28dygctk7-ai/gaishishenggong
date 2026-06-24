// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import PlayerAttrCtrl from "../PlayerAttrCtrl";
import FightCtrl from "./FightCtrl";
import JoystickCtrl from "./JoystickCtrl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerCtrl extends cc.Component {

    @property({type:JoystickCtrl, tooltip:'摇杆'})
    control:JoystickCtrl = null;

    @property({type:cc.ProgressBar, tooltip:'玩家血条'})
    boold: cc.ProgressBar = null;

    /** 玩家是否存活 */
    public isAlive:boolean = false;

    /** 最大可移动的宽度 */
    private _maxMoveWidth:number = 0;

    /** 最大可移动的高度 */
    private _maxMoveHeight:number = 0;

    /**
     * 展示受伤效果结束时间 
     */
    private _showDamageEndTime:number = 0; 
    
    /**
     * 上次恢复生命时间  
     */
    private _lastRecoveryHpTime:number = 0;

    /**
     * 无敌时间限制  3秒  
     */
    private _notBeHitLimitTime:number = 3000;

    /**
     * 无敌时间  
     */
    private _notBeHitTime:number = 0;

    /**
     * 玩家信息
     */
    public playerInfo = {
        atk: 0,
        def: 0,
        hp: 0,
        crit: 0,
        currHp:0
    };

    onLoad () {
        // 限制最大可移动的宽高
        this._maxMoveWidth = (this.node.parent.getContentSize().width / 2) - (this.node.getContentSize().width / 2);
        this._maxMoveHeight = (this.node.parent.getContentSize().height / 2) - (this.node.getContentSize().height / 2);
    }

    start () {
    }

    update (dt) {
        // 检查移动
        this.move(dt)
    }

    /**
     * 初始化玩家信息
     */
    public initPlayer() {
        this.isAlive = true;

        PlayerAttrCtrl.getInstance().calcPlayerAttr();
        this.playerInfo = {
            atk: PlayerAttrCtrl.getInstance().atk,
            def: PlayerAttrCtrl.getInstance().def,
            hp: PlayerAttrCtrl.getInstance().hp,
            crit: PlayerAttrCtrl.getInstance().crit,
            currHp: PlayerAttrCtrl.getInstance().hp,
        }
    }

    /**
     * 复活
     */
     public revive() {
        this.isAlive = true;
        // 恢复血量
        this.playerInfo.currHp = this.playerInfo.hp;
        // 设置无敌时间
        this._notBeHitTime = new Date().getTime() + this._notBeHitLimitTime;
        this.resetBoold();
    }

    /**
     * 更新无敌时间
     * @param time 无敌结束时间戳 ,毫秒
     */
    updateNobeHitTime(time) {
        // 已存在无敌时间,且大于要更新的时间则不处理
        if(this._notBeHitTime > time ) {
            return;
        }

        this._notBeHitTime = time;
    }

    /**
     * 被攻击
     * @param atkNum 攻击力 
     */
     beHit(atkNum:number) {
        if(atkNum <= 0) {
            return;
        }

        // 是否无敌时间内
        if(this._notBeHitTime > new Date().getTime()) {
            return;
        }

        // 玩家防御力
        let def = this.playerInfo.def;

        // 至少扣除1HP
        let hp = 1;

        // 伤害值计算： 攻击方的攻击力 - 玩家防御力
        if(atkNum > def) {
            hp = atkNum - def;
        }
        
        // cc.log("玩家受到攻击,攻击者atk:%s 玩家def:%s 扣血:%s",atkNum,def,hp);

        this.costHp(hp);
    }

    /**
     * 扣血
     * @param hp 扣除血量
     * @param 
     */
    costHp(hp:number) {
        cc.log("costHp",hp);
        cc.log("playerInfo",this.playerInfo);
        if(!this.isAlive) {
            return;
        }

        if(hp <= 0) {
            return;
        }

        let currHp = this.playerInfo.currHp;

        if(hp > currHp) {
            hp = currHp
        }

        this.playerInfo.currHp = currHp - hp;


        this.showDamageNode();

        // 重新绘制血条
        this.resetBoold();        

        // 死亡
        if(this.playerInfo.currHp <= 0) {
            this.isAlive = false;
             // 通知主节点玩家死亡
            let fightCtrl:FightCtrl = this.node.parent.parent.getComponent(FightCtrl);
            cc.log(this.node);
            cc.log(fightCtrl);
            if(fightCtrl) {
                // cc.log("玩家通知主节点玩家死亡");
                fightCtrl.playerDie();
            }
        }

    }

    /**
     * 绘制血条
     * @returns 
     */
    resetBoold() {
        let currHp = this.playerInfo.currHp;
        let maxHp = this.playerInfo.hp;
        // 血条百分比
        let per = currHp / maxHp;
        if(per == this.boold.progress) {
            return;
        }
        this.boold.progress = per;
    }

    /**
     * 展示受伤效果
     */
    showDamageNode() {
        // this.showDamageEndTime = this.currTime + 2000;
        // if(!this.damageNode.active) {
        //     this.damageNode.active = true;
        // }
    }

    /**
     * 检查受伤效果
     */
    checkHideDamageNode() {
        // if(this.showDamageEndTime <= this.currTime && this.damageNode.active) {
        //     this.damageNode.active = false;
        // }
    }


    // 移动
    move(dt) {

        // 无移动操作
        if(this.control.dir.x === 0 && this.control.dir.y === 0) {
            return;
        }



        let speed = 350;

        var vx: number = speed * this.control.dir.x * dt;
        var vy: number = speed * this.control.dir.y * dt;


        // 是否抵达边界
        if(this.node.position.x + vx >= this._maxMoveWidth || this.node.position.x + vx <= -this._maxMoveWidth) {
            vx = 0;
        }
        if(this.node.position.y + vy >= this._maxMoveHeight || this.node.position.y + vy <= -this._maxMoveHeight) {
            vy = 0;
        }


        let nextX = this.node.position.x += vx;
        let nextY = this.node.position.y += vy;
        this.node.setPosition(cc.v2(nextX,nextY));
        
    }
}
