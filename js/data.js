// ==========================================================================
// AURA ATELIER - PRODUCT CATALOG DATABASE (VERIFIED GENDER IMAGERY)
// ==========================================================================

const MEN_PHOTOS = [
  'assets/images/jacket.jpg',
  'assets/images/hoodie.jpg',
  'assets/images/coat.jpg',
  'assets/images/men_suit.jpg',
  'assets/images/men_shirt.jpg',
  'assets/images/men_trousers.jpg',
  'assets/images/men_bomber.jpg',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&w=600&q=80'
];

const WOMEN_PHOTOS = [
  'assets/images/dress.jpg',
  'assets/images/women_jacket.jpg',
  'assets/images/women_hoodie.jpg',
  'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80'
];

const ACC_PHOTOS = [
  'assets/images/acc_watch.jpg',
  'assets/images/acc_sunglasses.jpg',
  'assets/images/acc_belt.jpg',
  'assets/images/acc_cap.jpg',
  'assets/images/acc_ring.jpg',
  'assets/images/sneakers.jpg',
  'assets/images/handbag.jpg',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=600&q=80'
];

function getUniqueImageUrl(photoList, index, categoryPrefix) {
  const rawUrl = photoList[(index - 1) % photoList.length];
  if (rawUrl.startsWith('http')) {
    return `${rawUrl}&sig=${categoryPrefix}-${index}`;
  }
  return `${rawUrl}?v=${categoryPrefix}-${index}`;
}

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
    colors: ['#121212', '#4e342e', '#424242'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    image: 'assets/images/hoodie.jpg',
    gallery: ['assets/images/hoodie.jpg'],
    description: 'Sudadera masculina de peso pesado (450 GSM) en algodón orgánico cepillado. Diseño relajado de hombros caídos.'
  },
  {
    id: 'prod-4',
    name: 'Abrigo Largo de Lana Clásico',
    category: 'hombres',
    tag: 'Invierno',
    price: 260.00,
    originalPrice: 310.00,
    rating: 4.9,
    reviews: 19,
    stock: 4,
    colors: ['#263238', '#121212', '#3e2723'],
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'assets/images/coat.jpg',
    gallery: ['assets/images/coat.jpg'],
    description: 'Sobrevestido largo masculino en paño de lana 80% virgen. Estructura sastre con solapa cruzada y cierre de tres botones.'
  },
  {
    id: 'prod-5',
    name: 'Traje Ejecutivo Azul Merino',
    category: 'hombres',
    tag: 'Alta Costura',
    price: 340.00,
    originalPrice: null,
    rating: 5.0,
    reviews: 31,
    stock: 6,
    colors: ['#1c2833', '#121212'],
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'assets/images/men_suit.jpg',
    gallery: ['assets/images/men_suit.jpg'],
    description: 'Traje masculino de dos piezas en mezcla de lana merino azul marino. Solapa de muesca clásica y corte entallado slim fit.'
  },
  {
    id: 'prod-6',
    name: 'Camisa Lino Orgánico Italiana',
    category: 'hombres',
    tag: 'Verano Luxe',
    price: 110.00,
    originalPrice: 130.00,
    rating: 4.7,
    reviews: 53,
    stock: 15,
    colors: ['#ffffff', '#e0d8cf', '#263238'],
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'assets/images/men_shirt.jpg',
    gallery: ['assets/images/men_shirt.jpg'],
    description: 'Camisa para hombre 100% lino de cultivo italiano. Botones de nácar natural y tratamiento de lavado suave.'
  },
  {
    id: 'prod-7',
    name: 'Pantalón Tailored Pleated Gabardina',
    category: 'hombres',
    tag: 'Tendencia',
    price: 135.00,
    originalPrice: null,
    rating: 4.8,
    reviews: 22,
    stock: 9,
    colors: ['#3e2723', '#121212', '#78909c'],
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'assets/images/men_trousers.jpg',
    gallery: ['assets/images/men_trousers.jpg'],
    description: 'Pantalón masculino sastre de doble pinza en gabardina de lana de tiro alto con ajustadores laterales de hebilla metálica.'
  },
  {
    id: 'prod-8',
    name: 'Chaqueta Bomber Ante Suede Camel',
    category: 'hombres',
    tag: 'Edición Limitada',
    price: 245.00,
    originalPrice: 280.00,
    rating: 4.9,
    reviews: 14,
    stock: 3,
    colors: ['#c67d0a', '#121212'],
    sizes: ['M', 'L', 'XL'],
    image: 'assets/images/men_bomber.jpg',
    gallery: ['assets/images/men_bomber.jpg'],
    description: 'Chaqueta estilo bomber masculina en ante de piel natural tono camel. Cuello y puños acanalados en punto de lana.'
  },
  {
    id: 'prod-9',
    name: 'Chaqueta Cuero Femme Biker',
    category: 'mujeres',
    tag: 'Popular',
    price: 195.00,
    originalPrice: 230.00,
    rating: 4.9,
    reviews: 37,
    stock: 8,
    colors: ['#121212', '#3e2723'],
    sizes: ['XS', 'S', 'M', 'L'],
    image: 'assets/images/women_jacket.jpg',
    gallery: ['assets/images/women_jacket.jpg'],
    description: 'Chaqueta biker para mujer en piel bovina negra entallada con cremalleras asimétricas y cinturón con hebilla.'
  },
  {
    id: 'prod-10',
    name: 'Hoodie Oversized Velvet Femme',
    category: 'mujeres',
    tag: 'Nuevo',
    price: 89.00,
    originalPrice: null,
    rating: 4.8,
    reviews: 29,
    stock: 11,
    colors: ['#4e342e', '#121212', '#e0d8cf'],
    sizes: ['XS', 'S', 'M', 'L'],
    image: 'assets/images/women_hoodie.jpg',
    gallery: ['assets/images/women_hoodie.jpg'],
    description: 'Sudadera para mujer de corte relaxed oversized en algodón felpado de tacto aterciopelado. Capucha amplia y bolsillo tipo canguro.'
  }
];

