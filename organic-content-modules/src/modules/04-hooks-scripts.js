const { ink: i, guide: g, cards } = require('../lib');

module.exports = {
  number: 4,
  title: 'Hooks and Scripts',
  runtime: '15 to 18 min',
  outcome: 'The firm can write a script with all three hook layers, knows the 8 structures that work in legal and finance, and uses Claude to draft scripts in their own voice.',
  slides: [
    { type: 'cover', title: 'Hooks\n& Scripts' },

    { type: 'divider', lead: 'The BIG', word: 'Problems', tone: 'problem' },
    { type: 'point', tone: 'problem', n: 1, text: "They Scroll Past in 3 Seconds", notes: { say: ["If the first three seconds don't land, nobody sees the advice."] } },
    { type: 'point', tone: 'problem', n: 2, text: "It Sounds Like a Brochure", notes: { say: ["Professional content flops when it sounds like a letter of advice."] } },
    { type: 'point', tone: 'problem', n: 3, text: "Writing Scripts Takes Forever", notes: { say: ["Thirteen scripts from scratch is a week of evenings."] } },

    { type: 'divider', word: 'OPPORTUNITY', tone: 'idea' },
    { type: 'point', tone: 'idea', n: 1, text: "Stack All 3 Hook Layers", notes: { say: ["Written, verbal and visual hooks all pointing at one idea."] } },
    { type: 'point', tone: 'idea', n: 2, text: "One Proven Structure per Video", notes: { say: ["Eight structures that work for firms. Pick one, deliver one idea."] } },
    { type: 'point', tone: 'idea', n: 3, text: "Claude Drafts, You Make It Sound Like You", notes: { say: ["Claude writes the first draft. You read it out loud and make it yours."] } },

    {
      type: 'board',
      title: 'The Anatomy of a Video',
      guide:
        g.rect(80, 300, 900, 80, { r: 10 }) +
        g.line(170, 300, 170, 380) + g.line(820, 300, 820, 380) +
        g.text(80, 410, '0s', { size: 13 }) + g.text(170, 410, '3s', { size: 13, anchor: 'middle' }) +
        g.text(820, 410, '~50s', { size: 13, anchor: 'middle' }) + g.text(980, 410, '60s', { size: 13, anchor: 'end' }),
      ink:
        i.text(125, 352, 'HOOK', 'red', 30, { anchor: 'middle' }) +
        i.text(495, 354, 'BODY', 'blue', 44, { anchor: 'middle' }) +
        i.text(900, 352, 'CTA', 'dkgreen', 36, { anchor: 'middle' }) +
        i.arrow([[125, 290], [125, 210]], 'red') +
        i.text(70, 150, 'stop the scroll', 'red', 34) +
        i.text(70, 186, 'they decide here', 'red', 30) +
        i.text(495, 260, 'ONE idea, delivered fast', 'blue', 36, { anchor: 'middle' }) +
        i.arrow([[900, 290], [900, 210]], 'dkgreen') +
        i.text(900, 158, 'tell them what', 'dkgreen', 32, { anchor: 'middle' }) +
        i.text(900, 190, 'to do next', 'dkgreen', 32, { anchor: 'middle' }) +
        i.text(80, 520, '30-60 seconds. 1 idea. 1 CTA.', 'purple', 44) +
        i.under(80, 538, 520, 'purple'),
      notes: {
        say: [
          'Every short video has three parts. The hook is the first three seconds, and it decides whether anyone watches the rest.',
          'The body delivers one idea. Not five. One, delivered fast.',
          'The CTA tells them what to do next, and it matches the funnel stage from Module 2.',
        ],
        draw: ['Label Hook, Body, CTA in the bar. Arrow out of each with its job. Purple rule underneath.'],
      },
    },

    {
      type: 'board',
      title: 'The 3 Hook Layers',
      guide:
        g.phone(420, 80, 216, 600) +
        g.rect(440, 130, 176, 70, { r: 6, dash: '6 6' }) +
        g.circle(528, 340, 58) + g.path('M462,470 Q528,400 594,470') +
        g.rect(440, 560, 176, 44, { r: 6, dash: '6 6' }),
      ink:
        i.text(528, 160, '3 signs your ex', 'black', 26, { anchor: 'middle' }) +
        i.text(528, 186, 'is hiding money', 'black', 26, { anchor: 'middle' }) +
        i.arrow([[380, 160], [438, 160]], 'red') +
        i.text(60, 140, 'WRITTEN hook', 'red', 38) +
        i.text(60, 176, 'text on screen,', 'red', 30) +
        i.text(60, 206, 'under 7 words', 'red', 30) +
        i.arrow([[680, 350], [592, 350]], 'blue') +
        i.text(700, 320, 'VERBAL hook', 'blue', 38) +
        i.text(700, 356, 'the first sentence', 'blue', 30) +
        i.text(700, 386, 'you say out loud', 'blue', 30) +
        i.arrow([[380, 470], [450, 470]], 'purple') +
        i.text(60, 450, 'VISUAL hook', 'purple', 38) +
        i.text(60, 486, 'what they SEE: you', 'purple', 30) +
        i.text(60, 516, 'walking in, a prop,', 'purple', 30) +
        i.text(60, 546, 'a whiteboard', 'purple', 30) +
        i.text(700, 600, 'all 3 say the', 'dkgreen', 32) +
        i.text(700, 634, 'same thing', 'dkgreen', 32),
      notes: {
        say: [
          'A hook has three layers working at the same time.',
          'Written: the text on screen, under seven words, because most people watch with the sound off.',
          'Verbal: the first sentence you say. Visual: what they see in that first second. Movement, a prop, a location, something that is not just a head on a beige wall.',
          'When all three point at the same idea, people stop.',
        ],
        draw: ['Write an example hook at the top of the phone. Label each layer with an arrow.'],
      },
    },

    {
      type: 'board',
      title: 'Hooks That Work for Firms',
      html: cards(
        [
          { h4: 'Call out who it\'s for', p: '"If you\'re [who] and [situation]..."', eg: '"If you\'re separating and you own a business, watch this."' },
          { h4: 'The number', p: '"3 signs / 5 mistakes / 1 thing..."', eg: '"3 signs your business partner is about to walk."' },
          { h4: 'Stop doing this', p: '"Stop [common action] if you want [result]."', eg: '"Stop going to your bank first if you\'re self-employed."' },
          { h4: 'The question you always get', p: '"The #1 question clients ask me is..."', eg: '"Everyone asks me: will I lose the house?"' },
          { h4: 'Experience', p: '"After [years / cases], here\'s what I know..."', eg: '"After 400 property settlements, here\'s what nobody tells you."' },
          { h4: 'Red flag or green flag?', p: 'Read out scenarios, call each one.', eg: '"Red flag or green flag: they want 60-day terms on the first job."' },
        ],
        { x: 50, y: 74, w: 950, h: 590, cols: 3 }
      ),
      ink: i.under(66, 114, 200, 'red') + i.under(708, 416, 210, 'red') + i.text(200, 330, 'start here', 'red', 34, { anchor: 'middle' }) + i.text(845, 632, 'start here', 'red', 34, { anchor: 'middle' }),
      notes: {
        say: [
          'Six hook patterns that work for legal and finance. Steal them.',
          'The two I would start with: calling out exactly who it is for, and red flag or green flag. They work because the viewer instantly knows if it is about them.',
        ],
        draw: ['Circle your two favourites.'],
      },
    },

    {
      type: 'board',
      title: '8 Structures That Work for Firms',
      html: cards(
        [
          { h4: 'Myth-Busting Reframe', p: 'Common belief, why it\'s wrong, what\'s true.', eg: '"50/50 is automatic." It isn\'t.' },
          { h4: 'Rating Advice 0-10', p: 'Read out advice people get, score it, explain.', eg: '"Just use the same lawyer as your ex." 0/10.' },
          { h4: 'Red Flag / Green Flag', p: 'Rapid scenarios, call each one.', eg: 'Buying a business: red or green?' },
          { h4: 'Tier List', p: 'Rank options S to F, with a reason.', eg: 'Ways to finance equipment, ranked.' },
          { h4: 'Smart vs Dumb', p: 'The dumb way people do it vs the smart way.', eg: 'Dumb: sign first. Smart: get advice first.' },
          { h4: 'Is It Possible To...?', p: 'Challenge, game plan, result, lesson.', eg: 'Can you get a home loan 6 months into a business?' },
          { h4: 'Behind the Scenes', p: 'Show the work most people never see.', eg: 'How we prep a client for mediation.' },
          { h4: 'Two People Are Trying To...', p: 'Same goal, two approaches, two outcomes.', eg: 'Two couples split. One gets advice early.' },
        ],
        { x: 50, y: 74, w: 950, h: 590, cols: 4 }
      ),
      ink: [0, 1, 2, 3].map((k) => i.text(70 + k * 241, 330, '-> reach', 'orange', 32) + i.text(70 + k * 241, 632, '-> followers + leads', 'dkgreen', 30)).join(''),
      notes: {
        say: [
          'These eight structures are the backbone of everything we film for our clients.',
          'The top row is great for reach. The bottom row is great for followers and leads, because people see how you think.',
          'Pick one structure per video, and do not use the same one twice in a row.',
        ],
      },
    },

    {
      type: 'board',
      title: 'Use Claude to Draft the Script',
      html: cards(
        [
          {
            h4: 'Paste this into Claude',
            mono:
              'I run [firm] in [city]. We help [who] with [practice area].\nMy 3 content pillars: [pillar 1], [pillar 2], [pillar 3].\nMy clients usually ask: [3 real questions].\n\nWrite a 45-second Instagram Reel script on: [topic].\nUse the [structure] structure.\nGive me:\n- a written hook (on-screen text, under 7 words)\n- a verbal hook (first sentence)\n- a visual hook (what the viewer sees)\n- the body in short spoken sentences\n- a CTA for [TOFU / MOFU / BOFU]\n- 3 alternative hooks to test\n\nWrite it how I talk across the desk, not how I write a letter of advice. General information only, no promises of outcomes.',
          },
        ],
        { x: 50, y: 74, w: 640, h: 590, cols: 1 }
      ),
      guide: g.rect(720, 74, 280, 590, { r: 10, dash: '8 8' }),
      ink:
        i.text(740, 140, 'Then YOU:', 'purple', 38) +
        i.text(740, 200, '1. read it out loud', 'purple', 30) +
        i.text(740, 244, '2. cut anything you', 'purple', 30) +
        i.text(740, 276, '   wouldn\'t say', 'purple', 30) +
        i.text(740, 320, '3. add one real', 'purple', 30) +
        i.text(740, 352, '   example', 'purple', 30) +
        i.text(740, 396, '4. pick the hook', 'purple', 30) +
        i.text(740, 500, 'Claude drafts.', 'red', 34) +
        i.text(740, 540, 'You sound like', 'red', 34) +
        i.text(740, 580, 'you.', 'red', 34),
      notes: {
        say: [
          'You do not need to write scripts from scratch. Give Claude your firm, your pillars and the real questions clients ask, then pick a topic and a structure.',
          'The last line matters: tell it to write how you talk, and keep it general information with no promised outcomes.',
          'Then read it out loud. Cut anything you would never say. Add one real example from your practice. That is what makes it yours.',
        ],
        draw: ['Write the four "then you" steps down the right.'],
      },
    },

    {
      type: 'statement',
      text: 'Say it like you would across the desk, not like you would write it in a letter.',
      notes: { say: ['The number one reason professional content flops is it sounds like a brochure. Talk like you talk to a client.'] },
    },

    {
      type: 'sheet',
      title: 'Script Builder',
      minutes: 15,
      tag: { x: 520, y: 22, w: 240, label: 'Structure:' },
      cells: [
        { x: 50, y: 70, w: 316, h: 120, label: 'Written hook', prompt: 'On screen, under 7 words' },
        { x: 366, y: 70, w: 317, h: 120, label: 'Verbal hook', prompt: 'First sentence' },
        { x: 683, y: 70, w: 317, h: 120, label: 'Visual hook', prompt: 'What they see' },
        { x: 50, y: 190, w: 950, h: 300, label: 'Body', prompt: '3 beats max, short spoken sentences', dots: true },
        { x: 50, y: 490, w: 475, h: 170, label: 'CTA', prompt: 'Matches the funnel stage' },
        { x: 525, y: 490, w: 475, h: 170, label: 'Compliance check', prompt: 'General info? No promised outcomes? No client details?' },
      ],
      ink:
        i.text(610, 60, 'Myth-bust', 'purple', 28) +
        i.text(66, 150, '"50/50 is a myth"', 'red', 32) +
        i.text(382, 140, '"Everyone thinks a split', 'blue', 26) +
        i.text(382, 168, 'is automatically 50/50."', 'blue', 26) +
        i.text(699, 150, 'Me tearing a $ note', 'purple', 28) +
        i.text(66, 252, '1. Courts look at contributions, not just who earned what', 'blue', 30) +
        i.text(66, 300, '2. Then future needs: kids, health, earning capacity', 'blue', 30) +
        i.text(66, 348, '3. So 60/40 or 70/30 happens all the time', 'blue', 30) +
        i.text(66, 560, '"Follow if you\'re in the middle', 'dkgreen', 30) +
        i.text(66, 594, 'of a separation."', 'dkgreen', 30) +
        i.tick(560, 590) + i.tick(640, 590) + i.tick(720, 590),
      notes: {
        say: ['Pause and build one script now using this sheet. Then do the rest of your 13 with Claude using the prompt from the last slide.'],
        draw: ['Fill it in with the 50/50 myth example.'],
      },
    },

    {
      type: 'next',
      checklist: [
        'Pick your 2 go-to hook patterns',
        'Fill in one Script Builder by hand',
        'Use the Claude prompt for the other 12',
        'Read every script out loud and edit',
        'Run the compliance check on all 13',
      ],
      notes: { say: ['Takeaway: hook, body, CTA. Three hook layers. One structure per video. Claude drafts, you make it sound like you.'] },
    },

    { type: 'notes' },
  ],
};
