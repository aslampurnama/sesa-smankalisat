// Application Constants and Default Data

// Default user data - DIPERBAIKI: tambah ID untuk jadwal
const DEFAULT_USER_DATA = {
    "2024001": {
        password: "siswa123",
        name: "Siswa SMAN Kalisat",
        class: "XI IPA 1",
        email: "siswa@smankalisat.sch.id",
        todoList: [
            { id: 1, task: 'Tugas Matematika Bab 5 - Integral dan Aplikasinya', subject: 'Matematika', deadline: '2025-11-20', done: false },
            { id: 2, task: 'Essay Bahasa Indonesia tentang Novel Laskar Pelangi', subject: 'Bahasa Indonesia', deadline: '2025-11-22', done: false },
            { id: 3, task: 'Laporan Praktikum Fisika - Hukum Ohm dan Rangkaian Listrik', subject: 'Fisika', deadline: '2025-11-25', done: false },
            { id: 4, task: 'Analisis Struktur Atom dan Sistem Periodik', subject: 'Kimia', deadline: '2025-11-18', done: true },
            { id: 5, task: 'Presentasi Sistem Pencernaan Manusia', subject: 'Biologi', deadline: '2025-11-28', done: false },
            { id: 6, task: 'Reading Comprehension - Global Warming Text', subject: 'Bahasa Inggris', deadline: '2025-11-19', done: true },
            { id: 7, task: 'Makalah Perang Dunia II dan Dampaknya', subject: 'Sejarah', deadline: '2025-11-30', done: false },
            { id: 8, task: 'Peta Konsep Geografi Regional Asia Tenggara', subject: 'Geografi', deadline: '2025-11-23', done: false },
            { id: 9, task: 'Analisis Permintaan dan Penawaran Pasar', subject: 'Ekonomi', deadline: '2025-11-26', done: false },
            { id: 10, task: 'Studi Kasus Interaksi Sosial di Masyarakat', subject: 'Sosiologi', deadline: '2025-12-02', done: false }
        ],
        scheduleData: [
            { id: 1, day: 'Senin', time: '07:00-08:30', start: '07:00', end: '08:30', subject: 'Matematika', teacher: 'Pak Budi' },
            { id: 2, day: 'Senin', time: '08:30-10:00', start: '08:30', end: '10:00', subject: 'Bahasa Indonesia', teacher: 'Bu Ani' },
            { id: 3, day: 'Senin', time: '10:15-11:45', start: '10:15', end: '11:45', subject: 'Fisika', teacher: 'Bu Siti' },
            { id: 4, day: 'Selasa', time: '07:00-08:30', start: '07:00', end: '08:30', subject: 'Kimia', teacher: 'Pak Andi' },
            { id: 5, day: 'Selasa', time: '08:30-10:00', start: '08:30', end: '10:00', subject: 'Biologi', teacher: 'Bu Rina' },
            { id: 6, day: 'Rabu', time: '07:00-08:30', start: '07:00', end: '08:30', subject: 'Matematika', teacher: 'Pak Budi' },
            { id: 7, day: 'Rabu', time: '08:30-10:00', start: '08:30', end: '10:00', subject: 'Bahasa Inggris', teacher: 'Mr. John' },
            { id: 8, day: 'Kamis', time: '07:00-08:30', start: '07:00', end: '08:30', subject: 'Sejarah', teacher: 'Bu Dewi' },
            { id: 9, day: 'Kamis', time: '08:30-10:00', start: '08:30', end: '10:00', subject: 'Geografi', teacher: 'Pak Rudi' },
            { id: 10, day: 'Jumat', time: '07:00-08:30', start: '07:00', end: '08:30', subject: 'Ekonomi', teacher: 'Bu Maya' },
            { id: 11, day: 'Jumat', time: '08:30-10:00', start: '08:30', end: '10:00', subject: 'PJOK', teacher: 'Pak Agus' }
        ]
    }
};

