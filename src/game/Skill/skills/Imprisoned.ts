/**
 * 禁锢技能(导致人物无法行动，包括禁锢、眩晕、冰冻等)
 */
class Imprisoned extends SkillBase {
    public constructor() {
        super();
    }

    public init() {
        super.init();
        this.buffIndex = 1;
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
}