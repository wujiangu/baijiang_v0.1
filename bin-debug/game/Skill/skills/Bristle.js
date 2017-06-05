var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 怒发冲冠(震开敌人，兵造成可持续伤害)
 */
var Bristle = (function (_super) {
    __extends(Bristle, _super);
    function Bristle() {
        return _super.call(this) || this;
    }
    Bristle.prototype.init = function () {
        _super.prototype.init.call(this);
        this.buffIndex = 1;
        this.push_range = 200;
    };
    Bristle.prototype.start = function (animation, target) {
        _super.prototype.start.call(this, animation, target);
        target.armature.play(animation, 1);
    };
    Bristle.prototype.update = function (target) {
        var _this = this;
        target.setEnermy();
        var enermy = target.getEnermy();
        var _loop_1 = function (i) {
            var dis = MathUtils.getDistance(target.x, target.y, enermy[i].x, enermy[i].y);
            if (dis <= this_1.skillData.skill_range) {
                if (enermy[i].isSkillHurt)
                    return { value: void 0 };
                enermy[i].isSkillHurt = true;
                enermy[i].removeActComplete();
                var radian = MathUtils.getRadian2(target.x, target.y, enermy[i].x, enermy[i].y);
                var dx = Math.cos(radian) * this_1.push_range;
                var dy = Math.sin(radian) * this_1.push_range;
                var changeX = enermy[i].x + dx;
                var changeY = enermy[i].y + dy;
                egret.Tween.get(enermy[i]).to({ x: changeX, y: changeY }, 200).call(function () {
                    _this.buff = ObjectPool.pop("ContinuousInjury");
                    switch (_this.buffIndex) {
                        //烧伤
                        case 1:
                            //特效名字
                            _this.buff.effectName = "skill01";
                            //id
                            _this.buff.buffData.id = 3;
                            //持续时间
                            _this.buff.buffData.duration = 5;
                            //作用点
                            _this.buff.buffData.postionType = PostionType.PostionType_Body;
                            break;
                        //中毒
                        case 2:
                            break;
                    }
                    enermy[i].addBuff(_this.buff);
                }, this_1);
            }
        };
        var this_1 = this;
        for (var i = 0; i < enermy.length; i++) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    };
    Bristle.prototype.end = function () {
        _super.prototype.end.call(this);
        ObjectPool.push(this);
    };
    /**若有附加buff，设置buff的id */
    Bristle.prototype.setBuffId = function (value) {
        this.buffIndex = value;
    };
    return Bristle;
}(SkillBase));
__reflect(Bristle.prototype, "Bristle");
//# sourceMappingURL=Bristle.js.map