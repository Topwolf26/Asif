// Magnify Growth × BPAG: the 30-day post plan. One post a day on the
// four pillars, for an accounting firm with a lot of farming clients.
// Filmed on an iPhone with a simple mic (or wired headphones).
// Build: node src/build.js 40  ->  pdf/clients/
const { esc } = require('../lib');
const { makePages, LAW_TEXT } = require('../plan-slides');

const PILLARS = {
  Connection: {
    color: '#0E7490',
    ask: 'Do I like you? Do you get farming and business like I do?',
    trap: 'Disconnect: only tax tips, so they never meet you or the team.',
    why: 'People choose an accountant they trust, not just one who knows the rules.',
    types: [
      { name: 'Character', what: 'Your opinions and what you stand for: how you think about tax, farming and business.', ideas: ['Why you became an accountant', 'Your take on this week\'s tax news', 'An unpopular opinion about accountants'], hook: 'Unpopular opinion: your accountant should talk to you more than once a year.' },
      { name: 'Day', what: 'Show what you already do: farm visits, the office, tax season, field days.', ideas: ['On the farm with a client', 'A Tuesday at BPAG', 'Your stand at the field day'], hook: 'Not every accountant works from a desk. Come with me to a client\'s farm.' },
      { name: 'Team', what: 'Put faces to the firm. Collab posts with the people clients will actually deal with.', ideas: ['Meet [team member]', 'Ask our bookkeeper', 'Two accountants, one question'], hook: 'This is [name]. If your BAS keeps you up at night, she\'s who you want.' },
    ],
    example: ['The_Westy_Lifestyle, accountant (US)', '366K views', '"A Day In The Life As A 25 Year Old Accountant", working through tax returns.', 'youtube.com/shorts/XQCIuAnWQwM'],
  },
  Value: {
    color: '#4D7C0F',
    ask: 'Is this helpful? Do I understand my tax better now?',
    trap: 'Lecturing: jargon, too much detail, five rules in one video.',
    why: 'One idea per video. The better you know it, the simpler you can say it.',
    types: [
      { name: 'Pain points', what: 'The worries that keep farmers and business owners up at night, answered honestly.', ideas: ['The good-season tax bill', 'The new $3 million super tax', 'A tax bill you can\'t pay yet'], hook: 'The tax bill that catches farmers out isn\'t after a bad year. It\'s after a good one.' },
      { name: 'Challenges / obstacles', what: 'Name the exact situation they\'re in, then show the way through it.', ideas: ['Payday Super: what changed', 'Tough season? 3 things to do now', 'Outgrown your business structure?'], hook: 'Tough season? Here are 3 things to do with your accountant now, not in June.' },
      { name: 'Simplifying concepts', what: 'Take a rule people find confusing and say it in plain English.', ideas: ['A "Farm Tax in 30 Seconds" series', 'Farm management deposits', 'The tax deduction myth'], hook: 'Farm Tax in 30 Seconds: what a farm management deposit actually is.' },
    ],
    example: ['Jasmine DiLucci, tax attorney + CPA (US)', '3.5M views', '"How Taxes Change when you Make More Money": one idea, in plain English.', 'youtube.com/shorts/UGKkWz44xN0'],
  },
  Proof: {
    color: '#B45309',
    ask: 'Are you legit? Who have you actually helped?',
    trap: 'Disbelief: smart talk, but no sign of real clients or results.',
    why: 'Knowing tax isn\'t enough. Show the farmers and businesses you\'ve helped.',
    types: [
      { name: 'Testimonial', what: 'A client on camera, in their own words, with their written OK.', ideas: ['Ask happy clients after tax season', '20 seconds: what it\'s like working with BPAG', 'Read a Google review out on camera'], hook: 'Don\'t take it from me. Here\'s what [client] said.' },
      { name: 'Case study', what: 'Start with the result, then how you got there. Details changed.', ideas: ['A farming family, 12 months on', 'Handing the farm on', 'From shoebox to sorted'], hook: 'A farming family came to us with [problem]. Twelve months later, [result].' },
      { name: 'Screenshots', what: 'The thank-you emails and texts you already get. Names blurred, with permission.', ideas: ['This message made our week', 'Review of the month', 'A client\'s before and after, no details'], hook: 'This message made our whole week.' },
    ],
    example: ['Karlton Dennis, tax strategist (US)', '368K views', 'A 24-year-old client who saved $160,000 in tax: the result first, then how.', 'youtube.com/shorts/Wfed_Mj9w08'],
  },
  Invitation: {
    color: '#7C2D12',
    ask: 'How do I get started with BPAG?',
    trap: 'Selling: a pitch in every post. Give publicly, sell privately.',
    why: 'Invite them in. It should feel like an open door, not a sales call.',
    types: [
      { name: 'Resource', what: 'A free checklist or guide people get by commenting a keyword.', ideas: ['Farm tax planning checklist (comment FARM)', 'A Payday Super checklist', 'A "before you buy that ute" guide'], hook: 'I made a tax planning checklist for farmers. Comment FARM and I\'ll send it.' },
      { name: 'Events', what: 'Meet people in person: an info night, a field day stand, a coffee catch-up.', ideas: ['Free farm tax and succession night', 'Your stand at the field day', 'Coffee\'s on us, [town], Friday 8am'], hook: 'We\'re running a free farm tax and succession night in [town]. Comment SEAT.' },
      { name: 'Workshops', what: 'A low-cost, deeper session for people who\'ve followed you for a while.', ideas: ['Succession planning 101 (2 hours)', 'Tax planning before 30 June', 'Bookkeeping basics for farm businesses'], hook: 'Want to go deeper? We\'re running a 2-hour succession workshop on [date].' },
    ],
  },
};

