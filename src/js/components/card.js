import Component from './component';
import { formatDate } from '../utils/date';

export default class Card extends Component {
  _initialize() {
    const { data } = this._options;
    const cardImage = this._element.querySelector('.card__image');
    cardImage.setAttribute('src', data.image || '');
    cardImage.setAttribute('alt', data.title);
    const button = this._element.querySelector('.card__button');
    button.classList.add(this._options.mode === 'search' ? 'card__button_bookmark' : 'card__button_trash');
    button.addEventListener('click', () => {
      if (this._options.allowActions) {
        this._options.onButtonClick();
      }
    });
    this._tooltip = new this._options.Tooltip(button, { document: this._options.document });
    this._tooltip.setTooltipText(this._options.mode === 'search' ? this._options.addBookmarkTooltipText : this._options.removeBookmarkTooltipText);
    this.allowActions(this._options.allowCardActions);
    this._element.querySelector('.card__tag').textContent = data.keyword;
    this._element.querySelector('.card__date').textContent = formatDate(data.date);
    this._element.querySelector('.card__title').textContent = data.title;
    this._element.querySelector('.card__text').innerHtml = data.text;
    this._element.querySelector('.card__source').textContent = data.source;
    this._element.setAttribute('href', data.link);
  }

  allowActions(value) {
    if (this._options.mode !== 'search') {
      return;
    }
    this._options.allowCardActions = value;
    if (value) {
      this._tooltip.setTooltipText(this._options.addBookmarkTooltipText);
    } else {
      this._tooltip.setTooltipText(this._options.disabledTooltipText);
    }
  }

  setMarked() {
    if (this._options.mode !== 'search') {
      return;
    }

    const button = this._element.querySelector('.card__button');
    button.classList.remove('card__button_bookmark');
    button.classList.add('card__button_marked-bookmark');
    this.allowActions(false);
    this._tooltip.setTooltipText('');
  }
}
