var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
*  文 件 名： CycleSlide.ts
*  功    能： 滚动组件
*  内    容： 自定义组件，支持多张图片水平(垂直)切换滚动
*
* Example:
*/
var CycleSlide = (function (_super) {
    __extends(CycleSlide, _super);
    function CycleSlide() {
        var _this = _super.call(this) || this;
        _this.hero_Image = [];
        /**存储英雄的图片 */
        _this._heroImage = [];
        _this._tempImage = [];
        _this.curHeroCount = 1;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompleteHandler, _this);
        _this.skinName = "resource/game_skins/heroInfoSkin.exml";
        return _this;
    }
    CycleSlide.prototype.createChildren = function () {
        this.validateNow();
        for (var i = 0; i < 3; i++) {
            this._heroImage[i] = new Array();
            this._heroImage[i][0] = "hero" + (i + 1) + "_light_png";
            this._heroImage[i][1] = "hero" + (i + 1) + "_gray_png";
        }
    };
    CycleSlide.prototype.uiCompleteHandler = function () {
        this.btn_left.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnListener, this);
        this.btn_right.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnListener, this);
        this.mid_Image.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveListener, this);
        this.btn_left.visible = false;
        this.btn_right.visible = false;
        this.left_Image.visible = false;
        this.right_Image.visible = false;
        // this.hero_Image.push(this.left_Image);
        // this.hero_Image.push(this.right_Image);
        // this.hero_Image.push(this.mid_Image);
        // for (let i = 0; i < 3; i++) {
        //     this.createEffectImage(i);
        // }
    };
    CycleSlide.prototype.onMoveListener = function (event) {
    };
    CycleSlide.prototype.showHero = function (heroId) {
        this.curHeroCount = heroId;
        this.changeHero();
    };
    CycleSlide.prototype.getCurHeroCount = function () {
        return this.curHeroCount;
    };
    CycleSlide.prototype.onBtnListener = function (event) {
        switch (event.currentTarget) {
            case this.btn_left:
                this.changeHero("left");
                // for (let i = 0; i < 3; i++) {
                //     this._tempImage[i].visible = true;
                // }
                // egret.Tween.get(this._tempImage[2]).to({x:this.left_Image.x, y:this.left_Image.y, scaleX:0.9, scaleY:0.9}, 100);
                // egret.Tween.get(this._tempImage[1]).to({x:this.mid_Image.x, y:this.mid_Image.y, scaleX:1.0, scaleY:1.0}, 100);
                // egret.Tween.get(this._tempImage[0]).to({x:this.right_Image.x, y:this.right_Image.y, scaleX:0.9, scaleY:0.9}, 100).wait(100).call(()=>{
                //     for (let i = 0; i < 3; i++) {
                //         this._tempImage[i].visible = false;
                //     }
                //     this.changeHero("left");
                // }, this)
                break;
            case this.btn_right:
                this.changeHero("right");
                break;
        }
    };
    /**
     * 创建特效图片
     */
    CycleSlide.prototype.createEffectImage = function (num) {
        this._tempImage[num] = new eui.Image();
        this._tempImage[num].source = this.hero_Image[num].source;
        this.addChild(this._tempImage[num]);
        this._tempImage[num].x = this.hero_Image[num].x;
        this._tempImage[num].y = this.hero_Image[num].y;
        this._tempImage[num].anchorOffsetX = this.hero_Image[num].anchorOffsetX;
        this._tempImage[num].anchorOffsetY = this.hero_Image[num].anchorOffsetY;
        this._tempImage[num].visible = false;
    };
    CycleSlide.prototype.changeHero = function (pos) {
        if (pos == "left") {
            this.curHeroCount = (++this.curHeroCount > 2) ? 0 : this.curHeroCount;
        }
        else if (pos == "right") {
            this.curHeroCount = (--this.curHeroCount < 0) ? 2 : this.curHeroCount;
        }
        ReadyDialog.instance.showHero(this.curHeroCount + 1);
        this.mid_Image.source = this._heroImage[this.curHeroCount][0];
        this.mid_Image.source = "hero4_light_png";
        var left_count = (this.curHeroCount == 0) ? 2 : this.curHeroCount - 1;
        this.left_Image.source = this._heroImage[left_count][1];
        var right_count = (this.curHeroCount == 2) ? 0 : this.curHeroCount + 1;
        this.right_Image.source = this._heroImage[right_count][1];
    };
    return CycleSlide;
}(eui.Component));
__reflect(CycleSlide.prototype, "CycleSlide");
//# sourceMappingURL=CycleSlide.js.map