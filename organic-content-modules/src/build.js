// Builds every module into:
//   pdf/blank/   - the workbook you film over (guides only, draw live on iPad)
//   pdf/filled/  - reference copy with the annotations already drawn in
//   guides/      - presenter guide per module (what to say + what to draw)
// Usage: node src/build.js [moduleNumber] [--png]

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { renderModule } = require('./lib');
const brand = require('./brand');

const ROOT = path.join(__dirname, '..');
const only = process.argv.find((a) => /^\d+$/.test(a));
const wantPng = process.argv.includes('--png');

const load = (dir) =>
  fs
    .readdirSync(path.join(__dirname, dir))
    .filter((f) => f.endsWith('.js'))
    .sort()
    .map((f) => require(path.join(__dirname, dir, f)));
const mods = [...load('modules'), ...load('extras')].filter((m) => !only || m.number === Number(only));
const plan = require('./plan');
const { POST_TIME } = require('./plan-slides');

const pad = (n) => String(n).padStart(2, '0');
const slug = (m) => m.file || `Module-${pad(m.number)}-${m.title.replace(/[^A-Za-z0-9]+/g, '-').replace(/-+$/, '')}`;

function presenterGuide(m) {
  let md = m.file ? `# ${m.title}\n\n` : `# Module ${m.number}: ${m.title}\n\n`;
  md += `**Run time:** ${m.runtime}  \n**Outcome:** ${m.outcome}\n\n`;
  md += `Film it like a TAB module on Skool: workbook on the iPad (or screen-share), you on camera, drawing over the boards as you talk. Run the Problems, then the Opportunity, then teach each board. The FILLED PDF shows what each board should look like when you're done.\n\n---\n\n`;
  m.slides.forEach((sl, i) => {
    const name =
      sl.type === 'cover' ? 'Cover' :
      sl.type === 'end' ? 'Close' :
      sl.type === 'notes' ? 'Notes page' :
      sl.type === 'next' ? 'Next... (takeaways + checklist)' :
      sl.type === 'statement' ? `Statement: "${sl.text.replace(/\n/g, ' ')}"` :
      sl.type === 'divider' ? `Section: ${sl.lead || 'The'} ${sl.word}` :
      sl.type === 'shot' ? `Text page: "${sl.text.replace(/\n/g, ' ')}"` :
      sl.type === 'point' ? `${sl.tone === 'problem' ? 'Problem' : 'Opportunity'} ${sl.n}: ${sl.text.replace(/\n/g, ' ')}` :
      sl.title;
    md += `## Slide ${i + 1}: ${name}\n\n`;
    const n = sl.notes || {};
    if (n.say) md += `**Say:**\n${[].concat(n.say).map((s) => `- ${s}`).join('\n')}\n\n`;
    if (n.draw) md += `**Draw:**\n${[].concat(n.draw).map((s) => `- ${s}`).join('\n')}\n\n`;
    if (sl.type === 'next') md += `**Checklist on screen:**\n${sl.checklist.map((c) => `- [ ] ${c}`).join('\n')}\n\n`;
  });
  return md;
}

(async () => {
  const dirs = ['dist', 'pdf/blank', 'pdf/filled', 'guides', 'previews'];
  dirs.forEach((d) => fs.mkdirSync(path.join(ROOT, d), { recursive: true }));

  // the plan as a CSV, same columns as our client content calendars + the extras
  const q = (v) => `"${String(v).replace(/"/g, '""')}"`;
  const csv = [
    ['Post Idea', 'Post Link', 'Scheduled Date to Post', 'Posted/Scheduled', 'Posting Schedule', 'Post Format', 'Funnel', 'Structure', 'Hook', 'Script beats', 'CTA', 'On-screen text', 'Caption', 'Law example', 'Finance example', 'Real example'],
    ...plan.map((p) => [p.topic, '', `Day ${p.day}`, '', `${p.dow} ${POST_TIME[p.dow]}`, `Video Post (${p.format}, ${p.length})`, p.funnel, p.structure, p.hook, p.beats.map((b, k) => `${k + 1}. ${b}`).join(' '), p.cta, p.onscreen, p.caption, p.law, p.finance, p.example ? `${p.example.who}, ${p.example.views}: ${p.example.url}` : '']),
  ]
    .map((r) => r.map(q).join(','))
    .join('\n');
  fs.writeFileSync(path.join(ROOT, '30-Day-Post-Plan.csv'), csv + '\n');

  // the pillars module's 30-day calendar, one post a day
  const { POSTS } = require('./pillars');
  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const pcsv = [
    ['Day', 'Weekday', 'Pillar', 'Type', 'Post', 'Say this first', 'Posted'],
    ...POSTS.map((p) => [`Day ${p.day}`, DAYS[(p.day - 1) % 7], p.pillar, p.type, p.short, p.hook, '']),
  ]
    .map((r) => r.map(q).join(','))
    .join('\n');
  fs.writeFileSync(path.join(ROOT, '30-Day-Pillar-Calendar.csv'), pcsv + '\n');

  // bundled Chromium if it's installed, otherwise the machine's Chrome
  const browser = await chromium.launch().catch(() => chromium.launch({ channel: 'chrome' }));
  const page = await browser.newPage({ viewport: { width: 1056, height: 753 } });

  for (const m of mods) {
    const name = slug(m);
    if (!m.noGuide) fs.writeFileSync(path.join(ROOT, 'guides', `${name}.md`), presenterGuide(m));
    for (const filled of [false, true]) {
      const html = renderModule(m, { brand, filled });
      const htmlPath = path.join(ROOT, 'dist', `${name}${filled ? '-FILLED' : ''}.html`);
      fs.writeFileSync(htmlPath, html);
      await page.goto('file://' + htmlPath);
      await page.evaluate(() => document.fonts.ready);
      await page.pdf({
        path: path.join(ROOT, 'pdf', filled ? 'filled' : 'blank', `${name}${filled ? ' (FILLED)' : ''}.pdf`),
        width: '11in',
        height: '7.844in',
        printBackground: true,
        preferCSSPageSize: true,
      });
      if (wantPng && filled) {
        const n = await page.locator('section.slide').count();
        for (let i = 0; i < n; i++) {
          await page.locator('section.slide').nth(i).screenshot({
            path: path.join(ROOT, 'previews', `${pad(m.number)}-${pad(i + 1)}.png`),
          });
        }
      }
    }
    console.log('built', name, `(${m.slides.length} slides)`);
  }
  await browser.close();
})();
