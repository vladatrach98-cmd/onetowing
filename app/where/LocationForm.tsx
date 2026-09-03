'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { BUSINESS } from '../lib/constants';

/**
 * ОТПРАВКА ЛОКАЦИИ — то, что видит человек на обочине.
 *
 * Здесь ровно ДВА вопроса и больше ничего:
 *   1. Где машина — одна кнопка, дальше карта, точку можно поправить пальцем.
 *   2. Куда везти — необязательно.
 *
 * Телефона, имени, примечаний и марки машины тут намеренно нет: владелец в
 * этот момент разговаривает с клиентом по телефону и всё это уже спрашивает
 * голосом. Каждое лишнее поле — это люди, которые не дошли до кнопки.
 *
 * ⚠️ «Куда везти» не блокирует отправку. Человек на трассе часто ещё не знает,
 * и терять из-за этого его координаты нельзя.
 *
 * ⚠️ Кнопка называется «моё местоположение», а вопрос — «где машина».
 * Это не одно и то же: звонит иногда не тот, кто стоит рядом с машиной.
 * Поэтому точку и можно перетащить.
 */

// Leaflet трогает window при импорте — только на клиенте.
const PinMap = dynamic(() => import('./PinMap'), {
  ssr: false,
  loading: () => <div className="h-[260px] w-full animate-pulse bg-bone-200 sm:h-[300px]" />,
});

type Point = { lat: number; lng: number };
type Hit = { label: string; lat: number; lng: number };

/** Даунтаун Тампы — куда смотрит карта, пока клиент не дал координаты. */
const FALLBACK: Point = { lat: 27.9506, lng: -82.4572 };

