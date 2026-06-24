// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass} = cc._decorator;

/**
 * 场景名称定义
 */
 @ccclass
 export default class SceneKey {
     /**
      * 进度条加载场景
      */
     public static LOADING = "loading"; 
 
     /**
      * 主场景
      */
     public static INDEX = "index"; 
 
     /**
      * 挑战关卡战斗场景
      */
     public static FIGHT = "fight"; 
 
 }