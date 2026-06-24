// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ButtonUtil extends cc.Component {

    /**
     * 节点增加按钮点击事件
     * @param container 节点
     * @param script 脚本
     * @param method 方法
     * @param customEventData 自定义参数 
     * @returns 
     */
    public static _setEvent(targetNode:cc.Node,container:any,script:any,method:any,customEventData:string){
        if(!container) {
            return;
        }
        container.clickEvents = [];
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = targetNode; //这个node节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = script;//这个是代码文件名
        clickEventHandler.handler = method;
        clickEventHandler.customEventData = customEventData;
        container.clickEvents.push(clickEventHandler);
    }

     /**
     * 节点取消按钮点击事件
     * @param container 节点
     * @returns 
     */
     public static _delEvent(container:any,){
        if(!container) {
            return;
        }
        container.clickEvents = [];
    }
}
