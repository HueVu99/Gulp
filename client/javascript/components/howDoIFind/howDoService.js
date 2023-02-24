import HttpClient from "../../utilities/HttpClient";
import { ENDPOINT } from "../../constants/index";

class howDoService {
  constructor() {
    this.httpClient = HttpClient.getInstance("");
  }
  getHowdo = (url) => this.httpClient.get(`${ENDPOINT.HOWDO}/${url}/`, true);
}

export default howDoService;
