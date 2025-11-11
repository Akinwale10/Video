// OMOOLA PHARMACY & STORES - Main JavaScript
// Initialize cart
const cart = new ShoppingCart();

// DOM Elements
const cartButton = document.getElementById('cartButton');
const cartDrawer = document.getElementById('cartDrawer');
const cartClose = document.getElementById('cartClose');
const overlay = document.getElementById('overlay');
const productsGrid = document.getElementById('productsGrid');
const offersGrid = document.getElementById('offersGrid');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

// Prescription upload modal elements
const rxModal = document.getElementById('rxModal');
const uploadRxBtn = document.getElementById('uploadRxBtn');
const heroUploadBtn = document.getElementById('heroUploadBtn');
const uploadRxLink = document.getElementById('uploadRxLink');
const rxModalClose = document.getElementById('rxModalClose');
const uploadArea = document.getElementById('uploadArea');
const rxFileInput = document.getElementById('rxFileInput');
const browseBtn = document.getElementById('browseBtn');
const uploadPreview = document.getElementById('uploadPreview');
const previewImage = document.getElementById('previewImage');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const rxForm = document.getElementById('rxForm');

// Search elements
const navSearchInput = document.getElementById('navSearchInput');
const heroSearchInput = document.getElementById('heroSearchInput');
const searchSuggestionsEl = document.getElementById('searchSuggestions');

// Category carousel
const categoriesWrapper = document.getElementById('categoriesWrapper');
const categoriesPrev = document.getElementById('categoriesPrev');
const categoriesNext = document.getElementById('categoriesNext');

// Mobile menu
const mobileMenuToggle = document.getElementById('mobileMenuToggle');

// ===================================
// Product Rendering
// ===================================
function renderProduct(product, isOffer = false) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.productId = product.id;

    const badgesHTML = product.badges.map(badge => {
        const badgeClass = badge === 'OTC' ? 'otc' : 
                          badge === 'Rx Required' ? 'rx' : 
                          badge === 'Sale' ? 'sale' : '';
        return `<span class="badge ${badgeClass}">${badge}</span>`;
    }).join('');

    const priceHTML = isOffer && product.originalPrice ? 
        `<div class="product-price">
            <span style="text-decoration: line-through; color: var(--gray-400); font-size: 1rem; margin-right: 0.5rem;">₦${product.originalPrice.toLocaleString()}</span>
            <span>₦${product.price.toLocaleString()}</span>
        </div>` :
        `<div class="product-price">₦${product.price.toLocaleString()}</div>`;

    card.innerHTML = `
        <div class="product-image">
            <div class="product-badges">${badgesHTML}</div>
            <div style="font-size: 5rem;">${product.image}</div>
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
        </div>
        <div class="product-footer">
            ${priceHTML}
            <div class="product-actions">
                <div class="quantity-selector" style="display: none;">
                    <button class="quantity-btn decrease" aria-label="Decrease quantity">-</button>
                    <span class="quantity-value">1</span>
                    <button class="quantity-btn increase" aria-label="Increase quantity">+</button>
                </div>
                <button class="add-to-cart-btn" data-product-id="${product.id}">Add</button>
            </div>
        </div>
    `;

    // Add to cart functionality
    const addBtn = card.querySelector('.add-to-cart-btn');
    const quantitySelector = card.querySelector('.quantity-selector');
    const quantityValue = card.querySelector('.quantity-value');
    const decreaseBtn = card.querySelector('.decrease');
    const increaseBtn = card.querySelector('.increase');

    let quantity = 1;

    addBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Check if prescription required
        if (product.requiresPrescription) {
            openRxModal();
            return;
        }

        cart.addItem(product, quantity);
        
        // Animation
        card.classList.add('adding');
        addBtn.classList.add('added');
        addBtn.textContent = 'Added!';
        
        setTimeout(() => {
            card.classList.remove('adding');
            addBtn.classList.remove('added');
            addBtn.textContent = 'Add';
        }, 1000);

        // Show cart briefly
        showNotification('Item added to cart!');
    });

    increaseBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        quantity++;
        quantityValue.textContent = quantity;
    });

    decreaseBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        if (quantity > 1) {
            quantity--;
            quantityValue.textContent = quantity;
        }
    });

    // Show product details on card click
    card.addEventListener('click', () => {
        showProductDetails(product);
    });

    return card;
}

