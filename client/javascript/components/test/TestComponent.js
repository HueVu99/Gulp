import TestService from "./TestService";
class TestComponent {
  constructor(element) {
    this.height = 1;
    this.width = 2;
    this.print();
    this.selector = element.querySelector(".js_test__button");

    if (this.selector) {
      this.selector.addEventListener("click", (event) => this.clickEventHandler(event));
    }
    this.testServices = new TestService();
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
    this.TestCallAPI();
  }
  TestCallAPI() {
    const obj = this.testServices
      .getTest()
      .then((data) => {
      })
      .catch((err) => {
      });
  }
}

export default TestComponent;
