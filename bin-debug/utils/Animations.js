/**
 * 公用动画
 */
var Animations;
(function (Animations) {
    //抖动对象特效
    // 1：抖动  2：震动
    function shakeScreen(target, effectType) {
        if (effectType === void 0) { effectType = 1; }
        var panel = target;
        var shakeNum = 20;
        var oldX = panel.x;
        var oldY = panel.y;
        if (effectType == 1) {
            egret.Tween.get(panel).to({ x: panel.x - 10 }, shakeNum);
            egret.setTimeout(function () {
                egret.Tween.get(panel).to({ x: panel.x + 20 }, shakeNum);
            }, this, shakeNum * 2);
            egret.setTimeout(function () {
                egret.Tween.get(panel).to({ x: panel.x - 20 }, shakeNum);
            }, this, shakeNum * 3);
            egret.setTimeout(function () {
                egret.Tween.get(panel).to({ x: panel.x + 20 }, shakeNum);
            }, this, shakeNum * 4);
            egret.setTimeout(function () {
                egret.Tween.get(panel).to({ x: oldX }, shakeNum);
            }, this, shakeNum * 5);
        }
        else {
            egret.Tween.get(panel).to({ x: panel.x - 2, y: panel.y }, shakeNum);
            egret.setTimeout(function () {
                egret.Tween.get(panel).to({ x: panel.x + 5, y: panel.y }, shakeNum);
            }, this, shakeNum * 2);
            egret.setTimeout(function () {
                egret.Tween.get(panel).to({ x: panel.x, y: panel.y + 3 }, shakeNum);
            }, this, shakeNum * 3);
            egret.setTimeout(function () {
                egret.Tween.get(panel).to({ x: panel.x, y: panel.y - 5 }, shakeNum);
            }, this, shakeNum * 4);
            egret.setTimeout(function () {
                egret.Tween.get(panel).to({ x: panel.x, y: panel.y + 2 }, shakeNum);
            }, this, shakeNum * 5);
            egret.setTimeout(function () {
                egret.Tween.get(panel).to({ x: oldX, y: oldY }, shakeNum);
            }, this, shakeNum * 6);
        }
    }
    Animations.shakeScreen = shakeScreen;
    //淡出淡入
    function fadeOutIn(target) {
        egret.Tween.get(target).to({ alpha: 1.0 }, 200);
        egret.setTimeout(function () {
            egret.Tween.get(target).to({ alpha: 0 }, 200);
        }, this, 1000);
    }
    Animations.fadeOutIn = fadeOutIn;
    //淡出
    function fadeOut(target, time, func) {
        if (time === void 0) { time = 500; }
        if (func === void 0) { func = null; }
        target.alpha = 0;
        egret.Tween.get(target).to({ alpha: 1.0 }, time, egret.Ease.circOut).call(function () {
        });
        if (func) {
            func();
        }
    }
    Animations.fadeOut = fadeOut;
    /**淡入 */
    function fadeIn(target, time, func) {
        if (time === void 0) { time = 500; }
        if (func === void 0) { func = null; }
        target.alpha = 1.0;
        egret.Tween.get(target).to({ alpha: 0 }, time, egret.Ease.circIn).call(function () {
            if (func) {
                func();
            }
        });
    }
    Animations.fadeIn = fadeIn;
    /**放大后缩小 */
    function zoomIn(target) {
        egret.Tween.get(target).to({ scaleX: 6, scaleY: 6 }, 100, egret.Ease.circOut).call(function () {
            egret.Tween.get(target).to({ scaleX: 3, scaleY: 3 }, 100, egret.Ease.circIn);
        });
    }
    Animations.zoomIn = zoomIn;
    /**
    * str             提示内容
    * effectType      动画类型 1：从下到上弹出 2：从左至右弹出 3：从右至左弹出 4：从中间弹出渐渐消失 5：从大变小 等等
    * isWarning       是否是警告，警告是红色
    */
    function showTips(str, effectType, isWarning) {
        if (str === void 0) { str = ""; }
        if (effectType === void 0) { effectType = 1; }
        if (isWarning === void 0) { isWarning = false; }
        switch (effectType) {
            case 1:
                TipsUtils.showTipsDownToUp(str, isWarning);
                break;
            case 2:
                TipsUtils.showTipsLeftOrRight(str, isWarning, true);
                break;
            case 3:
                TipsUtils.showTipsLeftOrRight(str, isWarning, false);
                break;
            case 4:
                TipsUtils.showTipsFromCenter(str, isWarning);
                break;
            case 5:
                TipsUtils.showTipsBigToSmall(str, isWarning);
                break;
            default:
        }
    }
    Animations.showTips = showTips;
    /**幕布 */
    var curtainImage;
    /**
     * 场景幕布过度动画
     */
    function sceneTransition(func) {
        GameLayerManager.gameLayer().loadLayer.addChild(Common.globalMask);
        if (!curtainImage) {
            curtainImage = Utils.createBitmap("curtain_png");
        }
        curtainImage.alpha = 1.0;
        GameLayerManager.gameLayer().loadLayer.addChild(curtainImage);
        curtainImage.x = Common.SCREEN_W;
        curtainImage.y = 0;
        var toX = Common.SCREEN_W - curtainImage.width;
        egret.Tween.get(curtainImage).to({ x: toX }, 600).call(function () {
            if (func) {
                func();
            }
            egret.Tween.get(curtainImage).to({ alpha: 0 }, 300).call(function () {
                GameLayerManager.gameLayer().loadLayer.removeChildren();
            });
        });
    }
    Animations.sceneTransition = sceneTransition;
})(Animations || (Animations = {}));
//# sourceMappingURL=Animations.js.map