function noop() {
}
function assign(tar, src) {
  for (const k in src)
    tar[k] = src[k];
  return tar;
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}
function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    const lets = definition[2](fn(dirty));
    if ($$scope.dirty === void 0) {
      return lets;
    }
    if (typeof lets === "object") {
      const merged = [];
      const len = Math.max($$scope.dirty.length, lets.length);
      for (let i = 0; i < len; i += 1) {
        merged[i] = $$scope.dirty[i] | lets[i];
      }
      return merged;
    }
    return $$scope.dirty | lets;
  }
  return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
  if (slot_changes) {
    const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}
function get_all_dirty_from_scope($$scope) {
  if ($$scope.ctx.length > 32) {
    const dirty = [];
    const length = $$scope.ctx.length / 32;
    for (let i = 0; i < length; i++) {
      dirty[i] = -1;
    }
    return dirty;
  }
  return -1;
}
function action_destroyer(action_result) {
  return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}
let is_hydrating = false;
function start_hydrating() {
  is_hydrating = true;
}
function end_hydrating() {
  is_hydrating = false;
}
function upper_bound(low, high, key, value) {
  while (low < high) {
    const mid = low + (high - low >> 1);
    if (key(mid) <= value) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
}
function init_hydrate(target) {
  if (target.hydrate_init)
    return;
  target.hydrate_init = true;
  let children2 = target.childNodes;
  if (target.nodeName === "HEAD") {
    const myChildren = [];
    for (let i = 0; i < children2.length; i++) {
      const node = children2[i];
      if (node.claim_order !== void 0) {
        myChildren.push(node);
      }
    }
    children2 = myChildren;
  }
  const m = new Int32Array(children2.length + 1);
  const p = new Int32Array(children2.length);
  m[0] = -1;
  let longest = 0;
  for (let i = 0; i < children2.length; i++) {
    const current = children2[i].claim_order;
    const seqLen = (longest > 0 && children2[m[longest]].claim_order <= current ? longest + 1 : upper_bound(1, longest, (idx) => children2[m[idx]].claim_order, current)) - 1;
    p[i] = m[seqLen] + 1;
    const newLen = seqLen + 1;
    m[newLen] = i;
    longest = Math.max(newLen, longest);
  }
  const lis = [];
  const toMove = [];
  let last = children2.length - 1;
  for (let cur = m[longest] + 1; cur != 0; cur = p[cur - 1]) {
    lis.push(children2[cur - 1]);
    for (; last >= cur; last--) {
      toMove.push(children2[last]);
    }
    last--;
  }
  for (; last >= 0; last--) {
    toMove.push(children2[last]);
  }
  lis.reverse();
  toMove.sort((a, b) => a.claim_order - b.claim_order);
  for (let i = 0, j = 0; i < toMove.length; i++) {
    while (j < lis.length && toMove[i].claim_order >= lis[j].claim_order) {
      j++;
    }
    const anchor = j < lis.length ? lis[j] : null;
    target.insertBefore(toMove[i], anchor);
  }
}
function append_hydration(target, node) {
  if (is_hydrating) {
    init_hydrate(target);
    if (target.actual_end_child === void 0 || target.actual_end_child !== null && target.actual_end_child.parentElement !== target) {
      target.actual_end_child = target.firstChild;
    }
    while (target.actual_end_child !== null && target.actual_end_child.claim_order === void 0) {
      target.actual_end_child = target.actual_end_child.nextSibling;
    }
    if (node !== target.actual_end_child) {
      if (node.claim_order !== void 0 || node.parentNode !== target) {
        target.insertBefore(node, target.actual_end_child);
      }
    } else {
      target.actual_end_child = node.nextSibling;
    }
  } else if (node.parentNode !== target || node.nextSibling !== null) {
    target.appendChild(node);
  }
}
function insert_hydration(target, node, anchor) {
  if (is_hydrating && !anchor) {
    append_hydration(target, node);
  } else if (node.parentNode !== target || node.nextSibling != anchor) {
    target.insertBefore(node, anchor || null);
  }
}
function detach(node) {
  node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
  for (let i = 0; i < iterations.length; i += 1) {
    if (iterations[i])
      iterations[i].d(detaching);
  }
}
function element(name) {
  return document.createElement(name);
}
function svg_element(name) {
  return document.createElementNS("http://www.w3.org/2000/svg", name);
}
function text(data) {
  return document.createTextNode(data);
}
function space() {
  return text(" ");
}
function empty() {
  return text("");
}
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}
function attr(node, attribute, value) {
  if (value == null)
    node.removeAttribute(attribute);
  else if (node.getAttribute(attribute) !== value)
    node.setAttribute(attribute, value);
}
function xlink_attr(node, attribute, value) {
  node.setAttributeNS("http://www.w3.org/1999/xlink", attribute, value);
}
function children(element2) {
  return Array.from(element2.childNodes);
}
function init_claim_info(nodes) {
  if (nodes.claim_info === void 0) {
    nodes.claim_info = { last_index: 0, total_claimed: 0 };
  }
}
function claim_node(nodes, predicate, processNode, createNode, dontUpdateLastIndex = false) {
  init_claim_info(nodes);
  const resultNode = (() => {
    for (let i = nodes.claim_info.last_index; i < nodes.length; i++) {
      const node = nodes[i];
      if (predicate(node)) {
        const replacement = processNode(node);
        if (replacement === void 0) {
          nodes.splice(i, 1);
        } else {
          nodes[i] = replacement;
        }
        if (!dontUpdateLastIndex) {
          nodes.claim_info.last_index = i;
        }
        return node;
      }
    }
    for (let i = nodes.claim_info.last_index - 1; i >= 0; i--) {
      const node = nodes[i];
      if (predicate(node)) {
        const replacement = processNode(node);
        if (replacement === void 0) {
          nodes.splice(i, 1);
        } else {
          nodes[i] = replacement;
        }
        if (!dontUpdateLastIndex) {
          nodes.claim_info.last_index = i;
        } else if (replacement === void 0) {
          nodes.claim_info.last_index--;
        }
        return node;
      }
    }
    return createNode();
  })();
  resultNode.claim_order = nodes.claim_info.total_claimed;
  nodes.claim_info.total_claimed += 1;
  return resultNode;
}
function claim_element_base(nodes, name, attributes, create_element) {
  return claim_node(nodes, (node) => node.nodeName === name, (node) => {
    const remove = [];
    for (let j = 0; j < node.attributes.length; j++) {
      const attribute = node.attributes[j];
      if (!attributes[attribute.name]) {
        remove.push(attribute.name);
      }
    }
    remove.forEach((v) => node.removeAttribute(v));
    return void 0;
  }, () => create_element(name));
}
function claim_element(nodes, name, attributes) {
  return claim_element_base(nodes, name, attributes, element);
}
function claim_svg_element(nodes, name, attributes) {
  return claim_element_base(nodes, name, attributes, svg_element);
}
function claim_text(nodes, data) {
  return claim_node(nodes, (node) => node.nodeType === 3, (node) => {
    const dataStr = "" + data;
    if (node.data.startsWith(dataStr)) {
      if (node.data.length !== dataStr.length) {
        return node.splitText(dataStr.length);
      }
    } else {
      node.data = dataStr;
    }
  }, () => text(data), true);
}
function claim_space(nodes) {
  return claim_text(nodes, " ");
}
function set_data(text2, data) {
  data = "" + data;
  if (text2.wholeText !== data)
    text2.data = data;
}
function set_style(node, key, value, important) {
  if (value === null) {
    node.style.removeProperty(key);
  } else {
    node.style.setProperty(key, value, important ? "important" : "");
  }
}
function custom_event(type, detail, bubbles = false) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, bubbles, false, detail);
  return e;
}
function query_selector_all(selector, parent = document.body) {
  return Array.from(parent.querySelectorAll(selector));
}
let current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail);
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
    }
  };
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
function add_flush_callback(fn) {
  flush_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  const saved_component = current_component;
  do {
    while (flushidx < dirty_components.length) {
      const component = dirty_components[flushidx];
      flushidx++;
      set_current_component(component);
      update(component.$$);
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
const outroing = /* @__PURE__ */ new Set();
let outros;
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros
  };
}
function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }
  outros = outros.p;
}
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}
function transition_out(block, local, detach2, callback) {
  if (block && block.o) {
    if (outroing.has(block))
      return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);
      if (callback) {
        if (detach2)
          block.d(1);
        callback();
      }
    });
    block.o(local);
  }
}
const globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
function outro_and_destroy_block(block, lookup) {
  transition_out(block, 1, 1, () => {
    lookup.delete(block.key);
  });
}
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
  let o = old_blocks.length;
  let n = list.length;
  let i = o;
  const old_indexes = {};
  while (i--)
    old_indexes[old_blocks[i].key] = i;
  const new_blocks = [];
  const new_lookup = /* @__PURE__ */ new Map();
  const deltas = /* @__PURE__ */ new Map();
  i = n;
  while (i--) {
    const child_ctx = get_context(ctx, list, i);
    const key = get_key(child_ctx);
    let block = lookup.get(key);
    if (!block) {
      block = create_each_block(key, child_ctx);
      block.c();
    } else if (dynamic) {
      block.p(child_ctx, dirty);
    }
    new_lookup.set(key, new_blocks[i] = block);
    if (key in old_indexes)
      deltas.set(key, Math.abs(i - old_indexes[key]));
  }
  const will_move = /* @__PURE__ */ new Set();
  const did_move = /* @__PURE__ */ new Set();
  function insert(block) {
    transition_in(block, 1);
    block.m(node, next);
    lookup.set(block.key, block);
    next = block.first;
    n--;
  }
  while (o && n) {
    const new_block = new_blocks[n - 1];
    const old_block = old_blocks[o - 1];
    const new_key = new_block.key;
    const old_key = old_block.key;
    if (new_block === old_block) {
      next = new_block.first;
      o--;
      n--;
    } else if (!new_lookup.has(old_key)) {
      destroy(old_block, lookup);
      o--;
    } else if (!lookup.has(new_key) || will_move.has(new_key)) {
      insert(new_block);
    } else if (did_move.has(old_key)) {
      o--;
    } else if (deltas.get(new_key) > deltas.get(old_key)) {
      did_move.add(new_key);
      insert(new_block);
    } else {
      will_move.add(old_key);
      o--;
    }
  }
  while (o--) {
    const old_block = old_blocks[o];
    if (!new_lookup.has(old_block.key))
      destroy(old_block, lookup);
  }
  while (n)
    insert(new_blocks[n - 1]);
  return new_blocks;
}
function get_spread_update(levels, updates) {
  const update2 = {};
  const to_null_out = {};
  const accounted_for = { $$scope: 1 };
  let i = levels.length;
  while (i--) {
    const o = levels[i];
    const n = updates[i];
    if (n) {
      for (const key in o) {
        if (!(key in n))
          to_null_out[key] = 1;
      }
      for (const key in n) {
        if (!accounted_for[key]) {
          update2[key] = n[key];
          accounted_for[key] = 1;
        }
      }
      levels[i] = n;
    } else {
      for (const key in o) {
        accounted_for[key] = 1;
      }
    }
  }
  for (const key in to_null_out) {
    if (!(key in update2))
      update2[key] = void 0;
  }
  return update2;
}
function get_spread_object(spread_props) {
  return typeof spread_props === "object" && spread_props !== null ? spread_props : {};
}
function bind(component, name, callback) {
  const index = component.$$.props[name];
  if (index !== void 0) {
    component.$$.bound[index] = callback;
    callback(component.$$.ctx[index]);
  }
}
function create_component(block) {
  block && block.c();
}
function claim_component(block, parent_nodes) {
  block && block.l(parent_nodes);
}
function mount_component(component, target, anchor, customElement) {
  const { fragment, on_mount, on_destroy, after_update } = component.$$;
  fragment && fragment.m(target, anchor);
  if (!customElement) {
    add_render_callback(() => {
      const new_on_destroy = on_mount.map(run).filter(is_function);
      if (on_destroy) {
        on_destroy.push(...new_on_destroy);
      } else {
        run_all(new_on_destroy);
      }
      component.$$.on_mount = [];
    });
  }
  after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: null,
    props,
    update: noop,
    not_equal,
    bound: blank_object(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root
  };
  append_styles && append_styles($$.root);
  let ready = false;
  $$.ctx = instance ? instance(component, options.props || {}, (i, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;
    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i])
        $$.bound[i](value);
      if (ready)
        make_dirty(component, i);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      start_hydrating();
      const nodes = children(options.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      $$.fragment && $$.fragment.c();
    }
    if (options.intro)
      transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor, options.customElement);
    end_hydrating();
    flush();
  }
  set_current_component(parent_component);
}
class SvelteComponent {
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }
  $on(type, callback) {
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      const index = callbacks.indexOf(callback);
      if (index !== -1)
        callbacks.splice(index, 1);
    };
  }
  $set($$props) {
    if (this.$$set && !is_empty($$props)) {
      this.$$.skip_bound = true;
      this.$$set($$props);
      this.$$.skip_bound = false;
    }
  }
}
const subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set(fn(value));
  }
  function subscribe(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update: update2, subscribe };
}
const pi = Math.PI, tau = 2 * pi, epsilon = 1e-6, tauEpsilon = tau - epsilon;
function Path() {
  this._x0 = this._y0 = this._x1 = this._y1 = null;
  this._ = "";
}
function path() {
  return new Path();
}
Path.prototype = path.prototype = {
  constructor: Path,
  moveTo: function(x2, y2) {
    this._ += "M" + (this._x0 = this._x1 = +x2) + "," + (this._y0 = this._y1 = +y2);
  },
  closePath: function() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  },
  lineTo: function(x2, y2) {
    this._ += "L" + (this._x1 = +x2) + "," + (this._y1 = +y2);
  },
  quadraticCurveTo: function(x1, y1, x2, y2) {
    this._ += "Q" + +x1 + "," + +y1 + "," + (this._x1 = +x2) + "," + (this._y1 = +y2);
  },
  bezierCurveTo: function(x1, y1, x2, y2, x3, y3) {
    this._ += "C" + +x1 + "," + +y1 + "," + +x2 + "," + +y2 + "," + (this._x1 = +x3) + "," + (this._y1 = +y3);
  },
  arcTo: function(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
    var x0 = this._x1, y0 = this._y1, x21 = x2 - x1, y21 = y2 - y1, x01 = x0 - x1, y01 = y0 - y1, l01_2 = x01 * x01 + y01 * y01;
    if (r < 0)
      throw new Error("negative radius: " + r);
    if (this._x1 === null) {
      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
    } else if (!(l01_2 > epsilon))
      ;
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
    } else {
      var x20 = x2 - x0, y20 = y2 - y0, l21_2 = x21 * x21 + y21 * y21, l20_2 = x20 * x20 + y20 * y20, l21 = Math.sqrt(l21_2), l01 = Math.sqrt(l01_2), l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2), t01 = l / l01, t21 = l / l21;
      if (Math.abs(t01 - 1) > epsilon) {
        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
      }
      this._ += "A" + r + "," + r + ",0,0," + +(y01 * x20 > x01 * y20) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
    }
  },
  arc: function(x2, y2, r, a0, a1, ccw) {
    x2 = +x2, y2 = +y2, r = +r, ccw = !!ccw;
    var dx = r * Math.cos(a0), dy = r * Math.sin(a0), x0 = x2 + dx, y0 = y2 + dy, cw = 1 ^ ccw, da = ccw ? a0 - a1 : a1 - a0;
    if (r < 0)
      throw new Error("negative radius: " + r);
    if (this._x1 === null) {
      this._ += "M" + x0 + "," + y0;
    } else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._ += "L" + x0 + "," + y0;
    }
    if (!r)
      return;
    if (da < 0)
      da = da % tau + tau;
    if (da > tauEpsilon) {
      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x2 - dx) + "," + (y2 - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
    } else if (da > epsilon) {
      this._ += "A" + r + "," + r + ",0," + +(da >= pi) + "," + cw + "," + (this._x1 = x2 + r * Math.cos(a1)) + "," + (this._y1 = y2 + r * Math.sin(a1));
    }
  },
  rect: function(x2, y2, w, h) {
    this._ += "M" + (this._x0 = this._x1 = +x2) + "," + (this._y0 = this._y1 = +y2) + "h" + +w + "v" + +h + "h" + -w + "Z";
  },
  toString: function() {
    return this._;
  }
};
function constant(x2) {
  return function constant2() {
    return x2;
  };
}
var slice = Array.prototype.slice;
function x(p) {
  return p[0];
}
function y(p) {
  return p[1];
}
class Bump {
  constructor(context, x2) {
    this._context = context;
    this._x = x2;
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  }
  point(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0: {
        this._point = 1;
        if (this._line)
          this._context.lineTo(x2, y2);
        else
          this._context.moveTo(x2, y2);
        break;
      }
      case 1:
        this._point = 2;
      default: {
        if (this._x)
          this._context.bezierCurveTo(this._x0 = (this._x0 + x2) / 2, this._y0, this._x0, y2, x2, y2);
        else
          this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + y2) / 2, x2, this._y0, x2, y2);
        break;
      }
    }
    this._x0 = x2, this._y0 = y2;
  }
}
function bumpX(context) {
  return new Bump(context, true);
}
function linkSource(d) {
  return d.source;
}
function linkTarget(d) {
  return d.target;
}
function link(curve) {
  let source = linkSource;
  let target = linkTarget;
  let x$1 = x;
  let y$1 = y;
  let context = null;
  let output = null;
  function link2() {
    let buffer;
    const argv = slice.call(arguments);
    const s = source.apply(this, argv);
    const t = target.apply(this, argv);
    if (context == null)
      output = curve(buffer = path());
    output.lineStart();
    argv[0] = s, output.point(+x$1.apply(this, argv), +y$1.apply(this, argv));
    argv[0] = t, output.point(+x$1.apply(this, argv), +y$1.apply(this, argv));
    output.lineEnd();
    if (buffer)
      return output = null, buffer + "" || null;
  }
  link2.source = function(_) {
    return arguments.length ? (source = _, link2) : source;
  };
  link2.target = function(_) {
    return arguments.length ? (target = _, link2) : target;
  };
  link2.x = function(_) {
    return arguments.length ? (x$1 = typeof _ === "function" ? _ : constant(+_), link2) : x$1;
  };
  link2.y = function(_) {
    return arguments.length ? (y$1 = typeof _ === "function" ? _ : constant(+_), link2) : y$1;
  };
  link2.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), link2) : context;
  };
  return link2;
}
export { SvelteComponent, action_destroyer, add_flush_callback, afterUpdate, append_hydration, assign, attr, bind, binding_callbacks, bumpX, check_outros, children, claim_component, claim_element, claim_space, claim_svg_element, claim_text, createEventDispatcher, create_component, create_slot, destroy_component, destroy_each, detach, element, empty, get_all_dirty_from_scope, get_slot_changes, get_spread_object, get_spread_update, globals, group_outros, init, insert_hydration, link, listen, mount_component, noop, onMount, outro_and_destroy_block, query_selector_all, run_all, safe_not_equal, setContext, set_data, set_style, space, svg_element, text, tick, transition_in, transition_out, update_keyed_each, update_slot_base, writable, xlink_attr };
//# sourceMappingURL=vendor-60f50316.js.map
