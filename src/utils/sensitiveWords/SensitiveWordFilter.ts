class SensitiveWordFilter {
    public constructor() {
    }
    public static GetInstance(): SensitiveWordFilter {
        if (!this.instance) {
            this.instance = new SensitiveWordFilter();
        }
        return this.instance;
    }
    private static instance:SensitiveWordFilter;
    public treeRoot: TreeNode;
    public regSensitiveWords(words: Array<string>): void {
        //这是一个预处理步骤，生成敏感词索引树，功耗大于查找时使用的方法，但只在程序开始时调用一次。
        var self = this;
        self.treeRoot = new TreeNode();
        self.treeRoot.value = "";
        var words_len: number = words.length;
        for (var i: number = 0; i < words_len; i++) {
            var word: string = words[i];
            var len: number = word.length;
            var currentBranch: TreeNode = self.treeRoot;
            for (var c: number = 0; c < len; c++) {
                var char: string = word.charAt(c);
                var tmp: TreeNode = currentBranch.getChild(char);
                if (tmp) {
                    currentBranch = tmp;
                }
                else {
                    currentBranch = currentBranch.addChild(char);
                } //end if
            } //end for
            currentBranch.isEnd = true;
        } //end for
    } //end of Function
    /**
     *替换字符串中的敏感词返回 
     * @param dirtyWords
     * @return 
     * 
     */
    private getReplaceWord(len: number): string {
        var replaceWord: string = "";
        for (var i: number = 0; i < len; i++) {
            replaceWord += "*";
        }
        return replaceWord;
    }
 
    public replaceSensitiveWord(dirtyWords: string): string {
        var self = this;
        var char: string;
        var curTree: TreeNode = self.treeRoot;
        var childTree: TreeNode;
        var curEndWordTree: TreeNode;
        var dirtyWord: string;
        var c: number = 0;//循环索引
        var endIndex: number = 0;//词尾索引
        var headIndex: number = -1;//敏感词词首索引
        while (c < dirtyWords.length) {
            char = dirtyWords.charAt(c);
            childTree = curTree.getChild(char);
            if (childTree)//在树中遍历
            {
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
            else//跳出树的遍历
            {
                if (curEndWordTree)//如果之前有遍历到词尾，则替换该词尾所在的敏感词，然后设置循环索引为该词尾索引
                {
                    dirtyWord = curEndWordTree.getFullWord();
                    dirtyWords = dirtyWords.replace(dirtyWord, self.getReplaceWord(dirtyWord.length));
                    c = endIndex;
                }
                else if (curTree != self.treeRoot)//如果之前有遍历到敏感词非词尾，匹配部分未完全匹配，则设置循环索引为敏感词词首索引
                {
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
    }
                 
    /**
     *判断是否包含敏感词 
     * @param dirtyWords
     * @return 
     * 
     */
    public containsBadWords(dirtyWords: string): boolean {
        var self = this;
        var char: string;
        var curTree: TreeNode = self.treeRoot;
        var childTree: TreeNode;
        var curEndWordTree: TreeNode;
        var dirtyWord: string;
 
        var c: number = 0;//循环索引
        var endIndex: number = 0;//词尾索引
        var headIndex: number = -1;//敏感词词首索引
        while (c < dirtyWords.length) {
            char = dirtyWords.charAt(c);
            childTree = curTree.getChild(char);
            if (childTree)//在树中遍历
            {
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
            else//跳出树的遍历
            {
                if (curEndWordTree)//如果之前有遍历到词尾，则替换该词尾所在的敏感词，然后设置循环索引为该词尾索引
                {
                    dirtyWord = curEndWordTree.getFullWord();
                    dirtyWords = dirtyWords.replace(dirtyWord, self.getReplaceWord(dirtyWord.length));
                    c = endIndex;
                    return true;
                }
                else if (curTree != self.treeRoot)//如果之前有遍历到敏感词非词尾，匹配部分未完全匹配，则设置循环索引为敏感词词首索引
                {
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
    }
}