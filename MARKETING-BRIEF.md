# ONE TOWING — Marketing Handover Brief

Hand this to any PPC / SEO contractor. Everything below is already built and live —
the contractor's job is campaigns, not infrastructure.

Updated: **6 August 2026**

---

## 1. The business

| | |
|---|---|
| Legal name | **ONE TOWING LLC** (Florida, Sunbiz `L26000385571`, active since 20 Jul 2026) |
| Owner / operator | Roman Volodin |
| Phone | **656-777-2980** — the only number, used everywhere |
| Email | info@onetowingfl.com |
| Website | https://onetowingfl.com |
| Hours | 24/7 |
| Base | Downtown Tampa (Harbour Island) — **service-area business, customers never visit** |
| Fleet | **One** RAM 4500 wrecker, owner-operated |

**Consent tows only.** No trespass tows, no private-property impounds, no repossessions.
The customer always calls us themselves. This matters for ad copy and for keyword choice.

### Service area — 18 neighborhoods, Hillsborough County

Tampa · Downtown Tampa · South Tampa · Ybor City · Hyde Park · Davis Islands ·
West Tampa · Tampa Heights · Seminole Heights · Drew Park · Carrollwood ·
Town 'n' Country · Westchase · Temple Terrace · University Area · Brandon ·
Riverview · Palm River

Highways worked: I-275 · I-4 · I-75 · Selmon Expressway · Veterans Expressway ·
US-301 · Dale Mabry Highway · Hillsborough Avenue

⚠️ Pinellas County (St. Petersburg, Largo, Clearwater) is **not** in the service area,
even though the truck livery still mentions it.

### Prices — these exact numbers, nothing else

| Service | Price |
|---|---|
| Local tow | **from $95** — includes up to 10 mi to reach the customer, loading, and up to 10 mi of towing |
| Each extra mile | **$5** |
| Long distance | **$3/mile** — kicks in automatically from ~25 mi, customer always gets the cheaper of the two |
| Roadside (jump start, lockout, fuel, locked wheels) | **"Call for price"** — no published numbers |

---

## 2. What is already live

**Website** — Next.js on Vercel, auto-deploys from GitHub on push.

- SSL, `www` redirects to the apex domain
- SEO layer: `robots.txt`, `sitemap.xml`, JSON-LD (`AutomotiveBusiness`), OpenGraph, canonical
- Search Console: domain property verified, sitemap submitted, indexing requested
- Mobile-first; the phone number is on every screen and dials in one tap
- Page order is deliberate: hero → service areas → job photos → services → pricing → reviews
- Three real job photos published (wheel lift, highway accident recovery, shop delivery)

---

## 3. Tracking — configured, **do not recreate**

| What | ID |
|---|---|
| **Google Tag Manager** | **`GTM-KG9FC63K`** — installed site-wide, your workspace |
| Google Analytics 4 | `G-676GCTBX4Z` (property `547499411`) |
| Google Ads account | `564-992-8278` |
| Google Ads conversion tag | `AW-18365157406` |
| Conversion label, phone tap | `A_YuCJzc7twcEJ6gmLVE` |
| Google payments profile | `9884-4597-7667` |

⛔ **Never create a second GA4 property, a second Ads conversion tag, or a second GTM
container.** All of the above already exist and carry history. Recreating any of them
splits the data and resets Smart Bidding learning.

### GTM is the only place tags go

The GTM container is live on every page. GA4 and Google Ads were previously hardcoded
in the site; that code has been removed so you can manage everything from GTM without
a developer or a rebuild.

**You are expected to configure inside the container:**

| Tag | Settings |
|---|---|
| Google Tag | Tag ID `G-676GCTBX4Z`, trigger *Initialization – All Pages* |
| GA4 Event | Event name **exactly** `call_click`, trigger below |
| Google Ads Conversion | Conversion ID `18365157406`, label `A_YuCJzc7twcEJ6gmLVE`, trigger below |

**Trigger — phone tap:** type *Click – Just Links*, condition `Click URL` **starts with**
`tel:`.

⚠️ Enable the built-in **Click URL / Click Element / Click Text** variables first
(*Variables → Configure*). They are off by default and the trigger silently never fires
without them. This is the single most common setup mistake here.

⚠️ Event name must be `call_click` character-for-character — it is already marked as a
key event in GA4 and has history under that name.

### ⛔ Do not duplicate — double counting

If `call_click` is imported into Google Ads from GA4 **and** the Ads Conversion tag
fires, every phone tap counts twice. Ads then bids on numbers that are not real.

