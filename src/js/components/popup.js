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
    const link = this._element.querySelector('.popup__link');
    if (link) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this._options.onLinkClick();
      });
    }
  }
}
