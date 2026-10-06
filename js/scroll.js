  /* scroll-linked motion */
  const heroEl = document.querySelector('.hero');
  const footerEl = document.querySelector('.footer');
  const navEl = document.querySelector('.nav');
  const barEl = document.querySelector('.progress');
  let pxEls = [];

  function collectParallax() {
    pxEls = [...document.querySelectorAll('.card .media img, .city .media img, .how .media img, .testi .media img')].map(img => ({
      img,
      box: img.closest('.card, .city, .how, .testi'),
      amp: img.closest('.how') ? 70 : img.closest('.city') ? 42 : 26
    }));
    pxEls.forEach(o => o.img.classList.add('px'));
  }

  /* hero video scrub + overlay + sheet cover */
  const scrubOn = document.documentElement.classList.contains('scrub');
  const pinEl = heroEl.querySelector('.hero__pin');
  const vids = [...heroEl.querySelectorAll('.media video')];
  const clamp01 = x => Math.min(1, Math.max(0, x));
  const smooth = x => x * x * (3 - 2 * x);
  let vid = null, vP = 0, vCurP = 0, vRun = false;
  const pickVid = () => vids.find(v => v.getClientRects().length) || vids[0];

  vids.forEach(v => { v.muted = true; v.defaultMuted = true; v.volume = 0; });
  if (!scrubOn) vids.forEach(v => { v.autoplay = true; const r = v.play(); if (r) r.catch(() => {}); });
  if (scrubOn) {
    vids.forEach(v => { v.removeAttribute('autoplay'); v.loop = false; v.pause(); v.preload = 'auto'; v.load(); v.addEventListener('loadedmetadata', kickScrub); });
    // iOS: a muted play/pause on first touch unlocks frame rendering for currentTime seeks
    addEventListener('touchstart', () => { const v = pickVid(); const r = v && v.play(); if (r) r.then(() => v.pause()).catch(() => {}); }, { once: true, passive: true });
  }

  function scrubTick() {
    vRun = false;
    const v = vid;
    if (!v || !(v.duration > 0)) return;
    vCurP += (vP - vCurP) * .2;                       // ease toward the scroll position
    if (Math.abs(vP - vCurP) < .0008) vCurP = vP;
    const t = vCurP * (v.duration - .05);
    if (!v.seeking && Math.abs(v.currentTime - t) > .012) v.currentTime = t;
    if (vCurP !== vP || v.seeking) { vRun = true; requestAnimationFrame(scrubTick); }
  }
  function kickScrub() { if (!vRun) { vRun = true; requestAnimationFrame(scrubTick); } }

  function scrubFrame() {
    const H = pinEl.offsetHeight;
    const scrubLen = Math.max(1, heroEl.offsetHeight - H * 2);   // stage minus pin minus cover phase
    const st = -heroEl.getBoundingClientRect().top;
    const p = clamp01(st / scrubLen);                            // video progress 0..1
    const cov = clamp01((st - scrubLen) / H);                    // section 2 cover progress 0..1
    const hp = clamp01(st / (H * .7));                           // first-screen content leaving
    const op = smooth(clamp01((p - .32) / .16));                 // overlay text appears mid-scroll
    const set = (k, v) => heroEl.style.setProperty(k, v.toFixed(4));
    set('--hp', hp); set('--op', op); set('--cov', cov); set('--dim', op * .28 + cov * .55);
    heroEl.classList.toggle('is-away', hp >= .8);
    vid = pickVid(); vP = p; kickScrub();
  }

  const lightEls = [...document.querySelectorAll('.light')];
  function navTone() {
    const ny = 44;
    navEl.classList.toggle('on-light', lightEls.some(el => { const r = el.getBoundingClientRect(); return r.top <= ny && r.bottom >= ny; }));
  }
  let lastY = 0, ticking = false;
  function frame() {
    ticking = false;
    const y = window.scrollY, vh = window.innerHeight;
    const max = document.documentElement.scrollHeight - vh;

    barEl.style.setProperty('--sp', max > 0 ? (y / max).toFixed(4) : 0);
    if (scrubOn) scrubFrame();
    else heroEl.style.setProperty('--hp', Math.min(1, Math.max(0, y / heroEl.offsetHeight)).toFixed(4));

    navEl.classList.toggle('is-scrolled', y > 40);
    navTone();
    const d = y - lastY;
    if (y > 240 && d > 6 && !menu.classList.contains('is-open')) navEl.classList.add('is-hidden');
    else if (d < -6 || y < 240) navEl.classList.remove('is-hidden');
    lastY = y;

    const fr = footerEl.getBoundingClientRect();
    footerEl.style.setProperty('--fp', Math.min(1, Math.max(0, (vh - fr.top) / (fr.height + vh * .1))).toFixed(4));

    pxEls.forEach(o => {
      const r = o.box.getBoundingClientRect();
      if (r.bottom < -120 || r.top > vh + 120) return;
      const p = ((r.top + r.height / 2) - vh / 2) / (vh / 2 + r.height / 2);
      o.img.style.setProperty('--py', (-p * o.amp).toFixed(1) + 'px');
    });
  }
  function requestFrame() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }

  /* init */
  hydrateImages(document);
  renderBudget();
  renderCards();
  observeReveals(document);
  if (reduceMotion) { window.addEventListener('scroll', navTone, { passive: true }); navTone(); }
  if (!reduceMotion) {
    window.addEventListener('scroll', requestFrame, { passive: true });
    window.addEventListener('resize', requestFrame);
    frame();
  }
