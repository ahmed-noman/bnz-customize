// BNZ Customize - Static Website JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initMobileMenu();
    initSmoothScrolling();
    initStatisticsCounter();
    initContactForm();
    initScrollAnimations();
    initHeaderScroll();
    
    console.log('BNZ Customize website loaded successfully!');
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            const isOpen = body.classList.contains('mobile-menu-open');
            
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
        
        // Close mobile menu when clicking on navigation links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuToggle.contains(event.target) && 
                !navMenu.contains(event.target) && 
                body.classList.contains('mobile-menu-open')) {
                closeMobileMenu();
            }
        });
    }
    
    function openMobileMenu() {
        body.classList.add('mobile-menu-open');
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.backgroundColor = 'white';
        navMenu.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        navMenu.style.padding = '1rem';
        navMenu.style.zIndex = '40';
    }
    
    function closeMobileMenu() {
        body.classList.remove('mobile-menu-open');
        if (window.innerWidth < 1024) {
            navMenu.style.display = 'none';
        }
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 1024) {
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'row';
            navMenu.style.position = 'static';
            navMenu.style.backgroundColor = 'transparent';
            navMenu.style.boxShadow = 'none';
            navMenu.style.padding = '0';
            body.classList.remove('mobile-menu-open');
        } else {
            if (!body.classList.contains('mobile-menu-open')) {
                navMenu.style.display = 'none';
            }
        }
    });
}

// Smooth Scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Statistics Counter Animation
function initStatisticsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for counter animation
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    stats.forEach(stat => {
        counterObserver.observe(stat);
    });
}

// Contact Form Functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const formDataObj = {};
            
            // Convert FormData to object
            for (let [key, value] of formData.entries()) {
                formDataObj[key] = value;
            }
            
            // Validate required fields
            const requiredFields = ['name', 'phone', 'service', 'location'];
            const errors = [];
            
            requiredFields.forEach(field => {
                if (!formDataObj[field] || formDataObj[field].trim() === '') {
                    errors.push(field);
                }
            });
            
            if (errors.length > 0) {
                alert('Please fill in all required fields: ' + errors.join(', '));
                return;
            }
            
            // Validate email format if provided
            if (formDataObj.email && !isValidEmail(formDataObj.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Validate phone format
            if (!isValidPhone(formDataObj.phone)) {
                alert('Please enter a valid phone number.');
                return;
            }
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;
            submitButton.classList.add('loading');
            
            // Simulate form submission (replace with actual submission logic)
            setTimeout(() => {
                // Show success message
                showSuccessMessage(formDataObj);
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
            }, 2000);
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        const phoneRegex = /^(\+971|00971|971)?[\s-]?[0-9]{1,2}[\s-]?[0-9]{3}[\s-]?[0-9]{4}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }
    
    function showSuccessMessage(formData) {
        // Create success modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 1rem;
            max-width: 500px;
            text-align: center;
            box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
        `;
        
        modalContent.innerHTML = `
            <div style="font-size: 4rem; margin-bottom: 1rem;">✅</div>
            <h3 style="color: #111827; margin-bottom: 1rem;">Booking Request Received!</h3>
            <p style="color: #4b5563; margin-bottom: 1.5rem;">
                Thank you, ${formData.name}! We've received your booking request for ${formData.service}. 
                Our team will contact you at ${formData.phone} within 30 minutes.
            </p>
            <div style="background: #eff6ff; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1.5rem;">
                <p style="color: #2563eb; font-weight: 600; margin: 0;">
                    📞 Expect a call from: +971 55 257 9847
                </p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: #2563eb; color: white; border: none; padding: 0.75rem 1.5rem; 
                           border-radius: 0.5rem; cursor: pointer; font-weight: 600;">
                Close
            </button>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Auto-close after 10 seconds
        setTimeout(() => {
            if (modal.parentElement) {
                modal.remove();
            }
        }, 10000);
    }
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .feature-item, .review-card, .about-content');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
                entry.target.style.opacity = '1';
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        scrollObserver.observe(element);
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'white';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Lazy Loading for Images (if needed)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Phone Number Formatting
function formatPhoneNumber(input) {
    const value = input.value.replace(/\D/g, '');
    let formattedValue = '';
    
    if (value.length > 0) {
        if (value.startsWith('971')) {
            formattedValue = '+971 ' + value.substring(3, 5) + ' ' + value.substring(5, 8) + ' ' + value.substring(8, 12);
        } else if (value.startsWith('0')) {
            formattedValue = '+971 ' + value.substring(1, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6, 10);
        } else {
            formattedValue = '+971 ' + value.substring(0, 2) + ' ' + value.substring(2, 5) + ' ' + value.substring(5, 9);
        }
    }
    
    input.value = formattedValue.trim();
}

// Add phone formatting to phone inputs
document.addEventListener('input', function(e) {
    if (e.target.type === 'tel') {
        formatPhoneNumber(e.target);
    }
});

// Service Worker Registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Google Analytics (if needed)
function initGoogleAnalytics() {
    // Replace 'GA_MEASUREMENT_ID' with your actual Google Analytics ID
    /*
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
    */
}

// WhatsApp Integration
function openWhatsApp(message = '') {
    const phoneNumber = '971585492739';
    const defaultMessage = 'Hi! I\'m interested in your car customization services.';
    const finalMessage = message || defaultMessage;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`;
    window.open(url, '_blank');
}

// Add WhatsApp click handlers
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('whatsapp') || e.target.closest('.whatsapp')) {
        e.preventDefault();
        openWhatsApp();
    }
});

// Add click tracking for CTA buttons
document.addEventListener('click', function(e) {
    const target = e.target;
    
    if (target.classList.contains('btn') || target.closest('.btn')) {
        const buttonText = target.textContent || target.closest('.btn').textContent;
        console.log('Button clicked:', buttonText.trim());
        
        // Track with Google Analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'button_click', {
                button_text: buttonText.trim(),
                page_title: document.title
            });
        }
    }
});

// Add scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #2563eb, #1d4ed8);
        z-index: 100;
        transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }, 10));
}

// Initialize scroll progress indicator
initScrollProgress();

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You can send error reports to your analytics service here
});

// Unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    // You can send error reports to your analytics service here
});

// Performance monitoring
window.addEventListener('load', function() {
    setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart + 'ms');
    }, 0);
});

// Add accessibility improvements
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals or menus
        const modals = document.querySelectorAll('[style*="position: fixed"]');
        modals.forEach(modal => {
            if (modal.style.zIndex >= 1000) {
                modal.remove();
            }
        });
        
        // Close mobile menu
        if (document.body.classList.contains('mobile-menu-open')) {
            document.body.classList.remove('mobile-menu-open');
            document.getElementById('nav-menu').style.display = 'none';
        }
    }
});

// Add focus management for keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function(e) {
    document.body.classList.remove('keyboard-nav');
});

// Add CSS for keyboard navigation
const keyboardNavCSS = `
    .keyboard-nav *:focus {
        outline: 2px solid #2563eb !important;
        outline-offset: 2px !important;
    }
`;

const style = document.createElement('style');
style.textContent = keyboardNavCSS;
document.head.appendChild(style);
