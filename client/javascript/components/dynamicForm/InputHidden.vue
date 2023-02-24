<template>
  <input :name="name" type="hidden" :value="defaultValue" />
</template>

<script>
export default {
  props: {
    name : {
      type: String,
      defaults: ''
    },
    defaultValue : {
      type: String,
      defaults: ''
    },
  },
};
</script>
