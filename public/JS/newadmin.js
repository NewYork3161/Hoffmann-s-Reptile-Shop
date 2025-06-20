import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC07cdVSDMP82b-ubJuRsZgJ1_Vot_hEzw",
  authDomain: "hoffmanns-reptile.firebaseapp.com",
  projectId: "hoffmanns-reptile",
  storageBucket: "hoffmanns-reptile.firebasestorage.app",
  messagingSenderId: "12778645120",
  appId: "1:12778645120:web:d43055c4353b7c44c06865"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Handle Admin Sign-Up
const registerForm = document.getElementById("registerAdminForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const firstName = e.target.firstName.value.trim();
    const lastName = e.target.lastName.value.trim();
    const phone = e.target.phone.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "hoffmanns_reptile_admin", user.uid), {
        Fname: firstName,
        Lname: lastName,
        phone: phone,
        email: email
      });

      alert("✅ Admin registered successfully!");
      e.target.reset();
    } catch (error) {
      console.error("Registration Error:", error.message);
      alert("❌ " + error.message);
    }
  });
}

// Handle Admin Sign-In
const loginForm = document.getElementById("loginAdminForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = e.target.loginEmail.value.trim();
    const password = e.target.loginPassword.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("✅ Admin signed in!");
      // Redirect or show admin content if needed
    } catch (error) {
      console.error("Login Error:", error.message);
      alert("❌ " + error.message);
    }
  });
}
