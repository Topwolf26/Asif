// Magnify Growth × BPAG: the 30-day post plan. One post a day on the
// four pillars, for an accounting firm with a lot of farming clients.
// Filmed on an iPhone with a simple mic (or wired headphones).
// Build: node src/build.js 40  ->  pdf/clients/
const { esc } = require('../lib');
const { makePages, LAW_TEXT } = require('../plan-slides');

const PILLARS = {
  Connection: { color: '#0E7490', ask: 'Do I like you? Do you get farming and business like I do?', trap: 'Disconnect: only tax tips, so they never meet you or the team.' },
  Value: { color: '#4D7C0F', ask: 'Is this helpful? Do I understand my tax better now?', trap: 'Lecturing: jargon, too much detail, five rules in one video.' },
  Proof: { color: '#B45309', ask: 'Are you legit? Who have you actually helped?', trap: 'Disbelief: smart talk, but no sign of real clients or results.' },
  Invitation: { color: '#7C2D12', ask: 'How do I get started with BPAG?', trap: 'Selling: a pitch in every post. Give publicly, sell privately.' },
};

const TH = 'Talking head, iPhone';
const RULES = 'Check the current ATO rules on the day you film. General information only, not advice.';
const DOW = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// [day, pillar, type, short, hook, format, length, batch-filmed, [beats], CTA, on-screen text, caption, note]
const POSTS = [
  [1, 'Value', 'Pain points', 'The good-season tax bill', 'The tax bill that catches farmers out isn\'t after a bad year. It\'s after a good one.', TH, '30-45 sec', true,
    ['A big season means a big taxable income, and the bill lands months later.', 'There are tools for this: farm management deposits and income averaging.', 'Plan before 30 June, not after.'],
    'Follow for farm tax, made simple.', 'Why a good season can hurt at tax time', 'The tax bill that catches farmers out comes after a good year, not a bad one. Here is how to plan for it. Follow for more farm tax, made simple.'],
  [2, 'Connection', 'Character', 'Why I became an accountant', 'I didn\'t become an accountant to do tax returns. Here\'s why I did.', TH, '30-45 sec', true,
    ['The moment you knew this was your work. One real story.', 'What you saw clients struggle with that you wanted to fix.', 'Who you help now, and how.'],
    'Follow if you run a farm or a business.', 'Why I became an accountant', 'I didn\'t become an accountant to do tax returns. Here is why I did, and who I help now.'],
  [3, 'Value', 'Simplifying concepts', 'Farm Tax in 30 Seconds #1', 'Farm Tax in 30 Seconds: what a farm management deposit actually is.', `${TH} + text on screen`, '30 sec', true,
    ['Money you set aside in a good year, and claim as a deduction that year.', 'It is taxed when you take it out, ideally in a tougher year.', 'The basics: a $1,000 minimum, an $800,000 cap, and an off-farm income test.'],
    'Follow for episode 2.', 'Farm management deposits, explained', 'Farm Tax in 30 Seconds, episode 1: farm management deposits. General information only, not advice. Follow for episode 2.', RULES],
  [4, 'Proof', 'Case study', 'A farming family, 12 months on', 'A farming family came to us with [problem]. Twelve months later, [result].', TH, '45-60 sec', true,
    ['Start with the result (details changed, with their OK).', 'What was making it hard: the books, the cashflow, the tax.', 'The 2 or 3 things you changed together.'],
    'DM "CHAT" if this sounds like your farm.', '12 months with a farming family', 'A farming family came to us with [problem]. Twelve months later, [result]. Details changed, shared with permission.'],
  [5, 'Connection', 'Team', 'Meet [team member]', 'This is [name]. If your BAS keeps you up at night, she\'s who you want.', 'Collab, iPhone', '30 sec', true,
    ['Introduce them by name and role.', 'The question they get asked most, and their answer.', 'Something human: why they do this work.'],
    'Follow to meet more of the team.', 'Meet [name]', 'Meet [name], who looks after [area] at BPAG. If your BAS keeps you up at night, she is who you want.'],
  [6, 'Connection', 'Day', 'On the farm with a client', 'Not every accountant works from a desk. Come with me to a client\'s farm.', 'B-roll + voiceover, iPhone', '20-30 sec', false,
    ['The drive out and the farm gate.', 'Walking the shed or the paddock with the client (with their OK).', 'One thing you learn on farm that you\'d never see in the books.'],
    'Follow to see more behind the scenes.', 'An accountant on the farm', 'Not every accountant works from a desk. A morning on a client\'s farm (shared with their OK).'],
  [7, 'Value', 'Challenges / obstacles', 'Payday Super is here', 'Since 1 July, super has to be paid every payday. Is your business ready?', TH, '30-45 sec', true,
    ['The change: super is due within 7 business days of each payday, not quarterly.', 'What\'s gone: the quarterly rhythm and the ATO\'s free small business clearing house.', 'The fix: set your payroll to pay super with every pay run.'],
    'Save this and send it to your bookkeeper.', 'Payday Super: what changed', 'Since 1 July 2026, super is paid with every payday, not every quarter. Here is what that means for your business. Save this for later.', 'Payday Super started 1 July 2026. Check ato.gov.au/paydaysuper for the latest before filming.'],
  [8, 'Value', 'Pain points', 'The new $3 million super tax', 'There\'s a new tax on super balances over $3 million. Here\'s who it actually hits.', TH, '45-60 sec', true,
    ['What it is: Division 296, which started on 1 July 2026.', 'How it works: an extra 15% on earnings for balances over $3 million, and another 10% over $10 million.', 'Who should talk to their adviser now: anyone near $3 million, including farmers with farm property in their SMSF.'],
    'Follow for straight answers on super.', 'The $3 million super tax, in plain English', 'There is a new tax on super balances over $3 million. Here is who it actually affects. General information only, not advice.', 'Keep it general: explain the rule, don\'t tell anyone what to do with their super. First assessments use balances at 30 June 2027; check ato.gov.au before filming.'],
  [9, 'Connection', 'Character', 'My take on the news', 'Everyone\'s talking about [this week\'s tax news]. Here\'s what it actually means for you.', TH, '30-45 sec', true,
    ['The news in one line.', 'What it actually means for farmers and business owners.', 'Your take: what you think should happen.'],
    'Agree or disagree? Tell me in the comments.', 'My take: [news]', 'Everyone is talking about [news]. Here is what it actually means for you, and what I think.', 'Pick whatever tax or super story is in the news that week. General information only, not advice.'],
  [10, 'Value', 'Simplifying concepts', 'Farm Tax in 30 Seconds #2', 'Farm Tax in 30 Seconds: how income averaging works.', `${TH} + text on screen`, '30 sec', true,
    ['Farm income goes up and down. Tax rates don\'t care.', 'Income averaging smooths your tax over up to five years.', 'Who it\'s for: primary producers. Ask if you\'re already using it.'],
    'Follow for episode 3.', 'Income averaging, explained', 'Farm Tax in 30 Seconds, episode 2: income averaging for primary producers. General information only, not advice.', RULES],
  [11, 'Proof', 'Testimonial', 'A client in their words', 'Don\'t take it from me. Here\'s what [client] said.', 'Client on camera, iPhone', '20-45 sec', false,
    ['Ask: what was going on when you called us?', 'Ask: what was it like working with BPAG?', 'Ask: what would you tell another farmer?'],
    'If this is you, DM "CHAT".', 'In their words', 'Don\'t take it from me. Here is what [client] said (shared with permission).', 'Get their written OK to post before you film.'],
  [12, 'Connection', 'Team', 'Ask our bookkeeper', 'I asked our bookkeeper the one mistake she sees every BAS season.', 'Collab, iPhone', '30-45 sec', true,
    ['You ask the question on camera.', 'Your bookkeeper answers in plain English.', 'One thing to fix before the next BAS.'],
    'Follow for more from the team.', 'The BAS mistake we see every quarter', 'I asked our bookkeeper the one mistake she sees every BAS season. Here is the answer.'],
  [13, 'Connection', 'Day', 'Inside the office', 'This is what BPAG actually looks like on a Tuesday.', 'B-roll + voiceover, iPhone', '20-30 sec', false,
    ['Morning: first coffee, the team arriving.', 'Midday: real work on screen (no client details).', 'End of day: one thing the team got done.'],
    'Follow to see more behind the scenes.', 'A Tuesday at BPAG', 'This is what BPAG actually looks like on a Tuesday.', 'Keep client names and screens out of shot.'],
  [14, 'Invitation', 'Resource', 'Free farm tax checklist', 'I made a tax planning checklist for farmers. Comment FARM and I\'ll send it.', TH, '20-30 sec', true,
    ['The problem: tax planning starts in June, when it\'s too late.', 'Three things on the checklist.', 'How to get the full list.'],
    'Comment FARM and I\'ll send it to you.', 'Free farm tax checklist', 'I made a tax planning checklist for farmers. Comment FARM and I will send it to you.', 'Have the checklist ready to send (we can set up the auto-reply).'],
  [15, 'Value', 'Challenges / obstacles', 'Tough season? Do this now', 'Tough season? Here are 3 things to do with your accountant now, not in June.', TH, '30-45 sec', true,
    ['Look at cashflow for the next 6 months, not just last year.', 'Check whether drawing on a farm management deposit makes sense.', 'If tax is due, talk to the ATO early about a payment plan.'],
    'Save this for later.', 'Tough season? 3 things to do now', 'Tough season? Here are 3 things to do with your accountant now, not in June. General information only, not advice.'],
  [16, 'Connection', 'Character', 'Unpopular opinion', 'Unpopular opinion: your accountant should talk to you more than once a year.', TH, '20-30 sec', true,
    ['State the opinion in one sentence.', 'Why you believe it: one real example.', 'What you do about it at BPAG.'],
    'Agree or disagree? Comment below.', 'Unpopular opinion', 'Unpopular opinion: your accountant should talk to you more than once a year. Agree or disagree?'],
  [17, 'Value', 'Simplifying concepts', 'Farm Tax in 30 Seconds #3', 'Farm Tax in 30 Seconds: the $20,000 instant asset write-off.', `${TH} + text on screen`, '30 sec', true,
    ['What it is: claim eligible assets under $20,000 straight away.', 'Who it\'s for: businesses with turnover under $10 million.', 'The catch: it\'s per asset, and it has to be installed and ready to use.'],
    'Follow for episode 4.', 'The instant asset write-off, explained', 'Farm Tax in 30 Seconds, episode 3: the $20,000 instant asset write-off. General information only, not advice.', 'Reported as made permanent from 1 July 2026. Confirm the current threshold with the ATO before filming.'],
  [18, 'Proof', 'Case study', 'Handing the farm on', 'Is it possible to hand the farm to the next generation without a huge tax bill? Here\'s how one family started.', TH, '45-60 sec', true,
    ['The situation (details changed, with their OK).', 'What made it hard: tax, stamp duty, and being fair to every child.', 'The first steps you took together.'],
    'DM "CHAT" if this is your family.', 'Handing the farm to the next generation', 'Is it possible to hand the farm on without a huge tax bill? Here is how one family started (details changed).'],
  [19, 'Connection', 'Team', 'The question we get most', 'We asked everyone at BPAG the question they get asked most.', 'Collab, quick cuts, iPhone', '30 sec', false,
    ['Ask each person in the office the question they get most.', 'Quick cuts, one answer each.', 'End on the most honest one.'],
    'Follow to meet the team.', 'The question we get asked most', 'We asked everyone at BPAG the question they get asked most.'],
  [20, 'Connection', 'Day', 'Outside the office', 'This is what I do when I\'m not doing tax.', 'B-roll + voiceover, iPhone', '20 sec', false,
    ['Show what you do to switch off: family, sport, the farm, the footy.', 'Why it matters in a job like this.', 'One line on what it gives your clients.'],
    'Follow along.', 'Outside the office', 'This is what I do when I am not doing tax.'],
  [21, 'Proof', 'Screenshots', 'This message made our week', 'This message made our whole week.', 'Screenshot + voiceover, iPhone', '15-20 sec', false,
    ['Show the message (name blurred, with permission).', 'What was going on for them when they came to you.', 'What it means to the team.'],
    'If you\'re where they were, DM "CHAT".', 'This message made our week', 'This message made our whole week. Name blurred, shared with permission.', 'Blur the name and get their OK first.'],
  [22, 'Value', 'Challenges / obstacles', '3 signs you\'ve outgrown your structure', '3 signs your farm has outgrown its business structure.', `${TH} + text on screen`, '30-45 sec', true,
    ['Sign 1: you\'re paying top-rate tax on profit you leave in the business.', 'Sign 2: the next generation or a new partner is coming in.', 'Sign 3: you\'re worried about protecting assets.'],
    'Save this for later.', '3 signs your farm has outgrown its structure', '3 signs your farm has outgrown its business structure. General information only, not advice.'],
  [23, 'Connection', 'Character', 'What I wish clients knew', '[X] years in accounting. Here\'s what I wish every client knew on day one.', TH, '30-45 sec', true,
    ['How long you have done this.', 'The one thing you wish every client knew on day one.', 'Why it changes how things go.'],
    'Follow for more.', 'What I wish every client knew', '[X] years in accounting. Here is what I wish every client knew on day one.'],
  [24, 'Value', 'Simplifying concepts', 'Farm Tax in 30 Seconds #4', 'Farm Tax in 30 Seconds: the first step in succession planning.', `${TH} + text on screen`, '30 sec', true,
    ['Start years before you want to step back.', 'Get everyone\'s goals on the table: the farm, the money, the family.', 'Then look at tax, structure and stamp duty together.'],
    'Follow for the next series.', 'Succession planning: step one', 'Farm Tax in 30 Seconds, episode 4: the first step in succession planning. General information only, not advice.'],
  [25, 'Proof', 'Case study', 'From shoebox to sorted', 'From a shoebox of receipts to [result] in [X] months.', TH, '45-60 sec', true,
    ['Where they started: the shoebox, the stress, the late lodgements.', 'The 3 things you set up.', 'Where they are now.'],
    'DM "CHAT" to get yours sorted.', 'From shoebox to sorted', 'From a shoebox of receipts to [result] in [X] months (details changed, shared with permission).'],
  [26, 'Connection', 'Team', 'Two accountants, one question', 'Two accountants, two specialties, one question: [question].', 'Collab, iPhone', '45 sec', true,
    ['Ask the question you both get asked.', 'Each of you answers from your specialty.', 'Where your answers agree.'],
    'Follow for more from the team.', 'Two accountants, one question', 'Two accountants, two specialties, one question: [question].'],
  [27, 'Connection', 'Day', 'Field day', 'We\'re at [field day] today. Come and say hi.', 'B-roll + voiceover, iPhone', '20-30 sec', false,
    ['The stand, the crowd, the morning.', 'Two quick chats with farmers (with their OK).', 'Where to find you today.'],
    'Come and say hi at [site number].', 'Find us at [field day]', 'We are at [field day] today. Come and say hi at [site number].', 'If there\'s no field day this month, film a local event or a client visit instead.'],
  [28, 'Invitation', 'Events', 'Free farm tax night', 'We\'re running a free farm tax and succession night in [town] on [date]. Comment SEAT for details.', TH, '20-30 sec', true,
    ['What it is: a free night, no sales pitch.', 'Who it\'s for and what you\'ll cover.', 'Where, when, and how to get a seat.'],
    'Comment SEAT and I\'ll send the details.', 'Free farm tax night: [date]', 'We are running a free farm tax and succession night in [town] on [date]. No pitch, just answers. Comment SEAT for details.'],
  [29, 'Value', 'Simplifying concepts', 'The tax deduction myth', 'Everyone thinks a tax deduction means you get the money back. It doesn\'t.', TH, '20-30 sec', true,
    ['Say the myth like you believe it.', 'What a deduction actually does: it lowers your taxable income.', 'A quick example: a $1,000 deduction at a 30% rate saves you about $300.'],
    'Follow for more myths.', 'MYTH: a deduction gets you the money back', 'Everyone thinks a tax deduction means you get the money back. It doesn\'t. Here is what actually happens.'],
  [30, 'Connection', 'Character', '30 days: what I learned', 'I posted every day for 30 days. Here\'s what happened.', TH, '30-45 sec', true,
    ['Say it: you posted every day for 30 days.', 'What happened: one number and one surprise.', 'What you\'re doing next month.'],
    'Follow for month two.', '30 days of posting: what happened', 'I posted every day for 30 days. Here is what happened, and what is next.'],
];

