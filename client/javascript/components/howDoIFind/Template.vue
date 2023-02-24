<template>
  <div class="c_slidebar-wrap" :class="[popupData.customClass]">
    <div class="c_slidebar" :class="{ 'c_slidebar--show': popupData.slideShow}">
      <button class="c_slidebar__close" type="button" aria-label="Close Button" v-on:click="onCloseSlide"><span>x</span></button>
      <div class="c_slidebar__content c_howdo">
        <template v-if="!!popupData.slideData">
          <h3 class="c_howdo__cat-title" v-if="!!popupData.slideData.categoryTitle">{{popupData.slideData.categoryTitle}}</h3>
          <div class="c_howdo__cat-summary" v-if="!!popupData.slideData.categorySecondTitle">
            {{popupData.slideData.categorySecondTitle}}
          </div>
          <template v-if="popupData.slideData.categoryList && popupData.slideData.categoryList.length > 0">
            <div class="c_form__group">
              <select class="c_form__control c_form__select" name="howdo-select-category" v-model="selected">
                <option value="-1" v-if="selected == -1">Select category</option>
                <option v-for="option, index in popupData.slideData.categoryList" :value="index" :key="index">
                  {{ option.displayText }}
                </option>
              </select>
            </div>
            <template v-if="selected >= 0 && popupData.slideData.categoryList && popupData.slideData.categoryList[selected].Image">
              <div class="c_howdo__cat-summary"> <strong>{{popupData.slideData.categoryList[this.selected].displayText}}</strong><br>
                {{popupData.slideData.categoryList[this.selected].description}}
              </div>
              <picture class="c_howdo__product-img">
                <img :src="popupData.slideData.categoryList[this.selected].Image">
              </picture>
            </template>
          </template>
          <h3 class="c_howdo__title" v-if="!!popupData.slideData.title">{{popupData.slideData.title}}</h3>
          <div class="c_howdo__description" v-if="!!popupData.slideData.description">{{popupData.slideData.description}}</div>
          <div class="c_img" v-if="popupData.slideData.mobileImg || popupData.slideData.img">
            <picture class="c_img__picture">
              <source media="(min-width: 768px)" :srcset="popupData.slideData.img" v-if="popupData.slideData.img">
              <img :src="popupData.slideData.mobileImg || popupData.slideData.img">
            </picture> 
            <div class="c_img__caption" v-if="!!popupData.slideData.exampleImgCaption"><strong>{{popupData.slideData.exampleImgCaption}}</strong></div>
          </div>
          <div class="c_howdo__help-text" v-if="!!popupData.slideData.hintText" v-html="popupData.slideData.hintText"></div>
        </template>
      </div>
    </div>
    <div class="c_slidebar-backdrop" v-on:click="onCloseSlide"></div>
  </div>
</template>

<script>
import HttpCancelError from "../../utilities//HttpCancelError";
import EventEmitter from "../../utilities/EventEmitter";
import {getScrollbarWidth} from "../../utilities/getScrollbarWidth";
import howDoService from "./howDoService";
export default {
  props: {
  },
  data() {
    return {
      popupAPI: '',
      popupData: {
        slideShow: false,
        slideData: {},
        customClass: ''
      },
      selected: 0
    }
  },
  mounted() {
    
  },
  computed: {
    templateComputed() {
      return this.templateData + ' Niteco'
    }
  },
  created() {
    const self= this;

    this.howDoService = new howDoService();

    EventEmitter.on('showPopup', (apisrc) => {
      self.onOpenSlide(apisrc);
    });

    // Click handler for entire DIV container
    document.addEventListener('click', function (e) {
      if (e.target.classList.contains('js_show_howdo')) {
        e.preventDefault();
        let $btnShowHowDo = e.target;
        self.onOpenSlide($btnShowHowDo.getAttribute('data-api') || $btnShowHowDo.getAttribute('href') || 'where-to-find-pnc');
      }
    });
  },
  methods: {
    onCloseSlide() {
      this.popupData.slideShow = false;
      document.body.classList.remove('c_slidebar-opened');
      document.body.style.removeProperty("padding-right");
    },
    onOpenSlide(apisrc) {
      var self = this;
      if(self.popupAPI !== apisrc) {      
        self.popupAPI = apisrc;
        const obj = this.howDoService
          .getHowdo(apisrc)
          .then((data) => {
            if (data) {
              document.body.classList.add("c_slidebar-opened");
              document.body.style.paddingRight = `${getScrollbarWidth()}px`;
              self.popupData = {
                slideShow: true,
                slideData: data,
                customClass: 'c_slidebar-wrap--' + apisrc
              };
              self.selected = 0;
            }
          })
          .catch((err) => {
            if (err instanceof HttpCancelError) {
              return;
            }
          });
      } else {
        self.popupData.slideShow =  true;
      }
    },
  },
};
</script>