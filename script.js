const handleHeaderScroll = () => {
  const header = document.querySelector('.header');
  let lastScrollTop = 0;
  let ticking = false;

  const updateHeader = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      header.classList.add('header--hidden');
    } else {
      header.classList.remove('header--hidden');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    ticking = false;
  };

  const requestTick = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  };

  window.addEventListener('scroll', requestTick, { passive: true });
};

const initReviewsSlider = () => {
  const reviewsSlider = document.querySelector('.reviews__slider');
  
  if (!reviewsSlider) {
    return;
  }
  
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
};

const handleSubscribeForm = () => {
  const subscribeForm = document.getElementById('subscribeForm');
  const emailInput = document.getElementById('subscribeEmail');
  const errorMessage = document.getElementById('subscribeError');
  
  if (!subscribeForm || !emailInput || !errorMessage) {
    return;
  }
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const showError = (message) => {
    errorMessage.textContent = message;
    errorMessage.classList.add('subscribe__error--visible');
    emailInput.classList.add('subscribe__input--error');
    emailInput.setAttribute('aria-invalid', 'true');
  };
  
  const hideError = () => {
    errorMessage.textContent = '';
    errorMessage.classList.remove('subscribe__error--visible');
    emailInput.classList.remove('subscribe__input--error');
    emailInput.setAttribute('aria-invalid', 'false');
  };
  
  const handleInput = () => {
    if (emailInput.value.trim() && !validateEmail(emailInput.value.trim())) {
      showError('Please enter a valid email address');
    } else {
      hideError();
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    if (!email) {
      showError('Email address is required');
      emailInput.focus();
      return;
    }
    
    if (!validateEmail(email)) {
      showError('Please enter a valid email address');
      emailInput.focus();
      return;
    }
    
    hideError();
    
    const submitButton = subscribeForm.querySelector('.subscribe__button');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      alert('email sent');
      
      emailInput.value = '';
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
    } catch (error) {
      showError('Failed to send email. Please try again.');
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
    }
  };
  
  emailInput.addEventListener('input', handleInput);
  emailInput.addEventListener('blur', handleInput);
  subscribeForm.addEventListener('submit', handleSubmit);
};

