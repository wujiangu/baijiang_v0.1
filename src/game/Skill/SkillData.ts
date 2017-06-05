/**
 * 技能类型
 * 1、瞬发类：无吟唱、无延迟；
 * 2、吟唱类：需要时间吟唱，可以被打断，中断失败；
 * 3、引导类：需要持续施法，一旦停止或被中断，停止技能效果
 */
enum SkillType {
    SkillType_Momentary,
    SkillType_Singing,
    SkillType_Continued
}

/**
 * 释放对象
 * 自己、敌方、队友
 */
enum RealeseObject {
    RealeseObject_Mine,
    RealeseObject_Enermy,
    RealeseObject_Friends
}

/**
 * 影响对象
 * 自己、敌方、队友、任意、区域
 */
enum EffectObject {
    EffectObject_Mine,
    EffectObject_Enermy,
    EffectObject_Friends,
    EffectObject_Any,
    EffectObject_Area
}

/**
 * 影响范围
 * 单个、线性、矩形、圆形、扇形、全图
 */
enum EffectRange {
    EffectRange_Single,
    EffectRange_Line,
    EffectRange_Recangle,
    EffectRange_Circle,
    EffectRange_Sector,
    EffectRange_Map,
}

/**
 * 效果作用
 * 1、瞬间造成物理伤害、魔法伤害；
 * 2、改变敌方的位置、方向（如击飞）；
 * 3、改变自己的位置、方向（如闪现）；
 * 4、产生BUFF
 */
enum Effect {
    Effect_MomentHurt,
    Effect_EnermyPos,
    Effect_MinePos,
    Effect_Buff,
}

class SkillData {
    /**技能id */
    public id:number;
    /**技能名字 */
    public name:string;
    /**技能等级 */
    public lv:number;
    /**对应类名 */
    public className:string;
    /**技能类型 */
    public skillType:SkillType;
    /**释放对象 */
    public realeseObject:RealeseObject;
    /**影响对象 */
    public effectObject:EffectObject;
    /**影响范围 */
    public effectRange:EffectRange;
    /**效果作用 */
    public effect:Effect;
    /**距离 */
    public skill_range:number;
}