# CLAUDE.md — ONE TOWING (сайт эвакуатора, Тампа)

> Этот файл Claude Code читает автоматически в начале КАЖДОГО чата. Здесь вся память
> проекта. Держать в актуальном виде. Подробный чертёж и план — в `BLUEPRINT.md`.

## Что это
Сайт эвакуаторной службы **ONE TOWING** в Тампе, Флорида. Работа 24/7, база в Downtown
Tampa, зона — Tampa Bay. Владелец — не программист: объяснять простым русским языком,
пошагово, без жаргона.

## Бизнес-данные (единственно верные)
| Поле | Значение |
|---|---|
| Название | ONE TOWING |
| Телефон | **656-777-2980** (`tel:+16567772980`) |
| Почта | **info@onetowingfl.com** — псевдоним ящика `roman@onetowingfl.com` (Google Workspace Business Starter, $8.40/мес). Показана только в подвале сайта |
| Владелец бизнеса | Роман Володин, `roman@onetowingfl.com` — под ним карточка в Картах и Google Ads |
| Режим | 24/7 |
| База | **124 S Morgan St, Tampa, FL 33602** (Harbour Island), координаты 27.94607, -82.45422 — `app/lib/constants.ts` → `BASE_LOCATION` |
| Зона | Tampa Bay: Downtown Tampa, Tampa, Ybor City, St. Petersburg, Largo, Clearwater, Brandon, Riverview |
| Шоссе | I-275, I-4, I-75, Selmon Expressway / SR 618, US-301 |
| Сайт | **https://onetowingfl.com** (живой, SSL, www → 308 на основной домен) |
| Хостинг | Vercel, проект `onetowing`, team_c3M18TfG1uNJY0Nen9OQn2mX, prj_quwYw1P0UfjMBVxbAc4UGQyvB2se |
| DNS | Namecheap BasicDNS: A `@` → 76.76.21.21, CNAME `www` → cname.vercel-dns.com |
| Репозиторий | github.com/vladatrach98-cmd/onetowing |

**Цены — только эти, других НЕ выдумывать:**
- Локальная буксировка — **от $95** (включено: до 10 миль подъезда + погрузка + до 10 миль буксировки)
- Каждая миля сверх включённых — **$5**
- Буксировка от 50 миль — **$3/миля**
- Дорожная помощь (прикурить, вскрытие, колесо, топливо) — **«Call for price»**, цифр нет

## Правила контента (не нарушать)
- **Не обещать время подачи.** Никаких «приедем за 20–45 минут» → «Call for current ETA».
- Калькулятор показывает **вилку** («$120–$150»), а не фиксированную цену. Формулировка
  везде: ballpark / approximate, финальная цена согласуется по телефону.
- **Не публиковать выдуманные отзывы.** Демо-отзывы включаются только флагом
  `NEXT_PUBLIC_DEMO_CONTENT=1` локально (в США за фейковые отзывы штрафует FTC).
- «Licensed & insured» писать, только если это правда (сейчас НЕ пишем).
- Телефон виден на каждом экране и звонится в один тап.

## Стек
Next.js **14.2.15** (App Router, TS) · React 18 · Tailwind **v3** (`tailwind.config.ts`) ·
шрифты Archivo (заголовки) + Barlow (текст) · папка `app/` в корне, **без `src/`**.
Не мигрировать на Next 16 / Tailwind v4 — дизайн собран на этом стеке.

## Структура репозитория
```
app/
├── page.tsx                    # ГЛАВНАЯ — одна страница: hero → услуги → цены → районы → фото → отзывы → CTA
├── layout.tsx                  # шрифты + метаданные
├── globals.css                 # базовые стили + CSS-анимации
├── components/
│   ├── SiteHeader.tsx          # шапка: лого, меню (5 пунктов), кнопка звонка
│   ├── SiteFooter.tsx          # футер: контакты, районы, шоссе
│   ├── EmergencySplash.tsx     # полноэкранный первый экран с кнопкой звонка
│   ├── GallerySection.tsx      # «Фото с работы» (прячется, если фото нет)
│   └── ReviewsSection.tsx      # отзывы (демо / Google)
├── estimate/
│   ├── page.tsx                # страница калькулятора
│   ├── EstimateForm.tsx        # калькулятор: проблема → локация → вилка цены → заявка
│   └── estimate-options.ts     # 8 вариантов «что случилось» (без цифр!)
├── api/
│   ├── call-click/route.ts     # ★ клик по номеру → «сейчас позвонят» в Telegram
│   ├── locate/route.ts         # геолокация/адрес → расстояние и время от базы (+ тихое уведомление)
│   └── lead/route.ts           # заявка → Telegram
└── lib/
    ├── constants.ts            # ★ телефон, адрес базы, цены, районы, меню
    ├── pricing.ts              # ★ формула цены (одна для браузера и сервера)
    ├── services.ts             # 12 услуг
    ├── maps.ts                 # Google Routes/Geocoding API (только сервер)
    ├── notify.ts               # отправка в Telegram
    ├── gallery.ts              # список фото
    ├── reviews.ts              # отзывы
    └── rate-limit.ts           # защита от спама
```

