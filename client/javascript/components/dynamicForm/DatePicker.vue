<template>
  <div :class="groupClass">
    <label class="c_form__label" :for="customId">
      <span v-html="label"></span><span class="c_form__required" v-if="!!validationAttr.required">*</span>
    </label>
    <DatePicker v-model="time2" :format="formatValue" v-bind="isRange" :input-attr="{ name, ...validationAttr, id: customId}" :disabled-date="disabledFunction" @change="onChange"/>
    <div class="c_form__error-message"></div>
  </div>
</template>

<script>

import FormMixin from "./FormMixin";
import DatePicker from 'vue2-datepicker';
export default {
  components: { DatePicker },
  props: {
    type : {
      type: String,
      default: 'datetime'
    },
    formatValue : {
      type: String,
      default: 'DD/MM/YYYY'
    },
  },
  mixins: [FormMixin],
  data(){
    return {
      isRange: this.type == 'daterange' ? {range: 'range'} : {},
      time2:  this.defaultValue ? new Date() : '',
    }
  },
  mounted() {
    // console.log('formatValue: ' + this.formatValue, this);
  },
  computed: {
  },
  methods: {
    onChange(value) {
      const changeEvent = new CustomEvent("changeDatepicker", { value });
      setTimeout(() => {
        document.querySelector(`[name=${this.name}]`).dispatchEvent(changeEvent);
      }, 10)
    },
    disabledFunction(date) {
      if(this.validations.find(v => v.type == 'beforeToday')) {
        return date > new Date(new Date().setHours(0, 0, 0, 0));
      }
      if(this.validations.find(v => v.type == 'notBeforeToday')) {
        return date < new Date(new Date().setHours(0, 0, 0, 0));
      }
      return false;
    }
  }
};
</script>