const { ink: i, guide: g, esc } = require('../lib');
const { PILLARS } = require('../pillars');
const { pillarWeek, monthCalendar, postList } = require('../plan-slides');

const withNotes = (slide, say) => ({ ...slide, notes: { say } });

// Module 3, The Organic Content Pillars: Cormac's four-pillar wheel, built
// out for law firms, the Outlier Method for borrowing proven structures, and
// a 30-day calendar (one post a day) built in.

const dash = { dash: '7 7', sw: 1.6 };

// ---------- the wheel (board coordinates, centre 528,400)
const wheel = {
  type: 'board',
  title: 'The Organic Content Pillars',
  guide:
    g.line(347, 230, 710, 570) + g.line(710, 230, 347, 570) +
    g.line(528, 222, 528, 580, dash) + g.line(348, 400, 708, 400, dash) +
    g.path('M390,195 Q528,129 665,195') + g.path('M390,605 Q528,671 665,605') +
    g.path('M319,262 Q201,400 319,537') + g.path('M740,262 Q856,400 740,537') +
    // three slots per pillar
    g.line(458, 167, 453, 117) + g.line(590, 167, 595, 117) +
    g.line(460, 632, 455, 682) + g.line(593, 632, 598, 682) +
    g.line(273, 330, 213, 325) + g.line(268, 452, 208, 457) +
    g.line(785, 330, 835, 319) + g.line(793, 450, 845, 456),
  ink:
    // pillars
    i.text(528, 214, 'Connection', 'blue', 40, { anchor: 'middle' }) +
    i.text(528, 598, 'Invitation', 'blue', 40, { anchor: 'middle' }) +
    i.text(300, 400, 'Proof', 'blue', 42, { anchor: 'middle', rot: -90 }) +
    i.text(752, 400, 'Value', 'blue', 42, { anchor: 'middle', rot: 90 }) +
    // types
    i.text(448, 152, 'Character', 'black', 30, { anchor: 'end', rot: -10 }) +
    i.text(524, 146, 'Day', 'black', 34, { anchor: 'middle' }) +
    i.text(604, 152, 'Team', 'black', 32, { rot: -3 }) +
    i.text(448, 670, 'Resource', 'black', 30, { anchor: 'end' }) +
    i.text(526, 684, 'Events', 'black', 32, { anchor: 'middle' }) +
    i.text(606, 670, 'Workshops', 'black', 30) +
    i.text(262, 298, 'Screenshots', 'black', 28, { anchor: 'end', rot: -18 }) +
    i.text(214, 388, 'Case\nstudy', 'black', 30, { anchor: 'end' }) +
    i.text(262, 520, 'Testimonial', 'black', 28, { anchor: 'end', rot: -14 }) +
    i.text(806, 296, 'Pain points', 'black', 30, { rot: -4 }) +
    i.text(866, 388, 'Challenges /\nobstacles', 'black', 28) +
    i.text(852, 498, 'Simplifying\nconcepts', 'black', 28) +
    // what they ask (green) vs the trap (red)
    i.text(470, 282, 'Like?', 'green', 28, { anchor: 'middle' }) +
    i.text(596, 282, 'Disconnect?', 'red', 26, { anchor: 'middle' }) +
    i.text(642, 372, 'Helpful', 'green', 28, { anchor: 'middle', rot: -42 }) +
    i.text(642, 446, 'Lecturing', 'red', 26, { anchor: 'middle', rot: 42 }) +
    i.text(476, 530, 'Start...', 'green', 28, { anchor: 'middle' }) +
    i.text(588, 530, 'Selling', 'red', 28, { anchor: 'middle' }) +
    i.text(416, 446, 'Legit?', 'green', 28, { anchor: 'middle', rot: -42 }) +
    i.text(416, 372, 'Disbelief?', 'red', 26, { anchor: 'middle', rot: 42 }),
  notes: {
    say: [
      'Four pillars. Every post you make fits one of them, so you never start from a blank page again.',
      'Connection, at the top. Do they like you? Show your character, your day and your team, or they feel a disconnect and never meet the person behind the firm.',
      'Value, on the right. This is where most lawyers live, and it is great, just not on its own. Pain points, challenges, and simplifying concepts. Be helpful, not lecturing. One slice of the cake per video.',
      'Proof, on the left. They are thinking: is this person legit, who have they actually helped? Testimonials, case studies, and the screenshots of thank-you messages you already get. Always with permission, never identifying anyone.',
      'Invitation, at the bottom. Invite them to start: a free resource, an event, a workshop. Do not sell. Give publicly, sell privately, and let your ads do the selling.',
    ],
    draw: [
      'Write the four pillars in blue around the wheel.',
      'Write the three types for each pillar in black in the slots outside it.',
      'In each quarter: what they are asking in green, the trap in red.',
    ],
  },
};

