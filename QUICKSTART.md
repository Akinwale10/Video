# OMOOLA PHARMACY & STORES - Quick Start Guide

Welcome to OMOOLA PHARMACY & STORES eCommerce website!

## 🚀 Quick Start (2 minutes)

### Option 1: Double-click to open
Simply open `index.html` in your web browser.

### Option 2: Local server (recommended)
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

## 📂 Project Structure

```
OMOOLA-PHARMACY/
├── index.html           # Homepage
├── checkout.html        # Checkout page
├── styles.css           # All styles
├── script.js            # Interactive features
├── data.js              # Product data & cart
├── PHARMACY_README.md   # Full documentation
└── QUICKSTART.md        # This file
```

## 🎯 Key Features to Test

1. **Add to Cart**: Click "Add" on any product
2. **View Cart**: Click cart icon (top right)
3. **Upload Rx**: Click "Upload Prescription"
4. **Checkout**: Add items → Cart → "Proceed to Checkout"
5. **Mobile**: Resize browser to test responsiveness

## 🎨 Design System

- **Primary Purple**: `#6A4CFF`
- **Accent Orange**: `#FF7A00`
- **Fonts**: Poppins (headings), Inter (body)

## 💡 Tips

- Cart persists across sessions (localStorage)
- Try adding items with "Rx Required" badge
- Test mobile view (375px width)
- All forms have validation
- Search has autocomplete suggestions

## 📖 Full Documentation

See **PHARMACY_README.md** for complete documentation including:
- Deployment instructions
- Customization guide
- Production checklist
- API integration notes

## 🐛 Troubleshooting

**Cart not working?**
- Check browser console for errors
- Ensure JavaScript is enabled
- Clear localStorage if needed: `localStorage.clear()`

**Styling issues?**
- Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

**Server won't start?**
- Check if port 8000 is available
- Try different port: `python -m http.server 8080`

## 🎉 Demo Flow

1. Open `index.html`
2. Browse products by category
3. Add "Paracetamol 500mg" to cart
4. Click cart icon to view
5. Click "Proceed to Checkout"
6. Fill out delivery form
7. Select payment method
8. Click "Place Order"

## 📞 Support

For questions or issues, refer to:
- PHARMACY_README.md (comprehensive guide)
- Code comments in each file
- Browser developer console for debugging

---

**Enjoy building with OMOOLA! 🎊**
