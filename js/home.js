// ===== HOME PAGE JS =====
// Particles
(function(){
  const wrap = document.getElementById('particles');
  if(!wrap) return;
  for(let i=0;i<40;i++){
    const s = document.createElement('span');
    s.style.left = Math.random()*100 + '%';
    s.style.top = Math.random()*100 + '%';
    s.style.animationDelay = Math.random()*8 + 's';
    s.style.animationDuration = (5 + Math.random()*6) + 's';
    s.style.background = Math.random()>0.6 ? 'var(--accent)' : 'var(--primary)';
    wrap.appendChild(s);
  }
})();

// Counter
(function(){
  const counts = document.querySelectorAll('[data-count]');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.count;
      let cur = 0; const step = Math.max(1, target/60);
      const tick = ()=>{ cur+=step; if(cur>=target){el.textContent=target;} else {el.textContent=Math.floor(cur); requestAnimationFrame(tick);} };
      tick(); io.unobserve(el);
    });
  },{threshold:.5});
  counts.forEach(c=>io.observe(c));
})();

// Tabs
(function(){
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tab-panel');
  tabs.forEach(t=>t.addEventListener('click',()=>{
    tabs.forEach(x=>x.classList.remove('active'));
    panels.forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    document.querySelector(`.tab-panel[data-panel="${t.dataset.tab}"]`)?.classList.add('active');
  }));
})();


/*==================================================
        FLAGSHIP ROBOTS
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==================================
            COUNTER
    ==================================*/

    const robotCounters = document.querySelectorAll(".robot-stat [data-count]");

    if (robotCounters.length) {

        const observer = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const el = entry.target;
                const target = Number(el.dataset.count);

                let current = 0;
                const duration = 1800;
                const increment = target / (duration / 16);

                const update = () => {

                    current += increment;

                    if (current >= target) {

                        el.textContent = target;

                    } else {

                        el.textContent = Math.floor(current);

                        requestAnimationFrame(update);

                    }

                };

                update();

                observer.unobserve(el);

            });

        }, {
            threshold: 0.5
        });

        robotCounters.forEach(counter => observer.observe(counter));

    }


    /*==================================
            ROBOT IMAGE TILT
    ==================================*/

    const robotImage = document.querySelector(".flagship__image img");

    if (robotImage) {

        const wrapper = robotImage.parentElement;

        wrapper.addEventListener("mousemove", (e) => {

            const rect = wrapper.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateY = ((x / rect.width) - 0.5) * 18;
            const rotateX = ((rect.height / 2 - y) / rect.height) * 18;

            robotImage.style.transition = "transform .15s linear";

            robotImage.style.transform =
                `perspective(1200px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-12px)
                 scale(1.03)`;

        });

        wrapper.addEventListener("mouseleave", () => {

            robotImage.style.transition = ".6s ease";

            robotImage.style.transform =
                "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";

        });

    }


    /*==================================
        FLOATING BADGES
    ==================================*/

    const badges = document.querySelectorAll(".robot-badge");

    badges.forEach((badge, index) => {

        badge.style.animationDelay = `${index * .35}s`;

        badge.addEventListener("mouseenter", () => {

            badge.style.transform = "translateY(-8px) scale(1.08)";
            badge.style.boxShadow = "0 0 25px rgba(0,229,255,.5)";

        });

        badge.addEventListener("mouseleave", () => {

            badge.style.transform = "";
            badge.style.boxShadow = "";

        });

    });


    /*==================================
        ROBOT CARD HOVER
    ==================================*/

    document.querySelectorAll(".robot-card").forEach(card => {

        card.addEventListener("mousemove", (e) => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateY = ((x / rect.width) - 0.5) * 10;
            const rotateX = ((rect.height / 2 - y) / rect.height) * 10;

            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-10px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });


    /*==================================
        PARALLAX GLOW
    ==================================*/

    const glow = document.querySelector(".robot-glow");

    if (glow) {

        window.addEventListener("mousemove", (e) => {

            const x = (e.clientX / window.innerWidth - 0.5) * 40;
            const y = (e.clientY / window.innerHeight - 0.5) * 40;

            glow.style.transform =
                `translate(${x}px, ${y}px)`;

        });

    }


    /*==================================
        STAGGER REVEAL
    ==================================*/

    const cards = document.querySelectorAll(".robot-card");

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            cards.forEach((card, index) => {

                setTimeout(() => {

                    card.style.opacity = "1";
                    card.style.transform = "translateY(0)";

                }, index * 180);

            });

            revealObserver.disconnect();

        });

    }, {
        threshold: 0.25
    });

    if (cards.length) {

        cards.forEach(card => {

            card.style.opacity = "0";
            card.style.transform = "translateY(40px)";
            card.style.transition = ".7s ease";

        });

        revealObserver.observe(cards[0]);

    }

});

