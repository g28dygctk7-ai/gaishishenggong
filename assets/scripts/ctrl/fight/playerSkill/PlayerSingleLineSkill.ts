// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import BossCtrl from "../BossCtrl";
import PlayerCtrl from "../PlayerCtrl";
import PlayerFightBaseSkill from "./PlayerFightBaseSkill";

const { ccclass, property } = cc._decorator;

/**
 * 直线技能
 */
@ccclass
export default class PlayerSingleLineSkill extends PlayerFightBaseSkill {


    onLoad() {
    }

    start() {
    }

    // update (dt) {
    // }

    // 移动
    move(dt): void {
        let currPos: cc.Vec2 = this.node.getPosition();

        var vx: number = this.speed * this.dirX * dt;
        var vy: number = this.speed * this.dirY * dt;


        let nextX = currPos.x += vx;
        let nextY = currPos.y += vy;
        this.node.setPosition(cc.v2(nextX, nextY));
    }

    onCollisionEnter(other, self) {
        let bossCtrl: BossCtrl = other.node.parent.getComponent(BossCtrl);
        if (bossCtrl) {
            if (!bossCtrl.isAlive) {
                return;
            }

            // 此处判断已穿透数是否大于穿透数量，避免造成多次伤害
            if (this.passNum != -1 && this.alreadyPassNum >= this.passNum) {
                return;
            }

            this.alreadyPassNum += 1;
            bossCtrl.beHit(this.atk);
        }
    }
}
