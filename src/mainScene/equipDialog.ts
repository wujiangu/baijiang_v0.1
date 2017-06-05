/**
 * 武器库
 */
class EquipDialog extends Base {
    public constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
        this.skinName = "resource/game_skins/equipWindowSkin.exml";
    }

    private onComplete():void {
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
            GameLayerManager.gameLayer().panelLayer.removeChildren();
        }, this);
        this.createEquip()
    }

    /**
     * 创建武器组
     */
    private createEquip():void {
        for (let i = 1; i <= 24; i++) {
            let equipGroup:eui.Group = new eui.Group();
            // equipGroup.name = `${i}`;
            // equipGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEquip, this);
            this.equipGroup.push(equipGroup)
            this.scrollGroup.addChild(equipGroup);
            let bg1:eui.Image = new eui.Image();
            bg1.source = "iconbg_0001_png";
            let bg2:eui.Image = new eui.Image();
            bg2.source = "iconbg_0002_png";
            bg2.visible = false;
            equipGroup.addChild(bg1);
            equipGroup.addChild(bg2);
            equipGroup.x = 145*((i-1)%7);
            equipGroup.y = 120*(Math.ceil(i/7)-1);
        }
        for (let i = 0; i < Common.userData.equip.length; i++) {
            let equipImage:eui.Image = new eui.Image();
            equipImage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEquip, this);
            let equipId = Common.userData.equip[i];
            equipImage.name = `${equipId}`;
            equipImage.source = `equip${equipId}_png`;
            equipImage.x = 0;
            equipImage.y = 10;
            equipImage.scaleX = 0.2;
            equipImage.scaleY = 0.2;
            this.equipGroup[i].addChild(equipImage);
        }
    }

    private onEquip(event:egret.TouchEvent):void {
        let name = event.currentTarget.name;
        Common.log(name+typeof(name));
        if (!this.equipInfo) {
            this.equipInfo = new EquipInfoDialog(parseInt(name));
        }else{
            this.equipInfo.createEquip(parseInt(name))
        }
        this.addChild(this.equipInfo);
    }

    private equipInfo:EquipInfoDialog;
    private btn_back:eui.Button;
    private scrollGroup:eui.Group;
    private equipGroup:eui.Group[] = [];
}