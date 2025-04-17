// Mobile Menu Toggle com melhor funcionalidade
const menuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuBtn.classList.toggle('active');

  // Previne rolagem quando o menu está aberto
  if (navLinks.classList.contains('active')) {
    body.style.overflow = 'hidden';
  } else {
    body.style.overflow = 'auto';
  }
});

// Fecha o menu ao clicar em um link ou fora dele
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuBtn.classList.remove('active');
    body.style.overflow = 'auto';
  });
});

// Fechar o menu ao clicar fora dele
document.addEventListener('click', (e) => {
  if (
    navLinks.classList.contains('active') &&
    !e.target.closest('.nav-links') &&
    !e.target.closest('.mobile-menu-btn')
  ) {
    navLinks.classList.remove('active');
    menuBtn.classList.remove('active');
    body.style.overflow = 'auto';
  }
});

// Smooth Scrolling para navegação com compensação de header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    // Ajusta a rolagem para compensar o header fixo
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = targetPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Header Scroll Effect melhorado
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// Sistema completo de validação de formulário
document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');

  // Cria mensagens de erro para cada campo
  const formGroups = contactForm.querySelectorAll('.form-group');
  formGroups.forEach(group => {
    const input = group.querySelector('input, textarea, select');
    if (input) {
      const errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      group.appendChild(errorMessage);
    }
  });

  // Adiciona botão de loading
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const buttonWrapper = document.createElement('div');
  buttonWrapper.className = 'form-button-wrapper';
  const loadingSpinner = document.createElement('div');
  loadingSpinner.className = 'loading-spinner';

  // Substitui o botão pelo wrapper com spinner
  submitButton.parentNode.insertBefore(buttonWrapper, submitButton);
  buttonWrapper.appendChild(submitButton);
  buttonWrapper.appendChild(loadingSpinner);

  // Validação em tempo real nos campos
  const inputs = contactForm.querySelectorAll('input, textarea, select');

  inputs.forEach(input => {
    // Validação ao perder o foco
    input.addEventListener('blur', () => {
      validateField(input);
    });

    // Validação enquanto digita (após primeira validação)
    input.addEventListener('input', () => {
      if (input.classList.contains('error') || input.classList.contains('valid')) {
        validateField(input);
      }
    });

    // Destaca o campo ao focar
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focused');
    });
  });

  // Função de validação de campos individuais
  function validateField(field) {
    const errorElement = field.parentElement.querySelector('.error-message');
    let isValid = true;
    let errorMessage = '';

    // Remove classes anteriores
    field.classList.remove('error', 'valid');

    // Validação de campo vazio
    if (field.required && !field.value.trim()) {
      isValid = false;
      errorMessage = 'Este campo é obrigatório';
    }
    // Validações específicas por tipo
    else if (field.value.trim()) {
      // Validação de email
      if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
          isValid = false;
          errorMessage = 'Digite um email válido';
        }
      }

      // Validação de telefone (aceita formatos brasileiros)
      if (field.id === 'phone') {
        const phoneRegex = /^(\(\d{2}\)|\d{2})[- ]?[9]?\d{4}[- ]?\d{4}$/;
        if (!phoneRegex.test(field.value.replace(/\s+/g, ''))) {
          isValid = false;
          errorMessage = 'Digite um telefone válido';
        }
      }

      // Validação de tamanho mínimo para mensagem
      if (field.id === 'message' && field.value.length < 10) {
        isValid = false;
        errorMessage = 'A mensagem deve ter pelo menos 10 caracteres';
      }
    }

    // Aplica resultado da validação
    if (!isValid) {
      field.classList.add('error');
      errorElement.textContent = errorMessage;
      errorElement.classList.add('visible');
    } else {
      field.classList.add('valid');
      errorElement.classList.remove('visible');
    }

    return isValid;
  }

  // Validação no envio do formulário
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let formValid = true;

    // Valida todos os campos
    inputs.forEach(input => {
      const fieldValid = validateField(input);
      if (!fieldValid) {
        formValid = false;
      }
    });

    // Se formulário válido, processa o envio
    if (formValid) {
      // Mostra loading
      buttonWrapper.classList.add('loading');

      // Formata mensagem para WhatsApp
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const service = document.getElementById('service').value;
      const message = document.getElementById('message').value;

      let whatsappMessage = `*Olá! Tenho interesse em seus serviços de nutrição!*%0A%0A`;
      whatsappMessage += `*Nome:* ${name}%0A`;
      whatsappMessage += `*Email:* ${email}%0A`;
      whatsappMessage += `*Telefone:* ${phone}%0A`;
      whatsappMessage += `*Serviço de Interesse:* ${service}%0A`;
      whatsappMessage += `*Mensagem:* ${message}%0A`;

      // Simula um pequeno delay para mostrar o loading (pode remover em produção)
      setTimeout(() => {
        // Cria URL do WhatsApp
        const whatsappURL = `https://wa.me/5548991056014?text=${whatsappMessage}`;

        // Abre WhatsApp em nova aba
        window.open(whatsappURL, '_blank');

        // Remove loading
        buttonWrapper.classList.remove('loading');

        // Reseta formulário
        contactForm.reset();
        inputs.forEach(input => {
          input.classList.remove('valid', 'error');
          const errorElement = input.parentElement.querySelector('.error-message');
          if (errorElement) {
            errorElement.classList.remove('visible');
          }
        });

        // Feedback de sucesso (opcional)
        alert('Mensagem enviada com sucesso! Você será redirecionado para o WhatsApp.');
      }, 800);
    } else {
      // Scroll até o primeiro campo com erro
      const firstError = contactForm.querySelector('.error');
      if (firstError) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = firstError.getBoundingClientRect().top;
        const offsetPosition = targetPosition + window.pageYOffset - headerHeight - 20;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Animação de elementos quando scrollar para eles
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
    rect.bottom >= 0
  );
}

function handleScrollAnimation() {
  const elements = document.querySelectorAll('.service-box, .testimonial-box, .about-img, .about-text');

  elements.forEach(element => {
    if (isElementInViewport(element)) {
      element.classList.add('visible');
    }
  });
}

// Tratamento de scroll e resize para animações
window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('resize', handleScrollAnimation);
window.addEventListener('load', handleScrollAnimation);

// Inicializa animações quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function () {
  handleScrollAnimation();

  // Prevenção adicional de scroll horizontal
  function checkOverflow() {
    const bodyWidth = document.body.offsetWidth;
    const windowWidth = window.innerWidth;

    if (bodyWidth > windowWidth) {
      console.log('Overflow detected:', bodyWidth - windowWidth + 'px');
      // Aqui você poderia adicionar código para diagnosticar o elemento que causa overflow
    }
  }

  // Verifica overflow após o carregamento
  setTimeout(checkOverflow, 1000);
  window.addEventListener('resize', checkOverflow);
});