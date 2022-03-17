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
import { SvelteComponent, init, safe_not_equal, svg_element, claim_svg_element, children, detach, attr, insert_hydration, append_hydration, text, space, element, claim_text, claim_space, query_selector_all, claim_element, xlink_attr, set_data, noop, link, bumpX, onMount, binding_callbacks, create_slot, create_component, claim_component, mount_component, transition_in, transition_out, destroy_component, empty, set_style, action_destroyer, listen, update_slot_base, get_all_dirty_from_scope, get_slot_changes, group_outros, check_outros, run_all, createEventDispatcher, destroy_each, globals, add_flush_callback, update_keyed_each, bind, outro_and_destroy_block } from "../chunks/vendor-60f50316.js";
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
function create_if_block$4(ctx) {
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
function create_fragment$5(ctx) {
  let t0;
  let t1;
  let t2;
  let link_1;
  let t3;
  let span;
  let svg_1;
  let defs;
  let marker;
  let path;
  let text_1;
  let textPath0;
  let tspan;
  let t4;
  let t5;
  let textPath1;
  let t6;
  let if_block = ctx[7] && ctx[8] && create_if_block$4(ctx);
  return {
    c() {
      t0 = text("y2: ");
      t1 = text(ctx[8]);
      t2 = space();
      link_1 = element("link");
      t3 = space();
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
      t4 = text("Curvy Connector");
      t5 = space();
      textPath1 = svg_element("textPath");
      t6 = text("\u27A4");
      this.h();
    },
    l(nodes) {
      t0 = claim_text(nodes, "y2: ");
      t1 = claim_text(nodes, ctx[8]);
      t2 = claim_space(nodes);
      const head_nodes = query_selector_all('[data-svelte="svelte-1y2tnph"]', document.head);
      link_1 = claim_element(head_nodes, "LINK", { rel: true, type: true, href: true });
      head_nodes.forEach(detach);
      t3 = claim_space(nodes);
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
      t4 = claim_text(tspan_nodes, "Curvy Connector");
      tspan_nodes.forEach(detach);
      t5 = claim_space(textPath0_nodes);
      textPath0_nodes.forEach(detach);
      textPath1 = claim_svg_element(text_1_nodes, "textPath", {
        "xlink:href": true,
        startOffset: true,
        fill: true
      });
      var textPath1_nodes = children(textPath1);
      t6 = claim_text(textPath1_nodes, "\u27A4");
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
      insert_hydration(target, t0, anchor);
      insert_hydration(target, t1, anchor);
      insert_hydration(target, t2, anchor);
      append_hydration(document.head, link_1);
      insert_hydration(target, t3, anchor);
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
      append_hydration(tspan, t4);
      append_hydration(textPath0, t5);
      append_hydration(text_1, textPath1);
      append_hydration(textPath1, t6);
      ctx[17](svg_1);
      ctx[18](span);
    },
    p(ctx2, [dirty]) {
      if (dirty & 256)
        set_data(t1, ctx2[8]);
      if (ctx2[7] && ctx2[8]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block$4(ctx2);
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
      if (detaching)
        detach(t0);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(t2);
      detach(link_1);
      if (detaching)
        detach(t3);
      if (detaching)
        detach(span);
      if (if_block)
        if_block.d();
      ctx[17](null);
      ctx[18](null);
    }
  };
}
function instance$4($$self, $$props, $$invalidate) {
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
    if ($$self.$$.dirty & 14464) {
      if (mounted) {
        $$invalidate(7, x1 = Math.floor(x1 < target.offsetLeft ? source.offsetLeft + source.clientWidth : source.offsetLeft));
      }
    }
    if ($$self.$$.dirty & 12288) {
      if (mounted) {
        $$invalidate(15, y1 = Math.floor(source.offsetTop + source.clientHeight / 2));
      }
    }
    if ($$self.$$.dirty & 10304) {
      if (mounted) {
        $$invalidate(14, x2 = Math.floor(target.offsetLeft - container.offsetLeft));
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
    if ($$self.$$.dirty & 65600) {
      container && sourceObj && console.log({
        container: container.getBoundingClientRect(),
        sourceObj
      });
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
    init(this, options, instance$4, create_fragment$5, safe_not_equal, {
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
var Pannable_svelte_svelte_type_style_lang = "";
var Connectable_svelte_svelte_type_style_lang = "";
function create_if_block$3(ctx) {
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
function create_fragment$4(ctx) {
  let div;
  let div_id_value;
  let t;
  let if_block_anchor;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = ctx[10].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[9], null);
  let if_block = ctx[3] && create_if_block$3(ctx);
  return {
    c() {
      div = element("div");
      if (default_slot)
        default_slot.c();
      t = space();
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true, id: true, style: true });
      var div_nodes = children(div);
      if (default_slot)
        default_slot.l(div_nodes);
      div_nodes.forEach(detach);
      t = claim_space(nodes);
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
      this.h();
    },
    h() {
      attr(div, "class", "endpoint svelte-1fwsbir");
      attr(div, "id", div_id_value = ctx[0].id);
      set_style(div, "left", ctx[5] + "px");
      set_style(div, "top", ctx[4] + "px");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (default_slot) {
        default_slot.m(div, null);
      }
      insert_hydration(target, t, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(connectable.call(null, div)),
          listen(div, "connecting", ctx[6]),
          listen(div, "connected", ctx[7])
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 512)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[9], !current ? get_all_dirty_from_scope(ctx2[9]) : get_slot_changes(default_slot_template, ctx2[9], dirty, null), null);
        }
      }
      if (!current || dirty & 1 && div_id_value !== (div_id_value = ctx2[0].id)) {
        attr(div, "id", div_id_value);
      }
      if (!current || dirty & 32) {
        set_style(div, "left", ctx2[5] + "px");
      }
      if (!current || dirty & 16) {
        set_style(div, "top", ctx2[4] + "px");
      }
      if (ctx2[3]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 8) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$3(ctx2);
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
      transition_in(default_slot, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (default_slot)
        default_slot.d(detaching);
      if (detaching)
        detach(t);
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
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
  let source;
  let target;
  let connectingNow = false;
  function handleConnecting(event) {
    $$invalidate(3, connectingNow = true);
    console.log("CONNECTing");
    $$invalidate(1, source = event.detail.node);
    if (event.detail.x && event.detail.x !== (target == null ? void 0 : target.offsetLeft) && event.detail.y && event.detail.y !== (target == null ? void 0 : target.offsetTop))
      $$invalidate(2, target = {
        offsetLeft: event.detail.x,
        offsetTop: event.detail.y,
        offsetWidth: 0,
        offsetHeight: 0
      });
  }
  function handleConnected(event) {
    $$invalidate(3, connectingNow = false);
    if (!event.detail.target.id)
      return;
    console.log("CONNECTED firing");
    $$invalidate(8, data.links = [
      ...data.links,
      {
        source: { id: node.id },
        target: { id: event.detail.target.id }
      }
    ], data);
  }
  $$self.$$set = ($$props2) => {
    if ("node" in $$props2)
      $$invalidate(0, node = $$props2.node);
    if ("data" in $$props2)
      $$invalidate(8, data = $$props2.data);
    if ("$$scope" in $$props2)
      $$invalidate(9, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 1) {
      $$invalidate(5, x = node.x);
    }
    if ($$self.$$.dirty & 1) {
      $$invalidate(4, y = node.y);
    }
  };
  return [
    node,
    source,
    target,
    connectingNow,
    y,
    x,
    handleConnecting,
    handleConnected,
    data,
    $$scope,
    slots
  ];
}
class Connectable extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$4, safe_not_equal, { node: 0, data: 8 });
  }
}
var PanHandle_svelte_svelte_type_style_lang = "";
function create_if_block$2(ctx) {
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
function create_fragment$3(ctx) {
  let if_block_anchor;
  let if_block = ctx[0] && create_if_block$2(ctx);
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
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let { nodes } = $$props;
  let { node } = $$props;
  let { mouseMoving = false } = $$props;
  const dispatch = createEventDispatcher();
  let pannable;
  onMount(async () => {
    $$invalidate(0, { pannable } = await __vitePreload(() => import("../chunks/pannable-35ddda62.js"), true ? [] : void 0), pannable);
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
    pannable,
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
    init(this, options, instance$2, create_fragment$3, safe_not_equal, { nodes: 4, node: 5, mouseMoving: 6 });
  }
}
var Links_svelte_svelte_type_style_lang = "";
const { document: document_1 } = globals;
function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[10] = list[i];
  child_ctx[12] = i;
  return child_ctx;
}
function create_if_block$1(ctx) {
  let div;
  let svg;
  let defs;
  let marker;
  let path;
  let each_value = ctx[0].links;
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
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
      if (dirty & 127) {
        each_value = ctx2[0].links;
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$1(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$1(child_ctx);
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
function create_if_block_1(ctx) {
  let g;
  let path;
  let path_d_value;
  let text_1;
  let textPath0;
  let tspan;
  let t0;
  let t1;
  let textPath1;
  let t2;
  return {
    c() {
      g = svg_element("g");
      path = svg_element("path");
      text_1 = svg_element("text");
      textPath0 = svg_element("textPath");
      tspan = svg_element("tspan");
      t0 = text("Curvy Connector");
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
      t0 = claim_text(tspan_nodes, "Curvy Connector");
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
      attr(path, "d", path_d_value = ctx[6](ctx[10]));
      attr(path, "id", "link_" + ctx[12]);
      attr(path, "stroke-width", ctx[2]);
      attr(path, "stroke", ctx[1]);
      attr(path, "fill", "none");
      attr(path, "stroke-linecap", "round");
      attr(path, "marker-mid", "url(#triangle)");
      attr(path, "stroke-opacity", ".4");
      attr(path, "style", "");
      attr(tspan, "fill", "black");
      attr(tspan, "class", "svelte-1ftngq1");
      xlink_attr(textPath0, "xlink:href", "#link_" + ctx[12]);
      attr(textPath0, "startOffset", "20%");
      xlink_attr(textPath1, "xlink:href", "#link_" + ctx[12]);
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
      if (dirty & 1 && path_d_value !== (path_d_value = ctx2[6](ctx2[10]))) {
        attr(path, "d", path_d_value);
      }
      if (dirty & 4) {
        attr(path, "stroke-width", ctx2[2]);
      }
      if (dirty & 2) {
        attr(path, "stroke", ctx2[1]);
      }
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
function create_each_block$1(ctx) {
  let if_block_anchor;
  let if_block = ctx[10] && ctx[5] && create_if_block_1(ctx);
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
      if (ctx2[10] && ctx2[5]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_1(ctx2);
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
  let if_block = ctx[5] && create_if_block$1(ctx);
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
function instance$1($$self, $$props, $$invalidate) {
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
  function genPath(link2) {
    var _a, _b, _c, _d;
    let sourceX = (_a = data.nodes.find((el) => el.id === link2.source.id)) == null ? void 0 : _a.x;
    let sourceY = (_b = data.nodes.find((el) => el.id === link2.source.id)) == null ? void 0 : _b.y;
    let targetX = (_c = data.nodes.find((el) => el.id === link2.target.id)) == null ? void 0 : _c.x;
    let targetY = (_d = data.nodes.find((el) => el.id === link2.target.id)) == null ? void 0 : _d.y;
    let sourceEl = document.getElementById(link2.source.id);
    let targetEl = document.getElementById(link2.target.id);
    sourceX = sourceX + sourceEl.clientWidth / 2;
    sourceY = sourceY + sourceEl.clientHeight / 2;
    targetX = targetX + targetEl.clientWidth / 2;
    targetY = targetY + targetEl.clientHeight / 2;
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
      $$invalidate(7, width = $$props2.width);
    if ("height" in $$props2)
      $$invalidate(8, height = $$props2.height);
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
    genPath,
    width,
    height
  ];
}
class Links extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$2, safe_not_equal, {
      data: 0,
      width: 7,
      height: 8,
      strokeColor: 1,
      strokeWidth: 2,
      arrowColor: 3,
      startOffset: 4
    });
  }
}
var Object_svelte_svelte_type_style_lang = "";
var Demo_svelte_svelte_type_style_lang = "";
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[7] = list[i];
  child_ctx[8] = list;
  child_ctx[9] = i;
  return child_ctx;
}
function create_default_slot(ctx) {
  let panhandle;
  let updating_node;
  let t0;
  let t1_value = ctx[7].id + "";
  let t1;
  let t2;
  let current;
  function panhandle_node_binding(value) {
    ctx[2](value, ctx[7], ctx[8], ctx[9]);
  }
  let panhandle_props = { nodes: ctx[1] };
  if (ctx[7] !== void 0) {
    panhandle_props.node = ctx[7];
  }
  panhandle = new PanHandle({ props: panhandle_props });
  binding_callbacks.push(() => bind(panhandle, "node", panhandle_node_binding));
  return {
    c() {
      create_component(panhandle.$$.fragment);
      t0 = space();
      t1 = text(t1_value);
      t2 = text(" Connect from Me");
    },
    l(nodes) {
      claim_component(panhandle.$$.fragment, nodes);
      t0 = claim_space(nodes);
      t1 = claim_text(nodes, t1_value);
      t2 = claim_text(nodes, " Connect from Me");
    },
    m(target, anchor) {
      mount_component(panhandle, target, anchor);
      insert_hydration(target, t0, anchor);
      insert_hydration(target, t1, anchor);
      insert_hydration(target, t2, anchor);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const panhandle_changes = {};
      if (!updating_node && dirty & 1) {
        updating_node = true;
        panhandle_changes.node = ctx[7];
        add_flush_callback(() => updating_node = false);
      }
      panhandle.$set(panhandle_changes);
      if ((!current || dirty & 1) && t1_value !== (t1_value = ctx[7].id + ""))
        set_data(t1, t1_value);
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
        detach(t0);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(t2);
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
    ctx[3](value);
  }
  function connectable_node_binding(value) {
    ctx[4](value, ctx[7], ctx[8], ctx[9]);
  }
  let connectable_props = {
    $$slots: { default: [create_default_slot] },
    $$scope: { ctx }
  };
  if (ctx[0] !== void 0) {
    connectable_props.data = ctx[0];
  }
  if (ctx[7] !== void 0) {
    connectable_props.node = ctx[7];
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
      if (dirty & 1025) {
        connectable_changes.$$scope = { dirty, ctx };
      }
      if (!updating_data && dirty & 1) {
        updating_data = true;
        connectable_changes.data = ctx[0];
        add_flush_callback(() => updating_data = false);
      }
      if (!updating_node && dirty & 1) {
        updating_node = true;
        connectable_changes.node = ctx[7];
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
function create_fragment$1(ctx) {
  let div;
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let t;
  let current;
  let each_value = ctx[0].nodes;
  const get_key = (ctx2) => ctx2[7].id;
  for (let i = 0; i < each_value.length; i += 1) {
    let child_ctx = get_each_context(ctx, each_value, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
  }
  let if_block = ctx[0].links.length > 0 && create_if_block(ctx);
  return {
    c() {
      div = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t = space();
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(div_nodes);
      }
      t = claim_space(div_nodes);
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
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div, null);
      }
      append_hydration(div, t);
      if (if_block)
        if_block.m(div, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (dirty & 3) {
        each_value = ctx2[0].nodes;
        group_outros();
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, div, outro_and_destroy_block, create_each_block, t, get_each_context);
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
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      transition_in(if_block);
      current = true;
    },
    o(local) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d();
      }
      if (if_block)
        if_block.d();
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let nodes = { connections: [] };
  let data = {
    nodes: [
      {
        id: "1",
        group: 1,
        connectable: true,
        x: 100,
        y: 100
      },
      {
        id: "2",
        group: 2,
        connectable: false,
        x: 414,
        y: 190
      },
      {
        id: "3",
        group: 2,
        connectable: false,
        x: 250,
        y: 300
      }
    ],
    links: [{ source: { id: "1" }, target: { id: "2" } }]
  };
  function panhandle_node_binding(value, node, each_value, node_index) {
    each_value[node_index] = value;
    $$invalidate(0, data);
  }
  function connectable_data_binding(value) {
    data = value;
    $$invalidate(0, data);
  }
  function connectable_node_binding(value, node, each_value, node_index) {
    each_value[node_index] = value;
    $$invalidate(0, data);
  }
  return [
    data,
    nodes,
    panhandle_node_binding,
    connectable_data_binding,
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
//# sourceMappingURL=index.svelte-795dab0c.js.map
