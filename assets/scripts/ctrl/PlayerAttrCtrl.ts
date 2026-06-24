// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import PlayerLevelConfig, { PlayerLevelBasic } from "../config/PlayerLevelConfig";
import PlayerCacheCtrl from "./PlayerCacheCtrl";
import SkillConfig, { SkillBasic, SkillLevelBasic } from "../config/SkillConfig";
import AttrLevelConfig from "../config/AttrLevelConfig";
import GeneralConfig, { GeneralBasic } from "../config/GeneralConfig";
import GeneralSkillConfig, { GeneralSkillBasic } from "../config/GeneralSkillConfig";
import PetConfig from "../config/PetConfig";

const {ccclass, property} = cc._decorator;

/**
 * 玩家管理
 */
@ccclass
export default class PlayerAttrCtrl {

    private static _instance: PlayerAttrCtrl = null;

    public static getInstance() {
        if (!this._instance) {
            this._instance = new PlayerAttrCtrl();
            this._instance._init();
        }
        
        return this._instance;
    }

    public static destroyInstance() {
        if (this._instance) {
            this._instance._destroy();
            delete this._instance;
            this._instance = null;
        }
    }
    
    private _destroy() { }

    private _init() {
        this.calcPlayerAttr();
    }
    
    // 等级名称
    public levelName:string = "未知";

    /**
     * 最终属性
     */
    // 攻击力
    public atk:number = 0;
    
    // 防御
    public def:number = 0;

    // 生命
    public hp:number = 0;

    // 生命恢复
    public hpRestore:number = 0;

    // 暴击率
    public crit:number = 0;

    // 暴击伤害
    public critDamage:number = 0;

    // 移动速度
    public speed:number = 0;

    // 攻击速度
    public atkSpeed:number = 0;

    // 资源加成 ,如 "1003":0.03  金币加成+3% 
    public itemAddRate = {};

    // 总战力
    public totalPower = 0;

    /**基础属性，基础属性为属性等级的属性，其它加成都是以基础属性为基数计算 */
    // 攻击力
    public baseAtk:number = 0;
    
    // 防御
    public baseDef:number = 0;

    // 生命
    public baseHp:number = 0;

    // 生命恢复
    public baseHpRestore:number = 0;

    // 暴击率
    public baseCrit:number = 0;

    // 暴击伤害
    public baseCritDamage:number = 0;

    // 移动速度
    public baseSpeed:number = 0;

    // 攻击速度
    public baseAtkSpeed:number = 0;


    /**
     * 计算玩家属性
     */
    public calcPlayerAttr() {
        // 计算前属性重置
        this.resetAttr();

        // 属性等级加持
        this.calcPlayerAttrLevel();

        // 角色等级技能加持
        this.calcGeneralLevelSkill();

        // 等级加持
        // this.calcPlayerLevelAttr();

        // 技能加持
        this.calcPlayerSkillAttr();

        // 宠物加持
        this.calcPlayerPetAttr();

        // 计算总战力
        this.calcTotalPower();

        cc.log("最终角色的属性,总战力：【%s】,攻击力：%s,防御：%s，生命：%s，生命恢复：%s，攻击速度：%s，移速：%s，暴击率：%s，暴击伤害：%s，资源加成：",
        this.totalPower,this.atk,this.def,this.hp,this.hpRestore,this.atkSpeed,this.speed,this.crit,this.critDamage,this.itemAddRate);
    }

    /**
     * 属性重置
     */
    private resetAttr() {
        this.levelName = "未知";
        this.atk = 0;
        this.def = 0;
        this.hp = 0;
        this.hpRestore = 0;
        this.crit = 0;
        this.critDamage = 0;
        this.speed = 0;
        this.atkSpeed = 0;
        this.itemAddRate = {};
        this.totalPower = 0;
    }

