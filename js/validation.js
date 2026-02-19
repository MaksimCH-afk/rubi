/**
 * Модуль валидации форм
 * Содержит функции для валидации имени, телефона, email и форматирования телефона
 */

/**
 * Валидация имени
 * @param {string} name - Имя для валидации
 * @returns {{valid: boolean, message?: string}} - Результат валидации
 */
const validateName = (name) => {
  if (!name || typeof name !== 'string') {
    return { valid: false, message: 'Name is required' };
  }

  const trimmedName = name.trim();
  if (!trimmedName) {
    return { valid: false, message: 'Name is required' };
  }
  
  const cyrillicPattern = /[а-яёА-ЯЁ]/;
  const latinPattern = /[a-zA-Z]/;
  const specialCharPattern = /[^а-яёА-ЯЁa-zA-Z\s-]/g;
  const specialChars = trimmedName.match(specialCharPattern);
  
  if (specialChars && specialChars.length > 1) {
    return { valid: false, message: 'Name can contain only one special character' };
  }
  
  if (!cyrillicPattern.test(trimmedName) && !latinPattern.test(trimmedName)) {
    return { valid: false, message: 'Name must contain Cyrillic or Latin letters' };
  }
  
  return { valid: true };
};

/**
 * Форматирование номера телефона
 * @param {string} value - Входное значение телефона
 * @returns {string} - Отформатированный телефон
 */
const formatPhone = (value) => {
  if (!value || typeof value !== 'string') {
    return '+7';
  }

  const numbers = value.replace(/\D/g, '');
  if (numbers.length === 0) {
    return '+7';
  }

  // Извлекаем основную часть номера (убираем код страны 7 или 8)
  const phone = (numbers[0] === '7' || numbers[0] === '8') 
    ? numbers.substring(1) 
    : numbers;

  if (phone.length === 0) {
    return '+7';
  }

  // Форматируем номер в зависимости от длины
  const formatPhoneNumber = (phoneDigits) => {
    if (phoneDigits.length <= 3) {
      return `+7 (${phoneDigits}`;
    }
    if (phoneDigits.length <= 6) {
      return `+7 (${phoneDigits.substring(0, 3)}) ${phoneDigits.substring(3)}`;
    }
    if (phoneDigits.length <= 8) {
      return `+7 (${phoneDigits.substring(0, 3)}) ${phoneDigits.substring(3, 6)}-${phoneDigits.substring(6)}`;
    }
    return `+7 (${phoneDigits.substring(0, 3)}) ${phoneDigits.substring(3, 6)}-${phoneDigits.substring(6, 8)}-${phoneDigits.substring(8, 10)}`;
  };

  return formatPhoneNumber(phone);
};

/**
 * Валидация номера телефона
 * @param {string} phone - Телефон для валидации
 * @returns {{valid: boolean, message?: string}} - Результат валидации
 */
const validatePhone = (phone) => {
  if (!phone || typeof phone !== 'string') {
    return { valid: false, message: 'Phone number is required' };
  }

  const numbers = phone.replace(/\D/g, '');
  if (numbers.length === 0 || (numbers[0] === '7' && numbers.length < 11) || (numbers[0] === '8' && numbers.length < 11)) {
    return { valid: false, message: 'Phone number is required' };
  }

  if (numbers[0] === '7' || numbers[0] === '8') {
    if (numbers.length !== 11) {
      return { valid: false, message: 'Please enter a valid phone number' };
    }
  } else {
    if (numbers.length !== 10) {
      return { valid: false, message: 'Please enter a valid phone number' };
    }
  }

  return { valid: true };
};

/**
 * Валидация email
 * @param {string} email - Email для валидации
 * @returns {{valid: boolean, message?: string}} - Результат валидации
 */
const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return { valid: true };
  }

  const trimmedEmail = email.trim();
  if (!trimmedEmail) {
    return { valid: true };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return { valid: false, message: 'Please enter a valid email address' };
  }

  return { valid: true };
};

export {
  validateName,
  validatePhone,
  validateEmail,
  formatPhone
};
