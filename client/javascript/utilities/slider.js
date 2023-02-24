export function arrowDisable(Glide, Components) {
  return {
    mount() {
      // Only in effect when rewinding is disabled
      if (Glide.settings.rewind) {
        return;
      }

      Glide.on(['mount.after', 'run'], () => {
        // Filter out arrows_control
        for (const controlItem of Components.Controls.items) {
          if (controlItem.className === 'glide__arrows') {
            // Set left arrow state
            const left = controlItem.querySelector('.glide__arrow--left');
            if (left) {
              if (Glide.index === 0) {
                left.setAttribute('disabled', ''); // Disable on first slide
              } else {
                left.removeAttribute('disabled'); // Enable on other slides
              }
            }

            // Set right arrow state
            const right = controlItem.querySelector('.glide__arrow--right');
            if (right) {
              if (Glide.index >= Components.Sizes.length - Glide.settings.perView) {
                right.setAttribute('disabled', ''); // Disable on last slide
              } else {
                right.removeAttribute('disabled'); // Disable on other slides
              }
            }
            if (Components.Sizes.length < Glide.settings.perView) {
              left.style.display = 'none';
              right.style.display = 'none';
            } else {
              left.style.display = '';
              right.style.display = '';
            }
          }
        }
      });
    },
  };
}
