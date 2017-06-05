/**
 * 定时器管理
 */
class TimerManager {
    public constructor() {
        this._handlers = [];
        this._delHandlers = [];
        this._object = [];
        this._timeScale = 1;
        // this.startTimer();
    }

    public static getInstance() {
        if (!this._instance) {
            this._instance = new TimerManager();
        }
        return this._instance;
    }

    public setTimeScale(value:number):void {
        this._timeScale = value;
    }

    /**启动计时器 */
    public startTimer():void {
        egret.startTick(this.onFrame, this);
    }

    /**对象排序，并重新设置层级 */
    private objectSort():void {
        for (let i = 0; i < GameData.heros.length; i++) {
            this._object.push(GameData.heros[i]);
        }
        for (let i = 0; i < GameData.monsters.length; i++) {
            this._object.push(GameData.monsters[i]);
        }
        for (let i = 0; i < GameData.boss.length; i++) {
            this._object.push(GameData.boss[i]);
        }
        this._object.sort(function(a, b){return a.y > b.y ? 1:-1;});

        for (let index = 0; index < this._object.length; index ++) {
            SceneManager.battleScene.battleLayer.setChildIndex(this._object[index], index);
        }
        this._object = [];
    }

    /**
     * 每帧执行的函数
     */
    private onFrame(timeStamp:number):boolean {
        if (!this._time) {
            this._time = timeStamp;
        }
        let nowTime:number  = timeStamp;
        let passTime:number = nowTime - this._time;
        this._time = nowTime;
        this.objectSort();
        for (let i = 0; i < this._handlers.length; i++) {
            let handler:TimerHandler = this._handlers[i];
            if (handler.isFrame) {
                handler.func.call(handler.funcObj, passTime*this._timeScale);
            }else{
                if (timeStamp >= handler.exeTime) {
                    handler.func.call(handler.funcObj, (timeStamp-handler.dealTime)*this._timeScale);
                    handler.dealTime = timeStamp;
                    handler.exeTime += handler.delay;
                    if (!handler.repeat) {
                        if (handler.repeatCount > 1) {
                            handler.repeatCount --;
                        }else{
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
            let handler:TimerHandler = this._delHandlers.pop();
            this.remove(handler.func, handler.funcObj);
        }
        return false;
    }

    /**
     * 创建定时执行函数
     */
    private create(isFrame:boolean, delay:number, repeatCount:number, func:Function, funcObj:any, completeFunc:Function = null, completeFuncObj:any = null) {
        if (delay < 0 || repeatCount < 0 || func == null) {
            return;
        }
        //删除相同的函数
        this.remove(func, funcObj);
        //创建
        let handler:TimerHandler = ObjectPool.pop("TimerHandler");
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
    }

    /**
     * 移除执行函数
     * 
     */
    public remove(func:Function, funcObj:any) {
        for (let i = 0; i < this._handlers.length; i++) {
            let handler:TimerHandler = this._handlers[i];
            if ((handler.func == func) && handler.funcObj == funcObj) {
                this._handlers.splice(i, 1);
                ObjectPool.push(handler);
            }
        }
    }

    /**
     * 移除非重复定时完成函数
     */
    public removeComplete(completeFunc:Function, completeFuncObj:any) {
        for (let i = 0; i < this._handlers.length; i++) {
            let handler:TimerHandler = this._handlers[i];
            if ((handler.completeFunc == completeFunc) && handler.completeFuncObj == completeFuncObj) {
                this._handlers.splice(i, 1);
                ObjectPool.push(handler);
            }
        }
    }

    /**
     * 移除所有的执行函数
     */
    public removeAll():void {
        for (let i = 0; i < this._handlers.length; i++) {
            let handler:TimerHandler = this._handlers[i];
            this._handlers.splice(i, 1)
            ObjectPool.push(handler);
        }
        this._handlers = [];
    }

    /**
     * 定时执行
     * 执行间隔：毫秒
     */
    public doTimer(delay:number, repeatCount:number, func:Function, funcObj:any, completeFunc:Function = null, completeFuncObj:any = null) {
        this.create(false, delay, repeatCount, func, funcObj, completeFunc, completeFuncObj);
    }

    /**
     * 定时执行
     * 执行间隔：帧频
     */
    public doFrame(delay:number, repeatCount:number, func:Function, funcObj:any, completeFunc:Function = null, completeFuncObj:any = null) {
        this.create(true, delay, repeatCount, func, funcObj, completeFunc, completeFuncObj);
    }

    /**
     * 停止定时执行
     */
    public stopTimer():void {
        egret.stopTick(this.onFrame, this);
    }

    public static _instance:TimerManager;
    private _time:number;
    /**时间参数 */
    private _timeScale:number;
    /**存储处理函数 */
    private _handlers:Array<TimerHandler>;
    /**存储可清除处理函数 */
    private _delHandlers:Array<TimerHandler>;
    /**对象存储 */
    private _object:Array<any>;
    /**特殊定时 */
}

class TimerHandler {
    /**执行间隔 */
    public delay:number = 0;
    /**是否重复执行 */
    public repeat:boolean;
    /**重复执行的次数 */
    public repeatCount:number = 0;
    /**是否帧频执行 */
    public isFrame:boolean;
    /**执行时间 */
    public exeTime:number;
    /**处理函数 */
    public func:Function;
    /**处理函数所属对象 */
    public funcObj:any;
    /**非重复执行定时器完成回调 */
    public completeFunc:Function;
    /**非重复执行定时器完成回调所属对象 */
    public completeFuncObj:any;
    /**上次执行的时间 */
    public dealTime:number;

    /**清理 */
    public clear() {
        this.func = null;
        this.funcObj = null;
    }
}