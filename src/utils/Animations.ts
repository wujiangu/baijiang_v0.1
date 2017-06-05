/**
 * 公用动画
 */
namespace Animations {
    //抖动对象特效
    // 1：抖动  2：震动
    export function shakeScreen(target:any, effectType: number = 1): void {
        var panel = target;
        var shakeNum = 20;
        var oldX: number = panel.x;
        var oldY: number = panel.y;
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
        } else {
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

    //淡出淡入
    export function fadeOutIn(target:any):void {
        egret.Tween.get(target).to({ alpha: 1.0 }, 200);
        egret.setTimeout(function () {
                egret.Tween.get(target).to({ alpha: 0 }, 200);
            }, this, 1000);
    }
    //淡出
    export function fadeOut(target:any, time:number = 500, func:Function = null):void {
        target.alpha = 0;
        egret.Tween.get(target).to({ alpha: 1.0 }, time, egret.Ease.circOut).call(()=>{
        });
        if (func) {
            func();
        }
    }
    /**淡入 */
    export function fadeIn(target:any, time:number = 500, func:Function = null):void {
        target.alpha = 1.0;
        egret.Tween.get(target).to({ alpha: 0 }, time, egret.Ease.circIn).call(()=>{
            if (func) {
                func();
            }
        });
    }

    /**放大后缩小 */
    export function zoomIn(target:any):void {
        egret.Tween.get(target).to({scaleX:6, scaleY:6}, 100, egret.Ease.circOut).call(()=>{
            egret.Tween.get(target).to({scaleX:3, scaleY:3}, 100, egret.Ease.circIn);
        })
    }

    /**
    * str             提示内容
    * effectType      动画类型 1：从下到上弹出 2：从左至右弹出 3：从右至左弹出 4：从中间弹出渐渐消失 5：从大变小 等等
    * isWarning       是否是警告，警告是红色
    */
    export function showTips(str: string = "", effectType: number = 1, isWarning: boolean = false): void {
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
            // TODO: Implemente default case
        }

    }

    /**幕布 */
    var curtainImage:egret.Bitmap;
    /**
     * 场景幕布过度动画
     */
    export function sceneTransition(func:Function):void {
        GameLayerManager.gameLayer().loadLayer.addChild(Common.globalMask);
        if (!curtainImage) {
            curtainImage = Utils.createBitmap("curtain_png");
        }
        curtainImage.alpha = 1.0;
        GameLayerManager.gameLayer().loadLayer.addChild(curtainImage);
        curtainImage.x = Common.SCREEN_W;
        curtainImage.y = 0;
        let toX = Common.SCREEN_W - curtainImage.width;
        egret.Tween.get(curtainImage).to({x:toX}, 600).call(()=>{
            if (func) {
                func();
            }
            egret.Tween.get(curtainImage).to({alpha:0}, 300).call(()=>{
                GameLayerManager.gameLayer().loadLayer.removeChildren();
            });
        });
    }
}