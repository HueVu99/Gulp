<template>
<div :class="groupClass" class="c_form__bottom">
      <button class="c_btn c_btn--primary c_btn--block" @click="resetForm" type="reset">
        Reset
      </button>
    </div>
</template>

<script>

import FormMixin from "./FormMixin";

export default {
  props: {
   
  },
  mixins: [FormMixin],
  data() {
    return {};
  },
  computed: {},
  methods: {
    resetForm() {
      this.$emit('resetForm');
    }
  },
};
</script>
