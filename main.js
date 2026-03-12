// ========================================
// Navigation Scroll Effect
// ========================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ========================================
// Smooth Scroll for Navigation Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            if (this.classList.contains('nav-link')) {
                this.classList.add('active');
            }
        }
    });
});

// ========================================
// Mobile Menu Toggle
// ========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace (móvil)
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ========================================
// Intersection Observer for Animations
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// Observe feature items
document.querySelectorAll('.feature-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
    observer.observe(item);
});

// ========================================
// Contact Form Handling
// ========================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Enviando...</span>';
    submitBtn.disabled = true;

    try {
        // URL de tu Webhook de n8n
        const WEBHOOK_URL = 'https://n8n.srv1021411.hstgr.cloud/webhook/2d9e232d-c60f-4968-a10b-09f9bac46d98';

        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error('Error en el servidor');

        // Show success message
        submitBtn.innerHTML = '<span>✓ Enviado</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

        // Reset form
        contactForm.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 3000);

        console.log('Form data:', data);
        alert('¡Gracias por tu consulta! Te contactaremos pronto.');

    } catch (error) {
        console.error('Error:', error);
        submitBtn.innerHTML = '<span>Error - Intenta de nuevo</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 3000);
    }
});

// ========================================
// Active Section Highlighting
// ========================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ========================================
// Form Input Validation & Enhancement
// ========================================
const inputs = document.querySelectorAll('input, textarea');

inputs.forEach(input => {
    // Add floating label effect
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });

    // Real-time validation
    input.addEventListener('input', () => {
        if (input.validity.valid) {
            input.style.borderColor = 'var(--color-accent)';
        } else {
            input.style.borderColor = 'var(--color-gray-200)';
        }
    });
});

// ========================================
// Parallax Effect for Hero Orbs
// ========================================
window.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.gradient-orb');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;

        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ========================================
// Dashboard Preview Animation
// ========================================
const previewCards = document.querySelectorAll('.preview-card');

setInterval(() => {
    previewCards.forEach(card => {
        const trend = card.querySelector('.card-trend');
        if (trend) {
            // Animate the trend value
            const currentValue = parseFloat(trend.textContent);
            const newValue = (Math.random() * 5 + 5).toFixed(1);
            trend.textContent = `+${newValue}%`;

            // Add pulse animation
            trend.style.animation = 'none';
            setTimeout(() => {
                trend.style.animation = 'pulse 0.5s ease-out';
            }, 10);
        }
    });
}, 5000);

// Add pulse animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(style);

// ========================================
// Login Modal (Placeholder)
// ========================================
document.querySelectorAll('a[href="#login"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // TODO: Implement actual login modal or redirect to platform
        alert('La plataforma de clientes estará disponible próximamente.\n\nPor ahora, contacta con nosotros para acceder a tus reportes.');
    });
});

// ========================================
// Performance: Lazy Load Images
// ========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// Platforms Dropdown
// ========================================
function togglePlatforms() {
    const btn = document.getElementById('platformsBtn');
    const list = document.getElementById('platformsList');
    const isOpen = list.classList.contains('open');

    if (isOpen) {
        list.classList.remove('open');
        btn.classList.remove('open');
    } else {
        list.classList.add('open');
        btn.classList.add('open');
    }
}

// Cerrar dropdown al hacer click fuera
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('platformsDropdown');
    if (dropdown && !dropdown.contains(e.target)) {
        document.getElementById('platformsList')?.classList.remove('open');
        document.getElementById('platformsBtn')?.classList.remove('open');
    }
});

// ========================================
// Console Welcome Message
// ========================================
console.log('%c¡Bienvenido a HT Consultores! 🚀', 'font-size: 20px; font-weight: bold; color: #10b981;');
console.log('%c¿Interesado en nuestra plataforma? Contáctanos en contacto@htconsultores.cl', 'font-size: 14px; color: #64748b;');
