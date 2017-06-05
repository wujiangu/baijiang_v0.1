var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏数据
 */
var GameData = (function () {
    function GameData() {
    }
    return GameData;
}());
/**杀敌总数 */
GameData.killCount = 0;
/**当前关卡 */
GameData.curStage = 1;
__reflect(GameData.prototype, "GameData");
//# sourceMappingURL=GameData.js.map