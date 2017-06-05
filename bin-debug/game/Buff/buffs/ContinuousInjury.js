var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 持续性伤害(包括流血、中毒、烧伤等)
 *
 */
var ContinuousInjury = (function (_super) {
    __extends(ContinuousInjury, _super);
    function ContinuousInjury() {
        var _this = _super.call(this) || this;
        _this.buffInit();
        _this.bloodTips = new egret.TextField();
        _this.bloodTips.size = 24;
        _this.bloodTips.textColor = Common.TextColors.red;
        _this.bloodTips.stroke = 2;
        _this.bloodTips.bold = true;
        _this.bloodTips.textAlign = egret.HorizontalAlign.CENTER;
        return _this;
    }
    /**初始化 */
    ContinuousInjury.prototype.buffInit = function () {
        _super.prototype.buffInit.call(this);
        this.buffData.className = "ContinuousInjury";
        this.buffData.superpositionType = SuperpositionType.SuperpositionType_None;
        this.buffData.buffType = BuffType.BuffType_Buff;
        this.buffData.disperseType = DisperseType.DisperseType_NoClear;
        this.buffData.controlType = ControlType.NO;
    };
    /**开始 */
    ContinuousInjury.prototype.buffStart = function (target) {
        target.gotoWalk();
        this.AddEffect(target);
        TimerManager.getInstance().doTimer(1000, this.buffData.duration, this.update, this, this.buffEnd, this);
    };
    /**持续过程 */
    ContinuousInjury.prototype.buffEnd = function () {
        this.target.isSkillHurt = false;
        this.HideEffect();
        var index = this.target.buff.indexOf(this.buffData.id);
        this.target.buff.splice(index, 1);
        ObjectPool.push(this);
        TimerManager.getInstance().removeComplete(this.buffEnd, this);
    };
    /**扣血特效 */
    ContinuousInjury.prototype.bloodEffect = function () {
        if (this.target.scaleX == -1)
            this.bloodTips.scaleX = -1;
        this.target.addChild(this.bloodTips);
        this.bloodTips.y = this.target.buffArmature.y;
        this.bloodTips.text = "-1";
        this.bloodTips.alpha = 0;
        var step2 = function () {
            this.target.hp--;
            if (this.target.hp == 0) {
                TimerManager.getInstance().remove(this.update, this);
                this.target.gotoDead();
            }
        };
        var step1 = function () {
            egret.Tween.get(this.bloodTips).to({ alpha: 0 }, 400).call(step2, this);
        };
        egret.Tween.get(this.bloodTips).to({ y: this.target.buffArmature.y - 50, alpha: 1 }, 400, egret.Ease.backOut).call(step1, this);
    };
    /**刷新数据 */
    ContinuousInjury.prototype.update = function () {
        if (this.target.hp > 0) {
            this.target.gotoWalk();
            this.bloodEffect();
        }
    };
    /**增加特效 */
    ContinuousInjury.prototype.AddEffect = function (target) {
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
    };
    /**显示特效 */
    ContinuousInjury.prototype.ShowEffect = function () {
        this.target.buffArmature.visible = true;
    };
    /**隐藏特效 */
    ContinuousInjury.prototype.HideEffect = function () {
        this.target.buffArmature.visible = false;
    };
    return ContinuousInjury;
}(BuffBase));
__reflect(ContinuousInjury.prototype, "ContinuousInjury");
//# sourceMappingURL=ContinuousInjury.js.map