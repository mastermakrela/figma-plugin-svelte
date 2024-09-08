/// <reference types="svelte" />
/// <reference types="vite/client" />
/// <reference types="@figma/plugin-typings" />

/**
 * Here we define the messages that the plugin can send to the UI.
 * They should contain at least a `type` property for the type safety (see `onmessage` function in `Plugin.svelte`).
 * But can also define other data, that can then be safely accessed.
 */
type PluginMessage =
	| {
			type: "a-thing-happened";
	  }
	| {
			type: "count";
			count: number;
	  };

/**
 * Here we define the messages that the UI can send to the plugin.
 * They should contain at least a `type` property for the type safety (see `figma.ui.onmessage` function in `code.ts`).
 * But can also define other data, that can then be safely accessed.
 */
type UiMessage =
	| {
			type: "button-click" | "increment";
	  }
	| {
			type: "text-message";
			text: string;
	  }
	| {
			type: "resize";
			width: number;
			height: number;
	  };
