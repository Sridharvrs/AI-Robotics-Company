// ===== SERVICES PAGE JS: FAQ accordion =====
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/*=========================================
        WHY CHOOSE Stackly
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==============================
            COUNTER
    ==============================*/

    const counters = document.querySelectorAll(".why-stat h3");

    const counterObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = parseInt(counter.dataset.count);

            let current = 0;
            const step = Math.max(1, Math.ceil(target / 70));

            function update() {

                current += step;

                if (current >= target) {

                    counter.textContent = target;

                } else {

                    counter.textContent = current;

                    requestAnimationFrame(update);

                }

            }

            update();

            counterObserver.unobserve(counter);

        });

    }, {
        threshold: 0.6
    });

    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

    /*==============================
        STAGGER ANIMATION
    ==============================*/

    const rows = document.querySelectorAll(".compare-list li");

    rows.forEach((row, index) => {

        row.style.opacity = "0";
        row.style.transform = "translateX(-20px)";
        row.style.transition = ".45s ease";

    });

    const rowObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            rows.forEach((row, index) => {

                setTimeout(() => {

                    row.style.opacity = "1";
                    row.style.transform = "translateX(0)";

                }, index * 80);

            });

            rowObserver.disconnect();

        });

    }, {
        threshold: 0.3
    });

    if (document.querySelector(".why-Stackly")) {

        rowObserver.observe(document.querySelector(".why-Stackly"));

    }

});