const services = [
  { title: 'Light Duty Towing', description: 'Fast transport for cars, trucks, SUVs, and everyday vehicles.' },
  { title: 'Flatbed Towing', description: 'Damage-free transport for luxury, EV, and AWD vehicles.' },
  { title: 'Jump Starts', description: 'Quick battery boosts to get you moving again.' },
  { title: 'Lockout Service', description: 'Fast help when keys are locked inside your vehicle.' },
  { title: 'Tire Change', description: 'On-site tire swaps for a safe ride home or to a shop.' },
  { title: 'Fuel Delivery', description: 'Emergency fuel brought right to your location.' },
];

const reasons = [
  '24/7 dispatch availability',
  'Fast response times',
  'Honest, upfront quotes',
  'Licensed and insured operators',
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.2),_transparent_40%)]">
      <section className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 lg:px-8 lg:py-24">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-full border border-white/10 bg-slate-900/80 px-6 py-4 shadow-2xl shadow-black/30 backdrop-blur">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">One Towing</p>
            <p className="text-sm text-slate-400">24/7 Roadside Assistance</p>
          </div>
          <a href="tel:+15551234567" className="rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600">
            Call Now: (555) 123-4567
          </a>
        </header>

        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-500">Fast help when you need it most</p>
              <h1 className="max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                Reliable towing and roadside service, available day or night.
              </h1>
              <p className="max-w-2xl text-lg text-slate-300 sm:text-xl">
                From emergency towing to jump starts and lockout help, One Towing is your local partner for dependable service without the drama.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="tel:+15551234567" className="rounded-full bg-brand-500 px-6 py-3 font-semibold text-white transition hover:bg-brand-600">
                Request Service Now
              </a>
              <a href="#services" className="rounded-full border border-white/15 px-6 py-3 font-semibold text-slate-200 transition hover:border-brand-500 hover:text-white">
                Explore Services
              </a>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-black/20">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Why customers call us</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {reasons.map((reason) => (
                  <div key={reason} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">
                    {reason}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/30">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-500">Emergency assistance</p>
            <h2 className="mt-3 text-3xl font-bold text-white">We’re ready when the unexpected happens.</h2>
            <p className="mt-4 text-slate-300">
              Broken down on the highway, stranded in a parking lot, or dealing with a total loss? One Towing can help you move forward fast.
            </p>
            <ul className="mt-6 space-y-3 text-slate-300">
              <li>• Accident recovery and vehicle transport</li>
              <li>• 24/7 live dispatch and rapid response</li>
              <li>• Friendly, professional support from call to drop-off</li>
            </ul>
            <a href="mailto:dispatch@onetowing.com" className="mt-8 inline-flex text-sm font-semibold text-brand-500 underline-offset-4 hover:underline">
              dispatch@onetowing.com
            </a>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-12">
        <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-500">Services</p>
            <h2 className="text-3xl font-bold text-white">Towing and roadside support for every kind of roadside issue.</h2>
          </div>
          <p className="max-w-xl text-slate-400">We handle everything from small roadside fixes to full vehicle transport with care and speed.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/20">
              <h3 className="text-xl font-semibold text-white">{service.title}</h3>
              <p className="mt-3 text-slate-400">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="rounded-[2rem] border border-brand-500/20 bg-brand-900/50 p-8 lg:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-500">Call us now</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Need help fast? One Towing is standing by 24/7.</h2>
          <p className="mt-4 max-w-2xl text-slate-300">
            Whether you need a tow, battery boost, or roadside support, our team is ready to respond quickly and professionally.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="tel:+15551234567" className="rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200">
              Call (555) 123-4567
            </a>
            <a href="mailto:dispatch@onetowing.com" className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:border-brand-500 hover:text-brand-500">
              Email Dispatch
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
