// ==========================================================================
// AURA ATELIER - E-COMMERCE INTERACTIVE APP LOGIC
// ==========================================================================

// Product Database
const PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Chaqueta de Cuero Nocturna',
    category: 'hombres',
    tag: 'Popular',
    price: 189.99,
    originalPrice: 220.00,
    rating: 4.9,
    reviews: 42,
    image: 'assets/images/jacket.jpg',
    description: 'Chaqueta de cuero vacuno de corte perfecto con acabados metálicos mate y forro interior térmico transpirable. Estilo rebelde y sofisticado.'
  },
  {
    id: 'prod-2',
    name: 'Vestido de Seda Minimalista',
    category: 'mujeres',
    tag: 'Exclusivo',
    price: 220.00,
    originalPrice: null,
    rating: 5.0,
    reviews: 28,
    image: 'assets/images/dress.jpg',
    description: 'Confeccionado en seda 100% natural de tono beige satinado. Caída fluida con escote drapeado suave ideal para noches y eventos formales.'
  },
  {
    id: 'prod-3',
    name: 'Hoodie Oversized Streetwear',
    category: 'hombres',
    tag: 'Tendencia',
    price: 85.50,
    originalPrice: 95.00,
    rating: 4.8,
    reviews: 64,
    image: 'assets/images/hoodie.jpg',
    description: 'Algodón orgánico pesado de 450 GSM. Hombros caídos y silueta relajada con bolsa canguro y bordado tonal de la marca en el pecho.'
  },
  {
    id: 'prod-4',
    name: 'Sneakers Blancas Minimal',
    category: 'accesorios',
    tag: 'Esencial',
    price: 145.00,
    originalPrice: null,
    rating: 4.7,
    reviews: 51,
    image: 'assets/images/sneakers.jpg',
    description: 'Zapatillas de piel de becerro italiana con suela ultraligera de goma vulcanizada. Plantilla anatómica extraíble para máximo confort.'
  },
  {
    id: 'prod-5',
    name: 'Abrigo Clásico de Lana',
    category: 'mujeres',
    tag: 'Invierno',
    price: 260.00,
    originalPrice: 310.00,
    rating: 4.9,
    reviews: 19,
    image: 'assets/images/coat.jpg',
    description: 'Corte recto con solapa entallada y cinturón ajustable. Elaborado con mezcla de lana melange de tonos cálidos y acabado aterciopelado.'
  },
  {
    id: 'prod-6',
    name: 'Bolso de Mano Luxe',
    category: 'accesorios',
    tag: 'Edición Limitada',
    price: 175.00,
    originalPrice: null,
    rating: 4.9,
    reviews: 33,
    image: 'assets/images/handbag.jpg',
    description: 'Bolso estructurado en cuero graneado con cierres y detalles dorados en baño de 18k. Incluye correa ajustable de hombro desmontable.'
  }
];

// App State
let cart = JSON.parse(localStorage.getItem('aura_cart')) || [];
let activeCategory = 'all';
let searchQuery = '';
let currentSelectedProduct = null;

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const categoryTabs = document.querySelectorAll('.tab-btn');
const searchInput = document.getElementById('search-input');
const cartBtn = document.getElementById('cart-btn');
const cartOverlay = document.getElementById('cart-overlay');
const cartDrawer = document.getElementById('cart-drawer');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartItemsContainer = document.getElementById('cart-items');
const cartBadge = document.getElementById('cart-badge');
const cartSubtotalEl = document.getElementById('cart-subtotal');
const cartTotalEl = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

// Modal Elements
const modalOverlay = document.getElementById('quickview-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalImg = document.getElementById('modal-img');
const modalCategory = document.getElementById('modal-category');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const modalDesc = document.getElementById('modal-desc');
const modalAddCartBtn = document.getElementById('modal-add-cart');

// Toast Container
const toastContainer = document.getElementById('toast-container');

// ==========================================================================
// INITIALIZATION
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();
  setupEventListeners();
});

// ==========================================================================
// PRODUCT RENDERING & FILTERING
// ==========================================================================

