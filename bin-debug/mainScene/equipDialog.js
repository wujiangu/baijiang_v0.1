var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 武器库
 */
var EquipDialog = (function (_super) {
    __extends(EquipDialog, _super);
    function EquipDialog() {
        var _this = _super.call(this) || this;
        _this.equipGroup = [];
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/game_skins/equipWindowSkin.exml";
        return _this;
    }
    EquipDialog.prototype.onComplete = function () {
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            GameLayerManager.gameLayer().panelLayer.removeChildren();
        }, this);
        this.createEquip();
    };
    /**
     * 创建武器组
     */
    EquipDialog.prototype.createEquip = function () {
        for (var i = 1; i <= 24; i++) {
            var equipGroup = new eui.Group();
            // equipGroup.name = `${i}`;
            // equipGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEquip, this);
            this.equipGroup.push(equipGroup);
            this.scrollGroup.addChild(equipGroup);
            var bg1 = new eui.Image();
            bg1.source = "iconbg_0001_png";
            var bg2 = new eui.Image();
            bg2.source = "iconbg_0002_png";
            bg2.visible = false;
            equipGroup.addChild(bg1);
            equipGroup.addChild(bg2);
            equipGroup.x = 145 * ((i - 1) % 7);
            equipGroup.y = 120 * (Math.ceil(i / 7) - 1);
        }
        for (var i = 0; i < Common.userData.equip.length; i++) {
            var equipImage = new eui.Image();
            equipImage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEquip, this);
            var equipId = Common.userData.equip[i];
            equipImage.name = "" + equipId;
            equipImage.source = "equip" + equipId + "_png";
            equipImage.x = 0;
            equipImage.y = 10;
            equipImage.scaleX = 0.2;
            equipImage.scaleY = 0.2;
            this.equipGroup[i].addChild(equipImage);
        }
    };
    EquipDialog.prototype.onEquip = function (event) {
        var name = event.currentTarget.name;
        Common.log(name + typeof (name));
        if (!this.equipInfo) {
            this.equipInfo = new EquipInfoDialog(parseInt(name));
        }
        else {
            this.equipInfo.createEquip(parseInt(name));
        }
        this.addChild(this.equipInfo);
    };
    return EquipDialog;
}(Base));
__reflect(EquipDialog.prototype, "EquipDialog");
//# sourceMappingURL=equipDialog.js.map