// ===== PORTFOLIO JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const backToTop = document.getElementById('backToTop');
    const contactForm = document.getElementById('contactForm');

    // ===== Navbar scroll effect =====
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (currentScroll > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        lastScroll = currentScroll;
    });

    // ===== Mobile menu toggle =====
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // ===== Smooth scroll for navigation links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Back to top button =====
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===== Intersection Observer for scroll animations =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');

                // Animate stats when in view
                if (entry.target.classList.contains('stat-number')) {
                    animateNumber(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.glass-card, .timeline-item, .project-card, .skill-category, .hobby-card, .achievement-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add in-view styles
    const style = document.createElement('style');
    style.textContent = '.in-view { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);

    // Stagger animations for grid items
    document.querySelectorAll('.projects-grid, .skills-grid, .hobby-cards').forEach(grid => {
        const children = grid.children;
        Array.from(children).forEach((child, index) => {
            child.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    // ===== Number animation =====
    function animateNumber(el) {
        const target = parseInt(el.getAttribute('data-count')) || parseInt(el.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current);
            }
        }, 16);
    }

    // ===== Contact form handling =====
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Simple validation
        if (!data.name || !data.email || !data.message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = 'Message Sent! ✓';
            submitBtn.style.background = 'var(--color-accent-mint)';
            contactForm.reset();

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 1500);
    });

    // ===== Notification helper =====
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 16px 32px;
            background: ${type === 'error' ? '#ef4444' : '#10b981'};
            color: white;
            border-radius: 8px;
            font-weight: 500;
            z-index: 10000;
            animation: slideUp 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // ===== Parallax effect for hero blobs =====
    document.addEventListener('mousemove', (e) => {
        const blobs = document.querySelectorAll('.hero-blob');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            blob.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // ===== Typed effect for tagline (optional enhancement) =====
    const tagline = document.querySelector('.hero-tagline');
    if (tagline) {
        const originalText = tagline.textContent;
        tagline.textContent = '';
        let charIndex = 0;

        setTimeout(() => {
            const typeInterval = setInterval(() => {
                if (charIndex < originalText.length) {
                    tagline.textContent += originalText[charIndex];
                    charIndex++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 30);
        }, 1500);
    }
});
