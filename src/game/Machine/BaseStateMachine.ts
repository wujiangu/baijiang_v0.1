/**
 * 状态机基类
 */
class BaseStateMachine {
    public constructor () {

    }

    /**设置当前状态 */
    public set curState(state:any) {
        this.m_pCurState = state;
    }

    /**更新 */
    public update():void {

    }

    /**改变状态 */
    public changeState():void {

    }

    /**获取当前状态 */
    public get curState():any {
        return this.m_pCurState;
    }

    /**获取上一个状态 */
    public get lastState():any {
        return this.m_pLastState;
    }

    /**当前状态 */
    private m_pCurState:any;
    /**上一个状态 */
    private m_pLastState:any;
    /**当前状态类型 */
    private m_pCurStateType = StateType.NONE;
    /**上一个状态类型 */
    private m_pLastStateType = StateType.NONE;
}