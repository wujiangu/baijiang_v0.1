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
var BattlePausePop = (function (_super) {
    __extends(BattlePausePop, _super);
    function BattlePausePop() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/popup/battlePausePopSkin.exml";
        return _this;
    }
    BattlePausePop.prototype.childrenCreated = function () {
    };
    BattlePausePop.prototype.onComplete = function () {
        this.btn_leave.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHandler, this);
        this.btn_continue.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHandler, this);
    };
    /**按钮监听 */
    BattlePausePop.prototype.onBtnHandler = function (event) {
        this.parent.removeChild(this);
        switch (event.currentTarget) {
            case this.btn_continue:
                TimerManager.getInstance().startTimer();
                SceneManager.battleScene.startProduce();
                break;
            default:
                Animations.sceneTransition(function () {
                    SceneManager.battleScene.cleanChildren();
                    DragonBonesFactory.getInstance().removeTimer();
                    GameLayerManager.gameLayer().sceneLayer.addChild(SceneManager.mainScene);
                });
                break;
        }
    };
    /**设置弹出的内容显示 */
    BattlePausePop.prototype.show = function () {
    };
    return BattlePausePop;
}(Base));
__reflect(BattlePausePop.prototype, "BattlePausePop");
//# sourceMappingURL=BattlePausePop.js.map