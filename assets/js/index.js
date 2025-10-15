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

// Hero Banner functionality
class HeroBanner {
    constructor() {
        this.heroCtaBtn = document.getElementById('hero-cta-btn');
        this.scrollIndicator = document.querySelector('.scroll-indicator');
        this.heroSection = document.querySelector('.hero');
        
        this.init();
    }

    init() {
        // Event listeners
        this.heroCtaBtn.addEventListener('click', () => this.handleCtaClick());
        this.scrollIndicator.addEventListener('click', () => this.scrollToNextSection());
        
        // Add scroll effect to hero section
        this.addScrollEffects();
        
        // Add parallax effect
        this.addParallaxEffect();
    }

    handleCtaClick() {
        // Smooth scroll to products section
        const productsSection = document.querySelector('.featured-products') || document.getElementById('products');
        if (productsSection) {
            productsSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            // If products section doesn't exist yet, redirect to products page
            window.location.href = 'products.html';
        }
        
        // Add click animation
        this.animateCtaButton();
    }

    animateCtaButton() {
        this.heroCtaBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.heroCtaBtn.style.transform = 'scale(1)';
        }, 150);
    }

    scrollToNextSection() {
        const nextSection = this.heroSection.nextElementSibling;
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
            const heroHeight = this.heroSection.offsetHeight;
            
            // Only apply effects if we're within the hero section
            if (scrolled < heroHeight) {
                const parallaxValue = scrolled * 0.5;
                const opacity = 1 - (scrolled / heroHeight) * 0.5;
                
                // Apply parallax to hero image
                const heroImg = document.querySelector('.hero-img');
                if (heroImg) {
                    heroImg.style.transform = `scale(${1 + scrolled * 0.0005}) translateY(${parallaxValue * 0.3}px)`;
                }
                
                // Fade out content slightly on scroll
                const heroContent = document.querySelector('.hero-content');
                if (heroContent) {
                    heroContent.style.opacity = opacity;
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

    addParallaxEffect() {
        // Mouse move parallax effect
        this.heroSection.addEventListener('mousemove', (e) => {
            if (window.innerWidth > 968) { // Only on desktop
                const { left, top, width, height } = this.heroSection.getBoundingClientRect();
                const x = (e.clientX - left) / width - 0.5;
                const y = (e.clientY - top) / height - 0.5;
                
                const heroContent = document.querySelector('.hero-content');
                const heroImg = document.querySelector('.hero-img');
                
                if (heroContent) {
                    heroContent.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
                }
                
                if (heroImg) {
                    heroImg.style.transform = `scale(1.05) translate(${x * -30}px, ${y * -30}px)`;
                }
            }
        });

        // Reset on mouse leave
        this.heroSection.addEventListener('mouseleave', () => {
            const heroContent = document.querySelector('.hero-content');
            const heroImg = document.querySelector('.hero-img');
            
            if (heroContent) {
                heroContent.style.transform = 'translate(0, 0)';
            }
            
            if (heroImg) {
                heroImg.style.transform = 'scale(1.05) translate(0, 0)';
            }
        });
    }

    // Method to update hero content dynamically if needed
    updateHeroContent(title, subtitle, ctaText) {
        const titleEl = document.querySelector('.hero-title');
        const subtitleEl = document.querySelector('.hero-subtitle');
        const ctaEl = document.querySelector('.hero-cta');
        
        if (titleEl && title) titleEl.textContent = title;
        if (subtitleEl && subtitle) subtitleEl.textContent = subtitle;
        if (ctaEl && ctaText) ctaEl.textContent = ctaText;
    }
}

// Initialize hero banner when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeroBanner();
});

