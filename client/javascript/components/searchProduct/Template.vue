<template>
  <div class="step-content">
    <div class="c_select-product">
      <qrSearchElement v-bind="{onSelectProduct, selectedData, openSlide}"></qrSearchElement>
      <div class="c_select-product__divider">
        <div class="c_select-product__divider-text" :class="{ 'd-md-none': selectedData.ProductName}">OR</div>
      </div>
      <searchElement v-bind="{onSelectProduct, selectedData, openSlide}"></searchElement>
    </div>
    <!-- <howDoIFind :slideShow.sync="slideShow" v-bind="{slideData}"></howDoIFind> -->
  </div>
</template>

<script>
import EventEmitter from "../../utilities/EventEmitter";
import searchElement from "./searchElement";
import qrSearchElement from "./qrSearchElement";
// import howDoIFind from "../howDoIFind/index";
// import ClickOutside from 'vue-click-outside'
export default {
  components: {searchElement, qrSearchElement},
  props: {
    customClass : {
      type: String,
      defaults: ''
    },
    valueHtml : {
      type: String,
      defaults: ''
    }
  },
  data() {
    return {
      selectedData: {},
      slideShow: false,
      slideData: {}
    }
  },
  computed: {
    templateComputed() {
      return this.templateData + ' Niteco'
    }
  },
  created() {
    const self= this;
    EventEmitter.on('selectedProduct', (data) => {
      self.selectedData = data;
    });
  },
  methods: {
    onSelectProduct(product) {
      this.selectedData = product;
    },
    openSlide(slideShow, slideData) {
      this.slideShow = slideShow;
      this.slideData = slideData;
    },
  },
  watch: {    
  },
};
</script>