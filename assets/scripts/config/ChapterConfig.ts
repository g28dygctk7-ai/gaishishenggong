// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { ItemInfo } from "../entity/ItemInfo";

const { ccclass, property } = cc._decorator;

/**
 * 关卡配置
 */
@ccclass
export default class ChapterConfig {

    /**
     * 广告箱获得 (奖励数量 = itemCount * chapterId)
     */
    public static AD_BOX_CONFIG = {
        itemId: 1006, // 获得物品ID
        itemCount: 10, // 获得数量 (基数)
        intervalTime: 25000, // 间隔时间, 5分钟
        dailyCount: 10, // 每日可领取数量, 如果未领取不计算
    }

    public static CONFIG = [
        {
            id: 1,
            name: "试炼场1-1",
            desc: "",
            monsterBatch: [
                [1, 1],
                [1, 1, 1, 1],
                [1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1001],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 5
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 2
                }
            ]
        },
        {
            id: 2,
            name: "试炼场1-2",
            desc: "",
            monsterBatch: [
                [1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.6,
            boss: [1001],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 6
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 2
                }
            ]
        },
        {
            id: 3,
            name: "试炼场1-3",
            desc: "",
            monsterBatch: [
                [1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.7,
            boss: [1001],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 7
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 3
                }
            ]
        },
        {
            id: 4,
            name: "试炼场1-4",
            desc: "",
            monsterBatch: [
                [1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.8,
            boss: [1001],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 8
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 4
                }
            ]
        },
        {
            id: 5,
            name: "试炼场1-5",
            desc: "",
            monsterBatch: [
                [1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.9,
            boss: [1001],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 9
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 5
                }
            ]
        },
        {
            id: 6,
            name: "试炼场1-6",
            desc: "",
            monsterBatch: [
                [1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.0,
            boss: [1001],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 10
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 6
                }
            ]
        },
        {
            id: 7,
            name: "试炼场1-7",
            desc: "",
            monsterBatch: [
                [1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.2,
            boss: [1001],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 12
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 7
                }
            ]
        },
        {
            id: 8,
            name: "试炼场1-8",
            desc: "",
            monsterBatch: [
                [1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.4,
            boss: [1001],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 15
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 8
                }
            ]
        },
        {
            id: 9,
            name: "试炼场1-9",
            desc: "",
            monsterBatch: [
                [1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.8,
            boss: [1001],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 20
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 9
                }
            ]
        },
        {
            id: 10,
            name: "试炼场1-10",
            desc: "",
            monsterBatch: [
                [1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 3.0,
            boss: [1001],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 25
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 10
                }
            ]
        },


