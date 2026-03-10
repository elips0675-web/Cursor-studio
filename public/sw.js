const CACHE_NAME = 'swiftmatch-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Poppins:weight@800&family=Quicksand:wght@500;600;700&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});