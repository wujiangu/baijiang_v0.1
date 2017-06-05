var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 天赋界面
 */
var TalentDialog = (function (_super) {
    __extends(TalentDialog, _super);
    function TalentDialog() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompleteHandler, _this);
        _this.skinName = "resource/game_skins/talentWindowSkin.exml";
        _this.btn_page1.selected = true;
        _this.page1 = new TalentIR(0);
        _this.pageGroup.addChild(_this.page1);
        _this.tcTalent = RES.getRes("TcTalent_json");
        TalentDialog.instance = _this;
        return _this;
    }
    TalentDialog.prototype.uiCompleteHandler = function () {
        this.btn_page1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.topBtnListener, this);
        this.btn_page2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.topBtnListener, this);
        this.btn_page3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.topBtnListener, this);
        this.btn_add.addEventListener(egret.TouchEvent.TOUCH_TAP, this.topBtnListener, this);
        this.btn_reset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.topBtnListener, this);
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.topBtnListener, this);
        this.btn_certain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPopupBtn, this);
        this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPopupBtn, this);
        this.btn_closeDetail.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSkillPop, this);
        this.btn_upgrade.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSkillPop, this);
        this.topBtn = [this.btn_page1, this.btn_page2, this.btn_page3];
    };
    /**
     * 顶部按钮监听
     */
    TalentDialog.prototype.topBtnListener = function (event) {
        this._focusBtn = event.currentTarget;
        switch (this._focusBtn) {
            case this.btn_page1:
                this.createTalentPage(0);
                break;
            case this.btn_page2:
                this.createTalentPage(1);
                break;
            case this.btn_page3:
                this.createTalentPage(2);
                break;
            case this.btn_add:
                this.lab_title.text = "购买天赋";
                this.lab_detail.text = "购买天赋需要花费50玉石";
                this.purchassType = 1;
                this.popupGroup.visible = true;
                break;
            case this.btn_reset:
                this.lab_title.text = "重置天赋";
                this.lab_detail.text = "重置天赋需要花费5000金币";
                this.purchassType = 2;
                this.popupGroup.visible = true;
                break;
            default:
                GameLayerManager.gameLayer().panelLayer.removeChildren();
                break;
        }
    };
    /**
     * 弹窗按钮回调
     */
    TalentDialog.prototype.onPopupBtn = function (event) {
        switch (event.currentTarget) {
            case this.btn_certain:
                this.onPurchass(this.purchassType);
                break;
            default:
                this.popupGroup.visible = false;
                break;
        }
    };
    /**
     * 技能弹窗按钮回调
     */
    TalentDialog.prototype.onSkillPop = function (event) {
        switch (event.currentTarget) {
            case this.btn_upgrade:
                break;
            default:
                this.skillPopupGroup.visible = false;
                break;
        }
    };
    /**
     * 确定按钮方法
     */
    TalentDialog.prototype.onPurchass = function (type) {
        this.popupGroup.visible = false;
    };
    /**
     * 创建天赋页
     */
    TalentDialog.prototype.createTalentPage = function (pageCount) {
        this.pageGroup.removeChildren();
        this.page1.setTalentDetail(pageCount);
        Utils.toggleButtonStatus(this.topBtn, pageCount);
        this.pageGroup.addChild(this.page1);
    };
    TalentDialog.prototype.showPopup = function (num) {
        this.skillPopupGroup.visible = true;
        var id = 0;
        for (var obj = 0; obj < 21; obj++) {
            if (this.tcTalent[obj].id == num) {
                id = obj;
                break;
            }
        }
        this.lab_name.text = this.tcTalent[id].name;
        this.lab_condition.text = this.tcTalent[id].condition;
        this.lab_skillDetail.text = this.tcTalent[id].content;
    };
    return TalentDialog;
}(Base));
__reflect(TalentDialog.prototype, "TalentDialog");
//# sourceMappingURL=TalentDialog.js.map