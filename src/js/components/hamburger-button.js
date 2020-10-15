import Component from './component';

export default class HamburgerButton extends Component {
  _initialize() {
    this._headerElement = this._element.closest('.header');
    this._options.document.addEventListener('click', (e) => {
      if (e.target === this._element) {
        this._headerElement.classList.toggle('header_visible-mobile-menu');
      } else {
        this._hideMobileMenu();
      }
    });

    this._options.window.addEventListener('resize', () => {
      this._hideMobileMenu();
    });
  }

  _hideMobileMenu() {
    this._headerElement.classList.remove('header_visible-mobile-menu');
  }
}
