/* OW Lima SW Premium */
const VER='ow-lima-premium-v1';
const ASSETS=['/','/index.html',
  'https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Mono:wght@300;400;500&family=Cabinet+Grotesk:wght@300;400;500;700&display=swap'
];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(VER).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VER).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const url=new URL(e.request.url);
  if(url.hostname.includes('open-meteo')||url.hostname.includes('marine-api')){
    e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>new Response(JSON.stringify({error:'offline'}),{headers:{'Content-Type':'application/json'}})));
    return;
  }
  e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{
    if(r.ok){const cl=r.clone();caches.open(VER).then(cx=>cx.put(e.request,cl));}
    return r;
  })));
});