// ---------- one page per pillar, built out for law firms
const NAMES = Object.keys(PILLARS);
const pillarPage = (name, n) => {
  const p = PILLARS[name];
  const ex = p.example;
  return {
    type: 'page',
    title: `Pillar ${n}: ${name}`,
    tag: { label: `${n} of 4`, color: p.color },
    html: `<div class="pl-strip">
        <div class="pl-ask"><b>They're asking</b>${esc(p.ask)}</div>
        <div class="pl-trap"><b>The trap</b>${esc(p.trap)}</div>
      </div>
      <div class="pl-cols">${p.types
        .map(
          (t) => `<div class="pl-col">
          <h4 style="color:${p.color}">${esc(t.name)}</h4>
          <p class="pl-what">${esc(t.what)}</p>
          <div class="pp-h">Post ideas</div>
          <ul>${t.ideas.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
          <div class="pp-h">Say this first</div>
          <div class="pl-hook">"${esc(t.hook)}"</div>
        </div>`
        )
        .join('')}</div>
      <div class="pl-why"><div class="pp-h">Why it matters</div>${esc(p.why)}</div>
      <a class="pl-ex" href="https://www.${esc(ex[3])}"><div class="pp-h">Seen it work</div><b>${esc(ex[1])}</b> · ${esc(ex[0])}<span>${esc(ex[2])}</span></a>`,
    notes: {
      say: [
        `${name}. The question in their head: ${p.ask}`,
        `The trap: ${p.trap}`,
        ...p.types.map((t) => `${t.name}: ${t.what} For example: "${t.hook}"`),
      ],
    },
  };
};

// ---------- extra ways to make more content
const multiply = {
  type: 'page',
  title: 'Make More Content, Faster',
  html: `<div class="steps">${[
    ['Collab posts', 'Bring the team in', 'Get your other lawyers, paralegals and in-house finance people on camera. Different specialties, different powers. The more of the team they see, the more they trust you.'],
    ['Series', 'One topic, many posts', 'Run a series like "Law in 30 Seconds" or "Myth of the Week", or take one topic for 30 days. One idea, a month of posts.'],
    ['Current news', 'Give your take', 'When something in the news touches your area, say what it means. You can share your beliefs without being party political.'],
    ['Podcasts', 'Come on one with us', 'We\'re building a community of law firm owners. A podcast with us gives you long-form authority, plus clips for a week of posts.'],
  ]
    .map(([when, what, how], k) => `<div class="step"><div class="step-n">${k + 1}</div><div class="step-when">${when}</div><h4>${what}</h4><p>${esc(how)}</p></div>`)
    .join('')}</div>
    <div class="mm-try">${[
      ['Day 12', 'Ask our accountant'],
      ['Every Wednesday', 'Law in 30 Seconds #1 to #4'],
      ['Day 9', 'My take on the news'],
      ['Day 27', 'Podcast day'],
    ]
      .map(([d, t]) => `<div><div class="pp-h">In your calendar</div><b>${d}</b>${esc(t)}</div>`)
      .join('')}</div>`,
  notes: {
    say: [
      'Four ways to make more content without more ideas.',
      'Collab posts: your team members have different specialties. If you have finance in-house, get your accountant to answer the money questions clients ask you.',
      'Run a series: one topic, over and over. Talk about the news: you bring some of the most nuanced views in society. And come on a podcast with us.',
    ],
  },
};

// ---------- worksheet: their own pillars
const build = {
  type: 'page',
  title: 'Build Your Pillars',
  minutes: 15,
  html: `<div class="bp">${NAMES.map(
    (n) => `<div class="bp-p" style="background:${PILLARS[n].color}">${n}</div>${PILLARS[n].types
      .map((t) => `<div class="bp-c"><b>${esc(t.name)}</b><span>3 ideas for your firm</span></div>`)
      .join('')}`
  ).join('')}</div>`,
  notes: {
    say: [
      'Pause the video. For each of the twelve slots, write three ideas from your own practice. That is thirty-six ideas.',
      'Use the calendar as your first month, then swap in your own ideas from here for month two.',
      'Shortcut: give Claude the four pillars, your practice area and the questions clients ask you, and ask for ten ideas per slot. Circle the ones that sound like you.',
    ],
  },
};

module.exports = {
  number: 3,
  title: 'The Organic Content Pillars',
  runtime: '15 to 20 min',
  outcome: 'The firm knows the four content pillars, has them built out with post ideas for a law firm, knows how to borrow proven structures from outlier videos, and has its next 30 days planned with one post a day.',
  slides: [
    { type: 'cover', title: 'The Organic\nContent Pillars' },

    { type: 'divider', lead: 'The BIG', word: 'Problems', tone: 'problem' },
    { type: 'point', tone: 'problem', n: 1, text: 'What Do I Post?', notes: { say: ['The number one question we get. Without a framework, you start from a blank page every single day.'] } },
    { type: 'point', tone: 'problem', n: 2, text: "Waiting Until It's Perfect", notes: { say: ['Analysis paralysis stops all growth. Firms plan for months and post nothing.'] } },
    { type: 'point', tone: 'problem', n: 3, text: 'Looking Like Every Other Firm', notes: { say: ['Same suit, same bookshelf, same tips. If you look like everyone else, clients choose on price.'] } },

    { type: 'divider', word: 'OPPORTUNITY', tone: 'idea' },
    { type: 'point', tone: 'idea', n: 1, text: 'Four Pillars, Endless Ideas', notes: { say: ['Connection, value, proof and invitation. Every post fits one of them.'] } },
    { type: 'point', tone: 'idea', n: 2, text: 'Show the Real You', notes: { say: ['People buy people. Your character is the one thing no other firm can copy.'] } },
    { type: 'point', tone: 'idea', n: 3, text: 'One Post a Day, Better Every Week', notes: { say: ['Put the reps on the board, then review once a week and improve one thing.'] } },

    wheel,
    ...NAMES.map((n, k) => pillarPage(n, k + 1)),
    { type: 'shot', theme: 'white', text: 'People buy people.\nShow them the real you.', notes: { say: ['The more they see of you and your team, the easier it is to trust you online.'] } },
    multiply,
    {
      type: 'board',
      title: 'The Outlier Method',
      guide:
        [0, 1, 2]
          .map((k) => {
            const x = 70 + k * 330;
            return g.rect(x, 200, 260, 200, { r: 10 }) + (k < 2 ? g.line(x + 270, 300, x + 320, 300) + g.arrowHead(x + 320, 300, 'right') : '');
          })
          .join('') +
        g.text(84, 226, '1', { size: 20 }) + g.text(414, 226, '2', { size: 20 }) + g.text(744, 226, '3', { size: 20 }),
      ink:
        i.text(200, 280, 'Find an outlier', 'blue', 34, { anchor: 'middle' }) +
        i.text(200, 322, '5x+ their usual', 'blue', 28, { anchor: 'middle' }) +
        i.text(200, 354, 'views', 'blue', 28, { anchor: 'middle' }) +
        i.text(530, 280, 'Strip it to a', 'purple', 34, { anchor: 'middle' }) +
        i.text(530, 316, 'template', 'purple', 34, { anchor: 'middle' }) +
        i.text(530, 356, 'keep the structure', 'purple', 28, { anchor: 'middle' }) +
        i.text(860, 280, 'Fill it with', 'dkgreen', 34, { anchor: 'middle' }) +
        i.text(860, 316, 'YOUR expertise', 'dkgreen', 34, { anchor: 'middle' }) +
        i.text(530, 500, 'Copy the shape, never the words', 'red', 40, { anchor: 'middle' }) +
        i.under(300, 516, 460, 'red'),
      notes: {
        say: [
          'Viral is not luck. Find a video from a small or mid-sized account that got five times their normal views. That is an outlier.',
          'Ignore the topic. Look at the structure: how the hook works, how the points are ordered, how it ends.',
          'Then pour your expertise into that same structure. You can paste the transcript into Claude and ask it to turn it into a fill-in-the-blank template.',
          'Copy the shape, never the words.',
        ],
        draw: ['Label the three boxes, then the red rule underneath.'],
      },
    },
    {
      type: 'statement',
      theme: 'white',
      text: 'Every question a client has ever asked you is a video.',
      notes: { say: ['Start a note on your phone today. Every time a client asks you something, write it down. That is your content for the year.'] },
    },
    { type: 'shot', kicker: 'Rule 01', text: 'Be different from every other firm.', notes: { say: ['Look at how other lawyers post, then show up completely differently.'] } },
    { type: 'shot', kicker: 'Rule 02', text: "One post a day is the minimum.\nDon't let analysis paralysis stop you.", notes: { say: ['You need the reps on the board. A good post today beats a perfect post next month.'] } },
    { type: 'shot', kicker: 'Rule 03', text: 'Review once a week.\nImprove one thing.', notes: { say: ['Sunday or Monday, whenever you have downtime. Watch your week back, be kind but honest, and improve one little thing. Before you know it, your content is seriously good.'] } },
    withNotes(pillarWeek, [
      'One post a day is the minimum. Here is what each day is for, so you never have to decide.',
      'Monday value, Tuesday your character, Wednesday your series, Thursday proof, Friday the team, Saturday your day. Sunday rotates, and it is also your review day.',
      'Over the month that is thirteen connection, ten value, five proof and only two invitation posts.',
    ]),
    withNotes(monthCalendar, [
      'And here is your month, already planned. Thirty posts, one a day at 7:30 in the morning, every one tied to a pillar.',
      'Most are filmed on your monthly shoot day in Module 5. The ones marked "film on the day" you capture as they happen.',
      'Tick each day off. Every Sunday, look back at the week, and improve one thing. The full script for every post is in your 30-Day Post Plan.',
    ]),
    postList(0, 10),
    postList(10, 20),
    postList(20, 30),
    build,
    {
      type: 'next',
      checklist: [
        'Write your 3 ideas for each of the 12 slots',
        'Start a "client questions" note on your phone',
        'Save 3 outlier videos from your niche',
        'Put the 30-day calendar on the wall',
        'Book your shoot day (Module 5)',
        'Line up a team member for a collab post',
        'Sunday: review the week, improve one thing',
      ],
      notes: { say: ['Takeaway: four pillars, one post a day, and a weekly review. Your first month is already planned.'] },
    },
    { type: 'notes' },
  ],
};
