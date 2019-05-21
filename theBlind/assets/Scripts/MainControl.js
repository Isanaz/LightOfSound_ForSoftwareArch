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
        streetVoice:cc.AudioClip,
        roadVoice:cc.AudioClip,
        goal: cc.Node,
        player: cc.Node,
        carGenerateSensor: cc.Node,
        sewer:cc.Node,
        newCar:null,
    },
    sleep(delay) {
        var start = (new Date()).getTime();
        while ((new Date()).getTime() - start < delay) {
            continue;
        }
    },
    gameOver() {
        cc.audioEngine.stopAll();
        cc.director.loadScene('Title');
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
        this.currentAudio=cc.audioEngine.playEffect(this.streetVoice,true);
        this.goal.getComponent('Goal').MainControl=this;
        this.player.getComponent('Player').MainControl=this;
        this.sewer.getComponent('Sewer').MainControl=this;
        this.carGenerateSensor.getComponent('CarGenerateSensor').MainControl=this;
    },

    start() {

    },

    update(dt) {
        //检测撞车
        if(this.carGenerateSensor){
            var comSensor = this.carGenerateSensor.getComponent('CarGenerateSensor');
            if (comSensor.sensorCaughtPlayer) {
                cc.audioEngine.stop(this.currentAudio);
                this.currentAudio=cc.audioEngine.playEffect(this.roadVoice,true);
                comSensor.destroy();
                this.carGenerateSensor=null;
            }
        }

    },
});
