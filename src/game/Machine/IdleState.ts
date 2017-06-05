/**
 * 待机状态
 */
class IdleState extends BaseStateMachine implements BaseState {
    public target:any;

    public constructor() {
        super();
    }

    /**进入待机状态 */
    public Enter(target:any) {

    }

    /**执行待机状态 */
    public Execute(target:any) {

    }

    /**结束待机状态 */
    public End(target:any) {
        
    }

    /**更新 */
    public update() {

    }
}