function useAddressSearch() {
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState<Hit[]>([]);
  const [busy, setBusy] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** Последний адрес, который вписала карта. По нему искать заново не надо. */
  const fromMap = useRef<string | null>(null);

  /**
   * Вписать текст в поле, НЕ запуская поиск.
   *
   * Нужно, когда адрес пришёл от карты: подставить его в поле надо, а искать
   * по нему заново — нет. Иначе под полем тут же вылезает список подсказок
   * с тем же самым адресом, и человек не понимает, что от него хотят.
   *
   * ⚠️ Запоминаем само значение, а не одноразовый флажок «пропусти следующий
   * раз». Флажок ломался, когда карта возвращала адрес, уже стоящий в поле:
   * на равном значении React не перерисовывает, эффект не срабатывает, флажок
   * остаётся поднятым — и съедает следующий поиск, набранный человеком руками.
   */
  function setQuietly(value: string) {
    fromMap.current = value;
    setQuery(value);
    setHits([]);
  }

  useEffect(() => {
    // Сброс висящего поиска идёт ПЕРВЫМ. Если человек печатал, а потом адрес
    // пришёл от карты, отложенный запрос всё равно бы выстрелил и показал
    // подсказки по недопечатанному тексту поверх подставленного адреса.
    if (timer.current) clearTimeout(timer.current);
    if (query === fromMap.current) {
      setHits([]);
      return;
    }
    fromMap.current = null;
    if (query.trim().length < 3) {
      setHits([]);
      return;
    }
    // Пауза перед запросом: геокодер OpenStreetMap просит не чаще раза
    // в секунду, а человек печатает быстрее.
    timer.current = setTimeout(async () => {
      setBusy(true);
      try {
        const response = await fetch(`/api/geocode?q=${encodeURIComponent(query.trim())}`);
        const data = (await response.json()) as { hits?: Hit[] };
        setHits(data.hits ?? []);
      } catch {
        setHits([]);
      } finally {
        setBusy(false);
      }
    }, 700);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [query]);

  return { query, setQuery, setQuietly, hits, setHits, busy };
}

export default function LocationForm() {
  const [pickup, setPickup] = useState<Point | null>(null);
  const [pickupAccuracy, setPickupAccuracy] = useState<number | null>(null);
  const [pickupAddress, setPickupAddress] = useState<string | null>(null);
  const [pickupBusy, setPickupBusy] = useState(false);
  const [geoState, setGeoState] = useState<'idle' | 'asking' | 'denied' | 'failed'>('idle');

  const [dropoff, setDropoff] = useState<Point | null>(null);
  const [dropoffLabel, setDropoffLabel] = useState('');
  const [dropoffBusy, setDropoffBusy] = useState(false);

  /**
   * Номер последнего запроса адреса — отдельно на каждую точку.
   *
   * Человек тычет в карту несколько раз подряд, а геокодер отвечает не в том
   * порядке, в каком его спросили. Без этого счётчика ответ на первый тык
   * запросто приходит последним и затирает адрес того места, куда ткнули
   * в итоге. Ответ с устаревшим номером просто выбрасываем.
   */
  const pickupRun = useRef(0);
  const dropoffRun = useRef(0);

  const [sendState, setSendState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const pickupSearch = useAddressSearch();
  const dropSearch = useAddressSearch();

  /** Координаты → человеческий адрес. Одна функция на обе точки. */
  async function lookupAddress(lat: number, lng: number): Promise<string | null> {
    try {
      const response = await fetch(`/api/geocode?lat=${lat}&lng=${lng}`);
      const data = (await response.json()) as { address?: string | null };
      return data.address ?? null;
    } catch {
      return null;
    }
  }

  /**
   * Адрес машины: показываем под картой И подставляем в поле поиска.
   * Второе важнее, чем кажется. Человеку проще исправить готовый адрес, чем
   * вспоминать его с нуля: определилось «South Morgan Street» — он допишет
   * номер дома или сотрёт и напишет «Walmart on Dale Mabry».
   */
  async function resolvePickup(lat: number, lng: number) {
    const run = ++pickupRun.current;
    setPickupBusy(true);
    const address = await lookupAddress(lat, lng);
    // За это время ткнули ещё раз — этот ответ уже не про ту точку.
    // Спиннер не гасим: его погасит тот запрос, который сейчас в пути.
    if (run !== pickupRun.current) return;
    setPickupBusy(false);
    setPickupAddress(address);
    if (address) pickupSearch.setQuietly(address);
  }

  /**
   * Адрес точки назначения. Без этого при постановке точки пальцем владельцу
   * уходили голые координаты — по ним не понять, это шиномонтаж или чей-то дом.
   */
  async function resolveDropoff(lat: number, lng: number) {
    const run = ++dropoffRun.current;
    setDropoffBusy(true);
    const address = await lookupAddress(lat, lng);
    if (run !== dropoffRun.current) return;
    setDropoffBusy(false);
    setDropoffLabel(address ?? '');
    if (address) dropSearch.setQuietly(address);
  }

  function askLocation() {
    if (!navigator.geolocation) {
      setGeoState('failed');
      setPickup(FALLBACK);
      return;
    }
    setGeoState('asking');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const point = { lat: position.coords.latitude, lng: position.coords.longitude };
        setPickup(point);
        setPickupAccuracy(position.coords.accuracy);
        setGeoState('idle');
        void resolvePickup(point.lat, point.lng);
      },
      (error) => {
        // 1 = человек отказал. Остальное — техника: нет сигнала, вышло время.
        setGeoState(error.code === 1 ? 'denied' : 'failed');
        // Карту всё равно показываем: точку можно поставить пальцем.
        setPickup(FALLBACK);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
    );
  }

  function movePickup(lat: number, lng: number) {
    setPickup({ lat, lng });
    setPickupAccuracy(null); // передвинули рукой — точность GPS больше не про эту точку
    void resolvePickup(lat, lng);
  }

  async function send() {
    if (!pickup) {
      setSendState('error');
      return;
    }
    setSendState('sending');
    try {
      const response = await fetch('/api/location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pickupLat: pickup.lat,
          pickupLng: pickup.lng,
          pickupAccuracy: pickupAccuracy ?? undefined,
          pickupText: pickupAddress ?? undefined,
          dropoffLat: dropoff?.lat,
          dropoffLng: dropoff?.lng,
          dropoffText: dropoffLabel || undefined,
        }),
      });
      setSendState(response.ok ? 'sent' : 'error');
    } catch {
      setSendState('error');
    }
  }

  if (sendState === 'sent') {
    return (
      <div className="border-2 border-brand-500 bg-white px-7 py-12 text-center">
        <p className="font-display text-[34px] font-extrabold leading-[1.05] text-ink-700">Got it.</p>
        <p className="mx-auto mt-4 max-w-[36ch] text-[18px] leading-[1.55] text-ink-600 text-pretty">
          {BUSINESS.name} has your location. Stay on the phone with us.
        </p>
        <a
          href={BUSINESS.phoneHref}
          className="mt-8 inline-block w-full bg-brand-500 px-8 py-[22px] text-[17px] font-bold uppercase leading-none tracking-[0.1em] text-white transition-colors hover:bg-brand-600 hover:text-white"
        >
          Call {BUSINESS.phone}
        </a>
      </div>
    );
  }

  const searchBox = (
    search: ReturnType<typeof useAddressSearch>,
    placeholder: string,
    onPick: (hit: Hit) => void,
  ) => (
    <div className="relative">
      <input
        value={search.query}
        onChange={(e) => search.setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full border-2 border-bone-300 bg-white px-4 py-[16px] text-[17px] text-ink-700 outline-none focus:border-brand-500"
      />
      {search.hits.length > 0 ? (
        <ul className="m-0 list-none border-2 border-t-0 border-bone-300 bg-white p-0">
          {search.hits.map((hit) => (
            <li key={`${hit.lat},${hit.lng}`} className="border-b border-bone-200 last:border-0">
              <button
                type="button"
                onClick={() => {
                  onPick(hit);
                  search.setQuery(hit.label.split(',').slice(0, 3).join(',').trim());
                  search.setHits([]);
                }}
                className="block w-full px-4 py-[14px] text-left text-[16px] leading-[1.4] text-ink-600 hover:bg-bone-100"
              >
                {hit.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {search.busy ? <p className="mt-2 text-[15px] text-ink-400">Searching…</p> : null}
    </div>
  );

  return (
    <div className="grid gap-5">
      {/* ────────── 1. Где машина ────────── */}
      <section className="border border-bone-300 bg-white px-5 py-7 sm:px-7">
        <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-brand-600">Step 1</p>
        <h2 className="mt-2 font-display text-[24px] font-extrabold leading-[1.15] text-ink-700 sm:text-[27px]">
          Where is the vehicle?
        </h2>

        {!pickup ? (
          <>
            <button
              type="button"
              onClick={askLocation}
              disabled={geoState === 'asking'}
              className="mt-5 w-full bg-brand-500 px-6 py-[28px] text-center font-display text-[20px] font-extrabold uppercase leading-none tracking-[0.05em] text-white transition-colors hover:bg-brand-600 disabled:opacity-70 sm:text-[23px]"
            >
              {geoState === 'asking' ? 'Finding you…' : '📍 Use my current location'}
            </button>
            <p className="mt-3 text-[15px] leading-[1.5] text-ink-500 text-pretty">
              Your phone will ask permission. We only use it to send the truck to the right place.
            </p>

            {/* Два запасных способа стоят рядом с кнопкой, а не появляются
                после отказа. Человек на трассе часто не хочет давать
                геолокацию, но прекрасно узнаёт развязку на карте. */}
            <div className="my-5 flex items-center gap-4">
              <span className="h-px flex-1 bg-bone-300" />
              <span className="text-[14px] font-bold uppercase tracking-[0.14em] text-bone-label">or</span>
              <span className="h-px flex-1 bg-bone-300" />
            </div>

            {searchBox(pickupSearch, 'Type an address or place…', (hit) => {
              setPickup({ lat: hit.lat, lng: hit.lng });
              setPickupAccuracy(null);
              setPickupAddress(hit.label);
            })}

            <button
              type="button"
              onClick={() => {
                setPickup(FALLBACK);
                setPickupAccuracy(null);
                void resolvePickup(FALLBACK.lat, FALLBACK.lng);
              }}
              className="mt-4 w-full border-2 border-ink-700 px-6 py-[18px] text-center text-[16px] font-bold uppercase leading-none tracking-[0.08em] text-ink-700 transition-colors hover:bg-ink-700 hover:text-white"
            >
              🗺 Point it out on the map
            </button>
          </>
        ) : (
          <div className="mt-5">
            <div className="overflow-hidden border-2 border-bone-300">
              <PinMap lat={pickup.lat} lng={pickup.lng} onMove={movePickup} tone="pickup" />
            </div>

            <p className="mt-3 text-[16px] font-bold leading-[1.4] text-ink-700">
              {geoState === 'denied' || geoState === 'failed'
                ? 'Tap the map where the vehicle is'
                : '✓ Location found'}
              {pickupAccuracy != null ? (
                <span className="font-semibold text-ink-500"> — accurate to about {Math.round(pickupAccuracy)} m</span>
              ) : null}
            </p>
            {/* Геокодер думает секунду-две. Без этой строки человек тыкает
                в карту, ничего не происходит, и он решает, что сломалось. */}
            {pickupBusy ? (
              <p className="mt-1 text-[16px] leading-[1.45] text-ink-400">Reading the address…</p>
            ) : pickupAddress ? (
              <p className="mt-1 text-[16px] leading-[1.45] text-ink-500 text-pretty">{pickupAddress}</p>
            ) : (
              <p className="mt-1 text-[16px] leading-[1.45] text-ink-400">
                No street address here — the dot is enough.
              </p>
            )}
            <p className="mt-2 text-[15px] leading-[1.45] text-ink-500">
              Not exactly right? Drag the dot or tap the map.
            </p>

            <div className="mt-4">
              {searchBox(pickupSearch, 'Or type an address or place…', (hit) => {
                setPickup({ lat: hit.lat, lng: hit.lng });
                setPickupAccuracy(null);
                setPickupAddress(hit.label);
              })}
            </div>

            <button
              type="button"
              onClick={askLocation}
              className="mt-4 text-[16px] font-bold text-brand-600 underline underline-offset-4"
            >
              Try my location again
            </button>
          </div>
        )}
      </section>

      {/* ────────── 2. Куда везти ────────── */}
      <section className="border border-bone-300 bg-white px-5 py-7 sm:px-7">
        <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-brand-600">Step 2 — optional</p>
        <h2 className="mt-2 font-display text-[24px] font-extrabold leading-[1.15] text-ink-700 sm:text-[27px]">
          Where are we taking it?
        </h2>

        <div className="mt-5">
          {searchBox(dropSearch, 'Shop, dealership, or your home address…', (hit) => {
            setDropoff({ lat: hit.lat, lng: hit.lng });
            setDropoffLabel(hit.label);
          })}
        </div>

        {!dropoff ? (
          <button
            type="button"
            onClick={() => {
              const start = pickup ?? FALLBACK;
              setDropoff(start);
              void resolveDropoff(start.lat, start.lng);
            }}
            className="mt-4 w-full border-2 border-ink-700 px-6 py-[18px] text-center text-[16px] font-bold uppercase leading-none tracking-[0.08em] text-ink-700 transition-colors hover:bg-ink-700 hover:text-white"
          >
            🗺 Point it out on the map
          </button>
        ) : null}

        {dropoff ? (
          <div className="mt-4">
            <div className="overflow-hidden border-2 border-bone-300">
              <PinMap
                lat={dropoff.lat}
                lng={dropoff.lng}
                onMove={(lat, lng) => {
                  setDropoff({ lat, lng });
                  void resolveDropoff(lat, lng);
                }}
                tone="dropoff"
              />
            </div>
            <p className="mt-3 text-[15px] leading-[1.45] text-ink-500">
              {dropoffBusy
                ? 'Reading the address…'
                : dropoffLabel
                  ? 'Drag the dot if it is not exact.'
                  : 'No street address here — the dot is enough. Drag it if it is not exact.'}
            </p>
          </div>
        ) : (
          <p className="mt-3 text-[15px] leading-[1.5] text-ink-500 text-pretty">
            Do not know yet? Skip this and send anyway.
          </p>
        )}
      </section>

      {/* ────────── Кнопка отправки — прибита к низу экрана ──────────
          Раньше она стояла последней в форме, и клиент до неё не доезжал:
          карта занимает пол-экрана, человек ставит точку и на этом
          останавливается — ему кажется, что дело сделано. Теперь плашка
          видна с первой секунды. Пока точки нет, кнопка серая: так сразу
          понятно, куда всё идёт и чем закончится.

          ⚠️ z-1200 не с потолка. У Leaflet свои слои до 1000 (тайлы 400,
          кнопки масштаба 800, всплывашки 700). С меньшим числом карта
          закрывала бы кнопку собой ровно в тот момент, когда она нужна.

          ⚠️ Отступ снизу через env(safe-area-inset-bottom) — на айфонах
          внизу живёт полоска-«домой», и без этого кнопка лезет под неё. */}
      <div className="fixed inset-x-0 bottom-0 z-[1200] border-t-2 border-bone-300 bg-bone-100/95 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] shadow-[0_-10px_28px_rgba(11,16,22,0.16)] backdrop-blur-sm">
        <div className="mx-auto max-w-[560px]">
          {sendState === 'error' ? (
            <p className="mb-2 text-center text-[15px] font-bold leading-[1.4] text-brand-600 text-pretty">
              {!pickup
                ? 'Tell us where the vehicle is first.'
                : 'That did not send. Try once more, or tell us on the phone.'}
            </p>
          ) : null}

          <button
            type="button"
            onClick={send}
            disabled={sendState === 'sending' || !pickup}
            className={[
              'w-full px-6 py-[22px] text-center font-display text-[19px] font-extrabold uppercase',
              'leading-none tracking-[0.06em] text-white transition-colors sm:text-[22px]',
              pickup
                ? `bg-brand-500 hover:bg-brand-600 ${sendState === 'sending' ? '' : 'send-ready'}`
                : 'cursor-not-allowed bg-ink-400',
            ].join(' ')}
          >
            {sendState === 'sending' ? 'Sending…' : 'Send my location'}
          </button>

          <p className="mt-2 text-center text-[14px] leading-[1.35] text-ink-500">
            {pickup ? 'We get it the second you tap.' : 'Set your location above, then tap here.'}
          </p>
        </div>
      </div>
    </div>
  );
}
