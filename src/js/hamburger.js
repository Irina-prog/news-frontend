function hideMobileMenu() {
  document.querySelector('.header').classList.remove('header_visible-mobile-menu');
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('header__hamburger')) {
    e.target.closest('.header').classList.toggle('header_visible-mobile-menu');
  } else {
    hideMobileMenu();
  }
});
window.addEventListener('resize', hideMobileMenu);
