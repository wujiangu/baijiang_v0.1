/**
 * DragonBonesArmature容器类，用于一个动画需要多个DragonBonesArmature的情况
 */
class DragonBonesArmatureContainer extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.armatures = new Array<DragonBonesArmature>();
        this.actions = {};
        this.bones = {};
    }

    public getArmatures() {
        return this.armatures;
    }

    /**
     * 注册需要的DragonBonesArmature
     */
    public register(dragonBonesArmature:DragonBonesArmature, actions:Array<string>):void {
        this.armatures.push(dragonBonesArmature);
        for (let i = 0; i < actions.length; i++) {
            this.actions[actions[i]] = this.armatures.length - 1;
        }
    }

    /**
     * 增加动画完成的监听函数
     */
    public addCompleteCallFunc(func:Function, target:any) {
        for (let i = 0; i < this.armatures.length; i++) {
            let armature:DragonBonesArmature = this.armatures[i];
            armature.addCompleteCallFunc(func, target);
        }
    }

    /**
     * 移除播放完成处理函数
     * @param callFunc
     * @param target
     */
    public removeCompleteCallFunc(func:Function, target:any):void {
        for (var i = 0; i < this.armatures.length; i++) {
            var arm:DragonBonesArmature = this.armatures[i];
            arm.removeCompleteCallFunc(func, target);
        }
    }

    /**
     * 增加帧事件处理函数
     */
    public addFrameCallFunc(func:Function, target:any) {
        for (let i = 0; i < this.armatures.length; i++) {
            let armature:DragonBonesArmature = this.armatures[i];
            armature.addFrameCallFunc(func, target);
        }
    }

    /**
     * 获取Bone
     */
    public getBone(skeletonName:string, boneName:string, target:any):dragonBones.Bone {
        let name:string = skeletonName + boneName;
        if (!this.bones[name]) {
            for (let i = 0; i < this.armatures.length; i++) {
                let armature:DragonBonesArmature = this.armatures[i];
                let bone:dragonBones.Bone = armature.getBone(boneName, target);
                if (bone != null) {
                    this.bones[name] = bone;
                    break;
                }
            }
        }
        return this.bones[name];
    }

    public getState(action:string):dragonBones.AnimationState {
       if (this.actions[action] == null) {
            Common.log("不存在动作---->"+action+typeof(action));
            return;
        }
        let newArmatureIndex:number = this.actions[action];
        let newArmature:DragonBonesArmature = this.armatures[newArmatureIndex];
        if (newArmature) {
            this.curArmatureIndex = newArmatureIndex;
            return newArmature.getState(action);
        }
        return null;
    }

    /**
     * 播放动作
     */
    public play(action:string, playTimes:number = undefined):void {
        if (this.actions[action] == null) {
            Common.log("不存在动作---->"+action+typeof(action));
            return;
        }
        let newArmatureIndex:number = this.actions[action];
        if (newArmatureIndex != this.curArmatureIndex) {
            this.remove()
        }

        let newArmature:DragonBonesArmature = this.armatures[newArmatureIndex];
        if (newArmature) {
            this.addChild(newArmature);
            this.curArmatureIndex = newArmatureIndex;
            newArmature.play(action, playTimes);
        }
    }

    /**
     * 播放多个动画
     */
    public playMulti(actions:Array<string>, id:Array<number>, playTimes:Array<number> = null) {
        if (this.actions[actions[0]] == null) {
            Common.log("不存在动作---->"+actions[0]+typeof(actions[0]));
            return;
        }
        let newArmatureIndex:number = this.actions[actions[0]];
        if (newArmatureIndex != this.curArmatureIndex) {
            this.remove()
        }

        let newArmature:DragonBonesArmature = this.armatures[newArmatureIndex];
        if (newArmature) {
            this.addChild(newArmature);
            this.curArmatureIndex = newArmatureIndex;
            newArmature.playMuti(actions, id, playTimes);
        }
    }

    public fadeOut(action:string) {
         if (this.actions[action] == null) {
            return;
        }
        let newArmatureIndex:number = this.actions[action];
        if (newArmatureIndex != this.curArmatureIndex) {
            this.remove()
        }

        let newArmature:DragonBonesArmature = this.armatures[newArmatureIndex];
        if (newArmature) {
            this.addChild(newArmature);
            this.curArmatureIndex = newArmatureIndex;
            newArmature.fadeOut(action);
        }
    }


    /**
     * 停止当前DragonBonesArmature
     */
    public stop():void {
        var currArm:DragonBonesArmature = this.armatures[this.curArmatureIndex];
        if (currArm) {
            currArm.stop();
        }
    }

    /**
     * 移除上一个DragonArmature
     */
    public remove():void {
        let oldArmature:DragonBonesArmature = this.armatures[this.curArmatureIndex];
        if (oldArmature) {
            oldArmature.stop();
            oldArmature.parent.removeChild(oldArmature);
            this.curArmatureIndex = null;
        }
    }

    private armatures:Array<DragonBonesArmature>;
    private actions:any;
    private curArmatureIndex:number;
    private bones:any;
}