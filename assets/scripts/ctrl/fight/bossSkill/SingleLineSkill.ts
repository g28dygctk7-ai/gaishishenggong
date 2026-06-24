// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import PlayerCtrl from "../PlayerCtrl";
import BossBaseSkill from "./BossBaseSkill";

const {ccclass, property} = cc._decorator;

/**
 * 直线技能
 */
 @ccclass
 export default class SingleLineSkill extends BossBaseSkill {
 
 
     onLoad () {
     }
 
     start () {
     }
 
     // update (dt) {
     // }
 
     // 移动
     move(dt): void {
         let currPos:cc.Vec2 = this.node.getPosition();
 
         var vx: number = this.speed * this.dirX * dt;
         var vy: number = this.speed * this.dirY * dt;
 
 
         let nextX = currPos.x += vx;
         let nextY = currPos.y += vy;
         this.node.setPosition(cc.v2(nextX,nextY));
     }
 
     onCollisionEnter(other, self) {
        let player:PlayerCtrl = other.node.parent.getComponent(PlayerCtrl);    
        if(player) {
            // 玩家已死亡
            if(!player.isAlive) {
                return;
            }
            // 此处判断已穿透数是否大于穿透数量，避免造成多次伤害
            if(this.passNum != -1 && this.alreadyPassNum >= this.passNum) {
                return;
            }
            this.alreadyPassNum += 1;
            player.beHit(this.atk);
        }
    }
 }
 