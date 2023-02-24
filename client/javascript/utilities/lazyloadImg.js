import lozad from 'lozad';

let instance = null;
class LazyLoadImg {
  constructor() {
    if (!instance) {
      instance = lozad('.lazyImg', {
        rootMargin: '0px',
      });
    }
    instance.observe();
  }

  DoObserver = () => {
    instance.observe();
  };
}

export default new LazyLoadImg();
