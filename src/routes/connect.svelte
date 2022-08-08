<script>
	import Box from '$demo/Box.svelte';
</script>

<div class="flex flex-row">
	<!-- // two rows -->
	<div class="flex flex-col">
		<!-- more rows -->
		<div class="flex-1">
			<!-- more rows -->
			<Box>1</Box>
		</div>
		<div class="flex-1">
			<!-- more rows -->
			<Box>2</Box>
		</div>
	</div>
	<!-- // one column -->
	<div class="flex flex-col">
		<!-- more rows -->
		<div class="flex-1">
			<!-- more rows -->
			<Box>A</Box>
		</div>
		<div class="flex-1">
			<!-- more rows -->
			<Box>B</Box>
		</div>
	</div>
</div>
