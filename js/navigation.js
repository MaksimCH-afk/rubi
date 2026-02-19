/**
 * Модуль навигации
 * Обрабатывает плавную прокрутку к якорям с учетом фиксированной шапки
 */

/**
 * Инициализация плавной прокрутки к якорям
 */
const handleSmoothScroll = () => {
  // Находим все ссылки на якоря внутри страницы
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  if (!anchorLinks.length) {
    return;
  }

  /**
   * Обработка клика по ссылке с якорем
   * @param {Event} e - Событие клика
   */
  const handleAnchorClick = (e) => {
    const href = e.currentTarget.getAttribute('href');
    
    // Пропускаем пустые якоря и якоря, которые не являются id элемента
    if (!href || href === '#' || href.length <= 1) {
      return;
    }

    try {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      // Проверяем, что элемент существует на текущей странице
      if (!targetElement) {
        // Если это ссылка на другую страницу с якорем, разрешаем стандартное поведение
        if (href.includes('index.html#') || href.includes('privacy.html#')) {
          return;
        }
        return;
      }

      // Предотвращаем стандартное поведение только для якорей на текущей странице
      e.preventDefault();

      // Получаем высоту фиксированной шапки (80px)
      const headerHeight = 80;
      const targetPosition = targetElement.offsetTop - headerHeight;

      // Плавная прокрутка к элементу
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    } catch (error) {
      // Обработка ошибок без console.error для production
    }
  };

  // Добавляем обработчик для каждой ссылки
  anchorLinks.forEach(link => {
    link.addEventListener('click', handleAnchorClick);
  });
};

export {
  handleSmoothScroll,
  handleSmoothScroll as default
};
