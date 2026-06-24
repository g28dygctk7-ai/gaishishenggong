// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class CommonConfig {
    public static UNLOCK_STATUS = {
        LOCK: 0, // 未解锁
        UNLOCK: 1, // 已解锁
    } // 解锁状态

    public static USE_STATUS = {
        UNUSED: 0, // 未使用
        USED: 1, // 使用中
    } // 使用状态


    public static ENABLE_STATUS = {
        DISABLED: 0, // 禁用
        ENABLED: 1, // 启用
    } // 启用状态

}
