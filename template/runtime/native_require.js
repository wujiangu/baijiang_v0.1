
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/res/res.js",
	"libs/modules/eui/eui.js",
	"libs/modules/experimental/experimental.js",
	"libs/modules/tween/tween.js",
	"libs/modules/socket/socket.js",
	"libs/modules/dragonBones/dragonBones.js",
	"libs/modules/md5/md5.js",
	"libs/modules/particle/particle.js",
	"libs/modules/nest/nest.js",
	"polyfill/promise.js",
	"bin-debug/game/Object/BaseGameObject.js",
	"bin-debug/game/Object/Enermy.js",
	"bin-debug/game/Skill/SkillBase.js",
	"bin-debug/Base.js",
	"bin-debug/game/Buff/BuffBase.js",
	"bin-debug/game/Machine/BaseStateMachine.js",
	"bin-debug/localStorage/LocalStorage.js",
	"bin-debug/component/TalentIR.js",
	"bin-debug/enterGameScene/EnterGameScene.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/game/Buff/BuffData.js",
	"bin-debug/game/Buff/buffs/ContinuousInjury.js",
	"bin-debug/game/Buff/buffs/Dodge.js",
	"bin-debug/game/Buff/buffs/Shield.js",
	"bin-debug/game/Buff/buffs/SwordDance.js",
	"bin-debug/game/Buff/buffs/UnableMove.js",
	"bin-debug/game/DragonBones/DragonBonesArmature.js",
	"bin-debug/game/DragonBones/DragonBonesArmatureContainer.js",
	"bin-debug/game/DragonBones/DragonBonesFactory.js",
	"bin-debug/game/GameData.js",
	"bin-debug/game/Machine/BaseState.js",
	"bin-debug/Common.js",
	"bin-debug/game/Machine/IdleState.js",
	"bin-debug/game/Machine/StateType.js",
	"bin-debug/component/BattleSceneCom.js",
	"bin-debug/game/Object/Boss.js",
	"bin-debug/component/CycleSlide.js",
	"bin-debug/game/Object/Hero.js",
	"bin-debug/game/Object/Monster.js",
	"bin-debug/component/EquipStarIR.js",
	"bin-debug/game/Skill/SkillData.js",
	"bin-debug/game/Skill/skills/Bristle.js",
	"bin-debug/game/Skill/skills/Imprisoned.js",
	"bin-debug/game/Skill/skills/TaijiPalm.js",
	"bin-debug/heroInfo/heroInfoPanel.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/component/ScrollView.js",
	"bin-debug/Main.js",
	"bin-debug/mainScene/BattleScene.js",
	"bin-debug/mainScene/equipDialog.js",
	"bin-debug/mainScene/equipInfoDialog.js",
	"bin-debug/mainScene/MainScene.js",
	"bin-debug/mainScene/ReadyDialog.js",
	"bin-debug/mainScene/ShopDialog.js",
	"bin-debug/mainScene/TalentDialog.js",
	"bin-debug/manager/ConfigManager.js",
	"bin-debug/manager/GameEvent.js",
	"bin-debug/manager/GameLayerManager.js",
	"bin-debug/manager/ObjectPool.js",
	"bin-debug/manager/PopupManager.js",
	"bin-debug/manager/SceneManager.js",
	"bin-debug/manager/TimerManager.js",
	"bin-debug/manager/UserData.js",
	"bin-debug/net/NetConnect.js",
	"bin-debug/net/NetUI.js",
	"bin-debug/popup/BattleFailPop.js",
	"bin-debug/popup/BattlePausePop.js",
	"bin-debug/popup/ChangeEquipPop.js",
	"bin-debug/popup/EquipUpgradePop.js",
	"bin-debug/popup/resetEquipAttrPop.js",
	"bin-debug/popup/UnlockStarLvPop.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/utils/Animations.js",
	"bin-debug/utils/MathUtils.js",
	"bin-debug/utils/NativeApi.js",
	"bin-debug/utils/sensitiveWords/Dictionary.js",
	"bin-debug/utils/sensitiveWords/SensitiveWordFilter.js",
	"bin-debug/utils/sensitiveWords/TreeNode.js",
	"bin-debug/utils/TipsUtils.js",
	"bin-debug/utils/Utils.js",
	"bin-debug/utils/utilsClass/LEvent.js",
	"bin-debug/utils/utilsClass/LListener.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 60,
		scaleMode: "showAll",
		contentWidth: 1136,
		contentHeight: 640,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:20,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};