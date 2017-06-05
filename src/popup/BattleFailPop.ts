/**
 * 战斗暂停弹窗
 */
class BattleFailPop extends Base {
    public constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
        this.skinName = "resource/popup/battleFailPopSkin.exml";
    }

    protected childrenCreated():void {
        
    }

    private onComplete():void {
        this.btn_giveup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHandler, this);
        this.btn_reavival.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHandler, this);
    }

    /**按钮监听 */
    private onBtnHandler(event:egret.TouchEvent):void {
        this.parent.removeChild(this);
        switch (event.currentTarget) {
            case this.btn_reavival:
                
            break;
            default:
                Animations.sceneTransition(()=>{
                    SceneManager.battleScene.cleanChildren();
                    GameData.curStage = 1;
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
    private btn_giveup:eui.Button;
    /**继续 */
    private btn_reavival:eui.Button;

    /*******************图片和文字************************/
    
}