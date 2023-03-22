import pkg from "./package.json" assert { type: "json" };
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import { babel } from "@rollup/plugin-babel";
import dts from "rollup-plugin-dts";
import del from "rollup-plugin-delete";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

export default [
  {
    input: "src/index.ts",
    external: ["solid-js", "solid-js/web", "solid-js/store", "@inertiajs/core"],
    output: {
      file: pkg.module,
      format: "esm",
    },
    plugins: [
      json(),
      babel({
        extensions,
        babelHelpers: "bundled",
        presets: ["babel-preset-solid", {}],
      }),
      nodeResolve({ extensions }),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
  },
  {
    input: "dist/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts(), del({ hook: "buildEnd", targets: "./dist/types" })],
  },
];
