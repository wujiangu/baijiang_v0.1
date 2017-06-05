/**
 * 对象池管理
 */
class ObjectPool {
    /**
     * 从对象池中获取实例
     * 传入class名称，获取class的实例
     */
    public static pop(name:string, ...args:any[]):any {
        if (!ObjectPool._poolData[name]) {
            ObjectPool._poolData[name] = [];
        }
        let list:Array<any> = ObjectPool._poolData[name];
        if (list.length) {
            return list.pop();
        }else{
            let item:any;
            let cls:any = egret.getDefinitionByName(name);
            let argsLen:number = args.length;
            if (argsLen == 0) {
                item = new cls();
                Common.log("创建")
            }
            else if (argsLen == 1) {
                item = new cls(args[0]);
            }
            else if (argsLen == 2) {
                item = new cls(args[0], args[1]);
            }
            item.ObjectKey = name;
            return item;
        }
    }

    /**
     * 释放object，使object回到pool池，可以继续重复利用
     */
    public static push(obj:any) {
        if (!obj) return;
        let name:string = obj.ObjectKey;
        if (!ObjectPool._poolData[name]) return;
        ObjectPool._poolData[name].push(obj);
    }

    /**
     * 清除所有的对象
     */
    public static clear() {
        ObjectPool._poolData = {};
    }

    /**
     * 检查对象池是否有特定名称的对象
     */
    public static hasObject(name:string):boolean {
        if (!ObjectPool._poolData[name]) return false;
        return true;
    }

    /**池数据 */
    private static _poolData:any = {}
}