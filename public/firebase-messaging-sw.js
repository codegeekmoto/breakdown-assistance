importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js');
 
var firebaseConfig = {
    apiKey: "AIzaSyCljKb38Agr-kGHx0IVPh8ehWKtPIfa0Mc",
    authDomain: "automobile-assistance-fff37.firebaseapp.com",
    projectId: "automobile-assistance-fff37",
    storageBucket: "automobile-assistance-fff37.appspot.com",
    messagingSenderId: "584806673982",
    appId: "1:584806673982:web:ed9c6a86e460edc1d32b6f",
    measurementId: "G-H7XTTSZF05"
};

self.addEventListener('notificationclick', function (event) {
    console.debug('SW notification click event', event)
    const url = '/'
    event.waitUntil(
      clients.matchAll({type: 'window'}).then( windowClients => {
          // Check if there is already a window/tab open with the target URL
          for (var i = 0; i < windowClients.length; i++) {
              var client = windowClients[i];
              // If so, just focus it.
              if (client.url === url && 'focus' in client) {
                  return client.focus();
              }
          }
          // If not, then open the target URL in a new window/tab.
          if (clients.openWindow) {
              return clients.openWindow(url);
          }
      })
  );
})

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

console.log('messaging', messaging);

messaging.onBackgroundMessage(function(payload) {
    //console.log('[firebase-messaging - Service Worker Background] ', payload);
    // self.registration.showNotification(payload.notification.title, {
    //     body: payload.notification.body,
    //     icon: '/image/icon.png',
    //     actions: [{action: "/", title: "Read Now"}]
    // });
});