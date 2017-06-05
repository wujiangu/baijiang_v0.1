var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Dictionary = (function () {
    function Dictionary() {
        if (!this.dic) {
            this.dic = new Array();
        }
    }
    Dictionary.prototype.GetName = function (name) {
        return this.dic[name];
    };
    Dictionary.prototype.SetName = function (name, src) {
        this.dic[name] = src;
    };
    return Dictionary;
}());
__reflect(Dictionary.prototype, "Dictionary");
//# sourceMappingURL=Dictionary.js.map