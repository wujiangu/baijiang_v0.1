/**
 * 武器属性重置弹窗
 */
class ResetEquipAttrPop extends Base {
    public constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
        this.skinName = "resource/popup/resetAttrSkin.exml";
    }

    protected childrenCreated():void {
        this.show();
    }

    private onComplete():void {
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHandler, this);
        this.btn_buy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHandler, this);
        this.btn_reset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHandler, this);
        this.btn_minus.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHandler, this);
        this.btn_plus.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHandler, this);
    }

    /**按钮监听 */
    private onBtnHandler(event:egret.TouchEvent):void {
        switch (event.currentTarget) {
            case this.btn_buy:
            break;
            case this.btn_reset:
            break;
            case this.btn_minus:
                if (this.itemCount > 1) {
                    this.itemCount--;
                }
                this.lab_itemCount.text = `${this.itemCount}`;
            break;
            case this.btn_plus:
                this.itemCount++;
                this.lab_itemCount.text = `${this.itemCount}`;
            break;
            default:
                this.parent.removeChild(this);
            break;
        }
    }

    /**设置弹出的内容显示 */
    public show():void {
        this.itemCount = 1;
        this.lab_itemCount.text = `${this.itemCount}`;
    }

    /**返回按钮 */
    private btn_back:eui.Button;
    /**购买按钮 */
    private btn_buy:eui.Button;
    /**重置按钮 */
    private btn_reset:eui.Button;
    /**减号按钮 */
    private btn_minus:eui.Button;
    /**加号按钮 */
    private btn_plus:eui.Button;
    /**物品数量 */
    private itemCount:number;

    /*******************图片和文字************************/
    private lab_attr1:eui.Label;
    private lab_attr2:eui.Label;
    private lab_attr3:eui.Label;
    private lab_itemCount:eui.Label;
    private img_star:eui.Image;
}