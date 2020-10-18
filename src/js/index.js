import '../styles/index.css';
import MainApi from './api/main-api';
import NewsApi from './api/news-api';
import Header from './components/header';
import CardList from './components/cards-list';
import Card from './components/card';
import Form from './components/form';
import Component from './components/component';
import Button from './components/button';
import HamburgerButton from './components/hamburger-button';
import Popup from './components/popup';

class Application {
  constructor() {
    const getErrorViewForInput = (input) => input.nextElementSibling;

    this._mainApi = new MainApi();
    this._newsApi = new NewsApi();

    this._header = new Header(document.querySelector('.header'), {
      HamburgerButton,
      document,
      window,
      onLogin: this._onLogin.bind(this),
    });
    this._header.setTheme('main');
    this._searchForm = new Form(document.querySelector('.header__bar'), {
      getErrorViewForInput: () => null, // TODO return error element for search form
      onSubmit: this._searchArticles.bind(this),
    });
    this._cardList = new CardList(document.querySelector('.cards'), {
      Card,
      cardTemplate: document.querySelector('#card'),
      onNeedMore: this._needMore.bind(this),
      onAddCardToBookmarks: this._addCardToBookmarks.bind(this),
    });
    this._cardList.setMode('search');
    this._preloader = new Component(document.querySelector('.preloader'));
    this._notFound = new Component(document.querySelector('.notfound'));
    this._found = new Component(document.querySelector('.found'));
    this._showMoreButton = new Button(document.querySelector('.button_more'));
    this._registerPopup = new Popup(document.querySelector('#register'), {
      onLinkClick: this._onLogin.bind(this),
    });
    this._registeredPopup = new Popup(document.querySelector('#registered'), {
      onLinkClick: this._onLogin.bind(this),
    });
    this._loginPopup = new Popup(document.querySelector('#login'), {
      onLinkClick: this._onRegister.bind(this),
    });
    this._registerForm = new Form(this._registerPopup.querySelector('.popup__form'), {
      getErrorViewForInput,
      onSubmit: this._register.bind(this),
    });
    this._loginForm = new Form(this._loginPopup.querySelector('.popup__form'), {
      getErrorViewForInput,
      onSubmit: this._login.bind(this),
    });
  }

  async start() {
    await this._loadUserData();
  }

  async _loadUserData() {
    try {
      const userData = await this._mainApi.getUserData();
      this._setUserData(userData);
    } catch (err) {
      if (err.code === 401) {
        this._setUserData(null);
        return;
      }
      throw err;
    }
  }

  _setUserData(data) {
    this._header.setUserData(data);
    this._cardList.allowCardActions(Boolean(data));
  }

  async _searchArticles({ keyword }) {
    this._found.hide();
    this._notFound.hide();
    this._preloader.show();
    try {
      const articles = await this._newsApi.getNews(keyword);
      const cardList = articles.map((article) => ({
        keyword,
        title: article.title,
        text: article.content,
        date: article.publishedAt,
        source: article.source.name,
        link: article.url,
        image: article.urlToImage,
      }));
      if (cardList.length === 0) {
        this._notFound.show();
      } else {
        this._found.show();
      }
      this._cardList.setCards(cardList);
    } finally {
      this._preloader.hide();
    }
  }

  async _addCardToBookmarks(cardData, card) {
    await this._mainApi.createArticle(cardData);
    card.setMarked();
  }

  _onLogin() {
    this._registerPopup.hide();
    this._loginForm.reset();
    this._loginPopup.show();
  }

  _onRegister() {
    this._loginPopup.hide();
    this._registerForm.reset();
    this._registerPopup.show();
  }

  async _register(data) {
    try {
      await this._mainApi.signup(data);
    } catch (err) {
      this._registerForm.setError(err.message);
    }
    this._registerPopup.hide();
    this._registeredPopup.show();
  }

  async _login(data) {
    try {
      await this._mainApi.signin(data);
    } catch (err) {
      this._loginForm.setError(err.message);
    }

    this._loginPopup.hide();
    await this._loadUserData();
  }

  _needMore() {
    this._showMoreButton.show();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new Application();
  app.start();
});
