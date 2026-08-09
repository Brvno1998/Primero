// ==========================================================================
// AURA ATELIER - PRODUCT CATALOG DATABASE (600+ ITEMS)
// ==========================================================================

const BASE_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Chaqueta de Cuero Nocturna',
    category: 'hombres',
    tag: 'Popular',
    price: 189.99,
    originalPrice: 220.00,
    rating: 4.9,
    reviews: 42,
    stock: 7,
    colors: ['#121212', '#3e2723', '#263238'],
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'assets/images/jacket.jpg',
    gallery: ['assets/images/jacket.jpg'],
    description: 'Chaqueta de cuero vacuno de corte masculino perfecto con acabados metálicos mate y forro interior térmico transpirable.'
  },
  {
    id: 'prod-2',
    name: 'Vestido de Seda Minimalista',
    category: 'mujeres',
    tag: 'Exclusivo',
    price: 220.00,
    originalPrice: null,
    rating: 5.0,
    reviews: 28,
    stock: 5,
    colors: ['#e0d8cf', '#121212', '#8d6e63'],
    sizes: ['XS', 'S', 'M', 'L'],
    image: 'assets/images/dress.jpg',
    gallery: ['assets/images/dress.jpg'],
    description: 'Confeccionado en seda 100% natural de tono beige satinado. Caída fluida con escote drapeado suave ideal para noches y eventos formales.'
  },
  {
    id: 'prod-3',
    name: 'Hoodie Oversized Streetwear',
    category: 'hombres',
    tag: 'Tendencia',
    price: 85.50,
    originalPrice: 95.00,
    rating: 4.8,
    reviews: 64,
    stock: 12,
    colors: ['#212121', '#546e7a', '#78909c'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: 'assets/images/hoodie.jpg',
    gallery: ['assets/images/hoodie.jpg'],
    description: 'Sudadera masculina de algodón orgánico pesado de 450 GSM. Hombros caídos y silueta relajada con bolsa canguro.'
  },
  {
    id: 'prod-4',
    name: 'Sneakers Blancas Minimal',
    category: 'accesorios',
    tag: 'Esencial',
    price: 145.00,
    originalPrice: null,
    rating: 4.7,
    reviews: 51,
    stock: 9,
    colors: ['#ffffff', '#121212'],
    sizes: ['38', '40', '42', '44'],
    image: 'assets/images/sneakers.jpg',
    gallery: ['assets/images/sneakers.jpg'],
    description: 'Zapatillas de piel de becerro italiana con suela ultraligera de goma vulcanizada. Plantilla anatómica extraíble para máximo confort.'
  },
  {
    id: 'prod-5',
    name: 'Abrigo Clásico de Lana',
    category: 'mujeres',
    tag: 'Invierno',
    price: 260.00,
    originalPrice: 310.00,
    rating: 4.9,
    reviews: 19,
    stock: 4,
    colors: ['#4e342e', '#212121', '#9e9e9e'],
    sizes: ['S', 'M', 'L'],
    image: 'assets/images/coat.jpg',
    gallery: ['assets/images/coat.jpg'],
    description: 'Corte recto con solapa entallada y cinturón ajustable. Elaborado con mezcla de lana melange de tonos cálidos y acabado aterciopelado.'
  },
  {
    id: 'prod-6',
    name: 'Bolso de Mano Luxe',
    category: 'accesorios',
    tag: 'Edición Limitada',
    price: 175.00,
    originalPrice: null,
    rating: 4.9,
    reviews: 33,
    stock: 3,
    colors: ['#3e2723', '#121212', '#d4af37'],
    sizes: ['Única'],
    image: 'assets/images/handbag.jpg',
    gallery: ['assets/images/handbag.jpg'],
    description: 'Bolso estructurado en cuero graneado con cierres y detalles dorados en baño de 18k. Incluye correa ajustable de hombro desmontable.'
  },
  {
    id: 'prod-7',
    name: 'Traje Ejecutivo Slim Fit',
    category: 'hombres',
    tag: 'Alta Costura',
    price: 340.00,
    originalPrice: 395.00,
    rating: 5.0,
    reviews: 21,
    stock: 6,
    colors: ['#1c2833', '#111111'],
    sizes: ['48', '50', '52', '54'],
    image: 'assets/images/men_suit.jpg',
    gallery: ['assets/images/men_suit.jpg'],
    description: 'Traje de 2 piezas confeccionado en mezcla de lana merino azul marengo. Solapa de muesca entallada, forro de satén suave y pantalones con raya marcada.'
  },
  {
    id: 'prod-8',
    name: 'Camisa Lino Italiano Pure',
    category: 'hombres',
    tag: 'Verano Luxe',
    price: 110.00,
    originalPrice: null,
    rating: 4.8,
    reviews: 39,
    stock: 14,
    colors: ['#ffffff', '#bbdefb', '#d7ccc8'],
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'assets/images/men_shirt.jpg',
    gallery: ['assets/images/men_shirt.jpg'],
    description: 'Camisa confeccionada en 100% lino orgánico italiano de tacto ultra suave y transpirable. Cuello mao y botones de nácar natural.'
  },
  {
    id: 'prod-9',
    name: 'Pantalón Tailored Pleated',
    category: 'hombres',
    tag: 'Tendencia',
    price: 135.00,
    originalPrice: 155.00,
    rating: 4.9,
    reviews: 18,
    stock: 8,
    colors: ['#d7ccc8', '#424242', '#121212'],
    sizes: ['30', '32', '34', '36'],
    image: 'assets/images/men_trousers.jpg',
    gallery: ['assets/images/men_trousers.jpg'],
    description: 'Pantalón de vestir de tiro alto con pinzas dobles en gabardina beige de algodón y lana. Silueta holgada con caída elegante y bolsillos laterales.'
  },
  {
    id: 'prod-10',
    name: 'Chaqueta Bomber Suede Camel',
    category: 'hombres',
    tag: 'Edición Limitada',
    price: 245.00,
    originalPrice: 290.00,
    rating: 5.0,
    reviews: 27,
    stock: 5,
    colors: ['#c67d0a', '#3e2723'],
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'assets/images/men_bomber.jpg',
    gallery: ['assets/images/men_bomber.jpg'],
    description: 'Chaqueta estilo bomber en cuero de ante suave tono camel. Puños y cuello elásticos acanalados con doble cremallera metálica de latón.'
  },
  {
    id: 'prod-11',
    name: 'Chaqueta Biker Cuero Femme',
    category: 'mujeres',
    tag: 'Tendencia',
    price: 195.00,
    originalPrice: 230.00,
    rating: 4.9,
    reviews: 35,
    stock: 8,
    colors: ['#121212', '#4e342e'],
    sizes: ['XS', 'S', 'M', 'L'],
    image: 'assets/images/women_jacket.jpg',
    gallery: ['assets/images/women_jacket.jpg'],
    description: 'Chaqueta estilo biker entallada para mujer en piel de becerro negra con solapas cruzadas y herrajes plateados cromados.'
  },
  {
    id: 'prod-12',
    name: 'Hoodie Oversized Femme Velvet',
    category: 'mujeres',
    tag: 'Nuevo',
    price: 89.00,
    originalPrice: null,
    rating: 4.8,
    reviews: 22,
    stock: 11,
    colors: ['#212121', '#8d6e63'],
    sizes: ['XS', 'S', 'M', 'L'],
    image: 'assets/images/women_hoodie.jpg',
    gallery: ['assets/images/women_hoodie.jpg'],
    description: 'Sudadera para mujer de corte relaxed oversized en algodón felpado de tacto aterciopelado. Capucha amplia y bolsillo tipo canguro.'
  }
];

