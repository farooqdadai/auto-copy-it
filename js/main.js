// Enhanced Auto Copy It Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initSmoothScrolling();
    initHeaderEffects();
    initScrollAnimations();
    initMobileMenu();
    initVideoPlayer();
    initParallaxEffects();
    initButtonEffects();
    initLazyLoading();
    initAccessibility();
    initPerformanceOptimizations();

    console.log('🚀 Auto Copy It website loaded successfully!');
});

    // Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header scroll effects
function initHeaderEffects() {
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add shadow on scroll
        if (currentScrollY > 100) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        
        // Hide/show header on scroll (optional)
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                entry.target.classList.remove('scroll-animate');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .step, .stat-item, .feature-highlight, .privacy-feature').forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });

    // Staggered animation for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Mobile menu functionality
function initMobileMenu() {
        const header = document.querySelector('header');
        const nav = document.querySelector('.nav-links');
        
    // Create mobile menu button if it doesn't exist
    if (!document.querySelector('.mobile-menu-btn')) {
            const mobileBtn = document.createElement('button');
            mobileBtn.className = 'mobile-menu-btn';
        mobileBtn.setAttribute('aria-label', 'Toggle navigation menu');
        mobileBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            `;

            mobileBtn.addEventListener('click', () => {
                nav.classList.toggle('mobile-open');
            mobileBtn.classList.toggle('active');
            
            // Update aria-expanded
            const isExpanded = nav.classList.contains('mobile-open');
            mobileBtn.setAttribute('aria-expanded', isExpanded);
            });

            header.querySelector('.header-content').appendChild(mobileBtn);

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!header.contains(e.target) && nav.classList.contains('mobile-open')) {
                nav.classList.remove('mobile-open');
                mobileBtn.classList.remove('active');
                mobileBtn.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('mobile-open')) {
                nav.classList.remove('mobile-open');
                mobileBtn.classList.remove('active');
                mobileBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

    // Video player functionality
function initVideoPlayer() {
    const video = document.getElementById('demo-video');
    const playButton = document.getElementById('play-button');
    const videoOverlay = document.querySelector('.video-overlay');
    
    if (video && playButton && videoOverlay) {
        playButton.addEventListener('click', function() {
            video.play().then(() => {
            videoOverlay.classList.add('hidden');
                playButton.setAttribute('aria-label', 'Pause video');
            }).catch(error => {
                console.warn('Video play failed:', error);
            });
        });
        
        video.addEventListener('pause', function() {
            videoOverlay.classList.remove('hidden');
            playButton.setAttribute('aria-label', 'Play video');
        });
        
        video.addEventListener('ended', function() {
            videoOverlay.classList.remove('hidden');
            playButton.setAttribute('aria-label', 'Replay video');
        });
        
        // Add keyboard support for video
        video.addEventListener('keydown', function(e) {
            if (e.code === 'Space') {
                e.preventDefault();
                if (video.paused) {
                    video.play();
                    videoOverlay.classList.add('hidden');
                } else {
                    video.pause();
                    videoOverlay.classList.remove('hidden');
                }
            }
        });

        // Add loading state
        video.addEventListener('loadstart', () => {
            videoOverlay.style.opacity = '0.8';
        });

        video.addEventListener('canplay', () => {
            videoOverlay.style.opacity = '1';
        });
    }
}

// Parallax effects
function initParallaxEffects() {
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Enhanced button effects
function initButtonEffects() {
    document.querySelectorAll('.btn').forEach(btn => {
        // Add ripple effect
        btn.addEventListener('click', function(e) {
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
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        // Enhanced hover effects
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add ripple animation CSS
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

    // Lazy loading for images
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Add loading states for all images
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
            
            img.addEventListener('error', function() {
                this.style.display = 'none';
                console.warn('Image failed to load:', this.src);
            });
        });
}

// Accessibility improvements
function initAccessibility() {
    // Add focus management
    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // Add skip link
    if (!document.querySelector('.skip-link')) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-color);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    // Add main content landmark
    const mainContent = document.querySelector('.hero');
    if (mainContent) {
        mainContent.id = 'main-content';
        mainContent.setAttribute('role', 'main');
    }
}

// Performance optimizations
function initPerformanceOptimizations() {
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Handle scroll-based animations
        }, 16); // ~60fps
    });

    // Preload critical resources
    const preloadLinks = [
        { rel: 'preload', href: 'css/style.css', as: 'style' },
        { rel: 'preload', href: 'images/logo.png', as: 'image' }
    ];

    preloadLinks.forEach(link => {
        const linkElement = document.createElement('link');
        Object.assign(linkElement, link);
        document.head.appendChild(linkElement);
    });

    // Add service worker registration (if available)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}

// Add some fun interactive elements
function addInteractiveElements() {
    // Add particle effect to hero section
    const hero = document.querySelector('.hero');
    if (hero && !document.querySelector('.particles')) {
        const particles = document.createElement('div');
        particles.className = 'particles';
        particles.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
        `;
        
        // Create floating particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                animation: float ${3 + Math.random() * 4}s linear infinite;
                left: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 2}s;
            `;
            particles.appendChild(particle);
        }
        
        hero.appendChild(particles);
        
        // Add floating animation
        if (!document.querySelector('#particle-styles')) {
            const style = document.createElement('style');
            style.id = 'particle-styles';
            style.textContent = `
                @keyframes float {
                    0% {
                        transform: translateY(100vh) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100px) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize interactive elements after a delay
setTimeout(addInteractiveElements, 1000);

// Add analytics tracking (if needed)
function trackEvents() {
    // Track Chrome Web Store clicks
    document.querySelectorAll('a[href*="chrome.google.com"]').forEach(link => {
        link.addEventListener('click', function() {
            console.log('Chrome Web Store link clicked');
            // Add your analytics tracking here
        });
    });

    // Track feature card interactions
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('click', function() {
            const featureName = this.querySelector('h3').textContent;
            console.log('Feature card clicked:', featureName);
            // Add your analytics tracking here
        });
    });
}

// Initialize tracking
trackEvents(); 