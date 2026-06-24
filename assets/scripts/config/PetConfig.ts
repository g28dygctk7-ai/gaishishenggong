import UnlockManager from "../manager/UnlockManager";
import AttrLevelConfig from "./AttrLevelConfig";

const { ccclass, property } = cc._decorator;

/**
 * 宠物配置
 */
@ccclass
export default class PetConfig {

    /**
     * 玩家装备宠物的位置锁定状态
     */
    public static EQUIP_POS_STATUS = {
        LOCK: 0,
        UNLOCK: 1
    };

    /**
     * 宠物spine动画名称
     */
    public static PET_SPINE_ANIMATION_NAME = {
        RUN: "run",
        ATK: "attack",
        ATK2: "attack2",
        STAND: "stand"
    }

    /**
     * 宠物攻击类型
     */
    public static PET_ATK_TYPE = {
        SHORT_SINGLE: 1, // 近战单体伤害
        SHORT_RANGE: 2, // 近战范围伤害
        LONG_SINGLE: 3, // 远程单体伤害
        LONG_RANGE: 4, // 远程范围伤害
    }

    public static EQUIP_POS_CONFIG = [
        {
            pos: 1,
            unlockCondition: {
                type: 4,
                content: 15
            },
            mainInitPos: { x: -80, y: 100 }
        },
        {
            pos: 2,
            unlockCondition: {
                type: 4,
                content: 25
            },
            mainInitPos: { x: -105, y: 10 }
        },
        {
            pos: 3,
            unlockCondition: {
                type: 4,
                content: 35
            },
            mainInitPos: { x: -130, y: -80 }
        },
        {
            pos: 4,
            unlockCondition: {
                type: 4,
                content: 45
            },
            mainInitPos: { x: 40, y: 100 }
        },
        {
            pos: 5,
            unlockCondition: {
                type: 4,
                content: 55
            },
            mainInitPos: { x: -15, y: -80 }
        },
        // {
        //     pos:6,
        //     unlockCondition: {
        //         type: 4,
        //         content: 61
        //     }
        // }
    ]

    /**
     * 玩家装备宠物的上限数量
     */
    public static PET_EQUIP_MAX_NUM = PetConfig.EQUIP_POS_CONFIG.length;

    /**
     * 宠物装备状态
     */
    public static EQUIP_STATUS_MENU = {
        UN_EQUIP: 0, // 未装备
        EQUIP: 1 // 装备中
    }

