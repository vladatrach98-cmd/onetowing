# 🚗 BLUEPRINT — ONE TOWING (сайт эвакуатора, Тампа)

Это чертёж и пошаговый план для проекта **ONE TOWING**. Скопируй этот файл в корень
репозитория `one-towing-site` и дай его новому чату Claude Code с фразой:
«Веди меня по BLUEPRINT.md шаг за шагом». Внутри — реальное состояние проекта, все
решения, что доделать, надёжный рецепт деплоя и все грабли с решениями (мы их уже
прошли на проекте notaryvlada.com — он работает идеально; здесь повторяем то же самое).

> ⚠️ Этот блюпринт **специально адаптирован** под towing-проект. Он НЕ про нотариуса.
> Стек здесь другой (Next 14 + Tailwind v3, без `src/`) — так уже собран дизайн, его
> НЕ переделываем, а достраиваем.

---

## 0. Текущее состояние проекта (что ЕСТЬ и чего НЕТ)

**✅ Уже сделано (в коде):**
- Next.js **14.2.15** + React 18 + TypeScript, Tailwind **v3** (`tailwind.config.ts` + `postcss.config.js`).
- Дизайн-система: чёрно-угольная база (`ink`), белый, фирменный **красный `#c8181f`** (`brand`),
  бежевый (`bone`) — всё в `tailwind.config.ts`. Шрифты **Archivo** (заголовки, `--font-archivo`)
  + **Barlow** (текст, `--font-barlow`) через `next/font/google`.
- **Главная** (`app/page.tsx`): полноэкранный splash с кнопкой звонка (`EmergencySplash`) →
  hero-баннер с фото эвакуатора → блок услуг (6) → «почему мы» + экстренная помощь → CTA → футер.
- **`/estimate`** — калькулятор стоимости (`EstimateForm` + `problem-types.ts`, 10 позиций,
  формула «базовая ставка + $/миля», ползунок миль).
- Компоненты: `app/components/{SiteHeader,SiteFooter,EmergencySplash}.tsx`.
- Адаптив, анимации на чистом CSS (`emergency-ring`, `scroll-cue`, учёт `prefers-reduced-motion`).

**❌ Чего НЕТ / что неправильно:**
- **Мультиязычности нет** — сайт только на английском. Нужно **4 языка** (см. §1).
- **CLAUDE.md — ошибочная копия нотариуса** (пишет про Notary Vlada). Заменить на towing (§K).
- **README.md** — дефолтный create-next-app, не тронут.
- **Телефон-заглушка `(555) 123-4567`** в 6 местах. Реальный — **`656-777-2980`**.
- **Почта-заглушка `dispatch@onetowing.com`**. Слово «dispatch» клиенту непонятно — убрать.
- **Цены в калькуляторе выдуманы** (10 позиций). Реальные — **$95 / $5/миля / $3/миля** (§1).
- **Нет цен, районов, шоссе, формы заявки на главной.**
- **Фото эвакуатора — сгенерировано ИИ** (`public/one-towing-hero.png`). Нужны настоящие фото.
- Нет: домена (куплен `onetowingfl.com`, но не подключён), хостинга, аналитики, SEO-слоя, GBP.

> ⚠️ **Про папку:** этот код лежал копией внутри репозитория нотариуса, чтобы его показать.
> Настоящий проект — отдельный репозиторий **github.com/vladatrach98-cmd/onetowing**,
> папка `~/Desktop/one-towing-site`. Работать и коммитить нужно ТАМ, а не внутри чужого репо.

---

## 1. Ключевые решения (утверждено владельцем)

### Бизнес-данные (единственно верные — вписать в код вместо заглушек)
| Поле | Значение |
|---|---|
| Название | **ONE TOWING** |
| Телефон | **656-777-2980** → ссылка `tel:+16567772980` |
| Режим | **24/7** |
| База | Downtown Tampa, Florida |
| Зона | Tampa Bay и окрестности |
| ETA (время подачи) | ❗ **НЕ обещать** — писать «Call for Current ETA» (не измерено) |
| Домен | **onetowingfl.com** (куплен на Namecheap) |
| Репозиторий | github.com/vladatrach98-cmd/onetowing |

**Цены (только эти, других НЕ выдумывать):**
- Локальная буксировка — **от $95** (включено: до 10 миль подъезда + стандартная погрузка + до 10 миль буксировки).
- Дополнительные мили — **$5/миля**.
- Дальняя буксировка (от 50 миль) — **$3/миля**.

