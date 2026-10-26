// Slide engine for the organic content modules.
// Matches the TAB / Agency Mentor worksheets on Skool, with our own cover
// (off-white linen, blue wordmark, title on a blue bar), "The BIG Problems" / "The OPPORTUNITY" text pages with numbered
// points (flat blue / white linen, like an Instagram text post), grey boards with a blue-square heading and a white framed
// diagram, timed exercises, a "Next..." page and a dotted Notes page.
//
// Every slide is 1056 x 753 (11in x 7.84in landscape, same ratio as the
// TAB PDFs). Two layers per board:
//   guide - thin black line diagram, always printed (you draw over it on camera)
//   ink   - hand-drawn marker annotations, only in the FILLED reference copy

const W = 1056;
const H = 753;

const INK = {
  red: '#E5352B',
  green: '#2FA84F',
  dkgreen: '#16733A',
  blue: '#1E63F0',
  orange: '#F29A16',
  purple: '#A51CC9',
  black: '#1B1B1B',
};

const GUIDE = {
  line: '#1B1B1B',
  fill: '#F3F3F3',
  text: '#4A4A4A',
};

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ---------- seeded jitter so the ink looks hand drawn but renders the same every build

let seed = 7;
function rnd() {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
}
const j = (amt) => (rnd() - 0.5) * 2 * amt;

function roughPath(points, amt = 1.6) {
  // subdivide each segment and wobble the midpoints
  const out = [];
  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    const len = Math.hypot(x2 - x1, y2 - y1);
    const steps = Math.max(1, Math.round(len / 60));
    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      const x = x1 + (x2 - x1) * t;
      const y = y1 + (y2 - y1) * t;
      out.push([x + (s === 0 && i === 0 ? 0 : j(amt)), y + (s === 0 && i === 0 ? 0 : j(amt))]);
    }
  }
  out.push(points[points.length - 1]);
  // smooth with quadratic midpoints
  let d = `M${out[0][0].toFixed(1)},${out[0][1].toFixed(1)}`;
  for (let i = 1; i < out.length - 1; i++) {
    const mx = (out[i][0] + out[i + 1][0]) / 2;
    const my = (out[i][1] + out[i + 1][1]) / 2;
    d += ` Q${out[i][0].toFixed(1)},${out[i][1].toFixed(1)} ${mx.toFixed(1)},${my.toFixed(1)}`;
  }
  const last = out[out.length - 1];
  d += ` L${last[0].toFixed(1)},${last[1].toFixed(1)}`;
  return d;
}

// ---------- ink primitives (marker annotations)

