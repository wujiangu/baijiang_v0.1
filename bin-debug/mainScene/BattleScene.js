var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 战斗场景
 */
var BattleScene = (function (_super) {
    __extends(BattleScene, _super);
    function BattleScene() {
        var _this = _super.call(this) || this;
        GameData.heros = new Array();
        GameData.monsters = new Array();
        GameData.boss = new Array();
        _this.timer = new egret.Timer(10, 0);
        _this.produceTimer = new egret.Timer(2000, 0);
        _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.timerFunc, _this);
        _this.produceTimer.addEventListener(egret.TimerEvent.TIMER, _this.timerCreateMonster, _this);
        _this.initBattleDragonBones();
        return _this;
    }
    BattleScene.prototype.createChildren = function () {
        this.createMap();
        this.createComboGroup();
    };
    BattleScene.prototype.childrenCreated = function () {
        this.createParticle();
        this.init();
    };
    BattleScene.prototype.init = function () {
        TimerManager.getInstance().startTimer();
        GameLayerManager.gameLayer().panelLayer.removeChildren();
        if (!this.battleSceneCom) {
            this.battleSceneCom = new BattleSceneCom();
            this.battleSceneCom.show();
        }
        else {
            this.battleSceneCom.show();
        }
        this.addChild(this.battleSceneCom);
        if (this.comboGroup) {
            this.comboGroup.visible = false;
            this.effectLayer.addChild(this.comboGroup);
        }
        GameData.hp = 5;
        DragonBonesFactory.getInstance().startTimer();
        this.monsterCount = 0;
        this.produceCount = 0;
        this.createHero();
        this.startProduce();
        // TimerManager.getInstance().doTimer(2000, 0, this.timerCreateMonster, this);
        Common.addEventListener(GameEvents.EVT_PRODUCEMONSTER, this.produceMonster, this);
    };
    BattleScene.prototype.timerCreateMonster = function (event) {
        if (this.produceCount >= ConfigManager.tcStage[GameData.curStage - 1].count) {
            this.stopProduce();
        }
        else {
            if (ConfigManager.tcStage[GameData.curStage - 1].type == "monster01") {
                this.createSingleMonster();
            }
            else {
                this.createBoss();
            }
        }
    };
    /**
     * 启动生产定时器
     */
    BattleScene.prototype.startProduce = function () {
        this.produceTimer.start();
    };
    /**
     * 停止生产定时器
     */
    BattleScene.prototype.stopProduce = function () {
        this.produceTimer.stop();
    };
    /**
     * 初始化战斗使用的动画数据
     */
    BattleScene.prototype.initBattleDragonBones = function () {
        var arr = ["daoguang_effect", "diaochan", "diaochan_skill01", "monster01", "enter_monster_01", "Boss01",
            "Boss01_effect01", "blood_die", "diaochan_skill"];
        for (var i = 0; i < arr.length; i++) {
            var name_1 = arr[i];
            var skeletonData = RES.getRes(name_1 + "_ske_json");
            var textureData = RES.getRes(name_1 + "_tex_json");
            var texture = RES.getRes(name_1 + "_tex_png");
            DragonBonesFactory.getInstance().initDragonBonesArmatureFile(skeletonData, textureData, texture);
        }
    };
    BattleScene.prototype.timerFunc = function (event) {
        this.moveCount = event.target.currentCount;
    };
    /**按下监听 */
    BattleScene.prototype.onTouchBin = function (event) {
        this.timer.start();
    };
    /**拖动监听 */
    BattleScene.prototype.onTouchMove = function (event) {
        var _this = this;
        this.mouseX = event.stageX;
        this.mouseY = event.stageY;
        if (this.moveCount > 10) {
            this.hero.moveToTarget(this.mouseX, this.mouseY, function () {
                _this.hero.gotoRun();
            });
        }
    };
    /**放开监听 */
    BattleScene.prototype.onTouchEnd = function (event) {
        var _this = this;
        this.timer.reset();
        if (this.moveCount <= 10) {
            this.hero.moveToTarget(event.stageX, event.stageY, function () {
                _this.hero.gotoAttack();
            });
        }
        else {
            this.hero.gotoIdle();
        }
        this.moveCount = 0;
    };
    BattleScene.prototype.onClick = function () {
    };
    /**
     * 创建连击显示组
     */
    BattleScene.prototype.createComboGroup = function () {
        this.comboGroup = new egret.DisplayObjectContainer();
        this.comboGroup.x = 0;
        this.comboGroup.y = 260;
        var bg = Utils.createBitmap("combo_bg_png");
        bg.scaleX = 3;
        bg.scaleY = 3;
        this.comboGroup.addChild(bg);
        var comboText = Utils.createText("连击", 20, 20, 26, 0x501414);
        comboText.bold = true;
        this.comboGroup.addChild(comboText);
        //位图字体
        var font = RES.getRes("combo_fnt");
        this.comboCount = new egret.BitmapText();
        this.comboCount.scaleX = 3;
        this.comboCount.scaleY = 3;
        this.comboCount.font = font;
        this.comboCount.x = 100;
        this.comboCount.y = 35;
        this.comboCount.text = "0";
        this.comboGroup.addChild(this.comboCount);
        this.comboGroup.visible = false;
        this.comboStatus = false;
    };
    /**
     * 更新连击数字
     */
    BattleScene.prototype.update = function (value) {
        var _this = this;
        this.comboGroup.visible = true;
        var str = value.toString();
        this.comboCount.anchorOffsetX = this.comboCount.width / 2;
        this.comboCount.anchorOffsetY = this.comboCount.height / 2;
        this.comboCount.text = str;
        if (this.lastCombo == value)
            return;
        if (!this.comboStatus) {
            this.comboStatus = true;
            this.lastCombo = value;
            Animations.fadeOut(this.comboGroup, 500, function () {
                Animations.zoomIn(_this.comboCount);
            });
        }
        else {
            this.lastCombo = value;
            Animations.zoomIn(this.comboCount);
        }
        // if (this.comboGroup.alpha == 0) {
        // }else{
        //     Animations.zoomIn(this.comboCount);
        // }
    };
    /**
     * 隐藏连击组
     */
    BattleScene.prototype.hideCombo = function () {
        this.comboStatus = false;
        this.comboGroup.visible = false;
    };
    /**
     * 创建地图背景
     */
    BattleScene.prototype.createMap = function () {
        this.battleLayer = new egret.DisplayObjectContainer();
        this.effectLayer = new egret.DisplayObjectContainer();
        this.particleLayer = new eui.UILayer();
        this.particleLayer.touchEnabled = false;
        this.mapBg = new eui.Image();
        this.mapBg.source = "map_png";
        this.mapBg.smoothing = false;
        this.mapBg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBin, this);
        this.mapBg.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.mapBg.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.mapBg.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        this.mapBg.scaleX = 2;
        this.mapBg.scaleY = 2;
        this.addChild(this.mapBg);
        this.mapBg.anchorOffsetX = this.mapBg.width / 2;
        this.mapBg.anchorOffsetY = this.mapBg.height / 2;
        this.mapBg.x = Common.SCREEN_W / 2;
        this.mapBg.y = Common.SCREEN_H / 2;
        this.blood = new eui.Image();
        this.blood.source = "blood_0001_png";
        this.blood.touchEnabled = false;
        this.blood.visible = false;
        this.addChild(this.particleLayer);
        this.addChild(this.effectLayer);
        this.addChild(this.battleLayer);
        this.addChild(this.blood);
    };
    BattleScene.prototype.produceMonster = function () {
        this.monsterCount--;
        if (this.monsterCount == 0) {
            this.startProduce();
            this.produceCount = 0;
        }
    };
    BattleScene.prototype.removeEventListener = function () {
        Common.removeEventListener(GameEvents.EVT_PRODUCEMONSTER, this.produceMonster, this);
        // this.battleSceneCom.removeEventListener();
    };
    /**
     * 创建英雄
     */
    BattleScene.prototype.createHero = function () {
        this.hero = ObjectPool.pop("Hero");
        GameData.heros.push(this.hero);
        this.hero.init("diaochan");
        this.hero.x = Common.SCREEN_W / 2;
        this.hero.y = Common.SCREEN_H / 2;
        // this.hero.anchorOffsetY = -33;
        this.hero.anchorOffsetY = -50;
        this.battleLayer.addChild(this.hero);
    };
    /**
     * 受攻击特效
     */
    BattleScene.prototype.bloodTween = function () {
        var _this = this;
        this.blood.alpha = 1.0;
        this.blood.visible = true;
        egret.Tween.get(this.blood).to({ alpha: 0 }, 1500, egret.Ease.circOut).call(function () {
            _this.blood.visible = false;
        });
    };
    BattleScene.prototype.createSingleMonster = function () {
        this.monster = ObjectPool.pop("Monster");
        GameData.monsters.push(this.monster);
        this.monster.init(ConfigManager.tcStage[GameData.curStage - 1].type);
        this.monster.x = MathUtils.getRandom(100, 1050);
        this.monster.y = MathUtils.getRandom(100, 550);
        // this.monster.anchorOffsetY = -33;
        this.monster.anchorOffsetY = -50;
        this.monsterCount++;
        this.produceCount++;
        this.battleLayer.addChild(this.monster);
    };
    /**
     * 创建Boss
     */
    BattleScene.prototype.createBoss = function () {
        this.boss = ObjectPool.pop("Boss");
        GameData.boss.push(this.boss);
        this.boss.init("Boss01");
        this.boss.x = MathUtils.getRandom(100, 1050);
        this.boss.y = MathUtils.getRandom(100, 550);
        // this.boss.anchorOffsetY = -33;
        this.boss.anchorOffsetY = -50;
        this.monsterCount++;
        this.produceCount++;
        this.battleLayer.addChild(this.boss);
    };
    BattleScene.prototype.createParticle = function () {
        //获取纹理
        var texture = RES.getRes("newParticle_png");
        //获取配置
        var config = RES.getRes("newParticle_json");
        //创建 GravityParticleSystem
        var system = new particle.GravityParticleSystem(texture, config);
        //启动粒子库
        system.start();
        //将例子系统添加到舞台
        this.particleLayer.addChild(system);
    };
    /**
     * 清除子对象
     */
    BattleScene.prototype.cleanChildren = function () {
        var heroCount = GameData.heros.length;
        var monsterCount = GameData.monsters.length;
        var bossCount = GameData.boss.length;
        for (var i = 0; i < heroCount; i++) {
            var hero = GameData.heros[i];
            hero.removeComplete();
            // hero.stopDragonBonesArmature();
            if (hero && hero.parent && hero.parent.removeChild)
                hero.parent.removeChild(hero);
            ObjectPool.push(GameData.heros[i]);
        }
        for (var i = 0; i < monsterCount; i++) {
            var monster = GameData.monsters[i];
            monster.removeComplete();
            if (monster && monster.parent && monster.parent.removeChild) {
                monster.parent.removeChild(monster);
            }
            ObjectPool.push(GameData.monsters[i]);
        }
        for (var i = 0; i < bossCount; i++) {
            var boss = GameData.boss[i];
            boss.removeComplete();
            if (boss && boss.parent && boss.parent.removeChild) {
                boss.parent.removeChild(boss);
            }
            ObjectPool.push(GameData.boss[i]);
        }
        for (var i = 0; i < heroCount; i++)
            GameData.heros.pop();
        for (var i = 0; i < monsterCount; i++)
            GameData.monsters.pop();
        for (var i = 0; i < bossCount; i++)
            GameData.boss.pop();
        this.removeEventListener();
        this.effectLayer.removeChildren();
        // GameLayerManager.gameLayer().effectLayer.removeChildren();
        GameLayerManager.gameLayer().sceneLayer.removeChild(this);
    };
    return BattleScene;
}(Base));
__reflect(BattleScene.prototype, "BattleScene");
//# sourceMappingURL=BattleScene.js.map