// Accountants' Shorts in the same format. Views read from each YouTube page on
// 26 Oct 2026; re-check before quoting them.
const EXAMPLES = {
  1: ['Jasmine DiLucci, tax attorney + CPA (US)', '3.5M views', '"How Taxes Change when you Make More Money": one concept, in plain English.', 'youtube.com/shorts/UGKkWz44xN0'],
  2: ['Devamsha, chartered accountant (UK)', '492K views', '"What I wish I knew before becoming an accountant": her story, straight to camera.', 'youtube.com/shorts/ChpQnQEHNvM'],
  3: ['Jasmine DiLucci, tax attorney + CPA (US)', '3.2M views', '"Can Capital Losses Offset Capital Gains?": a tax rule explained in seconds.', 'youtube.com/shorts/ZiNbvHJ-FQg'],
  4: ['Karlton Dennis, tax strategist (US)', '368K views', 'A 24-year-old client who saved $160,000 in tax: the result first, then how.', 'youtube.com/shorts/Wfed_Mj9w08'],
  7: ['Karlton Dennis, tax strategist (US)', '1.8M views', '"Massive IRS rule change": a new rule and what it means for businesses.', 'youtube.com/shorts/AY0jpy1-59Y'],
  8: ['Jasmine DiLucci, tax attorney + CPA (US)', '1.4M views', '"The TRUTH about Money Inside your 401(k)": retirement savings (their super), explained.', 'youtube.com/shorts/cZMVuGnAAtE'],
  9: ['Sherman, My CPA Coach (US)', '4.2M views', '"Tax Plan in 60 Seconds! CPA Explains": the news, then what it means for you.', 'youtube.com/shorts/1qyYjXaezDc'],
  13: ['The_Westy_Lifestyle, accountant (US)', '366K views', '"A Day In The Life As A 25 Year Old Accountant", working through tax returns.', 'youtube.com/shorts/XQCIuAnWQwM'],
  16: ['Karlton Dennis, tax strategist (US)', '227K views', '"401k is a TRAP": a hot take on a product everyone uses.', 'youtube.com/shorts/RDYsJ4oP08U'],
  17: ['Jasmine DiLucci, tax attorney + CPA (US)', '1.9M views', '"Do Cars Over 6,000 Pounds get a Full Write Off?": a write-off rule, explained.', 'youtube.com/shorts/Pgy5TOB2Oe0'],
  19: ['Jasmine DiLucci, tax attorney + CPA (US)', '547K views', '"Reading Tax Law for Fun": a bit of accountant humour.', 'youtube.com/shorts/mwhYAFvE_lk'],
  22: ['Karlton Dennis, tax strategist (US)', '2.2M views', '"LLC vs S Corp": business structures compared, simply.', 'youtube.com/shorts/n3DzW-CyWLk'],
  25: ['Karlton Dennis, tax strategist (US)', '95K views', '"I Helped This Couple Save $1,000,000 On Their Taxes": a client result.', 'youtube.com/shorts/S0mWLsAHiBY'],
  29: ['Jasmine DiLucci, tax attorney + CPA (US)', '2.7M views', '"Does Putting Something in a Video Make it Deductible?": a deduction myth, busted.', 'youtube.com/shorts/KsYbN_00XXQ'],
};

