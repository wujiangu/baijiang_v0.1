var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 进入游戏场景
 */
var EnterGameScene = (function (_super) {
    __extends(EnterGameScene, _super);
    function EnterGameScene() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompleteHandler, _this);
        _this.skinName = "resource/game_skins/enterGameSkin.exml";
        return _this;
    }
    EnterGameScene.prototype.uiCompleteHandler = function () {
        this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnterGame, this);
        this.btn_rank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRank, this);
    };
    EnterGameScene.prototype.createChildren = function () {
    };
    EnterGameScene.prototype.childrenCreated = function () {
        //加入敏感词
        var array = RES.getRes("sensitiveWords_json");
        SensitiveWordFilter.GetInstance().regSensitiveWords(array);
    };
    /**
     * 进入游戏
     */
    EnterGameScene.prototype.onEnterGame = function () {
        // var data:any = {};
        // data.uid = 1;
        // data.channel = 1000;
        // data.appid = 1112169032;
        // data.nick = "dddsf";
        // data.avatar = "";
        // data.sex = 1;
        // data.time = Math.floor(new Date().getTime()/1000);
        // data.reurl = "https://www.shandw.com";
        // data.cburl = "https://www.shandw.com/v2/mobile/detail/";
        // data.paydata = "succeed";
        // let time = Math.floor(new Date().getTime()/1000);
        // data = `channel=9166&uid=3333&nick=hello&avatar=&sex=1&time=${time}&reurl=https://www.shandw.com&cburl=https://www.shandw.com/v2/mobile/detail/`
        // NetConnect.send(1, data, function(data) {
        // })
        GameLayerManager.gameLayer().sceneLayer.removeChildren();
        SceneManager.mainScene = new MainScene();
        GameLayerManager.gameLayer().sceneLayer.addChild(SceneManager.mainScene);
    };
    /**
     * 排行榜
     */
    EnterGameScene.prototype.onRank = function () {
    };
    return EnterGameScene;
}(Base));
__reflect(EnterGameScene.prototype, "EnterGameScene");
//# sourceMappingURL=EnterGameScene.js.map