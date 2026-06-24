// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

/**
 * 平台工具类
 */
@ccclass
export default class PlatformUtil extends cc.Component {

    public static Platform = {
        wx : 1,
        h5 : 2
    }

    /**
     * 检查平台
     * @returns 
     */
    public static getPlatform() {
        if( typeof wx !== "undefined") {
            return PlatformUtil.Platform.wx;
        }else {
            return PlatformUtil.Platform.h5;
        }
    }

}
