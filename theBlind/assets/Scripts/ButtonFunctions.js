cc.Class({
    extends: cc.Component,

    properties: {

    },

    loadSceneToMain:function(){
        cc.log('switch to Main');
        cc.audioEngine.stopAll();
        cc.director.loadScene('Main');
    },

    loadSceneToTitle:function(){
        cc.log('switch to Title');
        cc.audioEngine.stopAll();
        cc.director.loadScene('Title');
    },

    loadSceneToInstruction:function(){
        cc.audioEngine.stopAll();
        cc.director.loadScene('Instruction');
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
