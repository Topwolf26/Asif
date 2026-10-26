const { ink: i } = require('../lib');
const plan = require('../plan');
const { arc, map, daily, review, weekPage, FUNNEL_INK } = require('../plan-slides');

module.exports = {
  number: 30,
  file: '30-Day-Post-Plan',
  title: '30-Day Post Plan',
  noGuide: true,
  slides: [
    { type: 'cover', kicker: 'Your', title: '30-Day Post Plan' },
    arc,
    map,
    weekPage(1, 'Week 1: Introduce'),
    weekPage(2, 'Week 2: Educate'),
    weekPage(3, 'Week 3: Prove'),
    weekPage(4, 'Week 4: Convert'),
    daily,
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
    review,
    { type: 'end' },
  ],
};
