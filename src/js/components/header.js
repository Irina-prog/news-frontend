import Component from './component';

export default class Header extends Component {
  setTheme(theme) {
    this._element.className = `header header_${theme}`;
  }

  setUserData(data) {
    if (data) {
      this._userText.textContent = data.name;
      this._menu.classList.add('header__menu-user_signedin');
      this._menu.removeEventListener('click', this._options.onLogin);
      this._menu.addEventListener('click', this._options.onLogout);
      this._bookmarksMenuItem.style.display = '';
    } else {
      this._userText.textContent = 'Авторизоваться';
      this._menu.classList.remove('header__menu-user_signedin');
      this._menu.removeEventListener('click', this._options.onLogout);
      this._menu.addEventListener('click', this._options.onLogin);
      this._bookmarksMenuItem.style.display = 'none';
    }
  }

  _initialize() {
    const { getHamburgerButton, ...hamburgerOptions } = this._options;
    this._hamburgerButton = getHamburgerButton(this._element.querySelector('.header__hamburger'), hamburgerOptions);
    this._userText = this._element.querySelector('.header__user-text');
    this._menu = this._element.querySelector('.header__menu-user');
    this._bookmarksMenuItem = this._element.querySelector('#bookmarksMenuItem');
  }
}
