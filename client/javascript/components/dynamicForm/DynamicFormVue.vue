<template>
  <form class="c_form" @submit="handleSubmit" ref="dynamicForm">
    <div v-if="listrow" v-for="formRow in listrow" class="c_form__row row">
      <template v-for="formElement in formRow.listElement">
        <InputText v-if="inputTypes.find((i) => i == formElement.type)" v-bind="formElement" />
        <Checkbox v-else-if="formElement.type == 'checkbox'" v-bind="formElement" />
        <Radio v-else-if="formElement.type == 'radio'" v-bind="formElement" />
        <Select v-else-if="formElement.type == 'select'" v-bind="formElement" />
        <CountryPhone v-else-if="formElement.type == 'countryPhone'" v-bind="formElement" />
        <DatePicker v-else-if="(formElement.type == 'datetime' || formElement.type === 'daterange') && isActiveComponent" v-bind="formElement" />
        <InputHtml v-else-if="formElement.type == 'html'" v-bind="formElement" />
        <InputHidden v-else-if="formElement.type == 'hidden'" v-bind="formElement" />
        <Captcha
          v-else-if="formElement.type == 'captcha' && formElement.defaultValue && isActiveComponent"
          ref="captcha"
          v-bind="formElement"
          :invalidcaptcha="invalidCaptcha"
          @emitTokenUser="handleTokenUser($event)"
          @expiredTokenUser="tokenUser = ''"
        />
        <template v-else-if="formElement.type == 'button'">
          <div class="col-12 c_form__group c_form__error-message" v-if="submiterror">
            {{ submiterror }}
          </div>
          <SubmitBtn @validateForm="validateForm()" :submiterror="submitError" :issubmitting="isSubmitting" v-bind="formElement" />
        </template>
        <ResetBtn v-else-if="formElement.type == 'reset'"  @resetForm="resetForm()" v-bind="formElement" />
      </template>
    </div>
  </form>
</template>

<script>
import EventEmitter from "../../utilities/EventEmitter";
import Template from '../howDoIFind/Template.vue';
import FormService from "./FormService";

const InputHtml = () => import(/* webpackChunkName: "form" */ "./InputHtml");
const InputText = () => import(/* webpackChunkName: "form" */ "./InputText");
const Checkbox = () => import(/* webpackChunkName: "form" */ "./Checkbox");
const Radio = () => import(/* webpackChunkName: "form" */ "./Radio");
const Select = () => import(/* webpackChunkName: "form" */ "./Select");
const CountryPhone = () => import(/* webpackChunkName: "form" */ "./CountryPhone");
const DatePicker = () => import(/* webpackChunkName: "lazyform" */ "./DatePicker");
const InputHidden = () => import(/* webpackChunkName: "form" */ "./InputHidden");
const Captcha = () => import(/* webpackChunkName: "lazyform" */ "./Captcha");
const SubmitBtn = () => import(/* webpackChunkName: "form" */ "./SubmitBtn.vue");
const ResetBtn = () => import(/* webpackChunkName: "form" */ "./ResetBtn.vue");

// import InputHtml from "./InputHtml";
// import InputText from "./InputText";
// import Checkbox from "./Checkbox";
// import Radio from "./Radio";
// import Select from "./Select";
// import CountryPhone from "./CountryPhone";
// import DatePicker from "./DatePicker";
// import InputHidden from "./InputHidden";
// import Captcha from "./Captcha.vue";

