import '../styles/index.css';
import './hamburger';
import './tooltip';

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('card__button_trash')) {
    e.target.closest('.card').remove();
  }
  if (e.target.closest('.header__menu-user')) {
    window.location.href = './index.html';
  }
});