**Районы:** Downtown Tampa, Tampa, Ybor City, St. Petersburg, Largo, Clearwater, Brandon, Riverview + ближайшие города Tampa Bay.
**Шоссе:** I-275, I-4, I-75, Selmon Expressway / SR 618, US-301.
**Услуги (12):** локальная и экстренная буксировка, помощь на дороге, прикурить АКБ, вскрытие авто,
замена колеса, доставка топлива, авто с заблокированными колёсами, доставка к дилеру, доставка в
автосервис, перевозка авто, дальняя буксировка.

### 4 языка (главное новое требование)
В Тампе много **испанцев, русских, украинцев и американцев**. Сайт должен поддерживать **4 языка**:
- Локали: **`en` (по умолчанию), `es`, `ru`, `uk`**. Пути `/en` `/es` `/ru` `/uk`.
- Определяем язык по **языку системы/браузера гостя** (заголовок `Accept-Language`), **НЕ по стране** —
  все клиенты в США (гео у всех «US»), различает только язык устройства:
  - испанский → `es`, украинский → `uk`, русский → `ru`, **всё остальное и по умолчанию → `en`**.
- Вверху — переключатель всех 4 языков. Выбор сохраняется в cookie `NEXT_LOCALE` и всегда уважается.

> 🔵 Отличие от нотариуса: там определяли по **стране** (аудитория по миру). Здесь аудитория
> **локальная** (один город) → сигнал = язык браузера. Это единственное правильное решение для Тампы.

---

## 2. Технический стек (реальный, НЕ переделывать)

**Есть сейчас:** Next.js 14 (App Router, TS) · React 18 · Tailwind CSS **v3** (config-файл +
autoprefixer) · шрифты Archivo + Barlow · Vercel (хостинг) · GitHub.

**Добавляем:** **next-intl v4** (мультиязычность) · GA4 + Search Console (аналитика/SEO).

**Откладываем (архитектура готова, см. §J):** Resend (письма с формы) · Supabase (БД/заявки).
На старте towing-сайту это НЕ нужно — связь кнопками (звонок/WhatsApp/Telegram/email).

> Стек намеренно отличается от нотариуса (там Next 16 + Tailwind v4 + `src/`). **Не мигрируй** —
> дизайн уже собран на 14/v3 и работает. next-intl отлично живёт на Next 14. Просто держи в голове:
> здесь цвета в `tailwind.config.ts` (а не `@theme` в CSS), и папка `app/` в корне (без `src/`).

---

## 3. Ключевые файлы и их роль

| Файл | Что это | Зачем |
|---|---|---|
| **CLAUDE.md** | «Память проекта». Claude Code **авто-читает** в начале КАЖДОГО чата. | Сейчас это ошибочная копия нотариуса — **переписать под ONE TOWING** (§K). Держать в актуальном виде. |
| **ПАМЯТКА.md** | Шпаргалка для ВЛАДЕЛЬЦА простым языком: сервисы, доступы, что осталось, как просить правки. **Gitignored** (пароли). | Уже есть, хорошая — обновлять по мере готовности. |
| **.env.local** | Секреты (ID аналитики; позже — Resend/Supabase). **Gitignored**, НИКОГДА не в git. | Дублируются в Vercel Env Vars. |
| **tailwind.config.ts** | Цвета (`brand`/`ink`/`bone`/`ember`) + шрифты. | Меняешь палитру/шрифты — тут. |
| **app/globals.css** | Базовые стили + CSS-анимации. | `@tailwind base/components/utilities` + keyframes. |
| **messages/{en,es,ru,uk}.json** | ВЕСЬ текст сайта по языкам (создать при добавлении i18n). | Одинаковая структура ключей во всех 4 файлах. |
| **app/lib/constants.ts** | Телефон, email, зона, репо (создать). | Единый источник контактов/бизнес-данных. |
| **app/estimate/problem-types.ts** | Позиции калькулятора: **числа** (base/perMile/eta). | Цифры тут; тексты (label/description) → в messages при i18n. |

---

## 4. Сервисы (аккаунты) и роли

**Нужны сейчас (запуск):**

| Сервис | Роль | Платно? | Статус |
|---|---|---|---|
| **GitHub** | Код + история + резервная копия | Бесплатно | ✅ репо `onetowing` есть |
| **Vercel** | Хостинг, сборка, публикация | Бесплатно (Hobby) | ❌ подключить |
| **Namecheap** | Домен `onetowingfl.com` + DNS | ~$16/год | ✅ домен куплен, ❌ DNS на Vercel |
| **Google Analytics (GA4)** | Статистика посетителей | Бесплатно | ❌ |
| **Google Search Console** | Индексация в поиске | Бесплатно | ❌ |
| **Google Business Profile** | ⭐ Карточка в Картах + отзывы (для эвакуатора — главный источник звонков) | Бесплатно | ❌ |

