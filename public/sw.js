const CACHE_NAME = "recruta-industria-v1";
const urlsToCache = [
  "/",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
];

// Instalar Service Worker e cachear recursos
self.addEventListener("install", (event) => {
  console.log("🔧 Service Worker: Installing...");
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("📦 Service Worker: Caching app shell");
      return cache.addAll(urlsToCache).catch((error) => {
        console.log("⚠️ Cache add failed:", error);
        // Continuar mesmo se falhar adicionar URLs
      });
    })
  );
  
  self.skipWaiting();
});

// Ativar Service Worker e limpar caches antigos
self.addEventListener("activate", (event) => {
  console.log("✅ Service Worker: Activating...");
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("🗑️ Service Worker: Deleting old cache", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  self.clients.claim();
});

// Interceptar requisições
self.addEventListener("fetch", (event) => {
  // Estratégia: Cache first, network fallback
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // Se encontrou no cache, retorna
        if (response) {
          return response;
        }

        return fetch(event.request).then((response) => {
          // Se não é uma resposta válida, retorna
          if (!response || response.status !== 200 || response.type === "error") {
            return response;
          }

          // Cachear a resposta
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      })
      .catch(() => {
        // Network request falhou, retornar página em cache ou erro
        console.log("📡 Network request falhou para:", event.request.url);
        // Poderia retornar uma página offline aqui
      })
  );
});
