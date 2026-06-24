// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import CacheUtil from "../utils/CacheUtil";
import CacheKey from "../config/CacheKey";
import CommonConfig from "../config/CommonConfig";
import GlobalConfig from "../config/GlobalConfig";
import ItemConfig from "../config/ItemConfig";
import PlayerLevelConfig, { PlayerLevelBasic } from "../config/PlayerLevelConfig";
import AttrLevelConfig, { AttrLevelBasic } from "../config/AttrLevelConfig";
import { ItemInfo } from "../entity/ItemInfo";
import GeneralConfig, { GeneralBasic } from "../config/GeneralConfig";
import UnlockManager from "../manager/UnlockManager";
import PlayerAttrCtrl from "./PlayerAttrCtrl";
import SkillConfig from "../config/SkillConfig";
import PetConfig from "../config/PetConfig";
import CallConfig, { CallBasic } from "../config/CallConfig";
import ChallengeConfig, { ChallengeBasic } from "../config/ChallengeConfig";
import DateUtil from "../utils/DateUtil";
import TaskConfig from "../config/TaskConfig";
import TipCtrl from "./TipCtrl";

const { ccclass, property } = cc._decorator;

/**
 * 玩家缓存管理
 */
@ccclass
export default class PlayerCacheCtrl {

    private static _instance: PlayerCacheCtrl = null;

