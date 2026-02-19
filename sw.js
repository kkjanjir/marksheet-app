// sw.js — Service Worker for SBS Marksheet App
// BUG FIX: This code was incorrectly merged inside app.js before

const CACHE_NAME = 'sbs-marksheet-v4';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './logo.png',
];

// Install — cache essential files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS.filter(a => a !== './logo.png'))) // logo optional
      .then(() => self.skipWaiting())
      .catch(err => console.warn('SW install partial failure:', err))
  );
});

// Activate — remove old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch — cache first, then network; fallback to index.html for navigation
self.addEventListener('fetch', event => {
  // Skip non-GET and cross-origin Firebase requests
  if (event.request.method !== 'GET') return;
  if (event.request.url.includes('firestore.googleapis.com')) return;
  if (event.request.url.includes('firebase')) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Only cache valid same-origin responses
        if (!response || response.status !== 200 || response.type === 'opaque') return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      }).catch(() => {
        // Offline fallback for page navigation
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
