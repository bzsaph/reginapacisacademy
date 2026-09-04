# Regina Pacis Academy — school website

**Instruire pour Construire**

A static website for **Regina Pacis Academy**, a francophone and anglophone **day** school at **KG 32, Jali — Gasabo District, Kigali, Rwanda**: nursery (Baby, Middle, Top) and Primary One to Primary Five, with free school transport.

No build step, no framework, no dependencies. Open `index.html` in a browser and it works.

---

## ⚠️ Content policy — read this first

**Every word on this website is information the school itself supplied.** Nothing is invented.

Earlier drafts contained sample text so the design could be seen — student numbers, a founding year, a history, staff roles, clubs, a daily timetable, fee amounts, term dates, news stories and parent quotes. **All of it has been deleted.** The site now says only what we can actually stand behind.

The missing pieces are collected in:

### 📄 `Regina-Pacis-Academy-website-content-form.docx`

A 14-page Word form for the school to fill in — 20 tables covering the name, contact details, history, mission, leadership, numbers, classes, facilities, fees, calendar, admissions, the school day, transport, news, parent quotes, photographs and sign-off. Send it to the school; when it comes back, its answers drop straight into the pages.

Inside the HTML, every place waiting for that content is marked:

```html
<!-- FORM 8: fee table per class, payment details, what is included, bursaries. -->
```

Search the three pages for `FORM` to find all of them.

---

## What is currently on the site (all confirmed)

| Confirmed | Source |
|---|---|
| Name, crest, motto *Instruire pour Construire*, crest ribbon *Une bagage pour l'avenir* | Logo supplied by the client |
| Phones `0788 335 894` and `0788 465 723`, email `rpacisacademy@gmail.com` | Client message + school poster |
| Address KG 32, Jali, Gasabo District, Kigali; map pin `-1.9522864, 30.1220625` | Client message + Google Maps link |
| Nursery Baby / Middle / Top, and Primary One to Five; day school | Client |
| *École francophone et anglophone en toutes niveaux, avec éducateurs dévoués* | School poster |
| *Nouveaux bâtiments confortables et menu équilibré* | School poster |
| *Transport confortable assuré pour tous les enfants — gratuit* | School poster |
| *Lieux d'épanouissement pour vos enfants* | School poster |
| *Inscription en cours* and the **20% reduction for the first 100 pupils** | School poster |
| Nursery children may stay until 17h, accompanied home by older siblings | School poster |
| Facebook page | Client |
| Brand green `#17a44c` and orange `#f0873a` | Sampled from the school's poster |

Anything not in this table is **not** on the website.

---

## Pages — three only

| File | Contains |
|---|---|
| `index.html` | One scrolling page: `#home` hero, `#about`, `#academics` (classes), `#life` (school life), `#gallery`, `#news` (sliding announcements), fact band, call to action |
| `admissions.html` | How to enrol, classes open, fees, enrolment form, questions |
| `contact.html` | Contact details, message form, map and directions |

The menu mixes both: **Home / About / Classes / School life / Gallery / Announcements** scroll to sections of `index.html`; **Admissions** and **Contact** open their own page. The menu highlights the section you are reading.

## Layout — nothing left empty

Full-width three-column shell (`.shell`) on every page:

- **Left rail** — page navigation and the school's promo cards. Sticks while you scroll; hidden below 1280px.
- **Middle column** — the content blocks, separated by full-width promo banners.
- **Right rail** — at-a-glance facts, contact box, map, promo boxes. Drops below the content on phones.
- **Full-width rows** — `class="block full"` spans all three columns. The announcements slider uses it.

## Promo boxes — the school's own messages only

There is **no third-party advertising** on this site. Every promotional block belongs to Regina Pacis Academy:

| Class | Shape | Used for |
|---|---|---|
| `.promo--band` | Wide banner with icon, text, button | Free transport, nursery until 17h |
| `.promo--tall` | Tall left-rail card | The four *Facilité & spécialité* points + the 20% offer |
| `.promo` / `.promo--gold` / `.promo--line` | Small rail boxes | Inscription en cours, transport, classes, Facebook |

## The announcements slider

`#news` is a horizontal carousel: arrows, drag/swipe, scroll-snap, dots, and gentle autoplay that pauses on hover, focus and touch, and is off for reduced-motion visitors. Its six cards currently carry the school's confirmed announcements; replace them with real news from section 13 of the form.

## Images

`assets/img/` holds generated placeholder graphics. The gallery says so on the page, so no visitor is misled.

Replace them with real photographs: drop files into `assets/img/`, update the `src` attributes (or overwrite a placeholder with the same name and change `.svg` to `.jpg`). Landscape, around 1600px wide.

**Get written parental consent before publishing any photograph of a child.**

`logo.svg` is a redraw of the crest. If you have the original artwork, replace `logo.svg` and `favicon.svg` with it.

## Connecting the forms

The enrolment form and the contact form validate in the browser only — nothing is sent yet.

1. **Form service** (no server): Formspree, Web3Forms or Getform — point the form's `action` at their URL with `method="post"`, delivering to `rpacisacademy@gmail.com`.
2. **Your own backend**: point `action` at a PHP/Node endpoint that emails the office.

Test that a real submission arrives before announcing the site.

## Publishing

- **Netlify / Vercel / Cloudflare Pages** — drag the folder in, or connect a Git repository.
- **GitHub Pages** — push and enable Pages on `main`.
- **Shared hosting** — upload by FTP to `public_html`.

## Two questions still open for the school

1. **The name.** The Facebook page says *Regina Pacis **Academy***; the poster, crest and bus say *REGINA PACIS **ACADEMIC***. The site uses "Academy" throughout — section 1 of the form asks for the correct spelling.
2. **The map pin.** The supplied Google Maps link resolves to *Regina Pacis Catholic Church*. If the school gate is elsewhere, section 2 of the form asks for a pin on the gate itself.

## Notes for editors

- **Brand palette** — `--brand #17a44c`, `--brand-900 #0a3d20`, accent `--gold #f0873a`, all at the top of `assets/css/style.css`. Change them there and the whole site follows. `theme-color` on every page is `#0a3d20`.
- Add `class="reveal"` for the fade-up-on-scroll effect; `d1`/`d2`/`d3` stagger it.
- `data-count="620" data-suffix="+"` animates a number — currently unused, because there are no verified numbers to show.
- Navigation collapses below 1100px; left rail hides below 1280px; rails stack below 940px.
- Fonts load from Google Fonts; for full offline use, download **Fraunces** and **Plus Jakarta Sans** into `assets/fonts/` and swap the `<link>` for `@font-face` rules.
