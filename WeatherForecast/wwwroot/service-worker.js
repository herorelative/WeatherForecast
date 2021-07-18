const OFFLINE_VERSION = 1;
const CACHE_PREFIX = 'offline';
const CACHE_NAME = `${CACHE_PREFIX}${OFFLINE_VERSION}`;
const OFFLINE_URL = 'offline.html';

self.addEventListener("install", event => event.waitUntil(onInstall(event)));

async function onInstall(event) {
    console.info('Service worker: Install');

    const cache = await caches.open(CACHE_NAME);

    await cache.add(new Request(OFFLINE_URL));
}

self.addEventListener('activate', event => event.waitUntil(onActivate(event)));

async function onActivate(event) {
    console.info('Service worker: Activate');

    const cacheKeys = await caches.keys();

    await Promise.all(cacheKeys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map(key => caches.delete(key)));
}

self.addEventListener('fetch', event => event.waitUntil(onFetch(event)));

async function onFetch(event) {
    console.info('Service worker: Fetch');

    if (event.request.method === 'GET') {
        try {
            return await fetch(event.request);
        } catch (error) {
            const cache = await caches.open(CACHE_NAME);

            return await cahce.match(OFFLINE_URL);
        }
    }
}