(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () {
  function a(a, b) {
    for (var c, d = 0; d < b.length; d++) {
      c = b[d], c.enumerable = c.enumerable || !1, c.configurable = !0, 'value' in c && (c.writable = !0), Object.defineProperty(a, c.key, c);
    }
  }return function (b, c, d) {
    return c && a(b.prototype, c), d && a(b, d), b;
  };
}();function _classCallCheck(a, b) {
  if (!(a instanceof b)) throw new TypeError('Cannot call a class as a function');
}function _possibleConstructorReturn(a, b) {
  if (!a) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b && ('object' == (typeof b === 'undefined' ? 'undefined' : _typeof(b)) || 'function' == typeof b) ? b : a;
}function _inherits(a, b) {
  if ('function' != typeof b && null !== b) throw new TypeError('Super expression must either be null or a function, not ' + (typeof b === 'undefined' ? 'undefined' : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
}var AlertElement = function (a) {
  function b() {
    return _classCallCheck(this, b), _possibleConstructorReturn(this, (b.__proto__ || Object.getPrototypeOf(b)).call(this));
  }return _inherits(b, a), _createClass(b, [{ key: 'connectedCallback', value: function connectedCallback() {
      this.setAttribute('role', 'alert'), this.classList.add('show'), this.level && -1 !== ['info', 'warning', 'danger', 'success'].indexOf(this.level) || this.setAttribute('level', 'info'), this.button && 'true' === this.button && this.appendCloseButton();
    } }, { key: 'disconnectedCallback', value: function disconnectedCallback() {
      this.removeEventListener('close.joomla.alert', this), this.removeEventListener('closed.joomla.alert', this), 'button' === this.firstChild.tagName.toLowerCase() && this.firstChild.removeEventListener('click', this);
    } }, { key: 'attributeChangedCallback', value: function attributeChangedCallback(a, b, c) {
      'level' === a && -1 === ['info', 'warning', 'danger', 'success'].indexOf(c) && this.setAttribute('level', b), 'button' === a && (-1 === ['true', 'false'].indexOf(c) && (this.setAttribute('button', 'false'), this.removeCloseButton()), 'true' === c && this.appendCloseButton());
    } }, { key: 'close', value: function close() {
      this.dispatchCustomEvent('close.bs.alert'), this.addEventListener('transitionend', function () {
        var a = new CustomEvent('closed.joomla.alert');a.relatedTarget = this, this.dispatchEvent(a), this.removeEventListener('closed.joomla.alert', this), this.parentNode.removeChild(this);
      }, !1), this.classList.remove('show');
    } }, { key: 'dispatchCustomEvent', value: function dispatchCustomEvent(a) {
      var b = new CustomEvent(a);b.relatedTarget = this, this.dispatchEvent(b), this.removeEventListener(a, this);
    } }, { key: 'appendCloseButton', value: function appendCloseButton() {
      var a = window.Joomla && Joomla.JText && Joomla.JText._ && 'function' == typeof Joomla.JText._ && Joomla.JText._('JCLOSE') ? Joomla.JText._('JCLOSE') : 'Close';if (!this.querySelector('button[aria-label="' + a + '"]')) {
        var b = document.createElement('button');b.setAttribute('aria-label', a), b.classList.add('close'), b.innerHTML = '<span aria-hidden="true">&times;</span>', this.firstChild ? this.insertBefore(b, this.firstChild) : this.appendChild(b), this.firstChild && this.firstChild.tagName && 'button' === this.firstChild.tagName.toLowerCase() && this.firstChild.addEventListener('click', function () {
          this.parentNode.close();
        });
      }
    } }, { key: 'removeCloseButton', value: function removeCloseButton() {
      var a = this.querySelector('button');a && (a.removeEventListener('click', this), a.parentNode.removeChild(a));
    } }, { key: 'level', get: function get() {
      return this.getAttribute('level');
    } }, { key: 'button', get: function get() {
      return this.getAttribute('button');
    } }], [{ key: 'observedAttributes', get: function get() {
      return ['level', 'button'];
    } }]), b;
}(HTMLElement);customElements.define('joomla-alert', AlertElement);

},{}]},{},[1]);
