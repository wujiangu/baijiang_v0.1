var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 护盾
 * 免疫一次伤害(CD时间:20s)
 */
var Shield = (function (_super) {
    __extends(Shield, _super);
    function Shield() {
        var _this = _super.call(this) || this;
        _this.buffInit();
        return _this;
    }
    /**初始化 */
    Shield.prototype.buffInit = function () {
        _super.prototype.buffInit.call(this);
        this.buffData.className = "Shield";
        this.buffData.superpositionType = SuperpositionType.SuperpositionType_None;
        this.buffData.buffType = BuffType.BuffType_DeBuff;
        this.buffData.disperseType = DisperseType.DisperseType_NoClear;
        this.buffData.controlType = ControlType.NO;
        this.buffData.postionType = PostionType.PostionType_Body;
        this.buffData.cd = 20;
        this.buffData.id = 4;
        this.effectName = "skill02";
    };
    /**开始 */
    Shield.prototype.buffStart = function (target) {
        this.AddEffect(target);
        // let duration = this.buffData.cd * 1000;
        // TimerManager.getInstance().doTimer(duration, 0, this.buffEnd, this);
    };
    /**结束 */
    Shield.prototype.buffEnd = function () {
        // this.ShowEffect();
        var newBuff = ObjectPool.pop(this.buffData.className);
        this.target.addBuff(newBuff);
        // this.target.playMultiBuff();
        TimerManager.getInstance().remove(this.buffEnd, this);
    };
    /**刷新数据 */
    Shield.prototype.update = function (callBack) {
        if (callBack === void 0) { callBack = null; }
        this.HideEffect();
        var index = this.target.buff.indexOf(this);
        this.target.buff.splice(index, 1);
        ObjectPool.push(this);
        var duration = this.buffData.cd * 1000;
        TimerManager.getInstance().doTimer(duration, 0, this.buffEnd, this);
        if (callBack) {
            callBack();
        }
    };
    /**动画播放完成监听 */
    Shield.prototype.armaturePlayEnd = function () {
        this.target.skillEffectArmature[1].visible = false;
        this.target.skillEffectArmature[2].visible = true;
        this.target.skillEffectArmature[2].play(this.target.skillEffect["passive1_2"], 0);
        this.position(this.target.skillEffectArmature[2]);
        this.target.skillEffectArmature[1].removeCompleteCallFunc(this.armaturePlayEnd, this);
    };
    /**作用点 */
    Shield.prototype.position = function (target) {
        switch (this.buffData.postionType) {
            case PostionType.PostionType_Foot:
                target.x = 0;
                target.y = 0;
                break;
            case PostionType.PostionType_Head:
                target.x = 0;
                target.y = -90;
                break;
            case PostionType.PostionType_Body:
                target.x = 0;
                target.y = 0;
                break;
        }
    };
    /**增加特效 */
    Shield.prototype.AddEffect = function (target) {
        this.target = target;
        this.ShowEffect();
        target.skillEffectArmature[1].play(target.skillEffect["passive1_1"], 1);
        target.skillEffectArmature[1].addCompleteCallFunc(this.armaturePlayEnd, this);
        this.position(target.skillEffectArmature[1]);
    };
    /**显示特效 */
    Shield.prototype.ShowEffect = function () {
        this.target.skillEffectArmature[1].visible = true;
    };
    /**隐藏特效 */
    Shield.prototype.HideEffect = function () {
        this.target.skillEffectArmature[1].visible = false;
        this.target.skillEffectArmature[2].visible = false;
        // this.target.skillArmature.playMulti("skill03_01", 6, 0);
        // this.target.skillArmature.fadeOut(this.effectName);
        // this.target.skillArmature.visible = false;
    };
    return Shield;
}(BuffBase));
__reflect(Shield.prototype, "Shield");
//# sourceMappingURL=Shield.js.map