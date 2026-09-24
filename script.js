const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  navLinks.classList.toggle('is-open');
  document.body.classList.toggle('menu-open', !expanded);
});

document.querySelectorAll('.nav-links a').forEach((link) => link.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  navLinks.classList.remove('is-open');
  document.body.classList.remove('menu-open');
}));

const track = document.querySelector('.carousel__track');
const slides = [...document.querySelectorAll('.carousel__slide')];
const dots = document.querySelector('.carousel__dots');
const prev = document.querySelector('.carousel__button--prev');
const next = document.querySelector('.carousel__button--next');
let activeSlide = 0;
let carouselTimer;

const showSlide = (index) => {
  activeSlide = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${activeSlide * 100}%)`;
  [...dots.children].forEach((dot, dotIndex) => {
    dot.classList.toggle('is-active', dotIndex === activeSlide);
    dot.setAttribute('aria-selected', String(dotIndex === activeSlide));
  });
};

slides.forEach((_, index) => {
  const dot = document.createElement('button');
  dot.className = 'carousel__dot';
  dot.setAttribute('role', 'tab');
  dot.setAttribute('aria-label', `Ver imagem ${index + 1}`);
  dot.addEventListener('click', () => { showSlide(index); restartAutoplay(); });
  dots.append(dot);
});

const restartAutoplay = () => {
  window.clearInterval(carouselTimer);
  carouselTimer = window.setInterval(() => showSlide(activeSlide + 1), 5000);
};

prev.addEventListener('click', () => { showSlide(activeSlide - 1); restartAutoplay(); });
next.addEventListener('click', () => { showSlide(activeSlide + 1); restartAutoplay(); });
track.closest('.carousel').addEventListener('mouseenter', () => window.clearInterval(carouselTimer));
track.closest('.carousel').addEventListener('mouseleave', restartAutoplay);
showSlide(0);
restartAutoplay();
document.querySelector('#year').textContent = new Date().getFullYear();
