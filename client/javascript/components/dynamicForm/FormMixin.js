const LIST_TAG_ATTR = ['required', 'max', 'min', 'maxlength', 'minlength', 'readonly', 'pattern'];
export default {
    props: {
        customClass : {
            type: String,
            default: ''
        },
        type : {
            type: String,
            default: 'text'
        },
        label : {
            type: String,
            default: ''
        },
        name : {
            type: String,
            default: 'custom'
        },
        isAlterNative : {
            type: Boolean,
            default: false
        },
        defaultValue : {
            type: String,
            default: ''
        },
        placeholder : {
            type: String,
            default: ''
        },
        mobileWidth : {
            type: Number,
            default: 12
        },
        width : {
            type: Number,
            default: 12
        },
        validations : {
            type: Array,
            default: Array
        },
    },
    computed: {
        customId() {
            return (this.type +'_' + this.name + '_' + this.label.slice(0, 10)).replaceAll(' ','');
        },
        groupClass() {
            let res = ['c_form__group', 'js_form-group'];
            res.push(this.customClass);
            res.push('col-' + (this.mobileWidth ? this.mobileWidth : '12'));
            res.push('col-md-' + (this.width ? this.width : '12'));
            return res.join(' ');
        },
        isRequired() {
            return this.validations.find(v => v.type === 'required')
        },
        validationAttr() {
            let res = {};
            this.validations.forEach(validator => {
                const attrKey = validator.type.toString().toLowerCase();
                if(LIST_TAG_ATTR.find(a => a == attrKey)) {
                    res[attrKey] = validator.value ?? true;
                }
            })
            return res;
        },
    },
    methods: {
        toggleAlternate() {
            const { alternativeContent } = this.$refs;
            if(!alternativeContent) {
                return;
            }
            if(this.isShowAlternate) {
                alternativeContent.style.height = alternativeContent.scrollHeight + 'px';
                alternativeContent.classList.remove('is-active');
                setTimeout(() => {
                    alternativeContent.style.height = '0px';
                }, 0);
                setTimeout(() => {
                    this.isShowAlternate = false;
                    alternativeContent.style.removeProperty('height');
                }, 350);
            } else {
                this.isShowAlternate = true;
                setTimeout(() => {
                    alternativeContent.style.height = alternativeContent.scrollHeight + 'px';
                }, 0);
                setTimeout(() => {
                    alternativeContent.style.removeProperty('height');
                    alternativeContent.classList.add('is-active');
                }, 350);
            }
        }
    }
}