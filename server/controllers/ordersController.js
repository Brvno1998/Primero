// ==========================================================================
// AURA ATELIER BACKEND - ORDERS & CHECKOUT CONTROLLER
// ==========================================================================

import { saveOrder, subscribeEmail, db } from '../config/database.js';

export function createOrder(req, res) {
  try {
    const { customer, items, totalAmount, promoCode } = req.body;
    
    if (!items || !items.length) {
      return res.status(400).json({ success: false, message: 'El carrito está vacío' });
    }

    if (!customer || !customer.email || !customer.name) {
      return res.status(400).json({ success: false, message: 'Datos del cliente incompletos' });
    }

    const newOrder = saveOrder({
      customer,
      items,
      totalAmount,
      promoCodeApplied: promoCode || null
    });

    res.status(201).json({
      success: true,
      message: '¡Pedido procesado con éxito!',
      order: newOrder
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export function validatePromoCode(req, res) {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, message: 'Código requerido' });
    }

    const promo = db.promoCodes[code.toUpperCase()];
    if (promo && promo.valid) {
      res.json({ success: true, code: code.toUpperCase(), promo });
    } else {
      res.status(404).json({ success: false, message: 'Código promocional no válido' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export function handleNewsletter(req, res) {
  try {
    const { email } = req.body;
    const result = subscribeEmail(email);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
