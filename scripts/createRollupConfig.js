// rollup.config.js
import path from 'node:path';

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

/**
 * 为单个 package 生成配置
 */
function createConfig(pkgDir) {
  return {
    input: path.resolve(pkgDir, 'src/index.ts'),
    alias: {
      entries: [{ find: '@/', replacement: path.resolve(pkgDir, 'src') }],
    },

    output: [
      {
        file: path.resolve(pkgDir, 'dist/index.js'),
        format: 'esm',
        sourcemap: true,
      },
      {
        file: path.resolve(pkgDir, 'dist/index.cjs'),
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
    ],

    // 库模式：不要把依赖打进来
    external: (id) => {
      // workspace / node_modules 依赖都 external
      return !id.startsWith('.') && !path.isAbsolute(id);
    },

    plugins: [
      resolve({
        extensions: ['.mjs', '.js', '.json', '.ts'],
      }),
      commonjs(),
      typescript({
        tsconfig: path.resolve(pkgDir, 'tsconfig.build.json'),
        sourceMap: true,
        declaration: false, // d.ts 用 tsc 单独生成
      }),
    ],
  };
}

/**
 * 当前先构建 commando
 * 以后加包直接往数组里加
 */
export default createConfig;
