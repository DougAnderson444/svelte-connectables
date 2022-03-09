<script>
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	import { connectable } from './connectable.js';
	import Link from './Link.svelte';
	import Pannable from './Pannable.svelte';

	export let left = 10;
	export let top = 20;

	let source; // start of the connection
	let target; // end of the connection
	let prevTarget; // to keep track of connection changes, ie: disconnect

	function handleConnecting(event) {
		source = event.detail.node;
		// if connecting, set the target to the mouse pointer
		target = {
			offsetLeft: event.detail.x,
			offsetTop: event.detail.y,
			offsetWidth: 0,
			offsetHeight: 0
		};
	}

	function handleConnected(event) {
		// mutation observer in action directive script
		// fires update event if target attributes change
		// keeping this target reference up to date
		target = event.detail.target;

		// if new target, fire disconnect event on old target element
		if (prevTarget && prevTarget !== target)
			prevTarget.dispatchEvent(new CustomEvent('disconnect'));

		prevTarget = target; // reset target
	}
</script>

<div
	class="endpoint"
	use:connectable
	on:connecting={handleConnecting}
	on:connected={handleConnected}
	style="left: {left}px; top: {top}px;"
>
	<slot />
</div>

{#if source && target}
	<Link {source} {target} />
{/if}

<style>
	.endpoint {
		position: relative;
		background-color: #baf3ca80;
		box-shadow: 0 0 2px black;
		transition: box-shadow 0.25s ease-in;
		cursor: pointer;
		opacity: 0.5;
		border: 1px dashed black;
		border-radius: 2px;
		width: 1em;
		height: 1em;
		/* padding: 10px;
  margin: 1em */
	}
	.endpoint:hover {
		box-shadow: 0 0 6px black;
	}
</style>
