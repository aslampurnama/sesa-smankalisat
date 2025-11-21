// Subjects Management Module

/**
 * Render subjects page
 */
function renderSubjects() {
    const html = `
        <div class="fade-in">
            <div class="mb-8 slide-in-left">
                <h1 class="text-3xl font-bold text-white">Mata Pelajaran</h1>
                <p class="text-indigo-100 mt-2">Daftar mata pelajaran semester ini</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${SUBJECTS.map(subject => `
                    <div class="bg-white rounded-xl p-6 card-hover">
                        <div class="flex items-center mb-4">
                            <div class="w-12 h-12 ${subject.color} rounded-lg flex items-center justify-center text-white mr-4">
                                <i class="${subject.icon}"></i>
                            </div>
                            <div>
                                <h2 class="text-xl font-bold text-gray-800">${escapeHtml(subject.name)}</h2>
                                <p class="text-sm text-gray-600">${escapeHtml(subject.teacher)}</p>
                            </div>
                        </div>
                        <div class="mb-4">
                            <h3 class="font-semibold text-gray-700 mb-2">Materi Pembelajaran:</h3>
                            <div class="space-y-2">
                                ${subject.materials.map(material => `
                                    <div class="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                        <span class="text-sm text-gray-700">${escapeHtml(material.title)}</span>
                                        <button onclick="openMaterial('${material.link}')" class="text-indigo-600 hover:text-indigo-800 text-xs font-medium">
                                            Lihat <i class="fas fa-external-link-alt ml-1"></i>
                                        </button>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        <div class="flex justify-between items-center pt-4 border-t border-gray-200">
                            <div class="flex items-center text-sm text-gray-500">
                                <i class="fas fa-users mr-1"></i>
                                <span>${subject.students} siswa</span>
                            </div>
                            <button class="text-indigo-600 hover:text-indigo-800 font-medium text-sm" onclick="showAllMaterials('${subject.name}')">
                                Lihat Semua Materi <i class="fas fa-arrow-right ml-1"></i>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    document.getElementById('main-content').innerHTML = html;
}

/**
 * Open material link
 * @param {string} link - Material link
 */
function openMaterial(link) {
    if (link === '#') {
        showNotification('Link materi akan tersedia segera!', 'info');
    } else {
        window.open(link, '_blank');
    }
}

/**
 * Show all materials for a subject
 * @param {string} subjectName - Subject name
 */
function showAllMaterials(subjectName) {
    const subject = SUBJECTS.find(s => s.name === subjectName);
    if (subject) {
        const materialsList = subject.materials.map(m => `• ${m.title}`).join('\n');
        alert(`Semua materi untuk ${subjectName}:\n\n${materialsList}\n\nLink Google Drive akan tersedia segera!`);
    }
}

/**
 * Get subject by name
 * @param {string} name - Subject name
 * @returns {Object} Subject object
 */
function getSubjectByName(name) {
    return SUBJECTS.find(subject => subject.name === name);
}

/**
 * Get all subjects
 * @returns {Array} All subjects
 */
function getAllSubjects() {
    return SUBJECTS;
}

/**
 * Get subjects with task counts
 * @returns {Array} Subjects with task statistics
 */
function getSubjectsWithStats() {
    return SUBJECTS.map(subject => {
        const subjectTasks = todoList.filter(task => task.subject === subject.name);
        const pendingTasks = subjectTasks.filter(task => !task.done);
        const completedTasks = subjectTasks.filter(task => task.done);
        
        return {
            ...subject,
            totalTasks: subjectTasks.length,
            pendingTasks: pendingTasks.length,
            completedTasks: completedTasks.length,
            completionRate: subjectTasks.length > 0 ? Math.round((completedTasks.length / subjectTasks.length) * 100) : 0
        };
    });
}