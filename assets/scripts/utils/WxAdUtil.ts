export enum WxAdPosEnum {
    WX_AD_POS_CENTER = 0,
    WX_AD_POS_BOTTOM = 1,
    WX_AD_POS_TOP = 2,
    WX_AD_POS_LEFT = 3,
    WX_AD_POS_RIGHT = 4,
    /**
     * 中间靠下的位置 只有Banner广告可以放到此位置
     */
    WX_AD_POS_CENTER_BOTTOM = 5,
}

export enum WxAdTypeEnum {
    /**
     * Banner广告
     */
    WX_AD_TYPE_BANNER = 1,
    // WX_AD_TYPE_VIDEO = 2,
    /**
     * 激励广告
     */
    WX_AD_TYPE_REWARD = 3,
    // WX_AD_TYPE_NATIVE = 4,
    // WX_AD_TYPE_INSERT = 5,
    // WX_AD_TYPE_INTERSTITIAL = 6,
    // WX_AD_TYPE_OFFERWALL = 7,
    // WX_AD_TYPE_GRID = 8,
    // WX_AD_TYPE_CUSTOM = 9,
    // WX_AD_TYPE_MAX = 10,
}
export enum WxAdUnitIdEnum {
    Test = 0,
    MeirijingxuanJinbi1 = 10,
    MeirijingxuanJinbi2 = 11,
    MeirijingxuanJinbi3 = 12,
    /**
     * 暂停界面banner广告
     */
    ZantingBanner = 50,
}
export class WxAdItem {
    /**
     * 广告unitid
     *
     * @type {string}
     * @memberof WxAdItem
     */
    public unitId: string;
    /**
     * 广告id
     *
     * @type {number}
     * @memberof WxAdItem
     */
    public adId: number;
    /**
     * 广告名称
     *
     * @type {string}
     * @memberof WxAdItem
     */
    public adName: string;
    /**
     * 广告描述
     *
     * @type {string}
     * @memberof WxAdItem
     */
    public adDesc: string;
    /**
     * 激励广告
     *
     * @type {wx.RewardedVideoAd}
     * @memberof WxAdItem
     */
    public rewardedVideoAd: wx.RewardedVideoAd;
    /**
     * banner广告
     *
     * @type {wx.BannerAd}
     * @memberof WxAdItem
     */
    public bannerVideoAd: wx.BannerAd;
    public adType: WxAdTypeEnum;
    public loaded = false;

    constructor(unitId: string, adId: number, adName: string, adDesc: string, adType: WxAdTypeEnum, adPos: WxAdPosEnum = WxAdPosEnum.WX_AD_POS_CENTER) {
        this.unitId = unitId;
        this.adId = adId;
        this.adName = adName;
        this.adDesc = adDesc;

        switch (adType) {
            case WxAdTypeEnum.WX_AD_TYPE_REWARD:

                //添加进来的时候就要加载这个广告
                this.rewardedVideoAd = wx.createRewardedVideoAd({ adUnitId: this.unitId })
                this.rewardedVideoAd.onLoad(() => {
                    console.log("激励广告 onLoad OK");
                    this.loaded = true;
                });
                break;

            case WxAdTypeEnum.WX_AD_TYPE_BANNER:


                let adTopAndLeft = this.GetTopAndLeft(adPos);
                this.bannerVideoAd = wx.createBannerAd({
                    adUnitId: unitId,
                    adIntervals: 30, // 自动刷新频率不能小于30秒
                    style: {
                        left: adTopAndLeft.left,
                        top: adTopAndLeft.top,
                        width: 300,
                        height: 80,
                    }
                });
                this.bannerVideoAd.onLoad(() => {
                    console.log('banner广告 onLoad OK')
                    this.loaded = true;
                });
                break;
            default:
                break;
        }
    }

    /**
     * 获取距离顶部和左边的距离
     *
     * @private
     * @param {WxAdPosEnum} adPos
     * @return {*}  {{ top: number, left: number }}
     * @memberof WxAdItem
     */
    private GetTopAndLeft(adPos: WxAdPosEnum): { top: number, left: number } {
        //拿到当前设备宽度
        let systemInfo = wx.getSystemInfoSync();
        let screenWidth = systemInfo.screenWidth;
        let screenHeight = systemInfo.screenHeight;
        let top = 0;
        let left = 0;
        switch (adPos) {
            // case WxAdPosEnum.WX_AD_POS_CENTER:
            //     top = (screenHeight - 100) / 2;
            //     left = (screenWidth - 300) / 2;
            //     break;
            // case WxAdPosEnum.WX_AD_POS_BOTTOM:
            //     top = 0;
            //     left = 0;
            //     break;
            case WxAdPosEnum.WX_AD_POS_CENTER_BOTTOM:
                top = screenHeight - 110;
                left = (screenWidth / 2) - 150;
                break;
            default: break;
        }
        return { top: top, left: left };
    }
}
/**
 * Wx广告管理器
 *
 * @export
 * @class WxAdManager
 */
