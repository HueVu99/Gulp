<template>
  <div class="c_slidebar-wrap">
    <div class="c_slidebar" :class="{ 'c_slidebar--show': slideShow }">
      <button class="c_slidebar__close" type="button" aria-label="Close Button" v-on:click="onCloseSlide">
        <span>x</span>
      </button>
      <qr-camera v-if="slideShow"></qr-camera>
    </div>
    <div class="c_slidebar-backdrop" v-on:click="onCloseSlide"></div>
  </div>
</template>

<script>
const QrCamera = () => import(/* webpackChunkName: "qrcodeCamera" */ "./QrScanTemplate");
// import QrCamera from "./QrScanTemplate";
import EventEmitter from "../../utilities/EventEmitter";
import { getScrollbarWidth } from "../../utilities/getScrollbarWidth";
export default {
  components: { QrCamera },

  data() {
    return {
      slideShow: false,
    };
  },
  created() {
    const self = this;
    EventEmitter.on("showQrScan", (data) => {
      if (data) {
        self.onOpenSlide();
      }
    });
  },
  methods: {
    onOpenSlide() {
      var self = this;
      self.slideShow = true;
      document.body.classList.add("c_slidebar-opened");
      document.body.style.paddingRight = `${getScrollbarWidth()}px`;
    },
    onCloseSlide() {
      var self = this;
      self.slideShow = false;
      EventEmitter.emit("qrScan", self.slideShow);
      document.body.classList.remove("c_slidebar-opened");
      document.body.style.removeProperty("padding-right");
    },
  },
};
</script>
