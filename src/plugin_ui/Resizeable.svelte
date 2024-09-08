<script lang="ts">
	import type { PointerEventHandler } from "svelte/elements";

	type HandlerType = PointerEventHandler<SVGSVGElement>;

	let svg = $state<SVGSVGElement>();
	let dragging = $state(false);

	const onpointerdown: HandlerType = (e) => {
		e.currentTarget.setPointerCapture(e.pointerId);
		dragging = true;
	};

	const onpointermove: HandlerType = (e) => {
		const message: UiMessage = {
			type: "resize",
			width: Math.max(50, Math.floor(e.clientX + 5)),
			height: Math.max(50, Math.floor(e.clientY + 5)),
		};
		if (dragging) {
			console.log("message", message);
			window.parent.postMessage({ pluginMessage: message }, "*");
		}
	};

	const onpointerup: HandlerType = (e) => {
		dragging = false;
		e.currentTarget.releasePointerCapture(e.pointerId);
	};
</script>

<svg
	bind:this={svg}
	id="corner"
	width="8"
	height="8"
	viewBox="0 0 8 8"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	{onpointerdown}
	{onpointermove}
	{onpointerup}
>
	<path d="M3.11288 8H2L8 2V3.11288L3.11288 8Z" fill="#8C8C8C" />
	<path d="M5.9301 8H4.81712L8 4.81712V5.9301L5.9301 8Z" fill="#8C8C8C" />
</svg>

<style lang="postcss">
	#corner {
		@apply fixed bottom-0 right-0 z-10 w-8 h-8 cursor-nwse-resize;
	}
</style>