    /**
     * 宠物强化消耗对应宠物碎片数量
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
            atkType: PetConfig.PET_ATK_TYPE.SHORT_SINGLE,
            name: "冰之精灵",
            desc: "冰之精灵",
            atkFrameTime: 1.0,
            pic: "ui/pet/pet_02/1",
            spine: "animation/pet/pet_02/pet_02",
            mainScale: {
                x: -0.30,
                y: 0.30
            },
            listScale: {
                x: 1,
                y: 1
            },
            initSkill: 201,
            levelConfig: [
                {
                    atkRate: 0.1,
                    atkSpeed: 0.7,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.01
                },
                {
                    atkRate: 0.2,
                    atkSpeed: 0.7,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.02
                },
                {
                    atkRate: 0.3,
                    atkSpeed: 0.75,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.04
                },
                {
                    atkRate: 0.4,
                    atkSpeed: 0.75,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.06
                },
                {
                    atkRate: 0.5,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.08
                },
                {
                    atkRate: 0.6,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.1
                },
                {
                    atkRate: 0.7,
                    atkSpeed: 0.85,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.12
                },
                {
                    atkRate: 0.85,
                    atkSpeed: 0.85,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.14
                },
                {
                    atkRate: 0.90,
                    atkSpeed: 0.90,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.16
                },
                {
                    atkRate: 0.90,
                    atkSpeed: 0.90,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.18
                },
                {
                    atkRate: 0.95,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.20
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.22
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.24
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.26
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.28
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.30
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.32
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.34
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.36
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.38
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.40
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.42
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.44
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.46
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.48
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.50
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.52
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.54
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.56
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.58
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.60
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.65
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.70
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.72
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.75
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.80
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.85
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.90
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.95
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.00
                }
            ]
        },

        {
            id: 2001,
            grade: 2,
            atkType: PetConfig.PET_ATK_TYPE.SHORT_SINGLE,
            atkFrameTime: 1.0,
            name: "小豆芽",
            desc: "小豆芽",
            pic: "ui/pet/pet_06/1",
            spine: "animation/pet/pet_06/pet_06",
            mainScale: {
                x: -0.30,
                y: 0.30
            },
            listScale: {
                x: 1,
                y: 1
            },
            initSkill: 201,
            levelConfig: [
                {
                    atkRate: 0.15,
                    atkSpeed: 0.7,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.05
                },
                {
                    atkRate: 0.25,
                    atkSpeed: 0.7,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.10
                },
                {
                    atkRate: 0.35,
                    atkSpeed: 0.75,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.15
                },
                {
                    atkRate: 0.45,
                    atkSpeed: 0.75,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.20
                },
                {
                    atkRate: 0.55,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.25
                },
                {
                    atkRate: 0.65,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.30
                },
                {
                    atkRate: 0.85,
                    atkSpeed: 0.85,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.35
                },
                {
                    atkRate: 0.85,
                    atkSpeed: 0.85,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.40
                },
                {
                    atkRate: 0.90,
                    atkSpeed: 0.90,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.45
                },
                {
                    atkRate: 0.90,
                    atkSpeed: 0.90,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.50
                },
                {
                    atkRate: 0.95,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.60
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.70
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.80
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.90
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.00
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.10
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.20
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.30
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.40
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.50
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.60
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.70
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.80
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.90
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.00
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.10
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.20
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.30
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.40
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.50
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.60
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.70
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.80
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.90
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 3.00
                }
            ]
        },

        {
            id: 3001,
            grade: 3,
            atkType: PetConfig.PET_ATK_TYPE.SHORT_SINGLE,
            atkFrameTime: 1.0,
            name: "小绿魔",
            desc: "小绿魔",
            pic: "ui/pet/pet_01/1",
            spine: "animation/pet/pet_01/pet_01",
            mainScale: {
                x: -0.30,
                y: 0.30
            },
            listScale: {
                x: 1,
                y: 1
            },
            initSkill: 202,
            levelConfig: [
                {
                    atkRate: 0.1,
                    atkSpeed: 0.45,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.10
                },
                {
                    atkRate: 0.2,
                    atkSpeed: 0.50,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.15
                },
                {
                    atkRate: 0.3,
                    atkSpeed: 0.55,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.20
                },
                {
                    atkRate: 0.4,
                    atkSpeed: 0.55,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.25
                },
                {
                    atkRate: 0.5,
                    atkSpeed: 0.60,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.35
                },
                {
                    atkRate: 0.6,
                    atkSpeed: 0.60,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.45
                },
                {
                    atkRate: 0.7,
                    atkSpeed: 0.65,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.55
                },
                {
                    atkRate: 0.85,
                    atkSpeed: 0.65,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.65
                },
                {
                    atkRate: 0.90,
                    atkSpeed: 0.70,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.75
                },
                {
                    atkRate: 0.90,
                    atkSpeed: 0.70,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.85
                },
                {
                    atkRate: 0.95,
                    atkSpeed: 0.75,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.00
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.20
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.40
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.60
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.80
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.00
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.20
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.40
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.60
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.80
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 3.00
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 3.50
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 4.00
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 4.20
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 4.40
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 4.60
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 4.80
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 5.20
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 5.40
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 5.60
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 5.80
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 6.00
                }
            ]
        },

        
        {
            id: 4001,
            grade: 4,
            atkType: PetConfig.PET_ATK_TYPE.SHORT_SINGLE,
            atkFrameTime: 1.0,
            name: "树精",
            desc: "树精",
            pic: "ui/pet/pet_04/1",
            spine: "animation/pet/pet_04/pet_04",
            mainScale: {
                x: -0.30,
                y: 0.30
            },
            listScale: {
                x: 1,
                y: 1
            },
            initSkill: 202,
            levelConfig: [
                {
                    atkRate: 0.5,
                    atkSpeed: 0.75,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.25
                },
                {
                    atkRate: 0.8,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.4
                },
                {
                    atkRate: 0.3,
                    atkSpeed: 0.85,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.6
                },
                {
                    atkRate: 0.4,
                    atkSpeed: 0.85,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 0.8
                },
                {
                    atkRate: 0.5,
                    atkSpeed: 0.90,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.0
                },
                {
                    atkRate: 0.6,
                    atkSpeed: 0.90,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.2
                },
                {
                    atkRate: 0.7,
                    atkSpeed: 0.95,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.5
                },
                {
                    atkRate: 0.85,
                    atkSpeed: 0.95,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.8
                },
                {
                    atkRate: 0.90,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.3
                },
                {
                    atkRate: 0.90,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.6
                },
                {
                    atkRate: 0.95,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 3.00
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 3.40
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 3.80
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 4.20
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 4.80
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 5.20
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 5.80
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 6.20
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 6.80
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 7.20
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 7.80
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 8.20
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 8.80
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 9.20
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 9.80
                },
                {
                    atkRate: 1.00,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 10.20
                }
            ]
        },

        
        {
            id: 5001,
            grade: 5,
            atkType: PetConfig.PET_ATK_TYPE.SHORT_SINGLE,
            atkFrameTime: 1.0,
            name: "机甲1号",
            desc: "机甲1号",
            pic: "ui/pet/pet_03/1",
            spine: "animation/pet/pet_03/pet_03",
            mainScale: {
                x: -0.30,
                y: 0.30
            },
            listScale: {
                x: 1,
                y: 1
            },
            initSkill: 202,
            levelConfig: [
                {
                    atkRate: 0.85,
                    atkSpeed: 0.8,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.00
                },
                {
                    atkRate: 0.9,
                    atkSpeed: 0.8,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.25
                },
                {
                    atkRate: 0.95,
                    atkSpeed: 0.85,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.5
                },
                {
                    atkRate: 1.0,
                    atkSpeed: 0.85,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 1.8
                },
                {
                    atkRate: 1.1,
                    atkSpeed: 0.90,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.2
                },
                {
                    atkRate: 1.2,
                    atkSpeed: 0.90,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.5
                },
                {
                    atkRate: 1.3,
                    atkSpeed: 0.95,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 3.0
                },
                {
                    atkRate: 1.4,
                    atkSpeed: 0.95,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 4.0
                },
                {
                    atkRate: 1.5,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 5.0
                },
                {
                    atkRate: 1.6,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 6.0
                },
                {
                    atkRate: 1.7,
                    atkSpeed: 1.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 7.0
                },
                {
                    atkRate: 1.8,
                    atkSpeed: 1.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 8.0
                },
                {
                    atkRate: 1.8,
                    atkSpeed: 1.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 9.0
                },
                {
                    atkRate: 1.8,
                    atkSpeed: 1.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 10.0
                },
                {
                    atkRate: 1.8,
                    atkSpeed: 1.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 11.0
                },
                {
                    atkRate: 1.8,
                    atkSpeed: 1.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 12.0
                },
                {
                    atkRate: 1.8,
                    atkSpeed: 1.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 13.0
                },
                {
                    atkRate: 1.8,
                    atkSpeed: 1.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 14.0
                },
                {
                    atkRate: 1.8,
                    atkSpeed: 1.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 15.0
                },
                {
                    atkRate: 1.8,
                    atkSpeed: 1.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 16.0
                },
                {
                    atkRate: 1.8,
                    atkSpeed: 1.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 17.0
                },
                {
                    atkRate: 1.8,
                    atkSpeed: 1.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 18.0
                },
                {
                    atkRate: 1.8,
                    atkSpeed: 1.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 19.0
                },
                {
                    atkRate: 1.8,
                    atkSpeed: 1.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 20.0
                }
            ]
        },

        {
            id: 6001,
            grade: 6,
            atkType: PetConfig.PET_ATK_TYPE.SHORT_SINGLE,
            atkFrameTime: 1.0,
            name: "机关小子",
            desc: "机关小子",
            pic: "ui/pet/pet_05/1",
            spine: "animation/pet/pet_05/pet_05",
            mainScale: {
                x: -0.30,
                y: 0.30
            },
            listScale: {
                x: 1,
                y: 1
            },
            initSkill: 205,
            levelConfig: [
                {
                    atkRate: 1.0,
                    atkSpeed: 0.8,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.0
                },
                {
                    atkRate: 1.05,
                    atkSpeed: 0.8,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 2.8
                },
                {
                    atkRate: 1.1,
                    atkSpeed: 0.85,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 3.5
                },
                {
                    atkRate: 1.15,
                    atkSpeed: 0.85,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 4.8
                },
                {
                    atkRate: 1.20,
                    atkSpeed: 0.90,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 5.2
                },
                {
                    atkRate: 1.25,
                    atkSpeed: 0.90,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 6.0
                },
                {
                    atkRate: 1.3,
                    atkSpeed: 0.95,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 6.8
                },
                {
                    atkRate: 1.4,
                    atkSpeed: 0.95,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 7.4
                },
                {
                    atkRate: 1.5,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 8.0
                },
                {
                    atkRate: 1.6,
                    atkSpeed: 1.00,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 9.0
                },
                {
                    atkRate: 1.7,
                    atkSpeed: 1.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 10.0
                },
                {
                    atkRate: 1.7,
                    atkSpeed: 1.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 12.0
                },
                {
                    atkRate: 1.7,
                    atkSpeed: 1.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 13.5
                },
                {
                    atkRate: 1.7,
                    atkSpeed: 1.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 15.0
                },
                {
                    atkRate: 1.7,
                    atkSpeed: 1.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 16.5
                },
                {
                    atkRate: 1.7,
                    atkSpeed: 1.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 18.0
                },
                {
                    atkRate: 1.7,
                    atkSpeed: 1.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 19.5
                },
                {
                    atkRate: 1.7,
                    atkSpeed: 1.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 21.0
                },
                {
                    atkRate: 1.7,
                    atkSpeed: 1.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 22.5
                },
                {
                    atkRate: 1.7,
                    atkSpeed: 1.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 24.0
                },
                {
                    atkRate: 1.7,
                    atkSpeed: 1.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 25.5
                },
                {
                    atkRate: 1.7,
                    atkSpeed: 1.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 27.0
                },
                {
                    atkRate: 1.7,
                    atkSpeed: 1.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 28.5
                },
                {
                    atkRate: 1.7,
                    atkSpeed: 1.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 30.0
                },
                {
                    atkRate: 1.7,
                    atkSpeed: 1.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 32.0
                }
            ]
        },
        {
            id: 7001,
            grade: 7,
            atkType: PetConfig.PET_ATK_TYPE.SHORT_SINGLE,
            atkFrameTime: 1.50,
            name: "炎魔",
            desc: "炎魔",
            pic: "ui/pet/pet_07/1",
            spine: "animation/pet/pet_07/pet_07",
            mainScale: {
                x: -0.30,
                y: 0.30
            },
            listScale: {
                x: 1,
                y: 1
            },
            initSkill: 207,
            levelConfig: [
                {
                    atkRate: 1.5,
                    atkSpeed: 1.0,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 10.0
                },
                {
                    atkRate: 1.55,
                    atkSpeed: 1.15,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 13.0
                },
                {
                    atkRate: 1.65,
                    atkSpeed: 1.20,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 15.0
                },
                {
                    atkRate: 1.75,
                    atkSpeed: 1.25,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 18.0
                },
                {
                    atkRate: 1.85,
                    atkSpeed: 1.30,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 21.0
                },
                {
                    atkRate: 1.95,
                    atkSpeed: 1.35,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 24.0
                },
                {
                    atkRate: 2.0,
                    atkSpeed: 1.40,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 27.0
                },
                {
                    atkRate: 2.1,
                    atkSpeed: 1.45,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 30.0
                },
                {
                    atkRate: 2.2,
                    atkSpeed: 1.50,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 33.0
                },
                {
                    atkRate: 2.3,
                    atkSpeed: 1.55,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 36.0
                },
                {
                    atkRate: 2.4,
                    atkSpeed: 1.60,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 40.0
                },
                {
                    atkRate: 2.4,
                    atkSpeed: 1.60,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 44.0
                },
                {
                    atkRate: 2.4,
                    atkSpeed: 1.60,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 48.0
                },
                {
                    atkRate: 2.4,
                    atkSpeed: 1.60,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 52.0
                },
                {
                    atkRate: 2.4,
                    atkSpeed: 1.60,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 56.0
                },
                {
                    atkRate: 2.4,
                    atkSpeed: 1.60,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 60.0
                },
                {
                    atkRate: 2.4,
                    atkSpeed: 1.60,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 64.0
                },
                {
                    atkRate: 2.4,
                    atkSpeed: 1.60,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 68.0
                },
                {
                    atkRate: 2.4,
                    atkSpeed: 1.60,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 72.0
                },
                {
                    atkRate: 2.4,
                    atkSpeed: 1.60,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 76.0
                },
                {
                    atkRate: 2.4,
                    atkSpeed: 1.60,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 82.0
                },
                {
                    atkRate: 2.4,
                    atkSpeed: 1.60,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 86.0
                },
                {
                    atkRate: 2.4,
                    atkSpeed: 1.60,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 92.0
                },
                {
                    atkRate: 2.4,
                    atkSpeed: 1.60,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 96.0
                },
                {
                    atkRate: 2.4,
                    atkSpeed: 1.60,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 100.0
                }
            ]
        },
        {
            id: 7002,
            grade: 7,
            atkType: PetConfig.PET_ATK_TYPE.SHORT_SINGLE,
            atkFrameTime: 1.0,
            name: "雷神",
            desc: "雷神",
            pic: "ui/pet/pet_08/1",
            spine: "animation/pet/pet_08/pet_08",
            mainScale: {
                x: -0.30,
                y: 0.30
            },
            listScale: {
                x: 1,
                y: 1
            },
            initSkill: 208,
            levelConfig: [
                {
                    atkRate: 1.5,
                    atkSpeed: 0.5,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 10.0
                },
                {
                    atkRate: 1.55,
                    atkSpeed: 0.60,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 13.0
                },
                {
                    atkRate: 1.65,
                    atkSpeed: 0.60,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 15.0
                },
                {
                    atkRate: 1.75,
                    atkSpeed: 0.65,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 18.0
                },
                {
                    atkRate: 1.85,
                    atkSpeed: 0.65,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 21.0
                },
                {
                    atkRate: 1.95,
                    atkSpeed: 0.70,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 24.0
                },
                {
                    atkRate: 2.0,
                    atkSpeed: 0.70,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 27.0
                },
                {
                    atkRate: 2.1,
                    atkSpeed: 0.75,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 30.0
                },
                {
                    atkRate: 2.2,
                    atkSpeed: 0.75,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 33.0
                },
                {
                    atkRate: 2.3,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 36.0
                },
                {
                    atkRate: 2.4,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 40.0
                },
                {
                    atkRate: 2.4,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 44.0
                },
                {
                    atkRate: 2.4,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 48.0
                },
                {
                    atkRate: 2.4,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 52.0
                },
                {
                    atkRate: 2.4,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 56.0
                },
                {
                    atkRate: 2.4,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 60.0
                },
                {
                    atkRate: 2.4,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 64.0
                },
                {
                    atkRate: 2.4,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 68.0
                },
                {
                    atkRate: 2.4,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 72.0
                },
                {
                    atkRate: 2.4,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 76.0
                },
                {
                    atkRate: 2.4,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 82.0
                },
                {
                    atkRate: 2.4,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 86.0
                },
                {
                    atkRate: 2.4,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 92.0
                },
                {
                    atkRate: 2.4,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 96.0
                },
                {
                    atkRate: 2.4,
                    atkSpeed: 0.80,
                    addAttrKey: AttrLevelConfig.ATTR_KEY.ATK,
                    addRate: 100.0
                }
            ]
        }

    ]
    public static CONFIG_MAP = new Map<number, PetBasic>();

    public static EQUIP_POS_CONFIG_MAP = new Map<number, PetEquipPosBasic>();

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
     * 获取宠物升级消耗
     * @param level 等级
     */
    public static getLevelUpCost(level: number) {
        return PetConfig.LEVEL_UP_COST_CONFIG[level];
    }

