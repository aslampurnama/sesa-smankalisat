// Tasks Management Module

/**
 * Render tasks page
 */
function renderTasks() {
    const pendingTasks = todoList.filter(t => !t.done);
    const completedTasks = todoList.filter(t => t.done);
    
    const html = `
        <div class="fade-in">
            <div class="flex flex-col md:flex-row md:items-center justify-between mb-8">
                <div class="slide-in-left">
                    <h1 class="text-3xl font-bold text-white">Manajemen Tugas</h1>
                    <p class="text-indigo-100 mt-2">Kelola ${todoList.length} tugas dan deadline dengan mudah</p>
                </div>
                <button onclick="showAddTask()" class="mt-4 md:mt-0 bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-all flex items-center">
                    <i class="fas fa-plus mr-2"></i> Tambah Tugas
                </button>
            </div>
            
            ${pendingTasks.length > 0 ? `
            <div class="bg-white rounded-xl p-6 card-hover mb-8">
                <h2 class="text-xl font-bold text-gray-800 mb-6">Tugas Belum Selesai (${pendingTasks.length})</h2>
                <div class="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                    ${pendingTasks.map(item => {
                        const daysLeft = getDaysLeft(item.deadline);
                        const urgencyColor = getUrgencyColor(daysLeft);
                        return `
                            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg task-item">
                                <div class="flex items-center flex-1">
                                    <input type="checkbox" onchange="toggleTodo(${item.id})" class="mr-3 h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500">
                                    <div class="flex-1">
                                        <h3 class="font-medium text-gray-800 task-title">${escapeHtml(item.task)}</h3>
                                        <div class="flex items-center mt-1 flex-wrap gap-2">
                                            <span class="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">${escapeHtml(item.subject)}</span>
                                            <span class="text-xs text-gray-500">${formatDate(item.deadline)}</span>
                                            <span class="text-xs ${urgencyColor.bg} px-2 py-1 rounded-full">${daysLeft} hari lagi</span>
                                        </div>
                                    </div>
                                </div>
                                <button onclick="deleteTodo(${item.id})" class="text-red-500 hover:text-red-700 ml-4">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
            ` : ''}
            
            ${completedTasks.length > 0 ? `
            <div class="bg-white rounded-xl p-6 card-hover">
                <h2 class="text-xl font-bold text-gray-800 mb-6">Tugas Selesai (${completedTasks.length})</h2>
                <div class="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                    ${completedTasks.map(item => `
                        <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-green-50 task-item">
                            <div class="flex items-center flex-1">
                                <input type="checkbox" checked onchange="toggleTodo(${item.id})" class="mr-3 h-5 w-5 text-green-600 rounded focus:ring-green-500">
                                <div class="flex-1">
                                    <h3 class="font-medium text-gray-800 task-title line-through">${escapeHtml(item.task)}</h3>
                                    <div class="flex items-center mt-1 flex-wrap gap-2">
                                        <span class="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded-full">${escapeHtml(item.subject)}</span>
                                        <span class="text-xs text-gray-500">${formatDate(item.deadline)}</span>
                                        <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Selesai</span>
                                    </div>
                                </div>
                            </div>
                            <button onclick="deleteTodo(${item.id})" class="text-red-500 hover:text-red-700 ml-4">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
            
            ${todoList.length === 0 ? `
            <div class="bg-white rounded-xl p-12 text-center card-hover">
                <i class="fas fa-tasks text-6xl text-gray-300 mb-4"></i>
                <h2 class="text-2xl font-bold text-gray-800 mb-2">Belum ada tugas</h2>
                <p class="text-gray-600 mb-6">Mulai dengan menambahkan tugas pertama Anda</p>
                <button onclick="showAddTask()" class="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all">
                    <i class="fas fa-plus mr-2"></i> Tambah Tugas Pertama
                </button>
            </div>
            ` : ''}
        </div>
    `;
    document.getElementById('main-content').innerHTML = html;
}

/**
 * Toggle todo completion status
 * @param {number} id - Task ID
 */
function toggleTodo(id) {
    const todo = todoList.find(t => t.id === id);
    if (todo) {
        todo.done = !todo.done;
        saveUserData();
        
        // Show notification
        const message = todo.done ? 'Tugas diselesaikan! 🎉' : 'Tugas ditandai belum selesai';
        showNotification(message, todo.done ? 'success' : 'warning');
        
        renderTasks();
    }
}

/**
 * Delete a todo item
 * @param {number} id - Task ID
 */
function deleteTodo(id) {
    if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
        const taskIndex = todoList.findIndex(t => t.id === id);
        if (taskIndex !== -1) {
            const deletedTask = todoList[taskIndex];
            todoList.splice(taskIndex, 1);
            saveUserData();
            
            showNotification('Tugas berhasil dihapus', 'success');
            renderTasks();
        }
    }
}

/**
 * Show add task modal
 */
function showAddTask() {
    document.getElementById('modal-add-task').classList.add('active');
    document.getElementById('new-task-deadline').min = new Date().toISOString().split('T')[0];
    
    // Close FAB menu if open
    const fabMenu = document.getElementById('fab-menu');
    if (fabMenu) {
        fabMenu.classList.remove('active');
    }
}

/**
 * Close add task modal
 */
function closeAddTask() {
    document.getElementById('modal-add-task').classList.remove('active');
    document.getElementById('new-task-name').value = '';
    document.getElementById('new-task-subject').value = '';
    document.getElementById('new-task-deadline').value = '';
}

/**
 * Save new task
 */
function saveNewTask() {
    const task = document.getElementById('new-task-name').value.trim();
    const subject = document.getElementById('new-task-subject').value;
    const deadline = document.getElementById('new-task-deadline').value;

    if (!task) {
        showNotification('Mohon isi nama tugas!', 'error');
        return;
    }
    if (!subject) {
        showNotification('Mohon pilih mata pelajaran!', 'error');
        return;
    }
    if (!deadline) {
        showNotification('Mohon pilih deadline!', 'error');
        return;
    }

    const newId = Math.max(...todoList.map(t => t.id), 0) + 1;
    todoList.push({ 
        id: newId, 
        task: escapeHtml(task), 
        subject: escapeHtml(subject), 
        deadline, 
        done: false 
    });
    
    saveUserData();
    closeAddTask();
    
    showNotification('Tugas berhasil ditambahkan!', 'success');
    navigateTo('tasks');
}

/**
 * Get tasks statistics
 * @returns {Object} Tasks statistics
 */
function getTasksStats() {
    const pending = todoList.filter(t => !t.done);
    const completed = todoList.filter(t => t.done);
    const overdue = pending.filter(t => new Date(t.deadline) < new Date());
    
    return {
        total: todoList.length,
        pending: pending.length,
        completed: completed.length,
        overdue: overdue.length,
        completionRate: todoList.length > 0 ? Math.round((completed.length / todoList.length) * 100) : 0
    };
}