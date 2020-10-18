import Component from './component';

export default class Tooltip extends Component {
  _initialize() {
    let tooltipTimer = null;
    this._element.addEventListener('mouseover', (e) => {
      clearTimeout(tooltipTimer);
      tooltipTimer = setTimeout(() => {
        this._showTooltip(e.target, this._options.tooltipText);
      }, 500);
    });
  }

  _showTooltip(component, text) {
    const existingTooltip = component.querySelector(this._options.tooltipClass);
    if (existingTooltip) {
      return;
    }
    const tooltip = this._options.document.createElement('p');
    tooltip.classList.add(this._options.tooltipClass);
    tooltip.textContent = text;
    component.appendChild(tooltip);
    setTimeout(() => {
      tooltip.remove();
    }, 3000);
  }
}
