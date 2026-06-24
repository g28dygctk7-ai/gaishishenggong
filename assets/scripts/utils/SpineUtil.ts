

//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
//网页客服 http://web3incubators.com/kefu.html
export default class SpineUtil {
    private _skeletonDatas: any = {};
    private _superior: any = {};
    private _soldierBundle = null

    private static _instance: SpineUtil = null;
    public static getInstance() {
        if (!this._instance) {
            this._instance = new SpineUtil();
        }
        return this._instance;
    }

    private _isNull(arg) {
        return arg == null || arg == undefined;
    }

    private _getSkeletonData(name: string, superior: string): sp.SkeletonData {
        if (this._skeletonDatas[name]) {
            // cc.log("_getSpriteFarme",name);
            this._addSuperiorData(name, superior);
            return this._skeletonDatas[name];
        }

        return null;
    }

    private _addSuperiorData(path: string, superior: string) {
        if (this._isNull(this._superior[superior])) {
            this._superior[superior] = {};
        }
        if (this._isNull(this._superior[superior][path])) {
            this._superior[superior][path] = true;
        }
    }

    private _checkSuperior(superior: string) {
        let clearList: string[] = [];
        if (this._isNull(this._superior[superior])) {
            return clearList;
        }
        for (let skey in this._superior[superior]) {
            let isHave = false;
            for (let key in this._superior) {
                if (key == superior) {
                    continue;
                }
                for (let kk in this._superior[key]) {
                    if (kk == skey) {
                        isHave = true;
                        break;
                    }
                }
                if (isHave) {
                    break;
                }
            }
            if (!isHave) {
                clearList.push(skey);
            }
        }
        return clearList;
    }

    private _checkPathSuperior(path: string, superior: string) {
        let clearList: string[] = [];
        if (this._isNull(this._superior[superior])) {
            return clearList;
        }
        let isHave = false;
        for (let key in this._superior) {
            if (key == superior) {
                continue;
            }
            for (let kk in this._superior[key]) {
                if (kk == path) {
                    isHave = true;
                    break;
                }
            }
        }
        if (!isHave) {
            clearList.push(path);
        }
        return clearList;
    }

    public preloadSkeletonData(path: string, superior: string, cb: Function) {
        if (this._skeletonDatas[path]) {
            this._addSuperiorData(path, superior);
            cb(path + "*@*" + superior);
            // cc.log("preloadSkeletonData have ", path);
            return;
        }
        cc.resources.load(path, sp.SkeletonData, (err, skeletonData) => {
            if (err) {
                cc.log("loadSkeletonData err", err);
                cb(path + "*@*" + superior);
                return;
            }
            // cc.log("preloadSkeletonData have ", path);
            this._skeletonDatas[path] = skeletonData;
            this._addSuperiorData(path, superior);
            skeletonData.addRef()
            cb(path + "*@*" + superior);
        })
    }

    public async loadBundleSkeletonData(path: string, superior: string = ""): Promise<sp.SkeletonData> {
        return new Promise<sp.SkeletonData>((resolve, reject) => {
            if (this._skeletonDatas[path]) {
                // cc.log("loadskeletonData have ", path);
                this._addSuperiorData(path, superior);
                resolve(this._skeletonDatas[path]);
                return;
            }
            let bundle = cc.assetManager.getBundle("fenbao");
            bundle.load(path, sp.SkeletonData, (err, skeletonData) => {
                if (err) {
                    // cc.warn("loadskeletonData err", err);
                    resolve(null);
                    return;
                }
                this._skeletonDatas[path] = skeletonData;
                // cc.log("loadskeletonData nononohave ",path);
                this._addSuperiorData(path, superior);
                skeletonData.addRef()
                resolve(skeletonData as sp.SkeletonData);
            });
        });
    }

    public async loadSkeletonData(path: string, superior: string = ""): Promise<sp.SkeletonData> {
        return new Promise<sp.SkeletonData>((resolve, reject) => {
            if (this._skeletonDatas[path]) {
                cc.log("loadskeletonData have ", path);
                this._addSuperiorData(path, superior);
                resolve(this._skeletonDatas[path]);
                return;
            }
            cc.resources.load(path, sp.SkeletonData, (err, skeletonData) => {
                if (err) {
                    cc.warn("loadskeletonData err", err);
                    resolve(null);
                    return;
                }
                this._skeletonDatas[path] = skeletonData;
                // cc.log("loadskeletonData nononohave ",path);
                this._addSuperiorData(path, superior);
                skeletonData.addRef()
                resolve(skeletonData as sp.SkeletonData);
            });
        });
    }

