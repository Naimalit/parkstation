# PARK STATION — Specifikim Website

> Dokument planifikimi për zhvillimin e website-it të kafenesë **Park Station** në Parkun e Çairit, Shkup.
> Stack i synuar: **Next.js / React**, **Vercel**, **GitHub**, panel admin për menaxhim.

---

## 1. Përmbledhje

| Fushë | Vlerë |
|-------|-------|
| **Emri** | Park Station @ Park Chair |
| **Emri i shkurtër / logo** | PARK STATION |
| **Lokacioni** | Parku i Çairit, Shkup / Çair |
| **Orari** | 10:00 – 00:00 (çdo ditë) |
| **Monedha** | Denar (MKD) |
| **Gjuhët** | Shqip · Maqedonisht · Anglisht |
| **Telefon** | [071-206-221](tel:+38971206221) |
| **Email** | — (nuk ka) |
| **Instagram** | https://www.instagram.com/park.station/ |
| **TikTok** | https://www.tiktok.com/@park.station1 |
| **Google Maps** | [Park Chair / Park Station](https://www.google.com/maps/place/Park+Chair/@42.0154025,21.4456556,54m/data=!3m1!1e3!4m15!1m8!3m7!1s0x1354150882993bd1:0x7a6ab49bd50895c9!2s%C4%8Cair,+1000+Skopje!3b1!8m2!3d42.0140337!4d21.4457688!16s%2Fg%2F121pkvxh!3m5!1s0x1354150dd7000001:0x47f9b3b0cb6f95a6!8m2!3d42.0153679!4d21.4456612!16s%2Fg%2F11zj0pj7j4!5m1!1e4?entry=ttu) |
| **Parking** | Po, pranë lokacionit |
| **WiFi** | Jo (mos shfaqet në website) |
| **Domain** | Ende pa blerë — deploy fillestar në Vercel subdomain |

---

## 2. Identiteti vizual

### 2.1 Stili
- **Tema:** Natyror / park — i gjelbër, i freskët, relaksues
- **Ndjenja:** Kafe në natyrë, familjare, e hapur, verore
- **Paleta:** Ngjyra **ylberi** (rainbow) si theks/accent mbi bazë natyrale (gjelbër, kafe e lehtë, e bardhë, druri)

### 2.2 Logo
- **Status:** Duhet krijuar
- **Udhëzime:**
  - Emri: **PARK STATION**
  - Stil: i thjeshtë, i lexueshëm, i përshtatshëm për QR print dhe favicon
  - Ngjyra: elemente ylberi + ton natyror (gjelbër)
  - Formate të nevojshme: SVG, PNG (512×512), favicon.ico

### 2.3 Fotografi
- Klienti do t'i vendosë vetë fotot në `/public/images/`
- Përdorim: hero banner, seksioni “Rreth nesh”, background i lehtë (optional)
- **Galeri:** Jo — nuk duhet seksion galerie i veçantë

---

## 3. Përmbajtja e faqeve

### 3.1 Faqet kryesore

| Faqe | Përshkrim |
|------|-----------|
| **Kryefaqja (Home)** | Hero, orar, CTA për menu & rezervim, lidhje sociale |
| **Menu** | Meny digjitale me kategori, çmime në denar |
| **Rezervo Tavolinë** | Formular rezervimi tavoline |
| **Rezervo Lokalin** | Formular privatizimi / event i plotë |
| **Rreth Nesh** | Histori e shkurtër, ambienti në park |
| **Kontakt** | Telefon, harta, Instagram, TikTok, orar |

### 3.2 Tekst “Rreth Nesh” (draft — mund të ndryshohet)

> **Shqip:** Park Station @ Park Chair është kafeja juaj në zemër të Parkut të Çairit — një vend për t'u freskuar midis natyrës, për familje, miq dhe takime. Nga kafeja turke dhe ice coffee deri te slushie dhe mini pancakes, gati për t'ju shërbyer çdo ditë nga ora 10:00 deri në mesnatë.

> **Maqedonisht:** Park Station @ Park Chair е вашата кафе во срцето на Чаирскиот Парк — место за освежување меѓу природата, за семејства, пријатели и состаноци. Од турско кафе и ice coffee до slushie и mini pancakes, секој ден од 10:00 до полноќ.

> **Anglisht:** Park Station @ Park Chair is your café in the heart of Cair Park — a place to refresh among nature, for families, friends, and gatherings. From Turkish coffee and iced coffee to slushies and mini pancakes, we're here every day from 10:00 AM to midnight.

---

## 4. Menu

> Menyja mund të ndryshojë herë pas here — **duhet panel admin** për përditësim.

### 4.1 DRINKS & MORE

| Produkti | Çmimi (MKD) | Shënime |
|----------|-------------|---------|
| Ice Coffee | 100 | |
| Kafe Turke | 50 | |
| Çaj | 50 | |
| Cocktails | 150 | |

**Pijet për cocktail** (pa çmim të veçantë — përfshihen në cocktail ose si mixer):
- Ujë
- Coca Cola
- Golden Eagle
- Sprite
- Fanta
- Schweppes

### 4.2 TREATS & EATS

| Produkti | Çmimi (MKD) | Shënime |
|----------|-------------|---------|
| Slushie | 50 / 80 | E vogël / E madhe |
| Limonadë | 30 / 50 | E vogël / E madhe |
| Fruta mali | 30 / 50 | E vogël / E madhe |
| Akullore | 50 / 60 | E vogël / E madhe |
| Mini pancakes | 70 / 200 | E vogël / E madhe |

### 4.3 Struktura në website
- Kategori me tabs ose seksione
- Çmimet shfaqen qartë me simbol **ден.** ose **MKD**
- Produktet me dy çmime shfaqin etiketat **E vogël** / **E madhe** (sq · mk · en)
- Përkthim emrash produktesh në 3 gjuhë (shqip origjinal, maqedonisht, anglisht)

---

## 5. QR Code

### 5.1 Qëllimi
Çdo tavolinë ka QR unik që çon te:
1. **Menu** (e filtruar opsionalisht)
2. **Rezervim** i asaj tavoline (me ID të paracaktuar)

### 5.2 Specifikimet

| Element | Detaj |
|---------|-------|
| **Numri tavolinave** | ~10 |
| **Kapaciteti** | Tavolina të lloj-llojshme (2, 4, 6 persona) — mund të kombinohen sipas nevojës |
| **URL format** | `https://[domain]/t/[table-id]` ose `?table=5` |
| **Printim** | Duhet gjeneruar **PDF i printueshëm** për çdo tavolinë |
| **Dizajni QR** | Logo Park Station + numri i tavolinës + “Skanoni për menu & rezervim” (3 gjuhë) |

### 5.3 Tavolinat

- ~10 tavolina me kapacitete të ndryshme (2, 4, 6 persona)
- Shpërndarja e saktë nuk është fikse — tavolinat mund të **kombinohen** për grupe më të mëdha
- Kapaciteti i secilës tavolinë konfigurohet nga **admin panel** (pa nevojë për listë fikse fillimisht)
- QR codes gjenerohen për Tavolinën 1 deri në Tavolinën 10

| ID | QR URL |
|----|--------|
| 1–10 | `/t/1` … `/t/10` |

### 5.4 Funksionaliteti kur skanohet QR
- Hap faqen e menusë **ose** landing të shpejtë me 2 butona: “Shiko Menynë” / “Rezervo këtë Tavolinë”
- Formulari i rezervimit mbush automatikisht **numrin e tavolinës**
- Gjuhë: respekton preferencën e përdoruesit (localStorage) ose zgjedhje manuale

---

## 6. Rezervimi i tavolinave

### 6.1 Rregullat

| Rregull | Vlerë |
|---------|-------|
| **Anticipation** | 1–2 ditë përpara |
| **Orari rezervimit** | Vetëm gjatë orarit të punës (10:00–00:00) |
| **Kohëzgjatja** | Pa limit |
| **Konfirmimi** | **Manual nga stafi** (telefon) |
| **Anulimi** | Me telefon: 071-206-221 |
| **Pagesa online** | Jo |

### 6.2 Fushat e formularit

| Fushë | Obligative | Validim |
|-------|------------|---------|
| Emri | Po | min 2 karaktere |
| Telefoni | Po | format MK (+389...) |
| Email | Po | format email |
| Numri i personave | Po | 1–6 për tavolinë të vetme; stafi konfirmon kombinime tavolinash nëse nevojitet |
| Data | Po | min 1 ditë, max 2 ditë përpara |
| Ora | Po | brenda orarit 10:00–00:00 |
| Tavolina | Po (auto nga QR) | dropdown nëse pa QR |
| Shënime | Jo | tekst i lirë |

### 6.3 Pas dërgimit
1. Mesazh suksesi: *“Kërkesa u dërgua. Do t'ju telefonojmë për konfirmim.”*
2. Ruajtje në databazë (status: `pending`)
3. **Njoftim stafit:** thirrje telefonike manuale (stafi kontrollon panelin admin)
4. Stafi ndryshon statusin: `pending` → `confirmed` / `cancelled`

---

## 7. Rezervimi / privatizimi i lokacionit të plotë

### 7.1 Përdorimi
- Ditëlindje
- Takime
- Takime pune

### 7.2 Detaje

| Element | Vlerë |
|---------|-------|
| **Kapaciteti maksimal** | **40 persona** |
| **Paketa** | Jo |
| **Çmimi** | Bisedohet me telefon pas kërkesës |
| **Pagesa online** | Jo |

### 7.3 Fushat e formularit

| Fushë | Obligative |
|-------|------------|
| Emri | Po |
| Telefoni | Po |
| Email | Po |
| Data | Po |
| Ora | Po |
| Numri i të ftuarve | Po (max 40) |
| Lloji i eventit | Po (dropdown: ditëlindje / takim / takim pune / tjetër) |
| Shënime | Jo |

### 7.4 Pas dërgimit
- Mesazh: *“Faleminderit! Do t'ju kontaktojmë telefonikisht për detajet dhe çmimin.”*
- Ruajtje në admin panel me status `pending`

---

## 8. Vendime të konfirmuara

| Pyetje | Përgjigje |
|--------|-----------|
| Çmimet dyfishe | **E vogël / E madhe** |
| Tavolinat | ~10, kapacitete të ndryshme, **mund të kombinohen** |
| Vlerësime | **Jo** — nuk përfshihet në website |
| Admin auth | **1 fjalëkalim** i përbashkët për stafin |
| Fotot | Klienti i vendos në `public/images/` |
| Kapaciteti eventesh | **Maksimum 40 persona** |
| Emri zyrtar | **Park Station @ Park Chair** |

---

## 9. Arkitektura teknike

### 9.1 Stack

```
Frontend:     Next.js 14+ (App Router), React, TypeScript
Styling:      Tailwind CSS
i18n:         next-intl ose JSON locale files (sq, mk, en)
Database:     Supabase / Vercel Postgres / SQLite (TBD)
Auth (admin): 1 fjalëkalim i përbashkët (env: ADMIN_PASSWORD)
Deploy:       Vercel (CI/CD nga GitHub)
QR PDF:       qrcode library + jsPDF ose react-pdf
```

### 9.2 Struktura e projektit (e synuar)

```
parkstation/
├── public/
│   ├── images/          # fotot e klientit
│   ├── logo/            # logo SVG/PNG
│   └── qr/              # QR PDF të gjeneruara
├── src/
│   app/
│   │   ├── [locale]/    # sq | mk | en
│   │   │   ├── page.tsx           # Home
│   │   │   ├── menu/
│   │   │   ├── rezervo-tavoline/
│   │   │   ├── rezervo-lokalin/
│   │   │   ├── rreth-nesh/
│   │   │   ├── kontakt/
│   │   │   └── t/[id]/            # QR landing per tavolinë
│   │   └── admin/
│   │       ├── menu/              # CRUD menu
│   │       ├── rezervime/         # tavolina + lokale
│   │       └── qr/                # gjenero & shkarko PDF
│   ├── components/
│   ├── lib/
│   └── locales/
│       ├── sq.json
│       ├── mk.json
│       └── en.json
├── WEBSITE_SPEC.md      # ky dokument
└── README.md
```

### 9.3 Panel Admin — funksionalitete

| Modul | Veprimet |
|-------|----------|
| **Menu** | Shto / ndrysho / fshi kategori & produkte & çmime (vogël/madhe) |
| **Tavolinat** | Konfiguro kapacitetin (2/4/6) për çdo tavolinë |
| **Rezervime tavolinash** | Shiko, konfirmo, anulo, filtro sipas datës |
| **Rezervime lokale** | Shiko, konfirmo, anulo |
| **QR Codes** | Gjenero QR për çdo tavolinë, shkarko PDF printues |

**Autentifikimi:** Hyrje me 1 fjalëkalim të përbashkët (pa llogari të shumta).

### 9.4 Modeli i të dhënave (skicë)

**Table (tavolinat)**
```ts
{ id, number, capacity: 2|4|6, active: boolean }
```

**MenuCategory**
```ts
{ id, name_sq, name_mk, name_en, sort_order }
```

**MenuItem**
```ts
{ id, category_id, name_sq, name_mk, name_en, price, price_large?, size_label?: 'small_large', active }
```

**TableReservation**
```ts
{ id, table_id, name, phone, email, guests, date, time, notes?, status: pending|confirmed|cancelled, created_at }
```

**VenueReservation**
```ts
{ id, name, phone, email, date, time, guests, event_type, notes?, status, created_at }
```

---

## 10. UX & dizajn — udhëzime

### 10.1 Mobile-first
- Shumica e klientëve vijnë nga **QR në telefon** — menu dhe rezervimi duhet perfekt në mobile

### 10.2 Navigimi
- Header sticky: Logo | Menu | Rezervo | Rreth Nesh | Kontakt | 🌐 Gjuha
- Footer: telefon, Instagram, TikTok, orar, harta

### 10.3 Ngjyrat (draft CSS variables)
```css
--color-green-dark:   #2D5016;   /* natyrë */
--color-green-light:  #7CB342;
--color-cream:        #F5F0E8;   /* background */
--color-rainbow:      linear-gradient(90deg, #E53935, #FB8C00, #FDD835, #43A047, #1E88E5, #8E24AA);
```

### 10.4 CTA kryesore
- “Shiko Menynë”
- “Rezervo Tavolinë”
- “Rezervo Lokalin për Event”
- “Na telefononi: 071-206-221”

---

## 11. SEO & meta

| Fushë | Vlerë |
|-------|-------|
| **Title** | Park Station @ Park Chair — Kafe në Parkun e Çairit, Shkup |
| **Description** | Kafe, pije dhe ëmbëlsira në natyrë. Menu digjitale, rezervim tavolinash dhe evente deri 40 persona. Hapur 10:00–00:00. |
| **Keywords** | park station, park chair, kafe çair, kafe shkup, park çair, rezervim tavoline |
| **Open Graph** | logo + foto hero |

---

## 12. Çfarë NUK duhet (out of scope)

- ❌ Porosi online / pagesa online
- ❌ Newsletter
- ❌ Galeri foto e veçantë
- ❌ WiFi info
- ❌ Evente / lajme / blog
- ❌ Vlerësime / reviews
- ❌ Email notifications (vetëm telefon)

---

## 13. Deploy & domain

1. **Faza 1:** GitHub repo → Vercel auto-deploy (`parkstation.vercel.app`)
2. **Faza 2:** Blerje domain → lidhje me Vercel
3. **Env variables:** DATABASE_URL, ADMIN_PASSWORD / AUTH_SECRET

---

## 14. Checklist para launch

- [ ] Logo & favicon
- [ ] Fotot e klientit në `public/images/`
- [ ] Menu e verifikuar (e vogël / e madhe)
- [ ] Tavolinat e konfiguruara në admin (1–10, kapacitet 2/4/6)
- [ ] QR PDF të printuara për 10 tavolina
- [ ] 3 gjuhët e plota (sq, mk, en)
- [ ] Formularët testuar (mobile)
- [ ] Admin panel funksional
- [ ] Google Maps embed funksionon
- [ ] Link Instagram & TikTok
- [ ] Telefon klikues (`tel:` link)

---

## 15. Hapat e ardhshëm

1. ~~Konfirmimi i detajeve~~ ✅
2. Klienti vendos fotot në `public/images/`
3. Zhvillimi i website-it sipas këtij specifikimi
4. Review & ndryshime
5. Deploy në Vercel
6. Printim QR codes për 10 tavolina
7. (Opsional) Blerje domain

---

*Dokumenti përditësuar: Maj 2026 · Park Station @ Park Chair · Parku i Çairit, Shkup*
