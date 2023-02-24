<template>
  <div :class="groupClass">
    <template v-if="!isAlterNative">
      <label class="c_form__label GGG" :for="name">
        <span v-html="label"></span><span class="c_form__required" v-if="!!validationAttr.required">*</span>
      </label>
      <input :id="name"
        v-bind="{
          ...elementAttr,
          ...validationAttr,
        }"
      />
    </template>
    <template v-else>
      <div class="c_alternate__content" ref="alternativeContent">
        <input
          v-bind="{
            ...elementAttr,
            ...validationAttr,
          }"
          :disabled="!isShowAlternate"
        />
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
export default {
  props: {},
  mixins: [FormMixin],
  data: () => {
    return {
      isShowAlternate:false
    }
  },
  computed: {
    elementAttr() {
      return {
        type: this.type,
        class: 'c_form__control',
        placeholder: this.placeholder,
        value: this.defaultValue,
        name: this.name,
        id: this.id,
      }
    }
  },
  created() {
  },
  methods: {
  }
};
</script>