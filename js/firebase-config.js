// Firebase Configuration and Initialization
const firebaseConfig = {
    apiKey: "AIzaSyAmMqPf4PPugR7GXgaI47Uc_uJTdFeyo1M",
    authDomain: "sesa-smankalisat.firebaseapp.com",
    databaseURL: "https://sesa-smankalisat-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sesa-smankalisat",
    storageBucket: "sesa-smankalisat.firebasestorage.app",
    messagingSenderId: "788839796720",
    appId: "1:788839796720:web:d2bcf4690d8364deb69735"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

console.log('Firebase initialized successfully');