import PlayerCacheCtrl from "../ctrl/PlayerCacheCtrl";
import ResPathKey from "../config/ResPathKey";


export default class AudioManager {

    private static _instance: AudioManager = null;
    private _audios: any = {};

    public static getInstance() {
        if (!this._instance) {
            this._instance = new AudioManager();
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

    }

    private _destroy() {

    }

    /**
     * 背景音乐的audioId
     */
    private bgmAudioId:number = null;

    /**
     * 播放bgm
     * @param loop 
     */
      public async playBgm() {
        this.playBundleAudio(ResPathKey.BGM,true,"bgm");
    }

    /**
     * 播放通用按钮音效
     * @param loop 
     */
    public async playCommonBtn(loop:boolean=false) {
        this.playBundleAudio(ResPathKey.COMMON_BUTTON,loop);
    }

    /**
     * 播放通用升级音效
     * @param loop 
     */
    public async playLevelUp(loop:boolean=false) {
        this.playBundleAudio(ResPathKey.COMMON_LEVEL_UP,loop);
    }
    
    /**
     * 播放加载音效
     * @param loop 
     */
     public async playLoading(loop:boolean=false) {
        this.playAudio(ResPathKey.LOADING,loop);
    }
    
    /**
     * 播放怪物受伤音效
     * @param loop 
     */
     public async playBeHit(loop:boolean=false) {
        this.playBundleAudio(ResPathKey.MONSTER_BE_HIT,loop);
    }
    
    /**
     * 播放玩家攻击音效
     * @param loop 
     */
     public async playGeneralAtk(loop:boolean=false) {
        this.playBundleAudio(ResPathKey.GENERAL_ATK,loop);
    }

    /**
     * 播放BOSS来袭音效
     * @param loop 
     */
     public async playBossComming(loop:boolean=false) {
        AudioManager.getInstance().playBundleAudio(ResPathKey.BOSS_COMMING, false);
    }

    /**
     * 播放召唤音效
     * @param loop 
     */
     public async playCall(loop:boolean=false) {
        AudioManager.getInstance().playBundleAudio(ResPathKey.CALL,false);
    }

    /**
     * 播放获得资源音效
     * @param loop 
     */
     public async playGainReward(loop:boolean=false) {
        AudioManager.getInstance().playBundleAudio(ResPathKey.GAIN_REWARD, false);
    }

    /**
     * 播放转盘音效
     * @param loop 
     */
     public async playTurntable(loop:boolean=false) {
        AudioManager.getInstance().playBundleAudio(ResPathKey.TURNTABLE, false);
    }

    /**
     * 播放新事物音效
     * @param loop 
     */
     public async playNews(loop:boolean=false) {
        AudioManager.getInstance().playBundleAudio(ResPathKey.NEWS, false);
    }

    /**
     * 播放技能音效
     * @param audioPath 音效路径
     * @param loop 
     */
     public async playSkillAudio(audioPath:string, loop:boolean=false) {
        if(audioPath == null) {
            return;
        }

        AudioManager.getInstance().playBundleAudio(audioPath, false);
    }

     /**
     * 播放音频
     * @param path 音频路径
     * @param loop 是否循环播放
     */
      public async playAudio(path,loop,type:string="audio") {
        // 获取玩家系统设置
        let playerSettingInfo = PlayerCacheCtrl.getInstance().getPlayerSettingInfo();
        if(!playerSettingInfo[type]) {
            return;
        }


        let audioClip = await this.getAudioClip(path);
        if(audioClip == null) {
            return;
        }

        let volume = 1;

        cc.audioEngine.play(audioClip,loop,volume);
    }

    /**
     * 播放音频 (分包)
     * @param path 音频路径
     * @param loop 是否循环播放
     * @param type 类型 bgm-音乐 / audio-音效
     */
    public async playBundleAudio(path,loop,type:string="audio") {
        // 获取玩家系统设置
        let playerSettingInfo = PlayerCacheCtrl.getInstance().getPlayerSettingInfo();
        if(!playerSettingInfo[type]) {
            return;
        }

        let audioClip = await this.loadBundleAudioClip(path);
        if(audioClip == null) {
            return;
        }

        let volume = 1;

        let audioId = cc.audioEngine.play(audioClip,loop,volume);
        if(type == "bgm") {
            this.bgmAudioId = audioId;
        }
    }

    /**
     * 停止背景音乐
     */
    public async stopBgm() {
        cc.audioEngine.stop(this.bgmAudioId);
    }

    /**
     * 停止所有音频
     */
    public async stopAllAudio() {
        cc.audioEngine.stopAll();
    }

    /**
     * 初始加载音频
     */
    public async initAllAudioClip() {
        this.loadBundleAudioClip(ResPathKey.BGM);
        this.loadBundleAudioClip(ResPathKey.CALL);
        this.loadBundleAudioClip(ResPathKey.GENERAL_ATK);
        this.loadBundleAudioClip(ResPathKey.MONSTER_BE_HIT);
        this.loadBundleAudioClip(ResPathKey.COMMON_LEVEL_UP);
        this.loadBundleAudioClip(ResPathKey.BOSS_COMMING);
        this.loadBundleAudioClip(ResPathKey.COMMON_BUTTON);
        this.loadBundleAudioClip(ResPathKey.GAIN_REWARD);
        this.getAudioClip(ResPathKey.LOADING);
    }

    public async getAudioClip(path: string, superior: string = ""): Promise<cc.AudioClip> {
        return new Promise<cc.AudioClip>((resolve, reject) => {
            if (this._audios[path]) {

                resolve(this._audios[path]);
                return;
            }
            cc.resources.load(path, cc.AudioClip, (err, prefab) => {
                if (err) {
                    cc.log("getObjectNode err", err);
                    resolve(null);
                    return;
                }
                this._audios[path] = prefab;
                prefab.addRef()
                resolve(prefab as cc.AudioClip);
            });
        });
    }


    
    private async loadBundleAudioClip(path: string): Promise<cc.AudioClip> {
        return new Promise<cc.AudioClip>((resolve, reject) => {
            if (this._audios[path]) {
                resolve(this._audios[path]);
                return;
            }
            let bundle = cc.assetManager.getBundle("fenbao");
            if (!bundle) {
                cc.warn("fenbao分包还没加载,图片路径", path);
                resolve(null);
                return;
            }
            bundle.load(path, cc.AudioClip, (err, audioClip) => {
                if (err) {
                    cc.warn("loadSpriteFrame err", path, err);
                    resolve(null);
                    return;
                }
                this._audios[path] = audioClip;
                audioClip.addRef()
                resolve(audioClip as cc.AudioClip);
            });
        });
    }
}
