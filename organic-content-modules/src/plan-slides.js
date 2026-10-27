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
          ['One thing to improve', 'Just one, for next week. Write it down and do it.'],
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

  // one page per post: exactly what to say and post
  const postPage = (p) => {
    const pl = PILLARS[p.pillar];
    const ex = p.example;
    return {
      type: 'page',
      title: `Day ${p.day}: ${p.short}`,
      small: true,
      tag: { label: `${p.pillar} · ${p.type}`, color: pl.color },
      html: `<div class="pp-main">
        <div class="pp-meta"><span>${p.dow} · ${p.time}</span><span>${esc(p.format)} · ${esc(p.length)}</span><span>${p.shoot ? T.filmLabel[0] : T.filmLabel[1]}</span></div>
        <div class="pp-sec"><div class="pp-h">1 · Say this first</div><div class="pp-hook">"${esc(p.hook)}"</div></div>
        <div class="pp-sec"><div class="pp-h">2 · Then cover</div><ol>${p.beats.map((b) => `<li>${esc(b)}</li>`).join('')}</ol></div>
        <div class="pp-sec"><div class="pp-h">3 · End with</div><div class="pp-cta">${esc(p.cta)}</div></div>
        <div class="pp-two">
          <div><div class="pp-h">On-screen text</div><div class="pp-box">${esc(p.onscreen)}</div></div>
          <div><div class="pp-h">Caption</div><div class="pp-box mono">${esc(p.caption)}</div></div>
        </div>
      </div>
      <div class="pp-side">
        ${p.note ? `<div class="pp-card note"><div class="pp-h">Before you film</div><p>${esc(p.note)}</p></div>` : ''}
        ${p.note && ex
          ? `<div class="pp-card slim"><div class="pp-h">The pillar</div>${pillarChip(p.pillar)} <b>${esc(p.type)}.</b> Don't: ${esc(pl.trap.split(':')[0])}.</div>`
          : `<div class="pp-card"><div class="pp-h">The pillar</div>${pillarChip(p.pillar)}<p style="margin-top:8px"><b>${esc(p.type)}.</b> They're asking: ${esc(pl.ask)}</p><p><b>Don't:</b> ${esc(pl.trap.split(':')[0])}.</p></div>`}
        ${ex ? `<div class="pp-card ex"><div class="pp-h">Seen it work</div><div class="ex-views">${esc(ex.views)}</div><div class="ex-who">${esc(ex.who)} · ${esc(ex.platform)}</div><p>${esc(ex.hook)}</p><a class="ex-url" href="https://www.${esc(ex.url)}">Watch it before you film yours: ${esc(ex.url)}</a></div>` : ''}
        <div class="pp-ticks">${['Scripted', 'Filmed', 'Edited', 'Scheduled'].map((t) => `<span><i></i>${t}</span>`).join('')}</div>
      </div>`,
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

  return { pillarChip, howItWorks, weeklySchedule, pillarWeek, monthCalendar, weekReview, postList, postPage, shotList, reviewPrinted };
}

module.exports = { ...makePages(require('./plan'), require('./pillars').PILLARS), makePages, LAW_TEXT };
