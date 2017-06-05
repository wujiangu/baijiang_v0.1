class TalentIR extends Base {
    public constructor(pageCount:number) {
        super();
        this.page = pageCount;
        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
        this.skinName = "resource/game_skins/talentSkinIR.exml";
    }

    private onComplete():void {
        for (let i = 1; i < 4; i++) {
            for (let j = 0; j < 7; j++) {
                let iconImage:eui.Image = new eui.Image();
                iconImage.source = `talent${i}_${j+1}_png`;
                iconImage.x = this.position[j][0] + (i-1)*367;
                iconImage.y = this.position[j][1];
                iconImage.name = `${7*i+j-6}`;
                iconImage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onIconListener, this)
                this.talentGroup.addChild(iconImage);
            }
        }
        this.pageText.text = `第${this.page}页`;
    }

    private onIconListener(event:egret.TouchEvent):void {
        Common.log(event.currentTarget.name);
        TalentDialog.instance.showPopup(parseInt(event.currentTarget.name))
    }

    public setTalentDetail(pageCount:number):void {
        this.pageText.text = `第${pageCount}页`;
    }

    /** */
    private talentGroup:eui.Group;
    /**吸血点数 */
    private bloodText:eui.Label;
    /**暴击点数 */
    private critText:eui.Label;
    /**回复 */
    private recoverText:eui.Label;
    private pageText:eui.Label;
    /**页数 */
    public page:number;
    /**位置 */
    private position = [[48,14],[252,14],[93,119],[208,119],[47,225],[253,225],[151,332]]
}