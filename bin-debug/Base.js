var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 基础类模块
 * 其他场景或者模块可以继承这个类，Base内部可以有共通的方法
 */
var Base = (function (_super) {
    __extends(Base, _super);
    function Base() {
        return _super.call(this) || this;
    }
    return Base;
}(eui.Component));
__reflect(Base.prototype, "Base");
//# sourceMappingURL=Base.js.map