        {
            id: 11,
            name: "试炼场2-1",
            desc: "",
            monsterBatch: [
                [2, 2,],
                [2, 2, 2],
                [2, 2, 2, 2, 2],
                [2, 2, 2, 2, 2, 2]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1002],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 150
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 200
                }
            ]
        },
        {
            id: 12,
            name: "试炼场2-2",
            desc: "",
            monsterBatch: [
                [2, 2, 2, 2],
                [2, 2, 2, 2, 2, 2],
                [2, 2, 2, 2, 2, 2, 2, 2],
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.6,
            boss: [1002],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 160
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 220
                }
            ]
        },
        {
            id: 13,
            name: "试炼场2-3",
            desc: "",
            monsterBatch: [
                [2, 2, 2, 2],
                [2, 2, 2, 2, 2, 2],
                [2, 2, 2, 2, 2, 2, 2, 2],
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.7,
            boss: [1002],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 170
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 230
                }
            ]
        },
        {
            id: 14,
            name: "试炼场2-4",
            desc: "",
            monsterBatch: [
                [2, 2, 2, 2],
                [2, 2, 2, 2, 2, 2],
                [2, 2, 2, 2, 2, 2, 2, 2],
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.8,
            boss: [1002],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 170
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 240
                }
            ]
        },
        {
            id: 15,
            name: "试炼场2-5",
            desc: "",
            monsterBatch: [
                [2, 2, 2, 2],
                [2, 2, 2, 2, 2, 2],
                [2, 2, 2, 2, 2, 2, 2, 2],
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.9,
            boss: [1002],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 180
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 250
                }
            ]
        },
        {
            id: 16,
            name: "试炼场2-6",
            desc: "",
            monsterBatch: [
                [2, 2, 2, 2],
                [2, 2, 2, 2, 2, 2],
                [2, 2, 2, 2, 2, 2, 2, 2],
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.0,
            boss: [1002],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 180
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 260
                }
            ]
        },
        {
            id: 17,
            name: "试炼场2-7",
            desc: "",
            monsterBatch: [
                [2, 2, 2, 2],
                [2, 2, 2, 2, 2, 2],
                [2, 2, 2, 2, 2, 2, 2, 2],
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.2,
            boss: [1002],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 190
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 270
                }
            ]
        },
        {
            id: 18,
            name: "试炼场2-8",
            desc: "",
            monsterBatch: [
                [2, 2, 2, 2],
                [2, 2, 2, 2, 2, 2],
                [2, 2, 2, 2, 2, 2, 2, 2],
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.4,
            boss: [1002],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 190
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 280
                }
            ]
        },
        {
            id: 19,
            name: "试炼场2-9",
            desc: "",
            monsterBatch: [
                [2, 2, 2, 2],
                [2, 2, 2, 2, 2, 2],
                [2, 2, 2, 2, 2, 2, 2, 2],
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.8,
            boss: [1002],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 200
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 290
                }
            ]
        },
        {
            id: 20,
            name: "试炼场2-10",
            desc: "",
            monsterBatch: [
                [2, 2, 2, 2],
                [2, 2, 2, 2, 2, 2],
                [2, 2, 2, 2, 2, 2, 2, 2],
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 3.0,
            boss: [1002],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 200
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 300
                }
            ]
        },


        {
            id: 21,
            name: "试炼场3-1",
            desc: "",
            monsterBatch: [
                [3, 3],
                [3, 3, 3, 3],
                [3, 3, 3, 3, 3],
                [3, 3, 3, 3, 3, 3]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1003],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 500
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 300
                }
            ]
        },
        {
            id: 22,
            name: "试炼场3-2",
            desc: "",
            monsterBatch: [
                [3, 3, 3, 3],
                [3, 3, 3, 3, 3, 3],
                [3, 3, 3, 3, 3, 3, 3, 3],
                [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.6,
            boss: [1003],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 550
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 320
                }
            ]
        },
        {
            id: 23,
            name: "试炼场3-3",
            desc: "",
            monsterBatch: [
                [3, 3, 3, 3],
                [3, 3, 3, 3, 3, 3],
                [3, 3, 3, 3, 3, 3, 3, 3],
                [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.7,
            boss: [1003],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 600
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 330
                }
            ]
        },
        {
            id: 24,
            name: "试炼场3-4",
            desc: "",
            monsterBatch: [
                [3, 3, 3, 3],
                [3, 3, 3, 3, 3, 3],
                [3, 3, 3, 3, 3, 3, 3, 3],
                [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.8,
            boss: [1003],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 650
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 340
                }
            ]
        },
        {
            id: 25,
            name: "试炼场3-5",
            desc: "",
            monsterBatch: [
                [3, 3, 3, 3],
                [3, 3, 3, 3, 3, 3],
                [3, 3, 3, 3, 3, 3, 3, 3],
                [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.9,
            boss: [1003],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 700
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 350
                }
            ]
        },
        {
            id: 26,
            name: "试炼场3-6",
            desc: "",
            monsterBatch: [
                [3, 3, 3, 3],
                [3, 3, 3, 3, 3, 3],
                [3, 3, 3, 3, 3, 3, 3, 3],
                [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.0,
            boss: [1003],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 750
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 360
                }
            ]
        },
        {
            id: 27,
            name: "试炼场3-7",
            desc: "",
            monsterBatch: [
                [3, 3, 3, 3],
                [3, 3, 3, 3, 3, 3],
                [3, 3, 3, 3, 3, 3, 3, 3],
                [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.2,
            boss: [1003],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 800
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 370
                }
            ]
        },
        {
            id: 28,
            name: "试炼场3-8",
            desc: "",
            monsterBatch: [
                [3, 3, 3, 3],
                [3, 3, 3, 3, 3, 3],
                [3, 3, 3, 3, 3, 3, 3, 3],
                [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.4,
            boss: [1003],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 850
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 380
                }
            ]
        },
        {
            id: 29,
            name: "试炼场3-9",
            desc: "",
            monsterBatch: [
                [3, 3, 3, 3],
                [3, 3, 3, 3, 3, 3],
                [3, 3, 3, 3, 3, 3, 3, 3],
                [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.8,
            boss: [1003],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 900
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 390
                }
            ]
        },
        {
            id: 30,
            name: "试炼场3-10",
            desc: "",
            monsterBatch: [
                [3, 3, 3, 3],
                [3, 3, 3, 3, 3, 3],
                [3, 3, 3, 3, 3, 3, 3, 3],
                [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 3.0,
            boss: [1003],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 1000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 400
                }
            ]
        },

        {
            id: 31,
            name: "试炼场4-1",
            desc: "",
            monsterBatch: [
                [4, 4],
                [4, 4, 4, 4],
                [4, 4, 4, 4, 4],
                [4, 4, 4, 4, 4, 4]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1004],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 2000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 400
                }
            ]
        },
        {
            id: 32,
            name: "试炼场4-2",
            desc: "",
            monsterBatch: [
                [4, 4, 4, 4],
                [4, 4, 4, 4, 4, 4],
                [4, 4, 4, 4, 4, 4, 4, 4],
                [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.6,
            boss: [1004],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 2100
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 420
                }
            ]
        },
        {
            id: 33,
            name: "试炼场4-3",
            desc: "",
            monsterBatch: [
                [4, 4, 4, 4],
                [4, 4, 4, 4, 4, 4],
                [4, 4, 4, 4, 4, 4, 4, 4],
                [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.7,
            boss: [1004],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 2200
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 430
                }
            ]
        },
        {
            id: 34,
            name: "试炼场4-4",
            desc: "",
            monsterBatch: [
                [4, 4, 4, 4],
                [4, 4, 4, 4, 4, 4],
                [4, 4, 4, 4, 4, 4, 4, 4],
                [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.8,
            boss: [1004],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 2300
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 440
                }
            ]
        },
        {
            id: 35,
            name: "试炼场4-5",
            desc: "",
            monsterBatch: [
                [4, 4, 4, 4],
                [4, 4, 4, 4, 4, 4],
                [4, 4, 4, 4, 4, 4, 4, 4],
                [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.9,
            boss: [1004],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 2500
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 450
                }
            ]
        },
        {
            id: 36,
            name: "试炼场4-6",
            desc: "",
            monsterBatch: [
                [4, 4, 4, 4],
                [4, 4, 4, 4, 4, 4],
                [4, 4, 4, 4, 4, 4, 4, 4],
                [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.0,
            boss: [1004],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 2600
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 460
                }
            ]
        },
        {
            id: 37,
            name: "试炼场4-7",
            desc: "",
            monsterBatch: [
                [4, 4, 4, 4],
                [4, 4, 4, 4, 4, 4],
                [4, 4, 4, 4, 4, 4, 4, 4],
                [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.2,
            boss: [1004],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 2700
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 470
                }
            ]
        },
        {
            id: 38,
            name: "试炼场4-8",
            desc: "",
            monsterBatch: [
                [4, 4, 4, 4],
                [4, 4, 4, 4, 4, 4],
                [4, 4, 4, 4, 4, 4, 4, 4],
                [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.4,
            boss: [1004],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 2800
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 480
                }
            ]
        },
        {
            id: 39,
            name: "试炼场4-9",
            desc: "",
            monsterBatch: [
                [4, 4, 4, 4],
                [4, 4, 4, 4, 4, 4],
                [4, 4, 4, 4, 4, 4, 4, 4],
                [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.8,
            boss: [1004],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 2900
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 490
                }
            ]
        },
        {
            id: 40,
            name: "试炼场4-10",
            desc: "",
            monsterBatch: [
                [4, 4, 4, 4],
                [4, 4, 4, 4, 4, 4],
                [4, 4, 4, 4, 4, 4, 4, 4],
                [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 3.0,
            boss: [1004],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 3000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 500
                }
            ]
        },

        {
            id: 41,
            name: "试炼场5-1",
            desc: "",
            monsterBatch: [
                [5, 5],
                [5, 5, 5, 5],
                [5, 5, 5, 5, 5],
                [5, 5, 5, 5, 5, 5]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1005],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 5000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 500
                }
            ]
        },
        {
            id: 42,
            name: "试炼场5-2",
            desc: "",
            monsterBatch: [
                [5, 5, 5, 5],
                [5, 5, 5, 5, 5, 5],
                [5, 5, 5, 5, 5, 5, 5, 5],
                [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.6,
            boss: [1005],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 5100
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 520
                }
            ]
        },
        {
            id: 43,
            name: "试炼场5-3",
            desc: "",
            monsterBatch: [
                [5, 5, 5, 5],
                [5, 5, 5, 5, 5, 5],
                [5, 5, 5, 5, 5, 5, 5, 5],
                [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.7,
            boss: [1005],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 5200
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 530
                }
            ]
        },
        {
            id: 44,
            name: "试炼场5-4",
            desc: "",
            monsterBatch: [
                [5, 5, 5, 5],
                [5, 5, 5, 5, 5, 5],
                [5, 5, 5, 5, 5, 5, 5, 5],
                [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.8,
            boss: [1005],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 5300
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 540
                }
            ]
        },
        {
            id: 45,
            name: "试炼场5-5",
            desc: "",
            monsterBatch: [
                [5, 5, 5, 5],
                [5, 5, 5, 5, 5, 5],
                [5, 5, 5, 5, 5, 5, 5, 5],
                [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.9,
            boss: [1005],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 5400
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 550
                }
            ]
        },
        {
            id: 46,
            name: "试炼场5-6",
            desc: "",
            monsterBatch: [
                [5, 5],
                [5, 3, 5],
                [5, 5, 5, 5],
                [5, 5, 5, 5, 5]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.0,
            boss: [1005],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 5500
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 560
                }
            ]
        },
        {
            id: 47,
            name: "试炼场5-7",
            desc: "",
            monsterBatch: [
                [5, 5, 5, 5],
                [5, 5, 5, 5, 5, 5],
                [5, 5, 5, 5, 5, 5, 5, 5],
                [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.2,
            boss: [1005],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 5600
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 570
                }
            ]
        },
        {
            id: 48,
            name: "试炼场5-8",
            desc: "",
            monsterBatch: [
                [5, 5, 5, 5],
                [5, 5, 5, 5, 5, 5],
                [5, 5, 5, 5, 5, 5, 5, 5],
                [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.4,
            boss: [1005],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 5700
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 580
                }
            ]
        },
        {
            id: 49,
            name: "试炼场5-9",
            desc: "",
            monsterBatch: [
                [5, 5, 5, 5],
                [5, 5, 5, 5, 5, 5],
                [5, 5, 5, 5, 5, 5, 5, 5],
                [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.8,
            boss: [1005],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 5800
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 590
                }
            ]
        },
        {
            id: 50,
            name: "试炼场5-10",
            desc: "",
            monsterBatch: [
                [5, 5, 5, 5],
                [5, 5, 5, 5, 5, 5],
                [5, 5, 5, 5, 5, 5, 5, 5],
                [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 3.0,
            boss: [1005],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 6000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 600
                }
            ]
        },

        {
            id: 51,
            name: "试炼场6-1",
            desc: "",
            monsterBatch: [
                [6, 6],
                [6, 6, 6, 6],
                [6, 6, 6, 6, 6],
                [6, 6, 6, 6, 6, 6]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1006],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 7000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 600
                }
            ]
        },
        {
            id: 52,
            name: "试炼场6-2",
            desc: "",
            monsterBatch: [
                [6, 6, 6, 6],
                [6, 6, 6, 6, 6, 6],
                [6, 6, 6, 6, 6, 6, 6, 6],
                [6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.6,
            boss: [1006],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 7000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 620
                }
            ]
        },
        {
            id: 53,
            name: "试炼场6-3",
            desc: "",
            monsterBatch: [
                [6, 6, 6, 6],
                [6, 6, 6, 6, 6, 6],
                [6, 6, 6, 6, 6, 6, 6, 6],
                [6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.7,
            boss: [1006],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 7100
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 630
                }
            ]
        },
        {
            id: 54,
            name: "试炼场6-4",
            desc: "",
            monsterBatch: [
                [6, 6, 6, 6],
                [6, 6, 6, 6, 6, 6],
                [6, 6, 6, 6, 6, 6, 6, 6],
                [6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.8,
            boss: [1006],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 7200
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 640
                }
            ]
        },
        {
            id: 55,
            name: "试炼场6-5",
            desc: "",
            monsterBatch: [
                [6, 6, 6, 6],
                [6, 6, 6, 6, 6, 6],
                [6, 6, 6, 6, 6, 6, 6, 6],
                [6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.9,
            boss: [1006],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 7300
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 650
                }
            ]
        },
        {
            id: 56,
            name: "试炼场6-6",
            desc: "",
            monsterBatch: [
                [6, 6, 6, 6],
                [6, 6, 6, 6, 6, 6],
                [6, 6, 6, 6, 6, 6, 6, 6],
                [6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.0,
            boss: [1006],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 7400
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 660
                }
            ]
        },
        {
            id: 57,
            name: "试炼场6-7",
            desc: "",
            monsterBatch: [
                [6, 6, 6, 6],
                [6, 6, 6, 6, 6, 6],
                [6, 6, 6, 6, 6, 6, 6, 6],
                [6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.2,
            boss: [1006],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 7500
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 670
                }
            ]
        },
        {
            id: 58,
            name: "试炼场6-8",
            desc: "",
            monsterBatch: [
                [6, 6, 6, 6],
                [6, 6, 6, 6, 6, 6],
                [6, 6, 6, 6, 6, 6, 6, 6],
                [6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.4,
            boss: [1006],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 7600
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 680
                }
            ]
        },
        {
            id: 59,
            name: "试炼场6-9",
            desc: "",
            monsterBatch: [
                [6, 6, 6, 6],
                [6, 6, 6, 6, 6, 6],
                [6, 6, 6, 6, 6, 6, 6, 6],
                [6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.8,
            boss: [1006],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 7700
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 690
                }
            ]
        },
        {
            id: 60,
            name: "试炼场6-10",
            desc: "",
            monsterBatch: [
                [6, 6, 6, 6],
                [6, 6, 6, 6, 6, 6],
                [6, 6, 6, 6, 6, 6, 6, 6],
                [6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 3.0,
            boss: [1006],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 7800
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 700
                }
            ]
        },

        {
            id: 61,
            name: "试炼场7-1",
            desc: "",
            monsterBatch: [
                [7, 7],
                [7, 7, 7, 7],
                [7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1007],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 10000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 700
                }
            ]
        },
        {
            id: 62,
            name: "试炼场7-2",
            desc: "",
            monsterBatch: [
                [7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.6,
            boss: [1007],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 11000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 720
                }
            ]
        },
        {
            id: 63,
            name: "试炼场7-3",
            desc: "",
            monsterBatch: [
                [7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.7,
            boss: [1007],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 12000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 730
                }
            ]
        },
        {
            id: 64,
            name: "试炼场7-4",
            desc: "",
            monsterBatch: [
                [7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.8,
            boss: [1007],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 13000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 740
                }
            ]
        },
        {
            id: 65,
            name: "试炼场7-5",
            desc: "",
            monsterBatch: [
                [7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.9,
            boss: [1007],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 14000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 750
                }
            ]
        },
        {
            id: 66,
            name: "试炼场7-6",
            desc: "",
            monsterBatch: [
                [7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.0,
            boss: [1007],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 15000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 760
                }
            ]
        },
        {
            id: 67,
            name: "试炼场7-7",
            desc: "",
            monsterBatch: [
                [7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.2,
            boss: [1007],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 16000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 770
                }
            ]
        },
        {
            id: 68,
            name: "试炼场7-8",
            desc: "",
            monsterBatch: [
                [7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.4,
            boss: [1007],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 17000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 780
                }
            ]
        },
        {
            id: 69,
            name: "试炼场7-9",
            desc: "",
            monsterBatch: [
                [7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.8,
            boss: [1007],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 18000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 790
                }
            ]
        },
        {
            id: 70,
            name: "试炼场7-10",
            desc: "",
            monsterBatch: [
                [7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 3.0,
            boss: [1007],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 20000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 800
                }
            ]
        },

        {
            id: 71,
            name: "试炼场8-1",
            desc: "",
            monsterBatch: [
                [8, 8],
                [8, 8, 8, 8],
                [8, 8, 8, 8, 8],
                [8, 8, 8, 8, 8, 8]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1008],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 41000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 800
                }
            ]
        },
        {
            id: 72,
            name: "试炼场8-2",
            desc: "",
            monsterBatch: [
                [8, 8, 8, 8],
                [8, 8, 8, 8, 8, 8],
                [8, 8, 8, 8, 8, 8, 8, 8],
                [8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.6,
            boss: [1008],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 42000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 820
                }
            ]
        },
        {
            id: 73,
            name: "试炼场8-3",
            desc: "",
            monsterBatch: [
                [8, 8, 8, 8],
                [8, 8, 8, 8, 8, 8],
                [8, 8, 8, 8, 8, 8, 8, 8],
                [8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.7,
            boss: [1008],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 43000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 830
                }
            ]
        },
        {
            id: 74,
            name: "试炼场8-4",
            desc: "",
            monsterBatch: [
                [8, 8, 8, 8],
                [8, 8, 8, 8, 8, 8],
                [8, 8, 8, 8, 8, 8, 8, 8],
                [8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.8,
            boss: [1008],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 44000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 840
                }
            ]
        },
        {
            id: 75,
            name: "试炼场8-5",
            desc: "",
            monsterBatch: [
                [8, 8, 8, 8],
                [8, 8, 8, 8, 8, 8],
                [8, 8, 8, 8, 8, 8, 8, 8],
                [8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.9,
            boss: [1008],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 45000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 850
                }
            ]
        },
        {
            id: 76,
            name: "试炼场8-6",
            desc: "",
            monsterBatch: [
                [8, 8, 8, 8],
                [8, 8, 8, 8, 8, 8],
                [8, 8, 8, 8, 8, 8, 8, 8],
                [8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.0,
            boss: [1008],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 46000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 860
                }
            ]
        },
        {
            id: 77,
            name: "试炼场8-7",
            desc: "",
            monsterBatch: [
                [8, 8, 8, 8],
                [8, 8, 8, 8, 8, 8],
                [8, 8, 8, 8, 8, 8, 8, 8],
                [8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.2,
            boss: [1008],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 47000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 870
                }
            ]
        },
        {
            id: 78,
            name: "试炼场8-8",
            desc: "",
            monsterBatch: [
                [8, 8, 8, 8],
                [8, 8, 8, 8, 8, 8],
                [8, 8, 8, 8, 8, 8, 8, 8],
                [8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.4,
            boss: [1008],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 48000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 880
                }
            ]
        },
        {
            id: 79,
            name: "试炼场8-9",
            desc: "",
            monsterBatch: [
                [8, 8, 8, 8],
                [8, 8, 8, 8, 8, 8],
                [8, 8, 8, 8, 8, 8, 8, 8],
                [8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.8,
            boss: [1008],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 49000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 890
                }
            ]
        },
        {
            id: 80,
            name: "试炼场8-10",
            desc: "",
            monsterBatch: [
                [8, 8, 8, 8],
                [8, 8, 8, 8, 8, 8],
                [8, 8, 8, 8, 8, 8, 8, 8],
                [8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 3.0,
            boss: [1008],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 50000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 900
                }
            ]
        },


        {
            id: 81,
            name: "试炼场9-1",
            desc: "",
            monsterBatch: [
                [9, 9],
                [9, 9, 9, 9],
                [9, 9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1009],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 81000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 900
                }
            ]
        },
        {
            id: 82,
            name: "试炼场9-2",
            desc: "",
            monsterBatch: [
                [9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.6,
            boss: [1009],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 82000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 910
                }
            ]
        },
        {
            id: 83,
            name: "试炼场9-3",
            desc: "",
            monsterBatch: [
                [9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.7,
            boss: [1009],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 83000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 920
                }
            ]
        },
        {
            id: 84,
            name: "试炼场9-4",
            desc: "",
            monsterBatch: [
                [9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.8,
            boss: [1009],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 84000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 930
                }
            ]
        },
        {
            id: 85,
            name: "试炼场9-5",
            desc: "",
            monsterBatch: [
                [9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.9,
            boss: [1009],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 85000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 940
                }
            ]
        },
        {
            id: 86,
            name: "试炼场9-6",
            desc: "",
            monsterBatch: [
                [9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.0,
            boss: [1009],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 86000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 950
                }
            ]
        },
        {
            id: 87,
            name: "试炼场9-7",
            desc: "",
            monsterBatch: [
                [9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.2,
            boss: [1009],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 87000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 970
                }
            ]
        },
        {
            id: 88,
            name: "试炼场9-8",
            desc: "",
            monsterBatch: [
                [9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.4,
            boss: [1009],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 88000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 980
                }
            ]
        },
        {
            id: 89,
            name: "试炼场9-9",
            desc: "",
            monsterBatch: [
                [9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.8,
            boss: [1009],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 89000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 990
                }
            ]
        },
        {
            id: 90,
            name: "试炼场9-10",
            desc: "",
            monsterBatch: [
                [9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 3.0,    
            boss: [1009],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 90000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 1000
                }
            ]
        },


        {
            id: 91,
            name: "试炼场10-1",
            desc: "",
            monsterBatch: [
                [10, 10],
                [10, 10, 10, 10],
                [10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1010],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 120000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 900
                }
            ]
        },
        {
            id: 92,
            name: "试炼场10-2",
            desc: "",
            monsterBatch: [
                [10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.6,
            boss: [1010],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 130000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 910
                }
            ]
        },
        {
            id: 93,
            name: "试炼场10-3",
            desc: "",
            monsterBatch: [
                [10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.7,
            boss: [1010],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 140000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 920
                }
            ]
        },
        {
            id: 94,
            name: "试炼场10-4",
            desc: "",
            monsterBatch: [
                [10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.8,
            boss: [1010],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 150000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 930
                }
            ]
        },
        {
            id: 95,
            name: "试炼场10-5",
            desc: "",
            monsterBatch: [
                [10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.9,
            boss: [1010],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 160000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 940
                }
            ]
        },
        {
            id: 96,
            name: "试炼场10-6",
            desc: "",
            monsterBatch: [
                [10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.0,
            boss: [1010],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 170000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 950
                }
            ]
        },
        {
            id: 97,
            name: "试炼场10-7",
            desc: "",
            monsterBatch: [
                [10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.2,
            boss: [1010],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 180000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 970
                }
            ]
        },
        {
            id: 98,
            name: "试炼场10-8",
            desc: "",
            monsterBatch: [
                [10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.4,
            boss: [1010],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 190000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 980
                }
            ]
        },
        {
            id: 99,
            name: "试炼场10-9",
            desc: "",
            monsterBatch: [
                [10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.8,
            boss: [1010],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 200000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 990
                }
            ]
        },
        {
            id: 100,
            name: "试炼场10-10",
            desc: "",
            monsterBatch: [
                [10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 3.0,    
            boss: [1010],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 200000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 1000
                }
            ]
        },

        {
            id: 101,
            name: "试炼场11-1",
            desc: "",
            monsterBatch: [
                [11, 11],
                [11, 11, 11, 11],
                [11, 11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1011],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 500000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 900
                }
            ]
        },
        {
            id: 102,
            name: "试炼场11-2",
            desc: "",
            monsterBatch: [
                [11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11, 11, 11, 11, 11]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.6,
            boss: [1011],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 550000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 910
                }
            ]
        },
        {
            id: 103,
            name: "试炼场11-3",
            desc: "",
            monsterBatch: [
                [11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11, 11, 11, 11, 11]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.7,
            boss: [1011],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 600000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 920
                }
            ]
        },
        {
            id: 104,
            name: "试炼场11-4",
            desc: "",
            monsterBatch: [
                [11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11, 11, 11, 11, 11]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.8,
            boss: [1011],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 650000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 930
                }
            ]
        },
        {
            id: 105,
            name: "试炼场11-5",
            desc: "",
            monsterBatch: [
                [11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11, 11, 11, 11, 11]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.9,
            boss: [1011],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 700000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 940
                }
            ]
        },
        {
            id: 106,
            name: "试炼场11-6",
            desc: "",
            monsterBatch: [
                [11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11, 11, 11, 11, 11]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.0,
            boss: [1011],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 750000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 950
                }
            ]
        },
        {
            id: 107,
            name: "试炼场11-7",
            desc: "",
            monsterBatch: [
                [11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11, 11, 11, 11, 11]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.2,
            boss: [1011],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 750000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 970
                }
            ]
        },
        {
            id: 108,
            name: "试炼场11-8",
            desc: "",
            monsterBatch: [
                [11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11, 11, 11, 11, 11]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.4,
            boss: [1011],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 800000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 980
                }
            ]
        },
        {
            id: 109,
            name: "试炼场11-9",
            desc: "",
            monsterBatch: [
                [11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11, 11, 11, 11, 11]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 2.8,
            boss: [1011],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 850000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 990
                }
            ]
        },
        {
            id: 110,
            name: "试炼场11-10",
            desc: "",
            monsterBatch: [
                [11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11, 11, 11, 11, 11]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 3.0,    
            boss: [1011],
            reward: [
                {
                    itemId: 1003,
                    itemCount: 1000000
                }
            ],
            minuteReward: [
                {
                    itemId: 1003,
                    itemCount: 1000
                }
            ]
        },











        // 1000001 - 2000000  钻石副本
        
        {
            id: 1000001,
            name: "钻石副本-难度1",
            desc: "",
            monsterBatch: [
                [1001],
                [1001],
                [1001],
                [1001],
                [1001],
                [1001],
                [1001],
                [1001],
                [1001],
                [1001]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1001],
            reward: null,
            minuteReward: null
        },
        {
            id: 1000002,
            name: "钻石副本-难度2",
            desc: "",
            monsterBatch: [
                [1002],
                [1002],
                [1002],
                [1002],
                [1002],
                [1002],
                [1002],
                [1002],
                [1002],
                [1002]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1002],
            reward: null,
            minuteReward: null
        },
        {
            id: 1000003,
            name: "钻石副本-难度3",
            desc: "",
            monsterBatch: [
                [1003],
                [1003],
                [1003],
                [1003],
                [1003],
                [1003],
                [1003],
                [1003],
                [1003],
                [1003]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1003],
            reward: null,
            minuteReward: null
        },
        {
            id: 1000004,
            name: "钻石副本-难度4",
            desc: "",
            monsterBatch: [
                [1004],
                [1004],
                [1004],
                [1004],
                [1004],
                [1004],
                [1004],
                [1004],
                [1004],
                [1004]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1004],
            reward: null,
            minuteReward: null
        },
        {
            id: 1000005,
            name: "钻石副本-难度5",
            desc: "",
            monsterBatch: [
                [1005],
                [1005],
                [1005],
                [1005],
                [1005],
                [1005],
                [1005],
                [1005],
                [1005],
                [1005]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1005],
            reward: null,
            minuteReward: null
        },
        {
            id: 1000006,
            name: "钻石副本-难度6",
            desc: "",
            monsterBatch: [
                [1006],
                [1006],
                [1006],
                [1006],
                [1006],
                [1006],
                [1006],
                [1006],
                [1006],
                [1006]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1006],
            reward: null,
            minuteReward: null
        },
        {
            id: 1000007,
            name: "钻石副本-难度7",
            desc: "",
            monsterBatch: [
                [1007],
                [1007],
                [1007],
                [1007],
                [1007],
                [1007],
                [1007],
                [1007],
                [1007],
                [1007]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1007],
            reward: null,
            minuteReward: null
        },
        {
            id: 1000008,
            name: "钻石副本-难度8",
            desc: "",
            monsterBatch: [
                [1008],
                [1008],
                [1008],
                [1008],
                [1008],
                [1008],
                [1008],
                [1008],
                [1008],
                [1008]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1008],
            reward: null,
            minuteReward: null
        },
        {
            id: 1000009,
            name: "钻石副本-难度9",
            desc: "",
            monsterBatch: [
                [1009],
                [1009],
                [1009],
                [1009],
                [1009],
                [1009],
                [1009],
                [1009],
                [1009],
                [1009]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1009],
            reward: null,
            minuteReward: null
        },
        {
            id: 1000010,
            name: "钻石副本-难度10",
            desc: "",
            monsterBatch: [
                [1010],
                [1010],
                [1010],
                [1010],
                [1010],
                [1010],
                [1010],
                [1010],
                [1010],
                [1010]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1010],
            reward: null,
            minuteReward: null
        },
        {
            id: 1000011,
            name: "钻石副本-难度11",
            desc: "",
            monsterBatch: [
                [1011],
                [1011],
                [1011],
                [1011],
                [1011],
                [1011],
                [1011],
                [1011],
                [1011],
                [1011]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1011],
            reward: null,
            minuteReward: null
        },
       














        // 2000001 - 3000000
        {
            id: 2000001,
            name: "金币副本-难度1",
            desc: "",
            monsterBatch: [
                [1001],
                [1001],
                [1001],
                [1001],
                [1001],
                [1001],
                [1001],
                [1001],
                [1001],
                [1001]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1001],
            reward: null,
            minuteReward: null
        },
        {
            id: 2000002,
            name: "金币副本-难度2",
            desc: "",
            monsterBatch: [
                [1002],
                [1002],
                [1002],
                [1002],
                [1002],
                [1002],
                [1002],
                [1002],
                [1002],
                [1002]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1002],
            reward: null,
            minuteReward: null
        },
        {
            id: 2000003,
            name: "金币副本-难度3",
            desc: "",
            monsterBatch: [
                [1003],
                [1003],
                [1003],
                [1003],
                [1003],
                [1003],
                [1003],
                [1003],
                [1003],
                [1003]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1003],
            reward: null,
            minuteReward: null
        },
        {
            id: 2000004,
            name: "金币副本-难度4",
            desc: "",
            monsterBatch: [
                [1004],
                [1004],
                [1004],
                [1004],
                [1004],
                [1004],
                [1004],
                [1004],
                [1004],
                [1004]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1004],
            reward: null,
            minuteReward: null
        },
        {
            id: 2000005,
            name: "金币副本-难度5",
            desc: "",
            monsterBatch: [
                [1005],
                [1005],
                [1005],
                [1005],
                [1005],
                [1005],
                [1005],
                [1005],
                [1005],
                [1005]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1005],
            reward: null,
            minuteReward: null
        },
        {
            id: 2000006,
            name: "金币副本-难度6",
            desc: "",
            monsterBatch: [
                [1006],
                [1006],
                [1006],
                [1006],
                [1006],
                [1006],
                [1006],
                [1006],
                [1006],
                [1006]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1006],
            reward: null,
            minuteReward: null
        },
        {
            id: 1000007,
            name: "钻石副本-难度7",
            desc: "",
            monsterBatch: [
                [1007],
                [1007],
                [1007],
                [1007],
                [1007],
                [1007],
                [1007],
                [1007],
                [1007],
                [1007]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1007],
            reward: null,
            minuteReward: null
        },
        {
            id: 2000008,
            name: "金币副本-难度8",
            desc: "",
            monsterBatch: [
                [1008],
                [1008],
                [1008],
                [1008],
                [1008],
                [1008],
                [1008],
                [1008],
                [1008],
                [1008]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1008],
            reward: null,
            minuteReward: null
        },
        {
            id: 2000009,
            name: "金币副本-难度9",
            desc: "",
            monsterBatch: [
                [1009],
                [1009],
                [1009],
                [1009],
                [1009],
                [1009],
                [1009],
                [1009],
                [1009],
                [1009]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1009],
            reward: null,
            minuteReward: null
        },
        {
            id: 2000010,
            name: "金币副本-难度10",
            desc: "",
            monsterBatch: [
                [1010],
                [1010],
                [1010],
                [1010],
                [1010],
                [1010],
                [1010],
                [1010],
                [1010],
                [1010]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1010],
            reward: null,
            minuteReward: null
        },
        {
            id: 2000011,
            name: "金币副本-难度11",
            desc: "",
            monsterBatch: [
                [1011],
                [1011],
                [1011],
                [1011],
                [1011],
                [1011],
                [1011],
                [1011],
                [1011],
                [1011]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1011],
            reward: null,
            minuteReward: null
        },



         // 3000001 - 4000000
         {
            id: 3000001,
            name: "经验副本-难度1",
            desc: "",
            monsterBatch: [
                [1001],
                [1001],
                [1001],
                [1001],
                [1001],
                [1001],
                [1001],
                [1001],
                [1001],
                [1001]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1001],
            reward: null,
            minuteReward: null
        },
        {
            id: 3000002,
            name: "经验副本-难度2",
            desc: "",
            monsterBatch: [
                [1002],
                [1002],
                [1002],
                [1002],
                [1002],
                [1002],
                [1002],
                [1002],
                [1002],
                [1002]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1002],
            reward: null,
            minuteReward: null
        },
        {
            id: 3000003,
            name: "经验副本-难度3",
            desc: "",
            monsterBatch: [
                [1003],
                [1003],
                [1003],
                [1003],
                [1003],
                [1003],
                [1003],
                [1003],
                [1003],
                [1003]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1003],
            reward: null,
            minuteReward: null
        },
        {
            id: 3000004,
            name: "经验副本-难度4",
            desc: "",
            monsterBatch: [
                [1004],
                [1004],
                [1004],
                [1004],
                [1004],
                [1004],
                [1004],
                [1004],
                [1004],
                [1004]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1004],
            reward: null,
            minuteReward: null
        },
        {
            id: 3000005,
            name: "经验副本-难度5",
            desc: "",
            monsterBatch: [
                [1005],
                [1005],
                [1005],
                [1005],
                [1005],
                [1005],
                [1005],
                [1005],
                [1005],
                [1005]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1005],
            reward: null,
            minuteReward: null
        },
        {
            id: 3000006,
            name: "经验副本-难度6",
            desc: "",
            monsterBatch: [
                [1006],
                [1006],
                [1006],
                [1006],
                [1006],
                [1006],
                [1006],
                [1006],
                [1006],
                [1006]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1006],
            reward: null,
            minuteReward: null
        },
        {
            id: 3000007,
            name: "经验副本-难度7",
            desc: "",
            monsterBatch: [
                [1007],
                [1007],
                [1007],
                [1007],
                [1007],
                [1007],
                [1007],
                [1007],
                [1007],
                [1007]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1007],
            reward: null,
            minuteReward: null
        },
        {
            id: 3000008,
            name: "经验副本-难度8",
            desc: "",
            monsterBatch: [
                [1008],
                [1008],
                [1008],
                [1008],
                [1008],
                [1008],
                [1008],
                [1008],
                [1008],
                [1008]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1008],
            reward: null,
            minuteReward: null
        },
        {
            id: 3000009,
            name: "经验副本-难度9",
            desc: "",
            monsterBatch: [
                [1009],
                [1009],
                [1009],
                [1009],
                [1009],
                [1009],
                [1009],
                [1009],
                [1009],
                [1009]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1009],
            reward: null,
            minuteReward: null
        },
        {
            id: 3000010,
            name: "经验副本-难度10",
            desc: "",
            monsterBatch: [
                [1010],
                [1010],
                [1010],
                [1010],
                [1010],
                [1010],
                [1010],
                [1010],
                [1010],
                [1010]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1010],
            reward: null,
            minuteReward: null
        },
        {
            id: 3000011,
            name: "经验副本-难度11",
            desc: "",
            monsterBatch: [
                [1011],
                [1011],
                [1011],
                [1011],
                [1011],
                [1011],
                [1011],
                [1011],
                [1011],
                [1011]
            ],
            monsterSpecialAttrAddRate: 1.0,
            monsterBaseAttrAddRate: 1.0,
            boss: [1011],
            reward: null,
            minuteReward: null
        }
    ]


    public static CONFIG_MAP = new Map<number, ChapterBasic>();

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
    public static getConfigById(id: number): ChapterBasic {
        return this.CONFIG_MAP.get(id);
    }

    /**
     * 获取怪物列表
     * @param id 关卡ID
     * @param batch 怪物批次
     */
    public static getMonsterIdListByBatch(id: number, batch: number) {
        return this.CONFIG_MAP.get(id).monsterBatch[batch];
    }

    /**
     * 是否还有下一关卡
     * @param id 关卡ID
     */
    public static hasNextChapter(id: number) {
        return this.CONFIG_MAP.get(id + 1) != null;
    }

    /**
    * 获取广告获得
    * @param chapterId 关卡ID
    */
    public static getAdBoxReward(chapterId: number):ItemInfo {
        let itemInfo:ItemInfo = {
            itemId: this.AD_BOX_CONFIG.itemId,
            itemCount: this.AD_BOX_CONFIG.itemCount * chapterId
        }
        return itemInfo;
    }
}

/**
 * 配置类
 */
export class ChapterBasic {
    id: number = null; // 唯一标识
    name: string = null; // 名称
    desc: string = null; // 介绍
    monsterBatch = null; // 怪物批次
    boss = null; // 怪物ID
    reward = null; // 奖励
    minuteReward = null; // 每分钟挂机奖励 
    monsterBaseAttrAddRate: number = null; // 怪物基础属性提升率  攻击、防御、生命、生命恢复、暴击率、暴击伤害
    monsterSpecialAttrAddRate: number = null; // 怪物特殊属性提升率  移速、攻击速度
}