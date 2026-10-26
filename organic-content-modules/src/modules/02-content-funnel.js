const { ink: i, guide: g, cards } = require('../lib');

// three stacked funnel bands
const band = (y1, y2, xl1, xr1, xl2, xr2) =>
  g.path(`M${xl1},${y1} L${xr1},${y1} L${xr2},${y2} L${xl2},${y2} Z`);

module.exports = {
  number: 2,
  title: 'The Content Funnel',
  runtime: '12 to 15 min',
  outcome: 'The firm knows the three jobs content does (reach, connect, convert), the weekly mix, and has mapped topic ideas to each stage.',
  slides: [
    { type: 'cover', title: 'The Content\nFunnel' },

    { type: 'divider', lead: 'The BIG', word: 'Problems', tone: 'problem' },
    { type: 'point', tone: 'problem', n: 1, text: "Every Post Says 'Book a Consult'", notes: { say: ["Most firm content is a sales pitch. Nobody watches a pitch from someone they don't know yet."] } },
    { type: 'point', tone: 'problem', n: 2, text: "Viral Videos, No Clients", notes: { say: ["Chasing views gets you likes from people who will never hire you."] } },
    { type: 'point', tone: 'problem', n: 3, text: "No Plan for What Goes Out When", notes: { say: ["Posting whatever comes to mind means the mix is random and nothing builds."] } },

    { type: 'divider', word: 'OPPORTUNITY', tone: 'idea' },
    { type: 'point', tone: 'idea', n: 1, text: "Give Every Post One Job", notes: { say: ["Reach, connect or convert. One job per post, and the CTA matches it."] } },
    { type: 'point', tone: 'idea', n: 2, text: "Run the Weekly Mix", notes: { say: ["About a third reach, the most connect, a quarter convert. One post a day."] } },
    { type: 'point', tone: 'idea', n: 3, text: "Win Your City, Not the Internet", notes: { say: ["400 views from the right people beats 40,000 from the wrong ones."] } },

    {
      type: 'board',
      title: 'The 3 Jobs of Content',
      guide:
        band(110, 270, 300, 760, 360, 700) +
        band(282, 442, 360, 700, 410, 650) +
        band(454, 614, 410, 650, 455, 605) +
        g.text(530, 258, 'TOP', { anchor: 'middle', size: 15 }) +
        g.text(530, 430, 'MIDDLE', { anchor: 'middle', size: 15 }) +
        g.text(530, 604, 'BOTTOM', { anchor: 'middle', size: 15 }),
      ink:
        i.text(530, 170, 'TOFU = Reach', 'orange', 40, { anchor: 'middle' }) +
        i.text(530, 342, 'MOFU = Connect', 'blue', 38, { anchor: 'middle' }) +
        i.text(530, 514, 'BOFU', 'dkgreen', 38, { anchor: 'middle' }) +
        i.text(530, 584, 'Convert', 'dkgreen', 30, { anchor: 'middle' }) +
        i.arrow([[770, 190], [850, 190]], 'orange') + i.text(866, 202, 'Views', 'orange', 44) +
        i.arrow([[710, 362], [850, 362]], 'blue') + i.text(866, 374, 'Followers', 'blue', 44) +
        i.arrow([[660, 534], [850, 534]], 'dkgreen') + i.text(866, 546, 'Leads', 'dkgreen', 44) +
        i.text(60, 170, 'myths, hot takes,', 'orange', 30) + i.text(60, 204, 'ratings, lists', 'orange', 30) +
        i.text(80, 342, 'your story, BTS,', 'blue', 30) + i.text(80, 376, 'why you started', 'blue', 30) +
        i.text(60, 514, 'client stories, process,', 'dkgreen', 30) + i.text(60, 548, '"how much does it cost?"', 'dkgreen', 30),
      notes: {
        say: [
          'Every piece of content has one job. Top of funnel gets you seen by people who have never heard of you. That is views.',
          'Middle of funnel makes them like you: your story, behind the scenes, why you do this. That turns viewers into followers.',
          'Bottom of funnel makes them trust you enough to call: client stories, your process, the cost question. That is leads.',
          'Most firms only post bottom-of-funnel "book a consult" posts. Nobody watches those unless they already know you.',
        ],
        draw: [
          'Write TOFU / MOFU / BOFU in each band.',
          'Arrow out to the right of each: Views, Followers, Leads.',
          'On the left, write two or three examples of each type.',
        ],
      },
    },

    {
      type: 'board',
      title: 'What Each One Looks Like for a Firm',
      html: cards(
        [
          { h4: 'TOFU: Reach', p: 'Job: get seen by strangers.\nFormats: myth-busts, "rate this advice 0-10", red flag / green flag, tier lists, quick tips.\nCTA: "Follow for more."', eg: 'Law: "3 things that DON\'T count in a property settlement"\nFinance: "Rating the ways people finance a car, 0 to 10"' },
          { h4: 'MOFU: Connect', p: 'Job: make them like you.\nFormats: your story, why you started the firm, a day in the office, meet the team, lessons learned.\nCTA: "Follow if you\'re [situation]."', eg: 'Law: "Why I left a big firm to start my own"\nFinance: "Meet Zac, who looks after our equipment finance"' },
          { h4: 'BOFU: Convert', p: 'Job: make them call.\nFormats: de-identified client stories, your process step by step, cost FAQs, "what the first call looks like".\nCTA: "DM me / book a call / link in bio."', eg: 'Law: "What actually happens in your first meeting with us"\nFinance: "Rejected by the bank? Here\'s what we did next"' },
        ],
        { x: 50, y: 80, w: 950, h: 560, cols: 3 }
      ),
      ink: i.under(68, 112, 130, 'orange') + i.under(388, 112, 150, 'blue') + i.under(708, 112, 145, 'dkgreen'),
      notes: {
        say: [
          'Here is what each looks like in a law or finance firm. Same three jobs, different topics.',
          'Notice the call to action changes with the job. Do not ask a stranger to book a consult in their first ten seconds of knowing you.',
        ],
      },
    },

    {
      type: 'board',
      title: 'The Monthly Mix',
      guide:
        g.rect(80, 250, 900, 90, { r: 10 }) +
        g.line(380, 250, 380, 340) + g.line(770, 250, 770, 340) +
        g.text(80, 236, '30 posts a month', { size: 13 }),
      ink:
        i.text(230, 312, '10 Reach', 'orange', 44, { anchor: 'middle' }) +
        i.text(575, 312, '13 Connect', 'blue', 44, { anchor: 'middle' }) +
        i.text(875, 312, '7 Convert', 'dkgreen', 40, { anchor: 'middle' }) +
        i.text(80, 440, '1 post a day = 30 a month', 'black', 40) +
        i.text(80, 488, 'Value = reach · Connection = connect · Proof + Invitation = convert', 'purple', 30) +
        i.text(80, 590, 'All BOFU = salesy, nobody watches', 'red', 32) +
        i.text(80, 630, 'All TOFU = views, but no clients', 'red', 32),
      notes: {
        say: [
          'One post a day is the minimum, so that is thirty posts a month. About a third for reach, the biggest share for connection, and about a quarter to convert.',
          'In the Module 3 pillars: value posts reach new people, connection posts make them like you, and proof and invitation posts convert. Ten, thirteen and seven. That is exactly what your 30-day calendar uses.',
          'If you only post "book a consult" content it feels salesy and nobody watches. If you only chase views you get likes from people who will never hire you.',
        ],
        draw: [
          'Split the bar: 10 / 13 / 7 and label each.',
          'Write the monthly maths underneath.',
          'Red: the two ways it goes wrong.',
        ],
      },
    },

    {
      type: 'statement',
      text: '400 views from the right people beats 40,000 from the wrong ones.',
      notes: { say: ['A local family law firm does not need to go viral. It needs the right 400 people in its city to see it, every week.'] },
    },

    {
      type: 'sheet',
      title: 'Map Your Funnel',
      minutes: 10,
      cells: [
        { x: 50, y: 70, w: 316, h: 90, label: 'TOFU: Reach', prompt: 'Get seen. CTA: follow' },
        { x: 366, y: 70, w: 316, h: 90, label: 'MOFU: Connect', prompt: 'Be liked. CTA: follow if...' },
        { x: 682, y: 70, w: 318, h: 90, label: 'BOFU: Convert', prompt: 'Be trusted. CTA: DM / book' },
        { x: 50, y: 160, w: 316, h: 380, label: 'Topic ideas', prompt: 'At least 5', dots: true },
        { x: 366, y: 160, w: 316, h: 380, label: 'Topic ideas', prompt: 'At least 3', dots: true },
        { x: 682, y: 160, w: 318, h: 380, label: 'Topic ideas', prompt: 'At least 4', dots: true },
        { x: 50, y: 540, w: 950, h: 120, label: 'Your standard CTAs', prompt: 'One line for each stage you can reuse every time', dots: true },
      ],
      ink:
        i.text(66, 210, '1. Myths about wills', 'orange', 30) +
        i.text(66, 250, '2. Rate this advice 0-10', 'orange', 30) +
        i.text(66, 290, '3. Red flag / green flag', 'orange', 30) +
        i.text(66, 330, '   in a separation', 'orange', 30) +
        i.text(66, 370, '4. What counts as an asset', 'orange', 30) +
        i.text(382, 210, '1. Why I started the firm', 'blue', 30) +
        i.text(382, 250, '2. Meet the team', 'blue', 30) +
        i.text(382, 290, '3. A day in court', 'blue', 30) +
        i.text(698, 210, '1. First meeting walk-through', 'dkgreen', 30) +
        i.text(698, 250, '2. "How much will it cost?"', 'dkgreen', 30) +
        i.text(698, 290, '3. Client story (no names)', 'dkgreen', 30) +
        i.text(698, 330, '4. Fixed fee packages', 'dkgreen', 30) +
        i.text(66, 600, 'Follow for more  ·  Follow if you\'re going through this  ·  DM "START" for a free 15-min call', 'purple', 28),
      notes: {
        say: ['Pause here and fill this in for your firm. Do not overthink it. We go much deeper on ideas in Module 3.'],
        draw: ['Fill in an example family law firm so they see the level of detail.'],
      },
    },

    {
      type: 'next',
      checklist: [
        'Label your last 10 posts TOFU / MOFU / BOFU',
        'Spot which job is missing',
        'Fill in "Map Your Funnel"',
        'Write your 3 standard CTAs',
        'Bring your topic list to Module 3',
      ],
      notes: { say: ['Takeaway: every post has one job. Mix them, roughly half reach, a third connect, the rest convert.'] },
    },

    { type: 'notes' },
  ],
};
