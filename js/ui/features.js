// ==========================================================================
// AURA ATELIER - ADVANCED FEATURES (STYLIST, VIRTUAL FIT, COMPARATOR & INVOICE)
// ==========================================================================

import { PRODUCTS } from '../data.js';
import { store } from '../store.js';
import { showToast } from './toast.js';

export function initAdvancedFeatures() {
  initFlashSaleCountdown();
  initAiStylist();
  initVirtualFitting();
  initProductComparison();
  initInvoicePrint();
}

// --------------------------------------------------------------------------
// 1. FLASH SALE COUNTDOWN TIMER
// --------------------------------------------------------------------------
function initFlashSaleCountdown() {
  const hoursEl = document.getElementById('timer-hours');
  const minutesEl = document.getElementById('timer-minutes');
  const secondsEl = document.getElementById('timer-seconds');

  if (!hoursEl || !minutesEl || !secondsEl) return;

  // 4 hours 18 mins 32 secs countdown
  let totalSeconds = (4 * 3600) + (18 * 60) + 32;

  setInterval(() => {
    if (totalSeconds <= 0) {
      totalSeconds = (24 * 3600); // reset loop
    } else {
      totalSeconds--;
    }

    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    hoursEl.textContent = String(h).padStart(2, '0');
    minutesEl.textContent = String(m).padStart(2, '0');
    secondsEl.textContent = String(s).padStart(2, '0');
  }, 1000);
}