// Generator for 250 Men's Clothing Products
function generate250MenProducts() {
  const menTypes = [
    { name: 'Chaqueta Biker Cuero Nocturna', image: 'assets/images/jacket.jpg', tag: 'Popular', price: 189.99, desc: 'Chaqueta de cuero vacuno masculino con forro térmico transpirable.' },
    { name: 'Hoodie Heavyweight Oversized', image: 'assets/images/hoodie.jpg', tag: 'Streetwear', price: 85.50, desc: 'Sudadera masculina de algodón orgánico de 450 GSM de caída relajada.' },
    { name: 'Traje Ejecutivo Merino Slim Fit', image: 'assets/images/men_suit.jpg', tag: 'Alta Costura', price: 340.00, desc: 'Traje de 2 piezas en mezcla de lana merino azul marengo con solapa de muesca.' },
    { name: 'Camisa Lino Italiano Pure', image: 'assets/images/men_shirt.jpg', tag: 'Verano Luxe', price: 110.00, desc: 'Camisa masculina 100% lino orgánico italiano con cuello mao y botones de nácar.' },
    { name: 'Pantalón Tailored Pleated Gabardina', image: 'assets/images/men_trousers.jpg', tag: 'Tendencia', price: 135.00, desc: 'Pantalón masculino de tiro alto con doble pinza en gabardina beige de lana.' },
    { name: 'Chaqueta Bomber Suede Camel', image: 'assets/images/men_bomber.jpg', tag: 'Edición Limitada', price: 245.00, desc: 'Chaqueta bomber masculina en ante de cuero tono camel con puños acanalados.' }
  ];

  const items = [];
  const colorPalettes = [
    ['#121212', '#3e2723'],
    ['#1c2833', '#424242'],
    ['#ffffff', '#78909c'],
    ['#263238', '#c67d0a'],
    ['#d7ccc8', '#111111']
  ];

  for (let i = 1; i <= 250; i++) {
    const base = menTypes[(i - 1) % menTypes.length];
    const numStr = i < 10 ? `00${i}` : (i < 100 ? `0${i}` : `${i}`);
    const isDiscount = i % 4 === 0;
    const origPrice = isDiscount ? Math.round(base.price * 1.2) : null;

    items.push({
      id: `men-item-${i}`,
      name: `${base.name} N°${numStr}`,
      category: 'hombres',
      tag: base.tag,
      price: base.price + (i % 9) * 4,
      originalPrice: origPrice,
      rating: parseFloat((4.6 + (i % 5) * 0.1).toFixed(1)),
      reviews: 15 + (i * 2),
      stock: 4 + (i % 12),
      colors: colorPalettes[i % colorPalettes.length],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      image: base.image,
      gallery: [base.image],
      description: `${base.description} Edición masculina de lujo AURA Atelier #${numStr}.`
    });
  }

  return items;
}

