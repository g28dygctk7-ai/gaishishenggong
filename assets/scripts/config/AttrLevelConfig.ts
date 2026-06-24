import { ItemInfo } from "../entity/ItemInfo";
import ItemConfig from "./ItemConfig";

const { ccclass, property } = cc._decorator;

/**
 * 属性等级配置
 */
@ccclass
export default class AttrLevelConfig {

    /**
     * 属性初始值
     */
    public static ATTR_INIT_VAL = {
        atk: 10,  // 攻击力
        def: 0, // 防御
        hp: 100, // 生命
        hpRestore: 7, // 生命恢复
        atkSpeed: 1.00, // 攻击速度
        crit: 0, // 暴击率
        critDamage: 1.20, // 暴击伤害
    }

    /**
     * 属性基础消耗
     */
    public static ATTR_BASE_COST = {
        atk: 10,  // 攻击力
        def: 0, // 防御
        hp: 7, // 生命
        hpRestore: 7, // 生命恢复
        atkSpeed: 22, // 攻击速度
        crit: 16, // 暴击率
        critDamage: 6, // 暴击伤害
    }

    /**
     * 属性类型
     */
    public static ATTR_KEY = {
        ATK: "atk",  // 攻击力
        DEF: "def", // 防御
        HP: "hp", // 生命
        HP_RESTORE: "hpRestore", // 生命恢复
        ATK_SPEED: "atkSpeed", // 攻击速度
        CRIT: "crit", // 暴击率
        CRIT_DAMAGE: "critDamage", // 暴击伤害
    }

    /**
     * 属性最高等级限制   -1=不限制
     */
    public static ATTR_MAX_LEVEL = {
        atk: -1,  // 攻击力
        def: -1, // 防御
        hp: -1, // 生命
        hpRestore: -1, // 生命恢复
        atkSpeed: 201, // 攻击速度
        crit: 1001, // 暴击率
        critDamage: -1, // 暴击伤害
    }

    public static CONFIG = {
        atk: {
            isShow: true,
            openCondition: null,
            name: "攻击力",
            picPath: "ui/attr/atkIcon",
            initVal: AttrLevelConfig.ATTR_INIT_VAL.atk,
            valIsPct: false,
            maxLevel: AttrLevelConfig.ATTR_MAX_LEVEL.atk
        },
        def: {
            isShow: false,
            openCondition: null,
            name: "防御力",
            picPath: "ui/attr/defIcon",
            initVal: AttrLevelConfig.ATTR_INIT_VAL.def,
            valIsPct: false,
            maxLevel: AttrLevelConfig.ATTR_MAX_LEVEL.def
        },
        hp: {
            isShow: true,
            openCondition: null,
            name: "生命",
            picPath: "ui/attr/hpIcon",
            initVal: AttrLevelConfig.ATTR_INIT_VAL.hp,
            valIsPct: false,
            maxLevel: AttrLevelConfig.ATTR_MAX_LEVEL.hp
        },
        hpRestore: {
            isShow: true,
            openCondition: null,
            name: "生命恢复",
            picPath: "ui/attr/hpRestoreIcon",
            initVal: AttrLevelConfig.ATTR_INIT_VAL.hpRestore,
            valIsPct: false,
            maxLevel: AttrLevelConfig.ATTR_MAX_LEVEL.hpRestore
        },
        atkSpeed: {
            isShow: true,
            openCondition: null,
            name: "攻击速度",
            picPath: "ui/attr/atkSpeedIcon",
            initVal: AttrLevelConfig.ATTR_INIT_VAL.atkSpeed,
            valIsPct: true,
            maxLevel: AttrLevelConfig.ATTR_MAX_LEVEL.atkSpeed
        },
        crit: {
            isShow: true,
            openCondition: null,
            name: "暴击",
            picPath: "ui/attr/critIcon",
            initVal: AttrLevelConfig.ATTR_INIT_VAL.crit,
            valIsPct: true,
            maxLevel: AttrLevelConfig.ATTR_MAX_LEVEL.crit

        },
        critDamage: {
            isShow: true,
            openCondition: null,
            name: "暴击伤害",
            picPath: "ui/attr/critDamageIcon",
            initVal: AttrLevelConfig.ATTR_INIT_VAL.critDamage,
            valIsPct: true,
            maxLevel: AttrLevelConfig.ATTR_MAX_LEVEL.critDamage
        }
    }


    public static CONFIG_MAP = new Map<string, AttrLevelBasic>();

    /**
     * 加载配置
     */
    public static loadConfigMap() {

        for (const attrKey in this.CONFIG) {
            let config = this.CONFIG[attrKey];
            config['attrKey'] = attrKey;
            this.CONFIG_MAP.set(attrKey, config);
        }
    }

    /**
     * 获取配置
     * @param attrKey 属性标识
     */
    public static getConfigById(attrKey: string) {
        return this.CONFIG_MAP.get(attrKey);
    }



    /**
     * 计算属性强化消耗
     * @param attrKey 属性标识
     * @param attrLevel 属性等级
     */
    public static calcAttrLevelUpCost(attrKey: string, attrLevel: number): ItemInfo {
        // todo.. 不同属性计算公式需要区分,下方计算公式为临时处理

        let itemId = Number(ItemConfig.ITEM_CONST.GOLD)
        let itemCount = 0;
        switch (attrKey) {
            case AttrLevelConfig.ATTR_KEY.ATK_SPEED:
                itemCount = AttrLevelConfig.ATTR_BASE_COST[attrKey] * attrLevel * 2;
                break;
            case AttrLevelConfig.ATTR_KEY.CRIT:
                itemCount = AttrLevelConfig.ATTR_BASE_COST[attrKey] * attrLevel * 2;
                break;
            default:
                itemCount = AttrLevelConfig.ATTR_BASE_COST[attrKey] * attrLevel;
                break;
        }
        return { itemId: itemId, itemCount: itemCount };
    }

    /**
    * 计算属性强化提升
    * @param attrKey 属性标识
    * @param attrLevel 属性等级
    */
    public static calcAttrLevelUpAddVal(attrKey: string, attrLevel: number) {
        let addAttrVal = 0;
        switch (attrKey) {
            case AttrLevelConfig.ATTR_KEY.ATK_SPEED:
                addAttrVal = 0.01;
                break;
            case AttrLevelConfig.ATTR_KEY.CRIT:
                addAttrVal = 0.001
                break;
            case AttrLevelConfig.ATTR_KEY.CRIT_DAMAGE:
                addAttrVal = 0.01
                break;
            default:
                addAttrVal = AttrLevelConfig.ATTR_INIT_VAL[attrKey];
                break;
        }

        // todo.. 不同属性计算公式需要区分,下方计算公式为临时处理
        return addAttrVal;
    }

    private static _calcAttrLevelUpAddValByCommon(attrKey: string, attrLevel: number) {

    }
}



/**
 * 配置类
 */
export class AttrLevelBasic {
    attrKey: string = null; // 属性标识
    name: string = null; // 属性名
    isShow: boolean = null; // 是否展示
    openCondition = null; // 开放条件
    initVal: number = null; //初始数值
    valIsPct: boolean = null; // 属性是否为百分比
    picPath: string = null; // 属性图片
    maxLevel: number = null; // 最大等级限制
}