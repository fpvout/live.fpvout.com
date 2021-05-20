/// <reference lib="WebWorker" />
declare const self: ServiceWorkerGlobalScope;

import {version} from '~/../package.json';

const CACHE_NAME = 'live.fpvout.com';
const CACHE_VERSION = version;
const urlsToCache = [
  '/',
  '/8ce9f1aeb7bb35922c23.ttf',
  '/ui.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(`${CACHE_VERSION}-${CACHE_NAME}`)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys
          .filter((key) => key.indexOf(CACHE_VERSION) !== 0)
          .map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener("fetch", function (event) {
  const request = event.request;

  if (request.method !== "GET") {
    event.respondWith(fetch(request));
    return;
  }

  if (
    request.headers.get("Accept")?.indexOf("text/html") !== -1 &&
    request.url.startsWith(this.origin)
  ) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_VERSION + CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((response) => response || caches.match("/"))) as Promise<Response>
    );
    return;
  } else {
    event.respondWith(
      caches.match(request)
        .then((response) => response || fetch(request) as Promise<Response>)
    );
  }
});