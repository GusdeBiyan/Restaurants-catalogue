import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import '../styles/responsiv.css';
import App from './views/app';
import swRegister from './utils/sw-register';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const app = new App({
  button: document.querySelector('#menu'),
  drawer: document.querySelector('#drawer'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});

const skipToContent = document.querySelector('.skip-link');
skipToContent.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    document.querySelector('#mainContent').focus();
  }
});

const header = document.querySelector('header');
let previousScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

function handleScroll() {
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScrollPosition > previousScrollPosition) {
    // Pengguna menggulir ke bawah
    header.classList.add('hidden');
  } else {
    // Pengguna menggulir ke atas
    header.classList.remove('hidden');
  }

  previousScrollPosition = currentScrollPosition;
}

window.addEventListener('scroll', handleScroll);
