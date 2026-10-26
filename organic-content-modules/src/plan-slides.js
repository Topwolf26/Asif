// Pages shared by Module 8 and the standalone 30-Day Post Plan.
const { ink: i, guide: g, esc } = require('./lib');
const plan = require('./plan');

const FUNNEL_INK = { TOFU: 'orange', MOFU: 'blue', BOFU: 'dkgreen' };
const DOW = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const arc = {
  type: 'board',
  title: 'The 30-Day Arc',
  guide:
    g.path('M90,620 L320,620 L320,500 L550,500 L550,380 L780,380 L780,260 L990,260') +
    g.line(60, 650, 60, 140) + g.arrowHead(60, 140, 'up'),
  ink:
    i.text(80, 120, 'TRUST', 'purple', 34) +
    i.text(205, 600, 'Week 1', 'black', 30, { anchor: 'middle' }) + i.text(205, 560, 'INTRODUCE', 'blue', 34, { anchor: 'middle' }) + i.text(205, 690, 'who you are', 'blue', 26, { anchor: 'middle' }) +
    i.text(435, 480, 'Week 2', 'black', 30, { anchor: 'middle' }) + i.text(435, 440, 'EDUCATE', 'orange', 34, { anchor: 'middle' }) + i.text(435, 570, 'myths, FAQs', 'orange', 26, { anchor: 'middle' }) +
    i.text(665, 360, 'Week 3', 'black', 30, { anchor: 'middle' }) + i.text(665, 320, 'PROVE', 'dkgreen', 34, { anchor: 'middle' }) + i.text(665, 450, 'stories, BTS', 'dkgreen', 26, { anchor: 'middle' }) +
    i.text(885, 240, 'Week 4', 'black', 30, { anchor: 'middle' }) + i.text(885, 200, 'CONVERT', 'red', 34, { anchor: 'middle' }) + i.text(885, 330, 'how to work', 'red', 26, { anchor: 'middle' }) + i.text(885, 358, 'with you', 'red', 26, { anchor: 'middle' }),
  notes: {
    say: [
      'Your first 30 days have a shape. Week one, introduce yourself: who you are and who you help.',
      'Week two, educate: myths, FAQs, rating advice. Week three, prove it: client stories and behind the scenes.',
      'Week four, convert: how to work with you, what it costs, what the first call looks like. Each week earns the right to the next one.',
    ],
    draw: ['Label each step and the TRUST arrow up the side.'],
  },
};


// ---------- the client-facing plan: everything printed, nothing to fill in but ticks

const FUNNEL = {
  TOFU: { name: 'Reach', color: '#F29A16' },
  MOFU: { name: 'Connect', color: '#1E63F0' },
  BOFU: { name: 'Convert', color: '#16A34A' },
};
const POST_TIME = { Tue: '7:30am', Thu: '7:30am', Sun: '7:00pm' };
const JOB = { plan: '#1B2ED0', post: '#16A34A', engage: '#F29A16', stories: '#A51CC9', log: '#3B3B3B', shoot: '#E5352B' };

// what to do on the days nobody posts
function dayJob(day) {
  if (day === 1) return { kind: 'plan', text: 'Kick-off: update your bio, schedule week 1 posts', mins: 30 };
  if (day === 29) return { kind: 'log', text: 'Day-30 review + book next shoot day', mins: 45 };
  const dow = DOW[(day - 1) % 7];
  return {
    MON: { kind: 'plan', text: "Review last week + schedule this week's 3 posts", mins: 30 },
    WED: { kind: 'stories', text: '2 behind-the-scenes stories', mins: 10 },
    FRI: { kind: 'log', text: 'Log numbers in the tracker', mins: 10 },
    SAT: { kind: 'engage', text: 'Rest. Reply to comments only', mins: 10 },
  }[dow];
}