// --------------------------------------------------------------------------
// 2. AI STYLIST OUTFIT RECOMMENDER
// --------------------------------------------------------------------------
function initAiStylist() {
  const fab = document.getElementById('ai-stylist-fab');
  const drawer = document.getElementById('stylist-drawer');
  const overlay = document.getElementById('stylist-overlay');
  const closeBtn = document.getElementById('close-stylist-btn');
  const outfitContainer = document.getElementById('stylist-outfit-container');

  if (!fab || !drawer || !outfitContainer) return;

  fab.addEventListener('click', () => {
    overlay.classList.add('open');
    drawer.classList.add('open');
    renderOutfit('cita');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('open');
      drawer.classList.remove('open');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      overlay.classList.remove('open');
      drawer.classList.remove('open');
    });
  }

  // Occasion Selector
  const occasionBtns = document.querySelectorAll('.occasion-btn');
  occasionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      occasionBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderOutfit(btn.dataset.occasion);
    });
  });

  function renderOutfit(occasion) {
    let items = [];
    if (occasion === 'cita') {
      items = [PRODUCTS[0], PRODUCTS[3]]; // Jacket + Sneakers
    } else if (occasion === 'noche') {
      items = [PRODUCTS[1], PRODUCTS[5]]; // Silk dress + Handbag
    } else if (occasion === 'festival') {
      items = [PRODUCTS[2], PRODUCTS[3]]; // Hoodie + Sneakers
    } else {
      items = [PRODUCTS[4], PRODUCTS[5]]; // Wool coat + Handbag
    }

    const totalComboPrice = items.reduce((sum, i) => sum + i.price, 0);

    outfitContainer.innerHTML = `
      <div class="stylist-outfit-box">
        <div class="outfit-items-flex">
          ${items.map(item => `
            <div class="outfit-item-card">
              <img src="${item.image}" alt="${item.name}">
              <div>
                <h5>${item.name}</h5>
                <span class="outfit-price">$${item.price.toFixed(2)}</span>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="outfit-total-row" style="margin-top: 16px; padding-top: 12px; border-top: 1px dashed var(--border-color); display: flex; justify-content: space-between; align-items: center;">
          <span>Precio Outfit Completo:</span>
          <strong style="color: var(--color-accent); font-size: 1.2rem;">$${totalComboPrice.toFixed(2)}</strong>
        </div>
        <button id="buy-outfit-btn" class="btn-primary" style="width: 100%; justify-content: center; margin-top: 16px;">
          <i class="fas fa-shopping-bag"></i> Agregar Outfit Completo
        </button>
      </div>
    `;

    const buyOutfitBtn = document.getElementById('buy-outfit-btn');
    if (buyOutfitBtn) {
      buyOutfitBtn.addEventListener('click', () => {
        items.forEach(item => store.addToCart(item.id));
        showToast('¡Outfit completo agregado al carrito!', 'success');
        overlay.classList.remove('open');
        drawer.classList.remove('open');
      });
    }
  }
}

// --------------------------------------------------------------------------
// 3. VIRTUAL FITTING ROOM 3D
// --------------------------------------------------------------------------
function initVirtualFitting() {
  const modal = document.getElementById('virtual-fitting-modal');
  const closeBtn = document.getElementById('close-fitting-btn');
  const heightSlider = document.getElementById('fitting-height-slider');
  const weightSlider = document.getElementById('fitting-weight-slider');
  const heightVal = document.getElementById('fitting-height-val');
  const weightVal = document.getElementById('fitting-weight-val');
  const resultBox = document.getElementById('fitting-result-box');
  const applyBtn = document.getElementById('fitting-apply-btn');

  if (!modal) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  }

  if (heightSlider && weightSlider) {
    heightSlider.addEventListener('input', (e) => {
      if (heightVal) heightVal.textContent = `${e.target.value} cm`;
      updateFitCalculation();
    });

    weightSlider.addEventListener('input', (e) => {
      if (weightVal) weightVal.textContent = `${e.target.value} kg`;
      updateFitCalculation();
    });
  }

  const fitPrefBtns = document.querySelectorAll('.fit-pref-btn');
  fitPrefBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      fitPrefBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      updateFitCalculation();
    });
  });

  function updateFitCalculation() {
    if (!heightSlider || !weightSlider || !resultBox) return;
    const h = parseInt(heightSlider.value);
    const w = parseInt(weightSlider.value);
    const selectedFitBtn = document.querySelector('.fit-pref-btn.selected');
    const fitPref = selectedFitBtn ? selectedFitBtn.dataset.fit : 'regular';

    let recommended = 'M';
    if (w < 60 && h < 170) recommended = 'S';
    else if (w <= 75 && h <= 180) recommended = 'M';
    else if (w <= 90 && h <= 190) recommended = 'L';
    else recommended = 'XL';

    let fitText = 'Normal';
    if (fitPref === 'slim') fitText = 'Entallado';
    if (fitPref === 'oversized') fitText = 'Oversized';

    resultBox.innerHTML = `<i class="fas fa-circle-check"></i> Recomendación: Talla <strong>${recommended}</strong> (Corte ${fitText})`;
  }

  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      showToast('Talla seleccionada aplicada a la tienda', 'success');
      modal.classList.remove('open');
    });
  }
}

// --------------------------------------------------------------------------
// 4. SIDE-BY-SIDE PRODUCT COMPARISON
// --------------------------------------------------------------------------
function initProductComparison() {
  const compareModal = document.getElementById('compare-modal');
  const closeBtn = document.getElementById('close-compare-btn');
  const compareTable = document.getElementById('compare-table');

  if (!compareModal || !compareTable) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', () => compareModal.classList.remove('open'));
  }

  compareTable.addEventListener('click', (e) => {
    const btn = e.target.closest('.compare-add-btn');
    if (btn) {
      const id = btn.dataset.id;
      const prod = PRODUCTS.find(p => p.id === id);
      store.addToCart(id);
      showToast(`¡${prod ? prod.name : 'Producto'} agregado al carrito!`, 'success');
      compareModal.classList.remove('open');
    }
  });

  window.openProductComparison = function(id1 = 'prod-1', id2 = 'prod-3') {
    const p1 = PRODUCTS.find(p => p.id === id1) || PRODUCTS[0];
    const p2 = PRODUCTS.find(p => p.id === id2) || PRODUCTS[2];

    compareTable.innerHTML = `
      <thead>
        <tr>
          <th>Característica</th>
          <th><img src="${p1.image}" width="60" style="border-radius: 6px;"><br>${p1.name}</th>
          <th><img src="${p2.image}" width="60" style="border-radius: 6px;"><br>${p2.name}</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><strong>Precio</strong></td><td style="color: var(--color-accent); font-weight: bold;">$${p1.price.toFixed(2)}</td><td style="color: var(--color-accent); font-weight: bold;">$${p2.price.toFixed(2)}</td></tr>
        <tr><td><strong>Categoría</strong></td><td>${p1.category}</td><td>${p2.category}</td></tr>
        <tr><td><strong>Calificación</strong></td><td>★ ${p1.rating} (${p1.reviews} opiniones)</td><td>★ ${p2.rating} (${p2.reviews} opiniones)</td></tr>
        <tr><td><strong>Materiales</strong></td><td>100% Cuero Vacuno / Seda</td><td>450 GSM Algodón Orgánico</td></tr>
        <tr><td><strong>Acción</strong></td><td><button class="btn-primary compare-add-btn" data-id="${p1.id}" style="font-size: 0.8rem;">Agregar</button></td><td><button class="btn-primary compare-add-btn" data-id="${p2.id}" style="font-size: 0.8rem;">Agregar</button></td></tr>
      </tbody>
    `;

    compareModal.classList.add('open');
  };
}

// --------------------------------------------------------------------------
// 5. PRINTABLE INVOICE / RECEIPT GENERATOR
// --------------------------------------------------------------------------
function initInvoicePrint() {
  const printBtn = document.getElementById('print-invoice-btn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}
