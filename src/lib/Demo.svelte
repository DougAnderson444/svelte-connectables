<script>
	import { spring } from 'svelte/motion';
	import Connectable from './Connectable.svelte';
	import PanHandle from './PanHandle.svelte';
	import Pannable from './Pannable.svelte';
	import Link from './Link.svelte';

	let nodes = {
		connections: []
	};

	let node = { x: 10, y: 10 };
	let source;
	let target;
</script>

<div class="wrapper">
	<Connectable bind:source bind:target bind:node>
		<PanHandle {nodes} bind:node />
		Connect from Me</Connectable
	>

	<Pannable x={200} y={200}>Connect to me, then pull on me.</Pannable>

	{#if source && target}
		<Link {source} {target} />
	{/if}
</div>

<style>
	.wrapper {
		display: flex;
		position: relative;
		margin: 0px;
		border: dotted 3px black;
		border-radius: 4px;
		width: auto;
		height: 800px;
	}
</style>
