var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Enermy = (function (_super) {
    __extends(Enermy, _super);
    function Enermy() {
        return _super.call(this) || this;
    }
    Enermy.prototype.initDragonBonesArmature = function (name) {
        //受伤动画
        this.effectArmature.register(DragonBonesFactory.getInstance().makeArmature("daoguang_effect", "daoguang_effect", 4.0), [
            BaseGameObject.Action_Hurt
        ]);
        //死亡受伤动画
        this.effectArmature.register(DragonBonesFactory.getInstance().makeArmature("blood_die", "blood_die", 4.0), [
            Enermy.Action_HurtDie
        ]);
        //出场动画
        this.effectArmature.register(DragonBonesFactory.getInstance().makeArmature("enter_monster_01", "enter_monster_01", 10.0), [
            BaseGameObject.Action_Enter
        ]);
        //buff动画
        this.buffArmature.register(DragonBonesFactory.getInstance().makeArmature("diaochan_skill01", "diaochan_skill01", 1.0), [
            "skill01"
        ]);
        this.effectArmature.scaleX = 1.5;
        this.effectArmature.scaleY = 1.5;
        this.buffArmature.scaleX = 1.5;
        this.buffArmature.scaleY = 1.5;
    };
    Enermy.prototype.init = function (name) {
        _super.prototype.init.call(this, name);
        this.buff = [];
        this.isEnemy = true;
        this.isSkillHurt = false;
        this.lastAnimation = "";
    };
    Enermy.prototype.update = function (time) {
        _super.prototype.update.call(this, time);
    };
    /*******************状态的帧回调**********************/
    /**
     * 待机状态
     */
    Enermy.prototype.state_idle = function (time) {
    };
    /**死亡状态 */
    Enermy.prototype.state_dead = function (time) {
    };
    /**
     * 受到攻击状态
     */
    Enermy.prototype.state_hurt = function (time) {
    };
    /**攻击状态 */
    Enermy.prototype.state_attack = function (time) {
    };
    /**
     * 走路巡逻状态
     */
    Enermy.prototype.state_run = function (time) {
        var _this = this;
        if (!this.canMove)
            return;
        this.moveToTarget(GameData.heros[0].x, GameData.heros[0].y, function () {
            var useSpeed = _this.speed * 0.1;
            _this.radian = MathUtils.getRadian2(_this.x, _this.y, _this.endX, _this.endY);
            var animation = _this.getWalkPosition("run", _this.radian);
            _this.deltaX = Math.cos(_this.radian) * useSpeed;
            _this.deltaY = Math.sin(_this.radian) * useSpeed;
            _this.x = _this.x + _this.deltaX;
            _this.y = _this.y + _this.deltaY;
            _this.reverse(_this, _this.radian);
            if (animation != _this.lastAnimation) {
                _this.lastAnimation = animation;
                _this.armature.play(animation, 0);
            }
            var dis = MathUtils.getDistance(GameData.heros[0].x, GameData.heros[0].y, _this.x, _this.y);
            if (dis <= 100) {
                _this.gotoReady();
            }
            else if ((dis > 100) && (dis <= 200)) {
                _this.gotoSkill();
            }
        });
    };
    /****************************************************/
    /*******************进入状态**************************/
    /**
     * 进入待机状态
     */
    Enermy.prototype.gotoIdle = function () {
        this.curState = BaseGameObject.Action_Idle;
        _super.prototype.gotoIdle.call(this);
    };
    /**
     * 进场
     */
    Enermy.prototype.gotoEnter = function () {
        this.curState = BaseGameObject.Action_Enter;
        this.effectArmature.visible = true;
        this.effectArmature.y = 10;
        this.effectArmature.play(this.curState, 1);
    };
    /**奔跑 */
    Enermy.prototype.gotoRun = function () {
        this.lastAnimation = "";
        this.curState = "run";
    };
    /**攻击 */
    Enermy.prototype.gotoAttack = function () {
        this.curState = "attack";
        this.originX = this.x;
        this.originY = this.y;
        /**攻击的弧度 */
        this.radian = MathUtils.getRadian2(this.originX, this.originY, GameData.heros[0].x, GameData.heros[0].y);
        this.reverse(this, this.radian);
    };
    /**
     * 技能
     */
    Enermy.prototype.gotoSkill = function () {
    };
    /**受到攻击 */
    Enermy.prototype.gotoHurt = function (isSkillHurt) {
        if (isSkillHurt === void 0) { isSkillHurt = false; }
        if ((this.curState == Enermy.Action_Dead) || (this.curState == BaseGameObject.Action_Hurt))
            return;
        Animations.shakeScreen(SceneManager.battleScene, 2);
        this.curState = BaseGameObject.Action_Hurt;
        this.armature.play(this.curState, 0);
        this.effectArmature.visible = true;
        if (!isSkillHurt) {
            if (this.hp == 1) {
                this.effectArmature.play(Enermy.Action_HurtDie, 1);
                this.effectArmature.x = 0;
                this.effectArmature.y = 0;
            }
            else {
                this.effectArmature.play(BaseGameObject.Action_Hurt, 1);
                this.effectArmature.x = -15;
                this.effectArmature.y = 0;
            }
            this.effectArmature.addCompleteCallFunc(this.effectArmaturePlayEnd, this);
        }
        this.hp--;
    };
    /**蓄力 */
    Enermy.prototype.gotoReady = function () {
    };
    /**死亡 */
    Enermy.prototype.gotoDead = function () {
        this.curState = Enermy.Action_Dead;
        this.armature.play(Enermy.Action_Dead, 1);
        Common.dispatchEvent(GameEvents.EVT_PRODUCEMONSTER);
        SceneManager.battleScene.battleSceneCom.update();
        //隐藏buff动画
        this.buffArmature.visible = false;
        TimerManager.getInstance().doTimer(5000, 0, this.disappear, this);
    };
    /****************************************************/
    /***********************其他函数**********************/
    /**
     * 移动到指定的位置
     *
     */
    Enermy.prototype.moveToTarget = function (gotoX, gotoY, func) {
        if (func === void 0) { func = null; }
        _super.prototype.moveToTarget.call(this, gotoX, gotoY, func);
        if (func != null) {
            func();
        }
    };
    /**消失 */
    Enermy.prototype.disappear = function () {
        TimerManager.getInstance().remove(this.disappear, this);
        if (this.curState != Enermy.Action_Dead)
            return;
        ObjectPool.push(this);
        if (this.parent && this.parent.removeChild)
            this.parent.removeChild(this);
    };
    /**
     * 帧事件处理函数
     */
    Enermy.prototype.armatureFrame = function (event) {
    };
    /**
     * 特效动画播放完成函数
     */
    Enermy.prototype.effectArmaturePlayEnd = function () {
        if (this.curState == BaseGameObject.Action_Enter || this.curState == BaseGameObject.Action_Hurt) {
            this.effectArmature.visible = false;
        }
        if (this.hp == 0) {
            this.gotoDead();
        }
        else {
            this.gotoRun();
        }
    };
    Enermy.prototype.armaturePlayEnd = function () {
    };
    /**
     * 停止动画
     */
    Enermy.prototype.removeComplete = function () {
        this.armature.removeCompleteCallFunc(this.armaturePlayEnd, this);
        this.effectArmature.removeCompleteCallFunc(this.effectArmaturePlayEnd, this);
    };
    return Enermy;
}(BaseGameObject));
/*************敌方的状态***************/
Enermy.Action_Run01 = "run01";
Enermy.Action_Run02 = "run02";
Enermy.Action_Run03 = "run03";
Enermy.Action_Dead = "dead";
Enermy.Action_HurtDie = "hurt_die";
__reflect(Enermy.prototype, "Enermy");
//# sourceMappingURL=Enermy.js.map