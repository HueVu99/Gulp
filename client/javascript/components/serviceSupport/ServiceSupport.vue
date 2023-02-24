<template>
  <div class="service-support">
    <div class="glide">
      <div class="glide__track" data-glide-el="track">
        <div class="glide__slides">
          <div
            class="service-support__wrapper glide__slide"
            :class="{ relative: support.isFullImages }"
            v-for="support of datasupport"
            :key="support.id"
          >
            <div class="service-support__header" :class="{ img__full: support.isFullImages }">
              <a :href="support.url ? support.url : false">
                <picture>
                <source media="(min-width: 992px)" :srcset="support.sourceLarge" type="image/webp">
           
                <source media="(min-width: 768px)" :srcset="support.sourceMedium" type="image/webp">
           
                <source media="(min-width: 320px)" :srcset="support.sourceSmall" type="image/webp">
                <img :src="support.srcDefault" :alt="support.title" />
                </picture>
                <h2 class="service-support__header-title" v-if="support.title">
                  {{ support.title }}
                </h2>
              </a>
            </div>
            <div class="service-support__body" :class="{ border__none: support.isFullImages }">
              <p class="service-support__body-title" v-if="support.description">
                {{ support.description }}
              </p>
              <div class="service-support__body-group" v-if="support.items">
                <div
                  class="service-support__icon"
                  v-for="(icon, index) of support.items"
                  :key="index"
                  :style="{
                    width: 100 / (support.columnLayout ? +support.columnLayout : 2) + '%',
                  }"
                >
                  <a :href="icon.url ? icon.url : false">
                    <img :src="icon.imageSrc" :alt="icon.title" />
                    <p>{{ icon.title }}</p>
                  </a>
                </div>
              </div>
              <div v-if="support.moreSupport" class="service-support__more-support">
                <a :href="support.moreSupport.url ? support.moreSupport.url : false">
                  <p>{{ support.moreSupport.title }}</p>
                  <span class="service-support__more-support-icon"></span>
                  <!-- <img
                    src="/dist/ProductRegistration/electrolux/au/assets/icons/right-arrow.svg"
                    :alt="support.moreSupport.title"
                  /> -->
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="glide__arrows" data-glide-el="controls" v-if="datasupport && datasupport.length > 1">
        <button class="glide__arrow glide__arrow--left" data-glide-dir="<">
          <!-- <img src="/dist/ProductRegistration/electrolux/au/assets/icons/right-arrow.svg" alt="arrow-left" /> -->
        </button>
        <button class="glide__arrow glide__arrow--right" data-glide-dir=">">
          <!-- <img src="/dist/ProductRegistration/electrolux/au/assets/icons/right-arrow.svg" alt="arrow-right" /> -->
        </button>
      </div>

      <div class="glide__bullets" data-glide-el="controls[nav]" v-if="datasupport && datasupport.length > 1">
        <button
          class="glide__bullet"
          v-for="(dot, index) of datasupport"
          :index="index"
          :key="dot.id"
          :data-glide-dir="'=' + index"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
//const Glide = () => import(/* webpackChunkName: "Glide" */ "@glidejs/glide");
import Glide from "@glidejs/glide";

export default {
  props: {
    datasupport: {
      type: Array,
      defaults: [],
    },
  },
  data() {
    return {};
  },
  methods: {
    DisableControls(Glide, Components, Events) {
      const PREV_CONTROL_SELECTOR = "[data-glide-dir='<']";
      const NEXT_CONTROL_SELECTOR = "[data-glide-dir='>']";
      const component = {
        buildAfter() {
          this.prevBtn = Components.Html.root.querySelector(PREV_CONTROL_SELECTOR);
          this.nextBtn = Components.Html.root.querySelector(NEXT_CONTROL_SELECTOR);
        },
        handleDisable() {
          const perView = Glide.settings.perView;
          const slidesCount = Components.Html.slides.length;

          this.prevBtn.disabled = Glide.index <= 0;
          this.nextBtn.disabled = Glide.index >= slidesCount - perView;
        },
      };

      Events.on("build.after", function() {
        component.buildAfter();
        component.handleDisable();
      });
      Events.on("run.after", function() {
        component.handleDisable();
      });
      return component;
    },
  },
  created() {},
  mounted() {
    if (this.datasupport.length > 1) {
      new Glide(".glide", {
        type: "slider",
        startAt: 0,
        perView: 1,
        rewind: false,
      }).mount({ DisableControls: this.DisableControls });
    }
  },
  updated: function() {},
};
</script>
