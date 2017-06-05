var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 英雄信息面板
 */
var HeroInfoPanel = (function (_super) {
    __extends(HeroInfoPanel, _super);
    function HeroInfoPanel() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompleteHandler, _this);
        _this.skinName = "resource/game_skins/heroInfoSkin.exml";
        return _this;
    }
    HeroInfoPanel.prototype.uiCompleteHandler = function () {
    };
    return HeroInfoPanel;
}(Base));
__reflect(HeroInfoPanel.prototype, "HeroInfoPanel");
//# sourceMappingURL=heroInfoPanel.js.map