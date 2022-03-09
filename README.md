# Svelte Connectables

Connect HTML elements with SVG curves.

## Creating a connections

```
npm i svelte-connectables
```

Usage: See Demo.svelte, but something along these lines:

```js
<script>
	import Connectable from './Connectable.svelte';
	import Pannable from './Pannable.svelte';
</script>

<div class="wrapper">
	<Connectable>Connect from Me</Connectable>

	<Pannable>Connect to me, then pull on me.</Pannable>
</div>
```

## Developing

```bash
npm run dev
```
