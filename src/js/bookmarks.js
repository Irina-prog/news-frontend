import '../styles/index.css';
import MainApi from './api/main-api';
import Header from './components/header';
import CardList from './components/cards-list';
import Card from './components/card';
import HamburgerButton from './components/hamburger-button';
import Tooltip from './components/tooltip';
import Summary from './components/summary';
import Component from './components/component';
import Popup from './components/popup';

class Application {
  constructor() {
    this._mainApi = new MainApi();

    this._header = new Header(document.querySelector('.header'), {
      getHamburgerButton: (element, options) => new HamburgerButton(element, options),
      document,
      window,
      onLogout: () => this._runAsync(() => this._mainApi.signout()),
    });
    this._header.setTheme('bookmarks');
    const removeCard = (data, card) => this._runAsync(this._removeCardFromBookmarks, data, card);
    this._cardList = new CardList(document.querySelector('.cards'), {
      display: 'grid',
      document,
      getCard: (element, options) => new Card(element, options),
      getTooltip: (element, options) => new Tooltip(element, options),
      tooltipClass: 'card__tooltip',
      cardTemplate: document.querySelector('#card'),
      onRemoveCardFromBookmarks: removeCard,
      removeBookmarkTooltipText: 'Убрать из сохраненных',
    });
    this._cardList.allowCardActions = true;
    this._cardList.setMode('bookmarks');
    this._summary = new Summary(document.querySelector('.summary'), { display: 'block' });
    this._preloader = new Component(document.querySelector('.preloader'), { display: 'block' });
    this._bookmarks = new Component(document.querySelector('.bookmarks'), { display: 'block' });
    const errorPopupElement = document.querySelector('#error');
    this._errorPopup = new Popup(errorPopupElement);
    this._errorTextElement = errorPopupElement.querySelector('p');
    this._runAsync = (action, ...params) => action.apply(this, params)
      .catch(this._errorHandler.bind(this));
  }

  async start() {
    this._preloader.show();
    await this._runAsync(this._loadUserData);
    await this._runAsync(this._loadBookmarks);
  }

  async _loadUserData() {
    try {
      const userData = await this._mainApi.getUserData();
      this._header.setUserData(userData);
      this._userData = userData;
    } catch (err) {
      if (err.code === 401) {
        window.location.href = '/index.html';
        return;
      }
      throw err;
    }
  }

  async _loadBookmarks() {
    const cardList = await this._mainApi.getArticles();
    this._cardList.setCards(cardList);
    this._summary.setSummary(this._userData, cardList);
    this._preloader.hide();
    this._cardList.show();
    if (cardList.length > 0) {
      this._bookmarks.show();
    } else {
      this._bookmarks.hide();
    }
    this._summary.show();
    this._cardsData = cardList;
  }

  async _removeCardFromBookmarks(cardData) {
    await this._mainApi.removeArticle(cardData._id);
    this._cardsData = this._cardsData.filter((c) => c._id !== cardData._id);
    this._summary.setSummary(this._userData, this._cardsData);
    if (this._cardsData.length === 0) {
      this._bookmarks.hide();
    }
  }

  _errorHandler(err) {
    this._errorTextElement.textContent = err.message || 'Неизвестная ошибка';
    this._errorPopup.show();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new Application();
  app.start();
});
