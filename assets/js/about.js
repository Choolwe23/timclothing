// Header functionality
class Header {
    constructor() {
        this.navMenu = document.getElementById('nav-menu');
        this.navToggle = document.getElementById('nav-toggle');
        this.cartBtn = document.getElementById('cart-btn');
        this.accountBtn = document.getElementById('account-btn');
        this.cartCount = document.querySelector('.cart-count');
        
        this.init();
    }

    init() {
        // Initialize cart count from localStorage
        this.updateCartCount();
        
        // Event listeners
        this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
        this.cartBtn.addEventListener('click', () => this.handleCartClick());
        this.accountBtn.addEventListener('click', () => this.handleAccountClick());
        
        // Close mobile menu when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navMenu.contains(e.target) && !this.navToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
        
        // Add animation to hamburger
        const hamburger = this.navToggle.querySelector('.hamburger');
        hamburger.style.transition = 'transform 0.3s ease';
    }

    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
    }

    handleCartClick() {
        // For now, just show an alert. This will be integrated with cart functionality later.
        alert('Cart functionality will be implemented in the cart section!');
        
        // Simulate adding an item to cart for demo
        this.simulateAddToCart();
    }

    handleAccountClick() {
        alert('Account login/signup will be implemented later!');
    }

    simulateAddToCart() {
        // This is just for demonstration
        const currentCount = parseInt(this.cartCount.textContent) || 0;
        const newCount = currentCount + 1;
        this.cartCount.textContent = newCount;
        
        // Add animation to cart count
        this.cartCount.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.cartCount.style.transform = 'scale(1)';
        }, 300);
        
        // Store in localStorage (will be properly implemented later)
        localStorage.setItem('cartCount', newCount);
    }

    updateCartCount() {
        // Get cart count from localStorage
        const savedCount = localStorage.getItem('cartCount');
        if (savedCount) {
            this.cartCount.textContent = savedCount;
        }
    }

    // Method to update cart count from external cart operations
    setCartCount(count) {
        this.cartCount.textContent = count;
        localStorage.setItem('cartCount', count);
    }
}

// Initialize header when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Header();
});

// Additional utility functions for the header
const HeaderUtils = {
    // Highlight current page in navigation
    highlightCurrentPage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage) {
                link.classList.add('active');
            }
        });
    },

    // Handle scroll effects on header
    handleScroll() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#fff';
            header.style.backdropFilter = 'none';
        }
    }
};

// Initialize additional header utilities
document.addEventListener('DOMContentLoaded', () => {
    HeaderUtils.highlightCurrentPage();
    window.addEventListener('scroll', HeaderUtils.handleScroll);
});

// Export for use in other modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Header, HeaderUtils };
}
// Footer functionality
class Footer {
    constructor() {
        this.backToTopBtn = document.getElementById('back-to-top');
        this.newsletterForm = document.getElementById('newsletter-form');
        this.newsletterMessage = document.getElementById('newsletter-message');
        
        this.init();
    }

    init() {
        // Event listeners
        this.backToTopBtn.addEventListener('click', () => this.scrollToTop());
        this.newsletterForm.addEventListener('submit', (e) => this.handleNewsletterSubmit(e));
        
        // Show/hide back to top button based on scroll position
        window.addEventListener('scroll', () => this.toggleBackToTop());
        
        // Add intersection observer for footer animations
        this.observeFooter();
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Add click animation
        this.animateBackToTopButton();
    }

