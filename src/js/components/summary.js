import Component from './component';
import savedArticles from '../utils/saved-articles';
import { getOrderedKeywordsByUsage, formatKeywords } from '../utils/keywords';

export default class Summary extends Component {
  setSummary({ name }, cardList) {
    this._element.querySelector('.summary__title').textContent = `${name}, у вас ${cardList.length} ${savedArticles(cardList.length)}`;
    const topKeywords = getOrderedKeywordsByUsage(cardList);
    this._element.querySelector('.summary__tags').innerHTML = topKeywords.length > 0 ? `По ключевым словам: ${formatKeywords(topKeywords)}` : '';
  }
}
