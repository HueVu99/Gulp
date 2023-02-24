/* eslint-disable no-underscore-dangle */
import { isMobileViewport } from "../../utilities/devices";

class Modal {
  constructor(element, callBackCloseModal, noBackdrop = false) {
    this.selector = element;
    this.noBackdrop = noBackdrop;
    this.header = document.querySelector(".js_header");
    [this.body] = document.getElementsByTagName("body");
    this.secondary_nav = document.querySelector(".js-secondary-nav__sticky.sticky");
    this.product_compare_header_fixed = document.querySelector(".product-compare__header.fixed-top");
    this.modal = this._getTarget();
    if (this.modal) {
      this.close = [...this.modal.querySelectorAll(".js-close-modal")];
      this.modalInner = this.modal.querySelector(".modal-inner");
      this.timeout = null;
      this.callBackCloseModal = callBackCloseModal;

      this._listeners();
    }
  }

  _listeners = () => {
    window.addEventListener("keydown", this._handleKeyDown);
    this.modal.addEventListener("transitionend", this._revealModal, false);
    this.modal.addEventListener("click", this._backdropClose, false);
    this.close.forEach((el) => {
      el.addEventListener("click", this.hideModal, false);
    });
    this.modalInner.addEventListener("transitionend", this._closeModal, false);
  };

  openModal = () => {
    if (this.modal) {
      document.body.classList.add("modal-body");
      if (this.noBackdrop) {
        document.body.classList.add("no-back-drop");
      }
      if (!isMobileViewport()) {
        this._disablescroll();
      }
      this.modal.classList.add("modal-visible");
    }
  };

  rebindEvent = () => {
    if (this.modal) {
      this.close = [...this.modal.querySelectorAll(".js-close-modal")];
      this.close.forEach((el) => {
        el.addEventListener("click", this.hideModal, false);
      });
    }
  };

  hideModal = () => {
    const modalOpen = document.querySelector(".modal.modal-visible");
    modalOpen.querySelector(".modal-inner").classList.remove("modal-reveal");
    document.querySelector(".modal-body").addEventListener("transitionend", this._modalBody, false);
    document.body.classList.add("modal-fadeOut");

    this.timeout && clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.callBackCloseModal && this.callBackCloseModal();
    }, 200);
  };

  forceHideModal = () => this.hideModal();

  _getTarget = () => {
    const { dataset } = this.selector;
    return document.getElementById(dataset.modal);
  };

  _handleKeyDown = (e) => {
    if (e.keyCode === 27 && document.body.classList.contains("modal-body")) {
      this.hideModal();
    }
  };

  _backdropClose = (el) => {
    if (!el.target.classList.contains("modal-visible")) {
      return;
    }

    this.hideModal();
  };

  _closeModal = (el) => {
    if (
      el.propertyName === "opacity" &&
      !el.target.classList.contains("modal-reveal") &&
      el.target.classList.contains("modal-inner")
    ) {
      const modalId = document.querySelector(".modal.modal-visible");
      if (modalId) {
        modalId.classList.remove("modal-visible");
      }
    }
  };

  _revealModal = (el) => {
    if (el.propertyName === "opacity" && el.target.classList.contains("modal-visible")) {
      el.target.querySelector(".modal-inner").classList.add("modal-reveal");
    }
  };

  _modalBody = (el) => {
    if (
      el.propertyName === "opacity" &&
      el.target.classList &&
      el.target.classList.contains("modal") &&
      !el.target.classList.contains("modal-visible")
    ) {
      document.body.classList.remove("modal-body");
      document.body.classList.remove("modal-fadeOut");
      document.body.classList.remove("no-back-drop");
      if (!isMobileViewport()) {
        this._enablescroll();
      }
    }
  };

  _disablescroll = () => {
    if (!(window.innerHeight < document.body.clientHeight)) return;

    this.body.style.overflow = "hidden";
    const scrollbarwidth = this._getScrollbarWidth();
    this.header.style.paddingRight = `${scrollbarwidth}px`;
    this.body.style.paddingRight = `${scrollbarwidth}px`;
    if (this.secondary_nav) this.secondary_nav.style.paddingRight = `${scrollbarwidth}px`;
    if (this.product_compare_header_fixed) this.product_compare_header_fixed.style.right = `${scrollbarwidth}px`;
  };

  _enablescroll = () => {
    if (!(window.innerHeight < document.body.clientHeight)) return;
    setTimeout(() => {
      this.body.style.removeProperty("overflow");
      this.body.style.removeProperty("padding-right");
      this.header.style.removeProperty("padding-right");
      this.secondary_nav && this.secondary_nav.style.removeProperty("padding-right");
      if (this.product_compare_header_fixed) this.product_compare_header_fixed.style.right = "0";
    }, 10); // 10ms added for CSS transition in Firefox which doesn't like overflow:auto
  };

  _getScrollbarWidth = () => {
    // Creating invisible container
    const outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.overflow = "scroll"; // forcing scrollbar to appear
    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement("div");
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
  };

  updateHeaderTilte = (title) => {
    const titleElement = this.modal.querySelector(".js_modal__title");
    titleElement.innerText = title;
  };

  getModalBodyEl = () => this.modal.querySelector(".modal__body");
}

export default Modal;
