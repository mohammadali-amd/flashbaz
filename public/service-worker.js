const CACHE_NAME = 'flashbaz';
const urlsToCache = [
   '/',
   '/offline.html',
   '/icons/icon-48x48.png',
   '/icons/icon-192x192.png',
];

self.addEventListener('install', event => {
   event.waitUntil(
      caches.open(CACHE_NAME)
         .then(cache => {
            return cache.addAll(urlsToCache);
         })
   );
});

self.addEventListener('fetch', event => {
   event.respondWith(
      caches.match(event.request)
         .then(response => {
            return response || fetch(event.request).catch(() => caches.match('/offline.html'));
         })
   );
});
