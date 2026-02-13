# Deploy soomekeelse versiooni ja rollback

## Live vs local

- **Live pinnakatted.ee** jookseb juba **Cloudflare Workeris** (DNS suunatud Cloudflare’i ja Workerile). See tähendab, et live’il on sama **Next.js** build (sama repo, sama sisu) mis localis välja arvatud see, mida sa pole veel deploy’inud.
- **Local** on sama Next.js projekt; soomekeel ja viimased muudatused on siin. Kui deploy’d, siis live’il on **samasugune sisu + soomekeel**.

### 1. Enne deploy’d – tee turvaline punkt

```bash
# 1. Tag versioon enne deploy’d (rollback’i jaoks)
git add -A
git commit -m "chore: enne soomekeelse deploy'd"
git tag -a pre-fi-deploy-$(date +%Y%m%d) -m "Enne soomekeelse versiooni deploy'd live'i"

# 2. Build (sisu = local, sh soomekeel)
npm run build

# 3. (Soovitus) salvesta praegune out/ varukoopiana, kui varem oled deploy’inud Next.js
# cp -r out out-backup-$(date +%Y%m%d)
```

### 2. Deploy Cloudflare’i

```bash
npx wrangler deploy
```

### 3. Kui midagi läheb tuksi – rollback

Live on juba Next.js Cloudflare Workeris, seega:

- **Cloudflare dashboard:** Workers & Pages → vali projekt "pinnakatted" → **Deployments**. Seal on varasemad deploy’d; vali eelmine töötav versioon ja **"Rollback to this deployment"**. Live läheb tagasi eelmise buildi juurde (ilma soomekeele muudatusteta).
- **Või koodi kaudu:** `git checkout <eelmine-commit-või-tag>` → `npm run build` → `npx wrangler deploy`.

## Kokkuvõte

- **Sisu:** Live = sama Next.js kui local (DNS ja Worker juba Cloudflare’is). Deploy’ga lisad livesse soomekeelse versiooni; eesti sisu jääb samaks.
- **Rollback:** Cloudflare’is "Rollback to previous deployment" või deploy eelmise buildi uuesti.
