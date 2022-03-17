<script>
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	import { pannable } from '../pannable.js';

	let panElement;
	export let x = 0;
	export let y = 0;

	$: x = $coords.x;
	$: y = $coords.y;

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

	onMount(() => {});
</script>

<div
	class="box"
	bind:this={panElement}
	use:pannable
	on:panstart={handlePanStart}
	on:panmove={handlePanMove}
	on:panend={handlePanEnd}
	style="
    left: {x}px;
    top: {y}px;
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
