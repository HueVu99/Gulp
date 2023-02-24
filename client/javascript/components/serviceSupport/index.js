import Vue from 'vue';
import serviceSupport from './ServiceSupport'

// import EventEmitter from "../../utilities/EventEmitter";

export default class ServiceSupport {
    constructor(element) {
      this.selector = element;
      this.createVueComponent();
    }
    createVueComponent() {
      const vueEl = document.createElement("div");
      this.selector.appendChild(vueEl);
      const datasupport = [
        {
          id: 1,
          title: "Service and Support",
          description:
            "Offer you delightful service and effortless support that is simply outstanding.",
          imageUrl: "/img/background.png",
          items: [
            {
              title: "Service and Repair Centre",
              url: "https://aeg.com/url",
              imageUrl: "/dist/ProductRegistration/electrolux/assets/icons/warranty-service.svg",
            },
            {
              title: "User Manuals",
              url: "https://aeg.com/url",
              imageUrl: "/dist/ProductRegistration/electrolux/assets/icons/warranty-service.svg",
            },
            {
              title: "Spare Parts and Accessories",
              url: "https://aeg.com/url",
              imageUrl: "/dist/ProductRegistration/electrolux/assets/icons/warranty-service.svg",
            },
            {
              title: "Warranty",
              url: "https://aeg.com/url",
              imageUrl: "/dist/ProductRegistration/electrolux/assets/icons/warranty-service.svg",
            },
          ],
          moreSupport: {
            title: "More support",
            url: "https://aeg.com/support",
            imageUrl: "",
          },
        },
        {
          id: 2,
          title: "Service and Support",
          description:
            "Offer you delightful service and effortless support that is simply outstanding. 2",
          imageUrl: "/img/background.png",
          items: [
            {
              title: "Service and Repair Centre",
              url: "https://aeg.com/url",
              imageUrl: "/dist/ProductRegistration/electrolux/assets/icons/warranty-service.svg",
            },
            {
              title: "User Manuals",
              url: "https://aeg.com/url",
              imageUrl: "/dist/ProductRegistration/electrolux/assets/icons/warranty-service.svg",
            },
            {
              title: "Spare Parts and Accessories",
              url: "https://aeg.com/url",
              imageUrl: "/dist/ProductRegistration/electrolux/assets/icons/warranty-service.svg",
            },
            {
              title: "Warranty",
              url: "https://aeg.com/url",
              imageUrl: "/dist/ProductRegistration/electrolux/assets/icons/warranty-service.svg",
            },
          ],
          moreSupport: {
            title: "More support",
            url: "https://aeg.com/support",
            imageUrl: "",
          },
        },
        {
          id: 3,
          title: "Service and Support",
          description:
            "Offer you delightful service and effortless support that is simply outstanding. 2",
          imageUrl: "/img/background.png",
          items: [
            {
              title: "Service and Repair Centre",
              url: "https://aeg.com/url",
              imageUrl: "/dist/ProductRegistration/electrolux/assets/icons/warranty-service.svg",
            },
            {
              title: "User Manuals",
              url: "https://aeg.com/url",
              imageUrl: "/dist/ProductRegistration/electrolux/assets/icons/warranty-service.svg",
            },
            {
              title: "Spare Parts and Accessories",
              url: "https://aeg.com/url",
              imageUrl: "/dist/ProductRegistration/electrolux/assets/icons/warranty-service.svg",
            },
            {
              title: "Warranty",
              url: "https://aeg.com/url",
              imageUrl: "/dist/ProductRegistration/electrolux/assets/icons/warranty-service.svg",
            },
          ],
          moreSupport: {
            title: "More support",
            url: "https://aeg.com/support",
            imageUrl: "",
          },
        },
      ];

      new Vue({
        el: vueEl,
        render(renderComponent) {
          return renderComponent(serviceSupport, {
            props: {
              datasupport
            }
          });
        },
      });
    }
  }