const ink = {
  text(x, y, str, color = 'blue', size = 34, o = {}) {
    const rot = o.rot != null ? o.rot : j(1.5);
    const anchor = o.anchor || 'start';
    const lines = String(str).split('\n');
    const lh = size * (o.lh || 0.95);
    return lines
      .map(
        (ln, i) =>
          `<text x="${x}" y="${y + i * lh}" fill="${INK[color] || color}" font-family="Caveat" font-weight="${o.weight || 700}" font-size="${size}" text-anchor="${anchor}" transform="rotate(${rot.toFixed(2)} ${x} ${y})">${esc(ln)}</text>`
      )
      .join('');
  },
  line(points, color = 'blue', w = 5) {
    return `<path d="${roughPath(points)}" fill="none" stroke="${INK[color] || color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  },
  // smooth freehand curve through points (catmull-rom -> bezier)
  curve(points, color = 'blue', w = 5, o = {}) {
    const p = points.map(([x, y], i) => (i === 0 || i === points.length - 1 ? [x, y] : [x + j(2), y + j(2)]));
    let d = `M${p[0][0]},${p[0][1]}`;
    for (let i = 0; i < p.length - 1; i++) {
      const p0 = p[i - 1] || p[i];
      const p1 = p[i];
      const p2 = p[i + 1];
      const p3 = p[i + 2] || p2;
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0]},${p2[1]}`;
    }
    let s = `<path d="${d}" fill="none" stroke="${INK[color] || color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
    if (o.arrow) s += ink.head(p[p.length - 2], p[p.length - 1], color, w);
    if (o.dot) s += `<circle cx="${p[0][0]}" cy="${p[0][1]}" r="${w * 1.6}" fill="${INK[color] || color}"/>`;
    return s;
  },
  head(from, to, color = 'blue', w = 5) {
    const a = Math.atan2(to[1] - from[1], to[0] - from[0]);
    const L = 18 + w;
    const p1 = [to[0] - L * Math.cos(a - 0.45), to[1] - L * Math.sin(a - 0.45)];
    const p2 = [to[0] - L * Math.cos(a + 0.45), to[1] - L * Math.sin(a + 0.45)];
    return `<path d="M${p1[0].toFixed(1)},${p1[1].toFixed(1)} L${to[0]},${to[1]} L${p2[0].toFixed(1)},${p2[1].toFixed(1)}" fill="none" stroke="${INK[color] || color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  },
  arrow(points, color = 'blue', w = 5) {
    return ink.line(points, color, w) + ink.head(points[points.length - 2], points[points.length - 1], color, w);
  },
  // loose marker loop around something, with the overshoot tail Cormac's circles have
  circle(cx, cy, rx, ry, color = 'red', w = 4.5) {
    const pts = [];
    const start = -1.9 + j(0.3);
    const n = 28;
    for (let i = 0; i <= n + 3; i++) {
      const t = start + (i / n) * Math.PI * 2;
      const wob = 1 + j(0.05) + (i > n ? 0.08 : 0);
      pts.push([cx + Math.cos(t) * rx * wob, cy + Math.sin(t) * ry * wob]);
    }
    let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
    for (let i = 1; i < pts.length - 1; i++) {
      const mx = (pts[i][0] + pts[i + 1][0]) / 2;
      const my = (pts[i][1] + pts[i + 1][1]) / 2;
      d += ` Q${pts[i][0].toFixed(1)},${pts[i][1].toFixed(1)} ${mx.toFixed(1)},${my.toFixed(1)}`;
    }
    return `<path d="${d}" fill="none" stroke="${INK[color] || color}" stroke-width="${w}" stroke-linecap="round"/>`;
  },
  under(x, y, w, color = 'blue', sw = 4) {
    return ink.line([[x, y], [x + w * 0.5, y + j(2)], [x + w, y + j(2)]], color, sw);
  },
  tick(x, y, color = 'dkgreen', s = 1) {
    return ink.line([[x, y], [x + 8 * s, y + 14 * s], [x + 30 * s, y - 26 * s]], color, 4.5 * s);
  },
  cross(x, y, s = 20, color = 'red') {
    return ink.line([[x - s, y - s], [x + s, y + s]], color, 5) + ink.line([[x + s, y - s], [x - s, y + s]], color, 5);
  },
  dot(x, y, color = 'blue', r = 9) {
    return `<circle cx="${x + j(1)}" cy="${y + j(1)}" r="${r}" fill="${INK[color] || color}"/>`;
  },
  box(x, y, w, h, color = 'purple', sw = 4.5) {
    return ink.line([[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y - 3]], color, sw);
  },
  // short horizontal wavy dashes like Cormac's blue "now / future" line
  wave(x1, x2, y, color = 'blue', w = 4) {
    let s = '';
    for (let x = x1; x < x2; x += 70) {
      const e = Math.min(x + 44, x2);
      s += ink.curve([[x, y + j(2)], [(x + e) / 2, y - 4 + j(2)], [e, y + j(2)]], color, w);
    }
    return s;
  },
};

// ---------- guide primitives (faint printed diagram)

const guide = {
  rect(x, y, w, h, o = {}) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r || 0}" fill="${o.fill || 'none'}" stroke="${o.stroke || GUIDE.line}" stroke-width="${o.sw || 2}" ${o.dash ? `stroke-dasharray="${o.dash}"` : ''}/>`;
  },
  circle(cx, cy, r, o = {}) {
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${o.fill || 'none'}" stroke="${o.stroke || GUIDE.line}" stroke-width="${o.sw || 2}" ${o.dash ? `stroke-dasharray="${o.dash}"` : ''}/>`;
  },
  line(x1, y1, x2, y2, o = {}) {
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${o.stroke || GUIDE.line}" stroke-width="${o.sw || 2}" stroke-linecap="round" ${o.dash ? `stroke-dasharray="${o.dash}"` : ''}/>`;
  },
  path(d, o = {}) {
    return `<path d="${d}" fill="${o.fill || 'none'}" stroke="${o.stroke || GUIDE.line}" stroke-width="${o.sw || 2}" stroke-linecap="round" stroke-linejoin="round" ${o.dash ? `stroke-dasharray="${o.dash}"` : ''}/>`;
  },
  text(x, y, str, o = {}) {
    const lines = String(str).split('\n');
    const size = o.size || 14;
    return lines
      .map(
        (ln, i) =>
          `<text x="${x}" y="${y + i * size * 1.25}" fill="${o.color || GUIDE.text}" font-family="Archivo" font-weight="${o.weight || 700}" font-size="${size}" text-anchor="${o.anchor || 'start'}" ${o.ls ? `letter-spacing="${o.ls}"` : ''}>${esc(ln)}</text>`
      )
      .join('');
  },
  arrowHead(x, y, dir = 'right', o = {}) {
    const s = o.size || 12;
    const pts = {
      right: `${x - s},${y - s} ${x},${y} ${x - s},${y + s}`,
      left: `${x + s},${y - s} ${x},${y} ${x + s},${y + s}`,
      up: `${x - s},${y + s} ${x},${y} ${x + s},${y + s}`,
      down: `${x - s},${y - s} ${x},${y} ${x + s},${y - s}`,
    }[dir];
    return `<polyline points="${pts}" fill="none" stroke="${o.stroke || GUIDE.line}" stroke-width="${o.sw || 2}" stroke-linecap="round" stroke-linejoin="round"/>`;
  },
  // the "pill chain" of empty circles from the MRR Opportunity slide
  pills(x, y, n, d = 44, o = {}) {
    let s = guide.rect(x, y - d / 2 - 6, n * d + 12, d + 12, { r: (d + 12) / 2, ...o });
    for (let i = 0; i < n; i++) s += guide.circle(x + 6 + d / 2 + i * d, y, d / 2 - 2, o);
    return s;
  },
  // phone outline for vertical-video diagrams
  phone(x, y, w, h) {
    return (
      guide.rect(x, y, w, h, { r: 26, sw: 3.5 }) +
      guide.rect(x + w / 2 - 34, y + 12, 68, 12, { r: 6, fill: GUIDE.fill, stroke: 'none' })
    );
  },
};

