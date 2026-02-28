# GameChange

Современный fullstack pet-проект интернет-магазина цифровых игровых товаров: ключи игр, подписки и пополнение популярных сервисов.

Подробная документация всех endpoint'ов доступна в файле  [`API.md`](API.md).

Скриншоты интерфейса по разделам доступны в файле [`SCREENSHOTS.md`](SCREENSHOTS.md).

## Ключевой функционал

### Для пользователя
- регистрация и вход с `JWT` в `httpOnly cookie`;
- просмотр каталога игровых ключей и фильтрация по цене, жанрам, платформам активации и ОС;
- страница товара с описанием, галереей, системными требованиями и метаданными;
- корзина с локальным хранением (через `Zustand persist`);
- оформление покупки и сохранение истории покупок;
- просмотр и добавление отзывов;
- создание обращений в поддержку и просмотр истории;
- личный кабинет: данные профиля, смена email и пароля.

### Для администратора
- добавление, редактирование и удаление игровых ключей;
- доступ к обращениям пользователей, ответы на тикеты и управление их статусом;
- расширенный доступ к разделам поддержки.

## Технологический стек

### Frontend
- `Next.js 16` (App Router)
- `React 19` + `TypeScript`
- `Tailwind CSS 4`
- `TanStack Query`
- `React Hook Form`
- `Zustand`
- `Axios`

### Backend
- `Node.js` + `Express 5` + `TypeScript`
- `PostgreSQL` (`pg`)
- `JWT` (`jsonwebtoken`)
- `bcryptjs`
- `helmet`, `cors`, `morgan`, `cookie-parser`

### Инфраструктура
- `Docker Compose` для локального PostgreSQL
- `CI/CD`

## Архитектура

Проект разделен на 2 приложения:
- `frontend/` — клиентский интерфейс (Next.js);
- `backend/` — API и бизнес-логика (Express + PostgreSQL).

## База данных

В PostgreSQL описаны основные сущности:
- `users`
- `keys` + связанные таблицы (`key_images`, `operation_systems`, `activation_platforms`, `key_genres`, `key_system_requirements`)
- `purchases`
- `reviews`
- `support_tickets`

При автоинициализации база получает:
- администратора (для dev-режима),
- тестовый каталог игр,
- тестовые отзывы.

## Быстрый старт (локально)

### 1) Поднять PostgreSQL

Создайте файл .env в корне проекта и добавьте в него переменные окружения для подключения к базе данных
```bash
POSTGRES_USER = your_db_user
POSTGRES_PASSWORD = your_db_password
POSTGRES_DB = game_change
```

После этого в корне проекта выполните команду:

```bash
docker compose up -d
```

`docker-compose.yml` будет использовать переменные которые мы задали ранее

## 2) Настроить backend

Перейдите в `backend/` и создайте `.env` с переменными:

```bash
PORT=3003
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

DB_HOST=localhost
DB_PORT=5437
DB_NAME=game_change
DB_USER=your_db_user
DB_PASSWORD=your_db_password

DB_AUTO_INIT=true

JWT_SECRET=your-jwt-secret
```

Важно:
- frontend в текущей реализации ходит на `http://localhost:3003/api`, если хотите изменить порт backend - измените его и в `/frontend/lib/index.ts`;
- При первом запуске поставьте флаг `DB_AUTO_INIT = true`, таким образом отработает скрипты для загрузки тестовых данных. 
- После первого успешного запуска поставьте флажок `DB_AUTO_INIT = false`

Установка и запуск:

```bash
cd backend
yarn install
yarn dev
```

### 3) Запустить frontend

```bash
cd frontend
yarn install
yarn dev
```

Frontend будет доступен на `http://localhost:3000`.

При загрузке стартовых данных создаётся администратор: 
```bash
email = admin441@gmail.com
password = adminPassword123
```

## Скрипты

### Frontend (`frontend/package.json`)
- `yarn dev` — запуск в dev-режиме
- `yarn build` — production сборка
- `yarn start` — запуск production билда
- `yarn lint` — линтинг

### Backend (`backend/package.json`)
- `yarn dev` — запуск backend в dev-режиме (`nodemon + tsx`)
- `yarn build` — компиляция TypeScript
- `yarn start` — запуск production-сборки
- `yarn lint` — линтинг

## Планы на дальнейшее улучшение
- добавить unit тесты;
- реализовать полноценный платежный шлюз и webhook-подтверждение оплат;
- усилить аудит ошибок (Sentry/логирование событий);
- добавить CI-пайплайн (lint + test + build);

