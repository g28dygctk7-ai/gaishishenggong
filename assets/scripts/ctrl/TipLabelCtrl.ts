// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class TipLabelCtrl extends cc.Component {

    private duration:number = null;

    private currTime:number = 0;

    // onLoad () {}

    start () {
        
    }

    init(content:string,duration:number) {
        this.duration = duration;
        this.node.getComponent(cc.Label).string = content;
    }

    update (dt) {
        this.currTime += (dt * 1000);
        // 超过持续时间则销毁
        if(this.currTime >= this.duration) {
            this.node.destroy();
            return;
        }

        // 往上飘
        let x = this.node.getPosition().x;
        let y = this.node.getPosition().y + 1;
        this.node.setPosition(cc.v2(x,y));
        // 透明度处理
    }
}
