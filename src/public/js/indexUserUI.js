function isUserLoggedIn() {
    return localStorage.getItem('userRole') === 'user' &&
           localStorage.getItem('isLoggedIn') === 'true';
}

function initIndexUserUI() {
    const loginLink = document.getElementById('loginNavLink');
    const profileWrapper = document.getElementById('userProfileWrapper');
    const profileIcon = document.getElementById('userProfileIcon');

    if (!loginLink || !profileWrapper || !profileIcon) return;

    if (isUserLoggedIn()) {
        loginLink.style.display = 'none';
        profileWrapper.style.display = 'flex';

        const email = localStorage.getItem('userEmail') || '';
        const first = email.trim().charAt(0).toUpperCase();
        profileIcon.textContent = first || 'U';
    } else {
        loginLink.style.display = 'inline-block';
        profileWrapper.style.display = 'none';
    }
}

function toggleUserDropdown() {
    const dropdown = document.getElementById('userProfileDropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

document.addEventListener('click', (event) => {
    const wrapper = document.getElementById('userProfileWrapper');
    const dropdown = document.getElementById('userProfileDropdown');
    if (!wrapper || !dropdown) return;

    if (!wrapper.contains(event.target)) {
        dropdown.classList.remove('show');
    }
});

function viewUserProfile() {
    const email = localStorage.getItem('userEmail') || 'Unknown';
    alert(`Profile\nEmail: ${email}`);
}

function userLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userEmail');
        window.location.replace('/login.html');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initIndexUserUI();
});

window.addEventListener('pageshow', () => {
    initIndexUserUI();
});