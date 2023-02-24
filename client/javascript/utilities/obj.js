export function mergeObjects(obj1, obj2) {
  return { ...obj1, ...obj2 };
}

export function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const executeFunction = function() {
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(executeFunction, wait);
  };
}
