interface ObjectConstructor {
    assign<T>(dest: T, src: any): T;
}
interface String {
    endsWith(str: string): boolean;
    startsWith(str: string): boolean;
    repeat(count: number): string;
}
declare module "tutils/lang/polyfill.js" {

}

declare module "tutils/lang/events.js" {
    export class EventEmitter {
        on(event: string, listener: Function): this;
        off(event?: string, listener?: Function): this;
        emit(event: string, ...args: any[]): boolean;
        trigger(event: string, ...args: any[]): boolean;
    }
}

declare module "tutils/node/io.js" {
    function cleanDir(dir: string, ignoreError?: boolean): string;
    function walkDir(path: string, walker: (path: string, isDir: boolean) => boolean, basePath?: string): string;
    function ensureDir(path: string): void;
    function copyFile(srcFile: string, destFile: string, overwrite?: boolean);
    function existsFile(path: string): boolean;
    function existsDir(path: string): boolean;
    function deleteFile(path: string): boolean;
    function readFile(path: string, encoding?: string): string;
    function readLines(path: string, encoding?: string): string[];
    function writeFile(path: string, content: string | Buffer, encoding?: string);
    function searchDirs(path: string): string;
    function deleteDirIfEmpty(path: string);
}

/**
 * @fileOverview 模式。
 */
declare module "tutils/text/pattern.js" {

    /**
     * 表示一个模式，如通配符、正则表达式、函数或以上模式组成的数组。
     * @remark
     * 模式可以用来匹配路径。模式具体可以是：
     * - **通配符**：语法同 [`.gitignore`](https://git-scm.com/docs/gitignore)。可以使用以下通配符：
     *    - `*`：可以匹配任意个非 `/` 的字符。以 `*` 开头表示匹配任意路径。
     *    - `**`：可以匹配任意个字符。
     *    - `?`: 匹配一个非 `/` 的字符。
     *    - `/`: 匹配路径分隔符。以 `/` 开头表示必须匹配根目录。以 `/` 结尾表示必须匹配目录。
     *    - `\`: 表示转义字符。
     *    - `[`, `]`: 匹配括号中任一字符。
     *    - 前缀 `#`: 表示注释。
     *    - 前缀 `!`: 表示对上一个匹配项设置例外。如果匹配了父文件夹，则无法为子文件设置例外。
     * - **正则表达式**：如 `/^.*\.jpg/i`。
     * - **函数**：函数接收一个参数 *path* 表示要测试的路径，如果匹配函数应返回 true，否则返回 false。函数原型为：`(path: string) => boolean`，如 `function(path) { return path.startsWith("abc/"); }`。
     * - **数组**：其它模式的组合，匹配数组任一模式即表示匹配。
     */
    export type Pattern = string | RegExp | ((name: string) => boolean) | Array<string | RegExp | ((name: string) =>
        boolean)>;

    /**
     * 表示一个已编译的匹配函数。
     */
    export interface CompiledPattern {

        /**
         * 测试指定的路径是否匹配。
         * @param path 要测试的路径。路径应使用 `/` 作为分隔符，且不能以 `/` 开头。
         * @returns 如果匹配则返回 true，否则返回 false。
         */
        (path: string): boolean;

        /**
         * 测试指定的路径是否匹配，并替换为新路径。
         * @param path 要测试的路径。路径应使用 `/` 作为分隔符，且不能以 `/` 开头。
         * @param target 要替换的目标路径。其中 '$0', '$1'... 会被替换为捕获的内容。
         * @returns 如果匹配则返回 *target*，其中 '$0', '$1'... 会被替换为捕获的内容，否则返回 null。
         */
        (path: string, target: string): string;

        /**
         * 当前匹配器的内部参数列表。
         */
        _args?: any[];

    }

    /**
     * 编译指定的模式列表并返回一个匹配函数。
     * @param patterns 要编译的模式列表。
     * @returns 返回已编译的匹配函数。
     * @example compilePatterns("*.ts")("a.ts") // 返回 true
     * @example compilePatterns("*.ts")("a.ts", "$1.js") // 返回 "a.js"
     */
    export function compilePatterns(patterns: Pattern[]): CompiledPattern;

}