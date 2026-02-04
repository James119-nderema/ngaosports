// ===== DOM Elements =====
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navItems = document.querySelectorAll('.nav-item');
const navbar = document.querySelector('.navbar');

// ===== Mobile Menu Toggle =====
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// ===== Close mobile menu when clicking a link =====
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});

// ===== Mobile Dropdown Toggle =====
navItems.forEach(item => {
    const dropdown = item.querySelector('.dropdown');
    if (dropdown) {
        item.querySelector('.nav-link').addEventListener('click', (e) => {
            // Only handle dropdown toggle on mobile
            if (window.innerWidth <= 768) {
                e.preventDefault();
                item.classList.toggle('active');
            }
        });
    }
});

// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(0, 43, 91, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.backgroundColor = 'var(--dark-color)';
        navbar.style.boxShadow = 'var(--shadow)';
    }
});

// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('revealed');
        }
    });
};

// Initial check
window.addEventListener('load', revealOnScroll);
// Check on scroll
window.addEventListener('scroll', revealOnScroll);

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===== Contact Form Handler =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Using EmailJS or similar service for client-side email sending
            // For demonstration, we'll use a mailto link approach
            const emailBody = `From: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`;
            const mailtoLink = `mailto:james.o.nderema@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(emailBody)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            formStatus.textContent = 'Opening your email client to send the message...';
            formStatus.className = 'form-status success';
            
            // Reset form
            contactForm.reset();
            
        } catch (error) {
            formStatus.textContent = 'There was an error. Please try again or email us directly.';
            formStatus.className = 'form-status error';
        }
        
        // Restore button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}

// ===== Image Lazy Loading Simulation =====
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===== Counter Animation for Stats =====
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.dataset.target);
            const duration = 2000; // Animation duration in ms
            const steps = 60; // Number of animation steps
            const stepDuration = duration / steps;
            const increment = target / steps;
            let current = 0;
            let step = 0;
            
            const updateCounter = () => {
                if (step < steps) {
                    step++;
                    current = Math.min(Math.round(increment * step), target);
                    counter.textContent = current;
                    setTimeout(updateCounter, stepDuration);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// ===== Active Navigation Link Highlight =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link, .dropdown-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
    }
});

// ===== Parallax Effect for Hero Sections =====
const hero = document.querySelector('.hero, .activity-hero, .page-header');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    });
}

// ===== Form Input Animation =====
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// ===== Card Hover Effect with Mouse Position =====
const cards = document.querySelectorAll('.sport-card, .event-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// ===== Typing Effect for Hero Title =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Apply typing effect if hero title exists
const heroTitle = document.querySelector('.hero h1.typing-effect');
if (heroTitle) {
    const text = heroTitle.dataset.text || heroTitle.textContent;
    typeWriter(heroTitle, text);
}

// ===== Scroll to Top Button =====
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--accent-color);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'scale(1.1)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'scale(1)';
});

// ===== Initialize AOS-like functionality =====
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll-reveal class to elements that should animate
    const animateOnScroll = document.querySelectorAll('.sport-card, .event-card, .team-member, .stat-item, .gallery-item');
    
    animateOnScroll.forEach((element, index) => {
        element.classList.add('scroll-reveal');
        element.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Trigger initial check
    revealOnScroll();
});
