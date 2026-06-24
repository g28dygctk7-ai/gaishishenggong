const {ccclass, property} = cc._decorator;
/**
 * 全局配置
 */
@ccclass
export default class GlobalConfig {

    /**
     * 是否为测试环境
     */
    public static IS_TEST:boolean = false;

    /**
     * 需要清楚哪个时间点之前的缓存 - 2023-09-25 18:00:00
     */
    public static CLEAR_BEFORE_TIME:number = 1706198400000;


    /**
     * 攻击间隔 30毫秒
     */
     public static ATTACK_CD_TIME:number = 30;

    /**
     * 攻击时触发暴击的伤害倍数
     */
     public static ATTACK_CRIT_RATE:number = 2;

    /**
     * 体力恢复间隔,毫秒
     */
     public static VIGOUR_RECORVEY_TIME = 300000;

     /**
      * 体力上限值
      */
      public static VIGOUR_MAX_NUM = 35;

      
     /**
      * 进入战斗扣除体力数量
      */
      public static ENTER_FIGHT_COST_VIGOUR_NUM = 5;



      /**
       * 试炼场-战斗死亡可复活次数
       */
       public static ATTACK_REVIVE_COUNT:number = 3;

      /**
       * 试炼场-战斗死亡复活弹窗标题
       */
       public static ATTACK_REVIVE_TITLE:string = "您已被击败";
       /**
        * 试炼场-战斗死亡复活弹窗内容
        */
        public static ATTACK_REVIVE_CONTENT:string = "可通过修炼功法提升自我";
}