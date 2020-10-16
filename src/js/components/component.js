export default class Component {
  constructor(element, options = {}) {
    this._options = options;
    if (options.template?.content) {
      this._element = options.template.content.cloneNode(true);
      element.appendChild(this._element);
    } else {
      this._element = element;
    }
    if (typeof this._initialize === 'function') {
      this._initialize();
    }
  }

  destroy() {
    this._element?.remove();
    this._element = null;
  }
}
