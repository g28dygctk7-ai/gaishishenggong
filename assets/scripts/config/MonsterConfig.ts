// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import RandomUtil from "../utils/RandomUtil";

const {ccclass, property} = cc._decorator;

/**
 * 怪物配置
 */
@ccclass
export default class MonsterConfig {

    /**
     * 怪物生成位置
     */
    public static GEN_POSITIONS = [
        [0,0],
        [25,25],
        [-25,25],
        [25,-25],
        [-25,-25],
        [35,35],
        [-35,35],
        [35,-35],
        [-35,-35],
        [40,40],
        [-40,40],
        [40,-40],
        [-40,-40],
    ]

    /**
     * 随机获取一个怪物生成位置
     */
    public static getRandomPosition():cc.Vec2 {
        let index = RandomUtil.getRandom(0,this.GEN_POSITIONS.length - 1);
        let pos = this.GEN_POSITIONS[index];
        return cc.v2(pos[0],pos[1]);
    }

    public static CONFIG = [
        {
            id:1,
            name:"无头骑士",
            desc:"",
            scale: 0.5,
            spine: "animation/monster/monster_01/monster_01",
            shortRange: true,
            atkTime:1.0,
            atkRange:120,
            atk:10,
            def:0,
            hp:20,
            hpRestore:0,
            atkSpeed: 1,
            speed: 100,
            crit:0,
            critDamage:2.0
        },
        {
            id:2,
            name:"狂暴巨熊",
            desc:"",
            scale: 0.5,
            spine: "animation/monster/monster_02/monster_02",
            shortRange: true,
            atkRange:120,
            atkTime:2.0,
            atk:100,
            def:0,
            hp:400,
            hpRestore:0,
            atkSpeed: 1,
            speed: 100,
            crit:0,
            critDamage:2.0
        },
        {
            id:3,
            name:"远古飞龙",
            desc:"",
            scale: 0.5,
            spine: "animation/monster/monster_03/monster_03",
            shortRange: true,
            atkRange:120,
            atkTime:1.0,
            atk:1000,
            def:0,
            hp:4000,
            hpRestore:0,
            atkSpeed: 1,
            speed: 100,
            crit:0,
            critDamage:2.0
        },
        {
            id:4,
            name:"魅蜂",
            desc:"",
            scale: 0.5,
            spine: "animation/monster/monster_04/monster_04",
            shortRange: true,
            atkRange:120,
            atkTime:1.0,
            atk:4000,
            def:0,
            hp:10000,
            hpRestore:0,
            atkSpeed: 1,
            speed: 100,
            crit:0,
            critDamage:2.0
        },
        {
            id:5,
            name:"生化金刚",
            desc:"",
            scale: 0.5,
            spine: "animation/monster/monster_05/monster_05",
            shortRange: true,
            atkRange:120,
            atkTime:1.0,
            atk:10000,
            def:0,
            hp:40000,
            hpRestore:0,
            atkSpeed: 1,
            speed: 100,
            crit:0,
            critDamage:2.0
        },
        {
            id:6,
            name:"暗黑魔龙",
            desc:"",
            scale: 0.5,
            spine: "animation/monster/monster_06/monster_06",
            shortRange: true,
            atkRange:120,
            atkTime:1.0,
            atk:30000,
            def:0,
            hp:100000,
            hpRestore:0,
            atkSpeed: 1,
            speed: 100,
            crit:0,
            critDamage:2.0
        },
        {
            id:7,
            name:"独脚怪",
            desc:"",
            scale: 0.5,
            spine: "animation/monster/monster_07/monster_07",
            shortRange: true,
            atkRange:120,
            atkTime:1.0,
            atk:100000,
            def:0,
            hp:300000,
            hpRestore:0,
            atkSpeed: 1,
            speed: 100,
            crit:0,
            critDamage:2.0
        },
        {
            id:8,
            name:"兽王",
            desc:"",
            scale: 0.5,
            spine: "animation/monster/monster_08/monster_08",
            shortRange: true,
            atkRange:120,
            atkTime:1.0,
            atk:500000,
            def:0,
            hp:1000000,
            hpRestore:0,
            atkSpeed: 1,
            speed: 100,
            crit:0,
            critDamage:2.0
        },
        {
            id:9,
            name:"鲨鱼",
            desc:"",
            scale: 0.5,
            spine: "animation/monster/monster_09/monster_09",
            shortRange: true,
            atkRange:120,
            atkTime:1.0,
            atk:1000000,
            def:0,
            hp:10000000,
            hpRestore:0,
            atkSpeed: 1,
            speed: 100,
            crit:0,
            critDamage:2.0
        },
        {
            id:10,
            name:"羽魔",
            desc:"",
            scale: 0.5,
            spine: "animation/monster/monster_10/monster_10",
            shortRange: true,
            atkRange:120,
            atkTime:1.0,
            atk:5000000,
            def:0,
            hp:100000000,
            hpRestore:0,
            atkSpeed: 1,
            speed: 100,
            crit:0,
            critDamage:2.0
        },
        {
            id:11,
            name:"魔灯",
            desc:"",
            scale: 0.5,
            spine: "animation/monster/monster_11/monster_11",
            shortRange: true,
            atkRange:120,
            atkTime:1.0,
            atk:10000000,
            def:0,
            hp:1000000000,
            hpRestore:0,
            atkSpeed: 1,
            speed: 100,
            crit:0,
            critDamage:2.0
        },









        // 1001开始都是boss

        {
            id:1001,
            name:"无头骑士_boss",
            desc:"",
            scale: 0.75,
            spine: "animation/monster/monster_01/monster_01",
            shortRange: true,
            atkRange:150,
            atkTime:1.0,
            atk:50,
            def:0,
            hp:200,
            hpRestore:0,
            atkSpeed: 1,
            speed: 100,
            crit:0,
            critDamage:2.0
        },
        {
            id:1002,
            name:"狂暴巨熊_boss",
            desc:"",
            scale: 0.75,
            spine: "animation/monster/monster_02/monster_02",
            shortRange: true,
            atkRange:150,
            atkTime:2.0,
            atk:800,
            def:0,
            hp:6000,
            hpRestore:0,
            atkSpeed: 1,
            speed: 100,
            crit:0,
            critDamage:2.0
        },
        {
            id:1003,
            name:"远古飞龙_boss",
            desc:"",
            scale: 0.75,
            spine: "animation/monster/monster_03/monster_03",
            shortRange: true,
            atkRange:150,
            atkTime:1.0,
            atk:8000,
            def:0,
            hp:50000,
            hpRestore:0,
            atkSpeed: 1,
            speed: 100,
            crit:0,
            critDamage:2.0
        },
        {
            id:1004,
            name:"冰之精灵_boss",
            desc:"",
            scale: 0.75,
            spine: "animation/monster/monster_04/monster_04",
            shortRange: true,
            atkRange:120,
            atkTime:1.0,
            atk:20000,
            def:0,
            hp:200000,
            hpRestore:0,
            atkSpeed: 1,
            speed: 100,
            crit:0,
            critDamage:2.0
        },
        {
            id:1005,
            name:"生化金刚_boss",
            desc:"",
            scale: 0.75,
            spine: "animation/monster/monster_05/monster_05",
            shortRange: true,
            atkRange:150,
            atkTime:1.0,
            atk:30000,
            def:0,
            hp:500000,
            hpRestore:0,
            atkSpeed: 1,
            speed: 100,
            crit:0,
            critDamage:2.0
        },
        {
            id:1006,
            name:"暗黑魔龙_boss",
            desc:"",
            scale: 0.75,
            spine: "animation/monster/monster_06/monster_06",
            shortRange: true,
            atkRange:150,
            atkTime:1.0,
            atk:200000,
            def:0,
            hp:1000000,
            hpRestore:0,
            atkSpeed: 1,
            speed: 100,
            crit:0,
            critDamage:2.0
        },
        {
            id:1007,
            name:"独脚怪_boss",
            desc:"",
            scale: 0.75,
            spine: "animation/monster/monster_07/monster_07",
            shortRange: true,
            atkRange:150,
            atkTime:1.0,
            atk:500000,
            def:0,
            hp:3000000,
            hpRestore:0,
            atkSpeed: 1,
            speed: 100,
            crit:0,
            critDamage:2.0
        },
        {
            id:1008,
            name:"兽王_boss",
            desc:"",
            scale: 0.75,
            spine: "animation/monster/monster_08/monster_08",
            shortRange: true,
            atkRange:150,
            atkTime:1.0,
            atk:1000000,
            def:0,
            hp:10000000,
            hpRestore:0,
            atkSpeed: 1,
            speed: 100,
            crit:0,
            critDamage:2.0
        },
        {
            id:1009,
            name:"鲨鱼_boss",
            desc:"",
            scale: 0.75,
            spine: "animation/monster/monster_09/monster_09",
            shortRange: true,
            atkRange:150,
            atkTime:1.0,
            atk:10000000,
            def:0,
            hp:100000000,
            hpRestore:0,
            atkSpeed: 1,
            speed: 100,
            crit:0,
            critDamage:2.0
        },
        {
            id:1010,
            name:"羽魔_boss",
            desc:"",
            scale: 0.75,
            spine: "animation/monster/monster_10/monster_10",
            shortRange: true,
            atkRange:150,
            atkTime:1.0,
            atk:100000000,
            def:0,
            hp:1000000000,
            hpRestore:0,
            atkSpeed: 1,
            speed: 100,
            crit:0,
            critDamage:2.0
        },
        {
            id:1011,
            name:"魔灯_boss",
            desc:"",
            scale: 0.75,
            spine: "animation/monster/monster_11/monster_11",
            shortRange: true,
            atkRange:150,
            atkTime:1.0,
            atk:1000000000,
            def:0,
            hp:10000000000,
            hpRestore:0,
            atkSpeed: 1,
            speed: 100,
            crit:0,
            critDamage:2.0
        }


    ]


    public static CONFIG_MAP = new Map<number,MonsterBasic>();

    /**
     * 加载配置
     */
    public static loadConfigMap() {
        for(let i = 0;i < this.CONFIG.length;i++) {
            let config = this.CONFIG[i];
            this.CONFIG_MAP.set(config.id,config);
        }
    }
    
    /**
     * 获取配置
     * @param id ID
     */
    public static getConfigById(id:number) {
        return this.CONFIG_MAP.get(id);
    }
}

/**
 * 配置类
 */
export class MonsterBasic {
    id:number = null; // 唯一标识
    name:string = null; // 名称
    desc:string = null; // 介绍,
    scale:number = null; // 放大倍数
    spine:string = null; // 动画路径
    shortRange:boolean = null; // 近战
    atkTime:number = null; // 攻击动画时长,秒
    atkRange:number = null; // 攻击范围
    atk:number = null; // 攻击
    def:number = null; // 防御
    hp:number = null; // 生命
    hpRestore:number = null; // 生命
    speed:number = null; // 移速
    atkSpeed:number = null; // 攻击速度
    crit:number = null; // 暴击率
    critDamage:number = null; // 暴击伤害
}