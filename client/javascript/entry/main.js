//import "intersection-observer";
import ComponentLoader from "../setup/component-loader";
import lazyloadImg from "../utilities/lazyloadImg";
function init() {
  ComponentLoader.lazyLoadComponents(document);
  lazyloadImg.DoObserver();
}
init();
