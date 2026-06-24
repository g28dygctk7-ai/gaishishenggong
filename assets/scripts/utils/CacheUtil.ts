// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
//网页客服 http://web3incubators.com/kefu.html
@ccclass
export default class CacheUtil extends cc.Component {
 
    private static _instance: CacheUtil = null;

    public static getInstance() {
        if (!this._instance) {
            this._instance = new CacheUtil();
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
     * 缓存
     * @param k 缓存字段
     * @param v 缓存内容
     */
    public set(k:string,v:any) {
        cc.sys.localStorage.setItem(k,v);
    }

    /**
     * 获取缓存内容
     * @param k 缓存字段
     * @returns 
     */
    public get(k:string) {
        return cc.sys.localStorage.getItem(k);
    }
    
    /**
     * 获取缓存内容-Number
     * @param k 缓存字段
     * @returns 
     */
     public getNumber(k:string) {
        let v = this.get(k);
        return Number(v);
    }

    /**
     * 获取缓存内容-JSON对象
     * @param k 缓存字段
     * @returns 
     */
    public getObject(k:string) {
        let v:string = this.get(k);
        if(v == null || v == "") {
            return null;
        }
        return JSON.parse(v);
    }
    
    /**
     * 移除缓存
     * @param k 缓存字段
     */
    public remove(k:string) {
        cc.sys.localStorage.removeItem(k);
    }

    /**
     * 清空缓存
     */
    public clear() {
        cc.sys.localStorage.clear();
    }

}
