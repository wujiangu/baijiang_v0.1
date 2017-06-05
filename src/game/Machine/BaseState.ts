/**
 * 状态基类
 */
interface BaseState {
    target:any;
    
    /**进入状态 */
    Enter(target:any);

    /**执行状态 */
    Execute(target:any);

    /**结束状态 */
    End(target:any);
}