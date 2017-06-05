/**
 * 自定义事件类型
 */
module lcp{
    export class LEvent extends egret.Event {
        public name = "LEvent"
        private _obj:Object;
        public constructor(type:string, obj:Object = null, bubbles:boolean = false, cancelable:boolean = false){
            super(type, bubbles, cancelable);
            if(obj){
                this._obj = obj;
            }
        }

        public clone(obj?:Object):LEvent{
            return new LEvent(this.type, obj?obj:this._obj, this.bubbles, this.cancelable);
        }

        /**
         * 传参获取
         * @returns {Object}
         */
        public get param():Object{
            return this._obj;
        }

    }
}