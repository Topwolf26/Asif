// The 30-day post plan: one post a day, built on the Module 3 pillars
// calendar (src/pillars.js). Day 1 is a Monday; every post goes out at 7:30am.
// Used by Modules 3, 5, 7 and 8, the standalone 30-Day Post Plan PDF and the CSV.
//
// shoot: filmed on the monthly shoot day (Module 5). The rest are filmed as
// they happen (your day, the team, a client testimonial, a screenshot).
// example: a real lawyer Short in the same format (views read from YouTube
// on 26 Oct 2026; re-check before quoting them to a client).

const { POSTS } = require('./pillars');

const DOW = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const TH = 'Talking head';

// day: [format, length, shoot, closing line, on-screen text, caption]
// The words to say are in SCRIPTS below.
const DETAILS = {
  1: [TH, '30-45 sec', true, 'Follow for more straight answers about family law.', 'The costliest mistake in family law', 'The most expensive mistake I see? Signing before getting advice. Here is what to do instead. Follow for more straight answers.'],
  2: [TH, '30-45 sec', true, 'Follow if you\'re going through a separation.', 'Why I became a family lawyer', 'It wasn\'t the money. Here is why I became a family lawyer, and who I help now.'],
  3: [`${TH} + text on screen`, '30 sec', true, 'Follow for the next Law in 30 Seconds.', 'Law in 30 Seconds: binding financial agreements', 'Law in 30 Seconds, episode 1: what a binding financial agreement actually is. Follow for episode 2.'],
  4: [TH, '45-60 sec', true, 'DM "CALL" if this sounds like you.', 'From [obstacle] to [outcome]', 'A client came to us after [obstacle]. [X] months later, [outcome]. Details changed, shared with permission. DM "CALL" if this sounds like you.'],
  5: ['Collab, talking head', '30 sec', true, 'Follow to meet more of the team.', 'Meet [name]', 'Meet [name], who looks after [area]. If you\'ve ever [problem], she\'s who you want.'],
  6: ['B-roll + voiceover', '20-30 sec', false, 'Follow to see more behind the scenes.', 'A day in the life of a family lawyer', 'What a Tuesday actually looks like for a family lawyer.'],
  7: [TH, '30-45 sec', true, 'Save this and send it to someone who needs it.', 'Just separated? Do this first', 'Just separated and don\'t know where to start? Do these two things this week. Save this for later.'],
  8: [TH, '30-45 sec', true, 'Follow for more straight answers.', 'Will I lose the house?', '"Will I lose the house?" It\'s the question I get most. Here is the honest answer.'],
  9: [TH, '30-45 sec', true, 'Agree or disagree? Tell me in the comments.', 'My take: [news]', 'Everyone\'s talking about [news]. Here is what it actually means for you, and what I think.'],
  10: [`${TH} + text on screen`, '30 sec', true, 'Follow for episode 3.', 'Law in 30 Seconds: "just and equitable"', 'Law in 30 Seconds, episode 2: what "just and equitable" really means.'],
  11: ['Client on camera', '20-45 sec', false, 'If this is you, DM "CALL".', 'In their words', 'Don\'t take it from me. Here is what [client] said (shared with permission).'],
  12: ['Collab, talking head', '30-45 sec', true, 'Follow for more from the team.', 'I asked our accountant', 'I asked our in-house accountant the tax question every separating couple asks. Here is the answer.'],
  13: ['B-roll + voiceover', '20-30 sec', false, 'Follow to see more behind the scenes.', 'Come with me to court', 'Come with me to court today. No client details, just what it is actually like.'],
  14: [TH, '20-30 sec', true, 'Comment CHECKLIST and I\'ll send it to you.', 'Free first-meeting checklist', 'I made a checklist of everything to bring to your first meeting. Comment CHECKLIST and I\'ll send it.'],
  15: [TH, '30-45 sec', true, 'Save this for later.', 'Your ex won\'t cooperate? 3 options', 'Your ex won\'t sign anything. Here are your 3 options.'],
  16: [TH, '20-30 sec', true, 'Agree or disagree? Comment below.', 'Unpopular opinion', 'Unpopular opinion: most separations should never go near a courtroom. Agree or disagree?'],
  17: [`${TH} + text on screen`, '30 sec', true, 'Follow for episode 4.', 'Law in 30 Seconds: mediation', 'Law in 30 Seconds, episode 3: what actually happens at mediation.'],
  18: [TH, '30-45 sec', true, 'DM "CALL" if this is you.', 'Can you keep the family home?', 'Is it possible to keep the family home after separating? Yes. Here is one way we did it (details changed).'],
  19: ['Collab, quick cuts', '30 sec', false, 'Follow to meet the team.', 'The question we get asked most', 'We asked everyone in the office the question they get asked most.'],
  20: ['B-roll + voiceover', '20 sec', false, 'Follow along.', 'Outside the office', 'This is what keeps me sane in a job like this.'],
  21: ['Screenshot + voiceover', '15-20 sec', false, 'If you\'re where they were, DM "CALL".', 'This message made our week', 'This message made our whole week. Name blurred, shared with permission.'],
  22: [`${TH} + text on screen`, '30 sec', true, 'Save this for later.', '3 red flags your ex is hiding assets', '3 red flags your ex is hiding assets, and what to do if you spot one.'],
  23: [TH, '30-45 sec', true, 'Follow if you\'re going through this.', 'What I wish every client knew', '[X] years in family law. Here is what I wish every client knew on day one.'],
  24: [`${TH} + text on screen`, '30 sec', true, 'Follow for the next series.', 'Law in 30 Seconds: how long a divorce takes', 'Law in 30 Seconds, episode 4: how long a divorce actually takes.'],
  25: [TH, '45-60 sec', true, 'DM "CALL" to start yours.', 'First call to settled in [X] months', 'From first call to settled in [X] months. The 3 things that made the difference (details changed).'],
  26: ['Collab, two lawyers', '45 sec', true, 'Follow for more from the team.', 'Two lawyers, one question', 'Two lawyers, two specialties, one question: [question].'],
  27: ['B-roll + podcast clip', '30-45 sec', false, 'Full episode: link in bio.', 'Podcast day', 'Recorded a podcast today on [topic]. Here is the part that surprised me. Full episode in bio.'],
  28: [TH, '20-30 sec', true, 'Comment SEAT and I\'ll send the details.', 'Free Q&A night: [date]', 'We\'re running a free Q&A night in [suburb] on [date]. No pitch, just answers. Comment SEAT for details.'],
  29: [TH, '20-30 sec', true, 'Follow for more myths.', 'MYTH: property is split 50/50', 'Everyone thinks a property split is automatically 50/50. It\'s not. Here is what actually happens.'],
  30: [TH, '30-45 sec', true, 'Follow for month two.', '30 days of posting: what happened', 'I posted every day for 30 days. Here is what happened, and what is next.'],
};

