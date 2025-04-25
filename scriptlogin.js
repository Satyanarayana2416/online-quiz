const form = document.getElementById("auth-form");
const message = document.getElementById("message");

// Simulated database (for demonstration purposes)
const database = {};

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (form.id === "auth-form" && !database[username]) {
    // Sign-up logic
    database[username] = password;
    message.textContent = "Sign-up successful! Please login now.";
    message.style.color = "lightgreen";
  } else if (database[username] === password) {
    // Login logic
    message.textContent = "Login successful! Redirecting to home page...";
    message.style.color = "lightgreen";
    setTimeout(() => {
      window.location.href = "home.html"; // Redirect
    }, 1500);
  } else {
    message.textContent = "Invalid credentials. Please try again.";
    message.style.color = "red";
  }
});
