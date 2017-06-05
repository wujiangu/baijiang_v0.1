/**
 * 商城
 */
class ShopDialog extends Base {
    public constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
        this.skinName = "resource/game_skins/shopSkin.exml";
    }

    private onComplete():void {
        this.btn_buy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonHandler, this);
        this.btn_detail.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonHandler, this);
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonHandler, this);
        this.btn_closeDetail.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonHandler, this);
    }

    private onButtonHandler(event:egret.TouchEvent) {
        let target = event.currentTarget;
        switch (target) {
            case this.btn_buy:
                if (Common.userData.soul < 1000) {
                    Animations.showTips("您的玉魂不足", 1, true);
                }else{
                    Common.userData.soul -= 1000;
                    Animations.showTips("购买武器成功", 1);
                    if (Common.userData.equip.length == 0) {
                        Common.userData.equip = new Array();
                    }
                    Common.userData.equip[0] = 2;
                    this.itemGroup.visible = false;
                }
            break;
            case this.btn_detail:
                this.detailGroup.visible = true;
            break;
            case this.btn_closeDetail:
                this.detailGroup.visible = false;
            break;
            default:
                GameLayerManager.gameLayer().panelLayer.removeChildren();
            break;
        }
    }

    private btn_buy:eui.Button;
    private btn_detail:eui.Button;
    private btn_back:eui.Button;
    private itemGroup:eui.Group;
    private detailGroup:eui.Group;
    private btn_closeDetail:eui.Group;
}