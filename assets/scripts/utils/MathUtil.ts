// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import TxtUtil from "./TxtUtil";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MathUtil  {


    /**
     * 转化为百分比
     * @param num 需要转化百分比的数值
     */
    public static parsePct(num:number):string {
        if(num > 0) {
            return  (Math.round(num * 10000)) / 100 + '%';
        }
        return "0%";
    }

     /**
     * 转化为百分比的大数字
     * @param num 需要转化百分比的数值
     */
      public static parsePctPlus(num:number):string {
        if(num > 0) {

            if(num >= 1) {
                return TxtUtil.parseTxt(String(Math.floor((Math.round(num * 10000)) / 100))) + '%';
            }else {
                return Math.floor(Math.round(num * 10000)) / 100  + '%';
            }
            
        }

        return "0%";
    }









    /**
     * 获取xy轴坐标
     * @param x 目标x
     * @param y 目标y
     * @param radius 半径
     * @param angle 角度
     */
    public static getXy(x:number,y:number,radius:number,angle:number) {
        let x1 = x + radius * Math.sin(angle * Math.PI / 180)
        let y1 = y + radius * Math.cos(angle * Math.PI / 180)
        return [y1,x1];
    }

    /**
     * 获取到原点的xy轴坐标
     * @param radius 半径
     * @param angle 角度
     */
     public static getXyToZero(radius:number,angle:number) {
        return this.getXy(0,0,radius,angle);
    }

    /**
     * 获取两个位置的方向
     * @param p1 位置1
     * @param p2 位置2
     */
    public static getDir(p1,p2) {
        let normalizeVec: cc.Vec2 = p2.subtract(p1).normalize();
        return normalizeVec;
    }
}
