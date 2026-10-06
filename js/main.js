  /* ---------- Reveal on scroll (must be defined before first use) ---------- */
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const REVEAL = '[data-reveal], .rev-lines, .city, .card, .step, .promise > div';

  const revealIO = ('IntersectionObserver' in window && !reduceMotion)
    ? new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.isIntersecting) { en.target.classList.add('in'); revealIO.unobserve(en.target); }
        });
      }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' })
    : null;

  function observeReveals(root) {
    root.querySelectorAll(REVEAL).forEach(el => {
      if (revealIO) revealIO.observe(el); else el.classList.add('in');
    });
  }

  /* ---------- Listings (fictional) ---------- */
  const LISTINGS = [
    { photo: 'l1', city: 'Warsaw',  area: 'Mokotów',   title: 'Two-bedroom in Mokotów',   mode: 'rent', pln: 6200,   m2: 55, beds: '2 bedrooms' },
    { photo: 'l2', city: 'Warsaw',  area: 'Wola',      title: 'One-bedroom in Wola',      mode: 'buy',  pln: 790000, m2: 38, beds: '1 bedroom' },
    { photo: 'l3', city: 'Kraków',  area: 'Kazimierz', title: 'One-bedroom in Kazimierz', mode: 'rent', pln: 3800,   m2: 40, beds: '1 bedroom' },
    { photo: 'l4', city: 'Kraków',  area: 'Podgórze',  title: 'Two-bedroom in Podgórze',  mode: 'buy',  pln: 940000, m2: 52, beds: '2 bedrooms' },
    { photo: 'l5', city: 'Wrocław', area: 'Nadodrze',  title: 'Two-bedroom in Nadodrze',  mode: 'rent', pln: 4300,   m2: 50, beds: '2 bedrooms' },
    { photo: 'l6', city: 'Wrocław', area: 'Krzyki',    title: 'Two-bedroom in Krzyki',    mode: 'buy',  pln: 880000, m2: 62, beds: '2 bedrooms' },
    { photo: 'l7', city: 'Poznań',  area: 'Jeżyce',    title: 'One-bedroom in Jeżyce',    mode: 'rent', pln: 3300,   m2: 38, beds: '1 bedroom' },
    { photo: 'l8', city: 'Gdańsk',  area: 'Wrzeszcz',  title: 'Two-bedroom in Wrzeszcz',  mode: 'rent', pln: 4600,   m2: 52, beds: '2 bedrooms' },
    { photo: 'l9', city: 'Gdynia',  area: 'Orłowo',    title: 'Two-bedroom in Orłowo',    mode: 'buy',  pln: 990000, m2: 58, beds: '2 bedrooms' },
    { photo: 'l10', city: 'Łódź',   area: 'Śródmieście', title: 'Two-bedroom in Śródmieście', mode: 'buy', pln: 590000, m2: 54, beds: '2 bedrooms' },
    { photo: 'l11', city: 'Warsaw', area: 'Praga-Południe', title: 'One-bedroom in Praga-Południe', mode: 'rent', pln: 3900, m2: 34, beds: '1 bedroom' },
    { photo: 'l12', city: 'Poznań', area: 'Grunwald',  title: 'Two-bedroom in Grunwald',  mode: 'buy',  pln: 650000, m2: 50, beds: '2 bedrooms' },
    { photo: 'l13', city: 'Gdynia', area: 'Śródmieście', title: 'One-bedroom in Śródmieście', mode: 'rent', pln: 4100, m2: 42, beds: '1 bedroom' }
  ];

  /* ---------- Cities (single source for panels, tabs, selects, footer) ---------- */
  const CITIES = [
    { name: 'Warsaw',  key: 'warsaw',  homes: 168, alt: 'Warsaw skyline at night',      blurb: 'The capital. Business hub, best transport, widest choice.' },
    { name: 'Kraków',  key: 'krakow',  homes: 121, alt: 'Kraków at night',              blurb: 'Historic, lively and full of tech and creative talent.' },
    { name: 'Wrocław', key: 'wroclaw', homes: 96,  alt: 'Old townhouses in Wrocław',    blurb: 'Green, compact and canal-lined, with a strong IT scene.' },
    { name: 'Poznań',  key: 'poznan',  homes: 84,  alt: 'Poznań old market from above', blurb: 'Compact and well connected, with a big student and business scene.' },
    { name: 'Gdańsk',  key: 'gdansk',  homes: 72,  alt: 'Gdańsk waterfront at night',   blurb: 'Baltic coast living in a historic port city.' },
    { name: 'Gdynia',  key: 'gdynia',  homes: 44,  alt: 'Gdynia at night',              blurb: 'Modern, green and by the sea, part of the Tricity with Gdańsk.' },
    { name: 'Łódź',    key: 'lodz',    homes: 61,  alt: 'Modern architecture in Łódź',  blurb: 'Big-city space at lower prices, with a growing creative scene.' }
  ];

  function renderCityUI() {
    const opts = CITIES.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
    document.getElementById('f-city').innerHTML = '<option value="all">All cities</option>' + opts;
    document.getElementById('c-city').innerHTML = opts + '<option>Not sure yet</option>';
    document.getElementById('footer-cities').innerHTML = CITIES.map(c => `<li><a href="#cities">${c.name}</a></li>`).join('');
    document.querySelector('.tabs').innerHTML = ['all', ...CITIES.map(c => c.name)]
      .map((n, i) => `<button role="tab" aria-selected="${i === 0}" data-city="${n}">${n === 'all' ? 'All' : n}</button>`).join('');

    const wrap = document.getElementById('cities-list');
    wrap.innerHTML = CITIES.map((c, i) => `
      <article class="city${i === 0 ? ' is-active' : ''}" tabindex="0">
        <div class="media"><img data-photo="${c.key}" data-w="1400" alt="${c.alt}"></div>
        <h3 class="city__name">${c.name}</h3>
        <div class="city__panel glass">
          <div><p>${c.blurb}</p><span class="count"><span data-count="${c.homes}">${c.homes}</span> homes</span></div>
          <a class="city__go" href="#homes" data-city="${c.name}" aria-label="Show homes in ${c.name}"><svg viewBox="0 0 24 24"><path d="M7 17L17 7M9 7h8v8"/></svg></a>
        </div>
      </article>`).join('');

    const els = [...wrap.children];
    const activate = i => els.forEach((el, k) => el.classList.toggle('is-active', k === i));
    els.forEach((el, i) => {
      el.addEventListener('mouseenter', () => activate(i));
      el.addEventListener('focusin', () => activate(i));
      el.addEventListener('click', () => activate(i));
    });
    wrap.addEventListener('click', e => {
      const go = e.target.closest('.city__go');
      if (go) setCity(go.dataset.city);
    });
  }
  renderCityUI();

  /* ---------- Currency (illustrative rates) ---------- */
  const RATES = { PLN: 1, EUR: 0.235, USD: 0.27 };
  let currency = 'PLN';
  let mode = 'rent';
  const nice = (v, step) => Math.round(v / step) * step;
  function money(pln, m) {
    const step = m === 'rent' ? 10 : 10000;
    const v = currency === 'PLN' ? pln : nice(pln * RATES[currency], step);
    const n = v.toLocaleString('en-GB');
    if (currency === 'PLN') return `${n} PLN`;
    return currency === 'EUR' ? `€${n}` : `$${n}`;
  }

  /* ---------- Cards ---------- */
  const track = document.getElementById('track');
  let cityFilter = 'all';
  function renderCards() {
    const list = LISTINGS.filter(l => cityFilter === 'all' || l.city === cityFilter);
    track.innerHTML = list.map(l => `
      <article class="card">
        <div class="media"><img data-photo="${l.photo}" data-w="900" alt="${l.title}"></div>
        <span class="card__badge glass">${l.mode === 'rent' ? 'For rent' : 'For sale'}</span>
        <button class="save glass" type="button" aria-pressed="false" aria-label="Save ${l.title}">
          <svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>
        </button>
        <div class="card__panel glass">
          <h3>${l.title}</h3>
          <p class="where">${l.city}</p>
          <div class="card__foot">
            <span class="price" data-pln="${l.pln}" data-mode="${l.mode}"></span>
            <ul class="specs"><li>${l.m2} m²</li><li>${l.beds}</li></ul>
          </div>
        </div>
      </article>`).join('');
    hydrateImages(track);
    collectParallax();
    observeReveals(track);
    updatePrices();
    track.scrollTo({ left: 0 });
  }
  function updatePrices() {
    track.querySelectorAll('.price').forEach(p => {
      const m = p.dataset.mode;
      p.innerHTML = money(+p.dataset.pln, m) + (m === 'rent' ? '<small>/mo</small>' : '');
    });
  }
  track.addEventListener('click', e => {
    const b = e.target.closest('.save');
    if (b) b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true');
  });

  /* tabs (buttons are generated in renderCityUI) */
  function setCity(c) {
    cityFilter = c;
    document.querySelectorAll('.tabs button').forEach(t => t.setAttribute('aria-selected', t.dataset.city === c));
    renderCards();
  }
  document.querySelector('.tabs').addEventListener('click', e => {
    const b = e.target.closest('button');
    if (b) setCity(b.dataset.city);
  });

  /* carousel arrows */
  const step = () => Math.min(420, track.clientWidth * .8);
  document.getElementById('next').addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
  document.getElementById('prev').addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));

  /* ---------- Journal modal ---------- */
  const GUIDES = {
    renting: {
      tag: 'Renting',
      title: "Renting in Poland: the documents you'll need",
      body: [
        "Most landlords in Poland ask for the same core set of documents before signing a lease, whether you're a Polish citizen, an EU national or arriving from further afield.",
        "<h4>Before you view a flat</h4>",
        "A valid ID or passport, and if you're not an EU citizen, proof of legal residence such as a residence card or a valid visa. Some landlords also ask for proof of income, a work contract, or a reference from a previous landlord.",
        "<h4>When you sign</h4>",
        "Polish leases (umowa najmu) are usually signed in person, in Polish, sometimes with an English or Ukrainian translation attached. Expect to pay a deposit equal to one or two months' rent, refundable at the end of the lease if the flat is left in good condition.",
        "<h4>Where Oriel helps</h4>",
        "We prepare a bilingual summary of every lease before you sign, and one of our advisors is on the call or in the room with you, so nothing gets lost in translation."
      ]
    },
    cost: {
      tag: 'Cost of living',
      title: 'What it costs to live in Warsaw, Kraków and Wrocław',
      body: [
        "Rent is the biggest line item for most newcomers, and it varies more between neighbourhoods than between cities. A one-bedroom flat in a central district typically runs 3,000–4,500 PLN a month in Kraków and Wrocław, and 3,800–5,500 PLN in Warsaw.",
        "<h4>Everyday costs</h4>",
        "Utilities for a one-bedroom flat usually add 500–800 PLN a month. A monthly public transport pass costs around 110 PLN in Kraków and Wrocław, and about 120 PLN in Warsaw. Groceries for one person run roughly 700–1,000 PLN a month, depending on how often you eat out.",
        "<h4>What changes between cities</h4>",
        "Warsaw has the highest salaries but also the highest rents, so the gap in real, take-home cost of living is smaller than the headline rent numbers suggest. Kraków and Wrocław are close to each other on almost every measure, with Wrocław slightly cheaper for larger flats."
      ]
    },
    buying: {
      tag: 'Buying',
      title: '5 mistakes first-time buyers make in Poland',
      body: [
        "<h4>1. Skipping the księga wieczysta check</h4>",
        "This is the public land and mortgage register. Always check it before making an offer, it shows the legal owner, any mortgages, and any disputes tied to the property.",
        "<h4>2. Forgetting the extra costs</h4>",
        "Budget an extra 3–6% on top of the price for notary fees, tax (PCC) and, if you use one, agency commission.",
        "<h4>3. Not visiting at different times of day</h4>",
        "Noise, light and parking can look completely different on a weekday morning versus a Saturday night.",
        "<h4>4. Underestimating renovation costs</h4>",
        "Older buildings in city centres are often beautiful and often need new wiring or plumbing. Get a rough estimate before you fall in love with the flat.",
        "<h4>5. Signing the reservation agreement too fast</h4>",
        "It commits you and usually costs you a deposit if you back out. Read it as carefully as the final contract, not as a formality."
      ]
    }
  };

  const guideModal = document.getElementById('guideModal');
  document.querySelectorAll('[data-guide]').forEach(btn => {
    btn.addEventListener('click', () => {
      const g = GUIDES[btn.dataset.guide];
      document.getElementById('guideTag').textContent = g.tag;
      document.getElementById('guideTitle').textContent = g.title;
      document.getElementById('guideBody').innerHTML = g.body.map(b => b.startsWith('<h4') ? b : `<p>${b}</p>`).join('');
      guideModal.showModal();
    });
  });
  document.getElementById('guideClose').addEventListener('click', () => guideModal.close());
  guideModal.addEventListener('click', e => { if (e.target === guideModal) guideModal.close(); });

  /* ---------- Privacy modal ---------- */
  const privacyModal = document.getElementById('privacyModal');
  function openPrivacy() { privacyModal.showModal(); }
  document.getElementById('footerPrivacyLink').addEventListener('click', e => { e.preventDefault(); openPrivacy(); });
  document.getElementById('privacyClose').addEventListener('click', () => privacyModal.close());
  privacyModal.addEventListener('click', e => { if (e.target === privacyModal) privacyModal.close(); });

  /* ---------- Cookie consent ---------- */
  const cookieBanner = document.getElementById('cookieBanner');
  const COOKIE_KEY = 'oriel_cookie_consent'; // 'accepted' | 'declined'
  if (!localStorage.getItem(COOKIE_KEY)) {
    requestAnimationFrame(() => setTimeout(() => cookieBanner.classList.add('is-shown'), 600));
  }
  function setConsent(v) {
    localStorage.setItem(COOKIE_KEY, v);
    cookieBanner.classList.remove('is-shown');
    // Hook your analytics init here, e.g.: if (v === 'accepted') loadAnalytics();
  }
  document.getElementById('cookieAccept').addEventListener('click', () => setConsent('accepted'));
  document.getElementById('cookieDecline').addEventListener('click', () => setConsent('declined'));
  document.getElementById('cookieToPrivacy').addEventListener('click', e => { e.preventDefault(); openPrivacy(); });

  /* ---------- Testimonials carousel ---------- */
  const TESTIMONIALS = [
    { photo: 't1', name: 'Olena K.', where: 'Rented in Warsaw', quote: "We moved from Kyiv with two weeks' notice. Oriel had three real options waiting and handled the whole contract in Ukrainian." },
    { photo: 't2', name: 'Marcin i Ola', where: 'Bought in Wrocław', quote: "No pressure, no hidden fees, and they actually told us when a flat wasn't worth the asking price. That's rare." },
    { photo: 't3', name: 'Daniel R.', where: 'Investor, Gdańsk', quote: 'I invest from abroad, so I needed people I could trust on the ground. Oriel sends photos, numbers and honest opinions, not just listings.' }
  ];
  const testiTrack = document.getElementById('testiTrack');
  testiTrack.innerHTML = TESTIMONIALS.map(t => `
    <blockquote class="testi">
      <div class="media"><img data-photo="${t.photo}" data-w="700" alt="Apartment found through Oriel, ${t.where}"></div>
      <div class="testi__panel glass">
        <p>“${t.quote}”</p>
        <footer><span class="testi__name">${t.name}</span><span class="testi__where">${t.where}</span></footer>
      </div>
    </blockquote>`).join('');
  hydrateImages(testiTrack);
  observeReveals(testiTrack);
  const testiStep = () => Math.min(440, testiTrack.clientWidth * .85);
  document.getElementById('testiNext').addEventListener('click', () => testiTrack.scrollBy({ left: testiStep(), behavior: 'smooth' }));
  document.getElementById('testiPrev').addEventListener('click', () => testiTrack.scrollBy({ left: -testiStep(), behavior: 'smooth' }));

  /* ---------- Search ---------- */
  const budget = document.getElementById('f-budget');
  const BUDGETS = {
    rent: [[0, 'Any budget'], [3500, 'Up to 3,500 PLN'], [5000, 'Up to 5,000 PLN'], [7000, 'Up to 7,000 PLN']],
    buy:  [[0, 'Any budget'], [800000, 'Up to 800,000 PLN'], [1000000, 'Up to 1,000,000 PLN'], [1500000, 'Up to 1,500,000 PLN']]
  };
  function renderBudget() {
    budget.innerHTML = BUDGETS[mode].map(([v, label]) => {
      const text = v === 0 ? label : `Up to ${money(v, mode)}`;
      return `<option value="${v}">${text}</option>`;
    }).join('');
  }
  document.querySelectorAll('.seg button').forEach(b => b.addEventListener('click', () => {
    mode = b.dataset.mode;
    document.querySelectorAll('.seg button').forEach(x => x.setAttribute('aria-pressed', x === b));
    renderBudget();
  }));
  document.getElementById('search').addEventListener('submit', e => {
    e.preventDefault();
    setCity(document.getElementById('f-city').value);
    document.getElementById('homes').scrollIntoView({ behavior: 'smooth' });
  });

  /* currency switch */
  document.querySelectorAll('.cur button').forEach(b => b.addEventListener('click', () => {
    currency = b.dataset.cur;
    document.querySelectorAll('.cur button').forEach(x => x.setAttribute('aria-pressed', x === b));
    updatePrices();
    renderBudget();
  }));

  /* mobile menu */
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('menu');
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
  });
  menu.addEventListener('click', e => { if (e.target.closest('a')) { menu.classList.remove('is-open'); toggle.setAttribute('aria-expanded', false); } });

  /* lead form -> Google Sheet via Apps Script Web App
     1. Create a Google Sheet, then Extensions -> Apps Script, paste the doPost() script
        from the setup notes, and deploy it as a Web App ("Anyone" can access).
     2. Paste the deployment URL below. Leave empty to keep front-end-only behaviour. */
  const LEAD_WEBHOOK_URL = ''; // TODO: paste your Google Apps Script Web App URL here
  document.getElementById('lead').addEventListener('submit', e => {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    const data = {
      name: document.getElementById('c-name').value,
      email: document.getElementById('c-email').value,
      city: document.getElementById('c-city').value,
      message: document.getElementById('c-msg').value,
      page: location.href,
      submittedAt: new Date().toISOString()
    };
    const done = () => { btn.textContent = 'Request sent'; btn.disabled = true; };
    if (!LEAD_WEBHOOK_URL) { done(); return; } // no webhook configured yet
    btn.disabled = true; btn.textContent = 'Sending…';
    fetch(LEAD_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors', // Apps Script Web Apps don't return CORS headers; response is opaque
      headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // avoids a CORS preflight
      body: JSON.stringify(data)
    }).then(done).catch(() => { btn.disabled = false; btn.textContent = 'Try again'; });
  });

  /* count-up numbers */
  function countUp(el, delay) {
    const n = +el.dataset.count;
    const dur = 1500;
    setTimeout(() => {
      const t0 = performance.now();
      const tick = t => {
        const k = Math.min(1, (t - t0) / dur);
        el.textContent = Math.round(n * (1 - Math.pow(1 - k, 3))).toLocaleString('en-GB');
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
  }
  const countEls = document.querySelectorAll('[data-count]');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const countIO = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) { countUp(en.target, en.target.closest('.hero') ? 700 : 500); countIO.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    countEls.forEach(el => { el.textContent = '0'; countIO.observe(el); });
  }

