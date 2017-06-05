var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 叠加规则
 * 1:不叠加，2:覆盖，3:叠加
 */
var SuperpositionType;
(function (SuperpositionType) {
    SuperpositionType[SuperpositionType["SuperpositionType_None"] = 0] = "SuperpositionType_None";
    SuperpositionType[SuperpositionType["SuperpositionType_Overlay"] = 1] = "SuperpositionType_Overlay";
    SuperpositionType[SuperpositionType["SuperpositionType_Add"] = 2] = "SuperpositionType_Add";
})(SuperpositionType || (SuperpositionType = {}));
/**
 * buff类型
 * 1:增益，2:减益
 */
var BuffType;
(function (BuffType) {
    BuffType[BuffType["BuffType_Buff"] = 0] = "BuffType_Buff";
    BuffType[BuffType["BuffType_DeBuff"] = 1] = "BuffType_DeBuff";
})(BuffType || (BuffType = {}));
/**
 * 清除类型
 * 1:不可驱散，2:可以驱散
 */
var DisperseType;
(function (DisperseType) {
    DisperseType[DisperseType["DisperseType_NoClear"] = 0] = "DisperseType_NoClear";
    DisperseType[DisperseType["DisperseType_Clear"] = 1] = "DisperseType_Clear";
})(DisperseType || (DisperseType = {}));
/**
 * 作用点
 * 1:头部，2:身体，3:脚部，4:效果
 */
var PostionType;
(function (PostionType) {
    PostionType[PostionType["PostionType_Head"] = 0] = "PostionType_Head";
    PostionType[PostionType["PostionType_Body"] = 1] = "PostionType_Body";
    PostionType[PostionType["PostionType_Foot"] = 2] = "PostionType_Foot";
    PostionType[PostionType["PostionType_Effect"] = 3] = "PostionType_Effect";
})(PostionType || (PostionType = {}));
/**
 * 是否为控制类型
 */
var ControlType;
(function (ControlType) {
    ControlType[ControlType["YES"] = 0] = "YES";
    ControlType[ControlType["NO"] = 1] = "NO";
})(ControlType || (ControlType = {}));
var BuffData = (function () {
    function BuffData() {
    }
    return BuffData;
}());
__reflect(BuffData.prototype, "BuffData");
//# sourceMappingURL=BuffData.js.map