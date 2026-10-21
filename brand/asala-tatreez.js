/* Asala tatreez kit: cross-stitch drawing, the shared product sheet and bag drawer, and shared strings.
   Used by demos 16-22. Load after store.js and brand/asala-catalog.js:
     TZ.shell();                       // adds product sheet, bag drawer and toast to the page
     S.boot({ strings: TZ.strings(pageStrings), render: ... });
     TZ.mount(document);               // draws every <canvas data-stitch="...">
   Motifs follow Palestinian tatreez: the eight-point star, the cypress, the diamond chain and old man's teeth.
   Colours are Asala's: red #C6383C, charcoal #33342F, teal #3FA59A, linen #F4F3F1. */
(function () {
  'use strict';
  var C = { red: '#C6383C', ink: '#33342F', teal: '#3FA59A', linen: '#F4F3F1', pink: '#F2C9C0', mustard: '#EDC56B', white: '#FFFFFF' };

  // 1 = main thread, 2 = second thread, 3 = third thread
  var M = {
    star: ['....1....', '...111...', '1.11211.1', '.1122211.', '112232211', '.1122211.', '1.11211.1', '...111...', '....1....'],
    cypress: ['....1....', '...111...', '...121...', '..11211..', '..12221..', '.1122211.', '.1222221.', '112222211', '....3....', '...333...'],
    chain: ['.....11.....', '....1221....', '...12..21...', '..12....21..', '...12..21...', '....1221....', '.....11.....'],
    teeth: ['1.....', '11....', '121...', '1221..', '12221.', '111111'],
    rose: ['...1...', '..121..', '.12321.', '1233321', '.12321.', '..121..', '...1...']
  };
  var PALETTES = {
    classic: ['red', 'ink', 'teal'],
    light: ['linen', 'pink', 'linen'],
    red: ['red', 'red', 'red'],
    ink: ['ink', 'ink', 'ink'],
    teal: ['teal', 'ink', 'red'],
    mono: ['ink', 'red', 'ink'],
    gold: ['mustard', 'linen', 'mustard'],
    white: ['white', 'white', 'white']
  };
  function pal(cv) {
    var p = PALETTES[cv.getAttribute('data-palette') || 'classic'] || PALETTES.classic;
    var cs = getComputedStyle(cv);
    return p.map(function (k, i) {
      var custom = cv.getAttribute('data-c' + (i + 1)) || cs.getPropertyValue('--tz-c' + (i + 1)).trim();
      return custom || C[k] || k;
    });
  }
  function xs(ctx, x, y, c, color) {
    var p = c * 0.17;
    ctx.strokeStyle = color; ctx.lineWidth = Math.max(1, c * 0.27); ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x + p, y + p); ctx.lineTo(x + c - p, y + c - p); ctx.moveTo(x + c - p, y + p); ctx.lineTo(x + p, y + c - p); ctx.stroke();
  }
  // Build the list of stitches first, so they can be drawn all at once or one by one (the "sewing" animation).
  function motif(list, rows, ox, oy, c, colors) {
    rows.forEach(function (r, j) { for (var i = 0; i < r.length; i++) { var k = r[i]; if (k !== '.') list.push([ox + i * c, oy + j * c, c, colors[+k - 1]]); } });
  }
  function plan(kind, W, H, col, cv) {
    var L = [], c, n, off, i, x, y, u;
    var size = parseFloat(cv.getAttribute('data-cell') || 0);
    if (kind === 'star' || kind === 'cypress' || kind === 'rose') {
      var rows = M[kind], w = rows[0].length, h = rows.length;
      c = Math.floor(Math.min(W / w, H / h)); motif(L, rows, (W - c * w) / 2, (H - c * h) / 2, c, col);
    } else if (kind === 'chain') {
      c = size || Math.max(3, Math.floor(H / 8)); u = 12 * c; n = Math.max(1, Math.floor(W / u)); off = (W - n * u) / 2;
      for (i = 0; i < n; i++) motif(L, M.chain, off + i * u, (H - 7 * c) / 2, c, col);
    } else if (kind === 'teeth') {
      c = size || Math.max(3, Math.floor(H / 7)); u = 6 * c; n = Math.max(1, Math.floor(W / u)); off = (W - n * u) / 2;
      for (i = 0; i < n; i++) motif(L, M.teeth, off + i * u, (H - 6 * c) / 2, c, col);
    } else if (kind === 'hem') {
      c = size || Math.max(3, Math.floor(H / 12)); u = 13 * c; n = Math.max(1, Math.floor(W / u)); off = (W - n * u) / 2 + 2 * c;
      for (i = 0; i < n; i++) motif(L, i % 2 ? M.star : M.cypress, off + i * u, (H - (i % 2 ? 9 : 10) * c) / 2, c, col);
    } else if (kind === 'run') {
      c = size || Math.max(3, Math.min(6, H)); n = Math.floor(W / c);
      for (i = 0; i < n; i++) L.push([i * c, (H - c) / 2, c, Math.floor(i / 2) % 2 ? col[1] : col[0]]);
    } else if (kind === 'field') {
      c = size || 4; u = 16 * c;
      for (y = 0; y < H; y += u) for (x = ((y / u) % 2) * u / 2 - u / 2; x < W; x += u) motif(L, M.star, x + 3 * c, y + 3 * c, c, col);
    } else if (kind === 'frame') {
      c = size || Math.max(3, Math.floor(Math.min(W, H) / 100)); var e = 3 * c, sz = 9 * c, k;
      for (x = sz; x <= W - sz - c; x += c) { k = Math.floor(x / c) % 4 < 2 ? col[0] : col[1]; L.push([x, e, c, k]); }
      for (y = sz; y <= H - sz - c; y += c) { k = Math.floor(y / c) % 4 < 2 ? col[0] : col[1]; L.push([W - e - c, y, c, k]); }
      for (x = W - sz - c; x >= sz; x -= c) { k = Math.floor(x / c) % 4 < 2 ? col[0] : col[1]; L.push([x, H - e - c, c, k]); }
      for (y = H - sz - c; y >= sz; y -= c) { k = Math.floor(y / c) % 4 < 2 ? col[0] : col[1]; L.push([e, y, c, k]); }
      [[0, 0], [W - sz, 0], [W - sz, H - sz], [0, H - sz]].forEach(function (p) { motif(L, M.star, p[0], p[1], c, col); });
    } else if (kind === 'corners') {
      c = size || Math.max(2, Math.floor(Math.min(W, H) / 60)); var s2 = 9 * c;
      [[0, 0], [W - s2, 0], [W - s2, H - s2], [0, H - s2]].forEach(function (p) { motif(L, M.star, p[0], p[1], c, col); });
    }
    return L;
  }
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function draw(cv, animate) {
    var b = cv.getBoundingClientRect(); if (!b.width || !b.height) return;
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = Math.round(b.width * dpr); cv.height = Math.round(b.height * dpr);
    var ctx = cv.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, b.width, b.height);
    var L = plan(cv.getAttribute('data-stitch'), b.width, b.height, pal(cv), cv);
    if (cv.__raf) cancelAnimationFrame(cv.__raf);
    if (!animate || reduce) { L.forEach(function (s) { xs(ctx, s[0], s[1], s[2], s[3]); }); return; }
    var i = 0, per = Math.max(2, Math.ceil(L.length / 70));
    (function step() { for (var k = 0; k < per && i < L.length; k++, i++) xs(ctx, L[i][0], L[i][1], L[i][2], L[i][3]); if (i < L.length) cv.__raf = requestAnimationFrame(step); })();
  }
  var ro = 'ResizeObserver' in window ? new ResizeObserver(function (es) { es.forEach(function (e) { draw(e.target, false); }); }) : null;
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { io.unobserve(e.target); e.target.__sewn = 1; draw(e.target, true); } });
  }, { threshold: 0.25 }) : null;
  function mount(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll('canvas[data-stitch]'), function (cv) {
      if (cv.__tz) { draw(cv, false); return; }
      cv.__tz = 1; cv.setAttribute('aria-hidden', 'true');
      if (cv.hasAttribute('data-sew') && io && !reduce) { io.observe(cv); if (ro) setTimeout(function () { ro.observe(cv); }, 1600); }
      else if (ro) ro.observe(cv); else draw(cv, false);
    });
  }
  window.addEventListener('resize', function () { if (!ro) mount(document); });

  // ---------- shared product sheet, bag drawer and toast ----------
  var X = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>';
  function shell() {
    if (document.querySelector('[data-drawer]')) return;
    var html =
      '<div class="tz-sheet" data-sheet hidden role="dialog" aria-modal="true" aria-labelledby="sheet-title">' +
        '<div class="tz-sheet-card">' +
          '<button class="tz-x" type="button" data-close data-ta="close">' + X + '</button>' +
          '<div class="tz-sheet-art"><img data-sheet-photo alt="" hidden><canvas class="tz-sheet-frame" data-stitch="corners"></canvas></div>' +
          '<div class="tz-sheet-info">' +
            '<p class="tz-sheet-cat" data-sheet-cat></p>' +
            '<h2 id="sheet-title" data-sheet-name></h2>' +
            '<p class="tz-sheet-price" data-sheet-price></p>' +
            '<p class="tz-sheet-desc" data-sheet-desc></p>' +
            '<fieldset class="tz-fs"><legend data-t="tone"></legend><div class="tz-tones" role="radiogroup" data-sheet-tones></div></fieldset>' +
            '<div data-sheet-extra></div>' +
            '<button class="tz-btn tz-full" type="button" data-sheet-add data-t="add"></button>' +
            '<ul class="tz-notes"><li data-t="tz_made"></li><li data-t="tz_box"></li><li data-t="tz_cod"></li></ul>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="tz-drawer" data-drawer hidden role="dialog" aria-modal="true" aria-labelledby="bag-title">' +
        '<div class="tz-d-card" data-scroll>' +
          '<canvas class="tz-d-band" data-stitch="chain"></canvas>' +
          '<div class="tz-d-head"><h2 id="bag-title" data-t="cart"></h2><span data-count-label></span><button class="tz-x" type="button" data-close data-ta="close">' + X + '</button></div>' +
          '<section data-step="bag">' +
            '<div class="tz-empty" data-cart-empty><canvas data-stitch="star"></canvas><p data-t="bag_empty"></p><button class="tz-btn" type="button" data-close data-t="continue"></button></div>' +
            '<div data-cart-filled hidden><ul class="tz-cart" data-cart-list></ul>' +
              '<dl class="tz-sums"><div class="grand"><dt data-t="subtotal"></dt><dd data-subtotal></dd></div></dl>' +
              '<button class="tz-btn tz-full" type="button" data-goto="checkout" data-t="checkout"></button></div>' +
          '</section>' +
          '<section data-step="checkout" hidden>' +
            '<form class="tz-form" data-checkout novalidate>' +
              '<div><label for="f-name" data-t="f_name"></label><input id="f-name" name="name" autocomplete="name"><p class="tz-err" data-err="name"></p></div>' +
              '<div><label for="f-phone" data-t="f_phone"></label><input id="f-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" data-tp="ph_phone"><p class="tz-err" data-err="phone"></p></div>' +
              '<div><label for="f-city" data-t="f_city"></label><select id="f-city" name="city" data-city-select></select><p class="tz-err" data-err="city"></p></div>' +
              '<div><label for="f-address" data-t="f_address"></label><textarea id="f-address" name="address" data-tp="ph_address"></textarea><p class="tz-err" data-err="address"></p></div>' +
              '<fieldset class="tz-fs"><legend data-t="f_pay"></legend><div class="tz-pay" data-pay-list></div></fieldset>' +
              '<dl class="tz-sums"><div><dt data-t="subtotal"></dt><dd data-subtotal></dd></div><div><dt data-t="delivery"></dt><dd data-fee></dd></div><div class="grand"><dt data-t="total"></dt><dd data-total></dd></div></dl>' +
              '<p class="tz-hint" data-fee-hint data-t="choose_city"></p>' +
              '<button class="tz-btn tz-full" type="submit" data-t="place_order"></button>' +
              '<button class="tz-link" type="button" data-goto="bag" data-t="back_to_bag"></button>' +
            '</form>' +
          '</section>' +
          '<section data-step="confirm" hidden><div class="tz-ok"><canvas data-stitch="star"></canvas><h3 data-t="ok_title"></h3><p><span data-t="ok_num"></span>: <b data-confirm-num></b></p><p data-confirm-body></p><button class="tz-btn" type="button" data-shop-again data-t="ok_again"></button></div></section>' +
        '</div>' +
      '</div>' +
      '<div class="tz-toast" data-toast role="status" aria-live="polite"></div>';
    var d = document.createElement('div'); d.innerHTML = html;
    while (d.firstChild) document.body.appendChild(d.firstChild);
  }

  var STR = {
    ar: {
      demo_note: 'نموذج تصميم: الأسعار ورسوم التوصيل مؤقتة. الصور والشعار من كتاب هوية أصالة.',
      continue: 'متابعة التسوق', tz_made: 'تُقصّ وتُشطَّب يدوياً في نابلس', tz_box: 'تصلكِ في علبة أصالة مختومة بالأحمر', tz_cod: 'الدفع عند الاستلام',
      add: 'أضيفي إلى السلة', view: 'عرض القطعة', quick_add: 'إضافة سريعة', shop_all: 'تسوّقي كل القطع', from: 'من',
      c_earrings: 'أقراط', c_necklace: 'قلائد', c_gifts: 'هدايا', c_all: 'الكل', search: 'بحث', menu: 'القائمة', our_story: 'حكايتنا'
    },
    en: {
      demo_note: 'Design demo: prices and delivery fees are placeholders. Photos and logo are from the Asala brand book.',
      continue: 'Keep shopping', tz_made: 'Cut and finished by hand in Nablus', tz_box: 'Arrives in an Asala box, sealed in red', tz_cod: 'Cash on delivery',
      add: 'Add to bag', view: 'View piece', quick_add: 'Quick add', shop_all: 'Shop all pieces', from: 'From',
      c_earrings: 'Earrings', c_necklace: 'Necklaces', c_gifts: 'Gifts', c_all: 'All', search: 'Search', menu: 'Menu', our_story: 'Our story'
    }
  };
  function strings(page) {
    page = page || {}; var out = { ar: {}, en: {} };
    ['ar', 'en'].forEach(function (l) {
      Object.keys(STR[l]).forEach(function (k) { out[l][k] = STR[l][k]; });
      Object.keys(page[l] || {}).forEach(function (k) { out[l][k] = page[l][k]; });
    });
    return out;
  }

  window.TZ = { C: C, MOTIFS: M, draw: draw, mount: mount, shell: shell, strings: strings };
})();
