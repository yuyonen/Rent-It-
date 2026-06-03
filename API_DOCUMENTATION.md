# Rent It! - API Dokumentaatio

## 📋 Sisällysluettelo
- [Autentikaatio](#autentikaatio)
- [Palvelut](#palvelut)
- [Viestit](#viestit)
- [Arvostelut](#arvostelut)
- [Käyttäjät](#käyttäjät)
- [Virheenhallinta](#virheenhallinta)

---

## 🔐 Autentikaatio

### Rekisteröityminen
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "käyttäjänimi",
  "email": "user@example.com",
  "password": "salasana123",
  "firstName": "Joni",
  "lastName": "Mäki"
}
```

**Vastaus (201 Created):**
```json
{
  "message": "User created successfully",
  "user": {
    "id": 1,
    "username": "käyttäjänimi",
    "email": "user@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Kirjautuminen
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "salasana123"
}
```

**Vastaus (200 OK):**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "käyttäjänimi",
    "email": "user@example.com",
    "firstName": "Joni",
    "lastName": "Mäki"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Token käyttö:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📦 Palvelut

### Hae kaikki palvelut
```http
GET /api/services
GET /api/services?search=ruohonleikkaus
GET /api/services?category=puutarha
GET /api/services?search=ruohonleikkaus&category=puutarha
```

**Vastaus (200 OK):**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "title": "Ruohonleikkaus",
    "description": "Ammattimainen ruohonleikkauspalvelu",
    "category": "Puutarha",
    "price_per_hour": 50.00,
    "image_url": null,
    "is_available": true,
    "username": "käyttäjänimi",
    "rating": 4.8,
    "created_at": "2026-06-03T10:00:00Z",
    "updated_at": "2026-06-03T10:00:00Z"
  }
]
```

---

### Hae yksittäinen palvelu
```http
GET /api/services/1
```

**Vastaus (200 OK):**
```json
{
  "id": 1,
  "user_id": 1,
  "title": "Ruohonleikkaus",
  "description": "Ammattimainen ruohonleikkauspalvelu",
  "category": "Puutarha",
  "price_per_hour": 50.00,
  "image_url": null,
  "is_available": true,
  "username": "käyttäjänimi",
  "rating": 4.8,
  "created_at": "2026-06-03T10:00:00Z",
  "updated_at": "2026-06-03T10:00:00Z"
}
```

---

### Luo uusi palvelu
```http
POST /api/services
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "title": "Ruohonleikkaus",
  "description": "Tarjoan ammattimaista ruohonleikkauspalvelua pihallesi",
  "category": "Puutarha",
  "pricePerHour": 50.00,
  "imageUrl": "https://example.com/image.jpg"
}
```

**Vastaus (201 Created):**
```json
{
  "message": "Service created successfully",
  "service": {
    "id": 1,
    "user_id": 1,
    "title": "Ruohonleikkaus",
    "description": "Tarjoan ammattimaista ruohonleikkauspalvelua pihallesi",
    "category": "Puutarha",
    "price_per_hour": 50.00,
    "image_url": "https://example.com/image.jpg",
    "is_available": true,
    "created_at": "2026-06-03T10:00:00Z",
    "updated_at": "2026-06-03T10:00:00Z"
  }
}
```

---

### Päivitä palvelu
```http
PUT /api/services/1
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "title": "Premium Ruohonleikkaus",
  "description": "Tarjoan ammattimaista ruohonleikkauspalvelua pihallesi",
  "category": "Puutarha",
  "pricePerHour": 60.00,
  "imageUrl": "https://example.com/image.jpg",
  "isAvailable": true
}
```

**Vastaus (200 OK):**
```json
{
  "message": "Service updated successfully",
  "service": {
    "id": 1,
    "user_id": 1,
    "title": "Premium Ruohonleikkaus",
    "description": "Tarjoan ammattimaista ruohonleikkauspalvelua pihallesi",
    "category": "Puutarha",
    "price_per_hour": 60.00,
    "image_url": "https://example.com/image.jpg",
    "is_available": true,
    "created_at": "2026-06-03T10:00:00Z",
    "updated_at": "2026-06-03T10:00:00Z"
  }
}
```

---

### Poista palvelu
```http
DELETE /api/services/1
Authorization: Bearer TOKEN
```

**Vastaus (200 OK):**
```json
{
  "message": "Service deleted successfully"
}
```

---

### Hae käyttäjän palvelut
```http
GET /api/services/user/1
```

**Vastaus (200 OK):**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "title": "Ruohonleikkaus",
    "description": "Ammattimainen ruohonleikkauspalvelu",
    "category": "Puutarha",
    "price_per_hour": 50.00,
    "is_available": true,
    "created_at": "2026-06-03T10:00:00Z",
    "updated_at": "2026-06-03T10:00:00Z"
  }
]
```

---

## 💬 Viestit

### Hae kaikki viestit
```http
GET /api/messages
Authorization: Bearer TOKEN
```

**Vastaus (200 OK):**
```json
[
  {
    "id": 1,
    "sender_id": 2,
    "receiver_id": 1,
    "service_id": 1,
    "content": "Oletko kiinnostunut palvelustani?",
    "is_read": false,
    "sender_username": "muu_käyttäjä",
    "service_title": "Ruohonleikkaus",
    "created_at": "2026-06-03T10:00:00Z"
  }
]
```

---

### Hae keskustelu käyttäjän kanssa
```http
GET /api/messages/conversation/2
Authorization: Bearer TOKEN
```

**Vastaus (200 OK):**
```json
[
  {
    "id": 1,
    "sender_id": 2,
    "receiver_id": 1,
    "service_id": 1,
    "content": "Kiinnostunut palvelusta?",
    "is_read": false,
    "created_at": "2026-06-03T10:00:00Z"
  },
  {
    "id": 2,
    "sender_id": 1,
    "receiver_id": 2,
    "service_id": 1,
    "content": "Kyllä, kuinka pian voisit tulla?",
    "is_read": true,
    "created_at": "2026-06-03T10:05:00Z"
  }
]
```

---

### Lähetä viesti
```http
POST /api/messages
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "receiverId": 2,
  "content": "Kiinnostunut palvelusta?",
  "serviceId": 1
}
```

**Vastaus (201 Created):**
```json
{
  "message": "Message sent successfully",
  "data": {
    "id": 1,
    "sender_id": 1,
    "receiver_id": 2,
    "service_id": 1,
    "content": "Kiinnostunut palvelusta?",
    "is_read": false,
    "created_at": "2026-06-03T10:00:00Z"
  }
}
```

---

### Merkitse viesti luetuksi
```http
PATCH /api/messages/1/read
Authorization: Bearer TOKEN
```

**Vastaus (200 OK):**
```json
{
  "message": "Message marked as read",
  "data": {
    "id": 1,
    "sender_id": 2,
    "receiver_id": 1,
    "service_id": 1,
    "content": "Kiinnostunut palvelusta?",
    "is_read": true,
    "created_at": "2026-06-03T10:00:00Z"
  }
}
```

---

## ⭐ Arvostelut

### Hae käyttäjän arvostelut
```http
GET /api/reviews/user/1
```

**Vastaus (200 OK):**
```json
[
  {
    "id": 1,
    "reviewer_id": 2,
    "reviewee_id": 1,
    "service_id": 1,
    "rating": 5,
    "comment": "Loistavaa palvelua! Erittäin ammattimainen.",
    "reviewer_username": "muu_käyttäjä",
    "service_title": "Ruohonleikkaus",
    "created_at": "2026-06-03T10:00:00Z"
  }
]
```

---

### Hae palvelun arvostelut
```http
GET /api/reviews/service/1
```

**Vastaus (200 OK):**
```json
[
  {
    "id": 1,
    "reviewer_id": 2,
    "reviewee_id": 1,
    "service_id": 1,
    "rating": 5,
    "comment": "Loistavaa palvelua! Erittäin ammattimainen.",
    "reviewer_username": "muu_käyttäjä",
    "created_at": "2026-06-03T10:00:00Z"
  }
]
```

---

### Jätä arvostelu
```http
POST /api/reviews
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "revieweeId": 1,
  "rating": 5,
  "comment": "Loistavaa palvelua! Erittäin ammattimainen.",
  "serviceId": 1
}
```

**Vastaus (201 Created):**
```json
{
  "message": "Review created successfully",
  "review": {
    "id": 1,
    "reviewer_id": 2,
    "reviewee_id": 1,
    "service_id": 1,
    "rating": 5,
    "comment": "Loistavaa palvelua! Erittäin ammattimainen.",
    "created_at": "2026-06-03T10:00:00Z"
  }
}
```

---

## 👤 Käyttäjät

### Hae käyttäjän profiili
```http
GET /api/users/1
```

**Vastaus (200 OK):**
```json
{
  "id": 1,
  "username": "käyttäjänimi",
  "email": "user@example.com",
  "first_name": "Joni",
  "last_name": "Mäki",
  "profile_picture_url": null,
  "bio": "Palveluiden tarjoaja",
  "rating": 4.8,
  "created_at": "2026-06-03T10:00:00Z"
}
```

---

### Hae oma profiili
```http
GET /api/users
Authorization: Bearer TOKEN
```

**Vastaus (200 OK):**
```json
{
  "id": 1,
  "username": "käyttäjänimi",
  "email": "user@example.com",
  "first_name": "Joni",
  "last_name": "Mäki",
  "profile_picture_url": null,
  "bio": "Palveluiden tarjoaja",
  "rating": 4.8,
  "created_at": "2026-06-03T10:00:00Z"
}
```

---

### Päivitä profiili
```http
PUT /api/users/1
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "firstName": "Joni",
  "lastName": "Mäki",
  "bio": "Palveluiden ammattilainen",
  "profilePictureUrl": "https://example.com/profile.jpg"
}
```

**Vastaus (200 OK):**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": 1,
    "username": "käyttäjänimi",
    "email": "user@example.com",
    "first_name": "Joni",
    "last_name": "Mäki",
    "profile_picture_url": "https://example.com/profile.jpg",
    "bio": "Palveluiden ammattilainen",
    "rating": 4.8
  }
}
```

---

## ❌ Virheenhallinta

### Validointivirhe (400 Bad Request)
```json
{
  "errors": [
    {
      "msg": "Username must be at least 3 characters",
      "param": "username",
      "location": "body"
    }
  ]
}
```

### Autentikaatiovirhe (401 Unauthorized)
```json
{
  "error": "Invalid token"
}
```

### Oikeusvirhe (403 Forbidden)
```json
{
  "error": "Not authorized"
}
```

### Resurssi ei löytynyt (404 Not Found)
```json
{
  "error": "Service not found"
}
```

### Palvelinvirhe (500 Internal Server Error)
```json
{
  "error": "Server error"
}
```

---

## 🧪 Testaaminen Postmanilla

### 1. Rekisteröidy
```
POST http://localhost:5000/api/auth/register
Body (JSON):
{
  "username": "testikäyttäjä",
  "email": "test@example.com",
  "password": "salasana123"
}
```

### 2. Kirjaudu sisään
```
POST http://localhost:5000/api/auth/login
Body (JSON):
{
  "email": "test@example.com",
  "password": "salasana123"
}
```
Kopioi `token` vastauseesta.

### 3. Lisää palvelu
```
POST http://localhost:5000/api/services
Headers:
  Authorization: Bearer [KOPIOI_TOKEN_TÄHÄN]
Body (JSON):
{
  "title": "Koiran ulkoilu",
  "description": "Tarjoan päivittäistä koiran ulkoilutuspalvelua",
  "category": "Lemmikitpalvelut",
  "pricePerHour": 30
}
```

---

## 📝 Huomioita

- Kaikki `Authorization` vaativan pyynnön tulee sisältää `Bearer TOKEN` -otsikkeen
- Salasanoja ei koskaan palauteta API:sta
- Arvostelut päivittävät automaattisesti käyttäjän keskimääräisen arvion
- Viestit pysyvät tietokannassa, joten ne ovat saatavilla myöhemmin
- Token vanhenee 7 päivässä

---

**Versio**: 1.0.0  
**Päivitetty**: 2026-06-03
