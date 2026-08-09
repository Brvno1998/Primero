// ==========================================================================
// AURA ATELIER - CATALOG & PRODUCT GRID UI (COMPLETE 600+ ITEMS SHOWCASE)
// ==========================================================================

import { PRODUCTS } from '../data.js';
import { store } from '../store.js';
import { showToast } from './toast.js';
import { openQuickView } from './modal.js';

let activeCategory = 'all';
let searchQuery = '';
let sortBy = 'popular';
let maxPrice = 500;
let displayLimit = 24;

export function filterCategory(categoryName) {
  const normCat = (categoryName === 'todos' || categoryName === 'coleccion') ? 'all' : (categoryName || 'all');
  activeCategory = normCat;
  displayLimit = 24;

  const categoryTabsContainer = document.querySelector('.category-tabs');
  if (categoryTabsContainer) {
    const tabs = categoryTabsContainer.querySelectorAll('.tab-btn');
    tabs.forEach(t => {
      const match = (t.dataset.category === activeCategory) || 
        (activeCategory === 'all' && (t.dataset.category === 'all' || t.dataset.category === 'todos' || t.dataset.category === 'coleccion'));
      if (match) t.classList.add('active');
      else t.classList.remove('active');
    });
  }

  const catalogSection = document.getElementById('catalog');
  if (catalogSection) {
    catalogSection.scrollIntoView({ behavior: 'smooth' });
  }

  renderProducts();
}

if (typeof window !== 'undefined') {
  window.filterCategory = filterCategory;
}

export function initCatalog() {
  const productsGrid = document.getElementById('products-grid');
  const searchInput = document.getElementById('search-input');
  const sortSelect = document.getElementById('sort-select');
  const priceSlider = document.getElementById('price-slider');
  const priceValueEl = document.getElementById('price-value');

  // Category filter tabs with container delegation
  const categoryTabsContainer = document.querySelector('.category-tabs');
  if (categoryTabsContainer) {
    categoryTabsContainer.addEventListener('click', (e) => {
      const tab = e.target.closest('.tab-btn');
      if (!tab) return;

      const tabs = categoryTabsContainer.querySelectorAll('.tab-btn');
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const rawCat = tab.dataset.category || 'all';
      activeCategory = (rawCat === 'todos' || rawCat === 'coleccion') ? 'all' : rawCat;
      displayLimit = 24;
      renderProducts();
    });
  }

  // Search input with debounce
  if (searchInput) {
    let timeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        searchQuery = e.target.value;
        displayLimit = 24;
        renderProducts();
      }, 250);
    });
  }

  // Sort dropdown selector
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      sortBy = e.target.value;
      displayLimit = 24;
      renderProducts();
    });
  }

  // Price slider
  if (priceSlider && priceValueEl) {
    priceSlider.addEventListener('input', (e) => {
      maxPrice = parseFloat(e.target.value);
      priceValueEl.textContent = `$${maxPrice}`;
      displayLimit = 24;
      renderProducts();
    });
  }

  // Event Delegation for product grid actions
  if (productsGrid) {
    productsGrid.addEventListener('click', (e) => {
      const target = e.target;

      // Load More catalog button
      const loadMoreBtn = target.closest('#load-more-catalog-btn');
      if (loadMoreBtn) {
        displayLimit += 24;
        renderProducts();
        return;
      }

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

      // Compare button
      const compareBtn = target.closest('.compare-card-btn');
      if (compareBtn) {
        const prodId = compareBtn.dataset.id;
        if (window.openProductComparison) {
          window.openProductComparison(prodId, prodId === 'prod-1' ? 'prod-3' : 'prod-1');
        }
        return;
      }

      // Virtual Fit button
      const fitBtn = target.closest('.fit-card-btn');
      if (fitBtn) {
        const modal = document.getElementById('virtual-fitting-modal');
        if (modal) modal.classList.add('open');
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
    const matchesCategory = activeCategory === 'all' || activeCategory === 'todos' || activeCategory === 'coleccion' || 
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

  const visible = filtered.slice(0, displayLimit);

  const cardsHtml = visible.map(prod => {
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
            <button class="quick-view-btn" data-id="${prod.id}" title="Vista previa">
              <i class="fas fa-eye"></i> Vista rápida
            </button>
            <button class="compare-card-btn" data-id="${prod.id}" title="Comparar producto">
              <i class="fas fa-arrows-split-up-and-left"></i> Comparar
            </button>
            <button class="fit-card-btn" data-id="${prod.id}" title="Probador 3D">
              <i class="fas fa-child"></i> Probador
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

  let loadMoreHtml = '';
  if (visible.length < filtered.length) {
    loadMoreHtml = `
      <div class="load-more-catalog-wrapper" style="grid-column: 1 / -1; text-align: center; margin-top: 36px;">
        <button id="load-more-catalog-btn" class="btn-primary" style="padding: 16px 36px; font-size: 1rem; margin: 0 auto; box-shadow: 0 4px 20px rgba(212,175,55,0.2);">
          <i class="fas fa-layer-group"></i> Ver Más Productos de la Colección (${filtered.length - visible.length} restantes)
        </button>
      </div>
    `;
  }

  productsGrid.innerHTML = cardsHtml + loadMoreHtml;
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
