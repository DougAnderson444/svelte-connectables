var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import { SvelteComponent, init, safe_not_equal, svg_element, claim_svg_element, children, detach, attr, insert_hydration, append_hydration, element, space, text, query_selector_all, claim_element, claim_space, claim_text, xlink_attr, noop, link, bumpX, onMount, binding_callbacks, action_destroyer, listen, run_all, empty, createEventDispatcher, create_slot, set_style, update_slot_base, get_all_dirty_from_scope, get_slot_changes, transition_in, transition_out, create_component, claim_component, mount_component, destroy_component, group_outros, check_outros, bind, add_flush_callback, set_data, destroy_each, globals, update_keyed_each, outro_and_destroy_block } from "../chunks/vendor-60f50316.js";
import { __vitePreload } from "../chunks/preload-helper-8499f0b6.js";
const MIN_MOVEMENT_BEFORE_DRAG_START_PX = 3;
let currentMousePosition;
let dragStartMousePosition;
let originalDragTarget;
let originDropZone;
const printDebug = (generateMessage, logFunction = console.debug) => {
  const message = generateMessage();
  if (Array.isArray(message)) {
    logFunction(...message);
  } else {
    logFunction(message);
  }
};
function connectable(node, options) {
  node.addEventListener("mousedown", handleMouseDown);
  node.addEventListener("touchstart", handleMouseDown);
  function handleMouseDown(e) {
    if (e.target !== e.currentTarget && (e.target.value !== void 0 || e.target.isContentEditable)) {
      printDebug(() => "won't initiate drag on a nested input element");
      return;
    }
    if (e.button) {
      printDebug(() => `ignoring none left click button: ${e.button}`);
      return;
    }
    if (Array.from(e.target.classList).includes("svlt-grid-resizer")) {
      printDebug(() => `Don't connect while resizing`);
      return;
    }
    e.stopPropagation();
    const c = e.touches ? e.touches[0] : e;
    dragStartMousePosition = { x: c.clientX, y: c.clientY };
    currentMousePosition = __spreadValues({}, dragStartMousePosition);
    originalDragTarget = e.currentTarget;
    addMaybeListeners();
  }
  function addMaybeListeners() {
    window.addEventListener("mousemove", handleMouseMoveMaybeDragStart, { passive: false });
    window.addEventListener("touchmove", handleMouseMoveMaybeDragStart, {
      passive: false,
      capture: false
    });
    window.addEventListener("mouseup", handleFalseAlarm, { passive: false });
    window.addEventListener("touchend", handleFalseAlarm, { passive: false });
  }
  function removeMaybeListeners() {
    window.removeEventListener("mousemove", handleMouseMoveMaybeDragStart);
    window.removeEventListener("touchmove", handleMouseMoveMaybeDragStart);
    window.removeEventListener("mouseup", handleFalseAlarm);
    window.removeEventListener("touchend", handleFalseAlarm);
  }
  function handleFalseAlarm() {
    removeMaybeListeners();
    originalDragTarget = void 0;
    dragStartMousePosition = void 0;
    currentMousePosition = void 0;
  }
  function handleMouseMoveMaybeDragStart(e) {
    e.preventDefault();
    const c = e.touches ? e.touches[0] : e;
    currentMousePosition = { x: c.clientX, y: c.clientY };
    if (Math.abs(currentMousePosition.x - dragStartMousePosition.x) >= MIN_MOVEMENT_BEFORE_DRAG_START_PX || Math.abs(currentMousePosition.y - dragStartMousePosition.y) >= MIN_MOVEMENT_BEFORE_DRAG_START_PX) {
      removeMaybeListeners();
      handleDragStart();
    }
  }
  function handleDragStart() {
    originDropZone = originalDragTarget.parentElement;
    const rootNode = originDropZone.getRootNode();
    rootNode.body || rootNode;
    window.addEventListener("mousemove", handleMouseMove, { passive: false });
    window.addEventListener("touchmove", handleMouseMove, { passive: false, capture: false });
    window.addEventListener("mouseup", handleDrop, { passive: false });
    window.addEventListener("touchend", handleDrop, { passive: false });
  }
  function handleMouseMove(e) {
    e.preventDefault();
    const c = e.touches ? e.touches[0] : e;
    currentMousePosition = { x: c.clientX, y: c.clientY };
    node.dispatchEvent(new CustomEvent("connecting", {
      detail: __spreadValues({ node }, currentMousePosition)
    }));
  }
  function handleDrop(event) {
    console.log("dropped ");
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("touchmove", handleMouseMove);
    window.removeEventListener("mouseup", handleDrop);
    window.removeEventListener("touchend", handleDrop);
    const lifted = event.changedTouches;
    let target = lifted ? document.elementFromPoint(lifted[0].clientX, lifted[0].clientY) : event.target;
    node.dispatchEvent(new CustomEvent("connected", {
      detail: { target }
    }));
  }
  return {
    destroy() {
    }
  };
}
var Link_svelte_svelte_type_style_lang = "";
function create_if_block$6(ctx) {
  let g;
  let path;
  return {
    c() {
      g = svg_element("g");
      path = svg_element("path");
      this.h();
    },
    l(nodes) {
      g = claim_svg_element(nodes, "g", { stroke: true, "stroke-opacity": true });
      var g_nodes = children(g);
      path = claim_svg_element(g_nodes, "path", {
        d: true,
        id: true,
        "stroke-width": true,
        stroke: true,
        fill: true,
        "stroke-linecap": true,
        "marker-mid": true,
        style: true
      });
      children(path).forEach(detach);
      g_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(path, "d", ctx[10]);
      attr(path, "id", "path1");
      attr(path, "stroke-width", ctx[3]);
      attr(path, "stroke", ctx[2]);
      attr(path, "fill", "none");
      attr(path, "stroke-linecap", "round");
      attr(path, "marker-mid", "url(#triangle)");
      attr(path, "style", "");
      attr(g, "stroke", "red");
      attr(g, "stroke-opacity", "0.9");
    },
    m(target, anchor) {
      insert_hydration(target, g, anchor);
      append_hydration(g, path);
    },
    p(ctx2, dirty) {
      if (dirty & 1024) {
        attr(path, "d", ctx2[10]);
      }
      if (dirty & 8) {
        attr(path, "stroke-width", ctx2[3]);
      }
      if (dirty & 4) {
        attr(path, "stroke", ctx2[2]);
      }
    },
    d(detaching) {
      if (detaching)
        detach(g);
    }
  };
}
function create_fragment$6(ctx) {
  let link_1;
  let t0;
  let span;
  let svg_1;
  let defs;
  let marker;
  let path;
  let text_1;
  let textPath0;
  let tspan;
  let t1;
  let t2;
  let textPath1;
  let t3;
  let if_block = ctx[7] && ctx[8] && create_if_block$6(ctx);
  return {
    c() {
      link_1 = element("link");
      t0 = space();
      span = element("span");
      svg_1 = svg_element("svg");
      defs = svg_element("defs");
      marker = svg_element("marker");
      path = svg_element("path");
      if (if_block)
        if_block.c();
      text_1 = svg_element("text");
      textPath0 = svg_element("textPath");
      tspan = svg_element("tspan");
      t1 = text("Curvy Connector");
      t2 = space();
      textPath1 = svg_element("textPath");
      t3 = text("\u27A4");
      this.h();
    },
    l(nodes) {
      const head_nodes = query_selector_all('[data-svelte="svelte-1y2tnph"]', document.head);
      link_1 = claim_element(head_nodes, "LINK", { rel: true, type: true, href: true });
      head_nodes.forEach(detach);
      t0 = claim_space(nodes);
      span = claim_element(nodes, "SPAN", { class: true });
      var span_nodes = children(span);
      svg_1 = claim_svg_element(span_nodes, "svg", { width: true, height: true, class: true });
      var svg_1_nodes = children(svg_1);
      defs = claim_svg_element(svg_1_nodes, "defs", {});
      var defs_nodes = children(defs);
      marker = claim_svg_element(defs_nodes, "marker", {
        id: true,
        viewBox: true,
        refX: true,
        refY: true,
        markerUnits: true,
        markerWidth: true,
        markerHeight: true,
        orient: true
      });
      var marker_nodes = children(marker);
      path = claim_svg_element(marker_nodes, "path", { d: true, fill: true });
      children(path).forEach(detach);
      marker_nodes.forEach(detach);
      defs_nodes.forEach(detach);
      if (if_block)
        if_block.l(svg_1_nodes);
      text_1 = claim_svg_element(svg_1_nodes, "text", { class: true });
      var text_1_nodes = children(text_1);
      textPath0 = claim_svg_element(text_1_nodes, "textPath", { "xlink:href": true, startOffset: true });
      var textPath0_nodes = children(textPath0);
      tspan = claim_svg_element(textPath0_nodes, "tspan", { fill: true, class: true });
      var tspan_nodes = children(tspan);
      t1 = claim_text(tspan_nodes, "Curvy Connector");
      tspan_nodes.forEach(detach);
      t2 = claim_space(textPath0_nodes);
      textPath0_nodes.forEach(detach);
      textPath1 = claim_svg_element(text_1_nodes, "textPath", {
        "xlink:href": true,
        startOffset: true,
        fill: true
      });
      var textPath1_nodes = children(textPath1);
      t3 = claim_text(textPath1_nodes, "\u27A4");
      textPath1_nodes.forEach(detach);
      text_1_nodes.forEach(detach);
      svg_1_nodes.forEach(detach);
      span_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(link_1, "rel", "stylesheet");
      attr(link_1, "type", "text/css");
      attr(link_1, "href", "//fonts.googleapis.com/css?family=Luckiest+Guy");
      attr(path, "d", "M 0 0 L 10 5 L 0 10 z");
      attr(path, "fill", "context-stroke");
      attr(marker, "id", "triangle");
      attr(marker, "viewBox", "0 0 10 10");
      attr(marker, "refX", "1");
      attr(marker, "refY", "5");
      attr(marker, "markerUnits", "strokeWidth");
      attr(marker, "markerWidth", "4");
      attr(marker, "markerHeight", "3");
      attr(marker, "orient", "auto");
      attr(tspan, "fill", "black");
      attr(tspan, "class", "svelte-1ltangd");
      xlink_attr(textPath0, "xlink:href", "#path1");
      attr(textPath0, "startOffset", "20%");
      xlink_attr(textPath1, "xlink:href", "#path1");
      attr(textPath1, "startOffset", ctx[5]);
      attr(textPath1, "fill", ctx[4]);
      attr(text_1, "class", "svelte-1ltangd");
      attr(svg_1, "width", ctx[0]);
      attr(svg_1, "height", ctx[1]);
      attr(svg_1, "class", "svelte-1ltangd");
      attr(span, "class", "svg-container svelte-1ltangd");
    },
    m(target, anchor) {
      append_hydration(document.head, link_1);
      insert_hydration(target, t0, anchor);
      insert_hydration(target, span, anchor);
      append_hydration(span, svg_1);
      append_hydration(svg_1, defs);
      append_hydration(defs, marker);
      append_hydration(marker, path);
      if (if_block)
        if_block.m(svg_1, null);
      append_hydration(svg_1, text_1);
      append_hydration(text_1, textPath0);
      append_hydration(textPath0, tspan);
      append_hydration(tspan, t1);
      append_hydration(textPath0, t2);
      append_hydration(text_1, textPath1);
      append_hydration(textPath1, t3);
      ctx[17](svg_1);
      ctx[18](span);
    },
    p(ctx2, [dirty]) {
      if (ctx2[7] && ctx2[8]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block$6(ctx2);
          if_block.c();
          if_block.m(svg_1, text_1);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      if (dirty & 32) {
        attr(textPath1, "startOffset", ctx2[5]);
      }
      if (dirty & 16) {
        attr(textPath1, "fill", ctx2[4]);
      }
      if (dirty & 1) {
        attr(svg_1, "width", ctx2[0]);
      }
      if (dirty & 2) {
        attr(svg_1, "height", ctx2[1]);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      detach(link_1);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(span);
      if (if_block)
        if_block.d();
      ctx[17](null);
      ctx[18](null);
    }
  };
}
function instance$6($$self, $$props, $$invalidate) {
  let sourceObj;
  let d;
  let { target } = $$props;
  let { source } = $$props;
  let { width = 500 } = $$props;
  let { height = 500 } = $$props;
  let { strokeColor = "green" } = $$props;
  let { strokeWidth = 3 } = $$props;
  let { arrowColor = "green" } = $$props;
  let { startOffset = "60%" } = $$props;
  let container;
  const generateXcurve = link(bumpX);
  let svg, mounted;
  let x1, x2, y1, y2;
  onMount(() => {
    $$invalidate(13, mounted = true);
  });
  function svg_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      svg = $$value;
      $$invalidate(9, svg);
    });
  }
  function span_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      container = $$value;
      $$invalidate(6, container);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("target" in $$props2)
      $$invalidate(11, target = $$props2.target);
    if ("source" in $$props2)
      $$invalidate(12, source = $$props2.source);
    if ("width" in $$props2)
      $$invalidate(0, width = $$props2.width);
    if ("height" in $$props2)
      $$invalidate(1, height = $$props2.height);
    if ("strokeColor" in $$props2)
      $$invalidate(2, strokeColor = $$props2.strokeColor);
    if ("strokeWidth" in $$props2)
      $$invalidate(3, strokeWidth = $$props2.strokeWidth);
    if ("arrowColor" in $$props2)
      $$invalidate(4, arrowColor = $$props2.arrowColor);
    if ("startOffset" in $$props2)
      $$invalidate(5, startOffset = $$props2.startOffset);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 12288) {
      if (mounted) {
        $$invalidate(7, x1 = Math.floor(source.offsetLeft + source.clientWidth / 2));
      }
    }
    if ($$self.$$.dirty & 12288) {
      if (mounted) {
        $$invalidate(15, y1 = Math.floor(source.offsetTop + source.clientHeight / 2));
      }
    }
    if ($$self.$$.dirty & 10304) {
      if (mounted) {
        $$invalidate(14, x2 = Math.floor(target.offsetLeft + target.offsetWidth / 2 - container.getBoundingClientRect().x));
      }
    }
    if ($$self.$$.dirty & 10304) {
      if (mounted && container) {
        $$invalidate(8, y2 = Math.floor(target.offsetTop + target.offsetHeight / 2 - container.getBoundingClientRect().y));
      }
    }
    if ($$self.$$.dirty & 49536) {
      $$invalidate(16, sourceObj = { source: [x1, y1], target: [x2, y2] });
    }
    if ($$self.$$.dirty & 65536) {
      $$invalidate(10, d = generateXcurve(sourceObj));
    }
  };
  return [
    width,
    height,
    strokeColor,
    strokeWidth,
    arrowColor,
    startOffset,
    container,
    x1,
    y2,
    svg,
    d,
    target,
    source,
    mounted,
    x2,
    y1,
    sourceObj,
    svg_1_binding,
    span_binding
  ];
}
class Link extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$6, create_fragment$6, safe_not_equal, {
      target: 11,
      source: 12,
      width: 0,
      height: 1,
      strokeColor: 2,
      strokeWidth: 3,
      arrowColor: 4,
      startOffset: 5
    });
  }
}
var PanHandle_svelte_svelte_type_style_lang = "";
function create_if_block$5(ctx) {
  let div;
  let svg;
  let defs;
  let path;
  let pannable_action;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      svg = svg_element("svg");
      defs = svg_element("defs");
      path = svg_element("path");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      svg = claim_svg_element(div_nodes, "svg", {
        width: true,
        height: true,
        xmlns: true,
        "aria-hidden": true,
        class: true,
        "data-icon": true,
        "data-prefix": true,
        viewBox: true
      });
      var svg_nodes = children(svg);
      defs = claim_svg_element(svg_nodes, "defs", {});
      children(defs).forEach(detach);
      path = claim_svg_element(svg_nodes, "path", { fill: true, d: true });
      children(path).forEach(detach);
      svg_nodes.forEach(detach);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(path, "fill", "currentColor");
      attr(path, "d", "M352 426l-79 79c-9 9-25 9-34 0l-79-79c-15-15-5-41 17-41h51V284H127v51c0 22-26 32-41 17L7 273c-9-9-9-25 0-34l79-79c15-15 41-5 41 17v51h101V127h-51c-22 0-32-26-17-41l79-79c9-9 25-9 34 0l79 79c15 15 5 41-17 41h-51v101h101v-51c0-22 26-32 41-17l79 79c9 9 9 25 0 34l-79 79c-15 15-41 5-41-17v-51H284v101h51c22 0 32 26 17 41z");
      attr(svg, "width", "20");
      attr(svg, "height", "20");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "aria-hidden", "true");
      attr(svg, "class", "svg-inline--fa fa-arrows-alt fa-w-16");
      attr(svg, "data-icon", "arrows-alt");
      attr(svg, "data-prefix", "fas");
      attr(svg, "viewBox", "0 0 512 512");
      attr(div, "class", "dragger svelte-1f6p2jn");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, svg);
      append_hydration(svg, defs);
      append_hydration(svg, path);
      if (!mounted) {
        dispose = [
          action_destroyer(pannable_action = ctx[0].call(null, div)),
          listen(div, "panmove", ctx[2]),
          listen(div, "panend", ctx[3]),
          listen(div, "panstart", ctx[1])
        ];
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(div);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment$5(ctx) {
  let if_block_anchor;
  let if_block = ctx[0] && create_if_block$5(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
    },
    p(ctx2, [dirty]) {
      if (ctx2[0]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block$5(ctx2);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function instance$5($$self, $$props, $$invalidate) {
  let { node } = $$props;
  let { mouseMoving = false } = $$props;
  const dispatch = createEventDispatcher();
  let pannable;
  onMount(async () => {
    $$invalidate(0, { pannable } = await __vitePreload(() => import("../chunks/pannable-7c755652.js"), true ? [] : void 0), pannable);
  });
  function handlePanStart(event) {
    $$invalidate(5, mouseMoving = true);
    dispatch("resimulate", "resimulate");
  }
  function handlePanMove(event) {
    $$invalidate(5, mouseMoving = true);
    $$invalidate(4, node.x = node.x + event.detail.dx, node);
    $$invalidate(4, node.y = node.y + event.detail.dy, node);
    $$invalidate(4, node);
  }
  function handlePanEnd(event) {
    $$invalidate(5, mouseMoving = false);
    $$invalidate(4, node);
    dispatch("resimulate", "resimulate");
  }
  $$self.$$set = ($$props2) => {
    if ("node" in $$props2)
      $$invalidate(4, node = $$props2.node);
    if ("mouseMoving" in $$props2)
      $$invalidate(5, mouseMoving = $$props2.mouseMoving);
  };
  return [pannable, handlePanStart, handlePanMove, handlePanEnd, node, mouseMoving];
}
class PanHandle extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$5, create_fragment$5, safe_not_equal, { node: 4, mouseMoving: 5 });
  }
}
var Resizable_svelte_svelte_type_style_lang = "";
function create_if_block$4(ctx) {
  let div;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      children(div).forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "svlt-grid-resizer svelte-1r2mzl3");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (!mounted) {
        dispose = listen(div, "pointerdown", ctx[6]);
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(div);
      mounted = false;
      dispose();
    }
  };
}
function create_fragment$4(ctx) {
  let div;
  let t;
  let current;
  const default_slot_template = ctx[9].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[8], null);
  let if_block = ctx[0] && create_if_block$4(ctx);
  return {
    c() {
      div = element("div");
      if (default_slot)
        default_slot.c();
      t = space();
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true, style: true });
      var div_nodes = children(div);
      if (default_slot)
        default_slot.l(div_nodes);
      t = claim_space(div_nodes);
      if (if_block)
        if_block.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "resizable svelte-1r2mzl3");
      set_style(div, "width", (ctx[5] ? ctx[1].width : ctx[3]) + "px");
      set_style(div, "height", (ctx[5] ? ctx[1].height : ctx[4]) + "px");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (default_slot) {
        default_slot.m(div, null);
      }
      append_hydration(div, t);
      if (if_block)
        if_block.m(div, null);
      ctx[10](div);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 256)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[8], !current ? get_all_dirty_from_scope(ctx2[8]) : get_slot_changes(default_slot_template, ctx2[8], dirty, null), null);
        }
      }
      if (ctx2[0]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block$4(ctx2);
          if_block.c();
          if_block.m(div, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      if (!current || dirty & 42) {
        set_style(div, "width", (ctx2[5] ? ctx2[1].width : ctx2[3]) + "px");
      }
      if (!current || dirty & 50) {
        set_style(div, "height", (ctx2[5] ? ctx2[1].height : ctx2[4]) + "px");
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (default_slot)
        default_slot.d(detaching);
      if (if_block)
        if_block.d();
      ctx[10](null);
    }
  };
}
function instance$4($$self, $$props, $$invalidate) {
  var _a, _b;
  let { $$slots: slots = {}, $$scope } = $$props;
  let resizableDiv;
  let { node } = $$props;
  let { resizable = true } = $$props;
  let width = node.width || ((_a = resizableDiv == null ? void 0 : resizableDiv.parentNode) == null ? void 0 : _a.offsetWidth) || 100;
  let height = node.height || ((_b = resizableDiv == null ? void 0 : resizableDiv.parentNode) == null ? void 0 : _b.offsetheight) || 100;
  let newSize = { width, height };
  let initSize = { width: 0, height: 0 };
  let resizeInitPos = { x: 0, y: 0 };
  let active = false;
  const resizePointerDown = (e) => {
    e.stopPropagation();
    const { pageX, pageY } = e;
    resizeInitPos = { x: pageX, y: pageY };
    initSize = { width, height };
    $$invalidate(1, newSize = { width, height });
    $$invalidate(5, active = true);
    window.addEventListener("pointermove", resizePointerMove);
    window.addEventListener("pointerup", resizePointerUp);
  };
  const resizePointerMove = ({ pageX, pageY }) => {
    $$invalidate(1, newSize.width = initSize.width + pageX - resizeInitPos.x, newSize);
    $$invalidate(1, newSize.height = initSize.height + pageY - resizeInitPos.y, newSize);
  };
  const resizePointerUp = (e) => {
    e.stopPropagation();
    $$invalidate(3, width = newSize.width);
    $$invalidate(4, height = newSize.height);
    $$invalidate(5, active = false);
    window.removeEventListener("pointermove", resizePointerMove);
    window.removeEventListener("pointerup", resizePointerUp);
  };
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      resizableDiv = $$value;
      $$invalidate(2, resizableDiv);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("node" in $$props2)
      $$invalidate(7, node = $$props2.node);
    if ("resizable" in $$props2)
      $$invalidate(0, resizable = $$props2.resizable);
    if ("$$scope" in $$props2)
      $$invalidate(8, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 2) {
      $$invalidate(7, node.width = newSize.width, node);
    }
    if ($$self.$$.dirty & 2) {
      $$invalidate(7, node.height = newSize.height, node);
    }
  };
  return [
    resizable,
    newSize,
    resizableDiv,
    width,
    height,
    active,
    resizePointerDown,
    node,
    $$scope,
    slots,
    div_binding
  ];
}
class Resizable extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$4, safe_not_equal, { node: 7, resizable: 0 });
  }
}
var Connectable_svelte_svelte_type_style_lang = "";
function create_if_block_3(ctx) {
  let panhandle_1;
  let updating_node;
  let t;
  let current;
  function panhandle_1_node_binding_1(value) {
    ctx[14](value);
  }
  let panhandle_1_props = {};
  if (ctx[0] !== void 0) {
    panhandle_1_props.node = ctx[0];
  }
  panhandle_1 = new PanHandle({ props: panhandle_1_props });
  binding_callbacks.push(() => bind(panhandle_1, "node", panhandle_1_node_binding_1));
  const default_slot_template = ctx[11].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[15], null);
  return {
    c() {
      create_component(panhandle_1.$$.fragment);
      t = space();
      if (default_slot)
        default_slot.c();
    },
    l(nodes) {
      claim_component(panhandle_1.$$.fragment, nodes);
      t = claim_space(nodes);
      if (default_slot)
        default_slot.l(nodes);
    },
    m(target, anchor) {
      mount_component(panhandle_1, target, anchor);
      insert_hydration(target, t, anchor);
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      const panhandle_1_changes = {};
      if (!updating_node && dirty & 1) {
        updating_node = true;
        panhandle_1_changes.node = ctx2[0];
        add_flush_callback(() => updating_node = false);
      }
      panhandle_1.$set(panhandle_1_changes);
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 32768)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[15], !current ? get_all_dirty_from_scope(ctx2[15]) : get_slot_changes(default_slot_template, ctx2[15], dirty, null), null);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(panhandle_1.$$.fragment, local);
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(panhandle_1.$$.fragment, local);
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      destroy_component(panhandle_1, detaching);
      if (detaching)
        detach(t);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_if_block_1$2(ctx) {
  let resizable_1;
  let updating_node;
  let current;
  function resizable_1_node_binding(value) {
    ctx[13](value);
  }
  let resizable_1_props = {
    $$slots: { default: [create_default_slot$1] },
    $$scope: { ctx }
  };
  if (ctx[0] !== void 0) {
    resizable_1_props.node = ctx[0];
  }
  resizable_1 = new Resizable({ props: resizable_1_props });
  binding_callbacks.push(() => bind(resizable_1, "node", resizable_1_node_binding));
  return {
    c() {
      create_component(resizable_1.$$.fragment);
    },
    l(nodes) {
      claim_component(resizable_1.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(resizable_1, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const resizable_1_changes = {};
      if (dirty & 32773) {
        resizable_1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_node && dirty & 1) {
        updating_node = true;
        resizable_1_changes.node = ctx2[0];
        add_flush_callback(() => updating_node = false);
      }
      resizable_1.$set(resizable_1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(resizable_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(resizable_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(resizable_1, detaching);
    }
  };
}
function create_if_block_2(ctx) {
  let panhandle_1;
  let updating_node;
  let current;
  function panhandle_1_node_binding(value) {
    ctx[12](value);
  }
  let panhandle_1_props = {};
  if (ctx[0] !== void 0) {
    panhandle_1_props.node = ctx[0];
  }
  panhandle_1 = new PanHandle({ props: panhandle_1_props });
  binding_callbacks.push(() => bind(panhandle_1, "node", panhandle_1_node_binding));
  return {
    c() {
      create_component(panhandle_1.$$.fragment);
    },
    l(nodes) {
      claim_component(panhandle_1.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(panhandle_1, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const panhandle_1_changes = {};
      if (!updating_node && dirty & 1) {
        updating_node = true;
        panhandle_1_changes.node = ctx2[0];
        add_flush_callback(() => updating_node = false);
      }
      panhandle_1.$set(panhandle_1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(panhandle_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(panhandle_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(panhandle_1, detaching);
    }
  };
}
function create_default_slot$1(ctx) {
  let t;
  let current;
  let if_block = ctx[2] && create_if_block_2(ctx);
  const default_slot_template = ctx[11].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[15], null);
  return {
    c() {
      if (if_block)
        if_block.c();
      t = space();
      if (default_slot)
        default_slot.c();
    },
    l(nodes) {
      if (if_block)
        if_block.l(nodes);
      t = claim_space(nodes);
      if (default_slot)
        default_slot.l(nodes);
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, t, anchor);
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (ctx2[2]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 4) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_2(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(t.parentNode, t);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 32768)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[15], !current ? get_all_dirty_from_scope(ctx2[15]) : get_slot_changes(default_slot_template, ctx2[15], dirty, null), null);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(t);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_if_block$3(ctx) {
  let link2;
  let current;
  link2 = new Link({
    props: {
      source: ctx[3],
      target: ctx[4]
    }
  });
  return {
    c() {
      create_component(link2.$$.fragment);
    },
    l(nodes) {
      claim_component(link2.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(link2, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const link_changes = {};
      if (dirty & 8)
        link_changes.source = ctx2[3];
      if (dirty & 16)
        link_changes.target = ctx2[4];
      link2.$set(link_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(link2.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(link2.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(link2, detaching);
    }
  };
}
function create_fragment$3(ctx) {
  let div;
  let current_block_type_index;
  let if_block0;
  let div_id_value;
  let t;
  let if_block1_anchor;
  let current;
  let mounted;
  let dispose;
  const if_block_creators = [create_if_block_1$2, create_if_block_3];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (ctx2[1])
      return 0;
    if (ctx2[2])
      return 1;
    return -1;
  }
  if (~(current_block_type_index = select_block_type(ctx))) {
    if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  let if_block1 = ctx[5] && create_if_block$3(ctx);
  return {
    c() {
      div = element("div");
      if (if_block0)
        if_block0.c();
      t = space();
      if (if_block1)
        if_block1.c();
      if_block1_anchor = empty();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true, id: true, style: true });
      var div_nodes = children(div);
      if (if_block0)
        if_block0.l(div_nodes);
      div_nodes.forEach(detach);
      t = claim_space(nodes);
      if (if_block1)
        if_block1.l(nodes);
      if_block1_anchor = empty();
      this.h();
    },
    h() {
      attr(div, "class", "endpoint svelte-qscrqu");
      attr(div, "id", div_id_value = ctx[0].id);
      set_style(div, "left", ctx[7] + "px");
      set_style(div, "top", ctx[6] + "px");
      set_style(div, "width", ctx[0].width + "px");
      set_style(div, "height", ctx[0].height + "px");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(div, null);
      }
      insert_hydration(target, t, anchor);
      if (if_block1)
        if_block1.m(target, anchor);
      insert_hydration(target, if_block1_anchor, anchor);
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(connectable.call(null, div)),
          listen(div, "connecting", ctx[8]),
          listen(div, "connected", ctx[9])
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        }
      } else {
        if (if_block0) {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
        }
        if (~current_block_type_index) {
          if_block0 = if_blocks[current_block_type_index];
          if (!if_block0) {
            if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block0.c();
          } else {
            if_block0.p(ctx2, dirty);
          }
          transition_in(if_block0, 1);
          if_block0.m(div, null);
        } else {
          if_block0 = null;
        }
      }
      if (!current || dirty & 1 && div_id_value !== (div_id_value = ctx2[0].id)) {
        attr(div, "id", div_id_value);
      }
      if (!current || dirty & 128) {
        set_style(div, "left", ctx2[7] + "px");
      }
      if (!current || dirty & 64) {
        set_style(div, "top", ctx2[6] + "px");
      }
      if (!current || dirty & 1) {
        set_style(div, "width", ctx2[0].width + "px");
      }
      if (!current || dirty & 1) {
        set_style(div, "height", ctx2[0].height + "px");
      }
      if (ctx2[5]) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty & 32) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block$3(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d();
      }
      if (detaching)
        detach(t);
      if (if_block1)
        if_block1.d(detaching);
      if (detaching)
        detach(if_block1_anchor);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  let x;
  let y;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { node } = $$props;
  let { data } = $$props;
  let { resizable = true } = $$props;
  let { panhandle = true } = $$props;
  let source;
  let target;
  let connectingNow = false;
  function handleConnecting(event) {
    var _a, _b;
    $$invalidate(5, connectingNow = true);
    $$invalidate(3, source = event.detail.node);
    if (((_a = event.detail) == null ? void 0 : _a.x) !== (target == null ? void 0 : target.offsetLeft) && ((_b = event.detail) == null ? void 0 : _b.y) !== (target == null ? void 0 : target.offsetTop))
      $$invalidate(4, target = {
        offsetLeft: event.detail.x,
        offsetTop: event.detail.y,
        offsetWidth: 0,
        offsetHeight: 0
      });
  }
  function handleConnected(event) {
    $$invalidate(5, connectingNow = false);
    function getID(n) {
      if (n.id)
        return n.id;
      if (n.parentNode)
        return getID(n.parentNode);
      return false;
    }
    let id = getID(event.detail.target);
    if (!id || id == node.id)
      return;
    if (data.links.find((el) => el.source.id == node.id && el.target.id == id) !== void 0)
      return;
    $$invalidate(10, data.links = [...data.links, { source: { id: node.id }, target: { id } }], data);
  }
  function panhandle_1_node_binding(value) {
    node = value;
    $$invalidate(0, node);
  }
  function resizable_1_node_binding(value) {
    node = value;
    $$invalidate(0, node);
  }
  function panhandle_1_node_binding_1(value) {
    node = value;
    $$invalidate(0, node);
  }
  $$self.$$set = ($$props2) => {
    if ("node" in $$props2)
      $$invalidate(0, node = $$props2.node);
    if ("data" in $$props2)
      $$invalidate(10, data = $$props2.data);
    if ("resizable" in $$props2)
      $$invalidate(1, resizable = $$props2.resizable);
    if ("panhandle" in $$props2)
      $$invalidate(2, panhandle = $$props2.panhandle);
    if ("$$scope" in $$props2)
      $$invalidate(15, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 1) {
      $$invalidate(7, x = node.x);
    }
    if ($$self.$$.dirty & 1) {
      $$invalidate(6, y = node.y);
    }
  };
  return [
    node,
    resizable,
    panhandle,
    source,
    target,
    connectingNow,
    y,
    x,
    handleConnecting,
    handleConnected,
    data,
    slots,
    panhandle_1_node_binding,
    resizable_1_node_binding,
    panhandle_1_node_binding_1,
    $$scope
  ];
}
class Connectable extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, {
      node: 0,
      data: 10,
      resizable: 1,
      panhandle: 2
    });
  }
}
var Links_svelte_svelte_type_style_lang = "";
const { document: document_1 } = globals;
function get_each_context$2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[11] = list[i];
  child_ctx[13] = i;
  return child_ctx;
}
function create_if_block$2(ctx) {
  let div;
  let svg;
  let defs;
  let marker;
  let path;
  let each_value = ctx[0].links;
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
  }
  return {
    c() {
      div = element("div");
      svg = svg_element("svg");
      defs = svg_element("defs");
      marker = svg_element("marker");
      path = svg_element("path");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      svg = claim_svg_element(div_nodes, "svg", { class: true });
      var svg_nodes = children(svg);
      defs = claim_svg_element(svg_nodes, "defs", {});
      var defs_nodes = children(defs);
      marker = claim_svg_element(defs_nodes, "marker", {
        id: true,
        viewBox: true,
        refX: true,
        refY: true,
        markerUnits: true,
        markerWidth: true,
        markerHeight: true,
        orient: true
      });
      var marker_nodes = children(marker);
      path = claim_svg_element(marker_nodes, "path", { d: true, fill: true });
      children(path).forEach(detach);
      marker_nodes.forEach(detach);
      defs_nodes.forEach(detach);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(svg_nodes);
      }
      svg_nodes.forEach(detach);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(path, "d", "M 0 0 L 10 5 L 0 10 z");
      attr(path, "fill", "context-stroke");
      attr(marker, "id", "triangle");
      attr(marker, "viewBox", "0 0 10 10");
      attr(marker, "refX", "1");
      attr(marker, "refY", "5");
      attr(marker, "markerUnits", "strokeWidth");
      attr(marker, "markerWidth", "4");
      attr(marker, "markerHeight", "3");
      attr(marker, "orient", "auto");
      attr(svg, "class", "svelte-1ftngq1");
      attr(div, "class", "svg-container svelte-1ftngq1");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, svg);
      append_hydration(svg, defs);
      append_hydration(defs, marker);
      append_hydration(marker, path);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(svg, null);
      }
    },
    p(ctx2, dirty) {
      if (dirty & 255) {
        each_value = ctx2[0].links;
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$2(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$2(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(svg, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_if_block_1$1(ctx) {
  let g;
  let path;
  let path_d_value;
  let text_1;
  let textPath0;
  let tspan;
  let t0_value = ctx[6](ctx[11]) + "";
  let t0;
  let t1;
  let textPath0_xlink_href_value;
  let textPath0_startOffset_value;
  let textPath1;
  let t2;
  let textPath1_xlink_href_value;
  return {
    c() {
      g = svg_element("g");
      path = svg_element("path");
      text_1 = svg_element("text");
      textPath0 = svg_element("textPath");
      tspan = svg_element("tspan");
      t0 = text(t0_value);
      t1 = space();
      textPath1 = svg_element("textPath");
      t2 = text("\u27A4");
      this.h();
    },
    l(nodes) {
      g = claim_svg_element(nodes, "g", { stroke: true, "stroke-opacity": true });
      var g_nodes = children(g);
      path = claim_svg_element(g_nodes, "path", {
        d: true,
        id: true,
        "stroke-width": true,
        stroke: true,
        fill: true,
        "stroke-linecap": true,
        "marker-mid": true,
        "stroke-opacity": true,
        style: true
      });
      children(path).forEach(detach);
      text_1 = claim_svg_element(g_nodes, "text", { class: true });
      var text_1_nodes = children(text_1);
      textPath0 = claim_svg_element(text_1_nodes, "textPath", { "xlink:href": true, startOffset: true });
      var textPath0_nodes = children(textPath0);
      tspan = claim_svg_element(textPath0_nodes, "tspan", { fill: true, class: true });
      var tspan_nodes = children(tspan);
      t0 = claim_text(tspan_nodes, t0_value);
      tspan_nodes.forEach(detach);
      t1 = claim_space(textPath0_nodes);
      textPath0_nodes.forEach(detach);
      textPath1 = claim_svg_element(text_1_nodes, "textPath", {
        "xlink:href": true,
        startOffset: true,
        fill: true
      });
      var textPath1_nodes = children(textPath1);
      t2 = claim_text(textPath1_nodes, "\u27A4");
      textPath1_nodes.forEach(detach);
      text_1_nodes.forEach(detach);
      g_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(path, "d", path_d_value = ctx[7](ctx[11]));
      attr(path, "id", "link_" + ctx[13]);
      attr(path, "stroke-width", ctx[2]);
      attr(path, "stroke", ctx[1]);
      attr(path, "fill", "none");
      attr(path, "stroke-linecap", "round");
      attr(path, "marker-mid", "url(#triangle)");
      attr(path, "stroke-opacity", ".4");
      attr(path, "style", "");
      attr(tspan, "fill", "black");
      attr(tspan, "class", "svelte-1ftngq1");
      xlink_attr(textPath0, "xlink:href", textPath0_xlink_href_value = "#link_" + ctx[13]);
      attr(textPath0, "startOffset", textPath0_startOffset_value = "40%");
      xlink_attr(textPath1, "xlink:href", textPath1_xlink_href_value = "#link_" + ctx[13]);
      attr(textPath1, "startOffset", ctx[4]);
      attr(textPath1, "fill", ctx[3]);
      attr(text_1, "class", "svelte-1ftngq1");
      attr(g, "stroke", "green");
      attr(g, "stroke-opacity", "0.1");
    },
    m(target, anchor) {
      insert_hydration(target, g, anchor);
      append_hydration(g, path);
      append_hydration(g, text_1);
      append_hydration(text_1, textPath0);
      append_hydration(textPath0, tspan);
      append_hydration(tspan, t0);
      append_hydration(textPath0, t1);
      append_hydration(text_1, textPath1);
      append_hydration(textPath1, t2);
    },
    p(ctx2, dirty) {
      if (dirty & 1 && path_d_value !== (path_d_value = ctx2[7](ctx2[11]))) {
        attr(path, "d", path_d_value);
      }
      if (dirty & 4) {
        attr(path, "stroke-width", ctx2[2]);
      }
      if (dirty & 2) {
        attr(path, "stroke", ctx2[1]);
      }
      if (dirty & 1 && t0_value !== (t0_value = ctx2[6](ctx2[11]) + ""))
        set_data(t0, t0_value);
      if (dirty & 16) {
        attr(textPath1, "startOffset", ctx2[4]);
      }
      if (dirty & 8) {
        attr(textPath1, "fill", ctx2[3]);
      }
    },
    d(detaching) {
      if (detaching)
        detach(g);
    }
  };
}
function create_each_block$2(ctx) {
  let if_block_anchor;
  let if_block = ctx[11] && ctx[5] && create_if_block_1$1(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (ctx2[11] && ctx2[5]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_1$1(ctx2);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_fragment$2(ctx) {
  let link_1;
  let t;
  let if_block_anchor;
  let if_block = ctx[5] && create_if_block$2(ctx);
  return {
    c() {
      link_1 = element("link");
      t = space();
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
      this.h();
    },
    l(nodes) {
      const head_nodes = query_selector_all('[data-svelte="svelte-1y2tnph"]', document_1.head);
      link_1 = claim_element(head_nodes, "LINK", { rel: true, type: true, href: true });
      head_nodes.forEach(detach);
      t = claim_space(nodes);
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
      this.h();
    },
    h() {
      attr(link_1, "rel", "stylesheet");
      attr(link_1, "type", "text/css");
      attr(link_1, "href", "//fonts.googleapis.com/css?family=Luckiest+Guy");
    },
    m(target, anchor) {
      append_hydration(document_1.head, link_1);
      insert_hydration(target, t, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
    },
    p(ctx2, [dirty]) {
      if (ctx2[5]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block$2(ctx2);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      detach(link_1);
      if (detaching)
        detach(t);
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let { data } = $$props;
  let { width = 500 } = $$props;
  let { height = 500 } = $$props;
  let { strokeColor = "green" } = $$props;
  let { strokeWidth = 3 } = $$props;
  let { arrowColor = "green" } = $$props;
  let { startOffset = "60%" } = $$props;
  const generateXcurve = link(bumpX);
  let mounted;
  onMount(() => {
    $$invalidate(5, mounted = true);
  });
  const showCoords = (link2) => `[${link2.source.id}] to [${link2.target.id}]`;
  function genPath(link2) {
    let sourceEl = document.getElementById(link2.source.id);
    let targetEl = document.getElementById(link2.target.id);
    let sourceX = (sourceEl == null ? void 0 : sourceEl.offsetLeft) + sourceEl.offsetWidth / 2;
    let sourceY = (sourceEl == null ? void 0 : sourceEl.offsetTop) + sourceEl.offsetHeight / 2;
    let targetX = (targetEl == null ? void 0 : targetEl.offsetLeft) + targetEl.offsetWidth / 2;
    let targetY = (targetEl == null ? void 0 : targetEl.offsetTop) + targetEl.offsetHeight / 2;
    let d = generateXcurve({
      source: [sourceX, sourceY],
      target: [targetX, targetY]
    });
    return d;
  }
  $$self.$$set = ($$props2) => {
    if ("data" in $$props2)
      $$invalidate(0, data = $$props2.data);
    if ("width" in $$props2)
      $$invalidate(8, width = $$props2.width);
    if ("height" in $$props2)
      $$invalidate(9, height = $$props2.height);
    if ("strokeColor" in $$props2)
      $$invalidate(1, strokeColor = $$props2.strokeColor);
    if ("strokeWidth" in $$props2)
      $$invalidate(2, strokeWidth = $$props2.strokeWidth);
    if ("arrowColor" in $$props2)
      $$invalidate(3, arrowColor = $$props2.arrowColor);
    if ("startOffset" in $$props2)
      $$invalidate(4, startOffset = $$props2.startOffset);
  };
  return [
    data,
    strokeColor,
    strokeWidth,
    arrowColor,
    startOffset,
    mounted,
    showCoords,
    genPath,
    width,
    height
  ];
}
class Links extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, {
      data: 0,
      width: 8,
      height: 9,
      strokeColor: 1,
      strokeWidth: 2,
      arrowColor: 3,
      startOffset: 4
    });
  }
}
var Object_svelte_svelte_type_style_lang = "";
function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[1] = list[i][0];
  child_ctx[0] = list[i][1];
  return child_ctx;
}
function create_if_block$1(ctx) {
  let ul;
  let current;
  let each_value = [...Object.entries(ctx[0])];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      ul = element("ul");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      this.h();
    },
    l(nodes) {
      ul = claim_element(nodes, "UL", { class: true });
      var ul_nodes = children(ul);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(ul_nodes);
      }
      ul_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(ul, "class", "svelte-4mp91d");
    },
    m(target, anchor) {
      insert_hydration(target, ul, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(ul, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & 1) {
        each_value = [...Object.entries(ctx2[0])];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$1(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block$1(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(ul, null);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(ul);
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_else_block(ctx) {
  let t0_value = ctx[1] + "";
  let t0;
  let t1;
  let t2_value = ctx[0] + "";
  let t2;
  return {
    c() {
      t0 = text(t0_value);
      t1 = text("\r\n					:\r\n					");
      t2 = text(t2_value);
    },
    l(nodes) {
      t0 = claim_text(nodes, t0_value);
      t1 = claim_text(nodes, "\r\n					:\r\n					");
      t2 = claim_text(nodes, t2_value);
    },
    m(target, anchor) {
      insert_hydration(target, t0, anchor);
      insert_hydration(target, t1, anchor);
      insert_hydration(target, t2, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 1 && t0_value !== (t0_value = ctx2[1] + ""))
        set_data(t0, t0_value);
      if (dirty & 1 && t2_value !== (t2_value = ctx2[0] + ""))
        set_data(t2, t2_value);
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(t0);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(t2);
    }
  };
}
function create_if_block_1(ctx) {
  let t0_value = ctx[1] + "";
  let t0;
  let t1;
  let object_1;
  let current;
  object_1 = new Object_1({
    props: { key: ctx[1], val: ctx[0] }
  });
  return {
    c() {
      t0 = text(t0_value);
      t1 = space();
      create_component(object_1.$$.fragment);
    },
    l(nodes) {
      t0 = claim_text(nodes, t0_value);
      t1 = claim_space(nodes);
      claim_component(object_1.$$.fragment, nodes);
    },
    m(target, anchor) {
      insert_hydration(target, t0, anchor);
      insert_hydration(target, t1, anchor);
      mount_component(object_1, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if ((!current || dirty & 1) && t0_value !== (t0_value = ctx2[1] + ""))
        set_data(t0, t0_value);
      const object_1_changes = {};
      if (dirty & 1)
        object_1_changes.key = ctx2[1];
      if (dirty & 1)
        object_1_changes.val = ctx2[0];
      object_1.$set(object_1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(object_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(object_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(t0);
      if (detaching)
        detach(t1);
      destroy_component(object_1, detaching);
    }
  };
}
function create_each_block$1(ctx) {
  let li;
  let current_block_type_index;
  let if_block;
  let t;
  let current;
  const if_block_creators = [create_if_block_1, create_else_block];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (typeof ctx2[0] === "object")
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      li = element("li");
      if_block.c();
      t = space();
    },
    l(nodes) {
      li = claim_element(nodes, "LI", {});
      var li_nodes = children(li);
      if_block.l(li_nodes);
      t = claim_space(li_nodes);
      li_nodes.forEach(detach);
    },
    m(target, anchor) {
      insert_hydration(target, li, anchor);
      if_blocks[current_block_type_index].m(li, null);
      append_hydration(li, t);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(li, t);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(li);
      if_blocks[current_block_type_index].d();
    }
  };
}
function create_fragment$1(ctx) {
  let if_block_anchor;
  let current;
  let if_block = ctx[0] && create_if_block$1(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (ctx2[0]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$1(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let { val } = $$props;
  $$self.$$set = ($$props2) => {
    if ("val" in $$props2)
      $$invalidate(0, val = $$props2.val);
  };
  return [val];
}
class Object_1 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, { val: 0 });
  }
}
var index_svelte_svelte_type_style_lang = "";
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[6] = list[i];
  child_ctx[7] = list;
  child_ctx[8] = i;
  return child_ctx;
}
function create_default_slot(ctx) {
  let div;
  let t0_value = ctx[6].id + "";
  let t0;
  let t1;
  let br0;
  let t2;
  let t3_value = ctx[6].x + "";
  let t3;
  let t4;
  let t5_value = ctx[6].y + "";
  let t5;
  let br1;
  let t6;
  let t7_value = ctx[6].width + "";
  let t7;
  let t8;
  let t9_value = ctx[6].height + "";
  let t9;
  return {
    c() {
      div = element("div");
      t0 = text(t0_value);
      t1 = text(" Connect from Me ");
      br0 = element("br");
      t2 = space();
      t3 = text(t3_value);
      t4 = text(",");
      t5 = text(t5_value);
      br1 = element("br");
      t6 = space();
      t7 = text(t7_value);
      t8 = text(",");
      t9 = text(t9_value);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      t0 = claim_text(div_nodes, t0_value);
      t1 = claim_text(div_nodes, " Connect from Me ");
      br0 = claim_element(div_nodes, "BR", {});
      t2 = claim_space(div_nodes);
      t3 = claim_text(div_nodes, t3_value);
      t4 = claim_text(div_nodes, ",");
      t5 = claim_text(div_nodes, t5_value);
      br1 = claim_element(div_nodes, "BR", {});
      t6 = claim_space(div_nodes);
      t7 = claim_text(div_nodes, t7_value);
      t8 = claim_text(div_nodes, ",");
      t9 = claim_text(div_nodes, t9_value);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "inner svelte-maj110");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, t0);
      append_hydration(div, t1);
      append_hydration(div, br0);
      append_hydration(div, t2);
      append_hydration(div, t3);
      append_hydration(div, t4);
      append_hydration(div, t5);
      append_hydration(div, br1);
      append_hydration(div, t6);
      append_hydration(div, t7);
      append_hydration(div, t8);
      append_hydration(div, t9);
    },
    p(ctx2, dirty) {
      if (dirty & 1 && t0_value !== (t0_value = ctx2[6].id + ""))
        set_data(t0, t0_value);
      if (dirty & 1 && t3_value !== (t3_value = ctx2[6].x + ""))
        set_data(t3, t3_value);
      if (dirty & 1 && t5_value !== (t5_value = ctx2[6].y + ""))
        set_data(t5, t5_value);
      if (dirty & 1 && t7_value !== (t7_value = ctx2[6].width + ""))
        set_data(t7, t7_value);
      if (dirty & 1 && t9_value !== (t9_value = ctx2[6].height + ""))
        set_data(t9, t9_value);
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_each_block(key_1, ctx) {
  let first;
  let connectable2;
  let updating_data;
  let updating_node;
  let current;
  function connectable_data_binding(value) {
    ctx[1](value);
  }
  function connectable_node_binding(value) {
    ctx[2](value, ctx[6], ctx[7], ctx[8]);
  }
  let connectable_props = {
    $$slots: { default: [create_default_slot] },
    $$scope: { ctx }
  };
  if (ctx[0] !== void 0) {
    connectable_props.data = ctx[0];
  }
  if (ctx[6] !== void 0) {
    connectable_props.node = ctx[6];
  }
  connectable2 = new Connectable({ props: connectable_props });
  binding_callbacks.push(() => bind(connectable2, "data", connectable_data_binding));
  binding_callbacks.push(() => bind(connectable2, "node", connectable_node_binding));
  return {
    key: key_1,
    first: null,
    c() {
      first = empty();
      create_component(connectable2.$$.fragment);
      this.h();
    },
    l(nodes) {
      first = empty();
      claim_component(connectable2.$$.fragment, nodes);
      this.h();
    },
    h() {
      this.first = first;
    },
    m(target, anchor) {
      insert_hydration(target, first, anchor);
      mount_component(connectable2, target, anchor);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const connectable_changes = {};
      if (dirty & 513) {
        connectable_changes.$$scope = { dirty, ctx };
      }
      if (!updating_data && dirty & 1) {
        updating_data = true;
        connectable_changes.data = ctx[0];
        add_flush_callback(() => updating_data = false);
      }
      if (!updating_node && dirty & 1) {
        updating_node = true;
        connectable_changes.node = ctx[6];
        add_flush_callback(() => updating_node = false);
      }
      connectable2.$set(connectable_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(connectable2.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(connectable2.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(first);
      destroy_component(connectable2, detaching);
    }
  };
}
function create_if_block(ctx) {
  let links;
  let current;
  links = new Links({ props: { data: ctx[0] } });
  return {
    c() {
      create_component(links.$$.fragment);
    },
    l(nodes) {
      claim_component(links.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(links, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const links_changes = {};
      if (dirty & 1)
        links_changes.data = ctx2[0];
      links.$set(links_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(links.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(links.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(links, detaching);
    }
  };
}
function create_fragment(ctx) {
  let div0;
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let t0;
  let t1;
  let div1;
  let object;
  let current;
  let each_value = ctx[0].nodes;
  const get_key = (ctx2) => ctx2[6].id;
  for (let i = 0; i < each_value.length; i += 1) {
    let child_ctx = get_each_context(ctx, each_value, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
  }
  let if_block = ctx[0].links.length > 0 && create_if_block(ctx);
  object = new Object_1({ props: { val: ctx[0] } });
  return {
    c() {
      div0 = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t0 = space();
      if (if_block)
        if_block.c();
      t1 = space();
      div1 = element("div");
      create_component(object.$$.fragment);
      this.h();
    },
    l(nodes) {
      div0 = claim_element(nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(div0_nodes);
      }
      t0 = claim_space(div0_nodes);
      if (if_block)
        if_block.l(div0_nodes);
      div0_nodes.forEach(detach);
      t1 = claim_space(nodes);
      div1 = claim_element(nodes, "DIV", {});
      var div1_nodes = children(div1);
      claim_component(object.$$.fragment, div1_nodes);
      div1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div0, "class", "wrapper svelte-maj110");
    },
    m(target, anchor) {
      insert_hydration(target, div0, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div0, null);
      }
      append_hydration(div0, t0);
      if (if_block)
        if_block.m(div0, null);
      insert_hydration(target, t1, anchor);
      insert_hydration(target, div1, anchor);
      mount_component(object, div1, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (dirty & 1) {
        each_value = ctx2[0].nodes;
        group_outros();
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, div0, outro_and_destroy_block, create_each_block, t0, get_each_context);
        check_outros();
      }
      if (ctx2[0].links.length > 0) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div0, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      const object_changes = {};
      if (dirty & 1)
        object_changes.val = ctx2[0];
      object.$set(object_changes);
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      transition_in(if_block);
      transition_in(object.$$.fragment, local);
      current = true;
    },
    o(local) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      transition_out(if_block);
      transition_out(object.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div0);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d();
      }
      if (if_block)
        if_block.d();
      if (detaching)
        detach(t1);
      if (detaching)
        detach(div1);
      destroy_component(object);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let data = {
    nodes: [
      {
        id: "1",
        group: 1,
        connectable: true,
        x: 90,
        y: 64,
        width: 100,
        height: 100
      },
      {
        id: "2",
        group: 2,
        connectable: false,
        x: 355,
        y: 129,
        width: 100,
        height: 100
      },
      {
        id: "3",
        group: 2,
        connectable: false,
        x: 69,
        y: 276,
        width: 400,
        height: 400,
        children: [
          {
            id: "4",
            group: 1,
            connectable: true,
            x: 100,
            y: 100,
            width: 100,
            height: 100
          },
          {
            id: "5",
            group: 2,
            connectable: false,
            x: 414,
            y: 190,
            width: 100,
            height: 100
          }
        ]
      }
    ],
    links: [{ source: { id: "1" }, target: { id: "2" } }]
  };
  function connectable_data_binding(value) {
    data = value;
    $$invalidate(0, data);
  }
  function connectable_node_binding(value, node, each_value, node_index) {
    each_value[node_index] = value;
    $$invalidate(0, data);
  }
  return [data, connectable_data_binding, connectable_node_binding];
}
class Routes extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {});
  }
}
export { Routes as default };
//# sourceMappingURL=index.svelte-d6966b2d.js.map