const plan = POSTS.map(([day, pillar, type, short, hook, format, length, shoot, beats, cta, onscreen, caption, note]) => ({
  day, pillar, type, short, hook, format, length, shoot, beats, cta, onscreen, caption, note,
  example: EXAMPLES[day] && { who: EXAMPLES[day][0], views: EXAMPLES[day][1], hook: EXAMPLES[day][2], url: EXAMPLES[day][3], platform: 'YouTube Shorts' },
  dow: DOW[(day - 1) % 7],
  week: Math.min(4, Math.ceil(day / 7)),
  time: '7:30am',
}));

const BATCH = '#65A30D';
const pages = makePages(plan, PILLARS, {
  ...LAW_TEXT,
  how: (shoot, total) => [
    ['Twice a week', 'Batch film', `Film the ${shoot} talking-head posts in batches: 3 at a time, Monday and Thursday mornings at the office. The other ${total - shoot} you film as they happen.`],
    ['Every Monday', 'Plan the week', 'Check last week\'s numbers, then edit and schedule the week\'s 7 posts. Thirty minutes.'],
    ['Every day', 'One post, 7:30am', 'One post goes out every morning. Reply to comments for 15 minutes after it goes live. Tick it off.'],
    ['Every Sunday', 'Improve one thing', 'Look back at the week, be honest, and improve one thing. On day 30, score every post on the review page.'],
  ],
  fine: '<b>Keep it general.</b> Explain the rules, not what one person should do. Super and investment content can be financial product advice, so unless you\'re licensed for it, say "general information only, not advice" and point people to a meeting. Client stories need written consent and no identifying details.',
  weekJobs: ['A pain point or challenge your clients face.', 'Your opinion, or your take on this week\'s tax news.', 'Your "Farm Tax in 30 Seconds" series.', 'A result, a review or a client message.', 'A collab post with someone on the team.', 'Document your day: the office, a farm visit.', 'Week 1 value, week 2 invitation, week 3 proof, week 4 invitation.'],
  weekNote: '<b>About 3½ hours a week.</b> Put these blocks in your calendar as recurring events now, like a client meeting. Batch filming on Monday and Thursday mornings covers the talking-head posts.',
  filmLabel: ['Batch film', 'Film on the day'],
  calNote: '<b>Film on the day</b> = not in a batch session.',
  planBlock: ['PLAN', "Check last week's numbers. Schedule the week's 7 posts"],
  extraBlocks: [
    [0, 10, 0.5, BATCH, 'BATCH FILM', '3 videos at the office'],
    [3, 10, 0.5, BATCH, 'BATCH FILM', '3 videos at the office'],
  ],
});

