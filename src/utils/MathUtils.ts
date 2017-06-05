/**
 * 数学计算相关
 */
namespace MathUtils {
    /**
     * 直线公式，已知指定的两个点，确定一条直线
     * y = k * x + b，此函数即返回k = point.x和b = point.y
     * @param p1 一个点对象(点击的点)
     * @param p2 另外一个点对象(初始的点)
     * @return (kb) 返回直线公式的两个参数
     * */
    export function lineFunc(p1X:number, p1Y:number, p2X:number, p2Y:number):any{
        var k:number;
        var b:number;
        var kb:any = {};
        if (p1X == p2X) {
            //垂直线
            kb["k"] = -1;
            //向上
            if (p1Y <= p2Y) {
                kb["b"] = 0;
            }else{
                kb["b"] = 1;
            }
        }
        else if (p1Y == p2Y) {
            //水平线
            kb["k"] = 0;
            //向左
            if (p1X <= p2X) {
                kb["b"] = 0;
            }else{
                kb["b"] = 1;
            }
        }
        else{
            //普通线
            kb["k"] = (p1Y - p2Y) / (p1X - p2X);
            kb["b"] = p1Y - (p1Y - p2Y) / (p1X - p2X) * p1X;
        }
        return kb;
    }

    /**
     * 已知一条直线的公式和一个点的坐标，确定其垂直直线的公式(暂不考虑水平和垂直的线)
     */
    export function getVerticalLine(k:number, x:number, y:number) {
        var kb:any = {};
        kb["k"] = -1/k;
        kb["b"] = y - (kb["k"] * x);
        return kb;
    }

    /**
     * 点到直线的距离(直线公式为:kx-y+b=0)
     */
    export function pointToLineDistance(x:number, y:number, kb:any) {
        var dis:number = 0;
        var disQ:number = kb["k"] * kb["k"] + 1;
        dis = Math.abs(kb["k"]*x - y + kb["b"])/Math.sqrt(disQ);
        return dis;
    }

    /**
     * 直线的角度
     * @param point0
     * @param point1
     * @returns {number}
     */
    export function getLineAngle(point0:egret.Point, point1:egret.Point):number {
        var tmp_x:number = point1.x - point0.x;
        var tmp_y:number = point1.y - point0.y;
        var tmp_angle:number = -Math.atan2( tmp_y, tmp_x );
        return tmp_angle;
    }

    /**
     * 弧度转角度
     */
    export function radianToAngle(radian:any):number {
        let angle = Math.floor(180*(radian/Math.PI));
        return angle;
    }

    /**
     * 已知直线的长度和角度，以及初始点的坐标，根据三角函数公式确定另一个坐标
     * @param p1 初始坐标(人物坐标)
     * @param angle 直线的角度
     * @param distance 距离
     * @return (Point) 返回另一个坐标
     */
    export function coordinate(p1:egret.Point, angle:number, distance:number):any {
        var point:any = {};
        var dx:number = distance*Math.cos(angle);
        var dy:number = distance*Math.sin(angle);
        point["x"] = p1.x + dx;
        point["y"] = p1.y - dy;
        return point;
    }

    /**
     * 弧度制转换为角度值
     * @param radian 弧度制
     * @returns {number}
     */
    export function getAngle(radian:number):number {
        return 180 * radian / Math.PI;
    }

    /**
     * 角度值转换为弧度制
     * @param angle
     */
    export function getRadian(angle:number):number {
        return angle / 180 * Math.PI;
    }

    /**
     * 获取两点间弧度
     * @param p1X
     * @param p1Y
     * @param p2X
     * @param p2Y
     * @returns {number}
     */
    export function getRadian2(p1X:number, p1Y:number, p2X:number, p2Y:number):number {
        var xdis:number = p2X - p1X;
        var ydis:number = p2Y - p1Y;
        var tmp_angle:number = Math.atan2(ydis, xdis);
        return tmp_angle;
    }

    /**
     * 获取两点间距离
     * @param p1X
     * @param p1Y
     * @param p2X
     * @param p2Y
     * @returns {number}
     */
    export function getDistance(p1X:number, p1Y:number, p2X:number, p2Y:number):number {
        var disX:number = p2X - p1X;
        var disY:number = p2Y - p1Y;
        var disQ:number = disX * disX + disY * disY;
        return Math.sqrt(disQ);
    }

    /**获取两点的中点坐标 */
    export function getMidCoordinate(x1:number, y1:number, x2:number, y2:number) {
        var point:any = {};
        var x:number = (x1 + x2)/2;
        var y:number = (y1 + y2)/2;
        point["x"] = x;
        point["y"] = y;
        return point;
    }

    /**获取从n~m之间的随机数 */
    export function getRandom(...args:any[]) {
        let argsLen:number = args.length;
        let random:number;
        switch (argsLen) {
            case 0:
                random = Math.random();
            break;
            case 1:
                random = Math.floor((args[0] + 1)*Math.random());
            break;
            default:
                random = Math.floor(Math.random()*(args[1]-args[0]+1) + args[0]);
            break;
        }
        return random;
    }
}