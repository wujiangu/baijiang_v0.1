/**
 * 持续性伤害(包括流血、中毒、烧伤等)
 * 
 */
class ContinuousInjury extends BuffBase {
    public constructor() {
        super();
        this.buffInit();
        this.bloodTips = new egret.TextField();
        this.bloodTips.size = 24;
        this.bloodTips.textColor = Common.TextColors.red;
        this.bloodTips.stroke  = 2;
        this.bloodTips.bold = true;
        this.bloodTips.textAlign = egret.HorizontalAlign.CENTER;
    }

    /**初始化 */
    public buffInit() {
        super.buffInit();
        this.buffData.className = "ContinuousInjury";
        this.buffData.superpositionType = SuperpositionType.SuperpositionType_None;
        this.buffData.buffType = BuffType.BuffType_Buff;
        this.buffData.disperseType = DisperseType.DisperseType_NoClear;
        this.buffData.controlType = ControlType.NO;
    }

    /**开始 */
    public buffStart(target:any) {
        target.gotoWalk();
        this.AddEffect(target);
        TimerManager.getInstance().doTimer(1000, this.buffData.duration, this.update, this, this.buffEnd, this);
    }

    /**持续过程 */
    public buffEnd() {
        this.target.isSkillHurt = false;
        this.HideEffect();
        let index = this.target.buff.indexOf(this.buffData.id);
        this.target.buff.splice(index, 1);
        ObjectPool.push(this);
        TimerManager.getInstance().removeComplete(this.buffEnd, this);
    }

    /**扣血特效 */
    public bloodEffect() {
        if (this.target.scaleX == -1) this.bloodTips.scaleX = -1;
        this.target.addChild(this.bloodTips);
        this.bloodTips.y = this.target.buffArmature.y;
        this.bloodTips.text = "-1";
        this.bloodTips.alpha = 0;
        var step2:Function = function(){
            this.target.hp --;
            if (this.target.hp == 0){
                TimerManager.getInstance().remove(this.update, this);
                this.target.gotoDead();
            }
        };
        var step1:Function = function(){
            egret.Tween.get(this.bloodTips).to({alpha:0}, 400).call(step2, this);   
        };
        egret.Tween.get(this.bloodTips).to({y:this.target.buffArmature.y - 50,alpha:1}, 400, egret.Ease.backOut).call(step1, this);
    }

    /**刷新数据 */
    public update() {
        if (this.target.hp > 0) {
            this.target.gotoWalk();
            this.bloodEffect();
        }
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
            break;
            case PostionType.PostionType_Body:
                target.buffArmature.x = 0;
                target.buffArmature.y = -45;
            break;
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
    private bloodTips:egret.TextField;
}