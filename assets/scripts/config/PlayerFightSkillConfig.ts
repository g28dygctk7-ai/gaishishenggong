const {ccclass} = cc._decorator;

/**
 * 玩家战斗技能配置
 */
@ccclass
export default class PlayerFightSkillConfig {

    public static LIMIT_TYPE = {
        NO_LIMIT: 0, // 不限制
        LEVEL_LIMIE : 1, // 技能等级上限
        ONLY_LIMIT : 2, // 限制1次
    } // 技能获得限制类型 

    
    public static EXEC_TYPE = {
        NORMAL: 1, // 技能
        PROP : 2, // 属性
        RES : 3, // 资源
    } // 技能执行类型

    public static ROTATION_TYPE = {
        NONE: 1, // 不变
        PLAYER_DIR: 2,// 玩家朝向
    }

    public static FOLLOW_TYPE = {
        NONE: 0, // 不处理
        FOLLOW: 1, // 跟随玩家位置
    }

    public static CONFIG = {
        "1":{
            limitType: 1,
            execType:1,
            rotationType:2,
            baseWeight: 2, // 基础附加选举权重
            followType: 0, //　跟踪类型
            list:[
                {
                    id: "1_1",
                    atk: 1, 
                    cdTime: 1500,
                    durationTime: 5000,
                    passNum: 1, 
                    num: 2, 
                    type: 1,
                    parentType: 1, 
                    level: 1, 
                    atkRange: {
                        w:16,
                        h:16,
                        type: 1, 
                    },
                    diffuse:null,
                    speed:400,
                    intervalTime:200, 
                    atkIntervalTime:0, 
                    name:"御剑", 
                    desc:"不间断攻击" ,
                    picRes:"ui/fight/skill/playerSkill/bullet/1",
                    sameAtkNum: 0, 
                    skillParam:{}
                }
            ]
        },

        "2":{
            limitType: 1,
            execType:1,
            rotationType:2,
            baseWeight: 2, // 基础附加选举权重
            followType: 0, //　跟踪类型
            list:[
                {
                    id: "2_1",
                    atk: 1, 
                    cdTime: 1000,
                    durationTime: 5000,
                    passNum: 1, 
                    num: 1, 
                    type: 2,
                    parentType: 1, 
                    level: 1, 
                    atkRange: {
                        w:16,
                        h:16,
                        type: 1, 
                    },
                    diffuse:{
                        status: true, // 是否散射
                        angle : [-0.4,0,0.4], // 散射角度
                        num:3
                    },
                    speed:400,
                    intervalTime:200, 
                    atkIntervalTime:0, 
                    name:"御剑", 
                    desc:"三发散射" ,
                    picRes:"ui/fight/skill/playerSkill/bullet/2",
                    sameAtkNum: 0, 
                    skillParam:{}
                }
            ]
        },

        "3":{
            limitType: 1,
            execType:1,
            rotationType:2,
            baseWeight: 2, // 基础附加选举权重
            followType: 0, //　跟踪类型
            list:[
                {
                    id: "3_1",
                    atk: 1, 
                    cdTime: 10000,
                    durationTime: 3000,
                    passNum: 1, 
                    num: 1, 
                    type: 3,
                    parentType: 2, 
                    level: 1, 
                    atkRange: {
                        w:80,
                        h:80,
                        type: 2, 
                    },
                    speed:400,
                    intervalTime:200, 
                    atkIntervalTime:0, 
                    name:"虚化", 
                    desc:"虚化自身,躲避伤害,简称无敌" ,
                    picRes:"ui/fight/skill/playerSkill/bullet/3",
                    sameAtkNum: 0, 
                    skillParam:{}
                }
            ]
        },
    }

    public static CONFIG_MAP = new Map<string,PlayerFightSkillLevelBasic>();

    /**
     * 加载配置
     */
    public static loadConfigMap() {
        for (const type in PlayerFightSkillConfig.CONFIG) {
            for(let j = 0;j < this.CONFIG[type].list.length;j++) {
                let config = this.CONFIG[type].list[j];
                this.CONFIG_MAP.set(config.id,config);
            }
           
        }
    }

    /**
     * 技能类型的技能列表长度
     * @param type 技能类型
     */
    public static getTypeLength(type:string) {
        if(this.CONFIG[type] == null) {
            return 0;
        }
        return this.CONFIG[type].list.length;
    }

     /**
     * 技能类型的首级名称
     * @param type 技能类型
     */
      public static getTypeName(type:string) {
        if(this.CONFIG[type] == null) {
            return 0;
        }
        return this.CONFIG[type].list[0].name;
    }
    
    /**
     * 获取技能配置
     * @param id 技能ID
     */
    public static getConfigById(id:string) {
        return this.CONFIG_MAP.get(id);
    }

    /**
     * 获取技能配置
     * @param type 类型
     * @param level 等级
     */
    public static getConfigByTypeAndLevel(type,level:number) {
        return this.CONFIG_MAP.get(type + "_" + level);
    }
}

/**
 * 技能配置
 */
export class PlayerFightSkillBasic {
    limitType:number = null;
    execType:number = null;
    rotationType:number = null;
    baseWeight:number = null;
    followType:number = null; 
}

/**
 * 技能等级配置
 */
export class PlayerFightSkillLevelBasic {
    id:string = null; // 技能唯一标识,组成:type_level
    type:number = null; // 技能类型 
    level:number = null; // 技能等级
    name:string = null; // 技能名称
    desc:string = null; // 节能介绍
    picRes:string = null; // 图片
    atk:number = null; // 攻击力
    cdTime:number = null; // 冷却时间
    durationTime:number = null; //持续时间
    passNum:number = null; // 穿透数量
    num:number = null; // 数量
    parentType:number = null; // 父节点类型 1-地图 2-技能
    speed:number = null; // 速度
    intervalTime:number = null; // 数量不为0时的连续间隔,毫秒
    atkIntervalTime:number = null; // 攻击间隔时间,毫秒
    sameAtkNum:number = null; // 同个对象可造成攻击次数
    atkRange = {
        w : null, // 宽
        h : null, // 高
        type : null,// 刚体类型 1-BOX 2-Circle
    }; // 穿透数量
    skillParam = {
        // xDir : null, // x移动方向
        // pos : null, // 初始xy位置
    }; // 初始参数
    diffuse = null; // 散射参数
}


