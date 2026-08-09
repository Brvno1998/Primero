// ==========================================================================
// AURA ATELIER - FOOTER PANELS & INTERACTIVE MODAL UTILITIES
// ==========================================================================

import { showToast } from './toast.js';

export function initFooterPanels() {
  const modal = document.getElementById('footer-info-modal');
  const closeBtn = document.getElementById('close-footer-modal-btn');
  const titleEl = document.getElementById('footer-panel-title');
  const subtitleEl = document.getElementById('footer-panel-subtitle');
  const iconEl = document.getElementById('footer-panel-icon');
  const bodyEl = document.getElementById('footer-panel-body');

  if (!modal || !bodyEl) return;

  // Intercept all links inside footer
  const footerLinks = document.querySelectorAll('.footer-links a');

  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const text = link.textContent.trim().toLowerCase();

      // If it's a internal section jump to catalog or hero, handle smoothly
      if (href.startsWith('#catalog')) {
        e.preventDefault();
        const catalogSection = document.getElementById('catalog');
        if (catalogSection) {
          catalogSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Trigger tab click if text matches
        if (text.includes('hombre')) triggerCategory('hombres');
        else if (text.includes('mujer')) triggerCategory('mujeres');
        else if (text.includes('accesorio')) triggerCategory('accesorios');
        else if (text.includes('oferta')) triggerCategory('ofertas');
        else if (text.includes('novedad')) triggerCategory('all');
        return;
      }

      if (href === '#hero') return; // default anchor

      // Otherwise open interactive modal panel
      e.preventDefault();

      if (text.includes('guía de talla') || text.includes('talla')) {
        openSizeGuidePanel();
      } else if (text.includes('envío') || text.includes('entrega')) {
        openShippingPanel();
      } else if (text.includes('devolucion') || text.includes('cambio') || text.includes('devoluciones')) {
        openReturnsPanel();
      } else if (text.includes('estado de mi pedido') || text.includes('pedido') || text.includes('rastreo')) {
        openOrderTrackingPanel();
      } else if (text.includes('pregunta') || text.includes('faq')) {
        const faqSec = document.getElementById('faq');
        if (faqSec) faqSec.scrollIntoView({ behavior: 'smooth' });
      } else {
        openGenericInfoPanel(link.textContent.trim());
      }
    });
  });

  // Close modal listeners
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
    }
  });

  // ------------------------------------------------------------------------
  // PANEL RENDERERS
  // ------------------------------------------------------------------------

  function openSizeGuidePanel() {
    titleEl.textContent = 'Guía de Tallas & Medidas';
    subtitleEl.textContent = 'Ajuste Perfecto Garantizado';
    iconEl.innerHTML = '<i class="fas fa-ruler-combined"></i>';

    bodyEl.innerHTML = `
      <div class="panel-hero-img">
        <img src="assets/images/size_guide.jpg" alt="Guía de Tallas AURA Atelier">
      </div>

      <p class="panel-lead">
        Nuestras prendas están confeccionadas siguiendo patrones europeos de alta costura. Utiliza esta guía interactiva para medir tu cuerpo correctamente.
      </p>

      <div class="size-calculator-box">
        <h4><i class="fas fa-calculator"></i> Calculadora Rápida de Talla</h4>
        <div class="calc-inputs">
          <div class="calc-group">
            <label>Pecho / Busto (cm):</label>
            <input type="number" id="calc-chest" placeholder="Ej. 96" min="60" max="150">
          </div>
          <div class="calc-group">
            <label>Cintura (cm):</label>
            <input type="number" id="calc-waist" placeholder="Ej. 80" min="50" max="140">
          </div>
        </div>
        <button id="calc-size-btn" class="btn-primary style="width: 100%; margin-top: 12px;">Calcular Mi Talla</button>
        <div id="calc-result" class="calc-result" style="display: none;"></div>
      </div>

      <h4 class="panel-section-title">Tabla de Medidas Generales (cm)</h4>
      <div class="table-responsive">
        <table class="panel-table">
          <thead>
            <tr>
              <th>Talla</th>
              <th>Pecho (cm)</th>
              <th>Cintura (cm)</th>
              <th>Cadera (cm)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>S</strong></td><td>88 - 92</td><td>74 - 78</td><td>92 - 96</td></tr>
            <tr><td><strong>M</strong></td><td>96 - 100</td><td>82 - 86</td><td>100 - 104</td></tr>
            <tr><td><strong>L</strong></td><td>104 - 108</td><td>90 - 94</td><td>108 - 112</td></tr>
            <tr><td><strong>XL</strong></td><td>112 - 116</td><td>98 - 102</td><td>116 - 120</td></tr>
          </tbody>
        </table>
      </div>
    `;

    modal.classList.add('open');

    // Attach calculator logic
    const calcBtn = document.getElementById('calc-size-btn');
    const resultDiv = document.getElementById('calc-result');
    if (calcBtn && resultDiv) {
      calcBtn.addEventListener('click', () => {
        const chest = parseFloat(document.getElementById('calc-chest').value);
        if (!chest || isNaN(chest)) {
          showToast('Ingresa la medida de tu pecho en centímetros', 'info');
          return;
        }
        let recommendedSize = 'M';
        if (chest < 94) recommendedSize = 'S';
        else if (chest <= 102) recommendedSize = 'M';
        else if (chest <= 110) recommendedSize = 'L';
        else recommendedSize = 'XL';

        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `<i class="fas fa-check-circle" style="color: var(--color-accent);"></i> Tu talla recomendada es: <strong>${recommendedSize}</strong>`;
      });
    }
  }

  function openShippingPanel() {
    titleEl.textContent = 'Envíos y Entregas Express';
    subtitleEl.textContent = 'Logística Global de Lujo';
    iconEl.innerHTML = '<i class="fas fa-truck-fast"></i>';

    bodyEl.innerHTML = `
      <div class="panel-hero-img">
        <img src="assets/images/shipping_info.jpg" alt="Envíos Express AURA Atelier">
      </div>

      <div class="shipping-features-grid">
        <div class="shipping-box">
          <i class="fas fa-bolt"></i>
          <h5>Envío Express 24h</h5>
          <p>Gratis en pedidos superiores a $150. Entregado en caja rígida con lazo distintivo.</p>
        </div>
        <div class="shipping-box">
          <i class="fas fa-globe"></i>
          <h5>Envíos Internacionales</h5>
          <p>Entregas en 3 a 5 días hábiles a través de DHL Express / FedEx Priority.</p>
        </div>
      </div>

      <h4 class="panel-section-title">Calculador Estimado de Envío</h4>
      <div class="form-group">
        <label>Selecciona tu Destino:</label>
        <select id="shipping-dest-select" class="panel-select">
          <option value="es">España (Península y Baleares) - 24 Horas (GRATIS > $150)</option>
          <option value="eu">Unión Europea - 48/72 Horas ($9.99)</option>
          <option value="am">América (EE.UU., México, Colombia, Argentina) - 3/5 Días ($14.99)</option>
          <option value="row">Resto del Mundo - 4/7 Días ($19.99)</option>
        </select>
      </div>
      <div id="shipping-dest-info" class="dest-info-box">
        <i class="fas fa-info-circle"></i> Envío peninsular en 24h hábiles. Seguimiento satelital en tiempo real habilitado.
      </div>
    `;

    modal.classList.add('open');

    const select = document.getElementById('shipping-dest-select');
    const infoBox = document.getElementById('shipping-dest-info');
    if (select && infoBox) {
      select.addEventListener('change', (e) => {
        const val = e.target.value;
        if (val === 'es') infoBox.innerHTML = '<i class="fas fa-check-circle"></i> <strong>España:</strong> Entrega en 24h hábiles. Gratis si tu pedido supera $150.';
        else if (val === 'eu') infoBox.innerHTML = '<i class="fas fa-truck"></i> <strong>Unión Europea:</strong> Entrega en 48-72h. Tarifa plana $9.99.';
        else if (val === 'am') infoBox.innerHTML = '<i class="fas fa-plane"></i> <strong>América:</strong> DHL Express Prioritario 3-5 días. Rastreo aduanero directo.';
        else infoBox.innerHTML = '<i class="fas fa-globe"></i> <strong>Internacional:</strong> Cobertura global garantizada en 4-7 días.';
      });
    }
  }

  function openReturnsPanel() {
    titleEl.textContent = 'Cambios y Devoluciones';
    subtitleEl.textContent = 'Garantía 100% Satisfacción Sin Preguntas';
    iconEl.innerHTML = '<i class="fas fa-box-open"></i>';

    bodyEl.innerHTML = `
      <div class="panel-hero-img">
        <img src="assets/images/returns_info.jpg" alt="Devoluciones Gratuitas AURA">
      </div>

      <p class="panel-lead">
        Queremos que ames cada prenda AURA. Si la talla no es la adecuada o prefieres cambiar de estilo, dispones de <strong>30 días naturales</strong> desde la recepción.
      </p>

      <div class="returns-steps-list">
        <div class="step-card">
          <span class="step-num">1</span>
          <div>
            <h5>Solicita la Devolución</h5>
            <p>Accede con tu número de pedido y correo. Generaremos tu etiqueta prepagada al instante.</p>
          </div>
        </div>
        <div class="step-card">
          <span class="step-num">2</span>
          <div>
            <h5>Empaca y Entrega</h5>
            <p>Coloca la prenda en su embalaje original y entrega la caja en cualquier punto de recogida autorizado.</p>
          </div>
        </div>
        <div class="step-card">
          <span class="step-num">3</span>
          <div>
            <h5>Reembolso Inmediato</h5>
            <p>Inspeccionamos el producto en 24h y abonamos el 100% de tu dinero en tu tarjeta o método original.</p>
          </div>
        </div>
      </div>

      <button id="start-return-btn" class="btn-primary" style="width: 100%; justify-content: center; margin-top: 20px;">
        <i class="fas fa-undo"></i> Iniciar Solicitud de Devolución
      </button>
    `;

    modal.classList.add('open');

    const returnBtn = document.getElementById('start-return-btn');
    if (returnBtn) {
      returnBtn.addEventListener('click', () => {
        showToast('Abriendo portal de devoluciones. Ingresa tu # de orden', 'info');
        modal.classList.remove('open');
        openOrderTrackingPanel();
      });
    }
  }

  function openOrderTrackingPanel() {
    titleEl.textContent = 'Rastreo de Pedido en Vivo';
    subtitleEl.textContent = 'Consulta el estado de tu paquete';
    iconEl.innerHTML = '<i class="fas fa-location-dot"></i>';

    bodyEl.innerHTML = `
      <div class="panel-hero-img">
        <img src="assets/images/tracking_info.jpg" alt="Seguimiento de Pedido AURA">
      </div>

      <form id="track-order-form" class="track-form">
        <div class="form-group">
          <label>Número de Pedido o Código de Rastreo:</label>
          <div class="search-input-group" style="width: 100%;">
            <i class="fas fa-barcode"></i>
            <input type="text" id="track-id-input" class="search-input" placeholder="Ej: #AURA-98412" value="#AURA-98412" style="width: 100%;" required>
          </div>
        </div>
        <button type="submit" class="btn-primary" style="width: 100%;">
          <i class="fas fa-search"></i> Buscar Pedido
        </button>
      </form>

      <div id="track-results" class="track-results-box" style="margin-top: 24px;">
        <div class="order-status-timeline">
          <div class="timeline-step completed">
            <i class="fas fa-check-circle"></i>
            <div>
              <strong>Pedido Confirmado</strong>
              <small>08 de Agosto, 2026 - 14:30</small>
            </div>
          </div>
          <div class="timeline-step completed">
            <i class="fas fa-box"></i>
            <div>
              <strong>Empacado en Almacén Madrid</strong>
              <small>08 de Agosto, 2026 - 18:00</small>
            </div>
          </div>
          <div class="timeline-step active">
            <i class="fas fa-truck-fast"></i>
            <div>
              <strong>En Tránsito con Courier Express</strong>
              <small>Estimado de entrega: Mañana antes de las 18:00</small>
            </div>
          </div>
          <div class="timeline-step">
            <i class="fas fa-house"></i>
            <div>
              <strong>Entregado al Cliente</strong>
              <small>Pendiente de entrega</small>
            </div>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('open');

    const trackForm = document.getElementById('track-order-form');
    if (trackForm) {
      trackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Actualizando datos de rastreo...', 'info');
      });
    }
  }

  function openGenericInfoPanel(title) {
    titleEl.textContent = title;
    subtitleEl.textContent = 'Información y Políticas AURA Atelier';
    iconEl.innerHTML = '<i class="fas fa-circle-info"></i>';

    bodyEl.innerHTML = `
      <p class="panel-lead">
        En <strong>AURA Atelier</strong> nos dedicamos a ofrecer una experiencia de compra de lujo única, transparente y personalizada.
      </p>
      <div class="generic-info-card">
        <h4><i class="fas fa-shield-halved"></i> Compromiso con la Excelencia</h4>
        <p>Todos nuestros productos cuentan con certificados de autenticidad, producción ética y embalaje 100% reciclable.</p>
      </div>
      <p>Para consultas personalizadas sobre <em>${title}</em>, puedes escribirnos directamente a <a href="mailto:contacto@auraatelier.com" style="color: var(--color-accent); font-weight: 700;">contacto@auraatelier.com</a>.</p>
    `;

    modal.classList.add('open');
  }

  function triggerCategory(categoryName) {
    const tabBtn = document.querySelector(`.tab-btn[data-category="${categoryName}"]`);
    if (tabBtn) {
      tabBtn.click();
    }
  }
}
