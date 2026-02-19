/**
 * Модуль работы с формами
 * Содержит функции для обработки форм подписки и заявки
 */

import { validateName, validatePhone, validateEmail, formatPhone } from './validation.js';

/**
 * Показать ошибку валидации
 * @param {HTMLElement} input - Элемент input
 * @param {HTMLElement} errorElement - Элемент для отображения ошибки
 * @param {string} message - Сообщение об ошибке
 */
const showError = (input, errorElement, message) => {
  if (!input || !errorElement || !message) {
    return;
  }

  try {
    input.classList.add('modal__input--error');
    errorElement.textContent = message;
    errorElement.classList.add('modal__error--visible');
    input.setAttribute('aria-invalid', 'true');
  } catch (error) {
    // Обработка ошибок без console.error для production
  }
};

/**
 * Скрыть ошибку валидации
 * @param {HTMLElement} input - Элемент input
 * @param {HTMLElement} errorElement - Элемент для отображения ошибки
 */
const hideError = (input, errorElement) => {
  if (!input || !errorElement) {
    return;
  }

  try {
    input.classList.remove('modal__input--error');
    errorElement.textContent = '';
    errorElement.classList.remove('modal__error--visible');
    input.setAttribute('aria-invalid', 'false');
  } catch (error) {
    // Обработка ошибок без console.error для production
  }
};

/**
 * Утилита для debounce функции
 * @param {Function} func - Функция для debounce
 * @param {number} wait - Задержка в миллисекундах
 * @returns {Function} - Debounced функция
 */
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Валидация email (простая версия для формы подписки)
 * Использует validateEmail из validation.js для единообразия
 * @param {string} email - Email для валидации
 * @returns {boolean} - Результат валидации
 */
const validateEmailSimple = (email) => {
  const result = validateEmail(email);
  return result.valid;
};

/**
 * Обработка формы подписки на email
 */
