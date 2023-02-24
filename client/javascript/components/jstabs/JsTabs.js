/* eslint-disable no-underscore-dangle */
export default class JsTabs {
  constructor({
    elm,
    onClickHandlerComplete,
    shouldScrollTabIntoView = true,
  }) {
    this.css = {
      nav: 'js_tabs__nav',
      tab: 'js_tabs__tab',
      contentContainer: 'js_tabs__content-container',
      content: 'js_tabs__content',
      marker: 'js_tabs__marker',
      active: 'active',
    };

    this.settings = {
      shouldScrollTabIntoView,
    };
    this.jsTabsElm = this._getJsTabsElm(elm);
    this.onClickHandlerComplete = onClickHandlerComplete;

    this.navElm = this.jsTabsElm.querySelector(`.${this.css.nav}`);
    this.markerElm = this.jsTabsElm.querySelector(`.${this.css.nav} .${this.css.marker}`);
    this.tabsAdjustInProgress = false;
  }

  init = () => {
    this._setupEventListeners();
    this._adjustTabs();
  }

  destroy = () => {
    this.navElm.removeEventListener('click', this._onClick);
    window.removeEventListener('resize', this._handleResize);
  }

  _getJsTabsElm = (_elm) => {
    if (typeof _elm === 'string') {
      const elm = document.querySelector(_elm);
      if (!elm) {
        throw new Error('JS Tabs: Invalid selector passed for elm');
      }
      return elm;
    }
    return _elm;
  }

  _setupEventListeners = () => {
    this.navElm.addEventListener('click', this._onClick);
    window.addEventListener('resize', this._handleResize);
  }

  _adjustTabs = (useTimeout) => {
    const _adjust = () => {
      const activeTab = this.jsTabsElm.querySelector(`.${this.css.tab}.${this.css.active}`);
      if (activeTab === null) {
        return;
      }
      this._repositionMarker(activeTab);
      this.tabsAdjustInProgress = false;
    };

    if (this.tabsAdjustInProgress) {
      return;
    }
    this.tabsAdjustInProgress = true;
    if (useTimeout) {
      window.setTimeout(_adjust, 300);
    } else {
      _adjust();
    }
  }

  _onClick = (e) => {
    e.stopPropagation();
    const { target } = e;
    let tab = target;
    if (!target.classList.contains(this.css.tab)) {
      tab = target.closest(`.${this.css.tab}`);
      if (!tab) {
        return;
      }
    }
    this._changeActiveTab(tab);
    if (this.settings.shouldScrollTabIntoView) {
      this._scrollToTab(tab);
    }
    this._repositionMarker(tab);
    this._changeContent(tab);
    if (this.onClickHandlerComplete) {
      this.onClickHandlerComplete(tab);
    }
  }

  _changeActiveTab = (tab) => {
    const parent = tab.parentNode;
    const tabs = parent.children;
    for (const t of tabs) {
      if (t.classList.contains(this.css.active)) {
        t.classList.remove(this.css.active);
        break;
      }
    }
    tab.classList.add(this.css.active);
  }

  _scrollToTab = (tab) => {
    tab.scrollIntoView({ behavior: 'smooth' });
  }

  _repositionMarker = (tab) => {
    if (!this.markerElm) {
      return;
    }
    const xValue = tab.offsetLeft;
    this.markerElm.style.transform = `translateX(${xValue}px)`;
    this.markerElm.style.width = `${tab.offsetWidth}px`;
    this.markerElm.style.backgroundColor = window.getComputedStyle(tab).color;
  }

  _changeContent = (tab) => {
    const parent = tab.parentNode;
    const index = Array.prototype.indexOf.call(parent.children, tab);
    const contentChildren = this.jsTabsElm.querySelector(`.${this.css.contentContainer}`).children;
    const contentItemElms = Array.prototype.slice.call(contentChildren).filter((child) => child.classList.contains(this.css.content));

    for (const contentItemElm of contentItemElms) {
      contentItemElm.classList.remove(this.css.active);
    }

    contentItemElms[index].classList.add(this.css.active);
  }

  _handleResize = () => {
    this._adjustTabs(true);
  }
}
