const DELAY_ON_SCROLL_IN_MILISECONDS = 100;
const functions = {};
const timeouts = {};

export default function registerWindowOnScroll(func, key, delay = DELAY_ON_SCROLL_IN_MILISECONDS) {
  // Check duplicate register
  if (functions[key]) {
    return;
  }
  functions[key] = {
    func,
    delay,
  };
}

export const handleScroll = () => {
  Object.keys(functions).forEach((key) => {
    const { func, delay } = functions[key];
    if (timeouts[key]) {
      clearTimeout(timeouts[key]);
    }

    timeouts[key] = setTimeout(() => {
      func();
    }, delay);
  });
};
