/**
 * @fileOverview 文档解析核心。
 */

import * as ts from "typescript";

/**
 * 表示解析文档的配置。
 */
export interface DocOptions extends ts.CompilerOptions {

    /**
     * 是否忽略编译器错误。
     * @default true
     */
    ignoreComplitionErrors?: boolean;

}

/**
 * 表示解析文档的结果。
 */
export interface ParseDocResult {

    /**
     * 当前文档的文件名。
     */
    fileName: string;

}

/**
 * 解析文档。
 * @param fileNames 要解析的文件名。
 * @param options 要解析的配置。
 */
export function parseDocs(fileNames: string[], options: DocOptions) {
    let program = ts.createProgram(fileNames, options);

    let checker = program.getTypeChecker();

    let result = [];

    for (let sourceFile of program.getSourceFiles()) {
        result.push(parseDoc(sourceFile));
    }

    return result;
}

function parseDoc(sourceFile: ts.SourceFile) {
    return {

        fileName: sourceFile.fileName,

    };

}
