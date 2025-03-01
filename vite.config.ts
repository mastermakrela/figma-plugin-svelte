import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import * as path from "node:path";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig(({ mode }) => ({
	plugins: [
		tailwindcss(),
		svelte({}),
		viteSingleFile({
			removeViteModuleLoader: true,
		}),
	],
	build: {
		minify: mode === "production",
		emptyOutDir: false,
	},
	resolve: {
		alias: {
			$lib: path.resolve("./src/lib"),
		},
	},
}));
