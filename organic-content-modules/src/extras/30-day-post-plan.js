const plan = require('../plan');
const { howItWorks, ladder, principles, weeklySchedule, monthCalendar, weekReview, postPage, reviewPrinted } = require('../plan-slides');

// the client hand-out: "your next 30 days are planned for you", one post a day
const WEEKS = [
  [1, 'Week 1 · Days 1-7', 'Introduce.\nLet them meet you.'],
  [2, 'Week 2 · Days 8-14', "Educate.\nAnswer what they're Googling."],
  [3, 'Week 3 · Days 15-21', 'Prove it.\nShow the work.'],
  [4, 'Week 4 · Days 22-30', 'Invite them in.\nShow them how to start.'],
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
    { type: 'shot', text: 'Bare minimum:\nonce a week.\n\nMax play:\nonce a day.' },
    ladder,
    principles,
    weeklySchedule,
    monthCalendar,
    ...WEEKS.flatMap(([w, kicker, text]) => [
      { type: 'shot', theme: 'white', kicker, text },
      ...plan.filter((p) => p.week === w).flatMap((p) => (p.day === w * 7 ? [postPage(p), weekReview(w)] : [postPage(p)])),
    ]),
    reviewPrinted,
    { type: 'shot', text: 'Done beats perfect.\nPost all 30, then judge.' },
    { type: 'notes' },
  ],
};
