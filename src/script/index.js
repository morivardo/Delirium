/* eslint-disable one-var */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */

const cacheHeight = window.innerHeight; // Needs for store the screen size and prevent scroll-resize in mobile devices
const cacheWidth = window.innerWidth; // Needs for store the screen size and prevent scroll-resize in mobile devices

// Create animation for the hamburger menu
function animateBurger() {
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    menu.classList.toggle('uncollapse');
  });
}

// Allows horizontal scrolling with the mouse wheel
function horizontalScroll() {
  const scrollContainer = document.getElementsByTagName('html');

  if (window.innerWidth > 1200 && window.innerHeight > 750) {
    scrollContainer[0].addEventListener(
      'wheel',
      (evt) => {
        scrollContainer[0].scrollLeft += evt.deltaY * 350;
      },
      { passive: false },
    );
  }
}

// Creates the layers that form the neon effect
// Tag parameter must be a string
function layering(tag, n) {
  const el = document.querySelectorAll(tag);
  let name = tag;
  if (name[0] === '.' || name[0] === '#') {
    name = name.substring(1);
  }

  el.forEach((h) => {
    const s = [];
    const content = h.innerText.replace(/(\r\n|\n|\r)/gm, '');
    const div = document.createElement('div');
    div.classList.add(`container-${name}`);

    if (h.classList.contains('primary-color')) {
      div.classList.add('container-primary-color');
    } else if (h.classList.contains('secondary-color')) {
      div.classList.add('container-secondary-color');
    } else if (h.classList.contains('tertiary-color')) {
      div.classList.add('container-tertiary-color');
    }

    if (h.classList.contains('number')) {
      div.classList.add('number');
    }

    h.replaceWith(div);
    div.append(h);

    for (let i = 0; i < n; i += 1) {
      s[i] = document.createElement('span');
      s[i].classList.add('glow-layer', `layer-${i}`);
      s[i].innerText = content;

      if (h.classList.contains('title-btn')) s[i].classList.add('title-btn');

      div.append(s[i]);
    }
  });
}

// Creates the layers that form the neon effect of someone div frames
// Frame parameter must be a string of a class name
function frameLayering(frame, n) {
  const div = [];
  const el = document.querySelectorAll(`.${frame}`);

  el.forEach((c) => {
    for (let i = 0; i < n; i += 1) {
      div[i] = document.createElement('div');
      div[i].classList.add('glow-layer', `layer-${i}`);

      c.append(div[i]);
    }
  });
}

// Allows the play button on the community page to start playing the anthem
function playAnthem() {
  const desktopBody = document.getElementById('community');
  const mobileBody = document.getElementById('m-community');
  const tabletBody = document.getElementById('t-community');
  let playing = false;
  if (desktopBody != null || mobileBody != null || tabletBody != null) {
    const btn = document.getElementById('anthem-play-button');
    const anthem = document.getElementById('anthem');
    const obj = document.querySelectorAll('.icon-section-2');
    const start = document.querySelectorAll('animate[from="M 18 10 L 90 49 L 18 90"]'); // Seleziona l'animazione per i vettori in forma di play
    const stop = document.querySelectorAll('animate[from="M 82 10 L 82 49 L 82 90"]'); // Seleziona l'animazione per i vettori in forma di pause

    btn.addEventListener('click', () => {
      if (playing === false) {
        anthem.play();
        obj.forEach((o) => {
          o.classList.add('play');
        });
        start.forEach((play) => {
          play.beginElement();
        });
        playing = true;
      } else {
        anthem.pause();
        obj.forEach((o) => {
          o.classList.remove('play');
        });
        stop.forEach((pause) => {
          pause.beginElement();
        });
        playing = false;
      }
    });
  }
}

// Allows to set the loaded image as the background of the preview container
function previewFile() {
  const reader = new FileReader();
  reader.onload = () => {
    const output = document.getElementById('image-preview');
    output.style.backgroundImage = `url(${reader.result})`;
  };
  reader.readAsDataURL(event.target.files[0]);
}

// Set proportional height for carousel
function resizeCarousel() {
  const carousel = document.querySelector('.slideshow-container');

  if (typeof carousel !== 'undefined' && carousel !== null) {
    if (window.innerWidth > 920) {
      carousel.style.height = String(`${carousel.offsetWidth * 0.7}px`);
    } else if (window.innerWidth <= 920 && window.innerWidth > 780) {
      carousel.style.height = String(`${carousel.offsetWidth * 1}px`);
    } else if (window.innerWidth <= 780 && window.innerWidth > 680) {
      carousel.style.height = String(`${carousel.offsetWidth * 0.8}px`);
    } else if (window.innerWidth <= 680) {
      carousel.style.height = String(`${carousel.offsetWidth * 0.7}px`);
    }
  }
}

// Sets the width to create fullscreen sections
function resizeWrapper() {
  const wrapper = document.getElementById('wrapper');

  if (typeof wrapper !== 'undefined' && wrapper !== null) {
    const w = document.querySelectorAll('section[class^="slice"]').length;
    wrapper.style.width = String(`${w * 100 + 22}vw`);
  }
}

