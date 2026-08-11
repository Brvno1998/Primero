// ==========================================================================
// AURA ATELIER - FOOTER INTERACTIVE PANELS & Q&A MODULE
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

  // Feature cards showcase click listener
  const featureCards = document.querySelectorAll('.footer-feature-card');
  featureCards.forEach(card => {
    card.addEventListener('click', () => {
      const panel = card.dataset.panel;
      if (panel === 'size-guide') openSizeGuidePanel();
      else if (panel === 'shipping') openShippingPanel();
      else if (panel === 'returns') openReturnsPanel();
      else if (panel === 'tracking') openOrderTrackingPanel();
      else if (panel === 'sustainability') openSustainabilityPanel();
      else if (panel === 'care') openCarePanel();
      else if (panel === 'vip') openVipPanel();
      else if (panel === 'community') openCommunityPanel();
    });
  });

  // On-page Size Calculator logic
  const pageCalcBtn = document.getElementById('page-calc-btn');
  const pageResultDiv = document.getElementById('page-calc-result');
  if (pageCalcBtn && pageResultDiv) {
    pageCalcBtn.addEventListener('click', () => {
      const chest = parseFloat(document.getElementById('page-calc-chest').value);
      if (!chest || isNaN(chest)) {
        showToast('Ingresa la medida de tu pecho en centímetros', 'info');
        return;
      }
      let size = 'M';
      if (chest < 94) size = 'S';
      else if (chest <= 102) size = 'M';
      else if (chest <= 110) size = 'L';
      else size = 'XL';

      pageResultDiv.style.display = 'block';
      pageResultDiv.innerHTML = `<i class="fas fa-check-circle" style="color: var(--color-accent);"></i> Talla recomendada: <strong>${size}</strong>`;
    });
  }

  // On-page Order Tracking logic
  const pageTrackForm = document.getElementById('page-track-form');
  if (pageTrackForm) {
    pageTrackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Actualizando estado del pedido...', 'info');
      openOrderTrackingPanel();
    });
  }

  const pageReturnsBtn = document.getElementById('page-returns-btn');
  if (pageReturnsBtn) {
    pageReturnsBtn.addEventListener('click', () => {
      openReturnsPanel();
    });
  }

  // Intercept all links inside footer
  const footerLinks = document.querySelectorAll('.footer-links a');

  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const text = link.textContent.trim().toLowerCase();

      // Catalog category jump
      if (href.startsWith('#catalog')) {
        e.preventDefault();
        const catalogSection = document.getElementById('catalog');
        if (catalogSection) {
          catalogSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        if (text.includes('hombre')) triggerCategory('hombres');
        else if (text.includes('mujer')) triggerCategory('mujeres');
        else if (text.includes('accesorio')) triggerCategory('accesorios');
        else if (text.includes('oferta')) triggerCategory('ofertas');
        else if (text.includes('novedad')) triggerCategory('all');
        return;
      }

      if (href === '#hero') return;

      e.preventDefault();

      if (text.includes('guía de talla') || text.includes('talla')) openSizeGuidePanel();
      else if (text.includes('envío') || text.includes('entrega')) openShippingPanel();
      else if (text.includes('devolucion') || text.includes('cambio') || text.includes('devoluciones')) openReturnsPanel();
      else if (text.includes('estado de mi pedido') || text.includes('pedido') || text.includes('rastreo')) openOrderTrackingPanel();
      else if (text.includes('sostenibilidad') || text.includes('tejidos') || text.includes('materiales')) openSustainabilityPanel();
      else if (text.includes('cuidado') || text.includes('prendas')) openCarePanel();
      else if (text.includes('vip') || text.includes('beneficios')) openVipPanel();
      else if (text.includes('comunidad') || text.includes('lookbook')) openCommunityPanel();
      else if (text.includes('pregunta') || text.includes('faq')) openFaqPanel();
      else if (text.includes('privacidad')) openLegalPrivacyPanel();
      else if (text.includes('términos') || text.includes('condiciones')) openTermsPanel();
      else if (text.includes('cookie')) openCookiesPanel();
      else openGenericInfoPanel(link.textContent.trim());
    });
  });

  // Modal Close Listeners
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

  // Helper to bind accordion behavior inside modal Q&A
  function bindModalAccordion() {
    const questions = bodyEl.querySelectorAll('.panel-faq-question');
    questions.forEach(q => {
      q.addEventListener('click', () => {
        const item = q.closest('.panel-faq-item');
        const isOpen = item.classList.contains('open');
        bodyEl.querySelectorAll('.panel-faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });
  }

  // ==========================================================================
  // PANEL RENDERERS WITH RICH Q&A CONTENT
  // ==========================================================================

  function openSizeGuidePanel() {
    titleEl.textContent = 'Guía de Tallas & Medidas';
    subtitleEl.textContent = 'Ajuste Perfecto Garantizado';
    iconEl.innerHTML = '<i class="fas fa-ruler-combined"></i>';

    bodyEl.innerHTML = `
      <div class="panel-hero-img">
        <img src="assets/images/size_guide.jpg" alt="Guía de Tallas AURA">
      </div>

      <p class="panel-lead">
        Nuestras prendas siguen patrones europeos de alta costura. Utiliza nuestra herramienta corporal o consulta la tabla de medidas.
      </p>

      <div class="size-calculator-box">
        <h4><i class="fas fa-calculator"></i> Calculadora Corporal Rápida</h4>
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
        <button id="calc-size-btn" class="btn-primary" style="width: 100%; margin-top: 14px;">Calcular Mi Talla</button>
        <div id="calc-result" class="calc-result" style="display: none;"></div>
      </div>

      <h4 class="panel-section-title">Tabla de Medidas Internacionales (cm)</h4>
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

      <h4 class="panel-section-title"><i class="fas fa-question-circle" style="color: var(--color-accent);"></i> Preguntas Frecuentes de Tallas (Q&A)</h4>
      <div class="panel-faq-list">
        <div class="panel-faq-item open">
          <button class="panel-faq-question">
            <span>¿Qué ocurre si estoy entre dos tallas?</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="panel-faq-answer">
            <p>Recomendamos elegir la talla superior si prefieres un estilo relajado o la talla menor si buscas un corte entallado al cuerpo.</p>
          </div>
        </div>
        <div class="panel-faq-item">
          <button class="panel-faq-question">
            <span>¿Las prendas encogen al lavarse?</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="panel-faq-answer">
            <p>Todas nuestras prendas de algodón orgánico y seda están prelavadas térmicamente para mantener exactamente su dimensión original.</p>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('open');
    bindModalAccordion();

    const calcBtn = document.getElementById('calc-size-btn');
    const resultDiv = document.getElementById('calc-result');
    if (calcBtn && resultDiv) {
      calcBtn.addEventListener('click', () => {
        const chest = parseFloat(document.getElementById('calc-chest').value);
        if (!chest || isNaN(chest)) {
          showToast('Ingresa la medida de tu pecho en centímetros', 'info');
          return;
        }
        let size = 'M';
        if (chest < 94) size = 'S';
        else if (chest <= 102) size = 'M';
        else if (chest <= 110) size = 'L';
        else size = 'XL';

        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `<i class="fas fa-check-circle" style="color: var(--color-accent);"></i> Talla recomendada: <strong>${size}</strong>`;
      });
    }
  }

  function openShippingPanel() {
    titleEl.textContent = 'Envíos y Entregas Express';
    subtitleEl.textContent = 'Logística Global de Lujo';
    iconEl.innerHTML = '<i class="fas fa-truck-fast"></i>';

    bodyEl.innerHTML = `
      <div class="panel-hero-img">
        <img src="assets/images/shipping_info.jpg" alt="Envíos Express AURA">
      </div>

      <div class="shipping-features-grid">
        <div class="shipping-box">
          <i class="fas fa-bolt"></i>
          <h5>Envío Express 24h</h5>
          <p>Gratis en compras superiores a $150. Entregado en caja rígida protegida.</p>
        </div>
        <div class="shipping-box">
          <i class="fas fa-globe"></i>
          <h5>Envíos Internacionales</h5>
          <p>Entregas en 3 a 5 días hábiles a través de DHL Express / FedEx Priority.</p>
        </div>
      </div>

      <h4 class="panel-section-title">Estimador de Tarifas por País</h4>
      <div class="form-group">
        <select id="shipping-dest-select" class="panel-select">
          <option value="es">España (24h) - GRATIS > $150</option>
          <option value="eu">Unión Europea (48/72h) - $9.99</option>
          <option value="am">América (EE.UU., México, Argentina) - 3/5 Días ($14.99)</option>
        </select>
      </div>
      <div id="shipping-dest-info" class="dest-info-box">
        <i class="fas fa-check-circle"></i> Entrega en 24h hábiles con código de rastreo en vivo.
      </div>

      <h4 class="panel-section-title"><i class="fas fa-question-circle" style="color: var(--color-accent);"></i> Preguntas Frecuentes de Envíos (Q&A)</h4>
      <div class="panel-faq-list">
        <div class="panel-faq-item open">
          <button class="panel-faq-question">
            <span>¿Se requiere firma en la entrega?</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="panel-faq-answer">
            <p>Sí. Para garantizar la seguridad del paquete, el mensajero solicitará firma o código PIN de entrega.</p>
          </div>
        </div>
        <div class="panel-faq-item">
          <button class="panel-faq-question">
            <span>¿Tienen gastos de aduana ocultos?</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="panel-faq-answer">
            <p>Todos los impuestos de aduana e IVA están incluidos en el precio final de tu carrito al pagar.</p>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('open');
    bindModalAccordion();
  }

  function openReturnsPanel() {
    titleEl.textContent = 'Garantía & Devoluciones (30 Días)';
    subtitleEl.textContent = 'Cambios sin preguntas ni costes';
    iconEl.innerHTML = '<i class="fas fa-box-open"></i>';

    bodyEl.innerHTML = `
      <div class="panel-hero-img">
        <img src="assets/images/returns_info.jpg" alt="Devoluciones AURA">
      </div>

      <p class="panel-lead">
        Si tu prenda no es de tu agrado o requieres cambio de talla, dispones de 30 días naturales sin costo adicional.
      </p>

      <div class="returns-steps-list">
        <div class="step-card">
          <span class="step-num">1</span>
          <div>
            <h5>Solicita la Devolución</h5>
            <p>Generamos tu etiqueta de transporte prepagada en menos de 1 minuto.</p>
          </div>
        </div>
        <div class="step-card">
          <span class="step-num">2</span>
          <div>
            <h5>Empaca la Prenda</h5>
            <p>Guárdala en su caja original y programa el retiro gratis en tu domicilio.</p>
          </div>
        </div>
        <div class="step-card">
          <span class="step-num">3</span>
          <div>
            <h5>Reembolso en 24h</h5>
            <p>Tras la recepción del paquete abonamos el 100% de tu dinero inmediatamente.</p>
          </div>
        </div>
      </div>

      <h4 class="panel-section-title"><i class="fas fa-question-circle" style="color: var(--color-accent);"></i> Preguntas Frecuentes de Devoluciones (Q&A)</h4>
      <div class="panel-faq-list">
        <div class="panel-faq-item open">
          <button class="panel-faq-question">
            <span>¿Puedo devolver un producto comprado en oferta?</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="panel-faq-answer">
            <p>Sí, las prendas en promoción u ofertas especiales aplican exactamente con la misma garantía de 30 días.</p>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('open');
    bindModalAccordion();
  }

  function openOrderTrackingPanel() {
    titleEl.textContent = 'Rastreo de Pedido en Vivo';
    subtitleEl.textContent = 'Seguimiento Satelital en Tiempo Real';
    iconEl.innerHTML = '<i class="fas fa-location-dot"></i>';

    bodyEl.innerHTML = `
      <div class="panel-hero-img">
        <img src="assets/images/tracking_info.jpg" alt="Rastreo AURA">
      </div>

      <form id="track-order-form">
        <div class="form-group">
          <label>Número de Pedido o Código de Envío:</label>
          <div class="search-input-group" style="width: 100%;">
            <i class="fas fa-barcode"></i>
            <input type="text" id="track-id-input" class="search-input" value="#AURA-98412" style="width: 100%;" required>
          </div>
        </div>
        <button type="submit" class="btn-primary" style="width: 100%;">Consultar Rastreo</button>
      </form>

      <div class="order-status-timeline" style="margin-top: 24px;">
        <div class="timeline-step completed">
          <i class="fas fa-check-circle"></i>
          <div>
            <strong>Pedido Confirmado & Pago Verificado</strong>
            <small>AURA Madrid - 14:30h</small>
          </div>
        </div>
        <div class="timeline-step active">
          <i class="fas fa-truck-fast"></i>
          <div>
            <strong>En Tránsito con Courier Express</strong>
            <small>Entrega estimada: Mañana antes de las 18:00h</small>
          </div>
        </div>
      </div>

      <h4 class="panel-section-title"><i class="fas fa-question-circle" style="color: var(--color-accent);"></i> Preguntas de Rastreo (Q&A)</h4>
      <div class="panel-faq-list">
        <div class="panel-faq-item open">
          <button class="panel-faq-question">
            <span>¿Dónde encuentro mi número de orden?</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="panel-faq-answer">
            <p>Se encuentra en el asunto de tu correo electrónico de confirmación (#AURA-XXXXX) enviado al comprar.</p>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('open');
    bindModalAccordion();
  }

  function openSustainabilityPanel() {
    titleEl.textContent = 'Sostenibilidad & Tejidos Orgánicos';
    subtitleEl.textContent = 'Compromiso Ético AURA 2026';
    iconEl.innerHTML = '<i class="fas fa-leaf"></i>';

    bodyEl.innerHTML = `
      <div class="panel-hero-img">
        <img src="assets/images/sustainability_info.jpg" alt="Sostenibilidad AURA">
      </div>
      <p class="panel-lead">
        Confeccionamos prendas sustentables utilizando algodón 100% orgánico certificado GOTS y embalajes compostables.
      </p>

      <h4 class="panel-section-title"><i class="fas fa-question-circle" style="color: var(--color-accent);"></i> Preguntas Frecuentes de Sostenibilidad (Q&A)</h4>
      <div class="panel-faq-list">
        <div class="panel-faq-item open">
          <button class="panel-faq-question">
            <span>¿Sus prendas contienen plásticos o fibras sintéticas?</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="panel-faq-answer">
            <p>Nuestra colección principal es 100% libre de poliéster virgen y utiliza celulosa biodegradable y seda natural.</p>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('open');
    bindModalAccordion();
  }

  function openCarePanel() {
    titleEl.textContent = 'Guía de Cuidado de Prendas';
    subtitleEl.textContent = 'Cuidado de Seda, Cuero y Lana';
    iconEl.innerHTML = '<i class="fas fa-shirt"></i>';

    bodyEl.innerHTML = `
      <div class="panel-hero-img">
        <img src="assets/images/care_info.jpg" alt="Cuidado AURA">
      </div>
      <p class="panel-lead">
        Instrucciones especializadas recomendadas por nuestros maestros sastres para alargar la vida útil de tus prendas.
      </p>

      <h4 class="panel-section-title"><i class="fas fa-question-circle" style="color: var(--color-accent);"></i> Preguntas Frecuentes de Mantenimiento (Q&A)</h4>
      <div class="panel-faq-list">
        <div class="panel-faq-item open">
          <button class="panel-faq-question">
            <span>¿Cómo limpiar una chaqueta de cuero vacuno?</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="panel-faq-answer">
            <p>Utilizar una bayeta de microfibra ligeramente húmeda y aplicar bálsamo nutritivo para cuero 1 vez al año.</p>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('open');
    bindModalAccordion();
  }

  function openVipPanel() {
    titleEl.textContent = 'Club VIP & Recompensas AURA';
    subtitleEl.textContent = 'Puntos y Accesos Anticipados';
    iconEl.innerHTML = '<i class="fas fa-gem"></i>';

    bodyEl.innerHTML = `
      <div class="panel-hero-img">
        <img src="assets/images/vip_info.jpg" alt="VIP Club AURA">
      </div>

      <h4 class="panel-section-title"><i class="fas fa-question-circle" style="color: var(--color-accent);"></i> Preguntas del Club VIP (Q&A)</h4>
      <div class="panel-faq-list">
        <div class="panel-faq-item open">
          <button class="panel-faq-question">
            <span>¿Los puntos del club tienen vencimiento?</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="panel-faq-answer">
            <p>Tus puntos permanecen activos durante 12 meses continuos y se renuevan automáticamente con cualquier nueva compra.</p>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('open');
    bindModalAccordion();
  }

  function openCommunityPanel() {
    titleEl.textContent = 'Comunidad & Lookbook Editorial';
    subtitleEl.textContent = 'Comparte tu estilo #AURAAtelier2026';
    iconEl.innerHTML = '<i class="fas fa-camera-retro"></i>';

    bodyEl.innerHTML = `
      <div class="panel-hero-img">
        <img src="assets/images/community_info.jpg" alt="Comunidad AURA">
      </div>

      <h4 class="panel-section-title"><i class="fas fa-question-circle" style="color: var(--color-accent);"></i> Preguntas de Comunidad (Q&A)</h4>
      <div class="panel-faq-list">
        <div class="panel-faq-item open">
          <button class="panel-faq-question">
            <span>¿Cómo gano la tarjeta regalo mensual de $200?</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="panel-faq-answer">
            <p>Publica una foto o reel luciendo tu outfit AURA con el hashtag #AURAAtelier2026 y etiquetando @auraatelier.</p>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('open');
    bindModalAccordion();
  }

  function openFaqPanel() {
    titleEl.textContent = 'Preguntas Frecuentes Generales (FAQ)';
    subtitleEl.textContent = 'Centro de Ayuda AURA';
    iconEl.innerHTML = '<i class="fas fa-circle-question"></i>';

    bodyEl.innerHTML = `
      <div class="panel-hero-img">
        <img src="assets/images/faq_info.jpg" alt="FAQ AURA">
      </div>
      <div class="panel-faq-list">
        <div class="panel-faq-item open">
          <button class="panel-faq-question">
            <span>¿Cuáles son los tiempos de entrega nacioanles?</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="panel-faq-answer">
            <p>Los envíos nacionales tardan exactamente 24 horas hábiles desde que el pago es verificado.</p>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('open');
    bindModalAccordion();
  }

  function openLegalPrivacyPanel() {
    titleEl.textContent = 'Política de Privacidad';
    subtitleEl.textContent = 'Protección de Datos SSL 256-bit';
    iconEl.innerHTML = '<i class="fas fa-shield-alt"></i>';

    bodyEl.innerHTML = `
      <p class="panel-lead">Garantizamos la máxima confidencialidad de tus datos personales conforme al Reglamento General de Protección de Datos (RGPD).</p>
      <div class="panel-faq-list">
        <div class="panel-faq-item open">
          <button class="panel-faq-question">
            <span>¿Guardan los datos de mi tarjeta de crédito?</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="panel-faq-answer">
            <p>No. Todos los pagos son procesados directamente por pasarelas seguras (Stripe/PayPal) mediante tokens encriptados.</p>
          </div>
        </div>
      </div>
    `;
    modal.classList.add('open');
    bindModalAccordion();
  }

  function openTermsPanel() {
    titleEl.textContent = 'Términos y Condiciones de Uso';
    subtitleEl.textContent = 'Garantía Legal del Comprador';
    iconEl.innerHTML = '<i class="fas fa-file-contract"></i>';

    bodyEl.innerHTML = `
      <p class="panel-lead">Todas las compras realizadas en AURA Atelier cuentan con validez legal europea y 2 años de garantía contra defectos de fabricación.</p>
    `;
    modal.classList.add('open');
  }

  function openCookiesPanel() {
    titleEl.textContent = 'Política de Cookies';
    subtitleEl.textContent = 'Preferencia de Navegación';
    iconEl.innerHTML = '<i class="fas fa-cookie-bite"></i>';

    bodyEl.innerHTML = `
      <p class="panel-lead">Utilizamos cookies técnicas y analíticas esenciales para ofrecerte una experiencia fluida e interactiva.</p>
    `;
    modal.classList.add('open');
  }

  function openGenericInfoPanel(title) {
    titleEl.textContent = title;
    subtitleEl.textContent = 'Información y Políticas AURA Atelier';
    iconEl.innerHTML = '<i class="fas fa-circle-info"></i>';

    bodyEl.innerHTML = `
      <p class="panel-lead">En <strong>AURA Atelier</strong> nos dedicamos a ofrecer una experiencia de compra de lujo única y personalizada.</p>
    `;

    modal.classList.add('open');
  }

  function triggerCategory(categoryName) {
    if (typeof window.filterCategory === 'function') {
      window.filterCategory(categoryName);
    } else {
      const tabBtn = document.querySelector(`.tab-btn[data-category="${categoryName}"]`);
      if (tabBtn) tabBtn.click();
    }
  }
}
