var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 战斗暂停弹窗
 */
var BattleFailPop = (function (_super) {
    __extends(BattleFailPop, _super);
    function BattleFailPop() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/popup/battleFailPopSkin.exml";
        return _this;
    }
    BattleFailPop.prototype.childrenCreated = function () {
    };
    BattleFailPop.prototype.onComplete = function () {
        this.btn_giveup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHandler, this);
        this.btn_reavival.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHandler, this);
    };
    /**按钮监听 */
    BattleFailPop.prototype.onBtnHandler = function (event) {
        this.parent.removeChild(this);
        switch (event.currentTarget) {
            case this.btn_reavival:
                break;
            default:
                Animations.sceneTransition(function () {
                    SceneManager.battleScene.cleanChildren();
                    GameData.curStage = 1;
                    DragonBonesFactory.getInstance().removeTimer();
                    GameLayerManager.gameLayer().sceneLayer.addChild(SceneManager.mainScene);
                });
                break;
        }
    };
    /**设置弹出的内容显示 */
    BattleFailPop.prototype.show = function () {
    };
    return BattleFailPop;
}(Base));
__reflect(BattleFailPop.prototype, "BattleFailPop");
//# sourceMappingURL=BattleFailPop.js.map