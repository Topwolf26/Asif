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

// day: [format, length, shoot, [3 beats], CTA, on-screen text, caption]
const DETAILS = {
  1: [TH, '30-45 sec', true, ['Name the mistake in one sentence.', 'Why people make it: the pressure they are under at the time.', 'What to do instead, in one step.'], 'Follow for more straight answers about family law.', 'The costliest mistake in family law', 'The most expensive mistake I see? Signing before getting advice. Here is what to do instead. Follow for more straight answers.'],
  2: [TH, '30-45 sec', true, ['The moment you decided to do this work. One real story.', 'What you saw that you wanted to do differently.', 'Who you help now, and how.'], 'Follow if you\'re going through a separation.', 'Why I became a family lawyer', 'It wasn\'t the money. Here is why I became a family lawyer, and who I help now.'],
  3: [`${TH} + text on screen`, '30 sec', true, ['Say the term and what people think it means.', 'What it actually is, in plain English.', 'When it matters for you.'], 'Follow for the next Law in 30 Seconds.', 'Law in 30 Seconds: binding financial agreements', 'Law in 30 Seconds, episode 1: what a binding financial agreement actually is. Follow for episode 2.'],
  4: [TH, '45-60 sec', true, ['Start with the outcome (details changed, client\'s OK).', 'The obstacle that made it hard.', 'The 2 or 3 steps that got there.'], 'DM "CALL" if this sounds like you.', 'From [obstacle] to [outcome]', 'A client came to us after [obstacle]. [X] months later, [outcome]. Details changed, shared with permission. DM "CALL" if this sounds like you.'],
  5: ['Collab, talking head', '30 sec', true, ['Introduce them by name and role.', 'The question they get asked most, and their answer.', 'Something human: why they do this work.'], 'Follow to meet more of the team.', 'Meet [name]', 'Meet [name], who looks after [area]. If you\'ve ever [problem], she\'s who you want.'],
  6: ['B-roll + voiceover', '20-30 sec', false, ['Morning: first coffee or the team meeting.', 'Midday: one real task (no client details on screen).', 'End of day: one thing you learned or loved.'], 'Follow to see more behind the scenes.', 'A day in the life of a family lawyer', 'What a Tuesday actually looks like for a family lawyer.'],
  7: [TH, '30-45 sec', true, ['Call out the situation: just separated, no idea where to start.', 'The first two things to do this week.', 'The one thing not to do yet.'], 'Save this and send it to someone who needs it.', 'Just separated? Do this first', 'Just separated and don\'t know where to start? Do these two things this week. Save this for later.'],
  8: [TH, '30-45 sec', true, ['Say the question the way clients ask it.', 'The honest answer: it depends, and on what.', 'The one thing that helps most.'], 'Follow for more straight answers.', 'Will I lose the house?', '"Will I lose the house?" It\'s the question I get most. Here is the honest answer.'],
  9: [TH, '30-45 sec', true, ['The news story in one line.', 'What it actually means for people in your area.', 'Your take: what you believe should happen.'], 'Agree or disagree? Tell me in the comments.', 'My take: [news]', 'Everyone\'s talking about [news]. Here is what it actually means for you, and what I think.'],
  10: [`${TH} + text on screen`, '30 sec', true, ['Say the phrase people hear but don\'t understand.', 'What it actually means, in plain English.', 'A quick example.'], 'Follow for episode 3.', 'Law in 30 Seconds: "just and equitable"', 'Law in 30 Seconds, episode 2: what "just and equitable" really means.'],
  11: ['Client on camera', '20-45 sec', false, ['Ask: what was going on when you called us?', 'Ask: what was it like working with us?', 'Ask: what would you tell someone in your shoes?'], 'If this is you, DM "CALL".', 'In their words', 'Don\'t take it from me. Here is what [client] said (shared with permission).'],
  12: ['Collab, talking head', '30-45 sec', true, ['You ask the tax question every separating couple asks.', 'Your accountant answers in plain English.', 'One thing to do before you sign anything.'], 'Follow for more from the team.', 'I asked our accountant', 'I asked our in-house accountant the tax question every separating couple asks. Here is the answer.'],
  13: ['B-roll + voiceover', '20-30 sec', false, ['Walking in: what the morning before court feels like.', 'What actually happens (no client details).', 'Walking out: one thing people don\'t expect.'], 'Follow to see more behind the scenes.', 'Come with me to court', 'Come with me to court today. No client details, just what it is actually like.'],
  14: [TH, '20-30 sec', true, ['The problem: people turn up to the first meeting without what they need.', 'Three things on the checklist.', 'How to get the full list.'], 'Comment CHECKLIST and I\'ll send it to you.', 'Free first-meeting checklist', 'I made a checklist of everything to bring to your first meeting. Comment CHECKLIST and I\'ll send it.'],
  15: [TH, '30-45 sec', true, ['Call out the situation: they won\'t sign or reply.', 'Your 3 options, one line each.', 'Which one most people should try first.'], 'Save this for later.', 'Your ex won\'t cooperate? 3 options', 'Your ex won\'t sign anything. Here are your 3 options.'],
  16: [TH, '20-30 sec', true, ['State the opinion in one sentence.', 'Why you believe it: one real example.', 'What you do about it at your firm.'], 'Agree or disagree? Comment below.', 'Unpopular opinion', 'Unpopular opinion: most separations should never go near a courtroom. Agree or disagree?'],
  17: [`${TH} + text on screen`, '30 sec', true, ['Say what people picture when they hear "mediation".', 'What actually happens, step by step.', 'Who it\'s right for.'], 'Follow for episode 4.', 'Law in 30 Seconds: mediation', 'Law in 30 Seconds, episode 3: what actually happens at mediation.'],
  18: [TH, '30-45 sec', true, ['The question: is it possible to keep the family home?', 'What made it look impossible (details changed).', 'How it got done.'], 'DM "CALL" if this is you.', 'Can you keep the family home?', 'Is it possible to keep the family home after separating? Yes. Here is one way we did it (details changed).'],
  19: ['Collab, quick cuts', '30 sec', false, ['Ask each person in the office the question they get most.', 'Quick cuts, one answer each.', 'End on the most honest one.'], 'Follow to meet the team.', 'The question we get asked most', 'We asked everyone in the office the question they get asked most.'],
  20: ['B-roll + voiceover', '20 sec', false, ['Show what you do to switch off: family, sport, the beach.', 'Why it matters in a job like this.', 'One line on what it gives your clients.'], 'Follow along.', 'Outside the office', 'This is what keeps me sane in a job like this.'],
  21: ['Screenshot + voiceover', '15-20 sec', false, ['Show the message (name blurred, with permission).', 'What was going on for them when they came to you.', 'What it means to the team.'], 'If you\'re where they were, DM "CALL".', 'This message made our week', 'This message made our whole week. Name blurred, shared with permission.'],
  22: [`${TH} + text on screen`, '30 sec', true, ['Red flag 1, and what it can mean.', 'Red flag 2.', 'Red flag 3, and what to do if you see it.'], 'Save this for later.', '3 red flags your ex is hiding assets', '3 red flags your ex is hiding assets, and what to do if you spot one.'],
  23: [TH, '30-45 sec', true, ['How long you have done this.', 'The one thing you wish every client knew on day one.', 'Why it changes how things go.'], 'Follow if you\'re going through this.', 'What I wish every client knew', '[X] years in family law. Here is what I wish every client knew on day one.'],
  24: [`${TH} + text on screen`, '30 sec', true, ['The question: how long does a divorce take?', 'The real timeline, step by step.', 'What speeds it up or slows it down.'], 'Follow for the next series.', 'Law in 30 Seconds: how long a divorce takes', 'Law in 30 Seconds, episode 4: how long a divorce actually takes.'],
  25: [TH, '45-60 sec', true, ['The timeline: first call to settled in [X] months.', 'The 3 things that made the difference.', 'What the client said at the end.'], 'DM "CALL" to start yours.', 'First call to settled in [X] months', 'From first call to settled in [X] months. The 3 things that made the difference (details changed).'],
  26: ['Collab, two lawyers', '45 sec', true, ['Ask the question you both get asked.', 'Each lawyer answers from their specialty.', 'Where the answers agree.'], 'Follow for more from the team.', 'Two lawyers, one question', 'Two lawyers, two specialties, one question: [question].'],
  27: ['B-roll + podcast clip', '30-45 sec', false, ['Behind the scenes walking into the podcast.', 'The best 15-second clip from the episode.', 'Where to listen to the full thing.'], 'Full episode: link in bio.', 'Podcast day', 'Recorded a podcast today on [topic]. Here is the part that surprised me. Full episode in bio.'],
  28: [TH, '20-30 sec', true, ['What it is: a free Q&A night, no sales pitch.', 'Who it\'s for and what you will cover.', 'Where, when, and how to get a seat.'], 'Comment SEAT and I\'ll send the details.', 'Free Q&A night: [date]', 'We\'re running a free Q&A night in [suburb] on [date]. No pitch, just answers. Comment SEAT for details.'],
  29: [TH, '20-30 sec', true, ['Say the myth like you believe it.', 'What the law actually looks at.', 'Why 60/40 or 70/30 happens all the time.'], 'Follow for more myths.', 'MYTH: property is split 50/50', 'Everyone thinks a property split is automatically 50/50. It\'s not. Here is what actually happens.'],
  30: [TH, '30-45 sec', true, ['Say it: you posted every day for 30 days.', 'What happened: one number and one surprise.', 'What you are doing next month.'], 'Follow for month two.', '30 days of posting: what happened', 'I posted every day for 30 days. Here is what happened, and what is next.'],
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

module.exports = POSTS.map((p) => {
  const [format, length, shoot, beats, cta, onscreen, caption] = DETAILS[p.day];
  const e = EXAMPLES[p.day];
  return {
    ...p,
    dow: DOW[(p.day - 1) % 7],
    week: Math.min(4, Math.ceil(p.day / 7)),
    time: '7:30am',
    format, length, shoot, beats, cta, onscreen, caption,
    example: e && { who: e[0], views: e[1], hook: e[2], url: e[3], platform: 'YouTube Shorts' },
  };
});
