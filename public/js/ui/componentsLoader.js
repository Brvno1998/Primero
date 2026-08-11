// ==========================================================================
// AURA ATELIER - COMPONENT LOADER MODULE
// ==========================================================================

export async function loadComponents() {
  const componentsMap = [
    { targetId: 'navbar-component', path: 'components/navbar.html' },
    { targetId: 'hero-component', path: 'components/hero.html' },
    { targetId: 'flash-sales-component', path: 'components/flash-sales.html' },
    { targetId: 'catalog-component', path: 'components/catalog.html' },
    { targetId: 'flash-banner-component', path: 'components/flash-banner.html' },
    { targetId: 'testimonials-component', path: 'components/testimonials.html' },
    { targetId: 'services-hub-component', path: 'components/services-hub.html' },
    { targetId: 'footer-component', path: 'components/footer.html' },
    { targetId: 'modals-component', path: 'components/modals.html' }
  ];

  const promises = componentsMap.map(async (comp) => {
    const targetEl = document.getElementById(comp.targetId);
    if (targetEl && targetEl.children.length === 0) {
      try {
        const response = await fetch(comp.path);
        if (response.ok) {
          const html = await response.text();
          targetEl.innerHTML = html;
        }
      } catch (e) {
        console.warn(`Could not fetch ${comp.path}`);
      }
    }
  });

  await Promise.all(promises);
}
