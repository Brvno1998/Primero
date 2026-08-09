// ==========================================================================
// AURA ATELIER - QUICK VIEW MODAL UI (INTERACTIVE COLOR & SIZE SELECTOR)
// ==========================================================================

import { PRODUCTS } from '../data.js';
import { store } from '../store.js';
import { showToast } from './toast.js';

let currentProduct = null;
let selectedSize = 'M';
let selectedColor = null;

const COLOR_NAMES = {
  '#121212': 'Negro Mateo',
  '#1a1a1a': 'Negro Ónix',
  '#4a3728': 'Marrón Cuero',
  '#5c4033': 'Café Espresso',
  '#808080': 'Gris Plata',
  '#2b2b2b': 'Gris Carbón',
  '#ffffff': 'Blanco Marfil',
  '#1e3a8a': 'Azul Marino',
  '#8b0000': 'Rojo Borgoña',
  '#d4af37': 'Dorado Vintage',
  '#708090': 'Azul Pizarra',
  '#355e3b': 'Verde Bosque',
  '#c0c0c0': 'Plata Metalizado'
};

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
  const selectedColorLabel = document.getElementById('modal-selected-color-label');
  const selectedSizeLabel = document.getElementById('modal-selected-size-label');

  if (modalImg) {
    modalImg.src = product.image;
    modalImg.alt = product.name;
    modalImg.style.filter = 'none';
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

  // Set initial labels
  if (selectedColorLabel) {
    selectedColorLabel.textContent = COLOR_NAMES[selectedColor] || selectedColor;
  }
  if (selectedSizeLabel) {
    selectedSizeLabel.textContent = selectedSize;
  }

  // Render Colors
  if (modalColorsContainer && product.colors) {
    modalColorsContainer.innerHTML = product.colors.map((hex, i) => {
      const colorName = COLOR_NAMES[hex] || `Color ${i + 1}`;
      return `
        <button class="color-swatch ${i === 0 ? 'selected' : ''}" data-color="${hex}" data-name="${colorName}" style="background-color: ${hex};" title="${colorName}"></button>
      `;
    }).join('');

    modalColorsContainer.querySelectorAll('.color-swatch').forEach((btn, index) => {
      btn.addEventListener('click', () => {
        modalColorsContainer.querySelectorAll('.color-swatch').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedColor = btn.dataset.color;

        if (selectedColorLabel) {
          selectedColorLabel.textContent = btn.dataset.name || COLOR_NAMES[selectedColor] || selectedColor;
        }

        // Apply visual tint shift to product image depending on color
        if (modalImg) {
          if (index === 0) {
            modalImg.style.filter = 'none';
          } else if (selectedColor === '#4a3728' || selectedColor === '#5c4033') {
            modalImg.style.filter = 'sepia(0.35) contrast(1.05) saturate(1.2)';
          } else if (selectedColor === '#808080' || selectedColor === '#2b2b2b' || selectedColor === '#c0c0c0') {
            modalImg.style.filter = 'grayscale(0.4) brightness(0.95)';
          } else if (selectedColor === '#1e3a8a') {
            modalImg.style.filter = 'hue-rotate(180deg) saturate(1.1)';
          } else if (selectedColor === '#8b0000') {
            modalImg.style.filter = 'hue-rotate(320deg) saturate(1.3)';
          } else if (selectedColor === '#d4af37') {
            modalImg.style.filter = 'sepia(0.6) saturate(2) hue-rotate(5deg)';
          } else {
            modalImg.style.filter = 'brightness(0.9)';
          }
        }
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

        if (selectedSizeLabel) {
          selectedSizeLabel.textContent = selectedSize;
        }
      });
    });
  }

  // Add to cart click
  if (modalAddCartBtn) {
    modalAddCartBtn.onclick = () => {
      if (store.addToCart(currentProduct.id, selectedSize, selectedColor)) {
        const colorName = COLOR_NAMES[selectedColor] || 'Seleccionado';
        showToast(`¡${currentProduct.name} (Talla: ${selectedSize}, Color: ${colorName}) agregado al carrito!`, 'success');
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