const handleModal = () => {
  const modal = document.getElementById('requestModal');
  const successModal = document.getElementById('successModal');
  const modalOverlay = modal.querySelector('.modal__overlay');
  const modalClose = modal.querySelector('.modal__close');
  const modalForm = document.getElementById('requestForm');
  const openModalButtons = document.querySelectorAll('[data-modal-open]');
  
  if (!modal) {
    return;
  }
  
  const openModal = () => {
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modal.focus();
  };
  
  const closeModal = (keepOverflow = false) => {
    modal.setAttribute('aria-hidden', 'true');
    if (!keepOverflow) {
      document.body.style.overflow = '';
      const firstOpenButton = openModalButtons[0];
      if (firstOpenButton) {
        firstOpenButton.focus();
      }
    }
  };
  
  const openSuccessModal = () => {
    if (successModal) {
      successModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      const successModalClose = successModal.querySelector('.modal__close');
      if (successModalClose) {
        setTimeout(() => {
          successModalClose.focus();
        }, 100);
      }
    } else {
      console.error('Success modal not found');
    }
  };
  
  const closeSuccessModal = () => {
    if (successModal) {
      successModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };
  
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
  
  openModalButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });
  
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }
  
  if (successModal) {
    const successModalOverlay = successModal.querySelector('.modal__overlay');
    const successModalClose = successModal.querySelector('.modal__close');
    const successModalCloseButtons = successModal.querySelectorAll('[data-success-modal-close]');
    
    successModalCloseButtons.forEach(button => {
      button.addEventListener('click', closeSuccessModal);
    });
    
    if (successModalOverlay) {
      successModalOverlay.addEventListener('click', (e) => {
        if (e.target === successModalOverlay) {
          closeSuccessModal();
        }
      });
    }
  }
  
  document.addEventListener('keydown', handleEscape);
  
  const validateName = (name) => {
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
  
  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length === 0) {
      return '+7';
    }
    if (numbers[0] === '7' || numbers[0] === '8') {
      const phone = numbers.substring(1);
      if (phone.length === 0) {
        return '+7';
      }
      if (phone.length <= 3) {
        return `+7 (${phone}`;
      }
      if (phone.length <= 6) {
        return `+7 (${phone.substring(0, 3)}) ${phone.substring(3)}`;
      }
      if (phone.length <= 8) {
        return `+7 (${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6)}`;
      }
      return `+7 (${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6, 8)}-${phone.substring(8, 10)}`;
    }
    const phone = numbers;
    if (phone.length <= 3) {
      return `+7 (${phone}`;
    }
    if (phone.length <= 6) {
      return `+7 (${phone.substring(0, 3)}) ${phone.substring(3)}`;
    }
    if (phone.length <= 8) {
      return `+7 (${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6)}`;
    }
    return `+7 (${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6, 8)}-${phone.substring(8, 10)}`;
  };
  
  const validatePhone = (phone) => {
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
  
  const validateEmail = (email) => {
    if (!email.trim()) {
      return { valid: true };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return { valid: false, message: 'Please enter a valid email address' };
    }
    return { valid: true };
  };
  
  const showError = (input, errorElement, message) => {
    input.classList.add('modal__input--error');
    errorElement.textContent = message;
    errorElement.classList.add('modal__error--visible');
    input.setAttribute('aria-invalid', 'true');
  };
  
  const hideError = (input, errorElement) => {
    input.classList.remove('modal__input--error');
    errorElement.textContent = '';
    errorElement.classList.remove('modal__error--visible');
    input.setAttribute('aria-invalid', 'false');
  };
  
  const nameInput = document.getElementById('modalName');
  const nameError = document.getElementById('modalNameError');
  const phoneInput = document.getElementById('modalPhone');
  const phoneError = document.getElementById('modalPhoneError');
  const emailInput = document.getElementById('modalEmail');
  const emailError = document.getElementById('modalEmailError');
  const privacyCheckbox = document.getElementById('modalPrivacy');
  const privacyError = document.getElementById('modalPrivacyError');
  
  if (nameInput) {
    nameInput.value = '';
    nameInput.addEventListener('input', () => {
      const validation = validateName(nameInput.value);
      if (validation.valid) {
        hideError(nameInput, nameError);
      } else {
        showError(nameInput, nameError, validation.message);
      }
    });
    
    nameInput.addEventListener('blur', () => {
      const validation = validateName(nameInput.value);
      if (!validation.valid) {
        showError(nameInput, nameError, validation.message);
      }
    });
  }
  
  if (phoneInput) {
    phoneInput.value = '+7';
    phoneInput.addEventListener('input', (e) => {
      const formatted = formatPhone(e.target.value);
      e.target.value = formatted;
      
      const validation = validatePhone(formatted);
      if (validation.valid) {
        hideError(phoneInput, phoneError);
      } else {
        showError(phoneInput, phoneError, validation.message);
      }
    });
    
    phoneInput.addEventListener('blur', () => {
      const validation = validatePhone(phoneInput.value);
      if (!validation.valid) {
        showError(phoneInput, phoneError, validation.message);
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
    emailInput.addEventListener('input', () => {
      const validation = validateEmail(emailInput.value);
      if (validation.valid) {
        hideError(emailInput, emailError);
      } else {
        showError(emailInput, emailError, validation.message);
      }
    });
    
    emailInput.addEventListener('blur', () => {
      const validation = validateEmail(emailInput.value);
      if (!validation.valid) {
        showError(emailInput, emailError, validation.message);
      }
    });
  }
  
  if (modalForm) {
    modalForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      let isValid = true;
      
      const nameValidation = validateName(nameInput.value);
      if (!nameValidation.valid) {
        showError(nameInput, nameError, nameValidation.message);
        isValid = false;
      } else {
        hideError(nameInput, nameError);
      }
      
      const phoneValidation = validatePhone(phoneInput.value);
      if (!phoneValidation.valid) {
        showError(phoneInput, phoneError, phoneValidation.message);
        isValid = false;
      } else {
        hideError(phoneInput, phoneError);
      }
      
      const emailValidation = validateEmail(emailInput.value);
      if (!emailValidation.valid) {
        showError(emailInput, emailError, emailValidation.message);
        isValid = false;
      } else {
        hideError(emailInput, emailError);
      }
      
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
      
      if (!isValid) {
        const firstErrorInput = modalForm.querySelector('.modal__input--error, [aria-invalid="true"]');
        if (firstErrorInput) {
          firstErrorInput.focus();
        }
        return;
      }
      
      const submitButton = modalForm.querySelector('.modal__submit');
      const originalButtonText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        modalForm.reset();
        phoneInput.value = '+7';
        closeModal(true);
        
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        
        setTimeout(() => {
          openSuccessModal();
        }, 300);
      } catch (error) {
        alert('Failed to send request. Please try again.');
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      }
    });
  }
  
  return { openSuccessModal, closeModal };
};

document.addEventListener('DOMContentLoaded', () => {
  handleHeaderScroll();
  initReviewsSlider();
  handleSubscribeForm();
  handleModal();
});

