document.getElementById('registerForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const messageBox = document.getElementById('messageBox');
  messageBox.textContent = "";

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  if (!emailRegex.test(email)) {
    messageBox.innerHTML = '<span class="error-message">Invalid email address.</span>';
    return;
  }
  if (!pwRegex.test(password)) {
    messageBox.innerHTML = '<span class="error-message">Password must be at least 6 characters, contain uppercase, lowercase and a number.</span>';
    return;
  }

  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (data.success) {
      messageBox.innerHTML = '<span class="success-message">Registration successful! You can login now.</span>';
      this.reset();
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1800);
    } else {
      messageBox.innerHTML = '<span class="error-message">' + data.message + '</span>';
    }
  } catch (error) {
    messageBox.innerHTML = '<span class="error-message">Error: ' + error.message + '</span>';
  }
});