  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

  const firebaseConfig =  {
    apiKey: "AIzaSyCwQfdmvUyJiyGo3nHHRrwX00CWnaOf3Oo",
    authDomain: "cashflowmate-10b84.firebaseapp.com",
    databaseURL: "https://cashflowmate-10b84-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "cashflowmate-10b84",
    storageBucket: "cashflowmate-10b84.appspot.com",
    messagingSenderId: "947054792095",
    appId: "1:947054792095:web:41089e6e130d68e14141aa",
    measurementId: "G-HTFBT34F33"
  };


  const app = initializeApp(firebaseConfig); 
  const auth = getAuth(app);

  // Register form submission event
  document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Retrieve user input values
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Create user with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Registration successful, do something (e.g., redirect to another page)
        console.log("Registration successful:", userCredential);
        window.location.href = "../home.html";

      })
      .catch((error) => {
        // Registration failed, handle error
        console.log("Registration failed:", error);
     
      });
  });