**Добавляем позже, когда понадобится (см. §J):**

| Сервис | Роль | Платно? |
|---|---|---|
| **Resend** | Письма с формы заявок | Бесплатно |
| **Supabase** | БД + админка (если понадобится) | Бесплатно |

---

## 5. Пошаговая сборка (по порядку)

### Шаг A. Реальные данные вместо заглушек (сделать ПЕРВЫМ — без этого сайт нельзя показывать)
1. Создай `app/lib/constants.ts` с бизнес-данными (§1): `PHONE = "656-777-2980"`,
   `PHONE_HREF = "tel:+16567772980"`, email, зона, соцсети.
2. Замени **`(555) 123-4567` → `656-777-2980`** во всех местах (шапка, hero, splash, CTA, футер, estimate) —
   лучше через импорт из `constants.ts`, чтобы больше не было хардкода.
3. Убери почту-заглушку `dispatch@onetowing.com` и слово **«dispatch»** везде (клиенту непонятно) —
   заменить на «Call us» / рабочую почту вида `info@onetowingfl.com`.
4. **Цены калькулятора** (`problem-types.ts`): привести к реальной логике владельца — база **$95**,
   доп. мили **$5/миля**, дальняя (50+ миль) **$3/миля**. Согласовать позиции с владельцем.
5. Вынести цены на **главную** («от $95», формула «$5/миля, дальняя $3/миля») — клиент в стрессе
   не ищет калькулятор.
6. Добавить на главную блоки **районов** и **шоссе** (§1) — это и доверие, и SEO.

### Шаг B. Мультиязычность — 4 языка (next-intl)
```bash
npm install next-intl
```
- `next.config.mjs` — обернуть в плагин:
  ```js
  import createNextIntlPlugin from 'next-intl/plugin';
  const withNextIntl = createNextIntlPlugin('./app/i18n/request.ts');
  export default withNextIntl({ reactStrictMode: true });
  ```
- `app/i18n/routing.ts` — локали `['en','es','ru','uk']`, `defaultLocale:'en'`,
  `localePrefix:'always'`, `localeDetection:false`, `localeCookie:false`.
- `app/i18n/request.ts`, `app/i18n/navigation.ts` (стандарт next-intl).
- **`middleware.ts`** (в корне) — своя логика по **`Accept-Language`**:
  - есть cookie `NEXT_LOCALE` → уважаем её (явный выбор);
  - иначе парсим `Accept-Language`: `es*`→`es`, `uk*`→`uk`, `ru*`→`ru`, **иначе `en`**;
  - редирект `/` → `/{lang}`. Matcher: `['/((?!_next|_vercel|.*\\..*).*)']`.
- **Реструктуризация папок:** переносим страницы под локаль:
  - `app/page.tsx` → `app/[locale]/page.tsx`
  - `app/estimate/*` → `app/[locale]/estimate/*`
  - `app/service-areas/*` → `app/[locale]/service-areas/*`
  - `app/components/*` — оставить (общие), но текст в них брать из переводов.
  - корневой `app/layout.tsx` — сделать passthrough (просто `return children`),
    а `<html lang>`, шрифты, провайдер `NextIntlClientProvider` — в `app/[locale]/layout.tsx`.
- **Контент → `messages/{en,es,ru,uk}.json`** (одинаковые ключи). Перенести ВСЕ зашитые строки:
  из `page.tsx` (`services[]`, `reasons[]`, `stats[]`, hero-тексты), из `EmergencySplash`
  (`locations[]`, заголовки), из `SiteHeader`/`SiteFooter` (навигация, топ-бар), из
  `estimate/page.tsx` + `EstimateForm` (заголовки, `goodToKnow[]`), из `problem-types.ts`
  (`label`/`description`/`eta` — в messages; **числа `base`/`perMile` оставить в .ts**).
- Переключатель языка (4 кнопки/дропдаун) в `SiteHeader`. Английский — основа, перевести на es/ru/uk.

