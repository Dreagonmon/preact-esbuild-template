// @ts-check

/// <reference no-default-lib="true"/>
/// <reference lib="ESNext" />
/// <reference lib="webworker" />
const self = /** @type {ServiceWorkerGlobalScope} */ (/** @type {unknown} */ (globalThis.self));

import { StaleWhileRevalidate } from "workbox-strategies";
import { registerRoute, Route } from "workbox-routing";

const cachedRoute = new Route(({ url, sameOrigin }) => {
  // console.log(url, sameOrigin);
  return sameOrigin && !([ "127.0.0.1", "localhost" ].includes(url.hostname));
}, new StaleWhileRevalidate({
  cacheName: "cached-route"
}));

registerRoute(cachedRoute);

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
  console.log("Service Worker Actived.")
});