const TH = 'Talking head, iPhone';
const RULES = 'Check the current ATO rules on the day you film. General information only, not advice.';
const DOW = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// [day, pillar, type, short, hook, format, length, batch-filmed, closing line, on-screen text, caption, note]
// The words to say are in SCRIPTS below.
const POSTS = [
  [1, 'Value', 'Pain points', 'The good-season tax bill', 'The tax bill that catches farmers out isn\'t after a bad year. It\'s after a good one.', TH, '30-45 sec', true, 'Follow for farm tax, made simple.', 'Why a good season can hurt at tax time', 'The tax bill that catches farmers out comes after a good year, not a bad one. Here is how to plan for it. Follow for more farm tax, made simple.'],
  [2, 'Connection', 'Character', 'Why I became an accountant', 'I didn\'t become an accountant to do tax returns. Here\'s why I did.', TH, '30-45 sec', true, 'Follow if you run a farm or a business.', 'Why I became an accountant', 'I didn\'t become an accountant to do tax returns. Here is why I did, and who I help now.'],
  [3, 'Value', 'Simplifying concepts', 'Farm Tax in 30 Seconds #1', 'Farm Tax in 30 Seconds: what a farm management deposit actually is.', `${TH} + text on screen`, '30 sec', true, 'Follow for episode 2.', 'Farm management deposits, explained', 'Farm Tax in 30 Seconds, episode 1: farm management deposits. General information only, not advice. Follow for episode 2.', RULES],
  [4, 'Proof', 'Case study', 'A farming family, 12 months on', 'A farming family came to us with [problem]. Twelve months later, [result].', TH, '45-60 sec', true, 'DM "CHAT" if this sounds like your farm.', '12 months with a farming family', 'A farming family came to us with [problem]. Twelve months later, [result]. Details changed, shared with permission.'],
  [5, 'Connection', 'Team', 'Meet [team member]', 'This is [name]. If your BAS keeps you up at night, she\'s who you want.', 'Collab, iPhone', '30 sec', true, 'Follow to meet more of the team.', 'Meet [name]', 'Meet [name], who looks after [area] at BPAG. If your BAS keeps you up at night, she is who you want.'],
  [6, 'Connection', 'Day', 'On the farm with a client', 'Not every accountant works from a desk. Come with me to a client\'s farm.', 'B-roll + voiceover, iPhone', '20-30 sec', false, 'Follow to see more behind the scenes.', 'An accountant on the farm', 'Not every accountant works from a desk. A morning on a client\'s farm (shared with their OK).'],
  [7, 'Value', 'Challenges / obstacles', 'Payday Super is here', 'Since 1 July, super has to be paid every payday. Is your business ready?', TH, '30-45 sec', true, 'Save this and send it to your bookkeeper.', 'Payday Super: what changed', 'Since 1 July 2026, super is paid with every payday, not every quarter. Here is what that means for your business. Save this for later.', 'Payday Super started 1 July 2026. Check ato.gov.au/paydaysuper for the latest before filming.'],
  [8, 'Value', 'Pain points', 'The new $3 million super tax', 'There\'s a new tax on super balances over $3 million. Here\'s who it actually hits.', TH, '45-60 sec', true, 'Follow for straight answers on super.', 'The $3 million super tax, in plain English', 'There is a new tax on super balances over $3 million. Here is who it actually affects. General information only, not advice.', 'Keep it general: explain the rule, don\'t tell anyone what to do with their super. First assessments use balances at 30 June 2027; check ato.gov.au before filming.'],
  [9, 'Connection', 'Character', 'My take on the news', 'Everyone\'s talking about [this week\'s tax news]. Here\'s what it actually means for you.', TH, '30-45 sec', true, 'Agree or disagree? Tell me in the comments.', 'My take: [news]', 'Everyone is talking about [news]. Here is what it actually means for you, and what I think.', 'Pick whatever tax or super story is in the news that week. General information only, not advice.'],
  [10, 'Value', 'Simplifying concepts', 'Farm Tax in 30 Seconds #2', 'Farm Tax in 30 Seconds: how income averaging works.', `${TH} + text on screen`, '30 sec', true, 'Follow for episode 3.', 'Income averaging, explained', 'Farm Tax in 30 Seconds, episode 2: income averaging for primary producers. General information only, not advice.', RULES],
  [11, 'Proof', 'Testimonial', 'A client in their words', 'Don\'t take it from me. Here\'s what [client] said.', 'Client on camera, iPhone', '20-45 sec', false, 'If this is you, DM "CHAT".', 'In their words', 'Don\'t take it from me. Here is what [client] said (shared with permission).', 'Get their written OK to post before you film.'],
  [12, 'Connection', 'Team', 'Ask our bookkeeper', 'I asked our bookkeeper the one mistake she sees every BAS season.', 'Collab, iPhone', '30-45 sec', true, 'Follow for more from the team.', 'The BAS mistake we see every quarter', 'I asked our bookkeeper the one mistake she sees every BAS season. Here is the answer.'],
  [13, 'Connection', 'Day', 'Inside the office', 'This is what BPAG actually looks like on a Tuesday.', 'B-roll + voiceover, iPhone', '20-30 sec', false, 'Follow to see more behind the scenes.', 'A Tuesday at BPAG', 'This is what BPAG actually looks like on a Tuesday.', 'Keep client names and screens out of shot.'],
  [14, 'Invitation', 'Resource', 'Free farm tax checklist', 'I made a tax planning checklist for farmers. Comment FARM and I\'ll send it.', TH, '20-30 sec', true, 'Comment FARM and I\'ll send it to you.', 'Free farm tax checklist', 'I made a tax planning checklist for farmers. Comment FARM and I will send it to you.', 'Have the checklist ready to send (we can set up the auto-reply).'],
  [15, 'Value', 'Challenges / obstacles', 'Tough season? Do this now', 'Tough season? Here are 3 things to do with your accountant now, not in June.', TH, '30-45 sec', true, 'Save this for later.', 'Tough season? 3 things to do now', 'Tough season? Here are 3 things to do with your accountant now, not in June. General information only, not advice.'],
  [16, 'Connection', 'Character', 'Unpopular opinion', 'Unpopular opinion: your accountant should talk to you more than once a year.', TH, '20-30 sec', true, 'Agree or disagree? Comment below.', 'Unpopular opinion', 'Unpopular opinion: your accountant should talk to you more than once a year. Agree or disagree?'],
  [17, 'Value', 'Simplifying concepts', 'Farm Tax in 30 Seconds #3', 'Farm Tax in 30 Seconds: the $20,000 instant asset write-off.', `${TH} + text on screen`, '30 sec', true, 'Follow for episode 4.', 'The instant asset write-off, explained', 'Farm Tax in 30 Seconds, episode 3: the $20,000 instant asset write-off. General information only, not advice.', 'Reported as made permanent from 1 July 2026. Confirm the current threshold with the ATO before filming.'],
  [18, 'Proof', 'Case study', 'Handing the farm on', 'Is it possible to hand the farm to the next generation without a huge tax bill? Here\'s how one family started.', TH, '45-60 sec', true, 'DM "CHAT" if this is your family.', 'Handing the farm to the next generation', 'Is it possible to hand the farm on without a huge tax bill? Here is how one family started (details changed).'],
  [19, 'Connection', 'Team', 'The question we get most', 'We asked everyone at BPAG the question they get asked most.', 'Collab, quick cuts, iPhone', '30 sec', false, 'Follow to meet the team.', 'The question we get asked most', 'We asked everyone at BPAG the question they get asked most.'],
  [20, 'Connection', 'Day', 'Outside the office', 'This is what I do when I\'m not doing tax.', 'B-roll + voiceover, iPhone', '20 sec', false, 'Follow along.', 'Outside the office', 'This is what I do when I am not doing tax.'],
  [21, 'Proof', 'Screenshots', 'This message made our week', 'This message made our whole week.', 'Screenshot + voiceover, iPhone', '15-20 sec', false, 'If you\'re where they were, DM "CHAT".', 'This message made our week', 'This message made our whole week. Name blurred, shared with permission.', 'Blur the name and get their OK first.'],
  [22, 'Value', 'Challenges / obstacles', '3 signs you\'ve outgrown your structure', '3 signs your farm has outgrown its business structure.', `${TH} + text on screen`, '30-45 sec', true, 'Save this for later.', '3 signs your farm has outgrown its structure', '3 signs your farm has outgrown its business structure. General information only, not advice.'],
  [23, 'Connection', 'Character', 'What I wish clients knew', '[X] years in accounting. Here\'s what I wish every client knew on day one.', TH, '30-45 sec', true, 'Follow for more.', 'What I wish every client knew', '[X] years in accounting. Here is what I wish every client knew on day one.'],
  [24, 'Value', 'Simplifying concepts', 'Farm Tax in 30 Seconds #4', 'Farm Tax in 30 Seconds: the first step in succession planning.', `${TH} + text on screen`, '30 sec', true, 'Follow for the next series.', 'Succession planning: step one', 'Farm Tax in 30 Seconds, episode 4: the first step in succession planning. General information only, not advice.'],
  [25, 'Proof', 'Case study', 'From shoebox to sorted', 'From a shoebox of receipts to [result] in [X] months.', TH, '45-60 sec', true, 'DM "CHAT" to get yours sorted.', 'From shoebox to sorted', 'From a shoebox of receipts to [result] in [X] months (details changed, shared with permission).'],
  [26, 'Connection', 'Team', 'Two accountants, one question', 'Two accountants, two specialties, one question: [question].', 'Collab, iPhone', '45 sec', true, 'Follow for more from the team.', 'Two accountants, one question', 'Two accountants, two specialties, one question: [question].'],
  [27, 'Connection', 'Day', 'Field day', 'We\'re at [field day] today. Come and say hi.', 'B-roll + voiceover, iPhone', '20-30 sec', false, 'Come and say hi at [site number].', 'Find us at [field day]', 'We are at [field day] today. Come and say hi at [site number].', 'If there\'s no field day this month, film a local event or a client visit instead.'],
  [28, 'Invitation', 'Events', 'Free farm tax night', 'We\'re running a free farm tax and succession night in [town] on [date]. Comment SEAT for details.', TH, '20-30 sec', true, 'Comment SEAT and I\'ll send the details.', 'Free farm tax night: [date]', 'We are running a free farm tax and succession night in [town] on [date]. No pitch, just answers. Comment SEAT for details.'],
  [29, 'Value', 'Simplifying concepts', 'The tax deduction myth', 'Everyone thinks a tax deduction means you get the money back. It doesn\'t.', TH, '20-30 sec', true, 'Follow for more myths.', 'MYTH: a deduction gets you the money back', 'Everyone thinks a tax deduction means you get the money back. It doesn\'t. Here is what actually happens.'],
  [30, 'Connection', 'Character', '30 days: what I learned', 'I posted every day for 30 days. Here\'s what happened.', TH, '30-45 sec', true, 'Follow for month two.', '30 days of posting: what happened', 'I posted every day for 30 days. Here is what happened, and what is next.'],
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

// What to say after the opening line, as it would be said. [Brackets] are
// BPAG's own story or detail. General information only, never advice.
const SCRIPTS = {
  1: [
    'A big season means a big taxable income, and the bill lands months later, often after the money\'s gone back into the farm.',
    'There are tools built for exactly this. Farm management deposits let you set money aside in a good year. Income averaging smooths your tax across the ups and downs.',
    'The trick is planning before 30 June, not after.',
  ],
  2: [
    '[The real reason, in a sentence or two.]',
    'What I kept seeing was [e.g. good farmers and business owners making big decisions without anyone explaining their numbers].',
    'So at BPAG, we [what you do differently].',
  ],
  3: [
    'It\'s money you set aside in a good year and claim as a deduction that year. It\'s taxed when you take it out, ideally in a tougher year when your income is lower.',
    'The basics: at least $1,000, up to $800,000 in total, you need to be a primary producer, and your off-farm income has to be $100,000 or less.',
    'Leave it in for at least 12 months, unless an exception applies.',
  ],
  4: [
    'When they first called us, [what was going on, e.g. three years of late returns and a growing ATO debt].',
    'We [first thing you did] and then [second thing].',
    'Details are changed, but if that sounds like your farm, start with a conversation.',
  ],
  5: [
    '[Name] has been with us [X] years and looks after [area].',
    '[Name]: "The thing I see most is [the common mistake]. Fix that and everything else gets easier."',
    'Outside work, [one human detail].',
  ],
  6: [
    '[Driving in.] This is [client]\'s place, about [X] hours out of town.',
    '[Walking the shed or paddock, with their OK.] You learn more walking a farm for an hour than reading a year of statements.',
    'Today it was [one thing you noticed that you\'d never see in the books].',
  ],
  7: [
    'Super now has to land in your employee\'s fund within seven business days of each payday.',
    'And the ATO\'s free small business clearing house has closed. If you used it, you need a new way to pay.',
    'The fix is usually in your payroll software: set super to go out with every pay run.',
  ],
  8: [
    'It\'s called Division 296 and it started on 1 July 2026.',
    'If your total super is over $3 million, the earnings on the part above $3 million are taxed an extra 15 per cent. Above $10 million there\'s another 10 per cent on top. It applies to earnings you actually make, not paper gains.',
    'If you\'re anywhere near $3 million, especially with farm property in your SMSF, talk to your adviser. General information only.',
  ],
  9: [
    'In plain English: [one sentence on what happened].',
    'What it means for farmers and business owners: [the practical effect].',
    'My take: [your opinion, in one line].',
  ],
  10: [
    'Farm income goes up and down. Tax rates don\'t care.',
    'Income averaging lets primary producers average their taxable farm income over up to five years. In a big year, you get a tax offset so you\'re not paying the top rate on one good season.',
    'If you\'re a primary producer and not sure whether it applies to you, ask us.',
  ],
  11: [
    'You ask, they answer. Keep each answer to a sentence or two.',
    '"What was going on when you first called us?" "What\'s it like working with BPAG?" "What would you tell another farmer?"',
    'Get their written OK before you post.',
  ],
  12: [
    '[Bookkeeper]: "[The mistake, e.g. putting personal spending on the business card and sorting it out later.]"',
    '[Bookkeeper]: "[The fix, in one line.]"',
    'Simple, and it saves you hours every quarter.',
  ],
  13: [
    '[Morning: first coffee, the team arriving.]',
    '[Midday: real work, screens out of shot.]',
    '[End of day: one thing the team got done.]',
  ],
  14: [
    'Most farmers start tax planning in June. By then it\'s too late to do much.',
    'The checklist covers your expected income for the year, what\'s in your farm management deposits, equipment you\'re planning to buy, and any big sales coming up.',
    'Go through it in [month] and you\'ll still have options.',
  ],
  15: [
    'One: look at cashflow for the next six months, not just last year.',
    'Two: if you have farm management deposits, check whether drawing on them makes sense.',
    'Three: if there\'s tax due, talk to the ATO early. Payment plans are easier to set up before you fall behind.',
  ],
  16: [
    'If the only time you hear from us is tax time, it\'s too late to change anything. The decisions that save tax happen during the year.',
    'That\'s why we [what you do, e.g. check in with every client each quarter].',
  ],
  17: [
    'You can claim an eligible asset under $20,000 straight away, instead of depreciating it over years.',
    'It\'s for businesses with turnover under $10 million, and it works per asset, so two $15,000 items can both count.',
    'The catch: the asset has to be installed and ready to use, not just ordered.',
  ],
  18: [
    '[The situation, details changed: e.g. two kids on the farm, one in the city.]',
    'The hard part was tax, stamp duty, and being fair to every child.',
    'We started with [the first step, e.g. getting the whole family in one room], and [what came next].',
  ],
  19: [
    '[Name, role]: "[The question they get most.]"',
    '[Name, role]: "[Theirs.]" [Name, role]: "[Theirs.]"',
    'And the most honest one. [Name]: "[Theirs.]"',
  ],
  20: [
    '[What it is: the farm, the footy, the family.]',
    'Tax season is long. This is how I switch off.',
    'And it\'s how I turn up properly for clients the next morning.',
  ],
  21: [
    '[Show the message, name blurred.]',
    'When they first came to us, [what was going on, no details].',
    'Messages like this are why we do it.',
  ],
  22: [
    'One: you\'re paying top-rate tax on profit you\'re leaving in the business.',
    'Two: the next generation, or a new partner, is coming in.',
    'Three: you\'re worried about protecting your assets if something goes wrong. If any of these sound familiar, it\'s worth a review. General information only.',
  ],
  23: [
    '[The one thing, e.g. "Your accountant can only help with what they know about. Tell us before you buy, sell or sign."]',
    '[Why, with one real example, no names.]',
  ],
  24: [
    'The first step in succession planning isn\'t tax. It\'s a conversation.',
    'Start years before you want to step back. Get everyone\'s goals on the table: who wants to farm, who doesn\'t, and what feels fair.',
    'Then look at tax, structure and stamp duty together, with your accountant and your lawyer in the same room.',
  ],
  25: [
    'Where they started: [the shoebox, the stress, the late lodgements].',
    'What we set up: [e.g. a bank feed, a receipts app, a monthly check-in].',
    'Where they are now: [the result]. Details changed.',
  ],
  26: [
    '[Accountant 1, e.g. farm tax]: "[Their answer.]"',
    '[Accountant 2, e.g. super or business]: "[Their answer.]"',
    'Where we agree: [one line].',
  ],
  27: [
    '[The stand, the crowd, the morning.]',
    '[Two quick chats with farmers, with their OK.]',
    'We\'re here until [time].',
  ],
  28: [
    'No sales pitch. We\'ll cover tax planning before 30 June and how to start a succession conversation, then answer your questions.',
    'It\'s at [venue], [time]. Seats are limited.',
  ],
  29: [
    'A deduction lowers your taxable income, and that\'s all it does.',
    'If you\'re on a 30 per cent rate and spend $1,000 on something deductible, you save about $300 in tax. You\'re still $700 out of pocket.',
    'So buy things because the business needs them, not for the deduction.',
  ],
  30: [
    '[One number: views, follows or enquiries.] [One surprise: which post did best, and why.]',
    'Next month I\'m [what you\'re changing].',
  ],
};

const plan = POSTS.map(([day, pillar, type, short, hook, format, length, shoot, cta, onscreen, caption, note]) => ({
  day, pillar, type, short, hook, format, length, shoot, script: SCRIPTS[day], cta, onscreen, caption, note,
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
    ['Every Monday', 'Plan the week', 'Look over last week\'s results, then edit and schedule the week\'s 7 posts. Thirty minutes.'],
    ['Every day', 'One post, 7:30am', 'One post goes out every morning. Reply to comments for 15 minutes after it goes live. Tick it off.'],
    ['Every Sunday', 'Improve one thing', 'Look back at the week, be honest, and improve one thing. On day 30, score every post on the review page.'],
  ],
  fine: '<b>Keep it general.</b> Explain the rules, not what one person should do. Super and investment content can be financial product advice, so unless you\'re licensed for it, say "general information only, not advice" and point people to a meeting. Client stories need written consent and no identifying details.',
  weekJobs: ['A pain point or challenge your clients face.', 'Your opinion, or your take on this week\'s tax news.', 'Your "Farm Tax in 30 Seconds" series.', 'A result, a review or a client message.', 'A collab post with someone on the team.', 'Document your day: the office, a farm visit.', 'Week 1 value, week 2 invitation, week 3 proof, week 4 invitation.'],
  weekNote: '<b>About 3½ hours a week.</b> Put these blocks in your calendar as recurring events now, like a client meeting. Batch filming on Monday and Thursday mornings covers the talking-head posts.',
  filmLabel: ['Batch film', 'Film on the day'],
  calNote: '<b>Film on the day</b> = not in a batch session.',
  planBlock: ['PLAN', "Look over last week. Schedule the week's 7 posts"],
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
      ['Day', 'Weekday', 'Pillar', 'Type', 'Post', 'Say this first', 'Script', 'Close', 'On-screen text', 'Caption', 'Filmed', 'Before you film', 'Seen it work'],
      ...plan.map((p) => [`Day ${p.day}`, p.dow, p.pillar, p.type, p.short, p.hook, p.script.join(' '), p.cta, p.onscreen, p.caption, p.shoot ? 'Batch' : 'On the day', p.note || '', p.example ? `${p.example.who}, ${p.example.views}: ${p.example.url}` : '']),
    ].map((r) => r.map(q).join(',')).join('\n'),
  },
  slides: [
    { type: 'cover', kicker: 'Exclusive · Prepared for BPAG only', title: 'Your 30-Day\nPost Plan' },
    { type: 'shot', text: 'Your next 30 days are planned.\nYou just need to press record.' },
    pages.howItWorks,
    { type: 'shot', text: 'Bare minimum:\nonce a week.\n\nMax play:\nonce a day.' },
    pages.ladder,
    pages.principles,
    setup,
    pages.wheelPage,
    ...Object.keys(PILLARS).map((name, k) => pages.pillarPage(name, k + 1)),
    pillarsAtAGlance,
    pages.weeklySchedule,
    pages.pillarWeek,
    pages.monthCalendar,
    ...WEEKS.flatMap(([w, kicker, text]) => [
      { type: 'shot', theme: 'white', kicker, text },
      ...plan.filter((p) => p.week === w).flatMap((p) => (p.day === w * 7 ? [pages.postPage(p), pages.weekReview(w)] : [pages.postPage(p)])),
    ]),
    pages.reviewPrinted,
    { type: 'shot', theme: 'lime', text: 'Done beats perfect.\nPost all 30, then judge.' },
    { type: 'notes' },
  ],
};
