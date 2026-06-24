

export default class ObjectManager {

    private static _instance: ObjectManager = null;
    private _prefabs: any = {};

    public static getInstance() {
        if (!this._instance) {
            this._instance = new ObjectManager();
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

    public async getObjectPrefab(path: string, superior: string = ""): Promise<cc.Prefab> {
        return new Promise<cc.Prefab>((resolve, reject) => {
            if (this._prefabs[path]) {

                resolve(this._prefabs[path]);
                return;
            }
            cc.resources.load(path, cc.Prefab, (err, prefab) => {
                if (err) {
                    cc.log("getObjectNode err", err);
                    resolve(null);
                    return;
                }
                this._prefabs[path] = prefab;
                prefab.addRef()
                resolve(prefab as cc.Prefab);
            });
        });
    }
}
