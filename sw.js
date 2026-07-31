var CACHE_VERSION="eigyocal-v8";
var SHELL=["./","./index.html","./manifest.webmanifest"];
self.addEventListener("install",function(e){self.skipWaiting();e.waitUntil(caches.open(CACHE_VERSION).then(function(c){return c.addAll(SHELL);}).catch(function(){}));});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE_VERSION;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener("fetch",function(e){
  if(e.request.method!=="GET")return;
  if(e.request.mode==="navigate"||e.request.url.indexOf("index.html")>=0){
    e.respondWith(fetch(e.request).then(function(r){var cp=r.clone();caches.open(CACHE_VERSION).then(function(c){c.put(e.request,cp);});return r;}).catch(function(){return caches.match(e.request).then(function(m){return m||caches.match("./index.html");});}));
    return;
  }
  e.respondWith(caches.match(e.request).then(function(m){return m||fetch(e.request);}));
});
