# Deploy soomekeelse versiooni ja rollback

## Live vs local

- **Live pinnakatted.ee** jookseb **Cloudflare Workeris**. **Local** on sama Next.js projekt; kui deploy'd, siis live'il on samasugune sisu + soomekeel.

---

## Enne uue versiooni deploy't – märgi praegune live (kohustuslik rollback'i jaoks)

**Ühe käsuga rollback töötab ainult siis, kui oled enne deploy't loonud tag'i `live-stable`.**

Praegu live'il olev commit tuleb enne uut deploy't tag'iga kinnitada. Kui sa tead, milline commit on praegu live'il (nt viimane deploy'dud commit):

```bash
git tag live-stable <commit-hash>
```

Näide: kui live'il on commit `abc1234`:

```bash
git tag live-stable abc1234
```

Kui deploy'd tavaliselt oma praegusest harust (nt `main`) ja live on viimase push'iga sünkroonis, võid enne uute muudatuste push'imist teha:

```bash
git tag live-stable main
```

(Tehke see **enne** uue versiooni push'imist ja deploy't.)

---

## Deploy uus versioon live'i

```bash
npm run build
npx wrangler deploy
```

---

## Ühe käsuga rollback eelmise töötava versiooni peale

Kui midagi läheb pärast deploy't viltu, tõmba live tagasi eelmise (enne deploy't märgitud) versiooni peale:

```bash
./scripts/rollback-to-live-stable.sh
```

Skript: checkout'ib `live-stable` tag'i, teeb build'i, deploy'b Cloudflare'i. Pärast rollback'i oled git'is endiselt oma harul; skript teeb lõpus `git checkout -`, et tagasi oma haru juurde.

**Kui tag `live-stable` puudub**, ütleb skript selge errori ja viita sellele dokumendile.

Alternatiiv (ilma skriptita):

```bash
git checkout live-stable
npm run build
npx wrangler deploy
git checkout -
```

---

## Rollback Cloudflare dashboard'ist

Workers & Pages → vali projekt → **Deployments** → vali eelmine töötav deploy → **"Rollback to this deployment"**. Ei vaja git'i ega build'i.

---

## Kokkuvõte

| Samm | Tegevus |
|------|--------|
| Enne deploy't | `git tag live-stable <commit-praegu-live-il>` |
| Deploy | `npm run build && npx wrangler deploy` |
| Rollback ühe käsuga | `./scripts/rollback-to-live-stable.sh` |
