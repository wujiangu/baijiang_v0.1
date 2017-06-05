/**
 * 游戏数据
 */
class GameData {
    /**杀敌总数 */
    public static killCount:number = 0;
    /**英雄 */
    public static heros:Array<Hero>;
    /**血量 */
    public static hp:number;
    /**当前关卡 */
    public static curStage:number = 1;
    /**敌人 */
    public static monsters:Array<Monster>;
    /**Boss */
    public static boss:Array<Boss>;
}