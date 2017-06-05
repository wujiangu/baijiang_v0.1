var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 技能基类
 */
var SkillBase = (function () {
    function SkillBase() {
        this.skillData = new SkillData();
    }
    /**初始化 */
    SkillBase.prototype.init = function () {
        this.skillData.skillType = SkillType.SkillType_Momentary;
        this.skillData.realeseObject = RealeseObject.RealeseObject_Mine;
        this.skillData.effectObject = EffectObject.EffectObject_Enermy;
        this.skillData.effectRange = EffectRange.EffectRange_Single;
        this.skillData.effect = Effect.Effect_MomentHurt;
    };
    /**开始释放 */
    SkillBase.prototype.start = function (animation, target) {
    };
    /**结束 */
    SkillBase.prototype.end = function () {
    };
    /**刷新数据 */
    SkillBase.prototype.update = function (target) {
    };
    /**增加特效 */
    SkillBase.prototype.AddEffect = function () {
    };
    /**显示特效 */
    SkillBase.prototype.ShowEffect = function () {
    };
    /**隐藏特效 */
    SkillBase.prototype.HideEffect = function () {
    };
    return SkillBase;
}());
__reflect(SkillBase.prototype, "SkillBase");
//# sourceMappingURL=SkillBase.js.map