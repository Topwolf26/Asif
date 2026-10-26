const { ink: i, guide: g, cards } = require('../lib');

const lane = (y) =>
  [0, 1, 2, 3, 4]
    .map((k) => {
      const x = 90 + k * 186;
      return g.rect(x, y, 150, 80, { r: 10 }) + (k < 4 ? g.line(x + 154, y + 40, x + 182, y + 40) + g.arrowHead(x + 182, y + 40, 'right', { size: 8 }) : '');
    })
    .join('');

// 6 nodes in a snake: 3 across, then 3 back
const nodes = [
  [210, 230], [530, 230], [850, 230],
  [850, 500], [530, 500], [210, 500],
];

module.exports = {
  number: 6,
  title: 'Editing with Claude',
  runtime: '15 to 20 min (plus a live demo)',
  outcome: 'The firm can hand a folder of raw footage to Claude and get back captioned, correctly sized rough cuts the same day, then approve them.',
  slides: [
    { type: 'cover', kicker: 'Module 6', title: 'Editing\nwith Claude' },

    {
      type: 'board',
      title: 'The Old Way vs The Claude Way',
      guide: lane(150) + lane(430) + g.line(60, 360, 1000, 360, { dash: '10 10' }),
      ink:
        i.text(60, 128, 'OLD WAY', 'red', 36) +
        ['Raw footage', 'Send to editor', 'Wait 5-7 days', 'Revisions', 'Post'].map((s, k) => i.text(165 + k * 186, 200, s, 'red', 26, { anchor: 'middle' })).join('') +
        i.text(1000, 290, '= 2 weeks', 'red', 40, { anchor: 'end' }) +
        i.text(60, 408, 'CLAUDE WAY', 'dkgreen', 36) +
        ['Raw footage', 'Claude', 'You watch', 'Approve', 'Post'].map((s, k) => i.text(165 + k * 186, 480, s, 'dkgreen', 28, { anchor: 'middle' })).join('') +
        i.text(1000, 570, '= same day', 'dkgreen', 40, { anchor: 'end' }) +
        i.circle(351, 470, 92, 52, 'purple'),
      notes: {
        say: [
          'The old way: send footage to an editor, wait a week, go back and forth on revisions. Two weeks from filming to posting, and content goes stale.',
          'The Claude way: Claude does the transcribing, the take selection, the cutting and the captions. You watch, approve, and post. Same day.',
          'You can still use an editor for polish. Claude just does the slow, boring eighty percent.',
        ],
        draw: ['Label both lanes. Circle "Claude" in purple.'],
      },
    },

    {
      type: 'board',
      title: 'The Claude Edit Pipeline',
      guide:
        nodes.map(([x, y], k) => g.circle(x, y, 70) + g.text(x, y - 40, String(k + 1), { size: 18, anchor: 'middle' })).join('') +
        g.line(284, 230, 452, 230) + g.arrowHead(452, 230, 'right') +
        g.line(604, 230, 772, 230) + g.arrowHead(772, 230, 'right') +
        g.line(850, 304, 850, 422) + g.arrowHead(850, 422, 'down') +
        g.line(772, 500, 604, 500) + g.arrowHead(604, 500, 'left') +
        g.line(452, 500, 284, 500) + g.arrowHead(284, 500, 'left'),
      ink:
        i.text(210, 240, 'Drop raws', 'blue', 28, { anchor: 'middle' }) + i.text(210, 268, 'in 1 folder', 'blue', 24, { anchor: 'middle' }) +
        i.text(530, 240, 'Transcribe', 'blue', 28, { anchor: 'middle' }) + i.text(530, 268, 'word timings', 'blue', 24, { anchor: 'middle' }) +
        i.text(850, 240, 'Pick best', 'blue', 28, { anchor: 'middle' }) + i.text(850, 268, 'takes', 'blue', 28, { anchor: 'middle' }) +
        i.text(850, 510, 'Cut pauses', 'blue', 28, { anchor: 'middle' }) + i.text(850, 538, '+ fluffs', 'blue', 26, { anchor: 'middle' }) +
        i.text(530, 510, 'Captions +', 'blue', 28, { anchor: 'middle' }) + i.text(530, 538, '9:16 & 4:5', 'blue', 26, { anchor: 'middle' }) +
        i.text(210, 510, 'Export +', 'blue', 28, { anchor: 'middle' }) + i.text(210, 538, 'name files', 'blue', 26, { anchor: 'middle' }) +
        i.text(530, 650, 'YOU watch + approve before step 6', 'purple', 36, { anchor: 'middle' }) +
        i.arrow([[400, 620], [330, 570]], 'purple', 4),
      notes: {
        say: [
          'Here is exactly what happens. One: you drop all the raw clips from shoot day into one folder.',
          'Two: Claude transcribes every clip with word-by-word timings, using a free tool called Whisper on your computer.',
          'Three: it matches each video on your shot list to the best clean take. Four: it cuts the pauses, restarts and fluffs.',
          'Five: it burns in captions and makes vertical 9:16 and 4:5 versions. Six: it exports and names every file properly.',
          'Before export, you watch each one. That part does not get delegated.',
        ],
        draw: ['Label the six circles in order. Purple note at the bottom.'],
      },
    },

    {
      type: 'board',
      title: 'What You Need',
      html: cards(
        [
          { h4: '1. Claude Pro or Max', p: 'Use Claude Code (the Code tab in the Claude desktop app). It can work with the files on your computer, which the chat window can\'t.' },
          { h4: '2. One folder per shoot', p: 'e.g. Content / 2026-11 Shoot / raw\nCopy every clip off the card into it. Add your shot list and scripts.' },
          { h4: '3. Free tools (Claude installs them)', p: 'ffmpeg: cuts, resizes and exports video.\nWhisper: transcribes speech with word timings.\nJust ask Claude to set them up.' },
          { h4: '4. Your edit spec', p: 'Caption style, brand colours, names and terms to spell right, sizes, end card. One page. (Worksheet at the end of this module.)' },
          { h4: 'Optional: animated captions', p: 'Ask Claude to build a Remotion project for word-by-word highlighted captions. Reuse it every month.' },
          { h4: 'Optional: final polish', p: 'Open Claude\'s cut in CapCut or Premiere for music and B-roll, or hand it to an editor as a head start.' },
        ],
        { x: 50, y: 74, w: 950, h: 590, cols: 3 }
      ),
      ink: i.under(66, 114, 190, 'purple'),
      notes: {
        say: [
          'Here is the kit. Claude Pro or Max, and you use Claude Code in the desktop app, because it can actually open and work with the video files on your computer.',
          'One folder per shoot. The free tools: ffmpeg does the cutting and Whisper does the transcribing. You do not need to know how they work. Ask Claude to install them.',
          'Write your edit spec once and reuse it every month.',
        ],
      },
    },

    { type: 'notes' },

    {
      type: 'board',
      title: 'The Prompts',
      html: cards(
        [
          {
            h4: '1. Selects',
            mono:
              'My raw clips are in [folder]. My shot list and scripts are in shot-list.md.\n\nInstall ffmpeg and Whisper if they\'re not set up. Transcribe every clip with word-level timestamps.\n\nFor each video on the shot list, find the best complete take (clean delivery, no restarts) and give me a cut list: file, in time, out time, and why you picked it.',
          },
          {
            h4: '2. Rough cut',
            mono:
              'Cut each video from the cut list.\n\nRemove pauses longer than 0.4s and any restarted lines. Keep a short beat before the key line.\n\nExport 9:16 (1080x1920) and 4:5 (1080x1350). Pull 3 still frames from each so I can check the framing.',
          },
          {
            h4: '3. Captions + files',
            mono:
              'Burn in captions using edit-spec.md: bold, 2-4 words at a time, current word highlighted in [colour].\n\nSpell these right: [names, suburbs, legal terms]. Australian spelling ("enquiries").\n\nName files [Firm]-[##]-[Topic]-[9x16].mp4 and put them in /final.',
          },
        ],
        { x: 50, y: 74, w: 950, h: 590, cols: 3 }
      ),
      ink: i.text(980, 712, 'save these, reuse every month', 'purple', 28, { anchor: 'end' }),
      notes: {
        say: [
          'Three prompts. You will reuse them every single month.',
          'Prompt one gets you the selects. Prompt two cuts the videos and gives you stills to check framing. Prompt three adds captions and names the files.',
          'Be specific about spelling. Claude cannot hear that a name is "Nguyen", not "Win". Give it the list.',
          'This is where you would show your screen and run it live on real footage.',
        ],
      },
    },

    {
      type: 'board',
      title: 'Claude Does / You Do',
      guide: g.line(530, 120, 530, 660) + g.line(90, 160, 970, 160),
      ink:
        i.text(310, 140, 'CLAUDE DOES', 'blue', 42, { anchor: 'middle' }) +
        i.text(750, 140, 'YOU DO', 'purple', 42, { anchor: 'middle' }) +
        ['Transcribes every clip', 'Finds the best takes', 'Cuts pauses + fluffs', 'Captions + spelling', 'Resizes 9:16 + 4:5', 'Names + files everything', 'Writes 3 alt hooks']
          .map((s, k) => i.text(100, 225 + k * 60, s, 'blue', 32))
          .join('') +
        ['Pick the hook', 'Watch every video once', 'Compliance check:', '  general info only', '  no promised outcomes', '  no client details', 'Approve']
          .map((s, k) => i.text(560, 225 + k * 60, s, 'purple', 32))
          .join(''),
      notes: {
        say: [
          'Claude does the slow work: transcripts, selects, cuts, captions, sizes, file names, even alternative hooks to test.',
          'You keep the judgement: which hook, a final watch of every video, and the compliance check. General information only, no promised outcomes, nothing that identifies a client.',
        ],
        draw: ['Fill both sides of the T-chart.'],
      },
    },

    {
      type: 'statement',
      text: 'Claude does the 80% that\'s boring.\nYou keep the 20% that\'s taste.',
      notes: { say: ['Your name is on every video. Never post something you have not watched.'] },
    },

    {
      type: 'sheet',
      title: 'Your Edit Spec',
      cells: [
        { x: 50, y: 70, w: 475, h: 150, label: 'Caption style', prompt: 'Font, size, highlight colour, words per line' },
        { x: 525, y: 70, w: 475, h: 150, label: 'Brand', prompt: 'Colours, logo, end card' },
        { x: 50, y: 220, w: 950, h: 150, label: 'Spell these right', prompt: 'Names, firm name, suburbs, legal / finance terms', dots: true },
        { x: 50, y: 370, w: 316, h: 150, label: 'Sizes', prompt: 'Which platforms?' },
        { x: 366, y: 370, w: 317, h: 150, label: 'Music', prompt: 'Vibe, or none' },
        { x: 683, y: 370, w: 317, h: 150, label: 'Pace', prompt: 'How tight are the cuts?' },
        { x: 50, y: 520, w: 950, h: 140, label: 'Never', prompt: 'Things Claude or an editor must never do', dots: true },
      ],
      ink:
        i.text(66, 130, 'Bold white, 3 words, word', 'blue', 28) + i.text(66, 162, 'highlighted in our gold', 'blue', 28) +
        i.text(541, 130, 'Navy + gold. Logo end card', 'blue', 28) + i.text(541, 162, '"Book a call, link in bio"', 'blue', 28) +
        i.text(66, 290, 'Smith Lawyers · Parramatta · "enquiries" · de facto · BFA (binding financial agreement)', 'red', 28) +
        i.text(66, 450, '9:16 + 4:5', 'blue', 32) +
        i.text(382, 450, 'None on talking', 'blue', 28) + i.text(382, 480, 'heads', 'blue', 28) +
        i.text(699, 450, 'Tight, jump cuts', 'blue', 28) + i.text(699, 480, 'are fine', 'blue', 28) +
        i.text(66, 590, 'No stock footage · no emojis · no "guaranteed" · never show client documents', 'red', 28),
      notes: {
        say: ['Fill this in once. Save it as edit-spec.md in your content folder and Claude reads it every month.'],
        draw: ['Fill it in as an example firm.'],
      },
    },

    { type: 'notes' },

    {
      type: 'next',
      checklist: [
        'Install the Claude desktop app, open Claude Code',
        'Make your content folder + copy in the raws',
        'Fill in your Edit Spec, save as edit-spec.md',
        'Run the 3 prompts on one video first',
        'Watch, approve, then batch the rest',
      ],
      notes: { say: ['Takeaway: Claude edits, you approve. Start with one video, then batch the month.'] },
    },

    { type: 'end' },
  ],
};
