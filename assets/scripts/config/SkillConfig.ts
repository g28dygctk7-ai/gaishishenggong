import UnlockManager from "../manager/UnlockManager";
import AttrLevelConfig from "./AttrLevelConfig";

const { ccclass, property } = cc._decorator;

/**
 * 技能配置
 */
@ccclass
export default class SkillConfig {

    /**
     * 玩家装备技能的位置锁定状态
     */
    public static EQUIP_POS_STATUS = {
        LOCK : 0,
        UNLOCK: 1
    };

    /**
     * 技能spine动画名称
     */
    public static SKILL_SPINE_ANIMATION_NAME = {
        RUN: "run",
        ATK: "attack",
        ATK2: "attack2",
        START: "start"
    }

    /**
     * 技能攻击类型
     */
    public static SKILL_ATK_TYPE = {
        SHORT_SINGLE: 1, // 近战单体伤害
        SHORT_RANGE: 2, // 近战范围伤害
        LONG_SINGLE: 3, // 远程单体伤害
        LONG_RANGE: 4, // 远程范围伤害
        SKY_SINGLE: 5, // 天上落下的单体伤害
        SKY_RANGE: 6, // 天上落下的范围体伤害
    }

    public static EQUIP_POS_CONFIG = [
        {
            pos:1,
            unlockCondition: {
                type: 4,
                content: 11
            }
        },
        {
            pos:2,
            unlockCondition: {
                type: 4,
                content: 21
            }
        },
        {
            pos:3,
            unlockCondition: {
                type: 4,
                content: 31
            }
        },
        {
            pos:4,
            unlockCondition: {
                type: 4,
                content: 41
            }
        },
        {
            pos:5,
            unlockCondition: {
                type: 4,
                content: 51
            }
        },
        {
            pos:6,
            unlockCondition: {
                type: 4,
                content: 61
            }
        }
    ]

    /**
     * 玩家装备技能的上限数量
     */
    public static SKILL_EQUIP_MAX_NUM = SkillConfig.EQUIP_POS_CONFIG.length;

    /**
     * 技能装备状态
     */
    public static EQUIP_STATUS_MENU = {
        UN_EQUIP: 0, // 未装备
        EQUIP: 1 // 装备中
    }

