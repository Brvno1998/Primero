// ==========================================================================
// AURA ATELIER - PRODUCT CATALOG DATABASE
// ==========================================================================

export const PRODUCTS = [
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
    description: 'Chaqueta de cuero vacuno de corte perfecto con acabados metálicos mate y forro interior térmico transpirable. Estilo rebelde y sofisticado.'
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
    description: 'Algodón orgánico pesado de 450 GSM. Hombros caídos y silueta relajada con bolsa canguro y bordado tonal de la marca en el pecho.'
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
  }
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
