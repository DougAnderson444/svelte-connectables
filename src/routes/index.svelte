<script>
	import { spring } from 'svelte/motion';
	import Connectable from '$lib/Connectable.svelte';

	import Links from '$lib/Links.svelte';
	import Object from '$lib/_helpers/components/Object.svelte';

	let nodes = {
		connections: []
	};

	let source;
	let target;

	let data = {
		nodes: [
			{ id: '1', group: 1, connectable: true, x: 90, y: 64, width: 100, height: 100 },
			{ id: '2', group: 2, connectable: false, x: 355, y: 129, width: 100, height: 100 },
			{
				id: '3',
				group: 2,
				connectable: false,
				x: 69,
				y: 276,
				width: 400,
				height: 400,
				children: [
					{ id: '4', group: 1, connectable: true, x: 100, y: 100, width: 100, height: 100 },
					{ id: '5', group: 2, connectable: false, x: 414, y: 190, width: 100, height: 100 }
				]
			}
		],
		links: [{ source: { id: '1' }, target: { id: '2' } }]
	};
</script>

<!-- Troubleshooting data  -->

<div class="wrapper">
	{#each data.nodes as node (node.id)}
		<!-- Connectable Prop Options: resizable={boolean} panhandle={boolean}  -->
		<Connectable bind:data bind:node resizable={true} panhandle={true}>
			<div class="inner">
				{node.id} Connect from Me <br />
				{node.x},{node.y}<br />
				{node.width},{node.height}
			</div>
		</Connectable>
	{/each}

	{#if data.links.length > 0}
		<Links links={data.links} />
	{/if}
</div>
<div>
	<Object val={data} />
</div>

<style>
	:root {
		--size: 6em;
	}
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

	.inner {
		background-color: #baf3ca;
		width: 100%;
		height: 100%;
		border-radius: 2px;
		padding: 0.5em;
	}
</style>
