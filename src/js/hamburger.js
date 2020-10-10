window.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const headerNavigator = document.querySelector('.header__navigator');
  const hideMobileMenu = () => header.classList.remove('header_visible-mobile-menu');
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('header__hamburger')) {
      header.classList.toggle('header_visible-mobile-menu');
      if (header.classList.contains('header_visible-mobile-menu')) {
        document.querySelector('.header__menu').style.top = `${headerNavigator.clientHeight}px`;
      }
    } else {
      hideMobileMenu();
    }
  });
  window.addEventListener('resize', hideMobileMenu);
});
