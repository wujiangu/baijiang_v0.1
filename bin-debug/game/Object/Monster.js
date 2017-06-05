var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 怪物
 */
var Monster = (function (_super) {
    __extends(Monster, _super);
    function Monster() {
        return _super.call(this) || this;
    }
    Monster.prototype.initDragonBonesArmature = function (name) {
        _super.prototype.initDragonBonesArmature.call(this, name);
        this.armature.register(DragonBonesFactory.getInstance().makeArmature(name, name, 2.0), [
            BaseGameObject.Action_Idle,
            BaseGameObject.Action_Hurt,
            BaseGameObject.Action_Attack01,
            BaseGameObject.Action_Attack02,
            BaseGameObject.Action_Attack03,
            Enermy.Action_Run01,
            Enermy.Action_Run02,
            Enermy.Action_Run03,
            Enermy.Action_Dead,
            Monster.Action_Ready01,
            Monster.Action_Ready02
        ]);
        //增加动画帧执行函数
        this.armature.addFrameCallFunc(this.armatureFrame, this);
        this.armature.scaleX = 1.5;
        this.armature.scaleY = 1.5;
    };
    Monster.prototype.init = function (name) {
        _super.prototype.init.call(this, name);
        this.initDragonBonesArmature(name);
        this.speed = 10;
        this.atk_range = 100;
        this.atk_speed = 30;
        this.readyCount = 0;
        this.hp = ConfigManager.tcStage[GameData.curStage - 1].hp;
        //增加动画完成函数
        this.armature.addCompleteCallFunc(this.armaturePlayEnd, this);
        this.effectArmature.addCompleteCallFunc(this.effectArmaturePlayEnd, this);
        this.gotoEnter();
    };
    /**
     * 待机状态
     */
    Monster.prototype.state_idle = function (time) {
    };
    /**死亡状态 */
    Monster.prototype.state_dead = function (time) {
    };
    /**
     * 走路巡逻状态
     */
    Monster.prototype.state_run = function (time) {
        _super.prototype.state_run.call(this, time);
    };
    /**
     * 蓄力状态
     */
    Monster.prototype.state_xuli01 = function (time) {
    };
    /**
     * 收到攻击状态
     */
    Monster.prototype.state_hurt = function (time) {
        // Common.log(this.effectArmature.getState(this.curState));
    };
    /**攻击状态 */
    Monster.prototype.state_attack = function (time) {
        if (Math.abs(this.sumDeltaX) > this.atk_rangeX || Math.abs(this.sumDeltaY) > this.atk_rangeY) {
            if (this.curState == BaseGameObject.Action_Hurt) {
                return;
            }
            this.gotoRun();
            //怪物到英雄的距离
            var dis = MathUtils.getDistance(this.centerX, this.centerY, GameData.heros[0].x, GameData.heros[0].y);
            var dx = dis * Math.cos(this.heroRadian);
            var dy = dis * Math.sin(this.heroRadian);
            if ((Math.abs(dx) <= this.atk_range / 2) && (Math.abs(dy) <= 33)) {
                GameData.heros[0].gotoHurt();
            }
            else {
            }
        }
        this.x = this.x + this.deltaX;
        this.y = this.y + this.deltaY;
        this.sumDeltaX = this.sumDeltaX + this.deltaX;
        this.sumDeltaY = this.sumDeltaY + this.deltaY;
    };
    /**
     * 进场
     */
    Monster.prototype.gotoEnter = function () {
        _super.prototype.gotoEnter.call(this);
        this.armature.play(BaseGameObject.Action_Idle, 0);
    };
    /**奔跑 */
    Monster.prototype.gotoRun = function () {
        _super.prototype.gotoRun.call(this);
    };
    /**攻击 */
    Monster.prototype.gotoAttack = function () {
        _super.prototype.gotoAttack.call(this);
        this.sumDeltaX = 0;
        this.sumDeltaY = 0;
        var useSpeed = this.atk_speed * 0.5;
        var animation = this.getWalkPosition("attack", this.radian);
        var dx = Math.cos(this.radian) * this.atk_range;
        var dy = Math.sin(this.radian) * this.atk_range;
        this.atk_rangeX = Math.abs(dx);
        this.atk_rangeY = Math.abs(dy);
        /**中心点 */
        this.centerX = (2 * this.originX + dx) / 2;
        this.centerY = (2 * this.originY + dy) / 2;
        this.heroRadian = MathUtils.getRadian2(this.centerX, this.centerY, GameData.heros[0].x, GameData.heros[0].y);
        this.deltaX = Math.cos(this.radian) * useSpeed;
        this.deltaY = Math.sin(this.radian) * useSpeed;
        this.armature.play(animation, 0);
    };
    /**受到攻击 */
    Monster.prototype.gotoHurt = function (isSkillHurt) {
        if (isSkillHurt === void 0) { isSkillHurt = false; }
        _super.prototype.gotoHurt.call(this);
    };
    /**增加buff */
    Monster.prototype.addBuff = function (buff) {
        if (this.curState == Monster.Action_Dead || this.curState == BaseGameObject.Action_Hurt)
            return;
        if (this.isExistBuff(buff) && (buff.buffData.controlType == ControlType.YES) && (buff.buffData.superpositionType == SuperpositionType.SuperpositionType_None))
            return;
        this.buff.push(buff);
        this.armature.play(BaseGameObject.Action_Hurt);
        buff.buffStart(this);
    };
    /**蓄力 */
    Monster.prototype.gotoReady = function () {
        if (!this.canMove)
            return;
        this.curState = Monster.Action_Ready01;
        this.readyCount = 0;
        this.armature.play(Monster.Action_Ready01, 3);
        this.armature.addCompleteCallFunc(this.armaturePlayEnd, this);
    };
    /**死亡 */
    Monster.prototype.gotoDead = function () {
        _super.prototype.gotoDead.call(this);
    };
    /**消失 */
    Monster.prototype.disappear = function () {
        _super.prototype.disappear.call(this);
        var index = GameData.monsters.indexOf(this);
        GameData.monsters.splice(index, 1);
    };
    /**
     * 帧事件处理函数
     */
    Monster.prototype.armatureFrame = function (event) {
        _super.prototype.armatureFrame.call(this, event);
    };
    /**
     * 特效动画播放完成函数
     */
    Monster.prototype.effectArmaturePlayEnd = function () {
        _super.prototype.effectArmaturePlayEnd.call(this);
    };
    /**
     * 动画播放完成函数
     */
    Monster.prototype.armaturePlayEnd = function () {
        _super.prototype.armaturePlayEnd.call(this);
        switch (this.curState) {
            case Monster.Action_Ready01:
                this.readyCount++;
                if (this.readyCount == 3) {
                    this.gotoAttack();
                }
                break;
        }
    };
    /**
     * 停止动画
     */
    Monster.prototype.removeComplete = function () {
        _super.prototype.removeComplete.call(this);
    };
    /**
     * 停止人物动作动画
     */
    Monster.prototype.removeActComplete = function () {
        this.armature.removeCompleteCallFunc(this.armaturePlayEnd, this);
    };
    Monster.prototype.addEffectComplete = function () {
        this.effectArmature.addCompleteCallFunc(this.effectArmaturePlayEnd, this);
    };
    /**停止特效动画 */
    Monster.prototype.removeEffectComplete = function () {
        this.effectArmature.removeCompleteCallFunc(this.effectArmaturePlayEnd, this);
    };
    return Monster;
}(Enermy));
/*************英雄的动作***************/
Monster.Action_Ready01 = "xuli01";
Monster.Action_Ready02 = "xuli02";
Monster.Action_Skill = "skill01";
__reflect(Monster.prototype, "Monster");
//# sourceMappingURL=Monster.js.map