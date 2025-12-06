document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const usernameOrEmail = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!usernameOrEmail || !password) {
      alert("Please enter username/email and password.");
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usernameOrEmail, password }),
      });

      const data = await response.json();

      if (data.success && data.role === "user") {
        if (data.success && data.role === "user") {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userRole", "user");
          localStorage.setItem("userEmail", usernameOrEmail);
          window.location.replace("/index.html");
        }
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  });
