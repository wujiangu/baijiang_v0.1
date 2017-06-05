var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 八卦太极掌
 * 震开敌人并造成眩晕和伤害
 */
var TaijiPalm = (function (_super) {
    __extends(TaijiPalm, _super);
    function TaijiPalm() {
        return _super.call(this) || this;
    }
    TaijiPalm.prototype.init = function () {
        _super.prototype.init.call(this);
        this.push_range = 100;
    };
    TaijiPalm.prototype.start = function (animation, target) {
        _super.prototype.start.call(this, animation, target);
        target.armature.play(animation, 1);
    };
    TaijiPalm.prototype.update = function (target) {
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
                egret.Tween.get(enermy[i]).to({ x: changeX, y: changeY }, 100).call(function () {
                    enermy[i].hp--;
                    if (enermy[i].hp <= 0) {
                        enermy[i].gotoDead();
                    }
                    else {
                        _this.buff = ObjectPool.pop("UnableMove");
                        //特效名字
                        _this.buff.effectName = "skill01";
                        //id
                        _this.buff.buffData.id = 2;
                        //持续时间
                        _this.buff.buffData.duration = 3;
                        //作用点
                        _this.buff.buffData.postionType = PostionType.PostionType_Head;
                        enermy[i].addBuff(_this.buff);
                    }
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
    TaijiPalm.prototype.end = function () {
        _super.prototype.end.call(this);
        ObjectPool.push(this);
    };
    return TaijiPalm;
}(SkillBase));
__reflect(TaijiPalm.prototype, "TaijiPalm");
//# sourceMappingURL=TaijiPalm.js.map