// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ChapterConfig from "../config/ChapterConfig";
import PositionUtil from "../utils/PositionUtil";
//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
//网页客服 http://web3incubators.com/kefu.html
const {ccclass, property} = cc._decorator;

@ccclass
export default class AdBoxCtrl extends cc.Component {

    private duration:number = 23000; // 持续22秒

    private currTime:number = 0;

    private targetPosIndex= 0;

    private targetPosList = [
        [200,200,100],
        [100,100,100],
        [0,0,100],
        [-100,100,100],
        [-200,200,100],
        [-350,0,100],
        [-200,200,100],
        [-100,100,100],
        [0,0,100],
        [100,100,100],
        [200,200,100],
        [350,0,100],
        [200,200,100],
        [100,100,100],
        [0,0,100],
        [-600,0,500] // 最终
    ]; // [x,y,speed]

    // onLoad () {}

    start () {
        
    }

    startFly() {
        this.currTime = 0;
        this.targetPosIndex = 0;
        this.node.setPosition(cc.v2(400,0));
        this.node.active = true;
    }

    update (dt) {
        this.currTime += (dt * 1000);
        // 超过持续时间则隐藏
        if(this.currTime >= this.duration) {
            this.node.active = false;
            return;
        }

        // 是否已经到达目标位置
        let targetPosConfig = this.targetPosList[this.targetPosIndex];
        let targetPos = cc.v2(targetPosConfig[0],targetPosConfig[1]);
        let len = PositionUtil.calculationDis(this.node.position,targetPos);
        if(len > (this.node.width / 2)) {
            this._move(dt,targetPos);
            return;
        }else {
            if(this.targetPosIndex >= this.targetPosList.length - 1) {
                this.node.active = false;
            }else {
                this.targetPosIndex += 1;
            }
        }
    }

    /**
     * 移动
     */
    private _move(dt,targetPosition) {
        let normalizeVec: cc.Vec2 = targetPosition.subtract(this.node.position).normalize();
        let targetPosConfig = this.targetPosList[this.targetPosIndex];
        let speed = targetPosConfig[2];
        this.node.x += normalizeVec.x * speed * dt;
        this.node.y += normalizeVec.y * speed * dt;
    }
}
