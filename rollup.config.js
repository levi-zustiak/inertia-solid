import pkg from "./package.json" assert { type: "json" };
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { babel } from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

export default {
  input: "src/index.ts",
  external: ["solid-js", "solid-js/web"],
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "esm",
    },
  ],
  plugins: [
    resolve({ extensions }),
    typescript({ tsconfig: "./tsconfig.json" }),
    commonjs(),
    json(),
    babel({
      extensions,
      babelHelpers: "bundled",
      presets: [
        ["babel-preset-solid", {}],
        "@babel/preset-typescript",
      ],
    }),
    terser(),
  ],
};
