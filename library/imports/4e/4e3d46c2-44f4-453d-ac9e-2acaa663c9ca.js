"use strict";
cc._RF.push(module, '4e3d4bCRPRFPayeKsqmY8nK', 'WxSdkUtil');
// scripts/utils/WxSdkUtil.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var PlatformUtil_1 = require("../utils/PlatformUtil");
var WxAdUtil_1 = require("./WxAdUtil");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SdkCtrl = /** @class */ (function () {
    function SdkCtrl() {
        this._userInfo = null;
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
    SdkCtrl_1 = SdkCtrl;
    SdkCtrl.getInstance = function () {
        if (!this._instance) {
            this._instance = new SdkCtrl_1();
            this._instance._init();
        }
        return this._instance;
    };
    SdkCtrl.prototype._init = function () {
    };
    SdkCtrl.prototype.ShowRewardedVideoAd = function (successFun, failFun, isbigAD) {
        if (failFun === void 0) { failFun = function () { }; }
        if (isbigAD === void 0) { isbigAD = false; }
        var pingtai = PlatformUtil_1.default.getPlatform();
        switch (pingtai) {
            case PlatformUtil_1.default.Platform.wx:
                {
                    WxAdUtil_1.default.Instance.OnShowRewardedVideoAdFail = function () {
                        // Logger.debug('----》激励视频广告播放失败 不需要给奖励');
                        if (failFun) {
                            failFun();
                        }
                    };
                    WxAdUtil_1.default.Instance.OnShowRewardedVideoAdSuccess = function () {
                        // Logger.debug('----》激励视频广告播放成功 给奖励');
                        if (successFun) {
                            successFun();
                        }
                    };
                    var wxAdUnitIdEnum = WxAdUtil_1.WxAdUnitIdEnum.MeirijingxuanJinbi1;
                    if (isbigAD) {
                        wxAdUnitIdEnum = WxAdUtil_1.WxAdUnitIdEnum.MeirijingxuanJinbi2;
                    }
                    WxAdUtil_1.default.Instance.ShowRewardedVideoAd(WxAdUtil_1.default.Instance.AdUnitIdMap[wxAdUnitIdEnum]);
                }
                break;
            default:
                // H5平台：展示RoiifyAds横幅广告，点击广告后才给奖励
                //@ts-ignore
                if (typeof window !== 'undefined' && window.RoiifyBanner) {
                    //@ts-ignore
                    window.RoiifyBanner.show();
                    var _this_ = this;
                    var rewarded_1 = false;
                    var giveReward_1 = function () {
                        if (rewarded_1) return;
                        rewarded_1 = true;
                        successFun();
                        //@ts-ignore
                        if (window.RoiifyBanner) {
                            //@ts-ignore
                            window.RoiifyBanner.hide();
                        }
                        // 清理监听
                        var container_1 = document.getElementById('roiify-banner-container');
                        if (container_1) container_1.removeEventListener('click', onAdClick_1);
                        window.removeEventListener('blur', onBlur_1);
                    };
                    var onAdClick_1 = function (e) {
                        // 阻止关闭按钮点击触发奖励
                        if (e.target && e.target.id === 'roiify-close-btn') return;
                        giveReward_1();
                    };
                    var onBlur_1 = function () {
                        // blur兜底：用户点击广告跳转导致窗口失焦
                        giveReward_1();
                    };
                    var container_1 = document.getElementById('roiify-banner-container');
                    if (container_1) container_1.addEventListener('click', onAdClick_1);
                    window.addEventListener('blur', onBlur_1);
                    // 60秒超时兜底，防止用户永不点击
                    setTimeout(function () { giveReward_1(); }, 60000);
                }
                else {
                    successFun();
                }
                break;
        }
    };
    SdkCtrl.prototype.ShowBanner = function () {
        var pingtai = PlatformUtil_1.default.getPlatform();
        switch (pingtai) {
            case PlatformUtil_1.default.Platform.wx:
                WxAdUtil_1.default.Instance.ShowBannerVideoAd(WxAdUtil_1.default.Instance.AdUnitIdMap[WxAdUtil_1.WxAdUnitIdEnum.ZantingBanner]);
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
    };
    SdkCtrl.prototype.HideBanner = function () {
        var pingtai = PlatformUtil_1.default.getPlatform();
        switch (pingtai) {
            case PlatformUtil_1.default.Platform.wx:
                WxAdUtil_1.default.Instance.HideBannerVideoAd(WxAdUtil_1.default.Instance.AdUnitIdMap[WxAdUtil_1.WxAdUnitIdEnum.ZantingBanner]);
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
    };
    /** 获取用户信息 */
    SdkCtrl.prototype.getSetting = function () {
        console.log("获取信息");
        var pingtai = PlatformUtil_1.default.getPlatform();
        switch (pingtai) {
            case PlatformUtil_1.default.Platform.wx:
                {
                    wx.getSetting({
                        success: function (res) {
                            var _this = this;
                            if (res.authSetting['scope.userInfo']) {
                                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                                wx.getUserInfo({
                                    success: function (res) {
                                        console.log("个人信息1", res);
                                        var userInfo = res.userInfo;
                                        //保存数据，进入游戏主界面
                                        this._userInfo = userInfo;
                                    }
                                });
                            }
                            else {
                                // 未授权的要调用 createUserInfoButton 创建按钮引导玩家点击
                                var systemInfo = wx.getSystemInfoSync();
                                var safeArea = systemInfo.safeArea;
                                var button = wx.createUserInfoButton({
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
                                });
                                button.onTap(function (res) {
                                    var userInfo = res.userInfo;
                                    if (res && userInfo) {
                                        //保存数据，进入游戏主界面
                                        _this._userInfo = userInfo;
                                        console.log("个人信息2", res);
                                    }
                                });
                            }
                        }
                    });
                }
                break;
        }
    };
    /** 给好友排行榜发送消息 */
    SdkCtrl.prototype.postMessage = function (score) {
        var pingtai = PlatformUtil_1.default.getPlatform();
        switch (pingtai) {
            case PlatformUtil_1.default.Platform.wx:
                {
                    wx.getOpenDataContext().postMessage({
                        score: score,
                        dayTime: new Date().getTime()
                    });
                }
                break;
        }
    };
    /** 更新好友排行榜 */
    SdkCtrl.prototype.updataFriendList = function () {
        var pingtai = PlatformUtil_1.default.getPlatform();
        switch (pingtai) {
            case PlatformUtil_1.default.Platform.wx:
                {
                    wx.getOpenDataContext().postMessage({});
                }
                break;
        }
    };
    /** 打开另一个小程序 */
    SdkCtrl.prototype.navigateToMiniProgram = function (appId) {
        var pingtai = PlatformUtil_1.default.getPlatform();
        switch (pingtai) {
            case PlatformUtil_1.default.Platform.wx:
                {
                    wx.navigateToMiniProgram({
                        appId: appId,
                        path: 'page/index/index?id=123',
                        extraData: {
                            foo: 'bar'
                        },
                        envVersion: 'develop',
                        success: function (res) {
                            // 打开成功
                        }
                    });
                }
                break;
        }
    };
    /** 创建游戏圈 */
    SdkCtrl.prototype.createGameClubButton = function () {
        var pingtai = PlatformUtil_1.default.getPlatform();
        switch (pingtai) {
            case PlatformUtil_1.default.Platform.wx:
                {
                    var button = wx.createGameClubButton({
                        icon: 'light',
                        style: {
                            left: 10,
                            top: 250,
                            width: 30,
                            height: 30
                        }
                    });
                }
                break;
        }
    };
    /** 打开分享游戏权限 */
    SdkCtrl.prototype.showShareMenu = function () {
        if (PlatformUtil_1.default.getPlatform() == PlatformUtil_1.default.Platform.wx) {
            console.log("微信平台，打开分享权限");
            wx.showShareMenu({
                withShareTicket: true,
                menus: ['shareAppMessage', 'shareTimeline'],
                success: function (res) { },
                fail: function (e) { }
            });
        }
    };
    var SdkCtrl_1;
    SdkCtrl._instance = null;
    SdkCtrl = SdkCtrl_1 = __decorate([
        ccclass
    ], SdkCtrl);
    return SdkCtrl;
}());
exports.default = SdkCtrl;

cc._RF.pop();