    animateBackToTopButton() {
        this.backToTopBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.backToTopBtn.style.transform = '';
        }, 150);
    }

    toggleBackToTop() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        if (scrollY > windowHeight) {
            this.backToTopBtn.classList.add('visible');
        } else {
            this.backToTopBtn.classList.remove('visible');
        }
    }

    handleNewsletterSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.newsletterForm);
        const email = formData.get('email'); // This gets the value from the input
        
        // Basic email validation
        if (!this.isValidEmail(email)) {
            this.showNewsletterMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate API call
        this.subscribeToNewsletter(email);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async subscribeToNewsletter(email) {
        // Show loading state
        this.showNewsletterMessage('Subscribing...', '');
        
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // In a real application, you would make an actual API call here
            // const response = await fetch('/api/newsletter/subscribe', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ email })
            // });
            
            // For demo purposes, we'll simulate a successful subscription
            const success = Math.random() > 0.2; // 80% success rate for demo
            
            if (success) {
                this.showNewsletterMessage('Thank you for subscribing! Check your email for confirmation.', 'success');
                this.newsletterForm.reset();
                
                // Track newsletter subscription
                this.trackNewsletterSubscription(email);
            } else {
                throw new Error('Subscription failed. Please try again.');
            }
            
        } catch (error) {
            this.showNewsletterMessage(error.message || 'Something went wrong. Please try again.', 'error');
        }
    }

    showNewsletterMessage(message, type) {
        this.newsletterMessage.textContent = message;
        this.newsletterMessage.className = 'newsletter-message';
        
        if (type) {
            this.newsletterMessage.classList.add(type);
        }
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                this.newsletterMessage.textContent = '';
                this.newsletterMessage.className = 'newsletter-message';
            }, 5000);
        }
    }

    trackNewsletterSubscription(email) {
        // Track newsletter subscription in analytics
        console.log('Newsletter subscription:', email);
        
        // You would typically integrate with Google Analytics, Facebook Pixel, etc.
        if (typeof gtag !== 'undefined') {
            gtag('event', 'newsletter_subscription', {
                'event_category': 'engagement',
                'event_label': 'footer_newsletter'
            });
        }
    }

    observeFooter() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.1 });

        const footerSections = document.querySelectorAll('.footer-section');
        footerSections.forEach(section => {
            observer.observe(section);
        });
    }

    // Method to update footer content dynamically
    updateContactInfo(phone, email, address) {
        const contactItems = document.querySelectorAll('.contact-item');
        
        if (phone) {
            const phoneItem = contactItems[1];
            if (phoneItem) {
                phoneItem.querySelector('span').textContent = phone;
            }
        }
        
        if (email) {
            const emailItem = contactItems[0];
            if (emailItem) {
                emailItem.querySelector('span').textContent = email;
            }
        }
        
        if (address) {
            const addressItem = contactItems[2];
            if (addressItem) {
                addressItem.querySelector('span').textContent = address;
            }
        }
    }

    // Method to update copyright year
    updateCopyrightYear() {
        const copyrightElement = document.querySelector('.copyright p');
        if (copyrightElement) {
            const currentYear = new Date().getFullYear();
            copyrightElement.textContent = copyrightElement.textContent.replace(/2024/, currentYear);
        }
    }
}

// Initialize footer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Footer();
});

// Utility functions for footer
const FooterUtils = {
    // Smooth scroll to footer sections
    scrollToFooterSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    },

    // Add social media share functionality
    setupSocialSharing() {
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const platform = link.getAttribute('aria-label').toLowerCase();
                this.shareOnSocialMedia(platform);
            });
        });
    },

    shareOnSocialMedia(platform) {
        const currentUrl = encodeURIComponent(window.location.href);
        const title = encodeURIComponent('Check out Tim Clothing Co. - Amazing fashion collection!');
        
        const shareUrls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
            twitter: `https://twitter.com/intent/tweet?text=${title}&url=${currentUrl}`,
            pinterest: `https://pinterest.com/pin/create/button/?url=${currentUrl}&description=${title}`,
            instagram: 'https://www.instagram.com/' // Instagram doesn't support direct sharing
        };
        
        const shareUrl = shareUrls[platform];
        
        if (shareUrl && platform !== 'instagram') {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        } else if (platform === 'instagram') {
            alert('Share us on Instagram: @timclothingco');
        }
    },

    // Add footer link analytics tracking
    trackFooterLinks() {
        const footerLinks = document.querySelectorAll('.footer-link, .footer-bottom-link');
        
        footerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const linkText = link.textContent;
                const linkUrl = link.getAttribute('href');
                
                // Track in analytics
                console.log('Footer link clicked:', linkText, linkUrl);
                
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'footer_link_click', {
                        'event_category': 'navigation',
                        'event_label': linkText,
                        'link_url': linkUrl
                    });
                }
            });
        });
    },

    // Handle payment method display
    setupPaymentMethods() {
        const paymentIcons = document.querySelectorAll('.payment-icon');
        const paymentMethods = ['Visa/Mastercard', 'PayPal', 'Mobile Payments', 'Bank Transfer'];
        
        paymentIcons.forEach((icon, index) => {
            icon.setAttribute('title', paymentMethods[index] || 'Payment Method');
        });
    }
};

// Initialize footer utilities
document.addEventListener('DOMContentLoaded', () => {
    const footer = new Footer();
    footer.updateCopyrightYear();
    
    FooterUtils.setupSocialSharing();
    FooterUtils.trackFooterLinks();
    FooterUtils.setupPaymentMethods();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Footer, FooterUtils };
}