// Generator for 250 Women's Clothing Products
function generate250WomenProducts() {
  const womenTypes = [
    { name: 'Vestido de Seda Satinado Drapeado', image: 'assets/images/dress.jpg', tag: 'Exclusivo', price: 220.00, desc: 'Vestido confeccionado en seda 100% natural satinada con caída fluida.' },
    { name: 'Abrigo Clásico de Lana Melange', image: 'assets/images/coat.jpg', tag: 'Invierno', price: 260.00, desc: 'Abrigo femenino de corte recto en lana melange con cinturón ajustable.' },
    { name: 'Chaqueta Biker Cuero Femme', image: 'assets/images/women_jacket.jpg', tag: 'Tendencia', price: 195.00, desc: 'Chaqueta biker entallada para mujer en piel negra con solapas cruzadas.' },
    { name: 'Hoodie Velvet Oversized Femme', image: 'assets/images/women_hoodie.jpg', tag: 'Nuevo', price: 89.00, desc: 'Sudadera femenina oversized en algodón felpado de tacto aterciopelado.' }
  ];

  const items = [];
  const colorPalettes = [
    ['#e0d8cf', '#121212'],
    ['#4e342e', '#9e9e9e'],
    ['#8d6e63', '#ffffff'],
    ['#212121', '#d4af37']
  ];

  for (let i = 1; i <= 250; i++) {
    const base = womenTypes[(i - 1) % womenTypes.length];
    const numStr = i < 10 ? `00${i}` : (i < 100 ? `0${i}` : `${i}`);
    const isDiscount = i % 4 === 0;
    const origPrice = isDiscount ? Math.round(base.price * 1.22) : null;

    items.push({
      id: `women-item-${i}`,
      name: `${base.name} N°${numStr}`,
      category: 'mujeres',
      tag: base.tag,
      price: base.price + (i % 8) * 5,
      originalPrice: origPrice,
      rating: parseFloat((4.7 + (i % 4) * 0.1).toFixed(1)),
      reviews: 18 + (i * 2),
      stock: 3 + (i % 10),
      colors: colorPalettes[i % colorPalettes.length],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      image: base.image,
      gallery: [base.image],
      description: `${base.description} Colección femenina de alta costura AURA #${numStr}.`
    });
  }

  return items;
}

