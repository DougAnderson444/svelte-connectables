var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { SvelteComponent, init, safe_not_equal, svg_element, claim_svg_element, children, detach, attr, insert_hydration, append_hydration, element, space, text, query_selector_all, claim_element, claim_space, claim_text, xlink_attr, noop, onMount, link, binding_callbacks, bumpX, create_slot, set_style, action_destroyer, listen, update_slot_base, get_all_dirty_from_scope, get_slot_changes, transition_in, transition_out, run_all, spring, component_subscribe, empty, createEventDispatcher, bind, create_component, claim_component, mount_component, destroy_component, add_flush_callback, group_outros, check_outros } from "../chunks/vendor-5165fa52.js";
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
    if (e.target !== node) {
      printDebug(() => `must connect from the connectable, not a child element: ${e.button}`);
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
    const config = { attributes: true, childList: false, subtree: false };
    const callback = function(mutationsList, observer2) {
      node.dispatchEvent(new CustomEvent("connecting", {
        detail: __spreadValues({ node }, currentMousePosition)
      }));
    };
    const observer = new MutationObserver(callback);
    observer.observe(node, config);
    function handleDisconnect(e) {
      console.log("HANDLING Source DISCONNECT");
      observer.disconnect();
      node.removeEventListener("disconnect", handleDisconnect);
    }
    node.addEventListener("disconnect", handleDisconnect);
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
    const config = { attributes: true, childList: false, subtree: false };
    const callback = function(mutationsList, observer2) {
      node.dispatchEvent(new CustomEvent("connected", {
        detail: { target }
      }));
    };
    const observer = new MutationObserver(callback);
    observer.observe(target, config);
    function handleDisconnect(e) {
      console.log("HANDLING DISCONNECT");
      observer.disconnect();
      target.removeEventListener("disconnect", handleDisconnect);
    }
    target.addEventListener("disconnect", handleDisconnect);
  }
  return {
    destroy() {
    }
  };
}
var Link_svelte_svelte_type_style_lang = "";
function create_if_block$2(ctx) {
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
      attr(path, "d", ctx[9]);
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
      if (dirty & 512) {
        attr(path, "d", ctx2[9]);
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
function create_fragment$5(ctx) {
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
  let if_block = ctx[6] && ctx[7] && create_if_block$2(ctx);
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
      attr(tspan, "class", "svelte-1dq50y9");
      xlink_attr(textPath0, "xlink:href", "#path1");
      attr(textPath0, "startOffset", "20%");
      xlink_attr(textPath1, "xlink:href", "#path1");
      attr(textPath1, "startOffset", ctx[5]);
      attr(textPath1, "fill", ctx[4]);
      attr(text_1, "class", "svelte-1dq50y9");
      attr(svg_1, "width", ctx[0]);
      attr(svg_1, "height", ctx[1]);
      attr(svg_1, "class", "svelte-1dq50y9");
      attr(span, "class", "svg-container svelte-1dq50y9");
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
      ctx[15](svg_1);
    },
    p(ctx2, [dirty]) {
      if (ctx2[6] && ctx2[7]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block$2(ctx2);
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
      ctx[15](null);
    }
  };
}
function instance$4($$self, $$props, $$invalidate) {
  let d;
  let { target } = $$props;
  let { source } = $$props;
  let { width = 500 } = $$props;
  let { height = 500 } = $$props;
  let { strokeColor = "green" } = $$props;
  let { strokeWidth = 3 } = $$props;
  let { arrowColor = "green" } = $$props;
  let { startOffset = "60%" } = $$props;
  const generateXcurve = link(bumpX);
  let svg, mounted;
  let x1, x2, y1, y2;
  onMount(() => {
    $$invalidate(12, mounted = true);
  });
  function svg_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      svg = $$value;
      $$invalidate(8, svg);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("target" in $$props2)
      $$invalidate(10, target = $$props2.target);
    if ("source" in $$props2)
      $$invalidate(11, source = $$props2.source);
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
    if ($$self.$$.dirty & 7232) {
      if (mounted) {
        $$invalidate(6, x1 = x1 < target.offsetLeft ? source.offsetLeft + source.clientWidth : source.offsetLeft);
      }
    }
    if ($$self.$$.dirty & 6144) {
      if (mounted) {
        $$invalidate(14, y1 = source.offsetTop + source.clientHeight / 2);
      }
    }
    if ($$self.$$.dirty & 5120) {
      if (mounted) {
        $$invalidate(13, x2 = target.offsetLeft);
      }
    }
    if ($$self.$$.dirty & 5120) {
      if (mounted) {
        $$invalidate(7, y2 = target.offsetTop + target.offsetHeight / 2);
      }
    }
    if ($$self.$$.dirty & 24768) {
      $$invalidate(9, d = generateXcurve({ source: [x1, y1], target: [x2, y2] }));
    }
    if ($$self.$$.dirty & 1024) {
      target && console.log("Connecting", { target });
    }
  };
  return [
    width,
    height,
    strokeColor,
    strokeWidth,
    arrowColor,
    startOffset,
    x1,
    y2,
    svg,
    d,
    target,
    source,
    mounted,
    x2,
    y1,
    svg_1_binding
  ];
}
class Link extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$5, safe_not_equal, {
      target: 10,
      source: 11,
      width: 0,
      height: 1,
      strokeColor: 2,
      strokeWidth: 3,
      arrowColor: 4,
      startOffset: 5
    });
  }
}
function pannable(node) {
  let x;
  let y;
  function handleMousedown(event) {
    event.stopPropagation();
    const c = event.touches ? event.touches[0] : event;
    x = c.clientX;
    y = c.clientY;
    node.dispatchEvent(new CustomEvent("panstart", {
      detail: { x, y }
    }));
    window.addEventListener("mousemove", handleMousemove);
    window.addEventListener("mouseup", handleMouseup);
    window.addEventListener("touchmove", handleMousemove);
    window.addEventListener("touchend", handleMouseup);
  }
  function handleMousemove(event) {
    event.preventDefault();
    const c = event.touches ? event.touches[0] : event;
    const dx = c.clientX - x;
    const dy = c.clientY - y;
    x = c.clientX;
    y = c.clientY;
    node.dispatchEvent(new CustomEvent("panmove", {
      detail: { x, y, dx, dy }
    }));
  }
  function handleMouseup(event) {
    x = event.clientX;
    y = event.clientY;
    node.dispatchEvent(new CustomEvent("panend", {
      detail: { x, y }
    }));
    window.removeEventListener("mousemove", handleMousemove);
    window.removeEventListener("mouseup", handleMouseup);
    window.removeEventListener("touchmove", handleMousemove);
    window.removeEventListener("touchend", handleMouseup);
  }
  node.addEventListener("mousedown", handleMousedown);
  node.addEventListener("touchstart", handleMousedown);
  return {
    destroy() {
      node.removeEventListener("mousedown", handleMousedown);
      node.removeEventListener("touchstart", handleMousedown);
    }
  };
}
var pannable$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  pannable
}, Symbol.toStringTag, { value: "Module" }));
var Pannable_svelte_svelte_type_style_lang = "";
function fallback_block(ctx) {
  let t;
  return {
    c() {
      t = text("Pull on me");
    },
    l(nodes) {
      t = claim_text(nodes, "Pull on me");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_fragment$4(ctx) {
  let div;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = ctx[9].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[8], null);
  const default_slot_or_fallback = default_slot || fallback_block();
  return {
    c() {
      div = element("div");
      if (default_slot_or_fallback)
        default_slot_or_fallback.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true, style: true });
      var div_nodes = children(div);
      if (default_slot_or_fallback)
        default_slot_or_fallback.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "box svelte-l9cslw");
      set_style(div, "left", ctx[1].x + "px");
      set_style(div, "top", ctx[1].y + "px");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (default_slot_or_fallback) {
        default_slot_or_fallback.m(div, null);
      }
      ctx[10](div);
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(pannable.call(null, div)),
          listen(div, "panstart", ctx[3]),
          listen(div, "panmove", ctx[4]),
          listen(div, "panend", ctx[5])
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 256)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[8], !current ? get_all_dirty_from_scope(ctx2[8]) : get_slot_changes(default_slot_template, ctx2[8], dirty, null), null);
        }
      }
      if (!current || dirty & 2) {
        set_style(div, "left", ctx2[1].x + "px");
      }
      if (!current || dirty & 2) {
        set_style(div, "top", ctx2[1].y + "px");
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot_or_fallback, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot_or_fallback, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (default_slot_or_fallback)
        default_slot_or_fallback.d(detaching);
      ctx[10](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  let $coords;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { panElement } = $$props;
  let { x = 0 } = $$props;
  let { y = 0 } = $$props;
  const coords = spring({ x, y }, { stiffness: 0.2, damping: 0.4 });
  component_subscribe($$self, coords, (value) => $$invalidate(1, $coords = value));
  function handlePanStart() {
    $$invalidate(2, coords.stiffness = $$invalidate(2, coords.damping = 1, coords), coords);
  }
  function handlePanMove(event) {
    coords.update(($coords2) => ({
      x: $coords2.x + event.detail.dx,
      y: $coords2.y + event.detail.dy
    }));
  }
  function handlePanEnd(event) {
    $$invalidate(2, coords.stiffness = 0.2, coords);
    $$invalidate(2, coords.damping = 0.4, coords);
    coords.set({ x, y });
  }
  onMount(() => {
    $$invalidate(0, panElement), $$invalidate(1, $coords);
  });
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      panElement = $$value;
      $$invalidate(0, panElement), $$invalidate(1, $coords);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("panElement" in $$props2)
      $$invalidate(0, panElement = $$props2.panElement);
    if ("x" in $$props2)
      $$invalidate(6, x = $$props2.x);
    if ("y" in $$props2)
      $$invalidate(7, y = $$props2.y);
    if ("$$scope" in $$props2)
      $$invalidate(8, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 3) {
      if ($coords)
        $$invalidate(0, panElement), $$invalidate(1, $coords);
    }
  };
  return [
    panElement,
    $coords,
    coords,
    handlePanStart,
    handlePanMove,
    handlePanEnd,
    x,
    y,
    $$scope,
    slots,
    div_binding
  ];
}
class Pannable extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$4, safe_not_equal, { panElement: 0, x: 6, y: 7 });
  }
}
var Connectable_svelte_svelte_type_style_lang = "";
function create_fragment$3(ctx) {
  let div;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = ctx[8].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[7], null);
  return {
    c() {
      div = element("div");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true, style: true });
      var div_nodes = children(div);
      if (default_slot)
        default_slot.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "endpoint svelte-15oongv");
      set_style(div, "left", ctx[1] + "px");
      set_style(div, "top", ctx[0] + "px");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (default_slot) {
        default_slot.m(div, null);
      }
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(connectable.call(null, div)),
          listen(div, "connecting", ctx[2]),
          listen(div, "connected", ctx[3])
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 128)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[7], !current ? get_all_dirty_from_scope(ctx2[7]) : get_slot_changes(default_slot_template, ctx2[7], dirty, null), null);
        }
      }
      if (!current || dirty & 2) {
        set_style(div, "left", ctx2[1] + "px");
      }
      if (!current || dirty & 1) {
        set_style(div, "top", ctx2[0] + "px");
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
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let x;
  let y;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { node = { x: 10, y: 10 } } = $$props;
  let { source } = $$props;
  let { target } = $$props;
  let prevTarget;
  function handleConnecting(event) {
    $$invalidate(4, source = event.detail.node);
    $$invalidate(5, target = {
      offsetLeft: event.detail.x,
      offsetTop: event.detail.y,
      offsetWidth: 0,
      offsetHeight: 0
    });
  }
  function handleConnected(event) {
    $$invalidate(5, target = event.detail.target);
    if (prevTarget && prevTarget !== target)
      prevTarget.dispatchEvent(new CustomEvent("disconnect"));
    prevTarget = target;
  }
  $$self.$$set = ($$props2) => {
    if ("node" in $$props2)
      $$invalidate(6, node = $$props2.node);
    if ("source" in $$props2)
      $$invalidate(4, source = $$props2.source);
    if ("target" in $$props2)
      $$invalidate(5, target = $$props2.target);
    if ("$$scope" in $$props2)
      $$invalidate(7, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 64) {
      $$invalidate(1, x = node.x);
    }
    if ($$self.$$.dirty & 64) {
      $$invalidate(0, y = node.y);
    }
  };
  return [y, x, handleConnecting, handleConnected, source, target, node, $$scope, slots];
}
class Connectable extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$3, safe_not_equal, { node: 6, source: 4, target: 5 });
  }
}
var PanHandle_svelte_svelte_type_style_lang = "";
function create_if_block$1(ctx) {
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
function create_fragment$2(ctx) {
  let if_block_anchor;
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
    },
    p(ctx2, [dirty]) {
      if (ctx2[0]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block$1(ctx2);
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
function instance$1($$self, $$props, $$invalidate) {
  let { nodes } = $$props;
  let { node } = $$props;
  let { mouseMoving } = $$props;
  const dispatch = createEventDispatcher();
  let pannable2;
  onMount(async () => {
    $$invalidate(0, { pannable: pannable2 } = await __vitePreload(() => Promise.resolve().then(function() {
      return pannable$1;
    }), true ? void 0 : void 0), pannable2);
  });
  function handlePanStart(event) {
    $$invalidate(6, mouseMoving = true);
    dispatch("resimulate", "resimulate");
  }
  function handlePanMove(event) {
    $$invalidate(6, mouseMoving = true);
    $$invalidate(5, node.x = node.x + event.detail.dx, node);
    $$invalidate(5, node.y = node.y + event.detail.dy, node);
    $$invalidate(5, node);
    $$invalidate(4, nodes[node.index] = __spreadProps(__spreadValues({}, nodes[node.index]), {
      x: node.x,
      y: node.y
    }), nodes);
    $$invalidate(4, nodes);
  }
  function handlePanEnd(event) {
    $$invalidate(6, mouseMoving = false);
    $$invalidate(4, nodes);
    dispatch("resimulate", "resimulate");
  }
  $$self.$$set = ($$props2) => {
    if ("nodes" in $$props2)
      $$invalidate(4, nodes = $$props2.nodes);
    if ("node" in $$props2)
      $$invalidate(5, node = $$props2.node);
    if ("mouseMoving" in $$props2)
      $$invalidate(6, mouseMoving = $$props2.mouseMoving);
  };
  return [
    pannable2,
    handlePanStart,
    handlePanMove,
    handlePanEnd,
    nodes,
    node,
    mouseMoving
  ];
}
class PanHandle extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$2, safe_not_equal, { nodes: 4, node: 5, mouseMoving: 6 });
  }
}
var Demo_svelte_svelte_type_style_lang = "";
function create_default_slot_1(ctx) {
  let panhandle;
  let updating_node;
  let t;
  let current;
  function panhandle_node_binding(value) {
    ctx[4](value);
  }
  let panhandle_props = { nodes: ctx[3] };
  if (ctx[0] !== void 0) {
    panhandle_props.node = ctx[0];
  }
  panhandle = new PanHandle({ props: panhandle_props });
  binding_callbacks.push(() => bind(panhandle, "node", panhandle_node_binding));
  return {
    c() {
      create_component(panhandle.$$.fragment);
      t = text("\r\n		Connect from Me");
    },
    l(nodes) {
      claim_component(panhandle.$$.fragment, nodes);
      t = claim_text(nodes, "\r\n		Connect from Me");
    },
    m(target, anchor) {
      mount_component(panhandle, target, anchor);
      insert_hydration(target, t, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const panhandle_changes = {};
      if (!updating_node && dirty & 1) {
        updating_node = true;
        panhandle_changes.node = ctx2[0];
        add_flush_callback(() => updating_node = false);
      }
      panhandle.$set(panhandle_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(panhandle.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(panhandle.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(panhandle, detaching);
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot(ctx) {
  let t;
  return {
    c() {
      t = text("Connect to me, then pull on me.");
    },
    l(nodes) {
      t = claim_text(nodes, "Connect to me, then pull on me.");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_if_block(ctx) {
  let link2;
  let current;
  link2 = new Link({
    props: {
      source: ctx[1],
      target: ctx[2]
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
      if (dirty & 2)
        link_changes.source = ctx2[1];
      if (dirty & 4)
        link_changes.target = ctx2[2];
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
function create_fragment$1(ctx) {
  let div;
  let connectable2;
  let updating_source;
  let updating_target;
  let updating_node;
  let t0;
  let pannable2;
  let t1;
  let current;
  function connectable_source_binding(value) {
    ctx[5](value);
  }
  function connectable_target_binding(value) {
    ctx[6](value);
  }
  function connectable_node_binding(value) {
    ctx[7](value);
  }
  let connectable_props = {
    $$slots: { default: [create_default_slot_1] },
    $$scope: { ctx }
  };
  if (ctx[1] !== void 0) {
    connectable_props.source = ctx[1];
  }
  if (ctx[2] !== void 0) {
    connectable_props.target = ctx[2];
  }
  if (ctx[0] !== void 0) {
    connectable_props.node = ctx[0];
  }
  connectable2 = new Connectable({ props: connectable_props });
  binding_callbacks.push(() => bind(connectable2, "source", connectable_source_binding));
  binding_callbacks.push(() => bind(connectable2, "target", connectable_target_binding));
  binding_callbacks.push(() => bind(connectable2, "node", connectable_node_binding));
  pannable2 = new Pannable({
    props: {
      x: 200,
      y: 200,
      $$slots: { default: [create_default_slot] },
      $$scope: { ctx }
    }
  });
  let if_block = ctx[1] && ctx[2] && create_if_block(ctx);
  return {
    c() {
      div = element("div");
      create_component(connectable2.$$.fragment);
      t0 = space();
      create_component(pannable2.$$.fragment);
      t1 = space();
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(connectable2.$$.fragment, div_nodes);
      t0 = claim_space(div_nodes);
      claim_component(pannable2.$$.fragment, div_nodes);
      t1 = claim_space(div_nodes);
      if (if_block)
        if_block.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "wrapper svelte-1cba8mg");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      mount_component(connectable2, div, null);
      append_hydration(div, t0);
      mount_component(pannable2, div, null);
      append_hydration(div, t1);
      if (if_block)
        if_block.m(div, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      const connectable_changes = {};
      if (dirty & 257) {
        connectable_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_source && dirty & 2) {
        updating_source = true;
        connectable_changes.source = ctx2[1];
        add_flush_callback(() => updating_source = false);
      }
      if (!updating_target && dirty & 4) {
        updating_target = true;
        connectable_changes.target = ctx2[2];
        add_flush_callback(() => updating_target = false);
      }
      if (!updating_node && dirty & 1) {
        updating_node = true;
        connectable_changes.node = ctx2[0];
        add_flush_callback(() => updating_node = false);
      }
      connectable2.$set(connectable_changes);
      const pannable_changes = {};
      if (dirty & 256) {
        pannable_changes.$$scope = { dirty, ctx: ctx2 };
      }
      pannable2.$set(pannable_changes);
      if (ctx2[1] && ctx2[2]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 6) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div, null);
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
      transition_in(connectable2.$$.fragment, local);
      transition_in(pannable2.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(connectable2.$$.fragment, local);
      transition_out(pannable2.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_component(connectable2);
      destroy_component(pannable2);
      if (if_block)
        if_block.d();
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let nodes = { connections: [] };
  let node = { x: 10, y: 10 };
  let source;
  let target;
  function panhandle_node_binding(value) {
    node = value;
    $$invalidate(0, node);
  }
  function connectable_source_binding(value) {
    source = value;
    $$invalidate(1, source);
  }
  function connectable_target_binding(value) {
    target = value;
    $$invalidate(2, target);
  }
  function connectable_node_binding(value) {
    node = value;
    $$invalidate(0, node);
  }
  return [
    node,
    source,
    target,
    nodes,
    panhandle_node_binding,
    connectable_source_binding,
    connectable_target_binding,
    connectable_node_binding
  ];
}
class Demo extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment$1, safe_not_equal, {});
  }
}
function create_fragment(ctx) {
  let demo;
  let current;
  demo = new Demo({});
  return {
    c() {
      create_component(demo.$$.fragment);
    },
    l(nodes) {
      claim_component(demo.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(demo, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(demo.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(demo.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(demo, detaching);
    }
  };
}
class Routes extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment, safe_not_equal, {});
  }
}
export { Routes as default };
//# sourceMappingURL=index.svelte-d63f0a0a.js.map
