<?php

namespace Database\Seeders;

use App\Models\Surat;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SuratSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $surats = [
            [
                'judul_surat' => 'Surat Keterangan Domisili',
                'keperluan_surat' => 'Untuk keperluan administrasi kependudukan',
                'jenis_surat' => 'keterangan',
            ],
            [
                'judul_surat' => 'Surat Pengantar KTP',
                'keperluan_surat' => 'Untuk mengurus pembuatan KTP baru',
                'jenis_surat' => 'pengantar',
            ],
            [
                'judul_surat' => 'Surat Keterangan Usaha',
                'keperluan_surat' => 'Untuk mengurus izin usaha mikro',
                'jenis_surat' => 'keterangan',
            ],
            [
                'judul_surat' => 'Surat Izin Keramaian',
                'keperluan_surat' => 'Untuk mengadakan acara pernikahan',
                'jenis_surat' => 'izin',
            ],
            [
                'judul_surat' => 'Surat Pengantar SKCK',
                'keperluan_surat' => 'Untuk keperluan melamar pekerjaan',
                'jenis_surat' => 'pengantar',
            ],
            [
                'judul_surat' => 'Surat Keterangan Tidak Mampu',
                'keperluan_surat' => 'Untuk mengurus beasiswa pendidikan',
                'jenis_surat' => 'keterangan',
            ],
            [
                'judul_surat' => 'Surat Izin Mendirikan Bangunan',
                'keperluan_surat' => 'Untuk renovasi rumah',
                'jenis_surat' => 'izin',
            ],
            [
                'judul_surat' => 'Surat Pengantar Nikah',
                'keperluan_surat' => 'Untuk keperluan pernikahan di KUA',
                'jenis_surat' => 'pengantar',
            ],
        ];

        foreach ($surats as $surat) {
            Surat::create($surat);
        }
    }
}