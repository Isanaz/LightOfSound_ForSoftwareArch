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
        sensorCaughtPlayer:false,
        carPrefab: cc.Prefab,
    },
    // onBeginContact: function (contact, selfCollider, otherCollider) {
    //     cc.log('sensor caught something');
    //     if(otherCollider.node.group=='player'){
    //         this.sensorCaughtPlayer=true;
    //     }
    // },
    onCollisionEnter: function (other, self) {
        cc.log('sensor caught something');
        if (other.node.group == 'player') {
            var newCar = cc.instantiate(this.carPrefab);
            this.MainControl.node.addChild(newCar);
            newCar.getComponent('Car').MainControl = this.MainControl;
            this.sensorCaughtPlayer=true;
        }
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    // update (dt) {},
});
