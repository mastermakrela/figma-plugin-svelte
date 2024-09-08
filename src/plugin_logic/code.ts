import { get_random_number } from "$lib";

// MARK: - Helpers

/**
 * Sends a message from the plugin to the UI.
 * We wrap `figma.ui.postMessage` to get the type safety.
 *
 * @param message - The message to be sent.
 */
function postMessage(message: PluginMessage) {
	figma.ui.postMessage(message);
}

// MARK: - Plugin

figma.showUI(__html__, { themeColors: true, width: 500, height: 800 });
figma.clientStorage.getAsync("size").then((size) => {
	if (size) figma.ui.resize(size.width, size.height);
});

// save some state
let count = 0;
let text = "";

/**
 * Handle messages received from the UI.
 *
 * @param {UiMessage} msg - The message received from the UI.
 */
figma.ui.onmessage = async (msg: UiMessage) => {
	switch (msg.type) {
		case "resize":
			const { width, height } = msg;
			figma.ui.resize(width, height);
			figma.clientStorage.setAsync("size", { width, height });
			break;

		case "button-click":
			console.log("Message received: button clicked in UI");
			const random_number = get_random_number();
			figma.notify(`You did the thing! (your lucky number is ${random_number}`);
			break;

		case "increment":
			console.log("Message received: increment in UI");
			count++;
			postMessage({ type: "count", count });
			break;

		case "text-message":
			console.log("Message received: text-message in UI");

			// here we can access the text property and we get the type safety, because it's defined in the `types.d.ts` file
			text = msg.text;

			console.log("saved text", text);
			break;

		default:
			// This is a trick to make typescript validate that all cases (message types defined in `types.d.ts`) are handled.
			const _exhaustiveCheck: never = msg;
			return _exhaustiveCheck;
	}
};