### Шаг C. Шрифты и кириллица (важно для ru/uk!)
> ⚠️ **Archivo и Barlow из Google Fonts НЕ содержат кириллицу** (только latin/latin-ext). Русский и
> украинский в них отвалятся на системный шрифт. Реши до перевода:
- **Вариант 1 (проще):** оставить Archivo/Barlow для en/es, а для ru/uk подключить кириллический
  шрифт близкого характера (например, **Oswald** — есть `cyrillic`, индустриальный вид для заголовков;
  для текста — **PT Sans**/**Montserrat** с `subsets:['latin','cyrillic']`) и переключать по локали.
- **Вариант 2:** взять один шрифт с обоими алфавитами на весь сайт (например Montserrat) — проще
  поддерживать, но потеряется «towing»-характер Archivo.
- В любом случае: у `next/font/google` указать нужные `subsets`, и задать fallback-стек с кириллицей.

### Шаг D. GitHub
Репозиторий уже есть (`onetowing`). Коммить только осмысленные изменения; **секреты не коммитить**
(проверять `git diff --cached --name-only`, не `git add .` вслепую). `gh` CLI: `~/.local/bin/gh`.

### Шаг E. Деплой на Vercel — ГЛАВНЫЙ РЕЦЕПТ
`vercel login` один раз (браузер), затем связать проект (`vercel link` → появится `.vercel/project.json`).
> ⚠️ **CLI `npx vercel --prod` ЗАВИСАЕТ** на загрузке в этом окружении. Push-авто-деплой может не
> сработать. **Надёжный способ — git-source деплой через Vercel REST API** (собирает из GitHub, ~30 сек):
```python
# токен из ~/Library/Application Support/com.vercel.cli/auth.json
# projectId/orgId из .vercel/project.json
POST https://api.vercel.com/v13/deployments?teamId={orgId}&forceNew=1
Headers: Authorization: Bearer {token}, User-Agent: Mozilla/5.0 …(браузерный, иначе 403 Cloudflare)
Body: {"name":"one-towing-site","project":"{projectId}","target":"production",
       "gitSource":{"type":"github","org":"vladatrach98-cmd","repo":"onetowing","ref":"main","sha":"{HEAD}"}}
# затем поллить GET /v13/deployments/{id} до readyState=READY
```
Порядок: `git push origin main` СНАЧАЛА, потом этот вызов API.

### Шаг F. Домен (onetowingfl.com уже куплен)
- Подключить: `vercel domains add onetowingfl.com {project}` (SSL Vercel даёт бесплатно — не покупать).
- В Namecheap → Advanced DNS удалить дефолтные записи, добавить:
  - **A** `@` → `76.76.21.21`
  - **CNAME** `www` → `cname.vercel-dns.com`
- SSL выпустится за 5–30 мин.

### Шаг G. Авто-деплой через GitHub (чтобы `git push` = публикация)
`vercel git connect`. **КРИТИЧНО:** Vercel блокирует авто-деплой, если email коммита не привязан к
GitHub («Deployment Blocked: commit email … could not be matched to a GitHub account»).
**Решение — коммитить под GitHub-noreply email аккаунта:**
```bash
git config user.name "vladatrach98-cmd"
git config user.email "304151701+vladatrach98-cmd@users.noreply.github.com"
```
После этого `git push` авто-деплоится (~30 сек).

### Шаг H. Аналитика
- `app/components/Analytics.tsx` — грузит GA4 по env `NEXT_PUBLIC_GA_ID` (и Meta Pixel по
  `NEXT_PUBLIC_META_PIXEL_ID`, если будет). Подключить в `app/[locale]/layout.tsx`.
- Search Console: мета-тег `NEXT_PUBLIC_GSC_VERIFICATION` в `metadata` root-layout → Verify → submit `sitemap.xml`.
- **Грабли env:** `NEXT_PUBLIC_*` инлайнятся в бандл на СБОРКЕ. Если в Vercel пусты — не работают.
  Ставить через Vercel API (`POST /v10/projects/{id}/env?upsert=true`), потом ПЕРЕсобрать.

### Шаг I. SEO
- `generateMetadata` на локаль/страницу (title/description/OG), hreflang alternates (4 языка + x-default=en).
- **JSON-LD**: тип **`TowingService`** / `LocalBusiness` (name, telephone `+16567772980`, `areaServed`
  Tampa Bay, `openingHours` 24/7, `priceRange`), `Service` на каждую услугу, `FAQPage` если будет FAQ,
  `BreadcrumbList`. `sameAs` — соцсети/GBP.
- `sitemap.ts` + `robots.ts`. Проверить: `next build` — маркетинг-роуты статические; Rich Results Test.
- Города — отдельные лендинги (`/[locale]/service-areas/tampa`, `/clearwater`, `/st-petersburg`…) под локальный поиск.

### Шаг J. ПОЗЖЕ (опционально): форма заявок с письмом / БД
> На старте НЕ делаем. Связь — кнопками (звонок, WhatsApp, Telegram, email). Но заложи
> **архитектурный шов**, чтобы форму с письмом добавить потом одним модулем:
> - `app/lib/notify.ts` — функция `sendLead(data)`; сейчас `console.log`, позже туда вставляется Resend.
> - `app/api/lead/route.ts` — роут-заглушка: валидирует и зовёт `sendLead()`. Держать с самого начала.
> - env-плейсхолдеры `RESEND_API_KEY`, `LEAD_TO_EMAIL` — пустые, код читает, но не падает.
> - Форму `EstimateForm` можно расширить до «оставить заявку» позже.
> - Когда включаем: `npm install resend zod`; верифицировать домен в Resend (DNS-записи DKIM/SPF/DMARC
>   в Namecheap, MX только в режиме Mail Settings → Custom MX), затем письма на рабочую почту.
> - Supabase (если понадобится БД заявок/записей) добавляется так же, как на нотариусе (RPC + RLS).

### Шаг K. CLAUDE.md + ПАМЯТКА.md
- **Переписать `CLAUDE.md`** под ONE TOWING (сейчас там ошибочный текст нотариуса): что за проект,
  бизнес-данные (§1), правило 4 языков (детекция по Accept-Language, en по умолчанию), live-URL,
  рецепт деплоя (§E), noreply-email (§G), структура репо, playbook «как менять текст/цену/телефон»,
  статус. Это делает проект «самоподхватываемым» в любом новом чате.
- **ПАМЯТКА.md** уже есть и хорошая — обновлять статусы по мере готовности.

---

## 6. Грабли и решения (мы это уже прошли)
1. **CLI `vercel --prod` зависает** → деплой git-source через Vercel REST API (§E).
2. **Cloudflare 403 на API Vercel** без браузерного `User-Agent` → добавлять `User-Agent: Mozilla/5.0…`.
3. **Vercel блокирует авто-деплой из-за email коммита** → GitHub-noreply email (§G).
4. **`NEXT_PUBLIC_*` пустые в проде** → ставить через Vercel API + пересобрать.
5. **Vercel/Supabase токен протухает** → перелогин (`vercel login`) или API-токен из дашборда.
6. **Кириллица в шрифтах** — Archivo/Barlow её НЕ содержат → для ru/uk кириллический шрифт/fallback (§C).
7. **Зашитый контент** — весь текст в TSX-массивах; для 4 языков вынести в `messages/*.json`, числа оставить в .ts.
8. **Анимации не должны прятать контент** — если делаешь reveal-on-scroll, делай на чистом CSS
   (`@keyframes`), не на JS-обсервере, который скрывает блоки (на нотариусе так ловили пустые страницы).
9. **Расширения-переводчики (DeepL/Google Translate)** ломают вёрстку/клики — но ТОЛЬКО у владельца в
   её браузере; сайт для гостей исправен. Диагностика: режим Инкогнито (расширения off). Особенно
   актуально здесь — у сайта 4 языка, соблазн включить авто-перевод браузера велик.
10. **Конфиденциальное / чужой репо** — работать в правильной папке `one-towing-site`, а не в копии
    внутри чужого репозитория. Секреты — в `.gitignore`, никогда не коммитить.

---

## 7. Правила контента (towing)
- **Не обещать время подачи**, пока не измерено → «Call for Current ETA» (иначе конфликты с клиентами).
- Калькулятор — это **оценка, не финальный счёт**: везде писать «Estimate only, dispatcher confirms
  the final price» (в футере уже есть «Estimates are not final quotes» — сохранить во всех языках).
- **Цены — только реальные** ($95 / $5 / $3), ничего не выдумывать.
- «Licensed & insured» писать, только если это правда.
- Телефон виден на **каждом экране** и звонится в один тап (`tel:`). Для эвакуатора это важнее всего.

---

## 8. Стоимость
Хостинг Vercel — бесплатно. GitHub/аналитика — бесплатно. Домен `onetowingfl.com` ~$16/год.
Позже (когда добавишь): Resend/Supabase — бесплатные тарифы. Платно опционально: реклама (Google Ads
от $15–20/день — для эвакуатора главный канал; смотри и **Local Services Ads / Google Guaranteed**).

---

## Приоритет запуска (кратко)
1. **Реальные данные** (телефон, цены, убрать «dispatch») — §A.
2. **4 языка** — §B, §C.
3. **Деплой + домен** — §E, §F, §G.
4. **⭐ Google Business Profile** — для эвакуатора звонки с Карт пойдут раньше сайта.
5. **Аналитика + SEO + города** — §H, §I.
6. **Реклама** (Google Ads / Local Services Ads).
7. Позже: форма заявок (Resend), настоящие фото машины.

*Собрано на опыте проекта notaryvlada.com (июль 2026) — он работает идеально; здесь повторяем ту же
надёжную схему под towing. Копируй в репозиторий one-towing-site и веди новый чат по шагам.*
