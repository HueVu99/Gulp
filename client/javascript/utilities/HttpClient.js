import axios from "axios";
import { BASE_URL } from "../constants";
import HttpCancelError from "./HttpCancelError";

const { CancelToken } = axios;

let instance;
const callerSecret = {};

export default class HttpClient {
  constructor(baseUrl = null, secret = null) {
    if (callerSecret !== secret) {
      throw "This is a singelton class. Use HttpClient.getInstance(baseUrl).";
    }
    this.axios = axios.create({
      baseURL: baseUrl || BASE_URL,
    });

    this.axios.interceptors.request.use((request) => {
      const token = document.getElementsByName("__RequestVerificationToken")[0].value;
      const htmlLang = document.getElementsByTagName("html")[0].getAttribute("lang");
      request.headers.__requestverificationtoken = token;
      request.headers.language = htmlLang;
      return request;
    });
  }
  static getInstance = (baseUrl) => {
    if (instance) return instance;
    return (instance = new HttpClient(baseUrl, callerSecret));
  };

  handleResponse = ({ data }) => Promise.resolve(data);

  handleError = (err) => {
    if (axios.isCancel(err)) {
      return Promise.reject(new HttpCancelError());
    }
    return Promise.reject(err && err.response && err.response.data);
  };

  handleCancelRequest = (doCancel) => doCancel && this.cancelRequest && this.cancelRequest();

  setCancelRequest = () => ({
    cancelToken: new CancelToken((canceler) => {
      this.cancelRequest = canceler;
    }),
  });

  get(url, cancelRequest = false) {
    this.handleCancelRequest(cancelRequest);
    return this.axios
      .get(url, {
        ...this.setCancelRequest(),
      })
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  post(url, body, cancelRequest = false) {
    this.handleCancelRequest(cancelRequest);
    return this.axios
      .post(url, body, {
        ...this.setCancelRequest(),
      })
      .then((response) => this.handleResponse(response))
      .catch(this.handleError);
  }

  put(url, body, cancelRequest = false) {
    this.handleCancelRequest(cancelRequest);
    return this.axios
      .put(url, body, {
        ...this.setCancelRequest(),
      })
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  delete(url, cancelRequest = false) {
    this.handleCancelRequest(cancelRequest);
    return this.axios
      .delete(url, {
        ...this.setCancelRequest(),
      })
      .then(this.handleResponse)
      .catch(this.handleError);
  }
}
