import JsonApi from './json-api';
import { NEWS_API_URL, NEWS_API_TOKEN } from '../constants';
import { toISODate } from '../utils/date';

export default class NewsApi extends JsonApi {
  constructor() {
    super(NEWS_API_URL, { headers: { 'X-Api-Key': NEWS_API_TOKEN } });
  }

  async getNews(query) {
    const result = this._fetchJson(`/v2/everything?q=${encodeURIComponent(query)}?from=${toISODate(new Date(Date.now() - 7 * 24 * 3600 * 1000))}&to=${toISODate(new Date())}&pageSize=100`);
    if (result.status === 'ok') {
      return result.articles;
    }
    return [];
  }
}
