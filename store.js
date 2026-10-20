/* Shared storefront engine for the style demos.
   Every demo uses the same products, cart, checkout and Arabic/English switch,
   so the only thing that differs between demos is the visual world.
   Products, prices, delivery fees and payment options are placeholders. */
(function () {
  'use strict';

  // ---------- catalog (placeholder) ----------
  var CATS = {
    necklace: { ar: 'قلائد', en: 'Necklaces' },
    bracelet: { ar: 'أساور', en: 'Bracelets' },
    earrings: { ar: 'إكسسوارات', en: 'Accessories' }
  };

  var TONES = {
    gold:   { ar: 'ذهبي', en: 'Gold tone',   swatch: '#d9b25f', deep: '#6b4a14', lo: '#9a7130', mid: '#c99b45', hi: '#f6e2a6', spec: '#fff7dc' },
    silver: { ar: 'فضي',  en: 'Silver tone', swatch: '#c9ccd1', deep: '#4b5058', lo: '#7d838c', mid: '#b4b9c0', hi: '#eef0f3', spec: '#ffffff' },
    rose:   { ar: 'وردي', en: 'Rose tone',   swatch: '#e2a98f', deep: '#6e3a2b', lo: '#a5654f', mid: '#d4927a', hi: '#f8d6c6', spec: '#fff1ea' }
  };

  var PRODUCTS = [
    { id: 'name',    cat: 'necklace', kind: 'name',    price: 120, tones: ['gold', 'silver', 'rose'], custom: true, isNew: true,
      ar: 'قلادة اسم بالخط العربي', en: 'Arabic name necklace',
      dAr: 'اكتبي الاسم ونقصّه بخط الرقعة. السلسلة قابلة للتعديل.', dEn: 'Type a name and we cut it in Ruqaa script. Adjustable chain.' },
    { id: 'drop',    cat: 'necklace', kind: 'drop',    price: 85,  tones: ['gold', 'silver'], stone: '#1d7a5c', isNew: true,
      ar: 'قلادة قطرة خضراء', en: 'Green drop pendant',
      dAr: 'حجر أخضر بشكل قطرة على سلسلة رفيعة.', dEn: 'A green drop stone on a fine chain.' },
    { id: 'coin',    cat: 'necklace', kind: 'coin',    price: 95,  tones: ['gold', 'silver'],
      ar: 'قلادة الليرة', en: 'Coin pendant',
      dAr: 'ميدالية مستديرة بحافة منقوشة.', dEn: 'A round medallion with a beaded rim.' },
    { id: 'pearl',   cat: 'necklace', kind: 'pearl',   price: 140, tones: ['gold', 'silver'],
      ar: 'عقد لؤلؤ', en: 'Pearl strand',
      dAr: 'لؤلؤ صناعي متساوي الحجم بقفل معدني.', dEn: 'Even faux pearls with a metal clasp.' },
    { id: 'layered', cat: 'necklace', kind: 'layered', price: 110, tones: ['gold', 'silver', 'rose'],
      ar: 'قلادة طبقتين', en: 'Layered necklace',
      dAr: 'سلسلتان بطولين مختلفين، تُلبسان معاً.', dEn: 'Two chains at two lengths, worn together.' },
    { id: 'bar',     cat: 'necklace', kind: 'bar',     price: 70,  tones: ['gold', 'silver', 'rose'],
      ar: 'قلادة الشريط', en: 'Bar necklace',
      dAr: 'شريط معدني أفقي ناعم.', dEn: 'A slim horizontal bar.' },
    { id: 'tennis',  cat: 'bracelet', kind: 'tennis',  price: 150, tones: ['silver', 'gold'],
      ar: 'سوار تنس', en: 'Tennis bracelet',
      dAr: 'صف من الأحجار اللامعة حول المعصم.', dEn: 'A full row of bright stones.' },
    { id: 'beads',   cat: 'bracelet', kind: 'beads',   price: 45,  tones: ['gold', 'silver'], stone: '#2fa6a0', isNew: true,
      ar: 'سوار خرز فيروزي', en: 'Turquoise bead bracelet',
      dAr: 'خرز فيروزي مع فواصل معدنية، مطاطي.', dEn: 'Turquoise beads with metal spacers, stretch fit.' },
    { id: 'cuff',    cat: 'bracelet', kind: 'cuff',    price: 90,  tones: ['gold', 'silver', 'rose'],
      ar: 'سوار مفتوح عريض', en: 'Open cuff',
      dAr: 'سوار عريض مفتوح يناسب أغلب المقاسات.', dEn: 'A wide open cuff that fits most wrists.' },
    { id: 'charm',   cat: 'bracelet', kind: 'charm',   price: 105, tones: ['gold', 'silver'],
      ar: 'سوار التعليقات', en: 'Charm bracelet',
      dAr: 'سلسلة بتعليقات صغيرة: نجمة وورقة زيتون وقرص.', dEn: 'A chain with small charms: a star, an olive leaf, a disc.' },
    { id: 'hoops',   cat: 'earrings', kind: 'hoops',   price: 55,  tones: ['gold', 'silver', 'rose'],
      ar: 'حلق دوائر', en: 'Hoop earrings',
      dAr: 'دوائر متوسطة الحجم وخفيفة.', dEn: 'Light, medium hoops.' },
    { id: 'drops',   cat: 'earrings', kind: 'drops',   price: 65,  tones: ['gold', 'silver'], stone: '#8e1f3c',
      ar: 'حلق قطرة', en: 'Drop earrings',
      dAr: 'حجر خمري يتدلّى من سلسلة قصيرة.', dEn: 'A wine-red stone on a short drop.' }
  ];

  // Real photos (free Unsplash licence, see img/SOURCES.txt). The photos show gold-tone pieces,
  // so photographed products offer gold only; the other tones are kept as altTones for demos
  // that preview them with a tint. Names follow what each photo actually shows.
  var PHOTOS = {
    drop:   { ar: 'قلادة القطرة الناعمة', en: 'Fine drop necklace', dAr: 'سلسلة رفيعة بحجر صغير متدلٍّ.', dEn: 'A fine chain with a small hanging stone.' },
    coin:   { ar: 'قلادة الزهرة', en: 'Flower pendant', dAr: 'دلاية زهرة مشغولة على سلسلة مزخرفة.', dEn: 'A worked flower pendant on a detailed chain.' },
    pearl:  {}, layered: {}, bar: {},
    tennis: { ar: 'سوار مرصّع', en: 'Stone-set bracelet', dAr: 'سوار عريض مرصّع بأحجار لامعة.', dEn: 'A wide bracelet set with bright stones.' },
    beads:  { ar: 'سوار العين الزرقاء', en: 'Evil-eye bracelet', dAr: 'سلسلة ناعمة بعين زرقاء في الوسط.', dEn: 'A fine chain with a blue eye in the centre.' },
    cuff:   { ar: 'سوار منقوش عريض', en: 'Engraved bangle', dAr: 'سوار عريض بنقشة مضفورة.', dEn: 'A wide bangle with a woven pattern.' },
    charm:  { ar: 'سوار الزهرة', en: 'Flower bracelet', dAr: 'سلسلة مضفورة بزهرة في الوسط.', dEn: 'A braided chain with a flower in the centre.' },
    hoops:  { ar: 'حلق مضفور', en: 'Twisted hoops', dAr: 'دوائر صغيرة مضفورة.', dEn: 'Small twisted hoops.' },
    drops:  { ar: 'حلق القطرة الذهبي', en: 'Gold teardrop earrings', dAr: 'قطرتان ممتلئتان بلمعة ناعمة.', dEn: 'Two full teardrops with a soft shine.' }
  };
  PRODUCTS.forEach(function (p) {
    var ph = PHOTOS[p.id]; if (!ph) return;
    Object.keys(ph).forEach(function (k) { p[k] = ph[k]; });
    p.photo = 'img/p-' + p.id + '.jpg'; p.photoTone = 'gold';
    p.altTones = ['gold'].concat(p.tones.filter(function (t) { return t !== 'gold'; }));
    p.tones = ['gold'];
  });

  // Delivery zones and fees are placeholders until the shop confirms them.
  var CITIES = [
    { id: 'ramallah', ar: 'رام الله والبيرة', en: 'Ramallah & Al-Bireh', fee: 20 },
    { id: 'nablus',   ar: 'نابلس',            en: 'Nablus',              fee: 20 },
    { id: 'hebron',   ar: 'الخليل',           en: 'Hebron',              fee: 20 },
    { id: 'bethlehem',ar: 'بيت لحم',          en: 'Bethlehem',           fee: 20 },
    { id: 'jenin',    ar: 'جنين',             en: 'Jenin',               fee: 20 },
    { id: 'tulkarm',  ar: 'طولكرم',           en: 'Tulkarm',             fee: 20 },
    { id: 'qalqilya', ar: 'قلقيلية',          en: 'Qalqilya',            fee: 20 },
    { id: 'jericho',  ar: 'أريحا',            en: 'Jericho',             fee: 20 },
    { id: 'jerusalem',ar: 'القدس',            en: 'Jerusalem',           fee: 30 },
    { id: 'inside',   ar: 'الداخل',           en: 'Inside the Green Line', fee: 70 }
  ];

  var PAYMENTS = [
    { id: 'cod',    ar: 'الدفع عند الاستلام', en: 'Cash on delivery',
      nAr: 'الدفع نقداً للمندوب عند وصول الطلب.', nEn: 'Pay the courier in cash when it arrives.' },
    { id: 'card',   ar: 'بطاقة بنكية',        en: 'Bank card',
      nAr: 'عبر بوابة دفع محلية (لم تُحدَّد بعد).', nEn: 'Through a local payment gateway (not chosen yet).' },
    { id: 'wallet', ar: 'محفظة إلكترونية',     en: 'Mobile wallet',
      nAr: 'مثل جوال باي أو بال باي (للتأكيد).', nEn: 'For example Jawwal Pay or PalPay (to confirm).' }
  ];

  var BASE = {
    ar: {
      lang_switch: 'English', cart: 'السلة', bag_empty: 'السلة فارغة.',
      add: 'أضيفي للسلة', added: 'أُضيفت للسلة', view: 'عرض القطعة', close: 'إغلاق',
      subtotal: 'المجموع', delivery: 'التوصيل', total: 'الإجمالي', choose_city: 'تظهر رسوم التوصيل بعد اختيار المدينة.',
      checkout: 'إتمام الطلب', place_order: 'تأكيد الطلب', back_to_bag: 'الرجوع للسلة',
      f_name: 'الاسم الكامل', f_phone: 'رقم الجوال', f_city: 'المدينة', f_address: 'العنوان بالتفصيل', f_notes: 'ملاحظات (اختياري)',
      f_pay: 'طريقة الدفع', ph_phone: '059 123 4567', ph_address: 'الحي، الشارع، أقرب معلم',
      e_name: 'الاسم الكامل مطلوب.', e_phone: 'رقم الجوال من 10 أرقام ويبدأ بـ 05.', e_city: 'المدينة مطلوبة.',
      e_address: 'العنوان مطلوب ليصل المندوب.', e_engrave: 'الاسم المطلوب على القلادة لم يُكتب بعد.',
      tone: 'اللون', engrave: 'الاسم على القلادة', engrave_hint: 'حتى 8 أحرف', qty: 'الكمية', remove: 'حذف',
      ok_title: 'وصلنا طلبك', ok_body: 'سنتصل على الرقم {phone} لتأكيد الطلب قبل الشحن.', ok_num: 'رقم الطلب', ok_again: 'متابعة التسوق',
      demo_note: 'نموذج تصميم: الاسم والأسعار ورسوم التوصيل مؤقتة، والصور من Unsplash للتوضيح فقط.',
      new: 'جديد', all: 'الكل', items: '{n} قطع', items0: 'لا قطع', items11: '{n} قطعة', item1: 'قطعة واحدة', items2: 'قطعتان',
      cart_status: 'في السلة {n}'
    },
    en: {
      lang_switch: 'عربي', cart: 'Bag', bag_empty: 'Your bag is empty. Add a piece to start.',
      add: 'Add to bag', added: 'Added to bag', view: 'View piece', close: 'Close',
      subtotal: 'Subtotal', delivery: 'Delivery', total: 'Total', choose_city: 'Choose a city to see delivery',
      checkout: 'Checkout', place_order: 'Place order', back_to_bag: 'Back to bag',
      f_name: 'Full name', f_phone: 'Mobile number', f_city: 'City', f_address: 'Full address', f_notes: 'Notes (optional)',
      f_pay: 'Payment', ph_phone: '059 123 4567', ph_address: 'Area, street, nearest landmark',
      e_name: 'Enter your full name.', e_phone: 'Enter a 10-digit mobile number starting with 05.', e_city: 'Choose a city.',
      e_address: 'Enter an address so the courier can find you.', e_engrave: 'Enter the name for the necklace.',
      tone: 'Colour', engrave: 'Name on the necklace', engrave_hint: 'Up to 8 letters', qty: 'Qty', remove: 'Remove',
      ok_title: 'Order received', ok_body: 'We will call {phone} to confirm before we ship.', ok_num: 'Order number', ok_again: 'Keep shopping',
      demo_note: 'Design demo: the name, prices and delivery fees are placeholders; photos are from Unsplash, for illustration only.',
      new: 'New', all: 'All', items: '{n} pieces', items0: 'empty', items11: '{n} pieces', item1: '1 piece', items2: '2 pieces',
      cart_status: '{n} in bag'
    }
  };

  // ---------- tiny utilities ----------
  var listeners = {};
  function on(evt, fn) { (listeners[evt] = listeners[evt] || []).push(fn); }
  function emit(evt, data) { (listeners[evt] || []).forEach(function (fn) { fn(data); }); }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  var lang = store('jw-lang') === 'en' ? 'en' : 'ar';
  var orderPrefix = 'SW-';
  var extra = { ar: {}, en: {} };

  function t(key, vars) {
    var s = (extra[lang] && extra[lang][key]) || BASE[lang][key] || key;
    if (vars) Object.keys(vars).forEach(function (k) { s = s.replace('{' + k + '}', vars[k]); });
    return s;
  }
  function L(obj, base) { return obj[(base || '') + (lang === 'ar' ? 'ar' : 'en')] || obj[lang]; }
  function name(p) { return p[lang]; }
  function desc(p) { return lang === 'ar' ? p.dAr : p.dEn; }
  function money(n) { return lang === 'ar' ? n + ' ₪' : '₪' + n; }
  function countLabel(n) {
    if (n === 0) return t('items0');
    if (n === 1) return t('item1');
    if (lang === 'ar') return n === 2 ? t('items2') : n <= 10 ? t('items', { n: n }) : t('items11', { n: n });
    return t('items', { n: n });
  }
  // A tinted preview of a photographed piece in another metal colour (approximate).
  function photoFilter(p, tone) {
    if (!p || !p.photo || !tone || tone === p.photoTone) return '';
    return tone === 'silver' ? 'grayscale(1) brightness(1.07) contrast(1.06)' : tone === 'rose' ? 'sepia(.35) saturate(1.3) hue-rotate(-22deg) brightness(1.03)' : '';
  }
  function media(p, o) {
    o = o || {}; var tone = o.tone || p.tones[0];
    if (p.photo && !p.custom) {
      var f = photoFilter(p, tone);
      return '<img src="' + p.photo + '" alt="' + (o.decorative ? '' : esc(name(p))) + '"' + (f ? ' style="filter:' + f + '"' : '') + '>';
    }
    return '<canvas data-id="' + p.id + '" data-tone="' + tone + '" aria-hidden="true"></canvas>';
  }
  function byId(id) { for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) return PRODUCTS[i]; return null; }

  function applyLang() {
    var root = document.documentElement;
    root.lang = lang; root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    $$('[data-t]').forEach(function (el) { el.textContent = t(el.getAttribute('data-t')); });
    $$('[data-tp]').forEach(function (el) { el.setAttribute('placeholder', t(el.getAttribute('data-tp'))); });
    $$('[data-ta]').forEach(function (el) { el.setAttribute('aria-label', t(el.getAttribute('data-ta'))); });
    $$('[data-lang-toggle]').forEach(function (el) { el.setAttribute('lang', lang === 'ar' ? 'en' : 'ar'); });
    $$('[data-cat-label]').forEach(function (el) {
      var c = el.getAttribute('data-cat-label'); el.textContent = c === 'all' ? t('all') : CATS[c][lang];
    });
    emit('lang', lang);
    renderCart();
  }
  function setLang(l) { lang = l; store('jw-lang', l); applyLang(); }

  // ---------- jewellery renderer (placeholder product drawings) ----------
  var Jewel = (function () {
    function metal(ctx, x0, y0, x1, y1, tone) {
      var c = TONES[tone] || TONES.gold, g = ctx.createLinearGradient(x0, y0, x1, y1);
      g.addColorStop(0, c.lo); g.addColorStop(0.18, c.hi); g.addColorStop(0.32, c.mid);
      g.addColorStop(0.5, c.spec); g.addColorStop(0.62, c.mid); g.addColorStop(0.8, c.lo);
      g.addColorStop(0.92, c.hi); g.addColorStop(1, c.deep);
      return g;
    }
    function sampleCubic(p0, p1, p2, p3, n) {
      var pts = [];
      for (var i = 0; i <= n; i++) {
        var t = i / n, u = 1 - t;
        pts.push({
          x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
          y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y
        });
      }
      return pts;
    }
    function sag(x0, y0, x1, y1, depth) {
      // a hanging curve from (x0,y0) to (x1,y1) with its low point `depth` below the chord
      var mx = (x0 + x1) / 2;
      return sampleCubic({ x: x0, y: y0 }, { x: x0 + (mx - x0) * 0.12, y: y0 + depth * 1.3 },
                         { x: x1 - (x1 - mx) * 0.12, y: y1 + depth * 1.3 }, { x: x1, y: y1 }, 240);
    }
    function along(pts, step, fn) {
      var acc = 0, next = step / 2, idx = 0;
      for (var i = 1; i < pts.length; i++) {
        var a = pts[i - 1], b = pts[i], d = Math.hypot(b.x - a.x, b.y - a.y);
        while (acc + d >= next) {
          var k = (next - acc) / d;
          fn(a.x + (b.x - a.x) * k, a.y + (b.y - a.y) * k, Math.atan2(b.y - a.y, b.x - a.x), idx++);
          next += step;
        }
        acc += d;
      }
    }
    function chain(ctx, pts, link, grad) {
      ctx.strokeStyle = grad; ctx.lineCap = 'round';
      along(pts, link * 0.92, function (x, y, ang, i) {
        ctx.beginPath();
        if (i % 2 === 0) { ctx.lineWidth = link * 0.16; ctx.ellipse(x, y, link * 0.56, link * 0.33, ang, 0, Math.PI * 2); }
        else { ctx.lineWidth = link * 0.22; ctx.moveTo(x - Math.cos(ang) * link * 0.5, y - Math.sin(ang) * link * 0.5); ctx.lineTo(x + Math.cos(ang) * link * 0.5, y + Math.sin(ang) * link * 0.5); }
        ctx.stroke();
      });
    }
    function gem(ctx, x, y, rx, ry, color, shape) {
      ctx.save();
      ctx.beginPath();
      if (shape === 'drop') {
        ctx.moveTo(x, y - ry);
        ctx.bezierCurveTo(x + rx * 0.35, y - ry * 0.35, x + rx, y + ry * 0.05, x + rx, y + ry * 0.38);
        ctx.arc(x, y + ry * 0.38, rx, 0, Math.PI, false);
        ctx.bezierCurveTo(x - rx, y + ry * 0.05, x - rx * 0.35, y - ry * 0.35, x, y - ry);
      } else ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
      var g = ctx.createRadialGradient(x - rx * 0.35, y - ry * 0.1, rx * 0.1, x, y + ry * 0.2, Math.max(rx, ry) * 1.2);
      g.addColorStop(0, '#ffffff'); g.addColorStop(0.18, shade(color, 0.45)); g.addColorStop(0.55, color); g.addColorStop(1, shade(color, -0.55));
      ctx.fillStyle = g; ctx.fill();
      ctx.clip();
      ctx.globalAlpha = 0.22; ctx.strokeStyle = '#fff'; ctx.lineWidth = Math.max(1, rx * 0.06);
      ctx.beginPath(); ctx.moveTo(x - rx, y + ry * 0.2); ctx.lineTo(x, y - ry * 0.1); ctx.lineTo(x + rx, y + ry * 0.35);
      ctx.moveTo(x, y - ry * 0.1); ctx.lineTo(x - rx * 0.2, y + ry * 1.2); ctx.stroke();
      ctx.globalAlpha = 0.85; ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.ellipse(x - rx * 0.38, y - ry * 0.05, rx * 0.16, ry * 0.1, -0.6, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }
    function shade(hex, amt) {
      var n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
      function f(c) { return Math.round(amt >= 0 ? c + (255 - c) * amt : c * (1 + amt)); }
      return 'rgb(' + f(r) + ',' + f(g) + ',' + f(b) + ')';
    }
    function pearl(ctx, x, y, r) {
      var g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.08, x, y, r);
      g.addColorStop(0, '#ffffff'); g.addColorStop(0.35, '#f4efe6'); g.addColorStop(0.8, '#cfc5b4'); g.addColorStop(1, '#a89c88');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    }
    function ring(ctx, x, y, r, grad, w) { ctx.strokeStyle = grad; ctx.lineWidth = w; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke(); }

    function drawPiece(ctx, W, H, kind, o) {
      var tone = o.tone || 'gold', S = Math.min(W, H), grad = metal(ctx, 0, 0, W, H * 0.9, tone);
      var link = Math.max(3, S * 0.022), cx = W / 2;
      var top = H * 0.08, x0 = W * 0.14, x1 = W * 0.86;
      if (kind === 'drop' || kind === 'coin' || kind === 'bar' || kind === 'name') {
        if (kind === 'name') {
          var txt = (o.text || '').trim() || (lang === 'ar' ? 'ليان' : 'Layan');
          var fs = S * 0.2;
          var face = (FONTS[o.font] || FONTS.ruqaa).css;
          ctx.font = '700 ' + fs + 'px ' + face;
          var tw = Math.min(ctx.measureText(txt).width, W * 0.62);
          if (ctx.measureText(txt).width > W * 0.62) { fs *= (W * 0.62) / ctx.measureText(txt).width; ctx.font = '700 ' + fs + 'px ' + face; tw = ctx.measureText(txt).width; }
          var ty = H * 0.66;
          chain(ctx, sag(x0, top, cx - tw / 2 - link * 0.4, ty - fs * 0.12, H * 0.1), link * 0.8, grad);
          chain(ctx, sag(cx + tw / 2 + link * 0.4, ty - fs * 0.12, x1, top, H * 0.1), link * 0.8, grad);
          var tg = metal(ctx, cx - tw / 2, ty - fs, cx + tw / 2, ty + fs * 0.3, tone);
          ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; ctx.direction = /[؀-ۿ]/.test(txt) ? 'rtl' : 'ltr';
          ctx.lineJoin = 'round'; ctx.lineWidth = Math.max(1, fs * 0.05); ctx.strokeStyle = TONES[tone].lo;
          ctx.strokeText(txt, cx, ty); ctx.fillStyle = tg; ctx.fillText(txt, cx, ty);
          return;
        }
        var pts = sag(x0, top, x1, top, H * 0.42), low = pts[120];
        chain(ctx, pts, link * 0.85, grad);
        if (kind === 'drop') {
          ring(ctx, low.x, low.y + link * 0.9, link * 0.6, grad, link * 0.25);
          var r = S * 0.085, gy = low.y + link * 1.5 + r * 1.25;
          ctx.save(); ctx.lineWidth = r * 0.18; ctx.strokeStyle = grad; gem(ctx, low.x, gy, r, r * 1.25, o.stone || '#1d7a5c', 'drop');
          ctx.beginPath(); ctx.moveTo(low.x, gy - r * 1.25);
          ctx.bezierCurveTo(low.x + r * 0.35, gy - r * 0.44, low.x + r, gy + r * 0.06, low.x + r, gy + r * 0.47);
          ctx.arc(low.x, gy + r * 0.47, r, 0, Math.PI, false);
          ctx.bezierCurveTo(low.x - r, gy + r * 0.06, low.x - r * 0.35, gy - r * 0.44, low.x, gy - r * 1.25); ctx.stroke(); ctx.restore();
        } else if (kind === 'coin') {
          ring(ctx, low.x, low.y + link, link * 0.7, grad, link * 0.28);
          var cr = S * 0.13, cy = low.y + link * 1.7 + cr;
          var cg = metal(ctx, low.x - cr, cy - cr, low.x + cr, cy + cr, tone);
          ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(low.x, cy, cr, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = TONES[tone].lo; ctx.globalAlpha = 0.55; ctx.lineWidth = Math.max(1, cr * 0.03);
          ring(ctx, low.x, cy, cr * 0.78, TONES[tone].lo, Math.max(1, cr * 0.035));
          ring(ctx, low.x, cy, cr * 0.5, TONES[tone].lo, Math.max(1, cr * 0.025));
          ctx.globalAlpha = 1; ctx.fillStyle = TONES[tone].hi;
          for (var i = 0; i < 36; i++) { var a = i / 36 * Math.PI * 2; ctx.beginPath(); ctx.arc(low.x + Math.cos(a) * cr * 0.9, cy + Math.sin(a) * cr * 0.9, cr * 0.04, 0, Math.PI * 2); ctx.fill(); }
          ctx.fillStyle = TONES[tone].lo; ctx.globalAlpha = 0.6;
          for (var j = 0; j < 8; j++) { var b = j / 8 * Math.PI * 2; ctx.beginPath(); ctx.ellipse(low.x + Math.cos(b) * cr * 0.3, cy + Math.sin(b) * cr * 0.3, cr * 0.12, cr * 0.05, b, 0, Math.PI * 2); ctx.fill(); }
          ctx.globalAlpha = 1;
        } else {
          var bw = S * 0.32, bh = S * 0.045, by = low.y + link * 0.4;
          ctx.fillStyle = metal(ctx, low.x - bw / 2, by, low.x + bw / 2, by + bh, tone);
          ctx.beginPath(); ctx.roundRect ? ctx.roundRect(low.x - bw / 2, by, bw, bh, bh / 2) : ctx.rect(low.x - bw / 2, by, bw, bh); ctx.fill();
          ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fillRect(low.x - bw / 2 + bh, by + bh * 0.22, bw - bh * 2, Math.max(1, bh * 0.12));
        }
      } else if (kind === 'pearl') {
        var pp = sag(x0, top, x1, top, H * 0.5), pr = S * 0.03;
        along(pp, pr * 2.05, function (x, y) { pearl(ctx, x, y, pr); });
        ctx.fillStyle = grad; ctx.beginPath(); ctx.ellipse(x0, top, pr * 0.9, pr * 0.6, 0.6, 0, Math.PI * 2); ctx.fill();
      } else if (kind === 'layered') {
        var a1 = sag(x0 + W * 0.06, top, x1 - W * 0.06, top, H * 0.26), a2 = sag(x0, top, x1, top, H * 0.5);
        chain(ctx, a1, link * 0.7, grad); chain(ctx, a2, link * 0.85, grad);
        var l1 = a1[120], l2 = a2[120];
        ctx.fillStyle = metal(ctx, l1.x - 10, l1.y, l1.x + 10, l1.y + 20, tone);
        ctx.beginPath(); ctx.arc(l1.x, l1.y + S * 0.035, S * 0.03, 0, Math.PI * 2); ctx.fill();
        gem(ctx, l2.x, l2.y + S * 0.06, S * 0.04, S * 0.05, '#e9e6f2', 'drop');
      } else if (kind === 'tennis' || kind === 'beads' || kind === 'cuff' || kind === 'charm') {
        var ex = W * 0.34, ey = H * 0.17, ecy = H * 0.46;
        function P(th) { return { x: cx + Math.cos(th) * ex, y: ecy + Math.sin(th) * ey, s: 0.78 + 0.22 * Math.sin(th) }; }
        function pass(front) {
          var from = front ? 0 : Math.PI, to = front ? Math.PI : Math.PI * 2;
          if (kind === 'cuff') {
            var a0 = front ? 0.0 : Math.PI + 0.55, a1 = front ? Math.PI : Math.PI * 2 - 0.55;
            ctx.save(); ctx.globalAlpha = front ? 1 : 0.8;
            ctx.strokeStyle = metal(ctx, cx - ex, ecy - ey, cx + ex, ecy + ey, tone); ctx.lineWidth = S * 0.075; ctx.lineCap = 'round';
            ctx.beginPath(); ctx.ellipse(cx, ecy, ex, ey, 0, a0, a1); ctx.stroke();
            ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = Math.max(1, S * 0.008);
            ctx.beginPath(); ctx.ellipse(cx, ecy - S * 0.022, ex, ey, 0, a0 + 0.1, a1 - 0.1); ctx.stroke(); ctx.restore();
            return;
          }
          var n = kind === 'beads' ? 13 : kind === 'tennis' ? 26 : 30;
          for (var i = 0; i < n; i++) {
            var th = from + (to - from) * (i + 0.5) / n, p = P(th);
            ctx.globalAlpha = front ? 1 : 0.72;
            if (kind === 'beads') {
              if (i % 4 === 2) { ctx.fillStyle = metal(ctx, p.x - 8, p.y - 8, p.x + 8, p.y + 8, tone); ctx.beginPath(); ctx.arc(p.x, p.y, S * 0.022 * p.s, 0, Math.PI * 2); ctx.fill(); }
              else gem(ctx, p.x, p.y, S * 0.036 * p.s, S * 0.036 * p.s, o.stone || '#2fa6a0');
            } else if (kind === 'tennis') {
              ctx.fillStyle = metal(ctx, p.x - 8, p.y - 8, p.x + 8, p.y + 8, tone);
              ctx.beginPath(); ctx.arc(p.x, p.y, S * 0.024 * p.s, 0, Math.PI * 2); ctx.fill();
              gem(ctx, p.x, p.y, S * 0.017 * p.s, S * 0.017 * p.s, '#e8eef7');
            } else {
              ctx.strokeStyle = grad; ctx.lineWidth = link * 0.16 * p.s; ctx.beginPath();
              ctx.ellipse(p.x, p.y, link * 0.55 * p.s, link * 0.33 * p.s, th + Math.PI / 2 + (i % 2 ? 1.2 : 0), 0, Math.PI * 2); ctx.stroke();
            }
          }
          ctx.globalAlpha = 1;
          if (kind === 'charm' && front) {
            [0.32, 0.5, 0.68].forEach(function (f, k) {
              var p = P(Math.PI * f), cyc = p.y + S * 0.075, cg = metal(ctx, p.x - 12, cyc - 12, p.x + 12, cyc + 12, tone);
              ctx.strokeStyle = grad; ctx.lineWidth = Math.max(1, link * 0.18); ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x, cyc - S * 0.03); ctx.stroke();
              ctx.fillStyle = cg; ctx.beginPath();
              if (k === 0) { for (var s = 0; s < 10; s++) { var r = s % 2 ? S * 0.017 : S * 0.04, a = -Math.PI / 2 + s * Math.PI / 5; ctx.lineTo(p.x + Math.cos(a) * r, cyc + Math.sin(a) * r); } ctx.closePath(); }
              else if (k === 1) { ctx.ellipse(p.x, cyc, S * 0.018, S * 0.042, 0.35, 0, Math.PI * 2); }
              else { ctx.arc(p.x, cyc, S * 0.034, 0, Math.PI * 2); }
              ctx.fill();
              if (k === 1) { ctx.strokeStyle = TONES[tone].lo; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p.x - S * 0.012, cyc - S * 0.034); ctx.lineTo(p.x + S * 0.012, cyc + S * 0.034); ctx.stroke(); }
            });
          }
        }
        pass(false); pass(true);
      } else if (kind === 'hoops' || kind === 'drops') {
        [-1, 1].forEach(function (side) {
          var hx = cx + side * W * 0.19, hy = H * 0.2;
          if (kind === 'hoops') {
            var hr = S * 0.17;
            ctx.strokeStyle = metal(ctx, hx - hr, hy, hx + hr, hy + hr * 2.2, tone); ctx.lineWidth = S * 0.03; ctx.lineCap = 'round';
            ctx.beginPath(); ctx.ellipse(hx, hy + hr * 1.05, hr * 0.78, hr, 0, -Math.PI / 2 + 0.18, Math.PI * 1.5 - 0.05); ctx.stroke();
            ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = Math.max(1, S * 0.006);
            ctx.beginPath(); ctx.ellipse(hx - S * 0.006, hy + hr * 1.05, hr * 0.78, hr, 0, Math.PI * 0.75, Math.PI * 1.3); ctx.stroke();
          } else {
            ctx.fillStyle = metal(ctx, hx - 10, hy - 10, hx + 10, hy + 10, tone);
            ctx.beginPath(); ctx.arc(hx, hy, S * 0.03, 0, Math.PI * 2); ctx.fill();
            gem(ctx, hx, hy, S * 0.018, S * 0.018, '#f2eef6');
            chain(ctx, sampleCubic({ x: hx, y: hy + S * 0.035 }, { x: hx, y: hy + S * 0.1 }, { x: hx, y: hy + S * 0.15 }, { x: hx, y: hy + S * 0.2 }, 40), link * 0.6, grad);
            gem(ctx, hx, hy + S * 0.31, S * 0.075, S * 0.1, o.stone || '#8e1f3c', 'drop');
          }
        });
      }
    }

    function draw(canvas) {
      var box = canvas.getBoundingClientRect(), W = Math.max(40, box.width), H = Math.max(40, box.height);
      var dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      var ctx = canvas.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
      var p = byId(canvas.getAttribute('data-id')) || {};
      var o = { tone: canvas.getAttribute('data-tone') || (p.tones && p.tones[0]), stone: p.stone, text: canvas.getAttribute('data-text'), font: canvas.getAttribute('data-font') };
      var off = document.createElement('canvas'); off.width = canvas.width; off.height = canvas.height;
      var octx = off.getContext('2d'); octx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawPiece(octx, W, H, canvas.getAttribute('data-kind') || p.kind, o);
      var sh = getComputedStyle(canvas).getPropertyValue('--jewel-shadow').trim() || 'rgba(0,0,0,.28)';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.shadowColor = sh; ctx.shadowBlur = 10 * dpr; ctx.shadowOffsetY = 6 * dpr;
      ctx.drawImage(off, 0, 0);
    }
    var ro = 'ResizeObserver' in window ? new ResizeObserver(function (es) { es.forEach(function (e) { draw(e.target); }); }) : null;
    function mount(root) {
      $$('canvas[data-id], canvas[data-kind]', root).forEach(function (c) {
        if (!c.getAttribute('role')) { c.setAttribute('role', 'img'); }
        var p = byId(c.getAttribute('data-id')); if (p && !c.getAttribute('aria-label')) c.setAttribute('aria-label', name(p));
        if (ro && !c.__ro) { ro.observe(c); c.__ro = true; } else draw(c);
      });
    }
    return { draw: draw, mount: mount };
  })();

  // ---------- cart ----------
  var cart = [], cartKey = 'jw-cart';
  try { cart = JSON.parse(store(cartKey) || '[]') || []; } catch (e) { cart = []; }
  var city = '';
  function save() { store(cartKey, JSON.stringify(cart)); }
  // opts: optional choices such as { font: 'kufi', length: 45 } for the name necklace
  function add(id, tone, text, opts) {
    var p = byId(id); if (!p) return;
    tone = tone || p.tones[0]; opts = opts || {};
    var key = id + '|' + tone + '|' + (text || '') + '|' + (opts.font || '') + '|' + (opts.length || '') + '|' + (opts.meta || '');
    var line = cart.filter(function (l) { return l.key === key; })[0];
    if (line) line.qty++; else cart.push({ key: key, id: id, tone: tone, text: text || '', font: opts.font || '', length: opts.length || '', meta: opts.meta || '', photo: opts.photo || '', price: opts.price || 0, noTone: !!opts.noTone, qty: 1 });
    save(); renderCart(); emit('added', { product: p, tone: tone, text: text });
  }
  var FONTS = {
    ruqaa: { css: '"Aref Ruqaa", "Amiri", serif', ar: 'رقعة', en: 'Ruqaa' },
    kufi:  { css: '"Reem Kufi", "Aref Ruqaa", sans-serif', ar: 'كوفي', en: 'Kufi' },
    naskh: { css: '"Amiri", "Aref Ruqaa", serif', ar: 'نسخ', en: 'Naskh' }
  };
  function setQty(key, q) {
    cart = cart.filter(function (l) { if (l.key === key) l.qty = q; return l.qty > 0; });
    save(); renderCart();
  }
  function count() { return cart.reduce(function (s, l) { return s + l.qty; }, 0); }
  function linePrice(l) { return l.price || byId(l.id).price; }
  function subtotal() { return cart.reduce(function (s, l) { return s + l.qty * linePrice(l); }, 0); }
  function fee() { var c = CITIES.filter(function (x) { return x.id === city; })[0]; return c ? c.fee : null; }

  function lineHTML(l) {
    var p = byId(l.id);
    return '<li class="ci" data-key="' + esc(l.key) + '">' +
      '<div class="ci-img">' + (l.photo ? '<img src="' + l.photo + '" alt="" style="filter:' + (photoFilter(p, l.tone) || 'none') + '">' : p.photo && !p.custom ? '<img src="' + p.photo + '" alt="" style="filter:' + (photoFilter(p, l.tone) || 'none') + '">' : '<canvas data-id="' + p.id + '" data-tone="' + l.tone + '"' + (l.text ? ' data-text="' + esc(l.text) + '"' : '') + (l.font ? ' data-font="' + l.font + '"' : '') + '></canvas>') + '</div>' +
      '<div class="ci-body"><p class="ci-name">' + esc(name(p)) + '</p>' +
      '<p class="ci-meta">' + (l.noTone ? '' : esc(TONES[l.tone][lang])) + (l.text ? ' · «' + esc(l.text) + '»' : '') + (l.font && FONTS[l.font] ? ' · ' + FONTS[l.font][lang] : '') + (l.length ? ' · ' + l.length + (lang === 'ar' ? ' سم' : ' cm') : '') + (l.meta ? (l.noTone ? '' : ' · ') + esc(l.meta) : '') + '</p>' +
      '<div class="ci-row"><div class="ci-qty" role="group" aria-label="' + t('qty') + '">' +
      '<button type="button" data-qty="-1" aria-label="' + (lang === 'ar' ? 'إنقاص' : 'Decrease') + '">−</button><output>' + l.qty + '</output><button type="button" data-qty="1" aria-label="' + (lang === 'ar' ? 'زيادة' : 'Increase') + '">+</button></div>' +
      '<button type="button" class="ci-remove" data-remove>' + t('remove') + '</button></div></div>' +
      '<p class="ci-price">' + money(linePrice(l) * l.qty) + '</p></li>';
  }

  function renderCart() {
    var n = count();
    $$('[data-cart-count]').forEach(function (el) { el.textContent = n; el.hidden = n === 0; });
    $$('[data-cart-status]').forEach(function (el) { el.textContent = t('cart_status', { n: n }); });
    $$('[data-cart-list]').forEach(function (ul) {
      ul.innerHTML = cart.map(lineHTML).join('');
      Jewel.mount(ul);
    });
    $$('[data-cart-empty]').forEach(function (el) { el.hidden = n > 0; });
    $$('[data-cart-filled]').forEach(function (el) { el.hidden = n === 0; });
    var f = fee();
    $$('[data-subtotal]').forEach(function (el) { el.textContent = money(subtotal()); });
    $$('[data-fee]').forEach(function (el) { el.textContent = f === null ? '—' : money(f); });
    $$('[data-fee-hint]').forEach(function (el) { el.hidden = f !== null; });
    $$('[data-total]').forEach(function (el) { el.textContent = money(subtotal() + (f || 0)); });
    $$('[data-count-label]').forEach(function (el) { el.textContent = countLabel(n); });
  }

  // ---------- panels: product sheet, bag drawer ----------
  var lastFocus = null, current = null, curTone = null;
  function setInert(on, keep) {
    Array.prototype.forEach.call(document.body.children, function (c) {
      if (c === keep || c.matches('[data-toast], script, style, link, title')) return;
      if (on) c.setAttribute('inert', ''); else c.removeAttribute('inert');
    });
  }
  function openPanel(el) {
    if (!el) return; lastFocus = document.activeElement; setInert(false); setInert(true, el);
    el.hidden = false; void el.offsetWidth; el.classList.add('is-open');
    document.documentElement.classList.add('panel-open');
    var f = el.querySelector('[data-autofocus]') || el.querySelector('button, input, select'); if (f) setTimeout(function () { f.focus({ preventScroll: true }); }, 60);
    Jewel.mount(el);
  }
  function closePanel(el) {
    if (!el || el.hidden) return; el.classList.remove('is-open');
    setTimeout(function () { el.hidden = true; }, 260);
    var still = $('[data-sheet].is-open, [data-drawer].is-open');
    setInert(false); if (still) setInert(true, still);
    if (!still) document.documentElement.classList.remove('panel-open');
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  function openProduct(id, tone) {
    var p = byId(id), sheet = $('[data-sheet]'); if (!p || !sheet) return;
    current = p; curTone = tone && p.tones.indexOf(tone) > -1 ? tone : p.tones[0];
    fillSheet();
    openPanel(sheet);
  }
  function fillSheet() {
    var p = current, sheet = $('[data-sheet]'); if (!p || !sheet) return;
    $$('[data-sheet-name]', sheet).forEach(function (el) { el.textContent = name(p); });
    $$('[data-sheet-desc]', sheet).forEach(function (el) { el.textContent = desc(p); });
    $$('[data-sheet-price]', sheet).forEach(function (el) { el.textContent = money(p.price); });
    $$('[data-sheet-cat]', sheet).forEach(function (el) { el.textContent = CATS[p.cat][lang]; });
    var cv = $('[data-sheet-canvas]', sheet);
    if (cv) { cv.setAttribute('data-id', p.id); cv.setAttribute('data-tone', curTone); cv.removeAttribute('data-text'); }
    var ph = $('[data-sheet-photo]', sheet), usePhoto = !!(ph && p.photo && !p.custom);
    if (ph) { ph.hidden = !usePhoto; if (usePhoto) { ph.src = p.photo; ph.alt = name(p); ph.style.filter = photoFilter(p, curTone) || 'none'; } }
    if (cv) cv.hidden = usePhoto;
    var tones = $('[data-sheet-tones]', sheet);
    if (tones) tones.innerHTML = p.tones.map(function (tn) {
      return '<button type="button" class="tone" role="radio" aria-checked="' + (tn === curTone) + '" data-tone-pick="' + tn + '"><span class="tone-dot" style="background:' + TONES[tn].swatch + '"></span><span>' + TONES[tn][lang] + '</span></button>';
    }).join('');
    $$('[data-sheet-custom]', sheet).forEach(function (el) { el.hidden = !p.custom; });
    var inp = $('[data-sheet-text]', sheet); if (inp) { inp.value = ''; }
    var err = $('[data-sheet-err]', sheet); if (err) err.textContent = '';
    if (cv) Jewel.draw(cv);
    emit('sheet', { product: p, tone: curTone });
  }

  // ---------- checkout ----------
  function digits(s) { return String(s).replace(/[٠-٩]/g, function (d) { return d.charCodeAt(0) - 0x0660; }).replace(/[^\d+]/g, ''); }
  function validPhone(s) { var d = digits(s).replace(/^\+?(970|972)/, '0'); return /^05\d{8}$/.test(d); }
  function fillCheckout() {
    var sel = $('[data-city-select]');
    if (sel) {
      sel.innerHTML = '<option value="">' + esc(t('f_city')) + '…</option>' + CITIES.map(function (c) {
        return '<option value="' + c.id + '"' + (c.id === city ? ' selected' : '') + '>' + esc(c[lang]) + ' · ' + money(c.fee) + '</option>';
      }).join('');
    }
    var pay = $('[data-pay-list]');
    if (pay) {
      var chosen = (pay.querySelector('input:checked') || {}).value || 'cod';
      pay.innerHTML = PAYMENTS.map(function (m) {
        return '<label class="pay"><input type="radio" name="pay" value="' + m.id + '"' + (m.id === chosen ? ' checked' : '') + '>' +
          '<span class="pay-body"><span class="pay-name">' + esc(m[lang]) + '</span><span class="pay-note">' + esc(lang === 'ar' ? m.nAr : m.nEn) + '</span></span></label>';
      }).join('');
    }
  }
  function submitOrder(form) {
    var data = { name: form.elements.name.value.trim(), phone: form.elements.phone.value.trim(), city: form.elements.city.value, address: form.elements.address.value.trim() };
    var errs = {};
    if (data.name.length < 3) errs.name = t('e_name');
    if (!validPhone(data.phone)) errs.phone = t('e_phone');
    if (!data.city) errs.city = t('e_city');
    if (data.address.length < 5) errs.address = t('e_address');
    $$('[data-err]', form).forEach(function (el) {
      var k = el.getAttribute('data-err'); el.textContent = errs[k] || '';
      var input = form.elements[k]; if (input) input.setAttribute('aria-invalid', errs[k] ? 'true' : 'false');
    });
    var first = Object.keys(errs)[0];
    if (first) { form.elements[first].focus(); return; }
    var num = orderPrefix + String(Date.now()).slice(-5);
    var ok = $('[data-confirm]') || $('[data-step="confirm"]');
    if (ok) {
      $$('[data-confirm-num]', ok).forEach(function (el) { el.textContent = num; });
      $$('[data-confirm-body]', ok).forEach(function (el) { el.textContent = t('ok_body', { phone: '\u2066' + data.phone + '\u2069' }); });
    }
    cart = []; save(); renderCart();
    emit('ordered', { number: num, data: data });
    showStep('confirm');
  }
  function showStep(step) {
    $$('[data-step]').forEach(function (el) { el.hidden = el.getAttribute('data-step') !== step; });
    if (step === 'checkout') fillCheckout();
    if (step === 'confirm') { var h = $('[data-step="confirm"] h3'); if (h) { h.setAttribute('tabindex', '-1'); setTimeout(function () { h.focus(); }, 30); } }
    var d = $('[data-drawer]'); if (d) { var sc = d.querySelector('[data-scroll]') || d; sc.scrollTop = 0; }
  }

  // ---------- toast ----------
  var toastTimer;
  function toast(msg) {
    var el = $('[data-toast]'); if (!el) return;
    el.textContent = msg; el.classList.add('is-on');
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { el.classList.remove('is-on'); }, 2200);
  }

  // ---------- events ----------
  document.addEventListener('click', function (e) {
    if (e.target.matches('[data-sheet], [data-drawer]')) { closePanel(e.target); return; }
    var b = e.target.closest('button, a, [data-open]'); if (!b) return;
    if (b.hasAttribute('data-lang-toggle')) { setLang(lang === 'ar' ? 'en' : 'ar'); return; }
    if (b.hasAttribute('data-add')) { e.preventDefault(); add(b.getAttribute('data-add'), b.getAttribute('data-add-tone')); return; }
    if (b.hasAttribute('data-open')) { e.preventDefault(); openProduct(b.getAttribute('data-open'), b.getAttribute('data-open-tone')); return; }
    if (b.hasAttribute('data-open-cart')) { e.preventDefault(); closePanel($('[data-sheet]')); showStep('bag'); openPanel($('[data-drawer]')); return; }
    if (b.hasAttribute('data-close')) { closePanel(b.closest('[data-sheet], [data-drawer]')); return; }
    if (b.hasAttribute('data-goto')) { showStep(b.getAttribute('data-goto')); return; }
    if (b.hasAttribute('data-tone-pick')) {
      curTone = b.getAttribute('data-tone-pick');
      $$('[data-tone-pick]').forEach(function (x) { x.setAttribute('aria-checked', String(x === b)); });
      var cv = $('[data-sheet-canvas]'); if (cv) { cv.setAttribute('data-tone', curTone); Jewel.draw(cv); }
      var sp = $('[data-sheet-photo]'); if (sp && !sp.hidden) sp.style.filter = photoFilter(current, curTone) || 'none';
      return;
    }
    if (b.hasAttribute('data-sheet-add')) {
      var text = '';
      if (current.custom) {
        var inp = $('[data-sheet-text]'); text = (inp && inp.value.trim()) || '';
        if (!text) { var er = $('[data-sheet-err]'); if (er) er.textContent = t('e_engrave'); if (inp) inp.focus(); return; }
      }
      add(current.id, curTone, text); closePanel($('[data-sheet]')); return;
    }
    var li = b.closest('.ci');
    if (li && b.hasAttribute('data-qty')) {
      var l = cart.filter(function (x) { return x.key === li.getAttribute('data-key'); })[0];
      if (l) setQty(l.key, l.qty + Number(b.getAttribute('data-qty'))); return;
    }
    if (li && b.hasAttribute('data-remove')) { setQty(li.getAttribute('data-key'), 0); return; }
    if (b.hasAttribute('data-shop-again')) { showStep('bag'); closePanel($('[data-drawer]')); return; }
  });
  document.addEventListener('input', function (e) {
    if (e.target.matches('[data-sheet-text]')) {
      var cv = $('[data-sheet-canvas]'); if (cv) { cv.setAttribute('data-text', e.target.value.slice(0, 8)); Jewel.draw(cv); }
    }
    if (e.target.matches('[data-live-name]')) {
      $$('[data-live-target]').forEach(function (cv) { cv.setAttribute('data-text', e.target.value.slice(0, 8)); Jewel.draw(cv); });
    }
  });
  document.addEventListener('change', function (e) {
    if (e.target.matches('[data-city-select]')) { city = e.target.value; renderCart(); }
  });
  document.addEventListener('submit', function (e) {
    if (e.target.matches('[data-checkout]')) { e.preventDefault(); submitOrder(e.target); }
  });
  document.addEventListener('keydown', function (e) {
    var tp = e.target.closest && e.target.closest('[data-tone-pick]');
    if (tp && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].indexOf(e.key) > -1) {
      e.preventDefault();
      var all = $$('[data-tone-pick]'), i = all.indexOf(tp), d = (e.key === 'ArrowLeft' || e.key === 'ArrowDown') ? 1 : -1;
      if (lang !== 'ar' && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) d = -d;
      var n = all[(i + d + all.length) % all.length]; n.focus(); n.click(); return;
    }
    if (e.key === 'Escape') { closePanel($('[data-sheet].is-open')); closePanel($('[data-drawer].is-open')); }
  });
  on('added', function (d) { toast(t('added') + ' · ' + name(d.product)); });
  on('lang', function () { if (current && $('[data-sheet].is-open')) fillSheet(); if (!$('[data-step="checkout"]') || !$('[data-step="checkout"]').hidden) fillCheckout(); });

  function boot(opts) {
    opts = opts || {};
    if (opts.strings) { extra.ar = opts.strings.ar || {}; extra.en = opts.strings.en || {}; }
    if (opts.orderPrefix) orderPrefix = opts.orderPrefix;
    if (opts.cartKey) { cartKey = opts.cartKey; try { cart = JSON.parse(store(cartKey) || '[]') || []; } catch (e) { cart = []; } }
    if (opts.photos) Object.keys(opts.photos).forEach(function (id) { var p = byId(id); if (p) p.photo = opts.photos[id]; });
    if (opts.products) Object.keys(opts.products).forEach(function (id) { var p = byId(id); if (p) Object.keys(opts.products[id]).forEach(function (k) { p[k] = opts.products[id][k]; }); });
    if (opts.render) on('lang', opts.render);
    cart = cart.filter(function (l) { return byId(l.id) && TONES[l.tone]; });
    $$('[data-err]').forEach(function (el) {
      var k = el.getAttribute('data-err'), form = el.closest('form'), input = form && form.elements[k];
      el.id = el.id || 'err-' + k; el.setAttribute('aria-live', 'polite');
      if (input) input.setAttribute('aria-describedby', el.id);
    });
    applyLang();
    Jewel.mount(document);
    var redraw = function () { $$('canvas[data-id], canvas[data-kind]').forEach(function (c) { if (c.getBoundingClientRect().width) Jewel.draw(c); }); };
    if (document.fonts && document.fonts.load) {
      document.fonts.load('700 40px "Aref Ruqaa"').then(redraw, redraw);
      document.fonts.ready.then(redraw);
    }
  }

  window.Store = {
    PRODUCTS: PRODUCTS, CATS: CATS, TONES: TONES, CITIES: CITIES, PAYMENTS: PAYMENTS,
    FONTS: FONTS, current: function () { return current; }, media: media, photoFilter: photoFilter, t: t, L: L, name: name, desc: desc, money: money, byId: byId, esc: esc, lang: function () { return lang; },
    setLang: setLang, on: on, boot: boot, add: add, openProduct: openProduct, toast: toast,
    mount: Jewel.mount, draw: Jewel.draw, $: $, $$: $$
  };
})();
