/**
 * Модуль работы с шапкой сайта
 * Обрабатывает скрытие/показ шапки при прокрутке и активную ссылку в навигации
 */

/**
 * Обновление активной ссылки в навигации на основе текущей позиции прокрутки
 */
const updateActiveNavLink = () => {
  const navLinks = document.querySelectorAll('.header__nav-link');
  const sections = document.querySelectorAll('section[id]');
  
  if (!navLinks.length || !sections.length) {
    return;
  }

  const headerHeight = 80;
  const scrollPosition = window.pageYOffset + headerHeight + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href === `#${sectionId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  });

  // Обработка случая, когда мы в самом верху страницы
  if (window.pageYOffset < 100) {
    const homeLink = document.querySelector('.header__nav-link[href="#home"]');
    if (homeLink) {
      navLinks.forEach((link) => link.classList.remove('active'));
      homeLink.classList.add('active');
    }
  }
};

/**
 * Обработка скрытия/показа шапки при прокрутке
 */
const handleHeaderScroll = () => {
  const header = document.querySelector('.header');
  
  if (!header) {
    return;
  }

  let lastScrollTop = 0;
  let ticking = false;

  /**
   * Обновление состояния шапки на основе позиции прокрутки
   */
  const updateHeader = () => {
    try {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.classList.add('header--hidden');
      } else {
        header.classList.remove('header--hidden');
      }

      // Обновление активной ссылки в навигации
      updateActiveNavLink();

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
      ticking = false;
    } catch (error) {
      // Обработка ошибок без console.error для production
      ticking = false;
    }
  };

  /**
   * Запрос обновления кадра
   */
  const requestTick = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  };

  // Инициализация активной ссылки при загрузке
  updateActiveNavLink();
  
  window.addEventListener('scroll', requestTick, { passive: true });
};

export {
  handleHeaderScroll,
  handleHeaderScroll as default
};
