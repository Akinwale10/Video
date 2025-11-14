// ==========================================
// Omoola Pharmacy & Stores - Main JavaScript
// Frontend Functionality
// ==========================================

// Firebase Configuration (will be loaded from separate config file)
let firebaseConfig = null;
let db = null;
let auth = null;

// Sample product data (will be replaced with Firebase data)
const sampleProducts = [
    {
        id: 1,
        name: "Paracetamol 500mg",
        description: "Fast relief for pain and fever",
        price: 850,
        category: "medicines",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400",
        badge: "In Stock",
        badgeClass: "in-stock",
        rating: 4.5,
        reviews: 128,
        stock: 50,
        requiresPrescription: false
    },
    {
        id: 2,
        name: "Vitamin C 1000mg",
        description: "Immune system support supplement",
        price: 2500,
        category: "health",
        image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400",
        badge: "Best Seller",
        badgeClass: "",
        rating: 5.0,
        reviews: 256,
        stock: 100,
        requiresPrescription: false
    },
    {
        id: 3,
        name: "Antibacterial Hand Sanitizer",
        description: "99.9% germ protection",
        price: 1200,
        category: "health",
        image: "https://images.unsplash.com/photo-1584744982493-c48f3e07e7af?w=400",
        badge: "Sale",
        badgeClass: "",
        rating: 4.8,
        reviews: 89,
        stock: 75,
        requiresPrescription: false
    },
    {
        id: 4,
        name: "Multivitamin Complex",
        description: "Complete daily nutrition supplement",
        price: 3500,
        category: "health",
        image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400",
        badge: "New",
        badgeClass: "",
        rating: 4.7,
        reviews: 45,
        stock: 30,
        requiresPrescription: false
    },
    {
        id: 5,
        name: "Ibuprofen 400mg",
        description: "Anti-inflammatory pain relief",
        price: 1100,
        category: "medicines",
        image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400",
        badge: "Prescription Required",
        badgeClass: "prescription",
        rating: 4.6,
        reviews: 178,
        stock: 40,
        requiresPrescription: true
    },
    {
        id: 6,
        name: "First Aid Kit",
        description: "Complete emergency medical supplies",
        price: 4500,
        category: "health",
        image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400",
        badge: "In Stock",
        badgeClass: "in-stock",
        rating: 4.9,
        reviews: 67,
        stock: 25,
        requiresPrescription: false
    },
    {
        id: 7,
        name: "Omega-3 Fish Oil",
        description: "Heart and brain health support",
        price: 5200,
        category: "health",
        image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400",
        badge: "Best Seller",
        badgeClass: "",
        rating: 4.8,
        reviews: 134,
        stock: 60,
        requiresPrescription: false
    },
    {
        id: 8,
        name: "Digital Thermometer",
        description: "Fast and accurate temperature reading",
        price: 2800,
        category: "health",
        image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400",
        badge: "New",
        badgeClass: "",
        rating: 4.4,
        reviews: 92,
        stock: 35,
        requiresPrescription: false
    }
];

// Shopping Cart
class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.updateCartBadge();
    }

    loadCart() {
        const cartData = localStorage.getItem('omoola_cart');
        return cartData ? JSON.parse(cartData) : [];
    }

    saveCart() {
        localStorage.setItem('omoola_cart', JSON.stringify(this.items));
        this.updateCartBadge();
    }

    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                ...product,
                quantity: quantity
            });
        }
        
        this.saveCart();
        this.showNotification(`${product.name} added to cart!`, 'success');
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.saveCart();
            }
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    clear() {
        this.items = [];
        this.saveCart();
    }

    updateCartBadge() {
        const badge = document.getElementById('cartBadge');
        if (badge) {
            const count = this.getItemCount();
            badge.textContent = count;
            badge.style.display = count > 0 ? 'block' : 'none';
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: ${type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize cart
const cart = new ShoppingCart();

// ==========================================
// Page Initialization
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initializeMobileMenu();
    initializeSearch();
    loadProducts();
    initializeNewsletter();
    checkAdminAuth();
    
    // Add animation styles
    addAnimationStyles();
});

// ==========================================
// Mobile Menu
// ==========================================

function initializeMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const menu = document.getElementById('navMenu');
    
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            toggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!toggle.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.remove('active');
                toggle.classList.remove('active');
            }
        });
    }
}

