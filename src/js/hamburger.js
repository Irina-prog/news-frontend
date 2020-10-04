window.addEventListener('DOMContentLoaded', () => {
  const headerNavigator = document.querySelector('.header__navigator');
  const hideMobileMenu = () => headerNavigator.classList.remove('header__navigator_visible-mobile-menu');
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('header__hamburger')) {
      headerNavigator.classList.toggle('header__navigator_visible-mobile-menu');
      if (headerNavigator.classList.contains('header__navigator_visible-mobile-menu')) {
        document.querySelector('.header__menu').style.top = `${headerNavigator.clientHeight}px`;
      }
    } else {
      hideMobileMenu();
    }
  });
  window.addEventListener('resize', hideMobileMenu);
});
