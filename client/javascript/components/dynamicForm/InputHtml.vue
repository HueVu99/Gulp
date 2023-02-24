<template>
  <div class="col-12 c_form__group" :class="customClass" v-html="label">
  </div>
</template>

<script>
export default {
  props: {
    customClass : {
      type: String,
      defaults: ''
    },
    label : {
      type: String,
      defaults: ''
    }
  },
};
</script>
