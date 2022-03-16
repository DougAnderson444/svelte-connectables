<script>
	import { createEventDispatcher, onMount } from 'svelte';

	export let nodes;
	export let node;
	export let mouseMoving = false;

	const dispatch = createEventDispatcher();

	let pannable;

	onMount(async () => {
		({ pannable } = await import('./pannable'));
	});

	function handlePanStart(event) {
		mouseMoving = true;
		// nodes = nodes; // if this is here, the boxes jump when mouse clicks up
		dispatch('resimulate', 'resimulate');
	}

	function handlePanMove(event) {
		mouseMoving = true;

		node.x = node.x + event.detail.dx;
		node.y = node.y + event.detail.dy;
		node = node;

		nodes[node.index] = { ...nodes[node.index], x: node.x, y: node.y };
		nodes = nodes;
		// dispatch('resimulate', 'resimulate'); // makes them stay still when mouse moving for a while
	}

	function handlePanEnd(event) {
		mouseMoving = false;
		nodes = nodes; // if this is here, the boxes jump when mouse clicks up
		dispatch('resimulate', 'resimulate');
	}
</script>

{#if pannable}
	<div
		class="dragger"
		use:pannable
		on:panmove={handlePanMove}
		on:panend={handlePanEnd}
		on:panstart={handlePanStart}
	>
		<svg
			width="20"
			height="20"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			class="svg-inline--fa fa-arrows-alt fa-w-16"
			data-icon="arrows-alt"
			data-prefix="fas"
			viewBox="0 0 512 512"
			><defs /><path
				fill="currentColor"
				d="M352 426l-79 79c-9 9-25 9-34 0l-79-79c-15-15-5-41 17-41h51V284H127v51c0 22-26 32-41 17L7 273c-9-9-9-25 0-34l79-79c15-15 41-5 41 17v51h101V127h-51c-22 0-32-26-17-41l79-79c9-9 25-9 34 0l79 79c15 15 5 41-17 41h-51v101h101v-51c0-22 26-32 41-17l79 79c9 9 9 25 0 34l-79 79c-15 15-41 5-41-17v-51H284v101h51c22 0 32 26 17 41z"
			/></svg
		>
	</div>
{/if}

<style>
	.dragger {
		cursor: grab;
		user-select: none;
		color: rgba(255, 255, 255, 0.69);
		text-align: center;
		background: rgba(0, 0, 0, 0.103);
		margin-top: 7px;
		margin-right: 7px;
		padding: 7px 7px 4px 7px;
		border-radius: 3px;
		border: 0px solid #aaa;
		position: absolute;
		top: 1px;
		right: 1px;
	}
</style>
