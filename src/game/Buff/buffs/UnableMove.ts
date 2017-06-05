/**
 * 无法行动的buff(包括禁锢、眩晕、冰冻等)
 */
class UnableMove extends BuffBase {
    public constructor() {
        super();
        this.buffInit();
    }

    /**初始化 */
    public buffInit() {
        super.buffInit();
        this.buffData.className = "UnableMove";
        this.buffData.superpositionType = SuperpositionType.SuperpositionType_None;
        this.buffData.buffType = BuffType.BuffType_DeBuff;
        this.buffData.disperseType = DisperseType.DisperseType_NoClear;
        this.buffData.controlType = ControlType.YES;
    }

    /**开始 */
    public buffStart(target:any) {
        target.canMove = false;
        this.AddEffect(target);
        let duration = this.buffData.duration * 1000;
        TimerManager.getInstance().doTimer(duration, 0, this.buffEnd, this);
    }

    /**结束 */
    public buffEnd() {
        this.target.canMove = true;
        this.target.isSkillHurt = false;
        this.HideEffect();
        let index = this.target.buff.indexOf(this.buffData.id);
        this.target.buff.splice(index, 1);
        if (this.target.hp > 0) {
            this.target.gotoRun();
        }
        // this.target.removeEffectComplete();
        // this.target.addEffectComplete();
        ObjectPool.push(this);
        TimerManager.getInstance().remove(this.buffEnd, this);
    }

    /**刷新数据 */
    public update() {

    }

    /**增加特效 */
    public AddEffect(target:any) {
        this.target = target;
        this.ShowEffect();
        target.buffArmature.play(this.effectName, 0);
        switch (this.buffData.postionType) {
            case PostionType.PostionType_Foot:
                target.buffArmature.x = 0;
                target.buffArmature.y = 0;
            break;
            case PostionType.PostionType_Head:
                target.buffArmature.x = 0;
                target.buffArmature.y = -90;
            break
        }
    }

    /**显示特效 */
    public ShowEffect() {
        this.target.buffArmature.visible = true;
    }

    /**隐藏特效 */
    public HideEffect() {
        this.target.buffArmature.visible = false;
    }

    private target:any;
}