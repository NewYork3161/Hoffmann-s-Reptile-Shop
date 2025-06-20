// public/JS/admin_dashboard.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ✅ Replace with your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "splat-37995.firebaseapp.com",
  projectId: "splat-37995",
  storageBucket: "splat-37995.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🕓 Wait until Firebase is fully initialized
document.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("✅ User authenticated:", user.email);
    } else {
      alert("Access denied. Please log in first.");
      window.location.href = "/admin-register-x93K7h2Lm5B4f9Q";
    }
  });

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      signOut(auth)
        .then(() => {
          alert("You've been logged out.");
          window.location.href = "/admin-register-x93K7h2Lm5B4f9Q";
        })
        .catch((error) => {
          console.error("Logout error:", error);
        });
    });
  }
});
