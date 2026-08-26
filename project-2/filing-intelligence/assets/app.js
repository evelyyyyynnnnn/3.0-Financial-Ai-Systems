/* Filing Intelligence — renders data/data.json produced by the pipeline. */
(function () {
  'use strict';

  var KINDS = [
    { key: 'escalated', label: 'Escalated', hint: 'kept, but with new risk language' },
    { key: 'added',     label: 'Added',     hint: 'no prior sentence survives inside it' },
    { key: 'removed',   label: 'Removed',   hint: 'dropped since the prior filing' }
  ];

  var state = { data: null, kinds: new Set(KINDS.map(function (k) { return k.key; })), q: '' };

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;   // textContent, never innerHTML — filing text is data
    return n;
  }

  function fmtDate(iso) {
    if (!iso) return '';
    var d = new Date(iso);
    return isNaN(d) ? iso : d.toISOString().slice(0, 10);
  }

  function renderStats() {
    var box = document.getElementById('stats');
    box.textContent = '';
    var totals = { escalated: 0, added: 0, removed: 0 };
    state.data.companies.forEach(function (c) {
      KINDS.forEach(function (k) { totals[k.key] += (c.counts[k.key] || 0); });
    });
    var items = [['Companies', state.data.companies.length]]
      .concat(KINDS.map(function (k) { return [k.label, totals[k.key]]; }));
    items.forEach(function (pair) {
      var s = el('div', 'stat');
      s.appendChild(el('b', null, String(pair[1])));
      s.appendChild(el('span', null, pair[0]));
      box.appendChild(s);
    });
  }

  function renderFilters() {
    var box = document.getElementById('kindFilter');
    box.textContent = '';
    KINDS.forEach(function (k) {
      var b = el('button', null, k.label);
      b.type = 'button';
      b.title = k.hint;
      b.setAttribute('aria-pressed', String(state.kinds.has(k.key)));
      b.addEventListener('click', function () {
        if (state.kinds.has(k.key)) state.kinds.delete(k.key);
        else state.kinds.add(k.key);
        b.setAttribute('aria-pressed', String(state.kinds.has(k.key)));
        renderCompanies();
      });
      box.appendChild(b);
    });
  }

  function matches(f) {
    if (!state.kinds.has(f.kind)) return false;
    if (!state.q) return true;
    var hay = (f.text + ' ' + (f.signals || []).join(' ') + ' ' + f.item_title).toLowerCase();
    return hay.indexOf(state.q) !== -1;
  }

  function findingNode(f) {
    var wrap = el('article', 'finding ' + f.kind);

    var head = el('div', 'head');
    head.appendChild(el('span', 'pill ' + f.kind, f.kind));
    head.appendChild(el('span', 'item', 'Item ' + f.item + ' · ' + f.item_title));
    (f.signals || []).forEach(function (s) {
      head.appendChild(el('span', 'pill signal', s));
    });
    if (f.similarity != null) {
      head.appendChild(el('span', 'pill sim', 'retains ' +
        Math.round(f.similarity * 100) + '% of prior'));
    }
    wrap.appendChild(head);

    wrap.appendChild(el('blockquote', null, f.text));

    if (f.prior_text) {
      var prior = el('div', 'prior');
      prior.appendChild(el('span', 'label', 'Prior filing said'));
      prior.appendChild(el('blockquote', null, f.prior_text));
      wrap.appendChild(prior);
    }
    return wrap;
  }

  function renderCompanies() {
    var root = document.getElementById('companies');
    root.textContent = '';
    var shown = 0;

    state.data.companies.forEach(function (c) {
      var findings = (c.findings || []).filter(matches);
      if (!findings.length) return;
      shown += findings.length;

      var card = el('section', 'company');

      var head = el('header');
      head.appendChild(el('span', 'ticker', c.ticker));
      head.appendChild(el('h2', null, c.company));
      var periods = el('span', 'periods',
        c.current.form + ' ' + fmtDate(c.current.period) + '  vs  ' + fmtDate(c.prior.period));
      head.appendChild(periods);
      card.appendChild(head);

      var counts = el('div', 'counts');
      KINDS.forEach(function (k) {
        if (!c.counts[k.key]) return;
        counts.appendChild(el('span', 'pill ' + k.key, c.counts[k.key] + ' ' + k.label.toLowerCase()));
      });
      if (c.current.url) {
        var a = el('a', null, 'Open filing on SEC.gov →');
        a.href = c.current.url;
        a.rel = 'noopener';
        a.style.marginLeft = 'auto';
        a.style.fontSize = '13px';
        counts.appendChild(a);
      }
      card.appendChild(counts);

      findings.forEach(function (f) { card.appendChild(findingNode(f)); });
      root.appendChild(card);
    });

    if (!shown) {
      root.appendChild(el('div', 'empty',
        state.q ? 'No findings match “' + state.q + '”.'
                : 'No findings for the selected kinds.'));
    }
  }

  function render() {
    document.getElementById('generated').textContent =
      'generated ' + fmtDate(state.data.generated_at);

    if (state.data.is_sample) {
      var b = document.getElementById('sampleBanner');
      b.hidden = false;
      document.getElementById('sampleNote').textContent = state.data.source_note;
    }
    renderStats();
    renderFilters();
    renderCompanies();
  }

  document.getElementById('search').addEventListener('input', function (e) {
    state.q = e.target.value.trim().toLowerCase();
    renderCompanies();
  });

  fetch('data/data.json')
    .then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(function (d) { state.data = d; render(); })
    .catch(function (err) {
      document.getElementById('companies').appendChild(el('div', 'empty',
        'Could not load data/data.json (' + err.message + '). ' +
        'Run: python pipeline/make_sample.py'));
    });
})();
