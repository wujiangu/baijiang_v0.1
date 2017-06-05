var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 英雄
 */
var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero() {
        var _this = _super.call(this) || this;
        _this.comboTimer = new egret.Timer(20, 100);
        _this.comboTimer.stop();
        _this.comboTimer.addEventListener(egret.TimerEvent.TIMER, _this.onCombo, _this);
        _this.comboTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, _this.onComboComplete, _this);
        return _this;
    }
    Hero.prototype.initDragonBonesArmature = function (name) {
        this.armature.register(DragonBonesFactory.getInstance().makeArmature(name, name, 4.0), [
            BaseGameObject.Action_Enter,
            BaseGameObject.Action_Idle,
            BaseGameObject.Action_Hurt,
            BaseGameObject.Action_Attack01,
            BaseGameObject.Action_Attack02,
            BaseGameObject.Action_Attack03,
            BaseGameObject.Action_Attack04,
            BaseGameObject.Action_Attack05,
            Hero.Action_Run01,
            Hero.Action_Run02,
            Hero.Action_Run03,
            Hero.Action_Skill
        ]);
        this.createSwordLight();
        this.hideBone(name, "effect_att01");
        //增加动画帧执行函数
        this.armature.addFrameCallFunc(this.armatureFrame, this);
        //受伤动画
        this.effectArmature.register(DragonBonesFactory.getInstance().makeArmature("daoguang_effect", "daoguang_effect", 4.0), [
            BaseGameObject.Action_Hurt
        ]);
        /**从配置文件读取技能动画 */
        var heroConfig = ConfigManager.heroConfig[name];
        this.skillEffect = heroConfig["animation"];
        var arrEffect = Object.keys(this.skillEffect);
        var armatureName = name + "_skill";
        this.skillEffectArmature = [];
        for (var i = 0; i < arrEffect.length; i++) {
            var armatureContainer = new DragonBonesArmatureContainer();
            this.addChild(armatureContainer);
            armatureContainer.register(DragonBonesFactory.getInstance().makeArmature(armatureName, armatureName, 4.0), [
                this.skillEffect[arrEffect[i]],
            ]);
            armatureContainer.scaleX = 1.5;
            armatureContainer.scaleY = 1.5;
            this.skillEffectArmature.push(armatureContainer);
        }
        this.skill = ObjectPool.pop(heroConfig["skill1"], [this]);
        this.skill.init();
        this.armature.scaleX = 1.5;
        this.armature.scaleY = 1.5;
        this.effectArmature.scaleX = 1.5;
        this.effectArmature.scaleY = 1.5;
    };
    Hero.prototype.init = function (name) {
        var _this = this;
        _super.prototype.init.call(this, name);
        this.initDragonBonesArmature(name);
        this.name = name;
        this.offset = [[3, -111], [75, -107], [119, -48], [75, 14], [0, 23]];
        // this.offset = [[2, -74], [49, -71], [79, -32], [50, 9], [0, 15]]
        this.speed = 30;
        this.atk_range = 200;
        this.atk_speed = 150;
        this.combo = 0;
        this.isEnemy = false;
        this.isPlay = false;
        this.isAttack = false;
        this.monsterRadian = [];
        this.enermy = [];
        this.buff = [];
        this.passiveRelease = false;
        this.lastAnimation = "";
        this.skill.skillData.skill_range = 150;
        this.visible = false;
        this.comboTimer.reset();
        egret.setTimeout(function () {
            _this.visible = true;
            _this.gotoEnter();
        }, this, 500);
        //增加动画完成函数
        this.armature.addCompleteCallFunc(this.armaturePlayEnd, this);
        this.effectArmature.addCompleteCallFunc(this.effectArmaturePlayEnd, this);
        this.effectArmature.visible = false;
    };
    /**
     * 设置buff或被动技能
     */
    Hero.prototype.setBuff = function () {
        var buff = ConfigManager.heroConfig[this.name].buff;
        for (var i = 0; i < buff.length; i++) {
            var newBuff = ObjectPool.pop(buff[i].name);
            this.addBuff(newBuff);
        }
        // this.playMultiBuff();
    };
    /**
     * 混合buff动画(不用)
     */
    Hero.prototype.playMultiBuff = function () {
        this.buffEffect = [];
        this.buffId = [];
        for (var i = 0; i < this.buff.length; i++) {
            if (this.buff[i].effectName && this.buff[i].buffData.id) {
                this.buffEffect.push(this.buff[i].effectName);
                this.buffId.push(this.buff[i].buffData.id);
            }
        }
        // this.skillArmature.playMulti(this.buffEffect, this.buffId);
    };
    /**增加buff */
    Hero.prototype.addBuff = function (buff) {
        if (this.isExistBuff(buff) && (buff.buffData.controlType == ControlType.YES) && (buff.buffData.superpositionType == SuperpositionType.SuperpositionType_None))
            return;
        this.buff.push(buff);
        buff.buffStart(this);
    };
    /**
     * 设置敌人(当英雄进行攻击、释放技能时，判断受到影响的敌人)
     */
    Hero.prototype.setEnermy = function () {
        this.enermy = [];
        for (var i = 0; i < GameData.boss.length; i++) {
            this.enermy.push(GameData.boss[i]);
        }
        for (var i = 0; i < GameData.monsters.length; i++) {
            this.enermy.push(GameData.monsters[i]);
        }
    };
    /**
     * 获取敌人
     */
    Hero.prototype.getEnermy = function () {
        return this.enermy;
    };
    /**
     * 每帧数据更新
     */
    Hero.prototype.update = function (time) {
        _super.prototype.update.call(this, time);
        //释放被动技能
        if (this.passiveRelease) {
            for (var i = 0; i < this.buff.length; i++) {
                if (this.buff[i].buffData.id == 6) {
                    this.buff[i].update();
                }
            }
        }
    };
    /**
     * 连击计时器监听
     */
    Hero.prototype.onCombo = function (event) {
        if (this.isHit) {
            this.comboTimer.reset();
            this.comboTimer.start();
            this.isHit = false;
        }
    };
    /**
     * 连击结束监听
     */
    Hero.prototype.onComboComplete = function () {
        this.combo = 0;
        this.isHit = false;
        this.comboTimer.reset();
        SceneManager.battleScene.hideCombo();
    };
    /**
     * 待机状态
     */
    Hero.prototype.state_idle = function (time) {
    };
    /**
     * 释放技能
     */
    Hero.prototype.state_skill01 = function (time) {
        this.skill.update(this);
    };
    /**
     * 奔跑状态
     */
    Hero.prototype.state_run = function (time) {
        if ((this.originX == this.endX) && (this.originY == this.endY)) {
            return;
        }
        var gotoX = this.x + this.deltaX;
        var gotoY = this.y + this.deltaY;
        this.x = gotoX;
        this.y = gotoY;
    };
    /**
     * 攻击状态
     */
    Hero.prototype.state_attack = function (time) {
        var _this = this;
        if (Math.abs(this.sumDeltaX) > this.atk_rangeX || Math.abs(this.sumDeltaY) > this.atk_rangeY) {
            this.gotoIdle();
            this.img_swordLight.visible = false;
            this.setEnermy();
            //怪物到中点的距离
            for (var i = 0; i < this.enermy.length; i++) {
                var radian = MathUtils.getRadian2(this.centerX, this.centerY, this.enermy[i].x, this.enermy[i].y);
                var dis = MathUtils.getDistance(this.centerX, this.centerY, this.enermy[i].x, this.enermy[i].y);
                var angle = Math.abs(this.atk_radian - radian);
                var dx = dis * Math.cos(angle);
                var dy = dis * Math.sin(angle);
                if ((Math.abs(dx) <= this.atk_range / 2) && (Math.abs(dy) <= 30)) {
                    if (this.enermy[i].curState != Enermy.Action_Dead && this.enermy[i].curState != BaseGameObject.Action_Hurt) {
                        this.isHit = true;
                        this.combo++;
                    }
                    this.enermy[i].gotoHurt();
                }
                else {
                }
            }
            if (this.combo >= 1) {
                if (!this.comboTimer.running)
                    this.comboTimer.start();
                if (this.combo >= 2)
                    SceneManager.battleScene.update(this.combo);
            }
            egret.setTimeout(function () { _this.isAttack = false; }, this, 100);
            return;
        }
        this.x = this.x + this.deltaX;
        this.y = this.y + this.deltaY;
        this.sumDeltaX = this.sumDeltaX + this.deltaX;
        this.sumDeltaY = this.sumDeltaY + this.deltaY;
        this.img_swordLight.x = this.offset[this.offsetIndex][0];
        this.img_swordLight.y = this.offset[this.offsetIndex][1];
    };
    /**
     * 收到攻击状态
     */
    Hero.prototype.state_hurt = function (time) {
        // Common.log(this.effectArmature.getState(this.curState));
    };
    /**
     * 释放被动技能
     */
    Hero.prototype.setPassiveRelease = function () {
        this.passiveRelease = true;
    };
    /**
     * 走到指定的位置
     *
     */
    Hero.prototype.moveToTarget = function (gotoX, gotoY, func) {
        if (func === void 0) { func = null; }
        _super.prototype.moveToTarget.call(this, gotoX, gotoY, func);
        this.img_swordLight.visible = false;
        if (this.isAttack || this.curState == BaseGameObject.Action_Hurt || this.curState == Hero.Action_Skill || this.curState == BaseGameObject.Action_Enter)
            return;
        if (func != null) {
            func();
        }
    };
    /**
     * 进入待机状态
     */
    Hero.prototype.gotoIdle = function () {
        this.curState = Hero.Action_Idle;
        this.isAttack = false;
        this.isPlay = false;
        _super.prototype.gotoIdle.call(this);
    };
    /**奔跑 */
    Hero.prototype.gotoRun = function () {
        this.curState = "run";
        var useSpeed = this.speed * 0.1;
        this.radian = MathUtils.getRadian2(this.x, this.y, this.endX, this.endY);
        var animation = this.getWalkPosition("run", this.radian);
        this.deltaX = Math.cos(this.radian) * useSpeed;
        this.deltaY = Math.sin(this.radian) * useSpeed;
        this.reverse(this, this.radian);
        if (!this.isPlay || this.lastAnimation != animation) {
            this.lastAnimation = animation;
            this.armature.play(animation, 0);
            this.isPlay = true;
        }
    };
    /**
     * 检测是否有免疫伤害的buff
     */
    Hero.prototype.isImmuneBuff = function () {
        for (var i = 0; i < this.buff.length; i++) {
            //护盾
            if (this.buff[i].buffData.id == 4) {
                // this.skillArmature.visible = false;
                this.buff[i].update();
                return true;
            }
            else if (this.buff[i].buffData.id == 5) {
                var random = MathUtils.getRandom(100);
                if (random <= 40) {
                    this.buff[i].update();
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * 受伤
     */
    Hero.prototype.gotoHurt = function () {
        if (this.curState == BaseGameObject.Action_Hurt)
            return;
        if (this.isImmuneBuff())
            return;
        this.curState = BaseGameObject.Action_Hurt;
        this.img_swordLight.visible = false;
        this.armature.play(this.curState, 0);
        this.effectArmature.play(BaseGameObject.Action_Hurt, 1);
        this.effectArmature.visible = true;
        this.effectArmature.x = -15;
        GameData.hp--;
        SceneManager.battleScene.bloodTween();
        if (GameData.hp <= 0) {
            SceneManager.battleScene.battleSceneCom.onFailPop();
            return;
        }
        SceneManager.battleScene.battleSceneCom.onHurt();
    };
    /**攻击 */
    Hero.prototype.gotoAttack = function () {
        if (this.curState != BaseGameObject.Action_Idle)
            return;
        // this.combo = 0;
        this.curState = "attack";
        this.isAttack = true;
        this.img_swordLight.visible = true;
        var useSpeed = this.atk_speed * 0.1;
        this.sumDeltaX = 0;
        this.sumDeltaY = 0;
        this.originX = this.x;
        this.originY = this.y;
        /**攻击的弧度 */
        this.radian = MathUtils.getRadian2(this.originX, this.originY, this.endX, this.endY);
        var animation = this.getAttackPosition(this.radian);
        this.offsetIndex = animation["id"];
        //人物原来位置到剑端直线弧度
        var endX = this.endX + this.offset[this.offsetIndex][0];
        var endY = this.endY + this.offset[this.offsetIndex][1] + 33;
        if (this.reverse(this, this.radian)) {
            endX = this.endX - this.offset[this.offsetIndex][0];
        }
        this.atk_radian = MathUtils.getRadian2(this.originX, this.originY, endX, endY);
        this.img_swordLight.scaleX = 1;
        this.img_swordLight.rotation = MathUtils.getAngle(this.atk_radian) + 360;
        if (this.reverse(this, this.atk_radian)) {
            this.img_swordLight.scaleX = -1;
            this.img_swordLight.rotation = 360 - MathUtils.getAngle(this.atk_radian);
        }
        var dx = Math.cos(this.atk_radian) * this.atk_range;
        var dy = Math.sin(this.atk_radian) * this.atk_range;
        this.atk_rangeX = Math.abs(dx);
        this.atk_rangeY = Math.abs(dy);
        /**怪物的弧度 */
        this.centerX = (2 * this.originX + dx) / 2;
        this.centerY = (2 * this.originY + dy) / 2;
        this.deltaX = Math.cos(this.atk_radian) * useSpeed;
        this.deltaY = Math.sin(this.atk_radian) * useSpeed;
        this.armature.play(animation["posName"], 0);
    };
    /**
     * 技能
     */
    Hero.prototype.gotoSkill = function () {
        if (this.curState != BaseGameObject.Action_Idle)
            return;
        this.curState = Hero.Action_Skill;
        this.skill.start(this.curState, this);
        SceneManager.battleScene.battleSceneCom.onCDTime();
    };
    /**
     * 进场
     */
    Hero.prototype.gotoEnter = function () {
        this.curState = BaseGameObject.Action_Enter;
        this.armature.play(this.curState, 1);
        egret.setTimeout(function () {
            Animations.shakeScreen(SceneManager.battleScene, 2);
        }, this, 50);
    };
    /**
     * 帧事件处理函数
     */
    Hero.prototype.armatureFrame = function () {
    };
    /**
     * 特效动画播放完成函数
     */
    Hero.prototype.effectArmaturePlayEnd = function () {
        this.effectArmature.visible = false;
        this.isAttack = false;
        this.gotoIdle();
    };
    Hero.prototype.armaturePlayEnd = function () {
        switch (this.curState) {
            case Hero.Action_Skill:
                this.curState = BaseGameObject.Action_Idle;
                this.skill.end();
                break;
            case BaseGameObject.Action_Enter:
                this.gotoIdle();
                this.setBuff();
                break;
        }
    };
    /**
     * 停止动画
     */
    Hero.prototype.removeComplete = function () {
        this.armature.removeCompleteCallFunc(this.armaturePlayEnd, this);
        this.effectArmature.removeCompleteCallFunc(this.effectArmaturePlayEnd, this);
    };
    /**
     * 隐藏bone
     */
    Hero.prototype.hideBone = function (skeletonName, boneName) {
        this.attack_effect = this.armature.getBone(skeletonName, boneName, this);
        this.attack_effect.visible = true;
    };
    /**
     * 创建剑光
     */
    Hero.prototype.createSwordLight = function () {
        this.img_swordLight = Utils.createBitmap("atk_effect_png");
        this.img_swordLight.anchorOffsetX = this.img_swordLight.width;
        this.img_swordLight.anchorOffsetY = this.img_swordLight.height / 2;
        this.img_swordLight.visible = false;
        this.addChild(this.img_swordLight);
    };
    return Hero;
}(BaseGameObject));
/*************英雄的动作***************/
Hero.Action_Run01 = "run01";
Hero.Action_Run02 = "run02";
Hero.Action_Run03 = "run03";
Hero.Action_Skill = "skill01";
Hero.Effect_Skill01 = "skill01";
Hero.Effect_SKill02 = "skill02";
Hero.Effect_SKill03 = "skill03_01";
Hero.Effect_SKill03_02 = "skill03_02";
__reflect(Hero.prototype, "Hero");
//# sourceMappingURL=Hero.js.map