export default class WxAdManager {
    //#region 单例
    private static _instance: WxAdManager;
    public static get Instance(): WxAdManager {
        if (WxAdManager._instance == null) {
            WxAdManager._instance = new WxAdManager();
        }
        return this._instance;
    }
    //#endregion

    /**
     * 所有UnitIdMap的字典
     *
     * @type {{ [key: number]: string }}
     * @memberof WxAdManager
     */
    AdUnitIdMap: { [key: number]: WxAdItem } = {
        
        [WxAdUnitIdEnum.MeirijingxuanJinbi1]: new WxAdItem('adunit-48bfc187bc01e6f8', WxAdUnitIdEnum.MeirijingxuanJinbi1, '每日奖励1', '点击每日奖励1', WxAdTypeEnum.WX_AD_TYPE_REWARD),
        [WxAdUnitIdEnum.MeirijingxuanJinbi2]: new WxAdItem('adunit-48bfc187bc01e6f8', WxAdUnitIdEnum.MeirijingxuanJinbi2, '每日奖励2', '点击每日奖励2', WxAdTypeEnum.WX_AD_TYPE_REWARD),
        [WxAdUnitIdEnum.MeirijingxuanJinbi3]: new WxAdItem('adunit-48bfc187bc01e6f8', WxAdUnitIdEnum.MeirijingxuanJinbi3, '每日奖励3', '点击每日奖励3', WxAdTypeEnum.WX_AD_TYPE_REWARD),


        [WxAdUnitIdEnum.ZantingBanner]: new WxAdItem('adunit-dfca1ebf175ea37d', WxAdUnitIdEnum.ZantingBanner, '暂停界面', '点击暂停出现的Banner', WxAdTypeEnum.WX_AD_TYPE_BANNER, WxAdPosEnum.WX_AD_POS_CENTER_BOTTOM),
    }

    /**
     * 当显示广告失败回调
     *
     * @memberof WxAdManager
     */
    OnShowRewardedVideoAdFail = null;

    /**
     * 当显示广告结束回调
     *
     * @memberof WxAdManager
     */
    OnShowRewardedVideoAdSuccess = null;

    /**
     * 显示一个Banner广告
     *
     * @param {WxAdItem} wxAdwItem
     * @memberof WxAdManager
     */
    public ShowBannerVideoAd(wxAdwItem: WxAdItem) {
        console.log("展示banner");
        wxAdwItem.bannerVideoAd.show();
    }
    /**
     * 隐藏一个广告
     *
     * @param {WxAdItem} wxAdwItem
     * @memberof WxAdManager
     */
    public HideBannerVideoAd(wxAdwItem: WxAdItem) {
        console.log("关闭banner");
        wxAdwItem.bannerVideoAd.hide();
    }

    /**
     * 显示激励广告
     *
     * @param {*} videoAd
     * @memberof WxAdManager
     */
    public ShowRewardedVideoAd(wxAdwItem: WxAdItem) {
        // if (cc.sys.platform != cc.sys.WECHAT_GAME) {
        //     return;
        // }
        wxAdwItem.rewardedVideoAd.onLoad(() => {
            console.log('激励视频 广告加载成功');
        });
        wxAdwItem.rewardedVideoAd.onError(err => {
            console.log("激励视频 " + err);
            if (this.OnShowRewardedVideoAdFail != null) {
                this.OnShowRewardedVideoAdFail();
                this.OnShowRewardedVideoAdFail = null;
            }
            return;
        })
        wxAdwItem.rewardedVideoAd.show().catch(() => {
            // 失败重试
            wxAdwItem.rewardedVideoAd.load()
                .then(() => wxAdwItem.rewardedVideoAd.show())
                .catch(err => {
                    console.log('激励视频 广告显示失败,可能是没加载出来')
                    if (this.OnShowRewardedVideoAdFail != null) {
                        this.OnShowRewardedVideoAdFail();
                        this.OnShowRewardedVideoAdFail = null;
                    }
                    return;
                })
        });
        wxAdwItem.rewardedVideoAd.onClose(res => {
            // 用户点击了【关闭广告】按钮
            // 小于 2.1.0 的基础库版本，res 是一个 undefined
            if (res && res.isEnded || res === undefined) {
                // 正常播放结束，可以下发游戏奖励
                console.log('激励视频 广告播放完毕');
                if (this.OnShowRewardedVideoAdSuccess != null) {
                    this.OnShowRewardedVideoAdSuccess();
                    this.OnShowRewardedVideoAdSuccess = null;
                }

            } else {
                // 播放中途退出，不下发游戏奖励
                console.log('激励视频 广告播放中途退出');
                if (this.OnShowRewardedVideoAdFail != null) {
                    this.OnShowRewardedVideoAdFail();
                    this.OnShowRewardedVideoAdFail = null;
                }
                return;
            }
        });
    }
}
