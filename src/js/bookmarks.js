import '../styles/index.css';
import './hamburger';

window.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('card__button-trash')) {
      e.target.closest('.card').remove();
    }
  });
});
