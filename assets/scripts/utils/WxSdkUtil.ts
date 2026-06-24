import PlatformUtil from "../utils/PlatformUtil";
import WxAdUtil, { WxAdUnitIdEnum } from "./WxAdUtil";


const { ccclass, property } = cc._decorator;

@ccclass
export default class SdkCtrl {
    private static _instance: SdkCtrl = null;

    private _userInfo = null
    public static getInstance() {
        if (!this._instance) {
            this._instance = new SdkCtrl();
            this._instance._init();
        }
        return this._instance;
    }

    private _init() {

    }

    ShowRewardedVideoAd(successFun: Function, failFun: Function = () => { }, isbigAD: boolean = false) {
        let pingtai = PlatformUtil.getPlatform()
        switch (pingtai) {
            case PlatformUtil.Platform.wx:
                {
                    WxAdUtil.Instance.OnShowRewardedVideoAdFail = () => {
                        // Logger.debug('----》激励视频广告播放失败 不需要给奖励');
                        if (failFun) {
                            failFun()
                        }
                    }
                    WxAdUtil.Instance.OnShowRewardedVideoAdSuccess = () => {
                        // Logger.debug('----》激励视频广告播放成功 给奖励');
                        if (successFun) {
                            successFun()
                        }
                    }
                    let wxAdUnitIdEnum = WxAdUnitIdEnum.MeirijingxuanJinbi1
                    if (isbigAD) {
                        wxAdUnitIdEnum = WxAdUnitIdEnum.MeirijingxuanJinbi2
                    }
                    WxAdUtil.Instance.ShowRewardedVideoAd(WxAdUtil.Instance.AdUnitIdMap[wxAdUnitIdEnum]);
                }
                break;
            default:
                // H5平台：无激励视频广告，直接给奖励
                successFun();
                break;
        }
    }

    ShowBanner() {
        let pingtai = PlatformUtil.getPlatform()
        switch (pingtai) {
            case PlatformUtil.Platform.wx:
                WxAdUtil.Instance.ShowBannerVideoAd(WxAdUtil.Instance.AdUnitIdMap[WxAdUnitIdEnum.ZantingBanner]);
                break;
            default:
                // H5平台：RoiifyAds 横幅广告
                //@ts-ignore
                if (typeof window !== 'undefined' && window.RoiifyBanner) {
                    //@ts-ignore
                    window.RoiifyBanner.show();
                }
                break;
        }
    }

    HideBanner() {
        let pingtai = PlatformUtil.getPlatform()
        switch (pingtai) {
            case PlatformUtil.Platform.wx:
                WxAdUtil.Instance.HideBannerVideoAd(WxAdUtil.Instance.AdUnitIdMap[WxAdUnitIdEnum.ZantingBanner]);
                break;
            default:
                // H5平台：RoiifyAds 横幅广告
                //@ts-ignore
                if (typeof window !== 'undefined' && window.RoiifyBanner) {
                    //@ts-ignore
                    window.RoiifyBanner.hide();
                }
                break;
        }
    }

    /** 获取用户信息 */
    getSetting() {
        console.log("获取信息");
        let pingtai = PlatformUtil.getPlatform()
        switch (pingtai) {
            case PlatformUtil.Platform.wx:
                {
                    wx.getSetting({
                        success(res) {
                            if (res.authSetting['scope.userInfo']) {
                                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                                wx.getUserInfo({
                                    success: function (res) {
                                        console.log("个人信息1", res);
                                        const userInfo = res.userInfo;
                                        //保存数据，进入游戏主界面
                                        this._userInfo = userInfo
                                    }
                                })
                            } else {
                                // 未授权的要调用 createUserInfoButton 创建按钮引导玩家点击
                                const systemInfo = wx.getSystemInfoSync();
                                const safeArea = systemInfo.safeArea;
                                const button = wx.createUserInfoButton({
                                    type: 'text',
                                    text: '授权登录',
                                    style: {
                                        left: safeArea.left,
                                        top: (safeArea.top - safeArea.height / 2 - 25),
                                        width: safeArea.width,
                                        height: 50,
                                        lineHeight: 50,
                                        backgroundColor: '#90ef62',
                                        color: '#ffffff',
                                        textAlign: 'center',
                                        fontSize: 20,
                                        borderRadius: 5
                                    }
                                })
                                button.onTap((res) => {
                                    const userInfo = res.userInfo;
                                    if (res && userInfo) {
                                        //保存数据，进入游戏主界面
                                        this._userInfo = userInfo
                                        console.log("个人信息2", res);
                                    }
                                })
                            }
                        }
                    })
                }
                break;
        }

    }

    /** 给好友排行榜发送消息 */
    postMessage(score: number) {
        let pingtai = PlatformUtil.getPlatform()
        switch (pingtai) {
            case PlatformUtil.Platform.wx:
                {
                    wx.getOpenDataContext().postMessage({
                        score: score,
                        dayTime: new Date().getTime()
                    });
                }
                break;
        }
    }

    /** 更新好友排行榜 */
    updataFriendList() {
        let pingtai = PlatformUtil.getPlatform()
        switch (pingtai) {
            case PlatformUtil.Platform.wx:
                {
                    wx.getOpenDataContext().postMessage({});
                }
                break;
        }
    }

    /** 打开另一个小程序 */
    navigateToMiniProgram(appId: string) {
        let pingtai = PlatformUtil.getPlatform()
        switch (pingtai) {
            case PlatformUtil.Platform.wx:
                {
                    wx.navigateToMiniProgram({
                        appId: appId,
                        path: 'page/index/index?id=123',
                        extraData: {
                            foo: 'bar'
                        },
                        envVersion: 'develop',
                        success(res) {
                            // 打开成功
                        }
                    })
                }
                break;
        }
    }

    /** 创建游戏圈 */
    createGameClubButton() {
        let pingtai = PlatformUtil.getPlatform()
        switch (pingtai) {
            case PlatformUtil.Platform.wx:
                {
                    let button = wx.createGameClubButton({
                        icon: 'light',
                        style: {
                            left: 10,
                            top: 250,
                            width: 30,
                            height: 30
                        }
                    })
                }
                break;
        }
    }

    /** 打开分享游戏权限 */
    showShareMenu() {
        if (PlatformUtil.getPlatform() == PlatformUtil.Platform.wx) {
            console.log("微信平台，打开分享权限");
            wx.showShareMenu({
                withShareTicket: true,
                menus: ['shareAppMessage', 'shareTimeline'],
                success(res) { },
                fail(e) { }
            })
        }
    }

    /** 主动分享 */
    // shareAppMessage(fun: Function = null) {
    //     if (fun) {
    //         GameData.showGameEvent.push(fun)
    //     }
    //     if (PlatformUtil.getPlatform() == PlatformUtil.Platform.wx) {
    //         var id = '' // 通过 MP 系统审核的图片编号
    //         var url = '' // 通过 MP 系统审核的图片地址
    //         let titleList = ["超级解压的割草游戏", "欢乐割草，快乐无限", "全名修仙"]
    //         wx.shareAppMessage({
    //             title: titleList[Math.floor(Math.random() * titleList.length)],
    //             // imageUrlId: id,
    //             // imageUrl: url
    //         })
    
    //         wx.onShareAppMessage(function () {
    //             return {
    //                 title: titleList[Math.floor(Math.random() * titleList.length)],
    //                 // imageUrlId: id,
    //                 // imageUrl: url
    //             }
    //         })
    //     }
    // }
}
