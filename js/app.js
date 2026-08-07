// ==========================================================================
// AURA ATELIER - MAIN ENTRY POINT MODULE
// ==========================================================================

import { initTheme } from './ui/theme.js';
import { initCatalog } from './ui/catalog.js';
import { initCart } from './ui/cart.js';
import { initWishlist } from './ui/wishlist.js';
import { initModal } from './ui/modal.js';
import { initCheckout } from './ui/checkout.js';
import { initNavigation } from './ui/navigation.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 AURA Atelier 2026 App Initialized');

  // Initialize UI Subsystems
  initTheme();
  initCatalog();
  initCart();
  initWishlist();
  initModal();
  initCheckout();
  initNavigation();
});
