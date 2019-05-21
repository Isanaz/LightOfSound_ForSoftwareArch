// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        carSound:cc.AudioClip,
        speed:0,
        crashAudio:cc.AudioClip,
        crashJiaoma:cc.AudioClip,
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        cc.audioEngine.stop(this.currentAudio);
        cc.log('car hits something');
        if(otherCollider.node.group=='airwall'){
            cc.log('car crash in airwall');
            this.node.destroy();
        }else if(otherCollider.node.group=='player'){
            cc.log('car crashes with player');
            cc.audioEngine.playEffect(this.crashAudio, false);
            cc.audioEngine.playEffect(this.crashJiaoma,false);
            this.node.stopAllActions();
            this.MainControl.sleep(500);
            // this.MainControl.player.stopAllActions();
            // this.MainControl.gameOver();
            this.node.destroy();
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.currentAudio=cc.audioEngine.playEffect(this.carSound,true);
        // this.maxDist=this.node.getPosition().sub(this.MainControl.player.getPosition()).mag();
    },
    start () {
        this.maxDist=this.node.getPosition().sub(this.MainControl.player.getPosition()).mag();
    },

    update (dt) {
        this.node.y-=this.speed*dt;

        var playerPos=this.node.getPosition();
        var dist=playerPos.sub(this.MainControl.player.getPosition()).mag();
        //cc.log(this.MainControl.player);
        this.node.opacity=(dist<200?255:0);

        var volume=1-dist/this.maxDist;
        cc.audioEngine.setVolume(this.currentAudio, volume);
    },
});
