const { ink: i, cards } = require('../lib');
const plan = require('../plan');
const { arc, map, daily, review } = require('../plan-slides');

const weekCard = (w) => ({
  h4: `Week ${w}`,
  p: plan
    .filter((p) => p.week === w || (w === 4 && p.week === 5))
    .map((p) => `${p.dow} ${p.day} · ${p.funnel}\n${p.topic}\n(${p.structure})`)
    .join('\n\n'),
});

module.exports = {
  number: 8,
  title: 'Your 30-Day Post Plan',
  runtime: '12 to 15 min',
  outcome: 'The firm has a 13-post plan for its first 30 days, the daily habits around it, and a way to review and plan month two.',
  slides: [
    { type: 'cover', kicker: 'Module 8', title: 'Your 30-Day\nPost Plan' },
    arc,
    map,
    {
      type: 'board',
      title: 'Week by Week',
      html: cards([1, 2, 3, 4].map(weekCard), { x: 50, y: 74, w: 950, h: 590, cols: 4 }),
      ink: i.text(980, 712, 'full hooks + examples in the 30-Day Post Plan PDF', 'purple', 26, { anchor: 'end' }),
      notes: {
        say: [
          'Here is every post. Each one has a topic and a structure from Module 4.',
          'The full hooks, examples for law and finance, and calls to action are in the separate 30-Day Post Plan document. You can also import the CSV straight into your content calendar sheet.',
          'Swap topics for your practice area, but keep the order and the mix.',
        ],
      },
    },
    { type: 'notes' },
    daily,
    review,
    {
      type: 'statement',
      text: 'Done beats perfect.\nPost all 13, then judge.',
      notes: { say: ['You cannot judge content off three posts. Commit to the 13, then review on day 30.'] },
    },
    {
      type: 'sheet',
      title: 'Your Plan',
      cells: [
        { x: 50, y: 70, w: 90, h: 40, label: 'Day' },
        { x: 140, y: 70, w: 420, h: 40, label: 'Topic (your version)' },
        { x: 560, y: 70, w: 90, h: 40, label: 'Funnel' },
        { x: 650, y: 70, w: 85, h: 40, label: 'Script' },
        { x: 735, y: 70, w: 85, h: 40, label: 'Filmed' },
        { x: 820, y: 70, w: 90, h: 40, label: 'Edited' },
        { x: 910, y: 70, w: 90, h: 40, label: 'Posted' },
        ...plan.flatMap((p, r) => [
          { x: 50, y: 110 + r * 42, w: 90, h: 42, html: `<div class="pre"><b>${p.dow} ${p.day}</b></div>` },
          { x: 140, y: 110 + r * 42, w: 420, h: 42 },
          { x: 560, y: 110 + r * 42, w: 90, h: 42, html: `<div class="pre">${p.funnel}</div>` },
          { x: 650, y: 110 + r * 42, w: 85, h: 42 },
          { x: 735, y: 110 + r * 42, w: 85, h: 42 },
          { x: 820, y: 110 + r * 42, w: 90, h: 42 },
          { x: 910, y: 110 + r * 42, w: 90, h: 42 },
        ]),
      ],
      ink:
        i.text(152, 140, 'Why I left a big firm', 'blue', 26) +
        i.text(152, 182, '"Will I lose the house?" + 2 more', 'blue', 26) +
        i.text(152, 224, 'The 50/50 myth', 'blue', 26) +
        [0, 1, 2].map((r) => i.tick(678, 132 + r * 42, 'dkgreen', 0.55) + i.tick(762, 132 + r * 42, 'dkgreen', 0.55) + i.tick(850, 132 + r * 42, 'dkgreen', 0.55)).join('') +
        i.tick(940, 132, 'dkgreen', 0.55),
      notes: {
        say: ['Write your version of each topic, then tick it through script, filmed, edited, posted. Stick it on the wall.'],
        draw: ['Fill in the first three rows.'],
      },
    },
    { type: 'notes' },
    {
      type: 'next',
      checklist: [
        'Rewrite the 13 topics for your practice',
        'Draft all 13 scripts with Claude (Module 4)',
        'Book + run your shoot day (Module 5)',
        'Edit + schedule with Claude (Modules 6-7)',
        'Day 29: review, then book the next shoot',
      ],
      notes: { say: ['That is the whole system. Film once, Claude edits, Claude helps post, you review on day 30, and you go again.'] },
    },
    { type: 'end' },
  ],
};