function renderProducts() {
    productsGrid.innerHTML = '';
    products.forEach(product => {
        productsGrid.appendChild(renderProduct(product, false));
    });
}

function renderOffers() {
    offersGrid.innerHTML = '';
    offers.forEach(offer => {
        offersGrid.appendChild(renderProduct(offer, true));
    });
}

// ===================================
// Cart Drawer
// ===================================
function openCart() {
    cartDrawer.classList.add('active');
    overlay.classList.add('active');
    renderCartItems();
}

function closeCart() {
    cartDrawer.classList.remove('active');
    overlay.classList.remove('active');
}

function renderCartItems() {
    if (cart.items.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon">🛒</div>
                <p>Your cart is empty</p>
                <p style="font-size: 0.875rem; color: var(--gray-500); margin-top: 0.5rem;">
                    Add items to get started
                </p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.items.map(item => `
            <div class="cart-item" data-item-id="${item.id}">
                <div class="cart-item-image">${item.image}</div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">₦${item.price.toLocaleString()}</div>
                    <div class="cart-item-actions">
                        <div class="quantity-selector">
                            <button class="quantity-btn decrease-cart" data-id="${item.id}" aria-label="Decrease quantity">-</button>
                            <span class="quantity-value">${item.quantity}</span>
                            <button class="quantity-btn increase-cart" data-id="${item.id}" aria-label="Increase quantity">+</button>
                        </div>
                        <button class="cart-item-remove" data-id="${item.id}">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');

        // Add event listeners
        document.querySelectorAll('.increase-cart').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                const item = cart.items.find(i => i.id === id);
                if (item) {
                    cart.updateQuantity(id, item.quantity + 1);
                    renderCartItems();
                    updateCartTotal();
                }
            });
        });

        document.querySelectorAll('.decrease-cart').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                const item = cart.items.find(i => i.id === id);
                if (item && item.quantity > 1) {
                    cart.updateQuantity(id, item.quantity - 1);
                    renderCartItems();
                    updateCartTotal();
                }
            });
        });

        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                cart.removeItem(id);
                renderCartItems();
                updateCartTotal();
                showNotification('Item removed from cart');
            });
        });
    }

    updateCartTotal();
}

function updateCartTotal() {
    const total = cart.getTotal();
    cartTotal.textContent = `₦${total.toLocaleString()}`;
}

// ===================================
// Prescription Upload Modal
// ===================================
function openRxModal() {
    rxModal.classList.add('active');
    overlay.classList.add('active');
}

function closeRxModal() {
    rxModal.classList.remove('active');
    overlay.classList.remove('active');
    resetUploadForm();
}

function resetUploadForm() {
    uploadArea.style.display = 'block';
    uploadPreview.style.display = 'none';
    rxFileInput.value = '';
    rxForm.reset();
    progressFill.style.width = '0%';
    progressText.textContent = 'Uploading... 0%';
}

// File upload handling
uploadArea.addEventListener('click', () => {
    rxFileInput.click();
});

browseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    rxFileInput.click();
});

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--primary-purple)';
    uploadArea.style.background = 'rgba(106, 76, 255, 0.05)';
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.borderColor = '';
    uploadArea.style.background = '';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '';
    uploadArea.style.background = '';
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFileUpload(files[0]);
    }
});

rxFileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFileUpload(e.target.files[0]);
    }
});

function handleFileUpload(file) {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
        showNotification('Please upload an image or PDF file', 'error');
        return;
    }

    // Show preview
    uploadArea.style.display = 'none';
    uploadPreview.style.display = 'block';

    // For images, show preview
    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        previewImage.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ctext y=".9em" font-size="90"%3E📄%3C/text%3E%3C/svg%3E';
    }

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            progressText.textContent = 'Upload complete!';
        }
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `Uploading... ${Math.round(progress)}%`;
    }, 200);
}

// Prescription form submission
rxForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        patientName: document.getElementById('patientName').value,
        patientPhone: document.getElementById('patientPhone').value,
        deliveryPreference: document.querySelector('input[name="delivery"]:checked').value,
        notes: document.getElementById('rxNotes').value
    };

    console.log('Prescription submitted:', formData);
    
    showNotification('Prescription uploaded successfully! Our pharmacist will review it shortly.', 'success');
    closeRxModal();
});

// ===================================
// Search Functionality
// ===================================
function handleSearch(input, suggestionsEl) {
    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            suggestionsEl.classList.remove('active');
            return;
        }

        const filtered = searchSuggestions.filter(item => 
            item.toLowerCase().includes(query)
        );

        if (filtered.length > 0) {
            suggestionsEl.innerHTML = filtered.slice(0, 5).map(item => 
                `<div class="suggestion-item">${item}</div>`
            ).join('');
            suggestionsEl.classList.add('active');

            // Add click handlers
            suggestionsEl.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', () => {
                    input.value = item.textContent;
                    suggestionsEl.classList.remove('active');
                    performSearch(item.textContent);
                });
            });
        } else {
            suggestionsEl.classList.remove('active');
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            suggestionsEl.classList.remove('active');
            performSearch(input.value);
        }
    });
}

function performSearch(query) {
    console.log('Searching for:', query);
    showNotification(`Searching for "${query}"...`);
    // In a real application, this would filter products
}

// ===================================
// Category Carousel
// ===================================
function setupCarousel() {
    const scrollAmount = 300;

    categoriesPrev.addEventListener('click', () => {
        categoriesWrapper.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    categoriesNext.addEventListener('click', () => {
        categoriesWrapper.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
}

// ===================================
// Notifications
// ===================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? 'var(--error)' : type === 'success' ? 'var(--success)' : 'var(--primary-purple)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-xl);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
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
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Product Details Modal
// ===================================
function showProductDetails(product) {
    // This would open a detailed product modal
    console.log('Show product details for:', product);
    showNotification(`Viewing ${product.name}`);
}

// ===================================
// Checkout
// ===================================
checkoutBtn?.addEventListener('click', () => {
    if (cart.items.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }

    // Check if any items require prescription
    const requiresRx = cart.items.some(item => item.requiresPrescription);
    const hasRxCheckbox = document.getElementById('hasRxCheckbox');
    
    if (requiresRx && !hasRxCheckbox.checked) {
        showNotification('Please confirm you have a valid prescription or upload one', 'error');
        return;
    }

    // Navigate to checkout page
    window.location.href = 'checkout.html';
});

// ===================================
// Event Listeners
// ===================================
cartButton?.addEventListener('click', openCart);
cartClose?.addEventListener('click', closeCart);
overlay?.addEventListener('click', () => {
    closeCart();
    closeRxModal();
});

uploadRxBtn?.addEventListener('click', openRxModal);
heroUploadBtn?.addEventListener('click', openRxModal);
uploadRxLink?.addEventListener('click', openRxModal);
rxModalClose?.addEventListener('click', closeRxModal);

// Search
if (navSearchInput && searchSuggestionsEl) {
    handleSearch(navSearchInput, searchSuggestionsEl);
}
if (heroSearchInput) {
    handleSearch(heroSearchInput, document.createElement('div'));
}

// Mobile menu toggle
mobileMenuToggle?.addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links');
    const navSearch = document.querySelector('.nav-search');
    // Toggle mobile menu (implementation needed)
    console.log('Mobile menu toggled');
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-search')) {
        document.querySelectorAll('.search-suggestions').forEach(el => {
            el.classList.remove('active');
        });
    }
});

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    showNotification('Thank you for subscribing!', 'success');
    e.target.reset();
});

// ===================================
// Initialize
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderOffers();
    setupCarousel();
    cart.updateCartBadge();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
});

// ===================================
// Accessibility: Keyboard Navigation
// ===================================
document.addEventListener('keydown', (e) => {
    // Escape key closes modals
    if (e.key === 'Escape') {
        closeCart();
        closeRxModal();
    }
});
