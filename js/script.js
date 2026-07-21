const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav a');

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');

    if (link.getAttribute('href') === '#inicio') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      history.replaceState(null, '', '#inicio');
    }
  });
});

const sections = [...document.querySelectorAll('main section[id], header[id]')];
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY + 150;
  let current = 'inicio';
  sections.forEach(section => {
    if (section.offsetTop <= scrollPosition) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
document.getElementById('currentYear').textContent = new Date().getFullYear();

const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const nome = data.get('nome');
  const telefone = data.get('telefone');
  const equipamento = data.get('equipamento');
  const mensagem = data.get('mensagem');

  const destino = '5585992242742';
  const texto = encodeURIComponent(`Olá, meu nome é ${nome}.\nTelefone: ${telefone}\nEquipamento: ${equipamento}\nProblema: ${mensagem}`);

  status.textContent = 'Abrindo o WhatsApp...';
  window.open(`https://wa.me/${destino}?text=${texto}`, '_blank');
});
