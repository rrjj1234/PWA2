const CACHE_NAME = "freshdrop-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/app.js",
  "/icon-192.png"
];

// INSTALL
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Caching files...");
        return cache.addAll(urlsToCache);
      })
  );
});

// ACTIVATE
self.addEventListener("activate", event => {
  console.log("Service Worker Activated");
});

// FETCH (Offline support)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});