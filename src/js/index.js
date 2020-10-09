import '../styles/index.css';
import './hamburger';

function showPopup(popup) {
  const form = popup.querySelector('form');
  if (form) {
    form.reset();
    form.querySelector('.popup__button').disabled = true;
  }
  popup.classList.add('popup_is-opened');
}

function hidePopup(popup) {
  popup.classList.remove('popup_is-opened');
}

let authentificated = false;

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

  const registerPopup = document.querySelector('#register');
  const loginPopup = document.querySelector('#login');
  const registeredPopup = document.querySelector('#registered');

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
      if (authentificated) {
        e.target.classList.toggle('card__bookmark_marked');
      } else {
        if (e.target.parentElement.querySelector('.card__tooltip')) {
          return;
        }
        const tooltip = document.createElement('p');
        tooltip.classList.add('card__tooltip');
        tooltip.textContent = 'Войдите, чтобы сохранять статьи';
        e.target.parentElement.appendChild(tooltip);
        setTimeout(() => {
          e.target.parentElement.removeChild(tooltip);
        }, 5000);
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
      form.querySelector('.popup__button').disabled = !isValid; /* eslint-disable-line no-param-reassign */ // на этапе с JS этот код будет переделан
    });
  });
});
