// Magnify Growth × NH Family Law: the onboarding call deck, already filled in
// (marker ink on every board) so we walk Jane and Holly through it rather than
// fill it out live. The ideal-client answers are our starting guesses for a
// family law firm: confirm or correct them on the call.
// Build: node src/build.js 41  ->  pdf/clients/
const { ink: i, guide: g, cards } = require('../lib');
const pillarsModule = require('../modules/03-organic-content-pillars');

const black = { stroke: '#1B1B1B', sw: 3.5 };
const thin = { sw: 1.6 };
const wheel = { ...pillarsModule.slides.find((s) => s.title === 'The Organic Content Pillars'), title: 'Your Content Pillars', notes: undefined };

// vertical timeline: dots down x, ink time + text beside each
const timeline = (x, y0, step, rows, size = 34) =>
  rows.map(([t, s, c], k) => i.text(x - 40, y0 + 10 + k * step, t, c, size, { anchor: 'end' }) + i.text(x + 34, y0 + 10 + k * step, s, c, size)).join('');
const timelineGuide = (x, y0, step, n) =>
  g.line(x, y0 - 20, x, y0 + (n - 1) * step + 20) + Array.from({ length: n }, (_, k) => g.circle(x, y0 + k * step, 12, { fill: '#F3F3F3' })).join('');

