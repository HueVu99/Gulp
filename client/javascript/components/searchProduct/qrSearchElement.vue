<template>
  <div class="c_select-product__result">
    <template v-if="selectedData.ProductName">
      <div class="c_card c_product mb-40 mb-md-0" ref="ref_product">
        <div class="c_card__control-top">
          <button class="c_card__remove js_card__remove" v-on:click="removeProduct">
            <i class="c_icon c_icon--clear-circle"></i>
          </button>
        </div>
        <div class="c_card__img">
          <img :src="selectedData.ImageUrl" :alt="selectedData.ProductName" width="110" height="110">
        </div>
        <div class="c_card__content">
          <h3 class="c_card__title">{{ selectedData.ProductName }}</h3>
          <div class="c_product__code">Model code: <strong>{{ selectedData.ProductModel }}</strong></div>
          <div class="c_product__number">Product number: <strong>{{ selectedData.ProductCode }}</strong></div>
        </div>
        <div class="c_card__foot"> 
          <button class="c_btn c_btn--primary c_btn--block" v-on:click="registerProduct">Register this product</button>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="c_qrcode d-none d-md-block"> 
        <div class="c_qrcode-control">
          <img :src="qrData.pc.img" :alt="qrData.pc.title" width="60" height="60">
        </div>
        <h3>{{qrData.pc.title}}</h3>
        <a class="text-sm" href="#" @click="onOpenSlide">How do I find QR Code on my product?</a>
      </div>
    </template>
    <div class="c_qrcode d-md-none">
      <h3>{{qrData.sp.title}}</h3>
      <label class="c_qrcode-control">
        <input type="file" accept="image/*" capture="camera">
        <img :src="qrData.sp.img" :alt="qrData.sp.title" width="60" height="60">
      </label>
      <a class="text-sm" href="#" @click="onOpenSlide">How do I find QR Code on my product?</a>
    </div>
  </div>
</template>

<script>
import searchService from "./searchService";
import FormService from '../dynamicForm/FormService';
import EventEmitter from "../../utilities/EventEmitter";
export default {
  props: {
    // selectedData : {
    //   type: Object,
    //   defaults: {}
    // },
    // onSelectProduct : {
    //   type: Function,
    //   default: () => {}
    // },
    pageId: {
      type: String,
      defaults: ''
    },
    openSlide : {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      selectedData: {},
      qrData: {
        sp: {
          title: "To get started, scan QR code by click on button bellow.",
          img: "../../assets/icons/qr-code.svg"
        },
        pc: {
          title: "Using your phone then scan QR code to register product.",
          img: "../../assets/icons/qr-code-pc.svg"
        }
      }
    }
  },
  created() {
    this.getService = new searchService();
    const self = this;
    EventEmitter.on('selectedProduct', (data) => {
      self.selectedData = data;
    });
  },
  methods: {
    removeProduct() {
      // this.onSelectProduct({});
      EventEmitter.emit('selectedProduct', {});
    },
    onOpenSlide() {
      var that = this;
      const obj = this.getService
        .getData('where-to-find-pnc')
        .then((data) => {
          if (data) {
            document.body.classList.add('c_slidebar-opened');
            // that.openSlide(true, data);
            EventEmitter.emit('showPopup',
              {
                slideShow: true,
                slideData: data
              });
          }
        })
        .catch((err) => {
        });
    },
    registerProduct() {
      // this.onSelectProduct({});
      EventEmitter.emit('activeStep', 2);
      EventEmitter.emit('registerProduct', this.selectedData);
      FormService.getFormData('?id=24').then(res => {
        EventEmitter.emit('loadForm', res);
      });      
    },
  },
  watch: {
    
  },
  // do not forget this section
  directives: {
    // ClickOutside
  }
};
</script>