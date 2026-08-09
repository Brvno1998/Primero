// ==========================================================================
// AURA ATELIER - NEW PREMIUM FEATURES (CURRENCY, VOICE SEARCH, FLASH SALES, WHEEL, TRY-ON)
// ==========================================================================

import { store } from '../store.js';
import { PRODUCTS } from '../data.js';
import { showToast } from './toast.js';

export function initNewFeatures() {
  initCurrencySelector();
  initVoiceSearch();
  initFlashSales();
  initVipWheel();
  initPhotoTryOn();
}

// 1. Currency Selector Handler
function initCurrencySelector() {
  const selectEl = document.getElementById('currency-select');
  if (!selectEl) return;

  selectEl.value = store.currency || 'USD';

  selectEl.addEventListener('change', (e) => {
    const newCurr = e.target.value;
    store.setCurrency(newCurr);
    showToast(`Moneda cambiada a ${newCurr}`, 'info');
  });

  store.subscribe((event) => {
    if (event === 'CURRENCY_CHANGED' && selectEl.value !== store.currency) {
      selectEl.value = store.currency;
    }
  });
}

// 2. Voice Search Assistant
function initVoiceSearch() {
  const voiceBtn = document.getElementById('voice-search-btn');
  const searchInput = document.getElementById('search-input');

  if (!voiceBtn || !searchInput) return;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  voiceBtn.addEventListener('click', () => {
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'es-ES';
        recognition.interimResults = false;

        voiceBtn.style.color = '#ef4444';
        voiceBtn.style.transform = 'scale(1.3)';
        showToast('Escuchando... Di el producto que buscas', 'info');

        recognition.start();

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          searchInput.value = transcript;
          searchInput.dispatchEvent(new Event('input', { bubbles: true }));
          showToast(`Buscando: "${transcript}"`, 'success');
          voiceBtn.style.color = 'var(--color-accent)';
          voiceBtn.style.transform = 'scale(1)';
        };

        recognition.onerror = () => {
          fallbackVoicePrompt(searchInput);
          voiceBtn.style.color = 'var(--color-accent)';
          voiceBtn.style.transform = 'scale(1)';
        };

        recognition.onend = () => {
          voiceBtn.style.color = 'var(--color-accent)';
          voiceBtn.style.transform = 'scale(1)';
        };
      } catch (e) {
        fallbackVoicePrompt(searchInput);
      }
    } else {
      fallbackVoicePrompt(searchInput);
    }
  });
}

function fallbackVoicePrompt(searchInput) {
  const query = prompt('Escribe o habla la prenda que deseas buscar (Ej. Chaqueta de cuero, Vestido de gala):');
  if (query && query.trim()) {
    searchInput.value = query.trim();
    searchInput.dispatchEvent(new Event('input', { bubbles: true }));
    showToast(`Buscando: "${query}"`, 'success');
  }
}

// 3. Flash Sales Countdown & Product Grid
function initFlashSales() {
  const container = document.getElementById('flash-products-grid');
  const hoursEl = document.getElementById('flash-hours');
  const minsEl = document.getElementById('flash-minutes');
  const secsEl = document.getElementById('flash-seconds');

  if (!container) return;

  // Render 4 Flash Sale Items
  const flashItems = PRODUCTS.filter(p => p.originalPrice !== null).slice(0, 4);

  const renderFlashGrid = () => {
    container.innerHTML = flashItems.map(item => `
      <div class="product-card" style="border: 1px solid rgba(239,68,68,0.3); background: rgba(18,18,18,0.9); border-radius: 12px; overflow: hidden; position: relative;">
        <div class="product-thumb" style="padding-top: 100%;">
          <img src="${item.image}" alt="${item.name}">
          <span style="position: absolute; top: 10px; left: 10px; background: #ef4444; color: #fff; font-size: 0.75rem; font-weight: bold; padding: 4px 10px; border-radius: 4px; z-index: 5;">
            🔥 -${Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% FLASH
          </span>
        </div>
        <div style="padding: 16px;">
          <h4 style="margin: 0 0 6px 0; font-size: 1rem; color: #ffffff;">${item.name}</h4>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <div style="font-weight: bold; color: var(--color-accent); font-size: 1.1rem;">
              ${store.formatPrice(item.price)}
              <span style="text-decoration: line-through; color: var(--color-text-muted); font-size: 0.85rem; margin-left: 6px;">${store.formatPrice(item.originalPrice)}</span>
            </div>
          </div>
          <!-- Stock Scarcity Bar -->
          <div style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: #ef4444; font-weight: bold; margin-bottom: 4px;">
              <span>¡Solo quedan 3 unidades!</span>
              <span>85% Vendido</span>
            </div>
            <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden;">
              <div style="width: 85%; height: 100%; background: linear-gradient(90deg, #ef4444, #f59e0b);"></div>
            </div>
          </div>
          <button class="btn-primary buy-flash-btn" data-id="${item.id}" style="width: 100%; justify-content: center; padding: 10px; font-size: 0.88rem; background: #ef4444; border-color: #ef4444;">
            <i class="fas fa-bolt"></i> Comprar con Descuento Flash
          </button>
        </div>
      </div>
    `).join('');

    // Attach buy listeners
    container.querySelectorAll('.buy-flash-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        store.addToCart(btn.dataset.id);
        showToast('¡Oferta relámpago agregada al carrito!', 'success');
      });
    });
  };

  renderFlashGrid();

  store.subscribe((event) => {
    if (event === 'CURRENCY_CHANGED') {
      renderFlashGrid();
    }
  });

  // Ticking Midnight Timer
  let secondsLeft = 16125; // ~4h 28m 45s
  setInterval(() => {
    secondsLeft--;
    if (secondsLeft <= 0) secondsLeft = 86400;

    const h = Math.floor(secondsLeft / 3600);
    const m = Math.floor((secondsLeft % 3600) / 60);
    const s = secondsLeft % 60;

    if (hoursEl) hoursEl.textContent = h < 10 ? `0${h}` : `${h}`;
    if (minsEl) minsEl.textContent = m < 10 ? `0${m}` : `${m}`;
    if (secsEl) secsEl.textContent = s < 10 ? `0${s}` : `${s}`;
  }, 1000);
}

