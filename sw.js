const VER = 'ow-lima-v2';
const STATIC = ['/', '/index.html',
  'https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=DM+Sans:wght@300;400;500&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VER).then(c => c.addAll(STATIC)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VER).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // APIs: network-first, no cache
  if (url.hostname.includes('open-meteo') || url.hostname.includes('marine-api')) {
    e.respondWith(
      fetch(e.request).catch(() =>
        new Response(JSON.stringify({error:'offline', message:'Sin conexión. Datos no disponibles.'}),
          {headers:{'Content-Type':'application/json'}})
      )
    );
    return;
  }
  // Static: cache-first
  e.respondWith(
    caches.match(e.request).then(cached => cached ||
      fetch(e.request).then(res => {
        if (res.ok && res.type !== 'opaque') {
          const clone = res.clone();
          caches.open(VER).then(c => c.put(e.request, clone));
        }
        return res;
      })
    )
  );
});
