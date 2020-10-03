import '../styles/index.css';

window.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('header__hamburger')) {
      header.classList.toggle('header_visible-mobile-menu');
      if (header.classList.contains('header_visible-mobile-menu')) {
        document.querySelector('.header__menu').style.top = `${header.clientHeight}px`;
      }
    } else {
      header.classList.remove('header_visible-mobile-menu');
    }
  });
});
