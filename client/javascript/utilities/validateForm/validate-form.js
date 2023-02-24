import { forEach, debounce, insertAfter, insertBefore } from './util';
import { isValidABN } from '../validateABN';

export function toggleInvalidClass(input, invalidClass) {
  input.addEventListener('invalid', () => {
    input.classList.add(invalidClass);
  });

  input.addEventListener('input', () => {
    if (input.validity.valid) {
      input.classList.remove(invalidClass);
    }
  });
}

const errorProps = ['badInput', 'patternMismatch', 'rangeOverflow', 'rangeUnderflow', 'stepMismatch', 'tooLong', 'tooShort', 'typeMismatch', 'valueMissing', 'customError'];

function getCustomMessage(input, customMessages = {}) {
  const localErrorProps = [`${input.type}Mismatch`].concat(errorProps);
  const { validity } = input;

  for (let i = 0; i < localErrorProps.length; i++) {
    const prop = localErrorProps[i];
    if (validity[prop]) {
      return input.getAttribute(`data-${prop}`) || customMessages[prop];
    }
  }

  return null;
}

export function handleCustomMessages(input, customMessages) {
  function checkValidity() {
    const message = input.validity.valid ? null : getCustomMessage(input, customMessages);
    input.setCustomValidity(message || '');
  }
  input.addEventListener('input', checkValidity);
  input.addEventListener('invalid', checkValidity);
}

export function handleCustomMessageDisplay(input, options) {
  const { validationErrorClass, validationErrorParentClass, errorPlacement } = options;

  function checkValidity(validityOptions) {
    const { insertError } = validityOptions;
    const { parentNode } = input;
    const errorNode = parentNode.querySelector(`.${validationErrorClass}`) || document.createElement('div');

    if (!input.validity.valid && input.validationMessage) {
      errorNode.className = validationErrorClass;
      errorNode.textContent = input.validationMessage;

      if (insertError) {
        errorPlacement === 'before' ? insertBefore(input, errorNode) : insertAfter(input, errorNode);
        parentNode.classList.add(validationErrorParentClass);
      }
    } else {
      parentNode.classList.remove(validationErrorParentClass);
      errorNode.remove();
    }

    // validation for ABN
    if (input.dataset.abnNumber !== undefined) {
      if (!isValidABN(input.value)) {
        errorNode.className = validationErrorClass;
        errorNode.textContent = 'ABN invalid.';
        input.setCustomValidity('invalid');
        errorPlacement === 'before' ? insertBefore(input, errorNode) : insertAfter(input, errorNode);
        parentNode.classList.add(validationErrorParentClass);
      } else {
        input.setCustomValidity('');
        parentNode.classList.remove(validationErrorParentClass);
        errorNode.remove();
      }
    }
  }
  input.addEventListener('input', (e) => {
    // We can only update the error or hide it on input.
    // Otherwise it will show when typing.
    checkValidity({ insertError: true });
  });
  input.addEventListener('invalid', (e) => {
    e.preventDefault();
    // We can also create the error in invalid.
    checkValidity({ insertError: true });
  });
}

class ValidForm {
  static defaultOptions = {
    invalidClass: 'invalid',
    validationErrorClass: 'validation-error',
    validationErrorParentClass: 'error',
    customMessages: {},
    errorPlacement: 'after',
  };

  constructor(element, options = ValidForm.defaultOptions) {
    this.element = element;
    this.options = { ...ValidForm.defaultOptions, ...options };
    this.init();
  }

  init = () => {
    if (!this.element || !this.element.nodeName) {
      throw new Error('First arg to validForm must be a form, input, select, or textarea');
    }

    let inputs;
    const type = this.element.nodeName.toLowerCase();

    if (type === 'form') {
      inputs = this.element.querySelectorAll('input, select, textarea');
      this.focusInvalidInput(this.element, inputs);
    } else if (type === 'input' || type === 'select' || type === 'textarea') {
      inputs = [this.element];
    } else {
      throw new Error('Only form, input, select, or textarea elements are supported');
    }
    this.inputs = inputs;
    this.validFormInputs(inputs, this.options);
  };

  validFormInputs = (inputs, options) => {
    const { invalidClass, customMessages } = options;
    forEach(inputs, (input) => {
      toggleInvalidClass(input, invalidClass);
      handleCustomMessages(input, customMessages);
      handleCustomMessageDisplay(input, options);
    });
  };

  focusInvalidInput = (form, inputs) => {
    const focusFirst = debounce(100, () => {
      const invalidNode = form.querySelector(':invalid');
      if (invalidNode) invalidNode.focus();
    });
    forEach(inputs, (input) => input.addEventListener('invalid', focusFirst));
  };

  clear = () => {
    forEach(this.inputs, (input) => {
      if (input.readOnly) {
        return;
      }
      const { parentNode } = input;
      input.value = '';
      parentNode.classList.remove(this.options.validationErrorParentClass);
      const errorNode = parentNode.querySelector(`.${this.options.validationErrorClass}`);
      if (errorNode) {
        errorNode.remove();
      }
    });
  };
}

export const validateForm = (element, options = ValidForm.defaultOptions) => new ValidForm(element, options);
