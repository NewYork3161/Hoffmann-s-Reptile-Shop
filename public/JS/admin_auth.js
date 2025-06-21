// admin_auth.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAcQ_874l2xxBLHKazynoCN_g6l3zFzpQU",
  authDomain: "splat-37995.firebaseapp.com",
  projectId: "splat-37995",
  storageBucket: "splat-37995.appspot.com",
  messagingSenderId: "687156095255",
  appId: "1:687156095255:web:1cd7aa1e72cb91a0d361e0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Admin Registration Form
const registerForm = document.getElementById("admin-register-form");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const firstName = document.getElementById("firstName")?.value.trim();
    const lastName = document.getElementById("lastName")?.value.trim();
    const phone = document.getElementById("phoneNumber")?.value.trim();
    const email = document.getElementById("registerEmail")?.value.trim();
    const password = document.getElementById("registerPassword")?.value.trim();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await addDoc(collection(db, "hoffmanns_reptile_admin"), {
        Fname: firstName,
        Lname: lastName,
        phone: phone,
        email: email
      });

      alert("✅ Admin account created successfully!");

      await fetch("/admin/session-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isLoggedIn: true })
      });

      sessionStorage.setItem("adminLoggedIn", "true");
      window.location.href = "/admin/private/dashboard";
    } catch (error) {
      console.error("❌ Signup error:", error);
      alert("Signup failed: " + error.message);
    }
  });
}

// Admin Login Form
const loginForm = document.getElementById("admin-login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail")?.value.trim();
    const password = document.getElementById("loginPassword")?.value.trim();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      await fetch("/admin/session-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isLoggedIn: true })
      });

      sessionStorage.setItem("adminLoggedIn", "true");
      alert("✅ Login successful!");
      window.location.href = "/admin/private/dashboard";
    } catch (error) {
      console.error("❌ Login error:", error);
      alert("Login failed: " + error.message);
    }
  });
}

// Track login state
onAuthStateChanged(auth, (user) => {
  if (user) {
    sessionStorage.setItem("adminLoggedIn", "true");
  } else {
    sessionStorage.removeItem("adminLoggedIn");
  }
});

// Logout Button
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem("adminLoggedIn");
      await fetch("/admin/logout");
      alert("Logged out successfully.");
      window.location.href = "/admin-register-x93K7h2Lm5B4f9Q";
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed: " + error.message);
    }
  });
}
