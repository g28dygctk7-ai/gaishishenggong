// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { ItemInfo } from "../entity/ItemInfo";

const {ccclass, property} = cc._decorator;

/**
 * 挑战关卡配置
 */
@ccclass
export default class FightConfig {

    public static CONFIG = [
        {
            id:1,
            name:"小兔精",
            desc:"小兔精萌萌哒，没什么杀伤力",
            bossId:1,
            reward:[
                {
                    itemId: 1002,
                    itemCount: 500
                },
                {
                    itemId: 1003,
                    itemCount: 500
                }
            ],
            mapPic:"ui/fight/map/fight_map_1",
            cost: {
                itemId: 1003,
                itemCount: 10
            },
            srcPath:"",
            level:"炼气期初期"
        },
        {
            id:2,
            name:"黑岩猪",
            desc:"黑岩猪具有高额生命力",
            bossId:2,
            reward:[
                {
                    itemId: 1002,
                    itemCount: 1000
                },
                {
                    itemId: 1003,
                    itemCount: 1000
                }
            ],
            mapPic:"ui/fight/map/fight_map_1",
            cost: {
                itemId: 1003,
                itemCount: 100
            },
            srcPath:"",
            level:"炼气期中期"
        },
        {
            id:3,
            name:"暗影猫妖",
            desc:"暗影猫妖具有高额攻击力",
            bossId:3,
            reward:[
                {
                    itemId: 1002,
                    itemCount: 5000
                },
                {
                    itemId: 1003,
                    itemCount: 5000
                }
            ],
            mapPic:"ui/fight/map/fight_map_1",
            cost: {
                itemId: 1003,
                itemCount: 1000
            },
            srcPath:"",
            level:"炼气期后期"
        },
        {
            id:4,
            name:"嗜血蝙蝠",
            desc:"嗜血蝙蝠拥有极高的攻击力",
            bossId:4,
            reward:[
                {
                    itemId: 1002,
                    itemCount: 10000
                },
                {
                    itemId: 1003,
                    itemCount: 10000
                }
            ],
            mapPic:"ui/fight/map/fight_map_1",
            cost: {
                itemId: 1003,
                itemCount: 2000
            },
            srcPath:"",
            level:"炼气期圆满"
        },
        {
            id:5,
            name:"银月妖狼",
            desc:"银月妖狼的利爪具备高额攻击力",
            bossId:5,
            reward:[
                {
                    itemId: 1002,
                    itemCount: 20000
                },
                {
                    itemId: 1003,
                    itemCount: 20000
                }
            ],
            mapPic:"ui/fight/map/fight_map_1",
            cost: {
                itemId: 1003,
                itemCount: 4000
            },
            srcPath:"",
            level:"筑基期初期"
        },
    ]


    public static CONFIG_MAP = new Map<number,FightBasic>();

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
    
    /**
     * 获取进入挑战关卡需要消耗的物品
     * @param id 挑战关卡ID
     */
     public static getJoinCostById(id:number) {
        return this.CONFIG_MAP.get(id).cost;
    }

}

/**
 * 配置类
 */
export class FightBasic {
    id:number = null; // 唯一标识
    name:string = null; // 名称
    desc:string = null; // 介绍
    bossId:number = null; // bossID
    reward = null; // 奖励
    mapPic:string = null; // 场景资源路径
    cost:ItemInfo = null; // 物品信息
    srcPath:string = null; // 图片资源路径
    level:string = null; // 挑战关卡等级
}