<script>
	import { spring } from 'svelte/motion';
	import Connectable from './Connectable.svelte';
	import PanHandle from './PanHandle.svelte';
	import Links from './Links.svelte';
	import Object from './Object.svelte';
	import Resizable from './Resizable.svelte';

	let nodes = {
		connections: []
	};

	let source;
	let target;

	let data = {
		nodes: [
			{ id: '1', group: 1, connectable: true, x: 100, y: 100, width: 100, height: 100 },
			{ id: '2', group: 2, connectable: false, x: 414, y: 190, width: 100, height: 100 },
			{ id: '3', group: 2, connectable: false, x: 250, y: 300, width: 100, height: 100 }
		],
		links: [{ source: { id: '1' }, target: { id: '2' } }]
	};
</script>

<!-- Troubleshooting data  -->

<div class="wrapper">
	{#each data.nodes as node (node.id)}
		<Connectable bind:data bind:node>
			<Resizable bind:node>
				<PanHandle bind:node />
				{node.id} <span>Connect from Me</span>
			</Resizable>
		</Connectable>
	{/each}

	{#if data.links.length > 0}
		<Links {data} />
	{/if}
</div>
<div>
	<Object val={data} />
</div>

<style>
	.wrapper {
		display: flex;
		position: relative;
		left: 0px;
		margin: 0px;
		border: dotted 3px black;
		border-radius: 4px;
		width: auto;
		height: 800px;
	}
</style>
