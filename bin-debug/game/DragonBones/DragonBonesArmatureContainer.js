var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * DragonBonesArmature容器类，用于一个动画需要多个DragonBonesArmature的情况
 */
var DragonBonesArmatureContainer = (function (_super) {
    __extends(DragonBonesArmatureContainer, _super);
    function DragonBonesArmatureContainer() {
        var _this = _super.call(this) || this;
        _this.armatures = new Array();
        _this.actions = {};
        _this.bones = {};
        return _this;
    }
    DragonBonesArmatureContainer.prototype.getArmatures = function () {
        return this.armatures;
    };
    /**
     * 注册需要的DragonBonesArmature
     */
    DragonBonesArmatureContainer.prototype.register = function (dragonBonesArmature, actions) {
        this.armatures.push(dragonBonesArmature);
        for (var i = 0; i < actions.length; i++) {
            this.actions[actions[i]] = this.armatures.length - 1;
        }
    };
    /**
     * 增加动画完成的监听函数
     */
    DragonBonesArmatureContainer.prototype.addCompleteCallFunc = function (func, target) {
        for (var i = 0; i < this.armatures.length; i++) {
            var armature = this.armatures[i];
            armature.addCompleteCallFunc(func, target);
        }
    };
    /**
     * 移除播放完成处理函数
     * @param callFunc
     * @param target
     */
    DragonBonesArmatureContainer.prototype.removeCompleteCallFunc = function (func, target) {
        for (var i = 0; i < this.armatures.length; i++) {
            var arm = this.armatures[i];
            arm.removeCompleteCallFunc(func, target);
        }
    };
    /**
     * 增加帧事件处理函数
     */
    DragonBonesArmatureContainer.prototype.addFrameCallFunc = function (func, target) {
        for (var i = 0; i < this.armatures.length; i++) {
            var armature = this.armatures[i];
            armature.addFrameCallFunc(func, target);
        }
    };
    /**
     * 获取Bone
     */
    DragonBonesArmatureContainer.prototype.getBone = function (skeletonName, boneName, target) {
        var name = skeletonName + boneName;
        if (!this.bones[name]) {
            for (var i = 0; i < this.armatures.length; i++) {
                var armature = this.armatures[i];
                var bone = armature.getBone(boneName, target);
                if (bone != null) {
                    this.bones[name] = bone;
                    break;
                }
            }
        }
        return this.bones[name];
    };
    DragonBonesArmatureContainer.prototype.getState = function (action) {
        if (this.actions[action] == null) {
            Common.log("不存在动作---->" + action + typeof (action));
            return;
        }
        var newArmatureIndex = this.actions[action];
        var newArmature = this.armatures[newArmatureIndex];
        if (newArmature) {
            this.curArmatureIndex = newArmatureIndex;
            return newArmature.getState(action);
        }
        return null;
    };
    /**
     * 播放动作
     */
    DragonBonesArmatureContainer.prototype.play = function (action, playTimes) {
        if (playTimes === void 0) { playTimes = undefined; }
        if (this.actions[action] == null) {
            Common.log("不存在动作---->" + action + typeof (action));
            return;
        }
        var newArmatureIndex = this.actions[action];
        if (newArmatureIndex != this.curArmatureIndex) {
            this.remove();
        }
        var newArmature = this.armatures[newArmatureIndex];
        if (newArmature) {
            this.addChild(newArmature);
            this.curArmatureIndex = newArmatureIndex;
            newArmature.play(action, playTimes);
        }
    };
    /**
     * 播放多个动画
     */
    DragonBonesArmatureContainer.prototype.playMulti = function (actions, id, playTimes) {
        if (playTimes === void 0) { playTimes = null; }
        if (this.actions[actions[0]] == null) {
            Common.log("不存在动作---->" + actions[0] + typeof (actions[0]));
            return;
        }
        var newArmatureIndex = this.actions[actions[0]];
        if (newArmatureIndex != this.curArmatureIndex) {
            this.remove();
        }
        var newArmature = this.armatures[newArmatureIndex];
        if (newArmature) {
            this.addChild(newArmature);
            this.curArmatureIndex = newArmatureIndex;
            newArmature.playMuti(actions, id, playTimes);
        }
    };
    DragonBonesArmatureContainer.prototype.fadeOut = function (action) {
        if (this.actions[action] == null) {
            return;
        }
        var newArmatureIndex = this.actions[action];
        if (newArmatureIndex != this.curArmatureIndex) {
            this.remove();
        }
        var newArmature = this.armatures[newArmatureIndex];
        if (newArmature) {
            this.addChild(newArmature);
            this.curArmatureIndex = newArmatureIndex;
            newArmature.fadeOut(action);
        }
    };
    /**
     * 停止当前DragonBonesArmature
     */
    DragonBonesArmatureContainer.prototype.stop = function () {
        var currArm = this.armatures[this.curArmatureIndex];
        if (currArm) {
            currArm.stop();
        }
    };
    /**
     * 移除上一个DragonArmature
     */
    DragonBonesArmatureContainer.prototype.remove = function () {
        var oldArmature = this.armatures[this.curArmatureIndex];
        if (oldArmature) {
            oldArmature.stop();
            oldArmature.parent.removeChild(oldArmature);
            this.curArmatureIndex = null;
        }
    };
    return DragonBonesArmatureContainer;
}(egret.DisplayObjectContainer));
__reflect(DragonBonesArmatureContainer.prototype, "DragonBonesArmatureContainer");
//# sourceMappingURL=DragonBonesArmatureContainer.js.map