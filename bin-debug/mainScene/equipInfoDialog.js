var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 武器详情
 */
var EquipInfoDialog = (function (_super) {
    __extends(EquipInfoDialog, _super);
    function EquipInfoDialog(equip_id) {
        var _this = _super.call(this) || this;
        _this.equip_id = equip_id;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/game_skins/equipInfoSkin.exml";
        _this.tcEquip = RES.getRes("TcEquip_json");
        return _this;
    }
    EquipInfoDialog.prototype.childrenCreated = function () {
        this.createEquip(this.equip_id);
    };
    EquipInfoDialog.prototype.onComplete = function () {
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButton, this);
        this.btn_change.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButton, this);
        this.btn_upgrade.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButton, this);
        this.btn_closeDetail.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButton, this);
    };
    /**
     * 武器属性
     */
    EquipInfoDialog.prototype.createEquip = function (equipId) {
        var _this = this;
        var count = 0;
        this.starGroup.removeChildren();
        this.img_equip.source = "equip" + equipId + "_png";
        for (var i = 0; i < this.tcEquip.length; i++) {
            if (this.tcEquip[i].id == equipId) {
                count = i;
                break;
            }
        }
        this.lab_name.text = this.tcEquip[count].name;
        //创建星级
        for (var i = 0; i < this.tcEquip[count].star; i++) {
            var img_star = new eui.Image();
            img_star.source = "star_0004_png";
            img_star.x = 38 * i;
            this.starGroup.addChild(img_star);
        }
        //创建解锁星级
        for (var i = 0; i < this.tcEquip[count].unlock; i++) {
            var img_star = new eui.Image();
            img_star.source = "star_0001_png";
            img_star.x = 38 * i;
            this.starGroup.addChild(img_star);
        }
        //武器等级
        var lv = this.tcEquip[count].lv;
        this.lab_lv.text = lv + "/30";
        this.img_equip.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.detailGroup.visible = true;
        }, this);
        //武器星级属性
        // let starArray = new Array();
        // starArray["attr1"] = "可解锁新的星级";
        // starArray["btnImage"] = "equip_0004_png";
        // starArray["color"] = "0xffd375";
        // starArray["name"] = "unlock";
        // this.tcEquip[count].starAttr.push(starArray);
        this.arrayStar = new eui.ArrayCollection(this.tcEquip[count].starAttr);
        Common.log("长度" + this.tcEquip[count].starAttr.length);
        this.starList.dataProvider = this.arrayStar;
        this.starList.itemRenderer = EquipStarIR;
        Common.addEventListener(GameEvents.EVT_EQUIPSTAR, this.onResetUnlock, this);
    };
    /**
     * 按键监听
     */
    EquipInfoDialog.prototype.onButton = function (event) {
        switch (event.currentTarget) {
            case this.btn_change:
                if (!this.changeEquipPop) {
                    this.changeEquipPop = new ChangeEquipPop();
                }
                this.addChild(this.changeEquipPop);
                break;
            case this.btn_upgrade:
                if (!this.equipUpgradePop) {
                    this.equipUpgradePop = new EquipUpgradePop();
                }
                this.addChild(this.equipUpgradePop);
                break;
            case this.btn_closeDetail:
                this.detailGroup.visible = false;
                break;
            default:
                this.parent.removeChild(this);
                Common.removeEventListener(GameEvents.EVT_EQUIPSTAR, this.onResetUnlock, this);
                break;
        }
    };
    /**
     * 重置或者解锁按钮
     */
    EquipInfoDialog.prototype.onResetUnlock = function (type) {
        switch (type) {
            case "reset":
                if (!this.resetEquipAttrPop) {
                    this.resetEquipAttrPop = new ResetEquipAttrPop();
                }
                this.addChild(this.resetEquipAttrPop);
                break;
            default:
                if (!this.unlockStarLvPop) {
                    this.unlockStarLvPop = new UnlockStarLvPop();
                }
                this.addChild(this.unlockStarLvPop);
                break;
        }
    };
    return EquipInfoDialog;
}(Base));
__reflect(EquipInfoDialog.prototype, "EquipInfoDialog");
//# sourceMappingURL=equipInfoDialog.js.map