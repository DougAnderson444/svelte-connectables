<script>
	let resizableDiv;

	export let node;
	export let resizable = true;

	// @ts-ignore
	let width = node.width || resizableDiv?.parentNode?.offsetWidth || 100;
	// @ts-ignore
	let height = node.height || resizableDiv?.parentNode?.offsetheight || 100;

	$: node.width = newSize.width;
	$: node.height = newSize.height;

	let newSize = { width, height };
	let initSize = { width: 0, height: 0 };
	let resizeInitPos = { x: 0, y: 0 };

	let active = false; // resize active or not

	const resizePointerDown = (e) => {
		e.stopPropagation();
		const { pageX, pageY } = e;

		resizeInitPos = { x: pageX, y: pageY };
		initSize = { width, height };
		newSize = { width, height };

		active = true;

		window.addEventListener('pointermove', resizePointerMove);
		window.addEventListener('pointerup', resizePointerUp);
	};

	const resizePointerMove = ({ pageX, pageY }) => {
		newSize.width = initSize.width + pageX - resizeInitPos.x;
		newSize.height = initSize.height + pageY - resizeInitPos.y;
	};

	const resizePointerUp = (e) => {
		e.stopPropagation();

		width = newSize.width;
		height = newSize.height;

		active = false;

		window.removeEventListener('pointermove', resizePointerMove);
		window.removeEventListener('pointerup', resizePointerUp);
	};
</script>

<div
	class="resizable"
	bind:this={resizableDiv}
	style="width: {active ? newSize.width : width}px; height:{active ? newSize.height : height}px;"
>
	<slot />
	{#if resizable}
		<div class="svlt-grid-resizer" on:pointerdown={resizePointerDown} />
	{/if}
</div>

<style>
	.resizable {
		width: 100%;
		height: 100%;
	}
	.svlt-grid-resizer {
		user-select: none;
		width: 20px;
		height: 20px;
		position: absolute;
		right: 0;
		bottom: 0;
		cursor: se-resize;
	}
	.svlt-grid-resizer::after {
		content: '';
		position: absolute;
		right: 5px;
		bottom: 5px;
		width: 10px;
		height: 10px;
		border-right: 2px solid rgba(0, 0, 0, 0.4);
		border-bottom: 2px solid rgba(0, 0, 0, 0.4);
	}
</style>
