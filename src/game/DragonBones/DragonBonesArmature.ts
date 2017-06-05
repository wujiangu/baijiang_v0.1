/**
 * Armature封装类
 */
class DragonBonesArmature extends egret.DisplayObjectContainer {
    public constructor(armature:dragonBones.Armature, clock:dragonBones.WorldClock) {
        super();
        this._armature = armature;
        this._clock = clock;
        this._armatureDisplay = this._armature.getDisplay();
        this.addChild(this._armatureDisplay);

        this._frameCalls = [];
        this._completeCalls = [];
        this._tagetBones = [];
    }

    /**
     * 增加动画监听
     */
    public addListeners():void {
        this._armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.onComplete, this);
        if (this._armature.enableCache) {
            this._armature.addEventListener(dragonBones.FrameEvent.ANIMATION_FRAME_EVENT, this.onFrame, this);
        }else{
            this._armature.addEventListener(dragonBones.FrameEvent.BONE_FRAME_EVENT, this.onFrame, this);
        }
    }

    /**
     * 移除动画监听
     */
    public removeLiteners():void {
        this._armature.removeEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.onComplete, this);
        if (this._armature.enableCache) {
            this._armature.removeEventListener(dragonBones.FrameEvent.ANIMATION_FRAME_EVENT, this.onFrame, this);
        }else{
            this._armature.removeEventListener(dragonBones.FrameEvent.BONE_FRAME_EVENT, this.onFrame, this);
        }
    }

    /**
     * 增加动画完成函数
     */
    public addCompleteCallFunc(func:Function, target:any) {
        for (let i = 0; i < this._completeCalls.length; i++) {
            //判断某一动画是否已经执行过complete方法
            if ((this._completeCalls[i][0] == func) && (this._completeCalls[i][1] == target)) {
                return;
            }
        }
        
        this._completeCalls.push([func, target]);
    }
    /**
     * 移除一个动画完成函数
     * @param callFunc 函数
     * @param target 函数所属对象
     */
    public removeCompleteCallFunc(callFunc:Function, target:any):void {
        for (var i = 0; i < this._completeCalls.length; i++) {
            var arr:Array<any> = this._completeCalls[i];
            if (arr[0] == callFunc && arr[1] == target) {
                this._completeCalls.splice(i, 1);
            }
        }
    }
    
    /**
     * 增加帧事件处理函数
     */
    public addFrameCallFunc(func:Function, target:any) {
        for (let i = 0; i < this._frameCalls.length; i++) {
            //判断某一动画是否已经执行过complete方法
            if ((this._frameCalls[i][0] == func) && (this._frameCalls[i][1] == target)) {
                return;
            }
        }
        
        this._frameCalls.push([func, target]);
    }

    /**
     * 获取bone
     */
    public getBone(boneName:string, target:any):dragonBones.Bone {
        for (let i = 0; i < this._tagetBones.length; i++) {
            if ((this._tagetBones[i][0] == boneName) && (this._tagetBones[i][1] == target)) {
                return null;
            }
        }
        this._tagetBones.push([boneName, target]);
        return this._armature.getBone(boneName);
    }

    /**
     * 事件完成执行函数
     */
    private onComplete(event:dragonBones.AnimationEvent):void {
        let animationName:string = event.animationName;
        for (let i = 0; i < this._completeCalls.length; i++) {
            let arr:Array<any> = this._completeCalls[i];
            arr[0].call(arr[1], animationName);
        }
    }

    /**
     * 帧事件处理函数
     */
    private onFrame(event:dragonBones.FrameEvent):void {
        // let animationName:string = event.animationName;
        for (let i = 0; i < this._frameCalls.length; i++) {
            let arr:Array<any> = this._frameCalls[i];
            arr[0].call(arr[1], event);
        }
    }

    /**
     * 播放动画
     */
    public play(action:string, playTimes:number = undefined):void {
        this.start();
        if (playTimes == undefined) {
            this._armature.animation.gotoAndPlay(action);
        }else{
            this._armature.animation.gotoAndPlay(action, null, null, playTimes);
        }
    }

    /**
     * 混合动画
     */
    public playMuti(actions:Array<string>, id:Array<number>, playTimes:Array<number> = null):void {
        this.start();
        for (let i = 0; i < actions.length; i++) {
            this._armature.animation.fadeIn(actions[i], 0, 0, 0, `Group${id[i]}`, dragonBones.Animation.SameLayerAndGroup);
        }   
    }

    /**
     * 不淡出动画
     */
    public fadeOut(action:string) {
        let animationState = this._armature.animation.getState(action);
        animationState.fadeOut(0, false);
    }

    /**
     * 获取状态
     */
    public getState(action:string):dragonBones.AnimationState {
        return this._armature.animation.getState(action);
    }

    /**
     * 开始播放
     */
    public start():void {
        this._clock.add(this._armature);
        this.addListeners();
    }

    /**
     * 停止播放
     */
    public stop():void {
        this._clock.remove(this._armature);
        this.removeLiteners();
    }

    private _armature:dragonBones.Armature;
    private _clock:dragonBones.WorldClock;
    private _armatureDisplay:any;
    private _curAnimationState:dragonBones.AnimationState;

    /**帧事件处理的集合 */
    private _frameCalls:Array<any>;
    private _completeCalls:Array<any>;
    private _tagetBones:Array<any>;
}