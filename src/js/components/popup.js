import Component from './component';

export default class Popup extends Component {
  open() {
    this._element.classList.add('popup_is-opened');
  }

  close() {
    this._element.classList.remove('popup_is-opened');
  }

  _initialize() {
    const closeButton = this._element.querySelector('.popup__close');
    if (closeButton) {
      closeButton.addEventListener('click', this.close.bind(this));
    }
    if (typeof this._options.createChildComponent === 'function') {
      this._options.createChildComponent(this._element);
    }
  }
}
