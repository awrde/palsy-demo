// Offline cache for the app shell, WASM runtime and model (same-origin GETs,
// plus the pinned remote model URL). Network-first for navigations so a new
// version is picked up; cache-first for immutable assets.
// v3: the 3D head became models/head.glb (the old facecap.glb copy leaves the cache); v4: head.glb re-exported
// (baked shading, full teeth); v5: demo clips re-rendered under the same names (lips follow, level head, steps 6-16).
// Bump when a public/ file keeps its name but changes: cached files are served cache-first.
const CACHE = 'fpc-v5';
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
