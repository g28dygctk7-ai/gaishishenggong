import AttrLevelConfig from "./AttrLevelConfig";
import ChallengeConfig from "./ChallengeConfig";

const { ccclass, property } = cc._decorator;

/**
 * 任务配置
 */
@ccclass
export default class TaskConfig {

    /**
     * 任务完成条件类型
     */
    public static TASK_CONDITION_TYPE = {
        ATTR_LEVEL: 1, // 属性等级
        CHAPTER_LEVEL: 2, // 关卡等级
        CHALLENGE_LEVEL: 3, // 副本等级
    }

    /**
     * 每日任务完成条件类型
     */
    public static DAILY_TASK_CONDITION_TYPE = {
        GOLD_CHALLENGE: 1, // 金币副本
        DIAMOND_CHALLENGE: 2, // 钻石副本
        CALL: 3, // 召唤
        AD: 4, // 观看广告
        KILL: 5, // 击败敌人
        CHAPTER: 6, // 战斗关卡数
        GENERAL_EXP_CHALLENGE: 7, // 经验副本
    }

    public static DAILY_TASK_CONFIG = [
        {
            id: 1,
            desc: "完成钻石副本",
            isAd: false,
            condition: {
                type: TaskConfig.DAILY_TASK_CONDITION_TYPE.DIAMOND_CHALLENGE,
                count: 1
            },
            reward: {
                itemId: 1006,
                itemCount: 100
            }
        },
        {
            id: 2,
            desc: "完成钻石副本",
            isAd: false,
            condition: {
                type: TaskConfig.DAILY_TASK_CONDITION_TYPE.DIAMOND_CHALLENGE,
                count: 2
            },
            reward: {
                itemId: 1006,
                itemCount: 200
            }
        },
        {
            id: 3,
            isAd: false,
            desc: "完成金币副本",
            condition: {
                type: TaskConfig.DAILY_TASK_CONDITION_TYPE.GOLD_CHALLENGE,
                count: 1
            },
            reward: {
                itemId: 1006,
                itemCount: 100
            }
        },
        {
            id: 4,
            isAd: false,
            desc: "完成金币副本",
            condition: {
                type: TaskConfig.DAILY_TASK_CONDITION_TYPE.GOLD_CHALLENGE,
                count: 2
            },
            reward: {
                itemId: 1006,
                itemCount: 200
            }
        },
        {
            id: 5,
            isAd: false,
            desc: "完成经验副本",
            condition: {
                type: TaskConfig.DAILY_TASK_CONDITION_TYPE.GENERAL_EXP_CHALLENGE,
                count: 1
            },
            reward: {
                itemId: 1006,
                itemCount: 100
            }
        },
        {
            id: 6,
            isAd: false,
            desc: "完成经验副本",
            condition: {
                type: TaskConfig.DAILY_TASK_CONDITION_TYPE.GENERAL_EXP_CHALLENGE,
                count: 2
            },
            reward: {
                itemId: 1006,
                itemCount: 200
            }
        },
        {
            id: 7,
            isAd: false,
            desc: "召唤",
            condition: {
                type: TaskConfig.DAILY_TASK_CONDITION_TYPE.CALL,
                count: 10
            },
            reward: {
                itemId: 1006,
                itemCount: 100
            }
        },
        {
            id: 8,
            isAd: false,
            desc: "召唤",
            condition: {
                type: TaskConfig.DAILY_TASK_CONDITION_TYPE.CALL,
                count: 20
            },
            reward: {
                itemId: 1006,
                itemCount: 200
            }
        },
        {
            id: 9,
            isAd: false,
            desc: "完成关卡",
            condition: {
                type: TaskConfig.DAILY_TASK_CONDITION_TYPE.CHAPTER,
                count: 5
            },
            reward: {
                itemId: 1006,
                itemCount: 100
            }
        },
        {
            id: 10,
            isAd: false,
            desc: "完成关卡",
            condition: {
                type: TaskConfig.DAILY_TASK_CONDITION_TYPE.CHAPTER,
                count: 10
            },
            reward: {
                itemId: 1006,
                itemCount: 200
            }
        },
        {
            id: 11,
            isAd: false,
            desc: "击败敌人",
            condition: {
                type: TaskConfig.DAILY_TASK_CONDITION_TYPE.KILL,
                count: 100
            },
            reward: {
                itemId: 1006,
                itemCount: 100
            }
        },
        {
            id: 12,
            isAd: false,
            desc: "击败敌人",
            condition: {
                type: TaskConfig.DAILY_TASK_CONDITION_TYPE.KILL,
                count: 200
            },
            reward: {
                itemId: 1006,
                itemCount: 200
            }
        },
        
        {
            id: 13,
            isAd: true,
            desc: "击败敌人",
            condition: {
                type: TaskConfig.DAILY_TASK_CONDITION_TYPE.KILL,
                count: 200
            },
            reward: {
                itemId: 1006,
                itemCount: 200
            }
        },
        {
            id: 14,
            isAd: false,
            desc: "击败敌人",
            condition: {
                type: TaskConfig.DAILY_TASK_CONDITION_TYPE.KILL,
                count: 500
            },
            reward: {
                itemId: 1006,
                itemCount: 250
            }
        },
        {
            id: 15,
            isAd: false,
            desc: "击败敌人",
            condition: {
                type: TaskConfig.DAILY_TASK_CONDITION_TYPE.KILL,
                count: 1000
            },
            reward: {
                itemId: 1006,
                itemCount: 500
            }
        },
        {
            id: 16,
            isAd: false,
            desc: "观看广告",
            condition: {
                type: TaskConfig.DAILY_TASK_CONDITION_TYPE.AD,
                count: 1
            },
            reward: {
                itemId: 1006,
                itemCount: 200
            }
        },
        {
            id: 17,
            isAd: false,
            desc: "观看广告",
            condition: {
                type: TaskConfig.DAILY_TASK_CONDITION_TYPE.AD,
                count: 2
            },
            reward: {
                itemId: 1006,
                itemCount: 500
            }
        },
        {
            id: 18,
            isAd: false,
            desc: "观看广告",
            condition: {
                type: TaskConfig.DAILY_TASK_CONDITION_TYPE.AD,
                count: 5
            },
            reward: {
                itemId: 1006,
                itemCount: 1500
            }
        },
        {
            id: 19,
            isAd: false,
            desc: "观看广告",
            condition: {
                type: TaskConfig.DAILY_TASK_CONDITION_TYPE.AD,
                count: 10
            },
            reward: {
                itemId: 1006,
                itemCount: 3000
            }
        }
    ];