const EXAMPLES = {
  2: ['Mike Rafi, injury lawyer (US)', '1.1M views', '"All About Me": who he is and who he helps, straight to camera.', 'youtube.com/shorts/mxPt96aIMkk'],
  6: ['Jimenez Mazzitelli Mordes Law (Miami)', '160K views', '"Day in the Life as an Attorney at a Miami Law Firm". The firm usually gets hundreds.', 'youtube.com/shorts/4Rh7NiRSFcw'],
  8: ['Law By Mike (US)', '14.8M views', '"Bizarre Googled Legal Questions Answered": real questions, one straight answer each.', 'youtube.com/shorts/GWbejOodNJk'],
  16: ['Cogdell Law Uncensored (Houston)', '592K views', '"5 Things Big Law Partners Don\'t Tell You": an insider take on the industry.', 'youtube.com/shorts/QYR6Q46JdI4'],
  18: ['Mike Rafi, injury lawyer (US)', '7.9M views', '"We Sued Uber, Won, and Can Talk About It": the result first, then the story.', 'youtube.com/shorts/06EJuEqfwBk'],
  22: ['Law By Mike (US)', '128.6M views', '"How You Spot A BAD Lawyer": a run of red flags, one per beat.', 'youtube.com/shorts/r8Pyf8ijD9s'],
  29: ['Law By Mike (US)', '39M views', '"Things You Think Are Illegal, That Are Actually Legal": pure myth-busting.', 'youtube.com/shorts/eq1rjRBGwp8'],
};

