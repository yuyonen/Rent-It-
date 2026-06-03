# Rent It! - Asennus- ja kehitysopas

## Edellytykset

- Node.js (v18+)
- PostgreSQL
- npm tai yarn

## Asennusvaiheet

### 1. Klooni repositorio
```bash
git clone https://github.com/yuyonen/Rent-It-.git
cd Rent-It-
```

### 2. Asenna riippuvuudet
```bash
npm install
npm install --prefix server
npm install --prefix client
```

### 3. Konfiguroi PostgreSQL-tietokanta

Luo uusi tietokanta:
```bash
createdb rent_it
```

Käytä `server/src/db/init.sql` -tiedostoa taulukkojen luomiseen:
```bash
psql rent_it < server/src/db/init.sql
```

### 4. Aseta ympäristömuuttujat

Kopioi `server/.env.example` tiedostoksi `server/.env`:
```bash
cp server/.env.example server/.env
```

Muokkaa `.env` tiedostoa ja aseta:
- `DATABASE_URL`: PostgreSQL-yhteysmerkkijono
- `JWT_SECRET`: Salaisuussarja (satunnainen merkkijono)
- `PORT`: Palvelimen portti (oletuksena 5000)

### 5. Käynnistä kehityspalvelin

**Molempien komentojen ajaminen rinnakkain:**
```bash
npm run dev
```

Tai erillään:

**Backend** (portti 5000):
```bash
npm run dev --prefix server
```

**Frontend** (portti 3000):
```bash
npm run dev --prefix client
```

### 6. Avaa selaimessa
```
http://localhost:3000
```

## Projektirakenteen kuvaus

```
Rent-It-/
├── server/                 # Express backend
│   ├── src/
│   │   ├── server.ts      # Pääpalvelin
│   │   └── db/
│   │       └── init.sql   # Tietokantarakenne
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── client/                # React frontend
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── components/
│   │   │   └── Header.tsx
│   │   └── pages/
│   │       ├── HomePage.tsx
│   │       ├── ServicesPage.tsx
│   │       └── ProfilePage.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
└── package.json           # Juurikonfiguraatio
```

## Seuraavat vaiheet

- [ ] Toteutus autentikaatiojärjestelmä (rekisteröityminen, kirjautuminen)
- [ ] API-päätepisteiden luominen
- [ ] Palvelun hallintajärjestelmä
- [ ] Viestintäjärjestelmä
- [ ] Arvostelujen toiminnot
- [ ] Maksuintegratio

## Kehitystyökalut

- **TypeScript**: Tyyppiturvallinen JavaScript
- **Vite**: Nopea kehitysympäristö
- **Tailwind CSS**: Hyötyluokkainen CSS
- **Express**: Node.js web-kehys
- **PostgreSQL**: Relaatiotietokanta

## Apua ja tuki

Ongelmat? Tarkista:
1. PostgreSQL on käynnissä
2. `.env` tiedosto on oikein konfiguroitu
3. Kaikki riippuvuudet asennettu (`npm install`)
4. Portit 3000 ja 5000 ovat vapaita