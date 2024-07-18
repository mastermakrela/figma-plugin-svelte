<script lang="ts">
	let count: number = 0;

	const increment = () => {
		count += 1;
	};
</script>

<button on:click={increment}>
	Current count is {count}
</button>

<style lang="postcss">
	button {
		@apply bg-[#f96743] text-white font-bold py-2 px-4 rounded;
	}
</style>
