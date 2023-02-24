<template>
  <div>
    <h3> Child Element </h3>
    {{ childContent }}
  </div>
</template>

<script>
export default {
  props: {
    childContent : {
      type: String,
      defaults: ''
    }
  },
};
</script>