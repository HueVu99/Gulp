import HttpClient from "../../utilities/HttpClient";
import { ENDPOINT } from "../../constants/index";

class searchService {
  constructor() {
    this.httpClient = HttpClient.getInstance("");
  }
  getData = (code) => this.httpClient.get(`${ENDPOINT.SEARCH}/?Query=${code}`, true);
  getHowdo = (url) => this.httpClient.get(`${ENDPOINT.HOWDO}/${url}/`, true);
}

export default searchService;