    /**
     * 获取宠物配置
     * @param id 宠物ID
     */
    public static getConfigById(id: number) {
        return this.CONFIG_MAP.get(id);
    }

    /**
     * 获取宠物等级配置
     * @param id 宠物ID
     */
    public static getMaxLevel(id: number) {
        return this.CONFIG_MAP.get(id).levelConfig.length;
    }

    /**
     * 获取宠物等级配置
     * @param id 宠物ID
     * @param level 宠物等级
     */
    public static getLevelConfig(id: number, level: number): PetLevelBasic {
        level = level == 0 ? 0 : level - 1;
        return this.CONFIG_MAP.get(id).levelConfig[level];
    }

    /**
    * 获取宠物装备位置解锁条件
    * @param pos 宠物装备位置
    */
    public static getEquipPosUnlockCondition(pos: number) {
        return this.EQUIP_POS_CONFIG_MAP.get(pos).unlockCondition;
    }

    /**
    * 获取宠物装备位置初始位置
    * @param pos 宠物装备位置
    */
    public static getEquipPosMainInitPos(pos: number) {
        return this.EQUIP_POS_CONFIG_MAP.get(pos).mainInitPos;
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
 * 宠物品阶配置
 */
export class PetEquipPosBasic {
    pos: number = null; // 位置
    unlockCondition = null; // 解锁条件
    mainInitPos = null; // 主界面初始位置
}

/**
 * 宠物等级配置
 */
export class PetLevelBasic {
    atkRate: number = null; // 占有角色攻击力的百分比
    atkSpeed: number = null; // 攻速
    addAttrKey: string = null; // 拥有效果 增加属性key
    addRate: number = null; // 拥有效果 增加属性值(百分比)
}

/**
 * 宠物配置
 */
export class PetBasic {
    id: number = null; // ID
    atkType: number = null; // 宠物攻击类型
    atkFrameTime: number = null; // 攻击动画帧时长
    grade: number = null; // 品阶
    name: string = null; // 名称
    desc: string = null; // 介绍
    pic: string = null; // 图片路径
    spine: string = null; // spine路径
    mainScale = null; // 主场景放大倍数
    listScale = null; // 列表放大倍数
    initSkill: number = null; // 初始技能 -> GeneralSkillConfig
    levelConfig = null; // 宠物等级配置
}
