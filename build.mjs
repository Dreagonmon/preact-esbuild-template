import { build, serve } from "esbuild";
// @ts-ignore
import { argv } from "node:process";

const BUILD_DIR = "dist";

const getBuildOptions = () => {
    
    /** @type { import("esbuild").BuildOptions } */
    const BUILD_OPTIONS = {
        platform: "browser",
        entryPoints: [
            "src/index.html",
            "src/index.js",
            "src/sw.js",
        ],
        jsxFactory: "h",
        jsxFragment: "Fragment",
        bundle: true,
        sourcemap: "linked",
        format: "esm",
        target: "esnext",
        outdir: BUILD_DIR,
        loader: {
            ".html": "copy",
            ".png": "file",
            ".jpg": "file",
            ".gif": "dataurl",
        },
    };
    return BUILD_OPTIONS;
};

const getServeOptions = () => {
    /** @type { import("esbuild").ServeOptions } */
    const SERVE_OPTIONS = {
        port: 8001,
        servedir: BUILD_DIR,
    };
    return SERVE_OPTIONS;
};

// main
(async () => {
    const cmd = argv[2]
    if (cmd == "build") {
        await build(getBuildOptions());
    } else if (cmd == "serve") {
        await serve(getServeOptions(), getBuildOptions());
    }
})()
