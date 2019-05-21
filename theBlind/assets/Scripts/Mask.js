cc.Class({
    extends: cc.Component,

    properties: {
        cr:{
            default:60,
            tooltip:'涂抹圆的半径'
        },
        mask    :cc.Mask,
        player  :cc.Node,
        width   :960,       //画面宽度
        height  :640,       //画面高度
        //time  :0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad (){
        this.node.on(cc.Node.EventType.TOUCH_START, this.TouchBegin, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.TouchEnd, this);
    },
    onDestroy () {
        this.node.off(cc.Node.EventType.TOUCH_START, this.TouchBegin, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.TouchEnd, this);
    },
    start () {
    },
    TouchBegin (event) {
        cc.log('TouchBegin');
        let point = event.touch.getLocation();
        
        let degree = cc.misc.degreesToRadians(this.player.angle);
        point.x -= this.width / 2;
        point.y -= this.height / 2;
        let tmpx = point.x * Math.cos(degree) - point.y * Math.sin(degree);
        let tmpy = point.x * Math.sin(degree) + point.y * Math.cos(degree);
        point.x = tmpx + this.player.x + this.width / 2; //- Math.sin(degree) * 160;   //160为镜头在正中间偏下方160px，对应follow后面加的
        point.y = tmpy + this.player.y + this.height / 2; //+ Math.cos(degree) * 160;
        
        point = this.node.convertToNodeSpaceAR(point);
        this.addCircle(point, cc.color(0,255,0,255));
    }, 

    TouchEnd (event) {
        cc.log("End");
        this.mask._graphics.clear();
    },


    addCircle(pos, color) {
        this.mask._graphics.lineWidth = 1;
        this.mask._graphics.strokeColor = color;
        this.mask._graphics.fillColor = color;
        this.mask._graphics.circle (pos.x, pos.y, this.cr);
        this.mask._graphics.fill();
        this.mask._graphics.stroke();        
    },


    update (dt) {
        //cc.log(dt);
        //if(this.time > 50){
        //   this.mask._graphics.clear();
        //    this.time = 0;
        //}
        //this.time += 50 * dt;
    },
});
