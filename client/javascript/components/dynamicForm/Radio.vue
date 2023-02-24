<template>
  <div :class="groupClass">
    <label class="c_radio" :for="customId">
      <input
          type="radio"
          class="c_radio__input"
          :checked="!!defaultValue"
          :name="name"
          :id="customId"
          v-bind="validationAttr"
          :value="label"
      />
      <span class="c_radio__checkmark"></span>
      <span class="c_radio__label" v-html="label">
      </span>
    </label>
  </div>
</template>

<script>

import FormMixin from "./FormMixin";
export default {
  props: {
    type : {
      type: String,
      default: 'radio'
    },
  },
  mixins: [FormMixin],
  computed: {
  }
};
</script>