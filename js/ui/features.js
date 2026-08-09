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
  const headingEl = document.getElementById('stylist-combo-heading');

  if (!fab || !drawer || !outfitContainer) return;

  let currentOccasion = 'cita';
  let currentGender = 'todos';
  let slideIndex = 0;
  let autoplayTimer = null;
  let progressTimer = null;
  let isPaused = false;
  let progressPercent = 0;

  function stopCarouselTimers() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    if (progressTimer) clearInterval(progressTimer);
    autoplayTimer = null;
    progressTimer = null;
  }

  function startCarouselTimers(totalItems) {
    stopCarouselTimers();
    if (totalItems <= 1 || isPaused) return;

    progressPercent = 0;
    const progressFill = document.getElementById('carousel-progress-fill');
    
    progressTimer = setInterval(() => {
      progressPercent += 2; // 100% in 50 * 100ms = 5000ms
      if (progressFill) {
        progressFill.style.width = `${Math.min(progressPercent, 100)}%`;
      }
    }, 100);

    autoplayTimer = setInterval(() => {
      slideIndex = (slideIndex + 1) % totalItems;
      progressPercent = 0;
      updateActiveSlide(totalItems);
    }, 5000);
  }

  fab.addEventListener('click', () => {
    overlay.classList.add('open');
    drawer.classList.add('open');
    slideIndex = 0;
    renderStylistOutfits();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('open');
      drawer.classList.remove('open');
      stopCarouselTimers();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      overlay.classList.remove('open');
      drawer.classList.remove('open');
      stopCarouselTimers();
    });
  }

  // Occasion Selector
  const occasionBtns = document.querySelectorAll('.occasion-btn');
  occasionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      occasionBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentOccasion = btn.dataset.occasion;
      slideIndex = 0;
      renderStylistOutfits();
    });
  });

  // Gender Selector
  const genderBtns = document.querySelectorAll('.stylist-gender-btn');
  genderBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      genderBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentGender = btn.dataset.gender;
      slideIndex = 0;
      renderStylistOutfits();
    });
  });

  function getOutfitsForOccasion(occasion) {
    const menProducts = PRODUCTS.filter(p => p.category === 'hombres');
    const womenProducts = PRODUCTS.filter(p => p.category === 'mujeres');
    const accProducts = PRODUCTS.filter(p => p.category === 'accesorios');

    const outfits = [];

    if (occasion === 'cita') {
      const menTitles = [
        'Cena Romántica en Terraza Elegante',
        'Cita de Noche en Club Privado',
        'Paseo Nocturno & Cóctel VIP',
        'Velada Formal de Alta Costura',
        'Cita Romántica Minimalista'
      ];
      const womenTitles = [
        'Cena Sensual a la Luz de las Velas',
        'Noche de Ópera & Cócteles de Lujo',
        'Cita Romántica Chic Satinada',
        'Paseo Elegante de Gala Nocturna',
        'Cita Romántica Glamour Velvet'
      ];

      // Interleave 150 Men & 150 Women Romantic Date Combos for "Todos"
      for (let i = 0; i < 150; i++) {
        const numStr = i < 9 ? `00${i + 1}` : (i < 99 ? `0${i + 1}` : `${i + 1}`);

        // Women combo
        outfits.push({
          id: `combo-women-cita-${i + 1}`,
          title: `Look Cita Romántica ♀ N°${numStr} (${womenTitles[i % womenTitles.length]})`,
          gender: 'mujeres',
          badgeText: '♀ Mujer',
          items: [womenProducts[i % womenProducts.length], accProducts[(i + 4) % accProducts.length]]
        });

        // Men combo
        outfits.push({
          id: `combo-men-cita-${i + 1}`,
          title: `Look Cita Romántica ♂ N°${numStr} (${menTitles[i % menTitles.length]})`,
          gender: 'hombres',
          badgeText: '♂ Hombre',
          items: [menProducts[i % menProducts.length], accProducts[i % accProducts.length]]
        });
      }
    } else {
      for (let i = 0; i < 50; i++) {
        const p1 = (i % 2 === 0) ? menProducts[i % menProducts.length] : womenProducts[i % womenProducts.length];
        const p2 = accProducts[i % accProducts.length];
        const gender = p1.category;
        outfits.push({
          id: `combo-${occasion}-${i + 1}`,
          title: `Outfit ${occasion.toUpperCase()} N°${i + 1}`,
          gender: gender,
          badgeText: gender === 'hombres' ? '♂ Hombre' : '♀ Mujer',
          items: [p1, p2]
        });
      }
    }

    return outfits;
  }

  let activeOutfitsList = [];

  function updateActiveSlide(totalItems) {
    const cardEl = document.getElementById('active-outfit-slide-card');
    const numEl = document.getElementById('carousel-slide-num');

    if (!cardEl || !activeOutfitsList.length) return;

    if (numEl) numEl.textContent = `${slideIndex + 1}`;

    const combo = activeOutfitsList[slideIndex % activeOutfitsList.length];
    const totalComboPrice = combo.items.reduce((sum, item) => sum + item.price, 0);
    const itemIdsJson = JSON.stringify(combo.items.map(item => item.id));

    cardEl.innerHTML = `
      <div class="stylist-outfit-box" style="padding: 18px; background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-md); animation: fadeIn 0.3s ease-in-out;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h5 style="font-size: 0.95rem; margin: 0; color: #ffffff;">${combo.title}</h5>
          <span class="product-category" style="background: rgba(212,175,55,0.15); color: var(--color-accent); padding: 4px 8px; border-radius: 4px; font-size: 0.75rem;">${combo.badgeText}</span>
        </div>

        <div class="outfit-items-flex" style="display: flex; flex-direction: column; gap: 10px;">
          ${combo.items.map(item => `
            <div class="outfit-item-card" style="display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.03); padding: 10px; border-radius: 6px;">
              <img src="${item.image}" alt="${item.name}" style="width: 55px; height: 65px; object-fit: cover; border-radius: 4px;">
              <div style="flex: 1;">
                <h6 style="margin: 0; font-size: 0.88rem; color: #ffffff;">${item.name}</h6>
                <span class="outfit-price" style="font-size: 0.85rem; color: var(--color-accent);">$${item.price.toFixed(2)}</span>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="outfit-total-row" style="margin-top: 14px; padding-top: 10px; border-top: 1px dashed var(--color-border); display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 0.85rem; color: var(--color-text-muted);">Precio Outfit Completo:</span>
          <strong style="color: var(--color-accent); font-size: 1.15rem;">$${totalComboPrice.toFixed(2)}</strong>
        </div>

        <button class="btn-primary buy-combo-btn" data-items='${itemIdsJson}' style="width: 100%; justify-content: center; margin-top: 14px; padding: 11px; font-size: 0.9rem;">
          <i class="fas fa-shopping-bag"></i> Agregar Outfit Completo
        </button>
      </div>
    `;

    // Attach buy button listener
    const buyBtn = cardEl.querySelector('.buy-combo-btn');
    if (buyBtn) {
      buyBtn.addEventListener('click', () => {
        try {
          const itemIds = JSON.parse(buyBtn.dataset.items);
          itemIds.forEach(id => store.addToCart(id));
          showToast('¡Outfit completo de Cita Romántica agregado al carrito!', 'success');
          overlay.classList.remove('open');
          drawer.classList.remove('open');
          stopCarouselTimers();
        } catch (e) {
          console.error(e);
        }
      });
    }
  }

  function renderStylistOutfits() {
    let allOutfits = getOutfitsForOccasion(currentOccasion);

    if (currentGender !== 'todos') {
      allOutfits = allOutfits.filter(o => o.gender === currentGender);
    }

    activeOutfitsList = allOutfits;

    if (headingEl) {
      const occasionText = currentOccasion === 'cita' ? 'Cita Romántica' : currentOccasion;
      headingEl.textContent = `Carrusel de Outfits Cita Romántica (${allOutfits.length} Looks)`;
    }

    outfitContainer.innerHTML = `
      <div class="stylist-carousel-container" style="position: relative;">
        <!-- Controls Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; background: rgba(255,255,255,0.03); padding: 8px 12px; border-radius: 6px;">
          <span style="font-size: 0.8rem; color: var(--color-accent); font-weight: 600; display: flex; align-items: center; gap: 6px;">
            <i class="fas fa-circle-play" style="animation: pulse 2s infinite;"></i> Cambio auto 5s (<span id="carousel-slide-num">1</span>/${allOutfits.length})
          </span>
          <div style="display: flex; gap: 6px;">
            <button id="carousel-prev-btn" class="btn-secondary" style="padding: 4px 10px; font-size: 0.75rem;"><i class="fas fa-chevron-left"></i></button>
            <button id="carousel-pause-btn" class="btn-secondary" style="padding: 4px 10px; font-size: 0.75rem;"><i class="fas fa-pause"></i></button>
            <button id="carousel-next-btn" class="btn-secondary" style="padding: 4px 10px; font-size: 0.75rem;"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>

        <!-- 5-Second Timer Bar -->
        <div style="height: 3px; background: rgba(255,255,255,0.1); border-radius: 2px; margin-bottom: 12px; overflow: hidden;">
          <div id="carousel-progress-fill" style="height: 100%; background: var(--color-accent); width: 0%;"></div>
        </div>

        <!-- Active Outfit Card Slide -->
        <div id="active-outfit-slide-card"></div>
      </div>
    `;

    updateActiveSlide(allOutfits.length);
    startCarouselTimers(allOutfits.length);

    // Controls Event Listeners
    const prevBtn = document.getElementById('carousel-prev-btn');
    const nextBtn = document.getElementById('carousel-next-btn');
    const pauseBtn = document.getElementById('carousel-pause-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        slideIndex = (slideIndex - 1 + allOutfits.length) % allOutfits.length;
        updateActiveSlide(allOutfits.length);
        startCarouselTimers(allOutfits.length);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        slideIndex = (slideIndex + 1) % allOutfits.length;
        updateActiveSlide(allOutfits.length);
        startCarouselTimers(allOutfits.length);
      });
    }

    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        isPaused = !isPaused;
        pauseBtn.innerHTML = isPaused ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
        if (isPaused) {
          stopCarouselTimers();
        } else {
          startCarouselTimers(allOutfits.length);
        }
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
