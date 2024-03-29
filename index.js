const aboutMe = document.querySelector('.bodyContent');
const scroll = document.querySelector('.btn-scrolle');
const stickyNav = document.querySelector('.navbar');
const navMobile = document.querySelector('.navbar-toggle-label');
const h1Header = document.querySelector('.h1-name');

// Download file
// <form method="get" action="file.doc">
//    <button type="submit">Download!</button>
// </form>
navMobile.addEventListener('click', () => {
  h1Header.classList.toggle('h1-nav');
  // if (document.maxWidth = "600px") {
  //   h1Header.classList.remove('h1-nav');
  // }
})

scroll.addEventListener('click', function (e) {
  const s1coords = aboutMe.getBoundingClientRect();
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });

  // s1coords.scrollIntoView({ behavior: 'smooth' });
});

// scrolle in the page
document.querySelectorAll('.a-link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  });
});

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

// sticky Navigation
const initCrd = aboutMe.getBoundingClientRect();

window.addEventListener('scroll', function () {
  if (window.scrollY > initCrd.top) {
    return stickyNav.classList.add('sticky')
  } else {
    return stickyNav.classList.remove('sticky')
  }
});
// lazy load for the page
const bodyContent = document.querySelectorAll('.bodyContent');
const body = document.querySelectorAll('body');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section-hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

bodyContent.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section-hidden');
});

let typed = new Typed(".auto-type", {
  strings:["UI/UX Designer", "Full-Stack Developer", "Freelancer"],
  typeSpeed:150,
  backSpeed:150,
  loop:true
});