Pick one path, not both. Check *Ads → Goals → Conversions* and confirm the phone tap
appears exactly once.

### ⛔ Do not add these to GTM

The **Telegram alert** on every `tel:` tap lives in the site code on purpose
(`app/components/CallNotifier.tsx`) and is not analytics — it is the owner's live lead
notification. Do not recreate it as a GTM tag; it would fire twice and spam the owner's
phone at 3 a.m.

### Conversion actions in place

1. **Calls from ads** — Google-side, no code needed. Catches people who tap the call
   button inside the ad without ever opening the site.
2. **Phone tap on website** — fires a `gtag` conversion on a click of any `tel:` link,
   site-wide. Category: phone lead · Count: **One** (not Every) · No value assigned.

Count is set to *One* on purpose: a panicking customer taps the number three times, and
that must stay one lead, or Smart Bidding learns from inflated numbers.

No value is assigned because a real job is worth $95+, not the $1 Google suggests by
default. A wrong value is worse than no value.

### Also wired, outside Google

Every tap on the phone number sends the owner an instant Telegram alert: time in Tampa,
approximate city from IP, referrer, and whether it came from a phone or a desktop. He
sees who is calling before he picks up.

GA4 event `call_click` is marked as a key event and works independently of Ads.

---

## 4. What is **not** done yet

| | Status |
|---|---|
| Ad campaigns | **None. Zero spend to date.** The account is clean |
| Google Business Profile | Created, **not verified yet** — video verification pending |
| Local Services Ads | Category "Towing" confirmed available in ZIP 33602. Application **paused**: on-hook liability is in place ($100k), but the policy has **no commercial general liability** yet, and the certificate is being reissued under the correct legal name |
| Reviews | None yet — the listing is not live |
| Price calculator | Built, hidden behind a feature flag, no Google Maps key |

---

## 5. Hard rules — do not break these

1. **Never promise an ETA.** No "we arrive in 20 minutes". One truck, unpredictable
   traffic on I-275. Use "call for current ETA". A missed promise becomes a one-star
   review, and reviews drive both Maps ranking and LSA ranking.
2. **Prices exactly as listed above.** Roadside is always "Call for price" — we have no
   real numbers for it and will not invent any.
3. **No fabricated reviews.** FTC fines for this in the US.
4. **Do not write "licensed & insured"** until that is verified and documented.
5. **One phone number everywhere.** No Google forwarding numbers, no call-tracking number
   replacement without asking first. Site, Google Business Profile and the truck livery
   must show the same number — Google treats mismatches as unreliable business data.
6. **No claims about fleet size or years in business.** One truck, started 2026.

---

## 6. Access policy

| Service | Contractor gets |
|---|---|
| Google Ads | **Standard** access, or link through the contractor's MCC |
| Google Analytics | **Marketer** or **Analyst** |
| Search Console | **Full user** |
| Google Business Profile | **Manager** |
| Vercel · GitHub · Namecheap · Telegram bot | **No access, ever** |

The owner keeps Admin/Owner on everything. A contractor never becomes an account owner —
if the working relationship ends, ownership must not go with them.

Website changes are requested from the owner, not made directly.

---

## 7. Starting negative keywords (towing-specific)

Towing attracts an unusual amount of junk traffic. Suggested starting list:

```
free tow, free towing, junk car, cash for cars, scrap car, salvage,
tow truck for sale, wrecker for sale, tow truck jobs, towing jobs, hiring,
salary, how much do tow truck drivers make, tow truck driver,
AAA, roadside assistance membership, insurance covers towing,
how to tow, diy, tow dolly rental, u-haul, trailer rental,
impound lot, police auction, repossession, repo,
towing capacity, tow hitch, tow bar, towing mirrors
```

The "for sale", "jobs" and "free" clusters burn budget fastest.

---

## 8. Questions the contractor should answer before launch

1. Recommended daily budget for towing in Tampa, and expected CPC / cost per call?
2. Search only to start, or Performance Max as well — and why?
3. Call-only ads versus search ads with a call asset?
4. Ad schedule — genuinely 24/7, or restricted to hours the owner can answer?
5. How will lead quality be measured, given the conversion is a phone tap rather than a
   completed job?
6. What is needed from us: landing pages per neighborhood, more photos, anything else?

⚠️ Missed calls are the biggest risk. One truck cannot answer everything at once, and in
Local Services Ads a missed call directly lowers ranking. Budget should grow only as fast
as the owner can actually take the jobs.
