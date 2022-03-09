# Svelte Connectables

Connect HTML elements with SVG curves. Like jsPlumb, only built with Svelte so it's got more flexibility to do more.

[x] - Connect any HTML elements together

[x] - Adjusts when HTML Element position changes

![Demo](demo.gif)

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
