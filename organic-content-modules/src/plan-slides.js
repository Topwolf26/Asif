// Boards shared by Module 8 and the standalone 30-Day Post Plan.
const { ink: i, guide: g, cards } = require('./lib');
const plan = require('./plan');

const FUNNEL_INK = { TOFU: 'orange', MOFU: 'blue', BOFU: 'dkgreen' };
const SHORT = {
  'What I Know Now': 'Story', 'Category Breakdown': '3 questions', 'Myth-Busting Reframe': 'Myth-bust',
  'Rating Advice 0-10': 'Rating 0-10', 'Behind the Scenes': 'Behind scenes', 'Red Flag / Green Flag': 'Red/green',
  'Is It Possible To...?': 'Is it possible', 'Smart vs Dumb': 'Smart/dumb', 'Opinion': 'Opinion',
  'Tier List': 'Tier list', 'Two People Are Trying To...': 'Two people', 'FAQ': 'Cost FAQ',
};
const DOW = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

// calendar geometry
const CX = 70, CY = 120, CW = 130, CH = 108;
const cell = (day) => [CX + ((day - 1) % 7) * CW, CY + Math.floor((day - 1) / 7) * CH];

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

const map = {
  type: 'board',
  title: 'The 30-Day Map',
  guide:
    DOW.map((d, c) => g.text(CX + c * CW + CW / 2, CY - 12, d, { size: 13, anchor: 'middle' })).join('') +
    Array.from({ length: 30 }, (_, k) => {
      const [x, y] = cell(k + 1);
      return g.rect(x + 3, y + 3, CW - 6, CH - 6, { r: 6, fill: '#F3F4F3' }) + g.text(x + 12, y + 24, String(k + 1), { size: 13 });
    }).join(''),
  ink:
    plan.map((p) => {
      const [x, y] = cell(p.day);
      return i.dot(x + CW - 22, y + 22, FUNNEL_INK[p.funnel], 10) + i.text(x + 12, y + 62, p.funnel, FUNNEL_INK[p.funnel], 26) + i.text(x + 12, y + 88, SHORT[p.structure] || p.structure, 'black', 20);
    }).join('') +
    i.text(cell(1)[0] + 12, cell(1)[1] + 70, 'Schedule', 'purple', 24) + i.text(cell(1)[0] + 12, cell(1)[1] + 94, 'week 1', 'purple', 22) +
    i.text(cell(29)[0] + 12, cell(29)[1] + 62, 'REVIEW', 'red', 26) + i.text(cell(29)[0] + 12, cell(29)[1] + 88, '+ book shoot', 'red', 20) +
    i.text(460, 680, '13 posts · 6 TOFU · 3 MOFU · 4 BOFU', 'purple', 30),
  notes: {
    say: [
      'Here is the month. Thirteen posts, every Tuesday, Thursday and Sunday.',
      'Orange is reach, blue is connect, green is convert. Notice we never put a convert post first; we earn it.',
      'Day 29 you review what worked and book your next shoot day, so month two is already in motion.',
    ],
    draw: ['Dot each post day in its funnel colour. Write REVIEW on day 29.'],
  },
};

const daily = {
  type: 'board',
  title: 'Daily Non-Negotiables',
  guide: [0, 1, 2, 3].map((k) => g.rect(110, 120 + k * 135, 52, 52, { r: 6 }) + g.line(200, 172 + k * 135, 960, 172 + k * 135)).join(''),
  ink:
    [
      ['15 min: reply to every comment + DM', 'red'],
      ['Comment on 5 local accounts (referral partners!)', 'blue'],
      ['1-3 stories: behind the scenes, no polish', 'purple'],
      ['Log any enquiry that mentions your content', 'dkgreen'],
    ].map(([s, c], k) => i.text(210, 160 + k * 135, s, c, 36) + i.tick(118, 150 + k * 135, 'dkgreen')).join(''),
  notes: {
    say: [
      'Posting is three times a week. These four are every day, and they take about twenty minutes.',
      'Reply to everything. Comment on five local accounts, especially accountants, brokers and other referral partners. A few casual stories. And log every enquiry that mentions a video.',
    ],
    draw: ['Write one habit per line and tick each box.'],
  },
};

const review = {
  type: 'board',
  title: 'Day 30 Review',
  guide:
    g.line(150, 660, 980, 660) + g.arrowHead(980, 660, 'right') +
    g.line(150, 660, 150, 110) + g.arrowHead(150, 110, 'up') +
    g.line(565, 120, 565, 650, { dash: '8 8' }) + g.line(160, 385, 970, 385, { dash: '8 8' }) +
    g.text(980, 690, 'Views', { size: 14, anchor: 'end' }) + g.text(140, 120, 'Enquiries', { size: 14, anchor: 'end' }),
  ink:
    i.text(770, 240, 'DOUBLE DOWN', 'dkgreen', 40, { anchor: 'middle' }) + i.text(770, 280, 'film 3 more like it', 'dkgreen', 28, { anchor: 'middle' }) +
    i.text(355, 240, 'BETTER HOOK', 'blue', 40, { anchor: 'middle' }) + i.text(355, 280, 'same topic, new hook', 'blue', 28, { anchor: 'middle' }) +
    i.text(770, 520, 'STRONGER CTA', 'orange', 40, { anchor: 'middle' }) + i.text(770, 560, 'people watch, don\'t act', 'orange', 28, { anchor: 'middle' }) +
    i.text(355, 520, 'KILL IT', 'red', 40, { anchor: 'middle' }) + i.text(355, 560, 'move on', 'red', 28, { anchor: 'middle' }),
  notes: {
    say: [
      'On day 30, put every post on this grid: views along the bottom, enquiries up the side.',
      'High views and enquiries: double down, film three more like it. Low views but enquiries: great topic, better hook. High views, no enquiries: stronger call to action. Low and low: kill it and move on.',
      'Paste your numbers into Claude with the weekly review prompt and it will sort them for you.',
    ],
    draw: ['Label the four quadrants.'],
  },
};

// one detailed page per week for the standalone plan
const weekPage = (w, title) => ({
  type: 'board',
  title,
  html: cards(
    plan
      .filter((p) => p.week === w || (w === 4 && p.week === 5))
      .map((p) => ({
        h4: `Day ${p.day} · ${p.dow} · ${p.funnel}`,
        p: `${p.topic}\n\nStructure: ${p.structure}\nHook: ${p.hook}\nCTA: ${p.cta}`,
        eg: `Law: ${p.law}\nFinance: ${p.finance}`,
      })),
    { x: 50, y: 74, w: 950, h: 590, cols: w === 4 ? 4 : 3 }
  ),
});

module.exports = { arc, map, daily, review, weekPage, FUNNEL_INK };