// Utility functions for hero section
const HeroUtils = {
    // Preload hero image for better performance
    preloadHeroImage() {
        const heroImg = document.querySelector('.hero-img');
        if (heroImg) {
            const img = new Image();
            img.src = heroImg.src;
            img.onload = () => {
                heroImg.style.opacity = '1';
            };
        }
    },

    // Add intersection observer for hero section
    observeHeroSection() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, { threshold: 0.5 });

        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            observer.observe(heroSection);
        }
    },

    // Handle responsive image switching
    handleResponsiveImages() {
        const heroImg = document.querySelector('.hero-img');
        if (heroImg && window.innerWidth < 768) {
            // Switch to mobile-optimized image
            heroImg.src = 'https://images.unsplash.com/photo-1485231184986-2b67cd1c13d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
        }
    }
};

// Initialize hero utilities
document.addEventListener('DOMContentLoaded', () => {
    HeroUtils.preloadHeroImage();
    HeroUtils.observeHeroSection();
    HeroUtils.handleResponsiveImages();
    
    // Re-run responsive image handling on window resize
    window.addEventListener('resize', HeroUtils.handleResponsiveImages);
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HeroBanner, HeroUtils };
}

// Featured Categories functionality
class FeaturedCategories {
    constructor() {
        this.categoryCards = document.querySelectorAll('.category-card');
        this.categoryCtas = document.querySelectorAll('.category-cta');
        
        this.init();
    }

    init() {
        // Event listeners
        this.categoryCards.forEach(card => {
            card.addEventListener('click', (e) => this.handleCategoryClick(e, card));
            card.addEventListener('mouseenter', () => this.handleCategoryHover(card));
            card.addEventListener('mouseleave', () => this.handleCategoryLeave(card));
        });

        this.categoryCtas.forEach(cta => {
            cta.addEventListener('click', (e) => this.handleCtaClick(e));
        });

        // Preload and optimize images
        this.preloadCategoryImages();
        
        // Add intersection observer for animation
        this.observeCategories();
    }

    handleCategoryClick(e, card) {
        // Don't trigger if CTA button was clicked
        if (e.target.classList.contains('category-cta')) {
            return;
        }
        
        const category = card.dataset.category;
        this.navigateToCategory(category);
    }

    handleCtaClick(e) {
        e.stopPropagation();
        const card = e.target.closest('.category-card');
        const category = card.dataset.category;
        this.navigateToCategory(category);
    }

    navigateToCategory(category) {
        // Add click animation
        this.animateCategoryClick(category);
        
        // Navigate to products page with category filter
        setTimeout(() => {
            window.location.href = `products.html?category=${category}`;
        }, 300);
    }

    animateCategoryClick(category) {
        const card = document.querySelector(`[data-category="${category}"]`);
        if (card) {
            card.style.transform = 'scale(0.95)';
            card.style.opacity = '0.8';
            
            setTimeout(() => {
                card.style.transform = '';
                card.style.opacity = '';
            }, 300);
        }
    }

    handleCategoryHover(card) {
        // Add additional hover effects
        const image = card.querySelector('.category-img');
        const title = card.querySelector('.category-title');
        
        if (image) {
            image.style.transition = 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        }
        
        // Add pulse animation to count
        const count = card.querySelector('.category-count');
        if (count) {
            count.style.transform = 'scale(1.05)';
        }
    }

    handleCategoryLeave(card) {
        // Reset hover effects
        const count = card.querySelector('.category-count');
        if (count) {
            count.style.transform = 'scale(1)';
        }
    }

    preloadCategoryImages() {
        const images = document.querySelectorAll('.category-img');
        
        images.forEach(img => {
            const src = img.getAttribute('src');
            const image = new Image();
            
            image.src = src;
            image.onload = () => {
                img.classList.add('loaded');
                img.style.background = 'none';
            };
            
            image.onerror = () => {
                console.warn('Failed to load category image:', src);
                // Set a placeholder image or handle error
                img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f0f0f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="18" fill="%23999">Image not available</text></svg>';
                img.classList.add('loaded');
            };
        });
    }

