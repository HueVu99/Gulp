import Vue from "vue";
import VueScreen from "vue-screen";
import HttpCancelError from "../../utilities//HttpCancelError";
import ClickOutside from "vue-click-outside";
import EventEmitter from "../../utilities/EventEmitter";
import { route } from "../../utilities/route";
import searchService from "./searchService";
import FormService from "../dynamicForm/FormService";
const QrcodeReaderStream = () => import(/* webpackChunkName: "qrcodeReaderStream" */ "../qrCodeReader/Template");
const registerForm = () => import(/* webpackChunkName: "registerForm" */ "../dynamicForm/DynamicFormVue");
const serviceSupport = () => import(/* webpackChunkName: "serviceSupport" */ "../serviceSupport/ServiceSupport");
Vue.use(VueScreen, {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
});
export default class registerProduct {
  constructor(element) {
    this.selector = element;
    let elementID = element.getAttribute("id");
    let pageid = element.getAttribute("pageId");
    const productModel = route.getParam("modelno");
    // if (productModel && productModel.length > 0) {
    //   this.loadForm = true;
    // }
    // let requiredsearch =
    //   element.getAttribute("requiredvalidationfromsearch") && element.getAttribute("requiredvalidationfromsearch") != "false"
    //     ? true
    //     : false;
    let requiredurl =
      element.getAttribute("requiredvalidationfromurl") && element.getAttribute("requiredvalidationfromurl") != "false"
        ? true
        : false;
    let requiredsearch = requiredurl;
    new Vue({
      el: "#" + elementID,
      components: {
        "register-form": registerForm,
        "service-support": serviceSupport,
        "qrcode-reader-stream": QrcodeReaderStream,
      },
      props: {
        customClass: {
          type: String,
          defaults: "",
        },
        valueHtml: {
          type: String,
          defaults: "",
        },
      },
      data() {
        return {
          loading: true,
          scanProduct: true,
          firstSearch: false,
          stepIndex: 0,
          selectedData: {},
          searchQuery: "",
          loadingSuggestion: false,
          isShow: false,
          isShowInfo: true,
          searchDatas: [],
          slideShow: false,
          slideData: {},
          listRow: [],
          formAPI: "",
          pageid: pageid,
          requiredsearch: requiredsearch,
          requiredurl: requiredurl,
          registrationProduct: {},
          registrationRes: {},
          loadForm: false,
          numState: 1,
          isShowQrScan: false,
        };
      },

      created() {
        const self = this;

        this.listenToHashChange();
        this.listenToReload();
        //step__contents--show
        let $stepContents = document.getElementById("step__contents");
        let $stepContent1 = document.getElementById("step__content-1");
        if ($stepContents) {
          $stepContents.classList.remove("step__contents--show");
        }
        if ($stepContent1) {
          $stepContent1.classList.remove("step__content--show");
        }

        this.getService = new searchService();
        EventEmitter.on("activeStep", (index) => {
          this.setQueryUrl(index);
          self.stepIndex = index;
        });
        this.checkAfterReload();
        EventEmitter.on("registrations", (data) => {
          self.registrationProduct = data.registrationProduct;
          self.registrationRes = data.registrationRes;
          self.loadForm = data.loadForm;
        });
        EventEmitter.on("qrScan", (data) => {
          self.isShowQrScan = data;
        });
      },
      methods: {
        openQrScan() {
          this.isShowQrScan = true;
          // window.setTimeout(function () {

          // }, 1000);
          EventEmitter.emit("showQrScan", true);
        },
        removeProduct() {
          this.clearSearch();
        },
        selectProduct(data) {
          // this.loadForm = true;
          // this.searchQuery = data.ProductModel;
          this.selectedData = data;
          const dataJSON = JSON.parse(this.getRegisterLocalData());
          const arrSelected = (dataJSON ? dataJSON : []).slice();
          arrSelected[window.history.state.index] = this.selectedData;
          this.setRegisterLocalData(JSON.stringify(arrSelected));
          this.isShowInfo = true;
          this.closeSuggestion();
        },
        highlight(textContent) {
          if (!this.searchQuery) {
            return textContent;
          }
          return textContent.replace(new RegExp(this.searchQuery, "gi"), (match) => {
            return '<span class="highlight-text">' + match + "</span>";
          });
        },
        closeSuggestion() {
          this.isShow = false;
        },
        clearSearch() {
          this.searchQuery = "";
          this.selectedData = {};
          this.closeSuggestion();
        },
        getSuggestion() {
          var that = this;
          if (this.searchQuery.length < 3) {
            return false;
          }
          this.isShow = false;

          this.loadingSuggestion = true;
          that.searchDatas = [];
          const obj = this.getService
            .getData(this.searchQuery)
            .then((data) => {
              if (data.length > 0) {
                that.searchDatas = data;
                that.searchDatas.forEach((searchData) => {
                  searchData.SerialNumber = "";
                });
              } else {
                this.selectedData = {};
              }
              this.loadingSuggestion = false;
              this.isShow = true;
            })
            .catch((err) => {
              this.loadingSuggestion = false;
              if (err instanceof HttpCancelError) {
                return;
              }
            });
        },
        inputFocus(value) {
          if (value.length > 2) {
            this.isShow = true;
          }
        },
        // inputEnter() {
        // if (this.isShow) {
        //   if (this.searchDatas.length > 0) {
        //     this.selectProduct(this.searchDatas[0]);
        //   }
        // } else {
        //   if (this.searchQuery.length > 2) {
        //     this.getSuggestion();
        //   }
        // }
        // },
        onClose() {
          this.isShow = false;
        },
        goto(refName) {
          let $element = document.getElementById(refName);
          setTimeout(function () {
            if (refName && refName.length > 0) {
              $element.scrollIntoView();
            } else {
              document.documentElement.scrollIntoView();
            }
          }, 100);
        },
        onOpenSlide(apisrc) {
          EventEmitter.emit("showPopup", apisrc);
        },
        proceedModalCode(pramProductModel, pramSerialNumber, pramProductCode) {
          this.selectedData = {
            ImageSrc: "",
            ImageSrcSet: "",
            ProductModel: pramProductModel,
            ProductCode: pramProductCode,
            SerialNumber: pramSerialNumber,
          };
          this.registerProduct();
        },
        backStep() {
          if (this.stepIndex >= 1) {
            EventEmitter.emit("activeStep", this.stepIndex - 1);
            this.goto('');
          }
        },
        showInfo() {
          this.isShowInfo = !this.isShowInfo;
        },
        registerProduct() {
          const self = this;
          self.goto('');
          // EventEmitter.emit("activeStep", 2);
          if (self.loadForm) {
            this.setQueryUrl(2, self.selectedData.ProductModel);
            self.stepIndex = 2;
            return;
          } else {
            self.loadForm = true;
            if (!!self.listRow.length && !!this.registrationProduct) {
              self.listRow.forEach((row) => {
                row.listElement.forEach((element) => {
                  if (!!element.autofill && element.autofill == true) {
                    element.defaultValue = self.registrationProduct[element.name];
                  }
                  if (element.name == "ModelNumber" || element.name == "model") {
                    element.defaultValue = self.selectedData.ProductModel;
                    element.type = "hidden";
                  }
                  if (element.name == "ProductCode") {
                    element.defaultValue = self.selectedData.ProductCode;
                    element.type = "hidden";
                  }
                  if (element.name == "SerialNumber") {
                    // element.defaultValue = self.selectedData.SerialNumber;
                    if (self.selectedData.SerialNumber.length > 0) {
                      element.defaultValue = self.selectedData.SerialNumber;
                      element.type = "hidden";
                    } else {
                      element.type = "text";
                      element.defaultValue = "";
                    }
                  }
                });
              });
              this.setQueryUrl(2, self.selectedData.ProductModel);
              self.stepIndex = 2;
            } else {
              self.loading = true;
              FormService.getFormData("?id=" + this.pageid)
                .then((res) => {
                  res.listRow.forEach((row) => {
                    row.listElement.forEach((element) => {
                      if (element.name == "ModelNumber" || element.name == "model") {
                        element.defaultValue = self.selectedData.ProductModel;
                        element.type = "hidden";
                      }
                      if (element.name == "ProductCode") {
                        element.defaultValue = self.selectedData.ProductCode;
                        element.type = "hidden";
                      }
                      if (element.name == "SerialNumber") {
                        // element.defaultValue = self.selectedData.SerialNumber;
                        if (self.selectedData.SerialNumber.length > 0) {
                          element.defaultValue = self.selectedData.SerialNumber;
                          element.type = "hidden";
                        } else {
                          element.defaultValue = "";
                        }
                      }
                    });
                  });
                  self.listRow = res.listRow;
                  self.formAPI = res.formAPI;
                  self.loading = false;
                  this.setQueryUrl(2, self.selectedData.ProductModel);
                  self.stepIndex = 2;
                })
                .catch((err) => {
                  self.loading = false;
                  this.setQueryUrl(1);
                  self.stepIndex = 1;
                  if (err instanceof HttpCancelError) {
                    return;
                  }
                });
            }
          }
          // }
        },
        reRegistration() {
          this.resetParams();
          this.stepIndex = 1;
          this.selectedData = {};
          this.searchQuery = "";
          this.isShowInfo = false;
          this.goto('');
        },
        resetParams() {
          const url = new URL(window.location);
          url.search = "";
          url.searchParams.set("step", 1);
          const state = window.history.state;
          const { index } = state;
          const stateData = {
            ...state,
            index: index + 1,
            num: (this.numState += 1),
          };
          window.history.pushState(stateData, "", url);
        },
        setQueryUrl(number, productModel = "") {
          const url = new URL(window.location);
          const state = window.history.state;
          if (productModel) {
            url.searchParams.set("modelno", productModel);
          }
          url.searchParams.set("step", number);
          if (state) {
            const { registrationProduct, selectedData, index } = state;
            const regisData = registrationProduct.slice();
            const selected = selectedData.slice();
            regisData[index] = this.registrationProduct;
            selected[index] = this.selectedData;
            const stateData = {
              ...state,
              registrationProduct: regisData,
              selectedData: selected,
              num: (this.numState += 1),
            };
            window.history.pushState(stateData, "", url);
            return;
          }
          const stateData = {
            registrationProduct: [],
            selectedData: [],
            index: 0,
            num: this.numState,
          };
          window.history.pushState(stateData, "", url);
        },
        listenToHashChange() {
          window.addEventListener("popstate", (e) => {
            const url = new URL(window.location);
            const step = url.searchParams.get("step");
            if (step) {
              const { selectedData, index, registrationProduct, num } = e.state;
              this.selectedData = selectedData[index]
                ? selectedData[index]
                : num <= this.numState
                ? JSON.parse(this.getRegisterLocalData())[index]
                  ? JSON.parse(this.getRegisterLocalData())[index]
                  : {}
                : this.selectedData;
              this.registrationProduct = registrationProduct[index] ? registrationProduct[index] : this.registrationProduct;
              this.stepIndex = step;
              return;
            }
          });
        },
        listenToReload() {
          window.addEventListener("beforeunload", () => {
            this.removePreviousData();
          });
        },
        checkAfterReload() {
          const params = new URLSearchParams(window.location.search);
          const step = params.get("step");
          const model = params.get("modelno");
          if (
            !step ||
            step === "1" ||
            ((step === "2" || step === "3") && !model) ||
            (step !== "1" && step !== "2" && step !== "3" && !model)
          ) {
            this.setActiveStep(1);
          }
        },
        setActiveStep(number) {
          EventEmitter.emit("activeStep", number);
        },
        setRegisterLocalData(value) {
          localStorage.setItem("dataPrevious", value);
        },
        getRegisterLocalData() {
          return localStorage.getItem("dataPrevious");
        },
        removePreviousData() {
          localStorage.removeItem("dataPrevious");
        },
      },
      mounted() {
        const self = this;

        const getProductModel = route.getParam("modelno");
        const getSerialNumber = route.getParam("machineno") || "";
        const getProductCode = route.getParam("pnc") || "";

        if (getProductModel) {
          self.firstSearch = true;

          const obj = this.getService
            .getData(getProductModel)
            .then((data) => {
              if (data.length > 0) {
                self.scanProduct = true;
                self.selectedData = data[0];
                if (getSerialNumber.length > 0) {
                  self.selectedData.SerialNumber = getSerialNumber;
                } else {
                  self.selectedData.SerialNumber = self.selectedData.SerialNumber ? self.selectedData.SerialNumber : "";
                }
                if (getProductCode.length > 0) {
                  self.selectedData.ProductCode = getProductCode;
                } else {
                  self.selectedData.ProductCode = self.selectedData.ProductCode ? self.selectedData.ProductCode : "";
                }
                self.isShowInfo = true;
                self.registerProduct();
              } else {
                if (requiredurl) {
                  self.stepIndex = 1;
                  // self.goto("step__content-1");
                  self.searchQuery = getProductModel;
                  self.isShow = true;
                  self.scanProduct = false;
                  this.$nextTick(() => this.$refs.refInputModelCode.focus());
                } else {
                  self.isShowInfo = true;
                  self.proceedModalCode(getProductModel, getSerialNumber, getProductCode);
                }
              }
              self.loading = false;
            })
            .catch((err) => {
              self.loading = false;
              this.stepIndex = 1;
              if (err instanceof HttpCancelError) {
                return;
              }
            });
        } else {
          self.loading = false;
          this.stepIndex = 1;
        }
      },
      watch: {
        searchQuery: {
          immediate: true,
          handler(value) {
            //check and dont reget suggestion when scan false
            if (this.firstSearch) {
              this.firstSearch = false;
              return false;
            }

            this.scanProduct = true;
            if (value.length > 2) {
              this.getSuggestion();
            } else {
              this.isShow = false;
            }
          },
          deep: true,
        },
      },
      computed: {},
      // do not forget this section
      directives: {
        ClickOutside,
      },
    });
  }
}
