import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.js"],
            refresh: true,
        }),
    ],
    build: {
        outDir: "public/build", // Output directory for Vite
        assetsDir: "", // Relative path to assets from outDir
        manifest: true, // Generate manifest.json file
        rollupOptions: {
            // Provide external modules to exclude from the bundle
            external: ["agora-rtc-sdk-ng"],
            output: {
                // Customize chunk and bundle names
                entryFileNames: "[name]-[hash].js",
                chunkFileNames: "[name]-[hash].js",
                assetFileNames: "[name]-[hash].[ext]",
            },
        },
    },
    define: {
        global: "window", // Ensures `global.Buffer` points to `window.Buffer` in browser context
    },
    optimizeDeps: {
        include: ["buffer"], // Ensure buffer is included in optimized dependencies
    },
});
