class Dictionary {
    public dic: Array<TreeNode>;
    public constructor() {
        if (!this.dic) {
            this.dic = new Array();
        }
    }
    public GetName(name:string):TreeNode {
        return this.dic[name];
    }
    public SetName(name: string, src: TreeNode) {
        this.dic[name] = src;
    }
}