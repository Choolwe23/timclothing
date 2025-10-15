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

// Contact Information functionality
class ContactInformation {
    constructor() {
        this.getDirectionsBtn = document.getElementById('get-directions');
        this.callNowBtn = document.getElementById('call-now');
        this.sendEmailBtn = document.getElementById('send-email');
        this.viewMapBtn = document.getElementById('view-map-btn');
        this.scheduleCallBtn = document.getElementById('schedule-call');
        this.whatsappChatBtn = document.getElementById('whatsapp-chat');
        this.downloadBrochureBtn = document.getElementById('download-brochure');
        this.currentStatus = document.getElementById('current-status');
        
        this.businessHours = {
            weekdays: { open: 9, close: 20 }, // 9 AM - 8 PM
            saturday: { open: 10, close: 19 }, // 10 AM - 7 PM
            sunday: { open: 11, close: 18 }    // 11 AM - 6 PM
        };
        
        this.init();
    }

    init() {
        // Event listeners
        this.getDirectionsBtn.addEventListener('click', () => this.openDirections());
        this.callNowBtn.addEventListener('click', () => this.initiateCall());
        this.sendEmailBtn.addEventListener('click', () => this.composeEmail());
        this.viewMapBtn.addEventListener('click', () => this.openFullMap());
        this.scheduleCallBtn.addEventListener('click', () => this.scheduleCall());
        this.whatsappChatBtn.addEventListener('click', () => this.openWhatsApp());
        this.downloadBrochureBtn.addEventListener('click', () => this.downloadBrochure());
        
        // Update store status
        this.updateStoreStatus();
        
        // Update status every minute
        setInterval(() => this.updateStoreStatus(), 60000);
        
        // Add intersection observer for animations
        this.observeContactElements();
    }

    updateStoreStatus() {
        const now = new Date();
        const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
        const hour = now.getHours();
        
        let isOpen = false;
        let statusText = "We're currently closed";
        
        if (day >= 1 && day <= 5) { // Weekdays
            isOpen = hour >= this.businessHours.weekdays.open && hour < this.businessHours.weekdays.close;
            statusText = isOpen ? "We're currently open" : "We're currently closed";
        } else if (day === 6) { // Saturday
            isOpen = hour >= this.businessHours.saturday.open && hour < this.businessHours.saturday.close;
            statusText = isOpen ? "We're currently open" : "We're currently closed";
        } else if (day === 0) { // Sunday
            isOpen = hour >= this.businessHours.sunday.open && hour < this.businessHours.sunday.close;
            statusText = isOpen ? "We're currently open" : "We're currently closed";
        }
        
        // Update status indicator
        const statusIndicator = this.currentStatus.querySelector('.status-indicator');
        const statusTextElement = this.currentStatus.querySelector('.status-text');
        
        statusIndicator.className = `status-indicator ${isOpen ? 'open' : 'closed'}`;
        statusTextElement.textContent = statusText;
        
        // Add next opening time if closed
        if (!isOpen) {
            const nextOpen = this.getNextOpeningTime(now);
            if (nextOpen) {
                statusTextElement.textContent += ` - Opens ${nextOpen}`;
            }
        }
    }

    getNextOpeningTime(currentTime) {
        const day = currentTime.getDay();
        const hour = currentTime.getHours();
        const tomorrow = new Date(currentTime);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        // Check if opens later today
        if (day >= 1 && day <= 5 && hour < this.businessHours.weekdays.open) {
            return `today at ${this.businessHours.weekdays.open} AM`;
        } else if (day === 6 && hour < this.businessHours.saturday.open) {
            return `today at ${this.businessHours.saturday.open} AM`;
        } else if (day === 0 && hour < this.businessHours.sunday.open) {
            return `today at ${this.businessHours.sunday.open} AM`;
        } else {
            // Opens tomorrow or next available day
            const tomorrowDay = tomorrow.getDay();
            if (tomorrowDay >= 1 && tomorrowDay <= 5) {
                return `tomorrow at ${this.businessHours.weekdays.open} AM`;
            } else if (tomorrowDay === 6) {
                return `tomorrow at ${this.businessHours.saturday.open} AM`;
            } else if (tomorrowDay === 0) {
                return `tomorrow at ${this.businessHours.sunday.open} AM`;
            }
        }
        
        return null;
    }

    openDirections() {
        const address = "123 Fashion Avenue, New York, NY 10001";
        const encodedAddress = encodeURIComponent(address);
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
        
        window.open(mapsUrl, '_blank');
        
        // Track analytics event
        this.trackEvent('get_directions');
    }

    initiateCall() {
        const phoneNumber = "+15551234567";
        window.location.href = `tel:${phoneNumber}`;
        
        // Track analytics event
        this.trackEvent('initiate_call');
    }

