import Vue from 'vue';
import searchProdTemp from './Template';
// import EventEmitter from "../../utilities/EventEmitter";

export default class searchProduct {
  constructor(element) {
    this.selector = element;
    const vueEl = document.createElement('div');
    this.selector.appendChild(vueEl);
    // let elementID = element.getAttribute('id');
    // this.searchService = new searchService();
    // EventEmitter.on('selectedProduct', (data) => {
    // })
    
    new Vue({
      el: vueEl,
      render(renderComponent){
        return renderComponent(searchProdTemp, {
            props: {
              
            },
        });
      }
    });
  }
}