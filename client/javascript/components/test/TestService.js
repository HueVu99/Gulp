import HttpClient from "../../utilities/HttpClient";
import { ENDPOINT } from "../../constants/index";

class TestService {
  constructor() {
    this.httpClient = HttpClient.getInstance("https://reqres.in/api/");
  }
  // getTest() {
  //   return this.httpClient.get(`${ENDPOINT.TEST}`);
  // }
  // arrow function default return
  getTest = () => this.httpClient.get(`${ENDPOINT.TEST}`);
}

export default TestService;