    /**
     * 计算玩家属性等级
     */
    private calcPlayerAttrLevel() {
        this.baseAtk = PlayerCacheCtrl.getInstance().getPlayerAttrLevelInfo(AttrLevelConfig.ATTR_KEY.ATK).attrVal;
        this.baseDef = PlayerCacheCtrl.getInstance().getPlayerAttrLevelInfo(AttrLevelConfig.ATTR_KEY.DEF).attrVal;
        this.baseHp = PlayerCacheCtrl.getInstance().getPlayerAttrLevelInfo(AttrLevelConfig.ATTR_KEY.HP).attrVal;
        this.baseHpRestore = PlayerCacheCtrl.getInstance().getPlayerAttrLevelInfo(AttrLevelConfig.ATTR_KEY.HP_RESTORE).attrVal;
        this.baseAtkSpeed = PlayerCacheCtrl.getInstance().getPlayerAttrLevelInfo(AttrLevelConfig.ATTR_KEY.ATK_SPEED).attrVal;
        this.baseCrit = PlayerCacheCtrl.getInstance().getPlayerAttrLevelInfo(AttrLevelConfig.ATTR_KEY.CRIT).attrVal;
        this.baseCritDamage = PlayerCacheCtrl.getInstance().getPlayerAttrLevelInfo(AttrLevelConfig.ATTR_KEY.CRIT_DAMAGE).attrVal;

        this.atk = this.baseAtk;
        this.def = this.baseDef;
        this.hp = this.baseHp;
        this.hpRestore = this.baseHpRestore;
        this.atkSpeed = this.baseAtkSpeed;
        this.crit = this.baseCrit;
        this.critDamage = this.baseCritDamage;
    }

    /**
     * 计算角色等级技能
     */
    private calcGeneralLevelSkill() {
        cc.log("计算角色等级技能加成.....");
        let atkRateAdd = 0;
        let hpRateAdd = 0;
        let defRateAdd = 0;
        let hpRestoreRateAdd = 0;
        let critRateAdd = 0;
        let critDamageRateAdd = 0;
        let speedRateAdd = 0;
        let atkSpeedRateAdd = 0;
        let itemRateAdd = {};

        // 获取玩家拥有的角色
        let playerGeneral = PlayerCacheCtrl.getInstance().getPlayerGeneral();
        for(const generalIdStr in playerGeneral) {
            let playerGeneralInfo = playerGeneral[generalIdStr];
            let generalId:number = Number(generalIdStr);
            let generalConfig:GeneralBasic = GeneralConfig.getConfigById(generalId);
            if(generalConfig.skill == null || generalConfig.skill.levelSkill == null) {
                continue;
            }

            let levelSkillConfig = generalConfig.skill.levelSkill;
            for(const unlockLevel in levelSkillConfig) {
                let generalSkillId = levelSkillConfig[unlockLevel];
                let generalSkillConfig:GeneralSkillBasic = GeneralSkillConfig.getConfigById(generalSkillId);
                if(generalSkillConfig == null) {
                    continue;
                }

                 // 是否已解锁
                let unlock = playerGeneralInfo.level >= Number(unlockLevel);
                if(!unlock) {
                    continue;
                }

                if(generalSkillConfig.effect == null) {
                    continue;
                }
                let addCount = generalSkillConfig.effect.addCount;
                if(generalSkillConfig.effect.type == GeneralSkillConfig.EFFECT_TYPE_MENU.RES_RATE_ADD) { // 资源百分比加成
                    if(itemRateAdd["" + generalSkillConfig.effect.itemId] == null) {
                        itemRateAdd["" + generalSkillConfig.effect.itemId] = 0;
                    }
                    itemRateAdd["" + generalSkillConfig.effect.itemId] += addCount;
                }else if(generalSkillConfig.effect.type == GeneralSkillConfig.EFFECT_TYPE_MENU.ATTR_RATE_ADD) { // 资源百分比加成
                    switch(generalSkillConfig.effect.attrKey) {
                        case AttrLevelConfig.ATTR_KEY.ATK:
                            atkRateAdd += addCount;
                            break;
                        case AttrLevelConfig.ATTR_KEY.DEF:
                            defRateAdd += addCount;
                            break;
                        case AttrLevelConfig.ATTR_KEY.HP:
                            hpRateAdd += addCount;
                            break;
                        case AttrLevelConfig.ATTR_KEY.HP_RESTORE:
                            hpRestoreRateAdd += addCount;
                            break;
                        case AttrLevelConfig.ATTR_KEY.CRIT:
                            critRateAdd += addCount;
                            break;
                        case AttrLevelConfig.ATTR_KEY.CRIT_DAMAGE:
                            critDamageRateAdd += addCount;
                            break;
                        case AttrLevelConfig.ATTR_KEY.ATK_SPEED:
                            atkSpeedRateAdd += addCount;
                            break;                                                      
                        default:
                            break;
                    }
                }
            }
        }

        cc.log("角色技能属性加成,攻击力：%s,防御：%s，生命：%s，生命恢复：%s，攻击速度：%s，移速：%s，暴击率：%s，暴击伤害：%s，资源加成：",
        atkRateAdd,defRateAdd,hpRateAdd,hpRestoreRateAdd,atkSpeedRateAdd,speedRateAdd,critRateAdd,critDamageRateAdd,itemRateAdd);

        this.calcExtAttrAddd(atkRateAdd,defRateAdd,hpRateAdd,hpRestoreRateAdd,atkSpeedRateAdd,speedRateAdd,critRateAdd,critDamageRateAdd,itemRateAdd);

    }

