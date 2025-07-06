# Mind Dungeon

## Project Overview
Mind Dungeon adalah memory card game berbasis web bertema pixel dungeon yang menantang pemain untuk mencocokkan pasangan kartu sambil menghindari kekalahan akibat kehabisan waktu atau health point. Proyek ini bertujuan menjadi studi nyata kolaborasi antara pengembang manusia dengan bantuan AI (IBM Granite Model) dalam menciptakan aplikasi interaktif dengan struktur modular, performa optimal, dan desain visual konsisten.

Permasalahan utama yang diangkat adalah kompleksitas pengembangan aplikasi game real-time berbasis React — mencakup manajemen state antar komponen, animasi interaktif, logika permainan yang terus berkembang (leveling system), serta kebutuhan untuk menjaga struktur kode tetap scalable dan maintainable. Disini AI secara aktif selama proses pembangunan, menjadikan proyek ini sebagai eksperimen nyata penerapan AI dalam code generation dan optimasi sistem frontend modern.

## Teknologi yang Digunakan

- ReactJS – Library untuk antarmuka interaktif dan manajemen state.
- TailwindCSS – Framework styling utility-first.
- JavaScript (ES6+) – Bahasa utama logika dan event handling.
- HTML5 Audio – Untuk efek suara responsif.
- IBM Granite Model – AI untuk asistensi pengembangan dan optimisasi kode.
- Vercel - Deployment Web.

## Fitur Utama

- Sistem Level Bertahap : Peningkatan jumlah kartu dan kesulitan setiap level.
- Timer & Health System: Pemain harus mencocokkan kartu sebelum waktu habis dan menjaga health tetap utuh.
- Sistem Skor & Combo: Memberikan bonus untuk pencocokan cepat berurutan.
- Dukungan Audio Dinamis: Efek suara untuk match, level up, dll.
- Pixel Theme Konsisten: Tampilan UI bertema retro dengan rendering pixelated.
- Responsivitas: Tata letak disesuaikan untuk desktop dan mobile.

## Peran IBM Granite Model dalam Proyek

Dalam pengembangan proyek Mind Dungeon, IBM Granite Model dimanfaatkan sebagai asisten pengembang berbasis AI yang berfokus pada optimalisasi logika permainan, efisiensi manajemen state, serta perbaikan struktur kode. Pada model ini tidak digunakan untuk merancang visual, melainkan untuk memperbaiki, menyarankan, dan menyederhanakan logika game berbasis ReactJS secara sistematis dan modular.
Jadi IBM Granite Model ini digunakan secara aktif untuk mendukung beberapa aspek penting, antara lain:

1. State Management Simplification
Granite menyarankan cara mengelola state kompleks secara efisien, seperti memisahkan dan menyinkronkan isPaused, isReady, showGameOver, dan isGameFinished. Hal ini membuat transisi antar state lebih aman dan minim konflik.

2. Timer & Pause Logic Refinement
Granite menemukan bahwa timer tetap berjalan saat game dipause. Solusinya adalah menambahkan isPaused dalam dependency array dan memisahkan logika pengurangan waktu dari efek lain seperti combo atau damage.

3. Scoring System & Combo Logic Enhancement
Model ini menyarankan sistem combo berdasarkan waktu antar match (misal 5 detik), serta memberi feedback visual seperti "Combo!", "Nice!", dan "Amazing!" berdasarkan streak pencocokan cepat.

4. Error Detection & Debugging Guidance
Beberapa bug penting yang ditangani oleh Granite:
Modal GameOver tidak muncul: disarankan penggunaan clear timer dan pengecekan elapsedTime <= 0 secara eksplisit.
Modal tidak tertutup saat restart: disarankan pengaturan ulang gameSessionId sebagai key agar komponen di-reset.
Gambar musuh tidak berubah antar level: solusi dengan menggunakan enemyId dari levelData.

5. Code Modularization & Maintainability
Granite menyarankan:
Menyatukan semua efek suara ke playSound(type).
Modularisasi visual seperti Sprite, ComboMessage, dan Heart agar lebih reusable.
Optimasi grid column dinamis agar tidak dihitung ulang terus-menerus.

6. Documentation : Granite juga membantu dalam memberikan struktur dokumentasi pada kode, termasuk penamaan fungsi, penempatan komentar logis, dan membedakan antara efek visual dan efek fungsional. Ini berguna untuk memastikan pengembangan berkelanjutan oleh developer lain ke depannya.

## Lisensi

Proyek ini dikembangkan untuk tujuan edukasi sebagai bagian dari capstone project. Semua aset dan kode digunakan untuk keperluan non-komersial.
