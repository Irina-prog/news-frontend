import '../styles/index.css';
import MainApi from './api/main-api';
import NewsApi from './api/news-api';
import Header from './components/header';
import CardList from './components/cards-list';
import Form from './components/form';
import Component from './components/component';
import Button from './components/button';

class Application {
  constructor() {
    this._mainApi = new MainApi();
    this._newsApi = new NewsApi();

    this._header = new Header(document.querySelector('.header'));
    this._header.setTheme('main');
    this._searchForm = new Form(document.querySelector('.header__bar'), {
      getErrorViewForInput: () => null, // TODO return error element for search form
      onSubmit: this._searchArticles.bind(this),
    });
    this._cardList = new CardList(document.querySelector('.cards'), {
      onNeedMore: this._needMore.bind(this),
    });
    this._cardList.setMode('search');
    this._preloader = new Component(document.querySelector('.preloader'));
    this._notFound = new Component(document.querySelector('.notfound'));
    this._found = new Component(document.querySelector('.found'));
    this._showMoreButton = new Button(document.querySelector('.button_more'));
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

  _needMore() {
    this._showMoreButton.show();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new Application();
  app.start();
});
