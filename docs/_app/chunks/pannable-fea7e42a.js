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
export { pannable };
//# sourceMappingURL=pannable-fea7e42a.js.map
