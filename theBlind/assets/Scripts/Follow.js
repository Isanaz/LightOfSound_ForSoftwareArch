cc.Class({
    extends: cc.Component,

    properties: {
        player : cc.Node
    },

    start () {
    },

    update (dt) {
        let degree = cc.misc.degreesToRadians(this.player.angle);
        this.node.x = this.player.x;// - Math.sin(degree) * 160;
        this.node.y = this.player.y;// + Math.cos(degree) * 160;
        this.node.angle = this.player.angle;
    },
});
