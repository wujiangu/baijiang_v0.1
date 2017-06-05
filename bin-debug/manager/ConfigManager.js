/**
 * 加载配置文件管理
 */
var ConfigManager;
(function (ConfigManager) {
    /**
     * 加载配置文件
     */
    function loadConfig() {
        ConfigManager.tcStage = RES.getRes("TcStage_json");
        ConfigManager.heroConfig = RES.getRes("heroConfig_json");
        ConfigManager.enermyConfig = RES.getRes("enermyConfig_json");
    }
    ConfigManager.loadConfig = loadConfig;
})(ConfigManager || (ConfigManager = {}));
//# sourceMappingURL=ConfigManager.js.map