// Generator for 350 Men's Clothing Products with 100% Unique URLs
function generate250MenProducts() {
  const menTypes = [
    { name: 'Chaqueta Biker Cuero Nocturna', tag: 'Popular', price: 189.99, desc: 'Chaqueta de cuero vacuno masculino con forro térmico transpirable.' },
    { name: 'Hoodie Heavyweight Oversized', tag: 'Streetwear', price: 85.50, desc: 'Sudadera masculina de algodón orgánico de 450 GSM de caída relajada.' },
    { name: 'Traje Ejecutivo Merino Slim Fit', tag: 'Alta Costura', price: 340.00, desc: 'Traje de 2 piezas en mezcla de lana merino azul marengo con solapa de muesca.' },
    { name: 'Camisa Lino Italiano Pure', tag: 'Verano Luxe', price: 110.00, desc: 'Camisa masculina 100% lino orgánico italiano con cuello mao y botones de nácar.' },
    { name: 'Pantalón Tailored Pleated Gabardina', tag: 'Tendencia', price: 135.00, desc: 'Pantalón masculino de tiro alto con doble pinza en gabardina beige de lana.' },
    { name: 'Chaqueta Bomber Suede Camel', tag: 'Edición Limitada', price: 245.00, desc: 'Chaqueta bomber masculina en ante de cuero tono camel con puños acanalados.' },
    { name: 'Blazer Formal de Lana Fría', tag: 'Elegancia', price: 295.00, desc: 'Blazer cruzado para hombre en lana fría británica tono gris marengo.' },
    { name: 'Trench Coat Clásico Camel', tag: 'Otoño Luxe', price: 310.00, desc: 'Gabardina clásica impermeable para hombre con cinturón hebilla y solapas.' },
    { name: 'Sweater de Cachemira Cuello Alto', tag: 'Invierno VIP', price: 175.00, desc: 'Jersei masculino en 100% cachemira virgen con acabado suave ultrasuave.' },
    { name: 'Camisa Oxford Slim Fit Oxford', tag: 'Esencial', price: 95.00, desc: 'Camisa masculina formal de algodón cepillado de máxima calidad.' },
    { name: 'Cardigan Tejido en Punto Grueso', tag: 'Tendencia', price: 140.00, desc: 'Chaqueta de punto grueso para hombre con botones de madera noble.' },
    { name: 'Polo Piqué Algodón Mercerizado', tag: 'Verano Luxe', price: 78.00, desc: 'Polo masculino premium en tejido piqué mercerizado con brillo satinado.' },
    { name: 'Pantalón Chino Luxe Structured', tag: 'Casual Chic', price: 115.00, desc: 'Pantalón chino masculino en sarga elástica con acabado suave antidesgaste.' },
    { name: 'Chaqueta Denim Trucker Oversized', tag: 'Streetwear', price: 165.00, desc: 'Chaqueta vaquera masculina en mezclilla pesada de tono azul vintage.' },
    { name: 'Abrigo Largo de Paño de Lana', tag: 'Alta Costura', price: 380.00, desc: 'Abrigo masculino sobretodo en paño de lana cashmere de corte impecable.' }
  ];

  const items = [];
  const colorPalettes = [
    ['#121212', '#3e2723'],
    ['#1c2833', '#424242'],
    ['#ffffff', '#78909c'],
    ['#263238', '#c67d0a'],
    ['#d7ccc8', '#111111']
  ];

  for (let i = 1; i <= 350; i++) {
    const base = menTypes[(i - 1) % menTypes.length];
    const imgUrl = getUniqueImageUrl(MEN_PHOTOS, i, 'men');
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
      image: imgUrl,
      gallery: [imgUrl],
      description: `${base.description} Edición masculina de lujo AURA Atelier #${numStr}.`
    });
  }

  return items;
}

