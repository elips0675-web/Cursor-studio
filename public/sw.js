// A basic service worker to make the app installable
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  // We don't need to cache anything for the install prompt to work.
});

self.addEventListener('fetch', (event) => {
  // An empty fetch handler is sufficient to make the app installable.
  // More complex caching strategies can be added later.
  event.respondWith(fetch(event.request));
});
