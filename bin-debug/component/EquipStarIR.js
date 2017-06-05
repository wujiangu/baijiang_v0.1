var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 武器星级属性
 */
var EquipStarIR = (function (_super) {
    __extends(EquipStarIR, _super);
    function EquipStarIR() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/game_skins/equipStarIR.exml";
        _this.tcEquip = RES.getRes("TcEquip_json");
        return _this;
    }
    EquipStarIR.prototype.onComplete = function (event) {
        Common.log(typeof (this.btn_reset));
        this.btn_reset.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
        this.btn_reset.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onBtnMove, this);
        this.btn_reset.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnEnd, this);
    };
    EquipStarIR.prototype.onBegin = function (event) {
        this.btn_reset.scaleX = 0.8;
        this.btn_reset.scaleY = 0.8;
    };
    EquipStarIR.prototype.onBtnMove = function (event) {
        this.btn_reset.scaleX = 1.0;
        this.btn_reset.scaleY = 1.0;
    };
    EquipStarIR.prototype.onBtnEnd = function (event) {
        this.btn_reset.scaleX = 1.0;
        this.btn_reset.scaleY = 1.0;
        Common.log(event.currentTarget.name);
        Common.dispatchEvent(GameEvents.EVT_EQUIPSTAR, event.currentTarget.name);
    };
    return EquipStarIR;
}(eui.ItemRenderer));
__reflect(EquipStarIR.prototype, "EquipStarIR");
//# sourceMappingURL=EquipStarIR.js.map