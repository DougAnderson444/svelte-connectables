<script>
	/**
	 * Show the mouse pointer temporary link/ projection
	 */

	import { onMount } from 'svelte';
	import { link, curveBumpX } from 'd3-shape';

	// mandatory props
	export let target;
	export let source;

	// optional props, with defaults
	export let width = 500;
	export let height = 500;
	export let strokeColor = 'green';
	export let strokeWidth = 3;
	export let arrowColor = 'green';
	export let startOffset = '60%';

	let container;

	const generateXcurve = link(curveBumpX);
	let svg, mounted;
	let sourceEl, targetEl;
	let x1, x2, y1, y2;
	onMount(() => {
		mounted = true;
	});
	// if x1 < x2, x1 + width
	$: if (mounted) {
		x1 = Math.floor(source.offsetLeft + source.clientWidth / 2);
	}
	$: if (mounted) {
		y1 = Math.floor(source.offsetTop + source.clientHeight / 2);
		// y1 = y1 < y2 ? source.offsetTop + source.clientHeight : source.offsetTop
	}
	$: if (mounted) {
		x2 = Math.floor(
			target.offsetLeft + target.offsetWidth / 2 - container.getBoundingClientRect().x
		);
	}
	$: if (mounted && container) {
		y2 = Math.floor(
			target.offsetTop + target.offsetHeight / 2 - container.getBoundingClientRect().y
		);
	}
	$: sourceObj = { source: [x1, y1], target: [x2, y2] };
	$: d = generateXcurve(sourceObj);
</script>

<svelte:head
	><link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Luckiest+Guy" />
</svelte:head>

<span class="svg-container" bind:this={container}>
	<svg bind:this={svg} {width} {height}>
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
		{#if x1 && y2}
			<g stroke="red" stroke-opacity="0.9">
				<path
					{d}
					id="path1"
					stroke-width={strokeWidth}
					stroke={strokeColor}
					fill="none"
					stroke-linecap="round"
					marker-mid="url(#triangle)"
					style=""
				/>
			</g>
		{/if}
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
	@font-face {
		font-family: arrows;
		/* src: url(arrows.woff); */
	}
</style>