const INPUT_TYPES = ["text", "email", "tel", "number"];
export default {
  components: {
    InputHtml,
    InputText,
    Checkbox,
    Radio,
    Select,
    CountryPhone,
    DatePicker,
    InputHidden,
    Captcha,
    SubmitBtn,
    ResetBtn
  },
  props: {
    pageid: {
      type: String,
      defaults: "",
    },
    formapi: {
      type: String,
      defaults: "",
    },
    listrow: {
      type: Array,
      defaults: Array,
    },
  },
  data() {
    return {
      invalidInput: "",
      listField: "",
      inputTypes: INPUT_TYPES,
      isSubmitting: false,
      submitError: "",
      invalidCaptcha: false,
      tokenUser: "",
      isActiveComponent: false,
    };
  },
  updated() {
    this.generateListField();
    this.watchValidateForm();
  },
  created() {},
  mounted() {
    this.generateListField();
    this.watchValidateForm();
    window.addEventListener('scroll', this.scrollListener);
  },
  destroyed() {
    // window.removeEventListener("scroll", this.scrollListener);
  },
  watch: {
    listrow(value) {
      setTimeout(() => {
        this.generateListField();
        this.watchValidateForm();
      }, 10);
    },
    isActiveComponent(value) {
      if(value) {
        window.removeEventListener("scroll", this.scrollListener);
      }
    }
  },
  computed: {},
  methods: {
    handleSubmit() {
      const { dynamicForm } = this.$refs;
      const formData = this.convertData(Object.fromEntries(new FormData(dynamicForm).entries()));
      this.submitError = '';
      this.isSubmitting = true;
      const self = this;
      FormService.sendData(this.formapi, formData)
        .then((data) => {
          let resData = data;
          if (resData && resData.success) {
            EventEmitter.emit("registrations", {
              registrationProduct: formData,
              registrationRes: resData,
              loadForm: false,
            });
            EventEmitter.emit("activeStep", 3);
            setTimeout(function () {
              //scroll top document
              document.documentElement.scrollIntoView();
            }, 100);
            // dynamicForm.reset();
            if(this.$refs.captcha) {
              // this.$refs.captcha[0].resetCaptcha();
            }
          }
        }).then((data) => {
          this.$refs.captcha[0].resetCaptcha();
        })
        .catch((err) => {
          console.log('innnnnn', err);
          this.submitError = "Can not submit this data!";
        })
        .finally(() => {
          self.isSubmitting = false;
        });
    },
    convertData(formData) {
      const { dynamicForm } = this.$refs;
      Object.keys(formData).forEach((key) => {
        const inputElement = dynamicForm.querySelector(`[name='${key}']`);
        if (!inputElement) {
          return;
        }
        const prefixValue = inputElement.getAttribute("data-prefix-value");
        if (prefixValue) {
          formData[key] = prefixValue + formData[key];
        }
        if (inputElement.type == "checkbox" || inputElement.type == "radio") {
          formData[key] = inputElement.checked ? 1 : 0;
        }
      });
      formData.blockid = this.pageid;
      return formData;
    },
    appendErrorElement(input) {
      const inputParent = input.parentElement;
      const groupElement = input.closest(".js_form-group");
      let errorElement =
        inputParent.querySelector(".c_form__error-message") ?? groupElement.querySelector(".c_form__error-message");
      if (errorElement) {
        errorElement.innerText = "";
      } else {
        errorElement = document.createElement("div");
        errorElement.classList.add("c_form__error-message");
        inputParent.append(errorElement);
      }
      return errorElement;
    },
    validateInput(input, validations) {
      const validity = input.validity;
      const errorElement = this.appendErrorElement(input);
      input.setAttribute("data-has-validated", 1);
      if (validity.valid) {
        if (this.invalidInput && this.invalidInput.isEqualNode(input)) {
          this.invalidInput = "";
        }
        input.classList.remove("has-error");
        return;
      }
      input.classList.add("has-error");
      let errorMessage = "This field is invalid";
      if (!this.invalidInput) {
        this.invalidInput = input;
      }
      if (validity.valueMissing) {
        const validOpt = validations.find((o) => o.type == "required");
        errorMessage = validOpt ? validOpt.messageError : "This field is required";
      } else if (validity.patternMismatch) {
        const validOpt = validations.find((o) => o.type == "pattern");
        errorMessage = validOpt ? validOpt.messageError : "This field is invalid";
      } else if (validity.typeMismatch) {
        const validOpt = validations.find((o) => o.type != "required" && o.type != "pattern");
        errorMessage = validOpt ? validOpt.messageError : "This field is not valid";
      }
      errorElement.innerText = errorMessage;
    },
    generateListField() {
      let res = [];
      [].forEach.call(this.$refs.dynamicForm.querySelectorAll("[name]"), (inputElement) => {
        if (inputElement.tagName.toLowerCase() != "input" && inputElement.tagName.toLowerCase() != "select") {
          return;
        }
        if (inputElement.getAttribute("type") == "hidden") {
          return;
        }
        let fieldData;
        this.listrow.forEach((rowData) => {
          rowData.listElement.forEach((item) => {
            if (item.name == inputElement.getAttribute("name")) {
              fieldData = item;
            }
          });
        });
        if (!fieldData || !fieldData.validations || fieldData.validations.length === 0) {
          return;
        }
        res.push({
          inputElement,
          fieldData,
        });
      });
      this.listField = res;
    },
    watchValidateForm() {
      this.listField.forEach((field) => {
        const { inputElement, fieldData } = field;
        const listenEvent = fieldData.type == "datetime" ? "changeDatepicker" : "input";
        inputElement.addEventListener(listenEvent, () => {
          this.validateInput(inputElement, fieldData.validations);
        });
      });
    },
    validateForm() {
      this.listField.forEach((field) => {
        const { inputElement, fieldData } = field;
        this.validateInput(inputElement, fieldData.validations);
      });
      if (this.invalidInput) {
        this.invalidInput.scrollIntoView();
        this.invalidInput.focus();
      };

      if (this.$refs.captcha) {
        this.validateCaptcha();
        return;
      }

      console.log(this.invalidInput)
      if (!this.invalidInput) {
        this.handleSubmit();
      }

    },
    resetForm() {
      this.listField.forEach((field) => {
        const { inputElement, fieldData } = field;
        const errorElement = this.appendErrorElement(inputElement);
        inputElement.classList.remove("has-error");
        errorElement.innerText ='';
      });
      if(this.$refs.captcha) {
        this.$refs.captcha[0].resetCaptcha();
      }
    },
    handleTokenUser(token) {
      this.tokenUser = token;
      this.invalidCaptcha = false;
    },
    validateCaptcha(event) {
      FormService.getKey({ Response: this.tokenUser })
        .then((res) => {
          if (this.$refs.captcha[0].checkStatusCatpcha() && !res.Success) {
            // this.$refs.captcha[0].resetCaptcha();
            return;
          }
          this.invalidCaptcha = !res.Success;
        })
        .finally((res) => {
          if (!this.invalidCaptcha && !this.invalidInput) {
            this.handleSubmit();
          }
        });
    },
    scrollListener() {
      let posScroll = window.scrollY;
      if(posScroll > 300 && this.isActiveComponent == false) {
        this.isActiveComponent = true;
      }
    },
  },
};
</script>
