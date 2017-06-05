/**
 * 英雄信息面板
 */
class HeroInfoPanel extends Base {
    public constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompleteHandler, this)
        this.skinName = "resource/game_skins/heroInfoSkin.exml"
    }

    private uiCompleteHandler():void {

    }
}