class TreeNode {
    private data: Dictionary;
    private _isLeaf: boolean;
 
/**
 *是否是敏感词的词尾字，敏感词树的叶子节点必然是词尾字，父节点不一定是
 */
    public isEnd: boolean = false;
    public parent: TreeNode;
    public value: string;
 
    public constructor() {
        this.data = new Dictionary();
    } //end of Function
 
    public getChild(name: string): TreeNode {
        return this.data.GetName(name);
    } //end of Function
 
    public addChild(char: string): TreeNode {
        var node: TreeNode = new TreeNode();
        this.data.SetName(char, node);
        node.value = char;
        node.parent = this;
        return node;
    } //end of Function
 
    public getFullWord(): string {
        var rt: string = this.value;
        var node: TreeNode = this.parent;
        while (node) {
            rt = node.value + rt;
            node = node.parent;
        } //end while
        return rt;
    } //end of Function
 
/**
 *是否是叶子节点
 */
    public get isLeaf(): boolean {
        var index: number = 0;
        for (var key in this.data.dic) {
            index++;
        }
        this._isLeaf = index == 0
        return this._isLeaf;
    }
}