## Как делать типовые правки
- **Телефон / адрес базы / районы / цены** → `app/lib/constants.ts` (одно место на весь сайт).
- **Формула цены** → `app/lib/pricing.ts`.
- **Добавить фото с работы** → положить файл в `public/images/gallery/`, дописать строку в
  массив `GALLERY` в `app/lib/gallery.ts`. Пока массив пуст — секция скрыта.
- **Отзывы** → когда появится карточка Google: заменить `getReviews()` в `app/lib/reviews.ts`
  (виджет Elfsight/Trustindex или Google Places API) и задать `NEXT_PUBLIC_GOOGLE_REVIEWS_URL`.
- **Услуги** → `app/lib/services.ts`. **Варианты в калькуляторе** → `app/estimate/estimate-options.ts`.
- После правок: `npm run build`, затем деплой (см. ниже).

## Переменные окружения (`.env.local`, НИКОГДА не в git; дублировать в Vercel)
| Переменная | Зачем | Статус |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | бот **@One_towing_leads_bot**, создан на **рабочем** аккаунте Telegram | ✅ работает |
| `TELEGRAM_CHAT_ID` | **группа** «ONE TOWING- заявки» = `-5515808068` (Роман + Влада + рабочий аккаунт) | ✅ |
| `GOOGLE_MAPS_API_KEY` | Routes API + Geocoding API (серверный ключ) | ⏳ |
| `NEXT_PUBLIC_ESTIMATOR_ENABLED` | `1` = калькулятор /estimate виден; пусто/`0` = 404 и ссылки скрыты | сейчас **выключен** |
| `NEXT_PUBLIC_GOOGLE_REVIEWS_URL` | ссылка «оставить отзыв» `g.page/r/CQzM_uihnRqhEAE/review` | ✅ работает |
| `NEXT_PUBLIC_GOOGLE_MAPS_URL` | карточка в Картах `maps.google.com/?cid=11608764308225182732` → идёт в `sameAs` | ✅ работает |
| `NEXT_PUBLIC_DEMO_CONTENT` | `1` = демо-плитки фото/отзывов, **только локально** | локально =1 |
| `NEXT_PUBLIC_GA_ID` | GA4 `G-676GCTBX4Z` (аккаунт «One Towing», ресурс onetowingfl.com) | ✅ работает |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Google Ads (аккаунт **564-992-8278**, под `roman@`), тег **AW-18365157406** | ✅ работает |
| `NEXT_PUBLIC_GOOGLE_ADS_CALL_LABEL` | ярлык конверсии «нажатие на телефон» — `A_YuCJzc7twcEJ6gmLVE` | ✅ работает |
| `NEXT_PUBLIC_GSC_VERIFICATION` | не нужна: Search Console подтверждён через TXT-запись в DNS | — |

Без ключей ничего не падает: маршрут считается по прямой линии (пометка «rough estimate»),
заявка пишется в лог сервера вместо Telegram.

## Уведомления владельцу — только Telegram (никаких писем)
1. **Звонок** («📞 НАЖАЛИ НА ТЕЛЕФОН») — **основной**, потому что клиенты звонят, а не
   заполняют формы. Шлётся по клику на любую ссылку `tel:` на сайте. Приходит: время по
   Тампе, примерный город по IP (заголовки Vercel `x-vercel-ip-city` / `-country-region`),
   откуда пришёл человек, телефон или компьютер. Не чаще 1 раза в 90 секунд с одного IP.
   ⚠️ Сайт видит **нажатие**, а не факт разговора — состоялся звонок или нет, знает только
   телефонная сеть. Для «принят / пропущен / длительность» нужен номер отслеживания
   (CallRail, ~$45/мес) — оправдан, когда пойдёт платная реклама.
2. **Тихое** («👀 кто-то считает цену») — как только клиент определил локацию. Не чаще
   1 раза в 15 минут с одного IP.
3. **Заявка** («🔴 ЗАЯВКА С САЙТА») — когда клиент нажал кнопку. Приходит: проблема, адрес,
   сколько ехать (мили + минуты), куда везти, телефон клиента, метка на карте отдельным
   сообщением. **Цену в уведомлении не пишем** — её называет владелец по телефону.

