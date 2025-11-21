// Navigation and Routing Module

/**
 * Navigate to specific page
 * @param {string} page - Page name
 */
function navigateTo(page) {
    // Update active nav button
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('bg-indigo-100', 'text-indigo-700');
        if (btn.dataset.page === page) {
            btn.classList.add('bg-indigo-100', 'text-indigo-700');
        }
    });

    // Close FAB menu if open
    const fabMenu = document.getElementById('fab-menu');
    if (fabMenu) {
        fabMenu.classList.remove('active');
    }

    // Close mobile sidebar if open
    closeMobileSidebar();

    // Render content
    const content = document.getElementById('main-content');
    content.innerHTML = '';
    
    switch(page) {
        case 'dashboard': 
            renderDashboard(); 
            break;
        case 'schedule': 
            renderSchedule(); 
            break;
        case 'tasks': 
            renderTasks(); 
            break;
        case 'subjects': 
            renderSubjects(); 
            break;
        case 'ebooks': 
            renderEbooks(); 
            break;
        default: 
            renderDashboard();
    }
    
    // Update browser history
    history.pushState({ page }, '', `#${page}`);
}

/**
 * Handle browser back/forward navigation
 */
function handlePopState(event) {
    if (event.state && event.state.page) {
        navigateTo(event.state.page);
    }
}

/**
 * Initialize navigation
 */
function initializeNavigation() {
    // Handle browser navigation
    window.addEventListener('popstate', handlePopState);
    
    // Set initial state based on URL hash
    const hash = window.location.hash.replace('#', '');
    if (hash && ['dashboard', 'schedule', 'tasks', 'subjects', 'ebooks'].includes(hash)) {
        navigateTo(hash);
    } else {
        navigateTo('dashboard');
    }
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Toggle sidebar
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileSidebar);
    }
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
    
    // User dropdown
    const userMenuButton = document.getElementById('user-menu-button');
    if (userMenuButton) {
        userMenuButton.addEventListener('click', toggleUserDropdown);
    }
    
    // Close modals when clicking outside
    const modalAddTask = document.getElementById('modal-add-task');
    const modalSettings = document.getElementById('modal-settings');
    
    if (modalAddTask) {
        modalAddTask.addEventListener('click', function(e) {
            if (e.target === this) closeAddTask();
        });
    }
    
    if (modalSettings) {
        modalSettings.addEventListener('click', function(e) {
            if (e.target === this) closeSettings();
        });
    }
    
    // Close mobile overlay when clicking
    const mobileOverlay = document.getElementById('mobile-overlay');
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileSidebar);
    }
    
    // Close FAB menu when clicking outside
    document.addEventListener('click', function(e) {
        const fab = document.querySelector('.fab');
        const fabMenu = document.getElementById('fab-menu');
        const userMenu = document.getElementById('user-menu-button');
        const userDropdown = document.getElementById('user-dropdown');
        
        if (fab && fabMenu && !fab.contains(e.target) && !fabMenu.contains(e.target)) {
            fabMenu.classList.remove('active');
        }
        
        if (userMenu && userDropdown && !userMenu.contains(e.target) && !userDropdown.contains(e.target)) {
            userDropdown.classList.remove('active');
        }
    });
    
    // Escape key to close modals and FAB menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (modalAddTask && modalAddTask.classList.contains('active')) {
                closeAddTask();
            }
            if (modalSettings && modalSettings.classList.contains('active')) {
                closeSettings();
            }
            
            const fabMenu = document.getElementById('fab-menu');
            if (fabMenu) {
                fabMenu.classList.remove('active');
            }
            
            const userDropdown = document.getElementById('user-dropdown');
            if (userDropdown) {
                userDropdown.classList.remove('active');
            }
            
            closeMobileSidebar();
        }
    });
}

/**
 * Toggle sidebar
 */
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('collapsed');
    }
}

/**
 * Toggle mobile sidebar
 */
function toggleMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    
    if (sidebar && overlay) {
        sidebar.classList.add('active');
        overlay.classList.add('active');
    }
}

/**
 * Close mobile sidebar
 */
function closeMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    
    if (sidebar && overlay) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    }
}

/**
 * Toggle user dropdown
 */
function toggleUserDropdown() {
    const dropdown = document.getElementById('user-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

/**
 * Toggle FAB menu
 */
function toggleFabMenu() {
    const fabMenu = document.getElementById('fab-menu');
    if (fabMenu) {
        fabMenu.classList.toggle('active');
    }
}

/**
 * Handle search functionality
 * @param {Event} e - Input event
 */
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (searchTerm.length > 2) {
        // Implement global search across all modules
        const searchResults = performGlobalSearch(searchTerm);
        
        // Show search results (could be implemented as a modal or dedicated page)
        if (searchResults.hasResults) {
            showNotification(`Ditemukan ${searchResults.total} hasil untuk "${searchTerm}"`, 'info');
        } else {
            showNotification('Tidak ditemukan hasil pencarian', 'warning');
        }
        
        console.log('Search results:', searchResults);
    }
}

/**
 * Perform global search across all data
 * @param {string} query - Search query
 * @returns {Object} Search results
 */
function performGlobalSearch(query) {
    const lowerQuery = query.toLowerCase();
    
    const taskResults = todoList.filter(task => 
        task.task.toLowerCase().includes(lowerQuery) ||
        task.subject.toLowerCase().includes(lowerQuery)
    );
    
    const scheduleResults = scheduleData.filter(schedule =>
        schedule.subject.toLowerCase().includes(lowerQuery) ||
        schedule.teacher.toLowerCase().includes(lowerQuery)
    );
    
    const subjectResults = SUBJECTS.filter(subject =>
        subject.name.toLowerCase().includes(lowerQuery) ||
        subject.teacher.toLowerCase().includes(lowerQuery)
    );
    
    const ebookResults = E_BOOKS.filter(ebook =>
        ebook.title.toLowerCase().includes(lowerQuery) ||
        ebook.subject.toLowerCase().includes(lowerQuery) ||
        ebook.author.toLowerCase().includes(lowerQuery)
    );
    
    return {
        tasks: taskResults,
        schedule: scheduleResults,
        subjects: subjectResults,
        ebooks: ebookResults,
        total: taskResults.length + scheduleResults.length + subjectResults.length + ebookResults.length,
        hasResults: taskResults.length > 0 || scheduleResults.length > 0 || subjectResults.length > 0 || ebookResults.length > 0
    };
}