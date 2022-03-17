# Svelte Connectables

Connect HTML elements with SVG curves. Like [jsPlumb](https://demo.jsplumbtoolkit.com/), only built with Svelte so it's got more flexibility to it.

- [x] Connect HTML elements together
- [x] Adjusts when HTML Element position changes
- [x] UI updates data object
- [ ] Groups of connectable ojbects

![Demo](demo.gif)

## Required data

The data must have an array of nodes and array of links connecting those node by `id`:

```
	let data = {
		nodes:
			{
				id: string
				x: number
				y: number
				width: number
				height: number
			}[],
		links:
			{
				source: {
					id: string
				},
				target: {
					id: string
				}
			}[]
	};

```

## Creating a connections

```
npm i github:douganderson444/svelte-connectables
```

## Exports

```js
import Connectable from 'svelte-connectables/Connectable.svelte';
import PanHandle from 'svelte-connectables/PanHandle.svelte';
import Links from 'svelte-connectables/Links.svelte';
import Resizable from 'svelte-connectables/Resizable.svelte';
```

## Usage

See `Demo.svelte`, but something along these lines:

```js
<div class="wrapper">
	<Connectable>Connect from Me</Connectable>

	<Pannable>Connect to me, then pull on me.</Pannable>
</div>
```

## Developing

```bash
npm run dev
```
