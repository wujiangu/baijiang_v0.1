/**
 * 进入游戏场景
 */
class EnterGameScene extends Base {
    public constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompleteHandler, this)
        this.skinName = "resource/game_skins/enterGameSkin.exml"
    }

    private uiCompleteHandler():void {
        this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnterGame, this);
        this.btn_rank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRank, this);
    }

    protected createChildren(): void{
    }

    protected childrenCreated(): void{
        //加入敏感词
        let array = RES.getRes("sensitiveWords_json");
        SensitiveWordFilter.GetInstance().regSensitiveWords(array);
    }

    /**
     * 进入游戏
     */
    private onEnterGame():void {
        // var data:any = {};
        // data.uid = 1;
        // data.channel = 1000;
        // data.appid = 1112169032;
        // data.nick = "dddsf";
        // data.avatar = "";
        // data.sex = 1;
        // data.time = Math.floor(new Date().getTime()/1000);
        // data.reurl = "https://www.shandw.com";
        // data.cburl = "https://www.shandw.com/v2/mobile/detail/";
        // data.paydata = "succeed";
        // let time = Math.floor(new Date().getTime()/1000);
        // data = `channel=9166&uid=3333&nick=hello&avatar=&sex=1&time=${time}&reurl=https://www.shandw.com&cburl=https://www.shandw.com/v2/mobile/detail/`
        // NetConnect.send(1, data, function(data) {

        // })
        GameLayerManager.gameLayer().sceneLayer.removeChildren();
        SceneManager.mainScene = new MainScene();
        GameLayerManager.gameLayer().sceneLayer.addChild(SceneManager.mainScene);
    }

    /**
     * 排行榜
     */
    private onRank():void {

    }

    /**开始游戏按钮 */
    private btn_begin:eui.Button;
    /**排行榜按钮 */
    private btn_rank:eui.Button;
}