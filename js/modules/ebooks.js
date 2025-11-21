// E-Books Management Module

/**
 * Render e-books page
 */
function renderEbooks() {
    const html = `
        <div class="fade-in">
            <div class="mb-8 slide-in-left">
                <h1 class="text-3xl font-bold text-white">E-Book</h1>
                <p class="text-indigo-100 mt-2">Koleksi buku paket pelajaran digital</p>
            </div>
            
            <div class="bg-white rounded-xl p-6 mb-8 card-hover">
                <div class="flex items-center">
                    <div class="flex-1">
                        <h2 class="text-xl font-bold text-gray-800 mb-2">Akses Buku Kapan Saja</h2>
                        <p class="text-gray-600">Semua buku paket pelajaran dapat diakses secara gratis. Baca dan pelajari materi dimana saja, kapan saja!</p>
                    </div>
                    <div class="hidden md:block">
                        <i class="fas fa-lightbulb text-4xl text-indigo-500"></i>
                    </div>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${E_BOOKS.map(book => `
                    <div class="bg-white rounded-xl overflow-hidden card-hover">
                        <div class="h-48 gradient-primary flex items-center justify-center text-white text-6xl">
                            ${book.cover}
                        </div>
                        <div class="p-6">
                            <h3 class="text-lg font-bold text-gray-800 mb-2 task-title">${escapeHtml(book.title)}</h3>
                            <div class="flex justify-between text-sm text-gray-600 mb-4">
                                <span>${escapeHtml(book.subject)}</span>
                                <span>${book.pages} halaman</span>
                            </div>
                            <div class="flex justify-between items-center text-xs text-gray-500 mb-3">
                                <span>Oleh: ${escapeHtml(book.author)}</span>
                                <span>Tahun: ${book.year}</span>
                            </div>
                            <button onclick="openBook(${book.id})" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all flex items-center justify-center">
                                <i class="fas fa-book-open mr-2"></i> Baca Sekarang
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <!-- Reading Statistics -->
            <div class="mt-8 bg-white rounded-xl p-6 card-hover">
                <h2 class="text-xl font-bold text-gray-800 mb-4">Statistik Membaca</h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div class="p-4 bg-blue-50 rounded-lg">
                        <div class="text-2xl font-bold text-blue-600">${E_BOOKS.length}</div>
                        <div class="text-sm text-gray-600">Total Buku</div>
                    </div>
                    <div class="p-4 bg-green-50 rounded-lg">
                        <div class="text-2xl font-bold text-green-600">${SUBJECTS.length}</div>
                        <div class="text-sm text-gray-600">Mata Pelajaran</div>
                    </div>
                    <div class="p-4 bg-purple-50 rounded-lg">
                        <div class="text-2xl font-bold text-purple-600">${E_BOOKS.reduce((sum, book) => sum + book.pages, 0)}</div>
                        <div class="text-sm text-gray-600">Total Halaman</div>
                    </div>
                    <div class="p-4 bg-orange-50 rounded-lg">
                        <div class="text-2xl font-bold text-orange-600">2024</div>
                        <div class="text-sm text-gray-600">Edisi Terbaru</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('main-content').innerHTML = html;
}

/**
 * Open e-book
 * @param {number} bookId - Book ID
 */
function openBook(bookId) {
    const book = E_BOOKS.find(b => b.id === bookId);
    if (book && book.url) {
        // Show loading notification
        showNotification(`Membuka: ${book.title}`, 'info');
        
        // Open in new tab after short delay
        setTimeout(() => {
            window.open(book.url, '_blank');
        }, 500);
    } else {
        showNotification(`Buku "${book.title}" akan segera tersedia!`, 'info');
    }
}

/**
 * Get e-book by ID
 * @param {number} id - Book ID
 * @returns {Object} Book object
 */
function getBookById(id) {
    return E_BOOKS.find(book => book.id === id);
}

/**
 * Get e-books by subject
 * @param {string} subject - Subject name
 * @returns {Array} Filtered books
 */
function getBooksBySubject(subject) {
    return E_BOOKS.filter(book => book.subject === subject);
}

/**
 * Get all e-books
 * @returns {Array} All e-books
 */
function getAllEbooks() {
    return E_BOOKS;
}

/**
 * Search e-books
 * @param {string} query - Search query
 * @returns {Array} Search results
 */
function searchEbooks(query) {
    const lowerQuery = query.toLowerCase();
    return E_BOOKS.filter(book => 
        book.title.toLowerCase().includes(lowerQuery) ||
        book.subject.toLowerCase().includes(lowerQuery) ||
        book.author.toLowerCase().includes(lowerQuery)
    );
}