module.exports = {
  number: 41,
  file: 'Magnify-x-NH-Family-Law-Onboarding-Call',
  title: 'Magnify Growth × NH Family Law: Onboarding Call',
  client: true,
  filled: true,
  noGuide: true,
  brand: { partner: 'NH Family Law' },
  slides: [
    { type: 'cover', kicker: 'Onboarding Call', title: 'Welcome, Jane\n& Holly' },

    {
      type: 'board',
      title: "Today's Call",
      guide: timelineGuide(330, 120, 104, 6),
      ink: timeline(330, 120, 104, [
        ['0:00', 'Welcome + who does what', 'black'],
        ['0:05', 'Where you are, where you want to be', 'red'],
        ['0:15', 'Your ideal client', 'blue'],
        ['0:30', 'How the system works', 'purple'],
        ['0:40', 'Your first 90 days + shoot day', 'dkgreen'],
        ['0:50', 'What we need from you + next steps', 'orange'],
      ]) + i.text(980, 712, '60 minutes', 'purple', 32, { anchor: 'end' }),
    },

    { type: 'divider', lead: 'The BIG', word: 'Problems', tone: 'problem' },
    { type: 'point', tone: 'problem', n: 1, text: 'Most Family Law Firms Look the Same Online' },
    { type: 'point', tone: 'problem', n: 2, text: "Enquiries That Aren't Ready, or Aren't a Fit" },
    { type: 'point', tone: 'problem', n: 3, text: 'No Time to Make Content Between Matters' },

    { type: 'divider', word: 'OPPORTUNITY', tone: 'idea' },
    { type: 'point', tone: 'idea', n: 1, text: 'Be the Firm They Already Trust Before They Call' },
    { type: 'point', tone: 'idea', n: 2, text: 'Attract the Matters You Actually Want' },
    { type: 'point', tone: 'idea', n: 3, text: 'About Two Hours a Month of Your Time' },

    {
      type: 'board',
      title: 'Where You Are, Where You Want to Be',
      guide:
        g.line(90, 250, 300, 250, black) + g.line(300, 250, 300, 650, black) +
        g.line(760, 250, 970, 250, black) + g.line(760, 250, 760, 650, black),
      ink:
        i.text(96, 160, 'Today', 'red', 50) +
        i.text(800, 160, 'In 90 days', 'green', 48) +
        i.curve([[305, 236], [420, 150], [530, 128], [650, 150], [752, 232]], 'purple', 6) +
        i.text(530, 112, 'MAGNIFY SYSTEM', 'purple', 38, { anchor: 'middle' }) +
        i.wave(40, 1010, 450, 'blue', 4) +
        i.text(56, 360, 'Now', 'blue', 36, { rot: -78 }) +
        i.text(56, 600, 'Future', 'blue', 36, { rot: -78 }) +
        i.text(96, 300, 'Enquiries that', 'red', 30) + i.text(96, 332, "aren't a fit", 'red', 30) +
        i.text(96, 374, 'Referrals come', 'red', 30) + i.text(96, 406, 'and go', 'red', 30) +
        i.text(96, 520, 'Relying on', 'red', 30) + i.text(96, 552, 'referrals forever', 'red', 30) +
        i.text(96, 594, 'Bigger firms win', 'red', 30) + i.text(96, 626, 'online', 'red', 30) +
        i.text(776, 300, 'Steady property +', 'green', 30) + i.text(776, 332, 'parenting matters', 'green', 30) +
        i.text(776, 374, 'Booked consults,', 'green', 30) + i.text(776, 406, 'not tyre-kickers', 'green', 30) +
        i.text(776, 520, '"THE family law', 'green', 30) + i.text(776, 552, 'firm" in your area', 'green', 30) +
        i.text(776, 594, 'Known before they', 'green', 30) + i.text(776, 626, 'ever call', 'green', 30) +
        i.text(530, 560, 'confirm with', 'orange', 30, { anchor: 'middle' }) + i.text(530, 592, 'Jane + Holly', 'orange', 30, { anchor: 'middle' }),
    },

    {
      type: 'board',
      title: 'Who Does What',
      guide:
        g.rect(70, 90, 920, 590) +
        g.line(530, 90, 530, 680) + g.line(760, 90, 760, 680) +
        [0, 1, 2, 3, 4, 5, 6, 7].map((k) => g.line(70, 156 + k * 66, 990, 156 + k * 66, thin)).join('') +
        g.text(645, 132, 'Magnify', { size: 20, anchor: 'middle', color: '#1B1B1B' }) +
        g.text(875, 132, 'NH Family Law', { size: 20, anchor: 'middle', color: '#1B1B1B' }) +
        [
          'Strategy + scripts',
          'Shoot day (filming)',
          'Editing + captions',
          'Meta ads',
          'Posting + scheduling',
          'Approving every post + ad',
          'Answering enquiries',
          'Weekly numbers',
        ].map((t, k) => g.text(92, 197 + k * 66, t, { size: 18, color: '#1B1B1B' })).join(''),
      ink:
        [0, 1, 2, 3, 4].map((k) => i.tick(628, 192 + k * 66, 'dkgreen', 0.8)).join('') +
        i.text(800, 266, 'on camera', 'blue', 28) +
        i.text(796, 530, 'Jane + Holly', 'blue', 30) +
        i.text(784, 596, 'within 5 min', 'red', 30) +
        i.text(560, 662, 'monthly report', 'dkgreen', 26) +
        i.text(790, 662, 'consults + retained', 'blue', 26),
    },

    {
      type: 'sheet',
      title: 'Your Ideal Client',
      tag: { x: 760, y: 26, w: 240, label: 'Our guesses: confirm today' },
      cells: [
        { x: 50, y: 70, w: 475, h: 150, label: 'Matters you want more of' },
        { x: 525, y: 70, w: 475, h: 150, label: 'Your best client', prompt: 'Who are they?' },
        { x: 50, y: 220, w: 475, h: 150, label: 'Not more of', prompt: 'Be honest' },
        { x: 525, y: 220, w: 475, h: 150, label: 'What just happened', prompt: 'Right before they call' },
        { x: 50, y: 370, w: 475, h: 150, label: "What they're worried about" },
        { x: 525, y: 370, w: 475, h: 150, label: 'What they say on the first call', prompt: 'Exact words' },
        { x: 50, y: 520, w: 475, h: 150, label: 'Why you, not someone cheaper' },
        { x: 525, y: 520, w: 475, h: 150, label: 'Questions they ask over and over', prompt: 'Content topics' },
      ],
      ink:
        i.text(66, 130, 'Property settlements', 'blue', 30) + i.text(66, 164, '+ parenting arrangements', 'blue', 30) +
        i.text(541, 124, '35-55, separating after 10+ yrs', 'blue', 28) + i.text(541, 156, 'home + super, maybe a business', 'blue', 28) + i.text(541, 188, 'wants it done properly', 'blue', 28) +
        i.text(66, 280, 'Wants free advice only', 'red', 30) + i.text(66, 314, 'Wants a fight at any cost', 'red', 30) +
        i.text(541, 274, 'Just separated', 'orange', 28) + i.text(541, 306, "Ex has a lawyer / a letter arrived", 'orange', 28) + i.text(541, 338, 'Mediation didn\'t work', 'orange', 28) +
        i.text(66, 430, 'Losing the house', 'red', 30) + i.text(66, 464, 'The kids · what it will cost', 'red', 30) +
        i.text(541, 436, '"I don\'t even know', 'purple', 32) + i.text(541, 472, 'where to start."', 'purple', 32) +
        i.text(66, 580, 'We call back. Clear fees.', 'dkgreen', 30) + i.text(66, 614, 'Calm, not aggressive', 'dkgreen', 30) +
        i.text(541, 574, 'Will I lose the house?', 'blue', 28) + i.text(541, 606, 'Is it 50/50? How long?', 'blue', 28) + i.text(541, 638, 'What will it cost?', 'blue', 28),
    },

    {
      type: 'board',
      title: 'How the System Works',
      guide:
        g.rect(70, 130, 200, 90, { r: 10 }) + g.rect(70, 300, 200, 90, { r: 10 }) +
        g.line(274, 175, 350, 250) + g.line(274, 345, 350, 270) + g.arrowHead(350, 262, 'right') +
        [0, 1, 2].map((k) => g.rect(360 + k * 215, 215, 180, 90, { r: 10 }) + (k < 2 ? g.line(544 + k * 215, 260, 570 + k * 215, 260) + g.arrowHead(572 + k * 215, 260, 'right') : '')).join('') +
        g.line(810, 310, 810, 420) + g.arrowHead(810, 422, 'down') +
        g.rect(720, 430, 180, 90, { r: 10 }) +
        g.line(716, 475, 590, 475) + g.arrowHead(588, 475, 'left') +
        g.rect(400, 430, 180, 90, { r: 10 }) +
        g.path('M400,500 Q170,600 170,400', { dash: '8 8' }) + g.arrowHead(170, 396, 'up'),
      ink:
        i.text(170, 170, 'Organic', 'blue', 32, { anchor: 'middle' }) + i.text(170, 204, 'content', 'blue', 28, { anchor: 'middle' }) +
        i.text(170, 340, 'Meta ads', 'blue', 32, { anchor: 'middle' }) + i.text(170, 374, 'reach locals', 'blue', 24, { anchor: 'middle' }) +
        i.text(450, 256, 'Landing', 'purple', 30, { anchor: 'middle' }) + i.text(450, 288, 'page', 'purple', 30, { anchor: 'middle' }) +
        i.text(665, 268, 'Enquiry', 'purple', 32, { anchor: 'middle' }) +
        i.text(880, 256, 'You call', 'red', 30, { anchor: 'middle' }) + i.text(880, 288, 'in 5 min', 'red', 30, { anchor: 'middle' }) +
        i.text(810, 472, 'Paid', 'dkgreen', 30, { anchor: 'middle' }) + i.text(810, 504, 'consult', 'dkgreen', 30, { anchor: 'middle' }) +
        i.text(490, 486, 'Retained', 'dkgreen', 34, { anchor: 'middle' }) +
        i.text(110, 640, 'What works → we make more of it', 'orange', 32) +
        i.text(170, 112, 'trust', 'black', 26, { anchor: 'middle' }) +
        i.text(150, 410, 'reach', 'black', 26, { anchor: 'end' }),
    },

    wheel,

    {
      type: 'board',
      title: 'Your First 90 Days',
      guide:
        g.line(80, 200, 980, 200, { sw: 4 }) + g.line(380, 180, 380, 220) + g.line(680, 180, 680, 220) +
        g.circle(80, 200, 10, { fill: '#F3F3F3' }) + g.arrowHead(980, 200, 'right') +
        g.text(80, 250, 'Day 1', { size: 15 }) + g.text(380, 250, 'Day 15', { size: 15, anchor: 'middle' }) +
        g.text(680, 250, 'Day 31', { size: 15, anchor: 'middle' }) + g.text(980, 250, 'Day 90', { size: 15, anchor: 'end' }),
      ink:
        i.text(230, 170, 'SET UP', 'blue', 40, { anchor: 'middle' }) +
        i.text(530, 170, 'LAUNCH', 'orange', 40, { anchor: 'middle' }) +
        i.text(830, 170, 'GROW', 'dkgreen', 40, { anchor: 'middle' }) +
        ['Access + onboarding form', 'Scripts written + approved', 'Shoot day (about 2 hrs)', 'Landing page + tracking'].map((s, k) => i.text(84, 320 + k * 52, `· ${s}`, 'blue', 28)).join('') +
        ['Ads go live', 'First posts, 3 a week', 'We check leads daily', 'Weekly call starts'].map((s, k) => i.text(390, 320 + k * 52, `· ${s}`, 'orange', 28)).join('') +
        ['New ad creatives monthly', '2nd shoot day', 'Double down on winners', 'Monthly report'].map((s, k) => i.text(690, 320 + k * 52, `· ${s}`, 'dkgreen', 28)).join('') +
        i.text(530, 640, 'You: about 2 hours a month + answering enquiries fast', 'purple', 32, { anchor: 'middle' }),
    },

    {
      type: 'board',
      title: 'Shoot Day',
      guide: timelineGuide(330, 120, 96, 6) + g.rect(700, 480, 290, 190, { r: 10, dash: '8 8' }),
      ink:
        timeline(330, 120, 96, [
          ['9:00', 'We set up in your office', 'black'],
          ['9:20', 'Warm-up: 2 throwaway takes', 'black'],
          ['9:30', 'Jane: ad hooks + videos', 'blue'],
          ['10:15', 'Holly: videos', 'purple'],
          ['10:45', 'Together: team video', 'dkgreen'],
          ['11:00', 'B-roll, then done', 'orange'],
        ], 32) +
        i.text(720, 522, 'Bring:', 'red', 32) +
        i.text(720, 562, '2-3 outfits, solid colours', 'red', 26) +
        i.text(720, 596, 'Your questions list', 'red', 26) +
        i.text(720, 630, 'Date: book it today', 'red', 26),
    },

    {
      type: 'board',
      title: 'What We Need From You',
      guide: [
        'Meta access: ad account, Facebook page, Instagram',
        'Website / domain access (for the landing page)',
        'Logo, brand colours and fonts',
        'Google reviews link + 3 testimonials (with OK)',
        'Fees: first consult + any fixed fees',
        'Who answers enquiries + the number leads go to',
        'Your intake system (e.g. LEAP, Actionstep)',
        'Shoot day date + who is on camera',
      ].map((t, k) => g.rect(90, 104 + k * 72, 30, 30, { r: 4, sw: 2 }) + g.text(140, 127 + k * 72, t, { size: 20, color: '#1B1B1B' })).join(''),
      ink:
        ['this week', 'this week', 'this week', 'by shoot day', 'today', 'today', 'today', 'today'].map((s, k) => i.text(990, 128 + k * 72, s, k > 3 ? 'red' : 'blue', 28, { anchor: 'end' })).join(''),
    },

    {
      type: 'board',
      title: 'Speed to Lead',
      guide:
        g.line(90, 300, 970, 300, { sw: 4 }) +
        [0, 1, 2, 3, 4].map((k) => g.circle(110 + k * 210, 300, 16, { fill: '#F3F3F3' })).join(''),
      ink:
        [
          ['0-5 min', 'Call', 'red'],
          ['No answer', 'SMS', 'orange'],
          ['1 hour', 'Call again', 'blue'],
          ['Day 1', 'Call + email', 'blue'],
          ['Day 3', 'Last follow-up', 'purple'],
        ].map(([t, s, c], k) => i.text(110 + k * 210, 250, t, c, 30, { anchor: 'middle' }) + i.text(110 + k * 210, 360, s, c, 32, { anchor: 'middle' })).join('') +
        i.text(530, 500, 'The first firm to call back', 'red', 44, { anchor: 'middle' }) +
        i.text(530, 552, 'usually wins the matter', 'red', 44, { anchor: 'middle' }) +
        i.under(320, 570, 420, 'red'),
    },

    {
      type: 'board',
      title: 'How We Measure It',
      guide: [0, 1, 2].map((k) => g.path(`M${110 + k * 300},380 A120,120 0 0 1 ${350 + k * 300},380`) + g.line(230 + k * 300, 380, 230 + k * 300, 310)).join(''),
      ink:
        i.text(230, 430, 'ENQUIRIES', 'orange', 38, { anchor: 'middle' }) +
        i.text(230, 476, 'cost per enquiry', 'orange', 28, { anchor: 'middle' }) +
        i.text(530, 430, 'CONSULTS', 'blue', 38, { anchor: 'middle' }) +
        i.text(530, 476, 'booked + showed up', 'blue', 28, { anchor: 'middle' }) +
        i.text(830, 430, 'RETAINED', 'dkgreen', 38, { anchor: 'middle' }) +
        i.text(830, 476, '$ in signed matters', 'dkgreen', 28, { anchor: 'middle' }) +
        i.text(530, 580, 'Targets: set together today', 'purple', 34, { anchor: 'middle' }) +
        i.text(530, 640, 'Ask every new client: "How did you find us?"', 'red', 34, { anchor: 'middle' }),
    },

    {
      type: 'board',
      title: 'Staying Compliant',
      html: cards(
        [
          { h4: 'General information only', p: 'Every video explains how things usually work. Nothing is advice for a specific person.' },
          { h4: 'Never identify anyone', p: 'The Family Law Act restricts publishing anything that identifies people in family law proceedings. Every story is de-identified, and shared with the client\'s OK.' },
          { h4: 'No promised outcomes', p: 'No "we\'ll win", no guarantees about property splits or parenting arrangements. Results talk, not promises.' },
          { h4: 'You approve everything', p: 'Jane or Holly signs off every script, post and ad before it goes live. We also check it against your advertising and conduct rules.' },
        ],
        { x: 50, y: 74, w: 950, h: 600, cols: 2 }
      ),
      ink: [0, 1, 2, 3].map((k) => i.tick(420 + (k % 2) * 482, 300 + Math.floor(k / 2) * 307, 'dkgreen', 1)).join(''),
    },

    {
      type: 'board',
      title: 'How We Work Together',
      html: cards(
        [
          { h4: 'Weekly call', p: '30 minutes, same time every week. Numbers, what\'s working, what\'s next.' },
          { h4: 'One group chat', p: 'Quick questions and approvals in one place, not lost in email.' },
          { h4: 'Approvals in 48 hours', p: 'Scripts and edits land in a shared Google Drive folder. Comment or approve within two days.' },
          { h4: 'Monthly report', p: 'Enquiries, consults, retained matters and content numbers, with the plan for next month.' },
        ],
        { x: 50, y: 74, w: 950, h: 600, cols: 2 }
      ),
      ink:
        i.text(80, 260, 'Day + time: pick today', 'blue', 30) +
        i.text(562, 260, 'WhatsApp?', 'blue', 30) +
        i.text(80, 566, 'Folder link: we send it', 'blue', 30) +
        i.text(562, 566, 'First one: end of month 1', 'blue', 30),
    },

    {
      type: 'next',
      checklist: [
        'Send Meta + website access',
        'Send logo, brand + fee details',
        'Book the shoot day',
        'Confirm who answers enquiries',
        'Pick the weekly call time',
        'Approve the first scripts',
      ],
      ink:
        i.text(80, 156, 'Jane + Holly own the content, we do the rest', 'blue', 28) +
        i.text(80, 356, 'Asif: scripts to you within a week', 'purple', 28) +
        i.text(80, 392, 'NH: access + assets this week', 'purple', 28) +
        i.text(80, 556, 'Group chat + Drive folder set up today', 'dkgreen', 28),
    },

    { type: 'notes' },
    { type: 'end', title: "Let's get started" },
  ],
};
