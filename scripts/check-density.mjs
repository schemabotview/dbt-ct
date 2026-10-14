// Density guard — MEASURED on the rendered route, not modelled. `npm run check` models a slide's
// height and passes frames that render short: course 1 modelled at 832–904 design px and rendered at
// 70–79 % of the pane. This drives the dev server in a 1920×1080 viewport and measures each frame
// against the CLAUDE.md density targets:
//
//   slide   80–95 % of the slide pane's height, and not clipped
//   scene   binding axis ≥ 0.85 of the scene pane, area (w × h of the node bounding box) ≥ 0.55
//   eyebrow no node under the top-left eyebrow label
//
// Run: npm run dev  (in another shell), then  npm run check:density [-- <courseId>|<slug> ...]
// Chromium: PUPPETEER_EXECUTABLE_PATH, else puppeteer's own download.
import puppeteer from 'puppeteer'

const BASE = process.env.DENSITY_URL || 'http://localhost:5173/'
// Slugs come from the content tree by file convention (src/content/<course>/NN-<id>.ts → <course>-<id>),
// so this script needs no TypeScript loader.
import { readdirSync } from 'node:fs'
const all = readdirSync('src/content', { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .flatMap((d) =>
    readdirSync(`src/content/${d.name}`)
      .filter((f) => /^\d+-.+\.ts$/.test(f))
      .sort()
      .map((f) => `${d.name}-${f.replace(/^\d+-/, '').replace(/\.ts$/, '')}`),
  )
const args = process.argv.slice(2)
const slugs = args.length ? all.filter((s) => args.some((a) => s === a || s.startsWith(a + '-'))) : all

const browser = await puppeteer.launch({ executablePath: process.env.PUPPETEER_EXECUTABLE_PATH, args: ['--no-sandbox'] })
const page = await browser.newPage()
await page.setViewport({ width: 1920, height: 1080 })
const mark = (ok) => (ok ? '  ' : '✗ ')
let off = 0
console.log('section'.padEnd(46), 'slide  ', 'scene w', ' h  ', ' area ', 'eyebrow')
for (const slug of slugs) {
  await page.goto(`${BASE}?capture=1#/${slug}`, { waitUntil: 'networkidle0' })
  await new Promise((r) => setTimeout(r, 900))
  const m = await page.evaluate(() => {
    const pane = document.querySelector('.scene-area').getBoundingClientRect()
    const rs = [...document.querySelectorAll('.scene-area .react-flow__node')].map((n) => n.getBoundingClientRect())
    const x0 = Math.min(...rs.map((r) => r.left)), x1 = Math.max(...rs.map((r) => r.right))
    const y0 = Math.min(...rs.map((r) => r.top)), y1 = Math.max(...rs.map((r) => r.bottom))
    const eb = document.querySelector('.reel-head__eyebrow').getBoundingClientRect()
    const panel = document.querySelector('.slide-panel').getBoundingClientRect()
    const sc = document.querySelector('.slide-panel__scaler').getBoundingClientRect()
    return {
      w: (x1 - x0) / pane.width,
      h: (y1 - y0) / pane.height,
      under: rs.some((r) => r.top < eb.bottom + 8 && r.left < eb.right + 8),
      slide: sc.height / panel.height,
      clip: sc.bottom > panel.bottom + 1,
    }
  })
  const okSlide = m.slide >= 0.8 && m.slide <= 0.95 && !m.clip
  const okBind = Math.max(m.w, m.h) >= 0.85
  const okArea = m.w * m.h >= 0.55
  if (!okSlide || !okBind || !okArea || m.under) off++
  console.log(
    slug.padEnd(46),
    mark(okSlide) + `${(m.slide * 100).toFixed(0)}%${m.clip ? ' CLIP' : ''}`.padEnd(5),
    mark(okBind) + m.w.toFixed(2),
    m.h.toFixed(2),
    mark(okArea) + (m.w * m.h).toFixed(2),
    m.under ? '✗ under' : '  ok',
  )
}
await browser.close()
if (off) {
  console.error(`\n✗ ${off} frame(s) off the density targets`)
  process.exit(1)
}
console.log('\n✓ every frame on the density targets')
