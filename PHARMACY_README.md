# OMOOLA PHARMACY & STORES

A modern, responsive eCommerce website for pharmacy and grocery delivery services. Built with HTML, CSS, and JavaScript, featuring a clean purple and orange design palette inspired by contemporary UI/UX principles.

## 🎨 Design Overview

### Color Palette
- **Primary Purple**: `#6A4CFF` - Main brand color for headers, controls, and emphasis
- **Accent Orange**: `#FF7A00` - Call-to-action buttons and highlights
- **Neutral Dark**: `#1F2937` - Text and content
- **Neutral Light**: `#F7F7FB` - Background
- **White**: `#FFFFFF` - Cards and surfaces

### Typography
- **Headings**: Poppins (Bold, Semi-bold)
- **Body**: Inter (Regular, Medium, Semi-bold)

### Design Reference
Inspired by modern grocery delivery app designs with emphasis on:
- Large, accessible search functionality
- Horizontal scrolling category carousels
- Card-based product layouts
- Smooth micro-interactions
- Mobile-first responsive design

## ✨ Features

### Core Functionality
- **Product Catalog**: Browse medicines, groceries, and health products
- **Smart Search**: Autocomplete search with suggestions
- **Category Navigation**: Horizontally scrollable category carousel
- **Shopping Cart**: Persistent cart with local storage
- **Prescription Upload**: Image/PDF upload with form validation
- **Checkout Flow**: Multi-step checkout with delivery and payment options

### Pharmacy-Specific Features
- ✅ Prescription requirement flags
- ✅ OTC (Over The Counter) medication badges
- ✅ Pharmacist consultation prompts
- ✅ Prescription upload with patient information
- ✅ Pharmacy license display
- ✅ Medical disclaimer notices

### User Experience
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Accessibility**: WCAG AA compliant with keyboard navigation
- **Micro-interactions**: Smooth animations on hover and interaction
- **Cart Animations**: Add-to-cart with visual feedback
- **Modal Interactions**: Slide-in cart drawer and prescription upload modal

## 📁 Project Structure

```
OMOOLA-PHARMACY/
├── index.html          # Main homepage
├── checkout.html       # Checkout page
├── styles.css          # Main stylesheet
├── script.js           # JavaScript functionality
├── data.js             # Product data and cart logic
└── README.md           # This file
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools required - pure HTML/CSS/JS

### Local Development

1. **Clone or download** this repository

2. **Open the project**:
   ```bash
   cd OMOOLA-PHARMACY
   ```

3. **Start a local server** (choose one method):

   **Option A: Using Python**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   **Option B: Using Node.js**
   ```bash
   npx serve
   ```

   **Option C: Using PHP**
   ```bash
   php -S localhost:8000
   ```

   **Option D: Using VS Code**
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

4. **Open in browser**:
   - Navigate to `http://localhost:8000`

### Direct File Access
For quick testing, you can also open `index.html` directly in a browser. However, some features may work better with a local server.

## 🌐 Deployment

### Option 1: GitHub Pages

1. Create a GitHub repository
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/omoola-pharmacy.git
   git push -u origin main
   ```
3. Go to repository Settings → Pages
4. Select branch `main` and folder `/root`
5. Save and wait for deployment
6. Access at: `https://YOUR-USERNAME.github.io/omoola-pharmacy`

### Option 2: Netlify

