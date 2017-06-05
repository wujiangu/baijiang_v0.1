var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Boss
 * 技能1的范围: 宽:180, 高:85
 */
var Boss = (function (_super) {
    __extends(Boss, _super);
    function Boss() {
        return _super.call(this) || this;
    }
    Boss.prototype.initDragonBonesArmature = function (name) {
        _super.prototype.initDragonBonesArmature.call(this, name);
        this.armature.register(DragonBonesFactory.getInstance().makeArmature(name, name, 4.0), [
            BaseGameObject.Action_Hurt,
            BaseGameObject.Action_Attack01,
            BaseGameObject.Action_Attack02,
            BaseGameObject.Action_Attack03,
            Enermy.Action_Dead,
            Enermy.Action_Run01,
            Enermy.Action_Run02,
            Enermy.Action_Run03,
            Boss.Action_Idle01,
            Boss.Action_Skill01_01,
            Boss.Action_Skill01_02,
            Boss.Action_Skill01_03,
            Boss.Action_Skill02
        ]);
        //增加动画帧执行函数
        this.armature.addFrameCallFunc(this.armatureFrame, this);
        //释放主动技能动画
        this.skillArmature.register(DragonBonesFactory.getInstance().makeArmature("Boss01_effect01", "Boss01_effect01", 2.0), [
            "skill01"
        ]);
        this.armature.scaleX = 1.5;
        this.armature.scaleY = 1.5;
        // this.skillArmature.scaleX = 1.5;
        // this.skillArmature.scaleY = 1.5;
    };
    Boss.prototype.init = function (name) {
        _super.prototype.init.call(this, name);
        this.initDragonBonesArmature(name);
        this.skillPoint = new egret.Point();
        this.offset = [[50, -25], [25, -25], [0, 0], [-50, 0], [-50, -25]];
        this.speed = 10;
        this.atk_range = 200;
        this.atk_speed = 50;
        this.skill_status = 0;
        this.hp = 5;
        //增加动画完成函数
        this.armature.addCompleteCallFunc(this.armaturePlayEnd, this);
        this.effectArmature.addCompleteCallFunc(this.effectArmaturePlayEnd, this);
        this.skillArmature.addCompleteCallFunc(this.skillArmaturePlayEnd, this);
        this.gotoEnter();
    };
    /**
     * 待机状态
     */
    Boss.prototype.state_idle = function (time) {
    };
    /**
     * 释放技能
     */
    Boss.prototype.state_skill01 = function (time) {
        if (this.skill_status == 1) {
            this.skillArmature.x = this.skillArmature.x + this.deltaX;
            this.skillArmature.y = this.skillArmature.y + this.deltaY;
            //人物到技能的坐标
            var dx = 82 * Math.cos(this.radian + Math.PI / 2);
            var dy = 82 * Math.sin(this.radian + Math.PI / 2);
            //初始点的对角点
            this.skillPoint = this.skillArmature.localToGlobal();
            var beginX = this.skillPoint.x;
            var beginY = this.skillPoint.y;
            var x1 = void 0;
            var y1 = void 0;
            if (this.scaleX == -1) {
                x1 = beginX + this.skillArmature.width * Math.cos(this.radian) + dx;
                y1 = beginY + this.skillArmature.width * Math.sin(this.radian) + dy;
            }
            else {
                x1 = beginX + this.skillArmature.width * Math.cos(this.radian) - dx;
                y1 = beginY + this.skillArmature.width * Math.sin(this.radian) - dy;
            }
            var centerX = (beginX + x1) / 2;
            var centerY = (beginY + y1) / 2;
            var dis = MathUtils.getDistance(centerX, centerY, GameData.heros[0].x, GameData.heros[0].y);
            var tempRadian = MathUtils.getRadian2(centerX, centerY, GameData.heros[0].x, GameData.heros[0].y);
            var angle = Math.abs(tempRadian - this.radian);
            var deltax = dis * Math.cos(angle);
            var deltay = dis * Math.sin(angle);
            if ((Math.abs(deltax) <= 45) && (Math.abs(deltay) <= 43)) {
                if (this.skill_atkStatus == 0) {
                    this.skill_atkStatus = 1;
                    GameData.heros[0].gotoHurt();
                }
            }
        }
    };
    /**
     * 奔跑状态
     */
    Boss.prototype.state_run = function (time) {
        _super.prototype.state_run.call(this, time);
    };
    /**
     * 攻击状态
     */
    Boss.prototype.state_attack = function (time) {
    };
    /**
     * 收到攻击状态
     */
    Boss.prototype.state_hurt = function (time) {
    };
    /**奔跑 */
    Boss.prototype.gotoRun = function () {
        _super.prototype.gotoRun.call(this);
    };
    /**
     * 受伤
     */
    Boss.prototype.gotoHurt = function (isSkillHurt) {
        if (isSkillHurt === void 0) { isSkillHurt = false; }
        _super.prototype.gotoHurt.call(this);
        this.skillArmature.visible = false;
    };
    /**蓄力 */
    Boss.prototype.gotoReady = function () {
        this.gotoAttack();
    };
    /**攻击 */
    Boss.prototype.gotoAttack = function () {
        _super.prototype.gotoAttack.call(this);
        this.atk_direction = this.getWalkPosition("attack", this.radian);
        this.armature.play(this.atk_direction, 1);
        this.armature.addCompleteCallFunc(this.armaturePlayEnd, this);
    };
    /**
     * 技能
     */
    Boss.prototype.gotoSkill = function () {
        this.curState = "skill01";
        this.originX = this.x;
        this.originY = this.y;
        /**攻击的弧度 */
        this.radian = MathUtils.getRadian2(this.originX, this.originY, GameData.heros[0].x, GameData.heros[0].y);
        this.atk_direction = this.getWalkPosition("skill01_", this.radian);
        this.armature.play(this.atk_direction, 1);
    };
    /**
     * 进场
     */
    Boss.prototype.gotoEnter = function () {
        _super.prototype.gotoEnter.call(this);
        this.armature.play(Boss.Action_Idle01, 0);
    };
    /**
     * 技能特效的角度及移动距离
     */
    Boss.prototype.skillRadian = function () {
        this.sumDeltaX = 0;
        this.sumDeltaY = 0;
        this.originX = this.x;
        this.originY = this.y;
        var useSpeed = this.atk_speed * 0.1;
        this.radian = MathUtils.getRadian2(this.originX, this.originY, GameData.heros[0].x, GameData.heros[0].y);
        var animation = this.getAttackPosition(this.radian);
        this.offsetIndex = animation["id"];
        this.deltaX = Math.cos(this.radian) * useSpeed;
        this.deltaY = Math.sin(this.radian) * useSpeed;
        this.skillArmature.scaleX = 1;
        this.skillArmature.scaleY = 1;
        this.skillArmature.rotation = MathUtils.getAngle(this.radian) + 360;
        if (this.reverse(this, this.radian)) {
            this.skillArmature.scaleX = -1;
            this.skillArmature.scaleY = -1;
            this.skillArmature.rotation = 360 - MathUtils.getAngle(this.radian);
            this.deltaX = -this.deltaX;
        }
        this.skillArmature.x = this.offset[this.offsetIndex][0];
        this.skillArmature.y = this.offset[this.offsetIndex][1];
        var dx = Math.cos(this.radian) * this.atk_range;
        var dy = Math.sin(this.radian) * this.atk_range;
        this.atk_rangeX = Math.abs(dx);
        this.atk_rangeY = Math.abs(dy);
    };
    /**增加buff */
    Boss.prototype.addBuff = function (buff) {
        if (this.curState == Boss.Action_Dead || this.curState == BaseGameObject.Action_Hurt)
            return;
        if (this.isExistBuff(buff) && (buff.buffData.controlType == ControlType.YES) && (buff.buffData.superpositionType == SuperpositionType.SuperpositionType_None))
            return;
        this.buff.push(buff);
        this.armature.play(BaseGameObject.Action_Hurt);
        buff.buffStart(this);
    };
    /**死亡 */
    Boss.prototype.gotoDead = function () {
        _super.prototype.gotoDead.call(this);
    };
    /**消失 */
    Boss.prototype.disappear = function () {
        _super.prototype.disappear.call(this);
        var index = GameData.boss.indexOf(this);
        GameData.boss.splice(index, 1);
    };
    /**
     * 帧事件处理函数
     */
    Boss.prototype.armatureFrame = function (event) {
        if (this.curState == "skill01") {
            this.skillArmature.visible = true;
            this.skill_atkStatus = 0;
            this.skillRadian();
            this.skillArmature.play(this.curState, 1);
            this.skill_status = 1;
        }
        else if (this.curState == "attack") {
            //怪物到英雄的距离
            var radian;
            var dis = MathUtils.getDistance(this.x, this.y, GameData.heros[0].x, GameData.heros[0].y);
            if (Math.abs(dis) <= 100) {
                radian = MathUtils.getRadian2(this.originX, this.originY, GameData.heros[0].x, GameData.heros[0].y);
                //向上
                if (this.atk_direction == "attack01") {
                    if (Math.sin(radian) * dis < 0)
                        GameData.heros[0].gotoHurt();
                }
                else if (this.atk_direction == "attack02") {
                    if (this.reverse(this, this.radian)) {
                        if (Math.cos(radian) * dis < 0)
                            GameData.heros[0].gotoHurt();
                    }
                    else {
                        if (Math.cos(radian) * dis > 0)
                            GameData.heros[0].gotoHurt();
                    }
                }
                else if (this.atk_direction == "attack03") {
                    if (Math.sin(radian) * dis > 0)
                        GameData.heros[0].gotoHurt();
                }
            }
        }
    };
    Boss.prototype.skillArmaturePlayEnd = function () {
        if (this.curState == "skill01") {
            this.skillArmature.visible = false;
            this.skill_status = 0;
            this.gotoRun();
        }
    };
    /**
     * 特效动画播放完成函数
     */
    Boss.prototype.effectArmaturePlayEnd = function () {
        _super.prototype.effectArmaturePlayEnd.call(this);
    };
    Boss.prototype.armaturePlayEnd = function () {
        _super.prototype.armaturePlayEnd.call(this);
        if (this.curState == BaseGameObject.Action_Enter || this.curState == "attack") {
            this.gotoRun();
        }
    };
    /**
     * 停止动画
     */
    Boss.prototype.removeComplete = function () {
        _super.prototype.removeComplete.call(this);
    };
    /**
     * 停止人物动作动画
     */
    Boss.prototype.removeActComplete = function () {
        this.armature.removeCompleteCallFunc(this.armaturePlayEnd, this);
    };
    return Boss;
}(Enermy));
/*************英雄的动作***************/
Boss.Action_Skill01_01 = "skill01_01";
Boss.Action_Skill01_02 = "skill01_02";
Boss.Action_Skill01_03 = "skill01_03";
Boss.Action_Skill02 = "skill02";
Boss.Action_Idle01 = "idle01";
__reflect(Boss.prototype, "Boss");
//# sourceMappingURL=Boss.js.map