// Directs the user to the correct document based on window size
function resizeRouting() {
  function pathing() {
    let path;
    if (window.location.href.split('/').slice(-1) !== '') {
      path = window.location.href.split('/').slice(-1);
      path = path[0].split('.').shift();
    } else {
      path = 'index';
    }

    if (path.includes('-')) path = path.split('-').pop();

    return path;
  }

  const doc = pathing();
  const desktop = '/views/' + doc + '/' + doc + '.html';
  const mobile = '/views/' + doc + '/m-' + doc + '.html';
  const tablet = '/views/' + doc + '/t-' + doc + '.html';

  if (window.innerWidth > 1200 && window.innerHeight > 750) {
    // Desktop
    if (window.location.pathname !== desktop) window.location.replace(desktop);
  } else if (window.innerWidth <= 600) {
    // Mobile
    if (window.location.pathname !== mobile) window.location.replace(mobile);
  } else if (
    (window.innerWidth <= 1200 && window.innerWidth > 600 && window.innerHeight <= 750) ||
    (window.innerWidth > 1200 && window.innerHeight <= 750) ||
    (window.innerWidth <= 1200 && window.innerWidth > 600)
  ) {
    // Tablet
    if (window.location.pathname !== tablet) window.location.replace(tablet);
  }
}

// Allows slideshow cards to slide back and forth
function slideshowConstructor() {
  const cards = document.querySelectorAll('.slideshow-item');
  const points = [];
  let flag;

  if (typeof cards !== 'undefined' && cards !== null && cards.length !== 0) {
    cards.forEach(() => {
      const div = document.createElement('div');
      const l = [];
      div.classList.add('container-btn-neon', 'point');
      document.getElementById('slideshow-pointers').append(div);
      for (let i = 0; i < 6; i += 1) {
        l[i] = document.createElement('div');
        l[i].classList.add('glow-layer', `layer-${i}`);
        div.append(l[i]);
      }
      points.push(div);
    });

    for (let i = 0; i < points.length; i += 1) {
      points[i].addEventListener('click', () => {
        cards.forEach((card) => {
          if (card.classList.contains('active')) card.classList.remove('active');
          if (card.classList.contains('following')) card.classList.remove('following');
          if (card.classList.contains('previous')) card.classList.remove('previous');
        });

        cards[i].classList.add('active');

        if (i === 0) {
          cards[cards.length - 1].classList.add('previous');
          cards[1].classList.add('following');
        } else if (i === cards.length - 1) {
          cards[i - 1].classList.add('previous');
          cards[0].classList.add('following');
        } else {
          cards[i - 1].classList.add('previous');
          cards[i + 1].classList.add('following');
        }
      });
    }

    document.getElementById('slideshow-next').addEventListener('click', () => {
      for (let i = 0; i < cards.length; i += 1) {
        if (cards[i].classList.contains('active')) {
          cards[i].classList.remove('active');
          cards[i].classList.add('previous');

          if (i === 0) cards[cards.length - 1].classList.remove('previous');
          else cards[i - 1].classList.remove('previous');

          if (i === cards.length - 2) {
            cards[0].classList.add('following');
            cards[i + 1].classList.remove('following');
            cards[i + 1].classList.add('active');
          } else if (i === cards.length - 1) {
            cards[0].classList.remove('following');
            cards[0].classList.add('active');
            cards[1].classList.add('following');
          } else {
            cards[i + 1].classList.remove('following');
            cards[i + 1].classList.add('active');
            cards[i + 2].classList.add('following');
          }

          break;
        }
      }
    });

    document.getElementById('slideshow-prev').addEventListener('click', () => {
      for (let i = 0; i < cards.length; i += 1) {
        if (cards[i].classList.contains('active')) {
          cards[i].classList.remove('active');
          cards[i].classList.add('following');

          if (i === cards.length - 1) cards[0].classList.remove('following');
          else cards[i + 1].classList.remove('following');

          if (i === 0) {
            cards[cards.length - 1].classList.remove('previous');
            cards[cards.length - 1].classList.add('active');
            cards[cards.length - 2].classList.add('previous');
          } else if (i === 1) {
            cards[0].classList.remove('previous');
            cards[0].classList.add('active');
            cards[cards.length - 1].classList.add('previous');
          } else {
            cards[i - 1].classList.remove('previous');
            cards[i - 1].classList.add('active');
            cards[i - 2].classList.add('previous');
          }

          break;
        }
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  animateBurger();
  frameLayering('container-neon-frame', 6);
  horizontalScroll();
  layering('h1', 6);
  layering('h2', 6);
  layering('h3', 6);
  layering('.btn-neon', 6);
  layering('.check-neon', 6);
  layering('.footer-text', 6);
  layering('.hamburger', 6);
  layering('.input-neon', 6);
  layering('.neon-strip', 6);
  layering('.stroke-neon', 6);
  playAnthem();
  resizeCarousel();
  resizeWrapper();
  slideshowConstructor();
});

window.addEventListener('resize', () => {
  if (window.innerWidth !== cacheWidth || window.innerWidth !== cacheHeight) {
    horizontalScroll();
    resizeCarousel();
    resizeRouting();
  }
});
