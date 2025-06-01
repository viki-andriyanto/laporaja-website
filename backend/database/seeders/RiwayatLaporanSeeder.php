<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\RiwayatLaporan;

class RiwayatLaporanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $riwayatLaporans = [
            [
                'jenis_surat' => 'laporan',
                'tanggal' => '2024-01-15 08:30:00',
                'judul_lapor' => 'Jalan Berlubang di Merdeka',
                'deskripsi' => 'Jalan di Merdeka terlihat berlubang, memanggil perhatian.',
                'status' => 'dalam proses',
                'komentar' => 'Laporan sedang diverifikasi tim lapangan',
                'gambar' => 'jalan_berlubang_001.jpg',
                'users_user_id' => 2, // User ID
                'laporan_laporan_id' => 1,
                'surat_surat_id' => null,
            ],
            [
                'jenis_surat' => 'surat',
                'tanggal' => '2024-01-16 10:00:00',
                'judul_lapor' => 'Permohonan Surat Keterangan Domisili',
                'deskripsi' => 'Permohonan surat keterangan domisili',
                'status' => 'selesai',
                'komentar' => 'Surat telah selesai dibuat dan dapat diambil',
                'gambar' => null,
                'users_user_id' => 2,
                'laporan_laporan_id' => null,
                'surat_surat_id' => 1,
            ],
            [
                'jenis_surat' => 'laporan',
                'tanggal' => '2024-01-20 14:00:00',
                'judul_lapor' => 'Sampah Menumpuk di Taman Kota',
                'deskripsi' => 'Sampah menumpuk di taman kota, memanggil perhatian.',
                'status' => 'perlu ditinjau',
                'komentar' => 'Perlu koordinasi dengan dinas kebersihan',
                'gambar' => 'sampah_taman_002.jpg',
                'users_user_id' => 2,
                'laporan_laporan_id' => 2,
                'surat_surat_id' => null,
            ],
            [
                'jenis_surat' => 'surat',
                'tanggal' => '2024-01-22 09:30:00',
                'judul_lapor' => 'Permohonan Surat Pengantar KTP',
                'deskripsi' => 'Permohonan surat pengantar KTP',
                'status' => 'dalam proses',
                'komentar' => 'Sedang dalam proses verifikasi data',
                'gambar' => null,
                'users_user_id' => 2,
                'laporan_laporan_id' => null,
                'surat_surat_id' => 2,
            ],
        ];
    
        foreach ($riwayatLaporans as $riwayat) {
            RiwayatLaporan::create($riwayat);
        }
    }
}

