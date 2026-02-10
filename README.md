# Pinnakatted.ee

Next.js veebisait PUR-soojustuse ja polüurea hüdroisolatsiooni teenuste jaoks. Deploy Cloudflare Pages. App Router, TypeScript, Tailwind CSS, Framer Motion. Deploy Cloudflare Pages’i jaoks valmis.

## Nõuded

- Node.js 18+
- npm või pnpm

## Paigaldus

```bash
npm install
```

## Arendus

```bash
npm run dev
```

Avage brauseris **http://localhost:3010** (projekt kasutab porti 3010).

**Kui veeb ei avane:**  
1. Käivita terminalis `npm run dev` ja oota teadet `Ready in …`.  
2. Ava brauseris täpselt see aadress, mis terminalis näidatakse (nt `Local: http://localhost:3010`).  
3. Kui port on hõivatud (`EADDRINUSE`), kasuta vabast porti: `npm run dev -- -p 3020` ja ava http://localhost:3020.

## Build

```bash
npm run build
```

## Kontaktivorm ja e-kirjad

Kontaktivormid (kontaktileht, PUR-kalkulaatori päring) saadavad e-kirjad **FormSubmit** kaudu otse kliendi e-mailile (`lib/company.ts` → `company.email`). Vormid töötavad staatilise deploy’iga (Cloudflare Pages, `out/`), serverit pole vaja.

- **Esimene kord:** FormSubmit saadab `company.email` aadressile kinnituse – klient peab lingile klõpsama, et päringud hakkaksid kohale jõudma.
- **Turnstile** jääb vormidele spamikaitseks; FormSubmiti oma captcha on välja lülitatud (`_captcha: false`).

## Keskkonnamuutujad

| Muutuja | Kirjeldus | Näide |
|--------|------------|--------|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile widgeti site key (vormi spam-kaitse) | `1x00000000000000000000AA` (test) |
| `TURNSTILE_SECRET_KEY` | Turnstile secret key (vajalik ainult kui kasutad `/api/contact` serveris) | (Cloudflare Turnstile dashboard) |

- Ilma `TURNSTILE_SECRET_KEY`-ta (nt arenduses) aktsepteeritakse test-token.
- E-kirjade saatmine toimub FormSubmiti kaudu brauserist; serveri võtmed pole selleks vajalikud.

## Deploy: GitHub → Cloudflare Pages (live)

Kui soovid, et GitHubi push’id uuendaksid saidi automaatselt:

1. **Loo GitHubis uus repo** (nt `pinnakatted-ee`), ära lisa README ega .gitignore – need on juba projektis.
2. **Ühenda projekt ja push’i** (terminalis projekti kaustas):
   ```bash
   git remote add origin https://github.com/SINU-KASUTAJA/pinnakatted-ee.git
   git branch -M main
   git push -u origin main
   ```
3. **Cloudflare Dashboard** → Pages → Create project → **Connect to Git** → vali oma GitHub repo.
4. **Build settings:**
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Root directory:** (tühi) või `/`
5. **Deploy** – pärast esimest build’i ja iga `git push` tehakse uus deploy; muudatused ilmuksid lives.

Keskkonnamuutujad (nt Turnstile võtmed) seadista Cloudflare Pages → teie projekt → Settings → Environment variables.

---

## Deploy Cloudflare Pages’ile (käsitsi)

### Variant A: Wrangler + @cloudflare/next-on-pages (SSR/API)

1. Paigalda adapter:  
   `npm i -D @cloudflare/next-on-pages`
2. Build:  
   `npx @cloudflare/next-on-pages`
3. Deploy:  
   `npx wrangler pages deploy .vercel/output/static`
4. Cloudflare Dashboardis seadista **Environment variables**:  
   `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` (ja vajadusel teised).

### Variant B: Staatiline export (ilma API-routeta)

1. `next.config.ts`: lisa `output: 'export'`.
2. `npm run build` → `out/`.
3. Cloudflare Pages: üleslaadimine kaustast `out` või ühendus Gitiga (build command: `npm run build`, output: `out`).
4. Kontaktivormi jaoks kasuta kolmanda osapoole teenust (nt Formspree) või Cloudflare Workersi endpointi.

### Redirectid

Vanad URL-id suunatakse uutele juba `next.config.ts` redirects’iga:

- `/teenused/` → `/teenused`
- `/tehtud-tood/` → `/tehtud-tood`
- `/kontakt/` → `/kontakt`
- `/jarelmaks/` → `/jarelmaks`
- `/hinnad/` → `/hinnad`
- `/materjalid/` → `/materjalid`

Cloudflare Pages’il võid lisada ka `_redirects` faili (kui kasutad staatilist exporti), et kordada neid reegleid.

## Kuidas lisada projekte

1. Redigeeri `content/projects.json`.
2. Iga projekt: `slug`, `title`, `serviceType` (`pur` või `polurea`), `location`, `date`, `coverImage`, `images`, `summary`, `seo.title`, `seo.description`.
3. Pildid: lisa failid `public/images/projects/`. Nimetus soovituslik: `teenus-asukoht-objekt-YYYY-MM.webp`.
4. `coverImage` ja `images`: tee viide `/images/projects/failinimi.webp`.

## Kuidas lisada pilte (migratsioon vanalt saidilt)

1. Laadi vanalt saidilt pildid alla (manuaalselt või skriptiga).
2. Teisenda vajadusel WebP/AVIF ja optimeeri (nt `sharp`, `squoosh`).
3. Nimeta ümber vastavalt standardile: `teenus-asukoht-objekt-YYYY-MM.webp`.
4. Loo kaust `public/images/projects/` ja lisa pildid sinna.
5. Uuenda `content/projects.json` vastavate `coverImage` ja `images` viidetega.

## Lehed ja URL-id

| URL | Kirjeldus |
|-----|------------|
| `/` | Avaleht |
| `/teenused` | Teenuste hub |
| `/teenused/pur-soojustus` | PUR soojustus |
| `/teenused/polurea` | Polüurea |
| `/hinnad` | Kalkulaator (PUR + Polürea tabid) |
| `/tehtud-tood` | Portfoolio (filtrid) |
| `/projektid/[slug]` | Projekti detail |
| `/jarelmaks` | Järelmaks |
| `/kontakt` | Kontakt, vorm |
| `/materjalid` | Materjalide võrdlus |

## Tehnoloogiad

- Next.js 15 (App Router), TypeScript
- Tailwind CSS, Framer Motion
- Cloudflare Turnstile (vormi spam-kaitse)
- SEO: metadata, JSON-LD (LocalBusiness, FAQPage), sitemap.xml, robots.txt

## Litsents

Privaatne. © Pinnakatted.ee
