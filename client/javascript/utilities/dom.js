export function removeClass(selector, className) {
  const element = document.querySelector(selector);

  element.classList.remove(className);
}

export function addClass(selector, className) {
  const element = document.querySelector(selector);

  if (element) {
    element.classList.add(className);
  }
}

export function closest(element, tagName = "") {
  tagName = tagName.toUpperCase();

  while (element) {
    if (element.nodeName === tagName) {
      return element;
    }

    element = element.parentElement;
  }

  return null;
}

export function closestBySelector(element, selector) {
  while (element) {
    if (element.classList.contains(selector) || element === selector) {
      return element;
    }

    element = element.parentElement;
  }

  return null;
}

export function getClosest(elem, selector) {
  while (elem !== document.body) {
    elem = elem.parentElement;

    if (elem.matches(selector)) return elem;
  }

  return null;
}

export function isDescendant(parent, child) {
  let node = child.parentNode;

  while (node !== null) {
    if (node === parent) {
      return true;
    }

    node = node.parentNode;
  }

  return false;
}

export function last(array) {
  return array[array.length - 1];
}

export function outerHeight(el) {
  let height = el.offsetHeight;

  const style = getComputedStyle(el);

  height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);

  return height;
}

export function formatNumberCurrency(amount) {
  return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

export function getSiblings(elem) {
  // Setup siblings array and get the first sibling

  const siblings = [];

  let sibling = elem.parentNode.firstChild;

  // Loop through each sibling and push to the array

  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== elem) {
      siblings.push(sibling);
    }

    sibling = sibling.nextSibling;
  }

  return siblings;
}

export const emptyDOM = (selector) => {
  while (selector.hasChildNodes()) {
    selector.removeChild(selector.lastChild);
  }
};

export const isIE = () => {
  const ua = navigator.userAgent;

  /* MSIE used to detect old browsers and Trident used to newer ones */

  return ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
};

export function serialize(form) {
  if (!form || form.nodeName !== "FORM") {
    return {};
  }

  let i;

  let j;

  const obj = {};

  for (i = form.elements.length - 1; i >= 0; i -= 1) {
    if (form.elements[i].name) {
      switch (form.elements[i].nodeName) {
        case "INPUT":
          switch (form.elements[i].type) {
            case "text":
            case "hidden":
            case "password":
            case "button":
            case "reset":
            case "email":
            case "number":
              obj[form.elements[i].name] = form.elements[i].value;
              break;
            case "checkbox":
              if (form.elements[i].checked) {
                obj[form.elements[i].name] = true;
              } else {
                obj[form.elements[i].name] = false;
              }
              break;
            case "radio":
              if (form.elements[i].checked) {
                obj[form.elements[i].name] = form.elements[i].value;
              }
              break;
            case "file":
            default:
              break;
          }
          break;
        case "TEXTAREA":
          obj[form.elements[i].name] = form.elements[i].value;
          break;
        case "SELECT":
          switch (form.elements[i].type) {
            case "select-one":
              obj[form.elements[i].name] = form.elements[i].value;
              break;
            case "select-multiple":
              for (j = form.elements[i].options.length - 1; j >= 0; j -= 1) {
                if (form.elements[i].options[j].selected) {
                  obj[form.elements[i].name] = form.elements[i].options[j].value;
                }
              }
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
    }
  }

  return obj;
}

export function containsMany() {
  DOMTokenList.prototype.containsMany = function(classes) {
    const items = classes.split(" ");

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (this.contains(item) === false) {
        return false;
      }
    }

    return true;
  };
}

export function containsAny() {
  DOMTokenList.prototype.containsAny = function(classes) {
    const items = classes.split(" ");

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (this.contains(item) === true) {
        return true;
      }
    }

    return false;
  };
}

export function removeElement() {
  if (!("remove" in Element.prototype)) {
    Element.prototype.remove = function() {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    };
  }
}

export function addScript(url, callback) {
  var s = document.createElement("script");
  s.type = "text/javascript";
  //s.defer = true;
  s.addEventListener("load", (event) => {
    callback();
  });
  s.src = url;
  var x = document.getElementsByTagName("head")[0];
  x.appendChild(s);
}
