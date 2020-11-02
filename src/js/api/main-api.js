import JsonApi from './json-api';
import { MAIN_API_URL } from '../constants';

export default class MainApi extends JsonApi {
  constructor() {
    super(MAIN_API_URL);
  }

  // Обработка ошибок выполнена в месте вызова API-методов

  signup(data) {
    return this._fetchJson('/signup', 'POST', data);
  }

  // JWT Token хранится в виде cookie
  // Из JS он не доступен
  signin(data) {
    return this._fetchJson('/signin', 'POST', data);
  }

  async signout() {
    await this._fetchJson('/signout', 'POST');
    window.location.reload();
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
    return this._fetchJson(`/articles/${id}`, 'DELETE');
  }
}
