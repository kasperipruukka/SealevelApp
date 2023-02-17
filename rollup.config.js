import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default [
    {
        input: 'src/pages/index.ts',
        output: {
          dir: 'Content/js',
          sourcemap: true,
        },
        plugins: [typescript(), nodeResolve()]
    }  
]