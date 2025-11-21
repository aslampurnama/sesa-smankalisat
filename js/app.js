// Main Application Entry Point

/**
 * Initialize the application
 */
function initializeApp() {
    console.log('SESA App Initializing...');
    
    // Check for existing login
    checkExistingLogin();
    
    // Initialize navigation
    initializeNavigation();
    
    // Load profile photo from localStorage
    loadProfilePhoto();
    
    console.log('SESA App Initialized Successfully');
}

/**
 * Show settings modal
 */
function showSettings() {
    // Populate settings form with current user data
    document.getElementById('profile-name').value = currentUser.name;
    document.getElementById('profile-nis').value = currentUser.nis;
    document.getElementById('profile-class').value = currentUser.class;
    document.getElementById('profile-email').value = currentUser.email;
    
    document.getElementById('modal-settings').classList.add('active');
    
    // Close user dropdown if open
    const userDropdown = document.getElementById('user-dropdown');
    if (userDropdown) {
        userDropdown.classList.remove('active');
    }
}

/**
 * Close settings modal
 */
function closeSettings() {
    document.getElementById('modal-settings').classList.remove('active');
}

/**
 * Handle profile photo upload
 * @param {Event} event - File input event
 */
function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        if (file.size > 5000000) { // 5MB limit
            showNotification('Ukuran file terlalu besar! Maksimal 5MB', 'error');
            return;
        }
        
        if (!file.type.startsWith('image/')) {
            showNotification('File harus berupa gambar!', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const profilePhoto = e.target.result;
            updateProfilePhoto(profilePhoto);
            showNotification('Foto profil berhasil diubah!', 'success');
        };
        reader.onerror = function() {
            showNotification('Error membaca file!', 'error');
        };
        reader.readAsDataURL(file);
    }
}

/**
 * Update profile photo in UI and storage
 * @param {string} photoData - Base64 image data
 */
function updateProfilePhoto(photoData) {
    const profilePhotoDisplay = document.getElementById('profile-photo-display');
    const profilePhotoPlaceholder = document.getElementById('profile-photo-placeholder');
    
    if (profilePhotoDisplay && profilePhotoPlaceholder) {
        profilePhotoDisplay.src = photoData;
        profilePhotoDisplay.classList.remove('hidden');
        profilePhotoPlaceholder.classList.add('hidden');
        
        // Save to localStorage for persistence
        localStorage.setItem('profilePhoto', photoData);
    }
}

/**
 * Load profile photo from localStorage
 */
function loadProfilePhoto() {
    const savedPhoto = localStorage.getItem('profilePhoto');
    if (savedPhoto) {
        updateProfilePhoto(savedPhoto);
    }
}

/**
 * Save settings
 */
function saveSettings() {
    const name = document.getElementById('profile-name').value.trim();
    const classValue = document.getElementById('profile-class').value.trim();
    const email = document.getElementById('profile-email').value.trim();

    if (!name || !classValue || !email) {
        showNotification('Mohon lengkapi semua data profil!', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('Format email tidak valid!', 'error');
        return;
    }

    // Update current user data
    currentUser.name = name;
    currentUser.class = classValue;
    currentUser.email = email;
    
    // Update UI
    document.getElementById('sidebar-user-name').textContent = currentUser.name;
    document.getElementById('sidebar-user-class').textContent = `Kelas ${currentUser.class}`;
    document.getElementById('header-user-name').textContent = currentUser.name;
    
    // Save to Firebase
    saveUserData();
    
    // Save to localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    showNotification('Profil berhasil disimpan!', 'success');
    closeSettings();
}

/**
 * Export user data (for backup)
 */
function exportUserData() {
    const userData = {
        user: currentUser,
        todoList: todoList,
        scheduleData: scheduleData,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sesa-backup-${currentUser.nis}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showNotification('Data berhasil diekspor!', 'success');
}

/**
 * Import user data (from backup)
 * @param {Event} event - File input event
 */
function importUserData(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const importedData = JSON.parse(e.target.result);
                
                if (confirm('Apakah Anda yakin ingin mengimpor data? Data saat ini akan diganti.')) {
                    // Validate imported data
                    if (importedData.user && importedData.todoList && importedData.scheduleData) {
                        currentUser = { ...currentUser, ...importedData.user };
                        todoList = importedData.todoList;
                        scheduleData = importedData.scheduleData;
                        
                        saveUserData();
                        localStorage.setItem('currentUser', JSON.stringify(currentUser));
                        
                        showNotification('Data berhasil diimpor!', 'success');
                        navigateTo('dashboard');
                    } else {
                        showNotification('Format file tidak valid!', 'error');
                    }
                }
            } catch (error) {
                showNotification('Error membaca file!', 'error');
                console.error('Import error:', error);
            }
        };
        reader.readAsText(file);
    }
}

/**
 * Get application version and info
 * @returns {Object} App info
 */
function getAppInfo() {
    return {
        name: 'SESA - Sistem Edukasi Siswa Aktif',
        version: '1.0.0',
        school: 'SMAN Kalisat',
        developer: 'Tim SESA',
        year: 2024
    };
}

/**
 * Show about dialog
 */
function showAbout() {
    const appInfo = getAppInfo();
    alert(`${appInfo.name}\nVersi: ${appInfo.version}\nSekolah: ${appInfo.school}\nPengembang: ${appInfo.developer}\nTahun: ${appInfo.year}`);
}

// Initialize app when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Export global functions for HTML onclick handlers
window.navigateTo = navigateTo;
window.toggleFabMenu = toggleFabMenu;
window.showAddTask = showAddTask;
window.closeAddTask = closeAddTask;
window.saveNewTask = saveNewTask;
window.showSettings = showSettings;
window.closeSettings = closeSettings;
window.saveSettings = saveSettings;
window.handlePhotoUpload = handlePhotoUpload;
window.confirmLogout = confirmLogout;
window.showAddSchedule = showAddSchedule;
window.toggleTodo = toggleTodo;
window.deleteTodo = deleteTodo;
window.openBook = openBook;
window.openMaterial = openMaterial;
window.showAllMaterials = showAllMaterials;

// Make modules available globally for debugging
window.appModules = {
    auth: { currentUser, todoList, scheduleData },
    timer: { getTimerStatus },
    dashboard: { getDashboardStats },
    tasks: { getTasksStats },
    subjects: { getSubjectsWithStats },
    ebooks: { getAllEbooks, searchEbooks },
    utils: { formatDate, getDaysLeft, getUrgencyColor }
};