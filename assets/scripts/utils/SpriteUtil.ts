// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class SpriteUtil extends cc.Component {

    public static _addSpritePic(container:any,addres:any){
        container.spriteFrame = null;
        if(!container) {
            return;
        }
        if(!addres || addres == "") {
            return;
        }

        cc.assetManager.resources.load(addres, cc.SpriteFrame, function (err, spFrame) {
             container.spriteFrame = spFrame           
        });
    }
}
