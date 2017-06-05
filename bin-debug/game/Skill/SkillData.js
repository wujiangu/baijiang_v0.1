var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 技能类型
 * 1、瞬发类：无吟唱、无延迟；
 * 2、吟唱类：需要时间吟唱，可以被打断，中断失败；
 * 3、引导类：需要持续施法，一旦停止或被中断，停止技能效果
 */
var SkillType;
(function (SkillType) {
    SkillType[SkillType["SkillType_Momentary"] = 0] = "SkillType_Momentary";
    SkillType[SkillType["SkillType_Singing"] = 1] = "SkillType_Singing";
    SkillType[SkillType["SkillType_Continued"] = 2] = "SkillType_Continued";
})(SkillType || (SkillType = {}));
/**
 * 释放对象
 * 自己、敌方、队友
 */
var RealeseObject;
(function (RealeseObject) {
    RealeseObject[RealeseObject["RealeseObject_Mine"] = 0] = "RealeseObject_Mine";
    RealeseObject[RealeseObject["RealeseObject_Enermy"] = 1] = "RealeseObject_Enermy";
    RealeseObject[RealeseObject["RealeseObject_Friends"] = 2] = "RealeseObject_Friends";
})(RealeseObject || (RealeseObject = {}));
/**
 * 影响对象
 * 自己、敌方、队友、任意、区域
 */
var EffectObject;
(function (EffectObject) {
    EffectObject[EffectObject["EffectObject_Mine"] = 0] = "EffectObject_Mine";
    EffectObject[EffectObject["EffectObject_Enermy"] = 1] = "EffectObject_Enermy";
    EffectObject[EffectObject["EffectObject_Friends"] = 2] = "EffectObject_Friends";
    EffectObject[EffectObject["EffectObject_Any"] = 3] = "EffectObject_Any";
    EffectObject[EffectObject["EffectObject_Area"] = 4] = "EffectObject_Area";
})(EffectObject || (EffectObject = {}));
/**
 * 影响范围
 * 单个、线性、矩形、圆形、扇形、全图
 */
var EffectRange;
(function (EffectRange) {
    EffectRange[EffectRange["EffectRange_Single"] = 0] = "EffectRange_Single";
    EffectRange[EffectRange["EffectRange_Line"] = 1] = "EffectRange_Line";
    EffectRange[EffectRange["EffectRange_Recangle"] = 2] = "EffectRange_Recangle";
    EffectRange[EffectRange["EffectRange_Circle"] = 3] = "EffectRange_Circle";
    EffectRange[EffectRange["EffectRange_Sector"] = 4] = "EffectRange_Sector";
    EffectRange[EffectRange["EffectRange_Map"] = 5] = "EffectRange_Map";
})(EffectRange || (EffectRange = {}));
/**
 * 效果作用
 * 1、瞬间造成物理伤害、魔法伤害；
 * 2、改变敌方的位置、方向（如击飞）；
 * 3、改变自己的位置、方向（如闪现）；
 * 4、产生BUFF
 */
var Effect;
(function (Effect) {
    Effect[Effect["Effect_MomentHurt"] = 0] = "Effect_MomentHurt";
    Effect[Effect["Effect_EnermyPos"] = 1] = "Effect_EnermyPos";
    Effect[Effect["Effect_MinePos"] = 2] = "Effect_MinePos";
    Effect[Effect["Effect_Buff"] = 3] = "Effect_Buff";
})(Effect || (Effect = {}));
var SkillData = (function () {
    function SkillData() {
    }
    return SkillData;
}());
__reflect(SkillData.prototype, "SkillData");
//# sourceMappingURL=SkillData.js.map