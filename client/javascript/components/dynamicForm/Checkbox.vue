<template>
  <div :class="groupClass">
    <label class="c_checkbox" :for="customId">
      <input
          type="checkbox"
          class="c_checkbox__input"
          :checked="!!defaultValue"
          :name="name"
          :id="customId"
          v-bind="validationAttr"
      />
      <span class="c_checkbox__checkmark"></span>
      <span class="c_checkbox__label" v-html="label">
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
      default: 'checkbox'
    },
  },
  mixins: [FormMixin],
  computed: {

  }
};
</script>