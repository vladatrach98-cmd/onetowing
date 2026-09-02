'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { BUSINESS } from '../lib/constants';

/**
 * ФОРМА ЗАПЛАНИРОВАННОЙ ПЕРЕВОЗКИ.
 *
 * ⚠️ Это ЗАЯВКА, а не бронь слота. Нигде на сайте мы не обещаем время подачи,
 * и здесь тоже не обещаем: клиент называет удобное время, владелец перезванивает
 * и подтверждает. Слово «booking» в интерфейсе Google означает ровно это —
 * запрос на запись, а не гарантированный час.
 *
 * ⚠️ Срочные случаи сюда НЕ идут. Разбитая машина на I-275 не должна заполнять
 * форму — вверху страницы стоит телефон, и он там главнее формы.
 *
 * Отправка идёт в существующий /api/lead, поля свободные: расстояние и цену он
 * считает только когда переданы мили, а здесь мы их не передаём — цену владелец
 * называет по телефону.
 */

/** Только то, что реально планируют заранее. Аварийное сюда не кладём. */
const BOOKABLE = [
  'Scheduled non-emergency tow',
  'Long distance towing — statewide',
  'Dealer or auction pickup (Copart, IAAI)',
  'Delivery to a repair shop or dealership',
  'Vehicle relocation / snowbird move',
  'Motorcycle transport',
  'AWD, EV or a car that will not roll',
  'Sober driver — car home service',
  'Price quote only, not booking yet',
  'Something else',
];

