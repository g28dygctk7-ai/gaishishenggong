// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class ResPathKey {

    /**
     * 导航按钮 - 默认
    */
    public static NAV_DISABLED = "ui/common/nav_disabled";
    /**
     * 导航按钮 - 启用
    */
    public static NAV_ENABLED = "ui/common/nav_enabled";


    /**
     * 导航按钮 - 挑战
    */
    public static NAV_FIGHT_ENABLED = "ui/index/fight";



    /**
     * 导航按钮 - 活动
    */
    public static NAV_ACTIVITY_ENABLED = "ui/index/activity";



    /**
     * 导航按钮 - 功法
    */
    public static NAV_SKILL_ENABLED = "ui/index/skill";



    /**
     * 导航按钮 - 背包
    */
    public static NAV_BACKPACK_ENABLED = "ui/index/backpack";



    /**
     * 导航按钮 - 角色
    */
    public static NAV_GENERAL_ENABLE = "ui/index/general";

    /**
     * 导航按钮 - 关闭
    */
    public static NAV_CLOSE = "ui/index/close";



    /**
     * 提示信息预制体
     */
    public static TIP_PREFAB = "prefab/tip";
    /**
     * 伤害信息预制体
     */
    public static DAMAGE_PREFAB = "prefab/common/damage";


    /**
     * 角色框 - 棕色框
    */
    public static GENERAL_BROWN_BOX = "ui/general/brownBox";
    /**
     * 角色框 - 灰色框
    */
    public static GENERAL_GRAY_BOX = "ui/general/grayBox";

    /**
     * 蓝色按钮
    */
    public static BUTTON_BLUE = "ui/button/blueButton";

    /**
     * 绿色按钮
    */
    public static BUTTON_GREEN = "ui/button/greenButton";
    /**
     * 黄色按钮
    */
    public static BUTTON_YELLOW = "ui/button/yellowButton";

    /**
     * 自动技能启动按钮
     */
    public static AUTO_SKILL_ENABLED = "ui/button/autoSkillEnabled";

    /**
     * 自动技能禁用按钮
     */
    public static AUTO_SKILL_DISABLED = "ui/button/autoSkillDisabled";

    /**
     * 黄色进度条
     */
    public static YELLOW_PROGESSS_BAR = "ui/progress/yellowProgressBar1";

    /**
     * 蓝色经验进度条
     */
    public static EXP_PROGESSS_BAR = "ui/progress/expProgressBar";

    /**
     * 气流Spine
    */
    public static SPINE_QILIU = "animation/common/qiliu/qiliu";
    /**
     * boss来袭Spine
    */
    public static SPINE_BOSS_COMING = "animation/common/bossComing/bossComing";

    /**
     * 色块 - 0
    */
    public static BOX_EQUIP = "ui/call/colorBox/0";

    /**
     * 色块 - 禁用
    */
    public static BOX_DISABLED = "ui/call/colorBox/disabled";


    /**
     * 广告
     */
    public static AD = "ui/ad/ad";
    
    /**
     * 广告
     */
    public static AD_BUTTON_LONG = "ui/ad/blue_ad_1";

    /**
     * 钥匙
     */
    public static KEY = "ui/icon/key";

    /**
     * 每日任务未完成的背景框
     */
    public static DAILY_TASK_NOT_COMPLETE = "ui/task/dailyTaskNotComplete";

    /**
     * 每日任务已完成的背景框
     */
    public static DAILY_TASK_COMPLETE = "ui/task/dailyTaskComplete";

    /**
     * 开关 - 开启状态
     */
    public static SWITCH_OPEN = "ui/button/switch_open";
    /**
     * 开关 - 关闭状态
     */
    public static SWITCH_CLOSE = "ui/button/switch_close";


    /**
     * 背景音乐
     */
    public static BGM = "audio/bgm/gameBgm";

    /**
     * 战斗-角色发出攻击
     */
    public static GENERAL_ATK = "audio/fight/generalAtk";

    /**
     * 战斗-怪物受到攻击
     */
    public static MONSTER_BE_HIT = "audio/fight/beHit";

    /**
     * 召唤
     */
    public static CALL = "audio/call/call";

    /**
     * 升级
     */
    public static COMMON_LEVEL_UP = "audio/levelUp/commonLevelUp";

    /**
     * BOSS来袭
     */
    public static BOSS_COMMING = "audio/fight/warning";

    /**
     * 通用按钮
     */
    public static COMMON_BUTTON = "audio/button/commonButton";

    /**
     * 加载中
     */
    public static LOADING = "audio/loading/loading";

    /**
     * 加载中
     */
    public static GAIN_REWARD = "audio/task/taskReward";

    /**
     * 转盘
     */
    public static TURNTABLE = "audio/common/turntable";

    /**
     * 新事物
     */
     public static NEWS = "audio/common/news";
     


    /**
     * 技能06  --  todo后续调整为配置表读取
     */
     public static SKILL_06 = "audio/skill/06";
}
