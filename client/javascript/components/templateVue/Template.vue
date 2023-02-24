<template>
  <div :class="customClass">
    <h1>Template Vue</h1>
    {{ templateData }}
    <div>
      {{ templateComputed }}
    </div>
    <div v-html="valueHtml"></div>
    <button @click="onClickBtn">
      Please touch me
    </button>
    <ChildElement v-bind="{ childContent: 'This is Child content' }"></ChildElement>
  </div>
</template>

<script>
import ChildElement from "./ChildElement";

export default {
  name: "template",
  components: { ChildElement },
  props: {
    customClass: {
      type: String,
      defaults: "",
    },
    valueHtml: {
      type: String,
      defaults: "",
    },
  },
  data() {
    return {
      templateData: "Hello",
    };
  },
  computed: {
    templateComputed() {
      return this.templateData + " Niteco";
    },
  },
  created() {
  },
  methods: {
    onClickBtn() {
      alert("Vue is awesome!");
    },
  },
};
</script>