export default function BookingForm() {
  const [service, setService] = useState(BOOKABLE[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [when, setWhen] = useState('');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [smsConsent, setSmsConsent] = useState(false);
  const [company, setCompany] = useState(''); // honeypot
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const openedAt = useRef(Date.now());

  const field =
    'mt-2 w-full border border-bone-300 bg-white px-4 py-[14px] text-[16px] text-ink-700 outline-none focus:border-brand-500';
  const label = 'block text-[13px] font-semibold uppercase tracking-[0.1em] text-bone-label';

  async function submit() {
    if (!phone.trim()) {
      setState('error');
      return;
    }

    setState('sending');
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: `SCHEDULED — ${service}`,
          serviceKind: 'tow',
          customerAddress: pickup.trim() || undefined,
          destinationAddress: dropoff.trim() || undefined,
          phone: phone.trim(),
          name: name.trim() || undefined,
          email: email.trim() || undefined,
          when: when || undefined,
          smsConsent,
          // Время и машина идут в примечание: отдельных полей у заявки нет,
          // а владельцу это нужно видеть одной строкой.
          note: [vehicle.trim() && `Vehicle: ${vehicle.trim()}`, note.trim()].filter(Boolean).join(' · '),
          company,
          elapsedMs: Date.now() - openedAt.current,
        }),
      });
      setState(response.ok ? 'sent' : 'error');
    } catch {
      setState('error');
    }
  }

  if (state === 'sent') {
    return (
      <div className="border border-bone-300 bg-white px-8 py-10">
        <p className="font-display text-[24px] font-extrabold leading-[1.2] tracking-[-0.01em] text-ink-700">
          Got it. We will call you back.
        </p>
        <p className="mt-4 max-w-[60ch] text-[17px] leading-[1.65] text-ink-600 text-pretty">
          Your request is with us. We will ring {phone} to confirm the time and give you the price before anything is
          agreed. If it turns out to be urgent after all, call rather than wait.
        </p>
        <a
          href={BUSINESS.phoneHref}
          className="mt-7 inline-block bg-brand-500 px-8 py-[19px] text-[15px] font-bold uppercase leading-none tracking-[0.12em] text-white transition-colors hover:bg-brand-600 hover:text-white"
        >
          Call {BUSINESS.phone}
        </a>
      </div>
    );
  }

  return (
    <div className="border border-bone-300 bg-white px-6 py-8 sm:px-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="service" className={label}>
            What do you need
          </label>
          <select id="service" value={service} onChange={(e) => setService(e.target.value)} className={field}>
            {BOOKABLE.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="name" className={label}>
            Your name
          </label>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John" className={field} />
        </div>

        <div>
          {/* Настоящий выбор даты и времени, а не текстовое поле: так владелец
              получает однозначное время, а не «завтра попозже». */}
          <label htmlFor="when" className={label}>
            When suits you
          </label>
          <input
            id="when"
            type="datetime-local"
            value={when}
            onChange={(e) => setWhen(e.target.value)}
            className={field}
          />
        </div>

        <div>
          <label htmlFor="pickup" className={label}>
            Pick the car up from
          </label>
          <input
            id="pickup"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder="Address or place in Tampa"
            className={field}
          />
        </div>

        <div>
          <label htmlFor="dropoff" className={label}>
            Take it to
          </label>
          <input
            id="dropoff"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            placeholder="Shop, dealership, home address"
            className={field}
          />
        </div>

        <div>
          <label htmlFor="vehicle" className={label}>
            The vehicle
          </label>
          <input
            id="vehicle"
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            placeholder="2018 Toyota Camry — runs, rolls"
            className={field}
          />
        </div>

        <div>
          <label htmlFor="phone" className={label}>
            Your phone <span className="text-brand-600">— required</span>
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

        <div>
          <label htmlFor="email" className={label}>
            Email (optional)
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={field}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="note" className={label}>
            Anything else we should know
          </label>
          <input
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Low clearance, no key, garage level 3, gate code…"
            className={field}
          />
        </div>

        {/* Honeypot — люди этого поля не видят, боты заполняют. */}
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
      </div>

      {/* СОГЛАСИЕ НА SMS.
          Без него не пройдёт регистрация 10DLC: правило CallRail — собираете
          телефоны без явного согласия на переписку на той же странице, значит
          зарегистрировать бизнес нельзя. Три условия, все обязательны:
          снята по умолчанию, форма отправляется и без неё, и речь только про
          SMS — почту и звонки в тот же пункт складывать запрещено. */}
      <label className="mt-7 flex cursor-pointer items-start gap-3 border border-bone-300 bg-bone-50 px-5 py-5">
        <input
          type="checkbox"
          checked={smsConsent}
          onChange={(e) => setSmsConsent(e.target.checked)}
          className="mt-[3px] h-5 w-5 shrink-0 accent-brand-500"
        />
        <span className="text-[15px] leading-[1.55] text-ink-600 text-pretty">
          I agree to receive text messages from <strong className="font-bold text-ink-700">ONE TOWING LLC</strong>{' '}
          about my service request, including a link to share my location. Message frequency varies — about one
          message per request. Message and data rates may apply. Reply STOP to opt out, HELP for help. Consent is not
          a condition of service. See our{' '}
          <Link href="/privacy" className="font-bold text-brand-600 underline underline-offset-2">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link href="/terms" className="font-bold text-brand-600 underline underline-offset-2">
            Terms
          </Link>
          .
        </span>
      </label>

      {state === 'error' ? (
        <p className="mt-6 text-[16px] leading-[1.55] text-brand-600">
          {phone.trim()
            ? 'That did not go through. Please call us instead — it is faster anyway.'
            : 'We need a phone number, otherwise there is no way to confirm the time with you.'}
        </p>
      ) : null}

      <button
        type="button"
        onClick={submit}
        disabled={state === 'sending'}
        className="mt-7 w-full bg-brand-500 px-8 py-[19px] text-[15px] font-bold uppercase leading-none tracking-[0.12em] text-white transition-colors hover:bg-brand-600 disabled:opacity-60 sm:w-auto"
      >
        {state === 'sending' ? 'Sending…' : 'Request this pickup'}
      </button>

      <p className="mt-5 text-[15px] leading-[1.6] text-ink-500 text-pretty">
        This is a request, not a confirmed slot. We call you back to agree the time and tell you the price before
        anything is booked in.
      </p>
    </div>
  );
}
