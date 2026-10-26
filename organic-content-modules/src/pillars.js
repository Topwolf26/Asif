// The four organic content pillars (Cormac's framework), built out for law
// firms, plus a 30-day calendar with one post a day. Examples use family
// law; firms swap in their own practice area.
// Used by the Organic Content Pillars module and its CSV.

const PILLARS = {
  Connection: {
    color: '#1E63F0',
    ask: 'Do I like you? Do you get what I\'m going through?',
    trap: 'Disconnect: only tips and results, so they never meet the person behind the firm.',
    why: 'People buy people. Your character is your strongest selling point.',
    types: [
      {
        name: 'Character',
        what: 'Your opinions, your beliefs, what you go against the grain on.',
        ideas: ['Why you became a lawyer', 'Your take on this week\'s news (beliefs, not party politics)', 'An unpopular opinion about your industry'],
        hook: 'Unpopular opinion: most separations should never go near a courtroom.',
      },
      {
        name: 'Day',
        what: 'Document what you already do: court, meetings, the drive, the 7am coffee.',
        ideas: ['A day in the life', 'Come with me to court (no client details)', 'What you do outside the office'],
        hook: 'What a Tuesday actually looks like for a family lawyer.',
      },
      {
        name: 'Team',
        what: 'Put faces to the firm. Collab posts with the people clients will deal with.',
        ideas: ['Meet [name] and what they look after', 'Ask our in-house accountant', 'Two lawyers, two specialties, one question'],
        hook: 'This is [name]. If you\'ve ever [problem], she\'s who you want.',
      },
    ],
    example: ['Jimenez Mazzitelli Mordes Law (Miami)', '160K views', '"Day in the Life as an Attorney at a Miami Law Firm". The firm usually gets hundreds.', 'youtube.com/shorts/4Rh7NiRSFcw'],
  },
  Value: {
    color: '#16A34A',
    ask: 'Is this helpful? Do I understand my situation better now?',
    trap: 'Lecturing: "you should do this", too detailed, too much in one video.',
    why: 'One slice of the cake per video. The deeper you know it, the simpler you explain it.',
    types: [
      {
        name: 'Pain points',
        what: 'The thing keeping your clients up at night, answered honestly.',
        ideas: ['"Will I lose the house?"', 'The most expensive mistake you see', 'What happens with the kids'],
        hook: "'Will I lose the house?' Here's the honest answer.",
      },
      {
        name: 'Challenges / obstacles',
        what: 'Call out the exact situation they\'re stuck in, then show the way through.',
        ideas: ['Your ex won\'t cooperate: 3 options', 'Just separated? Do this first', '3 red flags your ex is hiding assets'],
        hook: 'If you\'ve just separated and don\'t know what to do first, watch this.',
      },
      {
        name: 'Simplifying concepts',
        what: 'Take a term or process people get stuck on and say it in plain English.',
        ideas: ['A "Law in 30 Seconds" series', 'The 50/50 myth', 'What mediation actually is'],
        hook: 'What a binding financial agreement actually is, in 30 seconds.',
      },
    ],
    example: ['Law By Mike (US)', '39M views', '"Things You Think Are Illegal, That Are Actually Legal": one concept, made simple.', 'youtube.com/shorts/eq1rjRBGwp8'],
  },
  Proof: {
    color: '#F29A16',
    ask: 'Are you legit? Who have you actually helped?',
    trap: 'Disbelief: great talker, but no sign of real clients or results.',
    why: 'Knowing the law isn\'t enough. Show the people you\'ve helped.',
    types: [
      {
        name: 'Testimonial',
        what: 'A client on camera in their own words, with written permission.',
        ideas: ['Ask happy clients when the matter closes', '20 seconds: "what it was like working with us"', 'Read a Google review out on camera'],
        hook: 'Don\'t take it from me. Here\'s what [client] said.',
      },
      {
        name: 'Case study',
        what: 'Start with the outcome, then walk through how you got there. De-identified.',
        ideas: ['"Is it possible to [result]? Yes."', 'From first call to settled in [X] months', 'The 3 things that made the difference'],
        hook: 'A client came to us after [obstacle]. [X] months later, [outcome].',
      },
      {
        name: 'Screenshots',
        what: 'The thank-you emails and texts you already get. Names blurred, with permission.',
        ideas: ['"This message made our week"', 'Review of the month', 'A timeline of a matter (no details)'],
        hook: 'This message made our whole week.',
      },
    ],
    example: ['Mike Rafi, injury lawyer (US)', '7.9M views', '"We Sued Uber, Won, and Can Talk About It": the result first, then the story.', 'youtube.com/shorts/06EJuEqfwBk'],
  },
  Invitation: {
    color: '#A51CC9',
    ask: 'How do I get started with you?',
    trap: 'Selling: a pitch in every post. Give publicly, sell privately. Let your ads do the selling.',
    why: 'Invite them into your world. It shouldn\'t feel like a sale, just an open door.',
    types: [
      {
        name: 'Resource',
        what: 'A free checklist, guide or short training they get by commenting a keyword.',
        ideas: ['First-meeting checklist (comment CHECKLIST)', 'A "first 30 days after separating" guide', 'A free 15-min explainer video'],
        hook: 'I made a checklist of everything to bring to your first meeting. Comment CHECKLIST.',
      },
      {
        name: 'Events',
        what: 'Meet people in person: a free Q&A night, a coffee meetup, a local talk.',
        ideas: ['Free legal Q&A night', '"Coffee\'s on me, [suburb], Friday 8am"', 'A talk at a local business group'],
        hook: 'We\'re running a free Q&A night in [suburb]. Comment SEAT for details.',
      },
      {
        name: 'Workshops',
        what: 'A low-cost, deeper session for people who\'ve been following for a while.',
        ideas: ['Separation 101 (2 hours)', 'A wills and estates evening', 'An online workshop for business owners'],
        hook: 'Want to go deeper on this? I\'m running a 2-hour workshop on [date].',
      },
    ],
    example: ['Splatt Lawyers (Qld, Australia)', '140K views', '"What Happens When You Call Splatt Lawyers for Help?" An open door, not a pitch.', 'youtube.com/shorts/fY_X4yGkMog'],
  },
};

