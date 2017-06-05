/**
 * 战斗场景部件
 */
class BattleSceneCom extends Base {
    public name = "BattleSceneCom"
    public constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
        this.skinName = "resource/game_skins/battleSkin.exml";
        this.img_killCount = Utils.createBitmap("battle_0010_png");
        this.img_killCount.x = 350;
        this.img_killCount.y = 594;
        this.addChild(this.img_killCount);
        this.tcStage = RES.getRes("TcStage_json");
    }

    private onComplete():void {
        this.btn_pause.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPause, this);
        this.btn_skill.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
            if (this.cd_time == 0) {
                GameData.heros[0].gotoSkill();
            }
        }, this);
    }

    /**暂停监听 */
    private onPause(event:egret.TouchEvent):void {
        TimerManager.getInstance().stopTimer();
        SceneManager.battleScene.stopProduce();
        if (!this.battlePausePop) {
            this.battlePausePop = new BattlePausePop();
        }
        this.addChild(this.battlePausePop);
        Animations.fadeOut(this.battlePausePop);
    }

    /**失败弹窗 */
    public onFailPop():void {
        TimerManager.getInstance().stopTimer();
        if (!this.battleFailPop) {
            this.battleFailPop = new BattleFailPop();
        }
        this.addChild(this.battleFailPop);
        Animations.fadeOut(this.battleFailPop);
    }

    /**设置弹出的内容显示 */
    public show():void {
        //测试
        GameData.killCount = 0;
        if (GameData.curStage == 5) GameData.curStage = 1;
        for (let i= 0; i < GameData.curStage - 1; i++) {
            GameData.killCount += this.tcStage[i].count;
        }
        this.img_skillMask.visible = false;
        this.img_killCount.scaleX = GameData.killCount/10.0;
        this.img_hp.scaleX = 1.0;
        this.img_exp.scaleX = 0.01;
        this.money = Common.userData.money;
        this.soul = Common.userData.soul;
        this.count = 0;
        // GameData.curStage = 1;
        this.cd_time = 0;
        this.lab_cdTime.visible = false;
        this.lab_killCount.text = `${GameData.curStage}/5`;
        this.lab_money.text = `${this.money}`;
        this.lab_soul.text = `${this.soul}`;
        this.lab_stage.text = `第${GameData.curStage}关`;
        this.lab_stage.alpha = 0;
        Animations.fadeOutIn(this.lab_stage);
        // Common.addEventListener(GameEvents.EVT_PRODUCEMONSTER, this.update, this);
        // Common.addEventListener(GameEvents.EVT_SKILL, this.onCDTime, this);
        // Common.addEventListener(GameEvents.EVT_HURT, this.onHurt, this);
    }

    /**更新界面 */
    public update():void {
        this.count ++;
        GameData.killCount ++;
        Common.userData.money += MathUtils.getRandom(100, 200);
        Common.userData.soul += MathUtils.getRandom(10, 100);
        this.lab_money.text = `${Common.userData.money}`;
        this.lab_soul.text = `${Common.userData.soul}`;
        this.img_killCount.scaleX = GameData.killCount/10.0;
        if ( this.count >= this.tcStage[GameData.curStage-1].count) {
            this.count = 0;
            GameData.curStage ++;
            if (GameData.curStage == 6) {
                GameData.curStage = 1;
                GameData.killCount = 0;
                this.img_killCount.scaleX = 0;
            }
            this.lab_killCount.text = `${GameData.curStage}/5`;
            this.lab_stage.text = `第${GameData.curStage}关`;
            this.lab_stage.alpha = 0;
            Animations.fadeOutIn(this.lab_stage);
        }
    }

    /**技能cd */
    public onCDTime():void {
        this.cd_time = 15;
        this.lab_cdTime.text = `${this.cd_time}`;
        this.lab_cdTime.visible = true;
        this.img_skillMask.visible = true;
        TimerManager.getInstance().doTimer(1000, 0, this.timerCD, this);
    }
    private timerCD():void {
        if (this.cd_time == 0) return;
        this.cd_time --;
        this.lab_cdTime.text = `${this.cd_time}`;
        if (this.cd_time == 0) {
            this.lab_cdTime.visible = false;
            this.img_skillMask.visible = false;
        }
    }

    /**受伤 */
    public onHurt():void {
        this.img_hp.scaleX = GameData.hp/5;
    }

    public removeEventListener():void {
        Common.removeEventListener(GameEvents.EVT_PRODUCEMONSTER, this.update, this);
        Common.removeEventListener(GameEvents.EVT_SKILL, this.onCDTime, this);
    }

    /**暂停 */
    private btn_pause:eui.Button;
    private btn_skill:eui.Button;
    private battlePausePop:BattlePausePop;
    private battleFailPop:BattleFailPop;
    private tcStage:any;
    private money:number;
    private soul:number;
    private stage_count:number;
    private count:number;
    private cd_time:number;

    /*******************图片和文字************************/
    private img_exp:eui.Image;
    private img_hp:eui.Image;
    private img_killCount:egret.Bitmap;
    private img_skill1:eui.Image;
    private img_skill2:eui.Image;
    private img_skill3:eui.Image;
    private lab_killCount:eui.Label;
    private lab_lv:eui.Label;
    private lab_money:eui.Label;
    private lab_soul:eui.Label;
    private lab_cdTime:eui.Label;
    private img_skillMask:eui.Image;
    private lab_stage:eui.Label;
}