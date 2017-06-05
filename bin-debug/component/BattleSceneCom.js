var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 战斗场景部件
 */
var BattleSceneCom = (function (_super) {
    __extends(BattleSceneCom, _super);
    function BattleSceneCom() {
        var _this = _super.call(this) || this;
        _this.name = "BattleSceneCom";
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/game_skins/battleSkin.exml";
        _this.img_killCount = Utils.createBitmap("battle_0010_png");
        _this.img_killCount.x = 350;
        _this.img_killCount.y = 594;
        _this.addChild(_this.img_killCount);
        _this.tcStage = RES.getRes("TcStage_json");
        return _this;
    }
    BattleSceneCom.prototype.onComplete = function () {
        var _this = this;
        this.btn_pause.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPause, this);
        this.btn_skill.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.cd_time == 0) {
                GameData.heros[0].gotoSkill();
            }
        }, this);
    };
    /**暂停监听 */
    BattleSceneCom.prototype.onPause = function (event) {
        TimerManager.getInstance().stopTimer();
        SceneManager.battleScene.stopProduce();
        if (!this.battlePausePop) {
            this.battlePausePop = new BattlePausePop();
        }
        this.addChild(this.battlePausePop);
        Animations.fadeOut(this.battlePausePop);
    };
    /**失败弹窗 */
    BattleSceneCom.prototype.onFailPop = function () {
        TimerManager.getInstance().stopTimer();
        if (!this.battleFailPop) {
            this.battleFailPop = new BattleFailPop();
        }
        this.addChild(this.battleFailPop);
        Animations.fadeOut(this.battleFailPop);
    };
    /**设置弹出的内容显示 */
    BattleSceneCom.prototype.show = function () {
        //测试
        GameData.killCount = 0;
        if (GameData.curStage == 5)
            GameData.curStage = 1;
        for (var i = 0; i < GameData.curStage - 1; i++) {
            GameData.killCount += this.tcStage[i].count;
        }
        this.img_skillMask.visible = false;
        this.img_killCount.scaleX = GameData.killCount / 10.0;
        this.img_hp.scaleX = 1.0;
        this.img_exp.scaleX = 0.01;
        this.money = Common.userData.money;
        this.soul = Common.userData.soul;
        this.count = 0;
        // GameData.curStage = 1;
        this.cd_time = 0;
        this.lab_cdTime.visible = false;
        this.lab_killCount.text = GameData.curStage + "/5";
        this.lab_money.text = "" + this.money;
        this.lab_soul.text = "" + this.soul;
        this.lab_stage.text = "\u7B2C" + GameData.curStage + "\u5173";
        this.lab_stage.alpha = 0;
        Animations.fadeOutIn(this.lab_stage);
        // Common.addEventListener(GameEvents.EVT_PRODUCEMONSTER, this.update, this);
        // Common.addEventListener(GameEvents.EVT_SKILL, this.onCDTime, this);
        // Common.addEventListener(GameEvents.EVT_HURT, this.onHurt, this);
    };
    /**更新界面 */
    BattleSceneCom.prototype.update = function () {
        this.count++;
        GameData.killCount++;
        Common.userData.money += MathUtils.getRandom(100, 200);
        Common.userData.soul += MathUtils.getRandom(10, 100);
        this.lab_money.text = "" + Common.userData.money;
        this.lab_soul.text = "" + Common.userData.soul;
        this.img_killCount.scaleX = GameData.killCount / 10.0;
        if (this.count >= this.tcStage[GameData.curStage - 1].count) {
            this.count = 0;
            GameData.curStage++;
            if (GameData.curStage == 6) {
                GameData.curStage = 1;
                GameData.killCount = 0;
                this.img_killCount.scaleX = 0;
            }
            this.lab_killCount.text = GameData.curStage + "/5";
            this.lab_stage.text = "\u7B2C" + GameData.curStage + "\u5173";
            this.lab_stage.alpha = 0;
            Animations.fadeOutIn(this.lab_stage);
        }
    };
    /**技能cd */
    BattleSceneCom.prototype.onCDTime = function () {
        this.cd_time = 15;
        this.lab_cdTime.text = "" + this.cd_time;
        this.lab_cdTime.visible = true;
        this.img_skillMask.visible = true;
        TimerManager.getInstance().doTimer(1000, 0, this.timerCD, this);
    };
    BattleSceneCom.prototype.timerCD = function () {
        if (this.cd_time == 0)
            return;
        this.cd_time--;
        this.lab_cdTime.text = "" + this.cd_time;
        if (this.cd_time == 0) {
            this.lab_cdTime.visible = false;
            this.img_skillMask.visible = false;
        }
    };
    /**受伤 */
    BattleSceneCom.prototype.onHurt = function () {
        this.img_hp.scaleX = GameData.hp / 5;
    };
    BattleSceneCom.prototype.removeEventListener = function () {
        Common.removeEventListener(GameEvents.EVT_PRODUCEMONSTER, this.update, this);
        Common.removeEventListener(GameEvents.EVT_SKILL, this.onCDTime, this);
    };
    return BattleSceneCom;
}(Base));
__reflect(BattleSceneCom.prototype, "BattleSceneCom");
//# sourceMappingURL=BattleSceneCom.js.map