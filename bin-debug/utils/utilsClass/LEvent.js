var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 自定义事件类型
 */
var lcp;
(function (lcp) {
    var LEvent = (function (_super) {
        __extends(LEvent, _super);
        function LEvent(type, obj, bubbles, cancelable) {
            if (obj === void 0) { obj = null; }
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            var _this = _super.call(this, type, bubbles, cancelable) || this;
            _this.name = "LEvent";
            if (obj) {
                _this._obj = obj;
            }
            return _this;
        }
        LEvent.prototype.clone = function (obj) {
            return new LEvent(this.type, obj ? obj : this._obj, this.bubbles, this.cancelable);
        };
        Object.defineProperty(LEvent.prototype, "param", {
            /**
             * 传参获取
             * @returns {Object}
             */
            get: function () {
                return this._obj;
            },
            enumerable: true,
            configurable: true
        });
        return LEvent;
    }(egret.Event));
    lcp.LEvent = LEvent;
    __reflect(LEvent.prototype, "lcp.LEvent");
})(lcp || (lcp = {}));
//# sourceMappingURL=LEvent.js.map