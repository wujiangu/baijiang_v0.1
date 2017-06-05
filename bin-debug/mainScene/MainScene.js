var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 主界面
 */
var MainScene = (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompleteHandler, _this);
        _this.skinName = "resource/game_skins/mainSceneSkin.exml";
        return _this;
    }
    MainScene.prototype.uiCompleteHandler = function () {
        this.btn_ready.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonHandler, this);
        this.btn_equip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonHandler, this);
        this.btn_talent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonHandler, this);
        this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonHandler, this);
        this.btn_shop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonHandler, this);
        this.btn_applicate.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonHandler, this);
        this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonHandler, this);
    };
    /**
     * 按钮处理
     */
    MainScene.prototype.onButtonHandler = function (event) {
        this._btnFocus = event.currentTarget;
        switch (this._btnFocus) {
            case this.btn_ready:
                GameLayerManager.gameLayer().panelLayer.removeChildren();
                if (!this.readyDialog) {
                    this.readyDialog = new ReadyDialog();
                }
                Common.curPanel = this.readyDialog;
                GameLayerManager.gameLayer().panelLayer.addChild(this.readyDialog);
                break;
            case this.btn_equip:
                GameLayerManager.gameLayer().panelLayer.removeChildren();
                if (!this.equipDialog) {
                    this.equipDialog = new EquipDialog();
                }
                GameLayerManager.gameLayer().panelLayer.addChild(this.equipDialog);
                break;
            case this.btn_talent:
                GameLayerManager.gameLayer().panelLayer.removeChildren();
                if (!this.talentDialog) {
                    this.talentDialog = new TalentDialog();
                }
                GameLayerManager.gameLayer().panelLayer.addChild(this.talentDialog);
                break;
            case this.btn_setting:
                this.popupGroup.visible = true;
                break;
            case this.btn_shop:
                GameLayerManager.gameLayer().panelLayer.removeChildren();
                if (!this.shopDialog) {
                    this.shopDialog = new ShopDialog();
                }
                GameLayerManager.gameLayer().panelLayer.addChild(this.shopDialog);
                break;
            case this.btn_applicate:
                this.popupGroup.visible = false;
                break;
            default:
                this.popupGroup.visible = false;
                break;
        }
    };
    return MainScene;
}(Base));
__reflect(MainScene.prototype, "MainScene");
//# sourceMappingURL=MainScene.js.map