    /**
     * 技能强化消耗对应技能碎片数量
     */
    public static LEVEL_UP_COST_CONFIG = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
        51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
        61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
        71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
        81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
        91, 92, 93, 94, 95, 96, 97, 98, 99, 100
    ]

    /**
     * 格式化符号
     */
    public static FORMAT_KEY = {
        NUM: "[num]",
        ATKRATE: "[atkRate]"
    }

    public static CONFIG = [

        {
            id: 1001,
            grade: 1,
            atkType:SkillConfig.SKILL_ATK_TYPE.SHORT_SINGLE,
            atkRange: 0,
            name: "野狼猛击",
            desc: "【单体技能】召唤" + SkillConfig.FORMAT_KEY.NUM + "只野狼，每只造成" + SkillConfig.FORMAT_KEY.ATKRATE + "攻击力的伤害",
            pic: "ui/skill/skill/skill_01/1",
            spine: "animation/skill/skill/skill_01/skill_01",
            execAudio: "audio/skill/exec_01",
            atkAudio: null,
            mainScale: {
                x: -0.35,
                y: 0.35
            },
            listScale: {
                x: 1,
                y: 1
            },
            initGenPos: {x : -400, y : -50},
            levelConfig: [
                {
                    cdTime: 17,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 1.25,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.05
                },
                {
                    cdTime: 16,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 1.50,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.10
                },
                {
                    cdTime: 15,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 1.75,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.15
                },
                {
                    cdTime: 14,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 1.95,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.20
                },
                {
                    cdTime: 13,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.10,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.25
                },
                {
                    cdTime: 12,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.25,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.30
                },
                {
                    cdTime: 11,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.40,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.35
                },
                {
                    cdTime: 10,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.60,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.40
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.45
                },
                {
                    cdTime: 8,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 3.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.50
                },
                {
                    cdTime: 8,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 3.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.55
                },
                {
                    cdTime: 8,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 3.40,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.60
                },
                {
                    cdTime: 8,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 3.60,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.65
                },
                {
                    cdTime: 7,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 3.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.70
                },
                {
                    cdTime: 7,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.75
                },
                {
                    cdTime: 7,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.80
                },
                {
                    cdTime: 6.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate:4.25,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.85
                },
                {
                    cdTime: 6.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.30,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.90
                },
                {
                    cdTime: 6.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.35,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.95
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate:4.40,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.00
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.45,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.05
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.50,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.10
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate:4.55,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.20
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.60,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.30
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.65,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.40
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate:4.70,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.50
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.75,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.60
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.70
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.85,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.80
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.95,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.90
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.95
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.05,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.00
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.10,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.05
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.15,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.10
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.15
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.25,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.20
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.30,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.25
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.35,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.30
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.40,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.35
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.45,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.40
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.50,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.45
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.55,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.50
                }
            ],
            speed: 580
        },
        {
            id: 1002,
            grade: 1,
            atkType:SkillConfig.SKILL_ATK_TYPE.SKY_RANGE,
            atkRange: 0,
            name: "龙卷风",
            desc: "【范围技能】召唤" + SkillConfig.FORMAT_KEY.NUM + "个龙卷风，每个龙卷风造成" + SkillConfig.FORMAT_KEY.ATKRATE + "攻击力的伤害",
            pic: "ui/skill/skill/skill_08/1",
            spine: "animation/skill/skill/skill_08/skill_08",
            execAudio: "audio/skill/exec_02",
            atkAudio: null,
            mainScale: {
                x: -3.0,
                y: 3.0
            },
            listScale: {
                x: 1,
                y: 1
            },
            initGenPos: {x : -400, y : -50},
            levelConfig: [
                {
                    cdTime: 17,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.05
                },
                {
                    cdTime: 16,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 0.85,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.10
                },
                {
                    cdTime: 15,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 0.90,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.15
                },
                {
                    cdTime: 14,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 0.95,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.20
                },
                {
                    cdTime: 13,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.25
                },
                {
                    cdTime: 12,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 1.05,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.30
                },
                {
                    cdTime: 11,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 1.10,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.35
                },
                {
                    cdTime: 10,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 1.15,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.40
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 1.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.45
                },
                {
                    cdTime: 8,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 1.25,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.50
                },
                {
                    cdTime: 8,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 1.30,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.55
                },
                {
                    cdTime: 8,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 1.35,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.60
                },
                {
                    cdTime: 8,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 1.40,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.65
                },
                {
                    cdTime: 7,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 1.45,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.70
                },
                {
                    cdTime: 7,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 1.50,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.75
                },
                {
                    cdTime: 7,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 1.55,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.80
                },
                {
                    cdTime: 6.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate:1.60,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.85
                },
                {
                    cdTime: 6.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 1.75,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.90
                },
                {
                    cdTime: 6.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 1.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.95
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate:1.85,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.00
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 1.90,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.05
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.10
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate:2.05,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.20
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.10,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.30
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.15,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.40
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate:2.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.50
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.25,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.60
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.30,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.70
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.35,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.80
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.40,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.90
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.45,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.95
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.50,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.00
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.55,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.05
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.60,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.10
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.65,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.15
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.70,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.20
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.75,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.25
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.30
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.85,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.35
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.90,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.40
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.95,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.45
                },
                {
                    cdTime: 6.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 3.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.50
                }
            ],
            speed: 0
        },


        {
            id: 2001,
            grade: 2,
            atkType:SkillConfig.SKILL_ATK_TYPE.SHORT_RANGE,
            atkRange: 0,
            name: "野狼猛击(变异)",
            desc: "【范围技能】召唤" + SkillConfig.FORMAT_KEY.NUM + "只变异野狼，每只造成" + SkillConfig.FORMAT_KEY.ATKRATE + "攻击力的伤害",
            pic: "ui/skill/skill/skill_02/1",
            spine: "animation/skill/skill/skill_02/skill_02",
            execAudio: "audio/skill/exec_01",
            atkAudio: null,
            mainScale: {
                x: -0.35,
                y: 0.35
            },
            listScale: {
                x: 1,
                y: 1
            },
            initGenPos: {x : -400, y : 100},
            levelConfig: [
                {
                    cdTime: 17,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 1.25,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.10
                },
                {
                    cdTime: 16,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 1.50,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.20
                },
                {
                    cdTime: 15,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 1.75,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.30
                },
                {
                    cdTime: 15,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 1.95,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.40
                },
                {
                    cdTime: 14,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.10,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.50
                },
                {
                    cdTime: 14,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.25,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.60
                },
                {
                    cdTime: 13,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.40,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.70
                },
                {
                    cdTime: 12,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.60,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.80
                },
                {
                    cdTime: 11,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.90
                },
                {
                    cdTime: 10,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 3.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.00
                },
                {
                    cdTime: 10,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 3.2,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.1
                },
                {
                    cdTime: 10,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 3.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.2
                },
                {
                    cdTime: 10,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.3
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.4
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.5
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.6
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.7
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.8
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.9
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.0
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.1
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.2
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.3
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.4
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.5
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.6
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.7
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.8
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.9
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 3.0
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 3.1
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 3.2
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 3.3
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 3.4
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 3.5
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 3.6
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 3.7
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 3.8
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 3.9
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 4.0
                },
                {
                    cdTime: 8,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 6.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 4.1
                },
                {
                    cdTime: 8,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 6.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 4.2
                },
                {
                    cdTime: 8,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 6.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 4.3
                },
                {
                    cdTime: 8,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 6.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 4.4
                },
                {
                    cdTime: 8,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 6.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 4.5
                },
                {
                    cdTime: 8,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 6.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 4.6
                },
                {
                    cdTime: 8,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 6.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 4.7
                },
                {
                    cdTime: 8,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 6.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 4.8
                },
                {
                    cdTime: 8,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 6.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 4.9
                },
                {
                    cdTime: 8,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 6.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 5.0
                }
            ],
            speed: 450
        },

        {
            id: 2002,
            grade: 2,
            atkType:SkillConfig.SKILL_ATK_TYPE.SHORT_RANGE,
            atkRange: 100,
            name: "大笨熊",
            desc: "【范围技能】召唤" + SkillConfig.FORMAT_KEY.NUM + "只大笨熊，每只造成" + SkillConfig.FORMAT_KEY.ATKRATE + "攻击力的伤害",
            pic: "ui/skill/skill/skill_07/1",
            spine: "animation/skill/skill/skill_07/skill_07",
            execAudio: null,
            atkAudio: "audio/skill/atk_03",
            mainScale: {
                x: -0.60,
                y: 0.60
            },
            listScale: {
                x: 1,
                y: 1
            },
            initGenPos: {x : -400, y : 0},
            levelConfig: [
                {
                    cdTime: 17,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 1.25,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.10
                },
                {
                    cdTime: 16,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 1.50,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.20
                },
                {
                    cdTime: 15,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 1.75,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.30
                },
                {
                    cdTime: 15,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 1.95,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.40
                },
                {
                    cdTime: 14,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.10,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.50
                },
                {
                    cdTime: 14,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.25,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.60
                },
                {
                    cdTime: 13,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.40,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.70
                },
                {
                    cdTime: 12,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.60,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.80
                },
                {
                    cdTime: 11,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.90
                },
                {
                    cdTime: 10,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 3.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.00
                },
                {
                    cdTime: 10,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 3.2,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.1
                },
                {
                    cdTime: 10,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 3.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.2
                },
                {
                    cdTime: 10,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.3
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.4
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.5
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.6
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.7
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.8
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.9
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.0
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.1
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.2
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.3
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.4
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.5
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.6
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.7
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.8
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.9
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 3.0
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 3.1
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 3.2
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 3.3
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 3.4
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 3.5
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 3.6
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 3.7
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 3.8
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 3.9
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 4.0
                },
                {
                    cdTime: 8,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 6.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 4.1
                },
                {
                    cdTime: 8,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 6.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 4.2
                },
                {
                    cdTime: 8,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 6.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 4.3
                },
                {
                    cdTime: 8,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 6.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 4.4
                },
                {
                    cdTime: 8,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 6.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 4.5
                },
                {
                    cdTime: 8,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 6.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 4.6
                },
                {
                    cdTime: 8,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 6.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 4.7
                },
                {
                    cdTime: 8,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 6.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 4.8
                },
                {
                    cdTime: 8,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 6.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 4.9
                },
                {
                    cdTime: 8,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 6.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 5.0
                }
            ],
            speed: 450
        },

        {
            id: 3001,
            grade: 3,
            atkType:SkillConfig.SKILL_ATK_TYPE.SHORT_RANGE,
            atkRange: 0,
            name: "阿提亚",
            desc: "【范围技能】召唤" + SkillConfig.FORMAT_KEY.NUM + "位阿提亚，每位造成2次" + SkillConfig.FORMAT_KEY.ATKRATE + "攻击力的伤害",
            pic: "ui/skill/skill/skill_03/1",
            spine: "animation/skill/skill/skill_03/skill_03",
            execAudio: null,
            atkAudio: "audio/skill/atk_04",
            mainScale: {
                x: -0.50,
                y: 0.50
            },
            listScale: {
                x: 1,
                y: 1
            },
            initGenPos: {x : -400, y : 0},
            levelConfig: [
                {
                    cdTime: 15,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 0.9,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.25
                },
                {
                    cdTime: 14,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 1.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.40
                },
                {
                    cdTime: 14,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 1.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.60
                },
                {
                    cdTime: 13,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 1.30,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.80
                },
                {
                    cdTime: 13,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 1.40,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.00
                },
                {
                    cdTime: 12,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 1.50,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.40
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 1.60,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.80
                },
                {
                    cdTime: 12,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 1.70,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.20
                },
                {
                    cdTime: 11,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 1.90,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.80
                },
                {
                    cdTime: 11,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.30,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 3.50
                },
                {
                    cdTime: 10,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.8,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 4.2
                },
                {
                    cdTime: 10,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 3.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 4.8
                },
                {
                    cdTime: 9.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 5.5
                },
                {
                    cdTime: 9.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 6.0
                },
                {
                    cdTime: 9.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 6.5
                },
                {
                    cdTime: 9.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 7.0
                },
                {
                    cdTime: 9.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 7.5
                },
                {
                    cdTime: 9.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 8.0
                },
                {
                    cdTime: 9.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 8.5
                },
                {
                    cdTime: 9.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 9.0
                },
                {
                    cdTime: 9.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 9.5
                },
                {
                    cdTime: 9.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 10.0
                },
                {
                    cdTime: 9.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 10.5
                },
                {
                    cdTime: 9.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 11.0
                },
                {
                    cdTime: 9.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 11.5
                },
                {
                    cdTime: 9.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 12.0
                },
                {
                    cdTime: 9.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 12.5
                },
                {
                    cdTime: 9.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 13.0
                },
                {
                    cdTime: 9.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 13.5
                },
                {
                    cdTime: 9.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 14.0
                },
                {
                    cdTime: 9.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 6.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 14.5
                },
                {
                    cdTime: 9.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 6.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 15.0
                },
                {
                    cdTime: 9.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 6.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 15.5
                },
                {
                    cdTime: 9.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 6.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 16.5
                },
                {
                    cdTime: 9.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 6.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 17.0
                },
                {
                    cdTime: 9.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 6.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 17.5
                },
                {
                    cdTime: 9.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 7.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 18.0
                }
            ],
            speed: 450
        },
        
        {
            id: 4001,
            grade: 4,
            atkType:SkillConfig.SKILL_ATK_TYPE.SKY_RANGE,
            atkRange: 0,
            name: "巨蛙压顶",
            desc: "【范围技能】召唤" + SkillConfig.FORMAT_KEY.NUM + "只巨蛙，每只造成" + SkillConfig.FORMAT_KEY.ATKRATE + "攻击力的伤害",
            pic: "ui/skill/skill/skill_05/1",
            spine: "animation/skill/skill/skill_05/skill_05",
            execAudio: null,
            atkAudio: "audio/skill/atk_03",
            mainScale: {
                x: -0.75,
                y: 0.75
            },
            listScale: {
                x: 1,
                y: 1
            },
            initGenPos: {x : 0, y : 0},
            levelConfig: [
                {
                    cdTime: 15,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.35
                },
                {
                    cdTime: 14,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.3,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.55
                },
                {
                    cdTime: 13,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.4,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.80
                },
                {
                    cdTime: 12,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.10
                },
                {
                    cdTime: 11,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.6,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.50
                },
                {
                    cdTime: 10,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.7,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.20
                },
                {
                    cdTime: 10,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.8,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.50
                },
                {
                    cdTime: 9.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.9,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 3.00
                },
                {
                    cdTime: 9.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 3.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 3.50
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 3.1,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 4.20
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 3.2,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 5.0
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 3.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 6.0
                },
                {
                    cdTime: 8.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 7.0
                },
                {
                    cdTime: 8.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 8.0
                },
                {
                    cdTime: 8.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 9.0
                },
                {
                    cdTime: 8.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 10.0
                },
                {
                    cdTime: 8.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 6.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 11.0
                },
                {
                    cdTime: 8.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 7.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 12.0
                },
                {
                    cdTime: 8.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 7.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 13.0
                },
                {
                    cdTime: 8.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 8.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 14.0
                },
                {
                    cdTime: 8.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 8.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 15.0
                },
                {
                    cdTime: 8.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 9.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 16.0
                },
                {
                    cdTime: 8.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 9.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 17.0
                },
                {
                    cdTime: 8.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 10.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 18.0
                },
                {
                    cdTime: 8.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 10.50,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 19.0
                },
                {
                    cdTime: 8.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 11.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 20.0
                },
                {
                    cdTime: 8.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 11.50,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 21.0
                },
                {
                    cdTime: 8.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 12.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 22.0
                }
            ],
            speed: 450
        },

        {
            id: 5001,
            grade: 5,
            atkType:SkillConfig.SKILL_ATK_TYPE.SKY_SINGLE,
            atkRange: 0,
            name: "阴雷",
            desc: "【单体技能】召唤" + SkillConfig.FORMAT_KEY.NUM + "条阴雷，每条造成" + SkillConfig.FORMAT_KEY.ATKRATE + "攻击力的伤害",
            pic: "ui/skill/skill/skill_04/1",
            spine: "animation/skill/skill/skill_04/skill_04",
            execAudio: null,
            atkAudio: "audio/skill/atk_06",
            mainScale: {
                x: 1.8,
                y: 1.8
            },
            listScale: {
                x: 1,
                y: 1
            },
            initGenPos: {x : 0, y : 0},
            levelConfig: [
                {
                    cdTime: 15,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 3.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.40
                },
                {
                    cdTime: 14,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 3.10,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.60
                },
                {
                    cdTime: 13,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 3.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.80
                },
                {
                    cdTime: 12,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 3.30,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.00
                },
                {
                    cdTime: 11,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 3.40,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.50
                },
                {
                    cdTime: 10,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 3.50,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.50
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 3.60,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 3.50
                },
                {
                    cdTime: 8,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 3.70,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 4.50
                },
                {
                    cdTime: 7,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 3.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 5.50
                },
                {
                    cdTime: 6,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 7.00
                },
                {
                    cdTime: 6,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.50,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 8.00
                },
                {
                    cdTime: 6,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 5.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 9.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 6.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 10.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 7.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 12.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 9.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 13.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 11.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 13.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 13.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 13.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 15.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 14.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 17.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 15.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 19.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 16.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 21.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 17.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 23.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 18.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 25.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 19.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 27.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 20.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 29.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 21.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 31.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 22.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 33.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 23.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 35.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 24.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 37.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 25.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 39.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 26.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 41.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 27.00
                },
                {
                    cdTime: 5.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 43.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 28.00
                },
                {
                    cdTime: 5.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 45.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 29.00
                },
                {
                    cdTime: 5.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 50.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 30.00
                }
            ],
            speed: 450
        },

        {
            id: 6001,
            grade: 6,
            atkType:SkillConfig.SKILL_ATK_TYPE.SHORT_RANGE,
            atkRange: 100,
            name: "魔神降临",
            desc: "【范围技能】召唤" + SkillConfig.FORMAT_KEY.NUM + "位魔神，每位魔神造成" + SkillConfig.FORMAT_KEY.ATKRATE + "攻击力的伤害",
            pic: "ui/skill/skill/skill_06/1",
            spine: "animation/skill/skill/skill_06/skill_06",
            execAudio: "audio/skill/exec_07",
            atkAudio: null,
            mainScale: {
                x: -0.50,
                y: 0.50
            },
            listScale: {
                x: 1,
                y: 1
            },
            initGenPos: {x : -400, y : 150},
            levelConfig: [
                {
                    cdTime: 14,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.50,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.0
                },
                {
                    cdTime: 14,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.60,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.5
                },
                {
                    cdTime: 13,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.70,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 3.0
                },
                {
                    cdTime: 12,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 4.0
                },
                {
                    cdTime: 11,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 2.90,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 5.0
                },
                {
                    cdTime: 10,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 3.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 6.0
                },
                {
                    cdTime: 9,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 3.30,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 7.0
                },
                {
                    cdTime: 8,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 3.60,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 8.0
                },
                {
                    cdTime: 7,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 3.90,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 9.0
                },
                {
                    cdTime: 6,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 10.0
                },
                {
                    cdTime: 6,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.50,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 11.00
                },
                {
                    cdTime: 6,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 4.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 12.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 6.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 15.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 7.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 18.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 9.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 20.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 11.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 22.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 13.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 25.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 15.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 28.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 17.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 30.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 19.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 32.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 21.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 35.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 23.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 38.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 25.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 40.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 27.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 42.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 29.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 45.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 31.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 48.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 33.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 50.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 35.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 52.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 37.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 55.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 39.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 58.00
                },
                {
                    cdTime: 5.5,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 41.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 60.00
                },
                {
                    cdTime: 5.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 43.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 62.00
                },
                {
                    cdTime: 5.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 45.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 65.00
                },
                {
                    cdTime: 5.0,
                    num: 1,
                    skillAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    skillAttrRate: 50.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 68.00
                }
            ],
            speed: 550
        }


    ]
    public static CONFIG_MAP = new Map<number, SkillBasic>();

    public static EQUIP_POS_CONFIG_MAP = new Map<number, SkillEquipPosBasic>();

    /**
     * 加载配置
     */
    public static loadConfigMap() {
        for (let i = 0; i < this.CONFIG.length; i++) {
            let config = this.CONFIG[i];
            this.CONFIG_MAP.set(config.id, config);
        }

        this.loadEquipPosConfigMap();
    }

    /**
     * 加载配置
     */
    public static loadEquipPosConfigMap() {
        for (let i = 0; i < this.EQUIP_POS_CONFIG.length; i++) {
            let config = this.EQUIP_POS_CONFIG[i];
            this.EQUIP_POS_CONFIG_MAP.set(config.pos, config);
        }
    }

    /**
     * 获取技能升级消耗
     * @param level 等级
     */
    public static getLevelUpCost(level: number) {
        return SkillConfig.LEVEL_UP_COST_CONFIG[level];
    }

    /**
     * 获取技能配置
     * @param id 技能ID
     */
    public static getConfigById(id: number) {
        return this.CONFIG_MAP.get(id);
    }

    /**
     * 获取技能等级配置
     * @param id 技能ID
     */
    public static getMaxLevel(id: number) {
        return this.CONFIG_MAP.get(id).levelConfig.length;
    }

    /**
     * 获取技能等级配置
     * @param id 技能ID
     * @param level 技能等级
     */
    public static getLevelConfig(id: number, level: number): SkillLevelBasic {
        level = level == 0 ? 0 : level - 1;
        return this.CONFIG_MAP.get(id).levelConfig[level];
    }

     /**
     * 获取技能装备位置解锁条件
     * @param pos 技能装备位置
     */
     public static getEquipPosUnlockCondition(pos: number) {
        return this.EQUIP_POS_CONFIG_MAP.get(pos).unlockCondition;
    }

    /**
     * 根据品阶获取配置
     * @param grade 品阶
     */
     public static getConfigByGrade(grade:number) {
        let idList = [];
        for(let i = 0; i < this.CONFIG.length; i++) {
            let config = this.CONFIG[i];
            if(config.grade == grade) {
                idList.push(config.id);
            }
        }
        return idList;
    }
}

/**
 * 技能品阶配置
 */
export class SkillEquipPosBasic {
    pos: number = null; // 位置
    unlockCondition = null; // 解锁条件
}

/**
 * 技能等级配置
 */
export class SkillLevelBasic {
    cdTime: number = null; // 冷却时间(秒)
    num: number = null; // 数量
    skillAttrKey: string = null; // 增加属性key
    skillAttrRate: number = null; // 增加属性值(百分比)
    addAttrKey: string = null; // 拥有效果 增加属性key
    addRate: number = null; // 拥有效果 增加属性值(百分比)
}

/**
 * 技能配置
 */
export class SkillBasic {
    id: number = null; // ID
    atkType:number = null; // 技能攻击类型
    atkRange:number = null; // 攻击范围
    grade: number = null; // 品阶
    name: string = null; // 名称
    desc: string = null; // 介绍
    pic: string = null; // 图片路径
    spine: string = null; // spine路径
    execAudio:string = null; // 召唤音效路径
    atkAudio: string = null; // 攻击音效路径
    mainScale = null; // 主场景放大倍数
    listScale = null; // 列表放大倍数
    initGenPos = null; // 初始生成位置
    levelConfig = null; // 技能等级配置
    speed:number = null; // 移动速度
}
