// ==========================================================================
// AURA ATELIER BACKEND - DATABASE & DATA STORE CONFIGURATION
// ==========================================================================

export const db = {
  orders: [],
  subscribers: [],
  promoCodes: {
    'AURA15OFF': { discountPercent: 15, valid: true },
    'WHEEL10': { discountPercent: 10, valid: true },
    'WHEEL15': { discountPercent: 15, valid: true },
    'WHEEL20': { discountPercent: 20, valid: true },
    'WELCOME15': { discountPercent: 15, valid: true },
    'FREESHIP': { freeShipping: true, valid: true }
  }
};

export function saveOrder(orderData) {
  const orderId = `AURA-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const order = {
    id: orderId,
    timestamp: new Date().toISOString(),
    status: 'CONFIRMED',
    paymentStatus: 'PAID',
    shippingMethod: 'EXPRESS',
    estimatedDelivery: new Date(Date.now() + 86400000 * 2).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }),
    ...orderData
  };
  db.orders.push(order);
  return order;
}

export function subscribeEmail(email) {
  if (!email || !email.includes('@')) {
    return { success: false, message: 'Email inválido' };
  }
  if (!db.subscribers.includes(email)) {
    db.subscribers.push(email);
  }
  return { success: true, message: 'Suscripción exitosa', promoCode: 'AURA15OFF' };
}
