// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class JoystickCtrl extends cc.Component {

    /**
     * 大圈
     */
    @property(cc.Node)
    bigBody:cc.Node = null;

    /**
     * 小圈
     */
    @property(cc.Node)
    smallBody:cc.Node = null;

     /**
      * 小圆最大移动范围半径 (小圆移动范围在大圆以内，所以小圆移动范围半径约等于大圆的半径)
      */
    @property({ type: cc.Integer, tooltip: "小圆最大移动半径" })
    maxCircleRadius: number = 0;

    /**
     * 小圆最小移动范围半径
     */
    @property({ type: cc.Integer, tooltip: "小圆最小移动半径" })
    minCircleRadius: number = 0;

    /** 摇杆操控的方向 */
    public dir: cc.Vec2 = cc.v2(0,0);

    /**大圆初始位置 */
    private _bigBodyInitPos: cc.Vec2 = cc.v2(0,0);

    /**
     * 触摸ID，防多点触摸
     */
    private _touchID: number = 0;
    onLoad () {
        this._bigBodyInitPos = cc.v2(this.bigBody.position.x, this.bigBody.position.y);
    }

    onDestroy() {
 
    }

    start () {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.on_stick_move, this);
        this.node.on(cc.Node.EventType.TOUCH_START, this.on_stick_start, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.on_stick_end, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.on_stick_end, this);
    }
    


    distance(p1, p2): number {
        let dx: number = p1.x - p2.x;
        let dy: number = p1.y - p2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    distance1(start, end): number {
        var pos = cc.v2(start.x - end.x, start.y - end.y);
        var dis = Math.sqrt(pos.x*pos.x + pos.y*pos.y);
        return dis;
    }

    // update (dt) {}


    /**触摸开始 */
    on_stick_start(e: cc.Touch): void {
        if(!this.bigBody.active) {
            this.bigBody.active = true;
        }
        
        //触摸点世界坐标转成局部坐标
        let pos = this.node.convertToNodeSpaceAR(e.getLocation());
        this.bigBody.setPosition(pos);
        this.smallBody.setPosition(0, 0);
        this._touchID = e.getID();
    }
    
    /**触摸移动 */
    on_stick_move(e: cc.Touch): void {
        //防多点触摸
        if (this._touchID != e.getID()) {
            return;
        }

        //获取触摸点和虚拟摇杆的距离、弧度
        let location = e.getLocation();                                                         //触摸点当前世界坐标
        let startLocation = e.getStartLocation();                                               //触摸起始点世界坐标
        let dist = cc.Vec2.distance(location, startLocation);                                   //触摸点和大圆距离 (大圆坐标 = 触摸起始点坐标)
        let radian = Math.atan2(location.y - startLocation.y, location.x - startLocation.x);    //触摸点和大圆夹角弧度

        // 小于最小移动半径则停留在原点
        if(dist <= this.minCircleRadius) {
            this.smallBody.setPosition(this._bigBodyInitPos);
            return;
        }

        //方向
        this.dir.x = (location.x - startLocation.x) / dist; // cos
        this.dir.y = (location.y - startLocation.y) / dist; // sin

        //触摸点在大圆范围内，则小圆位置移动到当前触摸点
        if (dist <= this.maxCircleRadius) {
            let smallPos = this.bigBody.convertToNodeSpaceAR(location);
            this.smallBody.setPosition(smallPos);
            //触摸点在圆环范围外，如果小圆移动到当前触摸点就会跑出大圆了，所以小圆位置移动到大圆边缘
        }else if(dist <= this.minCircleRadius) {

        } else {
            this.smallBody.x = Math.cos(radian) * this.maxCircleRadius;
            this.smallBody.y = Math.sin(radian) * this.maxCircleRadius;
        }
    }

    // 归位
    on_stick_end(e: cc.Touch): void {
        //防多点触摸
        if (this._touchID != e.getID()) {
            return;
        }

        if(this.bigBody.active) {
            this.bigBody.active = false;
        }

        //大圆回到起始位置
        this.bigBody.setPosition(this._bigBodyInitPos);
        //小圆回到原点
        this.smallBody.setPosition(0, 0);
        //方向归0
        this.dir = cc.v2(0,0);
    }
}
