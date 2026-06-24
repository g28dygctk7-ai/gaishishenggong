// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class CacheKey {

    /**
     * 挑战ID
     */
    public static FIGHT_ID = "FIGHT_ID";

    /**
     * 创建时间
     */
    public static CREATE_TIME = "CREATE_TIME";

    /**
     * 新手引导
     */
    public static GUIDE = "GUIDE";

    /**
     * 玩家关卡信息
     */
    public static PLAYER_CHAPTER_INFO = "PLAYER_CHAPTER_INFO";

    /**
     * 通关的挑战关卡
     */
    public static PASS_FIGHT = "PASS_FIGHT";

    /**
     * 系统设置
     */
    public static SYS_SETTING = "SYS_SETTING";

    /**
     * 阶级
     */
    public static PLAYER_LEVEL = "PLAYER_LEVEL";

    /**
     * 玩家经验
     */
    public static PLAYER_EXP = "PLAYER_EXP";

    /**
     * 玩家上次获得经验时间
     */
    public static PLAYER_LAST_GAIN_EXP_TIME = "PLAYER_LAST_GAIN_EXP_TIME";

    /**
     * 玩家上次获得体力时间
     */
    public static PLAYER_LAST_GAIN_VIGOUR_TIME = "PLAYER_LAST_GAIN_VIGOUR_TIME";

    /**
     * 玩家突破失败时间
     */
    public static PLAYER_LEVEL_UP_FAILED_TIME = "PLAYER_LEVEL_UP_FAILED_TIME";

    /**
     * 玩家物品
     */
    public static PLAYER_ITEM = "PLAYER_ITEM";

    /**
     * 玩家活动信息
     */
    public static PLAYER_ACTIVITY_INFO = "PLAYER_ACTIVITY_INFO";

    /**
     * 玩家角色
     */
    public static PLAYER_GENERAL = "PLAYER_GENERAL";

    /**
     * 玩家技能信息
     */
    public static PLAYER_SKILL = "PLAYER_SKILL";
    /**
     * 玩家技能装备信息
     */
    public static PLAYER_SKILL_EQUIP = "PLAYER_SKILL_EQUIP";

    /**
     * 玩家伙伴
     */
    public static PLAYER_PET = "PLAYER_PET";

    /**
     * 玩家伙伴装备信息
     */
    public static PLAYER_PET_EQUIP = "PLAYER_PET_EQUIP";

    /**
     * 每日奖励信息
     */
    public static DAILY_REWARD_INFO = "DAILY_REWARD_INFO";

    /**
     * 成就奖励信息
     */
    public static ATTAINMENT_REWARD_INFO = "ATTAINMENT_REWARD_INFO";

    /**
     * 总击杀数量
     */
    public static KILL_COUNT = "KILL_COUNT";

    /**
     * 存活时间
     */
    public static ALIVE_TIME = "ALIVE_TIME";

    /**
     * 玩家属性等级信息
     */
    public static PLAYER_ATTR_LEVEL_INFO = "PLAYER_ATTR_LEVEL_INFO";


    /**
     * 是否自动释放技能
     */
    public static AUTO_SKILL = "AUTO_SKILL";

    /**
     * 玩家召唤信息
     */
    public static PLAYER_CALL_INFO = "PLAYER_CALL_INFO";

    /**
     * 玩家广告箱信息
     */
    public static PLAYER_AD_BOX = "PLAYER_AD_BOX";

    /**
     * 玩家副本信息
     */
    public static PLAYER_CHALLENGE_INFO = "PLAYER_CHALLENGE_INFO";

    /**
     * 玩家任务信息
     */
    public static PLAYER_TASK_INFO = "PLAYER_TASK_INFO";
    /**
     * 玩家每日任务信息
     */
    public static PLAYER_DAILY_TASK_INFO = "PLAYER_DAILY_TASK_INFO";
    /**
     * 玩家每日信息
     */
    public static PLAYER_DAILY_INFO = "PLAYER_DAILY_INFO";
    /**
     * 玩家设置信息
     */
    public static PLAYER_SETTING_INFO = "PLAYER_SETTING_INFO";
    /**
     * 玩家兑换码信息
     */
    public static Player_CDK_INFO = "Player_CDK_INFO";

}
