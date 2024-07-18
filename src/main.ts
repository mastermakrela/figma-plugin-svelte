import { mount } from "svelte";
import "./app.css";
import Plugin from "./plugin_ui/Plugin.svelte";

/**
 * This is the entry point for the Svelte app.
 * You probably don't need to touch this file.
 */

const plugin = mount(Plugin, { target: document.getElementById("app")! });

export default plugin;
