/**
* @fileOverview 文档解析核心。
*/
var ts = require("typescript");
/**
 * 解析文档。
 * @param fileNames 要解析的文件名。
 * @param options 要解析的配置。
 */
function parseDocs(fileNames, options) {
    var program = ts.createProgram(fileNames, options);
    var checker = program.getTypeChecker();
    var result = [];
    for (var _i = 0, _a = program.getSourceFiles(); _i < _a.length; _i++) {
        var sourceFile = _a[_i];
        result.push(parseDoc(sourceFile));
    }
    return result;
}
exports.parseDocs = parseDocs;
function parseDoc(sourceFile) {
    debugger;
    return {
        fileName: sourceFile.fileName,
    };
}
//# sourceMappingURL=parser.js.map