// ==========================================
// Search Functionality
// ==========================================

function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchSuggestions = document.getElementById('searchSuggestions');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            
            if (query.length < 2) {
                searchSuggestions.classList.remove('show');
                searchSuggestions.innerHTML = '';
                return;
            }
            
            // Filter products
            const results = sampleProducts.filter(product => 
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
            );
            
            if (results.length > 0) {
                displaySearchSuggestions(results.slice(0, 5));
            } else {
                searchSuggestions.classList.remove('show');
            }
        });
        
        // Close suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
                searchSuggestions.classList.remove('show');
            }
        });
    }
}

function displaySearchSuggestions(products) {
    const searchSuggestions = document.getElementById('searchSuggestions');
    
    searchSuggestions.innerHTML = products.map(product => `
        <div class="suggestion-item" onclick="goToProduct(${product.id})">
            <strong>${product.name}</strong> - ₦${product.price.toLocaleString()}
        </div>
    `).join('');
    
    searchSuggestions.classList.add('show');
}

function goToProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}

// ==========================================
// Load Products
// ==========================================

function loadProducts() {
    // Load featured products
    const featuredContainer = document.getElementById('featuredProducts');
    if (featuredContainer) {
        const featured = sampleProducts.slice(0, 4);
        displayProducts(featured, featuredContainer);
    }
    
    // Load best sellers
    const bestSellersContainer = document.getElementById('bestSellers');
    if (bestSellersContainer) {
        const bestSellers = sampleProducts
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 4);
        displayProducts(bestSellers, bestSellersContainer);
    }
}

function displayProducts(products, container) {
    container.innerHTML = products.map(product => createProductCard(product)).join('');
}

function createProductCard(product) {
    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <span class="product-badge ${product.badgeClass}">${product.badge}</span>
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    <span class="stars">${getStarRating(product.rating)}</span>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-footer">
                    <span class="product-price">₦${product.price.toLocaleString()}</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '⭐';
    }
    if (halfStar) {
        stars += '⭐';
    }
    
    return stars;
}

// ==========================================
// Add to Cart
// ==========================================

function addToCart(productId) {
    const product = sampleProducts.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// ==========================================
// Newsletter Subscription
// ==========================================

function initializeNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Here you would send to backend/Firebase
            cart.showNotification('Thank you for subscribing!', 'success');
            emailInput.value = '';
        });
    }
}

// ==========================================
// Admin Authentication Check
// ==========================================

function checkAdminAuth() {
    // Check if user is authenticated as admin
    const isAdmin = localStorage.getItem('omoola_admin_auth') === 'true';
    const adminLink = document.querySelector('.admin-link-item');
    
    if (adminLink && isAdmin) {
        adminLink.style.display = 'block';
    }
}

// ==========================================
// Loading Overlay
// ==========================================

function showLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.display = 'flex';
    }
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

// ==========================================
// Animation Styles
// ==========================================

function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ==========================================
// Filter and Sort Functions
// ==========================================

function filterProducts(category) {
    if (category === 'all') {
        return sampleProducts;
    }
    return sampleProducts.filter(product => product.category === category);
}

function sortProducts(products, sortBy) {
    const sorted = [...products];
    
    switch (sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'newest':
            return sorted.sort((a, b) => b.id - a.id);
        default:
            return sorted;
    }
}

function searchProducts(query) {
    return sampleProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
}

// ==========================================
// Utility Functions
// ==========================================

function formatCurrency(amount) {
    return `₦${amount.toLocaleString()}`;
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-NG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// ==========================================
// Export functions for use in other files
// ==========================================

window.cart = cart;
window.addToCart = addToCart;
window.goToProduct = goToProduct;
window.showLoading = showLoading;
window.hideLoading = hideLoading;
window.formatCurrency = formatCurrency;
window.sampleProducts = sampleProducts;
