/**
 * 武器详情
 */
class EquipInfoDialog extends Base {
    public constructor(equip_id:number) {
        super();
        this.equip_id = equip_id;
        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
        this.skinName = "resource/game_skins/equipInfoSkin.exml";
        this.tcEquip = RES.getRes("TcEquip_json");
    }

    protected childrenCreated():void {
        this.createEquip(this.equip_id);
    }

    private onComplete():void {
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButton, this);
        this.btn_change.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButton, this);
        this.btn_upgrade.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButton, this);
        this.btn_closeDetail.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButton, this);
    }

    /**
     * 武器属性
     */
    public createEquip(equipId:number) {
        let count:number = 0;
        this.starGroup.removeChildren();
        this.img_equip.source = `equip${equipId}_png`;
        for (let i = 0; i < this.tcEquip.length; i++) {
            if (this.tcEquip[i].id == equipId) {
                count = i;
                break;
            }
        }
        this.lab_name.text = this.tcEquip[count].name;
        //创建星级
        for (let i = 0; i < this.tcEquip[count].star; i++) {
            let img_star:eui.Image = new eui.Image();
            img_star.source = "star_0004_png";
            img_star.x = 38*i;
            this.starGroup.addChild(img_star);
        }
        //创建解锁星级
        for (let i = 0; i < this.tcEquip[count].unlock; i++) {
            let img_star:eui.Image = new eui.Image();
            img_star.source = "star_0001_png";
            img_star.x = 38*i;
            this.starGroup.addChild(img_star);
        }
        //武器等级
        let lv = this.tcEquip[count].lv;
        this.lab_lv.text = `${lv}/30`;
        this.img_equip.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
            this.detailGroup.visible = true;
        }, this);
        //武器星级属性
        // let starArray = new Array();
        // starArray["attr1"] = "可解锁新的星级";
        // starArray["btnImage"] = "equip_0004_png";
        // starArray["color"] = "0xffd375";
        // starArray["name"] = "unlock";
        // this.tcEquip[count].starAttr.push(starArray);
        this.arrayStar = new eui.ArrayCollection(this.tcEquip[count].starAttr);
        Common.log("长度"+this.tcEquip[count].starAttr.length);
        this.starList.dataProvider = this.arrayStar;
        this.starList.itemRenderer = EquipStarIR;
        Common.addEventListener(GameEvents.EVT_EQUIPSTAR, this.onResetUnlock, this)
    }

    /**
     * 按键监听
     */
    private onButton(event:egret.TouchEvent):void {
        switch (event.currentTarget) {
            case this.btn_change:
                if (!this.changeEquipPop) {
                    this.changeEquipPop = new ChangeEquipPop();
                }
                this.addChild(this.changeEquipPop);
            break;
            case this.btn_upgrade:
                if (!this.equipUpgradePop) {
                    this.equipUpgradePop = new EquipUpgradePop();
                }
                this.addChild(this.equipUpgradePop);
            break;
            case this.btn_closeDetail:
                this.detailGroup.visible = false;
            break;
            default:
                this.parent.removeChild(this);
                Common.removeEventListener(GameEvents.EVT_EQUIPSTAR, this.onResetUnlock, this);
            break;
        }
    }

    /**
     * 重置或者解锁按钮
     */
    private onResetUnlock(type:string):void {
        switch (type) {
            case "reset":
                if (!this.resetEquipAttrPop) {
                    this.resetEquipAttrPop = new ResetEquipAttrPop();
                }
                this.addChild(this.resetEquipAttrPop);
            break;
            default:
                if (!this.unlockStarLvPop) {
                    this.unlockStarLvPop = new UnlockStarLvPop();
                }
                this.addChild(this.unlockStarLvPop);
            break;
        }
    }

    /**武器配置文件 */
    private tcEquip:any;
    private arrayStar:eui.ArrayCollection;
    private detailGroup:eui.Group;
    private btn_closeDetail:eui.Group;
    private btn_back:eui.Button;
    private btn_change:eui.Button;
    private btn_upgrade:eui.Button;

    private img_equip:eui.Image;
    private equip_id:number;

    /********************弹窗************************/
    private resetEquipAttrPop:ResetEquipAttrPop;
    private changeEquipPop:ChangeEquipPop;
    private equipUpgradePop:EquipUpgradePop;
    private unlockStarLvPop:UnlockStarLvPop;
    /************************************************/


    /********************武器属性*********************/
    private starGroup:eui.Group;
    private starList:eui.List;
    private lab_name:eui.Label;
    private lab_lv:eui.Label;
}