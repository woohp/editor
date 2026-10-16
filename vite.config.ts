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
    plugins: [svelte(), tailwindcss()],
    resolve: {
        // y-monaco deep-imports a path Monaco's exports map hides; same module as the main entry's
        alias: { "monaco-editor/esm/vs/editor/editor.api.js": "monaco-editor/editor/editor.api" },
    },
    root: "src",
});
