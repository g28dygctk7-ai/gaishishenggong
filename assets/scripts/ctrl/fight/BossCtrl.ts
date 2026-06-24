import { BossBasic } from "../../config/BossConfig";
import FightCtrl from "./FightCtrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BossCtrl extends cc.Component {

    @property({ type: cc.Node, tooltip: 'BOSS节点' })
    body: cc.Node = null;

    @property({ type: cc.ProgressBar, tooltip: 'BOSS血条' })
    blood: cc.ProgressBar = null;

    private _canAtk: boolean = true; // 能否造成攻击

    private lastAtkTime: number = null; // 上一次造成攻击时间戳(毫秒)

    private lastBeAtkTime: number = null; // 上一次被攻击时间(毫秒)

    public isAlive: boolean = false; // 是否存活

    private isFreeze: boolean = false; // 是否冰冻

    public id: string = null; // 怪物ID，唯一标识

    private hp: number = null; // 最大血量

    private currHp: number = null; // 当前血量

    private speed: number = null; // 速度

    private atk: number = null; // 攻击力

    private def: number = null; // 防御力

    onLoad() {
    }

    start() {

    }

    /**
     * 初始化
     * @param bossConfig boss配置
     * 
     */
    init(bossConfig: BossBasic) {
        this.initProp(bossConfig);
    }

    /**
     * 初始化属性
     */
    initProp(config: BossBasic) {
        this.isAlive = true;
        this.isFreeze = false;
        this.hp = config.hp;
        this.currHp = config.hp;
        this.speed = config.speed;
        this.atk = config.atk;
        this.def = config.def;
        this.resetBoold();
    }

    /**
    * 被攻击
    * @param atkNum 攻击力 
    */
    beHit(atkNum: number) {
        if (atkNum <= 0) {
            return;
        }
        // 至少扣除1HP
        let hp = 1;

        // 伤害值计算： 攻击方的攻击力 - 怪物防御力
        if (atkNum > this.def) {
            hp = atkNum - this.def;
        }

        this.costHp(hp);
    }

    /**
     * 扣血
     * @param hp 扣除血量
     * @param 
     */
    costHp(hp: number) {
        if (!this.isAlive) {
            return;
        }

        if (hp <= 0) {
            return;
        }

        if (hp > this.currHp) {
            hp = this.currHp
        }

        this.currHp = this.currHp - hp;

        // 渲染血条     
        this.resetBoold();

        // 死亡
        if (this.currHp == 0) {
            this.isAlive = false;

            // 通知主控制器BOSS死亡
            this.notifyBossDie();
        }
    }

    /**
     * 通知BOSS死亡
     */
    async notifyBossDie() {
        let fightCtrl: FightCtrl = this.node.parent.parent.getComponent(FightCtrl);
        if (fightCtrl) {
            fightCtrl.bossDie();
        }
    }

    /**
     * 绘制血条
     * @returns 
     */
    resetBoold() {
        let currHp = this.currHp;
        let hp = this.hp;
        // 血条百分比
        let per = currHp / hp;
        if (per == this.blood.progress) {
            return;
        }
        this.blood.progress = per;
    }



    update(dt) {
        // 已死亡
        if (!this.isAlive) {
            return;
        }

        // 冰冻中
        if (this.isFreeze) {
            return;
        }


        // 移动
        this.move(dt);
    }

    /**
     * 移动
     */
    move(dt) {

    }

    // /**
    //  * 像中心点移动，也就是角色位置
    //  */
    // moveToCenter(dt) {
    //     var currPos: cc.Vec2 = this.node.getPosition();
    //     let targetPos: cc.Vec2 = this.node.parent.convertToNodeSpaceAR(this.heroNode.convertToWorldSpaceAR(cc.Vec2.ZERO));

    //     // 超出一定数值再旋转
    //     if(Math.abs(currPos.x - targetPos.x) > 5) {
    //         // 是否需要翻面,默认左面,即怪物.x > 玩家.x
    //         let scaleX = this.ui.isLeft ? 1 : -1 ;
    //         if(currPos.x < targetPos.x) {
    //             scaleX =  this.ui.isLeft ? -1 : 1;
    //         }
    //         this.node.scaleX = scaleX;
    //     }

    //     // 移动
    //     let normalizeVec: cc.Vec2 = targetPos.subtract(currPos).normalize();
    //     this.node.x += normalizeVec.x * this.speed * dt;
    //     this.node.y += normalizeVec.y * this.speed * dt;

    // }

}