// Generator for 100 Luxury Accessory Products
function generate100Accessories() {
  const accessoryTypes = [
    { name: 'Reloj Chronograph Gold', image: 'assets/images/acc_watch.jpg', tag: 'Alta Costura', price: 280, desc: 'Reloj cronógrafo de caja en acero con baño de oro de 18k y cristal de zafiro irrayable.' },
    { name: 'Gafas Aviador Dark Luxe', image: 'assets/images/acc_sunglasses.jpg', tag: 'Tendencia', price: 165, desc: 'Gafas de sol estilo aviador con montura metálica titanio y lentes polarizadas antirreflejo.' },
    { name: 'Cinturón Piel Italiana Silver', image: 'assets/images/acc_belt.jpg', tag: 'Esencial', price: 95, desc: 'Cinturón de cuero vacuno graneado italiano con hebilla geométrica de latón plateado.' },
    { name: 'Gorra Minimalist Cotton Black', image: 'assets/images/acc_cap.jpg', tag: 'Streetwear', price: 48, desc: 'Gorra de visera curva en algodón orgánico pesado con broche metálico regulable posterior.' },
    { name: 'Set de Anillos Signet Silver/Gold', image: 'assets/images/acc_ring.jpg', tag: 'Nuevo', price: 75, desc: 'Colección de 3 anillos sello en plata de ley 925 y acabado satinado artesanal.' },
    { name: 'Sneakers Blancas Minimal', image: 'assets/images/sneakers.jpg', tag: 'Esencial', price: 145, desc: 'Zapatillas de piel de becerro italiana con suela ultraligera de goma vulcanizada.' },
    { name: 'Bolso de Mano Luxe Leather', image: 'assets/images/handbag.jpg', tag: 'Edición Limitada', price: 175, desc: 'Bolso estructurado en cuero graneado con cierres y detalles dorados en baño de 18k.' }
  ];

  const accessoryItems = [];
  const colorPalettes = [
    ['#121212', '#d4af37'],
    ['#3e2723', '#c0c0c0'],
    ['#ffffff', '#263238'],
    ['#b71c1c', '#121212'],
    ['#1b5e20', '#d4af37']
  ];

  for (let i = 1; i <= 100; i++) {
    const base = accessoryTypes[(i - 1) % accessoryTypes.length];
    const itemNumber = i < 10 ? `0${i}` : i;
    const isDiscount = i % 3 === 0;
    const origPrice = isDiscount ? Math.round(base.price * 1.25) : null;
    
    accessoryItems.push({
      id: `acc-item-${i}`,
      name: `${base.name} N°${itemNumber}`,
      category: 'accesorios',
      tag: base.tag,
      price: base.price + (i % 7) * 5,
      originalPrice: origPrice,
      rating: parseFloat((4.5 + (i % 6) * 0.1).toFixed(1)),
      reviews: 12 + (i * 3),
      stock: 5 + (i % 15),
      colors: colorPalettes[i % colorPalettes.length],
      sizes: ['Única'],
      image: base.image,
      gallery: [base.image],
      description: `${base.description} Edición numerada de colección #${itemNumber}.`
    });
  }

  return accessoryItems;
}

export const PRODUCTS = [
  ...BASE_PRODUCTS,
  ...generate250MenProducts(),
  ...generate250WomenProducts(),
  ...generate100Accessories()
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Valentina Rossi',
    role: 'Estilista de Moda',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    comment: 'La calidad de las prendas de AURA supera cualquier estándar. El abrigo de lana y la chaqueta de cuero son verdaderas piezas de arte.',
    rating: 5
  },
  {
    id: 2,
    name: 'Carlos Mendoza',
    role: 'Diseñador Creativo',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    comment: 'El corte oversized del hoodie y la atención al detalle metálico muestran una maestría técnica notable. Mi tienda favorita del 2026.',
    rating: 5
  },
  {
    id: 3,
    name: 'Sophia Chen',
    role: 'Arquitecta de Interiores',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    comment: 'El empaque, la rapidez del envío express y la caída del vestido de seda me fascinaron. Experiencia de compra de lujo total.',
    rating: 5
  }
];

export const FAQS = [
  {
    question: '¿Cuáles son los tiempos y costos de envío?',
    answer: 'Ofrecemos envío estándar en 2-4 días laborables y Envío Express gratuito en todos los pedidos superiores a $150 USD con entrega en 24-48 horas.'
  },
  {
    question: '¿Puedo solicitar cambios o devoluciones?',
    answer: 'Sí, dispones de 30 días naturales desde la recepción de tu pedido para solicitar cambios de talla o devoluciones totalmente gratuitas sin preguntas.'
  },
  {
    question: '¿Qué garantía tienen los materiales de cuero y lana?',
    answer: 'Todas nuestras prendas cuentan con certificado de autenticidad y garantía de 2 años contra defectos de fabricación o costuras.'
  },
  {
    question: '¿Cómo aplico mi código promocional?',
    answer: 'Ingresa tu código (como AURA2026 para un 20% de descuento) directamente en la casilla del Carrito de Compras antes de proceder al pago.'
  }
];
