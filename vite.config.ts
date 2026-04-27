import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
    base: "./",
    build: {
        outDir: "../docs",
        emptyOutDir: true,
    },
    plugins: [svelte({ configFile: "../svelte.config.js" }), tailwindcss()],
    root: "src",
});
