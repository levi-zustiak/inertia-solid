import pkg from './package.json' assert { type: "json" };
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'esm',
    }
  ],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json"
    }),
    resolve({
      extensions: ['.js', '.ts', '.tsx']
    })
  ]
}
