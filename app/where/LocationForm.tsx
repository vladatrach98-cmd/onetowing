'use client';

import { useState } from 'react';
import { BUSINESS } from '../lib/constants';

/**
 * ОТПРАВКА ЛОКАЦИИ — то, что видит человек на обочине.
 *
 * Правила, из которых собран экран:
 *
 *   — Одна большая кнопка. Человек стоит на трассе, часто в темноте, часто
 *     одной рукой, вторая держит телефон у уха. Всё, что мельче пальца, тут
 *     не работает.
 *   — Ни регистрации, ни почты, ни имени, ни марки машины. Всё это владелец
 *     уже спрашивает голосом. Задача страницы одна: ГДЕ МАШИНА.
 *   — «Куда везти» необязательно. Человек на обочине часто ещё не знает,
 *     и терять из-за этого его точку нельзя.
 *   — Отказ в геолокации не тупик. Браузер имеет полное право не дать
 *     координаты, и тогда просто показываем поле для адреса.
 *
 * ⚠️ Кнопка называется «моё местоположение», а вопрос — «где машина».
 * Это не одно и то же: звонит иногда не тот, кто стоит рядом с машиной.
 */

type Geo = { lat: number; lng: number; accuracy: number };

export default function LocationForm() {
  const [geo, setGeo] = useState<Geo | null>(null);
  const [geoState, setGeoState] = useState<'idle' | 'asking' | 'denied' | 'failed'>('idle');
  const [pickupText, setPickupText] = useState('');
  const [dropoffText, setDropoffText] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [company, setCompany] = useState(''); // honeypot
  const [sendState, setSendState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const field =
    'mt-2 w-full border-2 border-bone-300 bg-white px-4 py-[16px] text-[17px] text-ink-700 outline-none focus:border-brand-500';
  const label = 'block text-[14px] font-bold uppercase tracking-[0.1em] text-bone-label';

  function askLocation() {
    if (!navigator.geolocation) {
      setGeoState('failed');
      return;
    }

    setGeoState('asking');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
        setGeoState('idle');
      },
      (error) => {
        // 1 = человек отказал. Остальное — техника: нет сигнала, вышло время.
        setGeoState(error.code === 1 ? 'denied' : 'failed');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
    );
  }

  async function send() {
    if (!geo && !pickupText.trim()) {
      setSendState('error');
      return;
    }

    setSendState('sending');
    try {
      const response = await fetch('/api/location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phone.trim() || undefined,
          pickupLat: geo?.lat,
          pickupLng: geo?.lng,
          pickupAccuracy: geo?.accuracy,
          pickupText: pickupText.trim() || undefined,
          dropoffText: dropoffText.trim() || undefined,
          note: note.trim() || undefined,
          company,
        }),
      });
      setSendState(response.ok ? 'sent' : 'error');
    } catch {
      setSendState('error');
    }
  }

  if (sendState === 'sent') {
    return (
      <div className="border-2 border-brand-500 bg-white px-7 py-10 text-center">
        <p className="font-display text-[30px] font-extrabold leading-[1.1] text-ink-700">Got it.</p>
        <p className="mx-auto mt-4 max-w-[40ch] text-[18px] leading-[1.6] text-ink-600 text-pretty">
          Your location is with {BUSINESS.name}. Stay on the phone with us — if the call has ended, we will ring you
          back.
        </p>
        <a
          href={BUSINESS.phoneHref}
          className="mt-8 inline-block w-full bg-brand-500 px-8 py-[22px] text-[17px] font-bold uppercase leading-none tracking-[0.1em] text-white transition-colors hover:bg-brand-600 hover:text-white sm:w-auto"
        >
          Call {BUSINESS.phone}
        </a>
      </div>
    );
  }

  return (
    <div className="border border-bone-300 bg-white px-6 py-8 sm:px-8">
      <h2 className="font-display text-[24px] font-extrabold leading-[1.15] text-ink-700 sm:text-[28px]">
        Where is the vehicle?
      </h2>

      {geo ? (
        <div className="mt-5 border-2 border-brand-500 bg-brand-50 px-5 py-5">
          <p className="font-display text-[19px] font-extrabold leading-[1.2] text-ink-700">✓ Location found</p>
          <p className="mt-2 text-[16px] leading-[1.5] text-ink-600">
            Accurate to about {Math.round(geo.accuracy)} metres.
          </p>
          {geo.accuracy > 200 ? (
            <p className="mt-2 text-[16px] leading-[1.5] text-brand-600">
              That is not very precise. Try again outdoors, or type the address below.
            </p>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-4">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${geo.lat},${geo.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[16px] font-bold text-brand-600 underline underline-offset-4"
            >
              Check it on the map
            </a>
            <button type="button" onClick={askLocation} className="text-[16px] font-bold text-ink-500 underline underline-offset-4">
              Try again
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Главная кнопка экрана. Всё остальное — запасные пути. */}
          <button
            type="button"
            onClick={askLocation}
            disabled={geoState === 'asking'}
            className="mt-5 w-full bg-brand-500 px-6 py-[26px] text-center font-display text-[20px] font-extrabold uppercase leading-none tracking-[0.06em] text-white transition-colors hover:bg-brand-600 disabled:opacity-70 sm:text-[22px]"
          >
            {geoState === 'asking' ? 'Finding you…' : '📍 Use my current location'}
          </button>
          <p className="mt-3 text-[15px] leading-[1.5] text-ink-500 text-pretty">
            Your phone will ask permission. We only use it to send the truck to the right place.
          </p>

          {geoState === 'denied' ? (
            <p className="mt-4 text-[16px] leading-[1.55] text-brand-600 text-pretty">
              No problem — your phone did not share the location. Type where the vehicle is instead.
            </p>
          ) : null}
          {geoState === 'failed' ? (
            <p className="mt-4 text-[16px] leading-[1.55] text-brand-600 text-pretty">
              We could not get a fix. Try again outside, or just type where the vehicle is.
            </p>
          ) : null}
        </>
      )}

      <div className="mt-7">
        <label htmlFor="pickupText" className={label}>
          {geo ? 'Anything to add about the spot?' : 'Or type where the vehicle is'}
        </label>
        <input
          id="pickupText"
          value={pickupText}
          onChange={(e) => setPickupText(e.target.value)}
          placeholder={geo ? 'Garage level 3 · behind the building' : 'Address, exit number, or the shop next to you'}
          className={field}
        />
      </div>

      <div className="mt-6">
        <label htmlFor="dropoffText" className={label}>
          Where are we taking it? <span className="font-semibold normal-case tracking-normal text-ink-400">— optional</span>
        </label>
        <input
          id="dropoffText"
          value={dropoffText}
          onChange={(e) => setDropoffText(e.target.value)}
          placeholder="Shop, dealership, or your home address"
          className={field}
        />
        <p className="mt-2 text-[15px] leading-[1.5] text-ink-500">
          Do not know yet? Leave it empty and send anyway.
        </p>
      </div>

      <div className="mt-6">
        <label htmlFor="phone" className={label}>
          Your phone
        </label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(813) 000-0000"
          className={field}
        />
      </div>

      <div className="mt-6">
        <label htmlFor="note" className={label}>
          Anything else <span className="font-semibold normal-case tracking-normal text-ink-400">— optional</span>
        </label>
        <input
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Will not roll · no key · low clearance"
          className={field}
        />
      </div>

      {/* Honeypot */}
      <input
        type="text"
        name="company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {sendState === 'error' ? (
        <p className="mt-6 text-[16px] leading-[1.55] text-brand-600 text-pretty">
          {!geo && !pickupText.trim()
            ? 'We need to know where the vehicle is — tap the button above or type the address.'
            : 'That did not send. Try once more, or tell us on the phone.'}
        </p>
      ) : null}

      <button
        type="button"
        onClick={send}
        disabled={sendState === 'sending'}
        className="mt-7 w-full bg-ink-950 px-8 py-[24px] text-center font-display text-[20px] font-extrabold uppercase leading-none tracking-[0.08em] text-white transition-colors hover:bg-ink-800 disabled:opacity-60"
      >
        {sendState === 'sending' ? 'Sending…' : 'Send'}
      </button>
    </div>
  );
}
