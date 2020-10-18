import Component from './component';

export default class CardsList extends Component {
  setMode(mode) {
    this._element.className = `cards cards_${mode}`;
    this._mode = mode;
  }

  setCards(list) {
    const changeButtonMore = (display) => {
      this._element.querySelector('.button_more').style.display = display;
    };
    if (this._mode === 'search') {
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

  _renderCards(list) {
    this._element.textContent = '';
    list.forEach((item) => {
      const card = new this._options.Card(this._element, {
        data: item,
        template: this._options.cardTemplate,
        onButtonClick: this._mode === 'search' ? () => this.onAddCardToBookmarks(item, card) : () => {
          this.onRemoveCardFromBookmarks(item, card).then(() => card.destroy());
        },
      });
    });
  }
}
