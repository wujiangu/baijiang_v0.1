var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 武器升级弹窗
 */
var EquipUpgradePop = (function (_super) {
    __extends(EquipUpgradePop, _super);
    function EquipUpgradePop() {
        var _this = _super.call(this) || this;
        _this.equipGroup = [];
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/popup/equipUpgradeSkin.exml";
        return _this;
    }
    EquipUpgradePop.prototype.childrenCreated = function () {
    };
    EquipUpgradePop.prototype.onComplete = function () {
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHandler, this);
        this.btn_upgrade.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHandler, this);
    };
    /**按钮监听 */
    EquipUpgradePop.prototype.onBtnHandler = function (event) {
        switch (event.currentTarget) {
            case this.btn_upgrade:
                break;
            default:
                this.parent.removeChild(this);
                break;
        }
    };
    /**设置弹出的内容显示 */
    EquipUpgradePop.prototype.show = function () {
    };
    return EquipUpgradePop;
}(Base));
__reflect(EquipUpgradePop.prototype, "EquipUpgradePop");
//# sourceMappingURL=EquipUpgradePop.js.map