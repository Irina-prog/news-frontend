import JsonApi from './json-api';
import { MAIN_API_URL } from '../constants';

export default class MainApi extends JsonApi {
  constructor() {
    super(MAIN_API_URL);
  }

  signup(data) {
    return this._fetchJson('/signup', 'POST', data);
  }

  signin(data) {
    return this._fetchJson('/signin', 'POST', data);
  }

  getUserData() {
    return this._fetchJson('/users/me');
  }

  getArticles() {
    return this._fetchJson('/articles');
  }

  createArticle(data) {
    return this._fetchJson('/articles', 'POST', data);
  }

  removeArticle(id) {
    return this._fetchJson(`/cards/${id}`, 'DELETE');
  }
}
