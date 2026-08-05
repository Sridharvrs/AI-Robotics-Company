/* ============================================================
   NEXUS LAB — dashboard UI controller
   No page content lives here. All module markup is written
   directly inside engineer.html / researcher.html.
   This file only handles: module switching, mobile drawer,
   sticky-topbar title, clock and logout.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    const user = JSON.parse(sessionStorage.getItem("currentUser"));

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    /*==============================
            USER NAME
    ==============================*/

    document.querySelectorAll(".current-user").forEach(el => {

        el.textContent = user.name;

    });

    /*==============================
            GREETING
    ==============================*/

    const hour = new Date().getHours();

    let greeting = "Good Morning,";

    if (hour >= 12 && hour < 17) {

        greeting = "Good Afternoon,";

    } else if (hour >= 17) {

        greeting = "Good Evening,";

    }

    document.querySelectorAll(".researchGreeting").forEach(el => {

        el.textContent = greeting;

    });

});

const el = (sel, root = document) => root.querySelector(sel);

function initDashboard() {
  const shell = el('[data-role]');
  if (!shell) return;

  const roleKey = shell.dataset.role;
  const nav = el('#nav');
  const view = el('#view');
  const title = el('#topbar-title');
  const sidebar = el('#sidebar');
  const overlay = el('#overlay');
  const modules = Array.from(view.querySelectorAll('.module'));
  if (!modules.length) return;

  function closeDrawer() {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
  }

  function select(id) {
    const target = modules.find((m) => m.id === `mod-${id}`) || modules[0];
    modules.forEach((m) => {
      m.hidden = m !== target;
      m.classList.remove('fade-in');
    });
    void target.offsetWidth; // restart the entrance animation
    target.classList.add('fade-in');

    nav.querySelectorAll('.nav-item').forEach((b) =>
      b.classList.toggle('active', `mod-${b.dataset.id}` === target.id)
    );
    title.textContent = target.dataset.title || '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try { localStorage.setItem(`nexus:${roleKey}:module`, target.id.replace('mod-', '')); } catch (e) {}
    if (window.innerWidth <= 900) closeDrawer();
  }

  nav.addEventListener('click', (e) => {
    const btn = e.target.closest('.nav-item');
    if (btn) select(btn.dataset.id);
  });

  /* mobile drawer */
  el('#hamburger').addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show', sidebar.classList.contains('open'));
  });
  overlay.addEventListener('click', closeDrawer);
  window.addEventListener('keydown', (e) => e.key === 'Escape' && closeDrawer());
  window.addEventListener('resize', () => { if (window.innerWidth > 900) closeDrawer(); });

  /* logout */
  el('#logout').addEventListener('click', () => {
    if (confirm('Sign out of NEXUS LAB?')) {
      try { localStorage.removeItem(`nexus:${roleKey}:module`); } catch (e) {}
      window.location.href = 'index.html';
    }
  });

  /* live clock */
  const clock = el('#clock');
  const tick = () => (clock.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  tick();
  setInterval(tick, 1000);

  let saved = null;
  try { saved = localStorage.getItem(`nexus:${roleKey}:module`); } catch (e) {}
  select(saved || modules[0].id.replace('mod-', ''));
}

document.addEventListener('DOMContentLoaded', initDashboard);

/*==================================
        LOGOUT
==================================*/

function logout() {

    const confirmLogout = confirm(
        "Are you sure you want to log out?"
    );

    if (!confirmLogout) return;

    /* Clear session */

    sessionStorage.removeItem("currentUser");

    /* Optional: Clear all session data */

    // sessionStorage.clear();

    /* Prevent going back */

    window.location.replace("login.html");

}