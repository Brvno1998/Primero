// ==========================================================================
// AURA ATELIER - THEME MANAGER (DARK / LIGHT LUXE)
// ==========================================================================

import { store } from '../store.js';

export function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const html = document.documentElement;

  const applyTheme = (themeName) => {
    html.setAttribute('data-theme', themeName);
    if (themeToggleBtn) {
      const icon = themeToggleBtn.querySelector('i');
      if (icon) {
        icon.className = themeName === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      }
      themeToggleBtn.setAttribute('title', themeName === 'dark' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro');
    }
  };

  // Apply initial stored theme
  applyTheme(store.theme);

  // Bind toggle click
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      store.toggleTheme();
    });
  }

  // Subscribe to theme store updates
  store.subscribe((event, payload) => {
    if (event === 'THEME_CHANGED') {
      applyTheme(payload.theme);
    }
  });
}
