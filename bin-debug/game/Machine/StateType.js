/**
 * 状态类型
 */
var StateType;
(function (StateType) {
    /*****************通用*******************/
    /**无状态 */
    StateType[StateType["NONE"] = 0] = "NONE";
    /**待机状态 */
    StateType[StateType["IDLE"] = 1] = "IDLE";
    /**奔跑 */
    StateType[StateType["RUN"] = 2] = "RUN";
    /**攻击 */
    StateType[StateType["ATTACK"] = 3] = "ATTACK";
    /**受伤 */
    StateType[StateType["HURT"] = 4] = "HURT";
    /**死亡 */
    StateType[StateType["DEAD"] = 5] = "DEAD";
    /****************************************/
    /******************我方*******************/
    /**无敌 */
    StateType[StateType["INVINCIBLE"] = 6] = "INVINCIBLE";
    /**胜利 */
    StateType[StateType["WIN"] = 7] = "WIN";
    /**失败 */
    StateType[StateType["FAILD"] = 8] = "FAILD";
    /****************************************/
    /*******************敌方********************/
    /**巡逻 */
    StateType[StateType["PATROL"] = 9] = "PATROL";
})(StateType || (StateType = {}));
//# sourceMappingURL=StateType.js.map