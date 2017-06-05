/**
 * 武器星级属性
 */
class EquipStarIR extends eui.ItemRenderer {
	public constructor(){
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
		this.skinName = "resource/game_skins/equipStarIR.exml";
        this.tcEquip = RES.getRes("TcEquip_json");
	}

	private onComplete(event:UIEvent): void{
		Common.log(typeof(this.btn_reset))
        this.btn_reset.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
        this.btn_reset.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onBtnMove, this);
        this.btn_reset.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnEnd, this);
	}

    private onBegin(event:egret.TouchEvent):void {
        this.btn_reset.scaleX = 0.8;
        this.btn_reset.scaleY = 0.8;
    }

    private onBtnMove(event:egret.TouchEvent):void {
        this.btn_reset.scaleX = 1.0;
        this.btn_reset.scaleY = 1.0;
    }

    private onBtnEnd(event:egret.TouchEvent):void {
        this.btn_reset.scaleX = 1.0;
        this.btn_reset.scaleY = 1.0;
        Common.log(event.currentTarget.name);
        Common.dispatchEvent(GameEvents.EVT_EQUIPSTAR, event.currentTarget.name)
    }

    /**配置文件 */
    private tcEquip:any;
    private lab_buff1:eui.Label;
    private lab_buff2:eui.Label;
    private lab_buff3:eui.Label;
    private btn_reset:eui.Image;
}