import '../styles/index.css';
import './hamburger';

window.addEventListener('DOMContentLoaded', () => {
  const foundMoreResults = document.querySelector('.found__more-results');
  foundMoreResults.addEventListener('click', () => {
    const cards = document.querySelector('.cards');
    document.querySelectorAll('.cards .card').forEach((card) => {
      cards.appendChild(card.cloneNode(true));
    });
    foundMoreResults.style.display = 'none';
  });

  document.querySelector('.search__bar').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('card__bookmark')) {
      e.target.classList.toggle('card__bookmark_marked');
    }
  });

  const userButton = document.querySelector('.header__menu-user');
  userButton.addEventListener('click', () => {
    if (userButton.classList.contains('header__menu-user_signedin')) {
      userButton.classList.remove('header__menu-user_signedin');
      document.querySelector('.header__user-text').textContent = 'Авторизоваться';
      document.querySelectorAll('.header__menu li')[1].style.display = 'none';
    }
  });
});
