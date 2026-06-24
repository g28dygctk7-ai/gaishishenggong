// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

/**
 * BOSS配置
 */
@ccclass
export default class BossConfig {

    /**
     * 移动类型
     */
    public static MOVE_TYPE = {
        NONE: 0,  // 不动
        RUN: 1 // 移动
    }

    public static CONFIG = [
        {
            id:1,
            name:"boss1",
            desc:"",
            uiPath:"",
            animationPath:"",
            atk:15,
            def:5,
            hp:100,
            crit:0,
            speed:0,
            width:200,
            height:200,
            moveType:0,
            moveParam: null,
            skillList:[
                {
                    skill:"1_1",
                    beginTime:0
                },
                {
                    skill:"2_2",
                    beginTime:3
                },
                {
                    skill:"3_2",
                    beginTime:6
                },
                {
                    skill:"4_3",
                    beginTime:9
                },
            ]
        },
        {
            id:2,
            name:"boss2",
            desc:"",
            uiPath:"",
            animationPath:"",
            atk:30,
            def:15,
            hp:200,
            crit:0,
            speed:0,
            width:250,
            height:250,
            moveType:0,
            moveParam: null,
            skillList:[
                {
                    skill:"4_3",
                    beginTime:0
                }
            ]
        },
        {
            id:3,
            name:"boss3",
            desc:"",
            uiPath:"",
            animationPath:"",
            atk:50,
            def:25,
            hp:400,
            crit:0,
            speed:0,
            width:300,
            height:300,
            moveType:0,
            moveParam: null,
            skillList:[
                {
                    skill:"4_3",
                    beginTime:0
                }
            ]
        },
        {
            id:4,
            name:"boss4",
            desc:"",
            uiPath:"",
            animationPath:"",
            atk:70,
            def:35,
            hp:600,
            crit:0,
            speed:0,
            width:300,
            height:300,
            moveType:0,
            moveParam: null,
            skillList:[
                {
                    skill:"4_3",
                    beginTime:0
                }
            ]
        },
        {
            id:5,
            name:"boss5",
            desc:"",
            uiPath:"",
            animationPath:"",
            atk:120,
            def:50,
            hp:1000,
            crit:0,
            speed:0,
            width:300,
            height:300,
            moveType:0,
            moveParam: null,
            skillList:[
                {
                    skill:"4_3",
                    beginTime:10
                },
                {
                    skill:"2_1",
                    beginTime:0
                },
                {
                    skill:"3_2",
                    beginTime:0
                }
            ]
        }
    ]


    public static CONFIG_MAP = new Map<number,BossBasic>();

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
export class BossBasic {
    id:number = null; // 唯一标识
    name:string = null; // 名称
    desc:string = null; // 介绍
    uiPath:string = null; // 资源路径
    animationPath:string = null; // 动画路径
    atk:number = null; // 攻击
    def:number = null; // 防御
    hp:number = null; // 生命
    crit:number = null; // 暴击率
    speed:number = null; // 移动速度
    width:number = null; // 宽度
    height:number = null; // 高度
    moveType:number = null; // 移动类型
    moveParam = null; //移动参数
    skillList:Array<object> = null; // 技能列表  格式：技能ID_技能等级, 技能ID_技能等级
}