var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 全局侦听及消息处理
 */
var lcp;
(function (lcp) {
    var LListener = (function () {
        function LListener() {
            this.name = "LListener";
            if (!this.dispatcher) {
                this.dispatcher = new egret.EventDispatcher();
            }
        }
        LListener.getInstance = function () {
            if (!this.instance) {
                this.instance = new LListener();
            }
            return this.instance;
        };
        //增加侦听
        LListener.prototype.addEventListener = function (type, listener, thisObject, useCapture, priority) {
            if (useCapture === void 0) { useCapture = false; }
            if (priority === void 0) { priority = 0; }
            this.dispatcher.addEventListener(type, listener, thisObject, useCapture, priority);
        };
        //删除侦听
        LListener.prototype.removeEventListener = function (type, listener, thisObject, useCapture) {
            if (useCapture === void 0) { useCapture = false; }
            this.dispatcher.removeEventListener(type, listener, thisObject, useCapture);
        };
        //判断是否有某一类型的侦听
        LListener.prototype.hasEventListener = function (type) {
            return this.dispatcher.hasEventListener(type);
        };
        //事件派发
        LListener.prototype.dispatchEvent = function (event) {
            this.dispatcher.dispatchEvent(event);
        };
        return LListener;
    }());
    lcp.LListener = LListener;
    __reflect(LListener.prototype, "lcp.LListener");
})(lcp || (lcp = {}));
//# sourceMappingURL=LListener.js.map