// About Hero functionality
class AboutHero {
    constructor() {
        this.statNumbers = document.querySelectorAll('.stat-number');
        this.scrollIndicator = document.querySelector('.scroll-indicator');
        this.aboutHeroSection = document.querySelector('.about-hero');
        
        this.init();
    }

    init() {
        // Event listeners
        this.scrollIndicator.addEventListener('click', () => this.scrollToNextSection());
        
        // Start counter animations when section is in view
        this.observeAboutHero();
        
        // Add scroll effects
        this.addScrollEffects();
        
        // Preload images
        this.preloadImages();
    }

    observeAboutHero() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.startCounterAnimation();
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.5 });

        if (this.aboutHeroSection) {
            observer.observe(this.aboutHeroSection);
        }
    }

    startCounterAnimation() {
        this.statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current).toLocaleString();
            }, 16);
        });
    }

    scrollToNextSection() {
        const nextSection = this.aboutHeroSection.nextElementSibling;
        if (nextSection) {
            nextSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    addScrollEffects() {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const heroHeight = this.aboutHeroSection.offsetHeight;
            
            // Only apply effects if we're within the hero section
            if (scrolled < heroHeight) {
                const parallaxValue = scrolled * 0.3;
                const opacity = 1 - (scrolled / heroHeight) * 0.3;
                
                // Apply parallax to visual elements
                const visualMain = document.querySelector('.visual-main');
                const experienceBadge = document.querySelector('.experience-badge');
                
                if (visualMain) {
                    visualMain.style.transform = `translateY(${parallaxValue}px)`;
                }
                
                if (experienceBadge) {
                    experienceBadge.style.transform = `translateY(${parallaxValue * 0.5}px)`;
                }
                
                // Fade out content slightly on scroll
                const aboutHeroText = document.querySelector('.about-hero-text');
                if (aboutHeroText) {
                    aboutHeroText.style.opacity = opacity;
                }
                
                // Hide scroll indicator when scrolling down
                if (scrolled > 100) {
                    this.scrollIndicator.style.opacity = '0';
                } else {
                    this.scrollIndicator.style.opacity = '1';
                }
            }
            
            lastScrollY = scrolled;
        });
    }

    preloadImages() {
        const images = [
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1485231184986-2b67cd1c13d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    // Method to update philosophy statement
    updatePhilosophy(statement) {
        const philosophyElement = document.querySelector('.philosophy-statement');
        if (philosophyElement && statement) {
            philosophyElement.textContent = statement;
        }
    }

    // Method to update stats
    updateStats(stats) {
        if (stats && typeof stats === 'object') {
            Object.keys(stats).forEach((key, index) => {
                const statElement = this.statNumbers[index];
                if (statElement) {
                    statElement.setAttribute('data-count', stats[key]);
                    statElement.textContent = '0';
                }
            });
            
            // Restart counter animation
            this.startCounterAnimation();
        }
    }
}

// Initialize about hero when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AboutHero();
});

// Utility functions for about hero section
const AboutHeroUtils = {
    // Handle responsive images
    handleResponsiveImages() {
        const visualImg = document.querySelector('.visual-img');
        const secondaryImgs = document.querySelectorAll('.secondary-img');
        
        if (window.innerWidth < 768) {
            // Use mobile-optimized images
            if (visualImg) {
                visualImg.src = visualImg.src.replace('w=1000', 'w=800');
            }
            secondaryImgs.forEach(img => {
                img.src = img.src.replace('w=500', 'w=400');
            });
        } else {
            // Use desktop images
            if (visualImg) {
                visualImg.src = visualImg.src.replace('w=800', 'w=1000');
            }
            secondaryImgs.forEach(img => {
                img.src = img.src.replace('w=400', 'w=500');
            });
        }
    },

    // Add typewriter effect to philosophy statement
    addTypewriterEffect() {
        const philosophyElement = document.querySelector('.philosophy-statement');
        if (!philosophyElement) return;
        
        const text = philosophyElement.textContent;
        philosophyElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                philosophyElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        };
        
        // Start typewriter effect when section is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(philosophyElement);
    },

    // Create interactive highlight items
    makeHighlightsInteractive() {
        const highlightItems = document.querySelectorAll('.highlight-item');
        
        highlightItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const icon = item.querySelector('.highlight-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                const icon = item.querySelector('.highlight-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
    }
};