    public async getBundleSkeletonData(name: string, superior: string = "") {
        // return this._getSpriteFarme(name);
        let sf: sp.SkeletonData = await this.loadBundleSkeletonData(name, superior);
        if (sf) {
            return sf;
        }
        return await this.loadSkeletonData(name, superior);
    }

    public async getSkeletonData(name: string, superior: string = "") {
        // return this._getSpriteFarme(name);
        let sf: sp.SkeletonData = this._getSkeletonData(name, superior);
        if (sf) {
            return sf;
        }
        return await this.loadSkeletonData(name, superior);
    }

    /**
     * 播放spine动画回调接口
     * @param spine  动画
     * @param listener 
     * @param name 
     * @param loop boolen 默认不循环
     * @param hideOnComplete bool 默认隐藏
     * @returns 
     */
    public playSpineAni(spine: sp.Skeleton, listener: any = null, name: string = "", loop: boolean = false, hideOnComplete: boolean = true) {
        if (spine == null || !spine.isValid) {
            // if(Global.showLog == true)
            cc.warn("spine 动画为空", name);
            return;
        }
        if (!name) {
            cc.warn("spine 动画名为空", spine.skeletonData.name, spine.node.name);
            return;
        }
        // spine.node.active = false;
        // spine.node.active = true;

        if (!spine.isAnimationCached()) {
            spine.clearTracks();
        }
        spine.setToSetupPose();
        spine.setAnimation(0, name, loop);
        // spine.animation = name;
        // spine.loop = loop;

        spine.setCompleteListener(() => {
            if (hideOnComplete) {
                spine.node.active = false;
                // spine.node.opacity = 0;
            }

            if (listener != null) {
                listener();
            }
        });
    }

    /**
     * 播放spine动画随机起始时间回调接口
     * @param spine  动画
     * @param listener 
     * @param name 
     * @param startdt 起始时间，0到1之间，(0,1) // 小于等于0 或 大于等于1 为随机起始时间
     * @param loop boolen 默认不循环
     * @param hideOnComplete bool 默认隐藏
     * @returns 
     */
    public playSpineAniByStart(spine: sp.Skeleton, listener: any = null, name: string = "", startdt: number = 0, loop: boolean = false, hideOnComplete: boolean = true) {
        if (spine == null || !spine.isValid) {
            // if(Global.showLog == true)
            cc.warn("spine 动画为空", name);
            return;
        }
        if (!name) {
            cc.warn("spine 动画名为空", spine.node.name);
            return;
        }
        // spine.node.active = false;
        // spine.node.active = true;

        if (!spine.isAnimationCached()) {
            spine.clearTracks();
        }
        spine.setToSetupPose();
        let track: sp.spine.TrackEntry = spine.setAnimation(0, name, loop);
        if (!track && spine.isAnimationCached()) {
            track = spine.getCurrent(0);
        }
        if (startdt <= 0 || startdt >= 1) {
            track.animationStart = Math.random();
        } else {
            track.animationStart = startdt;
        }
        // spine.animation = name;
        // spine.loop = loop;

        spine.setCompleteListener(() => {
            track.animationStart = 0;
            if (hideOnComplete) {
                spine.node.active = false;
                // spine.node.opacity = 0;
            }

            if (listener != null) {
                listener();
            }
        });
    }

    public clearObject(path: string, superior: string) {
        let clearList = this._checkPathSuperior(path, superior);
        if (this._superior[superior] && this._superior[superior][path]) {
            delete this._superior[superior][path];
        }
        for (let i = 0; i < clearList.length; ++i) {
            if (this._skeletonDatas[clearList[i]]) {
                this._skeletonDatas[clearList[i]].decRef()
                delete this._skeletonDatas[clearList[i]];
            }
        }
        // MemoryManager.getInstance().removeMeoryAsset(clearList);
    }

    public clearSuperiorObject(superior: string) {
        let clearList = this._checkSuperior(superior);
        if (this._superior[superior]) {
            delete this._superior[superior];
        }
        for (let i = 0; i < clearList.length; ++i) {
            if (this._skeletonDatas[clearList[i]]) {
                this._skeletonDatas[clearList[i]].decRef()
                delete this._skeletonDatas[clearList[i]];
            }
        }
        // MemoryManager.getInstance().removeMeoryAsset(clearList);
    }

    public clearAllSuperiorObject() {
        for (const key in this._superior) {
            this.clearSuperiorObject(key);

            delete this._superior[key];
        }

        // MemoryManager.getInstance().removeMeoryAsset(clearList);
    }
}
