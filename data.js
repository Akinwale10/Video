// Sample product data for OMOOLA PHARMACY & STORES
const products = [
    {
        id: 1,
        name: 'Paracetamol 500mg',
        description: '16 tablets - Pain relief & fever reducer',
        price: 1200,
        image: '<svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="32" cy="36" rx="22" ry="18" fill="#ff6b9d"/><ellipse cx="32" cy="28" rx="22" ry="18" fill="#ff1744"/></svg>',
        badges: ['OTC', 'In Stock'],
        category: 'pharmacy',
        requiresPrescription: false
    },
    {
        id: 2,
        name: 'Vitamin C 1000mg',
        description: '30 tablets - Immune support',
        price: 2500,
        image: '<svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="24" fill="#ff9800"/><circle cx="32" cy="32" r="20" fill="#ffb74d"/><circle cx="24" cy="28" r="3" fill="#fff" opacity="0.4"/></svg>',
        badges: ['OTC', 'In Stock'],
        category: 'pharmacy',
        requiresPrescription: false
    },
    {
        id: 3,
        name: 'Ibuprofen 400mg',
        description: '20 tablets - Anti-inflammatory',
        price: 1500,
        image: '<svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="32" cy="36" rx="22" ry="18" fill="#ff6b9d"/><ellipse cx="32" cy="28" rx="22" ry="18" fill="#ff1744"/></svg>',
        badges: ['OTC', 'In Stock'],
        category: 'pharmacy',
        requiresPrescription: false
    },
    {
        id: 4,
        name: 'Hand Sanitizer 500ml',
        description: 'Antibacterial gel - 70% alcohol',
        price: 1800,
        image: '<svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="22" y="16" width="20" height="36" rx="3" fill="#90caf9"/><rect x="22" y="16" width="20" height="8" rx="3" fill="#1976d2"/><circle cx="32" cy="20" r="2" fill="#fff"/></svg>',
        badges: ['In Stock'],
        category: 'personal-care',
        requiresPrescription: false
    },
    {
        id: 5,
        name: 'Face Masks (50 pack)',
        description: 'Disposable surgical masks',
        price: 3500,
        image: '<svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 26 L52 26 Q54 26, 54 28 L54 42 Q54 44, 52 44 L12 44 Q10 44, 10 42 L10 28 Q10 26, 12 26" fill="#e3f2fd"/><rect x="16" y="30" width="32" height="8" fill="#90caf9"/><line x1="10" y1="32" x2="6" y2="36" stroke="#1976d2" stroke-width="2"/><line x1="54" y1="32" x2="58" y2="36" stroke="#1976d2" stroke-width="2"/></svg>',
        badges: ['In Stock', 'Sale'],
        category: 'personal-care',
        requiresPrescription: false
    },
    {
        id: 6,
        name: 'Multivitamin Complex',
        description: '60 tablets - Daily health support',
        price: 4200,
        image: '<svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="32" cy="36" rx="22" ry="18" fill="#ff6b9d"/><ellipse cx="32" cy="28" rx="22" ry="18" fill="#ff1744"/></svg>',
        badges: ['OTC', 'In Stock'],
        category: 'pharmacy',
        requiresPrescription: false
    },
    {
        id: 7,
        name: 'Antibiotics (Amoxicillin)',
        description: '500mg - 21 capsules',
        price: 3800,
        image: '<svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="32" cy="36" rx="22" ry="18" fill="#ff6b9d"/><ellipse cx="32" cy="28" rx="22" ry="18" fill="#ff1744"/></svg>',
        badges: ['Rx Required'],
        category: 'pharmacy',
        requiresPrescription: true
    },
    {
        id: 8,
        name: 'Blood Pressure Monitor',
        description: 'Digital automatic BP monitor',
        price: 12500,
        image: '<svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="16" y="24" width="32" height="20" rx="2" fill="#f5f5f5" stroke="#424242" stroke-width="2"/><circle cx="24" cy="34" r="6" fill="#ff5252"/><path d="M27 31 L30 34 L37 27" stroke="#4caf50" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
        badges: ['In Stock'],
        category: 'medical-devices',
        requiresPrescription: false
    }
];

