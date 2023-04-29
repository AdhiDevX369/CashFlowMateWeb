import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
export const firebaseConfig = {
    apiKey: "AIzaSyCwQfdmvUyJiyGo3nHHRrwX00CWnaOf3Oo",
    authDomain: "cashflowmate-10b84.firebaseapp.com",
    projectId: "cashflowmate-10b84",
    storageBucket: "cashflowmate-10b84.appspot.com",
    messagingSenderId: "947054792095",
    appId: "1:947054792095:web:41089e6e130d68e14141aa",
    measurementId: "G-HTFBT34F33"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginForm = document.getElementById('loginform');
const loginButton = document.getElementById('loginbtn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = usernameInput.value;
  const password = passwordInput.value;

  signInWithEmailAndPassword(auth, username, password)
    .then((user) => {
      // User is signed in
      console.log('User signed in:', user);
      // Redirect to the home page
      window.location.href = '../home.html';
    })
    .catch((error) => {
      // Handle errors
      console.error('Sign-in error:', error);
      alert('Sign-in error. Please try again.');
    });
});
