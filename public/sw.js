// ── CETI DARIANA · Service Worker ──
const CACHE_NAME = 'ceti-dariana-v4'; // ← versão incrementada para forçar atualização

const OFFLINE_ASSETS = [
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  // index.html propositalmente FORA do cache
  // para garantir que todos sempre peguem a versão mais recente
];

// Instala e faz cache dos assets estáticos (sem index.html)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(OFFLINE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Remove caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Estratégia:
//   - index.html → SEMPRE busca da rede (nunca cache)
//   - Firebase API → NUNCA interceptar (deixa passar direto)
//   - Outros assets → Network first, fallback para cache
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Nunca interceptar chamadas do Firebase
  if (
    url.hostname.includes('firebaseio.com') ||
    url.hostname.includes('googleapis.com') ||
    url.hostname.includes('firebaseapp.com') ||
    url.hostname.includes('gstatic.com')
  ) {
    return; // deixa o browser resolver normalmente
  }

  // index.html: sempre da rede, nunca do cache
  if (url.pathname === '/' || url.pathname === '/index.html') {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Outros assets estáticos: Network first, fallback cache
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