    observeCategories() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        this.categoryCards.forEach(card => {
            observer.observe(card);
        });
    }

    // Method to update category counts dynamically
    updateCategoryCounts(counts) {
        Object.keys(counts).forEach(category => {
            const countElement = document.querySelector(`[data-category="${category}"] .category-count`);
            if (countElement) {
                countElement.textContent = `${counts[category]}+ Items`;
            }
        });
    }

    // Method to filter categories (for future use)
    filterCategories(filter) {
        this.categoryCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

// Initialize featured categories when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FeaturedCategories();
});

// Utility functions for categories section
const CategoriesUtils = {
    // Get category display name
    getCategoryName(category) {
        const names = {
            'men': "Men's Collection",
            'women': "Women's Collection",
            'accessories': "Accessories"
        };
        return names[category] || category;
    },

    // Get category color theme
    getCategoryColor(category) {
        const colors = {
            'men': '#3498db',
            'women': '#e74c3c',
            'accessories': '#f39c12'
        };
        return colors[category] || '#2c3e50';
    },

    // Handle responsive image switching
    handleResponsiveCategoryImages() {
        const categoryImages = document.querySelectorAll('.category-img');
        const isMobile = window.innerWidth < 768;

        categoryImages.forEach(img => {
            const currentSrc = img.getAttribute('src');
            let newSrc = currentSrc;

            if (isMobile) {
                // Replace with mobile-optimized images
                newSrc = currentSrc.replace(/w=\d+/, 'w=800').replace(/h=\d+/, 'h=600');
            } else {
                // Use original high-quality images
                newSrc = currentSrc.replace(/w=\d+/, 'w=1200').replace(/h=\d+/, 'h=800');
            }

            if (newSrc !== currentSrc) {
                img.src = newSrc;
            }
        });
    },

    // Add category navigation to header (optional)
    addCategoryNavigation() {
        // This could be used to highlight current category in navigation
        const urlParams = new URLSearchParams(window.location.search);
        const currentCategory = urlParams.get('category');
        
        if (currentCategory) {
            const categoryName = this.getCategoryName(currentCategory);
            document.title = `${categoryName} - Tim Clothing Co.`;
        }
    }
};

// Initialize categories utilities
document.addEventListener('DOMContentLoaded', () => {
    CategoriesUtils.handleResponsiveCategoryImages();
    CategoriesUtils.addCategoryNavigation();
    
    // Re-run responsive image handling on window resize
    window.addEventListener('resize', CategoriesUtils.handleResponsiveCategoryImages);
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FeaturedCategories, CategoriesUtils };
}

// New Arrivals functionality
class NewArrivals {
    constructor() {
        this.productsGrid = document.getElementById('products-grid');
        this.filterButtons = document.querySelectorAll('.control-btn');
        this.viewAllBtn = document.getElementById('view-all-btn');
        this.quickViewModal = document.getElementById('quick-view-modal');
        this.modalClose = document.getElementById('modal-close');
        this.modalBody = document.getElementById('modal-body');
        
        this.products = [];
        this.wishlist = new Set();
        
        this.init();
    }

