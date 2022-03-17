// heavily inspired by svelte-dnd-action
// https://github.com/isaacHagoel/svelte-dnd-action/blob/master/src/pointerAction.js

import { styleActiveDropZones, styleInactiveDropZones } from './styler';

const MIN_MOVEMENT_BEFORE_DRAG_START_PX = 3;
const DEFAULT_DROP_TARGET_STYLE = {
	outline: 'rgba(255, 255, 102, 0.7) solid 2px'
};

let currentMousePosition;
let dragStartMousePosition;
let originalDragTarget;
let isWorkingOnPreviousDrag = false;
let finalizingPreviousDrag = false;

let originDropZone;
const DEFAULT_DROP_ZONE_TYPE = '--any--';

// a map from type to a set of drop-zones
const typeToDropZones = new Map();

const printDebug = (generateMessage, logFunction = console.debug) => {
	const message = generateMessage();
	if (Array.isArray(message)) {
		logFunction(...message);
	} else {
		logFunction(message);
	}
};

/* drop-zones registration management */
function registerDropZone(dropZoneEl, type) {
	printDebug(() => 'registering drop-zone if absent');
	if (!typeToDropZones.has(type)) {
		typeToDropZones.set(type, new Set());
	}
	if (!typeToDropZones.get(type).has(dropZoneEl)) {
		typeToDropZones.get(type).add(dropZoneEl);
		incrementActiveDropZoneCount();
	}
}

function unregisterDropZone(dropZoneEl, type) {
	typeToDropZones.get(type).delete(dropZoneEl);
	decrementActiveDropZoneCount();
	if (typeToDropZones.get(type).size === 0) {
		typeToDropZones.delete(type);
	}
}

export function connectable(node, options) {
	let initialized = false;
	const config = {
		items: undefined,
		type: undefined,
		flipDurationMs: 0,
		dragDisabled: false,
		morphDisabled: false,
		dropFromOthersDisabled: false,
		dropTargetStyle: DEFAULT_DROP_TARGET_STYLE,
		dropTargetClasses: [],
		transformDraggedElement: () => {},
		centreDraggedOnCursor: false
	};

	/* events fired on the draggable target */
	node.addEventListener('mousedown', handleMouseDown);
	node.addEventListener('touchstart', handleMouseDown);

	function handleMouseDown(e) {
		// on safari clicking on a select element doesn't fire mouseup at the end of the click and in general this makes more sense
		if (
			e.target !== e.currentTarget &&
			(e.target.value !== undefined || e.target.isContentEditable)
		) {
			printDebug(() => "won't initiate drag on a nested input element");
			return;
		}
		// prevents responding to any button but left click which equals 0 (which is falsy)
		if (e.button) {
			printDebug(() => `ignoring none left click button: ${e.button}`);
			return;
		}

		e.stopPropagation();
		const c = e.touches ? e.touches[0] : e;
		dragStartMousePosition = { x: c.clientX, y: c.clientY };
		currentMousePosition = { ...dragStartMousePosition };
		originalDragTarget = e.currentTarget;
		addMaybeListeners();
	}

	function addMaybeListeners() {
		window.addEventListener('mousemove', handleMouseMoveMaybeDragStart, { passive: false });
		window.addEventListener('touchmove', handleMouseMoveMaybeDragStart, {
			passive: false,
			capture: false
		});
		window.addEventListener('mouseup', handleFalseAlarm, { passive: false });
		window.addEventListener('touchend', handleFalseAlarm, { passive: false });
	}

	function removeMaybeListeners() {
		window.removeEventListener('mousemove', handleMouseMoveMaybeDragStart);
		window.removeEventListener('touchmove', handleMouseMoveMaybeDragStart);
		window.removeEventListener('mouseup', handleFalseAlarm);
		window.removeEventListener('touchend', handleFalseAlarm);
	}

	function handleFalseAlarm() {
		removeMaybeListeners();
		originalDragTarget = undefined;
		dragStartMousePosition = undefined;
		currentMousePosition = undefined;
	}

	function handleMouseMoveMaybeDragStart(e) {
		e.preventDefault();
		const c = e.touches ? e.touches[0] : e;
		currentMousePosition = { x: c.clientX, y: c.clientY };
		if (
			Math.abs(currentMousePosition.x - dragStartMousePosition.x) >=
				MIN_MOVEMENT_BEFORE_DRAG_START_PX ||
			Math.abs(currentMousePosition.y - dragStartMousePosition.y) >=
				MIN_MOVEMENT_BEFORE_DRAG_START_PX
		) {
			removeMaybeListeners();
			handleDragStart();
		}
	}

	function handleDragStart() {
		isWorkingOnPreviousDrag = true;

		// initialising globals
		originDropZone = originalDragTarget.parentElement;
		/** @type {ShadowRoot | HTMLDocument} */
		const rootNode = originDropZone.getRootNode();
		const originDropZoneRoot = rootNode.body || rootNode;

		// styleActiveDropZones(
		// 	Array.from(typeToDropZones.get(config.type)).filter(
		// 		(dz) => dz === originDropZone || !dzToConfig.get(dz).dropFromOthersDisabled
		// 	),
		// 	(dz) => dzToConfig.get(dz).dropTargetStyle,
		// 	(dz) => dzToConfig.get(dz).dropTargetClasses
		// );

		// dispatchConsiderEvent(originDropZone, items, {
		// 	trigger: TRIGGERS.DRAG_STARTED,
		// 	id: draggedElData[ITEM_ID_KEY],
		// 	source: SOURCES.POINTER
		// });

		// handing over to global handlers - starting to watch the element
		window.addEventListener('mousemove', handleMouseMove, { passive: false });
		window.addEventListener('touchmove', handleMouseMove, { passive: false, capture: false });
		window.addEventListener('mouseup', handleDrop, { passive: false });
		window.addEventListener('touchend', handleDrop, { passive: false });
	}

	// Global mouse/touch-events handlers
	function handleMouseMove(e) {
		e.preventDefault();
		const c = e.touches ? e.touches[0] : e;
		currentMousePosition = { x: c.clientX, y: c.clientY };

		node.dispatchEvent(
			new CustomEvent('connecting', {
				detail: { node, ...currentMousePosition }
			})
		);
	}

	function handleDrop(event) {
		console.log('dropped ');
		finalizingPreviousDrag = true;
		// cleanup
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('touchmove', handleMouseMove);
		window.removeEventListener('mouseup', handleDrop);
		window.removeEventListener('touchend', handleDrop);

		// get drop area element target, the target over which the touch event ended/mouseup

		// const c = event.touches ? event.touches[0] : event;
		const lifted = event.changedTouches;

		let target = lifted
			? document.elementFromPoint(lifted[0].clientX, lifted[0].clientY)
			: event.target;

		node.dispatchEvent(
			new CustomEvent('connected', {
				detail: { target } // passes a non updating copy up
			})
		);
	}

	return {
		destroy() {}
	};
}
