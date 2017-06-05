var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 无法行动的buff(包括禁锢、眩晕、冰冻等)
 */
var UnableMove = (function (_super) {
    __extends(UnableMove, _super);
    function UnableMove() {
        var _this = _super.call(this) || this;
        _this.buffInit();
        return _this;
    }
    /**初始化 */
    UnableMove.prototype.buffInit = function () {
        _super.prototype.buffInit.call(this);
        this.buffData.className = "UnableMove";
        this.buffData.superpositionType = SuperpositionType.SuperpositionType_None;
        this.buffData.buffType = BuffType.BuffType_DeBuff;
        this.buffData.disperseType = DisperseType.DisperseType_NoClear;
        this.buffData.controlType = ControlType.YES;
    };
    /**开始 */
    UnableMove.prototype.buffStart = function (target) {
        target.canMove = false;
        this.AddEffect(target);
        var duration = this.buffData.duration * 1000;
        TimerManager.getInstance().doTimer(duration, 0, this.buffEnd, this);
    };
    /**结束 */
    UnableMove.prototype.buffEnd = function () {
        this.target.canMove = true;
        this.target.isSkillHurt = false;
        this.HideEffect();
        var index = this.target.buff.indexOf(this.buffData.id);
        this.target.buff.splice(index, 1);
        if (this.target.hp > 0) {
            this.target.gotoRun();
        }
        // this.target.removeEffectComplete();
        // this.target.addEffectComplete();
        ObjectPool.push(this);
        TimerManager.getInstance().remove(this.buffEnd, this);
    };
    /**刷新数据 */
    UnableMove.prototype.update = function () {
    };
    /**增加特效 */
    UnableMove.prototype.AddEffect = function (target) {
        this.target = target;
        this.ShowEffect();
        target.buffArmature.play(this.effectName, 0);
        switch (this.buffData.postionType) {
            case PostionType.PostionType_Foot:
                target.buffArmature.x = 0;
                target.buffArmature.y = 0;
                break;
            case PostionType.PostionType_Head:
                target.buffArmature.x = 0;
                target.buffArmature.y = -90;
                break;
        }
    };
    /**显示特效 */
    UnableMove.prototype.ShowEffect = function () {
        this.target.buffArmature.visible = true;
    };
    /**隐藏特效 */
    UnableMove.prototype.HideEffect = function () {
        this.target.buffArmature.visible = false;
    };
    return UnableMove;
}(BuffBase));
__reflect(UnableMove.prototype, "UnableMove");
//# sourceMappingURL=UnableMove.js.map