import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
	build: {
		minify: mode === "production",
		sourcemap: mode !== "production" ? "inline" : false,
		target: "es2017",
		emptyOutDir: false,
		outDir: path.resolve("dist"),
		rollupOptions: {
			input: path.resolve("src/plugin_logic/code.ts"),
			output: {
				entryFileNames: "code.js",
			},
		},
	},
	resolve: {
		alias: {
			$lib: path.resolve("./src/lib"),
		},
	},
}));
