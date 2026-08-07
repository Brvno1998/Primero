// ==========================================================================
// AURA ATELIER - TOAST NOTIFICATION COMPONENT
// ==========================================================================

export function showToast(message, type = 'info', duration = 3000) {
  let container = document.getElementById('toast-container');
  
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const iconMap = {
    success: 'fa-circle-check',
    warning: 'fa-triangle-exclamation',
    error: 'fa-circle-xmark',
    info: 'fa-circle-info'
  };

  const iconClass = iconMap[type] || iconMap.info;

  toast.innerHTML = `
    <div class="toast-content">
      <i class="fa-solid ${iconClass} toast-icon"></i>
      <span>${message}</span>
    </div>
    <button class="toast-close" aria-label="Cerrar">&times;</button>
  `;

  const closeBtn = toast.querySelector('.toast-close');
  const removeToast = () => {
    toast.classList.add('toast-exit');
    toast.addEventListener('animationend', () => toast.remove());
  };

  closeBtn.addEventListener('click', removeToast);
  container.appendChild(toast);

  setTimeout(removeToast, duration);
}
