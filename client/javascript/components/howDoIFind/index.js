import Vue from 'vue';
import EventEmitter from "../../utilities/EventEmitter";
import howDoIFindTemp from './Template';

export default class howDoIFind {
  constructor(element) {
    this.selector = element;
    const vueEl = document.createElement('div');
    this.selector.appendChild(vueEl);
    // let elementID = element.getAttribute('id');
    // this.searchService = new searchService();
    // const self= this;
    // this.popupData = {};

    // EventEmitter.on('showPopup', (data) => {
    //   self.popupData = data;
    // });
    new Vue({
      el: vueEl,
      render(renderComponent){
        return renderComponent(howDoIFindTemp, {
            props: {
              // popupData: {
              //   slideShow: self.slideShow,
              //   slideData: self.popupData
              // }
            },
        });
      }
    });
  }
}