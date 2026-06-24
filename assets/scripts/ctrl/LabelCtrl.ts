// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

/**
 * 文本节点生成管理
 */
@ccclass
export default class LabelCtrl  {

    private oneTimeNum = 50; // 一次最多生成数量

    private needGenLabel = []; // 存储需要生成文本数据

    private static _instance: LabelCtrl = null;

    public static getInstance() {
        if (!this._instance) {
            this._instance = new LabelCtrl();
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

    private _destroy() { }

    /**
     * 获取需要生成的文本数据
     */
    public getGenLabel() {
        let datas = [];

        let num = this.oneTimeNum; // 一次生成数量
        if(this.needGenLabel.length < num) {
            num = this.needGenLabel.length;
        }

        if(num == 0) {
            return datas;
        }

        for(let i = 0;i < num;i++) {
            datas.push(this.needGenLabel.shift()); // 取出数组中的第一个
        }

        return datas;
    }

    /**
     * 增加数据
     * @param pos 位置
     * @param content 内容
     */
    public async add(pos:cc.Vec2,content:string,color:cc.Color) {

        let data = {
            pos:pos,
            content:content,
            color:color
        }
        this.needGenLabel.push(data);
    }
}
