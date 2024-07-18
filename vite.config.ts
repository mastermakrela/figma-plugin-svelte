import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig(({ mode }) => ({
	plugins: [
		svelte({}),
		viteSingleFile({
			removeViteModuleLoader: true,
		}),
	],
	build: {
		emptyOutDir: false,
	},
	resolve: {
		alias: {
			$lib: path.resolve("./src/lib"),
		},
	},
}));
