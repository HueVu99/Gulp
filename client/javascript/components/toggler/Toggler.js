class Toggler {
  constructor(element) {
    const target = document.querySelectorAll(element.getAttribute('data-target'));

    if (target) {
      this.target = target;
      element.addEventListener('click', (event) => this.clickEventHandler(event));
    }
  }

  clickEventHandler(event) {
    [].forEach.call(this.target, (x) => x.classList.toggle('active'));
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
}

export default Toggler;
