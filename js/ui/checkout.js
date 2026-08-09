// ==========================================================================
// AURA ATELIER - MULTI-STEP CHECKOUT MODAL UI
// ==========================================================================

import { store } from '../store.js';
import { showToast } from './toast.js';

let currentStep = 1;

export function initCheckout() {
  const checkoutOverlay = document.getElementById('checkout-modal');
  const closeCheckoutBtn = document.getElementById('close-checkout-btn');
  const checkoutForm = document.getElementById('checkout-form');
  const backStepBtn = document.getElementById('checkout-back-btn');
  const nextStepBtn = document.getElementById('checkout-next-btn');

  if (closeCheckoutBtn) closeCheckoutBtn.addEventListener('click', closeCheckoutModal);

  if (checkoutOverlay) {
    checkoutOverlay.addEventListener('click', (e) => {
      if (e.target === checkoutOverlay) closeCheckoutModal();
    });
  }

  if (backStepBtn) {
    backStepBtn.addEventListener('click', () => {
      if (currentStep > 1) {
        goToStep(currentStep - 1);
      }
    });
  }

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (currentStep === 1) {
        // Validate Step 1
        const name = document.getElementById('checkout-name');
        const email = document.getElementById('checkout-email');
        const address = document.getElementById('checkout-address');

        if (!name.value || !email.value || !address.value) {
          showToast('Por favor completa los campos de envío.', 'warning');
          return;
        }
        goToStep(2);
      } else if (currentStep === 2) {
        // Process Payment (Mock)
        processPayment();
      }
    });
  }
}

export function openCheckoutModal() {
  const checkoutOverlay = document.getElementById('checkout-modal');
  if (!checkoutOverlay) return;

  currentStep = 1;
  goToStep(1);
  renderCheckoutSummary();

  checkoutOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

export function closeCheckoutModal() {
  const checkoutOverlay = document.getElementById('checkout-modal');
  if (checkoutOverlay) {
    checkoutOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function goToStep(stepNumber) {
  currentStep = stepNumber;

  const step1 = document.getElementById('checkout-step-1');
  const step2 = document.getElementById('checkout-step-2');
  const step3 = document.getElementById('checkout-step-3');

  const indicator1 = document.getElementById('step-indicator-1');
  const indicator2 = document.getElementById('step-indicator-2');
  const indicator3 = document.getElementById('step-indicator-3');

  const backBtn = document.getElementById('checkout-back-btn');
  const nextBtn = document.getElementById('checkout-next-btn');

  if (step1) step1.style.display = stepNumber === 1 ? 'block' : 'none';
  if (step2) step2.style.display = stepNumber === 2 ? 'block' : 'none';
  if (step3) step3.style.display = stepNumber === 3 ? 'block' : 'none';

  if (indicator1) indicator1.className = `step-dot ${stepNumber >= 1 ? 'active' : ''}`;
  if (indicator2) indicator2.className = `step-dot ${stepNumber >= 2 ? 'active' : ''}`;
  if (indicator3) indicator3.className = `step-dot ${stepNumber >= 3 ? 'active' : ''}`;

  if (backBtn) backBtn.style.display = stepNumber === 1 || stepNumber === 3 ? 'none' : 'inline-flex';
  if (nextBtn) {
    if (stepNumber === 1) {
      nextBtn.innerHTML = 'Continuar al Pago <i class="fas fa-arrow-right"></i>';
      nextBtn.style.display = 'inline-flex';
    } else if (stepNumber === 2) {
      nextBtn.innerHTML = '<i class="fas fa-lock"></i> Confirmar y Pagar';
      nextBtn.style.display = 'inline-flex';
    } else {
      nextBtn.style.display = 'none';
    }
  }
}

function renderCheckoutSummary() {
  const summaryItems = document.getElementById('checkout-summary-items');
  const summaryTotal = document.getElementById('checkout-summary-total');

  const totals = store.getCartTotals();

  if (summaryTotal) summaryTotal.textContent = `$${totals.finalTotal.toFixed(2)}`;

  if (summaryItems) {
    summaryItems.innerHTML = store.cart.map(item => `
      <div class="checkout-summary-row">
        <span>${item.name} (${item.size}) x${item.quantity}</span>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    `).join('');
  }
}

function processPayment() {
  const nextBtn = document.getElementById('checkout-next-btn');
  if (nextBtn) {
    nextBtn.disabled = true;
    nextBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando Pago...';
  }

  setTimeout(() => {
    if (nextBtn) nextBtn.disabled = false;
    
    // Clear cart and show confirmation step
    const orderNumber = 'AURA-' + Math.floor(100000 + Math.random() * 900000);
    const orderNumEl = document.getElementById('order-number');
    if (orderNumEl) orderNumEl.textContent = orderNumber;

    store.clearCart();
    goToStep(3);
    showToast('¡Pago procesado con éxito! Gracias por tu compra.', 'success');

    // Add Invoice print button to step 3
    const step3 = document.getElementById('checkout-step-3');
    if (step3 && !document.getElementById('checkout-invoice-btn')) {
      const btn = document.createElement('button');
      btn.id = 'checkout-invoice-btn';
      btn.className = 'btn-primary';
      btn.style.cssText = 'margin-top: 20px; width: 100%; justify-content: center;';
      btn.innerHTML = '<i class="fas fa-file-invoice"></i> Ver y Descargar Factura PDF';
      btn.addEventListener('click', () => {
        const invoiceModal = document.getElementById('invoice-modal');
        if (invoiceModal) invoiceModal.classList.add('open');
      });
      step3.appendChild(btn);
    }
  }, 1500);
}
