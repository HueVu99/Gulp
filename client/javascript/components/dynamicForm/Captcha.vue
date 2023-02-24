<template>
<div class="c_form__group c_form__captcha col-12">
  <vue-recaptcha
    :sitekey="defaultValue"
    :loadRecaptchaScript="true"
    @verify="checkCaptcha"
    @expired="expiredCaptcha"
  ></vue-recaptcha>
  <div v-show="invalidcaptcha" class="c_form__error-message">
    <p v-for="error of validations" :key="error.type">{{error.messageError}}</p>
  </div>
</div>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';

export default {
  components: { VueRecaptcha },
  props: {
    type: {
      type: String,
      default: "captcha",
    },
    defaultValue : {
      type: String,
      default: ""
    },
    invalidcaptcha: {
      type: Boolean,
      default: false
    },
    validations: {
      type: Array,
      default: Array
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    checkCaptcha(response){
      this.$emit('emitTokenUser', response);
    },
    expiredCaptcha(response) {
      this.$emit('expiredTokenUser');
    },
    resetCaptcha() {
      grecaptcha.reset();
    },
    checkStatusCatpcha() {
      return grecaptcha && grecaptcha.getResponse().length !== 0;
    }
  },
};
</script>