const howItWorks = {
  type: 'page',
  title: 'How This Works',
  html: `<div class="steps">
    ${[
      ['Before day 1', 'Shoot day', 'Film all 13 posts in one half-day using the scripts on the post pages (Module 5). One day of filming = one month of content.'],
      ['Every Monday', 'Review + schedule', 'Claude reviews last week\'s numbers, then you schedule that week\'s 3 posts (Modules 6 and 7). Thirty minutes.'],
      ['Every day', 'Do the one job', 'The calendar gives every day one job. Most take 15 minutes. Tick it off when it\'s done.'],
      ['Day 29', 'Review + go again', 'Score your posts on the Day-30 grid, keep what worked, and book next month\'s shoot day.'],
    ]
      .map(([when, what, how], k) => `<div class="step"><div class="step-n">${k + 1}</div><div class="step-when">${when}</div><h4>${what}</h4><p>${how}</p></div>`)
      .join('')}
  </div>
  <div class="fine"><b>Client stories:</b> remove names and anything identifying, get the client's OK, and check your local conduct and advertising rules before posting results.</div>`,
};

const weeklySchedule = (() => {
  const T0 = 7, T1 = 20, top = 128, hh = 41, left = 140, cw = 120;
  const y = (t) => top + (t - T0) * hh;
  const blocks = [
    [0, 8.5, 0.5, 'plan', 'REVIEW + PLAN', "Claude reviews last week. Schedule this week's 3 posts"],
    [1, 7.5, 0.25, 'post', 'POST 7:30am', 'Goes live. Reply for 15 min'],
    [3, 7.5, 0.25, 'post', 'POST 7:30am', 'Goes live. Reply for 15 min'],
    [6, 19, 0.25, 'post', 'POST 7:00pm', 'Goes live. Reply for 15 min'],
    ...[0, 1, 2, 3, 4].map((d) => [d, 12.5, 0.25, 'engage', 'ENGAGE', 'Replies + comment on 5 local accounts']),
    [2, 15, 0.25, 'stories', 'STORIES', '2 behind-the-scenes stories'],
    [4, 16, 0.17, 'log', 'LOG', 'Numbers into the tracker'],
  ];
  const fmt = (t) => `${((Math.floor(t) + 11) % 12) + 1}${t >= 12 ? 'pm' : 'am'}`;
  const html =
    `<div class="cal-frame"></div>` +
    DOW.map((d, c) => `<div class="wk-day" style="left:${left + c * cw}px;width:${cw}px">${d}</div>`).join('') +
    Array.from({ length: T1 - T0 + 1 }, (_, k) => `<div class="wk-hour" style="top:${y(T0 + k) - 7}px">${fmt(T0 + k)}</div><div class="wk-line" style="top:${y(T0 + k)}px;left:${left}px;width:${cw * 7}px"></div>`).join('') +
    DOW.map((_, c) => `<div class="wk-vline" style="left:${left + c * cw}px;top:${top - 30}px;height:${y(T1) - top + 30}px"></div>`).join('') +
    blocks
      .map(([d, t, len, kind, label, sub]) => `<div class="wk-ev" style="left:${left + d * cw + 3}px;top:${y(t) + 1}px;width:${cw - 6}px;min-height:${Math.max(len * hh, 34)}px;background:${JOB[kind]}"><b>${label}</b><span>${esc(sub)}</span></div>`)
      .join('') +
    `<div class="wk-note"><b>About 3 hours a week.</b> Put these blocks in your calendar as recurring events now, the same way you'd block a client meeting. Once a month, add a half-day shoot.</div>`;
  return { type: 'page', title: 'Your Weekly Content Schedule', html };
})();

