/**
* Template Name: HeroBiz
* Template URL: https://bootstrapmade.com/herobiz-bootstrap-business-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

/**
 * Request-a-quote flip cards.
 * The existing pricing markup is rearranged here so the three cards can share
 * the same component behavior without affecting pricing cards elsewhere.
 */
(function() {
  'use strict';

  if (!document.body.classList.contains('quote-page')) return;

  const style = document.createElement('style');
  style.textContent = `
    .quote-page .pricing-item {
      min-height: 390px;
      padding: 0;
      perspective: 1200px;
      background: transparent;
      box-shadow: none;
    }

    .quote-page .quote-card-inner {
      position: relative;
      width: 100%;
      min-height: 390px;
      height: 100%;
      transform-style: preserve-3d;
      transition: transform 0.7s cubic-bezier(.2,.7,.2,1);
    }

    .quote-page .pricing-item:hover .quote-card-inner,
    .quote-page .pricing-item:focus-within .quote-card-inner,
    .quote-page .pricing-item.is-flipped .quote-card-inner {
      transform: rotateY(180deg);
    }

    .quote-page .quote-card-face {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 40px 30px;
      border-radius: 8px;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      overflow: hidden;
    }

    .quote-page .quote-card-front {
      align-items: center;
      text-align: center;
      background: var(--surface-color);
      border: 1px solid color-mix(in srgb, var(--default-color), transparent 90%);
      box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
    }

    .quote-page .quote-card-front::after {
      content: 'View inclusions';
      margin-top: 22px;
      color: var(--accent-color);
      font-size: 13px;
      font-weight: 600;
      letter-spacing: .04em;
      text-transform: uppercase;
    }

    .quote-page .quote-card-front .pricing-header h3 {
      margin-bottom: 15px;
    }

    .quote-page .quote-card-back {
      justify-content: space-between;
      background: var(--accent-color);
      color: var(--contrast-color);
      transform: rotateY(180deg);
    }

    .quote-page .quote-card-back ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .quote-page .quote-card-back li,
    .quote-page .quote-card-back li span,
    .quote-page .quote-card-back li i {
      color: var(--contrast-color);
    }

    .quote-page .quote-card-back li {
      display: flex;
      align-items: flex-start;
      gap: 6px;
      padding: 8px 0;
    }

    .quote-page .quote-card-back .buy-btn {
      color: var(--accent-color);
      background: var(--contrast-color);
    }

    @media (max-width: 767px) {
      .quote-page .pricing-item,
      .quote-page .quote-card-inner {
        min-height: 350px;
      }

      .quote-page .quote-card-face {
        padding: 30px 24px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .quote-page .quote-card-inner {
        transition: none;
      }
    }
  `;
  document.head.appendChild(style);

  document.querySelectorAll('.quote-page #pricing .pricing-item').forEach((card) => {
    const header = card.querySelector('.pricing-header');
    const list = card.querySelector(':scope > ul');
    const action = card.querySelector(':scope > .text-center');
    if (!header || !list || !action) return;

    const inner = document.createElement('div');
    inner.className = 'quote-card-inner';

    const front = document.createElement('div');
    front.className = 'quote-card-face quote-card-front';
    front.appendChild(header);

    const back = document.createElement('div');
    back.className = 'quote-card-face quote-card-back';
    back.append(list, action);

    inner.append(front, back);
    card.replaceChildren(inner);
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `${header.querySelector('h3')?.textContent || 'Quote'} details`);

    card.addEventListener('click', (event) => {
      if (event.target.closest('a')) return;
      card.classList.toggle('is-flipped');
    });

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        card.classList.toggle('is-flipped');
      }
    });
  });
})();
