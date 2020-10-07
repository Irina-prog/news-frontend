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

  const preloader = document.querySelector('.preloader');
  const notFound = document.querySelector('.notfound');
  const found = document.querySelector('.found');

  preloader.style.display = 'none';
  notFound.style.display = 'none';
  found.style.display = 'none';

  document.querySelector('.search__bar').addEventListener('submit', (e) => {
    const searchText = e.target.elements[0].value.trim();
    notFound.style.display = 'none';
    found.style.display = 'none';
    preloader.style.display = '';
    setTimeout(() => {
      preloader.style.display = 'none';
      if (searchText.length > 0) {
        found.style.display = '';
      } else {
        notFound.style.display = '';
      }
    }, 3000);
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
