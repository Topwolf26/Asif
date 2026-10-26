const { ink: i, guide: g, cards } = require('../lib');

const spokes = [0, 1, 2, 3, 4, 5].map((k) => {
  const a = -Math.PI / 2 + (k * Math.PI) / 3;
  return [530 + Math.cos(a) * 250, 380 + Math.sin(a) * 230];
});

const week = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

module.exports = {
  number: 7,
  title: 'Posting with Claude',
  runtime: '15 min',
  outcome: 'The firm can turn one video into posts for every platform, has a weekly rhythm, and uses Claude to write captions, fill the calendar and review the numbers.',
  slides: [
    { type: 'cover', title: 'Posting\nwith Claude' },

    { type: 'divider', lead: 'The BIG', word: 'Problems', tone: 'problem' },
    { type: 'point', tone: 'problem', n: 1, text: "One Video, One Platform", notes: { say: ["Most firms post to Instagram and stop there, leaving the rest of their audience on the table."] } },
    { type: 'point', tone: 'problem', n: 2, text: "Captions Take as Long as the Video", notes: { say: ["Writing for five platforms by hand is where posting stalls."] } },
    { type: 'point', tone: 'problem', n: 3, text: "Posting Without Knowing What Works", notes: { say: ["No numbers, no review, so month two looks just like month one."] } },

    { type: 'divider', word: 'OPPORTUNITY', tone: 'idea' },
    { type: 'point', tone: 'idea', n: 1, text: "Post Once, Show Up Everywhere", notes: { say: ["The same video goes to six places. Only the caption changes."] } },
    { type: 'point', tone: 'idea', n: 2, text: "Claude Writes the Captions and the Calendar", notes: { say: ["You approve, the scheduler posts."] } },
    { type: 'point', tone: 'idea', n: 3, text: "Review Every Monday", notes: { say: ["Last week's numbers into Claude, three changes out."] } },

    {
      type: 'board',
      title: 'One Video, Six Places',
      guide:
        g.circle(530, 380, 80) +
        spokes.map(([x, y]) => g.circle(x, y, 66) + g.line(530 + (x - 530) * 0.34, 380 + (y - 380) * 0.36, 530 + (x - 530) * 0.72, 380 + (y - 380) * 0.7)).join(''),
      ink:
        i.text(530, 376, '1 video', 'purple', 40, { anchor: 'middle' }) +
        i.text(530, 410, '9:16', 'purple', 28, { anchor: 'middle' }) +
        ['Instagram\nReels', 'TikTok', 'LinkedIn', 'YouTube\nShorts', 'Facebook', 'Google\nBusiness']
          .map((s, k) => i.text(spokes[k][0], spokes[k][1] + (s.includes('\n') ? -4 : 10), s, 'blue', 28, { anchor: 'middle' }))
          .join('') +
        i.text(850, 240, 'optional for', 'red', 26) + i.text(850, 266, 'most firms', 'red', 26) +
        i.text(60, 690, 'Same video, caption rewritten for each platform', 'dkgreen', 32),
      notes: {
        say: [
          'You film once and post everywhere. The same vertical video goes to Instagram Reels, LinkedIn, YouTube Shorts, Facebook and your Google Business Profile.',
          'TikTok is optional. For some practice areas it is gold, for others it is a waste of time.',
          'The video stays the same. The caption changes per platform, and that is Claude\'s job.',
        ],
        draw: ['"1 video" in the middle, a platform in each circle.'],
      },
    },

    {
      type: 'board',
      title: 'The Caption Formula',
      guide: [0, 1, 2, 3, 4].map((k) => g.rect(120, 100 + k * 110, 820, 88, { r: 10 }) + g.text(140, 130 + k * 110, String(k + 1), { size: 18 })).join(''),
      ink:
        i.text(180, 155, 'Hook line: repeat the hook', 'red', 34) +
        i.text(180, 265, '2-3 short lines of value', 'blue', 34) +
        i.text(180, 375, 'CTA: comment / DM / follow / book', 'dkgreen', 34) +
        i.text(180, 485, '3-5 hashtags: #parramattalawyer', 'orange', 34) +
        i.text(180, 595, '"General information only, not legal advice"', 'purple', 32),
      notes: {
        say: [
          'Every caption has five parts. The first line repeats the hook, because that is all people see before "more".',
          'Two or three lines of value. Then the call to action. Three to five hashtags, local beats generic. And for law and finance, a one-line general information disclaimer.',
        ],
        draw: ['Write one part in each bar.'],
      },
    },

    {
      type: 'board',
      title: 'Claude as Your Social Media Manager',
      guide:
        [0, 1, 2, 3, 4].map((k) => g.rect(60 + k * 192, 230, 160, 120, { r: 12 }) + (k < 4 ? g.line(224 + k * 192, 290, 248 + k * 192, 290) + g.arrowHead(248 + k * 192, 290, 'right', { size: 8 }) : '')).join('') +
        g.path('M920,360 Q920,520 530,520 Q140,520 140,360', { dash: '8 8' }) + g.arrowHead(140, 362, 'up'),
      ink:
        i.text(140, 284, 'Final', 'blue', 30, { anchor: 'middle' }) + i.text(140, 316, 'videos', 'blue', 30, { anchor: 'middle' }) +
        i.text(332, 280, 'Claude', 'purple', 30, { anchor: 'middle' }) + i.text(332, 310, 'writes', 'purple', 26, { anchor: 'middle' }) + i.text(332, 336, 'captions', 'purple', 26, { anchor: 'middle' }) +
        i.text(524, 284, 'Content', 'blue', 30, { anchor: 'middle' }) + i.text(524, 316, 'calendar', 'blue', 30, { anchor: 'middle' }) +
        i.text(716, 280, 'Scheduler', 'blue', 30, { anchor: 'middle' }) + i.text(716, 312, 'Meta Suite /', 'blue', 22, { anchor: 'middle' }) + i.text(716, 336, 'Buffer', 'blue', 22, { anchor: 'middle' }) +
        i.text(908, 300, 'Posted', 'dkgreen', 32, { anchor: 'middle' }) +
        i.text(530, 570, 'Every Monday: Claude reviews last week\'s numbers', 'purple', 32, { anchor: 'middle' }) +
        i.text(530, 610, 'and tells you what to do more of', 'purple', 32, { anchor: 'middle' }) +
        i.text(524, 200, 'Google Sheet', 'orange', 26, { anchor: 'middle' }),
      notes: {
        say: [
          'Here is the posting system. Final videos go to Claude. Claude writes a caption for each platform.',
          'Claude fills in your content calendar, a simple Google Sheet: post, date, platform, caption, status. If you have the Google Drive connector on, it can write straight into the sheet.',
          'Then the videos go into a scheduler: Meta Business Suite is free for Instagram and Facebook, or Buffer for everything. Claude in Chrome can load them in for you, and you check and hit schedule.',
          'Every Monday, paste last week\'s numbers into Claude and ask what to do more of. That loop is what makes month two better than month one.',
        ],
        draw: ['Label the five boxes and the loop underneath.'],
      },
    },

    {
      type: 'board',
      title: 'The Posting Prompts',
      html: cards(
        [
          {
            h4: '1. Captions',
            mono:
              'Here are this month\'s 30 final videos and their scripts.\n\nFor each one write captions for Instagram, LinkedIn, Facebook, YouTube Shorts and Google Business.\n\nFormat: hook line, 2-3 lines of value, CTA for its pillar, 3-5 local hashtags, and our disclaimer line.\n\nLinkedIn: a bit longer, first person, no hashtags spam.',
          },
          {
            h4: '2. Calendar',
            mono:
              'Build my content calendar for [month].\n\nOne post a day at 7:30am, in the order of my 30-Day Post Plan (CSV attached).\n\nColumns: Date, Day, Video, File, Pillar, Platforms, Caption, Status.\n\nWrite it into my "[Firm] Content Calendar" sheet.',
          },
          {
            h4: '3. Weekly review',
            mono:
              'Here are last week\'s numbers per post: views, average watch time, follows, saves, shares, DMs and enquiries.\n\nWhich hooks and structures worked? Which flopped and why?\n\nGive me 3 changes for next week and 3 new video ideas based on what worked.',
          },
        ],
        { x: 50, y: 74, w: 950, h: 590, cols: 3 }
      ),
      notes: {
        say: ['Three prompts again: captions, calendar, weekly review. Save them next to your editing prompts.'],
      },
    },

    {
      type: 'board',
      title: 'Your Weekly Rhythm',
      guide: week.map((d, k) => g.rect(60 + k * 136, 120, 124, 520, { r: 10 }) + g.text(122 + k * 136, 150, d, { size: 14, anchor: 'middle' })).join(''),
      ink:
        [0, 1, 2, 3, 4, 5, 6].map((k) => i.circle(122 + k * 136, 220, 48, 30, 'dkgreen') + i.text(122 + k * 136, 231, 'POST', 'dkgreen', 30, { anchor: 'middle' }) + i.text(122 + k * 136, 284, '7:30am', 'dkgreen', 24, { anchor: 'middle' })).join('') +
        i.text(122, 360, 'Review +', 'purple', 28, { anchor: 'middle' }) + i.text(122, 390, 'schedule', 'purple', 28, { anchor: 'middle' }) +
        i.text(394, 360, '2 stories', 'purple', 28, { anchor: 'middle' }) +
        i.text(666, 360, 'Log the', 'purple', 28, { anchor: 'middle' }) + i.text(666, 390, 'numbers', 'purple', 28, { anchor: 'middle' }) +
        i.text(938, 360, 'Look back,', 'red', 28, { anchor: 'middle' }) + i.text(938, 390, 'fix 1 thing', 'red', 28, { anchor: 'middle' }) +
        i.line([[80, 560], [980, 560]], 'red', 5) +
        i.text(530, 610, '15 min a day: reply to every comment + DM', 'red', 32, { anchor: 'middle' }),
      notes: {
        say: [
          'Your week, the same as the weekly schedule in your 30-Day Post Plan. Monday at 8:30, Claude reviews last week and you schedule this week\'s seven posts.',
          'One post goes out every day at 7:30 in the morning. Wednesday, two behind-the-scenes stories. Friday, log the numbers in the tracker. Sunday, look back at the week and improve one thing, so Monday\'s review has something to work with.',
          'And fifteen minutes every day replying to comments and DMs. Most of your leads come from that reply, not the post itself.',
        ],
        draw: ['POST every day at 7:30, Monday review + schedule, Wednesday stories, Friday numbers, Sunday look back, and the red daily line across the bottom.'],
      },
    },

    {
      type: 'board',
      title: 'The Scorecard',
      guide: [0, 1, 2].map((k) => g.path(`M${110 + k * 300},400 A120,120 0 0 1 ${350 + k * 300},400`) + g.line(230 + k * 300, 400, 230 + k * 300, 330)).join(''),
      ink:
        i.text(230, 450, 'REACH', 'orange', 40, { anchor: 'middle' }) +
        i.text(230, 500, 'views per post', 'orange', 28, { anchor: 'middle' }) + i.text(230, 532, '3-sec hold %', 'orange', 28, { anchor: 'middle' }) +
        i.text(530, 450, 'TRUST', 'blue', 40, { anchor: 'middle' }) +
        i.text(530, 500, 'follows, saves,', 'blue', 28, { anchor: 'middle' }) + i.text(530, 532, 'shares', 'blue', 28, { anchor: 'middle' }) +
        i.text(830, 450, 'LEADS', 'dkgreen', 40, { anchor: 'middle' }) +
        i.text(830, 500, 'DMs + enquiries', 'dkgreen', 28, { anchor: 'middle' }) + i.text(830, 532, '"saw your video"', 'dkgreen', 28, { anchor: 'middle' }) +
        i.text(530, 650, 'Ask every new client: "How did you find us?"', 'red', 36, { anchor: 'middle' }),
      notes: {
        say: [
          'Three numbers to watch. Reach: views and how many people stay past three seconds. Trust: follows, saves and shares. Leads: DMs, enquiries, and people saying "I saw your video" on the first call.',
          'Add one question to your intake: "How did you find us?" Most content leads look like referrals or Google searches unless you ask.',
        ],
        draw: ['Label the three gauges and write the metrics under each.'],
      },
    },

    {
      type: 'statement',
      text: 'Post, reply, review.\nEvery week.\nBoring wins.',
      notes: { say: ['Consistency beats creativity. The firms that win are the ones still posting in month six.'] },
    },

    {
      type: 'sheet',
      title: 'Posting Setup',
      minutes: 10,
      cells: [
        { x: 50, y: 70, w: 475, h: 140, label: 'Platforms', prompt: 'Where are we posting?' },
        { x: 525, y: 70, w: 475, h: 140, label: 'Scheduler', prompt: 'Meta Business Suite / Buffer / other' },
        { x: 50, y: 210, w: 316, h: 140, label: 'Post days + times' },
        { x: 366, y: 210, w: 317, h: 140, label: 'Who approves?' },
        { x: 683, y: 210, w: 317, h: 140, label: 'Who replies to DMs?' },
        { x: 50, y: 350, w: 950, h: 110, label: 'Standard CTAs', prompt: 'TOFU / MOFU / BOFU', dots: true },
        { x: 50, y: 460, w: 475, h: 100, label: 'Disclaimer line' },
        { x: 525, y: 460, w: 475, h: 100, label: 'Hashtags', prompt: 'Local first' },
        { x: 50, y: 560, w: 950, h: 100, label: 'How we track enquiries from content', dots: true },
      ],
      ink:
        i.text(66, 150, 'Instagram, LinkedIn, Facebook, Google', 'blue', 28) +
        i.text(541, 150, 'Meta Business Suite (free)', 'blue', 30) +
        i.text(66, 290, 'Every day', 'blue', 30) + i.text(66, 324, '7:30am', 'blue', 28) +
        i.text(382, 300, 'Principal, Mondays', 'blue', 28) +
        i.text(699, 300, 'Paralegal, daily', 'blue', 28) +
        i.text(66, 420, 'Follow for more · Follow if you\'re separating · DM "CALL" for a free 15 min chat', 'purple', 26) +
        i.text(66, 522, 'General info only, not legal advice', 'purple', 26) +
        i.text(541, 522, '#parramattalawyer #familylawsydney', 'orange', 26) +
        i.text(66, 622, '"How did you find us?" on every intake form + call', 'dkgreen', 28),
      notes: {
        say: ['Fill this in and you have your posting system documented. If someone else in the firm takes over, they follow this page.'],
        draw: ['Fill it in as an example firm.'],
      },
    },

    {
      type: 'next',
      checklist: [
        'Set up Meta Business Suite (or Buffer)',
        'Make your content calendar Google Sheet',
        'Run the captions + calendar prompts',
        'Schedule the first 2 weeks',
        'Add "How did you find us?" to intake',
      ],
      notes: { say: ['Takeaway: one video, every platform. Claude writes, you approve, the scheduler posts, and every Monday you review.'] },
    },

    { type: 'notes' },
  ],
};
