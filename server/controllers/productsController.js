// ==========================================================================
// AURA ATELIER BACKEND - PRODUCTS CONTROLLER
// ==========================================================================

import { ProductModel } from '../models/Product.js';

export function getProducts(req, res) {
  try {
    const { category, search, maxPrice, sort, page, limit } = req.query;
    const result = ProductModel.getAll({ category, search, maxPrice, sort, page, limit });
    res.json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export function getProductById(req, res) {
  try {
    const product = ProductModel.getById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
