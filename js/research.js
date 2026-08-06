// ===== RESEARCH PAGE JS: bar animation on scroll =====
const bars = document.querySelectorAll('.fp__chart .bar');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      bars.forEach((b, i) => {
        b.style.animation = 'none';
        b.style.transform = 'scaleY(0)';
        requestAnimationFrame(() => {
          b.style.transition = `transform .8s ease ${i * 0.1}s`;
          b.style.transform = 'scaleY(1)';
        });
      });
      io.disconnect();
    }
  });
}, { threshold: 0.3 });
const chart = document.querySelector('.fp__visual');
if (chart) io.observe(chart);
