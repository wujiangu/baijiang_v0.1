var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 闪避攻击
 */
var Dodge = (function (_super) {
    __extends(Dodge, _super);
    function Dodge() {
        var _this = _super.call(this) || this;
        _this.buffInit();
        return _this;
    }
    /**初始化 */
    Dodge.prototype.buffInit = function () {
        _super.prototype.buffInit.call(this);
        this.buffData.className = "Dodge";
        this.buffData.superpositionType = SuperpositionType.SuperpositionType_None;
        this.buffData.buffType = BuffType.BuffType_DeBuff;
        this.buffData.disperseType = DisperseType.DisperseType_NoClear;
        this.buffData.controlType = ControlType.NO;
        this.buffData.postionType = PostionType.PostionType_Body;
        this.buffData.id = 5;
        this.effectName = "skill01";
    };
    /**开始 */
    Dodge.prototype.buffStart = function (target) {
        this.target = target;
    };
    /**结束 */
    Dodge.prototype.buffEnd = function () {
        this.HideEffect();
        this.target.effectArmature.removeCompleteCallFunc(this.buffEnd, this);
    };
    /**刷新数据 */
    Dodge.prototype.update = function () {
        this.AddEffect(this.target);
    };
    /**增加特效 */
    Dodge.prototype.AddEffect = function (target) {
        this.ShowEffect();
        target.buffArmature.play(this.effectName, 1);
        target.buffArmature.addCompleteCallFunc(this.buffEnd, this);
        switch (this.buffData.postionType) {
            case PostionType.PostionType_Foot:
                target.buffArmature.x = 0;
                target.buffArmature.y = 0;
                break;
            case PostionType.PostionType_Head:
                target.buffArmature.x = 0;
                target.buffArmature.y = -90;
                break;
            case PostionType.PostionType_Body:
                target.buffArmature.x = 0;
                target.buffArmature.y = -45;
                break;
        }
    };
    /**显示特效 */
    Dodge.prototype.ShowEffect = function () {
        this.target.buffArmature.visible = true;
    };
    /**隐藏特效 */
    Dodge.prototype.HideEffect = function () {
        this.target.buffArmature.visible = false;
    };
    return Dodge;
}(BuffBase));
__reflect(Dodge.prototype, "Dodge");
//# sourceMappingURL=Dodge.js.map