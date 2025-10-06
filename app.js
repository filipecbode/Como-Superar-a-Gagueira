// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');

    // Handle CTA button clicks
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Redirecionar diretamente para o checkout da Kiwify
            window.open('https://pay.kiwify.com.br/1T7gagy', '_blank');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to header
    const header = document.querySelector('.hero-section');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.background = 'linear-gradient(135deg, rgba(16, 124, 215, 0.95) 0%, rgba(21, 131, 237, 0.95) 100%)';
            } else {
                header.style.background = 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)';
            }
        });
    }

    // Add hover effects to cards
    const cards = document.querySelectorAll('.benefit-card, .feature-card, .stat-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
        });
    });

    // Add loading animation to page elements
    const animateElements = document.querySelectorAll('.stat-card, .benefit-card, .feature-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initially hide elements for animation
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Number counting animation for stats
    const countNumbers = document.querySelectorAll('.stat-number');

    const startCounting = (entry) => {
        const target = entry.target;
        const text = target.textContent;
        const number = parseInt(text.replace(/[^0-9]/g, ''));

        if (number && !target.dataset.counted) {
            target.dataset.counted = 'true';
            let current = 0;
            const increment = number / 50;
            const suffix = text.replace(/[0-9]/g, '');

            const counter = setInterval(() => {
                current += increment;
                if (current >= number) {
                    target.textContent = text;
                    clearInterval(counter);
                } else {
                    target.textContent = Math.floor(current) + suffix;
                }
            }, 30);
        }
    };

    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting(entry);
            }
        });
    }, { threshold: 0.5 });

    countNumbers.forEach(num => {
        numberObserver.observe(num);
    });

    // Add floating animation to CTA buttons
    setInterval(() => {
        ctaButtons.forEach(button => {
            if (!button.matches(':hover') && !button.disabled) {
                button.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 200);
            }
        });
    }, 3000);

    // Add click ripple effect
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease;
                pointer-events: none;
            `;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }

    .cta-button {
        position: relative;
        overflow: hidden;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes slideUp {
        from { 
            opacity: 0;
            transform: translateY(20px);
        }
        to { 
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);