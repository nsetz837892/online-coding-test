// noinspection JSUnusedGlobalSymbols

import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import flowbiteReact from 'flowbite-react/plugin/vite';
import { resolve } from 'node:path';
import * as path from 'path';
import { defineConfig, loadEnv } from 'vite';
import pluginChecker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

/**
 * @link https://vitejs.dev/config/
 */
export default defineConfig(({ mode }) => ({
    publicDir: 'public',
    server: {
        /*
         * This ensures that the browser opens upon server start
         */
        open: true,
        port: 8000,
    },
    plugins: [
        /**
         * @link https://www.npmjs.com/package/vite-plugin-checker
         */
        pluginChecker({ typescript: true }),
        /**
         * @link https://www.npmjs.com/package/vite-plugin-svgr
         */
        svgr({
            svgrOptions: {
                icon: true,
            },
        }),
        /**
         * @link https://github.com/vitejs/vite-plugin-react-swc
         */
        flowbiteReact(),
        /**
         * @link https://www.npmjs.com/package/vite-tsconfig-paths
         */
        tsconfigPaths(),
        /**
         * @link https://www.npmjs.com/package/@tailwindcss/vite
         */
        tailwindcss(),
        /**
         * @link https://tanstack.com/router/latest/docs/framework/react/devtools
         */
        mode !== 'production' && TanStackRouterVite({ target: 'react', autoCodeSplitting: false }),
    ],
    build: {
        manifest: true,
        minify: mode === 'development' ? false : 'esbuild',
        outDir: 'build',
        target: 'es2022',
        rollupOptions: {
            output: {
                manualChunks(id: string): string {
                    if (id.includes('node_modules')) {
                        const vendorModulePath: string = id.toString().split('node_modules/')?.[1] ?? '';

                        const vendorEntryPoint: string = vendorModulePath.split('/')?.[0] ?? '';

                        if (vendorEntryPoint !== '.pnpm') {
                            return vendorEntryPoint;
                        }

                        const vendor: string = vendorModulePath.split('/')?.[1] ?? '';

                        return vendor.split('@')[vendor[0] === '@' ? 1 : 0];
                    }

                    return 'vendor';
                },
            },
        },
    },
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        alias: {
            '@': '/resources/ts',
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
        },
        extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx'],
    },
    /**
     * @link https://vitest.dev/
     */
    test: {
        include: ['**/*.test.tsx'],
        exclude: ['**/node_modules'],
        environment: 'jsdom',
        globals: true,
        setupFiles: path.resolve(__dirname, 'src/vitest.setup.ts'),
        env: loadEnv(mode, process.cwd(), ''),
        coverage: {
            provider: 'istanbul',
        },
    },
}));
