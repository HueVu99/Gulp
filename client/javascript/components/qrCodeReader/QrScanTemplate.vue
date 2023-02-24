<template>
  <div class="c_slidebar__content">
    <div class="c_qr-reader">
      <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit">
        <div class="loading-indicator" v-if="loading">
          <svg class="c_icon c_icon--spinner c_search__icon" viewBox="0 0 37 37">
            <use xlink:href="#spinner"></use>
          </svg>
        </div>
        <div v-show="showScanConfirmation" class="c_qr-reader__scan-confirmation">
          <svg class="c_icon-svg" width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="37" cy="37" r="36" stroke="" stroke-width="2" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M19.6562 37.4437L23.125 34.3308L32.0446 42.3356L50.875 25.4365L54.3438 28.5495L32.0446 48.5615L19.6562 37.4437Z"
              fill=""
            />
          </svg>
        </div>
        <button
          type="button"
          v-if="!loading && error.length == 0"
          class="c_qr-reader__switch-camera"
          v-on:click="switchCamera"
        >
          <svg class="c_icon-svg" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
            <path
              d="M-1.74846e-07 12L4 8L8 12L5 12L5 32L32 32L32 34L4 34C3.44771 34 3 33.5523 3 33L3 12L-1.74846e-07 12ZM9 10L9 8L37 8C37.5523 8 38 8.44772 38 9L38 30L41 30L37 34L33 30L36 30L36 10L9 10Z"
              fill=""
            ></path>
            <circle cx="20" cy="22" r="5.25" stroke="" stroke-width="1.5"></circle>
            <circle cx="32" cy="14" r="2" fill=""></circle>
          </svg>
        </button>
      </qrcode-stream>
    </div>
    <div class="c_howdo__cat-summary" v-if="!!result">
      <!-- <strong>{{resultText}}</strong>
          <br/> -->
      <a class="c_qr-reader__link" :href="result" v-if="!!isValid">{{ result }}</a>
      <span class="c_qr-reader__link" v-else>{{ result }}</span>
    </div>
    <div class="c_howdo__help-text c_qr-reader__error" v-if="!!error">{{ error }}</div>
  </div>
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader";
export default {
  components: { QrcodeStream },
  props: {
    cameraProp: {
      type: Array,
      defaults: [],
    },
  },
  data() {
    return {
      camera: "auto",
      result: null,
      showScanConfirmation: false,
      error: "",
      isValid: undefined,
      loading: false,
    };
  },

  methods: {
    switchCamera() {
      switch (this.camera) {
        case "front":
          this.camera = "rear";
          break;
        case "auto":
          this.camera = "front";
          break;
        case "rear":
          this.camera = "front";
          break;
      }
    },
    async onInit(promise) {
      this.loading = true;
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permission";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        } else if (error.name === "InsecureContextError") {
          this.error = "ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.";
        } else {
          this.error = `ERROR: Camera error (${error.name})`;
        }
      } finally {
        this.showScanConfirmation = this.camera === "off";
        this.loading = false;
      }
    },

    async onDecode(content) {
      this.result = content;

      this.pause();
      await this.timeout(3000);
      this.isValid = content.startsWith("http");
      this.unpause();
    },

    unpause() {
      this.camera = "auto";
    },

    pause() {
      this.camera = "off";
    },

    timeout(ms) {
      return new Promise((resolve) => {
        window.setTimeout(resolve, ms);
      });
    },
  },
};
</script>
