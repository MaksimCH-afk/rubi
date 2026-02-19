/**
 * Модуль работы с модальными окнами
 * Содержит функции для открытия/закрытия модальных окон
 */

/**
 * Обработка модального окна запроса и успешного модального окна
 * @returns {{openSuccessModal: Function, closeModal: Function}} - Публичные методы
 */
const handleModal = () => {
  const modal = document.getElementById('requestModal');
  const successModal = document.getElementById('successModal');
  
  if (!modal) {
    return { openSuccessModal: () => {}, closeModal: () => {} };
  }

  const modalOverlay = modal.querySelector('.modal__overlay');
  const modalClose = modal.querySelector('.modal__close');
  const openModalButtons = document.querySelectorAll('[data-modal-open]');

  /**
   * Открытие основного модального окна
   */
  const openModal = () => {
    try {
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      modal.focus();
    } catch (error) {
      // Обработка ошибок без console.error для production
    }
  };

  /**
   * Закрытие основного модального окна
   * @param {boolean} keepOverflow - Сохранить блокировку прокрутки
   */
  const closeModal = (keepOverflow = false) => {
    try {
      modal.setAttribute('aria-hidden', 'true');
      if (!keepOverflow) {
        document.body.style.overflow = '';
        const firstOpenButton = openModalButtons[0];
        if (firstOpenButton) {
          firstOpenButton.focus();
        }
      }
    } catch (error) {
      // Обработка ошибок без console.error для production
    }
  };

  /**
   * Открытие модального окна успешной отправки
   */
  const openSuccessModal = () => {
    try {
      if (!successModal) {
        return;
      }

      successModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      const successModalClose = successModal.querySelector('.modal__close');
      if (successModalClose) {
        setTimeout(() => {
          successModalClose.focus();
        }, 100);
      }
    } catch (error) {
      // Обработка ошибок без console.error для production
    }
  };

  /**
   * Закрытие модального окна успешной отправки
   */
  const closeSuccessModal = () => {
    try {
      if (!successModal) {
        return;
      }

      successModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    } catch (error) {
      // Обработка ошибок без console.error для production
    }
  };

  /**
   * Обработка нажатия Escape
   * @param {KeyboardEvent} e - Событие клавиатуры
   */
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      if (modal.getAttribute('aria-hidden') === 'false') {
        closeModal();
      }
      if (successModal && successModal.getAttribute('aria-hidden') === 'false') {
        closeSuccessModal();
      }
    }
  };

  // Обработка кнопок открытия модального окна
  openModalButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  // Обработка кнопки закрытия основного модального окна
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  // Обработка клика на overlay основного модального окна
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  // Обработка модального окна успешной отправки
  if (successModal) {
    const successModalOverlay = successModal.querySelector('.modal__overlay');
    const successModalClose = successModal.querySelector('.modal__close');
    const successModalCloseButtons = successModal.querySelectorAll('[data-success-modal-close]');
    
    successModalCloseButtons.forEach(button => {
      button.addEventListener('click', closeSuccessModal);
    });
    
    if (successModalClose) {
      successModalClose.addEventListener('click', closeSuccessModal);
    }
    
    if (successModalOverlay) {
      successModalOverlay.addEventListener('click', (e) => {
        if (e.target === successModalOverlay) {
          closeSuccessModal();
        }
      });
    }
  }

  // Обработка Escape для закрытия модальных окон
  document.addEventListener('keydown', handleEscape);

  return { openSuccessModal, closeModal };
};

export {
  handleModal,
  handleModal as default
};
