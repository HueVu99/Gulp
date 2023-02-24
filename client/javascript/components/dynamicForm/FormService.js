import HttpClient from "../../utilities/HttpClient";
import { BASE_PREFIX, ENDPOINT } from "../../constants";

class FormService {
  constructor() {
    this.httpClient = HttpClient.getInstance();
  }
  getFormData = (params) => this.httpClient.get(`${ENDPOINT.DYNAMICS_FORM}/${params}`);
  sendData = (url, data) => {
    return this.httpClient.post(url.replace(BASE_PREFIX, ""), data);
  };
  getKey(params) {
    return this.httpClient.post(`${ENDPOINT.RECAPTCHA}/`, params, true);
  }
}

export default new FormService();
