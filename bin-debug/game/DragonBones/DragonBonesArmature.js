var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Armature封装类
 */
var DragonBonesArmature = (function (_super) {
    __extends(DragonBonesArmature, _super);
    function DragonBonesArmature(armature, clock) {
        var _this = _super.call(this) || this;
        _this._armature = armature;
        _this._clock = clock;
        _this._armatureDisplay = _this._armature.getDisplay();
        _this.addChild(_this._armatureDisplay);
        _this._frameCalls = [];
        _this._completeCalls = [];
        _this._tagetBones = [];
        return _this;
    }
    /**
     * 增加动画监听
     */
    DragonBonesArmature.prototype.addListeners = function () {
        this._armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.onComplete, this);
        if (this._armature.enableCache) {
            this._armature.addEventListener(dragonBones.FrameEvent.ANIMATION_FRAME_EVENT, this.onFrame, this);
        }
        else {
            this._armature.addEventListener(dragonBones.FrameEvent.BONE_FRAME_EVENT, this.onFrame, this);
        }
    };
    /**
     * 移除动画监听
     */
    DragonBonesArmature.prototype.removeLiteners = function () {
        this._armature.removeEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.onComplete, this);
        if (this._armature.enableCache) {
            this._armature.removeEventListener(dragonBones.FrameEvent.ANIMATION_FRAME_EVENT, this.onFrame, this);
        }
        else {
            this._armature.removeEventListener(dragonBones.FrameEvent.BONE_FRAME_EVENT, this.onFrame, this);
        }
    };
    /**
     * 增加动画完成函数
     */
    DragonBonesArmature.prototype.addCompleteCallFunc = function (func, target) {
        for (var i = 0; i < this._completeCalls.length; i++) {
            //判断某一动画是否已经执行过complete方法
            if ((this._completeCalls[i][0] == func) && (this._completeCalls[i][1] == target)) {
                return;
            }
        }
        this._completeCalls.push([func, target]);
    };
    /**
     * 移除一个动画完成函数
     * @param callFunc 函数
     * @param target 函数所属对象
     */
    DragonBonesArmature.prototype.removeCompleteCallFunc = function (callFunc, target) {
        for (var i = 0; i < this._completeCalls.length; i++) {
            var arr = this._completeCalls[i];
            if (arr[0] == callFunc && arr[1] == target) {
                this._completeCalls.splice(i, 1);
            }
        }
    };
    /**
     * 增加帧事件处理函数
     */
    DragonBonesArmature.prototype.addFrameCallFunc = function (func, target) {
        for (var i = 0; i < this._frameCalls.length; i++) {
            //判断某一动画是否已经执行过complete方法
            if ((this._frameCalls[i][0] == func) && (this._frameCalls[i][1] == target)) {
                return;
            }
        }
        this._frameCalls.push([func, target]);
    };
    /**
     * 获取bone
     */
    DragonBonesArmature.prototype.getBone = function (boneName, target) {
        for (var i = 0; i < this._tagetBones.length; i++) {
            if ((this._tagetBones[i][0] == boneName) && (this._tagetBones[i][1] == target)) {
                return null;
            }
        }
        this._tagetBones.push([boneName, target]);
        return this._armature.getBone(boneName);
    };
    /**
     * 事件完成执行函数
     */
    DragonBonesArmature.prototype.onComplete = function (event) {
        var animationName = event.animationName;
        for (var i = 0; i < this._completeCalls.length; i++) {
            var arr = this._completeCalls[i];
            arr[0].call(arr[1], animationName);
        }
    };
    /**
     * 帧事件处理函数
     */
    DragonBonesArmature.prototype.onFrame = function (event) {
        // let animationName:string = event.animationName;
        for (var i = 0; i < this._frameCalls.length; i++) {
            var arr = this._frameCalls[i];
            arr[0].call(arr[1], event);
        }
    };
    /**
     * 播放动画
     */
    DragonBonesArmature.prototype.play = function (action, playTimes) {
        if (playTimes === void 0) { playTimes = undefined; }
        this.start();
        if (playTimes == undefined) {
            this._armature.animation.gotoAndPlay(action);
        }
        else {
            this._armature.animation.gotoAndPlay(action, null, null, playTimes);
        }
    };
    /**
     * 混合动画
     */
    DragonBonesArmature.prototype.playMuti = function (actions, id, playTimes) {
        if (playTimes === void 0) { playTimes = null; }
        this.start();
        for (var i = 0; i < actions.length; i++) {
            this._armature.animation.fadeIn(actions[i], 0, 0, 0, "Group" + id[i], dragonBones.Animation.SameLayerAndGroup);
        }
    };
    /**
     * 不淡出动画
     */
    DragonBonesArmature.prototype.fadeOut = function (action) {
        var animationState = this._armature.animation.getState(action);
        animationState.fadeOut(0, false);
    };
    /**
     * 获取状态
     */
    DragonBonesArmature.prototype.getState = function (action) {
        return this._armature.animation.getState(action);
    };
    /**
     * 开始播放
     */
    DragonBonesArmature.prototype.start = function () {
        this._clock.add(this._armature);
        this.addListeners();
    };
    /**
     * 停止播放
     */
    DragonBonesArmature.prototype.stop = function () {
        this._clock.remove(this._armature);
        this.removeLiteners();
    };
    return DragonBonesArmature;
}(egret.DisplayObjectContainer));
__reflect(DragonBonesArmature.prototype, "DragonBonesArmature");
//# sourceMappingURL=DragonBonesArmature.js.map