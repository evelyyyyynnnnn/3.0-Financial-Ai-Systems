/* Contagion Observatory — renders data/data.json produced by the pipeline. */
(function () {
  'use strict';

  var SVG = 'http://www.w3.org/2000/svg';
  var W = 720, H = 460;

  var state = { data: null, shocked: null, crossOnly: false, sort: 'strength' };

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function svg(tag, attrs) {
    var n = document.createElementNS(SVG, tag);
    for (var k in attrs) if (attrs[k] != null) n.setAttribute(k, attrs[k]);
    return n;
  }
  function marketOf(id) {
    var n = state.data.nodes.find(function (x) { return x.id === id; });
    return n ? n.market : 'equity';
  }
  function isCross(e) { return marketOf(e.source) !== marketOf(e.target); }

  /* Layout: two arcs, equities left, crypto right. Deterministic — a force
     simulation would move nodes between reloads and make the picture harder
     to talk about, which is the opposite of what this page is for. */
  function layout() {
    var pos = {};
    var groups = { equity: [], crypto: [] };
    state.data.nodes.forEach(function (n) { groups[n.market].push(n.id); });

    [['equity', 200, -1], ['crypto', 520, 1]].forEach(function (g) {
      var market = g[0], cx = g[1], dir = g[2];
      var ids = groups[market], n = ids.length;
      ids.forEach(function (id, i) {
        var t = n === 1 ? 0.5 : i / (n - 1);
        // Spread down the full height, bowing outward in the middle so the
        // two groups face each other and cross-market edges read clearly.
        pos[id] = {
          x: cx + dir * Math.sin(t * Math.PI) * 95,
          y: 54 + t * (H - 108)
        };
      });
    });
    return pos;
  }

  function renderGraph() {
    var g = document.getElementById('graph');
    g.textContent = '';
    g.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    var pos = layout();
    var scen = state.shocked ? state.data.scenarios[state.shocked] : null;

    var edgeLayer = svg('g', null);
    state.data.edges.forEach(function (e) {
      var a = pos[e.source], b = pos[e.target];
      if (!a || !b) return;
      // An edge counts as carrying the shock only if BOTH ends take a real
      // hit. In a graph this dense a shock reaches every node within three
      // hops, so lighting anything the shock merely touched lights all of
      // them and says nothing — the weaker endpoint is what gates it.
      var carried = scen
        ? Math.min(scen[e.source] || 0, scen[e.target] || 0)
        : 0;
      var lit = carried >= 0.15;
      var cls = 'edge' + (isCross(e) ? ' cross' : '') + (lit ? ' lit' : '');
      var op = scen
        ? (lit ? (0.35 + carried * 0.6) : 0.07)
        : (0.18 + e.strength * 0.5);
      edgeLayer.appendChild(svg('line', {
        x1: a.x.toFixed(1), y1: a.y.toFixed(1),
        x2: b.x.toFixed(1), y2: b.y.toFixed(1),
        class: cls,
        'stroke-width': (0.6 + e.strength * 3.4).toFixed(2),
        'stroke-opacity': op.toFixed(2)
      }));
    });
    g.appendChild(edgeLayer);

    state.data.nodes.forEach(function (n) {
      var p = pos[n.id];
      var impact = scen ? (scen[n.id] || 0) : 0;
      var grp = svg('g', {
        class: 'node ' + n.market + (state.shocked === n.id ? ' shocked' : ''),
        tabindex: '0', role: 'button',
        'aria-label': 'Shock ' + n.id
      });
      var r = 9 + Math.min(n.degree, 10) * 0.7;
      grp.appendChild(svg('circle', {
        cx: p.x.toFixed(1), cy: p.y.toFixed(1), r: r.toFixed(1),
        'fill-opacity': scen ? (0.28 + impact * 0.72).toFixed(2) : 1
      }));
      // Clear the circle by its own radius, so labels never sit on the fill.
      grp.appendChild(svg('text', {
        x: p.x.toFixed(1), y: (p.y - r - 6).toFixed(1)
      })).textContent = n.id;

      function fire() {
        state.shocked = (state.shocked === n.id) ? null : n.id;
        renderGraph(); renderScenario();
      }
      grp.addEventListener('click', fire);
      grp.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); fire(); }
      });
      g.appendChild(grp);
    });
  }

  function renderScenario() {
    var box = document.getElementById('scenario');
    box.textContent = '';
    if (!state.shocked) {
      box.appendChild(el('div', 'placeholder',
        'Select a node to propagate a unit shock through the estimated edges.'));
      return;
    }
    var scen = state.data.scenarios[state.shocked] || {};
    box.appendChild(el('div', 'title',
      'Unit shock at ' + state.shocked + ' — estimated impact after 3 hops'));

    var bars = el('div', 'bars');
    Object.keys(scen).forEach(function (id) {
      var v = scen[id];
      var row = el('div', 'barrow');
      row.appendChild(el('span', 'name', id));
      var track = el('div', 'track');
      var fill = el('div', 'fill' + (id === state.shocked ? ' self' : ''));
      fill.style.width = Math.max(2, v * 100).toFixed(1) + '%';
      track.appendChild(fill);
      row.appendChild(track);
      row.appendChild(el('span', 'val', v.toFixed(2)));
      bars.appendChild(row);
    });
    box.appendChild(bars);
  }

  function renderTable() {
    var tb = document.querySelector('#edges tbody');
    tb.textContent = '';
    var rows = state.data.edges.slice();
    if (state.crossOnly) rows = rows.filter(isCross);

    var key = state.sort;
    rows.sort(function (a, b) {
      if (key === 'gap') return (b.tail_dep - Math.abs(b.corr)) - (a.tail_dep - Math.abs(a.corr));
      if (key === 'corr') return Math.abs(b.corr) - Math.abs(a.corr);
      return b[key] - a[key];
    });

    rows.forEach(function (e) {
      var tr = document.createElement('tr');
      if (isCross(e)) tr.className = 'cross';
      [[e.source, marketOf(e.source)], [e.target, marketOf(e.target)]].forEach(function (pair) {
        var td = document.createElement('td');
        td.appendChild(el('span', 'sym ' + pair[1], pair[0]));
        tr.appendChild(td);
      });
      [[e.corr.toFixed(3)], [e.tail_dep.toFixed(2)],
       [e.lag === 0 ? '—' : '+' + e.lag + 'd'], [e.strength.toFixed(3)]]
        .forEach(function (v) {
          var td = document.createElement('td');
          td.className = 'num';
          td.textContent = v[0];
          tr.appendChild(td);
        });
      tb.appendChild(tr);
    });
  }

  function renderStats() {
    var d = state.data;
    var box = document.getElementById('stats');
    box.textContent = '';
    var strongest = d.edges.reduce(function (a, b) {
      var ga = a ? a.tail_dep - Math.abs(a.corr) : -9;
      return (b.tail_dep - Math.abs(b.corr)) > ga ? b : a;
    }, null);
    var items = [
      ['Nodes', d.nodes.length],
      ['Edges', d.edges.length],
      ['Cross-market', d.cross_market_edges],
      ['Trading days', d.window.observations]
    ];
    if (strongest) {
      items.push(['Widest tail gap', strongest.source + '→' + strongest.target]);
    }
    items.forEach(function (p) {
      var s = el('div', 'stat');
      s.appendChild(el('b', null, String(p[1])));
      s.appendChild(el('span', null, p[0]));
      box.appendChild(s);
    });
  }

  function renderMethod() {
    var dl = document.getElementById('method');
    dl.textContent = '';
    Object.keys(state.data.method).forEach(function (k) {
      dl.appendChild(el('dt', null, k));
      dl.appendChild(el('dd', null, state.data.method[k]));
    });
  }

  function render() {
    var d = state.data;
    document.getElementById('window').textContent =
      d.window.start + ' → ' + d.window.end;
    if (d.is_sample) {
      document.getElementById('sampleBanner').hidden = false;
      document.getElementById('sampleNote').textContent = d.source_note;
    }
    renderStats(); renderGraph(); renderScenario(); renderTable(); renderMethod();
  }

  document.getElementById('crossOnly').addEventListener('click', function (e) {
    state.crossOnly = !state.crossOnly;
    e.target.setAttribute('aria-pressed', String(state.crossOnly));
    renderTable();
  });
  document.getElementById('sort').addEventListener('change', function (e) {
    state.sort = e.target.value;
    renderTable();
  });

  fetch('data/data.json')
    .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then(function (d) { state.data = d; render(); })
    .catch(function (err) {
      document.getElementById('scenario').textContent =
        'Could not load data/data.json (' + err.message + '). Run: python pipeline/make_sample.py';
    });
})();
