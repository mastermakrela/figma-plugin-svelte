<script lang="ts">
	import Counter from "./Counter.svelte";
	import { get_random_number } from "$lib";
	import Resizeable from "./Resizeable.svelte";

	/**
	 * Sends a message to plugin's `code.ts` file.
	 * We wrap `parent.postMessage` to get the type safety.
	 *
	 * @param message - The message to be sent.
	 */
	function postMessage(message: UiMessage, targetOrigin: string = "*") {
		parent.postMessage({ pluginMessage: message }, targetOrigin);
	}

	onmessage = async (event: MessageEvent<{ pluginMessage: PluginMessage }>) => {
		console.log("🚀 ~ onmessage= ~ event:", event);
		const data = event.data.pluginMessage;

		switch (data.type) {
			case "count":
				console.log("count", data.count);
				count = data.count;
				break;
			case "a-thing-happened":
				console.log("a-thing-happened");
				data;
				break;
		}
	};

	function button_click() {
		postMessage({ type: "button-click" });
	}

	const initial_count = get_random_number();

	let count = $state(initial_count);
	let text = $state("");
</script>

<Resizeable />

<main
	class="prose max-w-none h-full bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center py-8 px-4 text-center"
>
	<h1>Figma Plugin Svelte</h1>

	<p>
		Open console (<kbd>⌘</kbd> + <kbd>⌥</kbd> + <kbd>I</kbd> / <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd>) to see
		messages from the plugin.
	</p>

	<div>
		<p>This button just sends a message to the plugin.</p>
		<button onclick={button_click}>Do the thing</button>
	</div>

	<div>
		<p>This sends a message to the plugin - to increment the count - and then receives the updated count.</p>
		<p>
			count: {count}
			<br />
			{#if count === initial_count}
				<span class="text-sm text-opacity-50">(this is a random starting number, so you can't see it changing)</span>
			{/if}
		</p>
		<button onclick={() => postMessage({ type: "increment" })}>+1</button>
	</div>

	<div>
		<p>We can also send text messages to the plugin.</p>
		<input type="text" oninput={(e) => postMessage({ type: "text-message", text: e.currentTarget.value })} />
		<p class="text-sm">(you can see the text in the console)</p>
	</div>

	<div>
		<p>And of course, we can use <a href="https://svelte.dev" target="_blank">Svelte</a> components!</p>
		<Counter />
	</div>
</main>

<style lang="postcss">
	button {
		@apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg;
	}

	input {
		@apply border-2 border-gray-300 rounded-lg py-2 px-4 w-full;
	}
</style>
