'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { BUSINESS, PRICING } from '../lib/constants';
import { estimate, LONG_DISTANCE_FROM_MILES, usd } from '../lib/pricing';
import { ESTIMATE_OPTIONS } from './estimate-options';

type LocateResponse = {
  customer: { address: string; point: { lat: number; lng: number } | null };
  approach: { miles: number; minutes: number; approximate: boolean } | null;
  tow: { miles: number; minutes: number } | null;
  destination: string | null;
  mapsConfigured: boolean;
};

type Status = 'idle' | 'loading' | 'done' | 'error';

const MAX_MANUAL_MILES = 60;

export default function EstimateForm() {
  const [optionId, setOptionId] = useState(ESTIMATE_OPTIONS[0].id);
  const option = ESTIMATE_OPTIONS.find((item) => item.id === optionId) ?? ESTIMATE_OPTIONS[0];

  const [addressInput, setAddressInput] = useState('');
  const [destinationInput, setDestinationInput] = useState('');
  const [locateStatus, setLocateStatus] = useState<Status>('idle');
  const [locateError, setLocateError] = useState('');
  const [result, setResult] = useState<LocateResponse | null>(null);

  /** Ручной ввод миль — запасной путь, если клиент не даёт локацию. */
  const [manualMiles, setManualMiles] = useState(10);
  const [useManual, setUseManual] = useState(false);

  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [company, setCompany] = useState(''); // honeypot
  const [sendStatus, setSendStatus] = useState<Status>('idle');

  const openedAt = useRef(Date.now());
  const notifiedOnce = useRef(false);

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  const approachMiles = result?.approach?.miles ?? null;
  const towMiles = option.needsDestination ? (result?.tow?.miles ?? (useManual ? manualMiles : null)) : 0;

  const price = useMemo(() => {
    if (option.kind !== 'tow') return null;
    if (approachMiles == null && !useManual) return null;
    return estimate({ approachMiles: approachMiles ?? 0, towMiles: towMiles ?? 0 });
  }, [option.kind, approachMiles, towMiles, useManual]);

  async function callLocate(payload: Record<string, unknown>) {
    setLocateStatus('loading');
    setLocateError('');

    try {
      const response = await fetch('/api/locate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          destination: option.needsDestination ? destinationInput : '',
          service: option.label,
          serviceKind: option.kind,
          // Тихое уведомление владельцу — только при первом определении локации.
          notifyOwner: !notifiedOnce.current,
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        setLocateError(
          data.error === 'address_not_found'
            ? 'We could not find that address. Try adding the city, or use your location.'
            : 'Something went wrong. Call us and we will sort it out in 10 seconds.',
        );
        setLocateStatus('error');
        return;
      }

      const data = (await response.json()) as LocateResponse;
      notifiedOnce.current = true;
      setResult(data);
      setLocateStatus('done');
      if (data.approach == null) setUseManual(true);
    } catch {
      setLocateError('No connection. Call us — that is always faster anyway.');
      setLocateStatus('error');
    }
  }

  function locateMe() {
    if (!('geolocation' in navigator)) {
      setLocateError('Your browser will not share the location. Type the address instead.');
      setLocateStatus('error');
      return;
    }

    setLocateStatus('loading');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        void callLocate({ lat: position.coords.latitude, lng: position.coords.longitude });
      },
      () => {
        setLocateError('Location is blocked in your browser. Type the address instead.');
        setLocateStatus('error');
      },
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 60_000 },
    );
  }

  async function sendRequest() {
    setSendStatus('loading');
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: option.label,
          serviceKind: option.kind,
          customerAddress: result?.customer.address ?? addressInput,
          lat: result?.customer.point?.lat,
          lng: result?.customer.point?.lng,
          approachMiles: approachMiles ?? undefined,
          approachMinutes: result?.approach?.minutes,
          approximateRoute: result?.approach?.approximate,
          destinationAddress: result?.destination ?? destinationInput,
          towMiles: towMiles ?? undefined,
          phone,
          note,
          company,
          elapsedMs: Date.now() - openedAt.current,
        }),
      });

      setSendStatus(response.ok ? 'done' : 'error');
    } catch {
      setSendStatus('error');
    }
  }

  const hasLocation = Boolean(result?.customer.address);

  return (
    <div className="mx-auto grid max-w-[1280px] px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
      <div className="pb-[72px] pt-16 lg:border-r lg:border-bone-300 lg:pr-14">
        <p className="mb-2.5 text-[11px] font-semibold uppercase leading-none tracking-[0.28em] text-brand-600">
          Step 1
        </p>
        <h2 className="mb-[26px] font-display text-[26px] font-extrabold leading-[1.15] sm:text-[30px]">
          What happened to your vehicle?
        </h2>

        <div className="border-t border-bone-300" role="radiogroup" aria-label="Type of problem">
          {ESTIMATE_OPTIONS.map((item) => {
            const isActive = item.id === optionId;
            return (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={() => setOptionId(item.id)}
                className={`grid w-full grid-cols-[4px_1fr_auto] items-center gap-[18px] border-0 border-b border-bone-300 py-[18px] pl-0 pr-[18px] text-left font-sans transition-colors ${
                  isActive ? 'bg-bone-active' : 'bg-transparent hover:bg-bone-hover'
                }`}
              >
                <span className={`block h-[38px] w-[4px] ${isActive ? 'bg-brand-500' : 'bg-transparent'}`} />
                <span className="block text-left">
                  <span className="block font-display text-[17px] font-bold leading-[1.3] text-ink-700">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-[15px] leading-[1.5] text-ink-soft">{item.description}</span>
                </span>
                <span className="hidden whitespace-nowrap text-[13px] font-semibold leading-none tracking-[0.06em] text-bone-label sm:block">
                  {item.kind === 'tow' ? `from $${PRICING.baseFee}` : 'call for price'}
                </span>
              </button>
            );
          })}
        </div>

        <p className="mb-2.5 mt-12 text-[11px] font-semibold uppercase leading-none tracking-[0.28em] text-brand-600">
          Step 2
        </p>
        <h2 className="font-display text-[26px] font-extrabold leading-[1.15] sm:text-[30px]">Where are you?</h2>
        <p className="mt-3 text-[16px] leading-[1.6] text-ink-soft">
          One tap and we see how far our truck has to drive. Your spot goes straight to the driver so nobody has to
          spell out street names on the phone.
        </p>

        <button
          type="button"
          onClick={locateMe}
          disabled={locateStatus === 'loading'}
          className="mt-6 w-full bg-ink-950 px-7 py-[19px] text-[14px] font-bold uppercase leading-none tracking-[0.12em] text-white transition-colors hover:bg-brand-500 disabled:opacity-60 sm:w-auto"
        >
          {locateStatus === 'loading' ? 'Locating…' : '📍 Use my location'}
        </button>

        <div className="mt-5">
          <label htmlFor="address" className="block text-[14px] font-semibold uppercase tracking-[0.1em] text-ink-600">
            Or type the address
          </label>
          <div className="mt-2.5 flex flex-wrap gap-2.5">
            <input
              id="address"
              value={addressInput}
              onChange={(event) => setAddressInput(event.target.value)}
              placeholder="e.g. 1200 E 7th Ave, Tampa"
              className="min-w-[240px] flex-1 border border-bone-300 bg-white px-4 py-[15px] text-[16px] text-ink-700 outline-none focus:border-brand-500"
            />
            <button
              type="button"
              onClick={() => addressInput.trim() && void callLocate({ address: addressInput })}
              disabled={locateStatus === 'loading' || !addressInput.trim()}
              className="border border-ink-950 px-6 py-[15px] text-[13px] font-bold uppercase leading-none tracking-[0.1em] text-ink-950 transition-colors hover:bg-ink-950 hover:text-white disabled:opacity-40"
            >
              Check
            </button>
          </div>
        </div>

        {option.needsDestination ? (
          <div className="mt-8">
            <p className="mb-2.5 text-[11px] font-semibold uppercase leading-none tracking-[0.28em] text-brand-600">
              Step 3
            </p>
            <h2 className="font-display text-[26px] font-extrabold leading-[1.15] sm:text-[30px]">
              Where should we take it?
            </h2>
            <p className="mt-3 text-[16px] leading-[1.6] text-ink-soft">
              A shop, a dealer, your home — or leave it empty if you have not decided yet.
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <input
                id="destination"
                value={destinationInput}
                onChange={(event) => setDestinationInput(event.target.value)}
                placeholder="Repair shop, dealer or home address"
                className="min-w-[240px] flex-1 border border-bone-300 bg-white px-4 py-[15px] text-[16px] text-ink-700 outline-none focus:border-brand-500"
              />
              <button
                type="button"
                onClick={() =>
                  void callLocate(
                    result?.customer.point
                      ? { lat: result.customer.point.lat, lng: result.customer.point.lng }
                      : { address: addressInput },
                  )
                }
                disabled={locateStatus === 'loading' || (!hasLocation && !addressInput.trim())}
                className="border border-ink-950 px-6 py-[15px] text-[13px] font-bold uppercase leading-none tracking-[0.1em] text-ink-950 transition-colors hover:bg-ink-950 hover:text-white disabled:opacity-40"
              >
                Recalculate
              </button>
            </div>

            {(useManual || (locateStatus === 'error' && !hasLocation)) && (
              <div className="mt-7 border-t border-bone-300 pt-6">
                <div className="flex items-center justify-between gap-6">
                  <label htmlFor="miles" className="font-display text-[18px] font-bold text-ink-700">
                    Or just set the towing distance
                  </label>
                  <span className="whitespace-nowrap bg-brand-500 px-[18px] py-[11px] text-[15px] font-bold leading-none text-white">
                    {manualMiles} mi
                  </span>
                </div>
                <input
                  id="miles"
                  type="range"
                  min={1}
                  max={MAX_MANUAL_MILES}
                  step={1}
                  value={manualMiles}
                  onChange={(event) => {
                    setManualMiles(Number(event.target.value));
                    setUseManual(true);
                  }}
                  className="range-slider mt-5"
                />
              </div>
            )}
          </div>
        ) : null}

        {locateError ? <p className="mt-5 bg-brand-50 px-4 py-3 text-[15px] text-brand-600">{locateError}</p> : null}

        {hasLocation ? (
          <div className="mt-7 border-l-[4px] border-brand-500 bg-white px-5 py-4">
            <p className="text-[16px] font-semibold text-ink-700">📍 {result?.customer.address}</p>
            {result?.approach ? (
              <p className="mt-1.5 text-[16px] text-ink-500">
                About {Math.round(result.approach.miles)} miles from us · roughly {result.approach.minutes} min drive
                {result.approach.approximate ? ' (rough estimate)' : ''}
              </p>
            ) : (
              <p className="mt-1.5 text-[16px] text-ink-500">Distance not calculated — set it with the slider below.</p>
            )}
            {result?.tow ? (
              <p className="mt-1.5 text-[16px] text-ink-500">
                Tow leg: about {Math.round(result.tow.miles)} miles to {result.destination}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="border-t border-bone-300 pb-[72px] pt-16 lg:border-t-0 lg:pl-14">
        <div className="bg-ink-950 px-9 pb-9 pt-10 text-white">
          <p className="text-[11px] font-semibold uppercase leading-none tracking-[0.28em] text-ink-400">
            Approximate price
          </p>

          {option.kind === 'roadside' ? (
            <>
              <p className="mt-3.5 font-display text-[40px] font-black leading-[1.05] tracking-[-0.02em] text-white sm:text-[46px]">
                Call for price
              </p>
              <p className="mt-3.5 text-[16px] leading-[1.6] text-ink-300">
                Jump starts, lockouts, tires and fuel depend on the car and the spot. Tell us what happened on the phone
                and you get the number right away.
              </p>
            </>
          ) : price ? (
            <>
              <p className="mt-3.5 font-display text-[44px] font-black leading-none tracking-[-0.03em] text-white sm:text-[54px] lg:text-[60px]">
                {usd(price.low)} – {usd(price.high)}
              </p>
              <p className="mt-3.5 text-[16px] text-ink-300">
                A ballpark, not a fixed quote. Easy jobs land lower, heavy ones higher — we agree the number on the
                phone.
              </p>

              <dl className="mt-[30px] border-t border-white/[0.14]">
                <div className="flex justify-between gap-4 border-b border-white/[0.08] py-4 text-[16px]">
                  <dt className="text-ink-400">
                    Base · includes {PRICING.includedApproachMiles} mi to you + {PRICING.includedTowMiles} mi of towing
                  </dt>
                  <dd className="font-bold text-white">{usd(price.base)}</dd>
                </div>
                {price.extraApproachMiles > 0 ? (
                  <div className="flex justify-between gap-4 border-b border-white/[0.08] py-4 text-[16px]">
                    <dt className="text-ink-400">
                      Extra miles to reach you · {Math.round(price.extraApproachMiles)} × ${PRICING.extraMileRate}
                    </dt>
                    <dd className="font-bold text-white">{usd(price.approachCharge)}</dd>
                  </div>
                ) : null}
                {price.towCharge > 0 ? (
                  <div className="flex justify-between gap-4 border-b border-white/[0.08] py-4 text-[16px]">
                    <dt className="text-ink-400">
                      {price.isLongDistance
                        ? `Long distance · ${Math.round(towMiles ?? 0)} mi × $${PRICING.longDistanceMileRate}`
                        : `Towing beyond ${PRICING.includedTowMiles} mi · $${PRICING.extraMileRate}/mi`}
                    </dt>
                    <dd className="font-bold text-white">{usd(price.towCharge)}</dd>
                  </div>
                ) : null}
                <div className="flex justify-between gap-4 pt-[18px] text-[17px]">
                  <dt className="font-bold text-white">Ballpark</dt>
                  <dd className="font-display text-[22px] font-extrabold text-brand-300">
                    {usd(price.low)} – {usd(price.high)}
                  </dd>
                </div>
              </dl>
            </>
          ) : (
            <>
              <p className="mt-3.5 font-display text-[44px] font-black leading-none tracking-[-0.03em] text-white sm:text-[54px]">
                from {usd(PRICING.baseFee)}
              </p>
              <p className="mt-3.5 text-[16px] leading-[1.6] text-ink-300">
                That covers {PRICING.includedApproachMiles} miles to reach you, loading, and {PRICING.includedTowMiles}{' '}
                miles of towing. Share your location above and we work out the rest.
              </p>
            </>
          )}

          {sendStatus === 'done' ? (
            <div className="mt-8 border border-white/20 px-6 py-5">
              <p className="font-display text-[19px] font-bold text-white">Your spot is with the driver.</p>
              <p className="mt-2 text-[15px] text-ink-300">
                Call now and he already knows where you are — no address dictation.
              </p>
              <a
                href={BUSINESS.phoneHref}
                className="mt-5 block bg-brand-500 px-6 py-[19px] text-center text-[14px] font-bold uppercase leading-none tracking-[0.12em] text-white hover:bg-brand-600 hover:text-white"
              >
                Call {BUSINESS.phone}
              </a>
            </div>
          ) : (
            <div className="mt-8">
              <label htmlFor="phone" className="block text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-400">
                Your phone (optional)
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="(813) 000-0000"
                className="mt-2 w-full border border-white/20 bg-ink-900 px-4 py-[14px] text-[16px] text-white outline-none focus:border-brand-500"
              />

              <label htmlFor="note" className="mt-4 block text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-400">
                Anything we should know? (optional)
              </label>
              <input
                id="note"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Car make, parking garage level, low clearance…"
                className="mt-2 w-full border border-white/20 bg-ink-900 px-4 py-[14px] text-[16px] text-white outline-none focus:border-brand-500"
              />

              {/* Honeypot — скрыт от людей, ловит ботов. */}
              <input
                type="text"
                name="company"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <button
                type="button"
                onClick={sendRequest}
                disabled={!hasLocation || sendStatus === 'loading'}
                className="mt-5 block w-full bg-brand-500 px-6 py-[21px] text-center text-[14px] font-bold uppercase leading-none tracking-[0.12em] text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {sendStatus === 'loading' ? 'Sending…' : 'Send my spot to the driver'}
              </button>
              {!hasLocation ? (
                <p className="mt-2.5 text-center text-[13px] text-ink-note">Share your location first ↑</p>
              ) : (
                <p className="mt-2.5 text-[13px] leading-[1.5] text-ink-note">
                  We pass your location to our own driver so he can find you and call back. Nothing else, nobody else.
                </p>
              )}
              {sendStatus === 'error' ? (
                <p className="mt-2.5 text-center text-[13px] text-brand-300">
                  Did not go through — just call {BUSINESS.phone}.
                </p>
              ) : null}
            </div>
          )}

          <a
            href={BUSINESS.phoneHref}
            className="mt-4 block border border-white/25 px-6 py-[19px] text-center text-[14px] font-bold uppercase leading-none tracking-[0.12em] text-white transition-colors hover:border-brand-500 hover:text-brand-300"
          >
            Or call now: {BUSINESS.phone}
          </a>
        </div>

        <p className="mt-11 text-[11px] font-semibold uppercase leading-none tracking-[0.28em] text-brand-600">
          Good to know
        </p>
        <ul className="mt-[18px] list-none border-t border-bone-300 p-0">
          {[
            `Base $${PRICING.baseFee} covers ${PRICING.includedApproachMiles} miles to you, loading, and ${PRICING.includedTowMiles} miles of towing.`,
            `Every mile past that is $${PRICING.extraMileRate}. On long runs (from about ${LONG_DISTANCE_FROM_MILES} miles) we switch to $${PRICING.longDistanceMileRate} a mile — whichever is cheaper for you.`,
            'Nights, weekends and holidays cost the same as any other hour.',
            'The number here is a ballpark — the final price is agreed with you before we roll.',
          ].map((item) => (
            <li key={item} className="border-b border-bone-300 py-4 text-[16px] text-ink-600">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
