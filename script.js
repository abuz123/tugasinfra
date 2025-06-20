document.addEventListener('DOMContentLoaded', () => {
    // --- Login Panel Logic (for index.html) ---
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    if (loginForm) { // Only execute if loginForm exists (i.e., on index.html)
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Mencegah form untuk refresh halaman

            const usernameInput = document.getElementById('username').value;
            const passwordInput = document.getElementById('password').value;

            // Username dan password yang ditentukan
            const correctUsername = 'Abrar';
            const correctPassword = 'abrar123';

            if (usernameInput === correctUsername && passwordInput === correctPassword) {
                // Login berhasil, arahkan ke dashboard.html
                window.location.href = 'dashboard.html';
            } else {
                // Login gagal, tampilkan pesan error
                errorMessage.textContent = 'Username atau Password salah. Silakan coba lagi.';
                errorMessage.style.display = 'block'; // Tampilkan pesan
            }
        });
    }


    // --- Dashboard Specific Logic (for dashboard.html) ---
    // Pastikan kode ini hanya berjalan di dashboard.html
    if (document.body.classList.contains('login-page') === false) {

        // --- Hamburger Menu Toggle ---
        const hamburgerMenu = document.getElementById('hamburger-menu');
        const mainNav = document.getElementById('mainNav');

        if (hamburgerMenu && mainNav) {
            hamburgerMenu.addEventListener('click', () => {
                mainNav.classList.toggle('active');
            });
        }

        // --- Smooth Scrolling for Navigation ---
        document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                // Hide mobile nav after clicking
                if (mainNav.classList.contains('active')) {
                     mainNav.classList.remove('active');
                }

                if (targetSection) {
                    // Offset for sticky header
                    const headerOffset = document.querySelector('header').offsetHeight;
                    const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset - 20; // -20 for a bit of extra space

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // --- Materi Pembelajaran Dynamic Content ---
        const materialContentDisplay = document.getElementById('materialContentDisplay');
        const topicButtons = document.querySelectorAll('.topic-button');

        const materialData = {
            "Pemrograman Dasar": {
                title: "Pengantar Pemrograman Dasar",
                content: `
                    <p>Pemrograman dasar adalah pondasi untuk memahami bagaimana instruksi diberikan kepada komputer. Anda akan belajar tentang konsep seperti variabel, tipe data, operator, struktur kontrol (kondisional dan perulangan), fungsi, dan array. Python sering direkomendasikan untuk pemula karena sintaksnya yang mudah dibaca, sementara C++ menawarkan kontrol lebih dekat terhadap perangkat keras dan penting untuk aplikasi kinerja tinggi.</p>
                    <p>Materi ini penting untuk melatih logika berpikir secara algoritmik dan membangun kerangka dasar untuk mempelajari bahasa pemrograman lainnya.</p>
                `
            },
            "Struktur Data & Algoritma": {
                title: "Struktur Data & Algoritma (DSA)",
                content: `
                    <p>Struktur data adalah cara untuk mengatur data dalam komputer agar dapat digunakan secara efisien, contohnya Array, Linked List, Stack, Queue, Tree, dan Graph. Algoritma adalah serangkaian langkah instruksi untuk menyelesaikan masalah tertentu (misal: mencari data, mengurutkan data). Mempelajari DSA akan meningkatkan kemampuan Anda dalam menulis kode yang efisien, scalable, dan optimial.</p>
                    <p>Pemahaman yang kuat di DSA sangat krusial untuk wawancara teknis di perusahaan-perusahaan teknologi dan merupakan inti dari komputasi yang efisien.</p>
                `
            },
            "Jaringan Komputer": {
                title: "Memahami Jaringan Komputer",
                content: `
                    <p>Jaringan komputer membahas bagaimana komputer-komputer saling terhubung dan berkomunikasi. Anda akan belajar tentang protokol jaringan (seperti TCP/IP, HTTP), model OSI dan TCP/IP, perangkat jaringan (router, switch), alamat IP, DNS, dan konsep client-server.</p>
                    <p>Materi ini fundamental untuk pengembangan web, komputasi awan (cloud computing), dan infrastruktur IT. Memungkinkan Anda memahami bagaimana data dikirim dan diterima di seluruh dunia.</p>
                `
            },
            "Sistem Operasi": {
                title: "Pengenalan Sistem Operasi (OS)",
                content: `
                    <p>Sistem Operasi adalah perangkat lunak yang mengelola perangkat keras dan sumber daya perangkat lunak komputer. Topik yang dibahas meliputi manajemen proses, manajemen memori, penjadwalan CPU, sistem file, dan konsep keamanan OS. Contoh sistem operasi adalah Windows, macOS, Linux, Android, iOS.</p>
                    <p>Memahami OS sangat penting bagi pengembang sistem, administrator jaringan, dan siapa pun yang ingin tahu cara kerja dasar sebuah komputer dan interaksinya dengan aplikasi.</p>
                `
            },
            "Keamanan Siber": {
                title: "Dasar-dasar Keamanan Siber",
                content: `
                    <p>Keamanan siber berfokus pada perlindungan sistem komputer dari pencurian atau kerusakan perangkat keras, perangkat lunak, atau data, serta dari gangguan layanan yang mereka sediakan. Anda akan mempelajari tentang ancaman siber (malware, phishing, ransomware), kriptografi dasar, otentikasi, otorisasi, keamanan jaringan, dan etika hacker.</p>
                    <p>Dengan meningkatnya ancaman digital, pengetahuan di bidang keamanan siber menjadi sangat vital di berbagai sektor industri.</p>
                `
            },
            "Kecerdasan Buatan": {
                title: "Pengantar Kecerdasan Buatan (AI)",
                content: `
                    <p>Kecerdasan Buatan (AI) adalah bidang ilmu komputer yang bertujuan untuk menciptakan mesin yang dapat meniru kecerdasan manusia. Materi ini mencakup pengantar Machine Learning (Pembelajaran Mesin), Deep Learning, pengolahan bahasa alami (NLP), visi komputer, dan etika dalam AI. Contoh aplikasinya adalah rekomendasi produk, pengenalan wajah, dan kendaraan otonom.</p>
                    <p>AI adalah salah satu bidang dengan pertumbuhan tercepat dan menawarkan peluang inovasi yang tak terbatas.</p>
                `
            }
        };

        function showMaterialContent(topic) {
            const data = materialData[topic];
            if (data) {
                materialContentDisplay.innerHTML = `<h3>${data.title}</h3>${data.content}`;

                // Remove active class from all buttons
                topicButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to the clicked button
                document.querySelector(`.topic-button[onclick="showMaterialContent('${topic}')"]`).classList.add('active');

                 // Scroll to the content display after showing content (for mobile view)
                 materialContentDisplay.scrollIntoView({ behavior: 'smooth', block: 'start' });

            } else {
                materialContentDisplay.innerHTML = `<p>Konten untuk "${topic}" belum tersedia.</p>`;
            }
        }

        // Initialize by showing a default topic or just the prompt
        // showMaterialContent("Pemrograman Dasar"); // Uncomment to show default content on load
    }
});