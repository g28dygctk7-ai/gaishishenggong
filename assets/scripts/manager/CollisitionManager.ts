
const {ccclass, property} = cc._decorator;
//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
//网页客服 http://web3incubators.com/kefu.html
@ccclass
export default class CollisitionManager extends cc.Component {

    @property(cc.Vec2)
    gravity: cc.Vec2 = cc.v2(0,0); // 引擎默认重力

    @property
    is_debug: boolean = false; // 是否打开调试区域

    // 开启物理引擎一定要写到onLoad中
    onLoad () {
       this.enableCollisition();
    //    this.enablePhysics();
    }

    start () {

    }

    enableCollisition() {
        var manager = cc.director.getCollisionManager();
        // 1.开启物理引擎
        manager.enabled = true;
        cc.log(manager.enabled);


        if(this.is_debug) {
            manager.enabledDebugDraw = true;
            manager.enabledDrawBoundingBox = true;
        }else {
            manager.enabledDebugDraw = false;
            manager.enabledDrawBoundingBox = false;
        }
    }

    enablePhysics() {
         // 1.开启物理引擎
         cc.director.getPhysicsManager().enabled = true;
 
         // 2.配置物理引擎重力
         cc.director.getPhysicsManager().gravity = this.gravity;
 
         // 3.配置调试区域
         if(this.is_debug) {
             var Bits: any = cc.PhysicsManager.DrawBits;
             cc.director.getPhysicsManager().debugDrawFlags = Bits.e_pairBit |
                                                              Bits.e_centerOfMassBit |
                                                              Bits.e_jointBit |
                                                              Bits.e_shapeBit;
         }else {
             cc.director.getPhysicsManager().debugDrawFlags = 0;
         }
    }

    // update (dt) {}
}
