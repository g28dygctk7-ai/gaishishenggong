const {ccclass, property} = cc._decorator;

/**
 * 克隆工具类
 */
@ccclass
export default class CloneUtil {

   
    // 判断是否为数组
    public static isArr = (origin: any): boolean => {
        let str = '[object Array]'
        return Object.prototype.toString.call(origin) == str ? true : false
    }

    /**
     * 深拷贝
     * @param origin 源对象
     * @param target 
     * @returns 
     */
    public static deepClone = <T>(origin: T, target?: Record<string, any> | T ): T => {
        let tar = target || {}

        for (const key in origin) {
            if (Object.prototype.hasOwnProperty.call(origin, key)) {
                if (typeof origin[key] === 'object' && origin[key] !== null) {
                    tar[key] = CloneUtil.isArr(origin[key]) ? [] : {}
                    CloneUtil.deepClone(origin[key], tar[key])
                } else {
                    tar[key] = origin[key]
                }

            }
        }

        return tar as T
    }
}
