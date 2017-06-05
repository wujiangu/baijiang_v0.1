var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 准备界面
 */
var ReadyDialog = (function (_super) {
    __extends(ReadyDialog, _super);
    function ReadyDialog() {
        var _this = _super.call(this) || this;
        _this.name = 'ReadyDialog';
        _this._skill = [];
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompleteHandler, _this);
        _this.skinName = "resource/game_skins/readyWindowSkin.exml";
        _this.viewStack.selectedIndex = 1;
        _this.btn_skill.selected = true;
        _this.tcHero = RES.getRes("TcHero_json");
        _this.tcBiography = RES.getRes("TcBiography_json");
        _this.tcSkill = RES.getRes("TcSkill_json");
        ReadyDialog.instance = _this;
        return _this;
    }
    ReadyDialog.prototype.uiCompleteHandler = function () {
        this.btn_biography.addEventListener(egret.TouchEvent.TOUCH_TAP, this.topBtnListener, this);
        this.btn_skill.addEventListener(egret.TouchEvent.TOUCH_TAP, this.topBtnListener, this);
        this.btn_detail.addEventListener(egret.TouchEvent.TOUCH_TAP, this.topBtnListener, this);
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.topBtnListener, this);
        this.btn_change.addEventListener(egret.TouchEvent.TOUCH_TAP, this.topBtnListener, this);
        this.btn_battle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.topBtnListener, this);
        this.topBtn = [this.btn_biography, this.btn_skill, this.btn_detail];
        //每个人物的三个技能属性
        for (var i = 0; i < 3; i++) {
            this._skill[i] = new Array();
            switch (i) {
                case 0:
                    this._skill[i][0] = this.lab_skillname1;
                    this._skill[i][1] = this.lab_cd1;
                    this._skill[i][2] = this.lab_detail1;
                    this._skill[i][3] = this.img_skill1;
                    break;
                case 1:
                    this._skill[i][0] = this.lab_skillname2;
                    this._skill[i][1] = this.lab_cd2;
                    this._skill[i][2] = this.lab_detail2;
                    this._skill[i][3] = this.img_skill2;
                    break;
                default:
                    this._skill[i][0] = this.lab_skillname3;
                    this._skill[i][1] = this.lab_cd3;
                    this._skill[i][2] = this.lab_detail3;
                    this._skill[i][3] = this.img_skill3;
                    break;
            }
        }
    };
    ReadyDialog.prototype.childrenCreated = function () {
        this.cycleSlide.showHero(Common.userData.selectHero);
        // this.showHero(Common.userData.selectHero);
    };
    ReadyDialog.prototype.topBtnListener = function (event) {
        var _this = this;
        this._focusBtn = event.currentTarget;
        switch (this._focusBtn) {
            case this.btn_biography:
                Utils.viewStackStatus(this.viewStack, this.topBtn, 0);
                break;
            case this.btn_skill:
                Utils.viewStackStatus(this.viewStack, this.topBtn, 1);
                break;
            case this.btn_detail:
                Utils.viewStackStatus(this.viewStack, this.topBtn, 2);
                break;
            case this.btn_battle:
                Animations.sceneTransition(function () {
                    Common.userData.selectHero = _this.cycleSlide.getCurHeroCount();
                    GameLayerManager.gameLayer().sceneLayer.removeChildren();
                    GameLayerManager.gameLayer().panelLayer.removeChildren();
                    if (!SceneManager.battleScene) {
                        SceneManager.battleScene = new BattleScene();
                    }
                    else {
                        SceneManager.battleScene.init();
                    }
                    GameLayerManager.gameLayer().sceneLayer.addChild(SceneManager.battleScene);
                });
                break;
            case this.btn_change:
                if (!this.changeEquipPop) {
                    this.changeEquipPop = new ChangeEquipPop();
                }
                this.changeEquipPop.show();
                this.addChild(this.changeEquipPop);
                break;
            default:
                GameLayerManager.gameLayer().panelLayer.removeChild(this);
                break;
        }
    };
    /**
     * 显示英雄的信息
     */
    ReadyDialog.prototype.showHero = function (num) {
        var hero_id = 0;
        //英雄的id
        for (var i = 0; i < this.tcHero.length; i++) {
            if (this.tcHero[i].hero_id == num) {
                hero_id = i;
                break;
            }
        }
        //传记
        for (var i = 0; i < this.tcBiography.length; i++) {
            if (this.tcBiography[i].id == this.tcHero[hero_id].biography) {
                this.lab_biography.text = this.tcBiography[i].content;
                break;
            }
        }
        //技能
        for (var i = 0; i < this.tcHero[hero_id].skill.length; i++) {
            var skillId = this.tcHero[hero_id].skill[i];
            for (var j = 0; j < this.tcSkill.length; j++) {
                if (this.tcSkill[j].id == skillId) {
                    this._skill[i][0].text = this.tcSkill[j].name;
                    if (this.tcSkill[j].cd == 0) {
                        this._skill[i][1].text = "被动";
                    }
                    else {
                        this._skill[i][1].text = "\u51B7\u5374\uFF1A" + this.tcSkill[j].cd + "\u79D2";
                    }
                    this._skill[i][2].text = this.tcSkill[j].content;
                    this._skill[i][3].source = "skill_" + skillId + "_png";
                    break;
                }
            }
        }
        //装备
        var equipId = this.tcHero[hero_id].equip;
        this.img_equip.source = "weapon2_000" + equipId + "_png";
    };
    return ReadyDialog;
}(Base));
__reflect(ReadyDialog.prototype, "ReadyDialog");
//# sourceMappingURL=ReadyDialog.js.map