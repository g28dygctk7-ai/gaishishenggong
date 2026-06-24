import ActivityConfig from "../config/ActivityConfig";
import AttrLevelConfig from "../config/AttrLevelConfig";
import BossConfig from "../config/BossConfig";
import BossSkillConfig from "../config/BossSkillConfig";
import CallConfig from "../config/CallConfig";
import CdkConfig from "../config/CdkConfig";
import ChallengeConfig from "../config/ChallengeConfig";
import ChapterConfig from "../config/ChapterConfig";
import FightConfig from "../config/FightConfig";
import GeneralConfig from "../config/GeneralConfig";
import GeneralSkillConfig from "../config/GeneralSkillConfig";
import ItemConfig from "../config/ItemConfig";
import MonsterConfig from "../config/MonsterConfig";
import PetConfig from "../config/PetConfig";
import PlayerFightSkillConfig from "../config/PlayerFightSkillConfig";
import PlayerLevelConfig from "../config/PlayerLevelConfig";
import SceneKey from "../config/SceneKey";
import SkillConfig from "../config/SkillConfig";
import TaskConfig from "../config/TaskConfig";
import AudioManager from "../manager/AudioManager";
import UnlockManager from "../manager/UnlockManager";
import SpineUtil from "../utils/SpineUtil";
import SdkCtrl from "../utils/WxSdkUtil";
import PlayerCacheCtrl from "./PlayerCacheCtrl";

const {ccclass, property} = cc._decorator;

/**
 * 进度条
 */
@ccclass
export default class LoadingCtrl extends cc.Component {

    @property({type:cc.ProgressBar,tooltip:'loading进度条'})
    loadingProgress:cc.ProgressBar = null;

    @property({type:cc.Node,tooltip:'点击进入游戏'})
    enterGameTip:cc.Node = null;


    // 10秒
    private _loadingTime:number = 10000;

    private _time:number = 0;

    private _enterGame:boolean = false;

    private _loadingSuccess:boolean = false;

    onLoad() {
        SdkCtrl.getInstance().showShareMenu();
        SdkCtrl.getInstance().createGameClubButton();
        this._init();
    }


    update(dt) {
        if(this._enterGame) {
            this._time += (dt * 1000);
            this._flushProgress();
        }
    }

    /**
     * 进入游戏
     */
    public enterGame() {
        if(this._enterGame) {
            return;
        }

        this.enterGameTip.active = false; // 隐藏点击进入游戏提示
        this.loadingProgress.node.active = true; // 显示进度条
        this._enterGame = true;
        
        AudioManager.getInstance().playLoading();

        this._loadConfig();

        this._loadBundle();
    }


    /**
     * 刷新loading信息
     */
    private _flushProgress() {
        let progress = Math.ceil((this._time / this._loadingTime * 100)) / 100;
        if(progress == this.loadingProgress.progress) {
            return;
        }

        if(this._loadingSuccess) {
            return;
        }

        if(progress >= 1) {
            return;
        }

        let barSprite: cc.Sprite = this.loadingProgress.node.getChildByName("bar").getComponent(cc.Sprite);
        barSprite.fillRange = progress;
        this.loadingProgress.node.getChildByName("num").getComponent(cc.Label).string = Math.floor((progress * 100)) + "%";
        this.loadingProgress.node.getChildByName("tip").getComponent(cc.Label).string = "正在加载资源包...";

    }

    /**
     * 隐藏进度条
     */
    private _init() {
        // 显示点击进入游戏提示
        this.enterGameTip.active = true;

        // 隐藏进度条
        let barSprite: cc.Sprite = this.loadingProgress.node.getChildByName("bar").getComponent(cc.Sprite);
        barSprite.fillRange = 0;
        this.loadingProgress.node.active = false;
    }

    private _loadConfig() {
        CallConfig.loadConfigMap();
        ChallengeConfig.loadConfigMap();
        AttrLevelConfig.loadConfigMap();
        TaskConfig.loadConfigMap();
        GeneralSkillConfig.loadConfigMap();
        GeneralConfig.loadConfigMap();
        ChapterConfig.loadConfigMap();
        MonsterConfig.loadConfigMap();
        SkillConfig.loadConfigMap();
        PetConfig.loadConfigMap();
        ItemConfig.loadConfigMap();
        PlayerLevelConfig.loadConfigMap();
        FightConfig.loadConfigMap();
        BossSkillConfig.loadConfigMap();
        BossConfig.loadConfigMap();
        PlayerFightSkillConfig.loadConfigMap();
        ActivityConfig.loadConfigMap();
        GeneralConfig.loadConfigMap();
        CdkConfig.loadConfigMap();
        PlayerCacheCtrl.getInstance();
    }

    /**
     * 加载分包资源
     */
    private _loadBundle() {
        cc.assetManager.loadBundle('fenbao',async(err,bundle) => {
            cc.log("分包加载完成...");
            this._initAnimation();
            cc.log("角色资源加载完成...");

            // 加载音效
            AudioManager.getInstance().initAllAudioClip();
            
            this._loadingSuccess = true;
            let barSprite: cc.Sprite = this.loadingProgress.node.getChildByName("bar").getComponent(cc.Sprite);
            barSprite.fillRange = 1;
            this.loadingProgress.node.getChildByName("num").getComponent(cc.Label).string = "100%";
            this.loadingProgress.node.getChildByName("tip").getComponent(cc.Label).string = "加载完成";
            cc.director.loadScene(SceneKey.INDEX);
        })
    }

    /**
     * 加载动画
     */
     private async _initAnimation() {
        // 角色的Spine
        for(let i = 0; i < GeneralConfig.CONFIG.length; i++) {
            if(GeneralConfig.CONFIG[i].spine) {
                SpineUtil.getInstance().loadBundleSkeletonData(GeneralConfig.CONFIG[i].spine);
            }
        }
    }
}
