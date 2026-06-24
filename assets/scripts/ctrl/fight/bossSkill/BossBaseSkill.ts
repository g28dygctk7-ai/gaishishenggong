// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class BossBaseSkill extends cc.Component {

    /**
     * 技能属性
     */
    public atk:number = null; // 攻击力

    public passNum: number = 0; // 穿透数量, -1为不限制

    public alreadyPassNum: number = 0; // 已穿透数量

    public durationTime: number = 0; // 持续时间, -1为不限制

    public speed: number = null; // 速度

    public createTime: number = 0; // 创建时间

    public currTime: number = 0; // 当前时间

    public exsitTime: number = 0; // 存在时间

    public atkIntervalTime: number = 0; // 攻击间隔

    public sameAtkNum: number = 0; // 同个对象可造成攻击次数 

    public atkXDir: number = 1; // 攻击方向,默认为右边

    public dir: cc.Vec2 = null; // 方向

    public dirX = null; // 方向X

    public dirY = null; // 方向Y
    
    public initAngle = null; // 初始角度

    public lastHitTime:number = 0; // 上一次对玩家造成伤害的时间
    
    public prepareTime:number = 0; // 准备时间

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    /**
     * 初始化
     */
     init(skillConfig:any) {
        this.createTime = new Date().getTime();

        // 初始化技能属性
        this.initProp(skillConfig);
    }

    /**
     * 属性初始化
     */
     initProp(skillConfig:any) {
        this.atk = skillConfig.atk;
        this.passNum = skillConfig.passNum;
        this.durationTime = skillConfig.durationTime;
        this.speed = skillConfig.speed;
        this.dirX = skillConfig.dirX;
        this.dirY = skillConfig.dirY;
        this.atkIntervalTime = skillConfig.atkIntervalTime;
        this.atkXDir = skillConfig.atkXDir;
        this.sameAtkNum = skillConfig.sameAtkNum;
        this.initAngle = skillConfig.initAngle;
        this.prepareTime = skillConfig.prepareTime;
    }

    update (dt) {
        this.currTime += dt;
        this.exsitTime += dt;
        // 是否需要销毁(持续时间 或 穿透数量达到)
        if((this.durationTime != -1 && this.exsitTime * 1000 > this.durationTime) ||
            (this.passNum != -1 && this.alreadyPassNum >= this.passNum)) {
            this.node.destroy();
            return;
        }

        this.updateDir();

        this.move(dt);
    }

    updateDir() {

    }

    // 移动
    move(dt) {
        
    }
}
