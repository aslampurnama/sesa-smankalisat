// Dashboard Module

/**
 * Render dashboard content
 */
function renderDashboard() {
    const pendingTasks = todoList.filter(t => !t.done).length;
    const completedTasks = todoList.filter(t => t.done).length;
    const completionRate = todoList.length > 0 ? Math.round((completedTasks / todoList.length) * 100) : 0;
    
    // Filter tugas mendatang (dalam 3 hari)
    const upcomingTasks = todoList.filter(t => {
        if (t.done) return false;
        const daysLeft = getDaysLeft(t.deadline);
        return daysLeft <= 3 && daysLeft >= 0;
    });
    
    const html = `
        <div class="fade-in">
            <div class="mb-8 slide-in-left">
                <h1 class="text-3xl font-bold text-white">Dashboard</h1>
                <p class="text-indigo-100 mt-2">Selamat datang kembali, ${currentUser.name}! 👋</p>
            </div>
            
            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <!-- Tugas Pending -->
                <div class="bg-white rounded-xl p-6 card-hover">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500">Tugas Pending</p>
                            <p class="text-3xl font-bold text-gray-800 mt-2">${pendingTasks}</p>
                        </div>
                        <div class="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center text-white">
                            <i class="fas fa-tasks text-xl"></i>
                        </div>
                    </div>
                    <div class="mt-4 bg-gray-200 rounded-full h-2">
                        <div class="bg-indigo-600 h-2 rounded-full" style="width: ${100 - completionRate}%"></div>
                    </div>
                </div>
                
                <!-- Mata Pelajaran -->
                <div class="bg-white rounded-xl p-6 card-hover">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500">Mata Pelajaran</p>
                            <p class="text-3xl font-bold text-gray-800 mt-2">${SUBJECTS.length}</p>
                        </div>
                        <div class="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center text-white">
                            <i class="fas fa-book text-xl"></i>
                        </div>
                    </div>
                    <p class="text-xs text-gray-500 mt-4">Semester Aktif</p>
                </div>
                
                <!-- Progress Tugas -->
                <div class="bg-white rounded-xl p-6 card-hover">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500">Progress Tugas</p>
                            <p class="text-3xl font-bold text-gray-800 mt-2">${completionRate}%</p>
                        </div>
                        <div class="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center text-white">
                            <i class="fas fa-check-circle text-xl"></i>
                        </div>
                    </div>
                    <div class="mt-4 bg-gray-200 rounded-full h-2">
                        <div class="bg-green-500 h-2 rounded-full" style="width: ${completionRate}%"></div>
                    </div>
                </div>
            </div>
            
            <!-- Tugas Mendatang -->
            <div class="mb-8 bg-white rounded-xl p-6 card-hover">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-xl font-bold text-gray-800">Tugas Mendatang</h2>
                    <button onclick="navigateTo('tasks')" class="text-indigo-600 text-sm font-semibold hover:underline">Lihat Semua</button>
                </div>
                <div class="space-y-4">
                    ${upcomingTasks.length > 0 ? upcomingTasks.map(item => {
                        const daysLeft = getDaysLeft(item.deadline);
                        const urgencyColor = getUrgencyColor(daysLeft);
                        return `
                            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg task-item">
                                <div class="flex items-center">
                                    <input type="checkbox" ${item.done ? 'checked' : ''} onchange="toggleTodo(${item.id})" class="mr-3 h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500">
                                    <div>
                                        <h3 class="font-medium text-gray-800 task-title">${escapeHtml(item.task)}</h3>
                                        <p class="text-sm text-gray-600">${escapeHtml(item.subject)}</p>
                                    </div>
                                </div>
                                <span class="${urgencyColor.text} text-sm font-medium">${daysLeft} hari</span>
                            </div>
                        `;
                    }).join('') : `
                        <div class="text-center py-8">
                            <i class="fas fa-check-circle text-4xl text-green-500 mb-4"></i>
                            <p class="text-gray-600">Tidak ada tugas mendatang</p>
                        </div>
                    `}
                </div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Jadwal Hari Ini -->
                <div class="bg-white rounded-xl p-6 card-hover">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-xl font-bold text-gray-800">Jadwal Hari Ini</h2>
                        <button onclick="navigateTo('schedule')" class="text-indigo-600 text-sm font-semibold hover:underline">Lihat Semua</button>
                    </div>
                    <div class="space-y-4">
                        ${getTodaySchedule().slice(0, 3).map(item => `
                            <div class="flex items-center p-4 bg-indigo-50 rounded-lg">
                                <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4">
                                    <i class="fas fa-clock text-indigo-600"></i>
                                </div>
                                <div class="flex-1">
                                    <h3 class="font-semibold text-gray-800">${escapeHtml(item.subject)}</h3>
                                    <p class="text-sm text-gray-600">${item.time} • ${escapeHtml(item.teacher)}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Pomodoro Timer -->
                <div class="pomodoro-timer card-hover">
                    <h2 class="text-xl font-bold text-gray-800 mb-4">Timer Belajar</h2>
                    <div class="timer-display">
                        <span id="timer-minutes">25</span>:<span id="timer-seconds">00</span>
                    </div>
                    <div class="timer-controls">
                        <button id="start-timer" class="timer-btn primary">Mulai</button>
                        <button id="pause-timer" class="timer-btn secondary">Jeda</button>
                        <button id="reset-timer" class="timer-btn secondary">Reset</button>
                    </div>
                    <div class="session-counter text-sm text-gray-600">
                        Sesi: <span id="session-count">0</span>/4
                    </div>
                </div>
            </div>
            
            <!-- Catatan Belajar -->
            <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="bg-white rounded-xl p-6 card-hover">
                    <h2 class="text-xl font-bold text-gray-800 mb-4">Catatan Belajar</h2>
                    <div class="space-y-4">
                        <div class="p-4 border border-gray-200 rounded-lg">
                            <h3 class="font-semibold text-gray-800">Tips Belajar Efektif</h3>
                            <p class="text-sm text-gray-600 mt-2">Gunakan teknik Pomodoro untuk meningkatkan fokus dan produktivitas belajar.</p>
                        </div>
                        <div class="p-4 border border-gray-200 rounded-lg">
                            <h3 class="font-semibold text-gray-800">Persiapan Ujian</h3>
                            <p class="text-sm text-gray-600 mt-2">Buat jadwal belajar yang teratur dan ulangi materi secara berkala.</p>
                        </div>
                    </div>
                </div>
                
                <!-- Achievement Badges -->
                <div class="bg-white rounded-xl p-6 card-hover">
                    <h2 class="text-xl font-bold text-gray-800 mb-4">Pencapaian</h2>
                    <div class="space-y-3">
                        <div class="achievement-badge">
                            <div class="achievement-icon">
                                <i class="fas fa-trophy"></i>
                            </div>
                            <div>
                                <h4 class="font-medium text-gray-800">Penyelesaian Cepat</h4>
                                <p class="text-sm text-gray-600">Selesaikan 5 tugas sebelum deadline</p>
                            </div>
                        </div>
                        <div class="achievement-badge">
                            <div class="achievement-icon" style="background: #6b7280;">
                                <i class="fas fa-star"></i>
                            </div>
                            <div>
                                <h4 class="font-medium text-gray-800">Kehadiran Sempurna</h4>
                                <p class="text-sm text-gray-600">Hadir 100% dalam seminggu</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('main-content').innerHTML = html;
    
    // Initialize timer functionality
    initializeTimer();
}

/**
 * Get today's schedule based on current day
 * @returns {Array} Today's schedule items
 */
function getTodaySchedule() {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const today = days[new Date().getDay()];
    
    return scheduleData.filter(item => item.day === today);
}

/**
 * Get dashboard statistics
 * @returns {Object} Dashboard statistics
 */
function getDashboardStats() {
    const pendingTasks = todoList.filter(t => !t.done).length;
    const completedTasks = todoList.filter(t => t.done).length;
    const completionRate = todoList.length > 0 ? Math.round((completedTasks / todoList.length) * 100) : 0;
    const upcomingTasks = todoList.filter(t => {
        if (t.done) return false;
        const daysLeft = getDaysLeft(t.deadline);
        return daysLeft <= 3 && daysLeft >= 0;
    });
    
    return {
        pendingTasks,
        completedTasks,
        completionRate,
        upcomingTasksCount: upcomingTasks.length,
        totalSubjects: SUBJECTS.length,
        todaySchedule: getTodaySchedule()
    };
}