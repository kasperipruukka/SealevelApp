import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import replace from "rollup-plugin-replace";

export default [
    {
        input: 'src/index.ts',
        output: {
          dir: 'Content/js',
          sourcemap: true,
        },
        plugins: [
          typescript(), 
          nodeResolve(),
          replace({
            'process.env.NODE_ENV': JSON.stringify('production')
          }),
        ]
    }  
]