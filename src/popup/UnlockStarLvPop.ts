/**
 * 解锁星级界面
 */
class UnlockStarLvPop extends Base {
    public constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
        this.skinName = "resource/popup/unlockStarLvSkin.exml";
    }

    protected childrenCreated():void {
        
    }

    private onComplete():void {
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHandler, this);
        this.btn_unlock.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHandler, this);
        this.createEquip();
    }

    private createEquip():void {
        for (let i = 1; i <= 24; i++) {
            let equipGroup:eui.Group = new eui.Group();
            this.equipGroup.push(equipGroup)
            this.scrollGroup.addChild(equipGroup);
            let bg1:eui.Image = new eui.Image();
            bg1.source = "iconbg_0001_png";
            let bg2:eui.Image = new eui.Image();
            bg2.source = "iconbg_0002_png";
            bg2.visible = false;
            equipGroup.addChild(bg1);
            equipGroup.addChild(bg2);
            equipGroup.x = 115*((i-1)%7);
            equipGroup.y = 115*(Math.ceil(i/7)-1);
        }
    }

    /**按钮监听 */
    private onBtnHandler(event:egret.TouchEvent):void {
        switch (event.currentTarget) {
            case this.btn_unlock:
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
    /**解锁按钮 */
    private btn_unlock:eui.Button;

    /*******************图片和文字************************/
    
}