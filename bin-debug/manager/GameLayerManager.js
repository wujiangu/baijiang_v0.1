var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
  * 游戏容器类
  * All Rights Reserved.
  * EgerPro显示对象层级
  * Main-GameScene（sceneLayer、mainLayer、popLayer、effectLayer、maskLayer、loadLayer）
  *
  */
var GameLayerManager = (function (_super) {
    __extends(GameLayerManager, _super);
    //构造方法
    function GameLayerManager() {
        var _this = _super.call(this) || this;
        /**场景层 如 战场、主城、副本战场之类的 */
        _this.sceneLayer = new eui.UILayer();
        /**主界面中间部件层 */
        _this.mainSceneMidPartLayer = new eui.UILayer();
        /**常驻层 如 玩家的信息、底层按钮 */
        _this.permanentPartLayer = new eui.UILayer();
        /**面板层 如 人物、背包、技能之类的 */
        _this.panelLayer = new eui.UILayer();
        /**玩法面板层 如 PVP、遭遇 */
        _this.playPanelLayer = new eui.UILayer();
        /**特效层 如 闪烁、飘字之类的 */
        _this.effectLayer = new eui.UILayer();
        /**通讯遮罩层 和服务器通讯UI */
        _this.maskLayer = new eui.UILayer();
        /**加载遮罩层 场景切换的时候加载资源UI */
        _this.loadLayer = new eui.UILayer();
        _this.init();
        return _this;
    }
    //游戏容器管理器单例
    GameLayerManager.gameLayer = function () {
        if (!this._instance)
            this._instance = new GameLayerManager();
        return this._instance;
    };
    //初始化场景类
    GameLayerManager.prototype.init = function () {
        this.touchThrough = true;
        this.sceneLayer.touchThrough = true;
        this.panelLayer.touchThrough = true;
        this.effectLayer.touchThrough = true;
        this.maskLayer.touchThrough = true;
        this.loadLayer.touchThrough = true;
        this.addChild(this.sceneLayer);
        this.addChild(this.panelLayer);
        this.addChild(this.effectLayer);
        this.addChild(this.maskLayer);
        this.addChild(this.loadLayer);
    };
    return GameLayerManager;
}(eui.UILayer));
__reflect(GameLayerManager.prototype, "GameLayerManager");
//# sourceMappingURL=GameLayerManager.js.map