export function showLoading(hasOverlay, elWrapper) {
  let overlayEl = elWrapper.querySelector('.js_loading__overlay');
  if (overlayEl) {
    return overlayEl;
  }
  overlayEl = document.createElement('div');
  if (hasOverlay) {
    overlayEl.classList.add('loading__overlay');
    overlayEl.classList.add('js_loading__overlay');
  } else {
    // overlayEl.style.textAlign = "center";
    overlayEl.classList.add('js_loading__overlay');
  }
  const dotsEl = document.createElement('div');
  dotsEl.classList.add('loading-dots');

  const dotOneEl = document.createElement('div');
  dotOneEl.classList.add('loading-dots--dot');
  dotOneEl.classList.add('loading-dots__one');
  dotsEl.appendChild(dotOneEl);

  const dotTwoEl = document.createElement('div');
  dotTwoEl.classList.add('loading-dots--dot');
  dotTwoEl.classList.add('loading-dots__two');

  dotsEl.appendChild(dotTwoEl);

  const dotThreeEl = document.createElement('div');
  dotThreeEl.classList.add('loading-dots--dot');
  dotThreeEl.classList.add('loading-dots__three');
  dotsEl.appendChild(dotThreeEl);

  const dotFourEl = document.createElement('div');
  dotFourEl.classList.add('loading-dots--dot');
  dotFourEl.classList.add('loading-dots__four');
  dotsEl.appendChild(dotFourEl);

  overlayEl.appendChild(dotsEl);

  elWrapper.appendChild(overlayEl);
  return overlayEl;
}

export function hideLoading(el) {
  const selector = document.querySelector(el);
  if (selector) {
    selector.remove();
  }
}
