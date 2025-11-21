// Schedule Management Module

/**
 * Render schedule page
 */
function renderSchedule() {
    const groupedSchedule = groupScheduleByDay();
    
    const html = `
        <div class="fade-in">
            <div class="flex flex-col md:flex-row md:items-center justify-between mb-8">
                <div class="slide-in-left">
                    <h1 class="text-3xl font-bold text-white">Jadwal Pelajaran</h1>
                    <p class="text-indigo-100 mt-2">Atur jadwal pembelajaran mingguan</p>
                </div>
                <button onclick="showAddSchedule()" class="mt-4 md:mt-0 bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-all flex items-center">
                    <i class="fas fa-plus mr-2"></i> Tambah Jadwal
                </button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${DAY_ORDER.map(day => `
                    <div class="bg-white rounded-xl p-6 card-hover">
                        <div class="flex items-center justify-between mb-6">
                            <h2 class="text-xl font-bold text-gray-800">${day}</h2>
                            <span class="text-2xl">${getDayEmoji(day)}</span>
                        </div>
                        <div class="space-y-4">
                            ${groupedSchedule[day] ? groupedSchedule[day].map(item => `
                                <div class="p-4 border border-gray-200 rounded-lg">
                                    <div class="flex justify-between items-start mb-2">
                                        <h3 class="font-semibold text-gray-800">${escapeHtml(item.subject)}</h3>
                                        <span class="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">${item.time}</span>
                                    </div>
                                    <p class="text-sm text-gray-600 flex items-center">
                                        <i class="fas fa-user mr-2"></i> ${escapeHtml(item.teacher)}
                                    </p>
                                </div>
                            `).join('') : `
                                <div class="text-center py-8 text-gray-500">
                                    <i class="fas fa-calendar-times text-3xl mb-2"></i>
                                    <p>Tidak ada jadwal</p>
                                </div>
                            `}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    document.getElementById('main-content').innerHTML = html;
}

/**
 * Group schedule by day
 * @returns {Object} Grouped schedule data
 */
function groupScheduleByDay() {
    const grouped = {};
    scheduleData.forEach(item => {
        if (!grouped[item.day]) {
            grouped[item.day] = [];
        }
        grouped[item.day].push(item);
    });
    return grouped;
}

/**
 * Get emoji for day
 * @param {string} day - Day name
 * @returns {string} Emoji
 */
function getDayEmoji(day) {
    const emojis = {
        'Senin': '📌',
        'Selasa': '🎯',
        'Rabu': '⭐',
        'Kamis': '🔥',
        'Jumat': '✨',
        'Sabtu': '🌟'
    };
    return emojis[day] || '📅';
}

/**
 * Show add schedule modal (placeholder)
 */
function showAddSchedule() {
    showNotification('Fitur tambah jadwal akan segera hadir!', 'info');
}

/**
 * Get current week schedule
 * @returns {Object} Weekly schedule
 */
function getWeeklySchedule() {
    return groupScheduleByDay();
}

/**
 * Get today's classes
 * @returns {Array} Today's classes
 */
function getTodaysClasses() {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const today = days[new Date().getDay()];
    return scheduleData.filter(item => item.day === today);
}