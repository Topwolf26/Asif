// Pages built from a 30-day plan. makePages(plan, PILLARS, text) builds them
// for any plan; the default export is the law-firm plan (src/plan.js) used by
// Modules 3, 5, 8 and the standalone 30-Day Post Plan. Client plans (src/clients)
// call makePages with their own data and wording. Everything is printed: the
// only thing left to fill in is the tick boxes.
const { esc } = require('./lib');

const DOW = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const JOB = { plan: 'var(--accent)', engage: '#F29A16', stories: '#A51CC9' };
const GREY = '#555';
const isReview = (day) => day % 7 === 0;

// the wording that changes between plans
const LAW_TEXT = {
  how: (shoot, total) => [
    ['Before day 1', 'Shoot day', `Film the ${shoot} talking-head posts in one half-day (Module 5). The other ${total - shoot} you film as they happen: your day, the team, a client.`],
    ['Every Monday', 'Review + schedule', 'Claude reviews last week\'s numbers, then you schedule the week\'s 7 posts (Modules 6 and 7). Thirty minutes.'],
    ['Every day', 'One post, 7:30am', 'One post goes out every morning. Reply to comments for 15 minutes after it goes live. Tick it off.'],
    ['Every Sunday', 'Improve one thing', 'Look back at the week, be honest, and improve one thing. On day 30, score every post and book next month\'s shoot.'],
  ],
  fine: '<b>Client stories:</b> remove names and anything identifying, get the client\'s OK, and check your local conduct and advertising rules before posting results.',
  weekJobs: ['Answer a real client worry.', 'Your opinion, or your take on the news.', 'Your "Law in 30 Seconds" series.', 'A result, a review or a client message.', 'A collab post with someone on the team.', 'Document your day.', 'Week 1 value, week 2 invitation, week 3 proof, week 4 invitation.'],
  weekNote: '<b>About 4 hours a week.</b> Put these blocks in your calendar as recurring events now, the same way you\'d block a client meeting. Once a month, add a half-day shoot.',
  filmLabel: ['Film on shoot day', 'Film on the day'],
  calNote: '<b>Film on the day</b> = not on the shoot day.',
  planBlock: ['REVIEW + PLAN', "Claude reviews last week. Schedule the week's 7 posts"],
  extraBlocks: [],
};

