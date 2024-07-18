import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: ["./src/**/*.{html,js,svelte,ts}"],
	safelist: ["dark"],
	theme: {},
	plugins: [require("@tailwindcss/typography")],
};

export default config;
