/* ============================================================
   MyFattyPal — a MyFitnessPal-style tracker tuned for BULKING.
   Vanilla JS, no build step. Data lives in localStorage.
   Photo recognition is SIMULATED (canned results), isolated in
   analyzePhoto() so a real Claude vision call can drop in later.
   ============================================================ */

(() => {
  'use strict';

  // ---------- storage ----------
  const KEY = 'myfattypal.v1';
  const blank = { profile: null, meals: [], exercises: [], weights: [] };
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
  let viewDate = todayISO();

  function prettyDate(iso) {
    const d = new Date(iso + 'T00:00:00'), t = new Date(todayISO() + 'T00:00:00');
    const diff = Math.round((t - d) / 86400000);
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    if (diff === -1) return 'Tomorrow';
    return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  }

  // ---------- nutrition math (BULKING = surplus) ----------
  function computePlan(p) {
    const kg = p.weight / 2.2046226, cm = p.heightIn * 2.54;
    const bmr = 10 * kg + 6.25 * cm - 5 * p.age + (p.sex === 'male' ? 5 : -161);
    const tdee = bmr * p.activity;

    const lbsToGain = Math.max(0, p.goal - p.weight);
    const days = Math.max(1, Math.round((new Date(p.target) - new Date(todayISO())) / 86400000));
    let surplus = (lbsToGain * 3500) / days;     // 3500 kcal ≈ 1 lb
    surplus = Math.min(Math.max(surplus, 0), 600); // safe lean-bulk cap (~1.2 lb/wk)
    const budget = Math.round(tdee + surplus);

    const proteinGoal = round(p.weight * 1.0);            // 1 g per lb bodyweight for gains
    const fatGoal = round((budget * 0.25) / 9);           // 25% of calories from fat
    const carbGoal = Math.max(0, round((budget - proteinGoal * 4 - fatGoal * 9) / 4));
    return { tdee: round(tdee), budget, proteinGoal, fatGoal, carbGoal, lbsToGain, days, surplus: round(surplus) };
  }

  // ---------- simulated photo recognition ----------
  // Swap this body for a real Claude vision API call later.
  const FOOD_DB = [
    { name: 'Chicken, rice & broccoli', emoji: '🍗', cal: 650, p: 52, c: 70, f: 14 },
    { name: 'Peanut butter bagel',      emoji: '🥯', cal: 480, p: 16, c: 60, f: 20 },
    { name: 'Mass-gainer shake',        emoji: '🥤', cal: 720, p: 50, c: 95, f: 12 },
    { name: 'Steak & potatoes',         emoji: '🥩', cal: 820, p: 56, c: 55, f: 38 },
    { name: 'Salmon & rice',            emoji: '🐟', cal: 600, p: 42, c: 55, f: 22 },
    { name: 'Burrito bowl',             emoji: '🌯', cal: 740, p: 40, c: 82, f: 28 },
    { name: 'Eggs, toast & avocado',    emoji: '🍳', cal: 520, p: 26, c: 38, f: 30 },
    { name: 'Greek yogurt & granola',   emoji: '🫐', cal: 420, p: 24, c: 54, f: 12 },
    { name: 'Pasta bolognese',          emoji: '🍝', cal: 760, p: 34, c: 96, f: 24 },
    { name: 'Double cheeseburger',      emoji: '🍔', cal: 850, p: 46, c: 48, f: 50 },
    { name: 'Oatmeal, banana & PB',     emoji: '🥣', cal: 540, p: 18, c: 78, f: 18 },
    { name: 'Trail mix (cup)',          emoji: '🥜', cal: 360, p: 10, c: 32, f: 24 },
  ];
  function analyzePhoto() {
    return new Promise(res => {
      const pick = FOOD_DB[Math.floor(Math.random() * FOOD_DB.length)];
      setTimeout(() => res({ ...pick }), 1400);
    });
  }

  const FAVORITES = [
    { name: 'Mass-gainer shake', emoji: '🥤', cal: 720, p: 50, c: 95, f: 12 },
    { name: 'Whole milk (16oz)', emoji: '🥛', cal: 300, p: 16, c: 24, f: 16 },
    { name: 'Peanut butter (2T)', emoji: '🥜', cal: 190, p: 8, c: 6, f: 16 },
    { name: 'Chicken breast (8oz)', emoji: '🍗', cal: 374, p: 70, c: 0, f: 8 },
    { name: 'White rice (cup)', emoji: '🍚', cal: 205, p: 4, c: 45, f: 0 },
    { name: 'Banana', emoji: '🍌', cal: 105, p: 1, c: 27, f: 0 },
  ];
  const EXERCISES = [
    { name: 'Weightlifting', cal: 250 }, { name: 'Running', cal: 360 },
    { name: 'Walking', cal: 150 }, { name: 'Cycling', cal: 300 }, { name: 'Swimming', cal: 400 },
  ];

  function guessMeal() {
    const h = new Date().getHours();
    if (h < 11) return 'Breakfast';
    if (h < 16) return 'Lunch';
    if (h < 21) return 'Dinner';
    return 'Snacks';
  }

  // ---------- data ops ----------
  function addEntry(food, meal, portion = 1, photo = null) {
    state.meals.push({
      id: Date.now() + '' + Math.floor(Math.random() * 999), date: viewDate,
      meal, name: food.name, emoji: food.emoji || '🍽️',
      cal: round(food.cal * portion), p: round(food.p * portion),
      c: round(food.c * portion), f: round(food.f * portion), photo,
    });
    save(); renderAll();
  }
  function addExercise(name, cal) {
    state.exercises.push({ id: Date.now() + '' + Math.floor(Math.random() * 999), date: viewDate, name, cal: round(cal) });
    save(); renderAll();
  }
  function delMeal(id) { state.meals = state.meals.filter(m => m.id !== id); save(); renderAll(); }
  function delEx(id) { state.exercises = state.exercises.filter(x => x.id !== id); save(); renderAll(); }

  const mealsOn = d => state.meals.filter(m => m.date === d);
  const exOn = d => state.exercises.filter(x => x.date === d);
  const sumMeals = list => list.reduce((t, m) => ({ cal: t.cal + m.cal, p: t.p + m.p, c: t.c + m.c, f: t.f + m.f }), { cal: 0, p: 0, c: 0, f: 0 });
  const sumEx = list => list.reduce((t, x) => t + x.cal, 0);

  // ---------- ring widget ----------
  function ring(pct, color, size, sw) {
    const r = (size - sw) / 2, c = 2 * Math.PI * r, off = c * (1 - Math.max(0, Math.min(pct, 1)));
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="ring-svg">
      <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="var(--track)" stroke-width="${sw}"/>
      <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${color}" stroke-width="${sw}"
        stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}" stroke-linecap="round"
        transform="rotate(-90 ${size / 2} ${size / 2})"/></svg>`;
  }
  function ringWidget(pct, color, size, sw, center) {
    return `<div class="ring-wrap" style="width:${size}px;height:${size}px">${ring(pct, color, size, sw)}
      <div class="ring-center">${center}</div></div>`;
  }

  // ---------- rendering ----------
  function renderAll() { renderDashboard(); renderDiary(); renderProgress(); renderMore(); }

  function dayTotals(d) {
    const t = sumMeals(mealsOn(d)), ex = sumEx(exOn(d));
    const budget = state.profile ? state.profile.budget : 0;
    return { ...t, ex, budget, remaining: budget - t.cal + ex };
  }

  function renderDashboard() {
    const p = state.profile; if (!p) return;
    $('#dash-date').textContent = prettyDate(viewDate);
    const t = dayTotals(viewDate);

    $('#cal-ring').innerHTML = ringWidget(
      t.cal / p.budget, 'var(--blue)', 130, 12,
      `<span class="rc-num">${fmt(t.remaining)}</span><span class="rc-lbl">Remaining</span>`);
    $('#s-goal').textContent = fmt(p.budget);
    $('#s-food').textContent = fmt(t.cal);
    $('#s-ex').textContent = fmt(t.ex);

    const macros = [
      { lbl: 'Carbs', val: t.c, goal: p.carbGoal, color: 'var(--carb)' },
      { lbl: 'Fat', val: t.f, goal: p.fatGoal, color: 'var(--fat)' },
      { lbl: 'Protein', val: t.p, goal: p.proteinGoal, color: 'var(--protein)' },
    ];
    $('#macro-card').innerHTML = `<div class="card-title">Macros</div><div class="macros" style="margin-top:12px">` +
      macros.map(m => `<div class="macro">${ringWidget(m.val / (m.goal || 1), m.color, 74, 8,
        `<span class="rc-num">${m.val}</span>`)}
        <div class="m-lbl">${m.lbl}</div>
        <div class="m-left">${Math.max(0, m.goal - m.val)}g left</div></div>`).join('') + `</div>`;

    const n = $('#dash-nudge');
    const proteinGap = p.proteinGoal - t.p;
    if (t.remaining > 30) {
      n.className = 'nudge';
      const tail = proteinGap > 5 ? ` · +${proteinGap}g protein for gains` : '';
      n.textContent = t.cal === 0
        ? `Time to eat big — ${fmt(t.remaining)} calories to hit your surplus 💪`
        : `Eat ${fmt(t.remaining)} more to hit your bulk${tail}`;
    } else {
      n.className = 'nudge done';
      n.textContent = `Surplus smashed — great day for gains! 🍗`;
    }
  }

  function foodRow(m) {
    const thumb = m.photo ? `<div class="fr-emoji" style="background-image:url('${m.photo}')"></div>`
      : `<div class="fr-emoji">${m.emoji}</div>`;
    return `<div class="food-row">${thumb}
      <div class="fr-main"><div class="fr-name">${m.name}</div>
      <div class="fr-sub">${m.p}p · ${m.c}c · ${m.f}f</div></div>
      <div class="fr-cal">${fmt(m.cal)}</div>
      <button class="fr-del" data-del="${m.id}">×</button></div>`;
  }

  function renderDiary() {
    if (!state.profile) return;
    $('#diary-date').textContent = prettyDate(viewDate);
    const meals = mealsOn(viewDate);
    const sections = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];
    $('#diary-meals').innerHTML = sections.map(sec => {
      const items = meals.filter(m => m.meal === sec);
      const cals = items.reduce((a, m) => a + m.cal, 0);
      return `<div class="card meal-sec">
        <div class="meal-head"><span>${sec}</span><span class="mh-cal">${fmt(cals)}</span></div>
        <div class="foods">${items.map(foodRow).join('')}</div>
        <button class="add-food" data-meal="${sec}">ADD FOOD</button></div>`;
    }).join('');

    const ex = exOn(viewDate);
    $('#diary-exercise').innerHTML = `
      <div class="meal-head"><span>Exercise</span><span class="mh-cal">${fmt(sumEx(ex))}</span></div>
      <div class="foods">${ex.map(x => `<div class="food-row"><div class="fr-emoji">🔥</div>
        <div class="fr-main"><div class="fr-name">${x.name}</div><div class="fr-sub">burned</div></div>
        <div class="fr-cal">${fmt(x.cal)}</div><button class="fr-del" data-delex="${x.id}">×</button></div>`).join('')}</div>
      <button class="add-food" id="open-ex">ADD EXERCISE</button>`;

    const t = dayTotals(viewDate);
    $('#diary-totals').innerHTML = `
      <div class="t-row"><span>Base Goal</span><span>${fmt(t.budget)}</span></div>
      <div class="t-row"><span>Food</span><span>− ${fmt(t.cal)}</span></div>
      <div class="t-row"><span>Exercise</span><span>+ ${fmt(t.ex)}</span></div>
      <div class="t-row rem"><span>Remaining</span><b>${fmt(t.remaining)}</b></div>`;
  }

  function renderProgress() {
    const p = state.profile; if (!p) return;
    const w = state.weights;
    const cur = w.at(-1)?.weight ?? p.weight;
    $('#w-current').textContent = cur + ' lb';
    $('#w-goal').textContent = p.goal + ' lb';
    $('#w-togo').textContent = Math.max(0, round(p.goal - cur)) + ' lb';
    $('#weight-list').innerHTML = w.length
      ? [...w].reverse().map(x => `<div class="wrow"><div class="fr-emoji">⚖️</div>
        <div class="fr-main"><div class="fr-name">${x.weight} lb</div>
        <div class="fr-sub">${prettyDate(x.date)}</div></div></div>`).join('')
      : `<p class="muted center" style="padding:12px">Log your weight to see your trend.</p>`;
    drawChart();
  }

  function drawChart() {
    const svg = $('#weight-chart'), p = state.profile;
    const pts = state.weights.slice();
    if (p && pts.length === 0) pts.push({ date: todayISO(), weight: p.weight });
    if (!pts.length) { svg.innerHTML = ''; return; }
    const W = 320, H = 160, pad = 18;
    const goal = p ? p.goal : Math.max(...pts.map(x => x.weight));
    const vals = pts.map(x => x.weight).concat(goal);
    const min = Math.min(...vals) - 2, max = Math.max(...vals) + 2;
    const x = i => pad + (pts.length === 1 ? (W - 2 * pad) / 2 : i * (W - 2 * pad) / (pts.length - 1));
    const y = v => H - pad - ((v - min) / (max - min || 1)) * (H - 2 * pad);
    const line = pts.map((pt, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(pt.weight).toFixed(1)}`).join(' ');
    const area = `${line} L${x(pts.length - 1).toFixed(1)},${H - pad} L${x(0).toFixed(1)},${H - pad} Z`;
    const gY = y(goal).toFixed(1);
    const dots = pts.map((pt, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(pt.weight).toFixed(1)}" r="3.5" fill="#1875ff"/>`).join('');
    svg.innerHTML = `<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1875ff" stop-opacity=".22"/><stop offset="1" stop-color="#1875ff" stop-opacity="0"/>
      </linearGradient></defs>
      <line x1="${pad}" y1="${gY}" x2="${W - pad}" y2="${gY}" stroke="#c7d2e0" stroke-dasharray="4 4"/>
      <text x="${W - pad}" y="${(+gY - 5)}" fill="#8b95a3" font-size="10" text-anchor="end">goal ${goal}</text>
      <path d="${area}" fill="url(#g)"/>
      <path d="${line}" fill="none" stroke="#1875ff" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>${dots}`;
  }

  function renderMore() {
    const p = state.profile; if (!p) { $('#plan-card').innerHTML = ''; return; }
    const plan = computePlan(p);
    $('#plan-card').innerHTML = `
      <div class="plan-big"><span>DAILY CALORIE GOAL (BULK)</span><b>${fmt(p.budget)}</b></div>
      <div class="plan-row"><span>Maintenance (TDEE)</span><b>${fmt(plan.tdee)} cal</b></div>
      <div class="plan-row"><span>Daily surplus</span><b>+${fmt(plan.surplus)} cal</b></div>
      <div class="plan-row"><span>Protein / Carbs / Fat</span><b>${p.proteinGoal} / ${p.carbGoal} / ${p.fatGoal} g</b></div>
      <div class="plan-row"><span>Current → goal</span><b>${p.weight} → ${p.goal} lb</b></div>
      <div class="plan-row"><span>Target date</span><b>${prettyDate(p.target)}</b></div>`;
  }

  // ---------- navigation ----------
  function show(view) {
    $$('.view').forEach(v => (v.hidden = v.id !== 'view-' + view));
    $$('.tab[data-view]').forEach(t => t.classList.toggle('active', t.dataset.view === view));
    window.scrollTo(0, 0);
  }
  function shiftDay(n) {
    const d = new Date(viewDate + 'T00:00:00'); d.setDate(d.getDate() + n);
    viewDate = d.toISOString().slice(0, 10); renderAll();
  }

  // ---------- add-food modal ----------
  let curMeal = 'Breakfast';
  function openAdd(meal) {
    curMeal = meal || guessMeal();
    $('#add-modal').hidden = false;
    $$('#add-meal button').forEach(b => b.classList.toggle('active', b.dataset.val === curMeal));
    $('#food-search').value = '';
    renderFoodList('');
  }
  function renderFoodList(q) {
    const all = [...FAVORITES, ...FOOD_DB];
    const seen = new Set(), list = [];
    all.forEach(f => { if (!seen.has(f.name)) { seen.add(f.name); list.push(f); } });
    const filtered = list.filter(f => f.name.toLowerCase().includes(q.toLowerCase()));
    $('#food-list').innerHTML = filtered.map((f, i) => `<div class="fl-row">
      <div class="fr-emoji">${f.emoji}</div>
      <div class="fr-main"><div class="fr-name">${f.name}</div><div class="fr-sub">${f.cal} cal · ${f.p}p ${f.c}c ${f.f}f</div></div>
      <button class="fl-add" data-add="${list.indexOf(f)}">＋</button></div>`).join('')
      || `<p class="muted center" style="padding:18px">No matches.</p>`;
    // stash for click handler
    $('#food-list').dataset.src = JSON.stringify(list);
  }

  // ---------- snap flow ----------
  let pending = null;
  function openSnap(photoURL) {
    $('#add-modal').hidden = true;
    $('#snap-modal').hidden = false;
    $('#snap-confirm').hidden = true;
    $('#snap-analyzing').hidden = false;
    const ph = photoURL ? `style="background-image:url('${photoURL}')"` : '';
    $('#photo-preview').outerHTML = `<div class="photo-preview" id="photo-preview" ${ph}>${photoURL ? '' : '📷'}</div>`;
    analyzePhoto().then(food => { pending = { food, photo: photoURL, portion: 1 }; showConfirm(); });
  }
  function showConfirm() {
    $('#snap-analyzing').hidden = true;
    $('#snap-confirm').hidden = false;
    const ph = pending.photo ? `style="background-image:url('${pending.photo}')"` : '';
    $('#photo-preview-2').outerHTML = `<div class="photo-preview" id="photo-preview-2" ${ph}>${pending.photo ? '' : pending.food.emoji}</div>`;
    $('#result-name').textContent = pending.food.name;
    $('#portion').value = 1; $('#portion-x').textContent = '1.0×';
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

  // ---------- exercise modal ----------
  function openEx() {
    $('#ex-modal').hidden = false;
    $('#ex-list').innerHTML = EXERCISES.map((e, i) => `<div class="fl-row">
      <div class="fr-emoji">🔥</div><div class="fr-main"><div class="fr-name">${e.name}</div>
      <div class="fr-sub">${e.cal} cal burned</div></div>
      <button class="fl-add" data-ex="${i}">＋</button></div>`).join('');
    $('#ex-name').value = ''; $('#ex-cal').value = '';
  }

  // ---------- onboarding ----------
  function openOnboarding() {
    const o = $('#onboarding'); o.hidden = false;
    const p = state.profile;
    if (p) {
      $$('#ob-sex button').forEach(b => b.classList.toggle('active', b.dataset.val === p.sex));
      $('#ob-age').value = p.age; $('#ob-activity').value = p.activity;
      $('#ob-ft').value = Math.floor(p.heightIn / 12); $('#ob-in').value = p.heightIn % 12;
      $('#ob-weight').value = p.weight; $('#ob-goal').value = p.goal; $('#ob-target').value = p.target;
    }
    if (!$('#ob-target').value) {
      const d = new Date(); d.setDate(d.getDate() + 84);
      $('#ob-target').value = d.toISOString().slice(0, 10);
    }
  }
  function submitOnboarding() {
    const profile = {
      sex: $('#ob-sex .active')?.dataset.val || 'male',
      age: +$('#ob-age').value || 28,
      activity: +$('#ob-activity').value,
      heightIn: (+$('#ob-ft').value || 5) * 12 + (+$('#ob-in').value || 0),
      weight: +$('#ob-weight').value || 160,
      goal: +$('#ob-goal').value || 180,
      target: $('#ob-target').value,
    };
    const plan = computePlan(profile);
    Object.assign(profile, { budget: plan.budget, proteinGoal: plan.proteinGoal, carbGoal: plan.carbGoal, fatGoal: plan.fatGoal });
    state.profile = profile; save();
    $('#onboarding').hidden = true; show('dashboard'); renderAll();
  }

  // ---------- events ----------
  function wire() {
    $$('.tab[data-view]').forEach(t => t.addEventListener('click', () => show(t.dataset.view)));
    $('#tab-add').addEventListener('click', () => openAdd());

    $('#dash-prev').addEventListener('click', () => shiftDay(-1));
    $('#dash-next').addEventListener('click', () => shiftDay(1));
    $('#diary-prev').addEventListener('click', () => shiftDay(-1));
    $('#diary-next').addEventListener('click', () => shiftDay(1));

    // open add-food from a diary meal section, and add-exercise
    $('#view-diary').addEventListener('click', e => {
      const a = e.target.closest('[data-meal]'); if (a) { openAdd(a.dataset.meal); return; }
      if (e.target.closest('#open-ex')) openEx();
    });

    // add-food modal
    $('#add-close').addEventListener('click', () => $('#add-modal').hidden = true);
    $('#add-meal').addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      curMeal = b.dataset.val;
      $$('#add-meal button').forEach(x => x.classList.toggle('active', x === b));
    });
    $('#food-search').addEventListener('input', e => renderFoodList(e.target.value));
    $('#food-list').addEventListener('click', e => {
      const btn = e.target.closest('[data-add]'); if (!btn) return;
      const list = JSON.parse($('#food-list').dataset.src || '[]');
      addEntry(list[+btn.dataset.add], curMeal, 1);
      btn.textContent = '✓'; btn.classList.add('added');
      setTimeout(() => { btn.textContent = '＋'; btn.classList.remove('added'); }, 900);
    });
    $('#snap-cta').addEventListener('click', () => $('#file-input').click());
    $('#file-input').addEventListener('change', e => {
      const file = e.target.files[0]; e.target.value = '';
      if (file) { const r = new FileReader(); r.onload = ev => openSnap(ev.target.result); r.readAsDataURL(file); }
      else openSnap(null);
    });

    // snap modal
    $('#portion').addEventListener('input', e => {
      pending.portion = +e.target.value; $('#portion-x').textContent = (+e.target.value).toFixed(1) + '×'; paintMacros();
    });
    $('#snap-save').addEventListener('click', () => {
      addEntry(pending.food, curMeal, pending.portion, pending.photo); closeSnap();
    });
    $('#snap-cancel').addEventListener('click', closeSnap);

    // exercise modal
    $('#ex-close').addEventListener('click', () => $('#ex-modal').hidden = true);
    $('#ex-list').addEventListener('click', e => {
      const b = e.target.closest('[data-ex]'); if (!b) return;
      const ex = EXERCISES[+b.dataset.ex]; addExercise(ex.name, ex.cal); $('#ex-modal').hidden = true;
    });
    $('#ex-add').addEventListener('click', () => {
      const name = $('#ex-name').value.trim() || 'Exercise', cal = +$('#ex-cal').value;
      if (!cal) return; addExercise(name, cal); $('#ex-modal').hidden = true;
    });

    // delete (delegated across whole app)
    document.body.addEventListener('click', e => {
      const d = e.target.closest('[data-del]'); if (d) return delMeal(d.dataset.del);
      const x = e.target.closest('[data-delex]'); if (x) return delEx(x.dataset.delex);
    });

    // progress
    $('#w-log').addEventListener('click', () => {
      const v = +$('#w-input').value; if (!v) return;
      const i = state.weights.findIndex(x => x.date === todayISO());
      if (i >= 0) state.weights[i].weight = v; else state.weights.push({ date: todayISO(), weight: v });
      $('#w-input').value = ''; save(); renderAll();
    });

    // onboarding / settings
    $('#ob-sex').addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      $$('#ob-sex button').forEach(x => x.classList.toggle('active', x === b));
    });
    $('#ob-submit').addEventListener('click', submitOnboarding);
    $('#edit-plan').addEventListener('click', openOnboarding);
    $('#reset-all').addEventListener('click', () => {
      if (confirm('Erase all your data and start over?')) {
        localStorage.removeItem(KEY); state = load(); viewDate = todayISO(); renderAll(); openOnboarding();
      }
    });
  }

  // ---------- boot ----------
  wire();
  show('dashboard');
  if (!state.profile) openOnboarding(); else renderAll();
})();