    public static CONFIG = [
        {
            id: 1,
            name: "任务1",
            desc: "攻击力强化到2级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.ATK,
                level: 2,
            },
            reward: {
                itemId: 1006,
                itemCount: 10
            }
        },
        {
            id: 2,
            name: "任务2",
            desc: "攻击力强化到5级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.ATK,
                level: 5,
            },
            reward: {
                itemId: 1006,
                itemCount: 20
            }
        },
        {
            id: 3,
            name: "任务3",
            desc: "生命强化到5级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.HP,
                level: 5,
            },
            reward: {
                itemId: 1006,
                itemCount: 20
            }
        },
        {
            id: 4,
            name: "任务4",
            desc: "通过试炼场1-2",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.CHAPTER_LEVEL,
                chapterId: 2,
            },
            reward: {
                itemId: 1006,
                itemCount: 20
            }
        },
        {
            id: 5,
            name: "任务5",
            desc: "生命恢复强化到5级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.HP_RESTORE,
                level: 5,
            },
            reward: {
                itemId: 1006,
                itemCount: 20
            }
        },
        {
            id: 6,
            name: "任务6",
            desc: "暴击强化到5级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.CRIT,
                level: 5,
            },
            reward: {
                itemId: 1006,
                itemCount: 20
            }
        },
        {
            id: 7,
            name: "任务7",
            desc: "暴击伤害强化到5级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.CRIT_DAMAGE,
                level: 5,
            },
            reward: {
                itemId: 1006,
                itemCount: 20
            }
        },
        {
            id: 8,
            name: "任务8",
            desc: "攻击速度强化到5级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.ATK_SPEED,
                level: 5,
            },
            reward: {
                itemId: 1006,
                itemCount: 20
            }
        },
        {
            id: 9,
            name: "任务9",
            desc: "通过试炼场1-3",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.CHAPTER_LEVEL,
                chapterId: 3,
            },
            reward: {
                itemId: 1006,
                itemCount: 25
            }
        },
        {
            id: 10,
            name: "任务10",
            desc: "通过试炼场1-5",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.CHAPTER_LEVEL,
                chapterId: 5,
            },
            reward: {
                itemId: 1006,
                itemCount: 25
            }
        },
        {
            id: 11,
            name: "任务11",
            desc: "通过钻石副本难度1",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.CHALLENGE_LEVEL,
                challengeId: ChallengeConfig.CALL_FUNCTION.DIAMOND,
                level: 1
            },
            reward: {
                itemId: 1006,
                itemCount: 25
            }
        },
        {
            id: 12,
            name: "任务12",
            desc: "通过金币副本难度1",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.CHALLENGE_LEVEL,
                challengeId: ChallengeConfig.CALL_FUNCTION.GOLD,
                level: 1
            },
            reward: {
                itemId: 1006,
                itemCount: 25
            }
        },
        {
            id: 13,
            name: "任务13",
            desc: "攻击力强化到15级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.ATK,
                level: 15,
            },
            reward: {
                itemId: 1006,
                itemCount: 25
            }
        },
        {
            id: 14,
            name: "任务14",
            desc: "生命强化到15级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.HP,
                level: 15,
            },
            reward: {
                itemId: 1006,
                itemCount: 25
            }
        },
        {
            id: 15,
            name: "任务15",
            desc: "攻击力强化到50级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.ATK,
                level: 50,
            },
            reward: {
                itemId: 1006,
                itemCount: 25
            }
        },
        {
            id: 16,
            name: "任务16",
            desc: "通过试炼场1-8",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.CHAPTER_LEVEL,
                chapterId: 8,
            },
            reward: {
                itemId: 1006,
                itemCount: 25
            }
        },
        {
            id: 17,
            name: "任务17",
            desc: "生命恢复强化到15级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.HP_RESTORE,
                level: 15,
            },
            reward: {
                itemId: 1006,
                itemCount: 25
            }
        },
        {
            id: 18,
            name: "任务18",
            desc: "暴击强化到10级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.CRIT,
                level: 10,
            },
            reward: {
                itemId: 1006,
                itemCount: 25
            }
        },
        {
            id: 19,
            name: "任务19",
            desc: "暴击伤害强化到15级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.CRIT_DAMAGE,
                level: 15,
            },
            reward: {
                itemId: 1006,
                itemCount: 25
            }
        },
        {
            id: 20,
            name: "任务20",
            desc: "通过试炼场2-1",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.CHAPTER_LEVEL,
                chapterId: 11,
            },
            reward: {
                itemId: 1006,
                itemCount: 30
            }
        },
        {
            id: 21,
            name: "任务21",
            desc: "攻击力强化到80级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.ATK,
                level: 80,
            },
            reward: {
                itemId: 1006,
                itemCount: 30
            }
        },
        {
            id: 22,
            name: "任务22",
            desc: "生命强化到50级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.HP,
                level: 50,
            },
            reward: {
                itemId: 1006,
                itemCount: 30
            }
        },
        {
            id: 23,
            name: "任务23",
            desc: "通过试炼场2-3",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.CHAPTER_LEVEL,
                chapterId: 13,
            },
            reward: {
                itemId: 1006,
                itemCount: 30
            }
        },
        {
            id: 24,
            name: "任务24",
            desc: "通过试炼场2-5",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.CHAPTER_LEVEL,
                chapterId: 15,
            },
            reward: {
                itemId: 1006,
                itemCount: 35
            }
        },
        {
            id: 25,
            name: "任务25",
            desc: "攻击强化到100级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.ATK,
                level: 100,
            },
            reward: {
                itemId: 1006,
                itemCount: 35
            }
        },
        {
            id: 26,
            name: "任务26",
            desc: "生命强化到80级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.HP,
                level: 80,
            },
            reward: {
                itemId: 1006,
                itemCount: 35
            }
        },
        {
            id: 27,
            name: "任务27",
            desc: "暴击伤害强化到35级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.CRIT_DAMAGE,
                level: 35,
            },
            reward: {
                itemId: 1006,
                itemCount: 35
            }
        },
        {
            id: 28,
            name: "任务28",
            desc: "通过试炼场2-8",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.CHAPTER_LEVEL,
                chapterId: 18,
            },
            reward: {
                itemId: 1006,
                itemCount: 40
            }
        },
        {
            id: 29,
            name: "任务29",
            desc: "通过金币副本难度2",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.CHALLENGE_LEVEL,
                challengeId: ChallengeConfig.CALL_FUNCTION.GOLD,
                level: 2
            },
            reward: {
                itemId: 1006,
                itemCount: 40
            }
        },
        {
            id: 30,
            name: "任务30",
            desc: "通过钻石副本难度2",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.CHALLENGE_LEVEL,
                challengeId: ChallengeConfig.CALL_FUNCTION.DIAMOND,
                level: 2
            },
            reward: {
                itemId: 1006,
                itemCount: 40
            }
        },

        {
            id: 31,
            name: "任务31",
            desc: "攻击力强化到150级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.ATK,
                level: 150,
            },
            reward: {
                itemId: 1006,
                itemCount: 40
            }
        },
        {
            id: 32,
            name: "任务32",
            desc: "生命强化到100级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.HP,
                level: 100,
            },
            reward: {
                itemId: 1006,
                itemCount: 40
            }
        },
        {
            id: 33,
            name: "任务33",
            desc: "通过试炼场2-10",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.CHAPTER_LEVEL,
                chapterId: 20,
            },
            reward: {
                itemId: 1006,
                itemCount: 50
            }
        },
        {
            id: 34,
            name: "任务34",
            desc: "通过试炼场3-3",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.CHAPTER_LEVEL,
                chapterId: 23,
            },
            reward: {
                itemId: 1006,
                itemCount: 50
            }
        },
        {
            id: 35,
            name: "任务35",
            desc: "攻击强化到180级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.ATK,
                level: 180,
            },
            reward: {
                itemId: 1006,
                itemCount: 55
            }
        },
        {
            id: 36,
            name: "任务36",
            desc: "生命强化到120级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.HP,
                level: 120,
            },
            reward: {
                itemId: 1006,
                itemCount: 55
            }
        },
        {
            id: 37,
            name: "任务37",
            desc: "暴击伤害强化到50级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.CRIT_DAMAGE,
                level: 50,
            },
            reward: {
                itemId: 1006,
                itemCount: 55
            }
        },
        {
            id: 38,
            name: "任务38",
            desc: "通过试炼场3-8",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.CHAPTER_LEVEL,
                chapterId: 28,
            },
            reward: {
                itemId: 1006,
                itemCount: 60
            }
        },
        {
            id: 39,
            name: "任务39",
            desc: "通过金币副本难度3",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.CHALLENGE_LEVEL,
                challengeId: ChallengeConfig.CALL_FUNCTION.GOLD,
                level: 3
            },
            reward: {
                itemId: 1006,
                itemCount: 80
            }
        },
        {
            id: 40,
            name: "任务40",
            desc: "通过钻石副本难度3",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.CHALLENGE_LEVEL,
                challengeId: ChallengeConfig.CALL_FUNCTION.DIAMOND,
                level: 3
            },
            reward: {
                itemId: 1006,
                itemCount: 80
            }
        },

        {
            id: 41,
            name: "任务41",
            desc: "攻击力强化到250级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.ATK,
                level: 250,
            },
            reward: {
                itemId: 1006,
                itemCount: 80
            }
        },
        {
            id: 42,
            name: "任务42",
            desc: "生命强化到180级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.HP,
                level: 180,
            },
            reward: {
                itemId: 1006,
                itemCount: 80
            }
        },
        {
            id: 43,
            name: "任务43",
            desc: "通过试炼场3-10",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.CHAPTER_LEVEL,
                chapterId: 30,
            },
            reward: {
                itemId: 1006,
                itemCount: 90
            }
        },
        {
            id: 44,
            name: "任务44",
            desc: "通过试炼场4-3",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.CHAPTER_LEVEL,
                chapterId: 33,
            },
            reward: {
                itemId: 1006,
                itemCount: 95
            }
        },
        {
            id: 45,
            name: "任务45",
            desc: "攻击强化到300级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.ATK,
                level: 300,
            },
            reward: {
                itemId: 1006,
                itemCount: 95
            }
        },
        {
            id: 46,
            name: "任务46",
            desc: "生命强化到200级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.HP,
                level: 200,
            },
            reward: {
                itemId: 1006,
                itemCount: 95
            }
        },
        {
            id: 47,
            name: "任务47",
            desc: "生命恢复强化到到80级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.HP_RESTORE,
                level: 80,
            },
            reward: {
                itemId: 1006,
                itemCount: 95
            }
        },
        {
            id: 48,
            name: "任务48",
            desc: "通过试炼场4-8",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.CHAPTER_LEVEL,
                chapterId: 38,
            },
            reward: {
                itemId: 1006,
                itemCount: 100
            }
        },
        {
            id: 49,
            name: "任务49",
            desc: "通过金币副本难度4",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.CHALLENGE_LEVEL,
                challengeId: ChallengeConfig.CALL_FUNCTION.GOLD,
                level: 4
            },
            reward: {
                itemId: 1006,
                itemCount: 110
            }
        },
        {
            id: 50,
            name: "任务50",
            desc: "通过钻石副本难度4",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.CHALLENGE_LEVEL,
                challengeId: ChallengeConfig.CALL_FUNCTION.DIAMOND,
                level: 4
            },
            reward: {
                itemId: 1006,
                itemCount: 110
            }
        }

        ,
        {
            id: 51,
            name: "任务51",
            desc: "攻击力强化到650级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.ATK,
                level: 650,
            },
            reward: {
                itemId: 1006,
                itemCount: 150
            }
        },
        {
            id: 52,
            name: "任务52",
            desc: "生命强化到300级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.HP,
                level: 300,
            },
            reward: {
                itemId: 1006,
                itemCount: 150
            }
        },
        {
            id: 53,
            name: "任务53",
            desc: "通过试炼场4-10",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.CHAPTER_LEVEL,
                chapterId: 40,
            },
            reward: {
                itemId: 1006,
                itemCount: 150
            }
        },
        {
            id: 54,
            name: "任务54",
            desc: "通过试炼场5-3",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.CHAPTER_LEVEL,
                chapterId: 43,
            },
            reward: {
                itemId: 1006,
                itemCount: 150
            }
        },
        {
            id: 55,
            name: "任务55",
            desc: "攻击强化到800级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.ATK,
                level: 800,
            },
            reward: {
                itemId: 1006,
                itemCount: 200
            }
        },
        {
            id: 56,
            name: "任务56",
            desc: "生命强化到500级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.HP,
                level: 500,
            },
            reward: {
                itemId: 1006,
                itemCount: 200
            }
        },
        {
            id: 57,
            name: "任务57",
            desc: "生命恢复强化到到200级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.HP_RESTORE,
                level: 200,
            },
            reward: {
                itemId: 1006,
                itemCount: 200
            }
        },
        {
            id: 58,
            name: "任务58",
            desc: "通过试炼场5-8",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.CHAPTER_LEVEL,
                chapterId: 48,
            },
            reward: {
                itemId: 1006,
                itemCount: 200
            }
        },
        {
            id: 59,
            name: "任务59",
            desc: "通过金币副本难度5",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.CHALLENGE_LEVEL,
                challengeId: ChallengeConfig.CALL_FUNCTION.GOLD,
                level: 5
            },
            reward: {
                itemId: 1006,
                itemCount: 200
            }
        },
        {
            id: 60,
            name: "任务60",
            desc: "通过钻石副本难度5",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.CHALLENGE_LEVEL,
                challengeId: ChallengeConfig.CALL_FUNCTION.DIAMOND,
                level: 5
            },
            reward: {
                itemId: 1006,
                itemCount: 200
            }
        }

        ,
        {
            id: 61,
            name: "任务61",
            desc: "攻击力强化到1100级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.ATK,
                level: 1100,
            },
            reward: {
                itemId: 1006,
                itemCount: 300
            }
        },
        {
            id: 62,
            name: "任务62",
            desc: "生命强化到800级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.HP,
                level: 800,
            },
            reward: {
                itemId: 1006,
                itemCount: 300
            }
        },
        {
            id: 63,
            name: "任务63",
            desc: "通过试炼场5-10",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.CHAPTER_LEVEL,
                chapterId: 50,
            },
            reward: {
                itemId: 1006,
                itemCount: 300
            }
        },
        {
            id: 64,
            name: "任务64",
            desc: "通过试炼场6-3",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.CHAPTER_LEVEL,
                chapterId: 53,
            },
            reward: {
                itemId: 1006,
                itemCount: 300
            }
        },
        {
            id: 65,
            name: "任务65",
            desc: "攻击强化到1300级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.ATK,
                level: 1300,
            },
            reward: {
                itemId: 1006,
                itemCount: 300
            }
        },
        {
            id: 66,
            name: "任务66",
            desc: "生命强化到1000级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.HP,
                level: 1000,
            },
            reward: {
                itemId: 1006,
                itemCount: 300
            }
        },
        {
            id: 67,
            name: "任务67",
            desc: "生命恢复强化到到500级",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.ATTR_LEVEL,
                attrKey: AttrLevelConfig.ATTR_KEY.HP_RESTORE,
                level: 500,
            },
            reward: {
                itemId: 1006,
                itemCount: 300
            }
        },
        {
            id: 68,
            name: "任务68",
            desc: "通过试炼场6-8",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.CHAPTER_LEVEL,
                chapterId: 58,
            },
            reward: {
                itemId: 1006,
                itemCount: 300
            }
        },
        {
            id: 69,
            name: "任务69",
            desc: "通过金币副本难度6",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.CHALLENGE_LEVEL,
                challengeId: ChallengeConfig.CALL_FUNCTION.GOLD,
                level: 6
            },
            reward: {
                itemId: 1006,
                itemCount: 300
            }
        },
        {
            id: 70,
            name: "任务70",
            desc: "通过钻石副本难度6",
            condition: {
                type: TaskConfig.TASK_CONDITION_TYPE.CHALLENGE_LEVEL,
                challengeId: ChallengeConfig.CALL_FUNCTION.DIAMOND,
                level: 6
            },
            reward: {
                itemId: 1006,
                itemCount: 300
            }
        }
    ]


    public static CONFIG_MAP = new Map<number, TaskBasic>();

    public static DAILY_TASK_CONFIG_MAP = new Map<number, DailyTaskBasic>();

    /**
     * 加载配置
     */
    public static loadConfigMap() {
        for (let i = 0; i < this.CONFIG.length; i++) {
            let config = this.CONFIG[i];
            this.CONFIG_MAP.set(config.id, config);
        }
        this.loadDailyTaskConfigMap();
    }


    /**
     * 加载每日任务配置
     */
    public static loadDailyTaskConfigMap() {
        for (let i = 0; i < this.DAILY_TASK_CONFIG.length; i++) {
            let config = this.DAILY_TASK_CONFIG[i];
            this.DAILY_TASK_CONFIG_MAP.set(config.id, config);
        }
    }

    /**
     * 获取配置
     * @param id 任务ID
     */
    public static getConfigById(id: number) {
        return this.CONFIG_MAP.get(id);
    }

    /**
     * 获取每日任务配置
     * @param id 每日任务ID
     */
    public static getDailyTaskConfigById(id: number) {
        return this.DAILY_TASK_CONFIG_MAP.get(id);
    }

    /**
     * 是否有下一个任务
     * @param id 任务ID
     */
    public static hastNextTask(id: number) {
        return (id + 1) < this.CONFIG.length;
    }

}

/**
 * 每日任务配置类
 */
export class DailyTaskBasic {
    id: number = null; // ID
    isAd: boolean = null; // 是否广告领取
    desc: string = null; // 任务描述
    condition = null; // 完成条件
    reward = null; // 奖励
}


/**
 * 配置类
 */
export class TaskBasic {
    id: number = null; // ID
    name: string = null; // 任务名称
    desc: string = null; // 任务描述
    condition = null; // 完成条件
    reward = null; // 奖励
}