// Initialize about hero utilities
document.addEventListener('DOMContentLoaded', () => {
    AboutHeroUtils.handleResponsiveImages();
    AboutHeroUtils.makeHighlightsInteractive();
    
    // Uncomment the line below to enable typewriter effect
    // AboutHeroUtils.addTypewriterEffect();
    
    window.addEventListener('resize', AboutHeroUtils.handleResponsiveImages);
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AboutHero, AboutHeroUtils };
}

// Mission & Values functionality
class MissionValues {
    constructor() {
        this.valueCards = document.querySelectorAll('.value-card');
        this.teamMembers = document.querySelectorAll('.member-card');
        
        this.init();
    }

    init() {
        // Add intersection observers
        this.observeValueCards();
        this.observeTeamMembers();
        
        // Add hover effects
        this.addHoverEffects();
        
        // Preload images
        this.preloadImages();
    }

    observeValueCards() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        this.valueCards.forEach(card => {
            observer.observe(card);
        });
    }

    observeTeamMembers() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        this.teamMembers.forEach(member => {
            observer.observe(member);
        });
    }

    addHoverEffects() {
        // Add click effects to value cards
        this.valueCards.forEach(card => {
            card.addEventListener('click', () => {
                this.animateValueCard(card);
            });
        });

        // Add click effects to team members
        this.teamMembers.forEach(member => {
            member.addEventListener('click', () => {
                this.animateTeamMember(member);
            });
        });
    }

    animateValueCard(card) {
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    }

    animateTeamMember(member) {
        member.style.transform = 'scale(0.98)';
        setTimeout(() => {
            member.style.transform = '';
        }, 150);
    }

    preloadImages() {
        const images = [
            'https://images.unsplash.com/photo-1601924582970-9238bcb495d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    // Method to update mission statement
    updateMission(statement) {
        const missionElement = document.querySelector('.mission-text');
        if (missionElement && statement) {
            missionElement.textContent = statement;
        }
    }

    // Method to update team member information
    updateTeamMember(index, data) {
        const members = document.querySelectorAll('.member-card');
        if (members[index] && data) {
            const member = members[index];
            const nameElement = member.querySelector('.member-name');
            const roleElement = member.querySelector('.member-role');
            const descElement = member.querySelector('.member-desc');
            const imgElement = member.querySelector('.member-img');
            
            if (nameElement && data.name) nameElement.textContent = data.name;
            if (roleElement && data.role) roleElement.textContent = data.role;
            if (descElement && data.description) descElement.textContent = data.description;
            if (imgElement && data.image) imgElement.src = data.image;
        }
    }
}

// Initialize mission values when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MissionValues();
});

// Utility functions for mission values section
const MissionValuesUtils = {
    // Handle responsive images
    handleResponsiveImages() {
        const images = document.querySelectorAll('.quality-img, .founder-img, .member-img');
        const isMobile = window.innerWidth < 768;

        images.forEach(img => {
            const currentSrc = img.getAttribute('src');
            let newSrc = currentSrc;

            if (isMobile) {
                // Replace with mobile-optimized images
                newSrc = currentSrc.replace(/w=\d+/, 'w=400').replace(/h=\d+/, 'h=300');
            } else {
                // Use original images
                newSrc = currentSrc.replace(/w=\d+/, 'w=600').replace(/h=\d+/, 'h=400');
            }

            if (newSrc !== currentSrc) {
                img.src = newSrc;
            }
        });
    },

    // Add scroll animations
    addScrollAnimations() {
        const elements = document.querySelectorAll('.mission-statement, .value-card, .quality-commitment, .founder-intro, .team-members, .team-values');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(element => {
            observer.observe(element);
        });
    },

    // Create interactive value cards
    makeValuesInteractive() {
        const valueCards = document.querySelectorAll('.value-card');
        
        valueCards.forEach(card => {
            const icon = card.querySelector('.value-icon');
            
            card.addEventListener('mouseenter', () => {
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(10deg)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
    }
};

// Initialize mission values utilities
document.addEventListener('DOMContentLoaded', () => {
    MissionValuesUtils.handleResponsiveImages();
    MissionValuesUtils.addScrollAnimations();
    MissionValuesUtils.makeValuesInteractive();
    
    window.addEventListener('resize', MissionValuesUtils.handleResponsiveImages);
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MissionValues, MissionValuesUtils };
}