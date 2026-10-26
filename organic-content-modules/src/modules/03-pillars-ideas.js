const { ink: i, guide: g } = require('../lib');

const buckets = [
  'Questions clients ask',
  'Mistakes people make',
  'Myths in your industry',
  'Client stories (no names)',
  'Your opinions',
  'Behind the scenes',
];

// a simple pillar: capital, shaft, base
const pillar = (x) =>
  g.rect(x - 70, 250, 140, 18) + g.rect(x - 50, 268, 100, 300) + g.rect(x - 70, 568, 140, 18);

module.exports = {
  number: 3,
  title: 'Content Pillars and Ideas',
  runtime: '15 min (plus 30 min exercise)',
  outcome: 'The firm has 3 content pillars and a list of 30 video ideas, and knows how to borrow proven structures from outlier videos.',
  slides: [
    { type: 'cover', title: 'Content Pillars\n& Ideas' },

    { type: 'divider', lead: 'The BIG', word: 'Problems', tone: 'problem' },
    { type: 'point', tone: 'problem', n: 1, text: "No Idea What to Post", notes: { say: ["Most firms stall before the first video because they stare at a blank page."] } },
    { type: 'point', tone: 'problem', n: 2, text: "Posting About Everything", notes: { say: ["Random topics mean nobody knows what you are the go-to firm for."] } },
    { type: 'point', tone: 'problem', n: 3, text: "Guessing What Will Work", notes: { say: ["Without a proven structure, every video is a coin toss."] } },

    { type: 'divider', word: 'OPPORTUNITY', tone: 'idea' },
    { type: 'point', tone: 'idea', n: 1, text: "Pick 3 Pillars You Could Talk About for a Year", notes: { say: ["Where your expertise, client questions and opinions overlap."] } },
    { type: 'point', tone: 'idea', n: 2, text: "Turn Every Client Question Into a Video", notes: { say: ["Six idea buckets, thirty ideas in thirty minutes."] } },
    { type: 'point', tone: 'idea', n: 3, text: "Borrow Structures That Already Work", notes: { say: ["Find outliers, copy the shape, never the words."] } },

    {
      type: 'board',
      title: 'Finding Your Content Pillars',
      guide: g.circle(530, 270, 165) + g.circle(430, 440, 165) + g.circle(630, 440, 165),
      ink:
        i.text(530, 180, 'What you know', 'blue', 36, { anchor: 'middle' }) +
        i.text(530, 214, '(your expertise)', 'blue', 28, { anchor: 'middle' }) +
        i.text(330, 500, 'What clients', 'orange', 36, { anchor: 'middle' }) +
        i.text(330, 534, 'ask you', 'orange', 36, { anchor: 'middle' }) +
        i.text(730, 500, 'What you', 'purple', 36, { anchor: 'middle' }) +
        i.text(730, 534, 'believe', 'purple', 36, { anchor: 'middle' }) +
        i.text(530, 392, 'PILLARS', 'dkgreen', 40, { anchor: 'middle' }) +
        i.circle(530, 380, 78, 34, 'dkgreen'),
      notes: {
        say: [
          'Your content pillars live where three things overlap: what you know, what clients actually ask you, and what you believe about your industry.',
          'Expertise alone is a textbook. Questions alone is a FAQ page. Your opinions are what make people pick you over the firm down the road.',
        ],
        draw: ['Label each circle, then circle the middle and write PILLARS.'],
      },
    },

    {
      type: 'board',
      title: 'Pick 3 Pillars',
      guide:
        g.path('M220,236 L530,110 L840,236 Z') + pillar(300) + pillar(530) + pillar(760) +
        g.line(180, 600, 880, 600, { sw: 4 }),
      ink:
        i.text(530, 214, 'Your firm', 'purple', 38, { anchor: 'middle' }) +
        i.text(300, 380, 'Separation', 'blue', 32, { anchor: 'middle' }) +
        i.text(300, 414, '+ property', 'blue', 32, { anchor: 'middle' }) +
        i.text(530, 380, 'Kids +', 'blue', 32, { anchor: 'middle' }) +
        i.text(530, 414, 'parenting', 'blue', 32, { anchor: 'middle' }) +
        i.text(760, 380, 'Life after', 'blue', 32, { anchor: 'middle' }) +
        i.text(760, 414, 'divorce', 'blue', 32, { anchor: 'middle' }) +
        i.text(530, 660, 'Finance broker: home loans · business finance · money mistakes', 'orange', 30, { anchor: 'middle' }),
      notes: {
        say: [
          'Pick three pillars. Not seven. Three topics you could talk about for a year.',
          'For a family law firm: separation and property, kids and parenting, and life after divorce.',
          'For a finance broker: home loans, business finance, and money mistakes. Every video should sit on one of these three.',
        ],
        draw: ['Write your firm on the roof, one pillar topic in each column. Add a second example underneath in orange.'],
      },
    },

    {
      type: 'board',
      title: 'The Idea Machine',
      guide: buckets
        .map((b, k) => {
          const x = 70 + (k % 3) * 310;
          const y = 90 + Math.floor(k / 3) * 290;
          return g.rect(x, y, 290, 260, { r: 8 }) + g.text(x + 14, y + 26, b, { size: 14 });
        })
        .join(''),
      ink:
        i.text(84, 160, '"Will I lose the house?"', 'blue', 28) +
        i.text(84, 196, '"How long does it take?"', 'blue', 28) +
        i.text(394, 160, 'Signing before getting', 'red', 28) +
        i.text(394, 196, 'advice', 'red', 28) +
        i.text(704, 160, '"50/50 is automatic"', 'orange', 28) +
        i.text(704, 196, '"Mediation is pointless"', 'orange', 28) +
        i.text(84, 450, 'Dad who thought he\'d', 'dkgreen', 28) +
        i.text(84, 486, 'never see his kids...', 'dkgreen', 28) +
        i.text(394, 450, 'Most people wait', 'purple', 28) +
        i.text(394, 486, '6 months too long', 'purple', 28) +
        i.text(704, 450, 'Prepping for court,', 'blue', 28) +
        i.text(704, 486, 'our Monday meeting', 'blue', 28),
      notes: {
        say: [
          'You will never run out of ideas if you pull from these six buckets.',
          'Questions clients ask you every week. Mistakes people make before they come to you. Myths in your industry. Client stories, with names and details removed. Your opinions. And behind the scenes.',
          'Every bucket is a different angle on the same three pillars.',
        ],
        draw: ['Put one or two real examples in each box.'],
      },
    },

    {
      type: 'statement',
      text: 'Every question a client has ever asked you is a video.',
      notes: { say: ['Start a note on your phone today. Every time a client asks you something, write it down. That is your content calendar for the year.'] },
    },

    {
      type: 'sheet',
      title: '30 Ideas in 30 Minutes',
      minutes: 30,
      cells: buckets.flatMap((b, col) => [
        { x: 50 + col * 158.3, y: 70, w: 158.3, h: 64, label: b },
        ...[0, 1, 2, 3, 4].map((r) => ({
          x: 50 + col * 158.3,
          y: 134 + r * 106,
          w: 158.3,
          h: 106,
          html: `<div class="num">${col * 5 + r + 1}</div>`,
        })),
      ]),
      ink:
        i.text(76, 186, 'Will I lose', 'blue', 26) + i.text(76, 212, 'the house?', 'blue', 26) +
        i.text(234, 186, 'Signing too', 'red', 26) + i.text(234, 212, 'early', 'red', 26) +
        i.text(392, 186, '50/50 is', 'orange', 26) + i.text(392, 212, 'automatic', 'orange', 26) +
        i.text(551, 186, 'Dad + kids', 'dkgreen', 26) + i.text(551, 212, 'story', 'dkgreen', 26) +
        i.text(709, 186, 'Don\'t wait', 'purple', 26) + i.text(709, 212, '6 months', 'purple', 26) +
        i.text(867, 186, 'Monday', 'blue', 26) + i.text(867, 212, 'meeting', 'blue', 26) +
        i.text(76, 292, 'How long', 'blue', 26) + i.text(76, 318, 'does it take?', 'blue', 26),
      notes: {
        say: [
          'Set a 30-minute timer. Five ideas per bucket. Do not judge them, just write.',
          'Bad ideas are fine. You need 30 to find the 13 good ones for your first month.',
          'Shortcut: give Claude your three pillars and your practice area and ask it for 10 ideas per bucket, then circle the ones that sound like you.',
        ],
        draw: ['Fill the first row as an example.'],
      },
    },

    {
      type: 'board',
      title: 'The Outlier Method',
      guide:
        [0, 1, 2]
          .map((k) => {
            const x = 70 + k * 330;
            return g.rect(x, 200, 260, 200, { r: 10 }) + (k < 2 ? g.line(x + 270, 300, x + 320, 300) + g.arrowHead(x + 320, 300, 'right') : '');
          })
          .join('') +
        g.text(84, 226, '1', { size: 20 }) + g.text(414, 226, '2', { size: 20 }) + g.text(744, 226, '3', { size: 20 }),
      ink:
        i.text(200, 280, 'Find an outlier', 'blue', 34, { anchor: 'middle' }) +
        i.text(200, 322, '5x+ their usual', 'blue', 28, { anchor: 'middle' }) +
        i.text(200, 354, 'views', 'blue', 28, { anchor: 'middle' }) +
        i.text(530, 280, 'Strip it to a', 'purple', 34, { anchor: 'middle' }) +
        i.text(530, 316, 'template', 'purple', 34, { anchor: 'middle' }) +
        i.text(530, 356, 'keep the structure', 'purple', 28, { anchor: 'middle' }) +
        i.text(860, 280, 'Fill it with', 'dkgreen', 34, { anchor: 'middle' }) +
        i.text(860, 316, 'YOUR expertise', 'dkgreen', 34, { anchor: 'middle' }) +
        i.text(530, 500, 'Copy the shape, never the words', 'red', 40, { anchor: 'middle' }) +
        i.under(300, 516, 460, 'red'),
      notes: {
        say: [
          'Viral is not luck. Find a video from a small or mid-sized account that got five times their normal views. That is an outlier.',
          'Ignore the topic. Look at the structure: how the hook works, how the points are ordered, how it ends.',
          'Then pour your expertise into that same structure. You can paste the transcript into Claude and ask it to turn it into a fill-in-the-blank template.',
          'Copy the shape, never the words.',
        ],
        draw: ['Label the three boxes, then the red rule underneath.'],
      },
    },

    {
      type: 'next',
      checklist: [
        'Pick your 3 content pillars',
        'Start a "client questions" note on your phone',
        'Do 30 ideas in 30 minutes',
        'Save 3 outlier videos from your niche',
        'Circle your best 13 ideas for Module 4',
      ],
      notes: { say: ['Takeaway: three pillars, six buckets, thirty ideas. You will never stare at a blank page again.'] },
    },

    { type: 'notes' },
  ],
};
