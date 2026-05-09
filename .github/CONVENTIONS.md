# Koodauskonventiot — SeaLevelAltitudeApp (React)

## Kieli ja ympäristö

- **TypeScript** strict-moodissa (`"strict": true`)
- **React 19** funktionaalisin komponentein (ei class-komponentteja)
- **Vite** build-työkalu

## Nimeämiskonventiot

### Tiedostot

| Tyyppi | Konventio | Esimerkki |
|--------|-----------|-----------|
| React-komponentti | PascalCase | `CityCard.tsx` |
| Hook | camelCase, `use`-alkuinen | `useLocalStorage.ts` |
| Redux slice | camelCase + `Slice` | `sealevelSlice.ts` |
| Redux actions | camelCase + `Actions` | `sealevelActions.ts` |
| Tyypitiedosto | camelCase | `types.ts`, `apiData.ts` |
| Apufunktiot | camelCase | `formatting.ts` |
| Vakiot | camelCase | `constants.ts` |
| Konvertterit | camelCase + `Converters` | `sealevelConverters.ts` |

### Muuttujat ja funktiot

- **camelCase**: `sealevelData`, `getFinnishWeekday()`
- **PascalCase**: React-komponentit, tyypit, interfacet
- **SCREAMING_SNAKE_CASE**: Globaalit vakiot (`API_BASE_URL`)
- **Prefix `get`**: Factory/haku-funktiot (`getSeaLevelStatus`)
- **Prefix `use`**: React hookit (`useAutoRefresh`)
- **Prefix `is`/`has`**: Boolean-palautus (`isDataLoading`)
- **Prefix `convert`**: Muunnos-funktiot (`convertToSealevelData`)
- **Prefix `handle`**: Event handlerit (`handleCitySelect`)

### Tyypit

- **Interfacet** API-datalle ja state-rakenteille
- **Type aliakset** union-tyypeille ja apuille
- Suffix `State` Redux-tiloille (`SealevelState`)
- Suffix `Data` datarakenteille (`SeaLevelDataByWeekday`)
- Suffix `Props` komponentti-propseille (`CityCardProps`)

## Koodityyli

- **Sisennys**: 2 välilyöntiä
- **Lainausmerkit**: Yksinkertaiset (`'merkkijono'`)
- **Puolipisteet**: Kyllä, joka lauseen lopussa
- **Trailing comma**: Kyllä
- **Nuolifunktiot**: Suosittu kaikkialla
- **Explicit return types**: React-komponenteilla `React.FC` tai palautustyyppi
- **Rivien max pituus**: ~100 merkkiä (joustava)

## Import-järjestys

1. React ja kolmannen osapuolen kirjastot
2. Store/Redux
3. Hooks
4. Komponentit
5. Tyypit
6. Apufunktiot ja vakiot
7. Tyylit

```tsx
// 1. Kolmannen osapuolen
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// 2. Store
import { useAppDispatch, useAppSelector } from '../store/hooks';

// 3. Hooks
import { useLocalStorage } from '../hooks/useLocalStorage';

// 4. Komponentit
import { CityCard } from '../components/city/CityCard';

// 5. Tyypit
import type { CityData } from '../types/types';

// 6. Apufunktiot
import { getFinnishWeekday } from '../utils/formatting';
```

## Komponenttirakenne

```tsx
// 1. Importit (järjestyksessä yllä)
// 2. Tyyppimäärittelyt (Props)
// 3. Komponentti
// 4. Vienti

interface CityCardProps {
  city: CityData;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const CityCard: React.FC<CityCardProps> = ({ city, isFavorite, onToggleFavorite }) => {
  // Hookit ensin
  const dispatch = useAppDispatch();

  // Event handlerit
  const handleClick = () => { ... };

  // Renderöinti
  return ( ... );
};
```

## Redux-konventiot

- `createSlice` Redux Toolkitin kanssa
- `createAsyncThunk` API-kutsuille
- Nimetyt exportit sliceistä
- Storen tyypit: `RootState`, `AppDispatch`
- Hookit: `useAppSelector`, `useAppDispatch`

## Virheenkäsittely

- API-kutsuissa: try/catch async thunkeissä
- UI:ssa: Loading/Error/Success -tilat joka datanäkymässä
- Osittainen data: Näytä mitä saatiin, ilmoita puuttuvasta
- Console.error virheille kehityksessä

## Kommentit

- Suomeksi (käyttäjäkunta suomalainen)
- JSDoc funktioille jotka eivät ole itsestäänselviä
- Ei turhia kommentteja ilmeiselle koodille

## Saavutettavuus

- ARIA-attribuutit interaktiivisille elementeille
- Riittävä kontrasti (WCAG AAA 7:1)
- Värisokeusfallbackit (teksti + ikoni värin lisäksi)
- Focus-hallinta näkymien vaihtuessa
