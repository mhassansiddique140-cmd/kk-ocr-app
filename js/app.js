(function () {
  var cfg = SITE_CONFIG;
  var years = Object.keys(TAX_RULES);

  function $(id) { return document.getElementById(id); }
  function pkr(n) { return 'Rs ' + Math.round(n).toLocaleString('en-PK'); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function waLink(text) {
    return 'https://wa.me/' + cfg.whatsappNumber + (text ? '?text=' + encodeURIComponent(text) : '');
  }

  // ---- Static content from config ----
  $('services-grid').innerHTML = cfg.services.map(function (s) {
    return '<div class="card service">' +
      '<div class="service-icon">' + s.icon + '</div>' +
      '<h3>' + esc(s.title) + '</h3><p>' + esc(s.desc) + '</p>' +
      '<div class="service-foot"><span class="price">from ' + pkr(s.price) + '</span>' +
      '<a href="#order" class="link" data-service="' + s.id + '">Order &rarr;</a></div></div>';
  }).join('');

  $('pricing-grid').innerHTML = cfg.plans.map(function (p) {
    return '<div class="card plan' + (p.featured ? ' featured' : '') + '">' +
      (p.featured ? '<span class="badge">Most popular</span>' : '') +
      '<h3>' + esc(p.name) + '</h3><p class="plan-for">' + esc(p.for) + '</p>' +
      '<div class="plan-price">' + pkr(p.price) + '</div><ul>' +
      p.features.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') +
      '</ul><a href="#order" class="btn btn-block' + (p.featured ? '' : ' btn-ghost') + '">Choose ' + esc(p.name) + '</a></div>';
  }).join('');

  $('faq-list').innerHTML = cfg.faqs.map(function (f) {
    return '<details class="faq"><summary>' + esc(f.q) + '</summary><p>' + esc(f.a) + '</p></details>';
  }).join('');

  $('o-service').innerHTML = cfg.services.map(function (s) {
    return '<option value="' + s.id + '">' + esc(s.title) + '</option>';
  }).join('');

  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-service]');
    if (a) $('o-service').value = a.getAttribute('data-service');
  });

  $('whatsapp-float').href = waLink('Hi, I need help with my tax return.');
  $('footer-whatsapp').href = waLink();
  $('footer-email').href = 'mailto:' + cfg.email;
  $('footer-email').textContent = cfg.email;
  $('year').textContent = new Date().getFullYear();

  // ---- Mobile nav ----
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { links.classList.remove('open'); toggle.setAttribute('aria-expanded', false); }
  });

  // ---- Quick hero calculator (latest year, salaried) ----
  $('quick-salary').addEventListener('input', function () {
    var monthly = Number(this.value);
    if (!monthly) { $('quick-result').textContent = 'Enter your salary to see your monthly tax.'; return; }
    var r = TaxCalc.calculateTax(monthly * 12, TAX_RULES[years[0]].salaried);
    $('quick-result').innerHTML = 'Monthly tax: <strong>' + pkr(r.monthlyTax) + '</strong><br>' +
      'Take-home: <strong>' + pkr(r.monthlyNet) + '</strong><br><small>' + esc(years[0]) + ' salaried slabs</small>';
  });

  // ---- Full calculator ----
  $('calc-year').innerHTML = years.map(function (y) { return '<option>' + esc(y) + '</option>'; }).join('');

  function renderSlabs(rule) {
    var lower = 0;
    $('slab-table').innerHTML = rule.slabs.map(function (s) {
      var range = s.upTo === Infinity ? 'Above ' + pkr(lower) : pkr(lower === 0 ? 0 : lower + 1) + ' – ' + pkr(s.upTo);
      var tax = s.rate === 0 ? 'Nil' :
        (s.fixed ? pkr(s.fixed) + ' + ' : '') + (s.rate * 100) + '% of amount above ' + pkr(lower);
      lower = s.upTo;
      return '<tr><td>' + range + '</td><td>' + tax + '</td></tr>';
    }).join('');
  }

  function recalc() {
    var rule = TAX_RULES[$('calc-year').value][$('calc-type').value];
    renderSlabs(rule);
    var raw = Number($('calc-income').value) || 0;
    var annual = $('calc-period').value === 'monthly' ? raw * 12 : raw;
    var r = TaxCalc.calculateTax(annual, rule);
    $('r-monthly-income').textContent = pkr(annual / 12);
    $('r-monthly-tax').textContent = pkr(r.monthlyTax);
    $('r-monthly-net').textContent = pkr(r.monthlyNet);
    $('r-annual-income').textContent = pkr(annual);
    $('r-annual-tax').textContent = pkr(r.annualTax);
    $('r-rate').textContent = (r.effectiveRate * 100).toFixed(2) + '%';
    var sur = $('r-surcharge');
    sur.hidden = !r.surcharge;
    if (r.surcharge) sur.textContent = 'Includes a surcharge of ' + pkr(r.surcharge) + ' (' + (rule.surcharge.rate * 100) + '% of tax) because income exceeds ' + pkr(rule.surcharge.above) + '.';
  }
  ['calc-year', 'calc-type', 'calc-period', 'calc-income'].forEach(function (id) {
    $(id).addEventListener('input', recalc);
  });
  recalc();

  // ---- Order form -> WhatsApp ----
  $('order-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = $('o-name').value.trim();
    var phone = $('o-phone').value.trim();
    var err = $('o-error');
    if (!name || !/^(\+?92|0)3\d{2}-?\d{7}$/.test(phone.replace(/\s/g, ''))) {
      err.textContent = !name ? 'Please enter your name.' : 'Please enter a valid Pakistani mobile number (e.g. 0300-1234567).';
      err.hidden = false;
      return;
    }
    err.hidden = true;
    var service = $('o-service').selectedOptions[0].textContent;
    var msg = 'Assalam o Alaikum! I would like to order: ' + service +
      '\nName: ' + name + '\nPhone: ' + phone +
      ($('o-notes').value.trim() ? '\nNotes: ' + $('o-notes').value.trim() : '');
    window.open(waLink(msg), '_blank', 'noopener');
  });
})();