// Subjects data
const SUBJECTS = [
    { 
        name: 'Matematika', 
        teacher: 'Pak Budi', 
        students: 32, 
        color: 'bg-blue-500', 
        icon: 'fas fa-calculator',
        materials: [
            { title: 'TRIGONOMETRI DASAR', link: 'https://materi78.wordpress.com/wp-content/uploads/2013/06/trig1_mat3.pdf' },
            { title: 'IDENTITAS DAN PERSAMAAN TRIGONOMETRI', link: 'https://materi78.wordpress.com/wp-content/uploads/2013/06/trig2_mat3_1.pdf' },
            { title: 'DALIL-DALIL TRIGONOMETRI', link: 'https://materi78.wordpress.com/wp-content/uploads/2013/06/trig3_mat3.pdf' }
        ]
    },
    { 
        name: 'Bahasa Indonesia', 
        teacher: 'Bu Ani', 
        students: 32, 
        color: 'bg-green-500', 
        icon: 'fas fa-book',
        materials: [
            { title: 'Analisis Novel Laskar Pelangi', link: 'https://jurnal.unimed.ac.id/2012/index.php/kultura/article/download/11707/10217' },
            { title: 'Teks Eksposisi', link: 'https://repositori.kemendikdasmen.go.id/21635/1/X_Bahasa-Indonesia_KD-3.4_Final.pdf' },
            { title: 'Menulis Puisi Kontemporer', link: 'https://id.scribd.com/doc/308574490/Puisi-Kontemporer' }
        ]
    },
    { 
        name: 'Fisika', 
        teacher: 'Bu Siti', 
        students: 30, 
        color: 'bg-purple-500', 
        icon: 'fas fa-atom',
        materials: [
            { title: 'BESARAN DAN PENGUKURAN', link: 'https://materi78.wordpress.com/wp-content/uploads/2013/06/besar_fis1_3.pdf' },
            { title: 'VEKTOR', link: 'https://materi78.wordpress.com/wp-content/uploads/2013/06/vektor_fis1_4.pdf' },
            { title: 'KINEMATIKA GERAK LURUS', link: 'https://materi78.wordpress.com/wp-content/uploads/2013/06/lurus_fis1_5.pdf' }
        ]
    },
    { 
        name: 'Kimia', 
        teacher: 'Pak Andi', 
        students: 28, 
        color: 'bg-red-500', 
        icon: 'fas fa-flask',
        materials: [
            { title: 'SIFAT TABEL PERIODIK', link: 'https://materi78.wordpress.com/wp-content/uploads/2013/06/sperio_kim1_5.pdf' },
            { title: 'BILANGAN KUANTUM', link: 'https://materi78.wordpress.com/wp-content/uploads/2014/04/kuant_kim1_4.pdf' },
            { title: 'IKATAN KIMIA', link: 'https://materi78.wordpress.com/wp-content/uploads/2014/04/ikkim_kim1_4.pdf' }
        ]
    },
    { 
        name: 'Biologi', 
        teacher: 'Bu Rina', 
        students: 31, 
        color: 'bg-yellow-500', 
        icon: 'fas fa-dna',
        materials: [
            { title: 'VIRUS', link: 'https://materi78.wordpress.com/wp-content/uploads/2014/04/virus_bio2_5.pdf' },
            { title: 'MONERA', link: 'https://materi78.wordpress.com/wp-content/uploads/2014/04/monera_bio2_3.pdf' },
            { title: 'PROTISTA', link: '#' }
        ]
    },
    { 
        name: 'Bahasa Inggris', 
        teacher: 'Mr. John', 
        students: 32, 
        color: 'bg-pink-500', 
        icon: 'fas fa-language',
        materials: [
            { title: 'Report Text Structure', link: 'http://repository.uin-malang.ac.id/6789/1/Reviewing%20Report%20Text.pdf' },
            { title: 'Conditional Sentences', link: 'https://www.madonna.edu/resources/writing-center/online-tutoring/Conditionals.pdf' },
            { title: 'Reading Comprehension Strategies', link: 'https://files.eric.ed.gov/fulltext/ED588183.pdf' }
        ]
    }
];

// E-books data - DIPERBAIKI: link Bahasa Inggris dan Biologi
const E_BOOKS = [
    { 
        id: 1, 
        title: 'Matematika Kelas XII', 
        subject: 'Matematika', 
        cover: '📐', 
        pages: 170, 
        author: 'Kemendikbud', 
        year: 2024,
        url: 'https://static.buku.kemdikbud.go.id/content/pdf/bukuteks/kurikulum21/Matematika-BS-KLS-XII.pdf'
    },
    { 
        id: 2, 
        title: 'Bahasa Indonesia XII', 
        subject: 'Bahasa Indonesia', 
        cover: '📝', 
        pages: 246, 
        author: 'Kemendikbud', 
        year: 2024,
        url: 'https://static.buku.kemdikbud.go.id/content/pdf/bukuteks/kurikulum21/Indonesia_BS_KLS_XII.pdf'
    },
    { 
        id: 3, 
        title: 'Fisika untuk SMA Kelas XII', 
        subject: 'Fisika', 
        cover: '⚡', 
        pages: 228, 
        author: 'Kemendikbud', 
        year: 2024,
        url: 'https://repository.bbg.ac.id/bitstream/1948/1/Fisika_BS_KLS_XII.pdf'
    },
    { 
        id: 4, 
        title: 'Kimia Kelas XII', 
        subject: 'Kimia', 
        cover: '🧪', 
        pages: 210, 
        author: 'Kemendikbud', 
        year: 2024,
        url: 'https://static.buku.kemdikbud.go.id/content/pdf/bukuteks/kurikulum21/Kimia_BS_KLS_XII.pdf'
    },
    { 
        id: 5, 
        title: 'Biologi Kelas XII', 
        subject: 'Biologi', 
        cover: '🧬', 
        pages: 254, 
        author: 'Kemendikbud', 
        year: 2024,
        url: 'https://static.buku.kemdikbud.go.id/content/pdf/bukuteks/kurikulum21/Biologi_BG_KLS_XII.pdf'
    },
    { 
        id: 6, 
        title: 'Bahasa Inggris Kelas XII', 
        subject: 'Bahasa Inggris', 
        cover: '🔤', 
        pages: 224, 
        author: 'Kemendikbud', 
        year: 2024,
        url: 'https://static.buku.kemdikbud.go.id/content/pdf/bukuteks/kurikulum21/Inggris_BS_KLS_XII.pdf'
    }
];

// Day order for schedule
const DAY_ORDER = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

// Timer default settings
const TIMER_DEFAULTS = {
    workMinutes: 25,
    breakMinutes: 5,
    longBreakMinutes: 15
};