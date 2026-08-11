// ==========================================================================
// AURA ATELIER - CENTRALIZED REACTIVE STORE (CURRENCY & STATE MANAGER)
// ==========================================================================

import { CONFIG } from './config.js';
import { PRODUCTS } from './data.js';

export const RATES = {
  USD: { symbol: '$', rate: 1.0, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  MXN: { symbol: '$', rate: 18.2, label: 'MXN ($)' },
  COP: { symbol: '$', rate: 3950.0, label: 'COP ($)' }
};

class AppStore {
  constructor() {
    this.cart = this.load(CONFIG.STORAGE_KEYS.CART, []);
    this.wishlist = this.load(CONFIG.STORAGE_KEYS.WISHLIST, []);
    this.theme = this.load(CONFIG.STORAGE_KEYS.THEME, 'dark');
    this.currency = this.load('aura_currency', 'USD');
    this.activePromo = null;
    this.listeners = new Set();
  }

  // Helper to safely load JSON from localStorage
  load(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.error(`Error loading state key ${key}:`, e);
      return fallback;
    }
  }

  // Helper to save JSON to localStorage
  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error(`Error saving state key ${key}:`, e);
    }
  }

  // Subscribe UI listener to state changes
  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  // Notify all subscribers
  notify(event, payload) {
    this.listeners.forEach(fn => fn(event, payload, this));
  }

  // --- CURRENCY ACTIONS ---
  setCurrency(currCode) {
    if (RATES[currCode]) {
      this.currency = currCode;
      this.save('aura_currency', currCode);
      this.notify('CURRENCY_CHANGED', { currency: currCode });
    }
  }

  formatPrice(usdAmount) {
    const rateInfo = RATES[this.currency] || RATES.USD;
    const converted = usdAmount * rateInfo.rate;
    if (this.currency === 'COP') {
      return `${rateInfo.symbol}${Math.round(converted).toLocaleString('es-CO')} COP`;
    }
    if (this.currency === 'MXN') {
      return `${rateInfo.symbol}${converted.toFixed(2)} MXN`;
    }
    return `${rateInfo.symbol}${converted.toFixed(2)}`;
  }

  // --- THEME ACTIONS ---
  setTheme(themeName) {
    this.theme = themeName;
    this.save(CONFIG.STORAGE_KEYS.THEME, this.theme);
    this.notify('THEME_CHANGED', { theme: this.theme });
  }

  toggleTheme() {
    const nextTheme = this.theme === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme);
  }

  // --- CART ACTIONS ---
  addToCart(productId, selectedSize = 'M', selectedColor = null) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return false;

    const color = selectedColor || (product.colors && product.colors[0]) || '#121212';
    const existingIndex = this.cart.findIndex(
      item => item.id === productId && item.size === selectedSize && item.color === color
    );

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += 1;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image,
        size: selectedSize,
        color: color,
        quantity: 1
      });
    }

    this.save(CONFIG.STORAGE_KEYS.CART, this.cart);
    this.notify('CART_UPDATED', { action: 'add', item: product });
    return true;
  }

  updateCartQty(productId, size, color, change) {
    const index = this.cart.findIndex(
      item => item.id === productId && item.size === size && item.color === color
    );
    if (index === -1) return;

    this.cart[index].quantity += change;

    if (this.cart[index].quantity <= 0) {
      this.cart.splice(index, 1);
    }

    this.save(CONFIG.STORAGE_KEYS.CART, this.cart);
    this.notify('CART_UPDATED', { action: 'qty_change' });
  }

  removeFromCart(productId, size, color) {
    this.cart = this.cart.filter(
      item => !(item.id === productId && item.size === size && item.color === color)
    );

    this.save(CONFIG.STORAGE_KEYS.CART, this.cart);
    this.notify('CART_UPDATED', { action: 'remove' });
  }

  clearCart() {
    this.cart = [];
    this.activePromo = null;
    this.save(CONFIG.STORAGE_KEYS.CART, this.cart);
    this.notify('CART_UPDATED', { action: 'clear' });
  }

  applyPromoCode(code) {
    const cleanCode = code.trim().toUpperCase();
    if (CONFIG.PROMO_CODES[cleanCode]) {
      this.activePromo = {
        code: cleanCode,
        ...CONFIG.PROMO_CODES[cleanCode]
      };
      this.notify('PROMO_APPLIED', { promo: this.activePromo });
      return { success: true, message: `¡Cupón ${cleanCode} aplicado exitosamente!` };
    }
    return { success: false, message: 'Código promocional no válido o expirado.' };
  }

  removePromoCode() {
    this.activePromo = null;
    this.notify('PROMO_REMOVED', {});
  }

  // --- WISHLIST ACTIONS ---
  toggleWishlist(productId) {
    const exists = this.wishlist.includes(productId);
    if (exists) {
      this.wishlist = this.wishlist.filter(id => id !== productId);
    } else {
      this.wishlist.push(productId);
    }

    this.save(CONFIG.STORAGE_KEYS.WISHLIST, this.wishlist);
    this.notify('WISHLIST_UPDATED', { productId, isWishlisted: !exists });
    return !exists;
  }

  isInWishlist(productId) {
    return this.wishlist.includes(productId);
  }

  // --- CALCULATIONS ---
  getCartTotals() {
    const itemCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    let discountAmount = 0;
    if (this.activePromo) {
      discountAmount = subtotal * (this.activePromo.discount || 0);
    }

    const isFreeShipPromo = this.activePromo && this.activePromo.freeShipping;
    const shippingFee = (subtotal >= CONFIG.FREE_SHIPPING_THRESHOLD || subtotal === 0 || isFreeShipPromo) ? 0 : CONFIG.SHIPPING_FEE;
    const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

    const amountNeededForFreeShipping = Math.max(0, CONFIG.FREE_SHIPPING_THRESHOLD - subtotal);
    const freeShippingProgress = Math.min(100, (subtotal / CONFIG.FREE_SHIPPING_THRESHOLD) * 100);

    return {
      itemCount,
      subtotal,
      discountAmount,
      shippingFee,
      finalTotal,
      amountNeededForFreeShipping,
      freeShippingProgress,
      isFreeShipping: subtotal >= CONFIG.FREE_SHIPPING_THRESHOLD || isFreeShipPromo
    };
  }
}

export const store = new AppStore();
