/**
 * 护盾
 * 免疫一次伤害(CD时间:20s)
 */
class Shield extends BuffBase {
    public constructor() {
        super();
        this.buffInit();
    }

    /**初始化 */
    public buffInit() {
        super.buffInit();
        this.buffData.className = "Shield";
        this.buffData.superpositionType = SuperpositionType.SuperpositionType_None;
        this.buffData.buffType = BuffType.BuffType_DeBuff;
        this.buffData.disperseType = DisperseType.DisperseType_NoClear;
        this.buffData.controlType = ControlType.NO;
        this.buffData.postionType = PostionType.PostionType_Body;
        this.buffData.cd = 20;
        this.buffData.id = 4;
        this.effectName = "skill02";
    }

    /**开始 */
    public buffStart(target:any) {
        this.AddEffect(target);
        // let duration = this.buffData.cd * 1000;
        // TimerManager.getInstance().doTimer(duration, 0, this.buffEnd, this);
    }

    /**结束 */
    public buffEnd() {
        // this.ShowEffect();
        let newBuff = ObjectPool.pop(this.buffData.className);
        this.target.addBuff(newBuff);
        // this.target.playMultiBuff();
        TimerManager.getInstance().remove(this.buffEnd, this);
    }

    /**刷新数据 */
    public update(callBack:Function = null) {
        this.HideEffect();
        let index = this.target.buff.indexOf(this);
        this.target.buff.splice(index, 1);
        ObjectPool.push(this);
        let duration = this.buffData.cd * 1000;
        TimerManager.getInstance().doTimer(duration, 0, this.buffEnd, this);
        if (callBack) {
            callBack();
        }
    }

    /**动画播放完成监听 */
    private armaturePlayEnd():void {
        this.target.skillEffectArmature[1].visible = false;
        this.target.skillEffectArmature[2].visible = true;
        this.target.skillEffectArmature[2].play(this.target.skillEffect["passive1_2"], 0);
        this.position(this.target.skillEffectArmature[2]);
        this.target.skillEffectArmature[1].removeCompleteCallFunc(this.armaturePlayEnd, this);
    }

    /**作用点 */
    private position(target:any):void {
        switch (this.buffData.postionType) {
            case PostionType.PostionType_Foot:
                target.x = 0;
                target.y = 0;
            break;
            case PostionType.PostionType_Head:
                target.x = 0;
                target.y = -90;
            break;
            case PostionType.PostionType_Body:
                target.x = 0;
                target.y = 0;
            break;
        }
    }

    /**增加特效 */
    public AddEffect(target:any) {
        this.target = target;
        this.ShowEffect();
        target.skillEffectArmature[1].play(target.skillEffect["passive1_1"], 1);
        target.skillEffectArmature[1].addCompleteCallFunc(this.armaturePlayEnd, this);
        this.position(target.skillEffectArmature[1]);
    }

    /**显示特效 */
    public ShowEffect() {
        this.target.skillEffectArmature[1].visible = true;
    }

    /**隐藏特效 */
    public HideEffect() {
        this.target.skillEffectArmature[1].visible = false;
        this.target.skillEffectArmature[2].visible = false;
        // this.target.skillArmature.playMulti("skill03_01", 6, 0);
        // this.target.skillArmature.fadeOut(this.effectName);
        // this.target.skillArmature.visible = false;
    }

    private target:any;
}