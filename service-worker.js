// We can't hardcode an absolute path if we want this to work in development and production, because this page will be hosted at the github.io/projectname subroute. Instead, we'll use relative paths.
const APP_PREFIX = 'FoodFest-';     
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION; // global consant to keep track of which arrays to use



// Before we add code to the callback function, we need to define which files we'd like to cache to the top of the service-worker.js file.
const FILES_TO_CACHE = [
    "./index.html",
    "./events.html",
    "./tickets.html",
    "./schedule.html",
    "./assets/css/style.css",
    "./assets/css/bootstrap.css",
    "./assets/css/tickets.css",
    "./dist/app.bundle.js",
    "./dist/events.bundle.js",
    "./dist/tickets.bundle.js",
    "./dist/schedule.bundle.js"
  ];



// Respond with cached resources
self.addEventListener('fetch', function (e) {
  console.log('fetch request : ' + e.request.url)
  e.respondWith(
    caches.match(e.request).then(function (request) {  // .match() to determine if the resource already exists in caches. If it does, we'll log the URL to the console with a message and then return the cached r
      if (request) { // if cache is available, respond with cache
        console.log('responding with cache : ' + e.request.url)
        return request
      } else {       // if there are no cache, try fetching request
        console.log('file is not cached, fetching : ' + e.request.url)
        return fetch(e.request)
      }

      // You can omit if/else for console.log & put one line below like this too.
      // return request || fetch(e.request)
    })
  )
})


self.addEventListener('install', function (e) {
    e.waitUntil(                                         // ewait make sure the service worker doesn't move on from the installing phase until it fininshes all of it's code
      caches
      .open(CACHE_NAME)
      .then(function (cache) {  // caches.open to find a specific name/ then add every file in that array to the cache
        console.log('installing cache : ' + CACHE_NAME)
        return cache.addAll(FILES_TO_CACHE)
      })
    )
  })


  self.addEventListener('activate', function(e) {  //this step, we clear out all the old data and in the same staep tell the service worker how to manage the caches
    e.waitUntil(
      caches.keys().then(function(keyList) {
        // `keyList` contains all cache names under your username.github.io
        // filter out ones that has this app prefix to create keeplist
        let cacheKeeplist = keyList.filter(function(key) {
          return key.indexOf(APP_PREFIX);
        });
        cacheKeeplist.push(CACHE_NAME);    // cacheKeeplist is an array of URL with the app prefix/ so current cache adds to the keeplist in the activate event listener
  
        return Promise.all(
          keyList.map(function(key, i) {
            if (cacheKeeplist.indexOf(key) === -1) {
              console.log('deleting cache : ' + keyList[i]);
              return caches.delete(keyList[i]);
            }
          })
        );
      })
    );
  });