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

// Fecha o menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuBtn.classList.remove('active');
    body.style.overflow = 'auto';
  });
});

// Smooth Scrolling para navegação
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

// Form Submission com validação melhorada
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // Validação básica
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const service = document.getElementById('service');
  const message = document.getElementById('message');

  let isValid = true;

  // Verifica cada campo
  [name, email, phone, service, message].forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = '#ff3860';
      isValid = false;
    } else {
      field.style.borderColor = '#dbdbdb';
    }
  });

  // Verificação de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value) && email.value.trim()) {
    email.style.borderColor = '#ff3860';
    isValid = false;
  }

  if (isValid) {
    // Format message for WhatsApp
    let whatsappMessage = `*Olá! Tenho interesse em seus serviços de nutrição!*%0A%0A`;
    whatsappMessage += `*Nome:* ${name.value}%0A`;
    whatsappMessage += `*Email:* ${email.value}%0A`;
    whatsappMessage += `*Telefone:* ${phone.value}%0A`;
    whatsappMessage += `*Serviço de Interesse:* ${service.value}%0A`;
    whatsappMessage += `*Mensagem:* ${message.value}%0A`;

    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/5548991056014?text=${whatsappMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');

    // Reset form and borders
    contactForm.reset();
    [name, email, phone, service, message].forEach(field => {
      field.style.borderColor = '#dbdbdb';
    });
  }
});

// Adiciona feedback visual nos campos do formulário
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

formInputs.forEach(input => {
  input.addEventListener('focus', () => {
    input.parentElement.classList.add('focused');
  });

  input.addEventListener('blur', () => {
    input.parentElement.classList.remove('focused');

    // Adiciona classe se o campo tem valor
    if (input.value.trim() !== '') {
      input.classList.add('has-value');
    } else {
      input.classList.remove('has-value');
    }
  });
});

// Animação de elementos quando scrollar para eles
// Função para verificar se um elemento está visível na tela
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
    rect.bottom >= 0
  );
}

// Função para adicionar a classe 'visible' quando o elemento entra no viewport
function handleScrollAnimation() {
  const elements = document.querySelectorAll('.service-box, .testimonial-box, .about-img, .about-text');

  elements.forEach(element => {
    if (isElementInViewport(element)) {
      element.classList.add('visible');
    }
  });
}

// Adicionar ouvinte de eventos para scroll
window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('load', handleScrollAnimation);

// Ativar animações apenas quando as seções estiverem visíveis
document.addEventListener('DOMContentLoaded', function () {
  // Inicializa a verificação de visibilidade para todos os elementos
  handleScrollAnimation();
});