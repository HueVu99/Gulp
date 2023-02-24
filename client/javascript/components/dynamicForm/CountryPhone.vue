<template>
  <div :class="groupClass">
    <template v-if="!isAlterNative">
      <label class="c_form__label" :for="name">
        <span v-html="label"></span><span class="c_form__required" v-if="!!validationAttr.required">*</span>
      </label>
      <div class="c_country-phone">
        <div class="c_select-box js_select-box" :class="isShowPopup ? 'is-active' : ''">
          <button class="c_select-box__btn js_select-box-btn" type="button" @click="togglePopup" :disabled="options.length === 1">
            <span :class="getCountryImgClass(selectedCountry.iso2)"></span>
            {{ selectedCountry.iso2 }}
          </button>
          <div class="c_select-box__popup custom-scroll-bar">
            <div class="c_select-box__option" v-for="cOption in options" :data-value="cOption.value" @click="onChangeCountry(cOption.value)">
              <span :class="getCountryImgClass(cOption.value)"></span>
              {{ getCountryByIso2(cOption.value).iso2 }}
            </div>
          </div>
        </div>
        <div class="c_country-phone__input-box">
          <span class="c_country-phone__area-code">
            +{{ selectedCountry.dialCode }}
          </span>
          <input :id="name"
              @input="validateNumber"
              v-bind="{...validationAttr, ...elementAttr}"
          />
        </div>
      </div>
      <div class="c_form__error-message"></div>
    </template>
    <template v-else>
      <div class="c_alternate__content" ref="alternativeContent">
        <div class="c_country-phone">
          <div class="c_select-box js_select-box" :class="isShowPopup ? 'is-active' : ''">
            <button class="c_select-box__btn js_select-box-btn" type="button" @click="togglePopup" :disabled="options.length === 1">
              <span :class="getCountryImgClass(selectedCountry.iso2)"></span>
              {{ selectedCountry.iso2 }}
            </button>
            <div class="c_select-box__popup custom-scroll-bar">
              <div class="c_select-box__option" v-for="cOption in options" :data-value="cOption.value" @click="onChangeCountry(cOption.value)">
                <span :class="getCountryImgClass(cOption.value)"></span>
                {{ getCountryByIso2(cOption.value).iso2 }}
              </div>
            </div>
          </div>
          <div class="c_country-phone__input-box">
            <span class="c_country-phone__area-code">
              +{{ selectedCountry.dialCode }}
            </span>
              <input
                  :disabled="!isShowAlternate"
                  @input="validateNumber"
                  v-bind="{...validationAttr, ...elementAttr}"
              />
          </div>
        </div>
        <div class="c_form__error-message"></div>
      </div>
      <strong class="c_alternate__title" @click="toggleAlternate">
        <span class="c_alternate__span">
          {{ isShowAlternate ? '-' : '+' }}
        </span>
         <span v-html="label"></span>
      </strong>
    </template>
  </div>
</template>

<script>

import FormMixin from "./FormMixin";
import listCountryCode from "../../constants/listCountryCode";

export default {
  props: {
    options : {
      type: Array,
      default: Array
    },
  },
  mixins: [FormMixin],
  data() {
    return {
      selectedCountryName: this.defaultValue,
      isShowAlternate:false,
      isShowPopup:false,
    }
  },
  computed: {
    elementAttr() {
      return {
        type: "tel",
        id: this.id,
        name: this.name,
        class: "c_form__control",
        placeholder: this.placeholder,
        'data-prefix-value': '+' + this.selectedCountry.dialCode,
      };
    },
    selectedCountry() {
      return this.getCountryByIso2(this.selectedCountryName);
    }
  },
  created() {
    var self = this;
    document.addEventListener('click', (evt) => {
      if(!evt.target.closest('.js_select-box-btn')) {
        self.isShowPopup = false;
      }
    })
  },
  methods: {
    getCountryByName(name = 'Australia') {
      let res = listCountryCode.find(c => c.name.toString().toLowerCase().indexOf(name.toString().toLowerCase()) === 0);
      return res ? res : listCountryCode[0];
    },
    getCountryByIso2(iso2 = 'au') {
      let res = listCountryCode.find(c => c.iso2.toString().toLowerCase().indexOf(iso2.toString().toLowerCase()) === 0);
      return res ? res : listCountryCode[0];
    },
    getCountryImgClass(iso2) {
      let country = this.getCountryByIso2(iso2);
      return 'c_country-phone__img c_country-phone__img--' + country.iso2
    },
    closeAllPopup() {
      [].forEach.call(document.querySelectorAll('.js_select-box'), item => {
        item.classList.remove('is-active');
      })
    },
    togglePopup() {
      this.closeAllPopup();
      setTimeout( () => {
        this.isShowPopup = !this.isShowPopup;
      }, 1 )
    },
    onChangeCountry(name) {
      this.selectedCountryName = name;
    },
    validateNumber(evt) {
      const { target } = evt;
      target.value = target.value.replace(/[^0-9]/g, '');
    }
  }
};
</script>