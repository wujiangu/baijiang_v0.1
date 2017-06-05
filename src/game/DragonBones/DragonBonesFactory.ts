/**
 * DragonBones工厂类
 */
class DragonBonesFactory {
    public constructor() {
        this.factory = new dragonBones.EgretFactory();
        this.clocks = new Array<dragonBones.WorldClock>();
        this.clockLen = 0;
    }

    public static getInstance():DragonBonesFactory {
        if (!this._instance) {
            this._instance = new DragonBonesFactory();
        }
        return this._instance;
    }


    /**
     * 添加动画所需要的资源
     * 
     */
    public addTextureAtlas(texture:egret.Texture, textureData:any):void {
        return this.factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
    }

    /**
     * 初始化一个动画文件
     */
    public initDragonBonesArmatureFile(skeletonData:any, textureData:any, texture:egret.Texture):void {
        this.factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
        this.addTextureAtlas(texture, textureData);
    }

    /**
     * 创建一个动画
     */
    public makeArmature(name:string, dragonBonesName?:string, playSpeed:number = -1):DragonBonesArmature {
        let armature:dragonBones.Armature = this.factory.buildArmature(name, dragonBonesName);
        if (!armature) {
            Common.log("不存在");
            return null;
        }
        let clock:dragonBones.WorldClock = this.createWorldClock(playSpeed);
        let result:DragonBonesArmature = new DragonBonesArmature(armature, clock);
        return result;
    }

    /**
     * 创建WorldClock
     */
    private createWorldClock(playSpeed:number):dragonBones.WorldClock {
        for (let i = 0; i < this.clockLen; i++) {
            if (this.clocks[i].timeScale == playSpeed) {
                return this.clocks[i]
            }
        }
        let clock:dragonBones.WorldClock = new dragonBones.WorldClock();
        clock.timeScale = playSpeed;
        this.clocks.push(clock);
        this.clockLen = this.clocks.length;
        return clock;
    }

    /**
     * 注册并启动一个定时器
     */
    public startTimer() {
        TimerManager.getInstance().doFrame(1, 0, this.onStartTick, this);
        // egret.startTick(this.onStartTick, this);
    }

    /**
     * 计时器回调
     */
    private onStartTick(timeStamp:number) {
        for (let i = 0; i < this.clocks.length; i++)
        {
            let clock:dragonBones.WorldClock = this.clocks[i];
            clock.advanceTime(0.001);
        }
        return false
    }

    /**
     * 停止计时器
     */
    public stopTimer() {
        // TimerManager.getInstance().removeAll();
        egret.stopTick(this.onStartTick, this);
    }

    /**
     * 清除计数器
     */
    public removeTimer() {
        TimerManager.getInstance().removeAll();
    }

    public static _instance:DragonBonesFactory;
    private factory:dragonBones.EgretFactory;
    private clocks:Array<dragonBones.WorldClock>;
    private clockLen:number;
}