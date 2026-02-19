/**
 * Главный файл инициализации приложения
 * Инициализирует все модули после загрузки DOM
 */

import { handleHeaderScroll } from './header.js';
import { initReviewsSlider } from './slider.js';
import { handleSubscribeForm, handleRequestForm } from './forms.js';
import { handleModal } from './modal.js';
import { handleSmoothScroll } from './navigation.js';

/**
 * Инициализация всех модулей приложения
 */
const initApp = () => {
  try {
    // Проверка доступности DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initApp);
      return;
    }

    // Инициализация шапки
    handleHeaderScroll();

    // Инициализация плавной прокрутки к якорям
    handleSmoothScroll();

    // Инициализация слайдера отзывов
    initReviewsSlider();

    // Инициализация формы подписки
    handleSubscribeForm();

    // Инициализация модального окна
    const { openSuccessModal, closeModal } = handleModal();

    // Инициализация формы заявки в модальном окне
    handleRequestForm(openSuccessModal, closeModal);
  } catch (error) {
    // Обработка ошибок без console.error для production
  }
};

// Запуск инициализации
initApp();
