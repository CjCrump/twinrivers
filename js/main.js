// ── Theme toggle ──
// No saved choice means the system setting wins. A toggle choice lasts for
// this visit (sessionStorage), so the next visit follows the system again.
document.querySelectorAll('.theme-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const root = document.documentElement;
    const cur = root.dataset.theme || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    const next = cur === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    try { sessionStorage.setItem('theme', next); } catch (e) {}
  });
});

// ── Nav ──
function toggleMobile() {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('mobileMenu').classList.toggle('open');
}
function closeMobile() {
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobileMenu').classList.remove('open');
}
document.getElementById('hamburger').addEventListener('click', toggleMobile);
document.querySelectorAll('#mobileMenu a').forEach(a => a.addEventListener('click', closeMobile));
document.addEventListener('click', e => {
  const mm = document.getElementById('mobileMenu');
  if (mm.classList.contains('open') && !mm.contains(e.target) && !e.target.closest('#hamburger'))
    closeMobile();
});
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50), { passive: true });

// Old one-page gallery links (#patios, #walls...) now live on their own pages
const oldHash = { '#patios': '/stamped-concrete-patios/', '#walls': '/retaining-walls/', '#firepits': '/fire-pits/', '#water': '/water-features/' };
if (document.body.dataset.page === 'home' && oldHash[location.hash]) location.replace(oldHash[location.hash]);

// ── Lightbox ──
const lb = document.getElementById('lightbox');
if (lb) {
  const lbImg = document.getElementById('lbImg');
  const closeLb = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };
  document.querySelectorAll('.gallery-thumb').forEach(el => el.addEventListener('click', () => {
    const img = el.querySelector('img');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }));
  lb.querySelector('.lb-close').addEventListener('click', closeLb);
  lb.addEventListener('click', e => { if (e.target === e.currentTarget) closeLb(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });
}

// ── Scroll reveal ──
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

// ── Quote form (home page only) ──
const formMsg = document.getElementById('formMsg');
if (formMsg) {
  let captchaAnswer = 0;
  let lastSubmit = 0;
  const FORM_ENDPOINT = 'https://formspree.io/f/mnjoeqkd';
  const CALL_LINK = '<a href="tel:6189548268">(618) 954-8268</a>';

  const newCaptcha = () => {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    captchaAnswer = a + b;
    document.getElementById('cA').textContent = a;
    document.getElementById('cB').textContent = b;
    document.getElementById('captchaAns').value = '';
  };
  newCaptcha();

  const fail = msg => { formMsg.textContent = msg; formMsg.className = 'form-msg error'; };

  document.querySelector('.submit-btn').addEventListener('click', async () => {
    formMsg.className = 'form-msg';
    if (document.getElementById('hp_website').value !== '') return;
    if (Date.now() - lastSubmit < 30000) return fail('Please wait a moment before submitting again.');
    const fname = document.getElementById('fname').value.trim();
    const lname = document.getElementById('lname').value.trim();
    const phone = document.getElementById('phone').value.trim();
    if (!fname || !lname) return fail('Please enter your first and last name.');
    if (!phone) return fail('Please enter a phone number so we can reach you.');
    if (phone.replace(/\D/g, '').length < 10) return fail('Please enter a valid 10-digit phone number.');
    const email = document.getElementById('email').value.trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail("That email address doesn't look quite right.");
    const ans = parseInt(document.getElementById('captchaAns').value, 10);
    if (isNaN(ans) || ans !== captchaAnswer) { newCaptcha(); return fail('Incorrect answer to the math question. Please try again.'); }

    const name = fname + ' ' + lname;
    const service = document.getElementById('service').value || 'Not provided';
    const message = document.getElementById('message').value.trim() || 'Not provided';
    const payload = { name, phone, service, message, _subject: 'New quote request: ' + name };
    if (email) { payload.email = email; payload._replyto = email; }

    const btn = document.querySelector('.submit-btn');
    const btnLabel = btn.innerHTML;
    btn.disabled = true;
    btn.textContent = 'Sending...';
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Formspree ' + res.status);
      lastSubmit = Date.now();
      newCaptcha();
      formMsg.innerHTML = '&#10003;&nbsp; Message received! Caleb will be in touch soon. You can also call or text directly: ' + CALL_LINK;
      formMsg.className = 'form-msg success';
      ['fname', 'lname', 'phone', 'email', 'message'].forEach(id => document.getElementById(id).value = '');
      document.getElementById('service').selectedIndex = 0;
    } catch (err) {
      newCaptcha();
      formMsg.innerHTML = 'Something went wrong sending your request. Please try again, or call or text Caleb at ' + CALL_LINK + '.';
      formMsg.className = 'form-msg error';
    } finally {
      btn.disabled = false;
      btn.innerHTML = btnLabel;
    }
  });

  // Service pages link here with ?service=... to preselect the dropdown
  const pre = new URLSearchParams(location.search).get('service');
  if (pre) {
    const sel = document.getElementById('service');
    const opt = [...sel.options].find(o => o.value === pre);
    if (opt) sel.value = pre;
  }
}
