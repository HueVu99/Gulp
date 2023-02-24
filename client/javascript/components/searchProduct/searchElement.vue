<template>
  <div class="c_select-product__form">
    <h3>To get started, input model code (product number) on your appliance</h3>
    <div class="c_search" v-click-outside="onClose">
      <div class="c_search__form">
        <input class="c_form__control" type="text" @focus="inputFocus(searchQuery)" v-on:keyup.enter="inputEnter" v-model="searchQuery" placeholder="Model code, eg: EWF1102">
        <button class="c_search__btn-clear js_search__btn-clear" :class="{ 'c_search__btn-clear--active': searchQuery.length > 0}" v-on:click="clearSearch"><i class="c_icon c_icon--clear"></i></button>
        <button class="c_search__btn js_search__btn" aria-label="Search Button" v-on:click="callAPI">
          <svg class="c_icon c_search__icon" viewBox="0 0 20 20">
            <use xlink:href="#search-icon"></use>
          </svg>
        </button>
      </div>
      <div class="c_search__result" :class="{ 'c_search__result--active': isShow}">
        <div class="c_search__item-list">
          <template v-if="searchDatas.length > 0">
            <div class="c_search__item" @click="selectProduct(searchData)" v-for="searchData, index in searchDatas" :key="index" :class="{ 'c_search__item--active': searchData.ProductCode===selectedData.ProductCode}">
              <div class="c_search__item-content">
                <div class="c_search__item-code" v-html="highlight(searchData.ProductCode)"></div>
                <div class="c_search__item-name">{{ searchData.ProductName }}</div>
              </div>
              <div class="c_search__item-img">
                <img :src="searchData.ImageUrl" :alt="searchData.ProductName" width="56" height="56">
              </div>
            </div>
          </template>
          <template v-else>
            <div class="c_search__nodata">
              <p>We couldn't find any products matching <strong>{{ searchQuery }}</strong></p>
              <p><strong>Please check model code if incorrect. In case it’s exactly, you can <a href="#"> proceed to register this model code*</a></strong></p>
              <p class="text-sm">* Discountinued products can be removed in list but still applied our service support</p>
            </div>
          </template>          
        </div>
      </div>
    </div>
    <a class="text-sm" href="#" v-on:click="onOpenSlide">How do I find my model code (product number)?</a>
  </div>
</template>

<script>
import searchService from "./searchService";
import ClickOutside from 'vue-click-outside'
import EventEmitter from "../../utilities/EventEmitter";
export default {
  props: {
  //   selectedData : {
  //     type: Object,
  //     defaults: {}
  //   },
  //   onSelectProduct : {
  //     type: Function,
  //     default: () => {}
  //   },
    openSlide : {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      searchQuery: '',
      selectedData: {},
      isShow: false,
      isSearching: false,
      searchDatas: []
    }
  },
  created() {
    this.getService = new searchService();
    const self= this;
    EventEmitter.on('selectedProduct', (data) => {
      self.selectedData = data;
    })
  },
  methods: {
    selectProduct(data) {
      // this.selectedData = data;
      this.clearSearch();
      this.goto('ref_product');
      // this.onSelectProduct(data);
      EventEmitter.emit('selectedProduct', data);
    },
    highlight(textContent) {
      if(!this.searchQuery) {
        return textContent;
      }
      return textContent.replace(new RegExp(this.searchQuery, "gi"), match => {
        return '<span class="highlight-text">' + match + '</span>';
      });
    },
    // removeProduct() {
    //   this.onSelectProduct({});
    // },
    clearSearch() {
      this.searchQuery='';
      this.isShow = false;
    },
    callAPI() {
      var that = this;
      this.isShow = true;
      const obj = this.getService
        .getData('search/suggestion?Brand=Electrolux&Query='+this.searchQuery)
        .then((data) => {
          if (data) {
            that.searchDatas = data;
          }
        })
        .catch((err) => {
        });
    },
    inputFocus(value) {
      if (value.length > 2) {
        this.isShow = true;
      }
    },
    inputEnter() {
      if (this.isShow) {
        if (this.searchDatas.length > 0) {
          this.selectProduct(this.searchDatas[0]);
        }
      } else {
        if (this.searchQuery.length > 2) {
          this.callAPI();
        }
      }
    },
    onClose () {
      this.isShow = false
    },
    goto(refName) {
      // var element = this.$refs[refName];
      // var top = element.offsetTop;
      // window.scrollTo(0, top);
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
  },
  watch: {
    searchQuery: {
      immediate: true,
      handler(value) {
        if (value.length > 2) {
          this.callAPI();
        }
      },
      deep: true,
    },
  },
  // do not forget this section
  directives: {
    ClickOutside
  }
};
</script>