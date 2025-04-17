// Mobile Menu Toggle
const menuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuBtn.classList.toggle('active');
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    navLinks.classList.remove('active');

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// Form Submission to WhatsApp
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value;

  // Format message for WhatsApp
  let whatsappMessage = `*Olá! Tenho interesse em seus serviços de nutrição!*%0A%0A`;
  whatsappMessage += `*Nome:* ${name}%0A`;
  whatsappMessage += `*Email:* ${email}%0A`;
  whatsappMessage += `*Telefone:* ${phone}%0A`;
  whatsappMessage += `*Serviço de Interesse:* ${service}%0A`;
  whatsappMessage += `*Mensagem:* ${message}%0A`;

  // Create WhatsApp URL
  const whatsappURL = `https://wa.me/5548991056014?text=${whatsappMessage}`;

  // Open WhatsApp in new tab
  window.open(whatsappURL, '_blank');

  // Reset form
  contactForm.reset();
});