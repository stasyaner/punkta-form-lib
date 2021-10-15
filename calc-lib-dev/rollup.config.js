import babel from "@rollup/plugin-babel";
import tsc from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import image from "@rollup/plugin-image";
import pkg from "./package.json";

const extensions = [".ts", ".tsx"];
const peerDeps = Object.keys(pkg.peerDependencies);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    input: ["src/CalcForm.tsx"],
    output: [
        {
            file: pkg.main,
            format: "cjs",
            sourcemap: true,
        },
        {
            file: pkg.module,
            format: "esm",
            sourcemap: true,
            // preserveModules: true,
        },
    ],
    plugins: [
        commonjs(),
        resolve({ extensions: [...extensions, ".js"] }),
        tsc(),
        babel({
            extensions,
            babelHelpers: "inline",
            include: extensions.map((ext) => `src/**/*${ext}`),
        }),
        image(),
        peerDepsExternal(),
    ],
    external: peerDeps,
};
