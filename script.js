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

// Footer info modal elements
const footerInfoModal = document.getElementById('footerInfoModal');
const footerInfoTitle = document.getElementById('footerInfoTitle');
const footerInfoContent = document.getElementById('footerInfoContent');
const footerInfoClose = document.getElementById('footerInfoClose');

// Search elements
const navSearchInput = document.getElementById('navSearchInput');
const searchSuggestionsEl = document.getElementById('searchSuggestions');

// Category carousel
const categoriesWrapper = document.getElementById('categoriesWrapper');
const categoriesPrev = document.getElementById('categoriesPrev');
const categoriesNext = document.getElementById('categoriesNext');

// Mobile menu
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const categoriesDropdown = document.getElementById('categoriesDropdown');
const categoriesSubmenu = document.getElementById('categoriesSubmenu');
const mobileUploadRx = document.getElementById('mobileUploadRx');

// Floating buttons
const scrollTopBtn = document.getElementById('scrollTopBtn');

// Hero CTA buttons
const shopNowBtn = document.getElementById('shopNowBtn');
const exploreCategoriesBtn = document.getElementById('exploreCategoriesBtn');

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

        // Search in products and suggestions
        const productMatches = [...products, ...offers].filter(item => 
            item.name.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );

        const suggestionMatches = searchSuggestions.filter(item => 
            item.toLowerCase().includes(query)
        );

        const allMatches = [
            ...new Set([
                ...productMatches.map(p => p.name),
                ...suggestionMatches
            ])
        ];

        if (allMatches.length > 0) {
            suggestionsEl.innerHTML = allMatches.slice(0, 8).map((item, index) => {
                const matchedProduct = productMatches.find(p => p.name === item);
                if (matchedProduct) {
                    return `
                        <div class="suggestion-item suggestion-product" data-product-id="${matchedProduct.id}">
                            <span class="suggestion-icon">${matchedProduct.image}</span>
                            <div class="suggestion-details">
                                <div class="suggestion-name">${highlightMatch(item, query)}</div>
                                <div class="suggestion-price">₦${matchedProduct.price.toLocaleString()}</div>
                            </div>
                        </div>
                    `;
                } else {
                    return `
                        <div class="suggestion-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                            </svg>
                            <span>${highlightMatch(item, query)}</span>
                        </div>
                    `;
                }
            }).join('');
            suggestionsEl.classList.add('active');

            // Add click handlers
            suggestionsEl.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', () => {
                    const productId = item.dataset.productId;
                    if (productId) {
                        // Find and show product details
                        const product = [...products, ...offers].find(p => p.id === parseInt(productId));
                        if (product) {
                            showProductDetails(product);
                        }
                    } else {
                        input.value = item.textContent.trim();
                        performSearch(item.textContent.trim());
                    }
                    suggestionsEl.classList.remove('active');
                });
            });
        } else {
            suggestionsEl.innerHTML = `
                <div class="suggestion-item suggestion-empty">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <span>No results found for "${query}"</span>
                </div>
            `;
            suggestionsEl.classList.add('active');
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            suggestionsEl.classList.remove('active');
            performSearch(input.value);
        }
    });

    // Clear button functionality
    input.addEventListener('focus', () => {
        if (input.value.length >= 2) {
            const query = input.value.toLowerCase().trim();
            // Trigger search to show suggestions
            input.dispatchEvent(new Event('input'));
        }
    });
}

function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<strong>$1</strong>');
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
    closeFooterInfoModal();
    // Close mobile menu
    mobileMenuToggle?.classList.remove('active');
    mobileMenu?.classList.remove('active');
});

uploadRxBtn?.addEventListener('click', openRxModal);
uploadRxLink?.addEventListener('click', openRxModal);
rxModalClose?.addEventListener('click', closeRxModal);

// Hero CTA buttons
shopNowBtn?.addEventListener('click', () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});

exploreCategoriesBtn?.addEventListener('click', () => {
    const categoriesSection = document.getElementById('categories');
    if (categoriesSection) {
        categoriesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});

// Search
if (navSearchInput && searchSuggestionsEl) {
    handleSearch(navSearchInput, searchSuggestionsEl);
}

// Mobile menu toggle
mobileMenuToggle?.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    mobileMenu?.classList.toggle('active');
    overlay?.classList.toggle('active');
});

