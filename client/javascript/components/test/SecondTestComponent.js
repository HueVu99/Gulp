import TestService from "./TestService";
class SecondTestComponent {
  constructor(element) {
    this.height = 1;
    this.width = 2;
    this.print();
    this.selector = element.querySelector(".js_test__button-second");

    if (this.selector) {
      this.selector.addEventListener("click", (event) => this.clickEventHandler(event));
    }
  }
  // Getter
  get area() {
    return this.calcArea();
  }
  // Method
  calcArea() {
    return this.height * this.width;
  }
  print() {
  }
  clickEventHandler(event) {
    alert("Component second work fine");
  }
}

export default SecondTestComponent;
