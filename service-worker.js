// We can't hardcode an absolute path if we want this to work in development and production, because this page will be hosted at the github.io/projectname subroute. Instead, we'll use relative paths.
const APP_PREFIX = 'FoodFest-';     
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;



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






self.addEventListener('install', function (e) {
    e.waitUntil(                                         // ewait make sure the service worker doesn't move on from the installing phase until it fininshes all of it's code
      caches.open(CACHE_NAME).then(function (cache) {  // caches.open to find a specific name/ then add every file in that array to the cache
        console.log('installing cache : ' + CACHE_NAME)
        return cache.addAll(FILES_TO_CACHE)
      })
    )
  })