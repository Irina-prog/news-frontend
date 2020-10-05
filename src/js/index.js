import '../styles/index.css';
import './hamburger';

window.addEventListener('DOMContentLoaded', () => {
  const foundMoreResults = document.querySelector('.found__more-results');
  foundMoreResults.addEventListener('click', () => {
    foundMoreResults.style.display = 'none';
  });

  document.querySelector('.search__bar').addEventListener('submit', (e) => {
    e.preventDefault();
  });
});
