import Component from './component';

export default class Button extends Component {
  _initialize() {
    this._element.addEventListener('click', this._options.onClick);
  }
}
