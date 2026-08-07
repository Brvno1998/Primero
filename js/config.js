// ==========================================================================
// AURA ATELIER - GLOBAL CONFIGURATION
// ==========================================================================

export const CONFIG = {
  FREE_SHIPPING_THRESHOLD: 150.00,
  SHIPPING_FEE: 15.00,
  CURRENCY_SYMBOL: '$',
  PROMO_CODES: {
    'AURA2026': { discount: 0.20, label: '20% OFF Especial 2026' },
    'LUXE10': { discount: 0.10, label: '10% OFF Colección Luxe' },
    'WELCOME15': { discount: 0.15, label: '15% OFF Bienvenida' }
  },
  STORAGE_KEYS: {
    CART: 'aura_cart',
    WISHLIST: 'aura_wishlist',
    THEME: 'aura_theme'
  }
};
