/* ============================================================
   FastCal — a time-saving calorie tracker for founders.
   Vanilla JS, no build step. Data lives in localStorage.
   Photo recognition is SIMULATED here (canned results),
   structured so a real Claude vision call can drop in later
   at analyzePhoto().
   ============================================================ */

(() => {
  'use strict';

  // ---------- storage ----------
  const KEY = 'fastcal.v1';
  const blank = { profile: null, meals: [], weights: [] };
  let state = load();

  function load() {
    try { return Object.assign({}, blank, JSON.parse(localStorage.getItem(KEY)) || {}); }
    catch { return Object.assign({}, blank); }
  }
  function save() { localStorage.setItem(KEY, JSON.stringify(state)); }

  // ---------- helpers ----------
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const todayISO = () => new Date().toISOString().slice(0, 10);
  const round = n => Math.round(n);
  const fmt = n => round(n).toLocaleString();

  function prettyDate(iso) {
    const d = new Date(iso + 'T00:00:00');
    const t = new Date(todayISO() + 'T00:00:00');
    const diff = Math.round((t - d) / 86400000);
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  }

  // ---------- nutrition math ----------
  // Mifflin-St Jeor BMR -> TDEE -> daily budget given goal & timeframe.
  function computePlan(p) {
    const kg = p.weight / 2.2046226;
    const cm = p.heightIn * 2.54;
    let bmr = 10 * kg + 6.25 * cm - 5 * p.age + (p.sex === 'male' ? 5 : -161);
    const tdee = bmr * p.activity;

    const lbsToLose = Math.max(0, p.weight - p.goal);
    const days = Math.max(1, Math.round((new Date(p.target) - new Date(todayISO())) / 86400000));
    // 3500 kcal ≈ 1 lb of fat
    let dailyDeficit = (lbsToLose * 3500) / days;
    dailyDeficit = Math.min(dailyDeficit, 1000);            // cap at a safe ~2 lb/week
    let budget = Math.round(tdee - dailyDeficit);
    const floor = p.sex === 'male' ? 1500 : 1200;           // never recommend below this
    budget = Math.max(budget, floor);

    const proteinGoal = Math.round((p.goal / 2.2046226) * 1.8); // 1.8 g per kg goal weight
    return { tdee: Math.round(tdee), budget, proteinGoal, lbsToLose, days };
  }

  // ---------- simulated photo recognition ----------
  // Swap this function's body for a real Claude vision API call later.
  const FOOD_DB = [
    { name: 'Grilled chicken salad', emoji: '🥗', cal: 420, p: 38, c: 18, f: 22 },
    { name: 'Avocado toast',         emoji: '🥑', cal: 340, p: 12, c: 38, f: 16 },
    { name: 'Burrito bowl',          emoji: '🌯', cal: 640, p: 34, c: 72, f: 26 },
    { name: 'Salmon & veggies',      emoji: '🐟', cal: 520, p: 40, c: 20, f: 30 },
    { name: 'Protein smoothie',      emoji: '🥤', cal: 290, p: 30, c: 28, f:  7 },
    { name: 'Eggs & bacon',          emoji: '🍳', cal: 380, p: 26, c:  4, f: 28 },
    { name: 'Greek yogurt & berries',emoji: '🫐', cal: 220, p: 18, c: 24, f:  6 },
    { name: 'Steak & potatoes',      emoji: '🥩', cal: 720, p: 52, c: 45, f: 34 },
    { name: 'Sushi roll',            emoji: '🍣', cal: 480, p: 22, c: 70, f: 12 },
    { name: 'Pasta bolognese',       emoji: '🍝', cal: 610, p: 28, c: 78, f: 20 },
    { name: 'Cheeseburger',          emoji: '🍔', cal: 560, p: 30, c: 40, f: 30 },
    { name: 'Oatmeal & banana',      emoji: '🥣', cal: 310, p: 10, c: 58, f:  6 },
  ];
  function analyzePhoto() {
    // Returns a Promise to mimic an async AI call.
    return new Promise(res => {
      const pick = FOOD_DB[Math.floor(Math.random() * FOOD_DB.length)];
      setTimeout(() => res({ ...pick }), 1400);
    });
  }

  // ---------- one-tap favorites ----------
  const FAVORITES = [
    { name: 'Coffee w/ milk', emoji: '☕', cal: 60,  p: 3,  c: 6,  f: 2 },
    { name: 'Protein shake',  emoji: '🥤', cal: 290, p: 30, c: 28, f: 7 },
    { name: 'Chicken salad',  emoji: '🥗', cal: 420, p: 38, c: 18, f: 22 },
    { name: 'Almonds',        emoji: '🥜', cal: 180, p: 6,  c: 6,  f: 15 },
    { name: 'Greek yogurt',   emoji: '🫐', cal: 220, p: 18, c: 24, f: 6 },
    { name: 'Banana',         emoji: '🍌', cal: 105, p: 1,  c: 27, f: 0 },
  ];

  function guessMealType() {
    const h = new Date().getHours();
    if (h < 11) return 'Breakfast';
    if (h < 16) return 'Lunch';
    if (h < 21) return 'Dinner';
    return 'Snack';
  }

  // ---------- meal operations ----------
  function addMeal(m) {
    state.meals.push({
      id: Date.now() + '' + Math.floor(Math.random() * 999),
      date: todayISO(),
      type: m.type || guessMealType(),
      name: m.name, emoji: m.emoji || '🍽️',
      cal: round(m.cal), p: round(m.p), c: round(m.c), f: round(m.f),
      photo: m.photo || null,
    });
    save(); renderAll();
  }
  function deleteMeal(id) {
    state.meals = state.meals.filter(m => m.id !== id);
    save(); renderAll();
  }
  const mealsOn = iso => state.meals.filter(m => m.date === iso);
  const totals = list => list.reduce((t, m) => ({
    cal: t.cal + m.cal, p: t.p + m.p, c: t.c + m.c, f: t.f + m.f
  }), { cal: 0, p: 0, c: 0, f: 0 });

  // ---------- rendering ----------
  function renderAll() { renderHome(); renderDiary(); renderWeight(); renderSetup(); }

  function renderHome() {
    $('#home-date').textContent = new Date().toLocaleDateString(undefined,
      { weekday: 'long', month: 'short', day: 'numeric' });

    const p = state.profile;
    const today = mealsOn(todayISO());
    const t = totals(today);

    // favorites
    $('#favs').innerHTML = FAVORITES.map((f, i) =>
      `<button class="fav" data-fav="${i}">${f.emoji} ${f.name} <small>${f.cal}</small></button>`).join('');

    // stats
    const left = p ? p.budget - t.cal : 0;
    $('#stat-left').textContent = p ? fmt(left) : '—';
    $('#stat-protein').textContent = `${fmt(t.p)}${p ? '/' + p.proteinGoal : ''}g`;
    const lastW = state.weights.at(-1);
    $('#stat-weight').textContent = lastW ? lastW.weight + ' lb' : (p ? p.weight + ' lb' : '—');

    // summary nudge
    const s = $('#summary');
    if (!p) { s.textContent = "Let's set up your plan."; }
    else if (left < 0) {
      s.className = 'summary warn';
      s.textContent = `Over by ${fmt(-left)} cals today. Tomorrow's a fresh start.`;
    } else {
      s.className = 'summary';
      const proteinGap = p.proteinGoal - t.p;
      const tail = proteinGap > 5 ? `, +${round(proteinGap)}g protein to goal` : ` — protein on track 💪`;
      s.textContent = today.length === 0
        ? `${fmt(left)} cals to play with today. Snap your first meal.`
        : `On track — ${fmt(left)} cals left${tail}`;
    }

    // today's meals
    $('#today-total').textContent = today.length ? `${fmt(t.cal)} cal · ${fmt(t.p)}g protein` : '';
    $('#today-meals').innerHTML = today.length
      ? today.map(mealRow).join('')
      : `<div class="empty">No meals yet. Tap “Snap a meal” to start.</div>`;
  }

  function mealRow(m) {
    const thumb = m.photo
      ? `<div class="thumb" style="background-image:url('${m.photo}')"></div>`
      : `<div class="thumb">${m.emoji}</div>`;
    return `<div class="meal">
      ${thumb}
      <div class="m-main">
        <div class="m-name">${m.name}</div>
        <div class="m-sub">${m.type} · ${m.p}p / ${m.c}c / ${m.f}f</div>
      </div>
      <div class="m-cal">${fmt(m.cal)}</div>
      <button class="m-del" data-del="${m.id}" title="Remove">×</button>
    </div>`;
  }

  function renderDiary() {
    const byDay = {};
    state.meals.forEach(m => (byDay[m.date] = byDay[m.date] || []).push(m));
    const days = Object.keys(byDay).sort().reverse();
    $('#diary-body').innerHTML = days.length ? days.map(d => {
      const t = totals(byDay[d]);
      return `<div class="day-group">
        <div class="day-head"><span>${prettyDate(d)}</span>
          <small>${fmt(t.cal)} cal · ${fmt(t.p)}g protein</small></div>
        <div class="meal-list">${byDay[d].map(mealRow).join('')}</div>
      </div>`;
    }).join('') : `<div class="empty">Your logged meals will show up here.</div>`;
  }

  function renderWeight() {
    const p = state.profile;
    const w = state.weights;
    const cur = w.at(-1)?.weight ?? p?.weight;
    $('#w-current').textContent = cur ? cur + ' lb' : '—';
    $('#w-goal').textContent = p ? p.goal + ' lb' : '—';
    $('#w-togo').textContent = (cur && p) ? Math.max(0, round(cur - p.goal)) + ' lb' : '—';
    $('#weight-list').innerHTML = w.length
      ? [...w].reverse().map(x =>
          `<div class="meal"><div class="thumb">⚖️</div>
           <div class="m-main"><div class="m-name">${x.weight} lb</div>
           <div class="m-sub">${prettyDate(x.date)}</div></div></div>`).join('')
      : `<div class="empty">Log your weight to see your trend.</div>`;
    drawChart();
  }

  function drawChart() {
    const svg = $('#weight-chart');
    const p = state.profile;
    const pts = state.weights.slice();
    if (p && pts.length === 0) pts.push({ date: todayISO(), weight: p.weight });
    if (pts.length === 0) { svg.innerHTML = ''; return; }

    const W = 320, H = 160, pad = 16;
    const goal = p ? p.goal : Math.min(...pts.map(x => x.weight));
    const vals = pts.map(x => x.weight).concat(goal);
    const min = Math.min(...vals) - 2, max = Math.max(...vals) + 2;
    const x = i => pad + (pts.length === 1 ? (W - 2 * pad) / 2 : i * (W - 2 * pad) / (pts.length - 1));
    const y = v => H - pad - ((v - min) / (max - min || 1)) * (H - 2 * pad);

    const line = pts.map((pt, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(pt.weight).toFixed(1)}`).join(' ');
    const area = `${line} L${x(pts.length - 1).toFixed(1)},${H - pad} L${x(0).toFixed(1)},${H - pad} Z`;
    const gY = y(goal).toFixed(1);
    const dots = pts.map((pt, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(pt.weight).toFixed(1)}" r="3.5" fill="#34d399"/>`).join('');

    svg.innerHTML = `
      <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#34d399" stop-opacity=".25"/>
        <stop offset="1" stop-color="#34d399" stop-opacity="0"/>
      </linearGradient></defs>
      <line x1="${pad}" y1="${gY}" x2="${W - pad}" y2="${gY}" stroke="#3a4250" stroke-dasharray="4 4"/>
      <text x="${W - pad}" y="${(+gY - 5)}" fill="#7b8494" font-size="10" text-anchor="end">goal ${goal}</text>
      <path d="${area}" fill="url(#g)"/>
      <path d="${line}" fill="none" stroke="#34d399" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
      ${dots}`;
  }

  function renderSetup() {
    const p = state.profile;
    if (!p) { $('#plan-card').innerHTML = ''; return; }
    const plan = computePlan(p);
    $('#plan-card').innerHTML = `
      <div class="plan-big"><span class="muted tiny">DAILY CALORIE BUDGET</span><b>${fmt(p.budget)}</b></div>
      <div class="plan-row"><span>Maintenance (TDEE)</span><b>${fmt(plan.tdee)} cal</b></div>
      <div class="plan-row"><span>Protein goal</span><b>${p.proteinGoal} g</b></div>
      <div class="plan-row"><span>Current → goal</span><b>${p.weight} → ${p.goal} lb</b></div>
      <div class="plan-row"><span>Target date</span><b>${prettyDate(p.target)}</b></div>`;
  }

  // ---------- navigation ----------
  function show(view) {
    $$('.view').forEach(v => (v.hidden = v.id !== 'view-' + view));
    $$('.tab').forEach(t => t.classList.toggle('active', t.dataset.view === view));
    window.scrollTo(0, 0);
  }

  // ---------- snap flow ----------
  let pending = null; // { base food, photo }
  function openSnap(photoURL) {
    $('#snap-modal').hidden = false;
    $('#snap-confirm').hidden = true;
    $('#snap-analyzing').hidden = false;
    const ph = photoURL ? `style="background-image:url('${photoURL}')"` : '';
    $('#photo-preview').outerHTML = `<div class="photo-preview" id="photo-preview" ${ph}>${photoURL ? '' : '📷'}</div>`;

    analyzePhoto().then(food => {
      pending = { food, photo: photoURL, portion: 1, type: guessMealType() };
      showConfirm();
    });
  }

  function showConfirm() {
    $('#snap-analyzing').hidden = true;
    $('#snap-confirm').hidden = false;
    const ph = pending.photo ? `style="background-image:url('${pending.photo}')"` : '';
    $('#photo-preview-2').outerHTML = `<div class="photo-preview" id="photo-preview-2" ${ph}>${pending.photo ? '' : pending.food.emoji}</div>`;
    $('#result-name').textContent = pending.food.name;
    $('#portion').value = 1;
    $('#portion-x').textContent = '1.0×';
    $$('#meal-type button').forEach(b => b.classList.toggle('active', b.dataset.val === pending.type));
    paintMacros();
  }

  function paintMacros() {
    const f = pending.food, k = pending.portion;
    $('#result-cal').textContent = fmt(f.cal * k);
    $('#result-macros').innerHTML = `
      <div class="m"><b>${round(f.p * k)}g</b><small>Protein</small></div>
      <div class="m"><b>${round(f.c * k)}g</b><small>Carbs</small></div>
      <div class="m"><b>${round(f.f * k)}g</b><small>Fat</small></div>`;
  }

  function closeSnap() { $('#snap-modal').hidden = true; pending = null; }

  // ---------- onboarding ----------
  function openOnboarding(prefill) {
    const o = $('#onboarding');
    o.hidden = false;
    const p = prefill || state.profile;
    if (p) {
      $$('#ob-sex button').forEach(b => b.classList.toggle('active', b.dataset.val === p.sex));
      $('#ob-age').value = p.age;
      $('#ob-activity').value = p.activity;
      $('#ob-ft').value = Math.floor(p.heightIn / 12);
      $('#ob-in').value = p.heightIn % 12;
      $('#ob-weight').value = p.weight;
      $('#ob-goal').value = p.goal;
      $('#ob-target').value = p.target;
    }
    if (!$('#ob-target').value) {
      const d = new Date(); d.setDate(d.getDate() + 84); // ~12 weeks out
      $('#ob-target').value = d.toISOString().slice(0, 10);
    }
  }

  function submitOnboarding() {
    const sex = $('#ob-sex .active')?.dataset.val || 'male';
    const profile = {
      sex,
      age: +$('#ob-age').value || 35,
      activity: +$('#ob-activity').value,
      heightIn: (+$('#ob-ft').value || 5) * 12 + (+$('#ob-in').value || 0),
      weight: +$('#ob-weight').value || 190,
      goal: +$('#ob-goal').value || 175,
      target: $('#ob-target').value,
    };
    const plan = computePlan(profile);
    profile.budget = plan.budget;
    profile.proteinGoal = plan.proteinGoal;
    state.profile = profile;
    save();
    $('#onboarding').hidden = true;
    show('home');
    renderAll();
  }

  // ---------- events ----------
  function wire() {
    // tabs
    $$('.tab').forEach(t => t.addEventListener('click', () => show(t.dataset.view)));
    $('#go-setup').addEventListener('click', () => show('setup'));

    // snap
    $('#snap-btn').addEventListener('click', () => $('#file-input').click());
    $('#file-input').addEventListener('change', e => {
      const file = e.target.files[0];
      e.target.value = '';
      if (file) {
        const r = new FileReader();
        r.onload = ev => openSnap(ev.target.result);
        r.readAsDataURL(file);
      } else {
        openSnap(null);
      }
    });
    $('#portion').addEventListener('input', e => {
      pending.portion = +e.target.value;
      $('#portion-x').textContent = (+e.target.value).toFixed(1) + '×';
      paintMacros();
    });
    $('#meal-type').addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      pending.type = b.dataset.val;
      $$('#meal-type button').forEach(x => x.classList.toggle('active', x === b));
    });
    $('#snap-save').addEventListener('click', () => {
      const f = pending.food, k = pending.portion;
      addMeal({ name: f.name, emoji: f.emoji, type: pending.type, photo: pending.photo,
                cal: f.cal * k, p: f.p * k, c: f.c * k, f: f.f * k });
      closeSnap();
    });
    $('#snap-cancel').addEventListener('click', closeSnap);

    // favorites (one-tap)
    $('#favs').addEventListener('click', e => {
      const b = e.target.closest('[data-fav]'); if (!b) return;
      const f = FAVORITES[+b.dataset.fav];
      addMeal({ ...f });
      b.animate([{ transform: 'scale(1)' }, { transform: 'scale(.9)' }, { transform: 'scale(1)' }], { duration: 180 });
    });

    // delete meal (event delegation across lists)
    document.body.addEventListener('click', e => {
      const d = e.target.closest('[data-del]'); if (d) deleteMeal(d.dataset.del);
    });

    // weight
    $('#w-log').addEventListener('click', () => {
      const v = +$('#w-input').value;
      if (!v) return;
      const i = state.weights.findIndex(x => x.date === todayISO());
      if (i >= 0) state.weights[i].weight = v;
      else state.weights.push({ date: todayISO(), weight: v });
      $('#w-input').value = '';
      save(); renderAll();
    });

    // onboarding / setup
    $('#ob-sex').addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      $$('#ob-sex button').forEach(x => x.classList.toggle('active', x === b));
    });
    $('#ob-submit').addEventListener('click', submitOnboarding);
    $('#edit-plan').addEventListener('click', () => openOnboarding());
    $('#reset-all').addEventListener('click', () => {
      if (confirm('Erase all your data and start over?')) {
        localStorage.removeItem(KEY);
        state = load();
        openOnboarding();
        renderAll();
      }
    });
  }

  // ---------- boot ----------
  wire();
  renderAll();
  show('home');
  if (!state.profile) openOnboarding();
})();
