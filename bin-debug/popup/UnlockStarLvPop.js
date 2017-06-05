var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 解锁星级界面
 */
var UnlockStarLvPop = (function (_super) {
    __extends(UnlockStarLvPop, _super);
    function UnlockStarLvPop() {
        var _this = _super.call(this) || this;
        _this.equipGroup = [];
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/popup/unlockStarLvSkin.exml";
        return _this;
    }
    UnlockStarLvPop.prototype.childrenCreated = function () {
    };
    UnlockStarLvPop.prototype.onComplete = function () {
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHandler, this);
        this.btn_unlock.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHandler, this);
        this.createEquip();
    };
    UnlockStarLvPop.prototype.createEquip = function () {
        for (var i = 1; i <= 24; i++) {
            var equipGroup = new eui.Group();
            this.equipGroup.push(equipGroup);
            this.scrollGroup.addChild(equipGroup);
            var bg1 = new eui.Image();
            bg1.source = "iconbg_0001_png";
            var bg2 = new eui.Image();
            bg2.source = "iconbg_0002_png";
            bg2.visible = false;
            equipGroup.addChild(bg1);
            equipGroup.addChild(bg2);
            equipGroup.x = 115 * ((i - 1) % 7);
            equipGroup.y = 115 * (Math.ceil(i / 7) - 1);
        }
    };
    /**按钮监听 */
    UnlockStarLvPop.prototype.onBtnHandler = function (event) {
        switch (event.currentTarget) {
            case this.btn_unlock:
                break;
            default:
                this.parent.removeChild(this);
                break;
        }
    };
    /**设置弹出的内容显示 */
    UnlockStarLvPop.prototype.show = function () {
    };
    return UnlockStarLvPop;
}(Base));
__reflect(UnlockStarLvPop.prototype, "UnlockStarLvPop");
//# sourceMappingURL=UnlockStarLvPop.js.map