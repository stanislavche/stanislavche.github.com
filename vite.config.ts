import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [
        // Treat .js files with JSX as jsx (CRA migration compatibility)
        {
            name: 'treat-js-files-as-jsx',
            async transform(code, id) {
                if (!id.match(/src\/.*\.js$/)) return null;
                return transformWithEsbuild(code, id, { loader: 'jsx', jsx: 'automatic' });
            },
        },
        react(),
        svgr(),
    ],
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                '.js': 'jsx',
            },
        },
    },
    json: {
        namedExports: true
    },
    resolve: {
        alias: {
            '@': '/src',
        },
    },
    server: {
        port: 3000,
    },
    build: {
        outDir: 'build',
    },
});