    init() {
        // Load products data
        this.loadProducts();
        
        // Event listeners
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilter(e.target));
        });
        
        this.viewAllBtn.addEventListener('click', () => this.handleViewAll());
        this.modalClose.addEventListener('click', () => this.closeModal());
        
        // Close modal on outside click
        this.quickViewModal.addEventListener('click', (e) => {
            if (e.target === this.quickViewModal) {
                this.closeModal();
            }
        });
        
        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    loadProducts() {
        // Sample product data - in real app, this would come from an API
        this.products = [
            { id: 1, name: "Mufulira Classic White Tee", category: "men", price: 1200, originalPrice: 1500, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", rating: 4.5, reviewCount: 128, badge: "new", description: "Premium 100% cotton tee with modern cut — breathable and soft." },
            { id: 2, name: "Lusaka Linen Summer Dress", category: "women", price: 2500, originalPrice: 3200, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", rating: 4.8, reviewCount: 89, badge: "sale", description: "Light linen dress, comfortable and perfect for warm weather." },
            { id: 3, name: "Zambezi Leather Strap Watch", category: "accessories", price: 6800, originalPrice: null, image: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", rating: 4.9, reviewCount: 256, badge: "new", description: "Classic leather strap watch with minimalist face and precise movement." },
            { id: 4, name: "Copperbelt Slim Denim", category: "men", price: 4200, originalPrice: 5200, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80", rating: 4.3, reviewCount: 204, badge: null, description: "Stretch denim with tailored slim fit for everyday comfort." },
            { id: 5, name: "Tropical Knit Sweater", category: "women", price: 3800, originalPrice: null, image: "https://images.unsplash.com/photo-1520975919074-6c3a4d5d0b12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", rating: 4.6, reviewCount: 167, badge: "new", description: "Cozy knit sweater made from blended wool for warmth and softness." },
            { id: 6, name: "Sable Polarized Sunglasses", category: "accessories", price: 2100, originalPrice: 2600, image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", rating: 4.7, reviewCount: 93, badge: "sale", description: "Polarized lenses with anti-glare coating and UV protection." },
            { id: 7, name: "Kabwe Tailored Blazer", category: "men", price: 7600, originalPrice: 9200, image: "https://images.unsplash.com/photo-1541099649105-16a7b67d2f7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", rating: 4.8, reviewCount: 58, badge: "new", description: "Tailored blazer in premium fabric, sharp silhouette for formal wear." },
            { id: 8, name: "Victoria Maxi Skirt", category: "women", price: 2100, originalPrice: 2600, image: "https://images.unsplash.com/photo-1520975919074-4f3c9dbae2d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", rating: 4.4, reviewCount: 42, badge: null, description: "Flowy maxi skirt with a comfortable waist and flattering drape." },
            { id: 9, name: "Nomad Canvas Backpack", category: "accessories", price: 3400, originalPrice: null, image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", rating: 4.6, reviewCount: 74, badge: "new", description: "Durable canvas backpack with padded straps and laptop sleeve." },
            { id: 10, name: "Choma Polo Shirt", category: "men", price: 1750, originalPrice: 2200, image: "https://images.unsplash.com/photo-1541099649105-19f2a3d1f60b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", rating: 4.2, reviewCount: 110, badge: null, description: "Classic polo with breathable fabric and neat collar." },
            { id: 11, name: "Kafue Wrap Top", category: "women", price: 1850, originalPrice: null, image: "https://images.unsplash.com/photo-1541099649105-3dfb1b51c9d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", rating: 4.5, reviewCount: 38, badge: null, description: "Versatile wrap top that pairs well with skirts and trousers." },
            { id: 12, name: "Safari Leather Belt", category: "accessories", price: 950, originalPrice: 1200, image: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", rating: 4.3, reviewCount: 26, badge: "sale", description: "Sturdy leather belt with classic buckle for everyday use." }
        ];
        
        // Expose products globally so other pages (product-detail) can read them
        try { window.GLOBAL_PRODUCTS = this.products; } catch (e) { /* ignore */ }
        this.renderProducts();
    }

    renderProducts(filter = 'all') {
        this.productsGrid.innerHTML = '';
        
        const filteredProducts = filter === 'all' 
            ? this.products 
            : this.products.filter(product => product.category === filter);
        
        filteredProducts.forEach((product, index) => {
            const productCard = this.createProductCard(product, index);
            this.productsGrid.appendChild(productCard);
        });
        
        // Add animation with delay
        this.animateProducts();
    }

    createProductCard(product, index) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.animationDelay = `${index * 0.1}s`;
        card.dataset.category = product.category;
        
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
                    <button class="action-btn compare" data-product-id="${product.id}" aria-label="Compare product">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path fill="currentColor" d="M10 18h5v-6h-5v6zm-6 0h5V5H4v13zm12 0h5v-6h-5v6zM10 5v6h11V5H10z"/>
                        </svg>
                    </button>
                </div>
                <button class="quick-view-btn" data-product-id="${product.id}">Quick View</button>
                <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
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
            </div>
        `;
        
        // Add event listeners to the card
        this.addProductCardListeners(card, product);

        // Add to Cart button handler (uses shared Cart helper when available)
        const addToCartBtn = card.querySelector('.add-to-cart-btn');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const qty = 1;

                // Prefer central Cart helper
                if (window.Cart && typeof window.Cart.add === 'function') {
                    window.Cart.add({ id: product.id, name: product.name, price: product.price, qty });
                    // Update header count if available
                    if (document.querySelector('.cart-count')) {
                        const countEl = document.querySelector('.cart-count');
                        const cart = window.Cart.get ? window.Cart.get() : [];
                        const total = cart.reduce((s, i) => s + (i.qty || 0), 0);
                        countEl.textContent = total;
                    }
                } else {
                    // Fallback to localStorage-based cart
                    const key = 'tim_cart_v1';
                    let cart = [];
                    try { cart = JSON.parse(localStorage.getItem(key)) || []; } catch (err) { cart = []; }
                    const existing = cart.find(i => i.id === product.id);
                    if (existing) existing.qty = (existing.qty || 0) + qty; else cart.push({ id: product.id, name: product.name, price: product.price, qty });
                    localStorage.setItem(key, JSON.stringify(cart));
                    const el = document.querySelector('.cart-count'); if(el) el.textContent = cart.reduce((s,i)=>s+(i.qty||0),0);
                }

                // Provide quick visual feedback
                const originalText = addToCartBtn.textContent;
                addToCartBtn.textContent = 'Added ✓';
                addToCartBtn.classList.add('added');
                setTimeout(() => {
                    addToCartBtn.textContent = originalText;
                    addToCartBtn.classList.remove('added');
                }, 1200);
            });
        }

        return card;
    }

    generateStarRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let stars = '';
        
        // Full stars
        for (let i = 0; i < fullStars; i++) {
            stars += '<span class="star">★</span>';
        }
        
        // Half star
        if (hasHalfStar) {
            stars += '<span class="star">★</span>'; // Using full star for simplicity
        }
        
        // Empty stars
        for (let i = 0; i < emptyStars; i++) {
            stars += '<span class="star empty">★</span>';
        }
        
        return stars;
    }

    addProductCardListeners(card, product) {
        const quickViewBtn = card.querySelector('.quick-view-btn');
        const wishlistBtn = card.querySelector('.wishlist');
        const compareBtn = card.querySelector('.compare');
        
        quickViewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.showQuickView(product);
        });
        
        wishlistBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleWishlist(product.id, wishlistBtn);
        });
        
        compareBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.addToCompare(product.id);
        });
        
        // Click on card (excluding buttons)
        card.addEventListener('click', (e) => {
            if (!e.target.closest('button')) {
                this.navigateToProduct(product.id);
            }
        });
    }

    handleFilter(button) {
        // Update active button
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter products
        const filter = button.dataset.filter;
        this.renderProducts(filter);
    }

    handleViewAll() {
        window.location.href = 'products.html';
    }

    showQuickView(product) {
        this.modalBody.innerHTML = this.createQuickViewContent(product);
        this.quickViewModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    createQuickViewContent(product) {
        const discount = product.originalPrice 
            ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
            : 0;
        
        const stars = this.generateStarRating(product.rating);
        
        return `
            <div class="quick-view-content">
                <div class="quick-view-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="quick-view-details">
                    <h2>${product.name}</h2>
                    <div class="quick-view-price">
                        <span class="current-price">${window.Currency ? window.Currency.format(product.price) : 'K' + Number(product.price).toFixed(2)}</span>
                        ${product.originalPrice ? `<span class="original-price">${window.Currency ? window.Currency.format(product.originalPrice) : 'K' + Number(product.originalPrice).toFixed(2)}</span>` : ''}
                        ${discount > 0 ? `<span class="discount">-${discount}%</span>` : ''}
                    </div>
                    <div class="quick-view-rating">
                        <div class="stars">${stars}</div>
                        <span class="rating-count">${product.reviewCount} reviews</span>
                    </div>
                    <p class="quick-view-description">${product.description}</p>
                    <div class="quick-view-actions">
                        <button class="add-to-cart-btn">Add to Cart</button>
                        <button class="wishlist-btn">♡ Wishlist</button>
                    </div>
                    <div class="quick-view-meta">
                        <div class="meta-item">
                            <strong>Category:</strong> ${this.getCategoryName(product.category)}
                        </div>
                        <div class="meta-item">
                            <strong>SKU:</strong> TC${product.id.toString().padStart(3, '0')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    closeModal() {
        this.quickViewModal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset modal content with delay
        setTimeout(() => {
            this.modalBody.innerHTML = '';
        }, 300);
    }

    toggleWishlist(productId, button) {
        if (this.wishlist.has(productId)) {
            this.wishlist.delete(productId);
            button.classList.remove('added');
        } else {
            this.wishlist.add(productId);
            button.classList.add('added');
        }
        
        // Animate the button
        button.style.transform = 'scale(1.2)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
    }

    addToCompare(productId) {
        // Simple compare functionality
        alert(`Product ${productId} added to compare!`);
    }

    navigateToProduct(productId) {
        window.location.href = `product-detail.html?id=${productId}`;
    }

    animateProducts() {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 100);
        });
    }

    getCategoryName(category) {
        const names = {
            'men': "Men's",
            'women': "Women's",
            'accessories': "Accessories"
        };
        return names[category] || category;
    }
}

// Initialize new arrivals when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NewArrivals();
});

// Utility functions for new arrivals section
const NewArrivalsUtils = {
    // Preload product images
    preloadProductImages() {
        const images = document.querySelectorAll('.product-img');
        images.forEach(img => {
            const image = new Image();
            image.src = img.src;
            image.onload = () => {
                img.classList.add('loaded');
            };
        });
    },

    // Handle responsive product grid
    handleResponsiveGrid() {
        const grid = document.getElementById('products-grid');
        if (!grid) return;

        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth < 968;
        
        if (isMobile) {
            grid.style.gridTemplateColumns = '1fr';
        } else if (isTablet) {
            grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
        } else {
            grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
        }
    },

    // Add to cart functionality (to be integrated with main cart)
    addToCart(productId, quantity = 1) {
        // This will be integrated with the main cart functionality
        console.log(`Adding product ${productId} to cart with quantity ${quantity}`);
        
        // Update cart count in header
        const header = window.Header;
        if (header) {
            const currentCount = parseInt(header.cartCount.textContent) || 0;
            header.setCartCount(currentCount + quantity);
        }
    }
};

// Initialize new arrivals utilities
document.addEventListener('DOMContentLoaded', () => {
    NewArrivalsUtils.preloadProductImages();
    NewArrivalsUtils.handleResponsiveGrid();
    
    window.addEventListener('resize', NewArrivalsUtils.handleResponsiveGrid);
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NewArrivals, NewArrivalsUtils };
}

// Promotional Section functionality
class PromotionalSection {
    constructor() {
        this.countdownTimer = document.getElementById('countdown-timer');
        this.shopNowBtn = document.getElementById('shop-now-btn');
        this.viewDealsBtn = document.getElementById('view-deals-btn');
        
        this.countdownEnd = new Date();
        this.countdownEnd.setDate(this.countdownEnd.getDate() + 7); // 7 days from now
        this.countdownEnd.setHours(23, 59, 59, 999); // End of day
        
        this.init();
    }

    init() {
        // Start countdown timer
        this.startCountdown();
        
        // Event listeners
        this.shopNowBtn.addEventListener('click', () => this.handleShopNow());
        this.viewDealsBtn.addEventListener('click', () => this.handleViewDeals());
        
        // Add intersection observer for animations
        this.observePromotionalSection();
        
        // Initialize floating elements
        this.initFloatingElements();
    }

    startCountdown() {
        // Update countdown immediately
        this.updateCountdown();
        
        // Update countdown every second
        this.countdownInterval = setInterval(() => {
            this.updateCountdown();
        }, 1000);
    }

    updateCountdown() {
        const now = new Date().getTime();
        const distance = this.countdownEnd.getTime() - now;
        
        if (distance < 0) {
            // Countdown ended
            clearInterval(this.countdownInterval);
            this.handleCountdownEnd();
            return;
        }
        
        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update display with animation
        this.animateCountdownValue('days', days.toString().padStart(2, '0'));
        this.animateCountdownValue('hours', hours.toString().padStart(2, '0'));
        this.animateCountdownValue('minutes', minutes.toString().padStart(2, '0'));
        this.animateCountdownValue('seconds', seconds.toString().padStart(2, '0'));
    }

    animateCountdownValue(elementId, newValue) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        const currentValue = element.textContent;
        
        if (currentValue !== newValue) {
            // Add animation class
            element.classList.add('changing');
            
            // Update value
            element.textContent = newValue;
            
            // Remove animation class after transition
            setTimeout(() => {
                element.classList.remove('changing');
            }, 300);
        }
    }

    handleCountdownEnd() {
        // Update the promotional section when countdown ends
        const promotionalContent = document.querySelector('.promotional-content');
        
        if (promotionalContent) {
            promotionalContent.innerHTML = `
                <div class="countdown-ended">
                    <h2 class="promotional-title">Sale Ended</h2>
                    <p class="promotional-subtitle">Missed this sale? Don't worry!</p>
                    <p class="promotional-desc">Subscribe to our newsletter to be the first to know about upcoming deals and exclusive offers.</p>
                    <div class="newsletter-signup">
                        <input type="email" placeholder="Enter your email" class="newsletter-input">
                        <button class="promotional-btn primary">Subscribe</button>
                    </div>
                </div>
            `;
            
            // Add styles for ended state
            const style = document.createElement('style');
            style.textContent = `
                .countdown-ended {
                    text-align: center;
                }
                .newsletter-signup {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    margin: 2rem 0;
                    flex-wrap: wrap;
                }
                .newsletter-input {
                    padding: 1rem 1.5rem;
                    border: none;
                    border-radius: 50px;
                    min-width: 300px;
                    font-size: 1rem;
                }
                @media (max-width: 768px) {
                    .newsletter-signup {
                        flex-direction: column;
                        align-items: center;
                    }
                    .newsletter-input {
                        min-width: 250px;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    handleShopNow() {
        // Navigate to products page with sale filter
        window.location.href = 'products.html?sale=true';
        
        // Add click animation
        this.animateButton(this.shopNowBtn);
    }

    handleViewDeals() {
        // Navigate to products page
        window.location.href = 'products.html';
        
        // Add click animation
        this.animateButton(this.viewDealsBtn);
    }

    animateButton(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }

    observePromotionalSection() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    
                    // Add subtle parallax effect
                    this.addParallaxEffect();
                }
            });
        }, { threshold: 0.3 });

        const promotionalSection = document.querySelector('.promotional');
        if (promotionalSection) {
            observer.observe(promotionalSection);
        }
    }

    addParallaxEffect() {
        const promotionalContent = document.querySelector('.promotional-content');
        
        window.addEventListener('scroll', () => {
            if (!promotionalContent) return;
            
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            promotionalContent.style.transform = `translateY(${rate}px)`;
        });
    }

    initFloatingElements() {
        // Additional floating element animations
        const floatingElements = document.querySelectorAll('.floating-element');
        
        floatingElements.forEach((element, index) => {
            // Randomize animation delays and durations
            const delay = index * 1.5;
            const duration = 6 + Math.random() * 4;
            
            element.style.animationDelay = `${delay}s`;
            element.style.animationDuration = `${duration}s`;
        });
    }

    // Method to update sale details dynamically
    updateSaleDetails(title, subtitle, endDate) {
        const titleEl = document.querySelector('.promotional-title');
        const subtitleEl = document.querySelector('.promotional-subtitle');
        
        if (titleEl && title) titleEl.textContent = title;
        if (subtitleEl && subtitle) subtitleEl.textContent = subtitle;
        if (endDate) this.countdownEnd = new Date(endDate);
    }

    // Method to extend countdown (for admin use)
    extendCountdown(hours) {
        this.countdownEnd.setHours(this.countdownEnd.getHours() + hours);
        this.updateCountdown();
    }
}

// Initialize promotional section when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PromotionalSection();
});

// Utility functions for promotional section
const PromotionalUtils = {
    // Preload background image
    preloadBackgroundImage() {
        const bgUrl = 'https://images.unsplash.com/photo-1558769132-cb25e5b8b7b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';
        const img = new Image();
        img.src = bgUrl;
        img.onload = () => {
            document.querySelector('.promotional-bg').style.backgroundImage = `url('${bgUrl}')`;
        };
    },

    // Add confetti effect for special occasions
    createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
        const promotionalSection = document.querySelector('.promotional');
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -20px;
                left: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.5 + 0.5};
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                animation: fall ${Math.random() * 3 + 2}s linear forwards;
            `;
            
            promotionalSection.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
        
        // Add fall animation
        if (!document.querySelector('#confetti-animation')) {
            const style = document.createElement('style');
            style.id = 'confetti-animation';
            style.textContent = `
                @keyframes fall {
                    to {
                        transform: translateY(100vh) rotate(${Math.random() * 360}deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    },

    // Handle seasonal themes
    applySeasonalTheme(season) {
        const promotionalSection = document.querySelector('.promotional');
        const themes = {
            summer: {
                gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                buttonColor: 'linear-gradient(135deg, #ff6b6b, #ee5a24)'
            },
            winter: {
                gradient: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
                buttonColor: 'linear-gradient(135deg, #a29bfe, #6c5ce7)'
            },
            spring: {
                gradient: 'linear-gradient(135deg, #81ecec 0%, #00cec9 100%)',
                buttonColor: 'linear-gradient(135deg, #fd79a8, #e84393)'
            },
            autumn: {
                gradient: 'linear-gradient(135deg, #e17055 0%, #d63031 100%)',
                buttonColor: 'linear-gradient(135deg, #fdcb6e, #e17055)'
            }
        };
        
        const theme = themes[season] || themes.summer;
        
        if (promotionalSection) {
            promotionalSection.style.background = theme.gradient;
            document.querySelector('.promotional-overlay').style.background = theme.gradient;
            
            const primaryButton = document.querySelector('.promotional-btn.primary');
            if (primaryButton) {
                primaryButton.style.background = theme.buttonColor;
            }
        }
    }
};

// Initialize promotional utilities
document.addEventListener('DOMContentLoaded', () => {
    PromotionalUtils.preloadBackgroundImage();
    
    // Apply seasonal theme based on current month
    const month = new Date().getMonth();
    let season = 'summer';
    if (month >= 2 && month <= 4) season = 'spring';
    else if (month >= 5 && month <= 7) season = 'summer';
    else if (month >= 8 && month <= 10) season = 'autumn';
    else season = 'winter';
    
    PromotionalUtils.applySeasonalTheme(season);
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PromotionalSection, PromotionalUtils };
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