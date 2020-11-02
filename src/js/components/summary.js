import Component from './component';
import savedArticles from '../utils/saved-articles';
import { getOrderedKeywordsByUsage, formatKeywords } from '../utils/keywords';

export default class Summary extends Component {
  setSummary({ name }, cardList) {
    this._title.textContent = `${name}, у вас ${cardList.length} ${savedArticles(cardList.length)}`;
    const topKeywords = getOrderedKeywordsByUsage(cardList);
    while (this._tags.firstChild) {
      this._tags.removeChild(this._tags.firstChild);
    }
    this._tags.insertAdjacentHTML('beforeend', topKeywords.length > 0 ? `По ключевым словам: ${formatKeywords(topKeywords)}` : '');
  }

  _initialize() {
    this._title = this._element.querySelector('.summary__title');
    this._tags = this._element.querySelector('.summary__tags');
  }
}
