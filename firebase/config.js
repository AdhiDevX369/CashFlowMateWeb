  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-analytics.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
  import { getStorage } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-storage.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js";
  import { getMessaging } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-messaging.js";
  import { getDatabase } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js";

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCwQfdmvUyJiyGo3nHHRrwX00CWnaOf3Oo",
    authDomain: "cashflowmate-10b84.firebaseapp.com",
    projectId: "cashflowmate-10b84",
    storageBucket: "cashflowmate-10b84.appspot.com",
    messagingSenderId: "947054792095",
    appId: "1:947054792095:web:41089e6e130d68e14141aa",
    measurementId: "G-HTFBT34F33"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const storage = getStorage(app);
  const firestore = getFirestore(app);
  const messaging = getMessaging(app);
  const database = getDatabase(app);
