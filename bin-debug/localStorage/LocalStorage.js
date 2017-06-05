var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * localStorage方法
 */
var LocalStorage = (function () {
    function LocalStorage(userAccount, userPwd) {
        this._storage = window.localStorage;
        if (userAccount) {
        }
    }
    LocalStorage.prototype.init = function (user) {
    };
    LocalStorage.prototype.setItem = function (key, value) {
        NativeAPI.setLocalData(key, JSON.stringify(value));
    };
    return LocalStorage;
}());
__reflect(LocalStorage.prototype, "LocalStorage");
//# sourceMappingURL=LocalStorage.js.map