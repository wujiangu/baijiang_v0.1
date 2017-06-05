/**
 * 人物的基本类
 */
class BaseGameObject extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.armature = new DragonBonesArmatureContainer();
        this.effectArmature = new DragonBonesArmatureContainer();
        this.buffArmature = new DragonBonesArmatureContainer();
        this.skillArmature = new DragonBonesArmatureContainer();
        this.addChild(this.armature);
        this.addChild(this.effectArmature);
        this.addChild(this.buffArmature);
        this.addChild(this.skillArmature);
    }

    public init(name:string = null) {
        TimerManager.getInstance().doFrame(1, 0, this.onFrame, this);
        this.isEnemy = true;
        this.speed = 3;
        this.attack = 0;
        this.hp = 0;
        this.originX = 0;
        this.originY = 0;
        this.deltaX = 0;
        this.deltaY = 0;
        this.radian = 0;
        this.sumDeltaX = 0;
        this.sumDeltaY = 0;
        this.canMove = true;
    }

    /**
     * 设置速度
     */
    public setSpeed(value:number):void {
        this.speed = value
    }
    /**
     * 设置攻击范围
     */
    public setAttackRange(value:number):void {
        this.atk_range = value;
    }
    /**
     * 帧执行函数
     */
    private onFrame(time:number):void {
        this.update(time);
    }

    /**
     * update
     */
    public update(time:number):void {
        if (this.x < 50) this.x = 50;
        if (this.y < 50) this.y = 50;
        if (this.x > Common.SCREEN_W - 50) this.x = Common.SCREEN_W - 50;
        if (this.y > Common.SCREEN_H - 50) this.y = Common.SCREEN_H - 50;
        let func:string = "state_" + this.curState;
        if (this.curState && this[func]) {
            this[func](time);
        }
    }

    /**待机 */
    public gotoIdle() {
        this.armature.play(BaseGameObject.Action_Idle, 0);
    }

    /**
     * 移动到指定的位置
     */
    public moveToTarget(gotoX:number, gotoY:number, func:Function = null):void {
        this.endX = gotoX;
        this.endY = gotoY;
    }

    /**
     * 清除特效
     */
    public removeEffect(actionName:string):void{
        this.effectArmature.stop();
        this.effectArmature.parent.removeChild(this.effectArmature);
    }

    /**
     * 播放特效
     */
    public playEffect(actionName:string) {
        if (this.effectArmature.play(actionName, 1)) {
            this.addChild(this.effectArmature);
        }else{
            this.removeEffect(actionName);
        }
    }

    /**走路方向(怪物的攻击也可以使用这个) */
    public getWalkPosition(name:string, radian:number) {
        let posName:string;
        let pi:number = Math.PI;
        if ((radian >= -0.75*pi) && (radian < -pi/4)) {
            posName = name + "01";
        }
        else if ((radian >= -pi/4 && radian < pi/4) || (radian > -pi && radian < -0.75*pi) || (radian > 0.75*pi && radian < pi)) {
            posName = name + "02";
        }
        else if (radian >= pi/4 && radian < 0.75*pi) {
            posName = name + "03"
        }
        return posName;
    }

    /**攻击方向 */
    public getAttackPosition(radian:number) {
        let pos:any = {};
        let pi:number = Math.PI;
        if ((radian >= -0.625*pi) && (radian < -0.375*pi)) {
            pos["posName"] = BaseGameObject.Action_Attack01;
            pos["id"] = 0;
        }
        else if ((radian >= -0.375*pi && radian < -0.125*pi) || (radian >= -0.875*pi && radian < -0.625*pi)) {
            pos["posName"] = BaseGameObject.Action_Attack02;
            pos["id"] = 1;
        }
        else if ((radian >= -0.125*pi && radian < 0.125*pi) || (radian >= -pi && radian < -0.875*pi) || (radian >= 0.875*pi && radian <= pi)) {
            pos["posName"] = BaseGameObject.Action_Attack03;
            pos["id"] = 2;
        }
        else if ((radian >= 0.125*pi && radian < 0.375*pi) || (radian >= 0.625*pi && radian < 0.875*pi)) {
            pos["posName"] = BaseGameObject.Action_Attack04;
            pos["id"] = 3;
        }else{
            pos["posName"] = BaseGameObject.Action_Attack05;
            pos["id"] = 4;
        }
        return pos;
    }

    /**反向 */
    public reverse(target:any, radian:number):boolean {
        if ((radian > -Math.PI/2) && (radian < Math.PI/2)) {
            target.scaleX = 1;
            return false;
        }else{
            target.scaleX = -1;
            return true;
        }
    }

    /**检查是否应经存在buff */
    public isExistBuff(buff:any):boolean {
        let status:boolean = false;
        for (let i = 0; i < this.buff.length; i++) {
            if (buff.buffData.id == this.buff[i].buffData.id) {
                status = true;
                break;
            }
        }
        return status;
    }

    public static Action_Enter:string = "enter";
    public static Action_Idle:string = "idle";
    public static Action_Attack01:string = "attack01";
    public static Action_Attack02:string = "attack02";
    public static Action_Attack03:string = "attack03";
    public static Action_Attack04:string = "attack04";
    public static Action_Attack05:string = "attack05";
    public static Action_Hurt:string = "hurt";

    /**当前人物运动状态 */
    public curState:string;
    /**上一次状态的动画 */
    public lastAnimation:string;
    
    /**初始位置 */
    public originX:number = 0;
    public originY:number = 0;
    /**移动过程中的位置增量 */
    public deltaX:number;
    public deltaY:number;
    /**攻击或者释放技能的弧度 */
    public radian:number;
    /**移动过程中的增加之和，用于判断释放移动完成 */
    public sumDeltaX:number;
    public sumDeltaY:number;
    /**攻击或技能伤害区域的中心点 */
    public centerX:number;
    public centerY:number;
    /**移动的终点 */
    public endX:number;
    public endY:number;
    public isEnemy:boolean;
    /**角色肢体动作的骨架 */
    public armature:DragonBonesArmatureContainer;
    /**角色身上带有的特效骨架，包括受伤和被动等 */
    public effectArmature:DragonBonesArmatureContainer;
    /**角色受到buff影响的骨架 */
    public buffArmature:DragonBonesArmatureContainer;
    /**角色释放主动技能的骨架 */
    public skillArmature:DragonBonesArmatureContainer;
    /***************************人物的基本属性************************/
    /**身上带的buff */
    public buff:any[];
    /**buff的特效组 */
    public buffEffect:any[];
    /**buff的id */
    public buffId:any[];
    /**攻击范围 */
    public atk_range:number;
    /**攻击范围X轴分量 */
    public atk_rangeX:number;
    /**攻击范围Y轴分量 */
    public atk_rangeY:number;
    /**攻击速度 */
    public atk_speed:number;
    /**是否受到控制 */
    public canMove:boolean;
    public speed:number;
    public attack:number;
    public hp:number;
}