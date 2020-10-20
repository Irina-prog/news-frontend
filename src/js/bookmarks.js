import '../styles/index.css';
import MainApi from './api/main-api';
import Header from './components/header';
import CardList from './components/cards-list';
import Card from './components/card';
import HamburgerButton from './components/hamburger-button';
import Tooltip from './components/tooltip';
import Summary from './components/summary';
import Component from './components/component';

class Application {
  constructor() {
    this._mainApi = new MainApi();

    this._header = new Header(document.querySelector('.header'), {
      HamburgerButton,
      document,
      window,
    });
    this._header.setTheme('bookmarks');
    this._cardList = new CardList(document.querySelector('.cards'), {
      display: 'flex',
      document,
      Card,
      Tooltip,
      tooltipClass: 'card__tooltip',
      cardTemplate: document.querySelector('#card'),
      onRemoveCardFromBookmarks: this._removeCardFromBookmarks.bind(this),
      removeBookmarkTooltipText: 'Убрать из сохраненных',
    });
    this._cardList.allowCardActions = true;
    this._cardList.setMode('bookmarks');
    this._summary = new Summary(document.querySelector('.summary'), { display: 'block' });
    this._preloader = new Component(document.querySelector('.preloader'), { display: 'block' });
  }

  async start() {
    this._preloader.show();
    await this._loadUserData();
    await this._loadBookmarks();
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
    this._summary.show();
    this._cardsData = cardList;
  }

  async _removeCardFromBookmarks(cardData) {
    await this._mainApi.removeArticle(cardData._id);
    this._cardsData = this._cardsData.filter((c) => c._id !== cardData._id);
    this._summary.setSummary(this._userData, this._cardsData);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new Application();
  app.start();
});
