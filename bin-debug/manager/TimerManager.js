var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 定时器管理
 */
var TimerManager = (function () {
    function TimerManager() {
        this._handlers = [];
        this._delHandlers = [];
        this._object = [];
        this._timeScale = 1;
        // this.startTimer();
    }
    TimerManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new TimerManager();
        }
        return this._instance;
    };
    TimerManager.prototype.setTimeScale = function (value) {
        this._timeScale = value;
    };
    /**启动计时器 */
    TimerManager.prototype.startTimer = function () {
        egret.startTick(this.onFrame, this);
    };
    /**对象排序，并重新设置层级 */
    TimerManager.prototype.objectSort = function () {
        for (var i = 0; i < GameData.heros.length; i++) {
            this._object.push(GameData.heros[i]);
        }
        for (var i = 0; i < GameData.monsters.length; i++) {
            this._object.push(GameData.monsters[i]);
        }
        for (var i = 0; i < GameData.boss.length; i++) {
            this._object.push(GameData.boss[i]);
        }
        this._object.sort(function (a, b) { return a.y > b.y ? 1 : -1; });
        for (var index = 0; index < this._object.length; index++) {
            SceneManager.battleScene.battleLayer.setChildIndex(this._object[index], index);
        }
        this._object = [];
    };
    /**
     * 每帧执行的函数
     */
    TimerManager.prototype.onFrame = function (timeStamp) {
        if (!this._time) {
            this._time = timeStamp;
        }
        var nowTime = timeStamp;
        var passTime = nowTime - this._time;
        this._time = nowTime;
        this.objectSort();
        for (var i = 0; i < this._handlers.length; i++) {
            var handler = this._handlers[i];
            if (handler.isFrame) {
                handler.func.call(handler.funcObj, passTime * this._timeScale);
            }
            else {
                if (timeStamp >= handler.exeTime) {
                    handler.func.call(handler.funcObj, (timeStamp - handler.dealTime) * this._timeScale);
                    handler.dealTime = timeStamp;
                    handler.exeTime += handler.delay;
                    if (!handler.repeat) {
                        if (handler.repeatCount > 1) {
                            handler.repeatCount--;
                        }
                        else {
                            if (handler.completeFunc) {
                                handler.completeFunc.apply(handler.completeFuncObj);
                            }
                            this._delHandlers.push(handler);
                        }
                    }
                }
            }
        }
        while (this._delHandlers.length > 0) {
            var handler = this._delHandlers.pop();
            this.remove(handler.func, handler.funcObj);
        }
        return false;
    };
    /**
     * 创建定时执行函数
     */
    TimerManager.prototype.create = function (isFrame, delay, repeatCount, func, funcObj, completeFunc, completeFuncObj) {
        if (completeFunc === void 0) { completeFunc = null; }
        if (completeFuncObj === void 0) { completeFuncObj = null; }
        if (delay < 0 || repeatCount < 0 || func == null) {
            return;
        }
        //删除相同的函数
        this.remove(func, funcObj);
        //创建
        var handler = ObjectPool.pop("TimerHandler");
        handler.isFrame = isFrame;
        handler.delay = delay;
        handler.repeat = repeatCount == 0;
        handler.repeatCount = repeatCount;
        handler.func = func;
        handler.funcObj = funcObj;
        handler.completeFunc = completeFunc;
        handler.completeFuncObj = completeFuncObj;
        handler.exeTime = delay + (isFrame ? 0 : egret.getTimer());
        handler.dealTime = egret.getTimer();
        this._handlers.push(handler);
    };
    /**
     * 移除执行函数
     *
     */
    TimerManager.prototype.remove = function (func, funcObj) {
        for (var i = 0; i < this._handlers.length; i++) {
            var handler = this._handlers[i];
            if ((handler.func == func) && handler.funcObj == funcObj) {
                this._handlers.splice(i, 1);
                ObjectPool.push(handler);
            }
        }
    };
    /**
     * 移除非重复定时完成函数
     */
    TimerManager.prototype.removeComplete = function (completeFunc, completeFuncObj) {
        for (var i = 0; i < this._handlers.length; i++) {
            var handler = this._handlers[i];
            if ((handler.completeFunc == completeFunc) && handler.completeFuncObj == completeFuncObj) {
                this._handlers.splice(i, 1);
                ObjectPool.push(handler);
            }
        }
    };
    /**
     * 移除所有的执行函数
     */
    TimerManager.prototype.removeAll = function () {
        for (var i = 0; i < this._handlers.length; i++) {
            var handler = this._handlers[i];
            this._handlers.splice(i, 1);
            ObjectPool.push(handler);
        }
        this._handlers = [];
    };
    /**
     * 定时执行
     * 执行间隔：毫秒
     */
    TimerManager.prototype.doTimer = function (delay, repeatCount, func, funcObj, completeFunc, completeFuncObj) {
        if (completeFunc === void 0) { completeFunc = null; }
        if (completeFuncObj === void 0) { completeFuncObj = null; }
        this.create(false, delay, repeatCount, func, funcObj, completeFunc, completeFuncObj);
    };
    /**
     * 定时执行
     * 执行间隔：帧频
     */
    TimerManager.prototype.doFrame = function (delay, repeatCount, func, funcObj, completeFunc, completeFuncObj) {
        if (completeFunc === void 0) { completeFunc = null; }
        if (completeFuncObj === void 0) { completeFuncObj = null; }
        this.create(true, delay, repeatCount, func, funcObj, completeFunc, completeFuncObj);
    };
    /**
     * 停止定时执行
     */
    TimerManager.prototype.stopTimer = function () {
        egret.stopTick(this.onFrame, this);
    };
    return TimerManager;
}());
__reflect(TimerManager.prototype, "TimerManager");
var TimerHandler = (function () {
    function TimerHandler() {
        /**执行间隔 */
        this.delay = 0;
        /**重复执行的次数 */
        this.repeatCount = 0;
    }
    /**清理 */
    TimerHandler.prototype.clear = function () {
        this.func = null;
        this.funcObj = null;
    };
    return TimerHandler;
}());
__reflect(TimerHandler.prototype, "TimerHandler");
//# sourceMappingURL=TimerManager.js.map