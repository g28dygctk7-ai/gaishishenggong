// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import TipCtrl from "./TipCtrl";

const {ccclass, property} = cc._decorator;

/**
 * 伤害文字
 */
@ccclass
export default class DamageCtrl extends cc.Component {

    private duration:number = 400;

    private currTime:number = 0;

    private label:cc.Label = null;

    // onLoad () {}

    start () {
        
    }

    init(content:string) {
        this.currTime = 0;
        this.label = this.node.getComponent(cc.Label);
        this.label.string = content;
        this.label.fontSize = 38;
        this.label.lineHeight = 38;
        this.node.zIndex = 100;
        this.node.active = true;
        this.node.opacity = 255;
    }

    update (dt) {
        this.currTime += (dt * 1000);
        // 超过持续时间则销毁
        if(this.currTime >= this.duration) {
            this.node.setPosition(cc.v2(0,0));
            // 通知回收
            TipCtrl.getInstance().recoverDamageNode(this.node.parent,this.node);
            this.node.active = false;
            return;
        }

    
        // 往上飘
        this.node.y += 1;
        // 透明度处理
        this.node.opacity -= 0.5;
        if(this.currTime <= 100) { // 变大
            this.label.fontSize += 0.2;
            this.label.lineHeight += 0.2;
        } else {
            this.label.fontSize -= 0.2;
            this.label.lineHeight -= 0.2;
        }
    }
}
