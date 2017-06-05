var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 待机状态
 */
var IdleState = (function (_super) {
    __extends(IdleState, _super);
    function IdleState() {
        return _super.call(this) || this;
    }
    /**进入待机状态 */
    IdleState.prototype.Enter = function (target) {
    };
    /**执行待机状态 */
    IdleState.prototype.Execute = function (target) {
    };
    /**结束待机状态 */
    IdleState.prototype.End = function (target) {
    };
    /**更新 */
    IdleState.prototype.update = function () {
    };
    return IdleState;
}(BaseStateMachine));
__reflect(IdleState.prototype, "IdleState", ["BaseState"]);
//# sourceMappingURL=IdleState.js.map