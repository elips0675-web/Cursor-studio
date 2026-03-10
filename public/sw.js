const CACHE_NAME = 'swiftmatch-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/manifest.json',
  '/favicon.ico'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Пропускаем запросы к API и Firebase
  if (event.request.url.includes('firestore.googleapis.com') || 
      event.request.url.includes('googleai')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Обработка Push-уведомлений (заглушка для Geo-Push)
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'SwiftMatch';
  const options = {
    body: data.body || 'У вас новое событие!',
    icon: 'https://picsum.photos/seed/swiftmatch_icon/192/192',
    badge: 'https://picsum.photos/seed/swiftmatch_icon/192/192',
    data: data.url || '/'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data)
  );
});