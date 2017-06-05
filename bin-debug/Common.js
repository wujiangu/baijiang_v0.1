/**
* 游戏公用常量和方法
*/
var Common;
(function (Common) {
    /**测试数据 */
    Common.userData = {
        "selectHero": 1,
        "equip": [],
        "speed": 10,
        "distance": 400,
        "money": 0,
        "soul": 0,
    };
    /**全局字体颜色 */
    Common.TextColors = {
        white: 0xFFFFFF,
        milkWhite: 0xefe8c0,
        grayWhite: 0xceb6a2,
        yellow: 0xffff00,
        lightYellow: 0xffd375,
        orangeYellow: 0xff9900,
        red: 0xa52d1c,
        green: 0x00e500,
        blue: 0x1a94d7,
        grayBlue: 0x2f5177,
        purple: 0xe938f2,
        pink: 0xFF3030,
        black: 0x2e2d2d,
        golden: 0xFFD700 //金色
    };
    /**全局字体大小 */
    Common.LabelFontSize = {
        littleSize: 12,
        middleSize: 18,
        normalSize: 24,
        bigSize: 36 //大型字体大小
    };
    /**判断是否是微信浏览 */
    function isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        var microStr = "" + ua.match(/MicroMessenger/i);
        if (microStr == "null") {
            return false;
        }
        else if (microStr == "micromessenger") {
            return true;
        }
    }
    Common.isWeiXin = isWeiXin;
    /**获得浏览器类型 pc android ios -- 可扩展为其他 如 微信、qqzone、qq、微博、校内、facebook */
    function systemType() {
        var ua = window.navigator.userAgent.toLowerCase();
        var microStr = "" + ua.match(/MicroMessenger/i);
        if (("" + ua.match(/windows nt/i)) == "windows nt") {
            return "windows";
        }
        else if (("" + ua.match(/iphone/i)) == "iphone") {
            return "ios";
        }
        else if (("" + ua.match(/android/i)) == "android") {
            return "android";
        }
        else if (("" + ua.match(/ipad/i)) == "ipad") {
            return "ipad";
        }
        else if (("" + ua.match(/linux/i)) == "linux") {
            return "linux";
        }
        else if (("" + ua.match(/mac/i)) == "mac") {
            return "mac";
        }
        else if (("" + ua.match(/ucbrower/i)) == "ucbrower") {
            return "ucbrower";
        }
        else {
            console.log("未知系统类型");
        }
    }
    Common.systemType = systemType;
    /**获得平台类型 如 微信、qqzone、qq、微博、校内、facebook */
    function platformType() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (("" + ua.match(/micromessenger/i)) == "micromessenger") {
            return "micromessenger";
        }
        else if (("" + ua.match(/qzone/i)) == "qzone") {
            return "qzone";
        }
        else if (("" + ua.match(/weibo/i)) == "weibo") {
            return "weibo";
        }
        else if (("" + ua.match(/qq/i)) == "qq") {
            return "qq";
        }
        else if (("" + ua.match(/renren/i)) == "renren") {
            return "renren";
        }
        else if (("" + ua.match(/txmicroblog/i)) == "txmicroblog") {
            return "txmicroblog";
        }
        else if (("" + ua.match(/douban/i)) == "douban") {
            return "douban";
        }
        else {
            return "other";
        }
    }
    Common.platformType = platformType;
    /**
     * 输出log信息
     */
    function log(message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        if (!!true) {
            console.log.apply(console, [message].concat(optionalParams));
        }
    }
    Common.log = log;
    //派发事件
    function dispatchEvent(type, obj, bubbles, cancelable) {
        if (obj === void 0) { obj = null; }
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var event = new lcp.LEvent(type, obj, bubbles, cancelable);
        lcp.LListener.getInstance().dispatchEvent(event);
    }
    Common.dispatchEvent = dispatchEvent;
    //监听事件
    function addEventListener(type, listener, thisObject, useCapture, priority) {
        if (useCapture === void 0) { useCapture = false; }
        if (priority === void 0) { priority = 0; }
        lcp.LListener.getInstance().addEventListener(type, listener, thisObject, useCapture, priority);
    }
    Common.addEventListener = addEventListener;
    //删除事件
    function removeEventListener(type, listener, thisObject, useCapture) {
        if (useCapture === void 0) { useCapture = false; }
        lcp.LListener.getInstance().removeEventListener(type, listener, thisObject, useCapture);
    }
    Common.removeEventListener = removeEventListener;
    //当前舞台
    function curStage() {
        return egret.MainContext.instance.stage;
    }
    Common.curStage = curStage;
    //当前游戏宽度
    function curWidth() {
        return egret.MainContext.instance.stage.stageWidth;
    }
    Common.curWidth = curWidth;
    //当前游戏宽度
    function curHeight() {
        return egret.MainContext.instance.stage.stageHeight;
    }
    Common.curHeight = curHeight;
    /**创建全局遮罩 */
    function createGlobleMask() {
        Common.globalMask = Utils.createBitmap("mask_png");
        Common.globalMask.alpha = 0.01;
        Common.globalMask.width = Common.SCREEN_W;
        Common.globalMask.height = Common.SCREEN_H;
    }
    Common.createGlobleMask = createGlobleMask;
})(Common || (Common = {}));
//# sourceMappingURL=Common.js.map