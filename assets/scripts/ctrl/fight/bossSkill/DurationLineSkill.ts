// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import PlayerCtrl from "../PlayerCtrl";
import BossBaseSkill from "./BossBaseSkill";

const { ccclass, property } = cc._decorator;

/**
 * 持续性技能
 */
@ccclass
export default class DurationLineSkill extends BossBaseSkill {


    onLoad() {
    }

    start() {
    }

    // update (dt) {
    // }

    // 移动
    move(dt): void {
        // 无需移动
    }

    onCollisionStay(other, self) {
        let player: PlayerCtrl = other.node.parent.getComponent(PlayerCtrl);
        if (player) {
            // 玩家已死亡
            if (!player.isAlive) {
                return;
            }
            // 此处判断已穿透数是否大于穿透数量，避免造成多次伤害
            if (this.passNum != -1 && this.alreadyPassNum >= this.passNum) {
                return;
            }
            // 还在准备时间不造成伤害
            if (this.prepareTime > this.currTime * 1000) {
                return;
            }
            // 上一次对玩家造成伤害的时间间隔内不造成伤害
            if (this.lastHitTime  + this.atkIntervalTime > this.currTime * 1000) {
                return;
            }
            this.lastHitTime = this.currTime * 1000;
            this.alreadyPassNum += 1;
            cc.log("攻击到玩家了");

            player.beHit(this.atk);
        }
    }
}
