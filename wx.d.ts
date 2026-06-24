declare namespace wx {
    export function showShareMenu(object: object): void

    /**
     * 调用接口获取登录凭证（code）。通过凭证进而换取用户登录态信息，包括用户的唯一标识（openid）及本次登录的会话密钥（session_key）等。
     * 
     */
    export function login(object: object): void;

    /**
     * 打开另一个小程序。
     */
    export function navigateToMiniProgram(object: object): void;

    /**
     * 获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限。
     */
    export function getSetting(object: object): void;

    /**
     * 提前向用户发起授权请求。调用后会立刻弹窗询问用户是否同意授权小程序使用某项功能或获取用户的某些数据，但不会实际调用对应接口。如果用户之前已经同意授权，则不会出现弹窗，直接返回成功。
     */
    export function authorize(object: object): void;

    /**
     * 获取用户信息。
     */
    export function getUserInfo(object: object): void;

    /**
     * 向开放数据域发送消息。
     */
    export function postMessage(object: object): void;

    /**
     * 监听主域发送的消息。
     */
    export function onMessage(callback: Function): void;

    /**
     * 对用户托管数据进行写数据操作。允许同时写多组 KV 数据。
     */
    export function setUserCloudStorage(object: object): void;

    /**
     * 获取当前用户托管数据当中对应 key 的数据。该接口只可在开放数据域下使用。
     */
    export function getUserCloudStorage(object: object): void;

    /**
     * 删除用户托管数据当中对应 key 的数据。
     */
    export function removeUserCloudStorage(object: object): void;

    /**
     * 监听成功修改好友的互动型托管数据事件，该接口在游戏主域使用。
     */
    export function onInteractiveStorageModified(callback: Function): void;

    /**
     * 修改好友的互动型托管数据，该接口只可在开放数据域下使用。
     */
    export function modifyFriendInteractiveStorage(object: object): void;

    /**
     * 获取当前用户互动型托管数据对应 key 的数据。
     */
    export function getUserInteractiveStorage(object: object): void;

    /**
     * 获取可能对游戏感兴趣的未注册的好友名单。每次调用最多可获得 5 个好友，此接口只能在开放数据域中使用。
     */
    export function getPotentialFriendList(object: object): void;

    /**
     * 获取群信息。小游戏通过群分享卡片打开的情况下才可以调用。该接口只可在开放数据域下使用。
     */
    export function getGroupInfo(object: object): void;

    /**
     * 获取群同玩成员的游戏数据。小游戏通过群分享卡片打开的情况下才可以调用。该接口只可在开放数据域下使用。
     */
    export function getGroupCloudStorage(object: object): void;

    /**
     * 拉取当前用户所有同玩好友的托管数据。该接口只可在开放数据域下使用。
     */
    export function getFriendCloudStorage(object: object): void;

    /**
     * 给指定的好友分享游戏信息，该接口只可在开放数据域下使用。接收者打开之后，可以用 wx.modifyFriendInteractiveStorage 传入参数 quiet=true 发起一次无需弹框确认的好友互动。
     */
    export function shareMessageToFriend(object: object): void;
    export function onShareAppMessage(callback: Function): void;
    export function updateShareMenu(object: object): void;
    export function getShareInfo(Object: object): void;
    export function showModal(Object: object): void;
    export function getPerformance(): Performance;

    /**
     * 获取主域和开放数据域共享的 sharedCanvas。只有开放数据域能调用。
     */
    export function getSharedCanvas(): any;

    /**
     * 获取开放数据域。
     */
    export function getOpenDataContext(): any;

    /**
     * 创建一个图片对象。
     */
    export function createImage(): any;
    /**
     * http协议发送信息
     * @param object http信息
     */
    export function request(object: Object): void;
    /**
     * 监听游戏回到前台
     * @param func 回调方法
     */
    export function onShow(func: Function): void;
    /**
     * 监听游戏退到后台
     * @param func 回调方法
     */
    export function onHide(func: Function): void;
    /**
     * 主动拉起转发，进入选择通讯录界面
     * @param object 参数
     */
    export function shareAppMessage(object?: object)
    /**
     * 分包加载
     * @param name 分包名字
     * @param success 成功回调
     * @param fail 失败回调
     * @param compolete 完成回调
     */
    export function loadSubpackage(object: Object);
    export function createUserInfoButton(object: object)
    export function showShareMenu(object: object)
    export function reportUserBehaviorBranchAnalytics(object: object)
    export function createRewardedVideoAd(object: object)
    export function createBannerAd(object: object)
    export function createCustomAd(object: object)
    export function getMenuButtonBoundingClientRect()
    export function aldSendEvent(eventName: string, object?: object)
    export function requestSubscribeSystemMessage(object: object)
    export function requestSubscribeMessage(object: object)
    export function onTouchEnd(callback: Function)
    export function offTouchEnd(callback: Function)
    /**阿拉丁埋点 关卡分析接口 */
    export function aldStage(): aldStage;
    export class aldStage {
        static onStart(object: object) { }
        static onRunning(object: object) { }
        static onEnd(object: object) { }
    }
    export const tmSDK: any;
    /**
     * 创建 grid(格子) 广告组件
     * @param object 
     */
    export function createGridAd(object: object)
    /**
     * 嗨鹿SDK广告数据拉取
     * @param object 
     */
    export function h_GetAdvListPlat(object: object)
    /**
     * 嗨鹿SDK广告跳转上报
     * @param object 
     */
    export function h_ToMinProgram(object: object)
    /**
     * 手机短振动
     * @param type 振动类型
     */
    export function vibrateShort(type: string)
    /**
     * 手机长振动
     */
    export function vibrateLong()
    /**
     * 创建插屏
     */
    export function createInterstitialAd(object: object)
    export function setClipboardData(object: object)
    export function getClipboardData(object: object)
    export function showToast(object: object)
    /**
     * 创建小游戏推荐 icon 组件。请通过 wx.getSystemInfoSync() 返回对象的 SDKVersion 判断基础库版本号 >= 2.8.2 后再使用该 API。每次调用该方法都会返回一个全新的实例。
     */
    export function createGameIcon(Object: object, Object: styleItem)
    export function getSystemInfoSync()
    export function navigateToMiniProgram(Object: object)
    export function createGameClubButton(Object: object)
}

/**
 * 托管数据
 */
declare type UserGameData = {
    avatarUrl: string;
    nickname: string;
    openid: string;
    KVDataList: KVData[];
}

/**
 * 托管的 KV 数据
 */
declare type KVData = {
    key: string;
    value: string;
}

/**
 * 用户信息
 */
declare type FriendInfo = {
    avatarUrl: string;
    nickname: string;
    openid: string;
}