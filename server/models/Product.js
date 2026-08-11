// ==========================================================================
// AURA ATELIER BACKEND - PRODUCT MODEL & QUERY SERVICE
// ==========================================================================

import { PRODUCTS } from '../../js/data.js';

export class ProductModel {
  static getAll({ category, search, maxPrice, sort, page = 1, limit = 50 }) {
    let result = [...PRODUCTS];

    // Filter by Category
    if (category && category !== 'all' && category !== 'todos' && category !== 'coleccion') {
      if (category === 'ofertas') {
        result = result.filter(p => p.originalPrice !== null);
      } else {
        result = result.filter(p => p.category === category);
      }
    }

    // Filter by Price
    if (maxPrice && !isNaN(maxPrice)) {
      const priceCap = parseFloat(maxPrice);
      result = result.filter(p => p.price <= priceCap);
    }

    // Filter by Search Query
    if (search && search.trim()) {
      const query = search.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
        .trim();

      result = result.filter(p => {
        const name = p.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const desc = p.description.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const cat = (p.category || '').toLowerCase();
        
        if (name.includes(query) || desc.includes(query) || cat.includes(query)) return true;

        if ((query.includes('hombre') || query.includes('caballero')) && cat === 'hombres') return true;
        if ((query.includes('mujer') || query.includes('dama')) && cat === 'mujeres') return true;
        if (query.includes('accesorio') && cat === 'accesorios') return true;

        const tokens = query.split(/\s+/).filter(t => t.length > 2);
        return tokens.some(t => name.includes(t) || desc.includes(t));
      });
    }

    // Sorting
    if (sort === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      result.sort((a, b) => b.reviews - a.reviews);
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedItems = result.slice(startIndex, startIndex + limitNum);

    return {
      total: result.length,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(result.length / limitNum),
      products: paginatedItems
    };
  }

  static getById(id) {
    return PRODUCTS.find(p => p.id === id) || null;
  }
}
