/* Asala catalogue for the brand demos.
   Pieces, patterns, materials, finishes, box sizes and stickers come from the Asala brand book
   (Asala_Branding_Extended.pdf). Prices are placeholders until the shop sets them. */
(function () {
  'use strict';
  var IMG = 'brand/';

  var PRODUCTS = [
    { id: 'dome', cat: 'earrings', coll: 'dome', price: 180, tones: ['gold', 'silver'], photo: IMG + 'dome-render.jpg', photoTone: 'gold',
      alts: [IMG + 'dome-worn.jpg', IMG + 'dome-stone.jpg'], madeToOrder: true, configurable: true,
      ar: 'أقراط القبة', en: 'Dome earrings',
      dAr: 'مستوحاة من قبة الصخرة: قبة مخرّمة بنقش هندسي فوق أربعة أقواس، تتدلى منها ثلاث معيّنات. مقاس 24 × 28 مم، مقصوصة بالليزر وحوافها مشطّبة باليد.',
      dEn: 'Inspired by the Dome of the Rock: a pierced geometric dome over four arches, with three hanging diamonds. 24 × 28 mm, laser cut, edges finished by hand.' },
    { id: 'dome-teal', cat: 'earrings', coll: 'najma', price: 95, tones: ['gold'], photo: IMG + 'dome-teal.jpg', photoTone: 'gold',
      alts: [IMG + 'sketch-plan.jpg'],
      ar: 'أقراط القبة الفيروزية', en: 'Turquoise dome earrings',
      dAr: 'نصف قبة ذهبية مخرّمة فوق أقواس فيروزية من طين البوليمر، تتدلى منها مربعات بيضاء.', dEn: 'A pierced gold half-dome over turquoise arches in polymer clay, with white hanging squares.' },
    { id: 'arcs', cat: 'earrings', coll: 'najma', price: 70, tones: ['gold'], photo: IMG + 'clay-arcs.jpg', photoTone: 'gold',
      ar: 'أقراط الأقواس', en: 'Arc earrings',
      dAr: 'قوس مزدوج من طين البوليمر بلون العاج، يعبره قضيب ذهبي.', dEn: 'A double arc in ivory polymer clay, crossed by a gold bar.' },
    { id: 'mihrab', cat: 'earrings', coll: 'najma', price: 75, tones: ['gold'], photo: IMG + 'pink-teal.png', photoTone: 'gold', cutout: true,
      ar: 'أقراط المحراب', en: 'Mihrab earrings',
      dAr: 'قطعتان بلون الورد بشكل المحراب، تجمعهما قطعة فيروزية منقّطة.', dEn: 'Two rose pieces shaped like a mihrab, joined by a speckled turquoise band.' },
    { id: 'horseshoe', cat: 'earrings', coll: 'dome', price: 85, tones: ['gold'], photo: IMG + 'horseshoe-close.jpg', photoTone: 'gold', alts: [IMG + 'woman-arch.jpg'],
      ar: 'أقراط قوس الحدوة', en: 'Horseshoe arch earrings',
      dAr: 'قوس على شكل حدوة الحصان بلونَي الذهب والفضة، مستوحى من بوابات الأفنية.', dEn: 'A horseshoe arch in gold and silver tones, drawn from courtyard gateways.' },
    { id: 'branch', cat: 'earrings', coll: 'najma', price: 90, tones: ['silver'], photo: IMG + 'cover-ear.jpg', photoTone: 'silver',
      ar: 'أقراط الغصن', en: 'Branch earrings',
      dAr: 'سلك فضي رفيع ينحني كغصن زيتون.', dEn: 'A fine silver wire that bends like an olive branch.' },
    { id: 'lotus', cat: 'necklace', coll: 'dome', price: 160, tones: ['gold'], photo: IMG + 'lotus-pendant.jpg', photoTone: 'gold',
      ar: 'قلادة اللوتس', en: 'Lotus pendant',
      dAr: 'دلاية هندسية مفرّغة على شكل زهرة لوتس، على سلسلة رفيعة.', dEn: 'An open geometric lotus pendant on a fine chain.' }
  ];

  // Drawings from the brand book: designs in progress, shown but not sold yet
  var SKETCHBOOK = [
    { img: IMG + 'ill-red-diamond.png', ar: 'المعيّن الأحمر', en: 'Red diamond' },
    { img: IMG + 'ill-red-oval.png', ar: 'الفانوس', en: 'The lantern' },
    { img: IMG + 'ill-star-round.png', ar: 'النجمة المستديرة', en: 'Round star' },
    { img: IMG + 'ill-drop-earring.png', ar: 'القطرة المتدرجة', en: 'Tiered drop' }
  ];

  var COLLECTIONS = {
    dome:  { ar: 'مجموعة القبة', en: 'The Dome collection', dAr: 'زخارف قبة الصخرة والأقواس، مقصوصة بالليزر.', dEn: 'Dome of the Rock patterns and arches, laser cut.' },
    najma: { ar: 'مجموعة النجمة', en: 'The Najma collection', dAr: 'أقراط من طين البوليمر والفضة، بأشكال من العمارة الإسلامية.', dEn: 'Polymer-clay and silver earrings, shaped by Islamic architecture.' }
  };

  // The four pattern studies on the Dome of the Rock design board
  var PATTERNS = [
    { id: 'geometric', img: IMG + 'pat-geometric.jpg', ar: 'نمط هندسي إسلامي', en: 'Islamic geometric' },
    { id: 'star', img: IMG + 'pat-star.jpg', ar: 'نجمة ثمانية', en: 'Eight-point star' },
    { id: 'mashrabiya', img: IMG + 'pat-mashrabiya.jpg', ar: 'مشربية إسلامية', en: 'Mashrabiya' },
    { id: 'tatreez', img: IMG + 'pat-tatreez.jpg', ar: 'نقش التطريز الفلسطيني', en: 'Palestinian tatreez' }
  ];
  // Material options A/B/C from the manufacturing notes (prices are placeholders)
  var MATERIALS = [
    { id: 'A', tone: 'gold', price: 180, ar: 'نحاس بطلاء ذهب 18 قيراط', en: 'Brass, 18K gold plating', nAr: 'سماكة الطلاء 1.5 ميكرون', nEn: '1.5 micron plating' },
    { id: 'B', tone: 'silver', price: 240, ar: 'فضة استرليني 925', en: '925 sterling silver', nAr: 'تشطيب فضي مطفي', nEn: 'Matte silver finish' },
    { id: 'C', tone: 'gold', price: 290, ar: 'فضة 925 بطبقة ذهب (فيرمِيل)', en: '925 silver, 18K gold vermeil', nAr: 'فضة مطلية بذهب 18 قيراط', nEn: 'Silver plated in 18K gold' }
  ];
  var FINISHES = [
    { id: 'gold-shiny', img: IMG + 'fin-gold-shiny.jpg', ar: 'ذهب لامع', en: 'Shiny gold', tone: 'gold' },
    { id: 'gold-matte', img: IMG + 'fin-gold-matte.jpg', ar: 'ذهب مطفي', en: 'Matte gold', tone: 'gold' },
    { id: 'silver-shiny', img: IMG + 'fin-silver-shiny.jpg', ar: 'فضة لامعة', en: 'Shiny silver', tone: 'silver' },
    { id: 'silver-matte', img: IMG + 'fin-silver-matte.jpg', ar: 'فضة مطفية', en: 'Matte silver', tone: 'silver' }
  ];
  // Packaging family from the brand book (external dimensions in mm, sizing indicative)
  var BOXES = [
    { id: 'ring', dims: '70 × 70 × 50', price: 0, ar: 'علبة الأقراط', en: 'Earring box', dAr: 'غطاء صلب، حشوة عاجية من المخمل.', dEn: 'Rigid lift-off lid, ivory microsuede insert.' },
    { id: 'necklace', dims: '180 × 220 × 40', price: 10, ar: 'علبة القلادة', en: 'Necklace box', dAr: 'علبة عرض بمكان للدلاية.', dEn: 'Presentation box with a pendant space.' },
    { id: 'gift', dims: '260 × 260 × 90', price: 25, ar: 'صندوق الهدية الكبير', en: 'Large gift box', dAr: 'غطاء مغناطيسي وحجيرات قابلة للتعديل.', dEn: 'Magnetic flap and adjustable compartments.' }
  ];
  var SEALS = [
    { id: 'red', color: '#C6383C', ink: '#F5F1E9', ar: 'ختم أحمر', en: 'Red seal' },
    { id: 'charcoal', color: '#33342F', ink: '#F5F1E9', ar: 'ختم فحمي', en: 'Charcoal seal' },
    { id: 'ivory', color: '#E9E2D5', ink: '#33342F', ar: 'ختم عاجي', en: 'Ivory seal' }
  ];

  function install(S) {
    S.PRODUCTS.length = 0;
    PRODUCTS.forEach(function (p) { S.PRODUCTS.push(p); });
    S.CATS.earrings = { ar: 'أقراط', en: 'Earrings' };
    S.CATS.necklace = { ar: 'قلائد', en: 'Necklaces' };
  }

  window.ASALA = { PRODUCTS: PRODUCTS, SKETCHBOOK: SKETCHBOOK, COLLECTIONS: COLLECTIONS, PATTERNS: PATTERNS, MATERIALS: MATERIALS,
    FINISHES: FINISHES, BOXES: BOXES, SEALS: SEALS, install: install,
    MARK: '<svg viewBox="0 0 100 104" fill="none" aria-hidden="true"><g stroke="currentColor" stroke-width="1.15"><path d="M50 3 L95 48 L50 93 L5 48 Z"/><path d="M50 7 L95 52 L50 97 L5 52 Z"/><path d="M50 11 L95 56 L50 101 L5 56 Z"/><path d="M50 15 L87 52 L50 89 L13 52 Z"/></g><g fill="currentColor"><path d="M43.8 34.5 L56.2 34.5 L56.2 44.8 L50 49.6 L43.8 44.8 Z"/><path d="M67.5 45.8 L67.5 58.2 L57.2 58.2 L52.4 52 L57.2 45.8 Z"/><path d="M56.2 69.5 L43.8 69.5 L43.8 59.2 L50 54.4 L56.2 59.2 Z"/><path d="M32.5 58.2 L32.5 45.8 L42.8 45.8 L47.6 52 L42.8 58.2 Z"/></g></svg>'
  };
})();
