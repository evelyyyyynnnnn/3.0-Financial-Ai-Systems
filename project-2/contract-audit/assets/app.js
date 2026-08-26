/* Contract Audit — renders data/data.json produced by analyzer/build_report.py */
(function () {
  'use strict';

  var SEVERITIES = ['critical', 'high', 'medium', 'low'];
  var state = { data: null, sevs: new Set(SEVERITIES) };

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;   // never innerHTML — this renders source code
    return n;
  }

  function renderStats() {
    var d = state.data, box = document.getElementById('stats');
    box.textContent = '';
    var items = [['Contracts', d.contracts_scanned]];
    SEVERITIES.forEach(function (s) {
      if (d.totals[s]) items.push([s, d.totals[s], s]);
    });
    var total = Object.keys(d.totals).reduce(function (a, k) { return a + d.totals[k]; }, 0);
    items.push(['Findings', total]);
    items.forEach(function (p) {
      var s = el('div', 'stat' + (p[2] ? ' ' + p[2] : ''));
      s.appendChild(el('b', null, String(p[1])));
      s.appendChild(el('span', null, p[0]));
      box.appendChild(s);
    });
  }

  function renderFilters() {
    var box = document.getElementById('sevFilter');
    box.textContent = '';
    SEVERITIES.forEach(function (s) {
      if (!state.data.totals[s]) return;
      var b = el('button', null, s + ' (' + state.data.totals[s] + ')');
      b.type = 'button';
      b.setAttribute('aria-pressed', String(state.sevs.has(s)));
      b.addEventListener('click', function () {
        if (state.sevs.has(s)) state.sevs.delete(s); else state.sevs.add(s);
        b.setAttribute('aria-pressed', String(state.sevs.has(s)));
        renderResults();
      });
      box.appendChild(b);
    });
  }

  function codeBlock(snip, hitLine) {
    var pre = el('pre', 'code');
    snip.lines.forEach(function (l) {
      var row = el('span', 'ln' + (l.n === hitLine ? ' hit' : ''));
      row.appendChild(el('span', 'n', String(l.n)));
      row.appendChild(document.createTextNode(l.text));
      pre.appendChild(row);
    });
    return pre;
  }

  function detailRow(key, value, cls) {
    var d = el('div');
    d.appendChild(el('span', 'k', key));
    d.appendChild(el('span', cls || null, value));
    return d;
  }

  function findingNode(f) {
    var wrap = el('article', 'finding');

    var head = el('div', 'head');
    head.appendChild(el('span', 'pill ' + f.severity, f.severity));
    head.appendChild(el('span', 'pill conf', f.confidence + ' confidence'));
    head.appendChild(el('h4', null, f.title));
    (f.references || []).forEach(function (r) {
      head.appendChild(el('span', 'pill ref', r));
    });
    head.appendChild(el('span', 'loc',
      (f.function ? f.function + '() · ' : '') + 'line ' + f.line));
    wrap.appendChild(head);

    wrap.appendChild(codeBlock(f.snippet, f.line));

    var detail = el('div', 'detail');
    detail.appendChild(detailRow('Why it matters', f.explanation));
    detail.appendChild(detailRow('False positives', f.false_positives, 'fp'));
    detail.appendChild(detailRow('Fix', f.remediation));
    detail.appendChild(detailRow('Detector', f.detector));
    wrap.appendChild(detail);
    return wrap;
  }

  function renderResults() {
    var root = document.getElementById('results');
    root.textContent = '';

    state.data.contracts.forEach(function (c) {
      var findings = c.findings.filter(function (f) { return state.sevs.has(f.severity); });
      var sec = el('section', 'file');

      var head = el('header');
      head.appendChild(el('h3', null, c.path));
      SEVERITIES.forEach(function (s) {
        if (c.counts[s]) head.appendChild(el('span', 'pill ' + s, c.counts[s] + ' ' + s));
      });
      head.appendChild(el('span', 'meta', c.lines + ' lines'));
      sec.appendChild(head);

      if (!c.findings.length) {
        var ok = el('div', 'clean');
        ok.appendChild(el('b', null, 'No findings. '));
        ok.appendChild(document.createTextNode(
          'These detectors matched nothing here — which is a statement about ' +
          'these detectors, not a certificate.'));
        sec.appendChild(ok);
      } else if (!findings.length) {
        sec.appendChild(el('div', 'clean', 'All findings hidden by the current filter.'));
      } else {
        findings.forEach(function (f) { sec.appendChild(findingNode(f)); });
      }
      root.appendChild(sec);
    });
  }

  function renderDetectors() {
    var tb = document.querySelector('#detectors tbody');
    tb.textContent = '';
    state.data.detectors.forEach(function (d) {
      var tr = document.createElement('tr');
      var td1 = document.createElement('td');
      td1.appendChild(el('code', null, d.name));
      tr.appendChild(td1);
      var td2 = document.createElement('td');
      td2.textContent = d.doc;
      tr.appendChild(td2);
      tb.appendChild(tr);
    });
  }

  function render() {
    document.getElementById('stamp').textContent =
      'scanned ' + state.data.generated_at.slice(0, 10);
    document.getElementById('methodNote').textContent = state.data.method_note;
    renderStats(); renderFilters(); renderResults(); renderDetectors();
  }

  fetch('data/data.json')
    .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then(function (d) { state.data = d; render(); })
    .catch(function (err) {
      document.getElementById('results').appendChild(el('div', 'clean',
        'Could not load data/data.json (' + err.message +
        '). Run: python analyzer/build_report.py'));
    });
})();
