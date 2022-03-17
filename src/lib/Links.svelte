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

	const showCoords = (link) => `[${link.source.id}] to [${link.target.id}]`;

	function genPath(link) {
		let sourceEl = document.getElementById(link.source.id);
		let targetEl = document.getElementById(link.target.id);

		// centered
		let sourceX = sourceEl?.offsetLeft + sourceEl.offsetWidth / 2;
		let sourceY = sourceEl?.offsetTop + sourceEl.offsetHeight / 2;
		let targetX = targetEl?.offsetLeft + targetEl.offsetWidth / 2;
		let targetY = targetEl?.offsetTop + targetEl.offsetHeight / 2;

		let d = generateXcurve({
			source: [sourceX, sourceY],
			target: [targetX, targetY]
		});

		return d;
	}
</script>

<svelte:head
	><link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Luckiest+Guy" />
</svelte:head>

{#if mounted}
	<div class="svg-container">
		<svg>
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
				{#if link && mounted}
					<g stroke="green" stroke-opacity="0.1">
						<path
							d={genPath(link)}
							id="link_{i}"
							stroke-width={strokeWidth}
							stroke={strokeColor}
							fill="none"
							stroke-linecap="round"
							marker-mid="url(#triangle)"
							stroke-opacity=".4"
							style=""
						/>
						<text>
							<textPath xlink:href="#link_{i}" startOffset={'40%'}>
								<tspan fill="black">{showCoords(link)}</tspan>
							</textPath>
							<textPath xlink:href="#link_{i}" {startOffset} fill={arrowColor}>➤</textPath>
						</text>
					</g>
				{/if}
			{/each}
		</svg>
	</div>
{/if}

<style>
	.svg-container {
		/* position: relative;
		top: 0;
		left: 0; */
		width: 100%;
		height: 100%;
	}
	svg {
		position: absolute;
		top: 0;
		left: 0;
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
