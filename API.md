# GameChange API Documentation

Документация описывает текущий REST API backend-приложения `GameChange` (`Express + PostgreSQL`).

## Base URL

- Локально: `http://localhost:3003/api`

## Общий формат ответа

Большинство endpoint'ов возвращают объект:

```json
{
  "success": true,
  "data": {},
  "message": "optional",
  "error": "optional"
}
```

- `success` - статус выполнения.
- `data` - полезная нагрузка (если есть).
- `message`/`error` - текстовое пояснение.

## Аутентификация

API поддерживает 2 способа передачи токена:

1. `httpOnly` cookie `token` (основной для frontend).
2. Заголовок `Authorization: Bearer <jwt>`.

### Получение токена

`POST /user/login` устанавливает cookie `token` и дополнительно возвращает токен в `data.token`.

## Роли и доступ

- **Public**: endpoint доступен без авторизации.
- **Auth**: требуется валидный JWT.
- **Admin**: бизнес-операции администратора (управление ключами, ответы/удаление тикетов).

> Примечание: для тикетов админ-права дополнительно проверяются через `UserModel.isAdmin`.

---

## User API (`/user`)

### POST `/user/registration` (Public)

Регистрация нового пользователя.

**Body:**

```json
{
  "userName": "player441",
  "email": "player@example.com",
  "password": "StrongPassword123"
}
```

**200:**

```json
{
  "success": true,
  "message": "Пользователь успешно зарегистрирован"
}
```

---

### POST `/user/login` (Public)

Авторизация пользователя.

**Body:**

```json
{
  "email": "player@example.com",
  "password": "StrongPassword123",
  "rememberMe": true
}
```

**200:**

```json
{
  "success": true,
  "data": {
    "token": "<jwt>"
  }
}
```

---

### GET `/user/me` (Auth)

Получение профиля текущего пользователя.

**200:**

```json
{
  "success": true,
  "data": {
    "userData": {
      "publicId": "uuid",
      "email": "player@example.com",
      "userName": "player441",
      "createdAt": "2026-01-01T10:00:00.000Z",
      "isAdmin": false
    }
  }
}
```

---

### GET `/user/purchases` (Auth)

История покупок пользователя.

**200:**

```json
{
  "success": true,
  "data": {
    "purchasesList": [
      {
        "keyId": 1,
        "keyUrl": "cyberpunk-2077",
        "name": "Cyberpunk 2077",
        "mainImage": "https://...",
        "price": 1599,
        "count": 1,
        "date": "13.02.2026"
      }
    ]
  }
}
```

---

### POST `/user/purchases` (Auth)

Сохранение новых покупок.

**Body (ожидается массив):**

```json
[
  { "keyId": 1, "price": 1599, "count": 1 },
  { "keyId": 2, "price": 899, "count": 2 }
]
```

**200:**

```json
{
  "success": true
}
```

---

### POST `/user/change-password` (Auth)

Смена пароля.

**Body:**

```json
{
  "currentPassword": "OldPassword123",
  "newPassword": "NewPassword456"
}
```

---

### POST `/user/change-email` (Auth)

Смена email.

**Body:**

```json
{
  "newEmail": "newmail@example.com",
  "password": "CurrentPassword123"
}
```

---

## Key API (`/key`)

### GET `/key/keys` (Public)

Список ключей для каталога.

**200:** `data.keys: KeyListData[]`

---

### GET `/key/key?keyUrl=<slug>` (Public)

Полные данные карточки товара.

**200:** `data.keyDetails: KeyDetailsData`

---

### POST `/key/key` (Admin)

Добавление нового ключа.

**Body (пример):**

```json
{
  "name": "Cyberpunk 2077",
  "keyUrl": "cyberpunk-2077",
  "price": 1599,
  "mainPicture": "https://...",
  "releaseDate": "2020-12-10",
  "operationSystem": ["Windows"],
  "activationPlatform": ["Steam"],
  "genres": ["action", "rpg"],
  "description": "Описание...",
  "otherPictures": ["https://...", "https://..."],
  "developer": "CD PROJEKT RED",
  "publisher": "CD PROJEKT RED",
  "systemRequirements": {
    "minimal": { "CPU": "Intel Core i5", "GPU": "GTX 780", "RAM": 8, "memory": 70 },
    "recommended": { "CPU": "Intel Core i7", "GPU": "RTX 2060", "RAM": 16, "memory": 70 }
  }
}
```

---

### PUT `/key/key` (Admin)

Обновление существующего ключа.

`Body` аналогичен `POST /key/key`, но с обязательным `id`.

---

### DELETE `/key/key` (Admin)

Удаление ключа.

**Body:**

```json
{
  "keyId": 10
}
```

---

## Review API (`/review`)

### GET `/review/reviews` (Public)

Получение списка отзывов.

**200:** `data.reviews: ReviewListStructure[]`

---

### POST `/review/review` (Auth)

Добавление отзыва.

**Body:**

```json
{
  "tag": "steam",
  "rating": 5,
  "description": "Все отлично, пополнение пришло быстро."
}
```

---

## Support API (`/support`)

### POST `/support/ticket` (Auth)

Создание обращения в поддержку.

**Body:**

```json
{
  "type": "question",
  "category": "payment",
  "title": "Не прошла оплата",
  "description": "После оплаты не вижу товар в кабинете."
}
```

---

### GET `/support/tickets` (Auth)

Активные тикеты.

- для пользователя - только его тикеты;
- для администратора - все активные.

**200:** `data.tickets: TicketFrontendData[]`

---

### GET `/support/tickets/history` (Auth)

История закрытых/обработанных тикетов.

**200:** `data.tickets: TicketFrontendData[]`

---

### GET `/support/ticket?ticketId=<public_id>` (Auth)

Детали одного тикета.

**200:** `data.ticketDetails: TicketFrontendData`

---

### POST `/support/ticket/answer` (Admin)

Ответ администратора на обращение (закрывает тикет).

**Body:**

```json
{
  "ticketId": "uuid-ticket-id",
  "answer": "Проблема решена, проверьте личный кабинет."
}
```

---

### DELETE `/support/ticket` (Admin)

Удаление обращения.

**Body:**

```json
{
  "ticketId": "uuid-ticket-id"
}
```

---

## Частые коды ошибок

- `400` - ошибка валидации/некорректные параметры.
- `401` - не авторизован (нет/невалидный JWT).
- `403` - недостаточно прав для операции.
- `404` - сущность/маршрут не найдены.
- `409` - конфликт (например, email или username уже заняты).
- `500` - внутренняя ошибка сервера.

## Быстрая проверка через curl

```bash
curl -X POST http://localhost:3003/api/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin441@gmail.com","password":"adminPassword123","rememberMe":true}'
```

