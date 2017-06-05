/**
 * 技能基类
 */
class BuffBase {
    public constructor () {
        this.buffData = new BuffData();
    }

    public buffData:BuffData;

    /**初始化 */
    public buffInit() {
        this.buffData.id = 1;
        this.buffData.name = "";
        this.buffData.lv = 1;
        this.buffData.className = "";
        this.buffData.description = "";
        this.buffData.duration = 0;
        this.buffData.frequency = 0;
        this.buffData.superpositionType = SuperpositionType.SuperpositionType_None;
        this.buffData.buffType = BuffType.BuffType_DeBuff;
        this.buffData.disperseType = DisperseType.DisperseType_NoClear;
        this.buffData.postionType = PostionType.PostionType_Body;
        this.buffData.controlType = ControlType.NO;
    }

    /**开始 */
    public buffStart(target:any) {

    }

    /**结束 */
    public buffEnd() {
        
    }

    /**刷新数据 */
    public update(callBack:Function = null) {

    }

    /**增加特效 */
    public AddEffect(target:any) {

    }

    /**显示特效 */
    public ShowEffect() {

    }

    /**隐藏特效 */
    public HideEffect() {

    }

    /*****************特效相关*******************/
    public effectName:string;
}