let cacheName = 'cache-v1';

self.addEventListener('install', (e) => {
  let cache = caches.open(cacheName).then((c) => {
    c.addAll([
      'https://mikael326.github.io/Taxas-MercadoPago/',
      'https://mikael326.github.io/Taxas-MercadoPago/index.html',
      'https://mikael326.github.io/Taxas-MercadoPago/style.css',
      'https://mikael326.github.io/Taxas-MercadoPago/app.js',
      'https://mikael326.github.io/Taxas-MercadoPago/manifest.json',
      'https://mikael326.github.io/Taxas-MercadoPago/icon.png',
      'https://mikael326.github.io/Taxas-MercadoPago/icon-192x192.png',
      'https://mikael326.github.io/Taxas-MercadoPago/icon-256x256.png',
      'https://mikael326.github.io/Taxas-MercadoPago/icon-384x384.png',
      'https://mikael326.github.io/Taxas-MercadoPago/icon-512x512.png',
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
            return caches.match('https://mikael326.github.io/Taxas-MercadoPago/index.html');
          });
      })
  );
});