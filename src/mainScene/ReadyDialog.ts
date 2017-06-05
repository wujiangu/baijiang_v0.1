/**
 * 准备界面
 */
class ReadyDialog extends Base {
    public name = 'ReadyDialog'
    public constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompleteHandler, this);
        this.skinName = "resource/game_skins/readyWindowSkin.exml";
        this.viewStack.selectedIndex = 1;
        this.btn_skill.selected = true;
        this.tcHero = RES.getRes("TcHero_json");
        this.tcBiography = RES.getRes("TcBiography_json");
        this.tcSkill = RES.getRes("TcSkill_json");
        ReadyDialog.instance = this;
    }

    private uiCompleteHandler():void {
        this.btn_biography.addEventListener(egret.TouchEvent.TOUCH_TAP, this.topBtnListener, this);
        this.btn_skill.addEventListener(egret.TouchEvent.TOUCH_TAP, this.topBtnListener, this);
        this.btn_detail.addEventListener(egret.TouchEvent.TOUCH_TAP, this.topBtnListener, this);
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.topBtnListener, this);
        this.btn_change.addEventListener(egret.TouchEvent.TOUCH_TAP, this.topBtnListener, this);
        this.btn_battle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.topBtnListener, this);
        this.topBtn = [this.btn_biography, this.btn_skill, this.btn_detail];
        //每个人物的三个技能属性
        for (let i = 0; i < 3; i++) {
            this._skill[i] = new Array();
            switch (i) {
                case 0:
                    this._skill[i][0] = this.lab_skillname1;
                    this._skill[i][1] = this.lab_cd1;
                    this._skill[i][2] = this.lab_detail1;
                    this._skill[i][3] = this.img_skill1;
                break;
                case 1:
                    this._skill[i][0] = this.lab_skillname2;
                    this._skill[i][1] = this.lab_cd2;
                    this._skill[i][2] = this.lab_detail2;
                    this._skill[i][3] = this.img_skill2;
                break;
                default:
                    this._skill[i][0] = this.lab_skillname3;
                    this._skill[i][1] = this.lab_cd3;
                    this._skill[i][2] = this.lab_detail3;
                    this._skill[i][3] = this.img_skill3;
                break;
            }
        }
    }

    protected childrenCreated(): void{
        this.cycleSlide.showHero(Common.userData.selectHero);
        // this.showHero(Common.userData.selectHero);
    }

    private topBtnListener(event:egret.TouchEvent):void {
        this._focusBtn = event.currentTarget;
        switch(this._focusBtn) {
            case this.btn_biography:
                Utils.viewStackStatus(this.viewStack, this.topBtn, 0);
            break;
            case this.btn_skill:
                Utils.viewStackStatus(this.viewStack, this.topBtn, 1);
            break;
            case this.btn_detail:
                Utils.viewStackStatus(this.viewStack, this.topBtn, 2);
            break;
            case this.btn_battle:
                Animations.sceneTransition(()=>{
                    Common.userData.selectHero = this.cycleSlide.getCurHeroCount();
                    GameLayerManager.gameLayer().sceneLayer.removeChildren();
                    GameLayerManager.gameLayer().panelLayer.removeChildren();
                    if (!SceneManager.battleScene) {
                        SceneManager.battleScene = new BattleScene();
                    }else{
                        SceneManager.battleScene.init();
                    }
                    GameLayerManager.gameLayer().sceneLayer.addChild(SceneManager.battleScene);
                });
            break;
            case this.btn_change:
                if (!this.changeEquipPop) {
                    this.changeEquipPop = new ChangeEquipPop();
                }
                this.changeEquipPop.show();
                this.addChild(this.changeEquipPop);
            break;
            default:
                GameLayerManager.gameLayer().panelLayer.removeChild(this);
            break;
        }
    }

    /**
     * 显示英雄的信息
     */
    public showHero(num:number) {
        let hero_id:number = 0;
        //英雄的id
        for (let i = 0; i < this.tcHero.length; i++) {
            if (this.tcHero[i].hero_id == num) {
                hero_id = i;
                break;
            }
        }
        //传记
        for (let i = 0; i < this.tcBiography.length; i++) {
            if (this.tcBiography[i].id == this.tcHero[hero_id].biography) {
                this.lab_biography.text = this.tcBiography[i].content;
                break;
            }
        }
        //技能
        for (let i = 0; i < this.tcHero[hero_id].skill.length; i++) {
            let skillId = this.tcHero[hero_id].skill[i];
            for (let j = 0; j < this.tcSkill.length; j++) {
                if (this.tcSkill[j].id == skillId) {
                    this._skill[i][0].text = this.tcSkill[j].name;
                    if (this.tcSkill[j].cd == 0) {
                        this._skill[i][1].text = "被动";
                    }
                    else {
                        this._skill[i][1].text = `冷却：${this.tcSkill[j].cd}秒`;
                    }
                    this._skill[i][2].text = this.tcSkill[j].content;
                    this._skill[i][3].source = `skill_${skillId}_png`;
                    break;
                }
            }
        }
        //装备
        let equipId = this.tcHero[hero_id].equip;
        this.img_equip.source = `weapon2_000${equipId}_png`;
    }

    public static instance:ReadyDialog;
    /**替换武器弹窗 */
    private changeEquipPop:ChangeEquipPop;
    /**叠层 */
    private viewStack:eui.ViewStack;
    /**配置文件 */
    private tcHero:any;
    private tcBiography:any;
    private tcSkill:any;
    private _skill:any[] = [];
	/*******************顶部按钮***********************/
	private btn_biography:eui.ToggleButton;
	private btn_skill:eui.ToggleButton;
	private btn_detail:eui.ToggleButton;
	private topBtn:eui.ToggleButton[];
	/*************************************************/

    private _focusBtn:eui.ToggleButton;
    /**返回按钮 */
    private btn_back:eui.Button;
    /**出战按钮 */
    private btn_battle:eui.Button;
    /**替换按钮 */
    private btn_change:eui.Button;
    /**武将选择 */
    private cycleSlide:CycleSlide;

	/*******************文字和图片***********************/
	private lab_biography:eui.Label;
    private lab_skillname1:eui.Label;
    private lab_skillname2:eui.Label;
    private lab_skillname3:eui.Label;
    private lab_cd1:eui.Label;
    private lab_cd2:eui.Label;
    private lab_cd3:eui.Label;
    private lab_detail1:eui.Label;
    private lab_detail2:eui.Label;
    private lab_detail3:eui.Label;
    private lab_life:eui.Label;
    private lab_attack:eui.Label;
    private lab_attSp:eui.Label;
    private lab_armor:eui.Label;
    private lab_speed:eui.Label;
    private img_skill1:eui.Image;
    private img_skill2:eui.Image;
    private img_skill3:eui.Image;
    public img_equip:eui.Image;
	/*************************************************/
}