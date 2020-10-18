import JsonApi from './json-api';
import { NEWS_API_URL, NEWS_API_TOKEN } from '../constants';

export default class NewsApi extends JsonApi {
  constructor() {
    super(NEWS_API_URL, { headers: { 'X-Api-Key': NEWS_API_TOKEN } });
  }

  async getNews(query) {
    const result = this._fetchJson(`/v2/top-headlines?country=ru&q=${encodeURIComponent(query)}`);
    if (result.status === 'ok') {
      return result.articles;
    }
    return [];
  }
}
