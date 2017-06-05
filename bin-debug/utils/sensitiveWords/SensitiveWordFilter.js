var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SensitiveWordFilter = (function () {
    function SensitiveWordFilter() {
    }
    SensitiveWordFilter.GetInstance = function () {
        if (!this.instance) {
            this.instance = new SensitiveWordFilter();
        }
        return this.instance;
    };
    SensitiveWordFilter.prototype.regSensitiveWords = function (words) {
        //这是一个预处理步骤，生成敏感词索引树，功耗大于查找时使用的方法，但只在程序开始时调用一次。
        var self = this;
        self.treeRoot = new TreeNode();
        self.treeRoot.value = "";
        var words_len = words.length;
        for (var i = 0; i < words_len; i++) {
            var word = words[i];
            var len = word.length;
            var currentBranch = self.treeRoot;
            for (var c = 0; c < len; c++) {
                var char = word.charAt(c);
                var tmp = currentBranch.getChild(char);
                if (tmp) {
                    currentBranch = tmp;
                }
                else {
                    currentBranch = currentBranch.addChild(char);
                } //end if
            } //end for
            currentBranch.isEnd = true;
        } //end for
    }; //end of Function
    /**
     *替换字符串中的敏感词返回
     * @param dirtyWords
     * @return
     *
     */
    SensitiveWordFilter.prototype.getReplaceWord = function (len) {
        var replaceWord = "";
        for (var i = 0; i < len; i++) {
            replaceWord += "*";
        }
        return replaceWord;
    };
    SensitiveWordFilter.prototype.replaceSensitiveWord = function (dirtyWords) {
        var self = this;
        var char;
        var curTree = self.treeRoot;
        var childTree;
        var curEndWordTree;
        var dirtyWord;
        var c = 0; //循环索引
        var endIndex = 0; //词尾索引
        var headIndex = -1; //敏感词词首索引
        while (c < dirtyWords.length) {
            char = dirtyWords.charAt(c);
            childTree = curTree.getChild(char);
            if (childTree) {
                if (childTree.isEnd) {
                    curEndWordTree = childTree;
                    endIndex = c;
                }
                if (headIndex == -1) {
                    headIndex = c;
                }
                curTree = childTree;
                c++;
            }
            else {
                if (curEndWordTree) {
                    dirtyWord = curEndWordTree.getFullWord();
                    dirtyWords = dirtyWords.replace(dirtyWord, self.getReplaceWord(dirtyWord.length));
                    c = endIndex;
                }
                else if (curTree != self.treeRoot) {
                    c = headIndex;
                    headIndex = -1;
                }
                curTree = self.treeRoot;
                curEndWordTree = null;
                c++;
            }
        }
        //循环结束时，如果最后一个字符满足敏感词词尾条件，此时满足条件，但未执行替换，在这里补加
        if (curEndWordTree) {
            dirtyWord = curEndWordTree.getFullWord();
            dirtyWords = dirtyWords.replace(dirtyWord, self.getReplaceWord(dirtyWord.length));
        }
        return dirtyWords;
    };
    /**
     *判断是否包含敏感词
     * @param dirtyWords
     * @return
     *
     */
    SensitiveWordFilter.prototype.containsBadWords = function (dirtyWords) {
        var self = this;
        var char;
        var curTree = self.treeRoot;
        var childTree;
        var curEndWordTree;
        var dirtyWord;
        var c = 0; //循环索引
        var endIndex = 0; //词尾索引
        var headIndex = -1; //敏感词词首索引
        while (c < dirtyWords.length) {
            char = dirtyWords.charAt(c);
            childTree = curTree.getChild(char);
            if (childTree) {
                if (childTree.isEnd) {
                    curEndWordTree = childTree;
                    endIndex = c;
                }
                if (headIndex == -1) {
                    headIndex = c;
                }
                curTree = childTree;
                c++;
            }
            else {
                if (curEndWordTree) {
                    dirtyWord = curEndWordTree.getFullWord();
                    dirtyWords = dirtyWords.replace(dirtyWord, self.getReplaceWord(dirtyWord.length));
                    c = endIndex;
                    return true;
                }
                else if (curTree != self.treeRoot) {
                    c = headIndex;
                    headIndex = -1;
                }
                curTree = self.treeRoot;
                curEndWordTree = null;
                c++;
            }
        }
        //循环结束时，如果最后一个字符满足敏感词词尾条件，此时满足条件，但未执行替换，在这里补加
        if (curEndWordTree) {
            dirtyWord = curEndWordTree.getFullWord();
            dirtyWords = dirtyWords.replace(dirtyWord, self.getReplaceWord(dirtyWord.length));
            return true;
        }
        return false;
    };
    return SensitiveWordFilter;
}());
__reflect(SensitiveWordFilter.prototype, "SensitiveWordFilter");
//# sourceMappingURL=SensitiveWordFilter.js.map