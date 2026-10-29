const { ink: i, guide: g } = require('../lib');

const black = { stroke: '#1B1B1B', sw: 2.5 };

module.exports = {
  number: 1,
  title: 'Why Organic Content Wins',
  runtime: '12 to 15 min',
  outcome: 'The firm owner understands why content is now part of how clients choose a firm, and writes down where they are starting from.',
  slides: [
    { type: 'cover', title: 'Why Organic\nContent Wins' },

    { type: 'divider', lead: 'The BIG', word: 'Problems', tone: 'problem', notes: { say: ['Three problems almost every firm we work with has before they start posting.'] } },
    {
      type: 'point', tone: 'problem', n: 1, text: "Strangers Don't Trust You Yet",
      notes: { say: ['Most people who could hire you have never heard of you. Even the ones who have do not know what you actually do, or whether they can trust you with something this important.'] },
    },
    {
      type: 'point', tone: 'problem', n: 2, text: 'Referrals Stop When You Slow Down',
      notes: { say: ['Referrals are great work, but you do not control the tap. One accountant retires or one partner moves on and it dries up. Ads stop the second you stop paying.'] },
    },
    {
      type: 'point', tone: 'problem', n: 3, text: 'They Check You Out and Find Nothing',
      notes: { say: ['Nobody books cold anymore. They Google you and open your socials first. An empty page, or a last post from 2022, and they quietly go to the next firm.'] },
    },

    { type: 'divider', word: 'OPPORTUNITY', tone: 'idea', notes: { say: ['Each of those problems has a matching opportunity, and content is the answer to all three.'] } },
    {
      type: 'point', tone: 'idea', n: 1, text: 'Build Trust Before the First Call',
      notes: { say: ['Content does the know-and-trust work for you, at scale, before anyone picks up the phone.'] },
    },
    {
      type: 'point', tone: 'idea', n: 2, text: 'Own a Channel That Compounds',
      notes: { say: ['A video you post this month is still building trust in six months. It is the only channel that stacks.'] },
    },
    {
      type: 'point', tone: 'idea', n: 3, text: 'Win the Check-Out Stage',
      notes: { say: ['When they look you up, they find three to five videos that answer their questions. That is where you win the client.'] },
    },

    {
      type: 'board',
      title: 'The Trust Gap',
      guide:
        g.line(110, 250, 300, 250, black) + g.line(300, 250, 300, 640, black) +
        g.line(760, 250, 950, 250, black) + g.line(760, 250, 760, 640, black),
      ink:
        i.text(96, 150, 'Stranger', 'red', 52) +
        i.text(100, 200, 'scrolling past', 'red', 32) +
        i.text(800, 150, 'Client', 'green', 52) +
        i.text(790, 200, 'books + refers', 'green', 32) +
        i.curve([[305, 236], [420, 150], [540, 128], [660, 150], [752, 232]], 'purple', 6) +
        i.text(530, 112, 'CONTENT', 'purple', 44, { anchor: 'middle' }) +
        i.wave(40, 1010, 445, 'blue', 4) +
        i.text(54, 352, 'Know', 'blue', 40, { rot: -78 }) +
        i.text(54, 590, 'Trust', 'blue', 40, { rot: -78 }) +
        i.text(108, 310, '"Who are you?"', 'red', 34) +
        i.text(108, 350, '"What do you do?"', 'red', 30) +
        i.text(108, 530, '"Can I trust', 'red', 34) +
        i.text(108, 568, ' you with this?"', 'red', 34) +
        i.text(780, 310, 'Clear on what', 'green', 34) +
        i.text(780, 348, 'you do', 'green', 34) +
        i.text(780, 530, 'Feels like they', 'green', 34) +
        i.text(780, 568, 'already know you', 'green', 34),
      notes: {
        say: [
          'Every client you have ever signed started as a stranger. The gap between stranger and client is trust.',
          'Top half is "know": do they understand what you actually do? Bottom half is "trust": do they feel safe handing you their divorce, their business sale, their home loan?',
          'Referrals jump the gap for you because someone else lends you their trust. Content is how you build that bridge yourself, at scale, while you sleep.',
        ],
        draw: [
          'Write "Stranger" on the left cliff in red, "Client" on the right in green.',
          'Draw the blue wavy line across the middle. Label the top "Know", the bottom "Trust".',
          'Fill each quadrant with what the person is thinking.',
          'Finish by drawing the purple bridge across the gap and writing CONTENT on it.',
        ],
      },
    },

    {
      type: 'board',
      title: 'Where Your Clients Come From',
      guide:
        g.circle(46, 330, 7, { fill: '#CDD0CF' }) +
        g.circle(46, 360, 7, { fill: '#CDD0CF' }) +
        g.circle(46, 390, 7, { fill: '#CDD0CF' }) +
        g.pills(80, 520, 6, 52) +
        [1, 2, 3, 4, 5, 6].map((k) => g.text(112 + (k - 1) * 52, 572, `m${k}`, { size: 12, anchor: 'middle' })).join(''),
      ink:
        i.curve([[46, 390], [200, 393], [330, 398], [372, 420], [382, 520], [384, 690]], 'red', 6, { arrow: true }) +
        i.text(400, 640, 'Referrals', 'red', 40) +
        i.text(400, 676, 'stop when a partner slows down', 'red', 28) +
        i.curve([[46, 360], [300, 362], [600, 358], [760, 360]], 'orange', 6, { arrow: true }) +
        i.text(780, 372, 'Paid ads', 'orange', 40) +
        i.text(780, 406, 'stop when spend stops', 'orange', 28) +
        i.curve([[46, 330], [260, 322], [480, 280], [700, 190], [900, 90]], 'dkgreen', 6, { arrow: true }) +
        i.text(620, 130, 'Organic content', 'dkgreen', 42) +
        i.text(640, 166, 'compounds', 'dkgreen', 32) +
        i.circle(232, 520, 196, 48, 'purple'),
      notes: {
        say: [
          'Three ways clients find most firms. Referrals: great quality, but you do not control the tap. One accountant retires, one partner moves firms, and it drops off a cliff.',
          'Paid ads: you control the tap, but the second you stop paying, it stops.',
          'Organic content is the only one that compounds. A video you post in month one is still getting watched and still building trust in month six.',
          'The first few months look flat. That is normal. Most firms quit right here, inside the purple circle.',
        ],
        draw: [
          'Red line from the bottom dot: flat, then drops off a cliff. Label "Referrals".',
          'Orange line from the middle dot: flat forever. Label "Paid ads".',
          'Green line from the top dot: slow then curves up. Label "Organic content, compounds".',
          'Circle the first three months in purple: "this is where most firms quit".',
        ],
      },
    },

    {
      type: 'board',
      title: 'How Clients Check You Out',
      guide:
        [0, 1, 2, 3, 4]
          .map((k) => {
            const x = 130 + k * 200;
            return (
              g.circle(x, 300, 62) +
              g.text(x, 307, String(k + 1), { size: 28, anchor: 'middle' }) +
              (k < 4 ? g.line(x + 72, 300, x + 128, 300) + g.arrowHead(x + 128, 300, 'right') : '')
            );
          })
          .join(''),
      ink:
        i.text(130, 420, 'Hears your\nname', 'blue', 32, { anchor: 'middle' }) +
        i.text(330, 420, 'Googles\nyou', 'blue', 32, { anchor: 'middle' }) +
        i.text(530, 420, 'Checks your\nsocials', 'blue', 32, { anchor: 'middle' }) +
        i.text(730, 420, 'Watches 3-5\nvideos', 'blue', 32, { anchor: 'middle' }) +
        i.text(930, 420, 'Books a\ncall', 'dkgreen', 34, { anchor: 'middle' }) +
        i.curve([[460, 220], [520, 168], [630, 150], [740, 168], [800, 220]], 'purple', 5) +
        i.text(630, 128, 'you win or lose it here', 'purple', 36, { anchor: 'middle' }) +
        i.text(530, 560, 'empty page or last post', 'red', 32, { anchor: 'middle' }) +
        i.text(530, 596, 'in 2022 = they go to the', 'red', 32, { anchor: 'middle' }) +
        i.text(530, 632, 'next firm', 'red', 32, { anchor: 'middle' }) +
        i.arrow([[530, 530], [530, 488]], 'red', 4),
      notes: {
        say: [
          'Whether it is a referral or an ad, nobody books a call cold anymore. They check you out first.',
          'They hear your name, they Google you, they open your Instagram or LinkedIn, they watch a few videos, and only then do they book.',
          'Steps three and four are where you win or lose. If your page is empty, or your last post is from 2022, they quietly go to the next firm and you never even know it happened.',
        ],
        draw: [
          'Label the five circles left to right.',
          'Draw the purple arch over 3 and 4: "you win or lose it here".',
          'Red arrow under circle 3: "empty page = they go to the next firm".',
        ],
      },
    },

    {
      type: 'statement',
      text: 'Your content takes the first meeting for you, before they ever pick up the phone.',
      notes: {
        say: [
          'Read it out, then pause.',
          'By the time a good client calls you, they should feel like they already know you. That is what this whole program builds.',
        ],
      },
    },

    {
      type: 'sheet',
      title: 'Your Starting Point',
      minutes: 5,
      cells: [
        { x: 50, y: 70, w: 450, h: 190, label: 'Last 10 clients', prompt: 'Where did each of them come from?', dots: true },
        { x: 500, y: 70, w: 200, h: 190, label: 'Referral %', prompt: 'Share of work from referrals' },
        { x: 700, y: 70, w: 300, h: 190, label: 'Platforms', prompt: "Where are you now? When's the last post?" },
        { x: 50, y: 260, w: 330, h: 190, label: 'Posting now', prompt: 'How often do you post today?' },
        { x: 380, y: 260, w: 620, h: 190, label: 'Biggest blocker', prompt: 'What stops you posting? Be honest.', dots: true },
        { x: 50, y: 450, w: 950, h: 210, label: '90-day goal', prompt: 'What would make content worth it for your firm?', dots: true },
      ],
      ink:
        i.text(70, 130, '6 referrals (2 accountants)', 'blue', 32) +
        i.text(70, 168, '2 Google, 1 walk-in, 1 old client', 'blue', 32) +
        i.text(560, 180, '60%', 'red', 72) +
        i.text(716, 130, 'LinkedIn: 2023', 'orange', 32) +
        i.text(716, 168, 'Instagram: 3 posts', 'orange', 32) +
        i.text(70, 330, 'Once a month', 'orange', 36) +
        i.text(70, 370, '(maybe)', 'orange', 32) +
        i.text(400, 330, 'No time + no idea what to say', 'red', 36) +
        i.text(400, 372, "+ don't love being on camera", 'red', 32) +
        i.text(70, 530, '1 enquiry a week from content', 'dkgreen', 42) +
        i.text(70, 580, 'without me spending more than 2 hrs a week on it', 'dkgreen', 34),
      notes: {
        say: [
          'Pause the video and fill this in. It takes five minutes and it is the baseline we measure against at day 30.',
          'Be honest in the blocker box. "No time" and "I do not know what to say" are the two big ones, and the next modules fix both.',
        ],
        draw: ['Fill it in as an example firm so they can see the level of detail you want.'],
      },
    },

    {
      type: 'next',
      checklist: [
        'Write down where your last 10 clients came from',
        'Google your firm. Screenshot what a stranger sees',
        'Open your Instagram + LinkedIn. When was the last post?',
        'Fill in "Your Starting Point"',
        'Pick ONE main platform to start on',
      ],
      notes: {
        say: [
          'Takeaways: clients check you out before they call, and content is the only channel that compounds.',
          'Do the five things on the checklist before you start Module 2.',
        ],
      },
    },

    { type: 'notes' },
  ],
};
