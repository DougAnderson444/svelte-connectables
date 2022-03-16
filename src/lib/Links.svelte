<script>
	// https://github.com/Rich-Harris/svelte-d3-arc-demo/blob/master/src/Viz.svelte
	// https://github.com/d3/d3-shape/blob/v3.1.0/README.md#_link
	import { onMount } from 'svelte';
	import { link, curveBumpX } from 'd3-shape';

	export let data;

	export let width = 500;
	export let height = 500;

	export let strokeColor = 'green';
	export let strokeWidth = 3;
	export let arrowColor = 'green';
	export let startOffset = '60%';

	const generateXcurve = link(curveBumpX);

	let mounted;

	onMount(() => {
		mounted = true;
	});

	function genPath(link) {
		// let sourcex =
		// x1 = x1 < target?.offsetLeft ? source.offsetLeft + source.clientWidth : source.offsetLeft;
		// y1 = source.offsetTop + source.clientHeight / 2;
		// x2 = target?.offsetLeft
		// y2 = target?.offsetTop + target.offsetHeight / 2;
		let sourcex = data.nodes.find((el) => el.id === link.source.id)?.x;
		let sourcey = data.nodes.find((el) => el.id === link.source.id)?.y;
		let source = [sourcex, sourcey];

		let targetX = data.nodes.find((el) => el.id === link.target.id)?.x;
		let targetY = data.nodes.find((el) => el.id === link.target.id)?.y;

		console.log(targetX, targetY);

		let d = generateXcurve({
			source,
			target: [targetX, targetY]
		});
		return d;
	}
</script>

<svelte:head
	><link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Luckiest+Guy" />
</svelte:head>

<span class="svg-container">
	<svg {width} {height}>
		<defs>
			<marker
				id="triangle"
				viewBox="0 0 10 10"
				refX="1"
				refY="5"
				markerUnits="strokeWidth"
				markerWidth="4"
				markerHeight="3"
				orient="auto"
			>
				<path d="M 0 0 L 10 5 L 0 10 z" fill="context-stroke" />
			</marker>
		</defs>
		{#each data.links as link, i}
			{#if link}
				<g stroke="red" stroke-opacity="0.9">
					<path
						d={genPath(link)}
						id="link_{i}"
						stroke-width={strokeWidth}
						stroke={strokeColor}
						fill="none"
						stroke-linecap="round"
						marker-mid="url(#triangle)"
						style=""
					/>
				</g>
			{/if}
		{/each}
		<text>
			<textPath xlink:href="#path1" startOffset={'20%'}>
				<tspan fill="black">Curvy Connector</tspan>
			</textPath>
			<textPath xlink:href="#path1" {startOffset} fill={arrowColor}>➤</textPath>
		</text>
	</svg>
</span>

<style>
	.svg-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -2;
	}
	svg {
		position: absolute;
		float: left;
		stroke-width: 5;
		border: 1px dashed blue;
		z-index: -1;
		width: 100%;
		height: 100%;
	}

	text {
		font-family: arrows;
		font-size: 1.5em;
		fill: grey;
		dominant-baseline: central;
	}

	tspan {
		font-family: 'Luckiest Guy', cursive;
		font-size: 0.5em;
		/* font-family: Impact; */
		dominant-baseline: ideographic;
	}

	/* @font-face {
		font-family: arrows;
		src: url(arrows.woff);
	} */
</style>
