import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite-plus";

export default defineConfig({
    fmt: {
        ignorePatterns: ["docs/**"],
        tabWidth: 4,
    },
    lint: {
        ignorePatterns: ["docs/**"],
        jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
        options: {
            typeAware: true,
            typeCheck: true,
        },
        rules: {
            "no-unassigned-vars": "off",
            "vite-plus/prefer-vite-plus-imports": "error",
        },
    },
    base: "./",
    build: {
        outDir: "../docs",
        emptyOutDir: true,
    },
    plugins: [
        svelte({ configFile: new URL("./svelte.config.js", import.meta.url).pathname }),
        tailwindcss(),
    ],
    root: "src",
});
