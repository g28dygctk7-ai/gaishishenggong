import PlayerCacheCtrl from "../ctrl/PlayerCacheCtrl";

const {ccclass, property} = cc._decorator;

/**
 * 全局处理
 */
@ccclass
export default class GlobalCtrl extends cc.Component {

    private static _instance: GlobalCtrl = null;

    private lastGainExpTime: number = null;

    public static getInstance() {
        if (!this._instance) {
            this._instance = new GlobalCtrl();
            this._instance._init();
        }
        
        return this._instance;
    }

    public static destroyInstance() {
        if (this._instance) {
            this._instance._destroy();
            delete this._instance;
            this._instance = null;
        }
    }

    private _init() {
        this._initConfig();
        this._initAnimation();
    }

    /**
     * 加载配置文件
     */
    private _initConfig() {
    }

    /**
     * 加载动画
     */
    private async _initAnimation() {
        // // 角色的Spine
        // for(let i = 0; i < GeneralConfig.CONFIG.length; i++) {
        //     if(GeneralConfig.CONFIG[i].spine) {
        //         SpineUtil.getInstance().loadSkeletonData(GeneralConfig.CONFIG[i].spine);
        //     }
        // }
    }

    private _destroy() { }

    private checkPlayerGainExpInterval:number = 3000; // 检查玩家是否可以获得经验间隔时间,毫秒

    private lastCheckPlayerGainExpTime:number = 0; // 上一次检查玩家是否可以获得经验时间

    start () {

    }

    update (dt) {
        // cc.log("globalCtrl还在运行....");

        // 玩家是否可以获得经验
        // if(this.lastCheckPlayerGainExpTime + this.checkPlayerGainExpInterval < new Date().getTime()) {
        //     this.checkPlayerGainExp();
        // }
    
    }

    /**
     * 玩家是否可以获得经验
     */
    checkPlayerGainExp() {
        let nowTime = new Date().getTime();
        let lastGainExpTime:number = PlayerCacheCtrl.getInstance().getPlayerGainExpTime();
        if(lastGainExpTime < nowTime) {
            // 增加经验
            PlayerCacheCtrl.getInstance().addPlayerExp(1);
        }
        this.lastCheckPlayerGainExpTime = nowTime;
    }
}
 