// Generator for 350 Women's Clothing Products with 100% Unique URLs
function generate250WomenProducts() {
  const womenTypes = [
    { name: 'Vestido de Seda Satinado Drapeado', tag: 'Exclusivo', price: 220.00, desc: 'Vestido confeccionado en seda 100% natural satinada con caída fluida.' },
    { name: 'Abrigo Clásico de Lana Melange', tag: 'Invierno', price: 260.00, desc: 'Abrigo femenino de corte recto en lana melange con cinturón ajustable.' },
    { name: 'Chaqueta Biker Cuero Femme', tag: 'Tendencia', price: 195.00, desc: 'Chaqueta biker entallada para mujer en piel negra con solapas cruzadas.' },
    { name: 'Hoodie Velvet Oversized Femme', tag: 'Nuevo', price: 89.00, desc: 'Sudadera femenina oversized en algodón felpado de tacto aterciopelado.' },
    { name: 'Vestido de Gala Escote Espalda', tag: 'Alta Costura', price: 320.00, desc: 'Vestido largo de noche para mujer con escote profundo en espalda y corte sirena.' },
    { name: 'Blazer Oversized Tailored Femme', tag: 'Tendencia', price: 210.00, desc: 'Chaqueta blazer holgada con hombreras estructuradas en crepe de lana.' },
    { name: 'Trench Coat Femenino Impermeable', tag: 'Elegancia', price: 285.00, desc: 'Gabardina clásica cruzada para mujer con cinturón y botones de cuerno.' },
    { name: 'Blusa de Seda Pura Manga Larga', tag: 'Luxe', price: 145.00, desc: 'Blusa femenina en seda natural con lazada al cuello y puños camiseros.' },
    { name: 'Falda Plisada Midi Satinada', tag: 'Tendencia', price: 125.00, desc: 'Falda midi de vuelo plisado en tejido satinado metálico de tono champán.' },
    { name: 'Sweater de Cuello V en Cachemira', tag: 'Soft Luxe', price: 168.00, desc: 'Jersei de tacto suave para mujer en hilo fino de cachemira y seda.' },
    { name: 'Vestido Corto Cocktail Elegante', tag: 'Fiesta', price: 185.00, desc: 'Vestido corto entallado con mangas abullonadas y aplicaciones de guipure.' },
    { name: 'Pantalón Palazo Fluido de Seda', tag: 'Verano Luxe', price: 155.00, desc: 'Pantalón ancho femenino de tiro alto en viscosa satén de movimiento ligero.' },
    { name: 'Chaqueta Blazer Corta Tweed', tag: 'Chic', price: 240.00, desc: 'Chaqueta corta estilo Chanel en tejido tweed con botones joya de perlas.' },
    { name: 'Cardigan Largo de Lana Alpaca', tag: 'Invierno', price: 190.00, desc: 'Chaqueta de punto abierto para mujer en lana alpaca peruana extra cálida.' },
    { name: 'Conjunto Top & Falda Elegante', tag: 'Exclusivo', price: 275.00, desc: 'Set de 2 piezas femenino de top estructurado y falda lápiz de alta costura.' }
  ];

  const items = [];
  const colorPalettes = [
    ['#e0d8cf', '#121212'],
    ['#4e342e', '#9e9e9e'],
    ['#8d6e63', '#ffffff'],
    ['#212121', '#d4af37']
  ];

  for (let i = 1; i <= 350; i++) {
    const base = womenTypes[(i - 1) % womenTypes.length];
    const imgUrl = getUniqueImageUrl(WOMEN_PHOTOS, i, 'women');
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
      image: imgUrl,
      gallery: [imgUrl],
      description: `${base.description} Colección femenina de alta costura AURA #${numStr}.`
    });
  }

  return items;
}

// Generator for 100 Luxury Accessory Products with 100% Unique URLs
function generate100Accessories() {
  const accessoryTypes = [
    { name: 'Reloj Chronograph Gold', tag: 'Alta Costura', price: 280, desc: 'Reloj cronógrafo de caja en acero con baño de oro de 18k y cristal de zafiro irrayable.' },
    { name: 'Gafas Aviador Dark Luxe', tag: 'Tendencia', price: 165, desc: 'Gafas de sol estilo aviador con montura metálica titanio y lentes polarizadas antirreflejo.' },
    { name: 'Cinturón Piel Italiana Silver', tag: 'Esencial', price: 95, desc: 'Cinturón de cuero vacuno graneado italiano con hebilla geométrica de latón plateado.' },
    { name: 'Gorra Minimalist Cotton Black', tag: 'Streetwear', price: 48, desc: 'Gorra de visera curva en algodón orgánico pesado con broche metálico regulable posterior.' },
    { name: 'Set de Anillos Signet Silver/Gold', tag: 'Nuevo', price: 75, desc: 'Colección de 3 anillos sello en plata de ley 925 y acabado satinado artesanal.' },
    { name: 'Sneakers Blancas Minimal', tag: 'Esencial', price: 145, desc: 'Zapatillas de piel de becerro italiana con suela ultraligera de goma vulcanizada.' },
    { name: 'Bolso de Mano Luxe Leather', tag: 'Edición Limitada', price: 175, desc: 'Bolso estructurado en cuero graneado con cierres y detalles dorados en baño de 18k.' }
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
    const imgUrl = getUniqueImageUrl(ACC_PHOTOS, i, 'acc');
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
      image: imgUrl,
      gallery: [imgUrl],
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
