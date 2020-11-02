import Component from './component';

export default class Tooltip extends Component {
  setTooltipText(text) {
    this._tooltipText = text;
  }

  _initialize() {
    this._tooltipTimer = null;
    this._element.addEventListener('mouseover', () => {
      clearTimeout(this._tooltipTimer);
      this._tooltipTimer = setTimeout(() => {
        if (this._tooltipText) {
          this._showTooltip(this._element, this._tooltipText);
        }
      }, 500);
    });
  }

  _showTooltip(element, text) {
    // tooltip создаётся динамически, поэтому использование querySelector здесь обоснованно
    const existingTooltip = element.querySelector(this._options.tooltipClass);
    if (existingTooltip) {
      return;
    }
    const tooltip = this._options.document.createElement('p');
    tooltip.classList.add(this._options.tooltipClass);
    tooltip.textContent = text;
    element.appendChild(tooltip);
    setTimeout(() => {
      tooltip.remove();
    }, 3000);
  }
}
