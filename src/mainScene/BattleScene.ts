/**
 * 战斗场景
 */
class BattleScene extends Base {
    public constructor() {
        super();
        GameData.heros = new Array();
        GameData.monsters = new Array();
        GameData.boss = new Array();
        this.timer = new egret.Timer(10, 0);
        this.produceTimer = new egret.Timer(2000, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.produceTimer.addEventListener(egret.TimerEvent.TIMER, this.timerCreateMonster, this);
        this.initBattleDragonBones();
    }
    protected createChildren(): void{
        this.createMap();
        this.createComboGroup();
    }

    protected childrenCreated(): void{
        this.createParticle();
        this.init();
    }
    public init():void {
        TimerManager.getInstance().startTimer();
        GameLayerManager.gameLayer().panelLayer.removeChildren();
        if (!this.battleSceneCom) {
            this.battleSceneCom = new BattleSceneCom();
            this.battleSceneCom.show();
        }else{
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
    }

    private timerCreateMonster(event:egret.TimerEvent):void {
        if (this.produceCount >= ConfigManager.tcStage[GameData.curStage-1].count) {
            this.stopProduce();
            // TimerManager.getInstance().remove(this.timerCreateMonster, this);
        }else{
            if (ConfigManager.tcStage[GameData.curStage-1].type == "monster01") {
                this.createSingleMonster();
            }else{
                this.createBoss();
            }
        }
    }

    /**
     * 启动生产定时器
     */
    public startProduce() {
        this.produceTimer.start();
    }

    /**
     * 停止生产定时器
     */
    public stopProduce() {
        this.produceTimer.stop();
    }

    /**
     * 初始化战斗使用的动画数据
     */
    private initBattleDragonBones():void {
        let arr:Array<string> = ["daoguang_effect", "diaochan", "diaochan_skill01", "monster01", "enter_monster_01", "Boss01",
        "Boss01_effect01", "blood_die", "diaochan_skill"];
        for (let i = 0; i < arr.length; i++) {
            let name:string = arr[i];
            let skeletonData = RES.getRes(name+"_ske_json");
            let textureData = RES.getRes(name+"_tex_json");
            let texture = RES.getRes(name+"_tex_png");
            DragonBonesFactory.getInstance().initDragonBonesArmatureFile(skeletonData, textureData, texture);
        }
    }

    private timerFunc(event:egret.TimerEvent) {
        this.moveCount = (<egret.Timer>event.target).currentCount;
    }

    /**按下监听 */
    private onTouchBin(event:egret.TouchEvent):void {
        this.timer.start();
    }
    /**拖动监听 */
    private onTouchMove(event:egret.TouchEvent):void {
        this.mouseX = event.stageX;
        this.mouseY = event.stageY;
        if (this.moveCount > 10) {
            this.hero.moveToTarget(this.mouseX, this.mouseY, ()=>{
                this.hero.gotoRun();
            });
        }
    }
    /**放开监听 */
    private onTouchEnd(event:egret.TouchEvent):void {
        this.timer.reset();
        if (this.moveCount <= 10) {
            this.hero.moveToTarget(event.stageX, event.stageY, ()=>{
                this.hero.gotoAttack();
           });
        }else{
            this.hero.gotoIdle();
        }
        this.moveCount = 0;
        
    }

    private onClick():void {

    }

    /**
     * 创建连击显示组
     */
    private createComboGroup():void {
        this.comboGroup = new egret.DisplayObjectContainer();
        this.comboGroup.x = 0;
        this.comboGroup.y = 260;

        let bg:egret.Bitmap = Utils.createBitmap("combo_bg_png");
        bg.scaleX = 3;
        bg.scaleY = 3;
        this.comboGroup.addChild(bg);
        let comboText:egret.TextField = Utils.createText("连击", 20, 15, 26, 0x501414);
        comboText.bold = true;
        comboText.fontFamily = "Microsoft YaHei";
        this.comboGroup.addChild(comboText);

        //位图字体
        let font = RES.getRes("combo_fnt");
        this.comboCount = new egret.BitmapText();
        this.comboCount.scaleX = 3;
        this.comboCount.scaleY = 3;
        this.comboCount.font = font;
        this.comboCount.x = 100;
        this.comboCount.y = 30;
        this.comboCount.text = "0";
        this.comboGroup.addChild(this.comboCount);
        this.comboGroup.visible = false;
        this.comboStatus = false;
    }

    /**
     * 更新连击数字
     */
    public update(value:number) {
        this.comboGroup.visible = true;
        let str:string = value.toString();
        this.comboCount.anchorOffsetX = this.comboCount.width/2;
        this.comboCount.anchorOffsetY = this.comboCount.height/2;
        this.comboCount.text = str;
        if (this.lastCombo == value) return;
        if (!this.comboStatus) {
            this.comboStatus = true;
            this.lastCombo = value;
            Animations.fadeOut(this.comboGroup, 500, ()=>{
                Animations.zoomIn(this.comboCount);
            })
        }else{
            this.lastCombo = value;
            Animations.zoomIn(this.comboCount);
        }
        // if (this.comboGroup.alpha == 0) {
        // }else{
        //     Animations.zoomIn(this.comboCount);
        // }
    }

    /**
     * 隐藏连击组
     */
    public hideCombo():void {
        this.comboStatus = false;
        this.comboGroup.visible = false;
    }

    /**
     * 创建地图背景
     */
    private createMap():void {
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
        this.mapBg.anchorOffsetX = this.mapBg.width/2;
        this.mapBg.anchorOffsetY = this.mapBg.height/2;
        this.mapBg.x = Common.SCREEN_W/2;
        this.mapBg.y = Common.SCREEN_H/2;

        this.blood = new eui.Image();
        this.blood.source = "blood_0001_png";
        this.blood.touchEnabled = false;
        this.blood.visible = false;
        this.addChild(this.particleLayer);
        this.addChild(this.effectLayer);
        this.addChild(this.battleLayer);
        this.addChild(this.blood);
    }

    private produceMonster():void {
        this.monsterCount --;
        if (this.monsterCount == 0) {
            this.startProduce();
            this.produceCount = 0;
            // TimerManager.getInstance().doTimer(2000, 0, this.timerCreateMonster, this);
        }
    }

    public removeEventListener():void {
        Common.removeEventListener(GameEvents.EVT_PRODUCEMONSTER, this.produceMonster, this);
        // this.battleSceneCom.removeEventListener();
    }

    /**
     * 创建英雄
     */
    private createHero():void {
        this.hero = ObjectPool.pop("Hero");
        GameData.heros.push(this.hero);
        this.hero.init("diaochan");
        this.hero.x = Common.SCREEN_W/2;
        this.hero.y = Common.SCREEN_H/2;
        // this.hero.anchorOffsetY = -33;
        this.hero.anchorOffsetY = -50;
        this.battleLayer.addChild(this.hero);
    }

    /**
     * 受攻击特效
     */
    public bloodTween():void {
        this.blood.alpha = 1.0;
        this.blood.visible = true;
        egret.Tween.get(this.blood).to({alpha:0}, 1500, egret.Ease.circOut).call(()=>{
            this.blood.visible = false;
        })
    }

    public createSingleMonster():void {
        this.monster = ObjectPool.pop("Monster");
        GameData.monsters.push(this.monster);
        this.monster.init(ConfigManager.tcStage[GameData.curStage-1].type);
        this.monster.x = MathUtils.getRandom(100, 1050);
        this.monster.y = MathUtils.getRandom(100, 550);
        // this.monster.anchorOffsetY = -33;
        this.monster.anchorOffsetY = -50;
        this.monsterCount ++;
        this.produceCount ++;
        this.battleLayer.addChild(this.monster);
    }

    /**
     * 创建Boss
     */
    private createBoss():void {
        this.boss = ObjectPool.pop("Boss");
        GameData.boss.push(this.boss);
        this.boss.init("Boss01");
        this.boss.x = MathUtils.getRandom(100, 1050);
        this.boss.y = MathUtils.getRandom(100, 550);
        // this.boss.anchorOffsetY = -33;
        this.boss.anchorOffsetY = -50;
        this.monsterCount ++;
        this.produceCount ++;
        this.battleLayer.addChild(this.boss);
    }

    private createParticle() {
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
    }

    /**
     * 清除子对象
     */
    public cleanChildren():void {
        let heroCount = GameData.heros.length;
        let monsterCount = GameData.monsters.length;
        let bossCount = GameData.boss.length;
        for (let i = 0; i < heroCount; i++) {
            let hero:Hero = GameData.heros[i];
            hero.removeComplete();
            // hero.stopDragonBonesArmature();
            if (hero && hero.parent && hero.parent.removeChild) hero.parent.removeChild(hero);
            ObjectPool.push(GameData.heros[i]);
        }
        for (let i = 0; i < monsterCount; i++) {
            let monster:Monster = GameData.monsters[i];
            monster.removeComplete();
            if (monster && monster.parent && monster.parent.removeChild) {
                monster.parent.removeChild(monster);
            }                  
            ObjectPool.push(GameData.monsters[i]);
        }
        for (let i = 0; i < bossCount; i++) {
            let boss:Boss = GameData.boss[i];
            boss.removeComplete();
            if (boss && boss.parent && boss.parent.removeChild) {
                boss.parent.removeChild(boss);
            }                  
            ObjectPool.push(GameData.boss[i]);
        }
        for (let i = 0; i < heroCount; i++) GameData.heros.pop();
        for (let i = 0; i < monsterCount; i++) GameData.monsters.pop();
        for (let i = 0; i < bossCount; i++) GameData.boss.pop();
        this.removeEventListener();
        this.effectLayer.removeChildren();
        // GameLayerManager.gameLayer().effectLayer.removeChildren();
        GameLayerManager.gameLayer().sceneLayer.removeChild(this);
    }

    /**鼠标或者点击的位置 */
    private mouseX:number;
    private mouseY:number;
    /**粒子层 */
    private particleLayer:eui.UILayer;
    /**英雄和怪物层 */
    public battleLayer:egret.DisplayObjectContainer;
    /**特效层（包括技能/buff等） */
    public effectLayer:egret.DisplayObjectContainer;
    public hero:Hero;
    public monster:Monster;
    public boss:Boss;

    /**场景部件 */
    public battleSceneCom:BattleSceneCom;
    /**怪物数量 */
    private monsterCount:number;
    /**已经生产的数量 */
    private produceCount:number;
    /**地图 */
    public mapBg:eui.Image;
    /**受攻击的特效背景 */
    public blood:eui.Image;
    /**定时器 */
    private timer:egret.Timer;
    /**生产定时器 */
    private produceTimer:egret.Timer;
    /** */
    private moveCount:number;
    /**连击显示组 */
    private comboGroup:egret.DisplayObjectContainer;
    /**连击显示组的状态 */
    private comboStatus:boolean;
    /**上一次的连击数 */
    private lastCombo:number;
    /**连击数字 */
    private comboCount:egret.BitmapText;
}