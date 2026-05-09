# Design System — Merivedenkorkeus (React)

## Teema: Merellinen minimalismi

Sovellus on suunniteltu rannikkoasukkaille ja veneilijöille.
Visuaalinen identiteetti heijastelee merta: syvä sininen, turkoosi vaahto, rauhallinen mutta informatiivinen.

---

## Väripaletti

### Tumma teema (oletus)

| Token | Hex | Käyttö |
|-------|-----|--------|
| `--bg-primary` | `#0a1628` | Sivun tausta |
| `--bg-card` | `#132238` | Korttien tausta |
| `--bg-card-hover` | `#1a2d4a` | Korttien hover |
| `--accent` | `#4fd1c5` | Pääväri, linkit, aktiiviset elementit |
| `--accent-hover` | `#38b2ac` | Hover-tila |
| `--text-primary` | `#f0f4f8` | Pääsisältö |
| `--text-secondary` | `#94a3b8` | Toissijainen teksti |
| `--text-muted` | `#64748b` | Hiljennetty teksti |
| `--border` | `#1e3a5f` | Reunaviivat |
| `--danger` | `#ef4444` | Virhe, korkea merenpinta |
| `--warning` | `#f59e0b` | Varoitus, kohonnut merenpinta |
| `--success` | `#22c55e` | OK, normaali merenpinta |
| `--info` | `#3b82f6` | Matala merenpinta |

### Vaalea teema

| Token | Hex | Käyttö |
|-------|-----|--------|
| `--bg-primary` | `#f0f7ff` | Sivun tausta |
| `--bg-card` | `#ffffff` | Korttien tausta |
| `--bg-card-hover` | `#f1f5f9` | Korttien hover |
| `--accent` | `#0e7490` | Pääväri |
| `--accent-hover` | `#0c5f75` | Hover-tila |
| `--text-primary` | `#0f172a` | Pääsisältö |
| `--text-secondary` | `#475569` | Toissijainen teksti |
| `--text-muted` | `#94a3b8` | Hiljennetty teksti |
| `--border` | `#cbd5e1` | Reunaviivat |

---

## Keskiveden värikoodaus

| Tila | Keskivesi (cm) | Väri | Teksti |
|------|---------------|------|--------|
| Matala | < -20 | `#3b82f6` (sininen) | "Matala" |
| Normaali | -20 … +20 | `#22c55e` (vihreä) | "Normaali" |
| Koholla | +20 … +50 | `#f59e0b` (keltainen) | "Koholla" |
| Korkea | +50 … +80 | `#f97316` (oranssi) | "Korkea" |
| Erittäin korkea | > +80 | `#ef4444` (punainen) | "Erittäin korkea" |

> **Värisokeus:** Jokainen tila esitetään AINA värin + tekstin + numeerisen arvon yhdistelmänä.

---

## Lämpötilan värikoodaus

| Lämpötila | Väri | Sävy |
|-----------|------|------|
| ≤ -20°C | `#1e3a5f` | Tumma sininen |
| -10°C | `#2563eb` | Sininen |
| 0°C | `#3b82f6` | Kirkas sininen |
| +5°C | `#06b6d4` | Syaani |
| +10°C | `#22c55e` | Vihreä |
| +15°C | `#84cc16` | Limen vihreä |
| +20°C | `#eab308` | Keltainen |
| +25°C | `#f97316` | Oranssi |
| ≥ +30°C | `#ef4444` | Punainen |

---

## Typografia

**Fontti:** Inter (Google Fonts)

| Rooli | Koko | Paino | Rivinväli |
|-------|------|-------|-----------|
| Keskivesi (hero) | 48px / 3rem | 700 (Bold) | 1.1 |
| N2000 (toissijainen) | 20px / 1.25rem | 500 (Medium) | 1.2 |
| Otsikko (h1) | 28px / 1.75rem | 700 | 1.2 |
| Alaotsikko (h2) | 22px / 1.375rem | 600 | 1.3 |
| Body (perusteksti) | 18px / 1.125rem | 400 | 1.5 |
| Body large | 20px / 1.25rem | 400 | 1.4 |
| Pieni teksti | 14px / 0.875rem | 400 | 1.4 |
| Tuntirivien data | 20px / 1.25rem | 600 | 1.3 |

