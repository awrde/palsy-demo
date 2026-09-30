// Offline cache for the app shell, WASM runtime and model (same-origin GETs,
// plus the pinned remote model URL). Network-first for navigations so a new
// version is picked up; cache-first for immutable assets.
// v3: the 3D head became models/head.glb (the old facecap.glb copy leaves the cache); v4: head.glb re-exported
// (baked shading, full teeth); v5: demo clips re-rendered under the same names (lips follow, level head, steps 6-16);
// v6: platysma and zyg-minor re-rendered (the base of the neck stays when the head turns).
// v7: eye-open (fixing fingers at the inner corner) and frontalis (arms as at 1:14) re-rendered.
// v8: eye-open again (the fixing middle finger below the eye, the index above it).
// v9: eye-open inner-out: the stretching middle finger starts below the eye too.
// v10: eye-open inner-out: the stretching fingers close onto the eye line while sliding out (2:37-2:43).
// v11: 14 stretch clips re-matched to the source motion frame by frame.
// v12: four hand poses (zyg-major palm, llsan fist x2, depressors claw, platysma stacked palms) re-rendered.
// Bump when a public/ file keeps its name but changes: cached files are served cache-first.
const CACHE = 'fpc-v12';
const MODEL_HOST = 'storage.googleapis.com';

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(['./', './index.html', './manifest.webmanifest', './icons/icon.svg', './icons/icon-192.png', './icons/apple-touch-icon.png'])));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  if (!sameOrigin && url.host !== MODEL_HOST) return;
  // The intro page (intro/) is a separate static page: never cache it, and never let its navigation replace index.html.
  if (sameOrigin && url.pathname.includes('/intro/')) return;
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match('./index.html')),
    );
    return;
  }
  e.respondWith(
    caches.match(req).then(
      (hit) =>
        hit ||
        fetch(req).then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        }),
    ),
  );
});