// 4. Ruleta VIP Spin Wheel
function initVipWheel() {
  const modal = document.getElementById('vip-wheel-modal');
  const openBtn = document.getElementById('open-wheel-btn');
  const closeBtn = document.getElementById('close-wheel-modal-btn');
  const spinBtn = document.getElementById('spin-wheel-btn');
  const svgBox = document.getElementById('wheel-svg-box');
  const resultBox = document.getElementById('wheel-result-box');
  const prizeTitle = document.getElementById('wheel-prize-title');
  const codeStr = document.getElementById('wheel-code-str');

  if (!modal) return;

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  if (spinBtn && svgBox) {
    let hasSpun = false;

    spinBtn.addEventListener('click', () => {
      if (hasSpun) {
        showToast('Ya has utilizado tu giro de hoy en la Ruleta VIP', 'info');
        return;
      }

      spinBtn.disabled = true;
      spinBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Girando la Ruleta...';

      // 6 slices (60 deg each):
      // Slice 0 (0-60deg): 10% OFF -> WHEEL10
      // Slice 1 (60-120deg): Envío Gratis -> FREESHIP
      // Slice 2 (120-180deg): 20% OFF -> WHEEL20
      // Slice 3 (180-240deg): Regalo VIP -> WELCOME15
      // Slice 4 (240-300deg): 15% OFF -> WHEEL15
      // Slice 5 (300-360deg): Casi lo Logras

      const prizes = [
        { title: '¡Ganaste 10% OFF VIP!', code: 'WHEEL10', angle: 150 },
        { title: '¡Ganaste Envío Express GRATIS!', code: 'FREESHIP', angle: 90 },
        { title: '¡PREMIO MAYOR: 20% OFF VIP!', code: 'WHEEL20', angle: 30 },
        { title: '¡Ganaste Regalo VIP + 15% OFF!', code: 'WELCOME15', angle: 330 },
        { title: '¡Ganaste 15% OFF VIP!', code: 'WHEEL15', angle: 270 }
      ];

      const chosen = prizes[Math.floor(Math.random() * prizes.length)];
      const totalRotation = 1440 + chosen.angle;

      svgBox.style.transform = `rotate(${totalRotation}deg)`;

      setTimeout(() => {
        hasSpun = true;
        spinBtn.innerHTML = '<i class="fas fa-check"></i> ¡Giro Completado!';
        
        if (resultBox && prizeTitle && codeStr) {
          prizeTitle.textContent = chosen.title;
          codeStr.textContent = chosen.code;
          resultBox.style.display = 'block';
        }

        store.applyPromoCode(chosen.code);
        showToast(`¡Felicidades! Cupón ${chosen.code} aplicado automáticamente al carrito.`, 'success');
      }, 4000);
    });
  }
}

// 5. Photo Upload Custom Try-On
function initPhotoTryOn() {
  const photoInput = document.getElementById('user-photo-upload');
  const modalImg = document.querySelector('#virtual-fitting-modal .modal-img-container img');

  if (photoInput && modalImg) {
    photoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          modalImg.src = event.target.result;
          showToast('¡Foto cargada en el Probador 3D con éxito!', 'success');
        };
        reader.readAsDataURL(file);
      }
    });
  }
}
