# Petunjuk Penggunaan Chargist ⚡

Chargist adalah kalkulator pengisian daya kendaraan listrik (EV) yang dirancang untuk membantu pengguna di Indonesia menghitung biaya, waktu, dan energi pengisian daya. Berikut adalah panduan lengkap cara menggunakan aplikasi ini.

## 1. Input Data Utama (Data Kendaraan & Charging)

Sebelum melakukan perhitungan, pastikan Anda telah mengisi data dasar di bagian atas aplikasi:

- **Pilih Model EV**: Pilih dari daftar kendaraan yang tersedia (misal: BYD M6, Wuling Air EV, Ioniq 5). Jika kendaraan Anda tidak ada, pilih **Custom**.
- **Kapasitas Baterai**: Jika memilih Custom, masukkan total kapasitas baterai kendaraan Anda dalam kWh.
- **Baterai Saat Ini**: Geser slider atau masukkan angka persentase baterai Anda saat ini (SOC).
- **Lokasi Charging**:
    - **Rumah**: Menggunakan tarif listrik rumah tangga. Anda bisa memilih daya listrik rumah untuk menyesuaikan tarif per kWh secara otomatis.
    - **SPKLU**: Menggunakan tarif standar SPKLU (±Rp2.466,78/kWh).
- **Daya Charger**: Masukkan daya output charger yang digunakan (dalam kW). Contoh: Portable charger (2.2 kW - 7 kW), Wallbox (7 kW - 22 kW), atau DC Fast Charger (50 kW+).
- **Efisiensi Pengisian**: Secara default diatur ke 90%. Anda bisa menyesuaikannya di bagian pengaturan tambahan jika diperlukan.

---

## 2. Fitur Utama (Mode Kalkulasi & Riwayat)

Aplikasi ini memiliki lima fitur inti yang dapat diakses melalui tab di bagian tengah:

### 🎯 Mode Target
Gunakan mode ini untuk mengetahui biaya dan waktu yang dibutuhkan untuk mencapai target baterai tertentu.
1.  Pilih tab **Target**.
2.  Tentukan **Baterai Target** yang ingin dicapai (misal: 80% atau 100%).
3.  Lihat hasil estimasi energi dari PLN, waktu pengisian, dan total biaya.

### ⏱️ Mode Waktu
Gunakan mode ini jika Anda hanya memiliki durasi waktu terbatas untuk mengisi daya.
1.  Pilih tab **Waktu**.
2.  Masukkan **Waktu Pengisian** yang tersedia (Jam dan Menit).
3.  Aplikasi akan menghitung persentase **Baterai Akhir** yang didapat serta biayanya.

### 💰 Mode Anggaran
Gunakan mode ini jika Anda ingin mengisi daya dengan nominal uang tertentu.
1.  Pilih tab **Anggaran**.
2.  Masukkan nominal **Biaya yang Tersedia** (dalam Rupiah).
3.  Aplikasi akan menghitung persentase baterai yang bisa didapatkan dan estimasi waktunya.

### ⚡ Mode Energi
Gunakan mode ini jika Anda sudah tahu jumlah kWh yang diisi, misalnya dari layar SPKLU atau meteran.
1.  Pilih tab **Energi**.
2.  Masukkan **Energi dari PLN** (dalam kWh) sesuai angka yang tertera.
3.  Aplikasi akan menghitung total biaya, estimasi waktu, dan persentase baterai akhir. Hasilnya juga bisa disimpan ke Riwayat.

### 📋 Riwayat Pengisian
Fitur ini berfungsi untuk mencatat dan melacak semua aktivitas pengisian daya Anda.
- **Simpan Sesi**: Setelah melakukan perhitungan di mode Target/Waktu/Anggaran/Energi, tekan tombol **Simpan Sesi**.
- **Data Tersimpan**: Di tab Riwayat, Anda dapat melihat log tanggal, lokasi, jumlah energi, dan biaya pengisian.
- **Statistik**: Lihat ringkasan penggunaan seperti total energi yang dihabiskan dan rata-rata biaya per sesi/hari/minggu/bulan.
*Catatan: Data riwayat disimpan secara lokal di browser Anda.*

---

## 3. Tips & Informasi Tambahan

### ⚡ Tips Pengisian Efisien
- **Hindari Isi ke 100%**: Pengisian di atas 80% biasanya jauh lebih lambat karena sistem BMS kendaraan menurunkan daya masuk untuk melindungi sel baterai.
- **Perhatikan Lokasi**: Pengisian di rumah biasanya jauh lebih murah daripada di SPKLU, namun membutuhkan waktu lebih lama.
- **Gunakan Data Akurat**: Pastikan daya charger yang Anda masukkan sesuai dengan spesifikasi alat atau output aktual dari dispenser SPKLU.

### 🔗 Sinkronisasi URL
Aplikasi ini mendukung sinkronisasi melalui URL. Anda dapat menyalin link di browser setelah melakukan kalkulasi dan membagikannya kepada orang lain; mereka akan melihat data input yang sama persis dengan yang Anda masukkan.

---
*Dibuat dengan ❤️ untuk komunitas EV Indonesia*
