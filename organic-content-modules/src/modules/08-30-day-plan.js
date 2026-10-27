const { ink: i } = require('../lib');
const plan = require('../plan');
const { howItWorks, ladder, principles, weeklySchedule, pillarWeek, monthCalendar, postPage, reviewPrinted } = require('../plan-slides');

// Module 8 teaches the client hand-out (src/extras/30-day-post-plan.js) page by page
const withNotes = (slide, say) => ({ ...slide, notes: { say } });

module.exports = {
  number: 8,
  title: 'Your 30-Day Post Plan',
  runtime: '12 to 15 min',
  outcome: 'The firm has its next 30 days planned: one post a day built on the Module 3 pillars, a weekly schedule, a script for every post, and a way to review and plan month two.',
  slides: [
    { type: 'cover', title: 'Your 30-Day\nPost Plan' },

    { type: 'divider', lead: 'The BIG', word: 'Problems', tone: 'problem' },
    { type: 'point', tone: 'problem', n: 1, text: "Starting Is Easy. Keeping Going Isn't.", notes: { say: ['Most firms post for two weeks, get busy, and stop. Not because content failed, but because nobody planned week three.'] } },
    { type: 'point', tone: 'problem', n: 2, text: 'Deciding What to Post Every Day', notes: { say: ['Every "what should I post today?" is a decision, and decisions are what busy lawyers skip.'] } },
    { type: 'point', tone: 'problem', n: 3, text: 'No Way to Tell What Worked', notes: { say: ['Without a review, month two is a guess, and most firms quit before they find what works.'] } },

    { type: 'divider', word: 'OPPORTUNITY', tone: 'idea' },
    { type: 'point', tone: 'idea', n: 1, text: 'Your Next 30 Days, Already Planned', notes: { say: ['Every post is chosen, scripted and dated. You do not decide anything, you just do it.'] } },
    { type: 'point', tone: 'idea', n: 2, text: 'One Post a Day, Already Written', notes: { say: ['Thirty posts, one every morning at 7:30, each with its first line, its points and its caption written for you. About four hours a week.'] } },
    { type: 'point', tone: 'idea', n: 3, text: 'Review on Day 30, Then Go Again', notes: { say: ["Keep what worked, fix what did not, and book next month's shoot day."] } },

    withNotes(pillarWeek, [
      'Remember the pillars from Module 3. Your 30 days are built on them: every day of the week has a pillar, so you never decide what to post.',
      'Monday value, Tuesday your character, Wednesday your series, Thursday proof, Friday the team, Saturday your day, and Sunday rotates.',
    ]),
    withNotes(howItWorks, [
      'This is the hand-out you get with this module: the 30-Day Post Plan. Here is how it works.',
      'Before day one you film twenty-three of the posts in one shoot day. The other seven you film as they happen. Every Monday you review last week and schedule this one. One post goes out every day. Every Sunday you improve one thing.',
      "Client stories: always remove names and anything identifying, get the client's OK, and check your conduct and advertising rules.",
    ]),
    withNotes(ladder, [
      'Before the schedule, the guiding principle: bare minimum one post a week, max play one a day.',
      'If thirty posts feels like a lot, start with the Monday post each week, then Monday, Wednesday and Friday, then every day.',
    ]),
    withNotes(principles, [
      'Two limiting beliefs you will hit: not liking how you look on camera, and wanting one more edit. Both are normal. Post anyway, then get feedback.',
      'No analysis paralysis, and review once a week. Bring it up with us on our weekly call.',
    ]),
    withNotes(weeklySchedule, [
      'Here is your week, the same way I block mine. Monday morning, thirty minutes: Claude reviews last week, then you schedule the three posts.',
      'A post goes out every morning at 7:30. Block fifteen minutes after it to reply, because the first hour matters.',
      'Fifteen minutes at lunch every weekday to reply and comment on five local accounts. Stories on Wednesday, a look back on Sunday. About four hours a week.',
      'Put these in your calendar as recurring events now, like a client meeting.',
    ]),
    withNotes(monthCalendar, [
      'And here is the month. Every day has one job and a tick box.',
      'Thirty posts, colour-coded by pillar. Mostly connection and value, and only two invitation posts. Give publicly, sell privately.',
      'The ones marked "film on the day" are the ones you capture as they happen. On day 30, score every post and book next month\'s shoot.',
    ]),
    withNotes({ ...postPage(plan[1]), title: 'Every Post, Planned' }, [
      'Every one of the thirty posts gets a page like this.',
      'The whole script, word for word, then the on-screen text and a caption you can paste.',
      'Where there is one, you also get a real lawyer video in the same format, with the views it got. Watch it before you film yours.',
      'Tick it through scripted, filmed, edited, posted.',
    ]),
    withNotes(reviewPrinted, [
      'On day 30, put every post on this grid: views along the bottom, enquiries up the side.',
      'Views and enquiries: double down, film three more like it. Enquiries but low views: great topic, better hook. Views but no enquiries: a stronger call to action. Neither: kill it and move on.',
      'Paste your numbers into Claude with the weekly review prompt from Module 7 and it will sort them for you.',
    ]),
    {
      type: 'statement',
      text: 'Done beats perfect.\nPost all 30, then judge.',
      notes: { say: ['You cannot judge content off three posts. Commit to the thirty, then review on day 30.'] },
    },

    {
      type: 'sheet',
      title: 'Your First Week',
      minutes: 15,
      cells: [
        { x: 50, y: 70, w: 90, h: 40, label: 'Day' },
        { x: 140, y: 70, w: 420, h: 40, label: 'Your version of the post' },
        { x: 560, y: 70, w: 90, h: 40, label: 'Pillar' },
        { x: 650, y: 70, w: 85, h: 40, label: 'Script' },
        { x: 735, y: 70, w: 85, h: 40, label: 'Filmed' },
        { x: 820, y: 70, w: 90, h: 40, label: 'Edited' },
        { x: 910, y: 70, w: 90, h: 40, label: 'Posted' },
        ...plan.slice(0, 7).flatMap((p, r) => [
          { x: 50, y: 110 + r * 78, w: 90, h: 78, html: `<div class="pre"><b>${p.dow} ${p.day}</b></div>` },
          { x: 140, y: 110 + r * 78, w: 420, h: 78, html: `<div class="pre">${p.short}</div>` },
          { x: 560, y: 110 + r * 78, w: 90, h: 78, html: `<div class="pre">${p.pillar}</div>` },
          { x: 650, y: 110 + r * 78, w: 85, h: 78 },
          { x: 735, y: 110 + r * 78, w: 85, h: 78 },
          { x: 820, y: 110 + r * 78, w: 90, h: 78 },
          { x: 910, y: 110 + r * 78, w: 90, h: 78 },
        ]),
      ],
      ink:
        i.text(152, 166, 'Signing the house over too early', 'blue', 26) +
        i.text(152, 244, 'Why I left a big firm', 'blue', 26) +
        i.text(152, 322, 'Law in 30 Seconds: consent orders', 'blue', 26) +
        [0, 1, 2].map((r) => i.tick(678, 150 + r * 78, 'dkgreen', 0.55) + i.tick(762, 150 + r * 78, 'dkgreen', 0.55) + i.tick(850, 150 + r * 78, 'dkgreen', 0.55)).join('') +
        i.tick(940, 150, 'dkgreen', 0.55),
      notes: {
        say: ['Write your own version of each of this week\'s seven posts, then tick it through script, filmed, edited, posted. Do the same every Monday for the week ahead.'],
        draw: ['Fill in the first three rows.'],
      },
    },
    {
      type: 'next',
      checklist: [
        'Rewrite the 30 posts for your practice',
        'Draft the 23 shoot-day scripts with Claude (Module 4)',
        'Book + run your shoot day (Module 5)',
        'Edit + schedule week 1 with Claude (Modules 6-7)',
        'Post every day at 7:30am. Tick it off',
        'Day 30: review, then book the next shoot',
      ],
      notes: { say: ['That is the whole system. Film once, Claude edits, Claude helps post, you review on day 30, and you go again.'] },
    },
    { type: 'notes' },
  ],
};
