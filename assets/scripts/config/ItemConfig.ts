// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

/**
 * 物品配置
 */
@ccclass
export default class ItemConfig {

    public static ITEM_CONST = {
        EXP: "1001",
        SKILL_EXP: "1002",
        GOLD : "1003",
        SHOU_JING : "1004",
        VIGOUR: "1005",
        DIAMOND: "1006"
    }

    public static CONFIG = [
        {
            id:1001,
            name:"角色经验",
            desc:"    用于提升角色等级，可通过试炼场和活动获得。",
            srcPath:"ui/item/item_1001",
            backpackShow: true
        },
        {
            id:1002,
            name:"功法经验",
            desc:"    用于提升功法等级，可通过试炼场获得。",
            srcPath:"ui/item/item_1002",
            backpackShow: true
        },
        {
            id:1003,
            name:"金币",
            desc:"    通用货币，用于日常的各种消耗。",
            srcPath:"ui/item/item_1003",
            backpackShow: true
        },
        {
            id:1004,
            name:"兽晶",
            desc:"    用于宠物的各种消耗。",
            srcPath:"ui/item/item_1004",
            backpackShow: true
        },
        {
            id:1005,
            name:"体力",
            desc:"    用于挑战关卡/副本/场景的各种消耗。",
            srcPath:"ui/item/item_1004",
            backpackShow: true
        },
        {
            id:1006,
            name:"钻石",
            desc:"    用于游戏中的特殊消耗，可通过活动获得。",
            srcPath:"ui/item/item_1006",
            backpackShow: true
        }
    ]


    public static CONFIG_MAP = new Map<number,ItemBasic>();

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
     * 获取物品配置
     * @param id 物品ID
     */
    public static getConfigById(id:number) {
        return this.CONFIG_MAP.get(id);
    }
}

/**
 * 玩家物品配置
 */
export class ItemBasic {
    id:number = null; // 物品唯一标识
    name:string = null; // 物品名称
    desc:string = null; // 物品介绍
    srcPath:string = null; // 物品资源路径
    backpackShow:boolean = null; // 是否在背包中展示
}