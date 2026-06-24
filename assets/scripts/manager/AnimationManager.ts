

export default class AnimationManger extends cc.Component{

    private static _instance: AnimationManger = null;
    private _clips: any = {};

    public static getInstance() {
        if (!this._instance) {
            this._instance = new AnimationManger();
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

    public async setAnimationClipsByName(animation: cc.Animation, address: string) {
        if (!animation) {
            return;
        }
        if (!Boolean(address)) {
            cc.warn("setAnimationClipsByName address is null");
            return;
        }
        let clip = await this.getAnimationClips(address);
        if (clip && cc.isValid(clip) && cc.isValid(clip.node)) {
            if (clip) {
                animation.defaultClip = clip;
            }
        }

    }

    public async getAnimationClipsByName(animation: cc.Animation, address: string) {
        if (!animation) {
            return;
        }
        if (!Boolean(address)) {
            cc.warn("setAnimationClipsByName address is null");
            return;
        }
        let clip = await this.getAnimationClips(address);
        return clip
    }

    private async getAnimationClips(address: string) {
        let clip = this._clips[address]
        if (clip) {
            return clip
        }
        return await this.loadAnimationClip(address);
    }

    public async loadAnimationClip(path: string): Promise<cc.AnimationClip> {
        return new Promise<cc.AnimationClip>((resolve, reject) => {
            if (this._clips[path]) {
                resolve(this._clips[path]);
                return;
            }
            cc.resources.load(path, cc.AnimationClip, (err, animationClip) => {
                if (err) {
                    cc.warn("loadAnimationClip err", path, err);
                    resolve(null);
                    return;
                }
                this._clips[path] = animationClip;
                animationClip.addRef()
                resolve(animationClip as cc.AnimationClip);
            });
        });
    }
}
