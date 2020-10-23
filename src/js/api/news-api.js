import JsonApi from './json-api';
import { NEWS_API_URL, NEWS_API_TOKEN } from '../constants';
import { toISODate } from '../utils/date';

export default class NewsApi extends JsonApi {
  constructor() {
    super(NEWS_API_URL);
  }

  // Обработка ошибок выполнена в месте вызова API-методов

  async getNews(query) {
    const result = await this._fetchJson(`/v2/everything?q=${encodeURIComponent(query)}&from=${toISODate(new Date(Date.now() - 7 * 24 * 3600 * 1000))}&to=${toISODate(new Date())}&pageSize=100&apiKey=${NEWS_API_TOKEN}`);
    if (result.status === 'ok') {
      return result.articles;
    }
    return [];
  }
}