// ---------- slide renderers

const wordmark = (brand) =>
  `<div class="wm">${brand.wordmark.map(esc).join('<br>')}</div>`;

function svgLayer(guideSvg = '', inkSvg = '', filled) {
  return `<svg class="layer" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${guideSvg}${filled ? `<g class="ink">${inkSvg}</g>` : ''}</svg>`;
}

// Module content is laid out on the full 1056 x 753 board. The Skool layout
// needs room for the bigger heading and the white frame, so the content is
// scaled into place rather than re-plotting every coordinate.
const STAGE = {
  board: 'translate(49px, 32px) scale(0.9)', // into the white frame
  sheet: 'translate(25px, 23.5px) scale(0.979)', // worksheet cells, almost full size
};
const stage = (kind, inner) => `<div class="stage" style="transform:${STAGE[kind]}">${inner}</div>`;

const timerIcon = `<svg width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="17" fill="none" stroke="var(--timer)" stroke-width="3"/><path d="M20 10 V20 L26 25" fill="none" stroke="var(--timer)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const heading = (sl) =>
  (sl.title ? `<div class="bt${sl.small ? ' sm' : ''}">${esc(sl.title)}</div>` : '') +
  (sl.minutes ? `<div class="timer">${timerIcon}${sl.minutes} Minutes</div>` : '');

const lines = (t) => esc(t).replace(/\n/g, '<br>');

const S = {
  cover(sl, ctx) {
    return `<section class="slide cover shot white">
      <div class="cover-wm">${ctx.brand.wordmark.map(esc).join('<br>')}</div>
      <div class="cover-text">
        <div class="cover-kicker">${esc(sl.kicker || ctx.brand.program)}</div>
        <div class="cover-title">${lines(sl.title)}</div>
      </div>
      <div class="cover-band"></div>
    </section>`;
  },

  end(sl, ctx) {
    return S.cover({ title: sl.title || ctx.brand.program, kicker: ' ' }, ctx);
  },

  board(sl, ctx) {
    return `<section class="slide board">
      ${heading(sl)}
      <div class="frame"></div>
      ${stage('board', (sl.html || '') + svgLayer(sl.guide, sl.ink, ctx.filled))}
      ${wordmark(ctx.brand)}
    </section>`;
  },

  // Text pages ("text shots"): flat linen-textured blue or white page,
  // uppercase text block, small wordmark at the bottom. Blue is the default;
  // the Opportunity section and anything with theme: 'white' flips it.
  shot(sl, ctx) {
    const theme = sl.theme || 'blue';
    return `<section class="slide shot ${theme}">
      <div class="shot-text${sl.big ? ' big' : ''}">
        ${sl.kicker ? `<div class="shot-kicker">${esc(sl.kicker)}</div>` : ''}
        <div>${lines(sl.text)}</div>
      </div>
      <div class="shot-mark">${ctx.brand.wordmark.map(esc).join(' ')}.</div>
    </section>`;
  },

  // "The BIG Problems" / "The OPPORTUNITY" section page
  divider(sl, ctx) {
    return S.shot({ text: `${sl.lead || 'The'} ${sl.word}`, theme: sl.theme || (sl.tone === 'idea' ? 'white' : 'blue'), big: true }, ctx);
  },

  // numbered point under a divider
  point(sl, ctx) {
    const label = sl.tone === 'idea' ? 'Opportunity' : 'Problem';
    return S.shot({ text: sl.text, kicker: `${label} ${String(sl.n).padStart(2, '0')}`, theme: sl.theme || (sl.tone === 'idea' ? 'white' : 'blue') }, ctx);
  },

  statement(sl, ctx) {
    return S.shot({ text: sl.text, theme: sl.theme || 'blue' }, ctx);
  },

  // free layout page: blue-square heading, html in page coordinates, no scaling
  page(sl, ctx) {
    return `<section class="slide board">
      ${heading(sl)}
      ${sl.tag ? `<div class="ptag" style="background:${sl.tag.color}">${esc(sl.tag.label)}</div>` : ''}
      ${sl.html || ''}
      ${wordmark(ctx.brand)}
    </section>`;
  },

  notes(sl, ctx) {
    return `<section class="slide board">
      <div class="notes"><div class="notes-tab">Notes</div></div>
      ${wordmark(ctx.brand)}
    </section>`;
  },

  // boxed worksheet. cells: {x,y,w,h,label,prompt,dots}
  sheet(sl, ctx) {
    const cells = sl.cells
      .map(
        (c) => `<div class="cell${c.dots ? ' dots' : ''}${c.dark ? ' dark' : ''}" style="left:${c.x}px;top:${c.y}px;width:${c.w}px;height:${c.h}px">
          <div class="cl"><b>${esc(c.label || '')}</b>${c.prompt ? ` <span>| ${esc(c.prompt)}</span>` : ''}</div>
          ${c.html || ''}
        </div>`
      )
      .join('');
    const tag = sl.tag ? `<div class="tag" style="left:${sl.tag.x}px;top:${sl.tag.y}px;width:${sl.tag.w}px"><b>${esc(sl.tag.label)}</b></div>` : '';
    return `<section class="slide board">
      ${heading(sl)}
      ${stage('sheet', tag + cells + svgLayer(sl.guide, sl.ink, ctx.filled))}
      ${wordmark(ctx.brand)}
    </section>`;
  },

  next(sl, ctx) {
    const items = sl.checklist
      .map((t) => `<li><span class="cb"></span><span>${esc(t)}</span></li>`)
      .join('');
    // filled copy: tick every box like the TAB example
    let inkSvg = sl.ink || '';
    if (ctx.filled) {
      sl.checklist.forEach((_, i) => {
        inkSvg += ink.tick(711, 150 + i * 56, 'dkgreen', 0.95);
      });
    }
    return `<section class="slide board">
      <div class="bt">Next...</div>
      <div class="next">
        <div class="next-left">
          <div class="nrow dots"><b>Takeaways:</b></div>
          <div class="nrow dots"><b>Actions:</b></div>
          <div class="nrow dots"><b>Communications:</b></div>
        </div>
        <div class="next-right"><b>Checklist:</b><ul>${items}</ul></div>
      </div>
      ${svgLayer('', inkSvg, ctx.filled)}
      ${wordmark(ctx.brand)}
    </section>`;
  },
};

// grid of pre-printed white cards (structures, prompts, gear lists)
function cards(items, { x = 50, y = 74, w = 950, h = 600, cols = 3, gap = 14 } = {}) {
  const rows = Math.ceil(items.length / cols);
  const cw = (w - gap * (cols - 1)) / cols;
  const ch = (h - gap * (rows - 1)) / rows;
  return items
    .map((it, k) => {
      const cx = x + (k % cols) * (cw + gap);
      const cy = y + Math.floor(k / cols) * (ch + gap);
      return `<div class="card" style="left:${cx}px;top:${cy}px;width:${cw}px;height:${it.h || ch}px">
        ${it.h4 ? `<h4>${esc(it.h4)}</h4>` : ''}
        ${it.p ? `<p>${esc(it.p)}</p>` : ''}
        ${it.mono ? `<div class="mono">${esc(it.mono)}</div>` : ''}
        ${it.eg ? `<div class="eg">${esc(it.eg)}</div>` : ''}
      </div>`;
    })
    .join('');
}

function renderModule(mod, ctx) {
  seed = 7 + mod.number * 101; // stable jitter per module
  const slides = mod.slides.map((sl) => S[sl.type](sl, ctx)).join('\n');
  return `<!doctype html><html><head><meta charset="utf-8">
  <title>${esc(mod.title)}</title>
  <link rel="stylesheet" href="../src/fonts/fonts.css">
  <link rel="stylesheet" href="../src/styles.css">
  </head><body>${slides}</body></html>`;
}

module.exports = { W, H, INK, GUIDE, ink, guide, cards, renderModule, esc };
