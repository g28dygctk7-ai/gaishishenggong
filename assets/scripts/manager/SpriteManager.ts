

export default class SpriteManager {

    private static _instance: SpriteManager = null;
    private _spriteFrames: any = {};

    public static getInstance() {
        if (!this._instance) {
            this._instance = new SpriteManager();
            this._instance._init();
        }
        return this._instance;
    }
//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
//网页客服 http://web3incubators.com/kefu.html
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

    public async setBundleSpriteFrameByName(sprite: cc.Sprite, spriteFrameName: string) {
        if (!sprite) {
            return;
        }
        if (!Boolean(spriteFrameName)) {
            cc.warn("setSpriteFrameByName spriteFrameName is null");
            return;
        }
        let frame = await this.getBundleSpriteFrame(spriteFrameName);
        if (sprite && cc.isValid(sprite) && cc.isValid(sprite.node)) {
            if (frame) {
                sprite.spriteFrame = frame;
            }
        }
    }

    private async getBundleSpriteFrame(spriteFrameName: string) {
        let sp = this._spriteFrames[spriteFrameName]
        if (sp) {
            return sp
        }
        return await this.loadBundleSpriteFrame(spriteFrameName);
    }

    private async loadBundleSpriteFrame(path: string): Promise<cc.SpriteFrame> {
        return new Promise<cc.SpriteFrame>((resolve, reject) => {
            if (this._spriteFrames[path]) {
                resolve(this._spriteFrames[path]);
                return;
            }
            let bundle = cc.assetManager.getBundle("fenbao");
            if (!bundle) {
                cc.warn("fenbao分包还没加载,图片路径", path);
                resolve(null);
                return;
            }
            bundle.load(path, cc.SpriteFrame, (err, spriteFrame) => {
                if (err) {
                    cc.warn("loadSpriteFrame err", path, err);
                    resolve(null);
                    return;
                }
                this._spriteFrames[path] = spriteFrame;
                spriteFrame.addRef()
                resolve(spriteFrame as cc.SpriteFrame);
            });
        });
    }

    public async setSpriteFrameByName(sprite: cc.Sprite, spriteFrameName: string) {
        if (!sprite) {
            return;
        }
        if (!Boolean(spriteFrameName)) {
            cc.warn("setSpriteFrameByName spriteFrameName is null");
            return;
        }
        let frame = await this.getSpriteFrame(spriteFrameName);
        if (sprite && cc.isValid(sprite) && cc.isValid(sprite.node)) {
            if (frame) {
                sprite.spriteFrame = frame;
            }
        }

    }

    private async getSpriteFrame(spriteFrameName: string) {
        let sp = this._spriteFrames[spriteFrameName]
        if (sp) {
            return sp
        }
        return await this.loadSpriteFrame(spriteFrameName);
    }

    private async loadSpriteFrame(path: string): Promise<cc.SpriteFrame> {
        return new Promise<cc.SpriteFrame>((resolve, reject) => {
            if (this._spriteFrames[path]) {
                resolve(this._spriteFrames[path]);
                return;
            }
            cc.resources.load(path, cc.SpriteFrame, (err, spriteFrame) => {
                if (err) {
                    cc.warn("loadSpriteFrame err", path, err);
                    resolve(null);
                    return;
                }
                this._spriteFrames[path] = spriteFrame;
                spriteFrame.addRef()
                resolve(spriteFrame as cc.SpriteFrame);
            });
        });
    }
}
