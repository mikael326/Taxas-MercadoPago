let cacheName = 'cache-v1';

self.addEventListener('install', (e) => {
  let cache = caches.open(cacheName).then((c) => {
    c.addAll([
      '/Taxas-MercadoPago/',
      '/Taxas-MercadoPago/index.html',
      '/Taxas-MercadoPago/style.css',
      '/Taxas-MercadoPago/app.js',
      '/Taxas-MercadoPago/manifest.json',
      '/Taxas-MercadoPago/icon.png',
      '/Taxas-MercadoPago/icon-192x192.png',
      '/Taxas-MercadoPago/icon-256x256.png',
      '/Taxas-MercadoPago/icon-384x384.png',
      '/Taxas-MercadoPago/icon-512x512.png',
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
      'https://cdn.jsdelivr.net/npm/decimal.js@10.3.1/decimal.min.js'
    ]);
  });

  e.waitUntil(cache);
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request)
          .then(function(response) {
            return caches.open(cacheName)
              .then(function(cache) {
                cache.put(event.request, response.clone());
                return response;
              });
          })
          .catch(function() {
            return caches.match('/index.html');
          });
      })
  );
});