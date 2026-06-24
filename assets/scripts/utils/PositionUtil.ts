// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class PositionUtil{
    public static calculationDis(localPos,tarPos){
        let dx = localPos.x - tarPos.x;
        
        let dy = localPos.y - tarPos.y;
        
        let dis = Math.sqrt(dx*dx + dy*dy);
        return dis;
    } 


    /**
     * 计算重置列表顶部的Y轴
     * @param pageViewHeight 页面视图高度
     * @param nodeHeight 节点高度
     * @param nodeCount 节点数量
     * @param nodeSpacing  节点间隔
     * @returns 
     */
    public static calcListTopPosition(pageViewHeight, nodeHeight, nodeCount, nodeSpacing) {
        return -(nodeCount / 2 * nodeHeight + nodeCount / 2 * nodeSpacing - pageViewHeight / 2);
    }
}
