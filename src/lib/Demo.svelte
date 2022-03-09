<script>
	import { spring } from 'svelte/motion';
	import Connectable from './Connectable.svelte';
	import Pannable from './Pannable.svelte';

	let data = {
		connections: []
	};
</script>

<div class="wrapper">
	<Connectable>Connect from Me</Connectable>

	<Pannable>Connect to me, then pull on me.</Pannable>
</div>

<style>
	.wrapper {
		display: flex;
		/* position: relative; */
		margin: 0px;
		/* border:dotted 3px black;  */
		border-radius: 4px;
		width: auto;
		height: 100%;
	}
</style>
