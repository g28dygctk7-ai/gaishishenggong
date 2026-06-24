// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

/**
 * 关卡配置
 */
@ccclass
export default class ActivityConfig {

    /**
     * 幸运转盘转动时间
     */
    public static TURNTABLE_TIME:number = 4;
    /**
     * 幸运转盘基本转动圈数
     */
    public static TURNTABLE_CIRCLE_NUM:number = 6;

    /**
     * 活动类型
     */
    public static ACTIVITY_TYPE = {
        DAILY_SIGN : 1,
        SEVEN_SIGN : 2,
        TURNTABLE : 3,
        ACHIEVE_REWARD : 4,
    }

    /**
     * 活动处理类
     */
    public static ACTIVITY_METHOD = {
        DAILY_SIGN :"dailySign",
        SEVEN_SIGN :"sevenSign",
        TURNTABLE :"turntable",
        ACHIEVE_REWARD :"achieveReward",
    }
    

    public static CONFIG = [
        {
            id:1,
            name:"每日签到",
            desc:"玩家每日签到可以获得金币、经验、道具等丰富的奖励",
            uiPath:"ui/common/common_reward",
            method:"dailySign",
            openStatus:true,
            rewardParam:{
                reward:[
                    {
                        itemId: 1006,
                        itemCount: 10
                    }
                ],
                desc: "奖励为10钻石"
            },
        },
        {
            id:2,
            name:"七日签到",
            desc:"玩家每日签到可以获得金币、经验、道具等丰富的奖励",
            uiPath:"ui/activity/sevenSign/sevenSignIcon",
            method:"sevenSign",
            openStatus:false,
            rewardParam:{
                reward:[
                    {
                        day:1,
                        itemId: 1006,
                        itemCount: 200
                    },
                    {
                        day:2,
                        itemId: 1006,
                        itemCount: 1500
                    },
                    {
                        day:3,
                        itemId: 1006,
                        itemCount: 2000
                    },
                    {
                        day:4,
                        itemId: 1006,
                        itemCount: 3000
                    },
                    {
                        day:5,
                        itemId: 1006,
                        itemCount: 4000
                    },
                    {
                        day:6,
                        itemId: 1006,
                        itemCount: 6666
                    },
                    {
                        day:7,
                        itemId: 1006,
                        itemCount: 8888
                    }
                ],
                desc: "奖励为钻石"
            },
        },
        {
            id:3,
            name:"幸运转盘",
            desc:"幸运转盘可以获得金币、经验、道具等丰富的奖励",
            uiPath:"ui/common/common_reward",
            method:"turntable",
            openStatus:false,
            rewardParam:{
                reward:[
                    {
                        pos:1, // 位置
                        itemId: 1006,
                        itemCount: 100,
                        weight: 50 // 权重,越大容易抽到
                    },
                    {
                        pos:2,
                        itemId: 1006,
                        itemCount: 200,
                        weight: 50
                    },
                    {
                        pos:3,
                        itemId: 1001,
                        itemCount: 10,
                        weight: 20
                    },
                    {
                        pos:4,
                        itemId: 1006,
                        itemCount: 500,
                        weight: 20
                    },
                    {
                        pos:5,
                        itemId: 1006,
                        itemCount: 1000,
                        weight: 20
                    },
                    {
                        pos:6,
                        itemId: 1001,
                        itemCount: 50,
                        weight: 10
                    },
                    {
                        pos:7,
                        itemId: 1006,
                        itemCount: 2000,
                        weight: 5
                    },
                    {
                        pos:8,
                        itemId: 1001,
                        itemCount: 88,
                        weight: 1
                    }
                ],
                intervalTime: 300000, // 间隔5分钟 300000
                turnCount: 3, // 每日可转次数
                desc: "奖励为10钻石"
            },
        },
        {
            id:4,
            name:"成就奖励",
            desc:"玩家每日签到可以获得金币、经验、道具等丰富的奖励",
            uiPath:"ui/common/common_reward",
            method:"achieveReward",
            openStatus:false,
            rewardParam:{
                reward:[
                    {
                        itemId: 1006,
                        itemCount: 10
                    }
                ],
                desc: "奖励为10钻石"
            },
        },
    ]


    public static CONFIG_MAP = new Map<number,ActivityBasic>();

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
export class ActivityBasic {
    id:number = null; // 唯一标识
    name:string = null; // 名称
    desc:string = null; // 介绍
    uiPath:string = null; // ui资源路径
    openStatus:boolean = null; // 开放状态
    method:string = null; // 处理类
    rewardParam = null; // 奖励参数
}