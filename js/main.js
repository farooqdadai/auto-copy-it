// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
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
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                entry.target.classList.remove('loading');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .step, .screenshot').forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });

    // Add loading animation to page elements
    const animateElements = () => {
        const elements = document.querySelectorAll('.feature-card, .step, .screenshot');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('loaded');
                el.classList.remove('loading');
            }, index * 100);
        });
    };

    // Trigger animation on page load
    setTimeout(animateElements, 500);

    // Mobile menu toggle (if needed)
    const createMobileMenu = () => {
        const header = document.querySelector('header');
        const nav = document.querySelector('.nav-links');
        
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-btn')) {
            const mobileBtn = document.createElement('button');
            mobileBtn.className = 'mobile-menu-btn';
            mobileBtn.innerHTML = '☰';
            mobileBtn.style.cssText = `
                display: none;
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--primary-color);
                cursor: pointer;
                padding: 0.5rem;
            `;

            mobileBtn.addEventListener('click', () => {
                nav.classList.toggle('mobile-open');
            });

            header.querySelector('.header-content').appendChild(mobileBtn);

            // Show mobile button on small screens
            const mediaQuery = window.matchMedia('(max-width: 768px)');
            const handleMediaChange = (e) => {
                mobileBtn.style.display = e.matches ? 'block' : 'none';
                nav.classList.remove('mobile-open');
            };
            
            mediaQuery.addListener(handleMediaChange);
            handleMediaChange(mediaQuery);
        }
    };

    createMobileMenu();

    // Add mobile menu styles
    const addMobileStyles = () => {
        if (!document.querySelector('#mobile-styles')) {
            const style = document.createElement('style');
            style.id = 'mobile-styles';
            style.textContent = `
                @media (max-width: 768px) {
                    .nav-links {
                        position: fixed;
                        top: 100%;
                        left: 0;
                        right: 0;
                        background: white;
                        flex-direction: column;
                        padding: 1rem;
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                        transform: translateY(-100%);
                        transition: transform 0.3s ease;
                        z-index: 99;
                    }
                    
                    .nav-links.mobile-open {
                        transform: translateY(0);
                    }
                    
                    .mobile-menu-btn {
                        display: block !important;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    };

    addMobileStyles();

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Add hover effects to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Video player functionality
    const video = document.getElementById('demo-video');
    const playButton = document.getElementById('play-button');
    const videoOverlay = document.querySelector('.video-overlay');
    
    if (video && playButton && videoOverlay) {
        playButton.addEventListener('click', function() {
            video.play();
            videoOverlay.classList.add('hidden');
        });
        
        video.addEventListener('pause', function() {
            videoOverlay.classList.remove('hidden');
        });
        
        video.addEventListener('ended', function() {
            videoOverlay.classList.remove('hidden');
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
    }

    // Add click tracking for analytics (if needed)
    document.querySelectorAll('a[href*="chrome.google.com"]').forEach(link => {
        link.addEventListener('click', function() {
            // Track Chrome Web Store clicks
            console.log('Chrome Web Store link clicked');
        });
    });

    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
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

    lazyImages.forEach(img => imageObserver.observe(img));

    // Add loading states
    const addLoadingStates = () => {
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
            
            img.addEventListener('error', function() {
                this.style.display = 'none';
                console.warn('Image failed to load:', this.src);
            });
        });
    };

    addLoadingStates();

    // Performance optimization: Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Handle scroll-based animations
        }, 16); // ~60fps
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close mobile menu if open
            const nav = document.querySelector('.nav-links');
            if (nav.classList.contains('mobile-open')) {
                nav.classList.remove('mobile-open');
            }
        }
    });

    // Add focus management for accessibility
    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    console.log('Auto Copy It website loaded successfully!');
}); 