const handleSubscribeForm = () => {
  const subscribeForm = document.getElementById('subscribeForm');
  const emailInput = document.getElementById('subscribeEmail');
  const errorMessage = document.getElementById('subscribeError');
  
  if (!subscribeForm || !emailInput || !errorMessage) {
    return;
  }

  /**
   * Показать ошибку в форме подписки
   * @param {string} message - Сообщение об ошибке
   */
  const showSubscribeError = (message) => {
    try {
      errorMessage.textContent = message;
      errorMessage.classList.add('subscribe__error--visible');
      emailInput.classList.add('subscribe__input--error');
      emailInput.setAttribute('aria-invalid', 'true');
    } catch (error) {
      // Обработка ошибок без console.error для production
    }
  };

  /**
   * Скрыть ошибку в форме подписки
   */
  const hideSubscribeError = () => {
    try {
      errorMessage.textContent = '';
      errorMessage.classList.remove('subscribe__error--visible');
      emailInput.classList.remove('subscribe__input--error');
      emailInput.setAttribute('aria-invalid', 'false');
    } catch (error) {
      // Обработка ошибок без console.error для production
    }
  };

  /**
   * Обработка ввода в поле email (с debounce для оптимизации)
   */
  const handleInputDebounced = debounce(() => {
    try {
      const email = emailInput.value.trim();
      if (email && !validateEmailSimple(email)) {
        showSubscribeError('Please enter a valid email address');
      } else {
        hideSubscribeError();
      }
    } catch (error) {
      // Обработка ошибок без console.error для production
    }
  }, 300);

  /**
   * Обработка ввода в поле email
   */
  const handleInput = () => {
    handleInputDebounced();
  };

  /**
   * Обработка отправки формы подписки
   * @param {Event} e - Событие отправки формы
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submitButton = subscribeForm.querySelector('.subscribe__button');
    if (!submitButton) {
      return;
    }

    // Защита от double submit
    if (submitButton.disabled) {
      return;
    }

    try {
      const email = emailInput.value.trim();
      
      if (!email) {
        showSubscribeError('Email address is required');
        emailInput.focus();
        return;
      }
      
      if (!validateEmailSimple(email)) {
        showSubscribeError('Please enter a valid email address');
        emailInput.focus();
        return;
      }
      
      hideSubscribeError();
      
      const originalButtonText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      alert('email sent');
      
      emailInput.value = '';
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
    } catch (error) {
      showSubscribeError('Failed to send email. Please try again.');
      if (submitButton) {
        submitButton.textContent = submitButton.textContent.replace('Sending...', 'Subscribe');
        submitButton.disabled = false;
      }
    }
  };

  emailInput.addEventListener('input', handleInput);
  emailInput.addEventListener('blur', handleInput);
  subscribeForm.addEventListener('submit', handleSubmit);
};

/**
 * Обработка формы заявки в модальном окне
 * @param {Function} openSuccessModal - Функция открытия модального окна успеха
 * @param {Function} closeModal - Функция закрытия модального окна
 */
const handleRequestForm = (openSuccessModal, closeModal) => {
  const modalForm = document.getElementById('requestForm');
  const nameInput = document.getElementById('modalName');
  const nameError = document.getElementById('modalNameError');
  const phoneInput = document.getElementById('modalPhone');
  const phoneError = document.getElementById('modalPhoneError');
  const emailInput = document.getElementById('modalEmail');
  const emailError = document.getElementById('modalEmailError');
  const privacyCheckbox = document.getElementById('modalPrivacy');
  const privacyError = document.getElementById('modalPrivacyError');

  if (!modalForm) {
    return;
  }

  // Создаем debounced обработчики для полей формы
  const handleNameInputDebounced = debounce(() => {
    if (!nameInput || !nameError) {
      return;
    }
    try {
      const validation = validateName(nameInput.value);
      if (validation.valid) {
        hideError(nameInput, nameError);
      } else {
        showError(nameInput, nameError, validation.message);
      }
    } catch (error) {
      // Обработка ошибок без console.error для production
    }
  }, 300);

  const handlePhoneInputDebounced = debounce((formatted) => {
    if (!phoneInput || !phoneError) {
      return;
    }
    try {
      const validation = validatePhone(formatted);
      if (validation.valid) {
        hideError(phoneInput, phoneError);
      } else {
        showError(phoneInput, phoneError, validation.message);
      }
    } catch (error) {
      // Обработка ошибок без console.error для production
    }
  }, 300);

  const handleEmailInputDebounced = debounce(() => {
    if (!emailInput || !emailError) {
      return;
    }
    try {
      const validation = validateEmail(emailInput.value);
      if (validation.valid) {
        hideError(emailInput, emailError);
      } else {
        showError(emailInput, emailError, validation.message);
      }
    } catch (error) {
      // Обработка ошибок без console.error для production
    }
  }, 300);

  // Инициализация полей
  if (nameInput) {
    nameInput.value = '';
    nameInput.addEventListener('input', handleNameInputDebounced);
    
    nameInput.addEventListener('blur', () => {
      try {
        const validation = validateName(nameInput.value);
        if (!validation.valid) {
          showError(nameInput, nameError, validation.message);
        }
      } catch (error) {
        // Обработка ошибок без console.error для production
      }
    });
  }

  if (phoneInput) {
    phoneInput.value = '+7';
    phoneInput.addEventListener('input', (e) => {
      try {
        const formatted = formatPhone(e.target.value);
        e.target.value = formatted;
        handlePhoneInputDebounced(formatted);
      } catch (error) {
        // Обработка ошибок без console.error для production
      }
    });
    
    phoneInput.addEventListener('blur', () => {
      try {
        const validation = validatePhone(phoneInput.value);
        if (!validation.valid) {
          showError(phoneInput, phoneError, validation.message);
        }
      } catch (error) {
        // Обработка ошибок без console.error для production
      }
    });
    
    phoneInput.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && phoneInput.value === '+7') {
        e.preventDefault();
      }
    });
  }

  if (emailInput) {
    emailInput.value = '';
    emailInput.addEventListener('input', handleEmailInputDebounced);
    
    emailInput.addEventListener('blur', () => {
      try {
        const validation = validateEmail(emailInput.value);
        if (!validation.valid) {
          showError(emailInput, emailError, validation.message);
        }
      } catch (error) {
        // Обработка ошибок без console.error для production
      }
    });
  }

  // Обработка отправки формы
  modalForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = modalForm.querySelector('.modal__submit');
    
    // Защита от double submit
    if (submitButton && submitButton.disabled) {
      return;
    }

    try {
      let isValid = true;
      
      if (nameInput && nameError) {
        const nameValidation = validateName(nameInput.value);
        if (!nameValidation.valid) {
          showError(nameInput, nameError, nameValidation.message);
          isValid = false;
        } else {
          hideError(nameInput, nameError);
        }
      }
      
      if (phoneInput && phoneError) {
        const phoneValidation = validatePhone(phoneInput.value);
        if (!phoneValidation.valid) {
          showError(phoneInput, phoneError, phoneValidation.message);
          isValid = false;
        } else {
          hideError(phoneInput, phoneError);
        }
      }
      
      if (emailInput && emailError) {
        const emailValidation = validateEmail(emailInput.value);
        if (!emailValidation.valid) {
          showError(emailInput, emailError, emailValidation.message);
          isValid = false;
        } else {
          hideError(emailInput, emailError);
        }
      }
      
      if (privacyCheckbox && privacyError) {
        if (!privacyCheckbox.checked) {
          privacyError.textContent = 'You must agree to the Privacy Policy';
          privacyError.classList.add('modal__error--visible');
          privacyCheckbox.setAttribute('aria-invalid', 'true');
          isValid = false;
        } else {
          privacyError.textContent = '';
          privacyError.classList.remove('modal__error--visible');
          privacyCheckbox.setAttribute('aria-invalid', 'false');
        }
      }
      
      if (!isValid) {
        const firstErrorInput = modalForm.querySelector('.modal__input--error, [aria-invalid="true"]');
        if (firstErrorInput) {
          firstErrorInput.focus();
        }
        return;
      }
      
      const submitButton = modalForm.querySelector('.modal__submit');
      if (!submitButton) {
        return;
      }

      const originalButtonText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      modalForm.reset();
      if (phoneInput) {
        phoneInput.value = '+7';
      }
      closeModal(true);
      
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
      
      setTimeout(() => {
        openSuccessModal();
      }, 300);
    } catch (error) {
      alert('Failed to send request. Please try again.');
      const submitButton = modalForm.querySelector('.modal__submit');
      if (submitButton) {
        submitButton.textContent = submitButton.textContent.replace('Sending...', 'Send Request');
        submitButton.disabled = false;
      }
    }
  });
};

export {
  handleSubscribeForm,
  handleRequestForm,
  showError,
  hideError
};
