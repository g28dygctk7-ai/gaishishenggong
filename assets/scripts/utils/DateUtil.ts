const {ccclass, property} = cc._decorator;

/**
 * 日期工具类
 */
@ccclass
export default class DateUtil {

    /**
     * 获取当天的开始时间戳
     */
    public static getTodayStartTime():number {
        let date = new Date(new Date().setHours(0,0,0,0));
        return date.getTime();
    }

    /**
     * 获取当天的结束时间戳
     */
    public static getTodayEndTime():number {
        // todo
        return 0;
    }

    /**
     * 检查是否为当天
     * @param timestamp 时间戳 
     * @returns 
     */
    public static isToday(timestamp: number): boolean {
        let dateA = new Date(timestamp);
        let dateB = new Date();
        return (dateA.setHours(0, 0, 0, 0) == dateB.setHours(0, 0, 0, 0));
    }
}
