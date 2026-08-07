// ==========================================================================
// AURA ATELIER - QUICK VIEW MODAL UI
// ==========================================================================

import { PRODUCTS } from '../data.js';
import { store } from '../store.js';
import { showToast } from './toast.js';

let currentProduct = null;
let selectedSize = 'M';
let selectedColor = null;

export function initModal() {
  const modalOverlay = document.getElementById('quickview-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeQuickView);

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeQuickView();
    });
  }

  // Keyboard Escape listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
      closeQuickView();
    }
  });
}

export function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  currentProduct = product;
  selectedSize = product.sizes ? product.sizes[0] : 'M';
  selectedColor = product.colors ? product.colors[0] : '#121212';

  const modalOverlay = document.getElementById('quickview-modal');
  const modalImg = document.getElementById('modal-img');
  const modalCategory = document.getElementById('modal-category');
  const modalTitle = document.getElementById('modal-title');
  const modalPrice = document.getElementById('modal-price');
  const modalDesc = document.getElementById('modal-desc');
  const modalSizesContainer = document.getElementById('modal-sizes-container');
  const modalColorsContainer = document.getElementById('modal-colors-container');
  const modalAddCartBtn = document.getElementById('modal-add-cart');

  if (modalImg) {
    modalImg.src = product.image;
    modalImg.alt = product.name;
  }
  if (modalCategory) modalCategory.textContent = product.category.toUpperCase();
  if (modalTitle) modalTitle.textContent = product.name;
  
  if (modalPrice) {
    modalPrice.innerHTML = `
      $${product.price.toFixed(2)}
      ${product.originalPrice ? `<span class="original-price" style="margin-left: 8px;">$${product.originalPrice.toFixed(2)}</span>` : ''}
    `;
  }
  
  if (modalDesc) modalDesc.textContent = product.description;

  // Render Colors
  if (modalColorsContainer && product.colors) {
    modalColorsContainer.innerHTML = product.colors.map((hex, i) => `
      <button class="color-swatch ${i === 0 ? 'selected' : ''}" data-color="${hex}" style="background-color: ${hex};" title="Color ${i + 1}"></button>
    `).join('');

    modalColorsContainer.querySelectorAll('.color-swatch').forEach(btn => {
      btn.addEventListener('click', () => {
        modalColorsContainer.querySelectorAll('.color-swatch').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedColor = btn.dataset.color;
      });
    });
  }

  // Render Sizes
  if (modalSizesContainer && product.sizes) {
    modalSizesContainer.innerHTML = product.sizes.map((size, i) => `
      <button class="size-btn ${i === 0 ? 'selected' : ''}" data-size="${size}">${size}</button>
    `).join('');

    modalSizesContainer.querySelectorAll('.size-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        modalSizesContainer.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedSize = btn.dataset.size;
      });
    });
  }

  // Add to cart click
  if (modalAddCartBtn) {
    modalAddCartBtn.onclick = () => {
      if (store.addToCart(currentProduct.id, selectedSize, selectedColor)) {
        showToast(`¡${currentProduct.name} (${selectedSize}) agregado al carrito!`, 'success');
        closeQuickView();
      }
    };
  }

  if (modalOverlay) {
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

export function closeQuickView() {
  const modalOverlay = document.getElementById('quickview-modal');
  if (modalOverlay) {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}