const monthCalendar = (() => {
  const left = 74, top = 112, cw = 130, ch = 116;
  const byDay = Object.fromEntries(plan.map((p, k) => [p.day, { ...p, n: k + 1 }]));
  const cells = Array.from({ length: 30 }, (_, k) => {
    const day = k + 1;
    const x = left + (k % 7) * cw;
    const y = top + Math.floor(k / 7) * ch;
    const p = byDay[day];
    let body;
    if (p) {
      const f = FUNNEL[p.funnel];
      body = `<div class="mc-chip" style="background:${f.color}">POST ${p.n} · ${POST_TIME[p.dow]}</div><div class="mc-title">${esc(p.short)}</div><div class="mc-sub" style="color:${f.color}">${p.funnel} · ${f.name}</div>`;
    } else {
      const j = dayJob(day);
      body = `<div class="mc-job" style="border-color:${JOB[j.kind]}">${esc(j.text)}</div><div class="mc-sub">${j.mins} min</div>`;
    }
    return `<div class="mc-cell${p ? ' is-post' : ''}" style="left:${x}px;top:${y}px;width:${cw}px;height:${ch}px"><div class="mc-day">${day}</div><span class="mc-box"></span>${body}</div>`;
  }).join('');
  const heads = DOW.map((d, c) => `<div class="mc-head" style="left:${left + c * cw}px;width:${cw}px">${d}</div>`).join('');
  const legend = `<div class="mc-legend">${Object.entries(FUNNEL)
    .map(([k, f]) => `<span><i style="background:${f.color}"></i>${k} · ${f.name}</span>`)
    .join('')}<span class="mc-every"><b>Every day:</b> 15 min replying + comment on 5 local accounts</span></div>`;
  return { type: 'page', title: 'Your 30 Days', tag: { label: '13 posts · Tue / Thu / Sun', color: '#1B2ED0' }, html: heads + cells + legend };
})();

const postPage = (p, n) => {
  const f = FUNNEL[p.funnel];
  const ex = p.example;
  return {
    type: 'page',
    title: `Post ${n}: ${p.topic}`,
    small: true,
    tag: { label: `${p.funnel} · ${f.name}`, color: f.color },
    html: `<div class="pp-main">
      <div class="pp-meta"><span>Day ${p.day} · ${p.dow} · ${POST_TIME[p.dow]}</span><span>${esc(p.format)} · ${esc(p.length)}</span><span>Structure: ${esc(p.structure)}</span></div>
      <div class="pp-sec"><div class="pp-h">1 · Say this first</div><div class="pp-hook">"${esc(p.hook)}"</div></div>
      <div class="pp-sec"><div class="pp-h">2 · Then cover</div><ol>${p.beats.map((b) => `<li>${esc(b)}</li>`).join('')}</ol></div>
      <div class="pp-sec"><div class="pp-h">3 · End with</div><div class="pp-cta">${esc(p.cta)}</div></div>
      <div class="pp-two">
        <div><div class="pp-h">On-screen text</div><div class="pp-box">${esc(p.onscreen)}</div></div>
        <div><div class="pp-h">Caption</div><div class="pp-box mono">${esc(p.caption)}</div></div>
      </div>
    </div>
    <div class="pp-side">
      <div class="pp-card"><div class="pp-h">Make it yours</div><p><b>Law:</b> ${esc(p.law)}</p><p><b>Finance:</b> ${esc(p.finance)}</p></div>
      ${ex ? `<div class="pp-card ex"><div class="pp-h">Seen it work</div><div class="ex-views">${esc(ex.views)}</div><div class="ex-who">${esc(ex.who)} · ${esc(ex.platform)}</div><p>${esc(ex.hook)}</p><a class="ex-url" href="https://www.${esc(ex.url)}">Watch it before you film yours: ${esc(ex.url)}</a></div>` : ''}
      <div class="pp-ticks">${['Scripted', 'Filmed', 'Edited', 'Scheduled'].map((t) => `<span><i></i>${t}</span>`).join('')}</div>
    </div>`,
  };
};

const reviewPrinted = {
  type: 'page',
  title: 'Day 30 Review',
  minutes: 30,
  html: `<div class="rv">
    <div class="rv-y">More enquiries ↑</div><div class="rv-x">More views →</div>
    ${[
      ['Better hook', 'Few views, but enquiries came in. Great topic. Re-film it with a stronger first line.', '#1E63F0'],
      ['Double down', 'Views and enquiries. Film 3 more like it next month.', '#16A34A'],
      ['Kill it', 'Few views, no enquiries. Drop the topic and move on.', '#E5352B'],
      ['Stronger CTA', 'Lots of views, no enquiries. People watch but don\'t act. Make the ask clearer.', '#F29A16'],
    ]
      .map(([h, t, c]) => `<div class="rv-q"><h4 style="color:${c}">${h}</h4><p>${t}</p><div class="rv-lines"></div></div>`)
      .join('')}
  </div>`,
};

module.exports = { arc, FUNNEL_INK, FUNNEL, POST_TIME, howItWorks, weeklySchedule, monthCalendar, postPage, reviewPrinted };
