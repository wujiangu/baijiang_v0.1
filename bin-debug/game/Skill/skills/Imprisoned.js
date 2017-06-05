var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 禁锢技能(导致人物无法行动，包括禁锢、眩晕、冰冻等)
 */
var Imprisoned = (function (_super) {
    __extends(Imprisoned, _super);
    function Imprisoned() {
        return _super.call(this) || this;
    }
    Imprisoned.prototype.init = function () {
        _super.prototype.init.call(this);
        this.buffIndex = 1;
    };
    Imprisoned.prototype.start = function (animation, target) {
        _super.prototype.start.call(this, animation, target);
        target.armature.play(animation, 1);
    };
    Imprisoned.prototype.update = function (target) {
        target.setEnermy();
        var enermy = target.getEnermy();
        for (var i = 0; i < enermy.length; i++) {
            var dis = MathUtils.getDistance(target.x, target.y, enermy[i].x, enermy[i].y);
            if (dis <= this.skillData.skill_range) {
                if (enermy[i].isSkillHurt)
                    return;
                enermy[i].isSkillHurt = true;
                enermy[i].removeActComplete();
                this.buff = ObjectPool.pop("UnableMove");
                switch (this.buffIndex) {
                    //禁锢
                    case 1:
                        //特效名字
                        this.buff.effectName = "skill01";
                        //id
                        this.buff.buffData.id = 1;
                        //持续时间
                        this.buff.buffData.duration = 5;
                        //作用点
                        this.buff.buffData.postionType = PostionType.PostionType_Foot;
                        break;
                    //眩晕
                    case 2:
                        break;
                }
                enermy[i].addBuff(this.buff);
            }
        }
    };
    Imprisoned.prototype.end = function () {
        _super.prototype.end.call(this);
        ObjectPool.push(this);
    };
    /**若有附加buff，设置buff的id */
    Imprisoned.prototype.setBuffId = function (value) {
        this.buffIndex = value;
    };
    return Imprisoned;
}(SkillBase));
__reflect(Imprisoned.prototype, "Imprisoned");
//# sourceMappingURL=Imprisoned.js.map