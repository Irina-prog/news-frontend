import Component from './component';

export default class Header extends Component {
  setTheme(theme) {
    this._element.className = `header header_${theme}`;
  }

  setUserData(data) {
    if (data) {
      this._element.querySelector('.header__user-text').textContent = data.name;
      this._element.querySelector('.header__menu-user').classList.add('header__menu-user_signedin');
      this._element.querySelector('.header__menu-user').removeEventListener(this._options.onLogin);
    } else {
      this._element.querySelector('.header__user-text').textContent = 'Авторизоваться';
      this._element.querySelector('.header__menu-user').classList.remove('header__menu-user_signedin');
      this._element.querySelector('.header__menu-user').addEventListener(this._options.onLogin);
    }
  }

  _initialize() {
    const { HamburgerButton, ...hamburgerOptions } = this._options;
    this._hamburgerButton = new HamburgerButton(this._element.querySelector('.header__hamburger'), hamburgerOptions);
  }
}
