var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 状态机基类
 */
var BaseStateMachine = (function () {
    function BaseStateMachine() {
        /**当前状态类型 */
        this.m_pCurStateType = StateType.NONE;
        /**上一个状态类型 */
        this.m_pLastStateType = StateType.NONE;
    }
    Object.defineProperty(BaseStateMachine.prototype, "curState", {
        /**获取当前状态 */
        get: function () {
            return this.m_pCurState;
        },
        /**设置当前状态 */
        set: function (state) {
            this.m_pCurState = state;
        },
        enumerable: true,
        configurable: true
    });
    /**更新 */
    BaseStateMachine.prototype.update = function () {
    };
    /**改变状态 */
    BaseStateMachine.prototype.changeState = function () {
    };
    Object.defineProperty(BaseStateMachine.prototype, "lastState", {
        /**获取上一个状态 */
        get: function () {
            return this.m_pLastState;
        },
        enumerable: true,
        configurable: true
    });
    return BaseStateMachine;
}());
__reflect(BaseStateMachine.prototype, "BaseStateMachine");
//# sourceMappingURL=BaseStateMachine.js.map