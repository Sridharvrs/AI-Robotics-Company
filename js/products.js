// ===== PRODUCTS PAGE JS: filter =====
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.prod-card').forEach(card => {
      const show = filter === 'all' || card.dataset.cat === filter;
      card.classList.toggle('hide', !show);
    });
  });
});
