/**
 * 技能基类
 */
class SkillBase {
    public constructor () {
        this.skillData = new SkillData();
    }

    public skillData:SkillData;

    /**初始化 */
    public init() {
        this.skillData.skillType = SkillType.SkillType_Momentary;
        this.skillData.realeseObject = RealeseObject.RealeseObject_Mine;
        this.skillData.effectObject = EffectObject.EffectObject_Enermy;
        this.skillData.effectRange = EffectRange.EffectRange_Single;
        this.skillData.effect = Effect.Effect_MomentHurt;
    }

    /**开始释放 */
    public start(animation:string, target:any) {

    }

    /**结束 */
    public end() {
        
    }

    /**刷新数据 */
    public update(target:any) {

    }

    /**增加特效 */
    public AddEffect() {

    }

    /**显示特效 */
    public ShowEffect() {

    }

    /**隐藏特效 */
    public HideEffect() {

    }
}