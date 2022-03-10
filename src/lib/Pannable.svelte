<script>
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	import { pannable } from './pannable.js';

	export let panElement;
	export let x = 0;
	export let y = 0;

	const coords = spring(
		{ x, y },
		{
			stiffness: 0.2,
			damping: 0.4
		}
	);

	function handlePanStart() {
		coords.stiffness = coords.damping = 1;
	}

	function handlePanMove(event) {
		coords.update(($coords) => ({
			x: $coords.x + event.detail.dx,
			y: $coords.y + event.detail.dy
		}));
	}

	function handlePanEnd(event) {
		coords.stiffness = 0.2;
		coords.damping = 0.4;
		coords.set({ x, y });
	}

	$: if ($coords) panElement = panElement; // even though the variable is bound, still needs update like this

	onMount(() => {
		panElement = panElement; // initialize the element
	});
</script>

<div
	class="box"
	bind:this={panElement}
	use:pannable
	on:panstart={handlePanStart}
	on:panmove={handlePanMove}
	on:panend={handlePanEnd}
	style="
    left: {$coords.x}px;
    top: {$coords.y}px;
    "
>
	<slot>Pull on me</slot>
</div>

<style>
	.box {
		--width: 100px;
		--height: 100px;
		position: absolute;
		width: var(--width);
		height: var(--height);
		left: calc(50% - var(--width) / 2);
		top: calc(50% - var(--height) / 2);
		border-radius: 4px;
		background-color: #ff3e00;
		cursor: move;
		padding: 0.5em;
	}
</style>
