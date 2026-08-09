// ==========================================================================
// AURA ATELIER - SHOPPING CART DRAWER UI
// ==========================================================================

import { store } from '../store.js';
import { showToast } from './toast.js';
import { openCheckoutModal } from './checkout.js';

export function initCart() {
  const cartBtn = document.getElementById('cart-btn');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartItemsContainer = document.getElementById('cart-items');
  const promoForm = document.getElementById('promo-form');
  const promoInput = document.getElementById('promo-input');
  const checkoutBtn = document.getElementById('checkout-btn');

  // Open / Close Drawer Event Listeners
  if (cartBtn) cartBtn.addEventListener('click', openCartDrawer);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCartDrawer);

  // Event Delegation for Quantity / Removal inside Cart
  if (cartItemsContainer) {
    cartItemsContainer.addEventListener('click', (e) => {
      const target = e.target;

      // Qty button
      const qtyBtn = target.closest('.qty-btn');
      if (qtyBtn) {
        const prodId = qtyBtn.dataset.id;
        const size = qtyBtn.dataset.size;
        const color = qtyBtn.dataset.color;
        const change = parseInt(qtyBtn.dataset.change, 10);
        store.updateCartQty(prodId, size, color, change);
        return;
      }

      // Remove item button
      const removeBtn = target.closest('.remove-item-btn');
      if (removeBtn) {
        const prodId = removeBtn.dataset.id;
        const size = removeBtn.dataset.size;
        const color = removeBtn.dataset.color;
        store.removeFromCart(prodId, size, color);
        showToast('Producto eliminado del carrito', 'info');
        return;
      }
    });
  }

  // Promo Code Form
  if (promoForm && promoInput) {
    promoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = promoInput.value;
      if (!code) return;

      const result = store.applyPromoCode(code);
      if (result.success) {
        showToast(result.message, 'success');
        promoInput.value = '';
      } else {
        showToast(result.message, 'warning');
      }
    });
  }

  // Checkout Button
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (store.cart.length === 0) {
        showToast('El carrito está vacío', 'warning');
        return;
      }
      closeCartDrawer();
      openCheckoutModal();
    });
  }

  // Subscribe to store updates
  store.subscribe((event) => {
    if (event === 'CART_UPDATED' || event === 'PROMO_APPLIED' || event === 'PROMO_REMOVED' || event === 'CURRENCY_CHANGED') {
      renderCartUI();
    }
  });

  // Initial render
  renderCartUI();
}

export function openCartDrawer() {
  const cartOverlay = document.getElementById('cart-overlay');
  const cartDrawer = document.getElementById('cart-drawer');
  if (cartOverlay && cartDrawer) {
    cartOverlay.classList.add('open');
    cartDrawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

export function closeCartDrawer() {
  const cartOverlay = document.getElementById('cart-overlay');
  const cartDrawer = document.getElementById('cart-drawer');
  if (cartOverlay && cartDrawer) {
    cartOverlay.classList.remove('open');
    cartDrawer.classList.remove('open');
    document.body.style.overflow = '';
  }
}

export function renderCartUI() {
  const cartBadge = document.getElementById('cart-badge');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const cartDiscountLine = document.getElementById('cart-discount-line');
  const cartDiscountEl = document.getElementById('cart-discount-amount');
  const cartShippingEl = document.getElementById('cart-shipping-amount');
  const cartTotalEl = document.getElementById('cart-total');
  const shippingProgressContainer = document.getElementById('shipping-progress-container');

  const totals = store.getCartTotals();

  // Badge count
  if (cartBadge) {
    cartBadge.textContent = totals.itemCount;
    cartBadge.classList.toggle('pulse', totals.itemCount > 0);
  }

  // Free shipping progress bar
  if (shippingProgressContainer) {
    if (totals.isFreeShipping) {
      shippingProgressContainer.innerHTML = `
        <div class="shipping-progress-status success">
          <i class="fas fa-circle-check"></i> ¡Felicidades! Tienes <strong>ENVÍO EXPRESS GRATIS</strong>
        </div>
        <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: 100%;"></div></div>
      `;
    } else {
      shippingProgressContainer.innerHTML = `
        <div class="shipping-progress-status">
          <i class="fas fa-truck-fast"></i> Agrega <strong>${store.formatPrice(totals.amountNeededForFreeShipping)}</strong> más para <strong>ENVÍO GRATIS</strong>
        </div>
        <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: ${totals.freeShippingProgress}%;"></div></div>
      `;
    }
  }

  // Cart Subtotal / Discount / Total
  if (cartSubtotalEl) cartSubtotalEl.textContent = store.formatPrice(totals.subtotal);

  if (cartDiscountLine && cartDiscountEl) {
    if (store.activePromo && totals.discountAmount > 0) {
      cartDiscountLine.style.display = 'flex';
      cartDiscountEl.textContent = `-${store.formatPrice(totals.discountAmount)} (${store.activePromo.code})`;
    } else {
      cartDiscountLine.style.display = 'none';
    }
  }

  if (cartShippingEl) {
    cartShippingEl.textContent = totals.shippingFee === 0 ? 'GRATIS' : store.formatPrice(totals.shippingFee);
    cartShippingEl.style.color = totals.shippingFee === 0 ? 'var(--color-success)' : 'inherit';
  }

  if (cartTotalEl) cartTotalEl.textContent = store.formatPrice(totals.finalTotal);

  // Cart items list
  if (cartItemsContainer) {
    if (store.cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty">
          <i class="fas fa-shopping-bag"></i>
          <h4>Tu carrito está vacío</h4>
          <p>Explora nuestras colecciones exclusivas y agrega tus prendas favoritas.</p>
        </div>
      `;
    } else {
      cartItemsContainer.innerHTML = store.cart.map(item => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img">
          
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.name}</h4>
            <div class="cart-item-specs">
              <span class="cart-spec-badge">Talla: ${item.size}</span>
              ${item.color ? `<span class="cart-color-dot" style="background-color: ${item.color};"></span>` : ''}
            </div>
            
            <div class="cart-item-row">
              <div class="cart-qty-controls">
                <button class="qty-btn" data-id="${item.id}" data-size="${item.size}" data-color="${item.color}" data-change="-1">-</button>
                <span class="qty-number">${item.quantity}</span>
                <button class="qty-btn" data-id="${item.id}" data-size="${item.size}" data-color="${item.color}" data-change="1">+</button>
              </div>
              <span class="cart-item-price">${store.formatPrice(item.price * item.quantity)}</span>
            </div>
          </div>

          <button class="remove-item-btn" data-id="${item.id}" data-size="${item.size}" data-color="${item.color}" title="Eliminar producto">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      `).join('');
    }
  }
}
