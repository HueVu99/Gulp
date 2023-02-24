import Vue from "vue";
import DynamicFormVue from "./DynamicFormVue.vue";
import FormService from "./FormService";

export default class DynamicForm {
  constructor(element) {
    this.selector = element;
    this.createVueComponent();
  }
  createVueComponent() {
    const vueEl = document.createElement("div");
    this.selector.appendChild(vueEl);
    let pageId = this.selector.getAttribute("data-page-id");
    pageId = pageId ? pageId : 24;
    FormService.getFormData("?id=" + pageId).then((res) => {
      new Vue({
        el: vueEl,
        render(renderComponent) {
          return renderComponent(DynamicFormVue, {
            props: {
              ...res,
              pageId,
            },
          });
        },
      });
    });
  }
}
