/**
 * 工具
 */
var Utils;
(function (Utils) {
    /**
     * 创建文本
     * @param str   显示的内容
     * @param x,y   文本的位置
     * @param size  文本的大小(默认24)
     * @param color 文本的颜色(默认白色)
     */
    function createText(str, x, y, size, color) {
        if (size === void 0) { size = 24; }
        if (color === void 0) { color = 0xFFFFFF; }
        var text = new egret.TextField();
        text.text = str;
        text.x = x;
        text.y = y;
        text.size = size;
        text.textColor = color;
        return text;
    }
    Utils.createText = createText;
    /**
     * 创建位图
     * @param name  位图的ID
     */
    function createBitmap(name) {
        var bitMap = new egret.Bitmap();
        var texture = RES.getRes(name);
        bitMap.texture = texture;
        return bitMap;
    }
    Utils.createBitmap = createBitmap;
    //设置控件位置
    function setControlPosition(control, x, y, xScale, yScale) {
        control.x = x;
        control.y = y;
        control.scaleX = xScale;
        control.scaleY = yScale;
    }
    Utils.setControlPosition = setControlPosition;
    /**
     * @judgement the toggleButton status
     * 判断叠层的状态
     */
    function viewStackStatus(viewstack, toggleButton, index) {
        viewstack.selectedIndex = index;
        for (var i = 0; i < toggleButton.length; i++) {
            if (i != index) {
                toggleButton[i].selected = false;
            }
            else {
                toggleButton[i].selected = true;
            }
        }
    }
    Utils.viewStackStatus = viewStackStatus;
    /**
     * @judgement the toggleButton status
     * 判断切换按键的状态
     */
    function toggleButtonStatus(toggleButton, index) {
        for (var i = 0; i < toggleButton.length; i++) {
            if (i != index) {
                toggleButton[i].selected = false;
            }
            else {
                toggleButton[i].selected = true;
            }
        }
    }
    Utils.toggleButtonStatus = toggleButtonStatus;
    /**
     * 判断内存中是否已有界面，如有直接取出，没有则创建
     */
    function getInterface(nextCls, own) {
        if (own === void 0) { own = GameLayerManager.gameLayer().panelLayer; }
        var child;
        if (!own.getChildByName(nextCls.prototype['__class__'])) {
            child = new nextCls();
            Common.log("创建界面" + own.getChildByName(nextCls.prototype['__class__']));
        }
        else {
            child = own.getChildByName(nextCls.prototype['__class__']);
            Common.log("读取界面");
        }
        return child;
    }
    Utils.getInterface = getInterface;
})(Utils || (Utils = {}));
//# sourceMappingURL=Utils.js.map