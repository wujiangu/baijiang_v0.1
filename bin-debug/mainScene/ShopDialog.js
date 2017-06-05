var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 商城
 */
var ShopDialog = (function (_super) {
    __extends(ShopDialog, _super);
    function ShopDialog() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/game_skins/shopSkin.exml";
        return _this;
    }
    ShopDialog.prototype.onComplete = function () {
        this.btn_buy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonHandler, this);
        this.btn_detail.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonHandler, this);
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonHandler, this);
        this.btn_closeDetail.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonHandler, this);
    };
    ShopDialog.prototype.onButtonHandler = function (event) {
        var target = event.currentTarget;
        switch (target) {
            case this.btn_buy:
                if (Common.userData.soul < 1000) {
                    Animations.showTips("您的玉魂不足", 1, true);
                }
                else {
                    Common.userData.soul -= 1000;
                    Animations.showTips("购买武器成功", 1);
                    if (Common.userData.equip.length == 0) {
                        Common.userData.equip = new Array();
                    }
                    Common.userData.equip[0] = 2;
                    this.itemGroup.visible = false;
                }
                break;
            case this.btn_detail:
                this.detailGroup.visible = true;
                break;
            case this.btn_closeDetail:
                this.detailGroup.visible = false;
                break;
            default:
                GameLayerManager.gameLayer().panelLayer.removeChildren();
                break;
        }
    };
    return ShopDialog;
}(Base));
__reflect(ShopDialog.prototype, "ShopDialog");
//# sourceMappingURL=ShopDialog.js.map