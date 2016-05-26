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

    /**
     * 所有文档节点。
     */
    docs: any[];

}

/**
 * 表示一个文档解析器。
 */
export class DocParser {

    /**
     * 存储当前正在解析的程序。
     */
    private _program: ts.Program;

    /**
     * 存储当前使用的语义分析器。
     */
    private _checker: ts.TypeChecker;

    /**
     * 存储文档解析的结果。
     */
    private _result: ParseDocResult[];

    /**
     * 解析指定的程序中所有文档。
     * @param program 要解析的程序。
     */
    parse(program: ts.Program) {
        this._program = program;
        this._checker = program.getTypeChecker();
        this._result = [];

        for (let sourceFile of program.getSourceFiles()) {
            if (sourceFile.fileName.indexOf('.d.ts') < 0)
                this._result.push(this.parseDoc(sourceFile));
        }

        return this._result;
    }

    parseDoc(sourceFile: ts.SourceFile) {
        result = {
            fileName: sourceFile.fileName,
            docs: []
        };
        visitNode(sourceFile);
        return result;
    }

    /**
     * 判断指定节点是否已导出。
     * @param node 要判断的节点。
     */
    private isNodeExported(node: ts.Node) {
        return (node.flags & ts.NodeFlags.Export) !== 0 || (node.parent && node.parent.kind === ts.SyntaxKind.SourceFile);
    }

    private visitNode(node: ts.Node) {
        if (!isNodeExported(node)) {
            return;
        }

        switch (node.kind) {
            case ts.SyntaxKind.ClassDeclaration:
                visitClass(node as ts.ClassDeclaration);
                break;
            case ts.SyntaxKind.ModuleDeclaration:
                break;
            case ts.SyntaxKind.SourceFile:
                ts.forEachChild(node, visitNode);
                break;
        }

    }

    private visitClass(node: ts.ClassDeclaration) {
        getDocAt(node.name);
    }

    /**
     * 获取指定节点的文档。
     * @param node 要获取的文档。
     */
    private getDocAt(node: ts.Node) {
        let symbol = checker.getSymbolAtLocation(node);

        result.docs.push({
            name: symbol.getName(),
            documentation: ts.displayPartsToString(symbol.getDocumentationComment()),
            type: checker.typeToString(checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration))
        });

    }

}

/**
 * 解析文档。
 * @param fileNames 要解析的文件名。
 * @param options 要解析的配置。
 */