// iPhone + simple mic, nothing else needed
const setup = {
  type: 'page',
  title: 'Your Filming Setup',
  html: `<div class="steps">${[
    ['iPhone', 'Camera', 'Back camera, 4K at 30fps, vertical. Wipe the lens. Phone at eye level on a small tripod, or a stack of books on your desk.'],
    ['Sound', 'Mic', 'A clip-on mic if you have one. If not, wired headphones with the mic near your chin and the cable out of shot. Close the door.'],
    ['Light', 'Face a window', 'Sit facing a window, not with it behind you. Turn off the harsh ceiling light above you. Leave some office behind you for depth.'],
    ['Takes', 'Keep rolling', 'Look at the lens, not the screen. Pause 2 seconds before and after. Stumble? Restart the line. Three takes, then move on.'],
  ]
    .map(([when, what, how], k) => `<div class="step"><div class="step-n">${k + 1}</div><div class="step-when">${when}</div><h4>${what}</h4><p>${esc(how)}</p></div>`)
    .join('')}</div>
    <div class="fine"><b>That's all you need.</b> People will forgive a slightly soft video. They won't watch one they can't hear, so sound comes first.</div>`,
};

// the four pillars at a glance, BPAG version
const pillarsAtAGlance = {
  type: 'page',
  title: 'Your Four Pillars',
  html: `<div class="pg">${Object.entries(PILLARS)
    .map(([name, p]) => {
      const posts = plan.filter((x) => x.pillar === name);
      return `<div class="pg-c" style="border-top-color:${p.color}">
        <div class="pg-h"><span class="pchip" style="background:${p.color}">${name}</span><b>${posts.length} posts</b></div>
        <p><b>They're asking:</b> ${esc(p.ask)}</p>
        <p class="pg-trap"><b>The trap:</b> ${esc(p.trap)}</p>
        <div class="pg-eg">${posts.slice(0, 3).map((x) => `Day ${x.day}: ${esc(x.short)}`).join('<br>')}</div>
      </div>`;
    })
    .join('')}</div>`,
};

