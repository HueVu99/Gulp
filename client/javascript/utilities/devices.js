export function isMobileViewport() {
  const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  return w < 992;
}
