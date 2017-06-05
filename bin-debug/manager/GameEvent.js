var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
* 游戏事件管理
*/
var GameEvents = (function () {
    function GameEvents() {
    }
    return GameEvents;
}());
/**切换英雄 */
GameEvents.EVT_CHANGEHERO = "evt_changehero";
/**武器星级重置或解锁 */
GameEvents.EVT_EQUIPSTAR = "evt_equipstar";
/**生产怪物 */
GameEvents.EVT_PRODUCEMONSTER = "evt_producemonster";
/**施放技能 */
GameEvents.EVT_SKILL = "evt_skill";
__reflect(GameEvents.prototype, "GameEvents");
//# sourceMappingURL=GameEvent.js.map