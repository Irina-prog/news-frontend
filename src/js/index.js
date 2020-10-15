import '../styles/index.css';

import showTooltip from './tooltip';

function showPopup(popup) {
  const form = popup.querySelector('form');
  if (form) {
    form.reset();
    form.querySelector('.button_form').disabled = true;
  }
  popup.classList.add('popup_is-opened');
  document.querySelector('.header__hamburger').style.visibility = 'hidden';
}

function hidePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.querySelector('.header__hamburger').style.visibility = 'visible';
}

let authentificated = false;

window.addEventListener('DOMContentLoaded', () => {
  const foundMoreResults = document.querySelector('.button_more');
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

  const registerPopup = document.querySelector('#register');
  const loginPopup = document.querySelector('#login');
  const registeredPopup = document.querySelector('#registered');

  preloader.style.display = 'none';
  notFound.style.display = 'none';
  found.style.display = 'none';

  document.querySelector('.header__bar').addEventListener('submit', (e) => {
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
    if (e.target.classList.contains('card__button_bookmark')) {
      if (authentificated) {
        e.target.classList.add('card__button_marked-bookmark');
        e.target.classList.remove('card__button_bookmark');
      } else {
        showTooltip(e.target, 'Войдите, чтобы сохранять статьи', true);
      }
    }

    if (e.target.classList.contains('popup__close')) {
      hidePopup(e.target.closest('.popup'));
    }
  });

  const userButton = document.querySelector('.header__menu-user');
  userButton.addEventListener('click', () => {
    if (userButton.classList.contains('header__menu-user_signedin')) {
      userButton.classList.remove('header__menu-user_signedin');
      document.querySelector('.header__user-text').textContent = 'Авторизоваться';
      document.querySelectorAll('.header__menu li')[1].style.display = 'none';
      authentificated = false;
    } else {
      showPopup(loginPopup);
    }
  });

  registerPopup.querySelector('.popup__link').addEventListener('click', (e) => {
    e.preventDefault();
    showPopup(loginPopup);
    hidePopup(registerPopup);
  });

  loginPopup.querySelector('.popup__link').addEventListener('click', (e) => {
    e.preventDefault();
    hidePopup(loginPopup);
    showPopup(registerPopup);
  });

  registeredPopup.querySelector('.popup__link').addEventListener('click', (e) => {
    e.preventDefault();
    showPopup(loginPopup);
    hidePopup(registeredPopup);
  });

  const registerForm = registerPopup.querySelector('form');
  const loginForm = loginPopup.querySelector('form');

  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    hidePopup(registerPopup);
    showPopup(registeredPopup);
  });

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loginPopup.classList.remove('popup_is-opened');
    userButton.classList.add('header__menu-user_signedin');
    document.querySelector('.header__user-text').textContent = 'Грета';
    document.querySelectorAll('.header__menu li')[1].style.display = '';
    authentificated = true;
  });

  document.querySelectorAll('.header__menu li')[1].style.display = 'none';

  [registerForm, loginForm].forEach((form) => {
    form.addEventListener('input', () => {
      const isValid = form.reportValidity();
      form.querySelector('.button_form').disabled = !isValid; /* eslint-disable-line no-param-reassign */ // на этапе с JS этот код будет переделан
    });
  });
});
