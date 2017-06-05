var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TalentIR = (function (_super) {
    __extends(TalentIR, _super);
    function TalentIR(pageCount) {
        var _this = _super.call(this) || this;
        /**位置 */
        _this.position = [[48, 14], [252, 14], [93, 119], [208, 119], [47, 225], [253, 225], [151, 332]];
        _this.page = pageCount;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/game_skins/talentSkinIR.exml";
        return _this;
    }
    TalentIR.prototype.onComplete = function () {
        for (var i = 1; i < 4; i++) {
            for (var j = 0; j < 7; j++) {
                var iconImage = new eui.Image();
                iconImage.source = "talent" + i + "_" + (j + 1) + "_png";
                iconImage.x = this.position[j][0] + (i - 1) * 367;
                iconImage.y = this.position[j][1];
                iconImage.name = "" + (7 * i + j - 6);
                iconImage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onIconListener, this);
                this.talentGroup.addChild(iconImage);
            }
        }
        this.pageText.text = "\u7B2C" + this.page + "\u9875";
    };
    TalentIR.prototype.onIconListener = function (event) {
        Common.log(event.currentTarget.name);
        TalentDialog.instance.showPopup(parseInt(event.currentTarget.name));
    };
    TalentIR.prototype.setTalentDetail = function (pageCount) {
        this.pageText.text = "\u7B2C" + pageCount + "\u9875";
    };
    return TalentIR;
}(Base));
__reflect(TalentIR.prototype, "TalentIR");
//# sourceMappingURL=TalentIR.js.map