    composeEmail() {
        const email = "info@timclothing.com";
        const subject = "Inquiry from Tim Clothing Co. Website";
        const body = "Hello Tim Clothing Co. team,\n\nI would like to inquire about...";
        
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
        
        // Track analytics event
        this.trackEvent('compose_email');
    }

    openFullMap() {
        const address = "123 Fashion Avenue, New York, NY 10001";
        const encodedAddress = encodeURIComponent(address);
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
        
        window.open(mapsUrl, '_blank');
        
        // Track analytics event
        this.trackEvent('view_full_map');
    }

    scheduleCall() {
        // In a real implementation, this would open a scheduling modal or redirect to a booking page
        alert('Schedule a Call feature would open a booking calendar here.');
        
        // Track analytics event
        this.trackEvent('schedule_call');
    }

    openWhatsApp() {
        const phoneNumber = "15551234567"; // Without + for WhatsApp
        const message = "Hello! I'd like to get in touch with Tim Clothing Co.";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
        
        // Track analytics event
        this.trackEvent('whatsapp_chat');
    }

    downloadBrochure() {
        // Simulate brochure download
        const brochureUrl = '/brochures/tim-clothing-co-brochure.pdf'; // This would be a real file path
        
        // Create temporary download link
        const link = document.createElement('a');
        link.href = brochureUrl;
        link.download = 'Tim-Clothing-Co-Brochure.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show download confirmation
        this.showDownloadConfirmation();
        
        // Track analytics event
        this.trackEvent('download_brochure');
    }

