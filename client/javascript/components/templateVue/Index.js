import Vue from 'vue';
import TemplateVue from './Template';

export default class DynamicForm {
    constructor(element) {
        this.selector = element;
        const vueEl = document.createElement('div');
        this.selector.appendChild(vueEl);
        new Vue({
            el: vueEl,
            render(renderComponent){
                return renderComponent(TemplateVue, {
                    props: {
                        customClass: 'my-class',
                        valueHtml: '<h2> My H2 </h2>'
                    },
                });
            }
        });
    }
}