function renderProducts() {
  const filteredProducts = PRODUCTS.filter(prod => {
    const matchesCategory = activeCategory === 'all' || 
      (activeCategory === 'ofertas' ? prod.originalPrice !== null : prod.category === activeCategory);
    
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    return matchesCategory && matchesSearch;
  });

  if (filteredProducts.length === 0) {
    productsGrid.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search-minus"></i>
        <h3>No encontramos productos</h3>
        <p>Intenta buscando con otro término o seleccionando otra categoría.</p>
      </div>
    `;
    return;
  }

  productsGrid.innerHTML = filteredProducts.map(prod => `
    <article class="product-card" data-id="${prod.id}">
      <div class="product-thumb">
        <img src="${prod.image}" alt="${prod.name}" loading="lazy">
        ${prod.tag ? `<span class="badge-tag">${prod.tag}</span>` : ''}
        <div class="product-actions-overlay">
          <button class="quick-view-btn" onclick="openQuickView('${prod.id}')">
            <i class="fas fa-eye"></i> Vista rápida
          </button>
        </div>
      </div>
      <div class="product-details">
        <span class="product-category">${prod.category}</span>
        <h3 class="product-title">${prod.name}</h3>
        <div class="product-rating">
          ${generateStars(prod.rating)}
          <span>(${prod.reviews})</span>
        </div>
        <div class="product-bottom">
          <div class="product-price">
            $${prod.price.toFixed(2)}
            ${prod.originalPrice ? `<span style="font-size: 0.85rem; color: #6b7280; text-decoration: line-through; margin-left: 6px;">$${prod.originalPrice.toFixed(2)}</span>` : ''}
          </div>
          <button class="add-cart-btn" onclick="addToCart('${prod.id}')" title="Agregar al Carrito">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </article>
  `).join('');
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

// Event Listeners for Filters & Search
function setupEventListeners() {
  // Category tabs
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.dataset.category;
      renderProducts();
    });
  });

  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderProducts();
    });
  }

  // Cart Drawer toggles
  if (cartBtn) cartBtn.addEventListener('click', openCartDrawer);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCartDrawer);

  // Quick View Modal Close
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeQuickView);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeQuickView();
    });
  }

  // Size Selector in Modal
  const sizeBtns = document.querySelectorAll('.size-btn');
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  // Checkout button event
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('El carrito está vacío', 'warning');
        return;
      }
      showToast('¡Gracias por tu compra! Procesando pedido...', 'success');
      cart = [];
      saveCart();
      updateCartUI();
      closeCartDrawer();
    });
  }
}

// ==========================================================================
// CART FUNCTIONALITY
// ==========================================================================

function addToCart(productId, selectedSize = 'M') {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existingItemIndex = cart.findIndex(item => item.id === productId && item.size === selectedSize);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push({
      ...product,
      size: selectedSize,
      quantity: 1
    });
  }

  saveCart();
  updateCartUI();
  showToast(`Agregado: ${product.name}`, 'success');
}

function updateQuantity(productId, size, change) {
  const itemIndex = cart.findIndex(item => item.id === productId && item.size === size);
  if (itemIndex === -1) return;

  cart[itemIndex].quantity += change;

  if (cart[itemIndex].quantity <= 0) {
    cart.splice(itemIndex, 1);
  }

  saveCart();
  updateCartUI();
}

function removeFromCart(productId, size) {
  cart = cart.filter(item => !(item.id === productId && item.size === size));
  saveCart();
  updateCartUI();
  showToast('Producto eliminado del carrito', 'info');
}

function saveCart() {
  localStorage.setItem('aura_cart', JSON.stringify(cart));
}

function updateCartUI() {
  // Update badge count
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartBadge) cartBadge.textContent = totalItemsCount;

  // Calculate Subtotal
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  if (cartSubtotalEl) cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (cartTotalEl) cartTotalEl.textContent = `$${subtotal.toFixed(2)}`;

  // Render items
  if (cartItemsContainer) {
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty">
          <i class="fas fa-shopping-bag"></i>
          <p>Tu carrito está vacío</p>
        </div>
      `;
    } else {
      cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-info">
            <div>
              <h4 class="cart-item-title">${item.name}</h4>
              <span style="font-size: 0.8rem; color: #9ca3af;">Talla: ${item.size}</span>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 8px;">
              <div class="cart-qty-controls">
                <button class="qty-btn" onclick="updateQuantity('${item.id}', '${item.size}', -1)">-</button>
                <span class="qty-number">${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity('${item.id}', '${item.size}', 1)">+</button>
              </div>
              <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          </div>
          <button class="remove-item-btn" onclick="removeFromCart('${item.id}', '${item.size}')" title="Eliminar">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      `).join('');
    }
  }
}

function openCartDrawer() {
  cartOverlay.classList.add('open');
  cartDrawer.classList.add('open');
}

function closeCartDrawer() {
  cartOverlay.classList.remove('open');
  cartDrawer.classList.remove('open');
}

// ==========================================================================
// QUICK VIEW MODAL
// ==========================================================================

function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  currentSelectedProduct = product;

  modalImg.src = product.image;
  modalImg.alt = product.name;
  modalCategory.textContent = product.category;
  modalTitle.textContent = product.name;
  modalPrice.textContent = `$${product.price.toFixed(2)}`;
  modalDesc.textContent = product.description;

  modalAddCartBtn.onclick = () => {
    const selectedSizeBtn = document.querySelector('.size-btn.selected');
    const selectedSize = selectedSizeBtn ? selectedSizeBtn.dataset.size : 'M';
    addToCart(product.id, selectedSize);
    closeQuickView();
  };

  modalOverlay.classList.add('open');
}

function closeQuickView() {
  modalOverlay.classList.remove('open');
}

// ==========================================================================
// TOAST NOTIFICATIONS
// ==========================================================================

function showToast(message, type = 'info') {
  if (!toastContainer) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = 'fa-check-circle';
  if (type === 'warning') icon = 'fa-exclamation-triangle';
  if (type === 'info') icon = 'fa-info-circle';

  toast.innerHTML = `
    <i class="fas ${icon}" style="color: var(--color-accent);"></i>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
