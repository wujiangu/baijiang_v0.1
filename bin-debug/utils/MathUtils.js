/**
 * 数学计算相关
 */
var MathUtils;
(function (MathUtils) {
    /**
     * 直线公式，已知指定的两个点，确定一条直线
     * y = k * x + b，此函数即返回k = point.x和b = point.y
     * @param p1 一个点对象(点击的点)
     * @param p2 另外一个点对象(初始的点)
     * @return (kb) 返回直线公式的两个参数
     * */
    function lineFunc(p1X, p1Y, p2X, p2Y) {
        var k;
        var b;
        var kb = {};
        if (p1X == p2X) {
            //垂直线
            kb["k"] = -1;
            //向上
            if (p1Y <= p2Y) {
                kb["b"] = 0;
            }
            else {
                kb["b"] = 1;
            }
        }
        else if (p1Y == p2Y) {
            //水平线
            kb["k"] = 0;
            //向左
            if (p1X <= p2X) {
                kb["b"] = 0;
            }
            else {
                kb["b"] = 1;
            }
        }
        else {
            //普通线
            kb["k"] = (p1Y - p2Y) / (p1X - p2X);
            kb["b"] = p1Y - (p1Y - p2Y) / (p1X - p2X) * p1X;
        }
        return kb;
    }
    MathUtils.lineFunc = lineFunc;
    /**
     * 已知一条直线的公式和一个点的坐标，确定其垂直直线的公式(暂不考虑水平和垂直的线)
     */
    function getVerticalLine(k, x, y) {
        var kb = {};
        kb["k"] = -1 / k;
        kb["b"] = y - (kb["k"] * x);
        return kb;
    }
    MathUtils.getVerticalLine = getVerticalLine;
    /**
     * 点到直线的距离(直线公式为:kx-y+b=0)
     */
    function pointToLineDistance(x, y, kb) {
        var dis = 0;
        var disQ = kb["k"] * kb["k"] + 1;
        dis = Math.abs(kb["k"] * x - y + kb["b"]) / Math.sqrt(disQ);
        return dis;
    }
    MathUtils.pointToLineDistance = pointToLineDistance;
    /**
     * 直线的角度
     * @param point0
     * @param point1
     * @returns {number}
     */
    function getLineAngle(point0, point1) {
        var tmp_x = point1.x - point0.x;
        var tmp_y = point1.y - point0.y;
        var tmp_angle = -Math.atan2(tmp_y, tmp_x);
        return tmp_angle;
    }
    MathUtils.getLineAngle = getLineAngle;
    /**
     * 弧度转角度
     */
    function radianToAngle(radian) {
        var angle = Math.floor(180 * (radian / Math.PI));
        return angle;
    }
    MathUtils.radianToAngle = radianToAngle;
    /**
     * 已知直线的长度和角度，以及初始点的坐标，根据三角函数公式确定另一个坐标
     * @param p1 初始坐标(人物坐标)
     * @param angle 直线的角度
     * @param distance 距离
     * @return (Point) 返回另一个坐标
     */
    function coordinate(p1, angle, distance) {
        var point = {};
        var dx = distance * Math.cos(angle);
        var dy = distance * Math.sin(angle);
        point["x"] = p1.x + dx;
        point["y"] = p1.y - dy;
        return point;
    }
    MathUtils.coordinate = coordinate;
    /**
     * 弧度制转换为角度值
     * @param radian 弧度制
     * @returns {number}
     */
    function getAngle(radian) {
        return 180 * radian / Math.PI;
    }
    MathUtils.getAngle = getAngle;
    /**
     * 角度值转换为弧度制
     * @param angle
     */
    function getRadian(angle) {
        return angle / 180 * Math.PI;
    }
    MathUtils.getRadian = getRadian;
    /**
     * 获取两点间弧度
     * @param p1X
     * @param p1Y
     * @param p2X
     * @param p2Y
     * @returns {number}
     */
    function getRadian2(p1X, p1Y, p2X, p2Y) {
        var xdis = p2X - p1X;
        var ydis = p2Y - p1Y;
        var tmp_angle = Math.atan2(ydis, xdis);
        return tmp_angle;
    }
    MathUtils.getRadian2 = getRadian2;
    /**
     * 获取两点间距离
     * @param p1X
     * @param p1Y
     * @param p2X
     * @param p2Y
     * @returns {number}
     */
    function getDistance(p1X, p1Y, p2X, p2Y) {
        var disX = p2X - p1X;
        var disY = p2Y - p1Y;
        var disQ = disX * disX + disY * disY;
        return Math.sqrt(disQ);
    }
    MathUtils.getDistance = getDistance;
    /**获取两点的中点坐标 */
    function getMidCoordinate(x1, y1, x2, y2) {
        var point = {};
        var x = (x1 + x2) / 2;
        var y = (y1 + y2) / 2;
        point["x"] = x;
        point["y"] = y;
        return point;
    }
    MathUtils.getMidCoordinate = getMidCoordinate;
    /**获取从n~m之间的随机数 */
    function getRandom() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var argsLen = args.length;
        var random;
        switch (argsLen) {
            case 0:
                random = Math.random();
                break;
            case 1:
                random = Math.floor((args[0] + 1) * Math.random());
                break;
            default:
                random = Math.floor(Math.random() * (args[1] - args[0] + 1) + args[0]);
                break;
        }
        return random;
    }
    MathUtils.getRandom = getRandom;
})(MathUtils || (MathUtils = {}));
//# sourceMappingURL=MathUtils.js.map