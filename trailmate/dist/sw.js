// Network-first with cache fallback so previously viewed screens/images still open offline.
const C='qv-v1';self.addEventListener('install',()=>self.skipWaiting());self.addEventListener('activate',e=>e.waitUntil(clients.claim()))
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put(e.request,c)).catch(()=>{});return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('/'))))})
