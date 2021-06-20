function initFCM() {
    var firebaseConfig = {
        apiKey: "AIzaSyCljKb38Agr-kGHx0IVPh8ehWKtPIfa0Mc",
        authDomain: "automobile-assistance-fff37.firebaseapp.com",
        projectId: "automobile-assistance-fff37",
        storageBucket: "automobile-assistance-fff37.appspot.com",
        messagingSenderId: "584806673982",
        appId: "1:584806673982:web:ed9c6a86e460edc1d32b6f",
        measurementId: "G-H7XTTSZF05"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const apiKey = 'BI9Zkeiev6aJauZ3f4pu5iGnZWMozajUSJYkcxAa-SZQc0D6o0RjzfoLm43380LFmf0m70_7obRn5O08rIcsny8'

    const messaging = firebase.messaging();
    messaging.getToken({ vapidKey: apiKey }).then((currentToken) => {
        if (currentToken) {
            console.log('FCM', currentToken);
        }
    }).catch((err) => {
        console.log('FCM ERROR', 'An error occurred while retrieving token. ', err);
    });


    messaging.onMessage((payload) => {
        console.log('[firebase-messaging - Foreground]', payload);
    });
}