> **Minimikoko:** 14px. Ei koskaan pienempi. 60+ käyttäjät.

---

## Tila (Spacing)

Tailwind-asteikko:

| Token | Arvo | Käyttö |
|-------|------|--------|
| `space-1` | 4px | Elementtien sisäinen |
| `space-2` | 8px | Tiivis väli |
| `space-3` | 12px | Perusväli |
| `space-4` | 16px | Korttien padding |
| `space-6` | 24px | Osioiden väli |
| `space-8` | 32px | Suurempi osioväli |
| `space-12` | 48px | Sivun reunat |

---

## Kosketusalueet

| Elementti | Minimikoko |
|-----------|-----------|
| Painike (primary) | 56px × 56px |
| Lista-item (napautettava) | 56px korkeus |
| Ikoni-painike | 48px × 48px |
| Bottom nav -item | 64px × 64px |

---

## Korttien rakenne

```
┌─────────────────────────────────┐
│                                 │  ← padding: 16px
│   [Otsikko]      [Toiminto]    │
│                                 │
│   [Sisältö]                     │
│                                 │
└─────────────────────────────────┘

border-radius: 16px (rounded-2xl)
box-shadow: tumma teema → ei varjoa, vain border
            vaalea teema → 0 1px 3px rgba(0,0,0,0.1)
```

---

## Animaatiot (Framer Motion)

### Kestot

| Tyyppi | Kesto | Easing |
|--------|-------|--------|
| Nopea (hover, toggle) | 150ms | `ease-out` |
| Normaali (kortti, accordion) | 250ms | `[0.4, 0, 0.2, 1]` |
| Siirtymä (sivunvaihto) | 350ms | `[0.4, 0, 0.2, 1]` |
| Korostus (sydän-animaatio) | 400ms | `spring` |

### Siirtymämallit

| Animaatio | Framer Motion |
|-----------|---------------|
| Sivun sisään | `initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}` |
| Sivun ulos | `exit={{ opacity: 0, x: -20 }}` |
| Listan itemit | `staggerChildren: 0.05` |
| Accordion auki | `animate={{ height: 'auto', opacity: 1 }}` |
| Accordion kiinni | `animate={{ height: 0, opacity: 0 }}` |
| Sydän toggle | `scale: [1, 1.3, 1]` + värinvaihto |
| Skeleton pulse | CSS `animate-pulse` |

---

## Ikonit

| Toiminto | Ikoni | Lähde |
|----------|-------|-------|
| Merenpinta | 🌊 aalto SVG | Custom |
| Lämpötila | Lämpömittari | Heroicons |
| Tuuli | Tuuli/ilma | Heroicons |
| Tuulen suunta | Kompassinuoli (rotaatio) | Custom SVG |
| Suosikki | ❤️ Sydän | Heroicons `HeartIcon` |
| Takaisin | Nuoli vasemmalle | Heroicons `ArrowLeftIcon` |
| Haku | Suurennuslasi | Heroicons `MagnifyingGlassIcon` |
| Sijainti | GPS-piste | Heroicons `MapPinIcon` |
| Teeman vaihto | Kuu/aurinko | Heroicons `MoonIcon`/`SunIcon` |
| Virhe | Varoituskolmio | Heroicons `ExclamationTriangleIcon` |

---

## Responsiivisuus

| Breakpoint | Leveys | Layout |
|-----------|--------|--------|
| Mobile | < 640px | Yksi sarake, bottom nav |
| Tablet | 640-1024px | Kaksi saraketta kaupungeille |
| Desktop | > 1024px | Sidebar + pääsisältö, vertailunäkymä |

---

## Saavutettavuus (a11y)

- **Kontrasti:** WCAG AAA (7:1) kaikille teksteille
- **Focus:** Näkyvä focus-ring (`ring-2 ring-accent`)
- **ARIA:** `role`, `aria-label`, `aria-expanded`, `aria-live`
- **Värisokeus:** Aina teksti + ikoni värin rinnalla
- **Fonttikoko:** Min 14px, kriittinen data ≥ 20px
- **Kosketusalue:** Min 48px, navigaatio 56-64px
