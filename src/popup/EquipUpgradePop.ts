/**
 * 武器升级弹窗
 */
class EquipUpgradePop extends Base {
    public constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
        this.skinName = "resource/popup/equipUpgradeSkin.exml";
    }

    protected childrenCreated():void {
        
    }

    private onComplete():void {
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHandler, this);
        this.btn_upgrade.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHandler, this);
    }

    /**按钮监听 */
    private onBtnHandler(event:egret.TouchEvent):void {
        switch (event.currentTarget) {
            case this.btn_upgrade:
            break;
            default:
                this.parent.removeChild(this);
            break;
        }
    }

    /**设置弹出的内容显示 */
    public show():void {

    }


    private equipGroup:eui.Group[] = [];
    private scrollGroup:eui.Group;
    /**返回按钮 */
    private btn_back:eui.Button;
    /**升级按钮 */
    private btn_upgrade:eui.Button;

    /*******************图片和文字************************/
    
}