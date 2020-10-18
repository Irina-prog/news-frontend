import Component from './component';

export default class CardsList extends Component {
  setMode(mode) {
    this._element.className = `cards cards_${mode}`;
    this._mode = mode;
  }

  setCards(list, more = false) {
    const changeButtonMore = (display) => {
      this._element.querySelector('.button_more').style.display = display;
    };
    if (this._mode === 'search' && !more) {
      const top3 = list.slice(0, 2);
      if (top3.length <= list.length) {
        changeButtonMore('none');
      } else {
        changeButtonMore('');
      }
      this._renderCards(top3);
    } else {
      changeButtonMore('none');
      this._renderCards(list);
    }
  }

  set allowCardActions(value) {
    this._allowCardActions = value;
    this._cards?.forEach((card) => {
      card.allowActions(value);
    });
  }

  get allowCardActions() {
    return this._allowCardActions;
  }

  _renderCards(list) {
    this._cards?.forEach((card) => card.destroy());
    this._cards = list.map((item) => {
      const card = new this._options.Card(this._element, {
        data: item,
        template: this._options.cardTemplate,
        allowCardActions: this._allowCardActions,
        mode: this._mode,
        onButtonClick: this._mode === 'search'
          ? () => {
            if (this._allowCardActions) {
              this.onAddCardToBookmarks(item, card);
            }
          }
          : () => {
            if (this._allowCardActions) {
              this.onRemoveCardFromBookmarks(item, card).then(() => card.destroy());
            }
          },
      });
      return card;
    });
  }
}