/*==================================================
        TECHNOLOGY ECOSYSTEM
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const visual = document.querySelector(".ecosystem__visual");

    if (!visual) return;

    const core = document.querySelector(".eco-core");
    const rings = document.querySelectorAll(".eco-ring");
    const nodes = document.querySelectorAll(".eco-node");

    /*========================================
            PARALLAX
    ========================================*/

    visual.addEventListener("mousemove", (e) => {

        const rect = visual.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const moveX = (x - rect.width / 2) / 30;
        const moveY = (y - rect.height / 2) / 30;

        core.style.transform =
            `translate(${moveX}px,${moveY}px) scale(1.05)`;

        rings[0].style.transform =
            `translate(${moveX * .5}px,${moveY * .5}px) rotate(${moveX}deg)`;

        rings[1].style.transform =
            `translate(${moveX * .8}px,${moveY * .8}px) rotate(${-moveX}deg)`;

        nodes.forEach((node, index) => {

            const speed = (index % 3) + 1;

            node.style.transform =
                `translate(${moveX / speed}px,${moveY / speed}px)`;

        });

    });

    visual.addEventListener("mouseleave", () => {

        core.style.transform = "";

        rings.forEach(r => r.style.transform = "");

        nodes.forEach(n => n.style.transform = "");

    });


    /*========================================
            NODE HOVER
    ========================================*/

    nodes.forEach(node => {

        node.addEventListener("mouseenter", () => {

            node.style.boxShadow =
                "0 0 35px rgba(0,229,255,.5)";

            node.style.borderColor = "var(--primary)";

            core.style.boxShadow =
                "0 0 80px rgba(0,229,255,.8)";

        });

        node.addEventListener("mouseleave", () => {

            node.style.boxShadow = "";

            node.style.borderColor = "";

            core.style.boxShadow = "";

        });

    });


    /*========================================
            RANDOM FLOAT
    ========================================*/

    nodes.forEach((node, index) => {

        let angle = index * 45;

        setInterval(() => {

            angle += 2;

            const x = Math.sin(angle * Math.PI / 180) * 6;

            const y = Math.cos(angle * Math.PI / 180) * 6;

            node.style.marginLeft = x + "px";
            node.style.marginTop = y + "px";

        }, 60);

    });


    /*========================================
            PULSE EFFECT
    ========================================*/

    setInterval(() => {

        nodes.forEach((node, i) => {

            setTimeout(() => {

                node.animate([
                    {
                        transform: "scale(1)"
                    },
                    {
                        transform: "scale(1.08)"
                    },
                    {
                        transform: "scale(1)"
                    }

                ], {

                    duration: 700,
                    easing: "ease"

                });

            }, i * 180);

        });

    }, 4500);


    /*========================================
            DATA FLOW
    ========================================*/

    setInterval(() => {

        const particle = document.createElement("div");

        particle.className = "eco-particle";

        visual.appendChild(particle);

        const angle = Math.random() * 360;

        const radius = 230;

        const startX = visual.offsetWidth / 2;
        const startY = visual.offsetHeight / 2;

        const endX =
            startX + Math.cos(angle * Math.PI / 180) * radius;

        const endY =
            startY + Math.sin(angle * Math.PI / 180) * radius;

        particle.style.left = startX + "px";
        particle.style.top = startY + "px";

        particle.animate([

            {
                left: startX + "px",
                top: startY + "px",
                opacity: 1,
                transform: "scale(1)"
            },

            {
                left: endX + "px",
                top: endY + "px",
                opacity: 0,
                transform: "scale(.2)"
            }

        ], {

            duration: 1200,
            easing: "ease-out"

        });

        setTimeout(() => {

            particle.remove();

        }, 1300);

    }, 250);


    /*========================================
            CARD TILT
    ========================================*/

    document.querySelectorAll(".ecosystem-card").forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateY = ((x / rect.width) - .5) * 12;

            const rotateX = ((rect.height / 2 - y) / rect.height) * 12;

            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-10px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

});