    public static getInstance() {
        if (!this._instance) {
            this._instance = new PlayerCacheCtrl();
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

    public createTime: number = null;

    public guide: number = null;

    public playerChatperInfo = null;

    public passFight: number = null;

    public sysSetting = null;

    public playerExp: number = 0;

    public playerLevel: number = 0;

    public lastGainExpTime: number = 0;

    public lastGainVigourTime: number = 0;

    public playerLevelUpFailedTime: number = 0;

    public playerItem = null;

    public playerGeneralInfo = null;

    public playerSkillInfo = null;

    public playerPetInfo = null;

    public playerSkillEquipInfo = null;

    public playerPetEquipInfo = null;

    public dailyRewardInfo = null;

    public attainmentRewardInfo = null;

    public killCount: number = 0;

    public aliveTime: number = 0;

    public activityInfo = null;

    public attrLevelInfo = null;

    public autoSkill: boolean = null;

    public playerCallInfo = null;

    public playerAdBoxInfo = null;

    public playerChallengeInfo = null;

    public playerTaskInfo = null;

    public playerDailyTaskInfo = null;

    public playerDailyInfo = null;

    public playerSettingInfo = null;

    public playerCdkInfo = null;

    private _init() {
        // 创建时间
        let createTime: number = CacheUtil.getInstance().getNumber(CacheKey.CREATE_TIME);
        cc.log("创建时间：", createTime);
        if (createTime == 0) {
            createTime = new Date().getTime();
            CacheUtil.getInstance().set(CacheKey.CREATE_TIME, createTime);
        }else if(createTime <= GlobalConfig.CLEAR_BEFORE_TIME){
            this.clearCache(); 
            createTime = new Date().getTime();
            CacheUtil.getInstance().set(CacheKey.CREATE_TIME, createTime);
        }

        // 新手引导步骤
        let guide: number = CacheUtil.getInstance().getNumber(CacheKey.GUIDE);
        cc.log("新手引导步骤：", guide);
        if (guide == 0) {
            guide = 0;
            CacheUtil.getInstance().set(CacheKey.GUIDE, guide);
        }

        // 系统设置
        let sysSetting = CacheUtil.getInstance().getObject(CacheKey.SYS_SETTING);
        cc.log("系统设置：", sysSetting);
        if (sysSetting == null) {
            sysSetting = {
                audioStatus: true,
                audioVolume: 0.5,
                damageTextStatus: true
            };
            CacheUtil.getInstance().set(CacheKey.SYS_SETTING, JSON.stringify(sysSetting));
        }

        // 玩家关卡信息
        let playerChatperInfo = CacheUtil.getInstance().getObject(CacheKey.PLAYER_CHAPTER_INFO);
        cc.log("玩家关卡信息", playerChatperInfo);
        if (playerChatperInfo == null) {
            playerChatperInfo = {
                chapterId: 1,  // 关卡ID
                batch: 0 // 关卡怪物批次
            }
            CacheUtil.getInstance().set(CacheKey.PLAYER_CHAPTER_INFO, JSON.stringify(playerChatperInfo));
        }

        // 通关的挑战关卡
        let passFight: number = CacheUtil.getInstance().getNumber(CacheKey.PASS_FIGHT);
        cc.log("通关的挑战关卡", passFight);
        if (passFight == 0) {
            passFight = 0;
            CacheUtil.getInstance().set(CacheKey.PASS_FIGHT, passFight);
        }

        // 阶级
        let playerLevel: number = CacheUtil.getInstance().getNumber(CacheKey.PLAYER_LEVEL);
        cc.log("阶级：", playerLevel);
        if (playerLevel == null) {
            playerLevel = 0;
            CacheUtil.getInstance().set(CacheKey.PLAYER_LEVEL, playerLevel);
        }

        // 玩家经验
        let playerExp: number = CacheUtil.getInstance().getNumber(CacheKey.PLAYER_EXP);
        cc.log("玩家经验：", playerExp);
        if (playerExp == null) {
            playerExp = 0;
            CacheUtil.getInstance().set(CacheKey.PLAYER_EXP, playerExp);
        }

        // 上次获取经验时间(每分钟)
        let lastGainExpTime: number = CacheUtil.getInstance().getNumber(CacheKey.PLAYER_LAST_GAIN_EXP_TIME);
        cc.log("玩家上次获取每分钟经验时间：", lastGainExpTime);
        if (lastGainExpTime == null) {
            lastGainExpTime = 0;
            CacheUtil.getInstance().set(CacheKey.PLAYER_LAST_GAIN_EXP_TIME, lastGainExpTime);
        }

        // 上次获取体力时间
        let lastGainVigourTime: number = CacheUtil.getInstance().getNumber(CacheKey.PLAYER_LAST_GAIN_VIGOUR_TIME);
        cc.log("玩家上次获取体力时间：", lastGainVigourTime);
        if (lastGainVigourTime == null) {
            lastGainVigourTime = 0;
            CacheUtil.getInstance().set(CacheKey.PLAYER_LAST_GAIN_VIGOUR_TIME, lastGainVigourTime);
        }

        // 玩家突破失败时间
        let playerLevelUpFailedTime: number = CacheUtil.getInstance().getNumber(CacheKey.PLAYER_LEVEL_UP_FAILED_TIME);
        cc.log("玩家突破失败时间：", playerLevelUpFailedTime);
        if (playerLevelUpFailedTime == null) {
            playerLevelUpFailedTime = 0;
            CacheUtil.getInstance().set(CacheKey.PLAYER_LEVEL_UP_FAILED_TIME, playerLevelUpFailedTime);
        }

        // 玩家物品
        let playerItem = CacheUtil.getInstance().getObject(CacheKey.PLAYER_ITEM);
        cc.log("玩家物品信息", playerItem);
        if (playerItem == null) {
            playerItem = {};
            CacheUtil.getInstance().set(CacheKey.PLAYER_ITEM, JSON.stringify(playerItem));
        }

        // 玩家活动信息
        let activityInfo = CacheUtil.getInstance().getObject(CacheKey.PLAYER_ACTIVITY_INFO);
        cc.log("玩家活动信息", activityInfo);
        if (activityInfo == null) {
            activityInfo = {};
            CacheUtil.getInstance().set(CacheKey.PLAYER_ACTIVITY_INFO, JSON.stringify(activityInfo));
        }


        // 玩家技能
        let playerSkillInfo = CacheUtil.getInstance().getObject(CacheKey.PLAYER_SKILL);
        cc.log("玩家技能信息", playerSkillInfo);
        if (playerSkillInfo == null) {
            playerSkillInfo = {};
            CacheUtil.getInstance().set(CacheKey.PLAYER_SKILL, JSON.stringify(playerSkillInfo));
        }

        // 玩家技能装备信息
        let playerSkillEquipInfo = CacheUtil.getInstance().getObject(CacheKey.PLAYER_SKILL_EQUIP);
        cc.log("玩家技能装备信息", playerSkillEquipInfo);
        if (playerSkillEquipInfo == null) {
            playerSkillEquipInfo = this.initPlayerSkillEquipInfo();
            CacheUtil.getInstance().set(CacheKey.PLAYER_SKILL_EQUIP, JSON.stringify(playerSkillEquipInfo));
        }

        // 玩家伙伴
        let playerPetInfo = CacheUtil.getInstance().getObject(CacheKey.PLAYER_PET);
        cc.log("玩家伙伴信息", playerPetInfo);
        if (playerPetInfo == null) {
            playerPetInfo = {};
            CacheUtil.getInstance().set(CacheKey.PLAYER_PET, JSON.stringify(playerPetInfo));
        }

        // 玩家伙伴装备信息
        let playerPetEquipInfo = CacheUtil.getInstance().getObject(CacheKey.PLAYER_PET_EQUIP);
        cc.log("玩家伙伴装备信息", playerPetEquipInfo);
        if (playerPetEquipInfo == null) {
            playerPetEquipInfo = this.initPlayerPetEquipInfo();
            CacheUtil.getInstance().set(CacheKey.PLAYER_PET_EQUIP, JSON.stringify(playerPetEquipInfo));
        }

        // 玩家每日奖励领取信息
        let dailyRewardInfo = CacheUtil.getInstance().getObject(CacheKey.DAILY_REWARD_INFO);
        cc.log("玩家每日奖励领取信息", dailyRewardInfo);
        if (dailyRewardInfo == null) {
            dailyRewardInfo = {
                rewardTime: 0,
                rewardCount: 0
            };
            CacheUtil.getInstance().set(CacheKey.DAILY_REWARD_INFO, JSON.stringify(dailyRewardInfo));
        }

        // 玩家成就奖励领取信息
        let attainmentRewardInfo = CacheUtil.getInstance().getObject(CacheKey.ATTAINMENT_REWARD_INFO);
        cc.log("玩家成就奖励领取信息", attainmentRewardInfo);
        if (attainmentRewardInfo == null) {
            attainmentRewardInfo = {};
            CacheUtil.getInstance().set(CacheKey.ATTAINMENT_REWARD_INFO, JSON.stringify(attainmentRewardInfo));
        }

        // 总击杀数量
        let killCount: number = CacheUtil.getInstance().getNumber(CacheKey.KILL_COUNT);
        cc.log("总击杀数量：", killCount);
        if (killCount == null) {
            killCount = 0;
            CacheUtil.getInstance().set(CacheKey.KILL_COUNT, killCount);
        }

        // 总存活时间
        let aliveTime: number = CacheUtil.getInstance().getNumber(CacheKey.ALIVE_TIME);
        cc.log("总存活时间：", aliveTime);
        if (aliveTime == null) {
            aliveTime = 0;
            CacheUtil.getInstance().set(CacheKey.ALIVE_TIME, aliveTime);
        }

        // 玩家属性等级信息
        let attrLevelInfo = CacheUtil.getInstance().getObject(CacheKey.PLAYER_ATTR_LEVEL_INFO);
        cc.log("玩家属性等级信息", attrLevelInfo);
        if (attrLevelInfo == null) {
            attrLevelInfo = this.initPlayerAttrLevelInfo();
            CacheUtil.getInstance().set(CacheKey.PLAYER_ATTR_LEVEL_INFO, JSON.stringify(attrLevelInfo));
        }

        // 玩家角色信息
        let generalInfo = CacheUtil.getInstance().getObject(CacheKey.PLAYER_GENERAL);
        cc.log("玩家角色信息", generalInfo);
        if (generalInfo == null) {
            generalInfo = this.initPlayerGeneralInfo();
            CacheUtil.getInstance().set(CacheKey.PLAYER_GENERAL, JSON.stringify(generalInfo));
        }


        // 玩家是否自动释放技能
        let autoSkill = CacheUtil.getInstance().getObject(CacheKey.AUTO_SKILL);
        cc.log("玩家是否自动释放技能", autoSkill);
        if (autoSkill == null) {
            autoSkill = true;
            CacheUtil.getInstance().set(CacheKey.AUTO_SKILL, autoSkill);
        }


        // 玩家召唤信息
        let playerCallInfo = CacheUtil.getInstance().getObject(CacheKey.PLAYER_CALL_INFO);
        cc.log("玩家召唤信息", playerCallInfo);
        if (playerCallInfo == null) {
            playerCallInfo = this.initPlayerCallInfo();
            CacheUtil.getInstance().set(CacheKey.PLAYER_CALL_INFO, JSON.stringify(playerCallInfo));
        }

        // 玩家广告箱信息
        let playerAdBoxInfo = CacheUtil.getInstance().getObject(CacheKey.PLAYER_AD_BOX);
        cc.log("玩家广告箱信息", playerAdBoxInfo);
        if (playerAdBoxInfo == null) {
            playerAdBoxInfo = {
                lastShowTime: 0,
                lastReceiveTime: 0,
                receiveCount:0 
            }
            CacheUtil.getInstance().set(CacheKey.PLAYER_AD_BOX, JSON.stringify(playerAdBoxInfo));
        }

        // 玩家副本信息
        this.playerChallengeInfo = CacheUtil.getInstance().getObject(CacheKey.PLAYER_CHALLENGE_INFO);
        this.initPlayerChallengeInfo(); // 直接进行初始化检查，补全新副本功能

        // 玩家任务信息
        let playerTaskInfo = CacheUtil.getInstance().getObject(CacheKey.PLAYER_TASK_INFO);
        cc.log("玩家任务信息", playerTaskInfo);
        if (playerTaskInfo == null) {
            playerTaskInfo = {
                taskId: 1, // 任务ID
            }
            CacheUtil.getInstance().set(CacheKey.PLAYER_TASK_INFO, JSON.stringify(playerTaskInfo));
        }

        
        // 玩家每日任务信息
        let playerDailyTaskInfo = CacheUtil.getInstance().getObject(CacheKey.PLAYER_DAILY_TASK_INFO);
        cc.log("玩家每日任务信息", playerDailyTaskInfo);
        if (playerDailyTaskInfo == null) {
            playerDailyTaskInfo = {};
            CacheUtil.getInstance().set(CacheKey.PLAYER_DAILY_TASK_INFO, JSON.stringify(playerDailyTaskInfo));
        }

        // 玩家每日信息
        let playerDailyInfo = CacheUtil.getInstance().getObject(CacheKey.PLAYER_DAILY_INFO);
        cc.log("玩家每日信息", playerDailyInfo);
        if (playerDailyInfo == null) {
            playerDailyInfo = this.resetPlayerDailyInfo();
            CacheUtil.getInstance().set(CacheKey.PLAYER_DAILY_INFO, JSON.stringify(playerDailyInfo));
        }

        // 玩家设置信息
        let playerSettingInfo = CacheUtil.getInstance().getObject(CacheKey.PLAYER_SETTING_INFO);
        cc.log("玩家设置信息", playerSettingInfo);
        if (playerSettingInfo == null) {
            playerSettingInfo = this.initPlayerSettingInfo();
            CacheUtil.getInstance().set(CacheKey.PLAYER_SETTING_INFO, JSON.stringify(playerSettingInfo));
        }
        // 玩家兑换码信息
        let playerCdkInfo = CacheUtil.getInstance().getObject(CacheKey.Player_CDK_INFO);
        cc.log("玩家兑换码信息", playerCdkInfo);
        if (playerCdkInfo == null) {
            playerCdkInfo = {};
            CacheUtil.getInstance().set(CacheKey.Player_CDK_INFO, JSON.stringify(playerCdkInfo));
        }


        this.createTime = createTime;
        this.guide = guide;
        this.playerChatperInfo = playerChatperInfo;
        this.passFight = passFight;
        this.sysSetting = sysSetting;
        this.playerExp = playerExp;
        this.playerLevel = playerLevel;
        this.lastGainExpTime = lastGainExpTime;
        this.lastGainVigourTime = lastGainVigourTime;
        this.playerLevelUpFailedTime = playerLevelUpFailedTime;
        this.playerItem = playerItem;
        this.playerSkillInfo = playerSkillInfo;
        this.playerPetInfo = playerPetInfo;
        this.dailyRewardInfo = dailyRewardInfo;
        this.attainmentRewardInfo = attainmentRewardInfo;
        this.killCount = killCount;
        this.aliveTime = aliveTime;
        this.activityInfo = activityInfo;
        this.attrLevelInfo = attrLevelInfo;
        this.playerGeneralInfo = generalInfo;
        this.playerSkillEquipInfo = playerSkillEquipInfo;
        this.playerPetEquipInfo = playerPetEquipInfo;
        this.autoSkill = autoSkill;
        this.playerCallInfo = playerCallInfo;
        this.playerAdBoxInfo = playerAdBoxInfo;
        // this.playerChallengeInfo = playerChallengeInfo; // 不需要了，上面已经处理
        this.playerTaskInfo = playerTaskInfo;
        this.playerDailyTaskInfo = playerDailyTaskInfo;
        this.playerDailyInfo = playerDailyInfo;
        this.playerSettingInfo = playerSettingInfo;
        this.playerCdkInfo = playerCdkInfo;
    }

    private _destroy() { }

    /**
     * 清除缓存
     */
    public clearCache() {
        CacheUtil.getInstance().remove(CacheKey.PLAYER_PET); // 宠物信息
        CacheUtil.getInstance().remove(CacheKey.PLAYER_PET_EQUIP); // 宠物装备信息
        CacheUtil.getInstance().remove(CacheKey.PLAYER_SKILL); // 技能信息
        CacheUtil.getInstance().remove(CacheKey.PLAYER_SKILL_EQUIP); // 技能装备信息
        cc.log("清除缓存...");
    }

    /**
    * 修改玩家关卡信息
    * @param playerChapterInfo 关卡 
    */
    public editPlayerChapterInfo(playerChapterInfo) {
        this.playerChatperInfo = playerChapterInfo;
        this.setPlayerChatperInfo();
    }

    /**
     * 获取玩家关卡信息
     * @returns 
     */
    public getPlayerChapterInfo() {
        return this.playerChatperInfo;
    }

    private setPlayerChatperInfo() {
        CacheUtil.getInstance().set(CacheKey.PLAYER_CHAPTER_INFO, JSON.stringify(this.playerChatperInfo));
    }

    /**
     * 修改通关的挑战关卡
     * @param fightId 挑战关卡 
     */
    public editPassFight(fightId) {
        this.passFight = fightId;
        this.setPassFight();
    }

    public getPassFight() {
        return this.passFight;
    }

    private setPassFight() {
        CacheUtil.getInstance().set(CacheKey.PASS_FIGHT, this.passFight);
    }

    /**
     * 获取系统设置
     */
    public getSysSetting() {
        return this.sysSetting;
    }

    /**
     * 修改声音启用状态
     * @param status 状态
     */
    public editAudioStatus(status) {
        this.sysSetting.audioStatus = status;
        this.setSysSetting();
    }

    /**
     * 修改伤害飘字启用状态
     * @param status 状态
     */
    public editDamageTextStatus(status) {
        this.sysSetting.damageTextStatus = status;
        this.setSysSetting();
    }

    /**
    * 修改音量
    * @param volume 音量 
    */
    public editAudioVolume(volume) {
        this.sysSetting.audioVolume = volume;
        this.setSysSetting();
    }

    public setSysSetting() {
        CacheUtil.getInstance().set(CacheKey.SYS_SETTING, JSON.stringify(this.sysSetting));
    }

    /**
     * 增加玩家经验
     * @param limitType 获取类型 1-每分钟获取 2-消耗获取(待做) 
     */
    public addPlayerExp(limitType: number) {
        let addExp = null;
        if (limitType == 1) {
            addExp = this.playerGainExpByOneMinute();
        }

        if (addExp == null) {
            return;
        }
        cc.log("增加玩家经验：", addExp);
        this.playerExp += addExp;
        this.setPlayerExp();
        this.setPlayerGainExpTime();
    }

    /**
     * 玩家每分钟获取经验
     * @returns 
     */
    private playerGainExpByOneMinute() {
        // let nowTime = new Date().getTime();
        // // 根据阶级获取每分钟获得经验配置
        // let playerLevelConfig:PlayerLevelBasic = PlayerLevelConfig.getConfigByLevel(this.playerLevel);
        // if(playerLevelConfig == null) {
        //     return;
        // }
        // let addExp = playerLevelConfig.oneMintueGainExp; // 每分钟经验
        // // 当前时间距离上一次获得经验的时间
        // let minutes = 1;
        // if(this.lastGainExpTime > 0) { // 防止首次获得经验膨胀
        //     minutes = Math.floor((nowTime - this.lastGainExpTime) / 60000)
        // }
        // if(minutes <= 0) {
        //     return;
        // }


        // if(minutes > playerLevelConfig.maxOfflineGainMinute) {
        //     minutes = playerLevelConfig.maxOfflineGainMinute;
        // }
        // cc.log("玩家每分钟获得经验：%s, 距离上次总共有 %s 分钟,获得总经验：%s",addExp,minutes,(addExp * minutes));
        // return addExp * minutes;
    }

    /**
     * 减少玩家经验
     * @param exp 经验
     */
    public costPlayerExp(exp: number) {
        this.playerExp -= exp;
        this.setPlayerExp();
    }

    /**
     * 设置玩家经验
     */
    public setPlayerExp() {
        CacheUtil.getInstance().set(CacheKey.PLAYER_EXP, this.playerExp);
    }

    /**
     * 获取玩家经验
     * @returns 
     */
    public getPlayerExp() {
        return this.playerExp;
    }

    /**
     * 增加阶级
     * @param level 等级
     */
    public addPlayerLevel(level: number) {
        if (PlayerLevelConfig.getConfigByLevel(this.playerLevel + level) == null) {
            cc.log("玩家升级失败,{}的阶级配置找不到", (this.playerLevel + level));
            return;
        }

        this.playerLevel += level;
        this.setPlayerLevel();
    }

    /**
     * 设置阶级
     */
    public setPlayerLevel() {
        CacheUtil.getInstance().set(CacheKey.PLAYER_LEVEL, this.playerLevel);
    }

    /**
     * 获取阶级
     * @returns 
     */
    public getPlayerLevel() {
        return this.playerLevel;
    }


    /**
     * 设置玩家获得经验时间
     */
    public setPlayerGainExpTime() {
        this.lastGainExpTime = new Date().getTime();
        CacheUtil.getInstance().set(CacheKey.PLAYER_LAST_GAIN_EXP_TIME, this.lastGainExpTime);
    }

    /**
     * 获取玩家获得经验时间(上次获取经验时间 + 60秒)
     * @returns 
     */
    public getPlayerGainExpTime() {
        return this.lastGainExpTime + 60000;
    }

    public recoveryVigour() {
        let nowTime = new Date().getTime();
        if (this.getPlayerGainVigourTime() > nowTime) {
            return;
        }

        let addNum = 0;
        // 如果上次恢复时间为0，则代表为第一次，只恢复一点
        if (this.lastGainVigourTime == 0) {
            addNum = 1;
        } else {
            // 计算到目前为止可以恢复多少点体力
            addNum = Math.floor((nowTime - this.lastGainVigourTime) / GlobalConfig.VIGOUR_RECORVEY_TIME);
        }

        // 防止溢出
        if (this.getPlayerVigourNum() + addNum > GlobalConfig.VIGOUR_MAX_NUM) {
            addNum = GlobalConfig.VIGOUR_MAX_NUM - this.getPlayerVigourNum();
        }

        // 增加体力
        this.addPlayerItem(Number(ItemConfig.ITEM_CONST.VIGOUR), addNum);

        // 更新上次获取体力时间
        this.setPlayerGainVigourTime(nowTime);
    }

    /**
     * 设置玩家获得体力时间
     */
    public setPlayerGainVigourTime(time: number) {
        this.lastGainVigourTime = time;
        CacheUtil.getInstance().set(CacheKey.PLAYER_LAST_GAIN_VIGOUR_TIME, this.lastGainVigourTime);
    }

    /**
     * 获取玩家获得体力时间(上次获取体力时间 + 获取体力间隔时间)
     * @returns 
     */
    public getPlayerGainVigourTime(): number {
        return this.lastGainVigourTime + GlobalConfig.VIGOUR_RECORVEY_TIME;
    }


    /**
    * 设置玩家突破失败时间
    */
    public setPlayerLevelUpFailedTime() {
        this.playerLevelUpFailedTime = new Date().getTime();
        CacheUtil.getInstance().set(CacheKey.PLAYER_LEVEL_UP_FAILED_TIME, this.playerLevelUpFailedTime);
    }

    /**
     * 获取突破失败恢复时间
     * @returns 
     */
    public getPlayerRecoveryTime() {
        // let nowTime = new Date().getTime();
        // // （当前时间 - 突破失败时间） - 元神受损恢复时间
        // let playerLevelConfig:PlayerLevelBasic = PlayerLevelConfig.getConfigByLevel(this.playerLevel);
        // let recoveryTime = Math.floor((playerLevelConfig.recoveryTime - (nowTime - this.playerLevelUpFailedTime)) / 1000);
        // return recoveryTime;
    }

    /**
     * 增加玩家物品
     * @param itemId 物品ID
     * @param itemCount 物品数量
     */
    public addPlayerItemList(itemList): boolean {
        for (let i = 0; i < itemList.length; i++) {
            let item = itemList[i];
            this.addPlayerItem(item.itemId, item.itemCount);
        }

        return true;
    }

    /**
     * 增加玩家物品数量
     * @param itemId 物品ID
     * @param itemCount 物品数量
     */
    public addPlayerItem(itemId: number, itemCount: number): boolean {
        cc.log("增加玩家物品,itemId:%s , itemCount:%s", itemId, itemCount);
        if (itemCount < 0) {
            cc.log("数量小于0");
            return false;
        }
        if (ItemConfig.getConfigById(itemId) == null) {
            cc.log("%s的物品配置不存在", itemId);
            return false;
        }

        // 获取资源加成配置
        let itemAddRate = PlayerAttrCtrl.getInstance().itemAddRate;
        if (itemAddRate != null && itemAddRate["" + itemId] != null) {
            itemCount += Math.ceil(itemCount * itemAddRate["" + itemId]);
        }

        let oldCount = 0;
        if (this.playerItem[itemId + ""] != null) {
            oldCount = this.playerItem[itemId + ""];
        }

        this.playerItem[itemId + ""] = oldCount + itemCount;
        this.setPlayerItem();
        return true;
    }

    /**
    * 减少玩家物品数量
    * @param itemId 物品ID
    * @param itemCount 物品数量
    */
    public costPlayerItem(itemId: number, itemCount: number): boolean {
        cc.log("减少玩家物品,itemId:%s , itemCount:%s", itemId, itemCount);
        if (itemCount < 0) {
            cc.log("数量小于0");
            return false;
        }
        if (ItemConfig.getConfigById(itemId) == null) {
            cc.log("%s的物品配置不存在", itemId);
            return false;
        }

        let oldCount = 0;
        if (this.playerItem[itemId + ""] != null) {
            oldCount = this.playerItem[itemId + ""];
        }

        if (itemCount > oldCount) {
            cc.log("减少数量：%s,拥有数量：%s", itemCount, oldCount);
            return false;
        }

        this.playerItem[itemId + ""] = oldCount - itemCount;
        this.setPlayerItem();
        return true;
    }

    /**
     * 获取玩家钻石数量
     * @returns 
     */
    public getPlayerDiamondNum() {
        let itemCount = 0;
        if (this.playerItem[ItemConfig.ITEM_CONST.DIAMOND] != null) {
            itemCount = this.playerItem[ItemConfig.ITEM_CONST.DIAMOND];
        }
        return itemCount;
    }

    /**
     * 设置玩家金币数量
     */
    public setPlayerItem() {
        CacheUtil.getInstance().set(CacheKey.PLAYER_ITEM, JSON.stringify(this.playerItem));
    }

    /**
     * 获取玩家金币数量
     * @returns 
     */
    public getPlayerGoldNum() {
        let itemCount = 0;
        if (this.playerItem[ItemConfig.ITEM_CONST.GOLD] != null) {
            itemCount = this.playerItem[ItemConfig.ITEM_CONST.GOLD];
        }
        return itemCount;
    }

    /**
     * 获取玩家兽晶数量
     * @returns 
     */
    public getPlayerShouJingNum() {
        let itemCount = 0;
        if (this.playerItem[ItemConfig.ITEM_CONST.SHOU_JING] != null) {
            itemCount = this.playerItem[ItemConfig.ITEM_CONST.SHOU_JING];
        }
        return itemCount;
    }

    /**
     * 获取玩家体力数量
     * @returns 
     */
    public getPlayerVigourNum() {
        let itemCount = 0;
        if (this.playerItem[ItemConfig.ITEM_CONST.VIGOUR] != null) {
            itemCount = this.playerItem[ItemConfig.ITEM_CONST.VIGOUR];
        } else {
            // 初始化为体力上限
            itemCount = GlobalConfig.VIGOUR_MAX_NUM;
            this.playerItem[ItemConfig.ITEM_CONST.VIGOUR] = itemCount;
            this.setPlayerItem();
        }

        return itemCount;
    }

    /**
    * 获取玩家物品列表
    * @returns 
    */
    public getPlayerItemList() {
        return this.playerItem;
    }

    /**
    * 获取玩家物品数量
    * @returns 
    */
    public getPlayerItemNum(itemId: number) {
        let itemCount = 0;
        if (this.playerItem[itemId + ""] != null) {
            itemCount = this.playerItem[itemId + ""];
        }
        return itemCount;
    }

    /**
    * 检查玩家物品数量是否足够
    * @returns 
    */
    public checkPlayerItem(itemList: Array<ItemInfo>) {
        if (itemList == null || itemList.length <= 0) {
            return true;
        }

        for (let i = 0; i < itemList.length; i++) {
            let item = itemList[i];
            let playerItem = this.playerItem[item.itemId + ""];
            if (playerItem == null || playerItem < item.itemCount) {
                return false;
            }
        }
        return true;
    }

    /**
     * 初始化玩家角色信息
     */
    public initPlayerGeneralInfo() {
        let playerGeneralInfo = {};
        let setUseStatus = true; // 是否设置为使用中
        for (let i = 0; i < GeneralConfig.CONFIG.length; i++) {
            let generalConfig: GeneralBasic = GeneralConfig.CONFIG[i];
            if (generalConfig.unlockCondition.type == UnlockManager.UNLOCK_TYPE.FREE) {
                playerGeneralInfo["" + generalConfig.id] = {
                    id: generalConfig.id,
                    level: 1,
                    exp: 0,
                    useStatus: setUseStatus ? CommonConfig.USE_STATUS.USED : CommonConfig.USE_STATUS.UNUSED // 设置使用状态
                }

                // 取消设置使用中的状态
                if (setUseStatus) {
                    setUseStatus = false;
                }
            }
        }
        return playerGeneralInfo;
    }

    /**
     * 玩家获得角色
     * @param generalId 角色ID
     */
    public playerGetGeneral(generalId: number) {
        this.playerGeneralInfo["" + generalId] = {
            id: generalId,
            level: 1,
            exp: 0,
            useStatus: CommonConfig.USE_STATUS.UNUSED
        }
        this.setPlayerGeneral();
    }


    /**
     * 获取玩家角色信息
     * @returns 
     */
    public getPlayerGeneral() {
        return this.playerGeneralInfo;
    }

    /**
     * 获取玩家指定角色信息
     * @param generalId 角色ID
     */
    public getPlayerGeneralById(generalId: number) {
        return this.playerGeneralInfo[generalId + ""];
    }

    /**
    * 获取玩家当前使用角色的角色ID
    */
    public getPlayerUseGeneral() {
        for (const id in this.playerGeneralInfo) {
            let general = this.playerGeneralInfo[id];
            if (CommonConfig.USE_STATUS.USED == general.useStatus) {
                return general.id;
            }
        }
        return 1;
    }

    /**
     * 编辑玩家角色信息
     * @param generalId 角色ID
     * @param generalInfo 角色信息
     */
    public editPlayerGeneral(generalId: number, generalInfo) {
        this.playerGeneralInfo["" + generalId] = generalInfo;
        this.setPlayerGeneral();
    }

    /**
     * 玩家使用角色
     * @param generalId 角色ID
     */
    public playerUseGeneral(generalId: number) {
        for (const id in this.playerGeneralInfo) {
            let general = this.playerGeneralInfo[id];
            let useStatus = CommonConfig.USE_STATUS.UNUSED;
            if (general.id == generalId) {
                useStatus = CommonConfig.USE_STATUS.USED;
            }
            this.playerGeneralInfo[id].useStatus = useStatus;
        }
        this.setPlayerGeneral();
    }

    /**
     * 设置玩家角色信息
     */
    private setPlayerGeneral() {
        CacheUtil.getInstance().set(CacheKey.PLAYER_GENERAL, JSON.stringify(this.playerGeneralInfo));
    }



    /**
     * 获取玩家技能信息
     * @returns 
     */
    public getPlayerSkillInfo() {
        return this.playerSkillInfo;
    }

    /**
     * 获取玩家指定技能信息
     * @param skillId 技能ID
     */
    public getPlayerSkillInfoById(skillId: number) {
        return this.playerSkillInfo[skillId + ""];
    }

    /**
     * 获取玩家指定技能等级
     * @param skillId 技能ID
     */
    public getPlayerSkillLevelById(skillId: number) {
        let skillInfo = this.playerSkillInfo[skillId + ""];
        let level = 0;
        if (skillInfo != null) {
            level = skillInfo.level;
        }
        return level;
    }

    /**
    * 玩家获得技能
    * @param skillId 技能ID
    */
    public playerGetSkill(skillId: number) {
        let skillInfo = {
            id: skillId,
            level: 1,
            exp: 0,
            equip: SkillConfig.EQUIP_STATUS_MENU.UN_EQUIP
        }
        this.playerSkillInfo[skillId + ""] = skillInfo;
        this.setPlayerSkillInfo();
    }


    /**
    * 修改玩家技能信息
    * @param skillId 技能ID
    * @param playerSkillInfo 玩家技能信息
    */
    public editPlayerSkillInfo(skillId: number, playerSkillInfo) {
        this.playerSkillInfo[skillId + ""] = playerSkillInfo;
        this.setPlayerSkillInfo();
    }

    /**
     * 设置玩家技能信息
     */
    public setPlayerSkillInfo() {
        CacheUtil.getInstance().set(CacheKey.PLAYER_SKILL, JSON.stringify(this.playerSkillInfo));
    }


    /**
     * 获取玩家技能装备信息
     * @returns 
     */
    public getPlayerSkillEquipInfo() {
        return this.playerSkillEquipInfo;
    }

    /**
     * 获取玩家指定位置的技能装备信息
     * @param pos 位置 1~6
     */
    public getPlayerSkillEquipInfoByPos(pos: number) {
        return this.playerSkillEquipInfo[pos + ""];
    }

    /**
     * 初始化玩家技能装备信息
     */
    public initPlayerSkillEquipInfo() {
        let maxNum = SkillConfig.SKILL_EQUIP_MAX_NUM;
        let playerSkillEquipInfo = {};
        for (let i = 0; i < maxNum; i++) {
            let pos = i + 1;
            playerSkillEquipInfo[pos + ""] = {
                pos: pos,
                skillId: null,
                lockStatus: SkillConfig.EQUIP_POS_STATUS.LOCK
            }
        }
        return playerSkillEquipInfo;
    }

    /**
    * 修改玩家技能装备信息
    * @param pos 装备位置 1~6
    * @param playerSkillEquipInfo 玩家技能装备信息
    */
    public editPlayerSkillEquipInfo(pos: number, playerSkillEquipInfo) {
        this.playerSkillEquipInfo[pos + ""] = playerSkillEquipInfo;
        this.setPlayerSkillEquipInfo();
    }

    /**
     * 设置玩家技能信息
     */
    public setPlayerSkillEquipInfo() {
        CacheUtil.getInstance().set(CacheKey.PLAYER_SKILL_EQUIP, JSON.stringify(this.playerSkillEquipInfo));
    }





    /**
     * 获取玩家宠物信息
     * @returns 
     */
    public getPlayerPetInfo() {
        return this.playerPetInfo;
    }

    /**
     * 获取玩家指定宠物信息
     * @param petId 宠物ID
     */
    public getPlayerPetInfoById(petId: number) {
        return this.playerPetInfo[petId + ""];
    }

    /**
     * 获取玩家指定宠物等级
     * @param petId 宠物ID
     */
    public getPlayerPetLevelById(petId: number) {
        let petInfo = this.playerPetInfo[petId + ""];
        let level = 0;
        if (petInfo != null) {
            level = petInfo.level;
        }
        return level;
    }

    /**
    * 玩家获得宠物
    * @param skillId 宠物ID
    */
    public playerGetPet(petId: number) {
        let petInfo = {
            id: petId,
            level: 1,
            exp: 0,
            equip: PetConfig.EQUIP_STATUS_MENU.UN_EQUIP
        }
        this.playerPetInfo[petId + ""] = petInfo;
        this.setPlayerPetInfo();
    }


    /**
    * 修改玩家宠物信息
    * @param skillId 宠物ID
    * @param playerSkillInfo 玩家宠物信息
    */
    public editPlayerPetInfo(petId: number, playerPetInfo) {
        this.playerPetInfo[petId + ""] = playerPetInfo;
        this.setPlayerPetInfo();
    }

    /**
     * 设置玩家宠物信息
     */
    public setPlayerPetInfo() {
        CacheUtil.getInstance().set(CacheKey.PLAYER_PET, JSON.stringify(this.playerPetInfo));
    }


    /**
     * 获取玩家宠物装备信息
     * @returns 
     */
    public getPlayerPetEquipInfo() {
        return this.playerPetEquipInfo;
    }

    /**
     * 获取玩家指定位置的宠物装备信息
     * @param pos 位置 1~6
     */
    public getPlayerPetEquipInfoByPos(pos: number) {
        return this.playerPetEquipInfo[pos + ""];
    }


    /**
     * 初始化玩家宠物装备信息
     */
    public initPlayerPetEquipInfo() {
        let maxNum = PetConfig.PET_EQUIP_MAX_NUM;
        let playerPetEquipInfo = {};
        for (let i = 0; i < maxNum; i++) {
            let pos = i + 1;
            playerPetEquipInfo[pos + ""] = {
                pos: pos,
                petId: null,
                lockStatus: PetConfig.EQUIP_POS_STATUS.LOCK
            }
        }
        return playerPetEquipInfo;
    }


    /**
    * 修改玩家宠物装备信息
    * @param pos 装备位置 1~6
    * @param playerSkillEquipInfo 玩家技能装备信息
    */
    public editPlayerPetEquipInfo(pos: number, playerPetEquipInfo) {
        this.playerPetEquipInfo[pos + ""] = playerPetEquipInfo;
        this.setPlayerPetEquipInfo();
    }

    /**
     * 设置玩家宠物信息
     */
    public setPlayerPetEquipInfo() {
        CacheUtil.getInstance().set(CacheKey.PLAYER_PET_EQUIP, JSON.stringify(this.playerPetEquipInfo));
    }



    /**
     * 获取玩家每日奖励领取信息
     * @returns 
     */
    public getDailyRewardInfo() {
        return this.dailyRewardInfo;
    }

    /**
     * 设置玩家每日奖励领取信息
     * @param info 
     */
    public setDailyRewardInfo(info) {
        this.dailyRewardInfo = info
        CacheUtil.getInstance().set(CacheKey.DAILY_REWARD_INFO, JSON.stringify(this.dailyRewardInfo));
    }

    /**
     * 获取玩家每日奖励领取信息
     * @returns 
     */
    public getAttainmentRewardInfo() {
        return this.attainmentRewardInfo;
    }

    /**
     * 设置玩家成就奖励领取信息
     * @param info 
     */
    public setAttainmentRewardInfo(info) {
        this.attainmentRewardInfo = info
        CacheUtil.getInstance().set(CacheKey.ATTAINMENT_REWARD_INFO, JSON.stringify(this.attainmentRewardInfo));
    }

    /**
     * 获取总击杀数量
     */
    public getKillCount(): number {
        return this.killCount;
    }

    /**
     * 设置总击杀数量
     */
    public setKillCount(count: number) {
        this.killCount = count;
        CacheUtil.getInstance().set(CacheKey.KILL_COUNT, this.killCount);
    }

    /**
     * 获取总存活时间
     */
    public getAliveTime(): number {
        return this.aliveTime;
    }

    /**
     * 设置总存活时间
     */
    public setAliveTime(aliveTime: number) {
        this.aliveTime = aliveTime;
        CacheUtil.getInstance().set(CacheKey.ALIVE_TIME, this.aliveTime);
    }


    /**
   * 玩家活动信息
   * @param activityId 活动ID
   */
    public getPlayerActivityInfo(activityId: number) {
        return this.activityInfo[activityId + ""];
    }

    /**
     * 设置玩家活动信息
    * @param activityId 活动ID
    * @param activityInfo 活动信息
     */
    public setPlayerActivityInfo(activityId: number, activityInfo) {
        this.activityInfo["" + activityId] = activityInfo;
        CacheUtil.getInstance().set(CacheKey.PLAYER_ACTIVITY_INFO, JSON.stringify(this.activityInfo));
    }

    /**
     * 初始化玩家属性等级信息
     */
    public initPlayerAttrLevelInfo() {
        let attrLevelInfo = {};
        for (const attrKey in AttrLevelConfig.CONFIG) {
            cc.log("attrKey/attrVal", attrKey, AttrLevelConfig.ATTR_INIT_VAL[attrKey]);
            attrLevelInfo[attrKey] = {
                level: 1,
                attrVal: AttrLevelConfig.ATTR_INIT_VAL[attrKey],
            }
        }
        return attrLevelInfo;
    }

    /**
     * 玩家属性等级信息
     * @param attrKey 属性标识
     */
    public getPlayerAttrLevelInfo(attrKey: string) {
        return this.attrLevelInfo[attrKey];
    }

    /**
     * 设置玩家属性等级信息
    * @param attrKey 属性标识
    * @param attrLevelInfo 属性等级信息
     */
    public setPlayerAttrLevelInfo(attrKey: string, attrLevelInfo) {
        this.attrLevelInfo[attrKey] = attrLevelInfo;
        CacheUtil.getInstance().set(CacheKey.PLAYER_ATTR_LEVEL_INFO, JSON.stringify(this.attrLevelInfo));
    }

    /**
     * 是否自动释放技能状态
     */
    public getAutoSkill(): boolean {
        return Boolean(this.autoSkill);
    }

    /**
     * 设置自动释放技能状态
     * @param autoSkillFlag 是否自动释放技能
     */
    public setAutoSkill(autoSkillFlag) {
        this.autoSkill = autoSkillFlag;
        CacheUtil.getInstance().set(CacheKey.AUTO_SKILL, autoSkillFlag);
    }


    /**
    * 初始化玩家召唤信息
    */
    public initPlayerCallInfo() {
        let playerCallInfo = {};
        for (let i = 0; i < CallConfig.CONFIG.length; i++) {
            let callConfig: CallBasic = CallConfig.CONFIG[i];
            playerCallInfo["" + callConfig.id] = {
                id: callConfig.id,
                level: 1,
                exp: 0
            }
        }
        return playerCallInfo;
    }

    /**
     * 获取玩家召唤功能信息
     * @param callId 召唤ID
     */
    public getPlayerCallInfo(callId:number) {
        return this.playerCallInfo["" + callId]; 
    }

    /**
     * 设置玩家召唤功能信息
     * @param callId 召唤ID
     * @param playerCallInfo 召唤信息
     */
     public setPlayerCallInfo(callId:number,playerCallInfo) {
        this.playerCallInfo["" + callId] = playerCallInfo;
        CacheUtil.getInstance().set(CacheKey.PLAYER_CALL_INFO, JSON.stringify(this.playerCallInfo));
    }


     /**
     * 获取玩家广告箱信息
     */
      public getPlayerAdBoxInfo() {
        return this.playerAdBoxInfo;
    }

    /**
     * 设置玩家广告箱信息
     * @param playerCallInfo 广告箱信息
     */
     public setPlayerAdBoxInfo(playerAdBoxInfo) {
        this.playerAdBoxInfo = playerAdBoxInfo;
        CacheUtil.getInstance().set(CacheKey.PLAYER_AD_BOX, JSON.stringify(this.playerAdBoxInfo));
    }

    
    /**
    * 初始化玩家副本信息,检查是否有新副本功能未初始化信息
    */
     public initPlayerChallengeInfo() {
        if(this.playerChallengeInfo == null) {
            this.playerChallengeInfo = {};
        }

        for (let i = 0; i < ChallengeConfig.CONFIG.length; i++) {
            let challengeConfig: ChallengeBasic = ChallengeConfig.CONFIG[i];
            if(this.playerChallengeInfo["" + challengeConfig.id] == null) {
                this.playerChallengeInfo["" + challengeConfig.id] = {
                    id: challengeConfig.id,
                    level: 1,
                    updateTime:0, // 更新时间
                    count: 0, // 挑战次数
                    adCount: 0, // 广告挑战次数
                }
            }
        }

        
        CacheUtil.getInstance().set(CacheKey.PLAYER_CHALLENGE_INFO, JSON.stringify(this.playerChallengeInfo));
    }

    /**
     * 获取玩家挑战副本信息
     * @param challengeId 副本ID
     */
    public getPlayerChallengeInfo(challengeId:number) {
        return this.playerChallengeInfo["" + challengeId]; 
    }

    /**
     * 设置玩家副本信息
     * @param challengeId 副本ID
     * @param playerChallengeInfo 副本信息
     */
     public setPlayerChallengeInfo(challengeId:number,playerChallengeInfo) {
        this.playerChallengeInfo["" + challengeId] = playerChallengeInfo;
        CacheUtil.getInstance().set(CacheKey.PLAYER_CHALLENGE_INFO, JSON.stringify(this.playerChallengeInfo));
    }

    
    /**
     * 获取玩家任务ID
     */
     public getPlayerTaskId() {
        return this.playerTaskInfo.taskId; 
    }

    /**
     * 设置玩家任务ID
     * @param taskId 任务ID
     */
     public setPlayerTaskId(taskId:number) {
        this.playerTaskInfo.taskId = taskId;
        CacheUtil.getInstance().set(CacheKey.PLAYER_TASK_INFO, JSON.stringify(this.playerTaskInfo));
    }

       
    /**
     * 获取玩家每日任务信息
     */
     public getPlayerDailyTaskInfo(dailyTaskId:number) {
        return this.playerDailyTaskInfo["" + dailyTaskId]; 
    }

    /**
     * 设置玩家每日任务信息
     * @param taskId 每日任务ID
     * @param playerDailyTaskInfo 每日任务信息
     */
     public setPlayerDailyTaskInfo(dailyTaskId:number,playerDailyTaskInfo) {
        this.playerDailyTaskInfo["" + dailyTaskId] = playerDailyTaskInfo;
        CacheUtil.getInstance().set(CacheKey.PLAYER_DAILY_TASK_INFO, JSON.stringify(this.playerDailyTaskInfo));
    }

    public resetPlayerDailyInfo() {
        let playerDailyInfo = {
            resetTime: new Date().getTime(), // 重置时间
            goldChallengeCount: 0, // 金币副本完成数 
            diamondChallengeCount: 0, // 钻石副本完成数
            generalExpChallengeCount: 0, // 角色经验副本完成数
            killCount: 0, // 击杀数
            chapterCount:0, // 闯关数
            adCount: 0, // 广告数
            callCount: 0 // 召唤数
        }

        return playerDailyInfo;
    }

    /**
     * 统计玩家每日信息
     * @param type 统计类型
     * @param count 数量
     */
    public calcPlayerDailyInfo(type:number, count:number) {
        if(count <= 0) {
            return;
        }

        let playerDailyInfo = this.getPlayerDailyInfo();
        if(type == TaskConfig.DAILY_TASK_CONDITION_TYPE.GOLD_CHALLENGE) {
            playerDailyInfo.goldChallengeCount += count;
        }else if(type == TaskConfig.DAILY_TASK_CONDITION_TYPE.DIAMOND_CHALLENGE) {
            playerDailyInfo.diamondChallengeCount += count;
        }else if(type == TaskConfig.DAILY_TASK_CONDITION_TYPE.GENERAL_EXP_CHALLENGE) {
            playerDailyInfo.generalExpChallengeCount += count;
        }else if(type == TaskConfig.DAILY_TASK_CONDITION_TYPE.KILL) {
            playerDailyInfo.killCount += count;
        }else if(type == TaskConfig.DAILY_TASK_CONDITION_TYPE.CALL) {
            playerDailyInfo.callCount += count;
        }else if(type == TaskConfig.DAILY_TASK_CONDITION_TYPE.AD) {
            playerDailyInfo.adCount += count;
        }else if(type == TaskConfig.DAILY_TASK_CONDITION_TYPE.CHAPTER) {
            playerDailyInfo.chapterCount += count;
        }

        this.setPlayerDailyInfo(playerDailyInfo);
    }
       
    /**
     * 获取玩家每日信息
     */
     public getPlayerDailyInfo() {
        // 检查是否需要重置
        let needReset = this.playerDailyInfo.resetTime < DateUtil.getTodayStartTime();
        if(needReset) {
            this.playerDailyInfo = this.resetPlayerDailyInfo();
            this.setPlayerDailyInfo(this.playerDailyInfo);
        }

        return this.playerDailyInfo; 
    }

    /**
     * 设置玩家每日信息
     * @param playerDailyInfo 每日信息
     */
     public setPlayerDailyInfo(playerDailyInfo) {
        this.playerDailyInfo = playerDailyInfo;
        CacheUtil.getInstance().set(CacheKey.PLAYER_DAILY_INFO, JSON.stringify(this.playerDailyInfo));
    }


    /**
     * 初始化玩家设置信息
     * @returns 
     */
    public initPlayerSettingInfo() {
        let playerSettingInfo = {
            bgm: true, // bgm
            audio: true, // 音效
        }
        return playerSettingInfo;
    }
    
    /**
     * 获取玩家设置信息
     */
     public getPlayerSettingInfo() {
        return this.playerSettingInfo;
    }

    /**
     * 设置玩家设置信息
     * @param playerSettingInfo 玩家设置信息
     */
     public setPlayerSettingInfo(playerSettingInfo) {
        this.playerSettingInfo = playerSettingInfo;
        CacheUtil.getInstance().set(CacheKey.PLAYER_SETTING_INFO, JSON.stringify(this.playerSettingInfo));
    }

     /**
     * 获取玩家兑换码信息
     * @param cdk 兑换码
     */
     public getPlayerCdkInfo(cdk:string) {
        return this.playerCdkInfo[cdk];
    }

    /**
     * 设置玩家兑换码信息
     * @param playerSettingInfo 玩家兑换码信息
     */
     public setPlayerCdkInfo(cdk:string,playerCdkInfo) {
        this.playerCdkInfo[cdk] = playerCdkInfo;
        CacheUtil.getInstance().set(CacheKey.Player_CDK_INFO, JSON.stringify(this.playerCdkInfo));
    }

}
