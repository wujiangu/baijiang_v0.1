/**
 * 天赋界面
 */
class TalentDialog extends Base {
    public constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompleteHandler, this);
        this.skinName = "resource/game_skins/talentWindowSkin.exml";
        this.btn_page1.selected = true;
        this.page1 = new TalentIR(0);
        this.pageGroup.addChild(this.page1);
        this.tcTalent = RES.getRes("TcTalent_json");
        TalentDialog.instance = this;
    }

    private uiCompleteHandler():void {
        this.btn_page1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.topBtnListener, this);
        this.btn_page2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.topBtnListener, this);
        this.btn_page3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.topBtnListener, this);
        this.btn_add.addEventListener(egret.TouchEvent.TOUCH_TAP, this.topBtnListener, this);
        this.btn_reset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.topBtnListener, this);
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.topBtnListener, this);
        this.btn_certain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPopupBtn, this);
        this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPopupBtn, this);
        this.btn_closeDetail.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSkillPop, this);
        this.btn_upgrade.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSkillPop, this);
        this.topBtn = [this.btn_page1, this.btn_page2, this.btn_page3];
    }

    /**
     * 顶部按钮监听
     */
    private topBtnListener(event:egret.TouchEvent):void {
        this._focusBtn = event.currentTarget;
        switch (this._focusBtn) {
            case this.btn_page1:
                this.createTalentPage(0);
            break;
            case this.btn_page2:
                this.createTalentPage(1);
            break;
            case this.btn_page3:
                this.createTalentPage(2);
            break;
            case this.btn_add:
                this.lab_title.text = "购买天赋";
                this.lab_detail.text = "购买天赋需要花费50玉石";
                this.purchassType = 1;
                this.popupGroup.visible = true;
            break;
            case this.btn_reset:
                this.lab_title.text = "重置天赋";
                this.lab_detail.text = "重置天赋需要花费5000金币";
                 this.purchassType = 2;
                this.popupGroup.visible = true;
            break;
            default:
                GameLayerManager.gameLayer().panelLayer.removeChildren();
            break;
        }
    }

    /**
     * 弹窗按钮回调
     */
    private onPopupBtn(event:egret.TouchEvent):void {
        switch (event.currentTarget) {
            case this.btn_certain:
                this.onPurchass(this.purchassType);
            break;
            default:
                this.popupGroup.visible = false;
            break;
        }
    }
    /**
     * 技能弹窗按钮回调
     */
    private onSkillPop(event:egret.TouchEvent):void {
        switch (event.currentTarget) {
            case this.btn_upgrade:
                
            break;
            default:
                this.skillPopupGroup.visible = false;
            break;
        }
    }

    /**
     * 确定按钮方法
     */
    private onPurchass(type:number):void {
        this.popupGroup.visible = false;
    }
    /**
     * 创建天赋页
     */
    private createTalentPage(pageCount:number):void {
        this.pageGroup.removeChildren();
        this.page1.setTalentDetail(pageCount);
        Utils.toggleButtonStatus(this.topBtn, pageCount);
        this.pageGroup.addChild(this.page1);
    }

    public showPopup(num:number):void {
        this.skillPopupGroup.visible = true;
        let id:number = 0;
        for (let obj = 0; obj < 21; obj++) {
            if (this.tcTalent[obj].id == num) {
                id = obj;
                break;
            }
        }
        this.lab_name.text = this.tcTalent[id].name;
        this.lab_condition.text = this.tcTalent[id].condition;
        this.lab_skillDetail.text = this.tcTalent[id].content;
    }

    public static instance:TalentDialog;
    /**天赋的配置文件 */
    private tcTalent:any;
	/*******************顶部按钮***********************/
	private btn_page1:eui.ToggleButton;
	private btn_page2:eui.ToggleButton;
	private btn_page3:eui.ToggleButton;
	private topBtn:eui.ToggleButton[];
	/*************************************************/
	/*******************技能升级弹窗***********************/
    private skillPopupGroup:eui.Group;
	private btn_closeDetail:eui.Button;
	private btn_upgrade:eui.Button;
	private lab_name:eui.Label;
    private lab_lv:eui.Label;
    private lab_condition:eui.Label;
    private lab_skillDetail:eui.Label;
    private lab_consume:eui.Label;
	/*************************************************/
    private _focusBtn:eui.Button;
    /**返回按钮 */
    private btn_back:eui.Button;
    /**重置按钮 */
    private btn_reset:eui.Button;
    /**增加按钮 */
    private btn_add:eui.Button;
    /**能量点 */
    private lab_power:eui.Label;
    /**叠层 */
    private pageGroup:eui.Group;
    /**弹出 */
    private popupGroup:eui.Group;
    /**弹窗标题 */
    private lab_title:eui.Label;
    /**弹窗关闭 */
    private btn_close:eui.Button;
    /**确定按钮 */
    private btn_certain:eui.Button;
    /**说明文字 */
    private lab_detail:eui.Label;
    /**购买类型 */
    private purchassType:number;
    private page1:TalentIR;

}