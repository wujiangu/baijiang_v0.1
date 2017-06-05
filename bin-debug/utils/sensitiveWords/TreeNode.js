var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TreeNode = (function () {
    function TreeNode() {
        /**
         *是否是敏感词的词尾字，敏感词树的叶子节点必然是词尾字，父节点不一定是
         */
        this.isEnd = false;
        this.data = new Dictionary();
    } //end of Function
    TreeNode.prototype.getChild = function (name) {
        return this.data.GetName(name);
    }; //end of Function
    TreeNode.prototype.addChild = function (char) {
        var node = new TreeNode();
        this.data.SetName(char, node);
        node.value = char;
        node.parent = this;
        return node;
    }; //end of Function
    TreeNode.prototype.getFullWord = function () {
        var rt = this.value;
        var node = this.parent;
        while (node) {
            rt = node.value + rt;
            node = node.parent;
        } //end while
        return rt;
    }; //end of Function
    Object.defineProperty(TreeNode.prototype, "isLeaf", {
        /**
         *是否是叶子节点
         */
        get: function () {
            var index = 0;
            for (var key in this.data.dic) {
                index++;
            }
            this._isLeaf = index == 0;
            return this._isLeaf;
        },
        enumerable: true,
        configurable: true
    });
    return TreeNode;
}());
__reflect(TreeNode.prototype, "TreeNode");
//# sourceMappingURL=TreeNode.js.map