// What to say after the opening line, as it would be said. [Brackets] are the
// firm's own story or detail.
const SCRIPTS = {
  1: [
    'Your ex hands you a document. It looks fair. It says something like "we each keep what\'s in our own name". You just want it over, so you sign.',
    'Six months later you find out the super was never counted, or the business was worth three times what you thought. Once it\'s signed and filed, undoing it is slow and expensive.',
    'An hour with a lawyer before you sign costs a fraction of that. Even if all we do is read it and tell you it\'s fine.',
  ],
  2: [
    'I\'ve been doing family law for [X] years. I started because [the real moment, in a sentence or two: who it was and what happened].',
    'What stayed with me was [what you saw go wrong for people]. So at [firm], we [what you do differently, e.g. give a fixed fee up front, call back the same day].',
    'If you\'re going through a separation right now, that\'s exactly who we\'re here for.',
  ],
  3: [
    'A binding financial agreement is a written agreement about how you\'d split your property, and sometimes your super, if you separate.',
    'You can make one before you move in together, during the relationship, or after you split. For it to hold up, you each need your own lawyer, and each lawyer signs a certificate saying they advised you. Skip that and it can be thrown out.',
    'It\'s private, it\'s usually far cheaper than court, and it gives you certainty.',
  ],
  4: [
    'When she first called us, [what was going on, no names, e.g. her ex had stopped paying the mortgage and stopped replying].',
    'The hard part was [the real obstacle]. We [first thing you did], then [second thing]. It never went to court.',
    'Every case is different, and details here are changed. But if this sounds like you, the first step is the same: get advice early.',
  ],
  5: [
    '[Name] looks after [area] here. Ask [her] the question [she] gets every week:',
    '[Name]: "[The question]. The short answer is [the answer, in one or two sentences]."',
    'Outside work, [one human detail: the dog, the footy team, the coffee order].',
  ],
  6: [
    '[7am] Coffee before anyone else is in. [9am] Team meeting: we go through every matter with something due this week.',
    '[11am] Most of the day looks like this. Phone calls, reading documents, drafting. No client names on screen.',
    '[5pm] The best part of today was [one real moment].',
  ],
  7: [
    'First: write down everything you own and owe, and where the paperwork is. Bank accounts, super, the mortgage, cars, any business. No values yet, just the list.',
    'Second: write down how the kids are being looked after right now, day by day, and keep it going.',
    'And one thing not to do yet: don\'t move money or sign anything until you\'ve had advice.',
  ],
  8: [
    'It\'s the question I hear most. And no, not automatically.',
    'The court looks at what each of you put in, money and otherwise, like raising the kids. Then it looks at what you\'ll each need from here: who has the kids, your health, what you can earn.',
    'Sometimes one of you keeps the house and the other gets more super or cash. Sometimes it\'s sold. It comes down to your numbers, which is why early advice matters.',
  ],
  9: [
    'In plain English: [one sentence on what happened].',
    'What changes for you: [the practical effect]. What doesn\'t change: [the bit people are getting wrong].',
    'My take: [your opinion, in one line].',
  ],
  10: [
    '"Just and equitable" is the test every property settlement has to pass. It sounds vague because it is.',
    'It means the court won\'t just add up who earned what. It asks: given everything you both contributed, and what you\'ll each need after this, is the split fair?',
    'That\'s why two couples with exactly the same assets can end up with different splits.',
  ],
  11: [
    'You ask, they answer. Keep each answer to a sentence or two.',
    '"What was going on when you first called us?" "What was it like working with [firm]?" "What would you tell someone in your position?"',
    'Get their written OK before you post, and leave out anything that identifies them or the other party.',
  ],
  12: [
    'I asked our in-house accountant the question every separating couple asks: [e.g. "If we transfer the house between us, do we pay capital gains tax?"].',
    '[Accountant]: "[The answer in plain English, e.g. often there\'s rollover relief when assets move under a court order or a binding agreement, but it depends on the asset.]"',
    'The takeaway: get your lawyer and your accountant talking before you sign anything.',
  ],
  13: [
    'Court days start early. [Walking in.] This is the part nobody sees: the waiting.',
    'Most hearings are shorter than people expect. A lot of the real work happens in the corridor, talking with the other side.',
    '[Walking out.] If people knew how much of this could be settled before court, far fewer would end up here.',
  ],
  14: [
    'Most people turn up to their first meeting without half of what we need. So I made a checklist.',
    'Your last three payslips. Recent statements for every account. Your super statement. A rough timeline of the relationship.',
    'Bring those and we can give you real advice in the first meeting, not just "it depends".',
  ],
  15: [
    'One: a letter from a lawyer. It often gets things moving on its own.',
    'Two: mediation. For most parenting disputes you have to try it before you can go to court anyway.',
    'Three: apply to the court. It\'s the last resort, but it\'s there, and it puts a timetable on things.',
  ],
  16: [
    'Court is slow, it\'s expensive, and a stranger ends up making decisions about your life.',
    'Most of our matters settle with lawyers talking, a mediation, or consent orders. Court is for the cases that genuinely need it.',
    'If your lawyer\'s first move is to file, ask why.',
  ],
  17: [
    'Most people picture mediation as two people yelling in a room. It usually isn\'t.',
    'Often you\'re in separate rooms and the mediator goes back and forth. You can have your lawyer with you, and nobody can make you agree to anything.',
    'It\'s cheaper than court, it\'s private, and for parenting matters you usually have to try it first anyway.',
  ],
  18: [
    'A client of ours (details changed) wanted to stay in the house for the kids. The problem: she couldn\'t refinance on one income.',
    'We [what you did, e.g. negotiated a bigger share of the house and less of the super, and timed it with her broker\'s approval].',
    'She kept the house. It doesn\'t work for everyone, but it\'s worth asking about early.',
  ],
  19: [
    '[Name, role]: "[The question they get most.]"',
    '[Name, role]: "[Theirs.]" [Name, role]: "[Theirs.]"',
    'And the most honest one. [Name]: "[Theirs.]"',
  ],
  20: [
    '[What it is: the beach at 6am, coaching the kids\' footy, the garden.]',
    'Family law is heavy. Most days you\'re with people on one of the worst days of their year.',
    'Switching off is how I turn up properly for them the next morning.',
  ],
  21: [
    '[Show the message, name blurred.]',
    'When they first came to us, [what was going on, no details].',
    'Messages like this are why we do the job.',
  ],
  22: [
    'One: money suddenly moving. A new account, a family member, or "paying back a loan" you\'ve never heard of.',
    'Two: the business is suddenly doing badly, right as you separate.',
    'Three: they won\'t hand over statements, or they keep "losing" them. You both have a legal duty to disclose, so tell your lawyer early.',
  ],
  23: [
    '[The one thing, e.g. "The way you behave in the first month matters more than you think. Messages get screenshotted."]',
    '[Why, with one real example, no names.]',
    'If you\'re at the start of this, that\'s the one thing I\'d want you to know.',
  ],
  24: [
    'The divorce itself is the quick part. You need to have been separated for at least 12 months, then you apply, and the divorce takes effect a month and a day after it\'s granted.',
    'Sorting out property and the kids is separate, and that\'s what takes the time.',
    'One date to know: once your divorce is final, you have 12 months to apply for property orders.',
  ],
  25: [
    'One: [e.g. full disclosure from both sides in the first month].',
    'Two: [e.g. one valuer both sides agreed on].',
    'Three: [e.g. a mediation where everyone came prepared]. Details changed, but those three things shorten almost every matter.',
  ],
  26: [
    '[Lawyer 1, e.g. property]: "[Their answer.]"',
    '[Lawyer 2, e.g. parenting]: "[Their answer.]"',
    'Where we agree: [one line].',
  ],
  27: [
    '[Play the best 15 seconds of the episode.]',
    'The part that surprised me: [one line].',
    'The full episode is in the bio.',
  ],
  28: [
    'No sales pitch. Bring your questions about separation, the kids, property, wills, whatever\'s on your mind, and we\'ll answer as many as we can.',
    'It\'s at [venue], [time] to [time]. Seats are limited to [number].',
  ],
  29: [
    'There\'s no starting point of half each.',
    'The court looks at what each of you contributed, money and otherwise, and what you\'ll each need from here.',
    'That\'s why 60/40 and 70/30 splits happen all the time.',
  ],
  30: [
    '[One number: views, follows or enquiries.] [One surprise: which post did best, and why you think it did.]',
    'Next month I\'m [what you\'re changing].',
  ],
};

module.exports = POSTS.map((p) => {
  const [format, length, shoot, cta, onscreen, caption] = DETAILS[p.day];
  const e = EXAMPLES[p.day];
  return {
    ...p,
    dow: DOW[(p.day - 1) % 7],
    week: Math.min(4, Math.ceil(p.day / 7)),
    time: '7:30am',
    format, length, shoot, script: SCRIPTS[p.day], cta, onscreen, caption,
    example: e && { who: e[0], views: e[1], hook: e[2], url: e[3], platform: 'YouTube Shorts' },
  };
});