    showDownloadConfirmation() {
        // Create and show a temporary confirmation message
        const confirmation = document.createElement('div');
        confirmation.className = 'download-confirmation';
        confirmation.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        confirmation.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                Brochure download started
            </div>
        `;
        
        document.body.appendChild(confirmation);
        
        // Remove after 3 seconds
        setTimeout(() => {
            confirmation.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (confirmation.parentNode) {
                    confirmation.parentNode.removeChild(confirmation);
                }
            }, 300);
        }, 3000);
        
        // Add CSS animations if not already present
        if (!document.querySelector('#download-animations')) {
            const style = document.createElement('style');
            style.id = 'download-animations';
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    observeContactElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll('.contact-card, .business-hours, .store-map, .quick-actions, .info-card');
        elements.forEach(element => {
            observer.observe(element);
        });
    }

    trackEvent(action) {
        // In a real implementation, this would send data to Google Analytics or similar
        console.log('Contact action:', action);
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'contact_action', {
                'event_category': 'engagement',
                'event_label': action
            });
        }
    }

    // Method to update contact information dynamically
    updateContactInfo(newInfo) {
        if (newInfo.address) {
            const addressElement = document.querySelector('.contact-card:nth-child(1) .contact-text');
            if (addressElement) {
                addressElement.innerHTML = newInfo.address.replace(/\n/g, '<br>');
            }
        }
        
        if (newInfo.phone) {
            const phoneElement = document.querySelector('.contact-card:nth-child(2) .contact-text');
            if (phoneElement) {
                phoneElement.innerHTML = `Main: <a href="tel:${newInfo.phone.main}" class="contact-link">${newInfo.phone.main}</a><br>
                Support: <a href="tel:${newInfo.phone.support}" class="contact-link">${newInfo.phone.support}</a>`;
            }
        }
        
        if (newInfo.email) {
            const emailElement = document.querySelector('.contact-card:nth-child(3) .contact-text');
            if (emailElement) {
                emailElement.innerHTML = `General: <a href="mailto:${newInfo.email.general}" class="contact-link">${newInfo.email.general}</a><br>
                Support: <a href="mailto:${newInfo.email.support}" class="contact-link">${newInfo.email.support}</a>`;
            }
        }
        
        if (newInfo.businessHours) {
            this.businessHours = newInfo.businessHours;
            this.updateStoreStatus();
        }
    }
}

// Initialize contact information when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.contact-info-section')) {
        new ContactInformation();
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ContactInformation };
}

// FAQ Section functionality
class FAQSection {
    constructor() {
        this.faqAccordion = document.getElementById('faq-accordion');
        this.faqSearchInput = document.getElementById('faq-search-input');
        this.faqSearchClear = document.getElementById('faq-search-clear');
        this.categoryButtons = document.querySelectorAll('.category-btn');
        this.faqItems = document.querySelectorAll('.faq-item');
        this.faqCategoryGroups = document.querySelectorAll('.faq-category-group');
        this.contactSupportBtn = document.getElementById('contact-support');
        this.liveChatBtn = document.getElementById('live-chat');
        
        this.currentCategory = 'all';
        this.currentSearch = '';
        
        this.init();
    }

    init() {
        // Event listeners
        this.faqSearchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        this.faqSearchClear.addEventListener('click', () => this.clearSearch());
        this.categoryButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleCategoryFilter(e.target));
        });
        this.contactSupportBtn.addEventListener('click', () => this.contactSupport());
        this.liveChatBtn.addEventListener('click', () => this.startLiveChat());
        
        // Add click listeners to FAQ questions
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => this.toggleFAQ(item));
        });
        
        // Add keyboard navigation
        this.addKeyboardNavigation();
        
        // Initialize first FAQ item as open
        this.initializeFirstItem();
    }

    handleSearch(query) {
        this.currentSearch = query.toLowerCase().trim();
        this.currentPage = 1;
        
        // Show/hide clear button
        this.faqSearchClear.style.display = this.currentSearch ? 'block' : 'none';
        
        // Apply search filter with debounce
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            this.applyFilters();
        }, 300);
    }

    clearSearch() {
        this.faqSearchInput.value = '';
        this.currentSearch = '';
        this.faqSearchClear.style.display = 'none';
        this.applyFilters();
    }

    handleCategoryFilter(button) {
        // Update active button
        this.categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update current category
        this.currentCategory = button.dataset.category;
        this.applyFilters();
    }

    applyFilters() {
        let hasVisibleItems = false;
        
        this.faqCategoryGroups.forEach(group => {
            const category = group.dataset.category;
            const items = group.querySelectorAll('.faq-item');
            let groupHasVisibleItems = false;
            
            items.forEach(item => {
                const questionText = item.querySelector('.question-text').textContent.toLowerCase();
                const answerText = item.querySelector('.faq-answer').textContent.toLowerCase();
                const matchesCategory = this.currentCategory === 'all' || category === this.currentCategory;
                const matchesSearch = !this.currentSearch || 
                    questionText.includes(this.currentSearch) || 
                    answerText.includes(this.currentSearch);
                
                if (matchesCategory && matchesSearch) {
                    item.classList.remove('hidden');
                    groupHasVisibleItems = true;
                    hasVisibleItems = true;
                    
                    // Highlight search terms
                    if (this.currentSearch) {
                        this.highlightSearchTerms(item);
                    } else {
                        this.removeHighlights(item);
                    }
                } else {
                    item.classList.add('hidden');
                    this.removeHighlights(item);
                }
            });
            
            // Show/hide category group based on visible items
            if (groupHasVisibleItems) {
                group.classList.remove('hidden');
            } else {
                group.classList.add('hidden');
            }
        });
        
        // Show/hide no results message
        this.toggleNoResultsMessage(!hasVisibleItems);
    }

    highlightSearchTerms(item) {
        const questionElement = item.querySelector('.question-text');
        const answerElement = item.querySelector('.faq-answer');
        const searchTerm = this.currentSearch;
        
        // Remove existing highlights
        this.removeHighlights(item);
        
        // Highlight in question
        const questionHtml = questionElement.innerHTML;
        const highlightedQuestion = questionHtml.replace(
            new RegExp(searchTerm, 'gi'),
            match => `<mark class="search-highlight">${match}</mark>`
        );
        questionElement.innerHTML = highlightedQuestion;
        
        // Highlight in answer
        const answerHtml = answerElement.innerHTML;
        const highlightedAnswer = answerHtml.replace(
            new RegExp(searchTerm, 'gi'),
            match => `<mark class="search-highlight">${match}</mark>`
        );
        answerElement.innerHTML = highlightedAnswer;
        
        // Add highlight class to item
        item.classList.add('highlight');
    }

    removeHighlights(item) {
        const questionElement = item.querySelector('.question-text');
        const answerElement = item.querySelector('.faq-answer');
        
        // Remove mark tags but keep text
        if (questionElement) {
            questionElement.innerHTML = questionElement.textContent;
        }
        if (answerElement) {
            answerElement.innerHTML = answerElement.textContent;
        }
        
        // Remove highlight class
        item.classList.remove('highlight');
    }

    toggleNoResultsMessage(show) {
        let noResults = document.querySelector('.faq-no-results');
        
        if (show && !noResults) {
            noResults = document.createElement('div');
            noResults.className = 'faq-no-results';
            noResults.innerHTML = `
                <div class="faq-no-results-icon">🔍</div>
                <h3>No questions found</h3>
                <p>Try adjusting your search terms or browse different categories.</p>
                <button class="reset-search" onclick="faqSection.clearSearch()">Clear Search</button>
            `;
            this.faqAccordion.appendChild(noResults);
            
            // Add styles for reset button
            const style = document.createElement('style');
            style.textContent = `
                .reset-search {
                    background: #e74c3c;
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 25px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    margin-top: 1rem;
                }
                .reset-search:hover {
                    background: #c0392b;
                    transform: translateY(-2px);
                }
                .search-highlight {
                    background: #ffeaa7;
                    padding: 0.1rem 0.2rem;
                    border-radius: 3px;
                }
            `;
            document.head.appendChild(style);
        }
        
        if (noResults) {
            noResults.classList.toggle('visible', show);
        }
    }

    toggleFAQ(item) {
        const isCurrentlyActive = item.classList.contains('active');
        
        // Close all other FAQ items
        this.faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active', !isCurrentlyActive);
        
        // Scroll into view if opening
        if (!isCurrentlyActive) {
            setTimeout(() => {
                item.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest',
                    inline: 'nearest'
                });
            }, 300);
        }
        
        // Track analytics
        this.trackFAQInteraction(item);
    }

    initializeFirstItem() {
        // Open the first FAQ item by default
        if (this.faqItems.length > 0) {
            const firstItem = this.faqItems[0];
            firstItem.classList.add('active');
        }
    }

    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close all FAQ items on Escape
                this.faqItems.forEach(item => {
                    item.classList.remove('active');
                });
            }
            
            // Navigate with arrow keys when focused on FAQ items
            if (e.target.classList.contains('faq-question')) {
                const currentItem = e.target.closest('.faq-item');
                const allVisibleItems = Array.from(this.faqItems).filter(item => 
                    !item.classList.contains('hidden')
                );
                const currentIndex = allVisibleItems.indexOf(currentItem);
                
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextItem = allVisibleItems[currentIndex + 1];
                    if (nextItem) {
                        nextItem.querySelector('.faq-question').focus();
                    }
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevItem = allVisibleItems[currentIndex - 1];
                    if (prevItem) {
                        prevItem.querySelector('.faq-question').focus();
                    }
                } else if (e.key === 'Home') {
                    e.preventDefault();
                    const firstItem = allVisibleItems[0];
                    if (firstItem) {
                        firstItem.querySelector('.faq-question').focus();
                    }
                } else if (e.key === 'End') {
                    e.preventDefault();
                    const lastItem = allVisibleItems[allVisibleItems.length - 1];
                    if (lastItem) {
                        lastItem.querySelector('.faq-question').focus();
                    }
                }
            }
        });
    }

    contactSupport() {
        // Scroll to contact form or open contact modal
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Fallback: compose email
            const email = 'support@timclothing.com';
            const subject = 'Support Request - FAQ Section';
            const body = 'Hello Tim Clothing Co. Support Team,\n\nI need help with:';
            
            const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoLink;
        }
        
        this.trackEvent('contact_support');
    }

    startLiveChat() {
        // In a real implementation, this would open a live chat widget
        alert('Live chat feature would open here. For now, please email us at support@timclothing.com');
        
        this.trackEvent('start_live_chat');
    }

    trackFAQInteraction(item) {
        const question = item.querySelector('.question-text').textContent;
        const isOpening = item.classList.contains('active');
        
        console.log(`FAQ ${isOpening ? 'opened' : 'closed'}:`, question);
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'faq_interaction', {
                'event_category': 'engagement',
                'event_label': question,
                'interaction_type': isOpening ? 'open' : 'close'
            });
        }
    }

    trackEvent(action) {
        console.log('FAQ action:', action);
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'faq_action', {
                'event_category': 'engagement',
                'event_label': action
            });
        }
    }

    // Method to dynamically add new FAQ items
    addFAQItem(category, question, answer) {
        const categoryGroup = document.querySelector(`[data-category="${category}"]`);
        if (!categoryGroup) return;
        
        const faqItems = categoryGroup.querySelector('.faq-items');
        const newItem = document.createElement('div');
        newItem.className = 'faq-item';
        newItem.dataset.category = category;
        
        newItem.innerHTML = `
            <button class="faq-question">
                <span class="question-text">${question}</span>
                <svg class="chevron-icon" viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
                </svg>
            </button>
            <div class="faq-answer">
                ${answer}
            </div>
        `;
        
        // Add event listener to new item
        const questionBtn = newItem.querySelector('.faq-question');
        questionBtn.addEventListener('click', () => this.toggleFAQ(newItem));
        
        faqItems.appendChild(newItem);
        this.faqItems = document.querySelectorAll('.faq-item'); // Update collection
    }

    // Method to expand all FAQ items
    expandAll() {
        this.faqItems.forEach(item => {
            item.classList.add('active');
        });
    }

    // Method to collapse all FAQ items
    collapseAll() {
        this.faqItems.forEach(item => {
            item.classList.remove('active');
        });
    }
}

// Initialize FAQ section when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.faq-section')) {
        window.faqSection = new FAQSection();
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FAQSection };
}