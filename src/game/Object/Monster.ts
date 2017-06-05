/**
 * 怪物
 */
class Monster extends Enermy {
    public constructor() {
        super();
    }

    public initDragonBonesArmature(name:string):void {
        super.initDragonBonesArmature(name);
        this.armature.register(DragonBonesFactory.getInstance().makeArmature(name, name, 2.0), [
            BaseGameObject.Action_Idle,
            BaseGameObject.Action_Hurt,
            BaseGameObject.Action_Attack01,
            BaseGameObject.Action_Attack02,
            BaseGameObject.Action_Attack03,
            Enermy.Action_Run01,
            Enermy.Action_Run02,
            Enermy.Action_Run03,
            Enermy.Action_Dead,
            Monster.Action_Ready01,
            Monster.Action_Ready02
        ]);
        //增加动画帧执行函数
        this.armature.addFrameCallFunc(this.armatureFrame, this);
        this.armature.scaleX = 1.5;
        this.armature.scaleY = 1.5;
    }

    public init(name:string) {
        super.init(name);
        this.initDragonBonesArmature(name);
        this.speed = 10;
        this.atk_range = 100;
        this.atk_speed = 30;
        this.readyCount = 0;
        this.hp = ConfigManager.tcStage[GameData.curStage-1].hp;
        //增加动画完成函数
        this.armature.addCompleteCallFunc(this.armaturePlayEnd, this);
        this.effectArmature.addCompleteCallFunc(this.effectArmaturePlayEnd, this);
        this.gotoEnter();
    }

    /**
     * 待机状态
     */
    public state_idle(time:number):void {

    }

    /**死亡状态 */
    public state_dead(time:number):void {

    }

    /**
     * 走路巡逻状态
     */
    public state_run(time:number):void {
        super.state_run(time);
    }

    /**
     * 蓄力状态
     */
    public state_xuli01(time:number):void {
        
    }

    /**
     * 收到攻击状态
     */
    public state_hurt(time:number):void {
        // Common.log(this.effectArmature.getState(this.curState));
    }

    /**攻击状态 */
    public state_attack(time:number):void {
        if (Math.abs(this.sumDeltaX) > this.atk_rangeX || Math.abs(this.sumDeltaY) > this.atk_rangeY) {
            if (this.curState == BaseGameObject.Action_Hurt) {
                return;
            }
            this.gotoRun();
            //怪物到英雄的距离
            var dis = MathUtils.getDistance(this.centerX, this.centerY, GameData.heros[0].x, GameData.heros[0].y);
            var dx = dis*Math.cos(this.heroRadian);
            var dy = dis*Math.sin(this.heroRadian);
            if ((Math.abs(dx) <= this.atk_range/2) && (Math.abs(dy) <= 33)) {
                GameData.heros[0].gotoHurt();
            }else{
            }
        }

        this.x = this.x + this.deltaX;
        this.y = this.y + this.deltaY;
        this.sumDeltaX = this.sumDeltaX + this.deltaX;
        this.sumDeltaY = this.sumDeltaY + this.deltaY;
    }

    /**
     * 进场
     */
    public gotoEnter() {
        super.gotoEnter();
        this.armature.play(BaseGameObject.Action_Idle, 0);
    }

    /**奔跑 */
    public gotoRun() {
        super.gotoRun();
    }

    /**攻击 */
    public gotoAttack() {
        super.gotoAttack();
        this.sumDeltaX = 0;
        this.sumDeltaY = 0;
        let useSpeed = this.atk_speed * 0.5;

        let animation = this.getWalkPosition("attack", this.radian);
        let dx = Math.cos(this.radian) * this.atk_range;
        let dy = Math.sin(this.radian) * this.atk_range;
        this.atk_rangeX = Math.abs(dx);
        this.atk_rangeY = Math.abs(dy);
        /**中心点 */
        this.centerX = (2*this.originX + dx)/2;
        this.centerY = (2*this.originY + dy)/2;
        this.heroRadian = MathUtils.getRadian2(this.centerX, this.centerY, GameData.heros[0].x, GameData.heros[0].y);

        this.deltaX = Math.cos(this.radian) * useSpeed;
        this.deltaY = Math.sin(this.radian) * useSpeed;
        this.armature.play(animation, 0);
    }

    /**受到攻击 */
    public gotoHurt(isSkillHurt:boolean = false) {
        super.gotoHurt();
    }

    /**增加buff */
    public addBuff(buff:any) {
        if (this.curState == Monster.Action_Dead || this.curState == BaseGameObject.Action_Hurt) return;
        if (this.isExistBuff(buff) && (buff.buffData.controlType == ControlType.YES) && (buff.buffData.superpositionType == SuperpositionType.SuperpositionType_None)) return;
        this.buff.push(buff);
        this.armature.play(BaseGameObject.Action_Hurt);
        buff.buffStart(this);
    }

    /**蓄力 */
    public gotoReady() {
        if (!this.canMove) return;
        this.curState = Monster.Action_Ready01;
        this.readyCount = 0;
        this.armature.play(Monster.Action_Ready01, 3);
        this.armature.addCompleteCallFunc(this.armaturePlayEnd, this);
    }

    /**死亡 */
    public gotoDead() {
        super.gotoDead();
    }

    /**消失 */
    public disappear():void {
        super.disappear();
        let index = GameData.monsters.indexOf(this);
        GameData.monsters.splice(index, 1);
    }

    /**
     * 帧事件处理函数
     */
    public armatureFrame(event:any):void {
        super.armatureFrame(event);
    }

    /**
     * 特效动画播放完成函数
     */
    public effectArmaturePlayEnd():void {
        super.effectArmaturePlayEnd();
    }

    /**
     * 动画播放完成函数
     */
    public armaturePlayEnd():void {
        super.armaturePlayEnd();
        switch (this.curState) {
            case Monster.Action_Ready01:
                this.readyCount ++;
                if (this.readyCount == 3) {
                    this.gotoAttack();
                }
            break;
        }
    }

    /**
     * 停止动画
     */
    public removeComplete():void {
        super.removeComplete();
    }

    /**
     * 停止人物动作动画
     */
    public removeActComplete():void {
        this.armature.removeCompleteCallFunc(this.armaturePlayEnd, this);
    }

    public addEffectComplete() {
        this.effectArmature.addCompleteCallFunc(this.effectArmaturePlayEnd, this);
    }

    /**停止特效动画 */
    public removeEffectComplete():void {
        this.effectArmature.removeCompleteCallFunc(this.effectArmaturePlayEnd, this);
    }

    public isSkillHurt:boolean;
    private readyCount:number;
    private heroRadian:number;

    /*************英雄的动作***************/
    private static Action_Ready01:string = "xuli01";
    private static Action_Ready02:string = "xuli02";
    private static Action_Skill:string = "skill01"
    /************************************/
}