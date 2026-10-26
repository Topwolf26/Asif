const { ink: i } = require('../lib');
const plan = require('../plan');
const { howItWorks, weeklySchedule, monthCalendar, postPage, reviewPrinted, FUNNEL_INK } = require('../plan-slides');

// the client hand-out: "your next 30 days are planned for you"
const WEEKS = [
  [1, 'Week 1 · Days 1-7', 'Introduce.\nLet them meet you.'],
  [2, 'Week 2 · Days 8-14', "Educate.\nAnswer what they're Googling."],
  [3, 'Week 3 · Days 15-21', 'Prove it.\nShow the work.'],
  [4, 'Week 4 · Days 22-30', 'Convert.\nShow them how to work with you.'],
];

module.exports = {
  number: 30,
  file: '30-Day-Post-Plan',
  title: '30-Day Post Plan',
  noGuide: true,
  slides: [
    { type: 'cover', title: 'Your 30-Day\nPost Plan' },
    { type: 'shot', text: 'Your next 30 days are planned for you.\nYou just need to take action.' },
    howItWorks,
    weeklySchedule,
    monthCalendar,
    ...WEEKS.flatMap(([w, kicker, text]) => [
      { type: 'shot', theme: 'white', kicker, text },
      ...plan.map((p, k) => [p, k + 1]).filter(([p]) => p.week === w || (w === 4 && p.week === 5)).map(([p, n]) => postPage(p, n)),
    ]),
    {
      type: 'sheet',
      title: 'Tracker',
      cells: [
        { x: 50, y: 70, w: 80, h: 40, label: 'Day' },
        { x: 130, y: 70, w: 400, h: 40, label: 'Post' },
        { x: 530, y: 70, w: 70, h: 40, label: 'Funnel' },
        { x: 600, y: 70, w: 100, h: 40, label: 'Views' },
        { x: 700, y: 70, w: 100, h: 40, label: '3s hold %' },
        { x: 800, y: 70, w: 100, h: 40, label: 'Follows' },
        { x: 900, y: 70, w: 100, h: 40, label: 'Enquiries' },
        ...plan.flatMap((p, r) => [
          { x: 50, y: 110 + r * 42, w: 80, h: 42, html: `<div class="pre"><b>${p.dow} ${p.day}</b></div>` },
          { x: 130, y: 110 + r * 42, w: 400, h: 42, html: `<div class="pre">${p.topic.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</div>` },
          { x: 530, y: 110 + r * 42, w: 70, h: 42, html: `<div class="pre">${p.funnel}</div>` },
          { x: 600, y: 110 + r * 42, w: 100, h: 42 },
          { x: 700, y: 110 + r * 42, w: 100, h: 42 },
          { x: 800, y: 110 + r * 42, w: 100, h: 42 },
          { x: 900, y: 110 + r * 42, w: 100, h: 42 },
        ]),
      ],
      ink:
        i.text(612, 140, '1,240', 'blue', 26) + i.text(712, 140, '41%', 'blue', 26) + i.text(812, 140, '18', 'blue', 26) + i.text(912, 140, '1', FUNNEL_INK.BOFU, 26) +
        i.text(612, 182, '3,900', 'blue', 26) + i.text(712, 182, '52%', 'blue', 26) + i.text(812, 182, '44', 'blue', 26) + i.text(912, 182, '0', 'red', 26),
    },
    reviewPrinted,
    { type: 'shot', text: 'Done beats perfect.\nPost all 13, then judge.' },
    { type: 'notes' },
  ],
};
