var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * DragonBones工厂类
 */
var DragonBonesFactory = (function () {
    function DragonBonesFactory() {
        this.factory = new dragonBones.EgretFactory();
        this.clocks = new Array();
        this.clockLen = 0;
    }
    DragonBonesFactory.getInstance = function () {
        if (!this._instance) {
            this._instance = new DragonBonesFactory();
        }
        return this._instance;
    };
    /**
     * 添加动画所需要的资源
     *
     */
    DragonBonesFactory.prototype.addTextureAtlas = function (texture, textureData) {
        return this.factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
    };
    /**
     * 初始化一个动画文件
     */
    DragonBonesFactory.prototype.initDragonBonesArmatureFile = function (skeletonData, textureData, texture) {
        this.factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
        this.addTextureAtlas(texture, textureData);
    };
    /**
     * 创建一个动画
     */
    DragonBonesFactory.prototype.makeArmature = function (name, dragonBonesName, playSpeed) {
        if (playSpeed === void 0) { playSpeed = -1; }
        var armature = this.factory.buildArmature(name, dragonBonesName);
        if (!armature) {
            Common.log("不存在");
            return null;
        }
        var clock = this.createWorldClock(playSpeed);
        var result = new DragonBonesArmature(armature, clock);
        return result;
    };
    /**
     * 创建WorldClock
     */
    DragonBonesFactory.prototype.createWorldClock = function (playSpeed) {
        for (var i = 0; i < this.clockLen; i++) {
            if (this.clocks[i].timeScale == playSpeed) {
                return this.clocks[i];
            }
        }
        var clock = new dragonBones.WorldClock();
        clock.timeScale = playSpeed;
        this.clocks.push(clock);
        this.clockLen = this.clocks.length;
        return clock;
    };
    /**
     * 注册并启动一个定时器
     */
    DragonBonesFactory.prototype.startTimer = function () {
        TimerManager.getInstance().doFrame(1, 0, this.onStartTick, this);
        // egret.startTick(this.onStartTick, this);
    };
    /**
     * 计时器回调
     */
    DragonBonesFactory.prototype.onStartTick = function (timeStamp) {
        for (var i = 0; i < this.clocks.length; i++) {
            var clock = this.clocks[i];
            clock.advanceTime(0.001);
        }
        return false;
    };
    /**
     * 停止计时器
     */
    DragonBonesFactory.prototype.stopTimer = function () {
        // TimerManager.getInstance().removeAll();
        egret.stopTick(this.onStartTick, this);
    };
    /**
     * 清除计数器
     */
    DragonBonesFactory.prototype.removeTimer = function () {
        TimerManager.getInstance().removeAll();
    };
    return DragonBonesFactory;
}());
__reflect(DragonBonesFactory.prototype, "DragonBonesFactory");
//# sourceMappingURL=DragonBonesFactory.js.map