export default class Component {
  constructor(element, options = {}) {
    this._options = options;
    if (options.template?.content) {
      this._element = options.template.content.firstElementChild.cloneNode(true);
    } else {
      this._element = element;
    }
    if (typeof this._initialize === 'function') {
      this._initialize();
    }
    if (options.template?.content) {
      // Добавляем созданный элемент из шаблона в родительский только
      // после его подготовки (вызова _initialize())
      element.appendChild(this._element);
    }
  }

  destroy() {
    this._element?.remove();
    this._element = null;
  }

  show() {
    this._element.style.display = this._options.display || '';
  }

  hide() {
    this._element.style.display = 'none';
  }
}
