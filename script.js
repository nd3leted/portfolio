/* Executive Portfolio Javascript */

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const backToTop = document.getElementById('backToTop');

    /* Navbar scroll effect */
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (currentScroll > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    /* Mobile navigation toggle */
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    /* Smooth scroll for navigation links */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* Back to top button */
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* Number Count-Up Animation */
    function animateCountUp(el) {
        const targetNumber = parseInt(el.getAttribute('data-count'), 10);
        if (isNaN(targetNumber)) return;

        const isCommaFormatted = el.getAttribute('data-format') === 'comma';
        const duration = 1800; // ms
        const frameRate = 1000 / 60; // 60 FPS
        const totalFrames = Math.round(duration / frameRate);
        let frame = 0;

        const timer = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            /* Ease-out quad formula for smooth deceleration */
            const currentVal = Math.round(targetNumber * (1 - Math.pow(1 - progress, 2)));

            if (isCommaFormatted) {
                el.textContent = currentVal.toLocaleString('en-US');
            } else {
                el.textContent = currentVal;
            }

            if (frame >= totalFrames) {
                if (isCommaFormatted) {
                    el.textContent = targetNumber.toLocaleString('en-US');
                } else {
                    el.textContent = targetNumber;
                }
                clearInterval(timer);
            }
        }, frameRate);
    }

    /* Intersection Observer for reveal and stats count-up */
    const animatedElements = document.querySelectorAll('.metric-card, .deal-card, .convening-card, .timeline-item, .credential-card, .personal-wrapper');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                /* Trigger metric count-up if metric card */
                const metricNum = entry.target.querySelector('.metric-number');
                if (metricNum && !metricNum.classList.contains('counted')) {
                    metricNum.classList.add('counted');
                    animateCountUp(metricNum);
                }

                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        sectionObserver.observe(el);
    });
});