    /**
     * 统计额外属性加成
     * @param atkRateAdd 攻击力加成 
     * @param defRateAdd 防御加成 
     * @param hpRateAdd  生命加成
     * @param speedRateAdd 速度加成
     * @param hpRestoreRateAdd 生命恢复加成
     * @param atkSpeedRateAdd 攻击速度加成
     * @param critRateAdd 暴击率加成
     * @param critDamageRateAdd 暴击伤害加成
     * @param itemRateAdd 获得资源加成
     */
    private calcExtAttrAddd(atkRateAdd,defRateAdd,hpRateAdd,hpRestoreRateAdd,atkSpeedRateAdd,speedRateAdd,critRateAdd,critDamageRateAdd,itemRateAdd) {
        // 计算到最终属性中
        this.atk += Math.ceil(this.baseAtk * atkRateAdd);
        this.def +=  Math.ceil(this.baseDef * defRateAdd);
        this.hp +=  Math.ceil(this.baseHp * hpRateAdd);
        this.speed +=  Math.ceil(this.baseSpeed * speedRateAdd);

        this.hpRestore += hpRestoreRateAdd
        this.atkSpeed += atkSpeedRateAdd
        this.crit += critRateAdd
        this.critDamage += critDamageRateAdd


        if(itemRateAdd != null) {
            for(const itemId in itemRateAdd) {
                if(this.itemAddRate[itemId] == null) {
                    this.itemAddRate[itemId] = 0;
                }
                this.itemAddRate[itemId] += itemRateAdd[itemId];
            }
        }

    }

    /**
     * 计算总战力
     */
    private calcTotalPower() {
        this.totalPower = this.atk + this.def + this.hp + this.hpRestore;
        this.totalPower *= this.atkSpeed;
        this.totalPower *= this.critDamage;
        this.totalPower *= (1 + (this.crit * 10));
        this.totalPower = Math.ceil(this.totalPower);
    }

    /**
     * 计算玩家技能拥有效果（攻击力）
     */
    private calcPlayerSkillAttr() {
        // 玩家当前拥有的技能列表
        let playerSkillInfoList = PlayerCacheCtrl.getInstance().getPlayerSkillInfo();
        if(playerSkillInfoList == null) {
            return;
        }

        let totalEffect = 0;
        for(const skillIdStr in playerSkillInfoList) {
            let playerSkillInfo = playerSkillInfoList[skillIdStr];
            let currLevel = playerSkillInfo.level;
            // 技能等级配置
            let skillLevelConfig = SkillConfig.getLevelConfig(Number(skillIdStr), currLevel);
            totalEffect += skillLevelConfig.addRate;
        }

        this.calcExtAttrAddd(totalEffect,0,0,0,0,0,0,0,null);
    }

    
    /**
     * 计算玩家宠物拥有效果（攻击力）
     */
     private calcPlayerPetAttr() {
        // 玩家当前拥有的技能列表
        let playerPetInfoList = PlayerCacheCtrl.getInstance().getPlayerPetInfo();
        if(playerPetInfoList == null) {
            return;
        }

        let totalEffect = 0;
        for(const petIdStr in playerPetInfoList) {
            let playerPetInfo = playerPetInfoList[petIdStr];
            let currLevel = playerPetInfo.level;
            // 技能等级配置
            let petLevelConfig = PetConfig.getLevelConfig(Number(petIdStr), currLevel);
            totalEffect += petLevelConfig.addRate;
        }

        this.calcExtAttrAddd(totalEffect,0,0,0,0,0,0,0,null);
    }
}
