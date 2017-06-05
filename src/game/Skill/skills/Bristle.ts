/**
 * 怒发冲冠(震开敌人，兵造成可持续伤害)
 */
class Bristle extends SkillBase {
    public constructor() {
        super();
    }

    public init() {
        super.init();
        this.buffIndex = 1;
        this.push_range = 200;
    }

    public start(animation:string, target:any) {
        super.start(animation, target);
        target.armature.play(animation, 1);
    }

    public update(target:any) {
        target.setEnermy();
        let enermy = target.getEnermy();
        for (let i = 0; i < enermy.length; i++) {
            let dis = MathUtils.getDistance(target.x, target.y, enermy[i].x, enermy[i].y);
            if (dis <= this.skillData.skill_range) {
                if (enermy[i].isSkillHurt) return;
                enermy[i].isSkillHurt = true;
                enermy[i].removeActComplete();
                let radian = MathUtils.getRadian2(target.x, target.y, enermy[i].x, enermy[i].y);
                let dx = Math.cos(radian) * this.push_range;
                let dy = Math.sin(radian) * this.push_range;
                let changeX = enermy[i].x + dx;
                let changeY = enermy[i].y + dy;
                egret.Tween.get(enermy[i]).to({x:changeX, y:changeY}, 200).call(()=>{
                    this.buff = ObjectPool.pop("ContinuousInjury");
                    switch (this.buffIndex) {
                        //烧伤
                        case 1:
                            //特效名字
                            this.buff.effectName = "skill01";
                            //id
                            this.buff.buffData.id = 3;
                            //持续时间
                            this.buff.buffData.duration = 5;
                            //作用点
                            this.buff.buffData.postionType = PostionType.PostionType_Body;
                        break;
                        //中毒
                        case 2:
                        break;
                    }
                    enermy[i].addBuff(this.buff);
                }, this);
            }
        }
    }

    public end() {
        super.end();
        ObjectPool.push(this);
    }

    /**若有附加buff，设置buff的id */
    public setBuffId(value:number) {
        this.buffIndex = value;
    }

    private buff:UnableMove;
    private buffIndex:number;
    /**震开距离 */
    private push_range:number;
}