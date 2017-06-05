/**
 * 更换武器弹窗
 */
class ChangeEquipPop extends Base {
    public constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
        this.skinName = "resource/popup/changeEquipSkin.exml";
    }

    protected childrenCreated():void {
        
    }

    private onComplete():void {
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHandler, this);
        this.btn_change.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHandler, this);
        this.createEquip();
    }

    private createEquip():void {
        for (let i = 1; i <= 24; i++) {
            let equipGroup:eui.Group = new eui.Group();
            this.equipGroup.push(equipGroup)
            this.scrollGroup.addChild(equipGroup);
            let bg1:eui.Image = new eui.Image();
            bg1.source = "iconbg_0001_png";
            equipGroup["bg2"] = new eui.Image();
            equipGroup["bg2"].source = "iconbg_0002_png";
            equipGroup["bg2"].visible = false;
            equipGroup.addChild(bg1);
            equipGroup.addChild(equipGroup["bg2"]);
            equipGroup.x = 115*((i-1)%7);
            equipGroup.y = 115*(Math.ceil(i/7)-1);
        }
    }

    /**按钮监听 */
    private onBtnHandler(event:egret.TouchEvent):void {
        switch (event.currentTarget) {
            case this.btn_change:
                let id = Common.userData.equip[0];
                this.parent.removeChild(this);
                if (id == null) return;
                Common.curPanel.img_equip.source = `weapon2_000${id}_png`;
                if (id == 1) {
                    Common.userData.equip[0] = 2;
                }else{
                    Common.userData.equip[0] = 1;
                }
            break;
            default:
                this.parent.removeChild(this);
            break;
        }
    }

    /**设置弹出的内容显示 */
    public show():void {
        for (let i = 0; i < Common.userData.equip.length; i++) {
            let equipImage:eui.Image = new eui.Image();
            equipImage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEquip, this);
            let equipId = Common.userData.equip[i];
            // equipImage.name = i;
            equipImage.source = `weapon2_000${equipId}_png`;
            equipImage.x = -5;
            equipImage.y = -30;
            equipImage.scaleX = 0.4;
            equipImage.scaleY = 0.4;
            this.equipGroup[i]["image"] = equipImage;
            this.equipGroup[i].addChild(equipImage);
        }
    }

    /**点击装备 */
    private onEquip():void {
        this.equipGroup[0]["bg2"].visible = true;
    }


    private equipGroup:eui.Group[] = [];
    private scrollGroup:eui.Group;
    /**返回按钮 */
    private btn_back:eui.Button;
    /**购买按钮 */
    private btn_change:eui.Button;

    /*******************图片和文字************************/
    
}