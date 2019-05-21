cc.Class({
    extends: cc.Component,

    properties: {
        speed       : 100,
        addAngle    : 50,
        // hintMessage:null,
        // hintMessagePrefab:cc.Prefab,
        hintMessage : cc.Node,
        hintTimer   : 0,
    },

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
                this.goUp = true;
                break;
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.goLeft = true;
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.goRight = true;
                break;
            case cc.macro.KEY.s:
            case cc.macro.KEY.down:
                this.goDown = true;
                break;
            case cc.macro.KEY.q:
                this.turnLeft = true;
                break;
            case cc.macro.KEY.e:
                this.turnRight = true;
                break;
        }
    },
    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
                this.goUp = false;
                break;
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.goLeft = false;
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.goRight = false;
                break;
            case cc.macro.KEY.s:
            case cc.macro.KEY.down:
                this.goDown = false;
                break;
            case cc.macro.KEY.q:
                this.turnLeft = false;
                break;
            case cc.macro.KEY.e:
                this.turnRight = false;
                break;
        }
    },
    registerInputEvent() {
        this.goUp = false;
        this.goDown = false;
        this.goLeft = false;
        this.goRight = false;
        this.turnLeft = false;
        this.turnRight = false;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        if (this.hintTimer <= 0) {
            this.hintTimer = 1;
            if (otherCollider.node.group == 'airwall') {
                this.hintMessage.getComponent(cc.Label).string = '再往前走就到车道了，还是沿着盲道往前走吧';
            } else if (otherCollider.node.group == 'airwall') { 
                this.hintMessage.getComponent(cc.Label).string = '好像撞障碍物了，绕开再走吧';
            } else if(otherCollider.node.group == 'crosslightBlock'){
                this.hintMessage.getComponent(cc.Label).string = '到路口了,得找导向器提醒我绿灯再过';
            }
        }
        // if(!this.hintMessage){
        //     this.hintTimer=1;
        //     this.hintMessage=cc.instantiate(this.hintMessagePrefab);
        //     this.hintMessage.string='hit something';
        //     this.node.addChild(this.hintMessage);
        //     if(otherCollider.node.group=='airwall'){
        //         this.hintMessage.string='撞墙啦';
        //     }else if(otherCollider.node.group=='airwall'){
        //         this.hintMessage.string='撞障碍物啦';
        //     }
        //     cc.log(this.hintMessage);
        // }
    },
    onCollisionEnter(other, self) {
        cc.log('sensor caught');
        if (other.node.group == 'sensor') {
            this.hintTimer = 1;
            this.hintMessage.getComponent(cc.Label).string = '前方有车';
        }else if(other.node.group == 'wellsensor'){
            this.hintTimer = 1;
            this.hintMessage.getComponent(cc.Label).string = '前方下水道口 注意安全';
            cc.audioEngine.stop(this.MainControl.currentAudio);
            this.MainControl.currentAudio=cc.audioEngine.playEffect(this.MainControl.streetVoice,true);
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.registerInputEvent();
        this.hintMessage.getComponent(cc.Label).string = "";
    },
    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    start() {
    },
    update(dt) {
        //控制运动
        //转向
        if(this.turnLeft) {
            this.node.angle += this.addAngle * dt;
        }else if(this.turnRight) {
            this.node.angle -= this.addAngle * dt;
        }
        //前进
        let degree = cc.misc.degreesToRadians(this.node.angle);
        if (this.goLeft) {
            this.node.x -= this.speed * dt * Math.cos(degree);
            this.node.y -= this.speed * dt * Math.sin(degree);
        } else if (this.goRight) {
            this.node.x += this.speed * dt * Math.cos(degree);
            this.node.y += this.speed * dt * Math.sin(degree);
        }
        if (this.goUp) {
            this.node.x -= this.speed * dt * Math.sin(degree);
            this.node.y += this.speed * dt * Math.cos(degree);            
        } else if (this.goDown) {
            this.node.x += this.speed * dt * Math.sin(degree);
            this.node.y -= this.speed * dt * Math.cos(degree);   
        } 
        //hitMessage
        if (this.hintTimer > 0) {
            this.hintTimer -= dt;
        } else {
            this.hintMessage.getComponent(cc.Label).string = '';
        }
        // if(this.hintMessage&&this.hintTimer>0){
        //     this.hintTimer-=dt;
        // }else if(this.hintMessage){
        //     this.hintMessage.destroy();
        //     this.hintMessage=null;
        // }
    },
});
