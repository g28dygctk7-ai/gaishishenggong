// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import BossCtrl from "../BossCtrl";
import PlayerFightBaseSkill from "./PlayerFightBaseSkill";

const { ccclass, property } = cc._decorator;

/**
 * 固定技能：
 * 如：无敌护盾
 */
@ccclass
export default class PlayerFixSkill extends PlayerFightBaseSkill {


    onLoad() {
    }

    start() {
    }

    // update (dt) {
    // }

    // 移动
    move(dt): void {
        // let currPos: cc.Vec2 = this.node.getPosition();

        // var vx: number = this.speed * this.dirX * dt;
        // var vy: number = this.speed * this.dirY * dt;


        // let nextX = currPos.x += vx;
        // let nextY = currPos.y += vy;
        // this.node.setPosition(cc.v2(nextX, nextY));
    }
}