mobileMenuClose?.addEventListener('click', () => {
    mobileMenuToggle?.classList.remove('active');
    mobileMenu?.classList.remove('active');
    overlay?.classList.remove('active');
});

// Categories dropdown in mobile menu
categoriesDropdown?.addEventListener('click', () => {
    categoriesDropdown.classList.toggle('active');
    categoriesSubmenu?.classList.toggle('active');
});

// Mobile upload prescription
mobileUploadRx?.addEventListener('click', () => {
    mobileMenuToggle?.classList.remove('active');
    mobileMenu?.classList.remove('active');
    openRxModal();
});

// Scroll to top button
let scrollTimeout;
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollPosition > 300) {
        if (scrollTopBtn && scrollTopBtn.style.display === 'none') {
            scrollTopBtn.style.display = 'flex';
        }
    } else {
        if (scrollTopBtn && scrollTopBtn.style.display !== 'none') {
            scrollTopBtn.classList.add('hiding');
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                scrollTopBtn.style.display = 'none';
                scrollTopBtn.classList.remove('hiding');
            }, 300);
        }
    }
});

scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
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
// Footer Information Modal
// ===================================
const footerInfo = {
    about: {
        title: "About Us",
        content: `
            <h4>Welcome to OMOOLA PHARMACY & STORES</h4>
            <p>OMOOLA Pharmacy & Stores is your trusted healthcare partner, committed to providing quality medicines and everyday essentials with convenience and care. Established with a vision to make healthcare accessible to everyone, we combine traditional pharmacy values with modern technology.</p>
            <p><strong>Our Mission:</strong> To deliver exceptional healthcare services and quality products to our community while ensuring affordability and accessibility.</p>
            <p><strong>Our Vision:</strong> To become the most trusted name in healthcare delivery, bringing wellness to every doorstep.</p>
            <p>We are licensed by the Pharmacists Council of Nigeria (PCN) and maintain the highest standards of pharmaceutical care.</p>
        `
    },
    pharmacists: {
        title: "Our Pharmacists",
        content: `
            <h4>Licensed & Experienced Professionals</h4>
            <p>Our team consists of highly qualified and licensed pharmacists who are dedicated to your health and wellbeing. Each member of our pharmacy team is registered with the Pharmacists Council of Nigeria (PCN) and undergoes continuous professional development.</p>
            <p><strong>What Our Pharmacists Offer:</strong></p>
            <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">
                <li>Free medication counseling and consultation</li>
                <li>Prescription verification and drug interaction checks</li>
                <li>Advice on over-the-counter medications</li>
                <li>Health screening and wellness advice</li>
                <li>Medication therapy management</li>
            </ul>
            <p>Available for consultation Monday - Saturday, 8:00 AM - 8:00 PM</p>
        `
    },
    locator: {
        title: "Store Locator",
        content: `
            <h4>Find a Store Near You</h4>
            <p><strong>Main Branch:</strong><br>
            123 Health Avenue, Ikeja, Lagos<br>
            Phone: +234 801 234 5678<br>
            Hours: Mon-Sat 8:00 AM - 8:00 PM, Sun 10:00 AM - 6:00 PM</p>
            
            <p><strong>Victoria Island Branch:</strong><br>
            45 Wellness Road, Victoria Island, Lagos<br>
            Phone: +234 802 345 6789<br>
            Hours: Mon-Sat 8:00 AM - 8:00 PM, Sun 10:00 AM - 6:00 PM</p>
            
            <p><strong>Lekki Branch:</strong><br>
            78 Care Street, Lekki Phase 1, Lagos<br>
            Phone: +234 803 456 7890<br>
            Hours: Mon-Sat 8:00 AM - 8:00 PM, Sun 10:00 AM - 6:00 PM</p>
            
            <p style="margin-top: 1rem; padding: 1rem; background: rgba(106, 76, 255, 0.1); border-radius: 8px;">
                <strong>Delivery Available:</strong> We deliver to all locations across Lagos and neighboring states. Same-day delivery available for orders placed before 2 PM.
            </p>
        `
    },
    careers: {
        title: "Careers at OMOOLA",
        content: `
            <h4>Join Our Team</h4>
            <p>We're always looking for passionate, dedicated professionals to join our growing team. At OMOOLA, we believe in nurturing talent and providing opportunities for career growth.</p>
            <p><strong>Current Opportunities:</strong></p>
            <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">
                <li>Licensed Pharmacists</li>
                <li>Pharmacy Technicians</li>
                <li>Customer Service Representatives</li>
                <li>Delivery Riders</li>
                <li>Store Managers</li>
            </ul>
            <p><strong>What We Offer:</strong></p>
            <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">
                <li>Competitive salary and benefits</li>
                <li>Professional development opportunities</li>
                <li>Health insurance coverage</li>
                <li>Positive work environment</li>
                <li>Career advancement opportunities</li>
            </ul>
            <p style="margin-top: 1rem;">To apply, send your CV to <strong>careers@omoolapharmacy.com</strong></p>
        `
    },
    contact: {
        title: "Contact Us",
        content: `
            <h4>Get in Touch</h4>
            <p>We're here to help! Reach out to us through any of the following channels:</p>
            <p><strong>Customer Service:</strong><br>
            Phone: +234 801 234 5678<br>
            Email: support@omoolapharmacy.com<br>
            Hours: Mon-Sat 8:00 AM - 8:00 PM</p>
            
            <p><strong>WhatsApp:</strong><br>
            +234 801 234 5678<br>
            (Available for quick inquiries and orders)</p>
            
            <p><strong>Emergency Prescriptions:</strong><br>
            Phone: +234 809 876 5432<br>
            Available 24/7 for urgent medication needs</p>
            
            <p style="margin-top: 1rem;"><strong>Head Office:</strong><br>
            123 Health Avenue, Ikeja, Lagos, Nigeria</p>
            
            <p style="margin-top: 1rem; font-style: italic;">We typically respond to all inquiries within 2 hours during business hours.</p>
        `
    },
    track: {
        title: "Track Your Order",
        content: `
            <h4>Order Tracking</h4>
            <p>Stay updated on your order status with our real-time tracking system.</p>
            <p><strong>How to Track:</strong></p>
            <ol style="margin-left: 1.5rem; margin-top: 0.5rem;">
                <li>Check your email for the order confirmation and tracking number</li>
                <li>Visit our website and click on "Track Order"</li>
                <li>Enter your order number and email address</li>
                <li>View real-time updates on your delivery status</li>
            </ol>
            <p style="margin-top: 1rem;"><strong>Delivery Status Updates:</strong></p>
            <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">
                <li><strong>Order Confirmed:</strong> We've received your order</li>
                <li><strong>Processing:</strong> Your order is being prepared</li>
                <li><strong>Out for Delivery:</strong> Your order is on the way</li>
                <li><strong>Delivered:</strong> Order successfully delivered</li>
            </ul>
            <p style="margin-top: 1rem;">For tracking assistance, contact us at +234 801 234 5678</p>
        `
    },
    return: {
        title: "Return Policy",
        content: `
            <h4>Our Return & Refund Policy</h4>
            <p>Your satisfaction is our priority. We accept returns under the following conditions:</p>
            
            <p><strong>Eligible for Return:</strong></p>
            <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">
                <li>Wrong item delivered</li>
                <li>Damaged or expired products</li>
                <li>Manufacturing defects</li>
                <li>Items returned within 7 days of delivery</li>
            </ul>
            
            <p style="margin-top: 1rem;"><strong>Not Eligible for Return:</strong></p>
            <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">
                <li>Prescription medications (due to regulatory requirements)</li>
                <li>Opened or used products</li>
                <li>Products without original packaging</li>
            </ul>
            
            <p style="margin-top: 1rem;"><strong>Return Process:</strong></p>
            <ol style="margin-left: 1.5rem; margin-top: 0.5rem;">
                <li>Contact customer service within 7 days</li>
                <li>Provide order number and reason for return</li>
                <li>Return product in original packaging</li>
                <li>Refund processed within 5-7 business days</li>
            </ol>
            
            <p style="margin-top: 1rem;">Contact us at support@omoolapharmacy.com for return requests.</p>
        `
    },
    faqs: {
        title: "Frequently Asked Questions",
        content: `
            <h4>Common Questions</h4>
            
            <p><strong>Q: Do I need a prescription to order medicines?</strong><br>
            A: Prescription medications require a valid prescription from a licensed healthcare provider. Over-the-counter (OTC) medications can be ordered without a prescription.</p>
            
            <p style="margin-top: 1rem;"><strong>Q: How long does delivery take?</strong><br>
            A: Same-day delivery is available for orders placed before 2 PM within Lagos. Other locations receive delivery within 1-3 business days.</p>
            
            <p style="margin-top: 1rem;"><strong>Q: What payment methods do you accept?</strong><br>
            A: We accept Paystack, Mastercard, Visa, bank transfers, and cash on delivery.</p>
            
            <p style="margin-top: 1rem;"><strong>Q: Can I cancel my order?</strong><br>
            A: Yes, orders can be cancelled before processing. Contact customer service immediately at +234 801 234 5678.</p>
            
            <p style="margin-top: 1rem;"><strong>Q: Are your medications genuine?</strong><br>
            A: Yes, we source all medications from licensed distributors and manufacturers. All products are verified for authenticity.</p>
            
            <p style="margin-top: 1rem;"><strong>Q: Do you offer consultations?</strong><br>
            A: Yes, our licensed pharmacists are available for free consultations during business hours.</p>
        `
    },
    privacy: {
        title: "Privacy Policy",
        content: `
            <h4>Your Privacy Matters</h4>
            <p>OMOOLA Pharmacy & Stores is committed to protecting your privacy and personal information.</p>
            
            <p><strong>Information We Collect:</strong></p>
            <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">
                <li>Personal details (name, email, phone number)</li>
                <li>Delivery address information</li>
                <li>Payment information (securely processed)</li>
                <li>Medical information (prescriptions - stored confidentially)</li>
            </ul>
            
            <p style="margin-top: 1rem;"><strong>How We Use Your Information:</strong></p>
            <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">
                <li>Processing and delivering your orders</li>
                <li>Providing customer support</li>
                <li>Sending order updates and notifications</li>
                <li>Improving our services</li>
            </ul>
            
            <p style="margin-top: 1rem;"><strong>Data Security:</strong><br>
            We use industry-standard encryption and security measures to protect your personal and medical information. Your data is never shared with third parties without consent.</p>
            
            <p style="margin-top: 1rem;"><strong>Your Rights:</strong><br>
            You have the right to access, update, or delete your personal information at any time.</p>
            
            <p style="margin-top: 1rem;">For privacy concerns, contact privacy@omoolapharmacy.com</p>
        `
    },
    terms: {
        title: "Terms of Service",
        content: `
            <h4>Terms & Conditions</h4>
            <p>By using OMOOLA Pharmacy & Stores services, you agree to the following terms:</p>
            
            <p><strong>1. Service Agreement:</strong><br>
            Our services are subject to product availability. We reserve the right to refuse service in cases of suspected fraud or misuse.</p>
            
            <p style="margin-top: 1rem;"><strong>2. Prescription Requirements:</strong><br>
            Prescription medications require valid prescriptions. Our pharmacists may contact your healthcare provider for verification.</p>
            
            <p style="margin-top: 1rem;"><strong>3. Pricing & Payment:</strong><br>
            Prices are subject to change. Payment must be completed before delivery. We accept various payment methods for your convenience.</p>
            
            <p style="margin-top: 1rem;"><strong>4. Delivery Terms:</strong><br>
            Delivery times are estimates and may vary. We're not liable for delays beyond our control.</p>
            
            <p style="margin-top: 1rem;"><strong>5. Product Information:</strong><br>
            While we strive for accuracy, product information may contain errors. Always read product labels and consult healthcare providers.</p>
            
            <p style="margin-top: 1rem;"><strong>6. Liability:</strong><br>
            We're not liable for adverse reactions to medications. Always follow healthcare provider instructions and report side effects.</p>
            
            <p style="margin-top: 1rem;">For complete terms, contact legal@omoolapharmacy.com</p>
        `
    },
    prescription: {
        title: "Prescription Policy",
        content: `
            <h4>Prescription Medication Policy</h4>
            <p>OMOOLA Pharmacy adheres strictly to pharmaceutical regulations regarding prescription medications.</p>
            
            <p><strong>Valid Prescription Requirements:</strong></p>
            <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">
                <li>Issued by a licensed healthcare provider</li>
                <li>Patient's full name and date of birth</li>
                <li>Medication name, strength, and dosage</li>
                <li>Prescriber's signature and registration number</li>
                <li>Date of prescription (valid for 6 months)</li>
            </ul>
            
            <p style="margin-top: 1rem;"><strong>How to Submit Prescriptions:</strong></p>
            <ol style="margin-left: 1.5rem; margin-top: 0.5rem;">
                <li>Upload a clear photo/scan of your prescription</li>
                <li>Send via WhatsApp: +234 801 234 5678</li>
                <li>Email: prescriptions@omoolapharmacy.com</li>
                <li>Present physically at any of our stores</li>
            </ol>
            
            <p style="margin-top: 1rem;"><strong>Verification Process:</strong><br>
            Our licensed pharmacists verify all prescriptions. We may contact your healthcare provider for clarification if needed.</p>
            
            <p style="margin-top: 1rem;"><strong>Confidentiality:</strong><br>
            All prescription information is kept strictly confidential and stored securely in compliance with healthcare regulations.</p>
            
            <p style="margin-top: 1rem;">For prescription inquiries, call +234 801 234 5678</p>
        `
    },
    disclaimer: {
        title: "Medical Disclaimer",
        content: `
            <h4>Important Medical Information</h4>
            <p><strong>General Disclaimer:</strong><br>
            The information provided on our website and services is for informational purposes only and should not be considered as medical advice.</p>
            
            <p style="margin-top: 1rem;"><strong>Medication Use:</strong></p>
            <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">
                <li>Always read product labels and instructions carefully</li>
                <li>Consult your healthcare provider before starting any medication</li>
                <li>Report adverse reactions immediately</li>
                <li>Do not exceed recommended dosages</li>
                <li>Keep all medications out of reach of children</li>
            </ul>
            
            <p style="margin-top: 1rem;"><strong>Professional Advice:</strong><br>
            Information provided by our pharmacists is for general guidance. For specific medical concerns, always consult your physician or healthcare provider.</p>
            
            <p style="margin-top: 1rem;"><strong>Product Accuracy:</strong><br>
            While we ensure product information accuracy, manufacturers may update formulations. Always check current product packaging.</p>
            
            <p style="margin-top: 1rem;"><strong>Emergency Situations:</strong><br>
            In case of medical emergencies, call emergency services immediately. Do not rely solely on our pharmacy services for urgent medical care.</p>
            
            <p style="margin-top: 1rem; padding: 1rem; background: rgba(239, 68, 68, 0.1); border-radius: 8px;">
                <strong>⚠️ Important:</strong> This pharmacy service does not replace professional medical care. Always seek advice from qualified healthcare providers for medical conditions.
            </p>
        `
    }
};

function openFooterInfoModal(infoType) {
    const info = footerInfo[infoType];
    if (!info) return;
    
    footerInfoTitle.textContent = info.title;
    footerInfoContent.innerHTML = info.content;
    footerInfoModal.classList.add('active');
    overlay.classList.add('active');
}

function closeFooterInfoModal() {
    footerInfoModal.classList.remove('active');
    if (!cartDrawer.classList.contains('active') && !rxModal.classList.contains('active')) {
        overlay.classList.remove('active');
    }
}

// Footer link event listeners
document.querySelectorAll('.footer-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const infoType = link.dataset.infoType;
        openFooterInfoModal(infoType);
    });
});

footerInfoClose?.addEventListener('click', closeFooterInfoModal);

// Update copyright year dynamically
const copyrightYearEl = document.getElementById('copyright-year');
if (copyrightYearEl) {
    copyrightYearEl.textContent = new Date().getFullYear();
}

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
        closeFooterInfoModal();
    }
});
