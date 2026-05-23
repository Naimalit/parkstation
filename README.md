# Park Station @ Park Chair

Website për kafenen **Park Station** në Parkun e Çairit, Shkup.

## Funksionalitete

- 3 gjuhë: Shqip, Maqedonisht, Anglisht
- Menu digjitale me çmime (e vogël / e madhe)
- QR codes për 10 tavolina (menu + rezervim)
- Rezervim tavoline (1–2 ditë para, konfirmim nga stafi)
- Rezervim lokali për evente (deri 40 persona)
- Panel admin për menu, rezervime, tavolina & QR print

## Fillimi i shpejtë

```bash
npm install
npm run dev
```

Hapni [http://localhost:3000](http://localhost:3000)

## Admin Panel

- **Live URL:** https://parkstation.vercel.app/admin
- **Lokal:** http://localhost:3000/admin
- **Fjalëkalimi default:** `parkstation2026`
- Ndryshoni me `ADMIN_PASSWORD` në Vercel Environment Variables

## QR Codes

1. Hyni në Admin Panel → QR Codes
2. Klikoni **Hap & Printo QR Codes**
3. Printoni dhe vendosni në çdo tavolinë

## Deploy automatik

Çdo ndryshim shkon automatikisht në **GitHub** dhe **Vercel**:

1. **Vercel ↔ GitHub** — i lidhur. Çdo `git push` aktivizon deploy automatik në https://parkstation.vercel.app
2. **Script i shpejtë** — pas ndryshimeve, ekzekutoni:

```bash
npm run deploy
```

Ose me mesazh custom:

```powershell
.\deploy.ps1 "Pershkrimi i ndryshimit"
```

## Deploy manual (Vercel CLI)

1. Push në GitHub
2. Import projektin në [vercel.com](https://vercel.com)
3. Shtoni environment variables:
   - `ADMIN_PASSWORD` — fjalëkalimi i adminit
   - `NEXT_PUBLIC_SITE_URL` — URL e website-it (p.sh. `https://parkstation.vercel.app`)

> **Shënim:** Rezervimet dhe ndryshimet e menusë ruhen në `data/store.json`. Për production në Vercel, rekomandohet të shtoni një databazë (Vercel Postgres / Supabase) ose të kontrolloni panelin admin rregullisht. Fillimisht, menu dhe tavolinat funksionojnë nga skedari i commit-uar.

## Fotot

Vendosni fotot tuaja në `public/images/`:
- `hero.jpg` — foto kryesore (banner)
- `about.jpg` — foto për "Rreth Nesh"

## Telefon

071-206-221
