import Component from './component';
import { CARDS_TO_SHOW } from '../constants';

export default class CardsList extends Component {
  setMode(mode) {
    this._element.className = `cards cards_${mode}`;
    this._mode = mode;
  }

  setCards(list, removeExistings = true) {
    if (this._mode === 'search') {
      this._list = list;
      const top = list.slice(0, CARDS_TO_SHOW);
      if (top.length < list.length) {
        this._options.onNeedMore();
      }
      this._renderCards(top, removeExistings);
    } else {
      this._renderCards(list, removeExistings);
    }
  }

  showMoreCards() {
    if (this._mode === 'search' && this._list?.length > 0) {
      this._list = this._list.slice(CARDS_TO_SHOW);
      this.setCards(this._list, false);
    }
  }

  set allowCardActions(value) {
    this._allowCardActions = value;
    this._cards?.forEach((card) => {
      card.allowActions(value);
    });
  }

  get allowCardActions() {
    return this._allowCardActions || false;
  }

  _renderCards(list, removeExistings = true) {
    if (removeExistings) {
      this._cards?.forEach((card) => card.destroy());
    }
    this._cards = list.map((item) => {
      const card = new this._options.Card(this._element, {
        data: item,
        template: this._options.cardTemplate,
        allowCardActions: this._allowCardActions,
        mode: this._mode,
        onButtonClick: this._mode === 'search'
          ? () => {
            if (this._allowCardActions) {
              this._options.onAddCardToBookmarks(item, card);
            }
          }
          : () => {
            if (this._allowCardActions) {
              this._options.onRemoveCardFromBookmarks(item, card).then(() => card.destroy());
            }
          },
      });
      return card;
    });
  }
}
