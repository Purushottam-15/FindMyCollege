document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.querySelector('input[placeholder="username"]').value;
    const password = document.querySelector('input[placeholder="password"]').value;
    
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = '/admin.html';
        } else {
            alert('Error: ' + data.message);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});