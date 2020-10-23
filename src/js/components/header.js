import Component from './component';

export default class Header extends Component {
  setTheme(theme) {
    this._element.className = `header header_${theme}`;
  }

  setUserData(data) {
    const userText = this._element.querySelector('.header__user-text');
    const menu = this._element.querySelector('.header__menu-user');
    const bookmarksMenuItem = this._element.querySelector('#bookmarksMenuItem');
    if (data) {
      userText.textContent = data.name;
      menu.classList.add('header__menu-user_signedin');
      menu.removeEventListener('click', this._options.onLogin);
      menu.addEventListener('click', this._options.onLogout);
      bookmarksMenuItem.style.display = '';
    } else {
      userText.textContent = 'Авторизоваться';
      menu.classList.remove('header__menu-user_signedin');
      menu.removeEventListener('click', this._options.onLogout);
      menu.addEventListener('click', this._options.onLogin);
      bookmarksMenuItem.style.display = 'none';
    }
  }

  _initialize() {
    const { HamburgerButton, ...hamburgerOptions } = this._options;
    this._hamburgerButton = new HamburgerButton(this._element.querySelector('.header__hamburger'), hamburgerOptions);
  }
}