// Day 1 is a Monday. One post a day.
// Week: Mon value · Tue character · Wed "Law in 30 Seconds" series · Thu proof
// · Fri team/collab · Sat day · Sun alternates value / invitation / proof.
// 13 connection, 10 value, 5 proof, 2 invitation: give publicly, sell privately.
const POSTS = [
  [1, 'Value', 'Pain points', 'The costliest mistake', 'The most expensive mistake I see in family law? Signing before getting advice.'],
  [2, 'Connection', 'Character', 'Why I became a lawyer', 'Why I became a family lawyer (it wasn\'t the money).'],
  [3, 'Value', 'Simplifying concepts', 'Law in 30 Seconds #1', 'Law in 30 Seconds: what a binding financial agreement actually is.'],
  [4, 'Proof', 'Case study', 'A result, start to finish', 'A client came to us after [obstacle]. [X] months later, [outcome]. Here\'s how.'],
  [5, 'Connection', 'Team', 'Meet [team member]', 'This is [name]. If you\'ve ever [problem], she\'s who you want.'],
  [6, 'Connection', 'Day', 'A day in the life', 'What a Tuesday actually looks like for a family lawyer.'],
  [7, 'Value', 'Challenges / obstacles', 'Just separated? Do this', 'If you\'ve just separated and don\'t know what to do first, watch this.'],
  [8, 'Value', 'Pain points', '"Will I lose the house?"', "'Will I lose the house?' Here's the honest answer."],
  [9, 'Connection', 'Character', 'My take on the news', 'Everyone\'s talking about [news]. Here\'s what it actually means for you.'],
  [10, 'Value', 'Simplifying concepts', 'Law in 30 Seconds #2', 'Law in 30 Seconds: what "just and equitable" really means.'],
  [11, 'Proof', 'Testimonial', 'A client in their words', 'Don\'t take it from me. Here\'s what [client] said (shared with permission).'],
  [12, 'Connection', 'Team', 'Ask our accountant', 'I asked our in-house accountant the tax question every separating couple asks.'],
  [13, 'Connection', 'Day', 'Come with me to court', 'Come with me to court today (no client details, promise).'],
  [14, 'Invitation', 'Resource', 'Free first-meeting checklist', 'I made a checklist of everything to bring to your first meeting. Comment CHECKLIST.'],
  [15, 'Value', 'Challenges / obstacles', 'Ex won\'t cooperate?', 'Your ex won\'t sign anything. Here are your 3 options.'],
  [16, 'Connection', 'Character', 'Unpopular opinion', 'Unpopular opinion: most separations should never go near a courtroom.'],
  [17, 'Value', 'Simplifying concepts', 'Law in 30 Seconds #3', 'Law in 30 Seconds: what actually happens at mediation.'],
  [18, 'Proof', 'Case study', 'Is it possible to...?', 'Is it possible to keep the family home after separating? Yes. Here\'s one way.'],
  [19, 'Connection', 'Team', 'The question we get most', 'We asked everyone in the office the question they get asked most.'],
  [20, 'Connection', 'Day', 'Outside the office', 'This is what keeps me sane in a job like this.'],
  [21, 'Proof', 'Screenshots', 'This message made our week', 'This message made our whole week. (Name blurred, shared with permission.)'],
  [22, 'Value', 'Challenges / obstacles', '3 red flags', '3 red flags your ex is hiding assets.'],
  [23, 'Connection', 'Character', 'What I wish clients knew', '[X] years in family law. Here\'s what I wish every client knew on day one.'],
  [24, 'Value', 'Simplifying concepts', 'Law in 30 Seconds #4', 'Law in 30 Seconds: how long a divorce actually takes.'],
  [25, 'Proof', 'Case study', 'First call to settled', 'From first call to settled in [X] months. The 3 things that made the difference.'],
  [26, 'Connection', 'Team', 'Two lawyers, one question', 'Two lawyers, two specialties, one question: [question].'],
  [27, 'Connection', 'Day', 'Podcast day', 'Recorded a podcast today on [topic]. Here\'s the part that surprised me.'],
  [28, 'Invitation', 'Events', 'Free Q&A night', 'We\'re running a free Q&A night in [suburb] on [date]. Comment SEAT for details.'],
  [29, 'Value', 'Simplifying concepts', 'The 50/50 myth', 'Everyone thinks a property split is automatically 50/50. It\'s not.'],
  [30, 'Connection', 'Character', '30 days: what I learned', 'I posted every day for 30 days. Here\'s what happened.'],
].map(([day, pillar, type, short, hook]) => ({ day, pillar, type, short, hook }));

module.exports = { PILLARS, POSTS };
