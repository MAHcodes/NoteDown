/**
 * NoteDown is an open source note-taking app to capture your ideas with an easy and fast way that supports formatting using Markdown syntax
 * Copyright (C) 2023 MAHcodes
 *
 * This file is part of NoteDown.
 *
 * NoteDown is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * NoteDown is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with NoteDown. If not, see <https://www.gnu.org/licenses/>.
 *
 * Contact information:
 * mahdotcodes@gmail.com
 */

const cacheName = 'news-v1';
const staticAssets = [
  './',
  './index.html',
  './styles/styles.css',
  './main.js',
  './icons.js',
  './styles/Poppins/Poppins-Light.ttf',
  './styles/Poppins/Poppins-Regular.ttf',
  './styles/css/line-awesome.min.css',
  './js/marked.min.js'
];

self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});

self.addEventListener('activate', e => {
  self.clients.claim();
});

self.addEventListener('fetch', async e => {
  const req = e.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(networkAndCache(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}