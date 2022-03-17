<script>
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	import { connectable } from './connectable.js';
	import Link from './Link.svelte';
	import Pannable from './Pannable.svelte';

	export let node;
	export let data;

	let source; // start of the connection
	let target; // end of the connection

	$: x = node.x;
	$: y = node.y;

	let prevTarget; // to keep track of connection changes, ie: disconnect

	let connectingNow = false;

	function handleConnecting(event) {
		connectingNow = true;
		console.log('CONNECTing');
		source = event.detail.node;
		// if connecting, set the target to the mouse pointer
		if (
			event.detail.x &&
			event.detail.x !== target?.offsetLeft &&
			event.detail.y &&
			event.detail.y !== target?.offsetTop
		)
			target = {
				offsetLeft: event.detail.x,
				offsetTop: event.detail.y,
				offsetWidth: 0,
				offsetHeight: 0
			};
	}

	function handleConnected(event) {
		connectingNow = false;

		if (!event.detail.target.id) return; // node must have an ID

		console.log('CONNECTED firing');

		// TODO: Remove links button / context menu
		// TODO: prevent duplicate links
		data.links = [
			...data.links,
			{
				source: { id: node.id },
				target: { id: event.detail.target.id }
			}
		];
	}
</script>

<div
	class="endpoint"
	id={node.id}
	use:connectable
	on:connecting={handleConnecting}
	on:connected={handleConnected}
	style="left: {x}px; top: {y}px;"
>
	<slot />
</div>

{#if connectingNow}
	<Link {source} {target} />
{/if}

<style>
	:root {
		--size: 6em;
	}
	.endpoint {
		position: absolute;
		background-color: #baf3ca;
		box-shadow: 0 0 2px black;
		transition: box-shadow 0.25s ease-in;
		cursor: pointer;
		border: 1px dashed black;
		border-radius: 2px;
		width: var(--size);
		height: var(--size);
		padding: calc(var(--size) / 8);
	}
	.endpoint:hover {
		box-shadow: 0 0 6px black;
	}
</style>
