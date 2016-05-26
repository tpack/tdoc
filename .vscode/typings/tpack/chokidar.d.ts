
declare module "chokidar" {

    import FS = require("fs");
    import {EventEmitter} from "events";

    interface WatchOptions {
        persistent?: boolean;
        ignored?: any;
        ignoreInitial?: boolean;
        followSymlinks?: boolean;
        cwd?: string;
        usePolling?: boolean;
        useFsEvents?: boolean;
        alwaysStat?: boolean;
        depth?: number;
        interval?: number;
        binaryInterval?: number;
        ignorePermissionErrors?: boolean;
        atomic?: boolean;
        awaitWriteFinish?: any;
    }

    class FSWatcher extends EventEmitter {
        protected _isIgnored(path: string, stat?: FS.Stats): boolean;
        constructor(options: WatchOptions);
        closed: boolean;
        add(fileDirOrGlob: string): this;
        add(fileDirOrGlob: string[]): this;
        unwatch(fileDirOrGlob: string): this;
        unwatch(fileDirOrGlob: string[]): this;
        close(): this;
        getWatched(): { [key: string]: string[] };
    }

    function watch(fileDirOrGlob: string, options?: WatchOptions): FSWatcher;
    function watch(filesDirsOrGlobs: Array<string>, options?: WatchOptions): FSWatcher;
}
