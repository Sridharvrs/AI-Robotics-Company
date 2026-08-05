// ===== CONTACT PAGE JS =====

// FAQ accordion
document.querySelectorAll('.cfaq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.cfaq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// Form validation + submit
function handleSubmit() {
  const fname = document.getElementById('fname').value.trim();
  const lname = document.getElementById('lname').value.trim();
  const email = document.getElementById('cemail').value.trim();
  const message = document.getElementById('message').value.trim();
  const consent = document.getElementById('consent').checked;
  const msg = document.getElementById('formMsg');
  const btn = document.getElementById('submitBtn');

  if (!fname || !lname || !email || !message) {
    msg.className = 'cform__msg err';
    msg.textContent = 'Please fill in all required fields.';
    return;
  }
  if (!consent) {
    msg.className = 'cform__msg err';
    msg.textContent = 'Please accept the privacy policy to continue.';
    return;
  }

  const topic = document.querySelector('input[name="topic"]:checked').value;
  btn.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    msg.className = 'cform__msg ok';
    msg.textContent = 'Message sent! We\'ll get back to you within one business day.';
    btn.textContent = 'Send Message →';
    btn.disabled = false;
    document.getElementById('contactForm').reset();
  }, 1200);
}

// Phone formatting
document.getElementById('cphone')?.addEventListener('input', function(e) {
  let v = e.target.value.replace(/\D/g, '');
  if (v.length > 0) {
    if (v.length <= 3) v = '(' + v;
    else if (v.length <= 6) v = '(' + v.slice(0,3) + ') ' + v.slice(3);
    else v = '(' + v.slice(0,3) + ') ' + v.slice(3,6) + '-' + v.slice(6,10);
  }
  e.target.value = v;
});
