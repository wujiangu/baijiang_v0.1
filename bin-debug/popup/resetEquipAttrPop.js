var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 武器属性重置弹窗
 */
var ResetEquipAttrPop = (function (_super) {
    __extends(ResetEquipAttrPop, _super);
    function ResetEquipAttrPop() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/popup/resetAttrSkin.exml";
        return _this;
    }
    ResetEquipAttrPop.prototype.childrenCreated = function () {
        this.show();
    };
    ResetEquipAttrPop.prototype.onComplete = function () {
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHandler, this);
        this.btn_buy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHandler, this);
        this.btn_reset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHandler, this);
        this.btn_minus.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHandler, this);
        this.btn_plus.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHandler, this);
    };
    /**按钮监听 */
    ResetEquipAttrPop.prototype.onBtnHandler = function (event) {
        switch (event.currentTarget) {
            case this.btn_buy:
                break;
            case this.btn_reset:
                break;
            case this.btn_minus:
                if (this.itemCount > 1) {
                    this.itemCount--;
                }
                this.lab_itemCount.text = "" + this.itemCount;
                break;
            case this.btn_plus:
                this.itemCount++;
                this.lab_itemCount.text = "" + this.itemCount;
                break;
            default:
                this.parent.removeChild(this);
                break;
        }
    };
    /**设置弹出的内容显示 */
    ResetEquipAttrPop.prototype.show = function () {
        this.itemCount = 1;
        this.lab_itemCount.text = "" + this.itemCount;
    };
    return ResetEquipAttrPop;
}(Base));
__reflect(ResetEquipAttrPop.prototype, "ResetEquipAttrPop");
//# sourceMappingURL=resetEquipAttrPop.js.map