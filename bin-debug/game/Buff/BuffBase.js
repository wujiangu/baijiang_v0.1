var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 技能基类
 */
var BuffBase = (function () {
    function BuffBase() {
        this.buffData = new BuffData();
    }
    /**初始化 */
    BuffBase.prototype.buffInit = function () {
        this.buffData.id = 1;
        this.buffData.name = "";
        this.buffData.lv = 1;
        this.buffData.className = "";
        this.buffData.description = "";
        this.buffData.duration = 0;
        this.buffData.frequency = 0;
        this.buffData.superpositionType = SuperpositionType.SuperpositionType_None;
        this.buffData.buffType = BuffType.BuffType_DeBuff;
        this.buffData.disperseType = DisperseType.DisperseType_NoClear;
        this.buffData.postionType = PostionType.PostionType_Body;
        this.buffData.controlType = ControlType.NO;
    };
    /**开始 */
    BuffBase.prototype.buffStart = function (target) {
    };
    /**结束 */
    BuffBase.prototype.buffEnd = function () {
    };
    /**刷新数据 */
    BuffBase.prototype.update = function (callBack) {
        if (callBack === void 0) { callBack = null; }
    };
    /**增加特效 */
    BuffBase.prototype.AddEffect = function (target) {
    };
    /**显示特效 */
    BuffBase.prototype.ShowEffect = function () {
    };
    /**隐藏特效 */
    BuffBase.prototype.HideEffect = function () {
    };
    return BuffBase;
}());
__reflect(BuffBase.prototype, "BuffBase");
//# sourceMappingURL=BuffBase.js.map