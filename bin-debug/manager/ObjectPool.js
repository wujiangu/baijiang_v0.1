var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 对象池管理
 */
var ObjectPool = (function () {
    function ObjectPool() {
    }
    /**
     * 从对象池中获取实例
     * 传入class名称，获取class的实例
     */
    ObjectPool.pop = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!ObjectPool._poolData[name]) {
            ObjectPool._poolData[name] = [];
        }
        var list = ObjectPool._poolData[name];
        if (list.length) {
            return list.pop();
        }
        else {
            var item = void 0;
            var cls = egret.getDefinitionByName(name);
            var argsLen = args.length;
            if (argsLen == 0) {
                item = new cls();
                Common.log("创建");
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
    };
    /**
     * 释放object，使object回到pool池，可以继续重复利用
     */
    ObjectPool.push = function (obj) {
        if (!obj)
            return;
        var name = obj.ObjectKey;
        if (!ObjectPool._poolData[name])
            return;
        ObjectPool._poolData[name].push(obj);
    };
    /**
     * 清除所有的对象
     */
    ObjectPool.clear = function () {
        ObjectPool._poolData = {};
    };
    /**
     * 检查对象池是否有特定名称的对象
     */
    ObjectPool.hasObject = function (name) {
        if (!ObjectPool._poolData[name])
            return false;
        return true;
    };
    return ObjectPool;
}());
/**池数据 */
ObjectPool._poolData = {};
__reflect(ObjectPool.prototype, "ObjectPool");
//# sourceMappingURL=ObjectPool.js.map