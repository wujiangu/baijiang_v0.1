/**
 * 全局侦听及消息处理
 */
module lcp{
    export class LListener {
        public name = "LListener"
        public constructor () {
            if (!this.dispatcher) {
                this.dispatcher = new egret.EventDispatcher();
            }
        }

        public static getInstance():LListener {
            if (!this.instance) {
                this.instance = new LListener();
            }
            return this.instance;
        }

        //增加侦听
        public addEventListener(type:string, listener:Function, thisObject:any, useCapture:boolean=false, priority:number=0) {
            this.dispatcher.addEventListener(type, listener, thisObject, useCapture, priority);
        }
        //删除侦听
        public removeEventListener(type:string, listener:Function, thisObject:any, useCapture:boolean=false){
            this.dispatcher.removeEventListener(type, listener, thisObject, useCapture);
        }
        //判断是否有某一类型的侦听
        public hasEventListener(type:string):boolean {
            return this.dispatcher.hasEventListener(type);
        }
        //事件派发
        public dispatchEvent(event:LEvent) {
            this.dispatcher.dispatchEvent(event);
        }
        public static instance:LListener;
        private dispatcher:egret.EventDispatcher;
    }
}