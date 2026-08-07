// ==========================================================================
// AURA ATELIER - WISHLIST DRAWER / MODAL UI
// ==========================================================================

import { PRODUCTS } from '../data.js';
import { store } from '../store.js';
import { showToast } from './toast.js';

export function initWishlist() {
  const wishlistBtn = document.getElementById('wishlist-btn');
  const wishlistDrawer = document.getElementById('wishlist-drawer');
  const wishlistOverlay = document.getElementById('wishlist-overlay');
  const closeWishlistBtn = document.getElementById('close-wishlist-btn');
  const wishlistItemsContainer = document.getElementById('wishlist-items');

  if (wishlistBtn) wishlistBtn.addEventListener('click', openWishlistDrawer);
  if (closeWishlistBtn) closeWishlistBtn.addEventListener('click', closeWishlistDrawer);
  if (wishlistOverlay) wishlistOverlay.addEventListener('click', closeWishlistDrawer);

  if (wishlistItemsContainer) {
    wishlistItemsContainer.addEventListener('click', (e) => {
      const target = e.target;

      // Remove from wishlist button
      const removeBtn = target.closest('.remove-wishlist-btn');
      if (removeBtn) {
        const prodId = removeBtn.dataset.id;
        store.toggleWishlist(prodId);
        showToast('Producto eliminado de Favoritos', 'info');
        return;
      }

      // Move to cart button
      const moveCartBtn = target.closest('.move-to-cart-btn');
      if (moveCartBtn) {
        const prodId = moveCartBtn.dataset.id;
        const prod = PRODUCTS.find(p => p.id === prodId);
        if (store.addToCart(prodId)) {
          store.toggleWishlist(prodId); // remove from wishlist
          showToast(`¡${prod ? prod.name : 'Producto'} movido al carrito!`, 'success');
        }
        return;
      }
    });
  }

  store.subscribe((event) => {
    if (event === 'WISHLIST_UPDATED') {
      renderWishlistUI();
    }
  });

  renderWishlistUI();
}

export function openWishlistDrawer() {
  const wishlistOverlay = document.getElementById('wishlist-overlay');
  const wishlistDrawer = document.getElementById('wishlist-drawer');
  if (wishlistOverlay && wishlistDrawer) {
    wishlistOverlay.classList.add('open');
    wishlistDrawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

export function closeWishlistDrawer() {
  const wishlistOverlay = document.getElementById('wishlist-overlay');
  const wishlistDrawer = document.getElementById('wishlist-drawer');
  if (wishlistOverlay && wishlistDrawer) {
    wishlistOverlay.classList.remove('open');
    wishlistDrawer.classList.remove('open');
    document.body.style.overflow = '';
  }
}

export function renderWishlistUI() {
  const wishlistBadge = document.getElementById('wishlist-badge');
  const wishlistItemsContainer = document.getElementById('wishlist-items');

  const count = store.wishlist.length;
  if (wishlistBadge) {
    wishlistBadge.textContent = count;
  }

  if (wishlistItemsContainer) {
    if (count === 0) {
      wishlistItemsContainer.innerHTML = `
        <div class="cart-empty">
          <i class="far fa-heart"></i>
          <h4>No tienes prendas guardadas</h4>
          <p>Haz clic en el icono del corazón en cualquier producto para guardarlo aquí.</p>
        </div>
      `;
    } else {
      const wishlistedProducts = PRODUCTS.filter(p => store.wishlist.includes(p.id));
      wishlistItemsContainer.innerHTML = wishlistedProducts.map(prod => `
        <div class="cart-item">
          <img src="${prod.image}" alt="${prod.name}" class="cart-item-img">
          
          <div class="cart-item-info">
            <h4 class="cart-item-title">${prod.name}</h4>
            <span style="font-size: 0.85rem; color: var(--color-accent); font-weight: 600;">$${prod.price.toFixed(2)}</span>
            
            <button class="move-to-cart-btn btn-secondary" data-id="${prod.id}" style="margin-top: 8px; padding: 6px 12px; font-size: 0.8rem;">
              <i class="fas fa-shopping-bag"></i> Mover al Carrito
            </button>
          </div>

          <button class="remove-wishlist-btn" data-id="${prod.id}" title="Quitar de Favoritos" style="background: none; border: none; color: #ef4444; cursor: pointer; padding: 4px;">
            <i class="fas fa-times"></i>
          </button>
        </div>
      `).join('');
    }
  }
}
