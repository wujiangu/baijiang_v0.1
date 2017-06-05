var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 更换武器弹窗
 */
var ChangeEquipPop = (function (_super) {
    __extends(ChangeEquipPop, _super);
    function ChangeEquipPop() {
        var _this = _super.call(this) || this;
        _this.equipGroup = [];
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/popup/changeEquipSkin.exml";
        return _this;
    }
    ChangeEquipPop.prototype.childrenCreated = function () {
    };
    ChangeEquipPop.prototype.onComplete = function () {
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHandler, this);
        this.btn_change.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHandler, this);
        this.createEquip();
    };
    ChangeEquipPop.prototype.createEquip = function () {
        for (var i = 1; i <= 24; i++) {
            var equipGroup = new eui.Group();
            this.equipGroup.push(equipGroup);
            this.scrollGroup.addChild(equipGroup);
            var bg1 = new eui.Image();
            bg1.source = "iconbg_0001_png";
            equipGroup["bg2"] = new eui.Image();
            equipGroup["bg2"].source = "iconbg_0002_png";
            equipGroup["bg2"].visible = false;
            equipGroup.addChild(bg1);
            equipGroup.addChild(equipGroup["bg2"]);
            equipGroup.x = 115 * ((i - 1) % 7);
            equipGroup.y = 115 * (Math.ceil(i / 7) - 1);
        }
    };
    /**按钮监听 */
    ChangeEquipPop.prototype.onBtnHandler = function (event) {
        switch (event.currentTarget) {
            case this.btn_change:
                var id = Common.userData.equip[0];
                this.parent.removeChild(this);
                if (id == null)
                    return;
                Common.curPanel.img_equip.source = "weapon2_000" + id + "_png";
                if (id == 1) {
                    Common.userData.equip[0] = 2;
                }
                else {
                    Common.userData.equip[0] = 1;
                }
                break;
            default:
                this.parent.removeChild(this);
                break;
        }
    };
    /**设置弹出的内容显示 */
    ChangeEquipPop.prototype.show = function () {
        for (var i = 0; i < Common.userData.equip.length; i++) {
            var equipImage = new eui.Image();
            equipImage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEquip, this);
            var equipId = Common.userData.equip[i];
            // equipImage.name = i;
            equipImage.source = "weapon2_000" + equipId + "_png";
            equipImage.x = -5;
            equipImage.y = -30;
            equipImage.scaleX = 0.4;
            equipImage.scaleY = 0.4;
            this.equipGroup[i]["image"] = equipImage;
            this.equipGroup[i].addChild(equipImage);
        }
    };
    /**点击装备 */
    ChangeEquipPop.prototype.onEquip = function () {
        this.equipGroup[0]["bg2"].visible = true;
    };
    return ChangeEquipPop;
}(Base));
__reflect(ChangeEquipPop.prototype, "ChangeEquipPop");
//# sourceMappingURL=ChangeEquipPop.js.map