const offers = [
    {
        id: 101,
        name: 'Fresh Organic Apples',
        description: '1kg - Imported premium quality',
        price: 2800,
        originalPrice: 3500,
        image: '<svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="36" r="18" fill="#ff6b6b"/><ellipse cx="32" cy="36" rx="18" ry="17" fill="#ff5252" opacity="0.6"/><path d="M32 18 Q28 8, 26 12 Q24 16, 32 18" fill="#4caf50"/></svg>',
        badges: ['Sale', 'In Stock'],
        category: 'groceries',
        requiresPrescription: false
    },
    {
        id: 102,
        name: 'Omega-3 Fish Oil',
        description: '100 softgels - Heart health',
        price: 5600,
        originalPrice: 7000,
        image: '<svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 32 Q12 24, 20 24 L44 24 Q48 24, 50 28 L56 32 L50 36 Q48 40, 44 40 L20 40 Q12 40, 12 32" fill="#42a5f5"/><circle cx="44" cy="28" r="2" fill="#fff"/><path d="M20 28 L16 24 L20 32 L16 40 L20 36" fill="#1976d2"/></svg>',
        badges: ['Sale', 'OTC'],
        category: 'pharmacy',
        requiresPrescription: false
    },
    {
        id: 103,
        name: 'Baby Diapers (Large)',
        description: 'Pack of 84 - Ultra soft',
        price: 8400,
        originalPrice: 10500,
        image: '<svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="26" r="12" fill="#ffcc80"/><circle cx="28" cy="24" r="2" fill="#333"/><circle cx="36" cy="24" r="2" fill="#333"/><ellipse cx="32" cy="44" rx="16" ry="10" fill="#81d4fa"/></svg>',
        badges: ['Sale', 'In Stock'],
        category: 'baby',
        requiresPrescription: false
    },
    {
        id: 104,
        name: 'Thermometer Digital',
        description: 'Fast accurate temperature',
        price: 3200,
        originalPrice: 4000,
        image: '<svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="28" y="12" width="8" height="32" rx="4" fill="#e0e0e0"/><rect x="28" y="12" width="8" height="20" rx="4" fill="#ff5252"/><circle cx="32" cy="48" r="8" fill="#ff5252"/><circle cx="32" cy="48" r="5" fill="#d32f2f"/></svg>',
        badges: ['Sale', 'In Stock'],
        category: 'medical-devices',
        requiresPrescription: false
    }
];

const searchSuggestions = [
    'Paracetamol',
    'Vitamin C',
    'Hand sanitizer',
    'Face masks',
    'Blood pressure monitor',
    'Thermometer',
    'Antibiotics',
    'Cough syrup',
    'Pain relief',
    'First aid kit',
    'Baby formula',
    'Diapers',
    'Fresh fruits',
    'Organic vegetables',
    'Multivitamins'
];

// Cart functionality
class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.updateCartBadge();
    }

    loadCart() {
        const saved = localStorage.getItem('omoolaCart');
        return saved ? JSON.parse(saved) : [];
    }

    saveCart() {
        localStorage.setItem('omoolaCart', JSON.stringify(this.items));
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
        this.updateCartBadge();
        return true;
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartBadge();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
            this.updateCartBadge();
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    updateCartBadge() {
        const badge = document.getElementById('cartBadge');
        if (badge) {
            const count = this.getItemCount();
            badge.textContent = count;
            badge.style.display = count > 0 ? 'block' : 'none';
        }
    }

    clear() {
        this.items = [];
        this.saveCart();
        this.updateCartBadge();
    }
}

// Export for use in script.js
if (typeof window !== 'undefined') {
    window.products = products;
    window.offers = offers;
    window.searchSuggestions = searchSuggestions;
    window.ShoppingCart = ShoppingCart;
}
