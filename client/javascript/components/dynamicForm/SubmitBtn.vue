<template>
<div :class="groupClass" class="c_form__bottom">
      <!-- <div class="c_form__error-message" v-if="submiterror">
        {{ submiterror }}
      </div> -->
      <button class="c_btn c_btn--primary c_btn--block" type="button" @click="validateForm" :disabled="issubmitting">
        Register
        <svg class="c_icon c_icon--spinner c_search__icon" viewBox="0 0 37 37" v-if="issubmitting">
          <use xlink:href="#spinner"></use>
        </svg>
      </button>
    </div>
</template>

<script>

import FormMixin from "./FormMixin";

export default {
  props: {
    submiterror: {
        type: String,
        default: ''
    },
    issubmitting: {
        type: Boolean,
        default: false
    }
  },
  mixins: [FormMixin],
  data() {
    return {};
  },
  computed: {},
  methods: {
    validateForm() {
        this.$emit('validateForm');
    }
  },
};
</script>
