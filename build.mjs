import { build, stop } from 'https://deno.land/x/esbuild@v0.17.18/wasm.js';
import { denoPlugins } from "https://deno.land/x/esbuild_deno_loader@0.7.0/mod.ts";

const BUILD_DIR_PATH_STRING = "dist";
Deno.mkdirSync(BUILD_DIR_PATH_STRING, { recursive: true })
const BUILD_DIR = Deno.realPathSync(BUILD_DIR_PATH_STRING);

const getBuildOptions = () => {

    /** @type { import("https://deno.land/x/esbuild@v0.17.18/mod.js").BuildOptions } */
    const BUILD_OPTIONS = {
        platform: "browser",
        plugins: [ ...denoPlugins({
            loader: "native",
            configPath: Deno.realPathSync("deno.json"),
        }) ],
        entryPoints: [
            // "src/index.html",
            Deno.realPathSync("src/index.js"),
            Deno.realPathSync("src/sw.js"),
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

// main
(async () => {
    const cmd = Deno.args.at(0);
    if (cmd == "build") {
        await build(getBuildOptions());
        stop();
    } else if (cmd == "watch") {
        //
    }
})();