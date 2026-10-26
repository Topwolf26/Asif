const { ink: i } = require('../lib');
const plan = require('../plan');
const { arc, howItWorks, weeklySchedule, monthCalendar, postPage, reviewPrinted } = require('../plan-slides');

// Module 8 teaches the client hand-out (src/extras/30-day-post-plan.js) page by page
const withNotes = (slide, say) => ({ ...slide, notes: { say } });

module.exports = {
  number: 8,
  title: 'Your 30-Day Post Plan',
  runtime: '12 to 15 min',
  outcome: 'The firm has its next 30 days planned: a weekly schedule, a job for every day, a script for every post, and a way to review and plan month two.',
  slides: [
    { type: 'cover', title: 'Your 30-Day\nPost Plan' },

    { type: 'divider', lead: 'The BIG', word: 'Problems', tone: 'problem' },
    { type: 'point', tone: 'problem', n: 1, text: "Starting Is Easy. Keeping Going Isn't.", notes: { say: ['Most firms post for two weeks, get busy, and stop. Not because content failed, but because nobody planned week three.'] } },
    { type: 'point', tone: 'problem', n: 2, text: 'Deciding What to Post Every Day', notes: { say: ['Every "what should I post today?" is a decision, and decisions are what busy lawyers skip.'] } },
    { type: 'point', tone: 'problem', n: 3, text: 'No Way to Tell What Worked', notes: { say: ['Without a review, month two is a guess, and most firms quit before they find what works.'] } },

    { type: 'divider', word: 'OPPORTUNITY', tone: 'idea' },
    { type: 'point', tone: 'idea', n: 1, text: 'Your Next 30 Days, Already Planned', notes: { say: ['Every post is chosen, scripted and dated. You do not decide anything, you just do it.'] } },
    { type: 'point', tone: 'idea', n: 2, text: 'One Job a Day. Most Take 15 Minutes.', notes: { say: ['Post, reply, a couple of stories, log the numbers. About three hours a week.'] } },
    { type: 'point', tone: 'idea', n: 3, text: 'Review on Day 30, Then Go Again', notes: { say: ["Keep what worked, fix what did not, and book next month's shoot day."] } },

    arc,
    withNotes(howItWorks, [
      'This is the hand-out you get with this module: the 30-Day Post Plan. Here is how it works.',
      'Before day one you film all thirteen posts in one shoot day. Every Monday you review last week and schedule this one. Every day has one job. On day 29 you review and go again.',
      "Client stories: always remove names and anything identifying, get the client's OK, and check your conduct and advertising rules.",
    ]),
    withNotes(weeklySchedule, [
      'Here is your week, the same way I block mine. Monday morning, thirty minutes: Claude reviews last week, then you schedule the three posts.',
      'Posts go out Tuesday and Thursday at 7:30 in the morning, and Sunday at 7 at night. Block fifteen minutes after each one to reply, because the first hour matters.',
      'Fifteen minutes at lunch every weekday to reply and comment on five local accounts. Stories on Wednesday, numbers on Friday. About three hours a week.',
      'Put these in your calendar as recurring events now, like a client meeting.',
    ]),
    withNotes(monthCalendar, [
      'And here is the month. Every day has one job and a tick box.',
      'Thirteen posts: orange is reach, blue is connect, green is convert. We never open with a convert post. We earn it.',
      "Day 29 is the review and booking next month's shoot. Day 30 is your last post: what it costs to work with you.",
    ]),
    withNotes({ ...postPage(plan[0], 1), title: 'Every Post, Planned' }, [
      'Every one of the thirteen posts gets a page like this.',
      'What to say first, the three points to cover, how to end, the on-screen text and a caption you can paste.',
      'The blue box is a real lawyer video in the same format, with the views it got. Watch it before you film yours.',
      'Tick it through scripted, filmed, edited, scheduled.',
    ]),
    withNotes(reviewPrinted, [
      'On day 30, put every post on this grid: views along the bottom, enquiries up the side.',
      'Views and enquiries: double down, film three more like it. Enquiries but low views: great topic, better hook. Views but no enquiries: a stronger call to action. Neither: kill it and move on.',
      'Paste your numbers into Claude with the weekly review prompt from Module 7 and it will sort them for you.',
    ]),
    {
      type: 'statement',
      text: 'Done beats perfect.\nPost all 13, then judge.',
      notes: { say: ['You cannot judge content off three posts. Commit to the thirteen, then review on day 30.'] },
    },

    {
      type: 'sheet',
      title: 'Your Plan',
      minutes: 15,
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
    { type: 'notes' },
  ],
};
