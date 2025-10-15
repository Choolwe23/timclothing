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

// Products Page functionality
class ProductsPage {
    constructor() {
        this.productsGrid = document.getElementById('products-grid');
        this.loadingState = document.getElementById('loading-state');
        this.noResults = document.getElementById('no-results');
        this.loadMoreBtn = document.getElementById('load-more-btn');
        this.searchInput = document.getElementById('search-input');
        this.searchClear = document.getElementById('search-clear');
        this.sortSelect = document.getElementById('sort-select');
        this.clearFiltersBtn = document.getElementById('clear-filters');
        this.resetSearchBtn = document.getElementById('reset-search');
        this.activeFilters = document.getElementById('active-filters');
        
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.viewButtons = document.querySelectorAll('.view-btn');
        
        this.products = [];
        this.filteredProducts = [];
        this.currentPage = 1;
        this.productsPerPage = 12;
        this.currentCategory = 'all';
        this.currentSort = 'featured';
        this.currentSearch = '';
        this.currentView = 'grid';
        
        this.init();
    }

    init() {
        // Load products data
        this.loadProducts();
        
        // Event listeners
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilterClick(e.target));
        });
        
        this.viewButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleViewChange(e.target));
        });
        
        this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        this.searchClear.addEventListener('click', () => this.clearSearch());
        this.sortSelect.addEventListener('change', (e) => this.handleSortChange(e.target.value));
        this.clearFiltersBtn.addEventListener('click', () => this.clearAllFilters());
        this.resetSearchBtn.addEventListener('click', () => this.clearAllFilters());
        this.loadMoreBtn.addEventListener('click', () => this.loadMoreProducts());
        
        // Handle URL parameters
        this.handleURLParams();
        
        // Initialize view
        this.updateView();
    }

    loadProducts() {
        // Show loading state
        this.showLoadingState();
        
        // Simulate API call delay
        setTimeout(() => {
            // Sample product data - in real app, this would come from an API
            this.products = this.generateSampleProducts(50);
            // Expose for product-detail lookup from products page
            try { window.GLOBAL_PRODUCTS = this.products; } catch(e) { /* ignore */ }
            this.applyFilters();
            this.hideLoadingState();
        }, 1000);
    }

    generateSampleProducts(count) {
        const templates = [
            { name: 'Mufulira Classic White Tee', category: 'men', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { name: 'Lusaka Linen Summer Dress', category: 'women', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { name: 'Zambezi Leather Strap Watch', category: 'accessories', image: 'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { name: 'Copperbelt Slim Denim', category: 'men', image: 'https://images.unsplash.com/photo-1541099649105-16a7b67d2f7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { name: 'Tropical Knit Sweater', category: 'women', image: 'https://images.unsplash.com/photo-1520975919074-6c3a4d5d0b12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { name: 'Sable Polarized Sunglasses', category: 'accessories', image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { name: 'Kabwe Tailored Blazer', category: 'men', image: 'https://images.unsplash.com/photo-1541099649105-19f2a3d1f60b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { name: 'Victoria Maxi Skirt', category: 'women', image: 'https://images.unsplash.com/photo-1520975919074-4f3c9dbae2d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { name: 'Nomad Canvas Backpack', category: 'accessories', image: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { name: 'Choma Polo Shirt', category: 'men', image: 'https://images.unsplash.com/photo-1541099649105-3dfb1b51c9d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { name: 'Kafue Wrap Top', category: 'women', image: 'https://images.unsplash.com/photo-1541099649105-3dfb1b51c9d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { name: 'Safari Leather Belt', category: 'accessories', image: 'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
        ];

        const products = [];

        for (let i = 1; i <= count; i++) {
            const template = templates[i % templates.length];
            const id = i;
            // Vary price slightly
            const base = Math.floor((Math.random() * 80) + 20);
            const hasDiscount = Math.random() > 0.6;
            const originalPrice = hasDiscount ? Math.round(base * (1 + Math.random() * 0.6)) : null;
            const price = originalPrice ? Math.round(originalPrice * (0.6 + Math.random() * 0.35)) : base;

            products.push({
                id: id,
                name: `${template.name} ${Math.floor(id / templates.length) + 1}`,
                category: template.category,
                price: price,
                originalPrice: originalPrice,
                image: template.image,
                rating: (Math.random() * 1 + 4).toFixed(1),
                reviewCount: Math.floor(Math.random() * 200) + 5,
                badge: Math.random() > 0.8 ? (Math.random() > 0.5 ? 'new' : 'sale') : null,
                description: `High-quality ${template.category} item — ${template.name} crafted for style and comfort.`,
                inStock: Math.random() > 0.05
            });
        }

        return products;
    }

    handleFilterClick(button) {
        // Update active button
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update current category
        this.currentCategory = button.dataset.filter;
        this.currentPage = 1;
        
        // Apply filters
        this.applyFilters();
        
        // Update URL
        this.updateURL();
    }

    handleSearch(query) {
        this.currentSearch = query.toLowerCase().trim();
        this.currentPage = 1;
        
        // Show/hide clear button
        this.searchClear.style.display = this.currentSearch ? 'block' : 'none';
        
        // Apply filters with debounce
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            this.applyFilters();
        }, 300);
    }

    clearSearch() {
        this.searchInput.value = '';
        this.currentSearch = '';
        this.searchClear.style.display = 'none';
        this.currentPage = 1;
        this.applyFilters();
    }

    handleSortChange(sortValue) {
        this.currentSort = sortValue;
        this.applyFilters();
    }

    handleViewChange(button) {
        this.viewButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        this.currentView = button.dataset.view;
        this.updateView();
    }

    updateView() {
        this.productsGrid.setAttribute('data-view', this.currentView);
        
        // Update product cards for current view
        const productCards = this.productsGrid.querySelectorAll('.product-card');
        productCards.forEach(card => {
            if (this.currentView === 'list') {
                card.classList.add('list-view');
            } else {
                card.classList.remove('list-view');
            }
        });
    }

    applyFilters() {
        // Filter by category
        let filtered = this.products;
        
        if (this.currentCategory !== 'all') {
            filtered = filtered.filter(product => product.category === this.currentCategory);
        }
        
        // Filter by search query
        if (this.currentSearch) {
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(this.currentSearch) ||
                product.description.toLowerCase().includes(this.currentSearch) ||
                product.category.toLowerCase().includes(this.currentSearch)
            );
        }
        
        // Sort products
        filtered = this.sortProducts(filtered, this.currentSort);
        
        this.filteredProducts = filtered;
        this.renderProducts();
        this.updateResultsInfo();
        this.updateActiveFilters();
    }

    sortProducts(products, sortBy) {
        switch (sortBy) {
            case 'price-low':
                return [...products].sort((a, b) => a.price - b.price);
            case 'price-high':
                return [...products].sort((a, b) => b.price - a.price);
            case 'newest':
                return [...products].sort((a, b) => b.id - a.id);
            case 'rating':
                return [...products].sort((a, b) => b.rating - a.rating);
            case 'featured':
            default:
                return products;
        }
    }

    renderProducts() {
        const startIndex = (this.currentPage - 1) * this.productsPerPage;
        const endIndex = startIndex + this.productsPerPage;
        const productsToShow = this.filteredProducts.slice(0, endIndex);
        
        if (this.currentPage === 1) {
            this.productsGrid.innerHTML = '';
        }
        
        if (productsToShow.length === 0) {
            this.showNoResults();
            return;
        }
        
        this.hideNoResults();
        
        productsToShow.forEach((product, index) => {
            if (index >= startIndex) {
                const productCard = this.createProductCard(product);
                this.productsGrid.appendChild(productCard);
            }
        });
        
        // Update load more button
        this.updateLoadMoreButton();
        
        // Add animations
        this.animateProducts();
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.category = product.category;
        card.dataset.id = product.id;
        
        const discount = product.originalPrice 
            ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
            : 0;
        
        const stars = this.generateStarRating(product.rating);
        
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" class="product-img">
                ${product.badge ? `<span class="product-badge ${product.badge}">${product.badge === 'new' ? 'New' : 'Sale'}</span>` : ''}
                <div class="product-actions">
                    <button class="action-btn wishlist" data-product-id="${product.id}" aria-label="Add to wishlist">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path fill="currentColor" d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/>
                        </svg>
                    </button>
                </div>
                <button class="quick-view-btn" data-product-id="${product.id}">Quick View</button>
            </div>
            <div class="product-content">
                <span class="product-category">${this.getCategoryName(product.category)}</span>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    <span class="current-price">${window.Currency ? window.Currency.format(product.price) : 'K' + product.price.toFixed(2)}</span>
                    ${product.originalPrice ? `<span class="original-price">${window.Currency ? window.Currency.format(product.originalPrice) : 'K' + product.originalPrice.toFixed(2)}</span>` : ''}
                    ${discount > 0 ? `<span class="discount">-${discount}%</span>` : ''}
                </div>
                <div class="product-rating">
                    <div class="stars">${stars}</div>
                    <span class="rating-count">(${product.reviewCount})</span>
                </div>
                <button class="add-to-cart-btn" data-product-id="${product.id}">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                        <path fill="currentColor" d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0020 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                    </svg>
                    Add to Cart
                </button>
            </div>
        `;
        
        // Add event listeners
        this.addProductCardListeners(card, product);
        
        return card;
    }

    generateStarRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<span class="star">★</span>';
        }
        
        if (hasHalfStar) {
            stars += '<span class="star">★</span>';
        }
        
        for (let i = 0; i < emptyStars; i++) {
            stars += '<span class="star empty">★</span>';
        }
        
        return stars;
    }

    addProductCardListeners(card, product) {
        const quickViewBtn = card.querySelector('.quick-view-btn');
        const wishlistBtn = card.querySelector('.wishlist');
        const addToCartBtn = card.querySelector('.add-to-cart-btn');
        
        quickViewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.showQuickView(product);
        });
        
        wishlistBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleWishlist(product.id, wishlistBtn);
        });
        
        addToCartBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.addToCart(product.id);
        });
        
        card.addEventListener('click', (e) => {
            if (!e.target.closest('button')) {
                this.navigateToProduct(product.id);
            }
        });
    }

    loadMoreProducts() {
        this.currentPage++;
        this.renderProducts();
    }

    updateLoadMoreButton() {
        const totalPages = Math.ceil(this.filteredProducts.length / this.productsPerPage);
        const hasMore = this.currentPage < totalPages;
        
        this.loadMoreBtn.style.display = hasMore ? 'block' : 'none';
        this.loadMoreBtn.disabled = !hasMore;
        
        if (!hasMore && this.filteredProducts.length > this.productsPerPage) {
            this.loadMoreBtn.textContent = 'All products loaded';
        } else {
            this.loadMoreBtn.textContent = 'Load More Products';
        }
    }

    updateResultsInfo() {
        const showingCount = Math.min(this.currentPage * this.productsPerPage, this.filteredProducts.length);
        const totalCount = this.filteredProducts.length;
        
        document.getElementById('showing-count').textContent = showingCount.toLocaleString();
        document.getElementById('total-count').textContent = totalCount.toLocaleString();
    }

    updateActiveFilters() {
        this.activeFilters.innerHTML = '';
        
        if (this.currentCategory !== 'all') {
            this.addActiveFilter('category', this.currentCategory, this.getCategoryName(this.currentCategory));
        }
        
        if (this.currentSearch) {
            this.addActiveFilter('search', this.currentSearch, `Search: "${this.currentSearch}"`);
        }
    }

    addActiveFilter(type, value, displayText) {
        const filterElement = document.createElement('div');
        filterElement.className = 'active-filter';
        filterElement.innerHTML = `
            <span>${displayText}</span>
            <button class="active-filter-remove" data-type="${type}" data-value="${value}">
                <svg viewBox="0 0 24 24" width="12" height="12">
                    <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
            </button>
        `;
        
        const removeBtn = filterElement.querySelector('.active-filter-remove');
        removeBtn.addEventListener('click', () => this.removeActiveFilter(type, value));
        
        this.activeFilters.appendChild(filterElement);
    }

    removeActiveFilter(type, value) {
        if (type === 'category') {
            this.currentCategory = 'all';
            this.filterButtons.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.filter === 'all');
            });
        } else if (type === 'search') {
            this.clearSearch();
        }
        
        this.currentPage = 1;
        this.applyFilters();
        this.updateURL();
    }

    clearAllFilters() {
        this.currentCategory = 'all';
        this.currentSearch = '';
        this.currentSort = 'featured';
        this.currentPage = 1;
        
        this.filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === 'all');
        });
        
        this.searchInput.value = '';
        this.searchClear.style.display = 'none';
        this.sortSelect.value = 'featured';
        
        this.applyFilters();
        this.updateURL();
    }

    showLoadingState() {
        this.loadingState.style.display = 'flex';
        this.productsGrid.style.display = 'none';
        this.noResults.style.display = 'none';
    }

    hideLoadingState() {
        this.loadingState.style.display = 'none';
        this.productsGrid.style.display = 'grid';
    }

    showNoResults() {
        this.noResults.style.display = 'block';
        this.productsGrid.style.display = 'none';
        this.loadMoreBtn.style.display = 'none';
    }

    hideNoResults() {
        this.noResults.style.display = 'none';
        this.productsGrid.style.display = 'grid';
    }

    animateProducts() {
        const productCards = this.productsGrid.querySelectorAll('.product-card');
        
        productCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('animated');
        });
    }

    handleURLParams() {
        const urlParams = new URLSearchParams(window.location.search);
        
        const category = urlParams.get('category');
        const search = urlParams.get('search');
        const sort = urlParams.get('sort');
        
        if (category && this.isValidCategory(category)) {
            this.currentCategory = category;
            this.filterButtons.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.filter === category);
            });
        }
        
        if (search) {
            this.currentSearch = search;
            this.searchInput.value = search;
            this.searchClear.style.display = 'block';
        }
        
        if (sort && this.isValidSort(sort)) {
            this.currentSort = sort;
            this.sortSelect.value = sort;
        }
    }

    updateURL() {
        const params = new URLSearchParams();
        
        if (this.currentCategory !== 'all') {
            params.set('category', this.currentCategory);
        }
        
        if (this.currentSearch) {
            params.set('search', this.currentSearch);
        }
        
        if (this.currentSort !== 'featured') {
            params.set('sort', this.currentSort);
        }
        
        const newUrl = params.toString() ? `products.html?${params.toString()}` : 'products.html';
        window.history.replaceState({}, '', newUrl);
    }

    isValidCategory(category) {
        return ['all', 'men', 'women', 'accessories'].includes(category);
    }

    isValidSort(sort) {
        return ['featured', 'price-low', 'price-high', 'newest', 'rating'].includes(sort);
    }

    getCategoryName(category) {
        const names = {
            'men': "Men's",
            'women': "Women's",
            'accessories': "Accessories"
        };
        return names[category] || category;
    }

    // Placeholder methods for product interactions
    showQuickView(product) {
        console.log('Quick view:', product);
        // Implementation from New Arrivals section
    }

    toggleWishlist(productId, button) {
        console.log('Toggle wishlist:', productId);
        // Implementation from New Arrivals section
    }

    addToCart(productId) {
        console.log('Add to cart:', productId);
        // Implementation from New Arrivals section
    }

    navigateToProduct(productId) {
        window.location.href = `product-detail.html?id=${productId}`;
    }
}

// Initialize products page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.products-section')) {
        new ProductsPage();
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProductsPage };
}