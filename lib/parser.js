/**
 * @fileOverview 文档解析核心。
 */
var ts = require("typescript");
/**
 * 表示一个文档解析器。
 */
var DocParser = (function () {
    function DocParser() {
    }
    /**
     * 解析指定的程序中所有文档。
     * @param program 要解析的程序。
     */
    DocParser.prototype.parse = function (program) {
        this._program = program;
        this._checker = program.getTypeChecker();
        this._result = [];
        for (var _i = 0, _a = program.getSourceFiles(); _i < _a.length; _i++) {
            var sourceFile = _a[_i];
            if (sourceFile.fileName.indexOf('.d.ts') < 0)
                this._result.push(this.parseDoc(sourceFile));
        }
        return this._result;
    };
    DocParser.prototype.parseDoc = function (sourceFile) {
        result = {
            fileName: sourceFile.fileName,
            docs: []
        };
        visitNode(sourceFile);
        return result;
    };
    /**
     * 判断指定节点是否已导出。
     * @param node 要判断的节点。
     */
    DocParser.prototype.isNodeExported = function (node) {
        return (node.flags & ts.NodeFlags.Export) !== 0 || (node.parent && node.parent.kind === ts.SyntaxKind.SourceFile);
    };
    DocParser.prototype.visitNode = function (node) {
        if (!isNodeExported(node)) {
            return;
        }
        switch (node.kind) {
            case ts.SyntaxKind.ClassDeclaration:
                visitClass(node);
                break;
            case ts.SyntaxKind.ModuleDeclaration:
                break;
            case ts.SyntaxKind.SourceFile:
                ts.forEachChild(node, visitNode);
                break;
        }
    };
    DocParser.prototype.visitClass = function (node) {
        getDocAt(node.name);
    };
    /**
     * 获取指定节点的文档。
     * @param node 要获取的文档。
     */
    DocParser.prototype.getDocAt = function (node) {
        var symbol = checker.getSymbolAtLocation(node);
        result.docs.push({
            name: symbol.getName(),
            documentation: ts.displayPartsToString(symbol.getDocumentationComment()),
            type: checker.typeToString(checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration))
        });
    };
    return DocParser;
}());
exports.DocParser = DocParser;
/**
 * 解析文档。
 * @param fileNames 要解析的文件名。
 * @param options 要解析的配置。
 */
//# sourceMappingURL=parser.js.map