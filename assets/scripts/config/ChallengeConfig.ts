const { ccclass, property } = cc._decorator;

/**
 * 挑战副本配置
 */
@ccclass
export default class ChallengeConfig {

    /**
     * 挑战功能
     */
    public static CALL_FUNCTION = {
        DIAMOND: 1, // 钻石副本
        GOLD:2, // 金币副本
        GENERAL_EXP: 3 // 角色经验副本
    }

    public static CONFIG = [
        {
            id: 1,
            name: "钻石副本",
            desc: "钻石副本，挑战成功可获得大量钻石！",
            labelPic: "ui/item/item_1006",
            openStatus: true,
            dailyCount: 2,
            adCount:2,
            levelConfig:[
                {
                    level: 1,
                    chapterId: 1000001,
                    reward:{
                        itemId: 1006,
                        itemCount: 500
                    }
                },
                {
                    level: 2,
                    chapterId: 1000002,
                    reward:{
                        itemId: 1006,
                        itemCount: 510
                    }
                },
                {
                    level: 3,
                    chapterId: 1000003,
                    reward:{
                        itemId: 1006,
                        itemCount: 520
                    }
                },
                {
                    level: 4,
                    chapterId: 1000004,
                    reward:{
                        itemId: 1006,
                        itemCount: 530
                    }
                },{
                    level: 5,
                    chapterId: 1000005,
                    reward:{
                        itemId: 1006,
                        itemCount: 540
                    }
                },
                {
                    level: 6,
                    chapterId: 1000006,
                    reward:{
                        itemId: 1006,
                        itemCount: 550
                    }
                },
                {
                    level: 7,
                    chapterId: 1000007,
                    reward:{
                        itemId: 1006,
                        itemCount: 560
                    }
                },
                {
                    level: 8,
                    chapterId: 1000008,
                    reward:{
                        itemId: 1006,
                        itemCount: 570
                    }
                },
                {
                    level: 9,
                    chapterId: 1000009,
                    reward:{
                        itemId: 1006,
                        itemCount: 580
                    }
                },
                {
                    level: 10,
                    chapterId: 1000010,
                    reward:{
                        itemId: 1006,
                        itemCount: 600
                    }
                },
                {
                    level: 11,
                    chapterId: 1000011,
                    reward:{
                        itemId: 1006,
                        itemCount: 610
                    }
                }
            ]
        },
        {
            id: 2,
            name: "金币副本",
            desc: "金币副本，挑战成功可获得大量金币！",
            labelPic: "ui/item/item_1003",
            openStatus: true,
            dailyCount: 2,
            adCount: 2,
            levelConfig:[
                {
                    level: 1,
                    chapterId: 2000001,
                    reward:{
                        itemId: 1003,
                        itemCount: 1000
                    }
                },
                {
                    level: 2,
                    chapterId: 2000002,
                    reward:{
                        itemId: 1003,
                        itemCount: 10000
                    }
                },
                {
                    level: 3,
                    chapterId: 2000003,
                    reward:{
                        itemId: 1003,
                        itemCount: 100000
                    }
                },
                {
                    level: 4,
                    chapterId: 2000004,
                    reward:{
                        itemId: 1003,
                        itemCount: 1000000
                    }
                },{
                    level: 5,
                    chapterId: 2000005,
                    reward:{
                        itemId: 1003,
                        itemCount: 5000000
                    }
                },
                {
                    level: 6,
                    chapterId: 2000006,
                    reward:{
                        itemId: 1003,
                        itemCount: 10000000
                    }
                },
                {
                    level: 7,
                    chapterId: 2000007,
                    reward:{
                        itemId: 1003,
                        itemCount: 50000000
                    }
                },
                {
                    level: 8,
                    chapterId: 2000008,
                    reward:{
                        itemId: 1003,
                        itemCount: 100000000
                    }
                },
                {
                    level: 9,
                    chapterId: 2000009,
                    reward:{
                        itemId: 1003,
                        itemCount: 100000000
                    }
                },
                {
                    level: 10,
                    chapterId: 2000010,
                    reward:{
                        itemId: 1003,
                        itemCount: 1000000000
                    }
                },
                {
                    level: 11,
                    chapterId: 2000011,
                    reward:{
                        itemId: 1003,
                        itemCount: 10000000000
                    }
                }
            ]
        },
        {
            id: 3,
            name: "经验副本",
            desc: "经验副本，挑战成功可获得大量角色经验！",
            labelPic: "ui/item/item_1001",
            openStatus: true,
            dailyCount: 2,
            adCount: 2,
            levelConfig:[
                {
                    level: 1,
                    chapterId: 3000001,
                    reward:{
                        itemId: 1001,
                        itemCount: 10
                    }
                },
                {
                    level: 2,
                    chapterId: 3000002,
                    reward:{
                        itemId: 1001,
                        itemCount: 20
                    }
                },
                {
                    level: 3,
                    chapterId: 3000003,
                    reward:{
                        itemId: 1001,
                        itemCount: 30
                    }
                },
                {
                    level: 4,
                    chapterId: 3000004,
                    reward:{
                        itemId: 1001,
                        itemCount: 40
                    }
                },{
                    level: 5,
                    chapterId: 3000005,
                    reward:{
                        itemId: 1001,
                        itemCount: 50
                    }
                },
                {
                    level: 6,
                    chapterId: 3000006,
                    reward:{
                        itemId: 1001,
                        itemCount: 80
                    }
                },
                {
                    level: 7,
                    chapterId: 3000007,
                    reward:{
                        itemId: 1001,
                        itemCount: 100
                    }
                },
                {
                    level: 8,
                    chapterId: 3000008,
                    reward:{
                        itemId: 1001,
                        itemCount: 150
                    }
                },
                {
                    level: 9,
                    chapterId: 3000009,
                    reward:{
                        itemId: 1001,
                        itemCount: 200
                    }
                },
                {
                    level: 10,
                    chapterId: 3000010,
                    reward:{
                        itemId: 1001,
                        itemCount: 250
                    }
                },
                {
                    level: 11,
                    chapterId: 3000011,
                    reward:{
                        itemId: 1001,
                        itemCount: 300
                    }
                }
            ]
        }
    ]


    public static CONFIG_MAP = new Map<number, ChallengeBasic>();

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
     * 获取副本等级配置
     * @param id 副本ID
     * @param level  副本等级
     */
    public static getLevelConfig(id:number, level:number):ChallengeLevelBasic {
        let config = this.CONFIG_MAP.get(id);
        if(config == null) {
            return null;
        }
        return config.levelConfig[level - 1];
    }

}

/**
 * 副本等级配置
 */
export class ChallengeLevelBasic {
    level:number = null; // 等级
    chapterId: number = null; // 关卡ID
    reward = null; // 奖励
}

/**
 * 挑战副本配置
 */
export class ChallengeBasic {
    id: number = null; // 副本id
    name: string = null; // 名称
    desc: string = null; // 介绍
    labelPic: string = null; // 标签图片
    openStatus: boolean = null; // 是否开放
    dailyCount:number = null; // 每日补充次数
    adCount:number = null; // 广告进入次数
    levelConfig = null; // 等级配置
}