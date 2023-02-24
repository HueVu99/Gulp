<template>
  <div :class="groupClass">
    <label class="c_form__label" :for="customId">
      <span v-html="label"></span><span class="c_form__required" v-if="!!validationAttr.required">*</span>
    </label>
    <select class="c_form__control c_form__select" :name="name" :id="customId" v-model="selected" v-bind="validationAttr">
      <option v-for="option in options" :value="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script>

import FormMixin from "./FormMixin";
export default {
  props: {
    options: {
      type: Array,
      require: true,
      defaults: Array
    },
  },
  mixins: [FormMixin],
  data() {
    return {
      selected: this.defaultValue
    }
  },
  computed: {
  }
};
</script>