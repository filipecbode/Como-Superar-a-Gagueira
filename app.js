// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Get all CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    // Handle CTA button clicks
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            handlePurchase();
        });
    });
    
    // Handle purchase action
    function handlePurchase() {
        // Show loading state
        const originalTexts = [];
        ctaButtons.forEach((button, index) => {
            originalTexts[index] = button.textContent;
            button.textContent = 'PROCESSANDO...';
            button.disabled = true;
            button.style.opacity = '0.7';
        });
        
        // Simulate processing time
        setTimeout(() => {
            // Reset buttons
            ctaButtons.forEach((button, index) => {
                button.textContent = originalTexts[index];
                button.disabled = false;
                button.style.opacity = '1';
            });
            
            // Show purchase modal/alert
            showPurchaseModal();
        }, 2000);
    }
    
    // Show purchase modal
    function showPurchaseModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: var(--color-surface);
            padding: 40px;
            border-radius: var(--radius-lg);
            max-width: 500px;
            width: 90%;
            text-align: center;
            box-shadow: var(--shadow-lg);
            animation: slideUp 0.3s ease;
        `;
        
        modalContent.innerHTML = `
            <h3 style="color: var(--color-primary); margin-bottom: 20px; font-size: var(--font-size-2xl);">
                🎉 Parabéns pela sua decisão!
            </h3>
            <p style="margin-bottom: 30px; font-size: var(--font-size-lg); line-height: 1.6;">
                Você será redirecionado para completar sua compra do guia "Como Superar a Gagueira" por apenas <strong>R$ 97,00</strong>.
            </p>
            <div style="margin-bottom: 30px; padding: 20px; background: var(--color-bg-3); border-radius: var(--radius-base);">
                <p style="margin: 0; font-size: var(--font-size-md); color: var(--color-success);">
                    ✓ Acesso imediato após o pagamento<br>
                    ✓ Garantia de 30 dias<br>
                    ✓ Suporte completo incluído
                </p>
            </div>
            <button id="continueBtn" class="btn btn--primary btn--lg" style="margin-right: 10px;">
                CONTINUAR COMPRA
            </button>
            <button id="closeModal" class="btn btn--outline">
                FECHAR
            </button>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Add animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        // Handle modal buttons
        document.getElementById('continueBtn').addEventListener('click', () => {
            // Simulate redirect to payment
            alert('Redirecionando para pagamento... (Em uma implementação real, aqui seria integrado com um gateway de pagamento como PagSeguro, Mercado Pago, etc.)');
            document.body.removeChild(modal);
        });
        
        document.getElementById('closeModal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
    
    // Smooth scroll for any internal links
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
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to sections and observe them
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.classList.add('fade-in');
        section.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(section);
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.benefit-card, .testimonial-card, .stat-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add pulse animation to CTA buttons
    function addPulseAnimation() {
        ctaButtons.forEach(button => {
            if (!button.disabled) {
                button.style.animation = 'pulse 2s infinite';
            }
        });
    }
    
    // Add pulse keyframes
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(33, 128, 141, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(33, 128, 141, 0); }
            100% { box-shadow: 0 0 0 0 rgba(33, 128, 141, 0); }
        }
    `;
    document.head.appendChild(pulseStyle);
    
    // Start pulse animation after a delay
    setTimeout(addPulseAnimation, 3000);
    
    // Track scroll position for sticky CTA (optional enhancement)
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove classes based on scroll direction
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            document.body.classList.add('scrolling-down');
        } else {
            // Scrolling up
            document.body.classList.remove('scrolling-down');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add loading indicator for better UX
    function showLoadingIndicator() {
        const loader = document.createElement('div');
        loader.id = 'loading-indicator';
        loader.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--color-surface);
            padding: 20px;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
            z-index: 1001;
            display: none;
        `;
        
        loader.innerHTML = `
            <div style="text-align: center;">
                <div style="width: 40px; height: 40px; border: 3px solid var(--color-border); border-top: 3px solid var(--color-primary); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 10px;"></div>
                <p style="margin: 0; color: var(--color-text);">Processando...</p>
            </div>
        `;
        
        document.body.appendChild(loader);
        
        // Add spin animation
        const spinStyle = document.createElement('style');
        spinStyle.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(spinStyle);
    }
    
    showLoadingIndicator();
    
    // Console message for developers
    console.log('🚀 Como Superar a Gagueira - Landing Page carregada com sucesso!');
    console.log('📧 Para integração com gateway de pagamento, configure as APIs necessárias.');
});