const WEEKS = [
  [1, 'Week 1 · Days 1-7', 'Let them meet you.'],
  [2, 'Week 2 · Days 8-14', "Explain what everyone's confused about."],
  [3, 'Week 3 · Days 15-21', 'Show the results.'],
  [4, 'Week 4 · Days 22-30', 'Invite them in.'],
];

const q = (v) => `"${String(v).replace(/"/g, '""')}"`;

module.exports = {
  number: 40,
  file: 'Magnify-x-BPAG-30-Day-Post-Plan',
  title: 'Magnify Growth × BPAG: 30-Day Post Plan',
  client: true,
  noGuide: true,
  theme: 'bpag',
  brand: { partner: 'BPAG' },
  csv: {
    file: 'Magnify-x-BPAG-30-Day-Post-Plan.csv',
    text: [
      ['Day', 'Weekday', 'Pillar', 'Type', 'Post', 'Say this first', 'Script beats', 'CTA', 'On-screen text', 'Caption', 'Filmed', 'Before you film', 'Seen it work'],
      ...plan.map((p) => [`Day ${p.day}`, p.dow, p.pillar, p.type, p.short, p.hook, p.beats.map((b, k) => `${k + 1}. ${b}`).join(' '), p.cta, p.onscreen, p.caption, p.shoot ? 'Batch' : 'On the day', p.note || '', p.example ? `${p.example.who}, ${p.example.views}: ${p.example.url}` : '']),
    ].map((r) => r.map(q).join(',')).join('\n'),
  },
  slides: [
    { type: 'cover', kicker: 'Exclusive · Prepared for BPAG only', title: 'Your 30-Day\nPost Plan' },
    { type: 'shot', text: 'Your next 30 days are planned.\nYou just need to press record.' },
    pages.howItWorks,
    setup,
    pillarsAtAGlance,
    pages.weeklySchedule,
    pages.pillarWeek,
    pages.monthCalendar,
    ...WEEKS.flatMap(([w, kicker, text]) => [
      { type: 'shot', theme: 'white', kicker, text },
      ...plan.filter((p) => p.week === w).flatMap((p) => (p.day === w * 7 ? [pages.postPage(p), pages.weekReview(w)] : [pages.postPage(p)])),
    ]),
    pages.tracker(0, 15),
    pages.tracker(15, 30),
    pages.reviewPrinted,
    { type: 'shot', theme: 'lime', text: 'Done beats perfect.\nPost all 30, then judge.' },
    { type: 'notes' },
  ],
};
