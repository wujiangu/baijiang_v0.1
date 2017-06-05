/**
 * 叠加规则
 * 1:不叠加，2:覆盖，3:叠加
 */
enum SuperpositionType
{
    SuperpositionType_None,
    SuperpositionType_Overlay,
    SuperpositionType_Add,
}

/**
 * buff类型
 * 1:增益，2:减益
 */
enum BuffType
{
    BuffType_Buff,
    BuffType_DeBuff
}

/**
 * 清除类型
 * 1:不可驱散，2:可以驱散
 */
enum DisperseType
{
    DisperseType_NoClear,
    DisperseType_Clear
}

/**
 * 作用点
 * 1:头部，2:身体，3:脚部，4:效果
 */
enum PostionType
{
    PostionType_Head,
    PostionType_Body,
    PostionType_Foot,
    PostionType_Effect,
}

/**
 * 是否为控制类型
 */
enum ControlType
{
    YES,
    NO,
}

class BuffData {
    /**Buffid */
    public id:number;
    /**Buff名字 */
    public name:string;
    /**Buff等级 */
    public lv:number;
    /**对应类名 */
    public className:string;
    /**Buff描述 */
    public description:string;
    /**可持续时间 */
    public duration:number;
    /**冷却时间 */
    public cd:number;
    /**可持续次数 */
    public frequency:number;
    /**叠加规则 */
    public superpositionType:SuperpositionType;
    /**Buff类型 */
    public buffType:BuffType;
    /**清除类型 */
    public disperseType:DisperseType;
    /**作用点 */
    public postionType:PostionType;
    /**是否为控制 */
    public controlType:ControlType;   
}