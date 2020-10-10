let tooltipTimer = null;

export default function showTooltip(button, text, force) {
  const existingTooltip = button.querySelector('.card__tooltip');
  if (force) {
    if (existingTooltip) {
      button.removeChild(existingTooltip);
    }
  } else if (existingTooltip) {
    return;
  }
  const tooltip = document.createElement('p');
  tooltip.classList.add('card__tooltip');
  tooltip.textContent = text;
  button.appendChild(tooltip);
  setTimeout(() => {
    button.removeChild(tooltip);
  }, 3000);
}

document.addEventListener('mouseover', (e) => {
  clearTimeout(tooltipTimer);
  if (e.target.classList.contains('card__button')) {
    tooltipTimer = setTimeout(() => {
      let tooltipText = '';
      if (e.target.classList.contains('card__button_trash')) {
        tooltipText = 'Убрать из сохранённых';
      }
      if (e.target.classList.contains('card__button_bookmark')) {
        tooltipText = 'Добавить в сохранённые';
      }
      showTooltip(e.target, tooltipText);
    }, 500);
  }
});
