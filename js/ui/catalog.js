// ==========================================================================
// AURA ATELIER - CATALOG & PRODUCT GRID UI
// ==========================================================================

import { PRODUCTS } from '../data.js';
import { store } from '../store.js';
import { showToast } from './toast.js';
import { openQuickView } from './modal.js';

let activeCategory = 'all';
let searchQuery = '';
let sortBy = 'popular';
let maxPrice = 500;

export function initCatalog() {
  const productsGrid = document.getElementById('products-grid');
  const categoryTabs = document.querySelectorAll('.tab-btn');
  const searchInput = document.getElementById('search-input');
  const sortSelect = document.getElementById('sort-select');
  const priceSlider = document.getElementById('price-slider');
  const priceValueEl = document.getElementById('price-value');

  // Category filter tabs
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.dataset.category;
      renderProducts();
    });
  });

  // Search input with debounce
  if (searchInput) {
    let timeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        searchQuery = e.target.value;
        renderProducts();
      }, 250);
    });
  }

  // Sort dropdown selector
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      sortBy = e.target.value;
      renderProducts();
    });
  }

  // Price slider
  if (priceSlider && priceValueEl) {
    priceSlider.addEventListener('input', (e) => {
      maxPrice = parseFloat(e.target.value);
      priceValueEl.textContent = `$${maxPrice}`;
      renderProducts();
    });
  }

  // Event Delegation for product grid actions
  if (productsGrid) {
    productsGrid.addEventListener('click', (e) => {
      const target = e.target;

      // Quick View button
      const quickViewBtn = target.closest('.quick-view-btn');
      if (quickViewBtn) {
        const prodId = quickViewBtn.dataset.id;
        openQuickView(prodId);
        return;
      }

      // Add to Cart button
      const addCartBtn = target.closest('.add-cart-btn');
      if (addCartBtn) {
        const prodId = addCartBtn.dataset.id;
        const prod = PRODUCTS.find(p => p.id === prodId);
        if (store.addToCart(prodId)) {
          showToast(`¡${prod ? prod.name : 'Producto'} agregado al carrito!`, 'success');
        }
        return;
      }

      // Wishlist toggle button
      const wishlistBtn = target.closest('.wishlist-toggle-btn');
      if (wishlistBtn) {
        const prodId = wishlistBtn.dataset.id;
        const isAdded = store.toggleWishlist(prodId);
        const prod = PRODUCTS.find(p => p.id === prodId);
        const icon = wishlistBtn.querySelector('i');

        if (isAdded) {
          wishlistBtn.classList.add('active');
          if (icon) icon.className = 'fas fa-heart';
          showToast(`Guardado en Favoritos: ${prod ? prod.name : ''}`, 'success');
        } else {
          wishlistBtn.classList.remove('active');
          if (icon) icon.className = 'far fa-heart';
          showToast('Eliminado de Favoritos', 'info');
        }
        return;
      }
    });
  }

  // Subscribe to store updates to keep product grid wishlist icons synchronized
  store.subscribe((event) => {
    if (event === 'WISHLIST_UPDATED') {
      updateWishlistButtons();
    }
  });

  renderProducts();
}

export function renderProducts() {
  const productsGrid = document.getElementById('products-grid');
  if (!productsGrid) return;

  // Filter products
  let filtered = PRODUCTS.filter(prod => {
    const matchesCategory = activeCategory === 'all' || 
      (activeCategory === 'ofertas' ? prod.originalPrice !== null : prod.category === activeCategory);

    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPrice = prod.price <= maxPrice;

    return matchesCategory && matchesSearch && matchesPrice;
  });

  // Sort products
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else {
    // popular
    filtered.sort((a, b) => b.reviews - a.reviews);
  }

  if (filtered.length === 0) {
    productsGrid.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search-minus"></i>
        <h3>No encontramos productos</h3>
        <p>Intenta ajustar los filtros de búsqueda o rango de precio.</p>
      </div>
    `;
    return;
  }

  productsGrid.innerHTML = filtered.map(prod => {
    const isWishlisted = store.isInWishlist(prod.id);
    const hasDiscount = prod.originalPrice !== null;
    const discountPercent = hasDiscount 
      ? Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100) 
      : null;

    return `
      <article class="product-card" data-id="${prod.id}">
        <div class="product-thumb">
          <img src="${prod.image}" alt="${prod.name}" loading="lazy">
          
          <div class="card-badges">
            ${prod.tag ? `<span class="badge-tag">${prod.tag}</span>` : ''}
            ${discountPercent ? `<span class="badge-discount">-${discountPercent}%</span>` : ''}
          </div>

          <button class="wishlist-toggle-btn ${isWishlisted ? 'active' : ''}" data-id="${prod.id}" title="${isWishlisted ? 'Quitar de Favoritos' : 'Guardar en Favoritos'}">
            <i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>
          </button>

          <div class="product-actions-overlay">
            <button class="quick-view-btn" data-id="${prod.id}">
              <i class="fas fa-eye"></i> Vista rápida
            </button>
          </div>
        </div>

        <div class="product-details">
          <div class="product-meta">
            <span class="product-category">${prod.category}</span>
            <span class="product-stock"><i class="fas fa-box"></i> Stock: ${prod.stock}</span>
          </div>

          <h3 class="product-title">${prod.name}</h3>

          <div class="product-rating">
            ${generateStars(prod.rating)}
            <span class="rating-count">(${prod.reviews})</span>
          </div>

          <div class="product-bottom">
            <div class="product-price">
              $${prod.price.toFixed(2)}
              ${hasDiscount ? `<span class="original-price">$${prod.originalPrice.toFixed(2)}</span>` : ''}
            </div>
            <button class="add-cart-btn" data-id="${prod.id}" title="Agregar al Carrito">
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function updateWishlistButtons() {
  const btns = document.querySelectorAll('.wishlist-toggle-btn');
  btns.forEach(btn => {
    const prodId = btn.dataset.id;
    const isWishlisted = store.isInWishlist(prodId);
    const icon = btn.querySelector('i');
    if (isWishlisted) {
      btn.classList.add('active');
      if (icon) icon.className = 'fas fa-heart';
    } else {
      btn.classList.remove('active');
      if (icon) icon.className = 'far fa-heart';
    }
  });
}

function generateStars(rating) {
  let starsHtml = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      starsHtml += '<i class="fas fa-star"></i>';
    } else if (i - 0.5 <= rating) {
      starsHtml += '<i class="fas fa-star-half-alt"></i>';
    } else {
      starsHtml += '<i class="far fa-star"></i>';
    }
  }
  return starsHtml;
}