Получатель — **группа**, а не личный чат. Добавить к заявкам нового человека (диспетчер,
подрядчик по рекламе) = просто добавить его в группу «ONE TOWING- заявки», в коде и в
Vercel менять нечего.
⚠️ Грабля Telegram: если группу переименовать, сделать публичной или назначить в ней
админов, она превращается в супергруппу и **id меняется** (станет `-100…`) — уведомления
замолкнут. Лечится так: `curl https://api.telegram.org/bot<ТОКЕН>/getUpdates`, взять новый
`chat.id` и обновить `TELEGRAM_CHAT_ID` в Vercel + передеплой.

## Деплой
`git push origin main` — Vercel собирает и публикует сам (~1 минута).
Если авто-деплой не сработал, добить руками через REST API (проверенный рецепт):
`POST https://api.vercel.com/v13/deployments?teamId={team}&forceNew=1` с телом
`{name:"onetowing", project:"{prjId}", target:"production", gitSource:{type:"github",
org:"vladatrach98-cmd", repo:"onetowing", ref:"main", sha:"{HEAD}"}}`, заголовки:
Bearer из `~/Library/Application Support/com.vercel.cli/auth.json` + браузерный User-Agent
(иначе Cloudflare отдаёт 403). Токен протухает → `npx vercel login`.
⚠️ Грабля, на которой уже падали: `tailwind.config.ts` не был закоммичен, и сборка на
Vercel падала на `bg-ink-950 does not exist`. Перед пушем — `git status`, а не только `app/`.
Коммиты только под GitHub-noreply email, иначе Vercel блокирует авто-деплой:
`user.name "vladatrach98-cmd"`, `user.email "304151701+vladatrach98-cmd@users.noreply.github.com"`
(уже настроено в этом репо).

## СТАТУС — обновлено 2026-07-28
Сделано:
- ✅ Реальный телефон и цены вместо заглушек, `app/lib/constants.ts` как единый источник
- ✅ Простая навигация (Services · Pricing · Areas · Photos · Reviews) + мобильная строка меню
- ✅ Главная: 12 услуг, блок цен, районы, шоссе
- ✅ Секции «Фото» и «Отзывы» — готовы принимать реальный контент, пустыми не показываются
- ✅ Калькулятор переписан: вилка цены вместо фикса, «Call for price» для дорожной помощи
- ✅ Locate: геолокация/адрес → расстояние и время в пути от базы (Google Routes API)
- ✅ Telegram-уведомления (тихое + заявка) с меткой на карте — **проверено на живом боте**
- ✅ Адрес базы вписан, цена растёт монотонно (дальний тариф — как только выгоднее клиенту)
- ✅ Калькулятор спрятан за флагом `NEXT_PUBLIC_ESTIMATOR_ENABLED` (сейчас выключен)
- ✅ `npm run build` проходит

- ✅ SEO-слой: robots.txt, sitemap.xml, JSON-LD (AutomotiveBusiness), OG-теги, canonical
- ✅ Search Console: ресурс-домен `onetowingfl.com` подтверждён TXT-записью, sitemap отправлен,
  индексирование запрошено (ждём 3–10 дней)
- ✅ GA4 `G-676GCTBX4Z`: счётчик работает, событие `call_click` (нажатие на телефон)
  помечено как ключевое — потом импортируется в Google Ads как конверсия

- ✅ Google Workspace на домене: `roman@onetowingfl.com` + псевдоним `info@`.
  DNS почты: MX `smtp.google.com` (prio 1), SPF `include:_spf.google.com`, DKIM `google._domainkey`.
  ⚠️ Правило DNS: в `MAIL SETTINGS` Namecheap должен стоять **Custom MX**, SPF-запись ровно одна,
  и НЕЛЬЗЯ трогать две TXT `google-site-verification` (Search Console + Workspace).

В работе / дальше:
- ⏳ Доступы Роману: GA4 (Администратор) + Search Console (Владелец) — **ресурсы не пересоздавать**
- ⏳ Карточка в Картах: создаёт Роман под `roman@onetowingfl.com`, он же снимает видео-верификацию.
  Инструкция и сценарий видео — `GOOGLE-BUSINESS.md`. Роли и передача доступов — `ACCESS.md`
- ⏳ Владелец: ключ Google Maps (без него расстояние по прямой), новый токен бота после `/revoke`
- ⏳ Google Ads: аккаунт без кампании → конверсия «звонок» → `AW-...` + ярлык
- ⏳ Реальные фото с работы (сейчас в hero — картинка от ИИ, заменить)
- ⏳ Google Business Profile → живые отзывы
- ⏳ 4 языка (en/es/ru/uk) через next-intl + кириллические шрифты — `BLUEPRINT.md` §B, §C
- ⏳ Деплой на Vercel + домен onetowingfl.com — §E, §F, §G
- ⏳ Аналитика (GA4), Search Console, SEO/JSON-LD, страницы городов — §H, §I
