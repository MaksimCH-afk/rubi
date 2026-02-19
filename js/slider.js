/**
 * Модуль работы со слайдером отзывов
 * Инициализирует Swiper для слайдера отзывов
 */

/**
 * Инициализация слайдера отзывов
 */
const initReviewsSlider = () => {
  const reviewsSlider = document.querySelector('.reviews__slider');
  
  if (!reviewsSlider) {
    return;
  }

  // Проверка доступности Swiper
  if (typeof Swiper === 'undefined') {
    // Если Swiper не загружен, показываем статичный контент
    // Слайды будут видны все сразу, но без функциональности слайдера
    const slideContent = reviewsSlider.querySelector('.reviews__slide-content');
    if (slideContent) {
      // Убираем скрытие слайдов и показываем контент статично
      const slides = reviewsSlider.querySelectorAll('.swiper-slide');
      slides.forEach(slide => {
        slide.style.display = 'block';
      });
    }
    return;
  }

  try {
    new Swiper(reviewsSlider, {
      slidesPerView: 1,
      spaceBetween: 30,
      pagination: {
        el: '.reviews__pagination',
        clickable: true,
        bulletClass: 'swiper-pagination-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active',
        renderBullet: function (index, className) {
          return '<span class="' + className + '"></span>';
        },
      },
      grabCursor: true,
      allowTouchMove: true,
      touchEventsTarget: 'container',
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: true,
      resistance: true,
      resistanceRatio: 0.85,
      mousewheel: {
        forceToAxis: true,
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
    });
  } catch (error) {
    // Обработка ошибок без console.error для production
    // При ошибке инициализации показываем статичный контент
    const slides = reviewsSlider.querySelectorAll('.swiper-slide');
    slides.forEach(slide => {
      slide.style.display = 'block';
    });
  }
};

export {
  initReviewsSlider,
  initReviewsSlider as default
};
