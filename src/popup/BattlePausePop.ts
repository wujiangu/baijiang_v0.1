/**
 * 战斗暂停弹窗
 */
class BattlePausePop extends Base {
    public constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
        this.skinName = "resource/popup/battlePausePopSkin.exml";
    }

    protected childrenCreated():void {
        
    }

    private onComplete():void {
        this.btn_leave.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHandler, this);
        this.btn_continue.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHandler, this);
    }

    /**按钮监听 */
    private onBtnHandler(event:egret.TouchEvent):void {
        this.parent.removeChild(this);
        switch (event.currentTarget) {
            case this.btn_continue:
                TimerManager.getInstance().startTimer();
                SceneManager.battleScene.startProduce();
            break;
            default:
                Animations.sceneTransition(()=>{
                    SceneManager.battleScene.cleanChildren();
                    DragonBonesFactory.getInstance().removeTimer();
                    GameLayerManager.gameLayer().sceneLayer.addChild(SceneManager.mainScene);
                });
            break;
        }
    }

    /**设置弹出的内容显示 */
    public show():void {

    }

    /**离开 */
    private btn_leave:eui.Button;
    /**继续 */
    private btn_continue:eui.Button;

    /*******************图片和文字************************/
    
}