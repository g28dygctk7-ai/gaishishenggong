import AttrLevelConfig from "./AttrLevelConfig";

const {ccclass} = cc._decorator;

/**
 * 角色技能配置
 */
@ccclass
export default class GeneralSkillConfig {

    /**
     * SPINE动画名称
     */
    public static SKILL_ANIMATION_NAME = {
        START: "start"
    }

    /**
     * 技能类型枚举
     */
    public static SKILL_TYPE_MENU = {
        NORMAL: 1, // 正常技能
        EFFECT: 2, // 效果技能
        LINE: 3, // 直线技能
    }

    /**
     * 效果类型枚举
     */
    public static EFFECT_TYPE_MENU = {
        RES_RATE_ADD: 1, // 资源百分比提升
        ATTR_NUM_ADD: 2, // 属性值提升
        ATTR_RATE_ADD: 3, // 属性百分比提升
    }

    public static CONFIG = [
        // 属性技能

        // 1-10为金币加成
        {
            id:1,
            type: GeneralSkillConfig.SKILL_TYPE_MENU.EFFECT,
            name: "金币加成+2%",
            desc:"金币加成+2%",
            width: 0,
            height: 0,
            speed:0,
            scaleX: 1,
            scaleY: 1,
            pic:"ui/item/item_1003",
            spine: null,
            initGenPos: null,
            script: "",
            effect: {
                type: GeneralSkillConfig.EFFECT_TYPE_MENU.RES_RATE_ADD,
                itemId: 1003,
                addCount: 0.02
            }
        },
        {
            id:2,
            type: GeneralSkillConfig.SKILL_TYPE_MENU.EFFECT,
            name: "金币加成+3%",
            desc:"金币加成+3%",
            width: 0,
            height: 0,
            speed:0,
            scaleX: 1,
            scaleY: 1,
            pic:"ui/item/item_1003",
            spine: null,
            initGenPos: null,
            script: "",
            effect: {
                type: GeneralSkillConfig.EFFECT_TYPE_MENU.RES_RATE_ADD,
                itemId: 1003,
                addCount: 0.03
            }
        },
        {
            id:3,
            type: GeneralSkillConfig.SKILL_TYPE_MENU.EFFECT,
            name: "金币加成+5%",
            desc:"金币加成+5%",
            width: 0,
            height: 0,
            speed:0,
            scaleX: 1,
            scaleY: 1,
            pic:"ui/item/item_1003",
            spine: null,
            initGenPos: null,
            script: "",
            effect: {
                type: GeneralSkillConfig.EFFECT_TYPE_MENU.RES_RATE_ADD,
                itemId: 1003,
                addCount: 0.05
            }
        },
        {
            id:4,
            type: GeneralSkillConfig.SKILL_TYPE_MENU.EFFECT,
            name: "金币加成+7%",
            desc:"金币加成+7%",
            width: 0,
            height: 0,
            speed:0,
            scaleX: 1,
            scaleY: 1,
            pic:"ui/item/item_1003",
            spine: null,
            initGenPos: null,
            script: "",
            effect: {
                type: GeneralSkillConfig.EFFECT_TYPE_MENU.RES_RATE_ADD,
                itemId: 1003,
                addCount: 0.07
            }
        },
        {
            id:5,
            type: GeneralSkillConfig.SKILL_TYPE_MENU.EFFECT,
            name: "金币加成+10%",
            desc:"金币加成+10%",
            width: 0,
            height: 0,
            speed:0,
            scaleX: 1,
            scaleY: 1,
            pic:"ui/item/item_1003",
            spine: null,
            initGenPos: null,
            script: "",
            effect: {
                type: GeneralSkillConfig.EFFECT_TYPE_MENU.RES_RATE_ADD,
                itemId: 1003,
                addCount: 0.1
            }
        },

        // 11-20为生命加成
        {
            id:11,
            type: GeneralSkillConfig.SKILL_TYPE_MENU.EFFECT,
            name: "生命+10%",
            desc:"生命+10%",
            width: 0,
            height: 0,
            speed:0,
            scaleX: 1,
            scaleY: 1,
            pic:"ui/attr/hpIcon",
            spine: null,
            initGenPos: null,
            script: "",
            effect: {
                type: GeneralSkillConfig.EFFECT_TYPE_MENU.ATTR_RATE_ADD,
                attrKey: AttrLevelConfig.ATTR_KEY.HP,
                addCount: 0.1
            }
        },
        {
            id:12,
            type: GeneralSkillConfig.SKILL_TYPE_MENU.EFFECT,
            name: "生命+20%",
            desc:"生命+20%",
            width: 0,
            height: 0,
            speed:0,
            scaleX: 1,
            scaleY: 1,
            pic:"ui/attr/hpIcon",
            spine: null,
            initGenPos: null,
            script: "",
            effect: {
                type: GeneralSkillConfig.EFFECT_TYPE_MENU.ATTR_RATE_ADD,
                attrKey: AttrLevelConfig.ATTR_KEY.HP,
                addCount: 0.2
            }
        },
        {
            id:13,
            type: GeneralSkillConfig.SKILL_TYPE_MENU.EFFECT,
            name: "生命+100%",
            desc:"生命+100%",
            width: 0,
            height: 0,
            speed:0,
            scaleX: 1,
            scaleY: 1,
            pic:"ui/attr/hpIcon",
            spine: null,
            initGenPos: null,
            script: "",
            effect: {
                type: GeneralSkillConfig.EFFECT_TYPE_MENU.ATTR_RATE_ADD,
                attrKey: AttrLevelConfig.ATTR_KEY.HP,
                addCount: 1.0
            }
        },

        // 21-30 为攻击加成
        {
            id:21,
            type: GeneralSkillConfig.SKILL_TYPE_MENU.EFFECT,
            name: "攻击力+5%",
            desc:"攻击力+5%",
            width: 0,
            height: 0,
            speed:0,
            scaleX: 1,
            scaleY: 1,
            pic:"ui/attr/atkIcon",
            spine: null,
            initGenPos: null,
            script: "",
            effect: {
                type: GeneralSkillConfig.EFFECT_TYPE_MENU.ATTR_RATE_ADD,
                attrKey: AttrLevelConfig.ATTR_KEY.ATK,
                addCount: 0.05
            }
        },
        {
            id:22,
            type: GeneralSkillConfig.SKILL_TYPE_MENU.EFFECT,
            name: "攻击力+10%",
            desc:"攻击力+10%",
            width: 0,
            height: 0,
            speed:0,
            scaleX: 1,
            scaleY: 1,
            pic:"ui/attr/atkIcon",
            spine: null,
            initGenPos: null,
            script: "",
            effect: {
                type: GeneralSkillConfig.EFFECT_TYPE_MENU.ATTR_RATE_ADD,
                attrKey: AttrLevelConfig.ATTR_KEY.ATK,
                addCount: 0.1
            }
        },
        {
            id:23,
            type: GeneralSkillConfig.SKILL_TYPE_MENU.EFFECT,
            name: "攻击力+20%",
            desc:"攻击力+20%",
            width: 0,
            height: 0,
            speed:0,
            scaleX: 1,
            scaleY: 1,
            pic:"ui/attr/atkIcon",
            spine: null,
            initGenPos: null,
            script: "",
            effect: {
                type: GeneralSkillConfig.EFFECT_TYPE_MENU.ATTR_RATE_ADD,
                attrKey: AttrLevelConfig.ATTR_KEY.ATK,
                addCount: 0.2
            }
        },
        {
            id:24,
            type: GeneralSkillConfig.SKILL_TYPE_MENU.EFFECT,
            name: "攻击力+40%",
            desc:"攻击力+40%",
            width: 0,
            height: 0,
            speed:0,
            scaleX: 1,
            scaleY: 1,
            pic:"ui/attr/atkIcon",
            spine: null,
            initGenPos: null,
            script: "",
            effect: {
                type: GeneralSkillConfig.EFFECT_TYPE_MENU.ATTR_RATE_ADD,
                attrKey: AttrLevelConfig.ATTR_KEY.ATK,
                addCount: 0.4
            }
        },
        {
            id:25,
            type: GeneralSkillConfig.SKILL_TYPE_MENU.EFFECT,
            name: "攻击力+60%",
            desc:"攻击力+60%",
            width: 0,
            height: 0,
            speed:0,
            scaleX: 1,
            scaleY: 1,
            pic:"ui/attr/atkIcon",
            spine: null,
            initGenPos: null,
            script: "",
            effect: {
                type: GeneralSkillConfig.EFFECT_TYPE_MENU.ATTR_RATE_ADD,
                attrKey: AttrLevelConfig.ATTR_KEY.ATK,
                addCount: 0.6
            }
        },
        {
            id:26,
            type: GeneralSkillConfig.SKILL_TYPE_MENU.EFFECT,
            name: "攻击力+80%",
            desc:"攻击力+80%",
            width: 0,
            height: 0,
            speed:0,
            scaleX: 1,
            scaleY: 1,
            pic:"ui/attr/atkIcon",
            spine: null,
            initGenPos: null,
            script: "",
            effect: {
                type: GeneralSkillConfig.EFFECT_TYPE_MENU.ATTR_RATE_ADD,
                attrKey: AttrLevelConfig.ATTR_KEY.ATK,
                addCount: 0.8
            }
        },
        {
            id:27,
            type: GeneralSkillConfig.SKILL_TYPE_MENU.EFFECT,
            name: "攻击力+100%",
            desc:"攻击力+100%",
            width: 0,
            height: 0,
            speed:0,
            scaleX: 1,
            scaleY: 1,
            pic:"ui/attr/atkIcon",
            spine: null,
            initGenPos: null,
            script: "",
            effect: {
                type: GeneralSkillConfig.EFFECT_TYPE_MENU.ATTR_RATE_ADD,
                attrKey: AttrLevelConfig.ATTR_KEY.ATK,
                addCount: 1.0
            }
        },



        // 101开始为角色固定技能
        {
            id:101,
            type: GeneralSkillConfig.SKILL_TYPE_MENU.NORMAL,
            name: "雷电剑气",
            desc:"释放雷电剑气，远程攻击敌人",
            width: 20,
            height: 20,
            speed:450,
            scaleX: 0.5,
            scaleY: 0.5,
            pic: "ui/skill/generalInitSkill/skill_01/01",
            spine: "animation/skill/generalInitSkill/skill_01/skill_01",
            initGenPos: {x : 100, y : 30},
            script: "",
            effect: null,
        },
        {
            id:102,
            type: GeneralSkillConfig.SKILL_TYPE_MENU.NORMAL,
            name: "剑气",
            desc:"释放剑气，远程攻击敌人",
            width: 20,
            height: 20,
            speed:450,
            scaleX: -1,
            scaleY: 1,
            pic: "ui/skill/generalInitSkill/skill_02/01",
            spine: "animation/skill/generalInitSkill/skill_02/skill_02",
            initGenPos: {x : 10, y : 40},
            script: "",
            effect: null,
        },
        {
            id:103,
            type: GeneralSkillConfig.SKILL_TYPE_MENU.NORMAL,
            name: "龙珠",
            desc:"释放龙珠，远程攻击敌人",
            width: 20,
            height: 20,
            speed:450,
            scaleX: -1,
            scaleY: 1,
            pic: "ui/skill/generalInitSkill/skill_03/01",
            spine: "animation/skill/generalInitSkill/skill_03/skill_03",
            initGenPos: {x : 50, y : 50},
            script: "",
            effect: null,
        },
        {
            id:104,
            type: GeneralSkillConfig.SKILL_TYPE_MENU.NORMAL,
            name: "灭妖斩",
            desc:"释放灭妖斩，远程攻击敌人",
            width: 20,
            height: 20,
            speed:450,
            scaleX: -1.2,
            scaleY: 1.2,
            pic: "ui/skill/generalInitSkill/skill_04/01",
            spine: "animation/skill/generalInitSkill/skill_04/skill_04",
            initGenPos: {x : 50, y : 40},
            script: "",
            effect: null,
        },
        {
            id:105,
            type: GeneralSkillConfig.SKILL_TYPE_MENU.NORMAL,
            name: "光箭",
            desc:"释放光箭，远程攻击敌人",
            width: 20,
            height: 20,
            speed:450,
            scaleX: -0.3,
            scaleY: 0.3,
            pic: "ui/skill/generalInitSkill/skill_05/01",
            spine: "animation/skill/generalInitSkill/skill_05/skill_05",
            initGenPos: {x : 50, y : 50},
            script: "",
            effect: null,
        },
        {
            id:106,
            type: GeneralSkillConfig.SKILL_TYPE_MENU.NORMAL,
            name: "时间之力",
            desc:"释放时间之力，远程攻击敌人",
            width: 20,
            height: 20,
            speed:450,
            scaleX: -0.5,
            scaleY: 0.5,
            pic: "ui/skill/generalInitSkill/skill_06/01",
            spine: "animation/skill/generalInitSkill/skill_06/skill_06",
            initGenPos: {x : 50, y : 40},
            script: "",
            effect: null,
        },
        {
            id:107,
            type: GeneralSkillConfig.SKILL_TYPE_MENU.NORMAL,
            name: "爱心",
            desc:"释放爱心，远程攻击敌人",
            width: 20,
            height: 20,
            speed:450,
            scaleX: -1,
            scaleY: 1,
            pic: "ui/skill/generalInitSkill/skill_07/01",
            spine: "animation/skill/generalInitSkill/skill_07/skill_07",
            initGenPos: {x : 30, y : 25},
            script: "",
            effect: null,
        },
        {
            id:108,
            type: GeneralSkillConfig.SKILL_TYPE_MENU.NORMAL,
            name: "炮弹",
            desc:"释放炮弹，远程攻击敌人",
            width: 20,
            height: 20,
            speed:450,
            scaleX: -0.35,
            scaleY: 0.35,
            pic: "ui/skill/generalInitSkill/skill_08/01",
            spine: "animation/skill/generalInitSkill/skill_08/skill_08",
            initGenPos: {x : 30, y : 30},
            script: "",
            effect: null,
        },
        {
            id:109,
            type: GeneralSkillConfig.SKILL_TYPE_MENU.NORMAL,
            name: "能量波",
            desc:"释放能量波，远程攻击敌人",
            width: 20,
            height: 20,
            speed:450,
            scaleX: -1,
            scaleY: 1,
            pic: "ui/skill/generalInitSkill/skill_09/01",
            spine: "animation/skill/generalInitSkill/skill_09/skill_09",
            initGenPos: {x : 40, y : 30},
            script: "",
            effect: null,
        },
        {
            id:110,
            type: GeneralSkillConfig.SKILL_TYPE_MENU.NORMAL,
            name: "妖火",
            desc:"释放妖火，远程攻击敌人",
            width: 20,
            height: 20,
            speed:450,
            scaleX: -0.9,
            scaleY: 0.9,
            pic: "ui/skill/generalInitSkill/skill_10/01",
            spine: "animation/skill/generalInitSkill/skill_10/skill_10",
            initGenPos: {x : 40, y : 60},
            script: "",
            effect: null,
        },
        {
            id:111,
            type: GeneralSkillConfig.SKILL_TYPE_MENU.LINE,
            name: "雷霆之力",
            desc:"释放雷霆之力，远程攻击敌人",
            width: 20,
            height: 20,
            speed: 500,
            scaleX: -0.9,
            scaleY: 0.9,
            pic: "ui/skill/generalInitSkill/skill_11/01",
            spine: "animation/skill/generalInitSkill/skill_11/skill_11",
            initGenPos: {x : 80, y : 50},
            script: "",
            effect: null,
        },
        {
            id:112,
            type: GeneralSkillConfig.SKILL_TYPE_MENU.NORMAL,
            name: "刀气",
            desc:"释放刀气，远程攻击敌人",
            width: 20,
            height: 20,
            speed: 500,
            scaleX: 0.9,
            scaleY: 0.9,
            pic: "ui/skill/generalInitSkill/skill_12/01",
            spine: "animation/skill/generalInitSkill/skill_12/skill_12",
            initGenPos: {x : 80, y : 50},
            script: "",
            effect: null,
        },


        
        // 201开始为宠物技能
        {
            id:201,
            type: GeneralSkillConfig.SKILL_TYPE_MENU.NORMAL,
            name: "冰晶",
            desc:"释放冰晶，远程攻击敌人",
            width: 20,
            height: 20,
            speed: 450,
            scaleX: 0.75,
            scaleY: 0.75,
            pic: "ui/skill/petSkill/pet_skill_01/01",
            spine: "animation/skill/petSkill/pet_skill_01/pet_skill_01",
            initGenPos: {x : 30, y : 50},
            script: "",
            effect: null,
        },
        {
            id:202,
            type: GeneralSkillConfig.SKILL_TYPE_MENU.NORMAL,
            name: "冰晶",
            desc:"释放冰晶，远程攻击敌人",
            width: 20,
            height: 20,
            speed: 450,
            scaleX: 0.75,
            scaleY: 0.75,
            pic: "ui/skill/petSkill/pet_skill_01/01",
            spine: "animation/skill/petSkill/pet_skill_01/pet_skill_01",
            initGenPos: {x : 20, y : 20},
            script: "",
            effect: null,
        },
        {
            id:205,
            type: GeneralSkillConfig.SKILL_TYPE_MENU.NORMAL,
            name: "导弹",
            desc:"释放导弹，远程攻击敌人",
            width: 20,
            height: 20,
            speed: 450,
            scaleX: 0.50,
            scaleY: 0.50,
            pic: "ui/skill/petSkill/pet_skill_05/01",
            spine: "animation/skill/petSkill/pet_skill_05/pet_skill_05",
            initGenPos: {x : 40, y : 20},
            script: "",
            effect: null,
        },
        {
            id:207,
            type: GeneralSkillConfig.SKILL_TYPE_MENU.NORMAL,
            name: "冰焰",
            desc:"释放冰焰，远程攻击敌人",
            width: 20,
            height: 20,
            speed: 500,
            scaleX: 0.65,
            scaleY: 0.65,
            pic: "ui/skill/petSkill/pet_skill_07/01",
            spine: "animation/skill/petSkill/pet_skill_07/pet_skill_07",
            initGenPos: {x : 100, y : 30},
            script: "",
            effect: null,
        },
        {
            id:208,
            type: GeneralSkillConfig.SKILL_TYPE_MENU.NORMAL,
            name: "雷电",
            desc:"释放雷电，远程攻击敌人",
            width: 20,
            height: 20,
            speed: 500,
            scaleX: 0.65,
            scaleY: 0.65,
            pic: "ui/skill/petSkill/pet_skill_08/01",
            spine: "animation/skill/petSkill/pet_skill_08/pet_skill_08",
            initGenPos: {x : 100, y : 30},
            script: "",
            effect: null,
        }

    ]

    public static CONFIG_MAP = new Map<number,GeneralSkillBasic>();

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
     * 获取技能配置
     * @param id 技能ID
     */
    public static getConfigById(id:number) {
        return this.CONFIG_MAP.get(id);
    }

}

/**
 * 技能等级配置
 */
export class GeneralSkillBasic {
    id:number = null; // 技能唯一标识
    type:number = null; // 技能类型
    name:string = null; // 技能名称 
    desc:string = null; // 技能介绍
    width:number = null; // 技能宽度
    height:number = null; // 技能高度
    speed:number = null; // 移速
    scaleX:number = null; // X放大倍数
    scaleY:number = null; // Y放大倍数
    initGenPos = null; // 初始生成位置
    pic:string = null; // 图片
    spine:string = null; // spine动画
    script:string = null; // 脚本
    effect = null; // 拥有效果
}


