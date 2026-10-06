document.getElementById('ano').textContent = new Date().getFullYear();

// tema
const html = document.documentElement;
const toggleBtn = document.getElementById('theme-toggle');
const tema = localStorage.getItem('tema') || 'dark';
html.setAttribute('data-theme', tema);
toggleBtn.textContent = tema === 'dark' ? '☀️' : '🌙';
toggleBtn.addEventListener('click', () => {
  const novo = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', novo);
  localStorage.setItem('tema', novo);
  toggleBtn.textContent = novo === 'dark' ? '☀️' : '🌙';
});

// filtro de categorias
const botoes = document.querySelectorAll('.filters button');
const cards = document.querySelectorAll('.card');
botoes.forEach(b => b.addEventListener('click', () => {
  botoes.forEach(x => x.classList.remove('on'));
  b.classList.add('on');
  cards.forEach(c => c.classList.toggle('hide', b.dataset.f !== 'all' && c.dataset.cat !== b.dataset.f));
}));

// zoom nas imagens
const lb = document.getElementById('lightbox');
const lbImg = lb.querySelector('img');
document.querySelectorAll('.card img').forEach(img => img.addEventListener('click', () => {
  lbImg.src = img.src; lbImg.alt = img.alt; lb.classList.add('open');
}));
const fechar = () => lb.classList.remove('open');
lb.addEventListener('click', fechar);
document.addEventListener('keydown', e => { if (e.key === 'Escape') fechar(); });

// animação de entrada ao rolar
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .15 });
document.querySelectorAll('.card, .about > *, .contact > *').forEach(el => { el.classList.add('reveal'); io.observe(el); });
