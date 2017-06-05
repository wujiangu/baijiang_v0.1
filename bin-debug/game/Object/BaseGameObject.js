var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 人物的基本类
 */
var BaseGameObject = (function (_super) {
    __extends(BaseGameObject, _super);
    function BaseGameObject() {
        var _this = _super.call(this) || this;
        /**初始位置 */
        _this.originX = 0;
        _this.originY = 0;
        _this.armature = new DragonBonesArmatureContainer();
        _this.effectArmature = new DragonBonesArmatureContainer();
        _this.buffArmature = new DragonBonesArmatureContainer();
        _this.skillArmature = new DragonBonesArmatureContainer();
        _this.addChild(_this.armature);
        _this.addChild(_this.effectArmature);
        _this.addChild(_this.buffArmature);
        _this.addChild(_this.skillArmature);
        return _this;
    }
    BaseGameObject.prototype.init = function (name) {
        if (name === void 0) { name = null; }
        TimerManager.getInstance().doFrame(1, 0, this.onFrame, this);
        this.isEnemy = true;
        this.speed = 3;
        this.attack = 0;
        this.hp = 0;
        this.originX = 0;
        this.originY = 0;
        this.deltaX = 0;
        this.deltaY = 0;
        this.radian = 0;
        this.sumDeltaX = 0;
        this.sumDeltaY = 0;
        this.canMove = true;
    };
    /**
     * 设置速度
     */
    BaseGameObject.prototype.setSpeed = function (value) {
        this.speed = value;
    };
    /**
     * 设置攻击范围
     */
    BaseGameObject.prototype.setAttackRange = function (value) {
        this.atk_range = value;
    };
    /**
     * 帧执行函数
     */
    BaseGameObject.prototype.onFrame = function (time) {
        this.update(time);
    };
    /**
     * update
     */
    BaseGameObject.prototype.update = function (time) {
        if (this.x < 50)
            this.x = 50;
        if (this.y < 50)
            this.y = 50;
        if (this.x > Common.SCREEN_W - 50)
            this.x = Common.SCREEN_W - 50;
        if (this.y > Common.SCREEN_H - 50)
            this.y = Common.SCREEN_H - 50;
        var func = "state_" + this.curState;
        if (this.curState && this[func]) {
            this[func](time);
        }
    };
    /**待机 */
    BaseGameObject.prototype.gotoIdle = function () {
        this.armature.play(BaseGameObject.Action_Idle, 0);
    };
    /**
     * 移动到指定的位置
     */
    BaseGameObject.prototype.moveToTarget = function (gotoX, gotoY, func) {
        if (func === void 0) { func = null; }
        this.endX = gotoX;
        this.endY = gotoY;
    };
    /**
     * 清除特效
     */
    BaseGameObject.prototype.removeEffect = function (actionName) {
        this.effectArmature.stop();
        this.effectArmature.parent.removeChild(this.effectArmature);
    };
    /**
     * 播放特效
     */
    BaseGameObject.prototype.playEffect = function (actionName) {
        if (this.effectArmature.play(actionName, 1)) {
            this.addChild(this.effectArmature);
        }
        else {
            this.removeEffect(actionName);
        }
    };
    /**走路方向(怪物的攻击也可以使用这个) */
    BaseGameObject.prototype.getWalkPosition = function (name, radian) {
        var posName;
        var pi = Math.PI;
        if ((radian >= -0.75 * pi) && (radian < -pi / 4)) {
            posName = name + "01";
        }
        else if ((radian >= -pi / 4 && radian < pi / 4) || (radian > -pi && radian < -0.75 * pi) || (radian > 0.75 * pi && radian < pi)) {
            posName = name + "02";
        }
        else if (radian >= pi / 4 && radian < 0.75 * pi) {
            posName = name + "03";
        }
        return posName;
    };
    /**攻击方向 */
    BaseGameObject.prototype.getAttackPosition = function (radian) {
        var pos = {};
        var pi = Math.PI;
        if ((radian >= -0.625 * pi) && (radian < -0.375 * pi)) {
            pos["posName"] = BaseGameObject.Action_Attack01;
            pos["id"] = 0;
        }
        else if ((radian >= -0.375 * pi && radian < -0.125 * pi) || (radian >= -0.875 * pi && radian < -0.625 * pi)) {
            pos["posName"] = BaseGameObject.Action_Attack02;
            pos["id"] = 1;
        }
        else if ((radian >= -0.125 * pi && radian < 0.125 * pi) || (radian >= -pi && radian < -0.875 * pi) || (radian >= 0.875 * pi && radian <= pi)) {
            pos["posName"] = BaseGameObject.Action_Attack03;
            pos["id"] = 2;
        }
        else if ((radian >= 0.125 * pi && radian < 0.375 * pi) || (radian >= 0.625 * pi && radian < 0.875 * pi)) {
            pos["posName"] = BaseGameObject.Action_Attack04;
            pos["id"] = 3;
        }
        else {
            pos["posName"] = BaseGameObject.Action_Attack05;
            pos["id"] = 4;
        }
        return pos;
    };
    /**反向 */
    BaseGameObject.prototype.reverse = function (target, radian) {
        if ((radian > -Math.PI / 2) && (radian < Math.PI / 2)) {
            target.scaleX = 1;
            return false;
        }
        else {
            target.scaleX = -1;
            return true;
        }
    };
    /**检查是否应经存在buff */
    BaseGameObject.prototype.isExistBuff = function (buff) {
        var status = false;
        for (var i = 0; i < this.buff.length; i++) {
            if (buff.buffData.id == this.buff[i].buffData.id) {
                status = true;
                break;
            }
        }
        return status;
    };
    return BaseGameObject;
}(egret.DisplayObjectContainer));
BaseGameObject.Action_Enter = "enter";
BaseGameObject.Action_Idle = "idle";
BaseGameObject.Action_Attack01 = "attack01";
BaseGameObject.Action_Attack02 = "attack02";
BaseGameObject.Action_Attack03 = "attack03";
BaseGameObject.Action_Attack04 = "attack04";
BaseGameObject.Action_Attack05 = "attack05";
BaseGameObject.Action_Hurt = "hurt";
__reflect(BaseGameObject.prototype, "BaseGameObject");
//# sourceMappingURL=BaseGameObject.js.map