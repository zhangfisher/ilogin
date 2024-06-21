import { defineConfig } from 'tsup' 
// @ts-ignore
// import { lessLoader } from 'esbuild-plugin-less';
import loadRaw from "esbuild-plugin-raw"

export default defineConfig({    
    entry:[
        "src/index.tsx"
    ],
    noExternal:[
        "omi"
    ],
    clean: true,
    format: ['cjs', 'esm'],    
    esbuildPlugins: [
        loadRaw()
    ],
});