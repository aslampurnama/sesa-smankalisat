// Authentication and User Management

// Global variables
let currentUser = null;
let todoList = [];
let scheduleData = [];

/**
 * Handle user login
 * @param {Event} e - Form submit event
 */
function handleLogin(e) {
    e.preventDefault();
    
    const nis = document.getElementById('nis-input').value.trim();
    const password = document.getElementById('password-input').value;
    
    if (!nis || !password) {
        showNotification('Mohon isi NIS dan password!', 'error');
        return;
    }
    
    // Check login credentials
    if (DEFAULT_USER_DATA[nis] && DEFAULT_USER_DATA[nis].password === password) {
        currentUser = {
            nis: nis,
            name: DEFAULT_USER_DATA[nis].name,
            class: DEFAULT_USER_DATA[nis].class,
            email: DEFAULT_USER_DATA[nis].email
        };
        
        // Save to localStorage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        initializeUserData();
        showNotification('Login berhasil!', 'success');
    } else {
        showNotification('NIS atau password salah!', 'error');
    }
}

/**
 * Initialize user data after login
 */
function initializeUserData() {
    // Hide login, show main app
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('main-app').style.display = 'block';
    
    // Update user info in sidebar and header
    document.getElementById('sidebar-user-name').textContent = currentUser.name;
    document.getElementById('sidebar-user-class').textContent = `Kelas ${currentUser.class}`;
    document.getElementById('header-user-name').textContent = currentUser.name;
    
    // Load user data from Firebase
    loadUserData();
}

/**
 * Load user data from Firebase
 */
function loadUserData() {
    const userRef = database.ref('users/' + currentUser.nis);
    
    userRef.once('value').then((snapshot) => {
        if (snapshot.exists()) {
            // Load existing data
            const userData = snapshot.val();
            todoList = userData.todoList || [];
            scheduleData = userData.scheduleData || [];
            
            // Update profile if exists
            if (userData.name) {
                currentUser.name = userData.name;
                currentUser.class = userData.class;
                currentUser.email = userData.email;
                
                // Update UI
                document.getElementById('sidebar-user-name').textContent = currentUser.name;
                document.getElementById('sidebar-user-class').textContent = `Kelas ${currentUser.class}`;
                document.getElementById('header-user-name').textContent = currentUser.name;
            }
        } else {
            // Create new user data with defaults
            todoList = DEFAULT_USER_DATA[currentUser.nis].todoList || [];
            scheduleData = DEFAULT_USER_DATA[currentUser.nis].scheduleData || [];
            
            // Save to Firebase
            saveUserData();
        }
        
        // Hide loading and show dashboard
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
            navigateTo('dashboard');
            setupEventListeners();
        }, 1000);
        
    }).catch((error) => {
        console.error('Error loading user data:', error);
        showNotification('Error loading data. Using local data.', 'warning');
        
        // Use default data as fallback
        todoList = DEFAULT_USER_DATA[currentUser.nis].todoList || [];
        scheduleData = DEFAULT_USER_DATA[currentUser.nis].scheduleData || [];
        
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
            navigateTo('dashboard');
            setupEventListeners();
        }, 1000);
    });
}

/**
 * Save user data to Firebase
 */
function saveUserData() {
    const userData = {
        name: currentUser.name,
        class: currentUser.class,
        email: currentUser.email,
        todoList: todoList,
        scheduleData: scheduleData
    };
    
    database.ref('users/' + currentUser.nis).set(userData)
        .then(() => {
            console.log('Data saved successfully');
        })
        .catch((error) => {
            console.error('Error saving data:', error);
            showNotification('Error saving data', 'error');
        });
}

/**
 * Confirm and handle user logout
 */
function confirmLogout() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
        // Clear localStorage
        localStorage.removeItem('currentUser');
        
        // Reset to login screen
        currentUser = null;
        todoList = [];
        scheduleData = [];
        
        document.getElementById('main-app').style.display = 'none';
        document.getElementById('login-screen').style.display = 'flex';
        
        // Reset login form
        document.getElementById('nis-input').value = '';
        document.getElementById('password-input').value = '';
        
        showNotification('Terima kasih telah menggunakan SESA!', 'success');
    }
}

/**
 * Check for existing login on page load
 */
function checkExistingLogin() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        initializeUserData();
    }
}

// Initialize login form on DOM load
document.addEventListener('DOMContentLoaded', function() {
    // Setup event listeners untuk login
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    
    // Pastikan login screen ditampilkan pertama kali
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('main-app').style.display = 'none';
    
    // Hapus data login yang tersimpan untuk memastikan login muncul
    localStorage.removeItem('currentUser');
});