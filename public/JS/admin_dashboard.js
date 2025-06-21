import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

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

document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = sessionStorage.getItem("adminLoggedIn");

  if (!isLoggedIn) {
    alert("Access denied. Please log in first.");
    window.location.href = "/admin-register-x93K7h2Lm5B4f9Q";
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("✅ User authenticated:", user.email);
    } else {
      sessionStorage.removeItem("adminLoggedIn");
      alert("Session expired or invalid. Please log in again.");
      window.location.href = "/admin-register-x93K7h2Lm5B4f9Q";
    }
  });

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        await signOut(auth);
        sessionStorage.removeItem("adminLoggedIn");

        // Suppress redirect warning by telling fetch not to follow it
        await fetch("/admin/logout", { method: "GET", redirect: "manual" });

        // Redirect manually
        window.location.href = "/admin-register-x93K7h2Lm5B4f9Q";
      } catch (error) {
        console.warn("Logout warning (safe to ignore):", error);
        // Still redirect safely
        window.location.href = "/admin-register-x93K7h2Lm5B4f9Q";
      }
    });
  }
});
