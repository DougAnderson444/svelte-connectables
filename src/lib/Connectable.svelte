<script>
	import { connectable } from './_helpers/connectable.js';
	import Link from './_helpers/components/Link.svelte';
	import PanHandle from '$lib/PanHandle.svelte';
	import Resizable from '$lib/Resizable.svelte';

	export let node;
	export let data;

	// optional props
	export let resizable = false;
	export let panhandle = false;

	let source; // start of the connection
	let target; // end of the connection

	$: x = node.x;
	$: y = node.y;

	let prevTarget; // to keep track of connection changes, ie: disconnect

	let connectingNow = false;

	function handleConnecting(event) {
		connectingNow = true;
		source = event.detail.node;
		// if connecting, set the target to the mouse pointer
		if (event.detail?.x !== target?.offsetLeft && event.detail?.y !== target?.offsetTop)
			target = {
				offsetLeft: event.detail.x,
				offsetTop: event.detail.y,
				offsetWidth: 0,
				offsetHeight: 0
			};
	}

	function handleConnected(event) {
		connectingNow = false;

		function getID(n) {
			if (n.id) return n.id;
			if (n.parentNode) return getID(n.parentNode);
			return false;
		}
		let id = getID(event.detail.target);

		// node must have an ID, can't be self
		if (!id || id == node.id) return;

		// Prevent duplicate links
		if (data.links.find((el) => el.source.id == node.id && el.target.id == id) !== undefined)
			return;

		data.links = [
			...data.links,
			{
				source: { id: node.id },
				target: { id },
				opts: {
					arrow: true,
					label: { enabled: true, value: `${node.id} to ${id}` }
				}
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
	style="left: {x}px; top: {y}px; width: {node.width}px; height:{node.height}px;"
>
	{#if resizable}
		<Resizable bind:node>
			{#if panhandle}
				<PanHandle bind:node />
			{/if}
			<slot />
		</Resizable>
	{:else if panhandle}
		<PanHandle bind:node />
		<slot />
	{:else}
		<slot />
	{/if}
</div>

<!-- Showing to possible link to-be  -->
{#if connectingNow}
	<Link {source} {target} />
{/if}

<style>
	.endpoint {
		position: absolute;
		box-shadow: 0 0 2px black;
		transition: box-shadow 0.25s ease-in;
		cursor: pointer;
	}
	.endpoint:hover {
		box-shadow: 0 0 6px black;
	}
</style>