1. Sign up at [netlify.com](https://netlify.com)
2. Drag and drop your project folder to Netlify
3. Or connect your GitHub repository for automatic deployments
4. Your site will be live at: `https://random-name.netlify.app`

### Option 3: Vercel

1. Sign up at [vercel.com](https://vercel.com)
2. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```
3. Deploy:
   ```bash
   vercel
   ```
4. Follow the prompts

### Option 4: Traditional Web Hosting

1. Upload all files via FTP to your web host
2. Ensure files are in the public_html or www directory
3. Access via your domain

## 🎯 Key Pages

### Homepage (`index.html`)
- Hero section with search
- Category carousel
- Featured promotional banners
- Product grids (Popular Medicines, Special Offers)
- Prescription upload modal
- Shopping cart drawer
- Footer with pharmacy info

### Checkout (`checkout.html`)
- Delivery options (Standard, Express, Pickup, Scheduled)
- Address form with validation
- Payment method selection
- Order summary
- Secure checkout process

## 🛒 Shopping Cart Features

The shopping cart uses browser localStorage for persistence:
- Add/remove items
- Update quantities
- Persistent across sessions
- Visual badge counter
- Slide-in drawer interface
- Coupon code input
- Prescription verification checkbox

## 💊 Prescription Upload

Safe and secure prescription handling:
- Image and PDF file support
- Drag-and-drop upload
- File preview
- Progress indicator
- Patient information form
- Delivery preference selection
- Optional pharmacist notes

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## ♿ Accessibility Features

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Alt text for images
- Color contrast ratio (WCAG AA)
- Reduced motion support

## 🔒 Security Considerations

**Note**: This is a frontend demonstration. For production use:

1. **Backend Required**: Implement server-side validation
2. **Payment Gateway**: Integrate Stripe, Paystack, or Flutterwave
3. **File Upload**: Server-side virus scanning and validation
4. **Prescription Verification**: Pharmacist review system
5. **HTTPS**: Use SSL/TLS encryption
6. **Data Protection**: Comply with healthcare data regulations
7. **Authentication**: User login and account management

## 🔧 Customization

### Updating Colors

Edit CSS variables in `styles.css`:
```css
:root {
    --primary-purple: #6A4CFF;
    --accent-orange: #FF7A00;
    /* ... other colors */
}
```

### Adding Products

Edit `data.js`:
```javascript
const products = [
    {
        id: 1,
        name: 'Product Name',
        description: 'Description',
        price: 1200,
        image: '💊',
        badges: ['OTC', 'In Stock'],
        category: 'pharmacy',
        requiresPrescription: false
    },
    // Add more products...
];
```

### Modifying Categories

Edit the category carousel HTML in `index.html`:
```html
<div class="category-card">
    <div class="category-icon">🍎</div>
    <span class="category-name">Your Category</span>
</div>
```

## 📊 Performance Optimization

- Minimal dependencies (no frameworks)
- Optimized CSS (single file)
- Lazy loading considerations
- Local storage for cart data
- Smooth scrolling with CSS
- Hardware-accelerated animations

## 🐛 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License & Legal

### Pharmacy License
The site displays: **PCN-NG-2024-001234** (placeholder)

**For production**: Replace with actual pharmacy license number

### Medical Disclaimer
Included in footer: "Always read labels and instructions. Consult your healthcare provider before starting any medication."

**For production**: Consult legal counsel for proper medical disclaimers

### Privacy & Terms
Links provided in footer for:
- Privacy Policy (implement for production)
- Terms of Service (implement for production)
- Prescription Policy (implement for production)

## 🎓 Educational Purpose

This project demonstrates:
- Modern web design principles
- Responsive CSS layouts
- JavaScript DOM manipulation
- LocalStorage API usage
- Form validation
- Modal/drawer interactions
- Accessibility best practices
- eCommerce UI patterns

## 🤝 Contributing

This is a demonstration project. For improvements:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support & Contact

For questions about implementation or customization:
- Review the code comments
- Check browser console for errors
- Ensure JavaScript is enabled
- Test in different browsers

## 🔮 Future Enhancements

Potential additions for production:
- [ ] Backend API integration
- [ ] User authentication system
- [ ] Real payment gateway integration
- [ ] Order tracking system
- [ ] Email notifications
- [ ] SMS alerts
- [ ] Live chat with pharmacist
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search filters
- [ ] Multi-language support
- [ ] PWA capabilities
- [ ] Push notifications
- [ ] Analytics integration

## 📦 Dependencies

**None!** Pure HTML, CSS, and JavaScript.

External resources:
- Google Fonts (Poppins, Inter) - Can be replaced with system fonts if needed

## 🎉 Acknowledgments

- Design inspired by modern pharmacy delivery apps
- Icons: Unicode emoji (universally supported)
- Color palette: Custom designed for accessibility and brand identity
- Layout: Based on contemporary eCommerce best practices

---

**Built with ❤️ for OMOOLA PHARMACY & STORES**

*Version 1.0.0 | Last Updated: November 2024*
