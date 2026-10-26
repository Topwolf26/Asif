const { ink: i, guide: g, cards } = require('../lib');

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

module.exports = {
  number: 5,
  title: 'Filming Day',
  runtime: '15 min',
  outcome: 'The firm can set up a simple set, run a half-day shoot and film a month of content in one sitting.',
  slides: [
    { type: 'cover', title: 'Filming Day' },

    { type: 'divider', lead: 'The BIG', word: 'Problems', tone: 'problem' },
    { type: 'point', tone: 'problem', n: 1, text: "Filming Every Week Never Lasts", notes: { say: ["A matter blows up and content is the first thing that goes."] } },
    { type: 'point', tone: 'problem', n: 2, text: "Bad Audio Kills Good Advice", notes: { say: ["People will watch a slightly soft video. They won't watch one they can't hear."] } },
    { type: 'point', tone: 'problem', n: 3, text: "Flat on Camera", notes: { say: ["The camera flattens your energy, so normal looks bored."] } },

    { type: 'divider', word: 'OPPORTUNITY', tone: 'idea' },
    { type: 'point', tone: 'idea', n: 1, text: "One Shoot Day = One Month of Content", notes: { say: ["Three to four hours, once a month, twelve to fifteen posts."] } },
    { type: 'point', tone: 'idea', n: 2, text: "A $300 Kit Is Enough to Start", notes: { say: ["Your phone, a lav mic, a tripod and a window."] } },
    { type: 'point', tone: 'idea', n: 3, text: "Run the Day Off a Shot List", notes: { say: ["Set up, warm up, film in blocks, grab b-roll, back up."] } },

    {
      type: 'board',
      title: 'One Day, One Month',
      guide:
        g.circle(220, 380, 130) +
        g.line(370, 380, 470, 380) + g.arrowHead(470, 380, 'right') +
        days.map((d, c) => g.text(530 + c * 66 + 30, 170, d, { size: 14, anchor: 'middle' })).join('') +
        [0, 1, 2, 3].map((r) => days.map((_, c) => g.rect(530 + c * 66, 190 + r * 92, 60, 84, { r: 6 })).join('')).join(''),
      ink:
        i.text(220, 360, 'Shoot', 'purple', 52, { anchor: 'middle' }) +
        i.text(220, 410, 'day', 'purple', 52, { anchor: 'middle' }) +
        i.text(220, 560, '3-4 hours', 'purple', 34, { anchor: 'middle' }) +
        [0, 1, 2, 3].map((r) => [1, 3, 6].map((c) => i.dot(560 + c * 66, 232 + r * 92, ['orange', 'blue', 'dkgreen'][(r + c) % 3], 14)).join('')).join('') +
        i.text(530, 600, '= 12-15 posts', 'dkgreen', 44) +
        i.text(530, 650, 'you only show up once', 'dkgreen', 32),
      notes: {
        say: [
          'The biggest mistake firms make is trying to film something every week. You get busy, a matter blows up, and content is the first thing that goes.',
          'Instead: one shoot day, three to four hours, once a month. That gives you twelve to fifteen posts, three a week.',
          'You show up once. Everything after that is editing and posting, which Claude helps with in Modules 6 and 7.',
        ],
        draw: ['Write "Shoot day" in the circle. Dot Tuesday, Thursday and Sunday every week in the calendar.'],
      },
    },

    {
      type: 'board',
      title: 'The Set (from above)',
      guide:
        g.rect(160, 110, 740, 26, { fill: '#E1E3E2' }) +
        g.circle(530, 300, 46) +
        g.rect(500, 520, 60, 40, { r: 4 }) + g.path('M515,520 L530,488 L545,520') +
        g.circle(330, 420, 34) + g.path('M352,394 L404,350') +
        g.circle(730, 420, 34) + g.path('M708,394 L656,350') +
        g.rect(950, 250, 22, 200, { fill: '#E1E3E2' }),
      ink:
        i.text(530, 100, 'Wall / bookshelf / office', 'black', 28, { anchor: 'middle' }) +
        i.text(530, 312, 'YOU', 'blue', 34, { anchor: 'middle' }) +
        i.arrow([[620, 152], [620, 252]], 'purple') +
        i.text(632, 210, '1-2m off the wall', 'purple', 28) +
        i.text(530, 610, 'Camera at eye level', 'black', 30, { anchor: 'middle' }) +
        i.text(530, 642, '(phone on a tripod is fine)', 'black', 26, { anchor: 'middle' }) +
        i.text(220, 490, 'Key light 45°', 'orange', 32) +
        i.text(690, 490, 'Fill light', 'orange', 32) +
        i.text(690, 520, '(or bounce)', 'orange', 26) +
        i.text(880, 230, 'Window', 'orange', 30) +
        i.text(880, 262, 'beats bad', 'orange', 26) +
        i.text(880, 290, 'lights', 'orange', 26) +
        i.text(70, 260, 'Lav mic', 'red', 32) +
        i.text(70, 292, 'on your collar', 'red', 26) +
        i.arrow([[200, 286], [478, 306]], 'red', 4) +
        i.text(70, 680, 'Bad audio kills a video faster than bad video', 'red', 30),
      notes: {
        say: [
          'This is the whole set, from above. You, one to two metres off the wall so you get some depth.',
          'Camera at eye level, straight on. A phone on a tripod is completely fine to start.',
          'Light at 45 degrees on one side, softer fill on the other. A big window in front of you beats bad lights.',
          'And a lav mic on your collar. People will watch a slightly soft video. They will not watch one they cannot hear.',
        ],
        draw: ['Label each grey shape, then the red rule about audio.'],
      },
    },

    {
      type: 'board',
      title: 'Gear: Start vs Upgrade',
      html: cards(
        [
          { h4: 'START HERE (about $300)', p: '· Your phone (iPhone 13 or newer, 4K 30fps, back camera)\n· Wireless lav mic: Hollyland Lark M2 or DJI Mic\n· Phone tripod with a clamp\n· A window in front of you\n· Free teleprompter app (or bullet points, not a full script)', eg: 'Good enough for 90% of firms for the first 3 months.' },
          { h4: 'UPGRADE (about $3-5k)', p: '· Sony ZV-E10 II + Tamron 20-40mm f/2.8\n  (or Sony a6700 + 35mm f/1.8)\n· 2 x Amaran 100x S lights + Light Dome SE softboxes\n· 2 x light stands + Manfrotto tripod\n· Rode VideoMic Pro+ or the Lark M2\n· Desview T3 teleprompter', eg: 'Worth it once you\'re filming every month and it\'s working.' },
        ],
        { x: 50, y: 74, w: 950, h: 520, cols: 2 }
      ),
      ink:
        i.under(66, 114, 200, 'dkgreen') + i.text(280, 540, 'start here', 'dkgreen', 40, { anchor: 'middle' }) +
        i.text(530, 660, 'Gear doesn\'t fix a bad hook.', 'red', 40, { anchor: 'middle' }),
      notes: {
        say: [
          'Start with your phone, a wireless lav mic and a window. That is about three hundred dollars and it is genuinely enough.',
          'Upgrade to a proper camera and lights once you are filming every month and you know it is working.',
          'Gear does not fix a bad hook. Get the scripts right first.',
        ],
        draw: ['Circle "Start here" in green. Red line underneath.'],
      },
    },

    {
      type: 'board',
      title: 'The Shoot Day Run Sheet',
      guide:
        g.line(200, 100, 200, 680) +
        [0, 1, 2, 3, 4, 5, 6].map((k) => g.circle(200, 110 + k * 94, 12, { fill: '#E1E3E2' })).join(''),
      ink:
        [
          ['9:00', 'Set up, test audio, test light', 'black'],
          ['9:30', 'Warm up: 2 throwaway takes', 'black'],
          ['9:45', 'Block 1: 6-7 reach videos (TOFU)', 'orange'],
          ['11:00', 'Outfit change + coffee', 'black'],
          ['11:15', 'Block 2: connect + convert (MOFU/BOFU)', 'blue'],
          ['12:30', 'B-roll: office, team, desk, walking in', 'purple'],
          ['1:00', 'Done. Back up the card straight away', 'dkgreen'],
        ]
          .map(([t, s, c], k) => i.text(70, 120 + k * 94, t, c, 34) + i.text(240, 120 + k * 94, s, c, 34))
          .join(''),
      notes: {
        say: [
          'Here is the run sheet. Set up and test audio first, every time.',
          'Do two throwaway takes to warm up. Your first take is always your worst.',
          'Film all the reach videos in one block, change outfits so the month does not look like one day, then do connect and convert.',
          'Grab twenty minutes of b-roll: walking in, the team, the desk, a handshake. Your editor and Claude will thank you.',
          'Back up the card before you leave the room.',
        ],
        draw: ['Write the times on the left and the blocks on the right.'],
      },
    },

    {
      type: 'board',
      title: 'On Camera',
      guide: g.line(530, 120, 530, 660) + g.line(90, 160, 970, 160),
      ink:
        i.text(310, 140, 'DO', 'dkgreen', 46, { anchor: 'middle' }) +
        i.text(750, 140, "DON'T", 'red', 46, { anchor: 'middle' }) +
        [
          'Energy up 20%',
          'Look at the lens',
          'Pause 2 sec before + after',
          'Say the hook 2-3 ways',
          'Mess up? Restart the line,',
          '   keep rolling',
        ]
          .map((s, k) => i.text(100, 230 + k * 64, s, 'dkgreen', 34))
          .join('') +
        ['Read word for word', 'Stop the camera for a stumble', 'Film in an echoey room', 'Wear thin stripes', 'Do 10 takes of one line']
          .map((s, k) => i.text(560, 230 + k * 64, s, 'red', 34))
          .join(''),
      notes: {
        say: [
          'Bring twenty percent more energy than feels normal. The camera flattens you.',
          'Look at the lens, not the screen. Leave a two-second pause before and after each take, it makes the edit so much easier.',
          'If you stumble, do not stop the camera. Just restart the sentence. Claude will find the clean take later.',
          'Do not read word for word, do not wear thin stripes, and do not do ten takes of one line. Three, then move on.',
        ],
        draw: ['Fill the T-chart: Do on the left in green, Don\'t on the right in red.'],
      },
    },

    {
      type: 'statement',
      text: 'The camera eats energy. Bring 20% more than feels normal.',
      notes: { say: ['If it feels slightly over the top while filming, it will look normal on a phone.'] },
    },

    {
      type: 'sheet',
      title: 'Shot List',
      minutes: 10,
      cells: [
        { x: 50, y: 70, w: 50, h: 40, label: '#' },
        { x: 100, y: 70, w: 400, h: 40, label: 'Video' },
        { x: 500, y: 70, w: 190, h: 40, label: 'Structure' },
        { x: 690, y: 70, w: 90, h: 40, label: 'T / M / B' },
        { x: 780, y: 70, w: 150, h: 40, label: 'Outfit / spot' },
        { x: 930, y: 70, w: 70, h: 40, label: 'Done' },
        ...Array.from({ length: 13 }, (_, r) => [
          { x: 50, y: 110 + r * 42, w: 50, h: 42, html: `<div class="num">${r + 1}</div>` },
          { x: 100, y: 110 + r * 42, w: 400, h: 42 },
          { x: 500, y: 110 + r * 42, w: 190, h: 42 },
          { x: 690, y: 110 + r * 42, w: 90, h: 42 },
          { x: 780, y: 110 + r * 42, w: 150, h: 42 },
          { x: 930, y: 110 + r * 42, w: 70, h: 42 },
        ]).flat(),
      ],
      ink:
        [
          ['Who I am + who I help', 'What I know now', 'M', 'Navy, desk'],
          ['3 questions every client asks', 'Category', 'T', 'Navy, desk'],
          ['The 50/50 myth', 'Myth-bust', 'T', 'Navy, desk'],
          ['Rating advice 0-10', 'Rating', 'T', 'White, shelf'],
        ]
          .map(([v, s, f, o], r) => {
            const y = 140 + r * 42;
            return (
              i.text(112, y, v, 'blue', 26) + i.text(510, y, s, 'purple', 24) +
              i.text(735, y, f, f === 'T' ? 'orange' : 'blue', 28, { anchor: 'middle' }) + i.text(790, y, o, 'black', 22) +
              i.tick(950, y - 4, 'dkgreen', 0.6)
            );
          })
          .join(''),
      notes: {
        say: ['Print this or have it on the iPad on shoot day. Tick each one off as you go so nothing gets missed.'],
        draw: ['Fill in the first four rows as an example.'],
      },
    },

    {
      type: 'next',
      checklist: [
        'Book your shoot day (block 4 hours)',
        'Get a lav mic + tripod',
        'Find your spot: window + depth',
        'Print the shot list with all 13 videos',
        'Film. Back up the footage the same day',
      ],
      notes: { say: ['Takeaway: one shoot day a month, good audio, energy up, keep rolling. Next module, we edit it all with Claude.'] },
    },

    { type: 'notes' },
  ],
};