function makePages(plan, PILLARS, T = LAW_TEXT) {
  const pillarChip = (name) => `<span class="pchip" style="background:${PILLARS[name].color}">${name}</span>`;
  const SHOOT = plan.filter((p) => p.shoot);

  const howItWorks = {
    type: 'page',
    title: 'How This Works',
    html: `<div class="steps">
      ${T.how(SHOOT.length, plan.length)
        .map(([when, what, how], k) => `<div class="step"><div class="step-n">${k + 1}</div><div class="step-when">${when}</div><h4>${what}</h4><p>${how}</p></div>`)
        .join('')}
    </div>
    <div class="fine">${T.fine}</div>`,
  };

  // the week as calendar blocks, Google Calendar style
  const weeklySchedule = (() => {
    const T0 = 7, T1 = 18, top = 128, hh = 49, left = 140, cw = 120;
    const y = (t) => top + (t - T0) * hh;
    const firstWeek = plan.slice(0, 7);
    const blocks = [
      ...firstWeek.map((p, d) => [d, 7.5, 0.25, d === 6 ? GREY : PILLARS[p.pillar].color, 'POST 7:30am', d === 6 ? 'Rotates. Reply for 15 min' : `${p.pillar}. Reply for 15 min`]),
      [0, 8.5, 0.5, JOB.plan, ...T.planBlock],
      ...T.extraBlocks,
      ...[0, 1, 2, 3, 4].map((d) => [d, 12.5, 0.25, JOB.engage, 'ENGAGE', 'Replies + comment on 5 local accounts']),
      [2, 15, 0.25, JOB.stories, 'STORIES', '2 behind-the-scenes stories'],
      [6, 16, 0.25, '#E5352B', 'REVIEW', 'Look back. Improve one thing'],
    ];
    const fmt = (t) => `${((Math.floor(t) + 11) % 12) + 1}${t >= 12 ? 'pm' : 'am'}`;
    const html =
      `<div class="cal-frame"></div>` +
      DOW.map((d, c) => `<div class="wk-day" style="left:${left + c * cw}px;width:${cw}px">${d}</div>`).join('') +
      Array.from({ length: T1 - T0 + 1 }, (_, k) => `<div class="wk-hour" style="top:${y(T0 + k) - 7}px">${fmt(T0 + k)}</div><div class="wk-line" style="top:${y(T0 + k)}px;left:${left}px;width:${cw * 7}px"></div>`).join('') +
      DOW.map((_, c) => `<div class="wk-vline" style="left:${left + c * cw}px;top:${top - 30}px;height:${y(T1) - top + 30}px"></div>`).join('') +
      blocks
        .map(([d, t, len, color, label, sub]) => `<div class="wk-ev" style="left:${left + d * cw + 3}px;top:${y(t) + 1}px;width:${cw - 6}px;min-height:${Math.max(len * hh, 34)}px;background:${color}"><b>${label}</b><span>${esc(sub)}</span></div>`)
        .join('') +
      `<div class="wk-note">${T.weekNote}</div>`;
    return { type: 'page', title: 'Your Weekly Content Schedule', html };
  })();

  // one week of the pillars, with week 1's opening lines
  const pillarWeek = {
    type: 'page',
    title: 'Your Week of Pillars',
    html: `<div class="wk7">${plan
      .slice(0, 7)
      .map((p, k) => {
        const sun = k === 6;
        const chip = sun ? `<span class="pchip" style="background:${GREY}">Rotates</span>` : pillarChip(p.pillar);
        const type = sun ? 'Value, invitation or proof' : p.type;
        const job = T.weekJobs[k];
        return `<div class="wk7-day"><div class="wk7-d">${DOW[k]}</div>${chip}<div class="wk7-t">${esc(type)}</div><p>${esc(job)}</p>
          <div class="wk7-ex"><div class="pp-h">Week 1</div>"${esc(p.hook)}"</div>${sun ? '<div class="wk7-rev">+ Weekly review: improve one thing</div>' : ''}</div>`;
      })
      .join('')}</div>
      <div class="mix">${Object.keys(PILLARS)
        .map((n) => {
          const c = plan.filter((p) => p.pillar === n).length;
          return `<div style="flex:${c};background:${PILLARS[n].color}">${c} ${n}</div>`;
        })
        .join('')}</div>
      <div class="mix-note"><b>30 posts in 30 days.</b> Mostly connection and value. Invitation only twice a month: give publicly, sell privately.</div>`,
  };

  // guiding principle: bare minimum once a week, max play once a day
  const ladder = (() => {
    const pick = (dows) => plan.filter((p) => dows.includes(p.dow));
    const steps = [
      ['Bare minimum', '1 a week', pick(['Mon']), 'Post the Monday post every week. Never go below this.'],
      ['Building', '3 a week', pick(['Mon', 'Wed', 'Fri']), 'Monday, Wednesday and Friday. Move up when once a week feels easy.'],
      ['Max play', '1 a day', plan, 'Every post in this plan. This is where it compounds.'],
    ];
    return {
      type: 'page',
      title: 'Start Where You Are',
      html: `<div class="ladder">${steps
        .map(([name, rate, posts, how], k) => `<div class="lad lad-${k}">
          <div class="lad-rate">${rate}</div><div class="lad-name">${name}</div>
          <p>${how}</p>
          <div class="lad-days">${k === 2 ? 'Days 1 to 30' : `Days ${posts.map((p) => p.day).join(', ')}`}</div>
          <div class="lad-n"><b>${posts.length}</b> posts this month</div>
        </div>`)
        .join('')}</div>
        <div class="fine"><b>The guiding principle:</b> start with the bare minimum, once a week, then build to once a day. A good post this week beats a perfect post next month.</div>`,
    };
  })();

  // the limiting beliefs everyone hits, and the principles that get you past them
  const principles = {
    type: 'page',
    title: 'Guiding Principles',
    html: `<div class="gp">${[
      ['Limiting belief', '"I don\'t like how I look on camera."', 'You won\'t love it at the start. Nobody does, and that\'s fine. It gets easier with every video.'],
      ['Limiting belief', '"It needs one more edit."', 'You\'ll want to tweak it forever. Post it anyway, then get feedback and make the next one better.'],
      ['Guiding principle', 'Don\'t let analysis paralysis stop you.', 'Bare minimum once a week, max play once a day. A good post this week beats a perfect post next month.'],
      ['Guiding principle', 'Review once a week.', 'Every Sunday, look back and improve one thing. Then bring it up with us on our weekly call.'],
    ]
      .map(([tag, line, how], k) => `<div class="gp-c ${k < 2 ? 'belief' : 'rule'}"><div class="gp-tag">${tag}</div><div class="gp-line">${line}</div><p>${how}</p></div>`)
      .join('')}</div>`,
  };

  // the content matrix: the four pillars, their three post types, and
  // what people are asking (green) vs the trap (red) in each quarter
  const wheelPage = (() => {
    if (!Object.values(PILLARS).every((x) => x.types)) return null;
    const C = (n) => PILLARS[n].color;
    const types = (n) => PILLARS[n].types.map((t) => t.name);
    const line = (x1, y1, x2, y2, extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#2A2A2A" stroke-width="1.6" stroke-linecap="round" ${extra}/>`;
    // long labels wrap onto two lines at the space nearest the middle
    const wrap = (str) => {
      if (str.length <= 13) return [str];
      if (str.includes(' / ')) return [str.slice(0, str.indexOf(' / ') + 2), str.slice(str.indexOf(' / ') + 3)];
      const spaces = [...str].map((c, i) => (c === ' ' ? i : -1)).filter((i) => i > 0);
      const cut = spaces.sort((a, b) => Math.abs(a - str.length / 2) - Math.abs(b - str.length / 2))[0];
      return cut ? [str.slice(0, cut), str.slice(cut + 1)] : [str];
    };
    const txt = (x, y, str, o = {}) => {
      const rows = o.serif || o.italic ? [str] : wrap(str);
      const size = o.size || 17;
      const y0 = y - ((rows.length - 1) * size * 1.15) / 2;
      return `<text x="${x}" y="${y0}" text-anchor="${o.a || 'middle'}" font-family="${o.serif ? 'Fraunces' : 'Inter'}" font-size="${size}" font-weight="${o.w || 500}" ${o.italic ? 'font-style="italic"' : ''} fill="${o.fill || '#2A2A2A'}" ${o.rot ? `transform="rotate(${o.rot} ${x} ${y})"` : ''}>${rows.map((r, k) => `<tspan x="${x}" dy="${k ? size * 1.15 : 0}">${esc(r)}</tspan>`).join('')}</text>`;
    };
    const [cT, vT, pT, iT] = ['Connection', 'Value', 'Proof', 'Invitation'].map(types);
    const svg = `<svg viewBox="120 92 880 616" width="908" height="600" preserveAspectRatio="xMidYMid meet">
      ${line(347, 230, 710, 570)}${line(710, 230, 347, 570)}
      ${line(528, 222, 528, 580, 'stroke-dasharray="6 6" stroke-width="1.2"')}${line(348, 400, 708, 400, 'stroke-dasharray="6 6" stroke-width="1.2"')}
      <path d="M390,195 Q528,129 665,195 M390,605 Q528,671 665,605 M319,262 Q201,400 319,537 M740,262 Q856,400 740,537" fill="none" stroke="#2A2A2A" stroke-width="1.6"/>
      ${line(458, 167, 453, 117)}${line(590, 167, 595, 117)}${line(460, 632, 455, 682)}${line(593, 632, 598, 682)}
      ${line(273, 330, 213, 325)}${line(268, 452, 208, 457)}${line(785, 330, 835, 319)}${line(793, 450, 845, 456)}
      ${txt(528, 212, 'Connection', { serif: 1, size: 32, w: 600, fill: C('Connection') })}
      ${txt(528, 600, 'Invitation', { serif: 1, size: 32, w: 600, fill: C('Invitation') })}
      ${txt(296, 400, 'Proof', { serif: 1, size: 32, w: 600, fill: C('Proof'), rot: -90 })}
      ${txt(760, 400, 'Value', { serif: 1, size: 32, w: 600, fill: C('Value'), rot: 90 })}
      ${txt(446, 150, cT[0], { a: 'end' })}${txt(524, 144, cT[1])}${txt(604, 150, cT[2], { a: 'start' })}
      ${txt(446, 668, iT[0], { a: 'end' })}${txt(526, 684, iT[1])}${txt(606, 668, iT[2], { a: 'start' })}
      ${txt(262, 300, pT[2], { a: 'end' })}${txt(250, 405, pT[1], { a: 'end' })}${txt(262, 512, pT[0], { a: 'end' })}
      ${txt(800, 300, vT[0], { a: 'start' })}${txt(858, 405, vT[1], { a: 'start' })}${txt(800, 512, vT[2], { a: 'start' })}
      ${txt(474, 284, 'Like?', { italic: 1, fill: '#15803D' })}${txt(588, 284, 'Disconnect?', { italic: 1, fill: '#B91C1C' })}
      ${txt(640, 370, 'Helpful', { italic: 1, fill: '#15803D', rot: -42 })}${txt(640, 446, 'Lecturing', { italic: 1, fill: '#B91C1C', rot: 42 })}
      ${txt(476, 528, 'Start...', { italic: 1, fill: '#15803D' })}${txt(586, 528, 'Selling', { italic: 1, fill: '#B91C1C' })}
      ${txt(418, 446, 'Legit?', { italic: 1, fill: '#15803D', rot: -42 })}${txt(418, 370, 'Disbelief?', { italic: 1, fill: '#B91C1C', rot: 42 })}
    </svg>`;
    return {
      type: 'page',
      cls: 'sheet-post',
      html: `<div class="sp-head"><div class="sp-kicker">The content matrix</div><h2>The Four Content Pillars</h2></div>
        <div class="wheel">${svg}</div>
        <div class="wheel-key">Every post fits one of four pillars, and each pillar has three kinds of post. In each quarter: <i style="color:#15803D">what people are asking</i>, and <i style="color:#B91C1C">the trap to avoid</i>.</div>`,
    };
  })();

  // one clean page per pillar: what it is, the three kinds of post, examples
  const pillarPage = (name, n) => {
    const pl = PILLARS[name];
    const ex = pl.example;
    return {
      type: 'page',
      cls: 'sheet-post',
      html: `<div class="sp-head"><div class="sp-kicker">Pillar ${n} of 4</div><h2 style="color:${pl.color}">${name}</h2></div>
        <div class="pv-ask"><span>They're asking</span>${esc(pl.ask)}</div>
        <div class="pv-trap"><span>The trap</span>${esc(pl.trap)}</div>
        <div class="pv-cols">${pl.types
          .map(
            (t) => `<div class="pv-col">
            <h3 style="color:${pl.color}">${esc(t.name)}</h3>
            <p>${esc(t.what)}</p>
            <div class="sp-label">Post ideas</div>
            <ul>${t.ideas.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
            <div class="sp-label">Say it like this</div>
            <p class="pv-hook">“${esc(t.hook)}”</p>
          </div>`
          )
          .join('')}</div>
        <div class="pv-foot">
          <div class="pv-why">${esc(pl.why)}</div>
          ${ex ? `<div class="pv-ex"><div class="sp-label">Seen it work</div><span class="sp-views">${esc(ex[1])}</span> ${esc(ex[0])}. ${esc(ex[2])} <a href="https://www.${esc(ex[3])}">${esc(ex[3])}</a></div>` : ''}
        </div>`,
    };
  };

  // the month at a glance: one tinted card per day, big day number, the post, its pillar
  const tint = (hex, a) => {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
  };
  const monthCalendar = (() => {
    const left = 74, top = 110, cw = 130, ch = 116, gap = 5;
    const cells = plan
      .map((p, k) => {
        const x = left + (k % 7) * cw;
        const y = top + Math.floor(k / 7) * ch;
        const c = PILLARS[p.pillar].color;
        return `<div class="cal-cell" style="left:${x}px;top:${y}px;width:${cw - gap}px;height:${ch - gap}px;background:${tint(c, 0.1)};border-left-color:${c}">
          <div class="cal-top"><span class="cal-day">${p.day}</span>${isReview(p.day) ? '<span class="cal-rev">Review</span>' : ''}<span class="mc-box"></span></div>
          <div class="cal-title">${esc(p.short)}</div>
          <div class="cal-foot"><b style="color:${c}">${p.pillar}</b>${p.shoot ? '' : ` · ${T.filmLabel[1].toLowerCase()}`}</div>
        </div>`;
      })
      .join('');
    const heads = DOW.map((d, c) => `<div class="mc-head" style="left:${left + c * cw}px;width:${cw - gap}px">${d}</div>`).join('');
    const legend = `<div class="mc-legend">${Object.keys(PILLARS)
      .map((n) => `<span><i style="background:${PILLARS[n].color}"></i>${n}</span>`)
      .join('')}<span><i class="rev"></i>Sunday review</span><span class="mc-every">${T.calNote}</span></div>`;
    return { type: 'page', title: 'Your Next 30 Days', tag: { label: '1 post a day · 7:30am', color: 'var(--accent)' }, html: heads + cells + legend };
  })();

  // Sunday review at the end of each week: tick off the week, then three honest questions
  const weekReview = (w) => {
    const days = plan.filter((p) => p.day > (w - 1) * 7 && p.day <= w * 7);
    return {
      type: 'page',
      title: `Week ${w} Review · Sunday`,
      minutes: 15,
      html: `<table class="ptab wrev"><thead><tr><th>Day</th><th>Post</th><th>Pillar</th><th>Posted</th></tr></thead><tbody>${days
        .map((p) => `<tr><td><b>${p.dow} ${p.day}</b></td><td>${esc(p.short)}</td><td>${pillarChip(p.pillar)}</td><td><i class="ptab-box"></i></td></tr>`)
        .join('')}</tbody></table>
        <div class="wrev-q">${[
          ['Best post this week', 'Which one, and why do you think it worked?'],
          ['What flopped', 'Which one, and was it the hook, the topic or the call to action?'],
          ['One thing to improve', 'Just one, for next week. Write it down, and bring it up on our weekly call.'],
        ]
          .map(([h, p]) => `<div><div class="pp-h">${h}</div><p>${p}</p></div>`)
          .join('')}</div>`,
    };
  };


  // the 30 opening lines, ten to a page
  const postList = (from, to) => ({
    type: 'page',
    title: `Your 30 Posts: Days ${from + 1}-${to}`,
    html: `<table class="ptab"><thead><tr><th>Day</th><th>Pillar</th><th>Post</th><th>Say this first</th><th></th></tr></thead><tbody>${plan
      .slice(from, to)
      .map(
        (p) => `<tr><td><b>${p.dow.toUpperCase()} ${p.day}</b></td><td>${pillarChip(p.pillar)}<div class="ptab-t">${esc(p.type)}</div></td><td><b>${esc(p.short)}</b></td><td>"${esc(p.hook)}"</td><td><i class="ptab-box"></i></td></tr>`
      )
      .join('')}</tbody></table>`,
  });

  // one page per post: the script to read out, and the notes around it
  const DAYNAME = { Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday' };
  const postPage = (p) => {
    const pl = PILLARS[p.pillar];
    const ex = p.example;
    const notes = [
      ['On screen', esc(p.onscreen)],
      ['Caption', esc(p.caption)],
      ['Filming', `${esc(p.format)}, ${esc(p.length)}. ${p.shoot ? T.filmLabel[0] : T.filmLabel[1]}.`],
      p.note && ['Before you film', esc(p.note), 'warn'],
      ex && ['Seen it work', `<span class="sp-views">${esc(ex.views)}</span> ${esc(ex.who)}. ${esc(ex.hook)} <a href="https://www.${esc(ex.url)}">${esc(ex.url)}</a>`],
    ].filter(Boolean);
    return {
      type: 'page',
      cls: 'sheet-post',
      html: `<div class="sp-head">
          <div class="sp-kicker">Day ${p.day} · ${DAYNAME[p.dow]}, ${p.time} · <span style="color:${pl.color}">${p.pillar}, ${esc(p.type.toLowerCase())}</span></div>
          <h2>${esc(p.short)}</h2>
        </div>
        <div class="sp-script">
          <p class="sp-hook">“${esc(p.hook)}”</p>
          ${p.script.map((line) => `<p>${esc(line)}</p>`).join('')}
          <p class="sp-close">${esc(p.cta)}</p>
        </div>
        <div class="sp-side">
          ${notes.map(([label, body, cls]) => `<div class="sp-item ${cls || ''}"><div class="sp-label">${label}</div>${body}</div>`).join('')}
        </div>
        <div class="sp-ticks">${['Scripted', 'Filmed', 'Edited', 'Posted'].map((t) => `<span><i></i>${t}</span>`).join('')}</div>`,
    };
  };

  // shoot-day shot list (Module 5): every talking-head post in the month
  const shotList = {
    type: 'page',
    title: 'Shot List',
    html: `<table class="ptab shotlist"><thead><tr><th>#</th><th>Day</th><th>Video</th><th>Pillar</th><th>Format</th><th>Done</th></tr></thead><tbody>${SHOOT.map(
      (p, k) => `<tr><td>${k + 1}</td><td>${p.dow} ${p.day}</td><td><b>${esc(p.short)}</b></td><td>${pillarChip(p.pillar)}</td><td>${esc(p.format)}</td><td><i class="ptab-box"></i></td></tr>`
    ).join('')}</tbody></table>`,
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

  return { pillarChip, howItWorks, ladder, principles, wheelPage, pillarPage, weeklySchedule, pillarWeek, monthCalendar, weekReview, postList, postPage, shotList, reviewPrinted };
}

module.exports = { ...makePages(require('./plan'), require('./pillars').PILLARS), makePages, LAW_TEXT };
