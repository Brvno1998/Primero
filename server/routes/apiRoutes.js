// ==========================================================================
// AURA ATELIER BACKEND - REST API ROUTES
// ==========================================================================

import { Router } from 'express';
import { getProducts, getProductById } from '../controllers/productsController.js';
import { createOrder, validatePromoCode, handleNewsletter } from '../controllers/ordersController.js';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ONLINE', app: 'AURA Atelier REST API v2.0', timestamp: new Date() });
});

// Product Routes
router.get('/products', getProducts);
router.get('/products/:id', getProductById);

// Order & Checkout Routes
router.post('/orders', createOrder);
router.post('/promo/validate', validatePromoCode);
router.post('/newsletter', handleNewsletter);

export default router;
