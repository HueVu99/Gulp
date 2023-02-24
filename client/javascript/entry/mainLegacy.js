import "core-js/stable";
import "regenerator-runtime/runtime";
import "url-search-params-polyfill";
import "intersection-observer";
import ComponentLoader from "../setup/component-loader";
import lazyloadImg from "../utilities/lazyloadImg";
function init() {
  ComponentLoader.lazyLoadComponents(document);
  lazyloadImg.DoObserver();
}
init();
