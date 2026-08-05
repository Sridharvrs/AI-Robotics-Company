// ===== ABOUT PAGE JS: counters =====
(function(){
  const counts = document.querySelectorAll('[data-count]');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.count;
      let cur=0; const step=Math.max(1,target/60);
      const tick=()=>{ cur+=step; if(cur>=target){el.textContent=target;} else {el.textContent=Math.floor(cur);requestAnimationFrame(tick);} };
      tick(); io.unobserve(el);
    });
  },{threshold:.5});
  counts.forEach(c=>io.observe(c));
})();
