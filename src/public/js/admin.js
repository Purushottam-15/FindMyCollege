function toggleDropdown() {
    const dropdown = document.getElementById('profileDropdown');
    dropdown.classList.toggle('show');
}
if (!localStorage.getItem('isLoggedIn')) {
    window.location.href = '/login.html';
}
document.addEventListener('click', function(event) {
    const profileSection = document.querySelector('.profile-section');
    if (!profileSection.contains(event.target)) {
        document.getElementById('profileDropdown').classList.remove('show');
    }
});

function viewProfile() {
    alert('Profile Details:\nName: Admin\nRole: System Administrator\nEmail: admin@college.edu');
    toggleDropdown();
}

function changePassword() {
    const newPassword = prompt('Enter new password:');
    if (newPassword) {
        alert('Password changed successfully!');
    }
    toggleDropdown();
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('isLoggedIn');
        window.location.href = '/login.html';
    }
    toggleDropdown();
}

function hideAllForms() {
    document.getElementById('addForm').classList.remove('show');
    document.getElementById('updateForm').classList.remove('show');
    document.getElementById('updateEditForm').classList.remove('show');
    document.getElementById('deleteForm').classList.remove('show');
    document.getElementById('updateResults').innerHTML = '';
    document.getElementById('deleteResults').innerHTML = '';
}

function showAddForm() {
    hideAllForms();
    document.getElementById('addForm').classList.add('show');
}

function showUpdateForm() {
    hideAllForms();
    document.getElementById('updateForm').classList.add('show');
    document.getElementById('updateSearch').focus();
}

function showDeleteForm() {
    hideAllForms();
    document.getElementById('deleteForm').classList.add('show');
    document.getElementById('deleteSearch').focus();
}

document.getElementById('addCollegeForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const collegeData = {
        'Sr. No.': parseInt(formData.get('Sr. No.')),
        'College Code': formData.get('College Code'),
        'College Name': formData.get('College Name'),
        'District': formData.get('District'),
        'Course Type': formData.get('Course Type'),
        'Course Name': formData.get('Course Name'),
        'Location': formData.get('Location'),
        'contactNumber': formData.get('contactNumber')
    };
    
    try {
        const response = await fetch('/api/admin/colleges', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(collegeData)
        });
        const data = await response.json();
        
        if (data.success) {
            alert('College added successfully!');
            this.reset();
            hideAllForms();
        } else {
            alert('Error: ' + data.message);
        }
    } catch (error) {
        alert('Error adding college: ' + error.message);
    }
});

async function searchForUpdate() {
    const searchTerm = document.getElementById('updateSearch').value.trim();
    if (!searchTerm) {
        alert('Please enter a search term');
        return;
    }
    
    try {
        const response = await fetch(`/api/admin/colleges/search?q=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();
        
        const resultsDiv = document.getElementById('updateResults');
        resultsDiv.innerHTML = '';
        
        if (data.success && data.data.length > 0) {
            data.data.forEach(college => {
                const resultItem = document.createElement('div');
                resultItem.className = 'result-item';
                resultItem.innerHTML = `
                    <h4>${college['College Name']}</h4>
                    <p><strong>Code:</strong> ${college['College Code']}</p>
                    <p><strong>District:</strong> ${college['District']}</p>
                    <p><strong>Course:</strong> ${college['Course Name']}</p>
                    <button class="btn btn-primary" style="margin-top: 0.5rem;">Edit</button>
                `;
                resultItem.querySelector('button').onclick = (e) => {
                    e.stopPropagation();
                    showUpdateEditForm(college);
                };
                resultsDiv.appendChild(resultItem);
            });
        } else {
            resultsDiv.innerHTML = '<p style="color: #666;">No colleges found</p>';
        }
    } catch (error) {
        alert('Error searching: ' + error.message);
    }
}

function showUpdateEditForm(college) {
    document.getElementById('updateForm').classList.remove('show');
    document.getElementById('updateEditForm').classList.add('show');
    
    document.getElementById('updateCollegeId').value = college._id;
    document.getElementById('updateSrNo').value = college['Sr. No.'];
    document.getElementById('updateCollegeName').value = college['College Name'];
    document.getElementById('updateCollegeCode').value = college['College Code'];
    document.getElementById('updateDistrict').value = college['District'];
    document.getElementById('updateCourseType').value = college['Course Type'];
    document.getElementById('updateCourseName').value = college['Course Name'];
    document.getElementById('updateLocation').value = college['Location'] || '';
    document.getElementById('updateContactNumber').value = college['contactNumber'] || '';
}

document.getElementById('updateCollegeForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const collegeId = document.getElementById('updateCollegeId').value;
    const formData = new FormData(this);
    const updates = {
        'College Name': formData.get('College Name'),
        'College Code': formData.get('College Code'),
        'District': formData.get('District'),
        'Course Type': formData.get('Course Type'),
        'Course Name': formData.get('Course Name'),
        'Location': formData.get('Location'),
        'contactNumber': formData.get('contactNumber')
    };
    
    try {
        const response = await fetch(`/api/admin/colleges/${collegeId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        });
        const data = await response.json();
        
        if (data.success) {
            alert('College updated successfully!');
            hideAllForms();
        } else {
            alert('Error: ' + data.message);
        }
    } catch (error) {
        alert('Error updating: ' + error.message);
    }
});

async function searchForDelete() {
    const searchTerm = document.getElementById('deleteSearch').value.trim();
    if (!searchTerm) {
        alert('Please enter a search term');
        return;
    }
    
    try {
        const response = await fetch(`/api/admin/colleges/search?q=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();
        
        const resultsDiv = document.getElementById('deleteResults');
        resultsDiv.innerHTML = '';
        
        if (data.success && data.data.length > 0) {
            data.data.forEach(college => {
                const resultItem = document.createElement('div');
                resultItem.className = 'result-item';
                resultItem.innerHTML = `
                    <h4>${college['College Name']}</h4>
                    <p><strong>Code:</strong> ${college['College Code']}</p>
                    <p><strong>District:</strong> ${college['District']}</p>
                    <p><strong>Course:</strong> ${college['Course Name']}</p>
                    <button class="btn btn-danger" style="margin-top: 0.5rem;" onclick="deleteCollege('${college._id}', '${college['College Name']}')">Delete</button>
                `;
                resultsDiv.appendChild(resultItem);
            });
        } else {
            resultsDiv.innerHTML = '<p style="color: #666;">No colleges found</p>';
        }
    } catch (error) {
        alert('Error searching: ' + error.message);
    }
}

async function deleteCollege(id, name) {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
        return;
    }
    
    try {
        const response = await fetch(`/api/admin/colleges/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        
        if (data.success) {
            alert('College deleted successfully!');
            document.getElementById('deleteResults').innerHTML = '';
            document.getElementById('deleteSearch').value = '';
        } else {
            alert('Error: ' + data.message);
        }
    } catch (error) {
        alert('Error deleting: ' + error.message);
    }
}