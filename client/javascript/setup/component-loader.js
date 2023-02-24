const components = {
  registerProduct: () =>
    import(/* webpackPreload: true, webpackChunkName: "module" */ "../components/registerProduct/Index"),
  howDoIFind: () => import(/* webpackPreload: true, webpackChunkName: "module" */ "../components/howDoIFind/index"),
};

class ComponentLoader {
  // eslint-disable-next-line class-methods-use-this
  lazyLoadComponents(element) {
    const dataComponents = [...element.querySelectorAll("*[data-component]")];
    for (let i = 0; i < dataComponents.length; i++) {
      const component = dataComponents[i];
      const componentNames = component.getAttribute("data-component").split(",");
      componentNames.forEach((item) => {
        try {
          const componentItem = components[item.trim()];
          if (!componentItem) {
            return;
          }

          componentItem().then(({ default: Instance }) => {
            // eslint-disable-next-line no-new
            new Instance(component);
          });
        } catch (err) {
        }
      });
    }
  }
}

export default new ComponentLoader();
