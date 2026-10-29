// Builds skool/: the Skool classroom set-up for the program, laid out like the
// TAB classroom (numbered sections; each lesson = video + "[Lesson] Wrksht").
//   skool/SKOOL-SETUP.md      course, sections, lesson titles and descriptions to paste
//   skool/<section>/*.pdf     the files to attach, already named for Skool
// Run after a build:  npm run skool

const fs = require('fs');
const path = require('path');
const brand = require('./brand');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'skool');
const pad = (n) => String(n).padStart(2, '0');
const mod = (n) => require(path.join(__dirname, 'modules', fs.readdirSync(path.join(__dirname, 'modules')).find((f) => f.startsWith(pad(n)))));
const blank = (m) => path.join(ROOT, 'pdf/blank', `Module-${pad(m.number)}-${m.title.replace(/[^A-Za-z0-9]+/g, '-').replace(/-+$/, '')}.pdf`);

const COURSE = {
  title: brand.program,
  description: 'Win more clients with organic content, without it taking over your week. Why it works, what to post, how to film, edit and post it with Claude, and your next 30 days planned for you.',
};

// what each lesson says on Skool, in the client's words
const LESSONS = {
  intro: {
    title: 'Introduction 👋',
    description: 'Start here. What this program covers, how each lesson works, and how to get the most out of the workbooks. Print each workbook (or open it on your iPad) and fill it in as you watch.',
  },
  1: 'Why clients now check you out online before they call, and why organic content is the only channel that compounds. Fill in "Your Starting Point" as you watch.',
  2: 'The three jobs every post does (reach, connect, convert), the monthly mix, and your own topics mapped to each stage.',
  3: 'The four content pillars (connection, value, proof and invitation) built out for a law firm, the Outlier Method for borrowing what already works, and your next 30 days planned.',
  4: 'Stop the scroll with all three hook layers, eight structures that work for firms, and how to draft scripts with Claude so they still sound like you.',
  5: 'Set up a simple set, run a half-day shoot, and film most of your month in one sitting. Your printed shot list is in the workbook.',
  6: 'Hand Claude a folder of raw footage and get back captioned, correctly sized rough cuts the same day. Claude does the slow part, you approve.',
  7: 'One video, six places. Captions, your content calendar and a weekly review with Claude, plus the weekly rhythm that keeps it going.',
  8: 'Your next 30 days, planned: a script for every post, your weekly schedule and a Sunday review. Start at once a week and build to once a day.',
};

const SECTIONS = [
  ['1.0 Watch This First!', ['intro', 1, 2]],
  ['2.0 Plan Your Content', [3, 4]],
  ['3.0 Make Your Content', [5, 6]],
  ['4.0 Post and Grow', [7, 8]],
];

// extra resources beyond the lesson's own workbook
const EXTRAS = {
  8: [
    ['30-Day Post Plan.pdf', path.join(ROOT, 'pdf/blank/30-Day-Post-Plan.pdf')],
    ['30-Day Post Plan (for Google Sheets).csv', path.join(ROOT, '30-Day-Post-Plan.csv')],
  ],
};

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

let md = `# Skool set-up: ${COURSE.title}\n\n`;
md += `Built from the workbooks in \`pdf/blank\`. Set it up like the TAB classroom: each lesson is the video, plus the files listed under **Resources**. Upload the files from the matching folder in \`skool/\`, they're already named the way they should appear.\n\n`;
md += `## Course\n\n**Title:** ${COURSE.title}\n\n**Description:** ${COURSE.description}\n\n`;

for (const [section, items] of SECTIONS) {
  const dir = path.join(OUT, section);
  fs.mkdirSync(dir, { recursive: true });
  md += `---\n\n## ${section}\n\n`;
  for (const key of items) {
    if (key === 'intro') {
      const l = LESSONS.intro;
      md += `### ${l.title}\n\n${l.description}\n\n**Video:** a short welcome, 2 to 3 minutes.  \n**Resources:** none.\n\n`;
      continue;
    }
    const m = mod(key);
    const files = [[`${m.title} Wrksht.pdf`, blank(m)], ...(EXTRAS[key] || [])];
    for (const [name, src] of files) fs.copyFileSync(src, path.join(dir, name));
    md += `### ${m.title}\n\n${LESSONS[key]}\n\n**Video:** Module ${key}, about ${m.runtime}.  \n**Resources:**\n${files.map(([name]) => `- ${name.replace(/\.(pdf|csv)$/, '')} (\`skool/${section}/${name}\`)`).join('\n')}\n\n`;
  }
}

md += `---\n\n**Filming:** record each module over its blank workbook on the iPad. The filled copies in \`pdf/filled\` show what each board should look like when you're done, and \`guides/\` has what to say and draw on every page.\n`;
fs.writeFileSync(path.join(OUT, 'SKOOL-SETUP.md'), md);
console.log('skool/ ready:', SECTIONS.map(([s, i]) => `${s} (${i.length})`).join(', '));
