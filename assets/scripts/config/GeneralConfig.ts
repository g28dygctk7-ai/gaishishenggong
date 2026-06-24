// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import UnlockManager from "../manager/UnlockManager";

const { ccclass, property } = cc._decorator;

/**
 * 角色配置
 */
@ccclass
export default class GeneralConfig {

    public static SPINE_ANIMATION_NAME = {
        ATK: "attack",
        DIE: "die",
        HIT: "hit",
        RUN: "run",
        STAND: "stand"
    }

    /**
     * 角色升级对应经验
     */
    public static LEVEL_UP_EXP_CONFIG = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,          // 1-10级
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20, // 11-20级
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, // 21-30级
        31, 32, 33, 34, 35, 36, 37, 38, 39, 40, // 31-40级
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50, // 41-50级
        51, 52, 53, 54, 55, 56, 57, 58, 59, 60, // 51-60级
        61, 62, 63, 64, 65, 66, 67, 68, 69, 70, // 61-70级
        71, 72, 73, 74, 75, 76, 77, 78, 79, 80, // 71-80级
        81, 82, 83, 84, 85, 86, 87, 88, 89, 90, // 81-90级
        91, 92, 93, 94, 95, 96, 97, 98, 99, 100 // 91-100级
    ]

    public static CONFIG = [
        {
            id: 1,
            name: "勇士",
            desc: "",
            mainScale: {
                x: -0.5,
                y: 0.5
            },
            listScale: {
                x: -0.55,
                y: 0.55
            },
            listPos:null,
            spine: "animation/general/general_01/general_01",
            atkFrameTime: 1.0,
            iconPic: "ui/txt/C",
            unlockCondition: {
                type: UnlockManager.UNLOCK_TYPE.FREE
            }, // 解锁条件
            skill: {
                initSkill: 101,
                levelSkill: { // 等级技能
                    "10": 1,
                    "25": 11,
                    "50": 21,
                    "75": 12,
                    "100": 22,
                },
                fixedSkill: { // 固定技能
                    "20": 201
                }
            }
        },
        {
            id: 2,
            name: "刀男",
            desc: "",
            mainScale: {
                x: -0.5,
                y: 0.5
            },
            listScale: {
                x: -0.55,
                y: 0.55
            },
            listPos:{
                x: 0,
                y: -50
            },
            spine: "animation/general/general_12/general_12",
            atkFrameTime: 1.8,
            iconPic: "ui/txt/B",
            unlockCondition: {
                type: UnlockManager.UNLOCK_TYPE.ITEM,
                content: {
                    itemId: 1006,
                    itemCount: 1000
                }
            }, // 解锁条件
            skill: {
                initSkill: 112,
                levelSkill: { // 等级技能
                    "1": 1,
                    "10": 1,
                    "25": 11,
                    "50": 21,
                    "75": 12,
                    "100": 22,
                },
                fixedSkill: { // 固定技能
                    "20": 201
                }
            }
        },
        {
            id: 3,
            name: "孔一凡",
            desc: "",
            mainScale: {
                x: -0.5,
                y: 0.5
            },
            listScale: {
                x: -0.55,
                y: 0.55
            },
            listPos:null,
            spine: "animation/general/general_02/general_02",
            atkFrameTime: 1.0,
            iconPic: "ui/txt/B",
            unlockCondition: {
                type: UnlockManager.UNLOCK_TYPE.ITEM,
                content: {
                    itemId: 1006,
                    itemCount: 1000
                }
            }, // 解锁条件
            skill: {
                initSkill: 102,
                levelSkill: { // 等级技能
                    "1": 1,
                    "10": 11,
                    "25": 21,
                    "50": 2,
                    "75": 12,
                    "100": 22,
                },
                fixedSkill: { // 固定技能
                    "20": 201
                }
            }
        },
        {
            id: 4,
            name: "爆炸头",
            desc: "",
            mainScale: {
                x: -0.5,
                y: 0.5
            },
            listScale: {
                x: -0.55,
                y: 0.55
            },
            listPos:null,
            spine: "animation/general/general_03/general_03",
            atkFrameTime: 1.0,
            iconPic: "ui/txt/A",
            unlockCondition: {
                type: UnlockManager.UNLOCK_TYPE.ITEM,
                content: {
                    itemId: 1006,
                    itemCount: 2000
                }
            }, // 解锁条件
            skill: {
                initSkill: 107,
                levelSkill: { // 等级技能
                    "1": 1,
                    "10": 11,
                    "25": 21,
                    "50": 2,
                    "75": 12,
                    "100": 22,
                },
                fixedSkill: { // 固定技能
                    "20": 201
                }
            }
        },
        {
            id: 5,
            name: "炮爷",
            desc: "",
            mainScale: {
                x: -0.5,
                y: 0.5
            },
            listScale: {
                x: -0.55,
                y: 0.55
            },
            listPos:null,
            spine: "animation/general/general_04/general_04",
            atkFrameTime: 1.0,
            iconPic: "ui/txt/A",
            unlockCondition: {
                type: UnlockManager.UNLOCK_TYPE.ITEM,
                content: {
                    itemId: 1006,
                    itemCount: 2000
                }
            }, // 解锁条件
            skill: {
                initSkill: 108,
                levelSkill: { // 等级技能
                    "1": 1,
                    "10": 11,
                    "25": 21,
                    "50": 2,
                    "75": 12,
                    "100": 22,
                },
                fixedSkill: { // 固定技能
                    "20": 201
                }
            }
        },
        {
            id: 6,
            name: "龙女",
            desc: "",
            mainScale: {
                x: -0.5,
                y: 0.5
            },
            listScale: {
                x: -0.55,
                y: 0.55
            },
            listPos:null,
            spine: "animation/general/general_05/general_05",
            atkFrameTime: 1.0,
            iconPic: "ui/txt/S",
            unlockCondition: {
                type: UnlockManager.UNLOCK_TYPE.ITEM,
                content: {
                    itemId: 1006,
                    itemCount: 2500
                }
            }, // 解锁条件
            skill: {
                initSkill: 103,
                levelSkill: { // 等级技能
                    "1": 1,
                    "10": 11,
                    "25": 21,
                    "50": 2,
                    "75": 12,
                    "100": 22,
                },
                fixedSkill: { // 固定技能
                    "20": 201
                }
            }
        },
        {
            id: 7,
            name: "忍者",
            desc: "",
            mainScale: {
                x: -0.5,
                y: 0.5
            },
            listScale: {
                x: -0.55,
                y: 0.55
            },
            listPos:null,
            spine: "animation/general/general_06/general_06",
            atkFrameTime: 1.0,
            iconPic: "ui/txt/S",
            unlockCondition: {
                type: UnlockManager.UNLOCK_TYPE.ITEM,
                content: {
                    itemId: 1006,
                    itemCount: 2500
                }
            }, // 解锁条件
            skill: {
                initSkill: 104,
                levelSkill: { // 等级技能
                    "1": 1,
                    "10": 11,
                    "25": 21,
                    "50": 2,
                    "75": 12,
                    "100": 22,
                },
                fixedSkill: { // 固定技能
                    "20": 201
                }
            }
        },
        {
            id: 8,
            name: "女猎人",
            desc: "",
            mainScale: {
                x: -0.5,
                y: 0.5
            },
            listScale: {
                x: -0.55,
                y: 0.55
            },
            listPos:{
                x: 0,
                y: -50
            },
            spine: "animation/general/general_07/general_07",
            atkFrameTime: 1.0,
            iconPic: "ui/txt/SS",
            unlockCondition: {
                type: UnlockManager.UNLOCK_TYPE.ITEM,
                content: {
                    itemId: 1006,
                    itemCount: 3000
                }
            }, // 解锁条件
            skill: {
                initSkill: 105,
                levelSkill: { // 等级技能
                    "1": 1,
                    "10": 11,
                    "25": 21,
                    "50": 2,
                    "75": 12,
                    "100": 22,
                },
                fixedSkill: { // 固定技能
                    "20": 201
                }
            }
        },
        {
            id: 9,
            name: "时间博士",
            desc: "",
            mainScale: {
                x: -0.5,
                y: 0.5
            },
            listScale: {
                x: -0.65,
                y: 0.65
            },
            listPos:null,
            spine: "animation/general/general_08/general_08",
            atkFrameTime: 1.0,
            iconPic: "ui/txt/SS",
            unlockCondition: {
                type: UnlockManager.UNLOCK_TYPE.ITEM,
                content: {
                    itemId: 1006,
                    itemCount: 3000
                }
            }, // 解锁条件
            skill: {
                initSkill: 106,
                levelSkill: { // 等级技能
                    "1": 1,
                    "10": 11,
                    "25": 21,
                    "50": 2,
                    "75": 12,
                    "100": 22,
                },
                fixedSkill: { // 固定技能
                    "20": 201
                }
            }
        },
        {
            id: 10,
            name: "德鲁伊",
            desc: "",
            mainScale: {
                x: -0.5,
                y: 0.5
            },
            listScale: {
                x: -0.65,
                y: 0.65
            },
            listPos:null,
            spine: "animation/general/general_09/general_09",
            atkFrameTime: 1.0,
            iconPic: "ui/txt/SSS",
            unlockCondition: {
                type: UnlockManager.UNLOCK_TYPE.ITEM,
                content: {
                    itemId: 1006,
                    itemCount: 5000
                }
            }, // 解锁条件
            skill: {
                initSkill: 109,
                levelSkill: { // 等级技能
                    "1": 1,
                    "10": 11,
                    "25": 21,
                    "50": 2,
                    "75": 12,
                    "100": 22,
                },
                fixedSkill: { // 固定技能
                    "20": 201
                }
            }
        },
        {
            id: 11,
            name: "灭世妖狐",
            desc: "",
            mainScale: {
                x: -0.5,
                y: 0.5
            },
            listScale: {
                x: -0.65,
                y: 0.65
            },
            listPos:null,
            spine: "animation/general/general_10/general_10",
            atkFrameTime: 2.0,
            iconPic: "ui/txt/SSS",
            unlockCondition: {
                type: UnlockManager.UNLOCK_TYPE.ITEM,
                content: {
                    itemId: 1006,
                    itemCount: 5000
                }
            }, // 解锁条件
            skill: {
                initSkill: 110,
                levelSkill: { // 等级技能
                    "1": 1,
                    "10": 11,
                    "25": 21,
                    "50": 2,
                    "75": 12,
                    "100": 22,
                },
                fixedSkill: { // 固定技能
                    "20": 201
                }
            }
        },
        {
            id: 12,
            name: "雷霆女皇",
            desc: "",
            mainScale: {
                x: -0.5,
                y: 0.5
            },
            listScale: {
                x: -0.65,
                y: 0.65
            },
            listPos:null,
            spine: "animation/general/general_11/general_11",
            atkFrameTime: 1.0,
            iconPic: "ui/txt/SSS",
            unlockCondition: {
                type: UnlockManager.UNLOCK_TYPE.ITEM,
                content: {
                    itemId: 1006,
                    itemCount: 5000
                }
            }, // 解锁条件
            skill: {
                initSkill: 111,
                levelSkill: { // 等级技能
                    "1": 1,
                    "5": 11,
                    "8": 21,
                    "10": 12,
                    "25": 22,
                    "50": 2,
                    "75": 13,
                    "100": 23,
                },
                fixedSkill: { // 固定技能
                    "20": 201
                }
            }
        },
    ]


    public static CONFIG_MAP = new Map<number, GeneralBasic>();

    /**
     * 加载配置
     */
    public static loadConfigMap() {
        for (let i = 0; i < this.CONFIG.length; i++) {
            let config = this.CONFIG[i];
            this.CONFIG_MAP.set(config.id, config);
        }
    }

    /**
     * 获取配置
     * @param id ID
     */
    public static getConfigById(id: number) {
        return this.CONFIG_MAP.get(id);
    }

    /**
     * 是否还可以升级
     * @param level 当前等级
     */
    public static hasNextLevel(level: number) {
        return level < this.LEVEL_UP_EXP_CONFIG.length;
    }

    /**
     * 获取升级到下一级所需经验
     * @param level 当前等级
     */
    public static getLevelUpExp(level: number) {
        if (level >= this.LEVEL_UP_EXP_CONFIG.length) {
            return -1;
        }

        let nextLevelExp = this.LEVEL_UP_EXP_CONFIG[level];
        return nextLevelExp;
    }
}

/**
 * 配置类
 */
export class GeneralBasic {
    id: number = null; // 唯一标识
    name: string = null; // 名称
    desc: string = null; // 介绍
    mainScale = null; // 主界面的缩放倍数
    listScale = null; // 列表界面的缩放倍数
    listPos = null; // 列表界面的位置
    spine: string = null; // 动画路径
    atkFrameTime: number = null; // 攻击动画帧时长
    iconPic: string = null; // 图标路径
    unlockCondition = null; // 解锁条件
    skill = null; // 技能信息   初始技能(initSkill=角色技能ID) 
}