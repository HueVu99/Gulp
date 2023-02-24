export function clone(obj) {
  return { ...obj };
}

export function defaults(obj, defaultObject) {
  return { ...defaultObject, ...obj };
}

export function insertAfter(refNode, nodeToInsert) {
  const parent = refNode.parentNode;
  const sibling = refNode.nextSibling;
  if (sibling) {
    parent.insertBefore(nodeToInsert, sibling);
  } else {
    parent.appendChild(nodeToInsert);
  }
}

export function insertBefore(refNode, nodeToInsert) {
  const parent = refNode.parentNode;
  parent.insertBefore(nodeToInsert, refNode);
}

export function forEach(items, fn) {
  if (!items) return;
  if (items.forEach) {
    items.forEach(fn);
  } else {
    for (let i = 0; i < items.length; i++) {
      fn(items[i], i, items);
    }
  }
}

export function debounce(ms, fn) {
  let timeout;
  const debouncedFn = function () {
    clearTimeout(timeout);
    timeout = setTimeout(fn, ms);
  };
  return debouncedFn;
}
